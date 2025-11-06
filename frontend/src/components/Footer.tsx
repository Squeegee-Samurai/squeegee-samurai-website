import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

const PHONE_DISPLAY = "(540) 335-1059";
const PHONE_TEL = "5403351059";
const EMAIL = "james@squeegee-samurai.com";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-2xl font-bold">Squeegee Samurai</h3>
            <p className="mb-4 text-neutral-300">
              Professional window cleaning services for homes and businesses
              throughout Loudoun County, Virginia. Bringing the precision and
              dedication of the samurai to modern window cleaning.
            </p>

            <div className="flex space-x-4">
              https://facebook.com/squeegeesamurai
                <Facebook className="h-6 w-6" aria-hidden />
              </a>
              https://instagram.com/squeegeesamurai
                <Instagram className="h-6 w-6" aria-hidden />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-neutral-300 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-neutral-300 hover:text-white">About</Link></li>
              <li><Link to="/services" className="text-neutral-300 hover:text-white">Services</Link></li>
              <li><Link to="/services/residential" className="text-neutral-300 hover:text-white">Residential Services</Link></li>
              <li><Link to="/services/commercial" className="text-neutral-300 hover:text-white">Commercial Services</Link></li>
              <li><Link to="/service-areas" className="text-neutral-300 hover:text-white">Service Areas</Link></li>
              <li><Link to="/holiday-lighting" className="text-neutral-300 hover:text-white">Holiday Lighting</Link></li>
              <li><Link to="/faq" className="text-neutral-300 hover:text-white">FAQ</Link></li>
              <li><Link to="/contact" className="text-neutral-300 hover:text-white">Contact</Link></li>
              <li><Link to="/now-hiring" className="text-neutral-300 hover:text-white">Now Hiring</Link></li>
              <li><Link to="/free-estimate" className="text-neutral-300 hover:text-white">Free Estimate</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-slate-400" aria-hidden />
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="text-neutral-300 hover:text-white"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-slate-400" aria-hidden />
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-neutral-300 hover:text-white"
                >
                  {EMAIL}
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-3 mt-1 h-5 w-5 text-slate-400" aria-hidden />
                <span className="text-neutral-300">
                  Serving Loudoun County, Virginia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 md:flex-row">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} Squeegee Samurai. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-neutral-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-neutral-400 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
