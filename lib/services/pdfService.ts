import { renderToBuffer } from '@react-pdf/renderer';
import { createClient } from '@supabase/supabase-js';
import { QuoteTemplate } from '../pdf/QuoteTemplate.js';
import type { QuoteResult, QuoteBody } from '../quoteLogic.js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface PDFResult {
  path: string;
  signedUrl: string;
  expiresAt: Date;
}

export async function generateAndUploadPDF(
  quoteId: string,
  quoteData: QuoteBody,
  result: QuoteResult
): Promise<PDFResult> {
  // 1. Generate PDF as Buffer
  // Use renderToBuffer - stable API (pdf().toBuffer() can cause circular ref errors)
  const templateElement = QuoteTemplate({
    quote: {
      id: quoteId,
      totalCents: result.totalCents,
      segment: result.segment,
      createdAt: new Date().toISOString(),
    },
    contact: quoteData.contact,
    breakdown: result.breakdown,
    lineItems: result.lineItems,
    businessName: (quoteData.formInput as any).businessName,
  });

  const pdfBuffer = await renderToBuffer(templateElement);

  // 2. Upload to Supabase Storage
  // CRITICAL: Path is INSIDE bucket (no 'quotes/' prefix)
  const year = new Date().getFullYear();
  const filePath = `${year}/${quoteId}.pdf`;

  const { error: uploadError } = await supabase.storage
    .from(process.env.SUPABASE_STORAGE_BUCKET!)
    .upload(filePath, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`PDF upload failed: ${uploadError.message}`);
  }

  // 3. Create signed URL (use seconds for precision)
  const expirySeconds = parseInt(process.env.PDF_URL_EXPIRY_SECONDS || '259200');
  const expiresAt = new Date(Date.now() + expirySeconds * 1000);

  const { data: signedData, error: signError } = await supabase.storage
    .from(process.env.SUPABASE_STORAGE_BUCKET!)
    .createSignedUrl(filePath, expirySeconds);

  if (signError) {
    throw new Error(`Signed URL generation failed: ${signError.message}`);
  }

  return {
    path: filePath,
    signedUrl: signedData.signedUrl,
    expiresAt,
  };
}
