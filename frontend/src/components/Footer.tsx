import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const PHONE_DISPLAY = "(540) 335-1059";
const PHONE_TEL = "5403351059";
const EMAIL = "james@squeegee-samurai.com";

const footerLinks = {
  services: [
    { label: "Residential", to: "/services/residential" },
    { label: "Commercial", to: "/services/commercial" },
    { label: "All Services", to: "/services" },
    { label: "Free Estimate", to: "/free-estimate" },
  ],
  company: [
    { label: "About", to: "/about" },
    { label: "Service Areas", to: "/service-areas" },
    { label: "FAQ", to: "/faq" },
    { label: "Contact", to: "/contact" },
    { label: "Now Hiring", to: "/now-hiring" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-sumi-100 bg-sumi-900" role="contentinfo">
      <div className="section-container py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Brand column */}
          <div className="lg:max-w-xs">
            <img
              src="/images/squeegee-samurai-logo.png"
              alt="Squeegee Samurai"
              className="h-16 w-auto brightness-0 invert"
            />
            <p className="mt-5 text-sm leading-relaxed text-sumi-300">
              Professional window cleaning with the precision and dedication of the samurai.
              Serving homes and businesses throughout Loudoun County, Virginia.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sumi-400">
                Services
              </h4>
              <ul className="mt-4 space-y-2.5">
                {footerLinks.services.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-sumi-300 transition-colors hover:text-washi-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sumi-400">
                Company
              </h4>
              <ul className="mt-4 space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-sumi-300 transition-colors hover:text-washi-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sumi-400">
                Contact
              </h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="flex items-center gap-2.5 text-sm text-sumi-300 transition-colors hover:text-washi-100"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0 text-sumi-500" aria-hidden />
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-2.5 text-sm text-sumi-300 transition-colors hover:text-washi-100"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0 text-sumi-500" aria-hidden />
                    {EMAIL}
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-sumi-300">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sumi-500" aria-hidden />
                  Loudoun County, Virginia
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-sumi-800 pt-8 sm:flex-row">
          <p className="text-xs text-sumi-500">
            &copy; {new Date().getFullYear()} Squeegee Samurai. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-sumi-500 transition-colors hover:text-sumi-300">
              Privacy
            </Link>
            <Link to="/terms" className="text-xs text-sumi-500 transition-colors hover:text-sumi-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
