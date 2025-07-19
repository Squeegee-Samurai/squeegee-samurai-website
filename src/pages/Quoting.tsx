import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, CheckCircle, Phone, Mail } from 'lucide-react';

const Quoting = () => {
  const [formData, setFormData] = useState({
    countType: 'windows',
    paneCount: 0,
    panesPerWindow: 2,
    tier: '1.0',
    frequency: '0',
    addons: []
  });
  
  const [quoteTotal, setQuoteTotal] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculateQuote = () => {
    const baseRate = 10;
    let paneCount = parseInt(formData.paneCount) || 0;

    if (formData.countType === 'windows') {
      const panesPerWindow = parseInt(formData.panesPerWindow) || 2;
      paneCount *= panesPerWindow;
    }

    const tierMultiplier = parseFloat(formData.tier);
    const discount = parseFloat(formData.frequency);

    let total = baseRate * paneCount * tierMultiplier;
    total -= total * discount;

    // Add-ons
    formData.addons.forEach(addonValue => {
      total += parseFloat(addonValue);
    });

    setQuoteTotal(total);
  };

  useEffect(() => {
    calculateQuote();
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (checked) {
        setFormData(prev => ({
          ...prev,
          addons: [...prev.addons, value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          addons: prev.addons.filter(addon => addon !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-accent-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">Quote Submitted!</h1>
            <p className="text-lg text-neutral-600 mb-6">
              We'll be in touch soon with your detailed quote.
            </p>
            <div className="bg-primary-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-primary-900 mb-2">Your Estimated Quote</h3>
              <p className="text-3xl font-bold text-accent-600">${quoteTotal.toFixed(2)}</p>
              <p className="text-sm text-primary-800 mt-2">*Final quote may vary based on site inspection</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:5403351059"
                className="flex items-center justify-center bg-primary-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call (540) 335-1059
              </a>
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-neutral-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-neutral-700 transition-colors"
              >
                Create Another Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Calculator className="w-16 h-16 mx-auto mb-6 text-primary-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Instant Quote Calculator</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Get an instant estimate for your window cleaning project
            </p>
          </div>
        </div>
      </section>

      {/* Quote Calculator */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Inputs */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Project Details</h2>
                
                {/* Count Type */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    How would you like to count?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="countType"
                        value="windows"
                        checked={formData.countType === 'windows'}
                        onChange={handleInputChange}
                        className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
                      />
                      <span className="text-neutral-700">Count by Windows</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="countType"
                        value="panes"
                        checked={formData.countType === 'panes'}
                        onChange={handleInputChange}
                        className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
                      />
                      <span className="text-neutral-700">Count by Panes</span>
                    </label>
                  </div>
                </div>

                {/* Count Input */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {formData.countType === 'windows' ? 'Number of Windows' : 'Number of Panes'}
                  </label>
                  <input
                    type="number"
                    name="paneCount"
                    value={formData.paneCount}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Panes per Window (conditional) */}
                {formData.countType === 'windows' && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Panes per Window (average)
                    </label>
                    <select
                      name="panesPerWindow"
                      value={formData.panesPerWindow}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="1">1 pane</option>
                      <option value="2">2 panes</option>
                      <option value="3">3 panes</option>
                      <option value="4">4 panes</option>
                    </select>
                  </div>
                )}

                {/* Service Tier */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Service Level
                  </label>
                  <select
                    name="tier"
                    value={formData.tier}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="0.8">Basic (Exterior only)</option>
                    <option value="1.0">Standard (Interior & Exterior)</option>
                    <option value="1.3">Premium (Full service + extras)</option>
                  </select>
                </div>

                {/* Frequency */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Service Frequency
                  </label>
                  <select
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="0">One-time service</option>
                    <option value="0.1">Bi-annual (10% discount)</option>
                    <option value="0.15">Quarterly (15% discount)</option>
                    <option value="0.2">Monthly (20% discount)</option>
                  </select>
                </div>

                {/* Add-ons */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Additional Services
                  </label>
                  <div className="space-y-2">
                    {[
                      { label: 'Screen cleaning', value: '25' },
                      { label: 'Pressure washing', value: '150' },
                      { label: 'Gutter cleaning', value: '200' },
                      { label: 'Solar panel cleaning', value: '100' }
                    ].map((addon) => (
                      <label key={addon.value} className="flex items-center">
                        <input
                          type="checkbox"
                          className="addon mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                          value={addon.value}
                          onChange={handleInputChange}
                        />
                        <span className="text-neutral-700">{addon.label} (+${addon.value})</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Quote Display */}
              <div className="lg:pl-8">
                <div className="bg-primary-50 p-6 rounded-lg sticky top-8">
                  <h3 className="text-2xl font-semibold text-primary-900 mb-4 flex items-center">
                    <DollarSign className="w-6 h-6 mr-2" />
                    Your Quote
                  </h3>
                  
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-accent-600 mb-2">
                      ${quoteTotal.toFixed(2)}
                    </div>
                    <p className="text-sm text-primary-800">Estimated total</p>
                  </div>

                  <div className="space-y-3 text-sm text-primary-800 mb-6">
                    <div className="flex justify-between">
                      <span>Base rate per pane:</span>
                      <span>$10.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total panes:</span>
                      <span>{formData.countType === 'windows' ? (formData.paneCount * formData.panesPerWindow) : formData.paneCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service level:</span>
                      <span>{formData.tier}x</span>
                    </div>
                    {formData.frequency !== '0' && (
                      <div className="flex justify-between text-accent-600">
                        <span>Frequency discount:</span>
                        <span>-{(parseFloat(formData.frequency) * 100).toFixed(0)}%</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-700 transition-colors"
                  >
                    Get Detailed Quote
                  </button>
                  
                  <p className="text-xs text-primary-700 mt-4 text-center">
                    *Final pricing may vary based on site inspection and specific requirements
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">Questions About Your Quote?</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Our team is here to help you get the most accurate estimate for your project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:5403351059"
              className="flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call (540) 335-1059
            </a>
            <a
              href="mailto:james@squeegee-samurai.com"
              className="flex items-center justify-center bg-neutral-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-neutral-700 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quoting;