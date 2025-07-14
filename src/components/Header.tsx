import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>(540) 335-1059</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>james@squeegee-samurai.com</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Serving Loudoun County, Virginia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-blue-900">
              🥷 Squeegee Samurai
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`font-medium transition-colors ${
                isActive('/about') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              About
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
                className="flex items-center font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Services
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {isServicesOpen && (
                <div
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                  className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2"
                >
                  <Link
                    to="/services"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    All Services
                  </Link>
                  <Link
                    to="/services/residential"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Residential
                  </Link>
                  <Link
                    to="/services/commercial"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Commercial
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/service-areas"
              className={`font-medium transition-colors ${
                isActive('/service-areas') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Service Areas
            </Link>
            <Link
              to="/gallery"
              className={`font-medium transition-colors ${
                isActive('/gallery') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              className={`font-medium transition-colors ${
                isActive('/contact') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Contact
            </Link>
            <Link
              to="/free-estimate"
              className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors"
            >
              Free Estimate
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="font-medium text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link to="/about" className="font-medium text-gray-700 hover:text-blue-600">
                About
              </Link>
              <Link to="/services" className="font-medium text-gray-700 hover:text-blue-600">
                Services
              </Link>
              <Link to="/service-areas" className="font-medium text-gray-700 hover:text-blue-600">
                Service Areas
              </Link>
              <Link to="/gallery" className="font-medium text-gray-700 hover:text-blue-600">
                Gallery
              </Link>
              <Link to="/eco-friendly" className="font-medium text-gray-700 hover:text-blue-600">
                Eco-Friendly
              </Link>
              <Link to="/contact" className="font-medium text-gray-700 hover:text-blue-600">
                Contact
              </Link>
              <Link
                to="/free-estimate"
                className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors text-center"
              >
                Free Estimate
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;