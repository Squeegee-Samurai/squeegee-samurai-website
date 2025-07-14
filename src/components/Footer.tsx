import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Star } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4">🥷 Squeegee Samurai</div>
            <p className="text-gray-300 mb-4">
              Professional window cleaning services with an eco-friendly approach, 
              serving Loudoun County, Virginia.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white">Services</Link></li>
              <li><Link to="/service-areas" className="text-gray-300 hover:text-white">Service Areas</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-white">Gallery</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/residential" className="text-gray-300 hover:text-white">Residential Cleaning</Link></li>
              <li><Link to="/services/commercial" className="text-gray-300 hover:text-white">Commercial Cleaning</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-green-400" />
                <span className="text-gray-300">(540) 335-1059</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-green-400" />
                <span className="text-gray-300">james@squeegee-samurai.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-green-400 mt-1" />
                <span className="text-gray-300">Serving Loudoun County, VA</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Link
                to="/free-estimate"
                className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors inline-block"
              >
                Get Free Estimate
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 Squeegee Samurai. All rights reserved.
            </div>
            <div className="flex items-center mt-4 md:mt-0">
              <div className="flex items-center text-yellow-400 mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-gray-400 text-sm">5-Star Service Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;