/**
 * FreeEstimate - Dual Quote Calculator (Residential + Commercial)
 * Redesigned with Japanese minimalist aesthetic
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Building, ChevronRight, ArrowLeft, Clock } from 'lucide-react';

type ServiceType = 'residential' | 'commercial';

const PRICING = {
  weekly: { perVisit: 4.25, monthlyMultiplier: 4.33, badge: 'Best Appearance' },
  biweekly: { perVisit: 4.75, monthlyMultiplier: 2.1667, badge: 'Most Popular' },
  monthly: { perVisit: 5.5, monthlyMultiplier: 1, badge: 'Lowest Cost' },
  monthlyIO: { perVisit: 7.0, monthlyMultiplier: 1, badge: 'Interior + Exterior' },
  quarterlyIO: { perVisit: 8.0, monthlyMultiplier: 1 / 3, badge: 'Interior + Exterior' },
  oneTime: { perVisit: 15, monthlyMultiplier: 0, badge: 'One-Time' },
};

const FIRST_TIME_UPLIFT = 0.3;

// Residential pricing model
const RESIDENTIAL_PRICING = {
  exteriorWindow: 10,
  interiorWindow: 7,
  screen: 5,
  secondStoryUpcharge: 2,  // per window
  thirdStoryUpcharge: 5,   // per window
};

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
      monthlyEquivalent: paneCount * PRICING.biweekly.perVisit * PRICING.biweekly.monthlyMultiplier,
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
      monthlyEquivalent: paneCount * PRICING.monthlyIO.perVisit * PRICING.monthlyIO.monthlyMultiplier,
    },
    {
      tier: 'Quarterly Interior + Exterior',
      badge: PRICING.quarterlyIO.badge,
      perVisit: paneCount * PRICING.quarterlyIO.perVisit,
      monthlyEquivalent: paneCount * PRICING.quarterlyIO.perVisit * PRICING.quarterlyIO.monthlyMultiplier,
    },
    {
      tier: 'One-Time Clean',
      badge: PRICING.oneTime.badge,
      perVisit: paneCount * PRICING.oneTime.perVisit,
      monthlyEquivalent: 0,
    },
  ];

  if (applyFirstTimeUplift) {
    tiers.forEach((t) => {
      if (t.tier !== 'One-Time Clean') {
        t.firstTimeUplift = t.perVisit * FIRST_TIME_UPLIFT;
      }
    });
  }
  return tiers;
}

// Residential pricing interfaces and calculation
interface ResidentialInputs {
  windowCount: number;
  interiorExterior: 'Exterior Only' | 'Interior + Exterior';
  stories: '1' | '2' | '3' | '4+';
  screenCount: number;
  serviceFrequency: string;
}

interface ResidentialQuote {
  baseTotal: number;
  windowCost: number;
  screenCost: number;
  breakdown: {
    windows: number;
    windowRate: string;
    stories: string;
    screens: number;
  };
}

function calculateResidentialQuote(inputs: ResidentialInputs): ResidentialQuote {
  const { windowCount, interiorExterior, stories, screenCount } = inputs;
  
  // Base window cost
  let windowCost = 0;
  if (interiorExterior === 'Exterior Only') {
    windowCost = windowCount * RESIDENTIAL_PRICING.exteriorWindow;
  } else {
    // Interior + Exterior: both sides charged
    windowCost = windowCount * (RESIDENTIAL_PRICING.interiorWindow + RESIDENTIAL_PRICING.exteriorWindow);
  }
  
  // Story upcharge
  if (stories === '2') {
    windowCost += windowCount * RESIDENTIAL_PRICING.secondStoryUpcharge;
  } else if (stories === '3' || stories === '4+') {
    windowCost += windowCount * RESIDENTIAL_PRICING.thirdStoryUpcharge;
  }
  
  // Screen cost
  const screenCost = screenCount * RESIDENTIAL_PRICING.screen;
  
  return {
    baseTotal: windowCost + screenCost,
    windowCost,
    screenCost,
    breakdown: {
      windows: windowCount,
      windowRate: interiorExterior,
      stories,
      screens: screenCount,
    }
  };
}

/* ── Shared input styling ─────────────────────────── */
const inputClass =
  'w-full border border-sumi-200 bg-white px-4 py-3 text-sumi-800 placeholder:text-sumi-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors';
