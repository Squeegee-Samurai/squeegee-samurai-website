import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Leaf,
  Star,
  Phone,
  CheckCircle,
  Users,
  Building,
  ArrowRight,
  Droplets,
} from "lucide-react";

function useParallax(speed = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function onScroll() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (visible) {
        setOffset(window.scrollY * speed);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return { ref, offset };
}

const SERVICES = [
  {
    icon: Users,
    title: "Residential",
    description:
      "Interior and exterior window cleaning for homes, townhouses, and condos throughout Loudoun County.",
    features: ["Interior & exterior cleaning", "Screen cleaning", "Sill & frame cleaning"],
    to: "/services/residential",
  },
  {
    icon: Building,
    title: "Commercial",
    description:
      "Scheduled maintenance for offices, retail storefronts, and commercial buildings.",
    features: ["Scheduled maintenance", "High-traffic area focus", "Flexible scheduling"],
    to: "/services/commercial",
  },
  {
    icon: Droplets,
    title: "Additional Services",
    description:
      "Pressure washing, gutter cleaning, and specialized exterior cleaning services.",
    features: ["Pressure washing", "Gutter cleaning", "Solar panel cleaning"],
    to: "/services",
  },
];

const AREAS = [
  "Ashburn",
  "Leesburg",
  "Sterling",
  "Herndon",
  "Reston",
  "Purcellville",
  "Middleburg",
  "Hamilton",
];

const Home = () => {
  const { ref: heroRef, offset: heroOffset } = useParallax(0.35);

  return (
    <div>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative overflow-hidden bg-sumi-900">
        {/* Parallax background image */}
        <div
          className="absolute inset-[-20%] bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: "url('/images/hero-storefront.jpg')",
            transform: `translateY(${heroOffset}px)`,
          }}
        >
          <div className="absolute inset-0 bg-sumi-900/60" />
        </div>

        {/* Geometric accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-washi-200/20" />

        <div className="section-container relative z-10 flex min-h-[620px] items-center py-24">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-washi-200/80">
              Loudoun County, Virginia
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-washi-50 sm:text-5xl lg:text-6xl">
              Precision window
              <br />
              cleaning, refined.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-washi-200/90 sm:text-lg">
              Professional and eco-friendly window care for homes and businesses.
              The samurai approach to every pane.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link to="/free-estimate" className="btn-primary gap-2 px-8 py-4 text-sm">
                Get Free Estimate
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href="tel:5403351059"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-washi-200/30 px-7 py-3.5 text-sm font-medium tracking-wide text-washi-100 transition-colors hover:border-washi-100 hover:bg-washi-50/10"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Call an Expert
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="border-b border-sumi-100 bg-washi-50">
        <div className="section-container py-14">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Fully Insured",
                text: "Licensed and insured for your peace of mind. We protect your property and our team.",
              },
              {
                icon: Leaf,
                title: "Eco-Friendly",
                text: "Biodegradable cleaning solutions safe for your family, pets, and the environment.",
              },
              {
                icon: Star,
                title: "5-Star Rated",
                text: "Consistently rated 5 stars. Quality work and exceptional customer service.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-sumi-100 bg-washi-100">
                  <item.icon className="h-5 w-5 text-aka-600" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-sumi-800">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-sumi-500">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="bg-washi-100 py-20 lg:py-24">
        <div className="section-container">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
              What We Do
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-sumi-900 sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 text-base leading-relaxed text-sumi-500">
              Comprehensive window cleaning solutions for every need, delivered with
              discipline and care.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="group flex flex-col rounded border border-sumi-100 bg-washi-50 p-7 transition-shadow hover:shadow-md"
              >
                <service.icon className="h-6 w-6 text-aka-600" />
                <h3 className="mt-5 font-display text-xl font-semibold text-sumi-900">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-sumi-500">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-sumi-600">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-aka-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={service.to}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-sumi-800 transition-colors group-hover:text-aka-600"
                >
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Highlight ── */}
      <section className="bg-washi-50 py-20 lg:py-24">
        <div className="section-container">
          <div className="mx-auto max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
              Common Questions
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-sumi-900 sm:text-4xl">
              Frequently Asked
            </h2>
            <div className="mt-10 divide-y divide-sumi-100">
              {[
                {
                  q: "How often should I clean my windows?",
                  a: "Most homes benefit from window cleaning twice a year. Storefronts and high-traffic businesses may prefer monthly or quarterly service.",
                },
                {
                  q: "Do you offer window cleaning in Loudoun County?",
                  a: "Yes. We serve homes and businesses throughout the county including Leesburg, Ashburn, Sterling, and more.",
                },
                {
                  q: "Are you insured?",
                  a: "Absolutely. We're fully insured for your peace of mind.",
                },
              ].map((item) => (
                <div key={item.q} className="py-6">
                  <h3 className="font-display text-base font-semibold text-sumi-800">
                    {item.q}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-sumi-500">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
            <Link
              to="/faq"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-sumi-600 transition-colors hover:text-aka-600"
            >
              View all questions
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Service Areas ── */}
      <section className="border-t border-sumi-100 bg-washi-100 py-20 lg:py-24">
        <div className="section-container">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
              Coverage
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-sumi-900 sm:text-4xl">
              Serving Loudoun County
            </h2>
            <p className="mt-4 text-base text-sumi-500">
              Professional window cleaning throughout Northern Virginia.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {AREAS.map((city) => {
              const slug = city.toLowerCase() + "-window-cleaning";
              return (
                <Link
                  key={city}
                  to={`/${slug}`}
                  className="flex items-center justify-center rounded border border-sumi-100 bg-washi-50 px-4 py-3.5 text-sm font-medium text-sumi-700 transition-colors hover:border-aka-200 hover:bg-aka-50 hover:text-aka-700"
                >
                  {city}
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/service-areas"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-sumi-600 transition-colors hover:text-aka-600"
            >
              View All Service Areas
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-sumi-900 py-20 lg:py-24">
        <div className="section-container text-center">
          <h2 className="font-display text-3xl font-bold text-washi-50 sm:text-4xl">
            Ready for crystal clear windows?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-sumi-300">
            Get your free estimate today and see the Squeegee Samurai difference.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/free-estimate"
              className="btn-primary gap-2 px-8 py-4 text-sm"
            >
              Get Free Estimate
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href="tel:5403351059"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-sumi-600 px-7 py-3.5 text-sm font-medium tracking-wide text-washi-200 transition-colors hover:border-sumi-400 hover:text-washi-50"
            >
              <Phone className="h-4 w-4" aria-hidden />
              (540) 335-1059
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
