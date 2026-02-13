import React from 'react';
import { join } from 'node:path';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Logo path: api runs with cwd=api/, logo lives at src/pdf/assets/
const LOGO_PATH = join(process.cwd(), 'src', 'pdf', 'assets', 'SSamurai_Logo.png');

// Japanese minimalist aesthetic with professional layout
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

interface QuoteTemplateProps {
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
  // Handle commercial flow (no first/last name) - use businessName or email
  const preparedFor = businessName 
    ? businessName 
    : contact.firstName && contact.lastName
      ? `${contact.firstName} ${contact.lastName}`
      : contact.email;

  const formattedDate = quote.createdAt 
    ? new Date(quote.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const totalDollars = (quote.totalCents / 100).toFixed(2);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src={LOGO_PATH} style={styles.logo} />
          <View style={styles.headerText}>
            <Text style={styles.companyName}>Squeegee Samurai Free Estimate</Text>
            <Text style={styles.tagline}>Clarity through Pane</Text>
          </View>
        </View>

        {/* Quote Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quote Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Quote ID:</Text>
            <Text style={styles.value}>{quote.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Prepared For:</Text>
            <Text style={styles.value}>{preparedFor}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{contact.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{formattedDate}</Text>
          </View>
          {quote.segment && (
            <View style={styles.row}>
              <Text style={styles.label}>Service Type:</Text>
              <Text style={styles.value}>{quote.segment}</Text>
            </View>
          )}
        </View>

        {/* Pricing Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          <View style={styles.pricingTable}>
            {breakdown && Object.entries(breakdown).map(([key, value]) => (
              <View key={key} style={styles.pricingRow}>
                <Text style={styles.pricingLabel}>{key}</Text>
                <Text style={styles.pricingValue}>
                  {typeof value === 'number' ? `$${value.toFixed(2)}` : value}
                </Text>
              </View>
            ))}
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Estimate</Text>
              <Text style={styles.totalValue}>${totalDollars}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.disclaimerText}>
            *All quotes are estimates subject to change upon on-site evaluation. Final pricing may vary based on 
            window height, condition, accessibility, and safety requirements. We strive to provide accurate 
            estimates but reserve the right to adjust pricing to reflect the actual scope of work.
          </Text>
          <Text style={styles.contactInfo}>
            Questions? Contact us at (540) 335-1059 or email@squeegee-samurai.com
          </Text>
        </View>
      </Page>
    </Document>
  );
}
