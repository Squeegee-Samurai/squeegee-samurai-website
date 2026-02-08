import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, ArrowRight } from "lucide-react";

const PHONE_DISPLAY = "(540) 335-1059";
const PHONE_TEL = "5403351059";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const NAV = {
  primary: [
    { label: "Home", to: "/" },
    {
      label: "Services",
      to: "/services",
      children: [
        { label: "Residential", to: "/services/residential" },
        { label: "Commercial", to: "/services/commercial" },
      ],
    },
    { label: "Service Areas", to: "/service-areas" },
    { label: "About", to: "/about" },
    { label: "FAQ", to: "/faq" },
    { label: "Contact", to: "/contact" },
  ],
  cta: { label: "Free Estimate", to: "/free-estimate" },
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const servicesBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!servicesBtnRef.current) return;
      const target = e.target as Node;
      if (servicesBtnRef.current.contains(target)) return;
      const menu = document.getElementById("services-menu");
      if (menu && menu.contains(target)) return;
      setServicesOpen(false);
    }
    if (servicesOpen) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [servicesOpen]);

  const linkBase =
    "relative px-1 py-2 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors";
  const linkActive = "text-sumi-900";
  const linkIdle = "text-sumi-400 hover:text-sumi-700";
  const underline =
    "after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:bg-aka-600 after:origin-left";

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-washi-50 focus:px-4 focus:py-2 focus:text-sumi-900"
      >
        Skip to content
      </a>

      <header
        className={cx(
          "sticky top-0 z-50 w-full shadow-md transition-all duration-300",
          scrolled
            ? "border-b border-sumi-100 bg-washi-50/95 backdrop-blur-md shadow-lg"
            : "bg-washi-50"
        )}
      >
        <div className="section-container">
          <div className="flex h-20 items-center justify-between lg:h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <img
                src="/images/squeegee-samurai-logo.svg"
                alt="Squeegee Samurai logo"
                className="h-14 w-auto lg:h-[72px]"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
              {NAV.primary.map((item) =>
                item.children ? (
                  <div key={item.label} className="relative">
                    <button
                      ref={servicesBtnRef}
                      type="button"
                      className={cx(
                        linkBase,
                        location.pathname.startsWith("/services")
                          ? cx(linkActive, underline)
                          : linkIdle
                      )}
                      aria-haspopup="menu"
                      aria-expanded={servicesOpen}
                      aria-controls="services-menu"
                      onClick={() => setServicesOpen((v) => !v)}
                    >
                      {item.label}
                      <ChevronDown
                        className={cx(
                          "ml-1 inline-block h-3 w-3 transition-transform",
                          servicesOpen && "rotate-180"
                        )}
                        aria-hidden
                      />
                    </button>

                    <div
                      id="services-menu"
                      role="menu"
                      aria-label="Services"
                      className={cx(
                        "absolute left-0 mt-3 w-52 rounded border border-sumi-100 bg-washi-50 p-1.5 shadow-lg",
                        servicesOpen ? "block" : "hidden"
                      )}
                    >
                      <NavLink
                        to="/services"
                        end
                        className={({ isActive }) =>
                          cx(
                            "block rounded-sm px-3 py-2 text-[13px] font-medium",
                            isActive
                              ? "bg-sumi-50 text-sumi-900"
                              : "text-sumi-500 hover:bg-sumi-50 hover:text-sumi-800"
                          )
                        }
                        role="menuitem"
                      >
                        All Services
                      </NavLink>
                      <div className="my-1.5 h-px bg-sumi-100" />
                      {item.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className={({ isActive }) =>
                            cx(
                              "block rounded-sm px-3 py-2 text-[13px] font-medium",
                              isActive
                                ? "bg-sumi-50 text-sumi-900"
                                : "text-sumi-500 hover:bg-sumi-50 hover:text-sumi-800"
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
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      cx(linkBase, isActive ? cx(linkActive, underline) : linkIdle)
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}
            </nav>

            {/* Right side */}
            <div className="hidden items-center gap-4 lg:flex">
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-1.5 text-[13px] font-medium text-sumi-500 transition-colors hover:text-sumi-800"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden />
                {PHONE_DISPLAY}
              </a>
              <NavLink
                to={NAV.cta.to}
                className="btn-primary gap-2"
              >
                {NAV.cta.label}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </NavLink>
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center justify-center rounded-sm border border-sumi-200 p-2 text-sumi-600 hover:bg-sumi-50"
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
                className="inline-flex items-center justify-center rounded-sm p-2 text-sumi-700 hover:bg-sumi-50"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile overlay */}
        <div
          id="mobile-menu"
          className={cx(
            "fixed inset-0 z-[60] bg-sumi-900/20 backdrop-blur-sm transition-opacity lg:hidden",
            mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
          aria-hidden={!mobileOpen}
        />

        {/* Mobile panel */}
        <div
          className={cx(
            "fixed inset-y-0 right-0 z-[70] w-full max-w-sm transform bg-washi-50 shadow-2xl transition-transform lg:hidden",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex h-20 items-center justify-between border-b border-sumi-100 px-5">
            <Link
              to="/"
              className="flex items-center"
              onClick={() => setMobileOpen(false)}
            >
              <img
                src="/images/squeegee-samurai-logo.svg"
                alt="Squeegee Samurai logo"
                className="h-12 w-auto"
              />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center rounded-sm p-2 text-sumi-600 hover:bg-sumi-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="overflow-y-auto p-5">
            <ul className="space-y-1">
              {NAV.primary.map((item) =>
                item.children ? (
                  <li key={item.label}>
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between rounded-sm px-3 py-2.5 text-sm font-medium text-sumi-700 hover:bg-sumi-50">
                        <span>{item.label}</span>
                        <ChevronDown className="h-4 w-4 text-sumi-400 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="ml-3 mt-1 space-y-0.5 border-l border-sumi-100 pl-3">
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
                      end={item.to === "/"}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        cx(
                          "block rounded-sm px-3 py-2.5 text-sm font-medium",
                          isActive
                            ? "bg-sumi-50 text-sumi-900"
                            : "text-sumi-600 hover:bg-sumi-50 hover:text-sumi-800"
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>

            <div className="my-5 h-px bg-sumi-100" />

            <div className="flex flex-col gap-3">
              <NavLink
                to={NAV.cta.to}
                onClick={() => setMobileOpen(false)}
                className="btn-primary justify-center gap-2"
              >
                {NAV.cta.label}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </NavLink>
              <a
                href={`tel:${PHONE_TEL}`}
                className="btn-outline justify-center gap-2"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden />
                {PHONE_DISPLAY}
              </a>
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
        cx(
          "block rounded-sm px-3 py-2 text-sm",
          isActive
            ? "text-sumi-900 font-medium"
            : "text-sumi-500 hover:text-sumi-700"
        )
      }
    >
      {children}
    </NavLink>
  );
}
