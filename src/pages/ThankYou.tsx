import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, Phone, Mail } from 'lucide-react';

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-accent-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">Thank You!</h1>
          <p className="text-lg text-neutral-600 mb-6">
            Your submission has been received. We'll be in touch soon to discuss your window cleaning needs.
          </p>

          <div className="bg-primary-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-primary-900 mb-2">What happens next?</h3>
            <ul className="text-left text-primary-800 space-y-2">
              <li>• We'll review your information within 24 hours</li>
              <li>• A team member will contact you to discuss your needs</li>
              <li>• We'll schedule a convenient time for your service</li>
              <li>• You'll receive a detailed quote for your project</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
<a
  href="https://squeegee-samurai.com"
  className="flex items-center justify-center bg-primary-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors"
>
            <a
              href="tel:5403351059"
              className="flex items-center justify-center bg-accent-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-accent-700 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call (540) 335-1059
            </a>
            <a
              href="mailto:james@squeegee-samurai.com"
              className="flex items-center justify-center bg-neutral-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-neutral-700 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
