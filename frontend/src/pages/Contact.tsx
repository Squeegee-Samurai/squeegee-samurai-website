import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      const templateParams = {
        fullName: formData.name,
        emailAdd: formData.email,
        phoneNum: formData.phone,
        subject: formData.subject,
        message: formData.message,
        formType: 'Contact Form',

      };

      emailjs.send(
        'service_smyhfg9',      
        'template_tiv6cho',     
        templateParams,
        'tP8oeE5EOGJQXkvGp'      
      )
      .then(() => {
        setIsSubmitted(true);   
      })
      .catch((error) => {
        alert('Failed to send message: ' + error.text);
        console.error('EmailJS error:', error);
      });
    };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for contacting Squeegee Samurai. We'll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:571-555-CLEAN"
                className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call (571) 335-1059
              </a>
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-gray-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors"
              >
                Send Another Message
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Ready for crystal clear windows? Get in touch with Squeegee Samurai today
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-8">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-primary-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">Phone</h3>
                    <p className="text-neutral-600">Call us for immediate assistance</p>
                    <a href="tel:5403351059" className="text-primary-600 font-semibold hover:text-primary-800">
                      (540) 335-1059
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-primary-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">Email</h3>
                    <p className="text-neutral-600">Send us a message anytime</p>
                    <a href="mailto:james@squeegee-samurai.com" className="text-primary-600 font-semibold hover:text-primary-800">
                      james@squeegee-samurai.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-primary-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">Service Area</h3>
                    <p className="text-neutral-600">Proudly serving all of Loudoun County</p>
                    <p className="text-primary-600 font-semibold">Loudoun County, Virginia</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-primary-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">Business Hours</h3>
                    <div className="text-neutral-600">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 8:00 AM - 4:00 PM</p>
                      <p>Sunday: By appointment only</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Service */}
              <div className="mt-8 bg-red-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-accent-900 mb-2">Emergency Service</h3>
                <p className="text-accent-800 mb-4">
                  Need urgent window cleaning for a special event or emergency situation?
                </p>
                <a
                  href="tel:5403351059"
                  className="bg-accent-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-accent-700 transition-colors inline-block"
                >
                  Call for Emergency Service
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-neutral-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
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
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="free-estimate">Request Free Estimate</option>
                      <option value="residential">Residential Service</option>
                      <option value="commercial">Commercial Service</option>
                      <option value="restaurant">Restaurant Service</option>
                      <option value="emergency">Emergency Service</option>
                      <option value="complaint">Service Complaint</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your window cleaning needs..."
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-700 transition-colors flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">We Serve All of Loudoun County</h2>
            <p className="text-lg text-neutral-600">
              Professional window cleaning services throughout Northern Virginia
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['Ashburn', 'Leesburg', 'Sterling', 'Herndon', 'Reston', 'Purcellville', 'Middleburg', 'Hamilton'].map((city) => (
              <div key={city} className="bg-white p-4 rounded-lg shadow">
                <span className="font-semibold text-neutral-800">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Crystal Clear Windows?</h2>
          <p className="text-xl mb-8">
            Contact us today and experience the Squeegee Samurai difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:5403351059"
              className="bg-white text-accent-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-neutral-100 transition-colors"
            >
              Call (540) 335-1059
            </a>
            <a
              href="/free-estimate"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-accent-600 transition-colors"
            >
              Get Free Estimate
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
