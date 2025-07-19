import React from 'react';
import { Link } from 'react-router-dom';
import { Building, CheckCircle, Clock, Shield, Star, Phone, Users, Calendar } from 'lucide-react';

const CommercialServices = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Building className="w-16 h-16 mx-auto mb-6 text-primary-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Commercial Window Cleaning</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Professional window cleaning services for offices, retail stores, and commercial buildings in Loudoun County
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Professional Commercial Window Care</h2>
            <p className="text-lg text-neutral-600">
              Maintain your business's professional appearance with our reliable commercial window cleaning services
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Commercial Services Include</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-accent-500 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-900">Scheduled Maintenance Programs</h4>
                    <p className="text-neutral-600">Regular cleaning schedules to keep your business looking professional year-round.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-accent-500 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-900">High-Rise Window Cleaning</h4>
                    <p className="text-neutral-600">Specialized equipment and safety protocols for multi-story buildings and high-rise properties.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-accent-500 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-900">Storefront & Display Windows</h4>
                    <p className="text-neutral-600">Keep your retail displays crystal clear to attract customers and showcase your products.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-accent-500 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-900">Office Building Maintenance</h4>
                    <p className="text-neutral-600">Professional cleaning for office complexes, ensuring a bright and welcoming work environment.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-accent-500 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-900">After-Hours Service</h4>
                    <p className="text-neutral-600">Flexible scheduling including evenings and weekends to minimize business disruption.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-primary-900 mb-6">Commercial Property Types</h3>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-neutral-900 mb-2">Office Buildings</h4>
                  <p className="text-neutral-600 text-sm">Multi-tenant office complexes, corporate headquarters, and professional buildings</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-neutral-900 mb-2">Retail Stores</h4>
                  <p className="text-neutral-600 text-sm">Shopping centers, standalone retail locations, and boutique shops</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-neutral-900 mb-2">Medical Facilities</h4>
                  <p className="text-neutral-600 text-sm">Hospitals, clinics, dental offices, and healthcare centers</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-neutral-900 mb-2">Educational Institutions</h4>
                  <p className="text-neutral-600 text-sm">Schools, universities, training centers, and daycare facilities</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-neutral-900 mb-2">Industrial Buildings</h4>
                  <p className="text-neutral-600 text-sm">Warehouses, manufacturing facilities, and distribution centers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Plans */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Flexible Service Plans</h2>
            <p className="text-lg text-neutral-600">
              Choose the maintenance schedule that fits your business needs and budget
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Calendar className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Monthly Service</h3>
              <p className="text-neutral-600 mb-4">Regular monthly cleaning to maintain a consistently professional appearance</p>
              <ul className="text-sm text-neutral-600 space-y-2 mb-6">
                <li>• 12 cleanings per year</li>
                <li>• Priority scheduling</li>
                <li>• 20% discount on additional services</li>
                <li>• Emergency service included</li>
              </ul>
              <div className="text-center">
                <span className="text-2xl font-bold text-primary-600">Best Value</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-accent-500">
              <div className="flex items-center mb-4">
                <Calendar className="w-12 h-12 text-accent-600" />
                <span className="ml-2 bg-accent-500 text-white text-xs px-2 py-1 rounded-full">POPULAR</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quarterly Service</h3>
              <p className="text-neutral-600 mb-4">Seasonal cleaning to keep your business looking its best year-round</p>
              <ul className="text-sm text-neutral-600 space-y-2 mb-6">
                <li>• 4 cleanings per year</li>
                <li>• Flexible scheduling</li>
                <li>• 15% discount on additional services</li>
                <li>• Seasonal maintenance reminders</li>
              </ul>
              <div className="text-center">
                <span className="text-2xl font-bold text-accent-600">Most Popular</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Calendar className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">One-Time Service</h3>
              <p className="text-neutral-600 mb-4">Perfect for special events, grand openings, or seasonal deep cleaning</p>
              <ul className="text-sm text-neutral-600 space-y-2 mb-6">
                <li>• No long-term commitment</li>
                <li>• Same-week service available</li>
                <li>• Perfect for special events</li>
                <li>• Can upgrade to regular service</li>
              </ul>
              <div className="text-center">
                <span className="text-2xl font-bold text-primary-600">Flexible</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Why Businesses Choose Squeegee Samurai</h2>
            <p className="text-lg text-neutral-600">
              Trusted by commercial properties throughout Loudoun County
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fully Licensed & Insured</h3>
              <p className="text-neutral-600 text-sm">
                Comprehensive commercial liability insurance and workers' compensation coverage.
              </p>
            </div>
            
            <div className="text-center">
              <Clock className="w-12 h-12 text-accent-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Reliable Scheduling</h3>
              <p className="text-neutral-600 text-sm">
                Consistent, on-time service that doesn't disrupt your business operations.
              </p>
            </div>
            
            <div className="text-center">
              <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Professional Team</h3>
              <p className="text-neutral-600 text-sm">
                Uniformed, background-checked technicians who represent your business well.
              </p>
            </div>
            
            <div className="text-center">
              <Star className="w-12 h-12 text-gold-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-neutral-600 text-sm">
                We guarantee satisfaction on every window. If any window doesn't meet expectations, we'll return at a discounted rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Commercial Pricing</h2>
            <p className="text-lg text-neutral-600">
              Competitive rates with volume discounts for regular service contracts
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Pricing Factors</h3>
                <ul className="space-y-3 text-neutral-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    Building height and accessibility
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    Total square footage of windows
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    Frequency of service
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    Special equipment requirements
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    Additional services requested
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Contract Benefits</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="text-neutral-700">Monthly contracts</span>
                    <span className="font-semibold text-accent-600">Save 20%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="text-neutral-700">Quarterly contracts</span>
                    <span className="font-semibold text-accent-600">Save 15%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="text-neutral-700">Bi-annual contracts</span>
                    <span className="font-semibold text-accent-600">Save 10%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-neutral-700">One-time service</span>
                    <span className="font-semibold">Standard rate</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-500 mt-4">
                  *All contracts include priority scheduling and emergency service coverage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Enhance Your Business Image?</h2>
          <p className="text-xl mb-8">
            Contact us today for a free commercial window cleaning estimate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/free-estimate"
              className="bg-white text-accent-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-neutral-100 transition-colors"
            >
              Get Free Commercial Estimate
            </Link>
            <a
              href="tel:5403351059"
              className="flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-accent-600 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call (540) 335-1059
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommercialServices;