/**
 * FreeEstimate – Commercial Storefront Quote Calculator (MVP)
 * 
 * Updated per mvp_update_2_4_730.md:
 * - Guided estimator pattern (estimates on-page, quote via email)
 * - Single tier selection in pricing table (clickable rows)
 * - Default to Biweekly Exterior (Most Popular)
 * - "Get Detailed Quote" CTA reveals contact form
 * - Simplified contact fields (email required, phone/notes optional)
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// Pricing constants per MVP (per pane)
const PRICING = {
  weekly: { perVisit: 4.25, monthlyMultiplier: 4.33, badge: 'Best Appearance' },
  biweekly: { perVisit: 4.75, monthlyMultiplier: 2.1667, badge: 'Most Popular' },
  monthly: { perVisit: 5.5, monthlyMultiplier: 1, badge: 'Lowest Cost' },
  monthlyIO: { perVisit: 7.0, monthlyMultiplier: 1, badge: 'Interior + Exterior' },
  quarterlyIO: { perVisit: 8.0, monthlyMultiplier: 1 / 3, badge: 'Interior + Exterior' },
  oneTime: { perVisit: 15, monthlyMultiplier: 0, badge: 'One-Time' },
};

const FIRST_TIME_UPLIFT = 0.3; // +30%

interface QuoteInputs {
  businessName: string;
  paneCount: number;
  applyFirstTimeUplift: boolean;
}

interface TierQuote {
  tier: string;
  badge?: string;
  perVisit: number;
  monthlyEquivalent: number;
  firstTimeUplift?: number;
}

function calculateQuotes(inputs: QuoteInputs): TierQuote[] {
  const { paneCount, applyFirstTimeUplift } = inputs;

  const tiers: TierQuote[] = [
    {
      tier: 'Weekly Exterior',
      badge: PRICING.weekly.badge,
      perVisit: paneCount * PRICING.weekly.perVisit,
      monthlyEquivalent: paneCount * PRICING.weekly.perVisit * PRICING.weekly.monthlyMultiplier,
    },
    {
      tier: 'Biweekly Exterior',
      badge: PRICING.biweekly.badge,
      perVisit: paneCount * PRICING.biweekly.perVisit,
      monthlyEquivalent:
        paneCount * PRICING.biweekly.perVisit * PRICING.biweekly.monthlyMultiplier,
    },
    {
      tier: 'Monthly Exterior',
      badge: PRICING.monthly.badge,
      perVisit: paneCount * PRICING.monthly.perVisit,
      monthlyEquivalent: paneCount * PRICING.monthly.perVisit * PRICING.monthly.monthlyMultiplier,
    },
    {
      tier: 'Monthly Interior + Exterior',
      badge: PRICING.monthlyIO.badge,
      perVisit: paneCount * PRICING.monthlyIO.perVisit,
      monthlyEquivalent:
        paneCount * PRICING.monthlyIO.perVisit * PRICING.monthlyIO.monthlyMultiplier,
    },
    {
      tier: 'Quarterly Interior + Exterior',
      badge: PRICING.quarterlyIO.badge,
      perVisit: paneCount * PRICING.quarterlyIO.perVisit,
      monthlyEquivalent:
        paneCount * PRICING.quarterlyIO.perVisit * PRICING.quarterlyIO.monthlyMultiplier,
    },
    {
      tier: 'One-Time Clean',
      badge: PRICING.oneTime.badge,
      perVisit: paneCount * PRICING.oneTime.perVisit,
      monthlyEquivalent: 0,
    },
  ];

  // Apply first-time uplift if selected
  if (applyFirstTimeUplift) {
    tiers.forEach((t) => {
      if (t.tier !== 'One-Time Clean') {
        t.firstTimeUplift = t.perVisit * FIRST_TIME_UPLIFT;
      }
    });
  }

  return tiers;
}

const FreeEstimate = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState<QuoteInputs>({
    businessName: '',
    paneCount: 0,
    applyFirstTimeUplift: false,
  });

  const [selectedTier, setSelectedTier] = useState<string>('Biweekly Exterior'); // Default
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const quotes = useMemo(() => calculateQuotes(inputs), [inputs]);
  const selectedQuote = useMemo(
    () => quotes.find((q) => q.tier === selectedTier),
    [quotes, selectedTier]
  );

  const handleInputChange = (field: keyof QuoteInputs, value: string | number | boolean) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleGetQuote = () => {
    setShowContactForm(true);
    // Scroll contact form into view
    setTimeout(() => {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = async () => {
    if (!contactInfo.email) {
      alert('Please enter your email address to receive the detailed quote.');
      return;
    }

    if (!selectedQuote) return;

    setSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

      // Build special requests from business name + notes
      const specialRequests = [
        inputs.businessName ? `Business: ${inputs.businessName}` : null,
        contactInfo.notes ? `Notes: ${contactInfo.notes}` : null,
      ]
        .filter(Boolean)
        .join('\n');

      const response = await fetch(`${apiUrl}/api/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: {
            firstName: '', // Not collected in this flow
            lastName: '',
            email: contactInfo.email,
            phone: contactInfo.phone || undefined,
          },
          formInput: {
            propertyType: 'Commercial',
            serviceType: selectedTier,
            windowCount: inputs.paneCount,
            screenCount: 0,
            additionalServices: inputs.applyFirstTimeUplift ? ['First-Time Uplift'] : [],
            specialRequests: specialRequests || undefined,
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        navigate('/thank-you', {
          state: {
            estimatedQuote: result.total,
            tier: selectedTier,
            isEstimate: true,
          },
        });
      } else {
        alert(`Error: ${result.error || 'Failed to submit quote request'}`);
      }
    } catch (err) {
      console.error('Quote submission failed:', err);
      alert('Failed to submit quote request. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="parallax-clouds min-h-screen bg-neutral-50 px-4 py-8">
      <div className="flex justify-center">
        <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-2xl">
          <h2 className="text-4xl text-center text-orange-500 font-bold mb-4">
            Commercial Storefront Pricing Estimator
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Get instant pricing estimates for ground-level storefront window cleaning. Takes less
            than 2 minutes.
          </p>

          {/* Step 1: Input Section */}
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name (optional)
              </label>
              <input
                type="text"
                value={inputs.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className="border border-gray-300 rounded-md p-3 w-full"
                placeholder="Your business name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Panes *
              </label>
              <input
                type="number"
                min="0"
                value={inputs.paneCount || ''}
                onChange={(e) => handleInputChange('paneCount', parseInt(e.target.value) || 0)}
                className="border border-gray-300 rounded-md p-3 w-full text-lg"
                placeholder="e.g. 12"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Count individual panes (including divided lights).
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="firstTimeUplift"
                checked={inputs.applyFirstTimeUplift}
                onChange={(e) => handleInputChange('applyFirstTimeUplift', e.target.checked)}
                className="mr-3 h-5 w-5"
              />
              <label htmlFor="firstTimeUplift" className="text-sm text-gray-700">
                Apply first-time "Restore to Standard" uplift (+30%)
              </label>
            </div>
          </div>

          {/* Step 2: Pricing Table with Tier Selection */}
          {inputs.paneCount > 0 && (
            <>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Your Pricing Estimates
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Select a service tier. Pricing shown is an estimate; we'll send a detailed quote
                after review.
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-center w-12">Select</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">Service Tier</th>
                      <th className="border border-gray-300 px-4 py-3 text-right">
                        Per Visit Estimate
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-right">
                        Monthly Equivalent
                      </th>
                      {inputs.applyFirstTimeUplift && (
                        <th className="border border-gray-300 px-4 py-3 text-right">
                          First-Time Uplift
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((quote) => (
                      <tr
                        key={quote.tier}
                        onClick={() => setSelectedTier(quote.tier)}
                        className={`cursor-pointer transition-colors ${
                          selectedTier === quote.tier
                            ? 'bg-orange-50 border-l-4 border-l-orange-500'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          <input
                            type="radio"
                            checked={selectedTier === quote.tier}
                            onChange={() => setSelectedTier(quote.tier)}
                            className="h-4 w-4 text-orange-500"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          <div className="font-medium">{quote.tier}</div>
                          {quote.badge && (
                            <span className="inline-block bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded mt-1">
                              {quote.badge}
                            </span>
                          )}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-right font-semibold">
                          ${quote.perVisit.toFixed(2)}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-right font-semibold">
                          {quote.monthlyEquivalent > 0
                            ? `$${quote.monthlyEquivalent.toFixed(2)}`
                            : '—'}
                        </td>
                        {inputs.applyFirstTimeUplift && (
                          <td className="border border-gray-300 px-4 py-3 text-right text-orange-600">
                            {quote.firstTimeUplift
                              ? `+$${quote.firstTimeUplift.toFixed(2)}`
                              : '—'}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {!showContactForm && (
                <div className="text-center">
                  <button
                    onClick={handleGetQuote}
                    className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors shadow-md"
                  >
                    Get Detailed Quote
                  </button>
                </div>
              )}
            </>
          )}

          {/* Step 3: Contact & Delivery Section */}
          {showContactForm && selectedQuote && (
            <div
              id="contact-section"
              className="mt-8 p-6 bg-gradient-to-br from-orange-50 to-white rounded-lg border-2 border-orange-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  Request Your Detailed Quote
                </h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-sm text-orange-600 hover:text-orange-700 underline"
                >
                  ← Change Selection
                </button>
              </div>

              {/* Selected Tier Summary */}
              <div className="bg-white p-4 rounded-md border border-orange-200 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block bg-orange-500 text-white text-sm px-3 py-1 rounded-full">
                    Selected: {selectedQuote.tier}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Per-Visit Estimate:</span>
                    <span className="font-bold ml-2">${selectedQuote.perVisit.toFixed(2)}</span>
                  </div>
                  {selectedQuote.monthlyEquivalent > 0 && (
                    <div>
                      <span className="text-gray-600">Monthly Equivalent:</span>
                      <span className="font-bold ml-2">
                        ${selectedQuote.monthlyEquivalent.toFixed(2)}
                      </span>
                    </div>
                  )}
                  {selectedQuote.firstTimeUplift && (
                    <div className="col-span-2">
                      <span className="text-gray-600">First-Time Uplift:</span>
                      <span className="font-bold text-orange-600 ml-2">
                        +${selectedQuote.firstTimeUplift.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={contactInfo.email}
                    onChange={(e) =>
                      setContactInfo((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="border border-gray-300 rounded-md p-3 w-full"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We'll send your detailed quote to this address.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="(555) 555-5555"
                    value={contactInfo.phone}
                    onChange={(e) =>
                      setContactInfo((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="border border-gray-300 rounded-md p-3 w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (optional)
                  </label>
                  <textarea
                    placeholder="Any special requirements or questions..."
                    value={contactInfo.notes}
                    onChange={(e) =>
                      setContactInfo((prev) => ({ ...prev, notes: e.target.value }))
                    }
                    className="border border-gray-300 rounded-md p-3 w-full h-24 resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={submitting || !contactInfo.email}
                className="w-full bg-orange-500 text-white px-6 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md"
              >
                {submitting ? 'Submitting...' : 'Email My Quote'}
              </button>
              <p className="text-xs text-center text-gray-500 mt-3">
                Final pricing is confirmed after review. We'll be in touch within 24 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreeEstimate;
