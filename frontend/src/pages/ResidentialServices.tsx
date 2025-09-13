import React from 'react';
import { Link } from 'react-router-dom';
import { Home, CheckCircle, Clock, Shield, Star, Phone } from 'lucide-react';

const ResidentialServices = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Home className="w-16 h-16 mx-auto mb-6 text-primary-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Residential Window Cleaning</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Professional window cleaning services for homes throughout Loudoun County, Virginia
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Complete Home Window Care</h2>
            <p className="text-lg text-neutral-600">
              From single-family homes to townhouses and condos, we provide comprehensive window cleaning solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">What's Included in Our Service</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-accent-500 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-900">Interior & Exterior Cleaning</h4>
                    <p className="text-neutral-600">Complete cleaning of both sides of your windows for maximum clarity and brightness.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-accent-500 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-900">Screen Cleaning & Maintenance</h4>
                    <p className="text-neutral-600">Thorough cleaning of window screens to improve airflow and extend their lifespan.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-accent-500 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-900">Sill & Frame Cleaning</h4>
                    <p className="text-neutral-600">Detailed cleaning of window sills, frames, and tracks to remove dirt and debris.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-accent-500 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-900">Spot & Stain Removal</h4>
                    <p className="text-neutral-600">Specialized treatment for hard water spots, paint, and other stubborn stains.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-accent-500 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-900">Post-Service Inspection</h4>
                    <p className="text-neutral-600">Quality assurance check to ensure every window meets our high standards.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-primary-900 mb-6">Service Packages</h3>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-2">Basic Package</h4>
                  <p className="text-neutral-600 mb-4">Exterior window cleaning only</p>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    <li>• Exterior window cleaning</li>
                    <li>• Frame cleaning</li>
                    <li>• Hard water removal</li>
                    <li>• 5-stage pure water rinse</li>
                    <li>• Sill wiping</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-accent-500">
                  <div className="flex items-center mb-2">
                    <h4 className="text-xl font-semibold">Complete Package</h4>
                    <span className="ml-2 bg-accent-500 text-white text-xs px-2 py-1 rounded-full">POPULAR</span>
                  </div>
                  <p className="text-neutral-600 mb-4">Interior and exterior cleaning</p>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    <li>• Interior & exterior cleaning</li>
                    <li>• Track detailing</li>
                    <li>• Frame & Screen cleaning</li>
                    <li>• Hardwater, spot, & stain removal</li>
                    <li>• 5-stage pure water rinse</li>
                    <li>• Sill wiping</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-2">Premium Package</h4>
                  <p className="text-neutral-600 mb-4">Complete service plus extras</p>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    <li>• Everything in Complete Package</li>
                    <li>• Gutter and facade cleaning</li>
                    <li>• Mirror cleaning</li>
                    <li>• Glass door & fixture cleaning</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequency Options */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Service Frequency Options</h2>
            <p className="text-lg text-neutral-600">
              Choose the schedule that works best for your home and budget
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Clock className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">One-Time Service</h3>
              <p className="text-neutral-600 mb-4">Perfect for special occasions, move-ins, or seasonal cleaning</p>
              <ul className="text-sm text-neutral-600 space-y-2">
                <li>• No commitment required</li>
                <li>• Same-day service available</li>
                <li>• Perfect for events</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center border-2 border-accent-500">
              <div className="flex justify-center items-center mb-4">
                <Clock className="w-12 h-12 text-accent-600" />
                <span className="ml-2 bg-accent-500 text-white text-xs px-2 py-1 rounded-full">BEST VALUE</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Regular Service</h3>
              <p className="text-neutral-600 mb-4">Scheduled cleaning to keep your windows consistently clean</p>
              <ul className="text-sm text-neutral-600 space-y-2">
                <li>• Monthly, bi-monthly, or quarterly</li>
                <li>• 15% discount on regular service</li>
                <li>• Priority scheduling</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Clock className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Seasonal Service</h3>
              <p className="text-neutral-600 mb-4">Spring and fall cleaning to maintain your home's appearance</p>
              <ul className="text-sm text-neutral-600 space-y-2">
                <li>• Twice yearly service</li>
                <li>• 10% seasonal discount</li>
                <li>• Includes deep cleaning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Why Homeowners Choose Us</h2>
            <p className="text-lg text-neutral-600">
              Trusted by hundreds of families throughout Loudoun County
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fully Insured</h3>
              <p className="text-neutral-600 text-sm">
                Comprehensive liability and workers' compensation insurance for your peace of mind.
              </p>
            </div>
            
            <div className="text-center">
              <Star className="w-12 h-12 text-gold-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">5-Star Rated</h3>
              <p className="text-neutral-600 text-sm">
                Consistently rated 5 stars by our residential customers across all platforms.
              </p>
            </div>
            
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-accent-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Satisfaction Guaranteed</h3>
              <p className="text-neutral-600 text-sm">
                We guarantee satisfaction on every window. If any window doesn't meet expectations, we'll return at a discounted rate.
              </p>
            </div>
            
            <div className="text-center">
              <Clock className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-neutral-600 text-sm">
                We work around your schedule, including evenings and weekends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Transparent Pricing</h2>
            <p className="text-lg text-neutral-600">
              No hidden fees or surprises - just honest, upfront pricing
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Factors That Affect Pricing</h3>
                <ul className="space-y-3 text-neutral-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    Number of windows
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    Property height and accessibility
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    Window condition and size
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    Service package selected
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent-500 mr-3" />
                    Frequency of service
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Typical Price Ranges</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="text-neutral-700">Small home (10-15 windows)</span>
                    <span className="font-semibold">$80-120</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="text-neutral-700">Medium home (16-25 windows)</span>
                    <span className="font-semibold">$120-180</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="text-neutral-700">Large home (26-40 windows)</span>
                    <span className="font-semibold">$180-280</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-neutral-700">Extra large home (40+ windows)</span>
                    <span className="font-semibold">$280+</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-500 mt-4">
                  *Prices include interior and exterior cleaning. Screen cleaning available for additional fee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Sparkling Clean Windows?</h2>
          <p className="text-xl mb-8">
            Get your free estimate today and see why homeowners throughout Loudoun County trust Squeegee Samurai
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

export default ResidentialServices;