import React, { useState } from 'react';
import { Upload, X, CheckCircle, Phone, Mail } from 'lucide-react';

const FreeEstimate = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    propertyType: '',
    serviceType: '',
    windowCount: '',
    stories: '',
    hasScreens: '',
    frequency: '',
    additionalServices: [],
    specialRequests: '',
    preferredContact: 'phone',
    bestTimeToCall: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter(s => s !== service)
        : [...prev.additionalServices, service]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form Data:', formData);
    console.log('Uploaded Files:', uploadedFiles);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
            <p className="text-lg text-gray-600 mb-6">
              We've received your free estimate request. Our team will review your information and contact you within 24 hours with a detailed quote.
            </p>
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-left text-blue-800 space-y-2">
                <li>• We'll review your project details and photos</li>
                <li>• Calculate a detailed estimate based on your specific needs</li>
                <li>• Contact you within 24 hours with your free quote</li>
                <li>• Schedule a convenient time for service if you approve</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:571-555-CLEAN"
                className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call (540) 335-1059
              </a>
              <a
                href="mailto:james@squeegee-samurai.com"
                className="flex items-center justify-center bg-gray-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Your Free Estimate</h1>
          <p className="text-lg text-gray-600">
            Tell us about your project and we'll provide a detailed quote within 24 hours
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Property Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Property Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Address *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <select
                  name="propertyType"
                  required
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select property type</option>
                  <option value="single-family">Single Family Home</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="condo">Condominium</option>
                  <option value="apartment">Apartment</option>
                  <option value="office">Office Building</option>
                  <option value="retail">Retail Store</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="other-commercial">Other Commercial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type *
                </label>
                <select
                  name="serviceType"
                  required
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select service type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="restaurant">Restaurant</option>
                </select>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approximate Number of Windows *
                </label>
                <select
                  name="windowCount"
                  required
                  value={formData.windowCount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select window count</option>
                  <option value="1-10">1-10 windows</option>
                  <option value="11-20">11-20 windows</option>
                  <option value="21-30">21-30 windows</option>
                  <option value="31-50">31-50 windows</option>
                  <option value="50+">50+ windows</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Stories *
                </label>
                <select
                  name="stories"
                  required
                  value={formData.stories}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select stories</option>
                  <option value="1">1 Story</option>
                  <option value="2">2 Stories</option>
                  <option value="3">3 Stories</option>
                  <option value="4+">4+ Stories</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do windows have screens? *
                </label>
                <select
                  name="hasScreens"
                  required
                  value={formData.hasScreens}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes, most windows have screens</option>
                  <option value="some">Some windows have screens</option>
                  <option value="no">No screens</option>
                  <option value="unsure">Not sure</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desired Service Frequency
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select frequency</option>
                  <option value="one-time">One-time service</option>
                  <option value="monthly">Monthly</option>
                  <option value="bi-monthly">Bi-monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="bi-annually">Twice per year</option>
                  <option value="annually">Once per year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Additional Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Screen cleaning',
                'Window sill cleaning',
                'Frame cleaning',
                'Pressure washing',
                'Gutter cleaning',
                'Solar panel cleaning'
              ].map((service) => (
                <label key={service} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.additionalServices.includes(service)}
                    onChange={() => handleCheckboxChange(service)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Photo Upload */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Project Photos</h2>
            <p className="text-gray-600 mb-4">
              Upload photos of your windows to help us provide a more accurate estimate
            </p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <label className="cursor-pointer">
                <span className="text-blue-600 font-semibold hover:text-blue-800">
                  Click to upload photos
                </span>
                <span className="text-gray-600"> or drag and drop</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB each</p>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Uploaded Photos:</h4>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Special Requests */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests or Additional Information
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any special requirements, access concerns, or additional details..."
            />
          </div>

          {/* Contact Preferences */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Contact Method *
                </label>
                <select
                  name="preferredContact"
                  required
                  value={formData.preferredContact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="text">Text Message</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Best Time to Call
                </label>
                <select
                  name="bestTimeToCall"
                  value={formData.bestTimeToCall}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any time</option>
                  <option value="morning">Morning (8 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                  <option value="evening">Evening (5 PM - 8 PM)</option>
                  <option value="weekends">Weekends only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Get My Free Estimate
            </button>
            <p className="text-sm text-gray-500 mt-4">
              We'll contact you within 24 hours with your detailed quote
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FreeEstimate;