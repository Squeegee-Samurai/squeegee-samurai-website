import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Building, Utensils, CheckCircle, ArrowRight } from 'lucide-react';

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900 text-white py-20">
      <div
          className="absolute inset-0 pointer-events-none opacity-30 z-0"
          style={{
            backgroundImage:
              'repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,.9) 0deg 1.2deg, transparent 1.2deg 5deg)',
            WebkitMaskImage:
              'radial-gradient(circle at center, transparent 0 32%, black 45%)',
            maskImage:
              'radial-gradient(circle at center, transparent 0 32%, black 45%)'
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Professional window cleaning solutions for every need in Loudoun County, Virginia
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Complete Window Care Solutions</h2>
            <p className="text-lg text-neutral-600">
              From residential homes to commercial buildings, we provide comprehensive window cleaning services
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Residential Services */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-neutral-200">
              <div className="p-8">
                <Users className="w-12 h-12 text-primary-600 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Residential Services</h3>
                <p className="text-neutral-600 mb-6">
                  Professional window cleaning for homes, townhouses, and condominiums throughout Loudoun County.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    <span className="text-neutral-700">Interior & exterior window cleaning</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    <span className="text-neutral-700">Screen cleaning & maintenance</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    <span className="text-neutral-700">Window sill & frame cleaning</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    <span className="text-neutral-700">Post-construction cleanup</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    <span className="text-neutral-700">Flexible scheduling options</span>
                  </div>
                </div>
                
                <Link
                  to="/services/residential"
                  className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Commercial Services */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-neutral-200">
              <div className="p-8">
                <Building className="w-12 h-12 text-primary-600 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Commercial Services</h3>
                <p className="text-neutral-600 mb-6">
                  Regular maintenance and one-time cleaning for offices, retail stores, and commercial buildings.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    <span className="text-neutral-700">Scheduled maintenance programs</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />

                    <span className="text-neutral-700">Upto 3rd story window cleaning</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />

                    <span className="text-neutral-700">Storefront & display windows</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    <span className="text-neutral-700">After-hours service available</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    <span className="text-neutral-700">Competitive contract pricing</span>
                  </div>
                </div>
                
                <Link
                  to="/services/commercial"
                  className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Restaurant Services */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-neutral-200">
              <div className="p-8">
                <Utensils className="w-12 h-12 text-primary-600 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Restaurant Services</h3>
                <p className="text-neutral-600 mb-6">
                  Specialized cleaning for restaurants and food service establishments with health code compliance.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    <span className="text-neutral-700">Health code compliant cleaning</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    <span className="text-neutral-700">Grease & grime removal</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    <span className="text-neutral-700">Kitchen window deep cleaning</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    <span className="text-neutral-700">Off-hours & weekend service</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    <span className="text-neutral-700">Food-safe cleaning products</span>
                  </div>
                </div>
                
                <Link
                  to="/services/restaurant"
                  className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Additional Services</h2>
            <p className="text-lg text-neutral-600">
              Complete exterior cleaning solutions to keep your property looking its best
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Screen Cleaning</h3>
              <p className="text-neutral-600">
                Professional cleaning and maintenance of window screens to improve airflow and appearance.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Pressure Washing</h3>
              <p className="text-neutral-600">
                Exterior building cleaning, sidewalk cleaning, and deck restoration services.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Gutter Cleaning</h3>
              <p className="text-neutral-600">
                Complete gutter cleaning and maintenance to protect your property from water damage.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Solar Panel Cleaning</h3>
              <p className="text-neutral-600">
                Specialized cleaning to maintain solar panel efficiency and maximize energy production.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Post-Construction</h3>
              <p className="text-neutral-600">
                Thorough cleanup of construction debris, paint, and adhesive residue from windows.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Emergency Service</h3>
              <p className="text-neutral-600">
                24/7 emergency window cleaning for urgent situations and special events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Our Process</h2>
            <p className="text-lg text-neutral-600">
              A systematic approach that ensures consistent, high-quality results every time
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Assessment</h3>
              <p className="text-neutral-600">
                We evaluate your property and discuss your specific needs and preferences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Preparation</h3>
              <p className="text-neutral-600">
                We protect your property and set up our equipment for safe, efficient cleaning.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Cleaning</h3>
              <p className="text-neutral-600">
                Using professional techniques and eco-friendly products for streak-free results.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold mb-3">Inspection</h3>
              <p className="text-neutral-600">
                Final quality check to ensure every window meets our high standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Contact us today for a free estimate on any of our professional window cleaning services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/free-estimate"
              className="bg-white text-accent-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-neutral-100 transition-colors"
            >
              Get Free Estimate
            </Link>
            <a
              href="tel:5403351059"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-accent-600 transition-colors"
            >
              Call (540) 335-1059
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
