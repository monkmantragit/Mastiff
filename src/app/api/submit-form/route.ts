import { NextRequest, NextResponse, after } from 'next/server';
import { EmailService } from '@/lib/email-service';
import { directusCreate, directusItems } from '@/lib/directus-server';

/**
 * Form submissions (contact, enquiry popup, landing pages, quotes, newsletter, feedback).
 *
 * Lead safety: a lead is only reported as failed if BOTH the CMS save and the email
 * notification fail. When Directus is down, the notification email becomes the copy of
 * the lead; when Directus is up, the email is sent after the response so SMTP latency
 * never blocks the visitor.
 *
 * Abuse protection: body-size cap, per-field length caps, a honeypot field ("website")
 * and a per-IP rate limit.
 */

const MAX_BODY_BYTES = 32 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const EMAIL_PATTERN = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]{2,}$/;
const LEAD_FORM_TYPES = new Set(['contact', 'enquiry', 'landing', 'quote']);

const FIELD_LIMITS: Record<string, number> = {
  name: 120,
  email: 254,
  phone: 30,
  company: 160,
  eventType: 80,
  eventDate: 40,
  location: 160,
  message: 5000,
  source: 200,
  role: 120,
  comments: 5000,
};
const EXTRA_FIELD_LIMIT = 1000;
const MAX_EXTRA_FIELDS = 30;

// In-memory limiter. Resets on redeploy and is per-instance, which is enough to stop a
// single script flooding the inbox from one IP. Use a shared store if the app scales out.
const rateLimitHits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (rateLimitHits.get(key) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (hits.length > 0) rateLimitHits.set(key, hits);
  else rateLimitHits.delete(key);
  return hits.length >= RATE_LIMIT_MAX;
}

/** Count a submission that passed validation (typos and rejected attempts don't count). */
function recordSubmission(key: string): void {
  const now = Date.now();
  const hits = (rateLimitHits.get(key) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  rateLimitHits.set(key, hits);

  if (rateLimitHits.size > 5000) {
    for (const [k, times] of rateLimitHits) {
      if (times.every(t => now - t >= RATE_LIMIT_WINDOW_MS)) rateLimitHits.delete(k);
    }
  }
}

// Prefer headers set by the CDN / hosting proxy. The first X-Forwarded-For entry is
// client-controlled when proxies append to it, so it is only a last resort.
function getClientIP(request: NextRequest): string {
  const trusted = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip');
  if (trusted) return trusted.trim();
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const hops = forwarded.split(',').map(h => h.trim()).filter(Boolean);
    return hops[hops.length - 1] || 'unknown';
  }
  return 'unknown';
}

