import React from 'react';
import { join } from 'node:path';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Logo path: api runs with cwd=api/, logo lives at src/pdf/assets/ -> ../lib/pdf/assets/
// But for Vercel, we need to be careful with paths.
// Let's assume it's deployed flat or try to resolve relative to this file.
// Actually, let's use a public URL for the logo if possible to avoid filesystem issues, 
// OR just try to resolve it relative to __dirname (but in ES modules that's tricky).
// Reverting to process.cwd() logic but adjusted for the move to lib/.
// If running in /var/task/api/, the logo is likely in /var/task/lib/pdf/assets/
const LOGO_PATH = join(process.cwd(), 'lib', 'pdf', 'assets', 'SSamurai_Logo.png');

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#2d3748',
  },
  header: {
    marginBottom: 30,
    borderBottom: '2px solid #e53e3e',
    paddingBottom: 15,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  headerText: {
    flexDirection: 'column',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 11,
    color: '#718096',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 10,
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    width: '40%',
    fontSize: 10,
    color: '#4a5568',
  },
  value: {
    width: '60%',
    fontSize: 10,
    color: '#1a202c',
    fontWeight: 'bold',
  },
  pricingTable: {
    marginTop: 10,
    borderTop: '1px solid #e2e8f0',
    paddingTop: 10,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  pricingLabel: {
    fontSize: 11,
    color: '#4a5568',
  },
  pricingValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 15,
    borderTop: '2px solid #2d3748',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e53e3e',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    paddingTop: 15,
    borderTop: '1px solid #e2e8f0',
  },
  disclaimerText: {
    fontSize: 8,
    color: '#718096',
    lineHeight: 1.4,
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 9,
    color: '#4a5568',
    textAlign: 'center',
  },
});

export interface QuoteTemplateProps {
  quote: {
    id: string;
    totalCents: number;
    segment?: string;
    createdAt?: string;
  };
  contact: {
    email: string;
    firstName?: string;
    lastName?: string;
  };
  breakdown: Record<string, any>;
  businessName?: string;
}

export function QuoteTemplate({ quote, contact, breakdown, businessName }: QuoteTemplateProps) {
  const preparedFor = businessName 
    ? businessName 
    : contact.firstName && contact.lastName
      ? `${contact.firstName} ${contact.lastName}`
      : contact.email;

  const formattedDate = quote.createdAt 
    ? new Date(quote.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const totalDollars = (quote.totalCents / 100).toFixed(2);

  // Helper to create elements more clearly
  const e = React.createElement;

  return e(Document, {},
    e(Page, { size: "A4", style: styles.page },
      // Header
      e(View, { style: styles.header },
        e(Image, { src: LOGO_PATH, style: styles.logo }),
        e(View, { style: styles.headerText },
          e(Text, { style: styles.companyName }, "Squeegee Samurai Free Estimate"),
          e(Text, { style: styles.tagline }, "Clarity through Pane")
        )
      ),

      // Quote Details
      e(View, { style: styles.section },
        e(Text, { style: styles.sectionTitle }, "Quote Details"),
        e(View, { style: styles.row },
          e(Text, { style: styles.label }, "Quote ID:"),
          e(Text, { style: styles.value }, quote.id)
        ),
        e(View, { style: styles.row },
          e(Text, { style: styles.label }, "Prepared For:"),
          e(Text, { style: styles.value }, preparedFor)
        ),
        e(View, { style: styles.row },
          e(Text, { style: styles.label }, "Email:"),
          e(Text, { style: styles.value }, contact.email)
        ),
        e(View, { style: styles.row },
          e(Text, { style: styles.label }, "Date:"),
          e(Text, { style: styles.value }, formattedDate)
        ),
        quote.segment && e(View, { style: styles.row },
          e(Text, { style: styles.label }, "Service Type:"),
          e(Text, { style: styles.value }, quote.segment)
        )
      ),

      // Pricing
      e(View, { style: styles.section },
        e(Text, { style: styles.sectionTitle }, "Pricing"),
        e(View, { style: styles.pricingTable },
          breakdown && Object.entries(breakdown).map(([key, value]) => 
            e(View, { key, style: styles.pricingRow },
              e(Text, { style: styles.pricingLabel }, key),
              e(Text, { style: styles.pricingValue }, 
                typeof value === 'number' ? `$${value.toFixed(2)}` : value
              )
            )
          ),
          e(View, { style: styles.totalRow },
            e(Text, { style: styles.totalLabel }, "Total Estimate"),
            e(Text, { style: styles.totalValue }, `$${totalDollars}`)
          )
        )
      ),

      // Footer
      e(View, { style: styles.footer },
        e(Text, { style: styles.disclaimerText }, 
          "*All quotes are estimates subject to change upon on-site evaluation. Final pricing may vary based on window height, condition, accessibility, and safety requirements. We strive to provide accurate estimates but reserve the right to adjust pricing to reflect the actual scope of work."
        ),
        e(Text, { style: styles.contactInfo }, 
          "Questions? Contact us at (540) 335-1059 or email@squeegee-samurai.com"
        )
      )
    )
  );
}
