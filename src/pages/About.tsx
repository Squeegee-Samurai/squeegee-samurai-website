import React from 'react';
import { Shield, Award, Users, Leaf } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Squeegee Samurai</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Bringing the precision and dedication of the samurai to window cleaning in Loudoun County, Virginia
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2025, Squeegee Samurai brings the precision, discipline, and honor of the samurai to modern window cleaning.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                What began as a local service has quickly become Loudoun County's go-to for spotless windows—serving homes, businesses, and restaurants across Northern Virginia. Our team operates with unwavering commitment to excellence, eco-conscious practices, and the samurai code: respect, precision, and integrity in every pane we touch.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">Our Mission</h3>
              <p className="text-blue-800 mb-6">
                To provide exceptional window cleaning services that exceed expectations while protecting the 
                environment and supporting our local community.
              </p>
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">Our Vision</h3>
              <p className="text-blue-800">
                To be the most trusted and respected window cleaning service in Northern Virginia, known for 
                our integrity, quality, and environmental stewardship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Integrity</h3>
              <p className="text-gray-600">
                We do what we say we'll do, when we say we'll do it. Our word is our bond.
              </p>
            </div>
            
            <div className="text-center">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for perfection in every job, no matter how big or small.
              </p>
            </div>
            
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Respect</h3>
              <p className="text-gray-600">
                We treat every customer, team member, and property with the utmost respect.
              </p>
            </div>
            
            <div className="text-center">
              <Leaf className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to protecting the environment for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Squeegee Samurai?</h2>
            <p className="text-lg text-gray-600">Experience the difference that dedication and expertise make</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Licensed & Insured</h3>
              <p className="text-gray-600 mb-4">
                Fully licensed and insured for your peace of mind. We carry comprehensive liability insurance 
                and workers' compensation coverage.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Eco-Friendly Products</h3>
              <p className="text-gray-600 mb-4">
                We use only biodegradable, non-toxic cleaning solutions that are safe for your family, 
                pets, and the environment.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Professional Equipment</h3>
              <p className="text-gray-600 mb-4">
                State-of-the-art equipment including water-fed pole systems, professional squeegees, 
                and safety gear for high-rise work.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Satisfaction Guarantee</h3>
              <p className="text-gray-600 mb-4">
                If you're not completely satisfied with our work, we'll return within 24 hours to 
                make it right at no additional charge.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Flexible Scheduling</h3>
              <p className="text-gray-600 mb-4">
                We work around your schedule with convenient appointment times, including evenings 
                and weekends when needed.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Local Expertise</h3>
              <p className="text-gray-600 mb-4">
                As a local Loudoun County business, we understand the unique challenges of our climate 
                and building styles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">Dedicated professionals committed to excellence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                MK
              </div>
              <h3 className="text-xl font-semibold mb-2">Mike Katana</h3>
              <p className="text-blue-600 font-medium mb-3">Founder & Lead Samurai</p>
              <p className="text-gray-600 text-sm">
                With over 10 years in the cleaning industry, Mike founded Squeegee Samurai to bring 
                honor and excellence to window cleaning.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                SN
              </div>
              <h3 className="text-xl font-semibold mb-2">Sarah Ninja</h3>
              <p className="text-blue-600 font-medium mb-3">Operations Manager</p>
              <p className="text-gray-600 text-sm">
                Sarah ensures every job meets our high standards and coordinates our team's 
                scheduling and quality control.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                DW
              </div>
              <h3 className="text-xl font-semibold mb-2">David Warrior</h3>
              <p className="text-blue-600 font-medium mb-3">Senior Technician</p>
              <p className="text-gray-600 text-sm">
                David specializes in commercial and high-rise window cleaning, bringing precision 
                and safety to every project.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;