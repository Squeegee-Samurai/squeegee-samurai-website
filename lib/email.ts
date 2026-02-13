import { Resend } from 'resend';
import type { QuoteBody, QuoteResult } from './quoteLogic.js';

// Initialize Resend (falls back to null if API key not set)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Send quote PDF email to customer
 * Handles commercial contact fields (businessName fallback)
 */
export async function sendQuoteEmail(
  recipientEmail: string,
  businessName: string | undefined,
  pdfUrl: string,
  quoteId: string,
  expiresAt: Date
): Promise<void> {
  if (!resend) {
    console.log('[email] Resend not configured; would send quote email to:', recipientEmail);
    console.log('[email] PDF URL:', pdfUrl);
    return;
  }

  const expiryDate = expiresAt.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Commercial MVP: use businessName or fallback to generic greeting
  const greeting = businessName ? `Hi ${businessName} team` : 'Hello';

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'quotes@squeegee-samurai.com',
      to: recipientEmail,
      subject: 'Your Squeegee Samurai Quote is Ready',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a202c;">${greeting},</h2>
          <p style="color: #2d3748; line-height: 1.6;">
            Thank you for requesting a quote from Squeegee Samurai. We've prepared a detailed 
            estimate based on your requirements.
          </p>
          <div style="margin: 30px 0; text-align: center;">
            <a href="${pdfUrl}" 
               style="background-color: #e53e3e; color: white; padding: 14px 28px; 
                      text-decoration: none; border-radius: 4px; font-weight: bold; 
                      display: inline-block;">
              View Your Quote (PDF)
            </a>
          </div>
          <p style="color: #718096; font-size: 14px;">
            This link expires on <strong>${expiryDate}</strong>.
          </p>
          <p style="color: #2d3748; line-height: 1.6;">
            Questions? Reply to this email or call us at <strong>(540) 335-1059</strong>.
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
          <p style="color: #718096; font-size: 13px; line-height: 1.5;">
            —<br/>
            The Squeegee Samurai Team<br/>
            <em>Clarity through Pane</em>
          </p>
        </div>
      `,
    });
    console.log('[email] Quote email sent successfully to:', recipientEmail);
  } catch (error) {
    console.error('[email] Failed to send quote email:', error);
    throw error;
  }
}

/**
 * Send lead notification to owner with quote details and PDF link
 */
export async function sendOwnerNotification(
  quoteData: QuoteBody,
  result: QuoteResult,
  quoteId: string,
  pdfUrl: string
): Promise<void> {
  const to = process.env.NOTIFY_EMAIL;
  
  if (!to) {
    console.log('[email] NOTIFY_EMAIL not set; skipping owner notification');
    return;
  }

  if (!resend) {
    console.log('[email] Resend not configured; would send owner notification');
    console.log(`[email] Quote #${quoteId} - $${(result.totalCents / 100).toFixed(2)}`);
    return;
  }

  // Handle commercial flow (no first/last name) - use businessName or email
  const businessName = (quoteData.formInput as any).businessName;
  const contactName = businessName 
    || (quoteData.contact.firstName && quoteData.contact.lastName
        ? `${quoteData.contact.firstName} ${quoteData.contact.lastName}`
        : quoteData.contact.email);

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'quotes@squeegee-samurai.com',
      to,
      subject: `New Quote: ${contactName} - $${(result.totalCents / 100).toFixed(2)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h3 style="color: #1a202c;">New Quote Received</h3>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px; color: #4a5568; font-weight: bold;">Quote ID:</td>
              <td style="padding: 10px; color: #1a202c;">${quoteId}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px; color: #4a5568; font-weight: bold;">Contact:</td>
              <td style="padding: 10px; color: #1a202c;">${contactName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px; color: #4a5568; font-weight: bold;">Email:</td>
              <td style="padding: 10px; color: #1a202c;">${quoteData.contact.email}</td>
            </tr>
            ${quoteData.contact.phone ? `
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px; color: #4a5568; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; color: #1a202c;">${quoteData.contact.phone}</td>
            </tr>
            ` : ''}
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px; color: #4a5568; font-weight: bold;">Service Type:</td>
              <td style="padding: 10px; color: #1a202c;">${quoteData.formInput.serviceType || 'N/A'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px; color: #4a5568; font-weight: bold;">Total:</td>
              <td style="padding: 10px; color: #e53e3e; font-weight: bold; font-size: 18px;">
                $${(result.totalCents / 100).toFixed(2)}
              </td>
            </tr>
          </table>
          ${quoteData.formInput.specialRequests ? `
          <div style="margin: 20px 0; padding: 15px; background: #f7fafc; border-left: 4px solid #4299e1;">
            <strong style="color: #2d3748;">Special Requests:</strong><br/>
            <span style="color: #4a5568;">${quoteData.formInput.specialRequests}</span>
          </div>
          ` : ''}
          <div style="margin: 30px 0; text-align: center;">
            <a href="${pdfUrl}" 
               style="background-color: #e53e3e; color: white; padding: 14px 28px; 
                      text-decoration: none; border-radius: 4px; font-weight: bold; 
                      display: inline-block;">
              View Quote PDF
            </a>
          </div>
        </div>
      `,
    });
    console.log('[email] Owner notification sent successfully');
  } catch (error) {
    console.error('[email] Failed to send owner notification:', error);
    throw error;
  }
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<void> {
  const to = process.env.NOTIFY_EMAIL;

  if (!to) {
    console.log('[email] NOTIFY_EMAIL not set; skipping contact notification');
    return;
  }

  if (!resend) {
    console.log('[email] Resend not configured; would send contact notification');
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'contact@squeegee-samurai.com',
      to,
      subject: `New Contact: ${data.subject} - ${data.name}`,
      replyTo: data.email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h3 style="color: #1a202c;">New Contact Message</h3>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
             <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px; color: #4a5568; font-weight: bold;">Name:</td>
              <td style="padding: 10px; color: #1a202c;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px; color: #4a5568; font-weight: bold;">Email:</td>
              <td style="padding: 10px; color: #1a202c;">${data.email}</td>
            </tr>
            ${data.phone ? `
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px; color: #4a5568; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; color: #1a202c;">${data.phone}</td>
            </tr>
            ` : ''}
             <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px; color: #4a5568; font-weight: bold;">Subject:</td>
              <td style="padding: 10px; color: #1a202c;">${data.subject}</td>
            </tr>
          </table>
          <div style="margin: 20px 0; padding: 15px; background: #f7fafc; border-left: 4px solid #4299e1;">
            <strong style="color: #2d3748;">Message:</strong><br/>
            <span style="color: #4a5568; white-space: pre-wrap;">${data.message}</span>
          </div>
        </div>
      `,
    });
    console.log('[email] Contact notification sent successfully');
  } catch (error) {
    console.error('[email] Failed to send contact notification:', error);
    throw error;
  }
}

export async function sendApplicationEmail(data: {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience?: string;
  availability?: string;
  message?: string;
}): Promise<void> {
  const to = process.env.NOTIFY_EMAIL;

  if (!to) {
    console.log('[email] NOTIFY_EMAIL not set; skipping application notification');
    return;
  }

  if (!resend) {
    console.log('[email] Resend not configured; would send application notification');
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'careers@squeegee-samurai.com',
      to,
      subject: `New Job Application: ${data.position} - ${data.name}`,
      replyTo: data.email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h3 style="color: #1a202c;">New Job Application</h3>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
             <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px; color: #4a5568; font-weight: bold;">Position:</td>
              <td style="padding: 10px; color: #1a202c;">${data.position}</td>
            </tr>
             <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px; color: #4a5568; font-weight: bold;">Name:</td>
              <td style="padding: 10px; color: #1a202c;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px; color: #4a5568; font-weight: bold;">Email:</td>
              <td style="padding: 10px; color: #1a202c;">${data.email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px; color: #4a5568; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; color: #1a202c;">${data.phone}</td>
            </tr>
             <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px; color: #4a5568; font-weight: bold;">Availability:</td>
              <td style="padding: 10px; color: #1a202c;">${data.availability || 'N/A'}</td>
            </tr>
          </table>
          <div style="margin: 20px 0; padding: 15px; background: #f7fafc; border-left: 4px solid #48bb78;">
            <strong style="color: #2d3748;">Experience:</strong><br/>
            <span style="color: #4a5568; white-space: pre-wrap;">${data.experience || 'N/A'}</span>
          </div>
          <div style="margin: 20px 0; padding: 15px; background: #f7fafc; border-left: 4px solid #4299e1;">
            <strong style="color: #2d3748;">Message:</strong><br/>
            <span style="color: #4a5568; white-space: pre-wrap;">${data.message || 'N/A'}</span>
          </div>
        </div>
      `,
    });
    console.log('[email] Application notification sent successfully');
  } catch (error) {
    console.error('[email] Failed to send application notification:', error);
    throw error;
  }
}
