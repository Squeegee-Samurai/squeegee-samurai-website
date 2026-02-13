import { Router, Request, Response } from 'express';
import { renderToBuffer } from '@react-pdf/renderer';
import { QuoteTemplate } from './pdf/QuoteTemplate.js';

export const testPdfRouter = Router();

/**
 * GET /api/test-pdf
 * Renders a sample PDF for testing the template design
 */
testPdfRouter.get('/test-pdf', async (req: Request, res: Response) => {
  try {
    // Sample data for testing
    const sampleQuote = {
      id: 'test-quote-12345',
      totalCents: 45000, // $450.00
      segment: 'Residential',
      createdAt: new Date().toISOString(),
    };

    const sampleContact = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
    };

    const sampleBreakdown = {
      'Window Cleaning (20 windows)': 200.00,
      'Screen Cleaning (10 screens)': 50.00,
      '2nd Story Upcharge': 40.00,
      'Service Frequency': 'One-Time',
    };

    const sampleBusinessName = 'Test Business Inc.';

    // Generate PDF using renderToBuffer (stable API, avoids pdf().toBuffer() circular ref issues)
    const templateElement = QuoteTemplate({
      quote: sampleQuote,
      contact: sampleContact,
      breakdown: sampleBreakdown,
      businessName: sampleBusinessName,
    });

    const pdfBuffer = await renderToBuffer(templateElement);

    // Set headers to display PDF in browser
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="test-quote.pdf"');
    res.send(pdfBuffer);

    console.log('[test-pdf] Generated sample PDF successfully');
  } catch (error) {
    console.error('[test-pdf] Failed to generate PDF:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate test PDF',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});
