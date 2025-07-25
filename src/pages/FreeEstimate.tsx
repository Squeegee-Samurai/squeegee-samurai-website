import React, { useState } from 'react';
import { Upload, X, CheckCircle, Phone, Mail } from 'lucide-react';

const FreeEstimate = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', zipCode: '', propertyType: '',
    serviceType: '', windowCount: '', stories: '', hasScreens: '',
    frequency: '', additionalServices: [], specialRequests: '',
    preferredContact: 'phone', bestTimeToCall: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  return (
    <form
      name="free-estimate"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      encType="multipart/form-data"
      action="/thank-you"
      className="space-y-6"
    >
      <input type="hidden" name="form-name" value="free-estimate" />
      <input type="hidden" name="bot-field" />

      <h2 className="text-2xl font-bold">Get Your Free Estimate</h2>
      <p>Tell us about your project and we'll provide a detailed quote within 24 hours.</p>

      {/* Contact Info */}
      <h3>Contact Information</h3>
      <input name="firstName" placeholder="First Name *" required onChange={handleInputChange} />
      <input name="lastName" placeholder="Last Name *" required onChange={handleInputChange} />
      <input name="email" type="email" placeholder="Email Address *" required onChange={handleInputChange} />
      <input name="phone" placeholder="Phone Number *" required onChange={handleInputChange} />

      {/* Property Info */}
      <h3>Property Information</h3>
      <input name="address" placeholder="Property Address *" required onChange={handleInputChange} />
      <input name="city" placeholder="City *" required onChange={handleInputChange} />
      <input name="zipCode" placeholder="ZIP Code *" required onChange={handleInputChange} />
      <select name="propertyType" required onChange={handleInputChange}>
        <option value="">Select property type</option>
        <option>Single Family Home</option>
        <option>Townhouse</option>
        <option>Condominium</option>
        <option>Apartment</option>
        <option>Office Building</option>
        <option>Retail Store</option>
        <option>Restaurant</option>
        <option>Other Commercial</option>
      </select>
      <select name="serviceType" required onChange={handleInputChange}>
        <option value="">Select service type</option>
        <option>Residential</option>
        <option>Commercial</option>
        <option>Restaurant</option>
      </select>

      {/* Project Details */}
      <h3>Project Details</h3>
      <select name="windowCount" required onChange={handleInputChange}>
        <option value="">Select window count</option>
        <option>1-10 windows</option>
        <option>11-20 windows</option>
        <option>21-30 windows</option>
        <option>31-50 windows</option>
        <option>50+ windows</option>
      </select>
      <select name="stories" required onChange={handleInputChange}>
        <option value="">Select stories</option>
        <option>1 Story</option>
        <option>2 Stories</option>
        <option>3 Stories</option>
        <option>4+ Stories</option>
      </select>
      <select name="hasScreens" required onChange={handleInputChange}>
        <option value="">Do windows have screens?</option>
        <option>Yes, most windows have screens</option>
        <option>Some windows have screens</option>
        <option>No screens</option>
        <option>Not sure</option>
      </select>
      <select name="frequency" onChange={handleInputChange}>
        <option value="">Desired Service Frequency</option>
        <option>One-time service</option>
        <option>Monthly</option>
        <option>Bi-monthly</option>
        <option>Quarterly</option>
        <option>Twice per year</option>
        <option>Once per year</option>
      </select>

      {/* Additional Services */}
      <h3>Additional Services</h3>
      {['Screen cleaning', 'Window sill cleaning', 'Frame cleaning', 'Pressure washing', 'Gutter cleaning', 'Solar panel cleaning'].map(service => (
        <label key={service}>
          <input
            type="checkbox"
            name="additionalServices"
            value={service}
            onChange={() => handleCheckboxChange(service)}
          />
          {service}
        </label>
      ))}

      {/* File Upload */}
      <h3>Project Photos</h3>
      <input type="file" name="photos" multiple onChange={handleFileUpload} />
      {uploadedFiles.length > 0 && (
        <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index}>
              {file.name}{' '}
              <button type="button" onClick={() => removeFile(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      {/* Special Requests */}
      <textarea
        name="specialRequests"
        placeholder="Special Requests or Additional Information"
        onChange={handleInputChange}
      />

      {/* Contact Preferences */}
      <h3>Contact Preferences</h3>
      <select name="preferredContact" required onChange={handleInputChange}>
        <option value="phone">Phone</option>
        <option value="email">Email</option>
        <option value="text">Text Message</option>
      </select>
      <select name="bestTimeToCall" onChange={handleInputChange}>
        <option value="">Best Time to Call</option>
        <option>Any time</option>
        <option>Morning (8 AM - 12 PM)</option>
        <option>Afternoon (12 PM - 5 PM)</option>
        <option>Evening (5 PM - 8 PM)</option>
        <option>Weekends only</option>
      </select>

      {/* Submit */}
      <button type="submit">Get My Free Estimate</button>
      <p>We'll contact you within 24 hours with your detailed quote.</p>
    </form>
  );
};

export default FreeEstimate;
