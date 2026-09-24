import 'server-only';
import nodemailer from 'nodemailer';

/**
 * Lead notification emails.
 *
 * Every value from a form is HTML-escaped before it goes into the email body, so a
 * visitor cannot inject links or markup into mail the sales team trusts. Subjects and
 * recipients are fixed server-side.
 */

export interface EmailData {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const LEAD_TITLES: Record<string, string> = {
  contact: 'New Lead from Contact Page',
  enquiry: 'New Enquiry Received',
  landing: 'New Lead from Landing Page',
  quote: 'New Quote Request',
};

// Fields shown first, with readable labels. Anything else the form sent is listed after.
const FIELD_LABELS: Record<string, string> = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  company: 'Company',
  eventType: 'Event Type',
  eventDate: 'Event Date',
  location: 'Location',
  message: 'Message',
};

const HIDDEN_FIELDS = new Set(['formType', 'source', 'website']);

function humanizeKey(key: string): string {
  return key
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, c => c.toUpperCase());
}

export class EmailService {
  private static transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

  static isConfigured(): boolean {
    return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD);
  }

  private static getTransporter(): ReturnType<typeof nodemailer.createTransport> {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        // Fail fast instead of nodemailer's multi-minute defaults, so a dead SMTP server
        // cannot hang the form request.
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 20_000,
      });
    }
    return this.transporter;
  }

  /** Returns true when the message was accepted by the SMTP server. Never throws. */
  static async sendEmail(emailData: EmailData): Promise<boolean> {
    if (!this.isConfigured()) {
      console.error('[email] SMTP is not configured; notification not sent.');
      return false;
    }
    try {
      await this.getTransporter().sendMail({
        from: emailData.from || process.env.SMTP_FROM || 'White Massif <noreply@whitemassif.com>',
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.text || '',
        html: emailData.html,
        replyTo: emailData.replyTo,
      });
      return true;
    } catch (error) {
      console.error('[email] Sending failed:', error instanceof Error ? error.message : error);
      return false;
    }
  }

  /**
   * Admin notification for a lead. `note` is an optional plain-text line shown above the
   * details (used when the CMS save failed and this email is the only copy of the lead).
   */
  static generateLeadEmail(
    formType: string,
    formData: Record<string, unknown>,
    options: { note?: string } = {}
  ): EmailData {
    const adminEmail = process.env.ADMIN_EMAIL || 'sales@whitemassif.com';
    const title = LEAD_TITLES[formType] || 'New Lead';

    const orderedKeys = [
      ...Object.keys(FIELD_LABELS).filter(key => key in formData),
      ...Object.keys(formData).filter(key => !(key in FIELD_LABELS) && !HIDDEN_FIELDS.has(key)).sort(),
    ];

    const rows = orderedKeys
      .map(key => {
        const value = formData[key];
        if (value === undefined || value === null || value === '') return null;
        const label = FIELD_LABELS[key] || humanizeKey(key);
        const rendered = escapeHtml(typeof value === 'object' ? JSON.stringify(value) : value).replace(/\n/g, '<br>');
        return `<tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top;">${escapeHtml(label)}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${rendered}</td>
        </tr>`;
      })
      .filter(Boolean)
      .join('');

    const source = escapeHtml(formData.source || title);
    const note = options.note
      ? `<p style="padding: 12px; background: #fff4e0; border-left: 4px solid #F9A625;"><strong>${escapeHtml(options.note)}</strong></p>`
      : '';

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #2A3959; color: white; padding: 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 22px;">${escapeHtml(title)}</h1>
    </div>
    <div style="padding: 20px; background-color: #f9f9f9;">
      ${note}
      <table style="width: 100%; border-collapse: collapse;">${rows}</table>
      <p style="margin-top: 20px;"><strong>Source:</strong> ${source}</p>
    </div>
    <div style="padding: 20px; text-align: center; font-size: 12px; color: #666;">
      <p>This is an automated notification from White Massif.</p>
    </div>
  </div>
</body>
</html>`;

    const text = [
      options.note ? `${options.note}\n` : '',
      ...orderedKeys
        .filter(key => formData[key] !== undefined && formData[key] !== null && formData[key] !== '')
        .map(key => `${FIELD_LABELS[key] || humanizeKey(key)}: ${typeof formData[key] === 'object' ? JSON.stringify(formData[key]) : String(formData[key])}`),
      `Source: ${String(formData.source || title)}`,
    ].join('\n');

    const email = typeof formData.email === 'string' ? formData.email : undefined;

    return { to: adminEmail, subject: title, html, text, replyTo: email };
  }
}
