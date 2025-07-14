import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Leaf, Star, Phone, CheckCircle, Users, Building, Utensils } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Crystal Clear Windows,<br />
              <span className="text-green-400">Eco-Friendly Service</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Professional window cleaning for homes and businesses in Loudoun County, Virginia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/free-estimate"
                className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Get Free Estimate
              </Link>
              <a
                href="tel:5403351059"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
              >
                Call (540) 335-1059
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Squeegee Samurai?</h2>
            <p className="text-lg text-gray-600">Professional service with a commitment to excellence and environmental responsibility</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Fully Insured</h3>
              <p className="text-gray-600">Licensed and insured for your peace of mind. We protect your property and our team.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Eco-Friendly</h3>
              <p className="text-gray-600">Biodegradable cleaning solutions that are safe for your family, pets, and the environment.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">5-Star Service</h3>
              <p className="text-gray-600">Consistently rated 5 stars by our customers. Quality work and exceptional customer service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600">Comprehensive window cleaning solutions for every need</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <Users className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Residential</h3>
                <p className="text-gray-600 mb-4">Professional window cleaning for homes, townhouses, and condos.</p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Interior & exterior cleaning</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Screen cleaning</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Sill & frame cleaning</li>
                </ul>
                <Link to="/services/residential" className="text-blue-600 font-semibold hover:text-blue-800">
                  Learn More →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <Building className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Commercial</h3>
                <p className="text-gray-600 mb-4">Regular maintenance for offices, retail stores, and commercial buildings.</p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Scheduled maintenance</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />High-rise capabilities</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Flexible scheduling</li>
                </ul>
                <Link to="/services/commercial" className="text-blue-600 font-semibold hover:text-blue-800">
                  Learn More →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <Building className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Additional Services</h3>
                <p className="text-gray-600 mb-4">Pressure washing, gutter cleaning, and specialized cleaning services.</p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Pressure washing</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Gutter cleaning</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Solar panel cleaning</li>
                </ul>
                <Link to="/services/restaurant" className="text-blue-600 font-semibold hover:text-blue-800">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Serving Loudoun County</h2>
            <p className="text-lg text-gray-600">Professional window cleaning throughout Northern Virginia</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['Ashburn', 'Leesburg', 'Sterling', 'Herndon', 'Reston', 'Purcellville', 'Middleburg', 'Hamilton'].map((city) => (
              <div key={city} className="bg-white p-4 rounded-lg shadow">
                <span className="font-semibold text-gray-800">{city}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/service-areas" className="text-blue-600 font-semibold hover:text-blue-800">
              View All Service Areas →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Crystal Clear Windows?</h2>
          <p className="text-xl mb-8">Get your free estimate today and see the Squeegee Samurai difference!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/free-estimate"
              className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Estimate
            </Link>
            <a
              href="tel:5403351059"
              className="flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
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

export default Home;