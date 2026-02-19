import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Building,
  Utensils,
  CheckCircle,
  ArrowRight,
  Phone,
} from "lucide-react";
import "./Home.css";

const CORE_SERVICES = [
  {
    icon: Users,
    title: "Residential Services",
    description:
      "Professional window cleaning for homes, townhouses, and condominiums throughout Loudoun County.",
    features: [
      "Interior & exterior window cleaning",
      "Screen cleaning & maintenance",
      "Window sill & frame cleaning",
      "Post-construction cleanup",
      "Flexible scheduling options",
    ],
    to: "/services/residential",
  },
  {
    icon: Building,
    title: "Commercial Services",
    description:
      "Regular maintenance and one-time cleaning for offices, retail stores, and commercial buildings.",
    features: [
      "Scheduled maintenance programs",
      "Up to 3rd story window cleaning",
      "Storefront & display windows",
      "After-hours service available",
      "Competitive contract pricing",
    ],
    to: "/services/commercial",
  },
  {
    icon: Utensils,
    title: "Restaurant Services",
    description:
      "Specialized cleaning for restaurants and food service establishments with health code compliance.",
    features: [
      "Health code compliant cleaning",
      "Grease & grime removal",
      "Kitchen window deep cleaning",
      "Off-hours & weekend service",
      "Food-safe cleaning products",
    ],
    to: "/services",
  },
];

const ADDITIONAL = [
  { title: "Screen Cleaning", text: "Professional cleaning and maintenance of window screens to improve airflow and appearance." },
  { title: "Pressure Washing", text: "Exterior building cleaning, sidewalk cleaning, and deck restoration services." },
  { title: "Gutter Cleaning", text: "Complete gutter cleaning and maintenance to protect your property from water damage." },
  { title: "Solar Panel Cleaning", text: "Specialized cleaning to maintain solar panel efficiency and maximize energy production." },
  { title: "Post-Construction", text: "Thorough cleanup of construction debris, paint, and adhesive residue from windows." },
  { title: "Emergency Service", text: "Emergency window cleaning for urgent situations and special events." },
];

const STEPS = [
  { num: "01", title: "Assessment", text: "We evaluate your property and discuss your specific needs and preferences." },
  { num: "02", title: "Preparation", text: "We protect your property and set up our equipment for safe, efficient cleaning." },
  { num: "03", title: "Cleaning", text: "Using professional techniques and eco-friendly products for streak-free results." },
  { num: "04", title: "Inspection", text: "Final quality check to ensure every window meets our high standards." },
];

