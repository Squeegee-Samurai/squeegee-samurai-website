
import { Link } from "react-router-dom";
import { CheckCircle, Calendar, Shield, Clock, Users, Star, Phone, ArrowRight } from "lucide-react";

const INCLUDED = [
  { title: "Scheduled Maintenance Programs", text: "Regular cleaning schedules to keep your business looking professional year-round." },
  { title: "Third Story Window Cleaning", text: "Specialized equipment and safety protocols for properties up to the 3rd story." },
  { title: "Storefront & Display Windows", text: "Keep your retail displays crystal clear to attract customers and showcase your products." },
  { title: "Office Building Maintenance", text: "Professional cleaning for office complexes, ensuring a bright and welcoming work environment." },
  { title: "After-Hours Service", text: "Flexible scheduling including evenings and weekends to minimize business disruption." },
];

const PROPERTY_TYPES = [
  { name: "Office Buildings", text: "Multi-tenant office complexes, corporate headquarters, and professional buildings" },
  { name: "Retail Stores", text: "Shopping centers, standalone retail locations, and boutique shops" },
  { name: "Medical Facilities", text: "Hospitals, clinics, dental offices, and healthcare centers" },
  { name: "Educational Institutions", text: "Schools, universities, training centers, and daycare facilities" },
  { name: "Industrial Buildings", text: "Warehouses, manufacturing facilities, and distribution centers" },
];

const PLANS = [
  {
    title: "Monthly",
    text: "Regular monthly cleaning to maintain a consistently professional appearance.",
    features: ["12 cleanings per year", "Priority scheduling", "20% discount on additional services", "Emergency service included"],
    highlight: false,
    badge: "Best Value",
  },
  {
    title: "Quarterly",
    text: "Seasonal cleaning to keep your business looking its best year-round.",
    features: ["4 cleanings per year", "Flexible scheduling", "15% discount on additional services", "Seasonal maintenance reminders"],
    highlight: true,
    badge: "Most Popular",
  },
  {
    title: "One-Time",
    text: "Perfect for special events, grand openings, or seasonal deep cleaning.",
    features: ["No long-term commitment", "Same-week service available", "Perfect for special events", "Can upgrade to regular service"],
    highlight: false,
    badge: "Flexible",
  },
];

const CommercialServices = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-sumi-900 py-20 lg:py-24">
        <div className="section-container text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
            For Businesses
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-washi-50 sm:text-5xl">
            Commercial Window Cleaning
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-sumi-300">
            Professional window cleaning services for offices, retail stores, and
            commercial buildings in Loudoun County.
          </p>
        </div>
      </section>

      {/* Services + Property Types */}
      <section className="bg-washi-50 py-20 lg:py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-display text-2xl font-bold text-sumi-900">
                Professional Commercial Window Care
              </h2>
              <div className="divider-line mt-4 ml-0" />
              <div className="mt-8 space-y-5">
                {INCLUDED.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                    <div>
                      <h4 className="text-sm font-semibold text-sumi-800">{item.title}</h4>
                      <p className="mt-0.5 text-sm leading-relaxed text-sumi-500">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded border border-sumi-100 bg-washi-100 p-7">
              <h3 className="font-display text-xl font-semibold text-sumi-900">
                Property Types We Serve
              </h3>
              <div className="mt-5 space-y-3">
                {PROPERTY_TYPES.map((pt) => (
                  <div key={pt.name} className="rounded border border-sumi-100 bg-washi-50 p-4">
                    <h4 className="text-sm font-semibold text-sumi-800">{pt.name}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-sumi-500">{pt.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Plans */}
      <section className="border-t border-sumi-100 bg-washi-100 py-20 lg:py-24">
        <div className="section-container">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
              Plans
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-sumi-900">
              Flexible Service Plans
            </h2>
            <p className="mt-4 text-base text-sumi-500">
              Choose the maintenance schedule that fits your business needs and budget.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.title}
                className={`flex flex-col rounded border p-6 ${
                  plan.highlight ? "border-indigo-300 bg-washi-50" : "border-sumi-100 bg-washi-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-display text-lg font-semibold text-sumi-900">{plan.title}</h3>
                  {plan.highlight && (
                    <span className="rounded-sm bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-sumi-500">{plan.text}</p>
                <ul className="mt-4 space-y-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-sumi-600">
                      <span className="h-1 w-1 rounded-full bg-sumi-300" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-center font-display text-sm font-semibold text-indigo-600">
                  {plan.badge}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-washi-50 py-20 lg:py-24">
        <div className="section-container">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-sumi-900">
              Why Businesses Choose Us
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Shield, title: "Licensed & Insured", text: "Comprehensive commercial liability insurance and workers' compensation coverage." },
              { icon: Clock, title: "Reliable Scheduling", text: "Consistent, on-time service that doesn't disrupt your business operations." },
              { icon: Users, title: "Professional Team", text: "Uniformed, background-checked technicians who represent your business well." },
              { icon: Star, title: "Quality Guarantee", text: "If any window doesn't meet expectations, we'll return at a discounted rate." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm border border-sumi-100 bg-washi-100">
                  <item.icon className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-sumi-800">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sumi-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-sumi-100 bg-washi-100 py-20 lg:py-24">
        <div className="section-container">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-sumi-900">
              Commercial Pricing
            </h2>
            <p className="mt-4 text-base text-sumi-500">
              Competitive rates with volume discounts for regular service contracts.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded border border-sumi-100 bg-washi-50 p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-display text-base font-semibold text-sumi-800">Pricing Factors</h3>
                <ul className="mt-4 space-y-2">
                  {["Building height & accessibility", "Total square footage of windows", "Frequency of service", "Special equipment requirements", "Additional services requested"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-sumi-600">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-sumi-800">Contract Benefits</h3>
                <div className="mt-4 space-y-3">
                  {[
                    { label: "Monthly contracts", value: "Save 20%" },
                    { label: "Quarterly contracts", value: "Save 15%" },
                    { label: "Bi-annual contracts", value: "Save 10%" },
                    { label: "One-time service", value: "Standard rate" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between border-b border-sumi-100 pb-2 last:border-0">
                      <span className="text-sm text-sumi-600">{row.label}</span>
                      <span className="text-sm font-semibold text-indigo-600">{row.value}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-sumi-400">
                  *All contracts include priority scheduling and emergency service coverage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2c4a6e] py-16">
        <div className="section-container text-center">
          <h2 className="font-display text-2xl font-bold text-washi-50 sm:text-3xl">
            Ready to enhance your business image?
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link to="/free-estimate" className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-7 py-3 text-sm font-medium tracking-wide text-sumi-900 transition-colors hover:bg-washi-100">
              Get Free Estimate
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <a href="tel:5403351059" className="inline-flex items-center justify-center gap-2 rounded-sm border border-white px-7 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-white/10" style={{ borderColor: '#ffffff', color: '#ffffff' }}>
              <Phone className="h-3.5 w-3.5" aria-hidden />
              (540) 335-1059
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommercialServices;
