/**
 * FreeEstimate - Dual Quote Calculator (Residential + Commercial)
 * Redesigned with Japanese minimalist aesthetic
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Building, ChevronRight, ArrowLeft } from 'lucide-react';

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

/* ── Shared input styling ─────────────────────────── */
const inputClass =
  'w-full border border-sumi-200 bg-white px-4 py-3 text-sumi-800 placeholder:text-sumi-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors';
const selectClass = inputClass;
const labelClass = 'block text-sm font-medium text-sumi-600 mb-1.5';

/* ── MAIN COMPONENT ───────────────────────────────── */
const FreeEstimate = () => {
  const navigate = useNavigate();
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
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
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
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance">
            Get Your Free Estimate
          </h1>
          <div className="mx-auto mt-4 h-px w-12 bg-aka-600" />
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-sumi-300">
            Tell us about your project and receive an instant pricing estimate. Detailed quotes delivered within 24 hours.
          </p>
        </div>
      </section>

      <div className="section-container py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          {/* Service Type Toggle */}
          <div className="mb-10 flex justify-center gap-3">
            <button
              onClick={() => setServiceType('residential')}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                serviceType === 'residential'
                  ? 'bg-sumi-800 text-washi-50'
                  : 'border border-sumi-200 bg-white text-sumi-600 hover:border-sumi-400'
              }`}
            >
              <Home className="h-4 w-4" />
              Residential
            </button>
            <button
              onClick={() => setServiceType('commercial')}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                serviceType === 'commercial'
                  ? 'bg-sumi-800 text-washi-50'
                  : 'border border-sumi-200 bg-white text-sumi-600 hover:border-sumi-400'
              }`}
            >
              <Building className="h-4 w-4" />
              Commercial
            </button>
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
      if (!response.ok) throw new Error('Failed to submit');
      navigate('/thank-you');
    } catch (err) {
      console.error('Quote submission failed:', err);
      alert('Failed to submit quote request. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-sumi-100 p-8 sm:p-10">
      <h2 className="font-display text-2xl font-bold text-sumi-800 mb-1">Residential Estimate</h2>
      <p className="text-sumi-500 mb-8">Tell us about your home and we will prepare a custom quote.</p>

      {/* Contact */}
      <fieldset className="mb-10">
        <legend className="font-display text-lg font-semibold text-sumi-800 mb-4">Contact Information</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div><label className={labelClass}>First Name *</label><input type="text" required value={formData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} className={inputClass} placeholder="First Name" /></div>
          <div><label className={labelClass}>Last Name *</label><input type="text" required value={formData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} className={inputClass} placeholder="Last Name" /></div>
          <div><label className={labelClass}>Email *</label><input type="email" required value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className={inputClass} placeholder="your@email.com" /></div>
          <div><label className={labelClass}>Phone *</label><input type="tel" required value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className={inputClass} placeholder="(555) 555-5555" /></div>
        </div>
      </fieldset>

      {/* Property */}
      <fieldset className="mb-10">
        <legend className="font-display text-lg font-semibold text-sumi-800 mb-4">Property Information</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div><label className={labelClass}>Address *</label><input type="text" required value={formData.propertyAddress} onChange={(e) => handleInputChange('propertyAddress', e.target.value)} className={inputClass} placeholder="123 Main St" /></div>
          <div><label className={labelClass}>City *</label><input type="text" required value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} className={inputClass} placeholder="Leesburg" /></div>
          <div><label className={labelClass}>ZIP *</label><input type="text" required value={formData.zipCode} onChange={(e) => handleInputChange('zipCode', e.target.value)} className={inputClass} placeholder="20176" /></div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Property Type *</label>
            <select required value={formData.propertyType} onChange={(e) => handleInputChange('propertyType', e.target.value)} className={selectClass}>
              <option value="">Select property</option>
              <option value="Single Family Home">Single Family Home</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Condo">Condo</option>
              <option value="Apartment">Apartment</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Interior / Exterior *</label>
            <select required value={formData.interiorExterior} onChange={(e) => handleInputChange('interiorExterior', e.target.value)} className={selectClass}>
              <option value="">Select option</option>
              <option value="Exterior Only">Exterior Only</option>
              <option value="Interior + Exterior">Interior + Exterior</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* Project Details */}
      <fieldset className="mb-10">
        <legend className="font-display text-lg font-semibold text-sumi-800 mb-4">Project Details</legend>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Number of Windows *</label>
            <input type="number" min="1" required value={formData.windowCount} onChange={(e) => handleInputChange('windowCount', e.target.value)} className={inputClass} placeholder="e.g. 20" />
          </div>
          <div>
            <label className={labelClass}>Photos (optional)</label>
            <input type="file" multiple accept="image/*" onChange={handleFileChange} className={inputClass} />
            <p className="mt-1 text-xs text-sumi-400">Clear photos of windows or problem areas (JPG/PNG)</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Number of Stories</label>
              <select value={formData.stories} onChange={(e) => handleInputChange('stories', e.target.value)} className={selectClass}>
                <option value="">Select</option>
                <option value="1">1 Story</option>
                <option value="2">2 Stories</option>
                <option value="3">3 Stories</option>
                <option value="4+">4+ Stories</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Number of Screens</label>
              <input type="number" min="0" value={formData.screens} onChange={(e) => handleInputChange('screens', e.target.value)} className={inputClass} placeholder="0" />
            </div>
          </div>
          <div>
            <label className={labelClass}>Service Frequency</label>
            <select value={formData.serviceFrequency} onChange={(e) => handleInputChange('serviceFrequency', e.target.value)} className={selectClass}>
              <option value="">Select an option</option>
              <option value="One-Time">One-Time</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Bi-Annually">Bi-Annually</option>
              <option value="Annually">Annually</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* Additional Services */}
      <fieldset className="mb-10">
        <legend className="font-display text-lg font-semibold text-sumi-800 mb-4">Additional Services</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {['Screen cleaning', 'Window sill cleaning', 'Frame cleaning', 'Pressure washing', 'Gutter cleaning', 'Solar panel cleaning'].map((service) => (
            <label key={service} className="flex items-center gap-3 cursor-pointer py-1">
              <input
                type="checkbox"
                checked={formData.additionalServices.includes(service)}
                onChange={(e) => handleCheckboxChange(service, e.target.checked)}
                className="h-4 w-4 border-sumi-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-sumi-600">{service}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Preferences */}
      <fieldset className="mb-10">
        <legend className="font-display text-lg font-semibold text-sumi-800 mb-4">Contact Preferences</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Preferred Contact</label>
            <select value={formData.preferredContact} onChange={(e) => handleInputChange('preferredContact', e.target.value)} className={selectClass}>
              <option value="">Select</option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
              <option value="Text">Text</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Best Time to Call</label>
            <select value={formData.bestTimeToCall} onChange={(e) => handleInputChange('bestTimeToCall', e.target.value)} className={selectClass}>
              <option value="">Select</option>
              <option value="Morning (8am-12pm)">Morning (8am-12pm)</option>
              <option value="Afternoon (12pm-5pm)">Afternoon (12pm-5pm)</option>
              <option value="Evening (5pm-8pm)">Evening (5pm-8pm)</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className={labelClass}>Coupon Code (optional)</label>
          <input type="text" value={formData.couponCode} onChange={(e) => handleInputChange('couponCode', e.target.value)} className={inputClass} placeholder="Enter code" />
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={submitting}
        className="w-full btn-primary py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Submitting...' : 'Get My Free Estimate'}
      </button>

      <p className="mt-4 text-xs text-center text-sumi-400 leading-relaxed">
        {'*All quotes are estimates subject to change upon on-site evaluation. Final pricing may vary based on window height, condition, accessibility, and safety requirements. We strive to provide accurate estimates but reserve the right to adjust pricing to reflect the actual scope of work.'}
      </p>
      <p className="mt-2 text-center text-sm text-sumi-500">
        {"We'll contact you within 24 hours with your detailed quote."}
      </p>
    </form>
  );
};

export default FreeEstimate;
