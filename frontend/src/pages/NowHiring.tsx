import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Briefcase, MapPin, Clock, DollarSign, CheckCircle, Send, Users, Building } from 'lucide-react';

const NowHiring = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    availability: '',
    message: ''
  });

    const [isSubmitted, setIsSubmitted] = useState(false);
  

  const jobs = [
    {
      id: 1,
      title: 'Window Washing Professionals',
      type: 'Full-time / Part-time',
      location: 'Loudoun County, VA',
      salary: '$18-25/hour',
      icon: <Users className="w-8 h-8 text-primary-600" />,
      description: 'Join our team of professional window cleaning technicians serving residential and commercial properties throughout Loudoun County.',
      responsibilities: [
        'Perform high-quality window cleaning for residential and commercial properties',
        'Operate professional window cleaning equipment safely and efficiently',
        'Maintain excellent customer service standards',
        'Follow safety protocols and procedures',
        'Work independently and as part of a team',
        'Complete daily route assignments on schedule'
      ],
      requirements: [
        'Previous window cleaning or related experience preferred but not required',
        'Ability to work at heights and on ladders safely',
        'Physical fitness and ability to lift up to 50 lbs',
        'Valid driver\'s license with clean driving record',
        'Reliable transportation',
        'Professional appearance and demeanor',
        'Ability to work in various weather conditions',
        'Strong attention to detail'
      ],
      benefits: [
        'Competitive hourly wage ($18-25/hour based on experience)',
        'Performance bonuses and tips',
        'Flexible scheduling options',
        'Professional training provided',
        'Opportunity for advancement',
        'Uniform and equipment provided',
        'Paid time off for full-time employees'
      ]
    },
    {
      id: 2,
      title: 'Office Manager',
      type: 'Full-time',
      location: 'Loudoun County, VA',
      salary: '$45,000-55,000/year',
      icon: <Building className="w-8 h-8 text-primary-600" />,
      description: 'We\'re seeking an organized and detail-oriented Office Manager to oversee daily operations and support our growing window cleaning business.',
      responsibilities: [
        'Manage customer inquiries and schedule appointments',
        'Coordinate daily routes and technician assignments',
        'Handle billing, invoicing, and payment processing',
        'Maintain customer database and service records',
        'Assist with marketing and social media efforts',
        'Manage office supplies and equipment inventory',
        'Support hiring and training of new employees',
        'Prepare reports and analyze business metrics'
      ],
      requirements: [
        '2+ years of office management or administrative experience',
        'Excellent communication and customer service skills',
        'Proficiency in Microsoft Office Suite and basic computer skills',
        'Strong organizational and multitasking abilities',
        'Experience with scheduling software preferred',
        'Knowledge of QuickBooks or similar accounting software a plus',
        'High school diploma required, college degree preferred',
        'Ability to work independently and make decisions'
      ],
      benefits: [
        'Competitive annual salary ($45,000-55,000)',
        'Health insurance contribution',
        'Paid vacation and sick leave',
        'Professional development opportunities',
        'Flexible work arrangements',
        'Performance-based bonuses',
        'Retirement plan contribution matching'
      ]
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the application data to your backend

    const templateParams = {
      fullName: applicationData.name,
      emailAdd: applicationData.email,
      phoneNum: applicationData.phone,
      subject: `Job Inquiry: ${applicationData.position}`,
      message: `
        Experience: ${applicationData.experience}
        Availability: ${applicationData.availability}
        Message: ${applicationData.message}
      `
    };

    emailjs.send(
        'service_smyhfg9',      
        'template_tiv6cho',     
        templateParams,
        'tP8oeE5EOGJQXkvGp'      
      )
      .then(() => {
        setIsSubmitted(true);   
        console.log('Application submitted:', applicationData);
        alert('Thank you for your application! We\'ll be in touch soon.');
        setApplicationData({
          name: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          availability: '',
          message: ''
    });
      })
      .catch((error) => {
        alert('Failed to send message: ' + error.text);
        console.error('EmailJS error:', error);
      });
  };

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
            <Briefcase className="w-16 h-16 mx-auto mb-6 text-primary-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Now Hiring</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Join the Squeegee Samurai team and help us deliver exceptional window cleaning services throughout Loudoun County
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Why Work With Squeegee Samurai?</h2>
            <p className="text-lg text-neutral-600">
              Join a growing company that values professionalism, quality, and employee development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <CheckCircle className="w-12 h-12 text-accent-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Growth Opportunities</h3>
              <p className="text-neutral-600">Advance your career with training, certifications, and leadership opportunities.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <DollarSign className="w-12 h-12 text-accent-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Competitive Pay</h3>
              <p className="text-neutral-600">Earn competitive wages with performance bonuses and opportunities for tips.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <Clock className="w-12 h-12 text-accent-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Flexible Schedule</h3>
              <p className="text-neutral-600">Enjoy flexible scheduling options that work with your lifestyle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Open Positions</h2>
            <p className="text-lg text-neutral-600">
              Explore our current job openings and find your next career opportunity
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {job.icon}
                    <div className="ml-4">
                      <h3 className="text-2xl font-semibold text-neutral-900">{job.title}</h3>
                      <div className="flex items-center text-neutral-600 mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm mr-4">{job.type}</span>
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm mr-4">{job.location}</span>
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span className="text-sm font-semibold">{job.salary}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-neutral-600 mb-6">{job.description}</p>
                  
                  <button
                    onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors mb-4"
                  >
                    {selectedJob === job.id ? 'Hide Details' : 'View Details'}
                  </button>
                  
                  {selectedJob === job.id && (
                    <div className="border-t border-neutral-200 pt-6 mt-6">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold mb-3">Responsibilities</h4>
                          <ul className="space-y-2">
                            {job.responsibilities.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="w-4 h-4 text-accent-500 mr-2 mt-1 flex-shrink-0" />
                                <span className="text-neutral-600 text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold mb-3">Requirements</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="w-4 h-4 text-primary-500 mr-2 mt-1 flex-shrink-0" />
                                <span className="text-neutral-600 text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold mb-3">Benefits</h4>
                          <ul className="space-y-2">
                            {job.benefits.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="w-4 h-4 text-gold-500 mr-2 mt-1 flex-shrink-0" />
                                <span className="text-neutral-600 text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="parallax-clouds py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Apply Now</h2>
            <p className="text-lg text-neutral-600">
              Ready to join our team? Submit your application below
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={applicationData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={applicationData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={applicationData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Position Applying For *
                  </label>
                  <select
                    name="position"
                    required
                    value={applicationData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select Position</option>
                    <option value="window-washing">Window Washing Professional</option>
                    <option value="office-manager">Office Manager</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Relevant Experience
                </label>
                <textarea
                  name="experience"
                  value={applicationData.experience}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Tell us about your relevant work experience..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Availability
                </label>
                <input
                  type="text"
                  name="availability"
                  value={applicationData.availability}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Full-time, Part-time, Weekends only"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Additional Message
                </label>
                <textarea
                  name="message"
                  value={applicationData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Tell us why you'd like to work with Squeegee Samurai..."
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-700 transition-colors flex items-center justify-center mx-auto"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About These Positions?</h2>
          <p className="text-xl mb-8">
            Contact us directly to learn more about career opportunities at Squeegee Samurai
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:5403351059"
              className="bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-neutral-100 transition-colors"
            >
              Call (540) 335-1059
            </a>
            <a
              href="mailto:james@squeegee-samurai.com"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NowHiring;
