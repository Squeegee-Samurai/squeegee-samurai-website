import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, CheckCircle, Phone, Mail } from 'lucide-react';

/* this quoting tool routes back to log-in. all quoting is actually done in freeestimate.tsx */

const Quoting = () => {
  const [formData, setFormData] = useState({
    countType: 'windows',
    paneCount: 0,
    panesPerWindow: 2,
    tier: '1.0',
    frequency: '0',
    addons: [] as string[],
  });

  const [quoteTotal, setQuoteTotal] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculateQuote = () => {
    const baseRate = 10;
    let paneCount = parseInt(String(formData.paneCount)) || 0;

    if (formData.countType === 'windows') {
      const panesPerWindow = parseInt(String(formData.panesPerWindow)) || 2;
      paneCount *= panesPerWindow;
    }

    const tierMultiplier = parseFloat(formData.tier);
    const discount = parseFloat(formData.frequency);

    let total = baseRate * paneCount * tierMultiplier;
    total -= total * discount;

    formData.addons.forEach((addonValue) => {
      total += parseFloat(addonValue);
    });

    setQuoteTotal(total);
  };

  useEffect(() => {
    calculateQuote();
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      if (target.checked) {
        setFormData((prev) => ({ ...prev, addons: [...prev.addons, value] }));
      } else {
        setFormData((prev) => ({ ...prev, addons: prev.addons.filter((a) => a !== value) }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-washi-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-sumi-100 p-8 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center bg-indigo-50">
              <CheckCircle className="h-7 w-7 text-indigo-500" />
            </div>
            <h1 className="font-display text-2xl font-bold text-sumi-800 mb-3">Quote Submitted!</h1>
            <p className="text-sm text-sumi-500 mb-6">
              {"We'll be in touch soon with your detailed quote."}
            </p>
            <div className="bg-sumi-50 border border-sumi-100 p-6 mb-6">
              <h3 className="font-display text-sm font-semibold text-sumi-600 mb-2">Your Estimated Quote</h3>
              <p className="font-display text-3xl font-bold text-indigo-600">${quoteTotal.toFixed(2)}</p>
              <p className="text-xs text-sumi-400 mt-2">*Final quote may vary based on site inspection</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="tel:5403351059"
                className="inline-flex items-center justify-center bg-sumi-800 text-washi-50 px-6 py-3 text-sm font-medium tracking-wide hover:bg-sumi-700 transition-colors gap-2"
              >
                <Phone className="h-4 w-4" /> (540) 335-1059
              </a>
              <button
                onClick={() => setIsSubmitted(false)}
                className="border border-sumi-200 text-sumi-700 px-6 py-3 text-sm font-medium tracking-wide hover:bg-sumi-50 transition-colors"
              >
                Create Another Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const selectClass = 'w-full px-4 py-2.5 border border-sumi-200 text-sm focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-colors bg-white';
  const inputClass = 'w-full px-4 py-2.5 border border-sumi-200 text-sm focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-colors';

  return (
    <div className="bg-washi-50">
      {/* Hero */}
      <section className="bg-sumi-800 py-20 text-washi-50">
        <div className="section-container text-center">
          <Calculator className="mx-auto mb-6 h-12 w-12 text-sumi-400" />
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sumi-300 mb-3">Instant Pricing</p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance">
            Quote Calculator
          </h1>
          <div className="mx-auto mt-4 h-px w-12 bg-aka-600" />
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-sumi-300">
            Get an instant estimate for your window cleaning project
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="bg-white border border-sumi-100 p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Left */}
              <div className="space-y-5">
                <h2 className="font-display text-xl font-semibold text-sumi-800 mb-6">Project Details</h2>

                <div>
                  <label className="block text-sm font-medium text-sumi-700 mb-2">How would you like to count?</label>
                  <div className="space-y-2">
                    {[{ value: 'windows', label: 'Count by Windows' }, { value: 'panes', label: 'Count by Panes' }].map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer">
                        <input type="radio" name="countType" value={opt.value} checked={formData.countType === opt.value} onChange={handleInputChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-400 border-sumi-300" />
                        <span className="text-sm text-sumi-700">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sumi-700 mb-1.5">
                    {formData.countType === 'windows' ? 'Number of Windows' : 'Number of Panes'}
                  </label>
                  <input type="number" name="paneCount" value={formData.paneCount} onChange={handleInputChange} min="0" className={inputClass} />
                </div>

                {formData.countType === 'windows' && (
                  <div>
                    <label className="block text-sm font-medium text-sumi-700 mb-1.5">Panes per Window (average)</label>
                    <select name="panesPerWindow" value={formData.panesPerWindow} onChange={handleInputChange} className={selectClass}>
                      <option value="1">1 pane</option>
                      <option value="2">2 panes</option>
                      <option value="3">3 panes</option>
                      <option value="4">4 panes</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-sumi-700 mb-1.5">Service Level</label>
                  <select name="tier" value={formData.tier} onChange={handleInputChange} className={selectClass}>
                    <option value="0.8">Basic (Exterior only)</option>
                    <option value="1.0">Standard (Interior & Exterior)</option>
                    <option value="1.3">Premium (Full service + extras)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sumi-700 mb-1.5">Service Frequency</label>
                  <select name="frequency" value={formData.frequency} onChange={handleInputChange} className={selectClass}>
                    <option value="0">One-time service</option>
                    <option value="0.1">Bi-annual (10% discount)</option>
                    <option value="0.15">Quarterly (15% discount)</option>
                    <option value="0.2">Monthly (20% discount)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sumi-700 mb-2">Additional Services</label>
                  <div className="space-y-2">
                    {[
                      { label: 'Screen cleaning', value: '25' },
                      { label: 'Pressure washing', value: '150' },
                      { label: 'Gutter cleaning', value: '200' },
                      { label: 'Solar panel cleaning', value: '100' },
                    ].map((addon) => (
                      <label key={addon.value} className="flex items-center gap-2.5 cursor-pointer">
                        <input type="checkbox" className="addon h-4 w-4 text-indigo-600 focus:ring-indigo-400 border-sumi-300 rounded-sm" value={addon.value} onChange={handleInputChange} />
                        <span className="text-sm text-sumi-700">{addon.label} (+${addon.value})</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right - Quote */}
              <div className="lg:pl-8">
                <div className="bg-sumi-50 border border-sumi-100 p-6 sticky top-8">
                  <h3 className="font-display text-lg font-semibold text-sumi-800 mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-indigo-500" /> Your Quote
                  </h3>

                  <div className="text-center mb-6">
                    <div className="font-display text-4xl font-bold text-indigo-600 mb-1">${quoteTotal.toFixed(2)}</div>
                    <p className="text-xs text-sumi-500">Estimated total</p>
                  </div>

                  <div className="space-y-2 text-sm text-sumi-600 mb-6">
                    <div className="flex justify-between"><span>Base rate per pane:</span><span>$10.00</span></div>
                    <div className="flex justify-between"><span>Total panes:</span><span>{formData.countType === 'windows' ? (Number(formData.paneCount) * Number(formData.panesPerWindow)) : formData.paneCount}</span></div>
                    <div className="flex justify-between"><span>Service level:</span><span>{formData.tier}x</span></div>
                    {formData.frequency !== '0' && (
                      <div className="flex justify-between text-indigo-600"><span>Frequency discount:</span><span>-{(parseFloat(formData.frequency) * 100).toFixed(0)}%</span></div>
                    )}
                  </div>

                  <button type="submit" className="w-full bg-sumi-800 text-washi-50 px-6 py-3 text-sm font-medium tracking-wide hover:bg-sumi-700 transition-colors">
                    Get Detailed Quote
                  </button>

                  <p className="text-[10px] text-sumi-400 mt-4 text-center">
                    *Final pricing may vary based on site inspection and specific requirements
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-sumi-800 py-16 text-center text-washi-50">
        <div className="section-container">
          <h2 className="font-display text-2xl font-bold mb-3">Questions About Your Quote?</h2>
          <p className="text-sumi-300 mb-8">Our team is here to help you get the most accurate estimate for your project.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href="tel:5403351059" className="inline-flex items-center justify-center bg-washi-50 text-sumi-800 px-6 py-3 text-sm font-medium tracking-wide hover:bg-white transition-colors gap-2">
              <Phone className="h-4 w-4" /> (540) 335-1059
            </a>
            <a href="mailto:james@squeegee-samurai.com" className="inline-flex items-center justify-center border border-sumi-400 text-washi-50 px-6 py-3 text-sm font-medium tracking-wide hover:bg-sumi-700 transition-colors gap-2">
              <Mail className="h-4 w-4" /> Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quoting;
