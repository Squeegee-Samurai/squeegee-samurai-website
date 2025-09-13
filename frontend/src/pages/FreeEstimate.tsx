import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const FreeEstimate = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);


  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: 'both', city: '', zipCode: '', propertyType: '',
    serviceType: '', windowCount: '', stories: '', screenCount: '',
    frequency: '', additionalServices: [] as string [], specialRequests: '', uploadedFile, 
    preferredContact: 'phone', bestTimeToCall: ''
  });

  const COMMERCIAL_PROPS = new Set([
  "Office Building",
  "Retail Store",
  "Restaurant",
  "Other Commercial",
]);

function inferSegment(propertyType?: string) {
  if (!propertyType) return undefined;
  return COMMERCIAL_PROPS.has(propertyType) ? "commercial" : "residential";
}

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

  const windowCount = parseInt(formData.windowCount) || 0;
  const screenCount = parseInt(formData.screenCount) || 0;

  const pricePerWindow =
  formData.serviceType === 'interior' ? 7 :
  formData.serviceType === 'exterior' ? 10 :
  17; 

  const estimatedQuote = (windowCount * pricePerWindow) + (screenCount * 5) + 50;


    const templateParams = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    city: formData.city,
    zipCode: formData.zipCode,
    propertyType: formData.propertyType,
    serviceType: formData.serviceType,
    stories: formData.stories,
    windowCount: formData.windowCount,
    screenCount: formData.screenCount,
    additionalServices: formData.additionalServices.join(', '), 
    uploadedPhoto: formData.uploadedFile,
    preferredContact: formData.preferredContact,
    bestTimeToCall: formData.bestTimeToCall,
    estimatedQuote: `$${estimatedQuote.toFixed(2)}`
  };

    e.preventDefault();
    const form = e.currentTarget;

    const data = new FormData(form);
    data.append('form-name', 'free-estimate');
    formData.additionalServices.forEach(service => data.append('additionalServices', service));

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data as any).toString(),
    })

      emailjs.send(
      'service_smyhfg9',      // Replace with owner EmailJS service ID
      'template_vd06lvr',     // Replace with owner EmailJS template ID
      templateParams,
      'tP8oeE5EOGJQXkvGp'       // Replace owner EmailJS public key
    )

    .then(() => navigate('/thank-you', { state: { estimatedQuote } }))
    .catch((error) => alert('Submission failed: ' + error));


};

  return (

    <div className="parallax-clouds min-h-screen bg-neutral-50 px-4 py-8">
        <div className="text-center mb-6">
          <h2 className="text-4xl text-orange-500 font-bold mb-4">Get Your Free Estimate</h2>
          <p>Tell us about your project and we'll provide a free estimated quote and a detailed quote within 24 hours.</p>
    </div>
      <div className="flex justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-md">
          <form
            name="free-estimate"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="free-estimate" />
            <input type="hidden" name="bot-field" />

            {/* Contact Info */}
            {/* Contact Info Bubble */}

              <h3 className="text-lg font-bold mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="firstName"
                  placeholder="First Name *"
                  required
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
                <input
                  name="lastName"
                  placeholder="Last Name *"
                  required
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address *"
                  required
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
                <input
                  name="phone"
                  placeholder="Phone Number *"
                  required
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>

              {/* Property Info Bubble */}
                <h3 className="text-lg font-bold mb-4">Property Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <input
                    name="address"
                    placeholder="Property Address *"
                    required
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                  <input
                    name="city"
                    placeholder="City *"
                    required
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                  <input
                    name="zipCode"
                    placeholder="ZIP Code *"
                    required
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                  <select
                    name="propertyType"
                    required
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  >
                    <option value="">Select property</option>
                    <option>Single Family Home</option>
                    <option>Townhouse</option>
                    <option>Condominium</option>
                    <option>Apartment</option>
                    <option>Office Building</option>
                    <option>Retail Store</option>
                    <option>Restaurant</option>
                    <option>Other Commercial</option>
                  </select>
                  <select
                  name="serviceType"
                  required
                  value={formData.serviceType}     // <-- controlled
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="both">Interior + Exterior (recommended)</option>
                  <option value="interior">Interior only</option>
                  <option value="exterior">Exterior only</option>
                </select>
                </div>


            {/* Project Details */}
            <h3 className="text-lg font-bold mb-4">Project Details</h3>
            <div className='mb-6 max-w-md'>
              <label htmlFor="windowCount" className="block text-sm font-medium text-neutral-700 mb-2">
                Number of Windows</label>
              <input
                type="number"
                name="windowCount"
                id="windowCount"
                min="1"
                required
                value={formData.windowCount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                placeholder='Enter a number (min 1)'        
              />
            </div>
            <select name="stories" required onChange={handleInputChange}>
              <option value="">Select stories</option>
              <option>1 Story</option>
              <option>2 Stories</option>
              <option>3 Stories</option>
              <option>4+ Stories</option>
            </select>
            <div className='mb-6 max-w-md'>
              <label htmlFor="screenCount" className="block text-sm font-medium text-neutral-700 mb-2">
                Number of Screens</label>
              <input
                type="number"
                name="screenCount"
                id="screenCount"
                min="1"
                required
                value={formData.screenCount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                placeholder='Enter a number (min 1)'        
              />
            </div>
            <select name="frequency" onChange={handleInputChange}>
              <option value="">Desired Service Frequency</option>
              <option>One-time service</option>
              <option>Quarterly</option>
              <option>Monthly</option>
            </select>

            <h3 className="text-lg font-bold mb-4">File Upload</h3>
            <input 
            type="file" 
            id="fileInput" 
            accept="image/*,application/pdf" 
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setUploadedFile(e.target.files[0]);
              }
            }} 
          />

            {/* Additional Services */}
            <h3 className="text-lg font-bold mb-4">Additional Services</h3>
            <div className='flex flex-col space-y-2'>
                    {[' Screen cleaning', ' Window sill cleaning', ' Frame cleaning', ' Pressure washing', ' Gutter cleaning', ' Solar panel cleaning'].map(service => (
              <label key={service}>
              <input
                type="checkbox"
                name="additionalServices"
                value={service}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const { checked, value } = e.target;
                  setFormData(prev => {
                    const current = new Set(prev.additionalServices);
                    if (checked) {
                      current.add(value);
                    } else {
                      current.delete(value);
                    }
                    return { ...prev, additionalServices: Array.from(current) };
                  });
                }}
              />
              {service}
            </label>
            
            ))}
            </div>


            {/* Contact Preferences */}
            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
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
            <button type="submit"
            className='block w-full bg-white border-2 border-orange text-orange px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-accent-600 transition-colors'>Get My Free Estimate</button>
            <p className='text-center'>*Please note that all quotes provided are estimates and are subject to change upon on-site evaluation. 
              Final pricing may vary based on factors such as: Window height, Window condition, Special equipment requirements, Accessibility challenges. 
              Windows located at greater heights or in hard-to-reach areas may incur additional charges due to the increased time, labor, and safety 
              measures required. We strive to provide accurate estimates, but reserve the right to adjust pricing to reflect the actual scope of work.</p>
            <p className='text-center'>We'll contact you within 24 hours with your detailed quote.</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FreeEstimate;

