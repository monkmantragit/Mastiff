/**
 * Hand-off between a successful form submission and /thank-you.
 *
 * - The Google Ads conversion fires only when a form actually succeeded in this tab
 *   (not on direct visits, bookmarks or refreshes), once per submission.
 * - Lead details live in sessionStorage and are deleted as soon as /thank-you reads
 *   them, instead of sitting in localStorage indefinitely.
 */

const STORAGE_KEY = 'wm_lead_handoff';
const LEGACY_KEYS = ['enquiryData', 'contactData'];

export interface LeadHandoff {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  location?: string;
  message?: string;
  timestamp: string;
}

/** Call after the API confirms success, immediately before navigating to /thank-you. */
export function recordLeadSubmission(details: Omit<LeadHandoff, 'timestamp'>): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...details, timestamp: new Date().toISOString() }));
  } catch {
    // Storage blocked: the thank-you page still renders, without personalised details
    // and without a conversion (we cannot prove a submission happened).
  }
}

/** Reads and deletes the pending hand-off. Returns null for direct visits. */
export function consumeLeadSubmission(): LeadHandoff | null {
  try {
    for (const key of LEGACY_KEYS) localStorage.removeItem(key);
    const raw = sessionStorage.getItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LeadHandoff) : null;
  } catch {
    return null;
  }
}

/** Google Ads lead conversion (AW-971911197). */
export function reportLeadConversion(): void {
  const w = window as typeof window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== 'function') {
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
  }
  w.gtag('event', 'conversion', {
    send_to: 'AW-971911197/191xCNue9wgQneC4zwM',
    value: 1.0,
    currency: 'INR',
  });
}
