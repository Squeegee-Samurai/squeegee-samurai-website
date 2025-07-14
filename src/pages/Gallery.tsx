import React from 'react';
import { Camera, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const beforeAfterImages = [
    {
      id: 1,
      title: 'Residential Home - Ashburn',
      description: 'Complete exterior window cleaning for a 2-story home',
      category: 'Residential'
    },
    {
      id: 2,
      title: 'Office Building - Leesburg',
      description: 'Commercial storefront and office windows',
      category: 'Commercial'
    },
    {
      id: 3,
      title: 'Restaurant - Sterling',
      description: 'Kitchen and dining area window deep cleaning',
      category: 'Restaurant'
    },
    {
      id: 4,
      title: 'Townhouse - Herndon',
      description: 'Interior and exterior window cleaning with screen service',
      category: 'Residential'
    },
    {
      id: 5,
      title: 'Retail Store - Reston',
      description: 'Large display windows and entrance cleaning',
      category: 'Commercial'
    },
    {
      id: 6,
      title: 'Single Family Home - Purcellville',
      description: 'Post-construction window cleanup',
      category: 'Residential'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Ashburn, VA',
      rating: 5,
      text: 'Squeegee Samurai did an amazing job on our windows! They were professional, on time, and the results were incredible.',
      service: 'Residential'
    },
    {
      name: 'Mike Chen',
      location: 'Leesburg, VA',
      rating: 5,
      text: 'Our office building looks fantastic after their service. The team was courteous and efficient.',
      service: 'Commercial'
    },
    {
      name: 'Lisa Rodriguez',
      location: 'Sterling, VA',
      rating: 5,
      text: 'They cleaned our restaurant windows perfectly and worked around our busy schedule. Highly recommend!',
      service: 'Restaurant'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Camera className="w-16 h-16 mx-auto mb-6 text-blue-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Work Gallery</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              See the difference professional window cleaning makes for homes and businesses throughout Loudoun County
            </p>
          </div>
        </div>
      </section>

      {/* Before & After Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Before & After Results</h2>
            <p className="text-lg text-gray-600">
              Crystal clear transformations that speak for themselves
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beforeAfterImages.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <p className="text-blue-800 font-semibold">Before & After Photos</p>
                    <p className="text-blue-600 text-sm">Available upon request</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">
              Real feedback from satisfied customers throughout Loudoun County
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2 inline-block">
                    {testimonial.service} Service
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Our Results Stand Out</h2>
            <p className="text-lg text-gray-600">
              The Squeegee Samurai difference in every project
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Streak-Free Results</h3>
              <p className="text-gray-600 text-sm">
                Professional techniques ensure crystal clear, streak-free windows every time.
              </p>
            </div>
            
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Eco-Friendly Products</h3>
              <p className="text-gray-600 text-sm">
                Biodegradable cleaning solutions that are safe for your family and the environment.
              </p>
            </div>
            
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Attention to Detail</h3>
              <p className="text-gray-600 text-sm">
                We clean frames, sills, and screens for a complete window care service.
              </p>
            </div>
            
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Professional Equipment</h3>
              <p className="text-gray-600 text-sm">
                State-of-the-art tools and safety equipment for superior results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-lg text-gray-600">
              A systematic approach that delivers consistent, high-quality results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Assessment</h3>
              <p className="text-gray-600">
                We evaluate your windows and discuss your specific needs and preferences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Preparation</h3>
              <p className="text-gray-600">
                We protect your property and set up our professional equipment safely.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Cleaning</h3>
              <p className="text-gray-600">
                Using professional techniques and eco-friendly products for perfect results.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold mb-3">Final Inspection</h3>
              <p className="text-gray-600">
                Quality check to ensure every window meets our high standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to See These Results at Your Property?</h2>
          <p className="text-xl mb-8">
            Contact us today for a free estimate and join our gallery of satisfied customers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/free-estimate"
              className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Estimate
            </Link>
            <a
              href="tel:5403351059"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Call (540) 335-1059
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;