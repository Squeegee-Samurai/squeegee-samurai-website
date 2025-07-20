import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Star } from 'lucide-react';
import logo from '../assets/images/squeegee-samurai-logo.jpg'

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img
                src="/src/assets/images/squeegee-samurai-logo.jpg"
                alt="Squeegee Samurai Logo"
                className="h-16 w-auto"
              />
            </div>
            <p className="text-neutral-300 mb-4">
              Professional window cleaning services with an eco-friendly approach, 
              serving Loudoun County, Virginia.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/61578165693932" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/squeegeesamurai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://nextdoor.com/pages/squeegee-samurai-leesburg-va/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.004 5.367 18.635.001 12.017.001zM8.449 7.988c.549-.586 1.34-.878 2.372-.878.754 0 1.401.146 1.942.44.54.293.97.696 1.289 1.21.318.513.478 1.068.478 1.663 0 .878-.274 1.621-.82 2.23-.547.608-1.394.913-2.54.913-.439 0-.827-.146-1.166-.44-.338-.293-.508-.659-.508-1.098 0-.366.122-.659.366-.878.244-.22.549-.329.915-.329.293 0 .537.073.732.22.195.146.293.342.293.586 0 .22-.073.415-.22.586-.146.171-.342.256-.586.256-.171 0-.317-.049-.439-.146-.122-.098-.183-.22-.183-.366 0-.098.024-.183.073-.256.049-.073.122-.122.22-.146v-.073c-.098 0-.171.024-.22.073-.049.049-.073.122-.073.22 0 .122.049.22.146.293.098.073.22.11.366.11.195 0 .366-.073.512-.22.146-.146.22-.317.22-.512 0-.244-.098-.439-.293-.586-.195-.146-.439-.22-.732-.22-.293 0-.549.073-.768.22-.22.146-.366.342-.439.586-.073.244-.11.488-.11.732 0 .512.146.939.439 1.283.293.342.696.512 1.21.512.732 0 1.283-.195 1.651-.586.366-.39.549-.878.549-1.463 0-.488-.122-.915-.366-1.283-.244-.366-.586-.659-1.025-.878-.439-.22-.939-.329-1.5-.329-.732 0-1.366.195-1.9.586-.537.39-.805.939-.805 1.651 0 .366.073.696.22.988.146.293.366.537.659.732.293.195.659.293 1.098.293.512 0 .939-.122 1.283-.366.342-.244.512-.586.512-1.025 0-.293-.073-.537-.22-.732-.146-.195-.342-.293-.586-.293-.195 0-.366.073-.512.22-.146.146-.22.317-.22.512 0 .146.049.268.146.366.098.098.22.146.366.146.098 0 .183-.024.256-.073.073-.049.122-.122.146-.22h.073c0 .171-.073.317-.22.439-.146.122-.317.183-.512.183-.244 0-.439-.073-.586-.22-.146-.146-.22-.342-.22-.586 0-.293.098-.537.293-.732.195-.195.439-.293.732-.293.366 0 .659.122.878.366.22.244.329.549.329.915 0 .512-.195.939-.586 1.283-.39.342-.878.512-1.463.512-.586 0-1.098-.146-1.537-.439-.439-.293-.768-.696-.988-1.21-.22-.512-.329-1.068-.329-1.663 0-.878.244-1.621.732-2.23.488-.608 1.146-.913 1.975-.913z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-neutral-300 hover:text-white">About Us</Link></li>
              <li><Link to="/services" className="text-neutral-300 hover:text-white">Services</Link></li>
              <li><Link to="/service-areas" className="text-neutral-300 hover:text-white">Service Areas</Link></li>
              <li><Link to="/faq" className="text-neutral-300 hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/residential" className="text-neutral-300 hover:text-white">Residential Cleaning</Link></li>
              <li><Link to="/services/commercial" className="text-neutral-300 hover:text-white">Commercial Cleaning</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-accent-400" />
                <span className="text-neutral-300">(540) 335-1059</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-accent-400" />
                <span className="text-neutral-300">james@squeegee-samurai.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-accent-400 mt-1" />
                <span className="text-neutral-300">Serving Loudoun County, VA</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Link
                to="/free-estimate"
                className="bg-accent-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-accent-700 transition-colors inline-block"
              >
                Get Free Estimate
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-neutral-400 text-sm">
              © 2024 Squeegee Samurai. All rights reserved.
            </div>
            <div className="flex items-center mt-4 md:mt-0">
              <div className="flex items-center text-gold-400 mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-neutral-400 text-sm">5-Star Service Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;