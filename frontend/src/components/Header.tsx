import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/auth';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import logo from '../assets/images/squeegee-samurai-logo.jpg';
import logo2 from '../assets/images/squeegee-samurai-logo2.png';



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); //change this to a logged out page at some point
  }


  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary-800 text-white py-2">
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
            <div className="hidden md:flex items-center space-x-4">
            {user && (
              <>
                <span className="border-l border-white pl-4">
                  Hello, {user.fullName}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-white underline hover:text-neutral-300 text-sm"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center relative z-10">
            <img
              src={logo2}
              alt="Squeegee Samurai Logo"
              className="h-20 w-auto scale-125 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-primary-600' : 'text-neutral-700 hover:text-primary-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`font-medium transition-colors ${
                isActive('/about') ? 'text-primary-600' : 'text-neutral-700 hover:text-primary-600'
              }`}
            >
              About
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`flex items-center font-medium transition-colors ${
                  location.pathname.startsWith('/services') ? 'text-primary-600' : 'text-neutral-700 hover:text-primary-600'
                }`}
              >
                Services
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {isServicesOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-neutral-200 py-2"
                >
                  <Link
                    to="/services"
                    onClick={() => setIsServicesOpen(false)}
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    All Services
                  </Link>
                  <Link
                    to="/services/residential"
                    onClick={() => setIsServicesOpen(false)}
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Residential
                  </Link>
                  <Link
                    to="/services/commercial"
                    onClick={() => setIsServicesOpen(false)}
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Commercial
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/service-areas"
              className={`font-medium transition-colors ${
                isActive('/service-areas') ? 'text-primary-600' : 'text-neutral-700 hover:text-primary-600'
              }`}
            >
              Service Areas
            </Link>
            <Link
              to="/contact"
              className={`font-medium transition-colors ${
                isActive('/contact') ? 'text-primary-600' : 'text-neutral-700 hover:text-primary-600'
              }`}
            >
              Contact
            </Link>
            <Link
              to="/now-hiring"
              className={`font-medium transition-colors ${
                isActive('/now-hiring') ? 'text-primary-600' : 'text-neutral-700 hover:text-primary-600'
              }`}
            >
              Careers
            </Link>

            {!user && (
            <Link
              to="/login"
              className="font-medium text-neutral-700 hover:text-primary-600"
            >
              Login
            </Link>
          )}

            
            <Link
              to="/free-estimate"
              className="bg-accent-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-accent-600 transition-colors"
            >
              Free Estimate
            </Link>
            
            {user?.role === 'EMPLOYEE' && (
              <Link
              to="/jobs"
              className="bg-accent-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-accent-600 transition-colors"
            >
              Portal
            </Link>
            )}

          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-neutral-700 hover:text-primary-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="font-medium text-neutral-700 hover:text-primary-600"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMenuOpen(false)}
                className="font-medium text-neutral-700 hover:text-primary-600"
              >
                About
              </Link>
              <Link 
                to="/services" 
                onClick={() => setIsMenuOpen(false)}
                className="font-medium text-neutral-700 hover:text-primary-600"
              >
                Services
              </Link>
              <Link 
                to="/service-areas" 
                onClick={() => setIsMenuOpen(false)}
                className="font-medium text-neutral-700 hover:text-primary-600"
              >
                Service Areas
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsMenuOpen(false)}
                className="font-medium text-neutral-700 hover:text-primary-600"
              >
                Contact
              </Link>
              <Link 
                to="/now-hiring" 
                onClick={() => setIsMenuOpen(false)}
                className="font-medium text-neutral-700 hover:text-primary-600"
              >
                Now Hiring
              </Link>
              
              {user ? (
  <>
              <span className="font-medium text-neutral-700">
                Hello, {user.fullName}
              </span>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="font-medium text-neutral-700 hover:text-primary-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              onClick={() => setIsMenuOpen(false)}
              className="font-medium text-neutral-700 hover:text-primary-600"
            >
              Login
            </Link>
          )}

              <Link
                to="/free-estimate"
                onClick={() => setIsMenuOpen(false)}
                className="bg-accent-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-accent-600 transition-colors text-center"
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