/**
 * FreeEstimate - Residential Quote Calculator
 * Redesigned with Japanese minimalist aesthetic
 */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';

// Residential pricing model
const RESIDENTIAL_PRICING = {
  exteriorWindow: 10,
  interiorWindow: 7,
  screen: 5,
  secondStoryUpcharge: 2,  // per window
  thirdStoryUpcharge: 5,   // per window
};

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

const FreeEstimate = () => {
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
        contactData.requestAdvancedCleaning ? 'Requested: High Traffic with Kiritsu Clean (more info needed)' : null,
        `Estimated Price: $${quote.baseTotal.toFixed(2)}`,
      ]
        .filter(Boolean)
        .join('\n');

      const response = await fetch(`${apiUrl}/api/submit-estimate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: `${contactData.firstName} ${contactData.lastName}`.trim() || 'Residential Lead',
            email: contactData.email,
            phone: contactData.phone || undefined,
          },
          property: {
            address: contactData.propertyAddress || 'Address not provided',
            type: 'residential',
          },
          estimate: {
            line_items: [
              {
                label: `${residentialInputs.windowCount} Windows (${residentialInputs.interiorExterior}, ${residentialInputs.stories} Story)`,
                quantity: residentialInputs.windowCount,
                total: quote.windowCost,
              },
              ...(residentialInputs.screenCount > 0 ? [{
                label: `${residentialInputs.screenCount} Screens`,
                quantity: residentialInputs.screenCount,
                total: quote.screenCost,
              }] : []),
            ],
            subtotal: quote.baseTotal,
            total: quote.baseTotal,
          },
          notes: specialRequests || undefined,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server returned an error:', response.status, errorText);
        throw new Error(`Failed to submit: ${response.status} ${errorText}`);
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
    <div className="bg-washi-50">
      {/* Header */}
      <PageHeader
        subtitle="Instant Pricing"
        title={
          <span className="flex flex-col items-center justify-center gap-3 md:gap-4 md:flex-row">
            <Clock className="h-10 w-10 sm:h-12 sm:w-12" />
            <span className="text-center md:text-left">Get Your Free Estimate in 2 Minutes!</span>
          </span>
        }
        description="Tell us about your project and receive a fast, detailed pricing estimate."
        backgroundImage="/images/headers/free-estimate-header.jpg"
        showAccentLine
      />

      <div className="section-container py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="bg-white border border-sumi-100 p-8 sm:p-10">
            <h2 className="font-display text-2xl font-bold text-sumi-800 mb-1">Residential Cleaning Estimate</h2>
            <p className="text-sumi-500 mb-8">Tell us about your home and we will calculate instant pricing.</p>

            {/* Input Form */}
            <div className="space-y-6 mb-8">
              <div>
                <label className={labelClass}>Number of Windows *</label>
                <input
                  type="number"
                  min="1"
                  value={residentialInputs.windowCount || ''}
                  onChange={(e) => handleResidentialInputChange('windowCount', parseInt(e.target.value) || 0)}
                  onWheel={(e) => e.currentTarget.blur()}
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
                    onChange={(e) => handleResidentialInputChange('stories', e.target.value as any)}
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
                    onWheel={(e) => e.currentTarget.blur()}
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

            {/* Pricing Display */}
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
                <div className="mt-4 mb-4 p-5 bg-white/50 border border-indigo-200 rounded">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={contactData.requestAdvancedCleaning}
                      onChange={(e) => setContactData((prev) => ({ ...prev, requestAdvancedCleaning: e.target.checked }))}
                      className="mt-1 h-4 w-4 border-sumi-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-sumi-800">
                        Add High Traffic with <a href="/services#kiritsu" target="_blank" className="text-indigo-600 hover:text-indigo-800 underline">Kiritsu Clean</a>
                      </span>
                      <p className="text-xs text-sumi-600 mt-0.5">
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

            {/* Contact Form */}
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
                        <label className={labelClass}>Best time to contact?</label>
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
        </div>
      </div>
    </div>
  );
};

export default FreeEstimate;