const Services = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-sumi-900 py-20 lg:py-24">
        <div className="section-container text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
            What We Offer
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-washi-50 sm:text-5xl">
            Our Services
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-sumi-300">
            Professional window cleaning solutions for every need in Loudoun County, Virginia.
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="jp-cloud-parallax bg-washi-50 py-20 lg:py-24">
        <div className="section-container">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
              Core Solutions
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-sumi-900">
              Complete Window Care
            </h2>
            <p className="mt-4 text-base leading-relaxed text-sumi-500">
              From residential homes to commercial buildings, we provide comprehensive
              window cleaning services.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {CORE_SERVICES.map((service) => (
              <div
                key={service.title}
                className="group flex flex-col rounded border border-sumi-100 bg-washi-50 p-7 transition-shadow hover:shadow-md"
              >
                <service.icon className="h-6 w-6 text-indigo-600" />
                <h3 className="mt-5 font-display text-xl font-semibold text-sumi-900">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-sumi-500">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-sumi-600">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={service.to}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-sumi-800 transition-colors group-hover:text-indigo-600"
                >
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kiritsu Clean Section */}
      <section id="kiritsu" className="bg-washi-100 py-20 lg:py-24 border-y border-sumi-200">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
            {/* Left Content */}
            <div className="flex flex-col h-full justify-center">
              <div className="inline-flex items-center rounded-full border border-aka-200 bg-aka-50 px-3 py-1 text-xs font-medium text-aka-700 mb-6 shadow-sm w-fit">
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-aka-500"></span>
                Save on Routine Cleaning
              </div>
              <h2 className="font-display text-3xl font-bold text-sumi-900 leading-tight sm:text-4xl">
                Leesburg Kiritsu* Clean offers savings on routine window cleaning services.
              </h2>
              <p className="mt-6 text-lg text-sumi-600 leading-relaxed">
                High-traffic areas receive regular cleaning. All interior and exterior windows are cleaned as necessary, subject to an annual contract.
              </p>
              <div className="mt-8">
                <Link
                  to="/free-estimate"
                  className="inline-flex items-center gap-2 text-aka-600 font-bold hover:text-aka-700 transition-colors border-b-2 border-aka-200 hover:border-aka-400 pb-0.5"
                >
                  Get a Kiritsu Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Content - Definition Card */}
            <div className="bg-washi-50 rounded-lg shadow-xl shadow-sumi-900/5 border border-sumi-200 p-8 sm:p-10 relative overflow-hidden">
              {/* Graphic - Top Right Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-80 pointer-events-none mix-blend-multiply">
                 <img 
                    src="/src/assets/kiritsu-graphic.png" 
                    alt="Kiritsu Graphic" 
                    className="w-full h-full object-cover rounded-bl-3xl"
                 />
              </div>

              <div className="relative z-10 pt-2 pr-24">
                <h3 className="font-display text-2xl font-bold text-sumi-900 mb-8 border-b-2 border-aka-500 pb-4 inline-block">
                  Understanding "Kiritsu"
                </h3>
              </div>
              
              <div className="space-y-8 relative z-10">
                <div>
                  <h4 className="font-display font-bold text-aka-700 text-sm uppercase tracking-wider mb-2">Definition and Usage</h4>
                  <p className="text-sumi-600 leading-relaxed text-lg">
                    <span className="font-bold text-sumi-900 text-xl font-display mr-1">規律</span> (Romaji: kiritsu; Kana: きりつ) is a noun that commonly appears in Japanese language studies, notably at the JLPT N2 level.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-display font-bold text-aka-700 text-sm uppercase tracking-wider mb-2">Translation and Meaning</h4>
                  <p className="text-sumi-600 leading-relaxed">
                    The English translation for "kiritsu" is "order," "rules," or "law." The term refers to a rule or order about how things happen.
                  </p>
                </div>

                <div className="bg-sumi-800 rounded px-6 py-5 border-l-4 border-aka-500 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                      <span className="text-6xl text-washi-50 font-serif">K</span>
                   </div>
                  <h4 className="font-display font-bold text-washi-200 text-xs uppercase tracking-wider mb-2 relative z-10">Summary</h4>
                  <p className="text-washi-100 italic leading-relaxed relative z-10 font-medium">
                    "Kiritsu" encapsulates the concepts of order, rules, and law, describing a principle or guideline that dictates the manner in which activities or processes are organized.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="border-t border-sumi-100 bg-washi-100 py-20 lg:py-24">
        <div className="section-container">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
              Beyond Windows
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-sumi-900">
              Additional Services
            </h2>
            <p className="mt-4 text-base text-sumi-500">
              Complete exterior cleaning solutions to keep your property looking its best.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ADDITIONAL.map((item) => (
              <div
                key={item.title}
                className="rounded border border-sumi-100 bg-washi-50 p-6"
              >
                <h3 className="font-display text-base font-semibold text-sumi-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sumi-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-washi-50 py-20 lg:py-24">
        <div className="section-container">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
              How It Works
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-sumi-900">
              Our Process
            </h2>
            <p className="mt-4 text-base text-sumi-500">
              A systematic approach that ensures consistent, high-quality results every time.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.num} className="text-center">
                <span className="font-display text-3xl font-bold text-sumi-200">
                  {step.num}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-sumi-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sumi-500">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sumi-900 py-16">
        <div className="section-container text-center">
          <h2 className="font-display text-2xl font-bold text-washi-50 sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-sumi-300">
            Contact us today for a free estimate on any of our professional services.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link to="/free-estimate" className="inline-flex items-center justify-center gap-2 rounded-sm bg-washi-50 px-7 py-3 text-sm font-medium tracking-wide text-sumi-900 transition-colors hover:bg-washi-200">
              Get Free Estimate
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <a
              href="tel:5403351059"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-sumi-600 px-7 py-3 text-sm font-medium tracking-wide text-washi-200 transition-colors hover:border-sumi-400 hover:text-washi-50"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              (540) 335-1059
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
