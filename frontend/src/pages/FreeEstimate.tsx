/**
 * FreeEstimate – Dual Quote Calculator (Residential + Commercial)
 * 
 * - Service type selector: Residential or Commercial
 * - Commercial: Stepped calculator with pricing table (per mvp_update_2_4_730.md)
 * - Residential: Traditional comprehensive form
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Building } from 'lucide-react';

type ServiceType = 'residential' | 'commercial';

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
  
  const [serviceType, setServiceType] = useState<ServiceType>('commercial');

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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 px-4 py-8">
      <div className="flex justify-center">
        <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-2xl">
          <h2 className="text-4xl text-center text-orange-500 font-bold mb-4">
            Get Your Free Estimate
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Tell us about your project and we'll provide a free estimated quote and a detailed quote within 24 hours.
          </p>

          {/* Service Type Selector */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setServiceType('residential')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                serviceType === 'residential'
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-primary-500 text-white hover:bg-primary-600'
              }`}
            >
              <Home className="w-5 h-5" />
              Residential
            </button>
            <button
              onClick={() => setServiceType('commercial')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                serviceType === 'commercial'
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-primary-500 text-white hover:bg-primary-600'
              }`}
            >
              <Building className="w-5 h-5" />
              Commercial
            </button>
          </div>

          {serviceType === 'commercial' ? (
            <>
              <h3 className="text-2xl text-center text-gray-800 font-semibold mb-2">
                Commercial Storefront Pricing Estimator
              </h3>
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
            </>
          ) : (
            <ResidentialForm />
          )}
        </div>
      </div>
    </div>
  );
};

// Residential Form Component
const ResidentialForm = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    city: '',
    zipCode: '',
    propertyType: '',
    interiorExterior: '',
    windowCount: '',
    photos: null as File[] | null,
    stories: '',
    screens: '',
    serviceFrequency: '',
    additionalServices: [] as string[],
    preferredContact: '',
    bestTimeToCall: '',
    couponCode: '',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (service: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      additionalServices: checked
        ? [...prev.additionalServices, service]
        : prev.additionalServices.filter((s) => s !== service),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, photos: Array.from(e.target.files!) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.windowCount) {
      alert('Please fill in all required fields (email and number of windows).');
      return;
    }

    setSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

      const specialRequests = [
        formData.couponCode ? `Coupon: ${formData.couponCode}` : null,
        formData.preferredContact ? `Preferred Contact: ${formData.preferredContact}` : null,
        formData.bestTimeToCall ? `Best Time: ${formData.bestTimeToCall}` : null,
      ]
        .filter(Boolean)
        .join('\n');

      const response = await fetch(`${apiUrl}/api/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone || undefined,
          },
          formInput: {
            propertyType: 'Residential',
            serviceType: formData.serviceFrequency,
            windowCount: parseInt(formData.windowCount) || 0,
            screenCount: parseInt(formData.screens) || 0,
            additionalServices: formData.additionalServices,
            specialRequests: specialRequests || undefined,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      const data = await response.json();
      console.log('Quote submitted:', data);

      navigate('/thank-you');
    } catch (err) {
      console.error('Quote submission failed:', err);
      alert('Failed to submit quote request. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name *"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full"
            required
          />
          <input
            type="text"
            placeholder="Last Name *"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full"
            required
          />
          <input
            type="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full"
            required
          />
        </div>
      </div>

      {/* Property Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Property Address *"
            value={formData.propertyAddress}
            onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full"
            required
          />
          <input
            type="text"
            placeholder="City *"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full"
            required
          />
          <input
            type="text"
            placeholder="ZIP Code *"
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <select
            value={formData.propertyType}
            onChange={(e) => handleInputChange('propertyType', e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full"
            required
          >
            <option value="">Select property</option>
            <option value="Single Family Home">Single Family Home</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Condo">Condo</option>
            <option value="Apartment">Apartment</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={formData.interiorExterior}
            onChange={(e) => handleInputChange('interiorExterior', e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full"
            required
          >
            <option value="">Interior + Exterior</option>
            <option value="Exterior Only">Exterior Only</option>
            <option value="Interior + Exterior">Interior + Exterior</option>
          </select>
        </div>
      </div>

      {/* Project Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Windows
            </label>
            <input
              type="number"
              placeholder="Enter a number (min 1)"
              min="1"
              value={formData.windowCount}
              onChange={(e) => handleInputChange('windowCount', e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photos (optional)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 rounded-md p-3 w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Add clear photos of windows or problem areas (JPG/PNG)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Stories
              </label>
              <select
                value={formData.stories}
                onChange={(e) => handleInputChange('stories', e.target.value)}
                className="border border-gray-300 rounded-md p-3 w-full"
              >
                <option value="">Select stories</option>
                <option value="1">1 Story</option>
                <option value="2">2 Stories</option>
                <option value="3">3 Stories</option>
                <option value="4+">4+ Stories</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Screens
              </label>
              <input
                type="number"
                placeholder="Enter a number (min 1)"
                min="0"
                value={formData.screens}
                onChange={(e) => handleInputChange('screens', e.target.value)}
                className="border border-gray-300 rounded-md p-3 w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Desired Service Frequency
            </label>
            <select
              value={formData.serviceFrequency}
              onChange={(e) => handleInputChange('serviceFrequency', e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full"
            >
              <option value="">Select an option</option>
              <option value="One-Time">One-Time</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Bi-Annually">Bi-Annually</option>
              <option value="Annually">Annually</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">You can change this anytime.</p>
          </div>
        </div>
      </div>

      {/* Additional Services */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Services</h3>
        <div className="space-y-2">
          {[
            'Screen cleaning',
            'Window sill cleaning',
            'Frame cleaning',
            'Pressure washing',
            'Gutter cleaning',
            'Solar panel cleaning',
          ].map((service) => (
            <label key={service} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.additionalServices.includes(service)}
                onChange={(e) => handleCheckboxChange(service, e.target.checked)}
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">{service}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Contact Preferences */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Contact
            </label>
            <select
              value={formData.preferredContact}
              onChange={(e) => handleInputChange('preferredContact', e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full"
            >
              <option value="">Select an option</option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
              <option value="Text">Text</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">We'll use this for follow-up on your quote.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Best Time to Call
            </label>
            <select
              value={formData.bestTimeToCall}
              onChange={(e) => handleInputChange('bestTimeToCall', e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full"
            >
              <option value="">Choose a time window</option>
              <option value="Morning (8am-12pm)">Morning (8am-12pm)</option>
              <option value="Afternoon (12pm-5pm)">Afternoon (12pm-5pm)</option>
              <option value="Evening (5pm-8pm)">Evening (5pm-8pm)</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Coupon Code (optional)"
            value={formData.couponCode}
            onChange={(e) => handleInputChange('couponCode', e.target.value)}
            className="border border-gray-300 rounded-md p-3 w-full"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-orange-500 text-white px-6 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md"
      >
        {submitting ? 'Submitting...' : 'Get My Free Estimate'}
      </button>

      <p className="text-xs text-center text-gray-500">
        *Please note that all quotes provided are estimates and are subject to change upon on-site
        evaluation. Final pricing may vary based on factors such as: Window height, Window condition,
        Special equipment requirements, Accessibility challenges, Windows located on third-floor or
        higher, Additional charges due to the increased time, labor, and safety measures required. We
        strive to provide accurate estimates, but reserve the right to adjust pricing to reflect the
        actual scope of work.
      </p>
      <p className="text-center text-gray-600 mt-2">
        We'll contact you within 24 hours with your detailed quote.
      </p>
    </form>
  );
};

export default FreeEstimate;
