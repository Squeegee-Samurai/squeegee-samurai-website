
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

const PHONE_DISPLAY = "540-335-1059";
const PHONE_TEL = "5403351059";

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Top-level links (some have children)
const NAV = {
  primary: [
    { label: "Home", to: "/" },
    {
      label: "Services",
      to: "/services",
      children: [
        { label: "Residential Services", to: "/services/residential" },
        { label: "Commercial Services", to: "/services/commercial" },
      ],
    },
    // Seasonal link highlighted
    { label: "Holiday Lighting", to: "/holiday-lighting", highlight: true },
    { label: "Service Areas", to: "/service-areas" },
    { label: "FAQ", to: "/faq" },
    { label: "Contact", to: "/contact" },
  ],
  auth: [
    { label: "Login", to: "/login" },
    { label: "Sign Up", to: "/signup" },
  ],
  cta: { label: "Free Estimate", to: "/free-estimate" },
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const servicesBtnRef = useRef<HTMLButtonElement | null>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Close services dropdown when clicking outside
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!servicesBtnRef.current) return;
      const btn = servicesBtnRef.current;
      const menu = document.getElementById("services-menu");
      const target = e.target as Node;
      if (btn.contains(target)) return;
      if (menu && menu.contains(target)) return;
      setServicesOpen(false);
    }
    if (servicesOpen) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [servicesOpen]);

  const linkBase =
    "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors";
  const linkActive = "text-slate-900";
  const linkIdle = "text-slate-600 hover:text-slate-900";

  return (
    <>
      {/* Skip to content for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <img 
                  src="/images/squeegee-samurai-logo.png" 
                  alt="Squeegee Samurai" 
                  className="h-12 w-auto"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight text-slate-900">
                    Squeegee Samurai
                  </span>
                  <span className="text-xs text-slate-600 italic">
                    Clarity through Pane
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 lg:flex">
              {/* Primary links */}
              {NAV.primary.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                  >
                    <button
                      ref={servicesBtnRef}
                      type="button"
                      className={classNames(
                        linkBase,
                        location.pathname.startsWith("/services")
                          ? linkActive
                          : linkIdle
                      )}
                      aria-haspopup="menu"
                      aria-expanded={servicesOpen}
                      aria-controls="services-menu"
                      onClick={() => setServicesOpen((v) => !v)}
                    >
                      {item.label}
                      <ChevronDown
                        className={classNames(
                          "ml-1 h-4 w-4 transition-transform",
                          servicesOpen && "rotate-180"
                        )}
                        aria-hidden
                      />
                    </button>

                    {/* Dropdown panel */}
                    <div
                      id="services-menu"
                      role="menu"
                      aria-label="Services"
                      className={classNames(
                        "absolute left-0 mt-2 w-64 rounded-lg border border-slate-200 bg-white p-2 shadow-lg",
                        servicesOpen ? "block" : "hidden"
                      )}
                    >
                      <NavLink
                        to="/services"
                        className={({ isActive }) =>
                          classNames(
                            "block rounded-md px-3 py-2 text-sm",
                            isActive
                              ? "bg-slate-100 text-slate-900"
                              : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                          )
                        }
                        role="menuitem"
                      >
                        All Services
                      </NavLink>
                      <div className="my-2 h-px bg-slate-100" />
                      {item.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className={({ isActive }) =>
                            classNames(
                              "block rounded-md px-3 py-2 text-sm",
                              isActive
                                ? "bg-slate-100 text-slate-900"
                                : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                            )
                          }
                          role="menuitem"
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    className={({ isActive }) =>
                      classNames(
                        linkBase,
                        isActive ? linkActive : linkIdle,
                        item.highlight &&
                          "font-semibold text-rose-700 hover:text-rose-800"
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}

              {/* CTA */}
              <div className="ml-2">
                <NavLink
                  to={NAV.cta.to}
                  className="inline-flex items-center rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  {NAV.cta.label}
                </NavLink>
              </div>

              {/* Phone */}
              <a
                href={`tel:${PHONE_TEL}`}
                className="ml-2 hidden items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 lg:inline-flex"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {PHONE_DISPLAY}
              </a>
            </nav>

            {/* Mobile controls */}
            <div className="flex items-center lg:hidden">
              <a
                href={`tel:${PHONE_TEL}`}
                className="mr-2 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
                aria-label={`Call ${PHONE_DISPLAY}`}
              >
                <Phone className="h-4 w-4" aria-hidden />
              </a>

              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileOpen(true)}
                className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu overlay */}
        <div
          id="mobile-menu"
          className={classNames(
            "fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm transition-opacity lg:hidden",
            mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
          aria-hidden={!mobileOpen}
        />

        {/* Mobile panel */}
        <div
          className={classNames(
            "fixed inset-y-0 right-0 z-[70] w-full max-w-sm transform bg-white shadow-xl transition-transform lg:hidden",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
            >
              <img 
                src="/images/squeegee-samurai-logo.png" 
                alt="Squeegee Samurai" 
                className="h-10 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-slate-900">
                  Squeegee Samurai
                </span>
                <span className="text-[10px] text-slate-600 italic">
                  Clarity through Pane
                </span>
              </div>
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="overflow-y-auto bg-white p-3">
            <ul className="space-y-1">
              {NAV.primary.map((item) =>
                item.children ? (
                  <li key={item.label} className="rounded-lg border border-slate-200">
                    <details>
                      <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-800">
                        <span>{item.label}</span>
                        <ChevronDown className="h-4 w-4" />
                      </summary>
                      <div className="border-t border-slate-100">
                        <MobileLink to="/services" onClick={() => setMobileOpen(false)}>
                          All Services
                        </MobileLink>
                        {item.children.map((child) => (
                          <MobileLink
                            key={child.to}
                            to={child.to}
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </MobileLink>
                        ))}
                      </div>
                    </details>
                  </li>
                ) : (
                  <li key={item.label}>
                    <NavLink
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        classNames(
                          "block rounded-md px-3 py-2 text-sm font-medium",
                          item.highlight
                            ? "text-rose-700"
                            : isActive
                              ? "bg-slate-100 text-slate-900"
                              : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>

            <div className="mt-3 h-px bg-slate-100" />

            <div className="mt-3 grid gap-2">
              <NavLink
                to={NAV.cta.to}
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-600"
              >
                {NAV.cta.label}
              </NavLink>

              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {PHONE_DISPLAY}
              </a>
            </div>

            {/* Optional auth links */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {NAV.auth.map((a) => (
                <NavLink
                  key={a.to}
                  to={a.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    classNames(
                      "inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium",
                      isActive
                        ? "border-slate-300 bg-slate-50 text-slate-900"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    )
                  }
                >
                  {a.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

function MobileLink({
  to,
  onClick,
  children,
}: {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        classNames(
          "block px-3 py-2 text-sm",
          isActive
            ? "bg-slate-100 text-slate-900"
            : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
        )
      }
    >
      {children}
    </NavLink>
  );
}
