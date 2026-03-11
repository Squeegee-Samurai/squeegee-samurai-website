import { Resend } from 'resend';

export type PropertyType = "residential" | "commercial";

export interface EstimateLineItem {
  label: string;
  quantity?: number;
  unit_price?: number;
  total: number;
}

export interface SubmitEstimateRequest {
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  property: {
    address: string;
    type: PropertyType;
  };
  estimate: {
    line_items: EstimateLineItem[];
    subtotal: number;
    uplift?: number;
    total: number;
  };
  notes?: string;
  timestamp: string;
  app_version?: string;
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Logo URL for the email header (fallback path can be used if no PNG is found)
const LOGO_URL = 'https://squeegeesamurai.com/images/squeegee-samurai-logo.png'; 

const getEmailHeader = () => `
  <div style="text-align: center; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #e2e8f0;">
    <img src="${LOGO_URL}" alt="Squeegee Samurai" style="height: 60px; width: auto; max-width: 100%; display: block; margin: 0 auto;" />
  </div>
`;

const getEmailFooter = () => `
  <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0; text-align: center;">
    <p style="color: #718096; font-size: 13px; line-height: 1.5; margin: 0;">
      <strong>Squeegee Samurai</strong><br/>
      <em>Clarity through Pane</em><br/>
      <a href="tel:5403351059" style="color: #e53e3e; text-decoration: none;">(540) 335-1059</a>
    </p>
  </div>
`;

export async function sendOwnerEstimateEmail(payload: SubmitEstimateRequest): Promise<void> {
  const to = process.env.OWNER_EMAIL || process.env.NOTIFY_EMAIL;
  
  if (!to) {
    console.log('[email] OWNER_EMAIL not set; skipping owner notification');
    return;
  }

  if (!resend) {
    console.log('[email] Resend not configured; would send owner notification');
    return;
  }

  const { customer, property, estimate, notes, timestamp, app_version } = payload;
  const timeString = new Date(timestamp).toLocaleString('en-US', { timeZone: 'America/New_York' });
  const subjectTotal = estimate.total.toFixed(2);
  const subject = `New Estimate Request — ${customer.name} — $${subjectTotal}`;

  const lineItemsHtml = estimate.line_items.map(item => `
    <tr style="border-bottom: 1px solid #edf2f7;">
      <td style="padding: 8px 10px; color: #2d3748;">${item.label} ${item.quantity ? `(x${item.quantity})` : ''}</td>
      <td style="padding: 8px 10px; color: #2d3748; text-align: right;">$${item.total.toFixed(2)}</td>
    </tr>
  `).join('');

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'quotes@squeegee-samurai.com',
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          ${getEmailHeader()}
          <h3 style="color: #1a202c; text-align: center; margin-top: 0;">New Estimate Request</h3>
          
          <div style="margin-bottom: 24px;">
            <h4 style="color: #4a5568; margin-bottom: 8px; border-bottom: 2px solid #e2e8f0; padding-bottom: 4px;">Customer Info</h4>
            <p style="margin: 4px 0; color: #2d3748;"><strong>Name:</strong> ${customer.name}</p>
            <p style="margin: 4px 0; color: #2d3748;"><strong>Email:</strong> <a href="mailto:${customer.email}" style="color: #e53e3e;">${customer.email}</a></p>
            ${customer.phone ? `<p style="margin: 4px 0; color: #2d3748;"><strong>Phone:</strong> ${customer.phone}</p>` : ''}
          </div>

          <div style="margin-bottom: 24px;">
            <h4 style="color: #4a5568; margin-bottom: 8px; border-bottom: 2px solid #e2e8f0; padding-bottom: 4px;">Property</h4>
            <p style="margin: 4px 0; color: #2d3748;"><strong>Address:</strong> ${property.address}</p>
            <p style="margin: 4px 0; color: #2d3748;"><strong>Type:</strong> <span style="text-transform: capitalize;">${property.type}</span></p>
          </div>

          <div style="margin-bottom: 24px;">
            <h4 style="color: #4a5568; margin-bottom: 8px; border-bottom: 2px solid #e2e8f0; padding-bottom: 4px;">Estimate Breakdown</h4>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 14px;">
              ${lineItemsHtml}
            </table>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
              <tr>
                <td style="padding: 4px 10px; color: #4a5568; text-align: right; width: 70%;"><strong>Subtotal:</strong></td>
                <td style="padding: 4px 10px; color: #2d3748; text-align: right;">$${estimate.subtotal.toFixed(2)}</td>
              </tr>
              ${estimate.uplift ? `
              <tr>
                <td style="padding: 4px 10px; color: #4a5568; text-align: right;"><strong>Uplift/Adjustments:</strong></td>
                <td style="padding: 4px 10px; color: #2d3748; text-align: right;">$${estimate.uplift.toFixed(2)}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 10px; color: #1a202c; text-align: right; font-size: 18px;"><strong>Total:</strong></td>
                <td style="padding: 8px 10px; color: #e53e3e; text-align: right; font-size: 18px; font-weight: bold;">$${estimate.total.toFixed(2)}</td>
              </tr>
            </table>
          </div>

          ${notes ? `
          <div style="margin-bottom: 24px;">
            <h4 style="color: #4a5568; margin-bottom: 8px; border-bottom: 2px solid #e2e8f0; padding-bottom: 4px;">Notes</h4>
            <p style="margin: 0; color: #2d3748; background: #f7fafc; padding: 12px; border-left: 4px solid #cbd5e0; white-space: pre-wrap;">${notes}</p>
          </div>
          ` : ''}

          <div style="font-size: 12px; color: #a0aec0; text-align: center;">
            <p>Submitted at: ${timeString}</p>
            ${app_version ? `<p>App Version: ${app_version}</p>` : ''}
          </div>

          ${getEmailFooter()}
        </div>
      `,
    });
    console.log('[email] Owner notification sent successfully');
  } catch (error) {
    console.error('[email] Failed to send owner notification:', error);
    throw error;
  }
}