const selectClass = inputClass;
const labelClass = 'block text-sm font-medium text-sumi-600 mb-1.5';

/* ── MAIN COMPONENT ───────────────────────────────── */
const FreeEstimate = () => {
  const navigate = useNavigate();
  
  /* Safe API URL Handling: handles '/' from Vercel env */
  const getApiUrl = () => {
    let url = import.meta.env.VITE_API_URL;
    if (url === '/') return ''; // Fix common Vercel config setting
    if (url) return url;
    return import.meta.env.PROD ? '' : 'http://localhost:3000';
  };
  const apiUrl = getApiUrl();
  console.log('Vercel Sync Test: [Active] | API Target:', apiUrl || '(relative)');
  const [serviceType, setServiceType] = useState<ServiceType>('commercial');

  /* Commercial state */
  const [inputs, setInputs] = useState<QuoteInputs>({
    businessName: '',
    paneCount: 0,
    applyFirstTimeUplift: false,
  });
  const [selectedTier, setSelectedTier] = useState('Biweekly Exterior');
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);

  const quotes = useMemo(() => calculateQuotes(inputs), [inputs]);
  const selectedQuote = useMemo(() => quotes.find((q) => q.tier === selectedTier), [quotes, selectedTier]);

  const handleInputChange = (field: keyof QuoteInputs, value: string | number | boolean) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleGetQuote = () => {
    setShowContactForm(true);
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

      const specialRequests = [
        inputs.businessName ? `Business: ${inputs.businessName}` : null,
        contactInfo.notes ? `Notes: ${contactInfo.notes}` : null,
        inputs.requestAdvancedCleaning ? 'Requested: High Traffic with Kutaritsu Clean (more info needed)' : null,
      ]
        .filter(Boolean)
        .join('\n');

      const response = await fetch(`${apiUrl}/api/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: { firstName: '', lastName: '', email: contactInfo.email, phone: contactInfo.phone || undefined },
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
        navigate('/thank-you', { state: { estimatedQuote: result.total, tier: selectedTier, isEstimate: true } });
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
    <div className="bg-washi-50">
      {/* Header */}
      <section className="border-b border-sumi-100 bg-sumi-800 py-20 text-center text-washi-50">
        <div className="section-container">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sumi-300 mb-3">Instant Pricing</p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance flex items-center justify-center gap-3">
            <Clock className="h-10 w-10 sm:h-12 sm:w-12" />
            Get Your Free Estimate in 2 Minutes!
          </h1>
          <div className="mx-auto mt-4 h-px w-12 bg-aka-600" />
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-sumi-300">
            Tell us about your project and receive a fast, detailed pricing estimate.
          </p>
        </div>
      </section>

      <div className="section-container py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          {/* Service Type Toggle Switch */}
          <div className="mb-10 flex justify-center">
            <div className="relative inline-flex rounded-full border border-sumi-200 bg-sumi-50 p-1">
              {/* Sliding background indicator */}
              <div
                className="absolute top-1 bottom-1 rounded-full bg-sumi-800 transition-all duration-300 ease-in-out"
                style={{
                  left: serviceType === 'residential' ? '4px' : '50%',
                  width: 'calc(50% - 4px)',
                }}
              />
              <button
                onClick={() => setServiceType('residential')}
                className={`relative z-10 flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-300 ${
                  serviceType === 'residential'
                    ? 'text-washi-50'
                    : 'text-sumi-500 hover:text-sumi-700'
                }`}
              >
                <Home className="h-4 w-4" />
                Residential
              </button>
              <button
                onClick={() => setServiceType('commercial')}
                className={`relative z-10 flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-300 ${
                  serviceType === 'commercial'
                    ? 'text-washi-50'
                    : 'text-sumi-500 hover:text-sumi-700'
                }`}
              >
                <Building className="h-4 w-4" />
                Commercial
              </button>
            </div>
          </div>

          {serviceType === 'commercial' ? (
            <div className="bg-white border border-sumi-100 p-8 sm:p-10">
              <h2 className="font-display text-2xl font-bold text-sumi-800 mb-1">
                Commercial Storefront Pricing
              </h2>
              <p className="text-sumi-500 mb-8">
                Ground-level storefront window cleaning. Takes less than 2 minutes.
              </p>

              {/* Step 1 */}
              <div className="space-y-5 mb-10">
                <div>
                  <label className={labelClass}>Business Name (optional)</label>
                  <input
                    type="text"
                    value={inputs.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className={inputClass}
                    placeholder="Your business name"
                  />
                </div>
                <div>
                  <label className={labelClass}>{'Number of Panes *'}</label>
                  <input
                    type="number"
                    min="0"
                    value={inputs.paneCount || ''}
                    onChange={(e) => handleInputChange('paneCount', parseInt(e.target.value) || 0)}
                    className={inputClass + ' text-lg'}
                    placeholder="e.g. 12"
                    required
                  />
                  <p className="mt-1 text-xs text-sumi-400">Count individual panes (including divided lights).</p>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inputs.applyFirstTimeUplift}
                    onChange={(e) => handleInputChange('applyFirstTimeUplift', e.target.checked)}
                    className="h-4 w-4 border-sumi-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-sumi-600">
                    {'Apply first-time "Restore to Standard" uplift (+30%)'}
                  </span>
                </label>
              </div>

              {/* Step 2: Pricing Table */}
              {inputs.paneCount > 0 && (
                <>
                  <div className="mb-6">
                    <h3 className="font-display text-xl font-semibold text-sumi-800 mb-1">Your Pricing Estimates</h3>
                    <p className="text-sm text-sumi-500">Select a service tier below.</p>
                  </div>

                  <div className="overflow-x-auto mb-8 border border-sumi-100">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-sumi-50 text-sumi-500">
                          <th className="px-4 py-3 text-center w-12 font-medium" />
                          <th className="px-4 py-3 text-left font-medium">Service Tier</th>
                          <th className="px-4 py-3 text-right font-medium">Per Visit</th>
                          <th className="px-4 py-3 text-right font-medium">Monthly Equiv.</th>
                          {inputs.applyFirstTimeUplift && <th className="px-4 py-3 text-right font-medium">First-Time</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {quotes.map((quote) => (
                          <tr
                            key={quote.tier}
                            onClick={() => setSelectedTier(quote.tier)}
                            className={`cursor-pointer border-t border-sumi-100 transition-colors ${
                              selectedTier === quote.tier
                                ? 'bg-indigo-50'
                                : 'hover:bg-washi-100'
                            }`}
                          >
                            <td className="px-4 py-3 text-center">
                              <input
                                type="radio"
                                checked={selectedTier === quote.tier}
                                onChange={() => setSelectedTier(quote.tier)}
                                className="h-4 w-4 text-indigo-600 border-sumi-300 focus:ring-indigo-500"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <div className="font-medium text-sumi-800">{quote.tier}</div>
                              {quote.badge && (
                                <span className={`mt-1 inline-block text-xs px-2 py-0.5 ${
                                  quote.badge === 'Most Popular'
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'bg-sumi-100 text-sumi-500'
                                }`}>
                                  {quote.badge}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-sumi-800">
                              ${quote.perVisit.toFixed(2)}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-sumi-800">
                              {quote.monthlyEquivalent > 0 ? `$${quote.monthlyEquivalent.toFixed(2)}` : '\u2014'}
                            </td>
                            {inputs.applyFirstTimeUplift && (
                              <td className="px-4 py-3 text-right text-aka-600 font-medium">
                                {quote.firstTimeUplift ? `+$${quote.firstTimeUplift.toFixed(2)}` : '\u2014'}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Advanced Cleaning Option */}
                  <div className="mt-6 mb-6 p-4 bg-gradient-to-br from-indigo-50 to-washi-50 border border-indigo-100 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inputs.requestAdvancedCleaning || false}
                        onChange={(e) => setInputs((prev) => ({ ...prev, requestAdvancedCleaning: e.target.checked }))}
                        className="mt-1 h-4 w-4 border-sumi-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div>
                        <span className="text-sm font-medium text-sumi-800">
                          Add High Traffic with Kutaritsu Clean
                        </span>
                        <p className="text-xs text-sumi-600 mt-1">
                          More information will be included in your final estimate
                        </p>
                      </div>
                    </label>
                  </div>

                  {!showContactForm && (
                    <div className="text-center">
                      <button onClick={handleGetQuote} className="btn-primary gap-2">
                        Get Detailed Quote
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Step 3: Contact */}
              {showContactForm && selectedQuote && (
                <div id="contact-section" className="mt-10 border-t border-sumi-100 pt-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-xl font-semibold text-sumi-800">Request Detailed Quote</h3>
                    <button
                      onClick={() => setShowContactForm(false)}
                      className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Change Selection
                    </button>
                  </div>

                  {/* Summary */}
                  <div className="mb-8 bg-sumi-50 p-5 border border-sumi-100">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-sumi-800 text-washi-50 text-xs px-3 py-1">
                        {selectedQuote.tier}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-sumi-500">Per-Visit:</span>
                        <span className="ml-2 font-semibold text-sumi-800">${selectedQuote.perVisit.toFixed(2)}</span>
                      </div>
                      {selectedQuote.monthlyEquivalent > 0 && (
                        <div>
                          <span className="text-sumi-500">Monthly:</span>
                          <span className="ml-2 font-semibold text-sumi-800">${selectedQuote.monthlyEquivalent.toFixed(2)}</span>
                        </div>
                      )}
                      {selectedQuote.firstTimeUplift && (
                        <div className="col-span-2">
                          <span className="text-sumi-500">First-Time Uplift:</span>
                          <span className="ml-2 font-semibold text-aka-600">+${selectedQuote.firstTimeUplift.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-5 mb-8">
                    <div>
                      <label className={labelClass}>{'Email Address *'}</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo((p) => ({ ...p, email: e.target.value }))}
                        className={inputClass}
                        required
                      />
                      <p className="mt-1 text-xs text-sumi-400">{"We'll send your detailed quote here."}</p>
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number (optional)</label>
                      <input
                        type="tel"
                        placeholder="(555) 555-5555"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo((p) => ({ ...p, phone: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Additional Notes (optional)</label>
                      <textarea
                        placeholder="Any special requirements or questions..."
                        value={contactInfo.notes}
                        onChange={(e) => setContactInfo((p) => ({ ...p, notes: e.target.value }))}
                        className={inputClass + ' h-24 resize-none'}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={submitting || !contactInfo.email}
                    className="w-full btn-primary py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting...' : 'Email My Quote'}
                  </button>
                  <p className="mt-3 text-center text-xs text-sumi-400">
                    {"Final pricing is confirmed after review. We'll be in touch within 24 hours."}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <ResidentialForm />
          )}
        </div>
      </div>
    </div>
  );
};

/* ── RESIDENTIAL FORM ─────────────────────────────── */
const ResidentialForm = () => {
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  /* Safe API URL Handling: handles '/' from Vercel env */
  const getApiUrl = () => {
    let url = import.meta.env.VITE_API_URL;
    if (url === '/') return ''; // Fix common Vercel config setting
    if (url) return url;
    return import.meta.env.PROD ? '' : 'http://localhost:3000';
  };
  const apiUrl = getApiUrl();
  console.log('Residential Form API Target:', apiUrl || '(relative)');

  // Step 1: Basic pricing inputs
  const [residentialInputs, setResidentialInputs] = useState<ResidentialInputs>({
    windowCount: 0,
    interiorExterior: 'Exterior Only',
    stories: '1',
    screenCount: 0,
    serviceFrequency: 'One-Time',
  });

  // Step 2: Contact and additional details
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    city: '',
    zipCode: '',
    propertyType: '',
    additionalServices: [] as string[],
    preferredContact: '',
    bestTimeToCall: '',
    couponCode: '',
    requestAdvancedCleaning: false,
  });

  // Calculate live pricing
  const quote = useMemo(() => calculateResidentialQuote(residentialInputs), [residentialInputs]);

  const handleResidentialInputChange = (field: keyof ResidentialInputs, value: any) => {
    setResidentialInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field: string, value: any) => {
    setContactData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (service: string, checked: boolean) => {
    setContactData((prev) => ({
      ...prev,
      additionalServices: checked
        ? [...prev.additionalServices, service]
        : prev.additionalServices.filter((s) => s !== service),
    }));
  };

  const handleGetQuote = () => {
    setShowContactForm(true);
    setTimeout(() => {
      document.getElementById('residential-contact-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = async () => {
    if (!contactData.email) {
      alert('Please enter your email address to receive the detailed quote.');
      return;
    }

    setSubmitting(true);

    try {


      const specialRequests = [
        contactData.couponCode ? `Coupon: ${contactData.couponCode}` : null,
        contactData.preferredContact ? `Preferred Contact: ${contactData.preferredContact}` : null,
        contactData.bestTimeToCall ? `Best Time: ${contactData.bestTimeToCall}` : null,
        contactData.requestAdvancedCleaning ? 'Requested: High Traffic with Kutaritsu Clean (more info needed)' : null,
        `Estimated Price: $${quote.baseTotal.toFixed(2)}`,
      ]
        .filter(Boolean)
        .join('\n');

      const response = await fetch(`${apiUrl}/api/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: {
            firstName: contactData.firstName,
            lastName: contactData.lastName,
            email: contactData.email,
            phone: contactData.phone || undefined,
          },
          formInput: {
            propertyType: 'Residential',
            serviceType: residentialInputs.serviceFrequency,
            windowCount: residentialInputs.windowCount,
            screenCount: residentialInputs.screenCount,
            additionalServices: contactData.additionalServices,
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
    <div className="bg-white border border-sumi-100 p-8 sm:p-10">
      <h2 className="font-display text-2xl font-bold text-sumi-800 mb-1">Residential Cleaning Estimate</h2>
      <p className="text-sumi-500 mb-8">Tell us about your home and we will calculate instant pricing.</p>

      {/* Step 1: Input Form */}
      <div className="space-y-6 mb-8">
        <div>
          <label className={labelClass}>Number of Windows *</label>
          <input
            type="number"
            min="1"
            value={residentialInputs.windowCount || ''}
            onChange={(e) => handleResidentialInputChange('windowCount', parseInt(e.target.value) || 0)}
            className={inputClass}
            placeholder="e.g. 20"
          />
        </div>

        <div>
          <label className={labelClass}>Interior / Exterior *</label>
          <select
            value={residentialInputs.interiorExterior}
            onChange={(e) => handleResidentialInputChange('interiorExterior', e.target.value)}
            className={selectClass}
          >
            <option value="Exterior Only">Exterior Only</option>
            <option value="Interior + Exterior">Interior + Exterior</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Number of Stories *</label>
            <select
              value={residentialInputs.stories}
              onChange={(e) => handleResidentialInputChange('stories', e.target.value)}
              className={selectClass}
            >
              <option value="1">1 Story</option>
              <option value="2">2 Stories</option>
              <option value="3">3 Stories</option>
              <option value="4+">4+ Stories</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Number of Screens</label>
            <input
              type="number"
              min="0"
              value={residentialInputs.screenCount || ''}
              onChange={(e) => handleResidentialInputChange('screenCount', parseInt(e.target.value) || 0)}
              className={inputClass}
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Service Frequency</label>
          <select
            value={residentialInputs.serviceFrequency}
            onChange={(e) => handleResidentialInputChange('serviceFrequency', e.target.value)}
            className={selectClass}
          >
            <option value="One-Time">One-Time</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Bi-Annually">Bi-Annually</option>
            <option value="Annually">Annually</option>
          </select>
          <p className="mt-1 text-xs text-sumi-400">You can change this anytime</p>
        </div>
      </div>

      {/* Step 2: Pricing Display */}
      {residentialInputs.windowCount > 0 && (
        <div className="mb-8 p-6 bg-gradient-to-br from-indigo-50 to-washi-50 border border-indigo-100 rounded-lg">
          <h3 className="font-display text-xl font-semibold text-sumi-800 mb-4">Your Estimated Pricing</h3>
          
          {/* Pricing Breakdown */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-sumi-600">
                {residentialInputs.windowCount} {residentialInputs.interiorExterior === 'Exterior Only' ? 'Exterior' : 'Interior + Exterior'} Windows
              </span>
              <span className="font-medium text-sumi-800">${quote.windowCost.toFixed(2)}</span>
            </div>
            {residentialInputs.screenCount > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-sumi-600">{residentialInputs.screenCount} Screens</span>
                <span className="font-medium text-sumi-800">${quote.screenCost.toFixed(2)}</span>
              </div>
            )}
            {residentialInputs.stories !== '1' && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-sumi-600">
                  {residentialInputs.stories === '2' ? '2nd Story' : '3rd Story+'} Upcharge
                </span>
                <span className="font-medium text-sumi-800">
                  +${(residentialInputs.stories === '2' 
                    ? RESIDENTIAL_PRICING.secondStoryUpcharge 
                    : RESIDENTIAL_PRICING.thirdStoryUpcharge) * residentialInputs.windowCount}.00
                </span>
              </div>
            )}
            <div className="pt-3 border-t border-indigo-200">
              <div className="flex justify-between items-center">
                <span className="font-display text-base font-semibold text-sumi-800">
                  Total Estimate ({residentialInputs.serviceFrequency})
                </span>
                <span className="font-display text-2xl font-bold text-indigo-700">
                  ${quote.baseTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-sumi-500 italic">
            *Prices shown are base estimates. Final pricing confirmed after on-site evaluation.
          </p>

          {/* Advanced Cleaning Option */}
          <div className="mt-4 mb-4 p-4 bg-white/50 border border-indigo-200 rounded">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={contactData.requestAdvancedCleaning}
                onChange={(e) => setContactData((prev) => ({ ...prev, requestAdvancedCleaning: e.target.checked }))}
                className="mt-1 h-4 w-4 border-sumi-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div>
                <span className="text-sm font-medium text-sumi-800">
                  Add High Traffic with Kutaritsu Clean
                </span>
                <p className="text-xs text-sumi-600 mt-1">
                  More information will be included in your final estimate
                </p>
              </div>
            </label>
          </div>

          {!showContactForm && (
            <button
              onClick={handleGetQuote}
              className="mt-6 w-full btn-primary py-4 text-base gap-2"
            >
              Get Detailed Quote
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Step 3: Contact Form */}
      {showContactForm && (
        <div id="residential-contact-section" className="border-t border-sumi-200 pt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-xl font-semibold text-sumi-800">Your Contact Information</h3>
            <button
              onClick={() => setShowContactForm(false)}
              className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Change Selection
            </button>
          </div>

          <div className="space-y-6">
            {/* Contact Info */}
            <fieldset>
              <legend className="font-display text-base font-semibold text-sumi-700 mb-4">Contact</legend>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>First Name *</label>
                  <input
                    type="text"
                    required
                    value={contactData.firstName}
                    onChange={(e) => handleContactChange('firstName', e.target.value)}
                    className={inputClass}
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label className={labelClass}>Last Name *</label>
                  <input
                    type="text"
                    required
                    value={contactData.lastName}
                    onChange={(e) => handleContactChange('lastName', e.target.value)}
                    className={inputClass}
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className={inputClass}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone *</label>
                  <input
                    type="tel"
                    required
                    value={contactData.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    className={inputClass}
                    placeholder="(555) 555-5555"
                  />
                </div>
              </div>
            </fieldset>

            {/* Property Info */}
            <fieldset>
              <legend className="font-display text-base font-semibold text-sumi-700 mb-4">Property</legend>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Address *</label>
                  <input
                    type="text"
                    required
                    value={contactData.propertyAddress}
                    onChange={(e) => handleContactChange('propertyAddress', e.target.value)}
                    className={inputClass}
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <label className={labelClass}>City *</label>
                  <input
                    type="text"
                    required
                    value={contactData.city}
                    onChange={(e) => handleContactChange('city', e.target.value)}
                    className={inputClass}
                    placeholder="Leesburg"
                  />
                </div>
                <div>
                  <label className={labelClass}>ZIP *</label>
                  <input
                    type="text"
                    required
                    value={contactData.zipCode}
                    onChange={(e) => handleContactChange('zipCode', e.target.value)}
                    className={inputClass}
                    placeholder="20176"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className={labelClass}>Property Type *</label>
                <select
                  required
                  value={contactData.propertyType}
                  onChange={(e) => handleContactChange('propertyType', e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select property</option>
                  <option value="Single Family Home">Single Family Home</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Condo">Condo</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </fieldset>

            {/* Additional Services */}
            <fieldset>
              <legend className="font-display text-base font-semibold text-sumi-700 mb-4">Additional Services (optional)</legend>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {['Screen cleaning', 'Window sill cleaning', 'Frame cleaning', 'Pressure washing', 'Gutter cleaning', 'Solar panel cleaning'].map((service) => (
                  <label key={service} className="flex items-center gap-3 cursor-pointer py-1">
                    <input
                      type="checkbox"
                      checked={contactData.additionalServices.includes(service)}
                      onChange={(e) => handleCheckboxChange(service, e.target.checked)}
                      className="h-4 w-4 border-sumi-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-sumi-600">{service}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Contact Preferences */}
            <fieldset>
              <legend className="font-display text-base font-semibold text-sumi-700 mb-4">Contact Preferences (optional)</legend>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Preferred Contact</label>
                  <select
                    value={contactData.preferredContact}
                    onChange={(e) => handleContactChange('preferredContact', e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="Text">Text</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Best Time to Call</label>
                  <select
                    value={contactData.bestTimeToCall}
                    onChange={(e) => handleContactChange('bestTimeToCall', e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select</option>
                    <option value="Morning (8am-12pm)">Morning (8am-12pm)</option>
                    <option value="Afternoon (12pm-5pm)">Afternoon (12pm-5pm)</option>
                    <option value="Evening (5pm-8pm)">Evening (5pm-8pm)</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className={labelClass}>Coupon Code</label>
                <input
                  type="text"
                  value={contactData.couponCode}
                  onChange={(e) => handleContactChange('couponCode', e.target.value)}
                  className={inputClass}
                  placeholder="Enter code"
                />
              </div>
            </fieldset>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={submitting || !contactData.email}
              className="w-full btn-primary py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Email My Quote'}
            </button>

            <p className="text-xs text-center text-sumi-400 leading-relaxed">
              *All quotes are estimates subject to change upon on-site evaluation. Final pricing may vary based on window height, condition, accessibility, and safety requirements. We strive to provide accurate estimates but reserve the right to adjust pricing to reflect the actual scope of work.
            </p>
            <p className="text-center text-sm text-sumi-500">
              We'll contact you within 24 hours with your detailed quote.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeEstimate;
