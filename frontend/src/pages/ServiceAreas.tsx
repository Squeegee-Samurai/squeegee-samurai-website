import React from 'react';
import { MapPin, CheckCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceAreas = () => {
  const cities = [
    {
      name: 'Ashburn',
      description: 'Serving all of Ashburn including Broadlands, Brambleton, and surrounding neighborhoods',
      zipCodes: ['20147', '20148', '20149']
    },
    {
      name: 'Leesburg',
      description: 'Complete coverage of Leesburg, including historic downtown and all residential areas',
      zipCodes: ['20175', '20176']
    },
    {
      name: 'Sterling',
      description: 'Professional window cleaning throughout Sterling and Potomac Falls',
      zipCodes: ['20164', '20165', '20166']
    },
    {
      name: 'Herndon',
      description: 'Serving Herndon and the surrounding Reston area',
      zipCodes: ['20170', '20171']
    },
    {
      name: 'Reston',
      description: 'Full service coverage of Reston, including Lake Anne and Town Center',
      zipCodes: ['20190', '20191', '20194']
    },
    {
      name: 'Purcellville',
      description: 'Window cleaning services for Purcellville and western Loudoun County',
      zipCodes: ['20132']
    },
    {
      name: 'Middleburg',
      description: 'Serving Middleburg and the surrounding horse country',
      zipCodes: ['20117', '20118']
    },
    {
      name: 'Hamilton',
      description: 'Professional services for Hamilton and rural Loudoun County areas',
      zipCodes: ['20158']
    }
  ];

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
            <MapPin className="w-16 h-16 mx-auto mb-6 text-primary-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Service Areas</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Professional window cleaning services throughout Loudoun County, Virginia
            </p>
          </div>
        </div>
      </section>

      {/* Service Coverage */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Proudly Serving Loudoun County</h2>
            <p className="text-lg text-neutral-600">
              We provide professional window cleaning services to residential and commercial properties throughout Northern Virginia
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cities.map((city) => (
              <div key={city.name} className="bg-white rounded-lg shadow-lg border border-neutral-200 p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-primary-600 mr-3" />
                  <h3 className="text-xl font-semibold text-neutral-900">{city.name}</h3>
                </div>
                <p className="text-neutral-600 mb-4">{city.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-neutral-900 mb-2">ZIP Codes Served:</h4>
                  <div className="flex flex-wrap gap-2">
                    {city.zipCodes.map((zip) => (
                      <span key={zip} className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm">
                        {zip}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center text-accent-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Full Service Available</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">What We Offer in Every Service Area</h2>
            <p className="text-lg text-neutral-600">
              Consistent, high-quality service no matter where you're located in Loudoun County
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Residential Services</h3>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                  Single-family homes
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                  Townhouses & condos
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                  Interior & exterior cleaning
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                  Screen cleaning
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Commercial Services</h3>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                  Office buildings
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                  Retail stores
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                  Medical facilities
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                  Regular maintenance
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Specialized Services</h3>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                  Restaurant cleaning
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                  Post-construction cleanup
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                  Solar panel cleaning
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                  Emergency service
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-50 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Service Area Information</h2>
              <p className="text-lg text-neutral-600">
                Important details about our service coverage and scheduling
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Service Radius</h3>
                <p className="text-neutral-600 mb-4">
                  We proudly serve all of Loudoun County, Virginia, with our primary focus on the eastern and central areas. 
                  Our service area extends from Ashburn and Sterling in the east to Purcellville and Hamilton in the west.
                </p>
                <ul className="space-y-2 text-neutral-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                    No travel charges within Loudoun County
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                    Same-day service available in most areas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                    Emergency service throughout our coverage area
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Scheduling & Availability</h3>
                <p className="text-neutral-600 mb-4">
                  We offer flexible scheduling to accommodate your needs, with service available throughout the week 
                  and on weekends when necessary.
                </p>
                <ul className="space-y-2 text-neutral-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                    Monday - Saturday service available
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                    Evening appointments by request
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent-500 mr-2" />
                    Regular maintenance scheduling
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Schedule Service?</h2>
          <p className="text-xl mb-8">
            Contact us today to schedule professional window cleaning in your area
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

export default ServiceAreas;