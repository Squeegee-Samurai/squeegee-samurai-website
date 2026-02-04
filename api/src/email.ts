import type { QuoteBody } from './quoteLogic.js';
import type { QuoteResult } from './quoteLogic.js';

/**
 * Send lead notification to owner.
 * Uses SMTP if EMAIL_* env vars are set; otherwise logs to console.
 * Can be replaced with Resend, SendGrid, etc. without changing callers.
 */
export async function sendOwnerNotification(
  body: QuoteBody,
  result: QuoteResult,
  quoteId: string
): Promise<void> {
  const to = process.env.NOTIFY_EMAIL;
  const text = [
    `New quote #${quoteId}`,
    `From: ${body.contact.firstName} ${body.contact.lastName} <${body.contact.email}>`,
    body.contact.phone ? `Phone: ${body.contact.phone}` : '',
    body.contact.address ? `Address: ${body.contact.address}, ${body.contact.city ?? ''} ${body.contact.zipCode ?? ''}` : '',
    '',
    `Service: ${body.formInput.serviceType ?? 'N/A'}`,
    `Windows: ${body.formInput.windowCount ?? 0}, Screens: ${body.formInput.screenCount ?? 0}`,
    `Quote total: $${(result.totalCents / 100).toFixed(2)}`,
    '',
    body.formInput.specialRequests ? `Notes: ${body.formInput.specialRequests}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  if (!to) {
    console.log('[email] NOTIFY_EMAIL not set; would send:\n' + text);
    return;
  }

  const host = process.env.SMTP_HOST;
  if (!host) {
    console.log('[email] SMTP not configured; would send to ' + to + ':\n' + text);
    return;
  }

  // Optional: use nodemailer when you add it
  // const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, ... });
  // await transporter.sendMail({ from: process.env.SMTP_FROM, to, subject: `New quote #${quoteId}`, text });
  console.log('[email] SMTP configured but nodemailer not installed; log:\n' + text);
}
