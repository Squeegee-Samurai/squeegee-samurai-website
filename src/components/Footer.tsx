import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import NextdoorIcon from '../assets/images/icon.svg';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Squeegee Samurai</h3>
            <p className="text-neutral-300 mb-4">
              Professional window cleaning services for homes and businesses throughout Loudoun County, Virginia. 
              Bringing the precision and dedication of the samurai to modern window cleaning.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/squeegeesamurai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://nextdoor.com/pages/squeegee-samurai-leesburg-va/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white transition-colors"
              >
                <NextdoorIcon className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com/squeegeesamurai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-neutral-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-neutral-300 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/services" className="text-neutral-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/service-areas" className="text-neutral-300 hover:text-white transition-colors">Service Areas</Link></li>
              <li><Link to="/contact" className="text-neutral-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/now-hiring" className="text-neutral-300 hover:text-white transition-colors">Now Hiring</Link></li>
              <li><Link to="/free-estimate" className="text-neutral-300 hover:text-white transition-colors">Free Estimate</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary-400" />
                <a href="tel:5403351059" className="text-neutral-300 hover:text-white transition-colors">
                  (540) 335-1059
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary-400" />
                <a href="mailto:james@squeegee-samurai.com" className="text-neutral-300 hover:text-white transition-colors">
                  james@squeegee-samurai.com
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-primary-400 mt-1" />
                <span className="text-neutral-300">
                  Serving Loudoun County, Virginia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © 2025 Squeegee Samurai. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