export async function sendCustomerConfirmationEmail(payload: SubmitEstimateRequest): Promise<void> {
  if (!resend) {
    console.log('[email] Resend not configured; would send customer confirmation');
    return;
  }

  const { customer, property, estimate } = payload;
  const greeting = customer.name.split(' ')[0] || 'Hello';
  const subjectTotal = estimate.total.toFixed(2);

  const lineItemsHtml = estimate.line_items.map(item => `
    <tr style="border-bottom: 1px solid #edf2f7;">
      <td style="padding: 8px 10px; color: #2d3748;">${item.label} ${item.quantity ? `(x${item.quantity})` : ''}</td>
      <td style="padding: 8px 10px; color: #2d3748; text-align: right;">$${item.total.toFixed(2)}</td>
    </tr>
  `).join('');

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'quotes@squeegee-samurai.com',
      replyTo: process.env.REPLY_TO_EMAIL || process.env.OWNER_EMAIL,
      to: customer.email,
      subject: 'Your Squeegee Samurai Estimate',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          ${getEmailHeader()}
          
          <h2 style="color: #1a202c;">Hi ${greeting},</h2>
          <p style="color: #2d3748; line-height: 1.6; font-size: 16px;">
            Thank you for requesting an estimate from Squeegee Samurai. We have received your details for <strong>${property.address}</strong> and computed your pricing below.
          </p>

          <div style="margin: 24px 0; background: #f7fafc; padding: 16px; border-radius: 6px; border: 1px solid #edf2f7;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 15px;">
              ${lineItemsHtml}
            </table>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 15px; border-top: 2px solid #e2e8f0; padding-top: 8px;">
              <tr>
                <td style="padding: 8px 10px; color: #1a202c; text-align: right; font-size: 18px;"><strong>Estimated Total:</strong></td>
                <td style="padding: 8px 10px; color: #e53e3e; text-align: right; font-size: 18px; font-weight: bold;">$${subjectTotal}</td>
              </tr>
            </table>
          </div>

          <p style="color: #718096; font-size: 14px; line-height: 1.5; font-style: italic; background: #fff5f5; padding: 12px; border-left: 4px solid #feb2b2;">
            <strong>Note:</strong> This is a preliminary estimate provided via our online calculator. Final pricing is subject to visual confirmation upon arrival, depending on the condition of your windows.
          </p>

          <p style="color: #2d3748; line-height: 1.6; font-size: 16px; margin-top: 24px;">
            We will review your request and reach out shortly to discuss scheduling! If you have any immediate questions, feel free to reply directly to this email or call us.
          </p>

          ${getEmailFooter()}
        </div>
      `,
    });
    console.log('[email] Customer confirmation sent successfully');
  } catch (error) {
    console.error('[email] Failed to send customer confirmation:', error);
    throw error;
  }
}

// Keep existing APIs for contact and application intact
export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<void> {
  const to = process.env.OWNER_EMAIL || process.env.NOTIFY_EMAIL;

  if (!to) {
    console.log('[email] NOTIFY_EMAIL not set; skipping contact notification');
    return;
  }

  if (!resend) {
    console.log('[email] Resend not configured; would send contact notification');
    return;
  }

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'contact@squeegee-samurai.com',
      to,
      subject: `New Contact: ${data.subject} - ${data.name}`,
      replyTo: data.email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          ${getEmailHeader()}
          <h3 style="color: #1a202c;">New Contact Message</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          <p><strong>Subject:</strong> ${data.subject}</p>
          <div style="margin: 20px 0; padding: 15px; background: #f7fafc; border-left: 4px solid #4299e1;">
            <strong>Message:</strong><br/>
            <span style="white-space: pre-wrap;">${data.message}</span>
          </div>
          ${getEmailFooter()}
        </div>
      `
    });
  } catch (e) {
    console.error('[email] Failed to send contact email:', e);
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
  const to = process.env.OWNER_EMAIL || process.env.NOTIFY_EMAIL;
  if (!to) return;
  if (!resend) return;

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'careers@squeegee-samurai.com',
      to,
      subject: `New Job Application: ${data.position} - ${data.name}`,
      replyTo: data.email,
      html: `
         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          ${getEmailHeader()}
          <h3 style="color: #1a202c;">New Job Application</h3>
          <p><strong>Position:</strong> ${data.position}</p>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Availability:</strong> ${data.availability || 'N/A'}</p>
          <div style="margin: 20px 0; padding: 15px; background: #f7fafc; border-left: 4px solid #48bb78;">
            <strong>Experience:</strong><br/>
            <span style="white-space: pre-wrap;">${data.experience || 'N/A'}</span>
          </div>
          <div style="margin: 20px 0; padding: 15px; background: #f7fafc; border-left: 4px solid #4299e1;">
            <strong>Message:</strong><br/>
            <span style="white-space: pre-wrap;">${data.message || 'N/A'}</span>
          </div>
          ${getEmailFooter()}
        </div>
      `
    });
  } catch (e) {
    console.error('[email] Failed application email:', e);
  }
}