function error(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

type Clean = Record<string, string | number | boolean>;

/**
 * Trim and cap every field. Known fields get their own limits; unknown fields (dynamic
 * landing-page fields, feedback ratings) are kept only as short scalars.
 */
function cleanFields(raw: Record<string, unknown>): Clean {
  const clean: Clean = {};
  let extras = 0;
  for (const [key, value] of Object.entries(raw)) {
    if (!/^[A-Za-z][A-Za-z0-9_]{0,63}$/.test(key)) continue;
    if (typeof value === 'number' || typeof value === 'boolean') {
      clean[key] = value;
      continue;
    }
    if (typeof value !== 'string') continue;
    const limit = FIELD_LIMITS[key];
    if (!limit) {
      if (extras >= MAX_EXTRA_FIELDS) continue;
      extras++;
    }
    const trimmed = value.trim().slice(0, limit || EXTRA_FIELD_LIMIT);
    if (trimmed) clean[key] = trimmed;
  }
  return clean;
}

function str(value: unknown): string | null {
  return typeof value === 'string' && value ? value : null;
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return error('Submission too large.', 413);
  }

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return error('Submission too large.', 413);
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not an object');
    body = parsed;
  } catch {
    return error('Invalid submission.', 400);
  }

  const formType = typeof body.formType === 'string' ? body.formType : '';

  // Honeypot: real visitors never see or fill the "website" field. Pretend success so
  // bots get no signal, but store and send nothing.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ success: true, message: 'Form submitted successfully' });
  }

  const clientIP = getClientIP(request);
  const rateKey = `${clientIP}:${formType || 'none'}`;
  if (isRateLimited(rateKey)) {
    return error('Too many submissions. Please wait a few minutes, or call us on +91 74112 72227.', 429);
  }

  const { formType: _ignored, website: _honeypot, ...rest } = body;
  const formData = cleanFields(rest);
  const userAgent = (request.headers.get('user-agent') || '').slice(0, 500);
  const referer = (request.headers.get('referer') || '').slice(0, 500);

  try {
    if (LEAD_FORM_TYPES.has(formType)) {
      const email = str(formData.email);
      const phone = str(formData.phone);
      // Landing pages are built in the CMS and may collect only a phone number.
      const phoneOnlyAllowed = formType === 'landing' && !email && phone && /^\+?\d{7,15}$/.test(phone.replace(/[\s().-]/g, ''));
      if (!phoneOnlyAllowed && (!email || !EMAIL_PATTERN.test(email))) {
        return error('Please enter a valid email address.', 400);
      }
      recordSubmission(rateKey);

      const submission = {
        form_type: formType,
        name: str(formData.name),
        email,
        phone,
        company: str(formData.company),
        event_type: str(formData.eventType),
        event_date: str(formData.eventDate),
        location: str(formData.location),
        message: str(formData.message),
        source: str(formData.source) || referer || null,
        form_data: formData,
        ip_address: clientIP,
        user_agent: userAgent,
        status: 'new',
        notes: null,
      };

      let savedId: unknown = null;
      let saved = false;
      try {
        const result = await directusCreate<{ data?: { id?: unknown } }>('form_submissions', submission);
        savedId = result?.data?.id ?? null;
        saved = true;
      } catch (saveError) {
        console.error('[submit-form] CMS save failed:', saveError instanceof Error ? saveError.message : saveError);
      }

      if (saved) {
        // Lead is safe in the CMS; notify without making the visitor wait for SMTP.
        after(async () => {
          const sent = await EmailService.sendEmail(EmailService.generateLeadEmail(formType, formData));
          if (!sent) console.error('[submit-form] Notification email failed for saved lead', savedId);
        });
        return NextResponse.json({ success: true, message: 'Form submitted successfully', id: savedId });
      }

      // CMS is down: the email is now the only record of this lead, so wait for it.
      const sent = await EmailService.sendEmail(
        EmailService.generateLeadEmail(formType, formData, {
          note: 'This lead could NOT be saved to the CMS. This email is the only copy.',
        })
      );
      if (sent) {
        return NextResponse.json({ success: true, message: 'Form submitted successfully' });
      }

      console.error('[submit-form] LEAD LOST: CMS save and email both failed', { formType, email });
      return error('We could not submit your enquiry right now. Please call or WhatsApp us on +91 74112 72227.', 503);
    }

    if (formType === 'newsletter') {
      const email = str(formData.email);
      if (!email || !EMAIL_PATTERN.test(email)) {
        return error('Please enter a valid email address.', 400);
      }
      recordSubmission(rateKey);

      // Same response whether or not the address is already subscribed, so the endpoint
      // cannot be used to check who is on the list.
      const existing = await directusItems<{ id: number }>(
        'newsletter_subscribers',
        { fields: 'id', filter: { email: { _eq: email } }, limit: 1 },
        0 // never cached: a stale "not subscribed" answer would insert duplicates
      );
      if (existing.length === 0) {
        await directusCreate('newsletter_subscribers', {
          email,
          source: str(formData.source) || referer || null,
          status: 'active',
          ip_address: clientIP,
        });
      }
      return NextResponse.json({ success: true, message: 'Successfully subscribed' });
    }

    if (formType === 'feedback') {
      // The feedback survey sends a nested payload (questions + answers). Forward it to
      // the feedback webhook from the server so the webhook URL is never public; fall
      // back to the CMS if no webhook is configured or it fails.
      const payload = body.payload && typeof body.payload === 'object' && !Array.isArray(body.payload)
        ? (body.payload as Record<string, unknown>)
        : null;
      if (!payload) return error('Invalid submission.', 400);
      recordSubmission(rateKey);

      const webhookUrl = process.env.FEEDBACK_WEBHOOK_URL || process.env.NEXT_PUBLIC_FEEDBACK_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...payload, receivedAt: new Date().toISOString() }),
            signal: AbortSignal.timeout(10_000),
          });
          if (response.ok) return NextResponse.json({ success: true, message: 'Feedback submitted' });
          console.error('[submit-form] Feedback webhook returned', response.status);
        } catch (webhookError) {
          console.error('[submit-form] Feedback webhook failed:', webhookError instanceof Error ? webhookError.message : webhookError);
        }
      }

      const user = (payload.user && typeof payload.user === 'object' ? payload.user : {}) as Record<string, unknown>;
      await directusCreate('feedback_responses', {
        name: str(user.name),
        role: str(user.role),
        overall_rating: null,
        feedback_data: payload,
        comments: null,
      });
      return NextResponse.json({ success: true, message: 'Feedback submitted' });
    }

    return error('Invalid form type.', 400);
  } catch (err) {
    // Log details on the server; never return internal error messages to the browser.
    console.error('[submit-form] Unexpected error:', err instanceof Error ? err.message : err);
    return error('Something went wrong. Please try again, or call us on +91 74112 72227.', 500);
  }
}

export async function GET() {
  return error('Method not allowed. Use POST to submit forms.', 405);
}
