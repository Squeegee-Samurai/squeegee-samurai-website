import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import './Home.css';

//discounts: 1stclean = 10%, PTPSC = 15%, refer5 = 20%

const FreeEstimate = () => {
  const navigate = useNavigate();
  //const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);


  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', zipCode: '', propertyType: '',
    serviceType: 'Interior+Exterior', windowCount: '', stories: '', screenCount: '',
    frequency: '', additionalServices: [] as string [], specialRequests: '', 
    preferredContact: '', bestTimeToCall: '', couponCode: '',
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


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

  const windowCount = parseInt(formData.windowCount) || 0;
  const screenCount = parseInt(formData.screenCount) || 0;

  const pricePerWindow =
  formData.serviceType === 'interior' ? 7 :
  formData.serviceType === 'exterior' ? 10 :
  17; 

  const estimatedQuote = (windowCount * pricePerWindow) + (screenCount * 5) + 50;

  const code = (formData.couponCode || '')
  .trim()
  .toLowerCase(); // normalize

const discounts: Record<string, number> = {
  '1stclean': 0.10,
  'ptpsc':    0.15,
  'refer5':   0.20,
};

const discount = discounts[code] ?? 0;
const finalQuote = Math.max(0, Math.round(estimatedQuote * (1 - discount)));



  e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;

    const st = (form.querySelector('[name="serviceType"]') as HTMLSelectElement)?.value || '';
    let echo = form.querySelector('input[name="serviceTypeEcho"]') as HTMLInputElement | null;
    if(!echo) {
      echo = document.createElement('input');
      echo.type = 'hidden';
      echo.name = 'serviceTypeEcho';
      form.appendChild(echo);
    }
    echo.value = st;
    
    //debugging file upload
    console.log('files selected:',
    (form.querySelector('input[name="uploaded_file"]') as HTMLInputElement)
      ?.files?.length
);

      // Ensure EmailJS can receive the computed quote (expects a field in the form)
      let hidden = form.querySelector('input[name="estimatedQuote"]') as HTMLInputElement | null;
      if (!hidden) {
        hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.name = 'estimatedQuote';
        form.appendChild(hidden);
      }
      hidden.value = `$${finalQuote.toFixed(2)}`;

      let couponField = form.querySelector('input[name="couponCode"]') as HTMLInputElement | null;
      if (!couponField) {
        couponField = document.createElement('input');
        couponField.type = 'hidden';
        couponField.name = 'couponCode';
        form.appendChild(couponField);
      }
      couponField.value = formData.couponCode || '';

  
     // --- EmailJS FIRST (so the file is still on the form) ---
    await emailjs.sendForm(
      'service_smyhfg9',      // EmailJS service ID
      'template_vd06lvr',     // EmailJS template ID
      form,                   // the <form> element
      'tP8oeE5EOGJQXkvGp'     // EmailJS public key
    );

    // --- Netlify submit as multipart/form-data (includes the file) ---
    try {
      const netlifyData = new FormData(form);
      netlifyData.append('form-name', 'free-estimate');
      formData.additionalServices.forEach((service) =>
        netlifyData.append('additionalServices', service)
      );

      await fetch('/', {
        method: 'POST',
        body: netlifyData, // don't set Content-Type manually
      });
    } catch (e) {
      console.warn('Netlify submission failed (continuing):', e);
    }

    navigate('/thank-you', { state: { estimatedQuote: finalQuote } });

  };

  return (

    <div className="parallax-clouds min-h-screen bg-neutral-50 px-4 py-8">
        <div className="text-center mb-6">
    </div>
      <div className="flex justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-2xl">
      <h2 className="text-4xl text-center text-orange-500 font-bold mb-4">Get Your Free Estimate</h2>
          <p className='text-center'>Tell us about your project and we'll provide a free estimated quote and a detailed quote within 24 hours.</p>
          <form
            name="free-estimate"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="free-estimate" />
            <input type="hidden" name="estimatedQuote" />
            <input type="hidden" name="bot-field" />
            <input type ="hidden" name="serviceTypeEcho" />
            <input type="hidden" name="couponCode" />


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
            <div className="flex flex-col">
            <label htmlFor="stories" className="mb-1 text-sm font-medium text-neutral-700">
              Number of Stories
            </label>
            <select
              id="stories"
              name="stories"
              required
              onChange={handleInputChange}
              defaultValue=""
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-800 shadow-sm outline-none transition
                        focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            >
              <option value="" disabled>
                Select stories
              </option>
              <option value="1">1 Story</option>
              <option value="2">2 Stories</option>
              <option value="3">3 Stories</option>
              <option value="4+">4+ Stories</option>
            </select>
          </div>

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
            <div className="flex flex-col">
            <label htmlFor="frequency" className="mb-1 text-sm font-medium text-neutral-700">
              Desired Service Frequency
            </label>
            <select
              id="frequency"
              name="frequency"
              onChange={handleInputChange}
              defaultValue=""
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-800 shadow-sm outline-none transition
                        focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option>One-time service</option>
              <option>Weekly</option>
              <option>Quarterly</option>
              <option>Monthly</option>
            </select>
            {/* Optional helper text */}
            <p className="mt-1 text-xs text-neutral-500">You can change this anytime.</p>
          </div>

          
            {/* } <h3 className="text-lg font-bold mb-4">File Upload</h3>
             <input
            type="file"
            id="fileInput"
            name="uploaded_file"             
            multiple accept="image/*,application/pdf"
  /> */}

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
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Preferred Contact */}
              <div className="flex flex-col">
                <label htmlFor="preferredContact" className="mb-1 text-sm font-medium text-neutral-700">
                  Preferred Contact
                </label>
                <select
                  id="preferredContact"
                  name="preferredContact"
                  required
                  onChange={handleInputChange}
                  className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-800 shadow-sm outline-none transition
                            focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="text">Text Message</option>
                </select>
                <p className="mt-1 text-xs text-neutral-500">We’ll use this for follow-up on your quote.</p>
              </div>

              {/* Best Time to Call */}
              <div className="flex flex-col">
                <label htmlFor="bestTimeToCall" className="mb-1 text-sm font-medium text-neutral-700">
                  Best Time to Call
                </label>
                <select
                  id="bestTimeToCall"
                  name="bestTimeToCall"
                  onChange={handleInputChange}
                  className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-800 shadow-sm outline-none transition
                            focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose a time window
                  </option>
                  <option>Any time</option>
                  <option>Morning (8 AM – 12 PM)</option>
                  <option>Afternoon (12 PM – 5 PM)</option>
                  <option>Evening (5 PM – 8 PM)</option>
                  <option>Weekends only</option>
                </select>
              </div>
            </div>
            <input
                  name="couponCode"
                  placeholder="Coupon Code (optional)"
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />

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

