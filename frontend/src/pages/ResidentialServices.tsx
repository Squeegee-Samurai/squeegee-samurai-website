
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Shield, Star, Phone, ArrowRight } from "lucide-react";

const INCLUDED = [
  { title: "Interior & Exterior Cleaning", text: "Complete cleaning of both sides of your windows for maximum clarity and brightness." },
  { title: "Screen Cleaning & Maintenance", text: "Thorough cleaning of window screens to improve airflow and extend their lifespan." },
  { title: "Sill & Frame Cleaning", text: "Detailed cleaning of window sills, frames, and tracks to remove dirt and debris." },
  { title: "Spot & Stain Removal", text: "Specialized treatment for hard water spots, paint, and other stubborn stains." },
  { title: "Post-Service Inspection", text: "Quality assurance check to ensure every window meets our high standards." },
];

const PACKAGES = [
  {
    name: "Basic",
    description: "Exterior window cleaning only",
    features: ["Exterior window cleaning", "Frame cleaning", "Hard water removal", "5-stage pure water rinse", "Sill wiping"],
    popular: false,
  },
  {
    name: "Complete",
    description: "Interior and exterior cleaning",
    features: ["Interior & exterior cleaning", "Track detailing", "Frame & screen cleaning", "Hardwater, spot, & stain removal", "5-stage pure water rinse", "Sill wiping"],
    popular: true,
  },
  {
    name: "Premium",
    description: "Complete service plus extras",
    features: ["Everything in Complete Package", "Gutter and facade cleaning", "Mirror cleaning", "Glass door & fixture cleaning"],
    popular: false,
  },
];

const PRICING = [
  { label: "Small home (10-15 windows)", price: "$80-120" },
  { label: "Medium home (16-25 windows)", price: "$120-180" },
  { label: "Large home (26-40 windows)", price: "$180-280" },
  { label: "Extra large home (40+ windows)", price: "$280+" },
];

const ResidentialServices = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-sumi-900 py-20 lg:py-24">
        <div className="section-container text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
            For Homeowners
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-washi-50 sm:text-5xl">
            Residential Window Cleaning
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-sumi-300">
            Professional window cleaning services for homes throughout Loudoun County, Virginia.
          </p>
        </div>
      </section>

      {/* What's Included + Packages */}
      <section className="bg-washi-50 py-20 lg:py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: What's Included */}
            <div>
              <h2 className="font-display text-2xl font-bold text-sumi-900">
                Complete Home Window Care
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

            {/* Right: Packages */}
            <div className="rounded border border-sumi-100 bg-washi-100 p-7">
              <h3 className="font-display text-xl font-semibold text-sumi-900">
                Service Packages
              </h3>
              <div className="mt-6 space-y-4">
                {PACKAGES.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={`rounded border bg-washi-50 p-5 ${
                      pkg.popular ? "border-indigo-300" : "border-sumi-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <h4 className="font-display text-base font-semibold text-sumi-900">
                        {pkg.name} Package
                      </h4>
                      {pkg.popular && (
                        <span className="rounded-sm bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-sumi-500">{pkg.description}</p>
                    <ul className="mt-3 space-y-1">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-sumi-600">
                          <span className="h-1 w-1 rounded-full bg-sumi-300" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequency Options */}
      <section className="border-t border-sumi-100 bg-washi-100 py-20 lg:py-24">
        <div className="section-container">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
              Scheduling
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-sumi-900">
              Service Frequency
            </h2>
            <p className="mt-4 text-base text-sumi-500">
              Choose the schedule that works best for your home and budget.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "One-Time",
                text: "Perfect for special occasions, move-ins, or seasonal cleaning.",
                features: ["No commitment required", "Same-day service available", "Perfect for events"],
                highlight: false,
              },
              {
                title: "Regular",
                text: "Scheduled cleaning to keep your windows consistently clean.",
                features: ["Monthly, bi-monthly, or quarterly", "15% discount on regular service", "Priority scheduling"],
                highlight: true,
              },
              {
                title: "Seasonal",
                text: "Spring and fall cleaning to maintain your home's appearance.",
                features: ["Twice yearly service", "10% seasonal discount", "Includes deep cleaning"],
                highlight: false,
              },
            ].map((opt) => (
              <div
                key={opt.title}
                className={`flex flex-col rounded border p-6 ${
                  opt.highlight ? "border-indigo-300 bg-washi-50" : "border-sumi-100 bg-washi-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-display text-lg font-semibold text-sumi-900">{opt.title}</h3>
                  {opt.highlight && (
                    <span className="rounded-sm bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                      Best Value
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-sumi-500">{opt.text}</p>
                <ul className="mt-4 space-y-1.5">
                  {opt.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-sumi-600">
                      <span className="h-1 w-1 rounded-full bg-sumi-300" />
                      {f}
                    </li>
                  ))}
                </ul>
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
              Why Homeowners Choose Us
            </h2>
            <p className="mt-4 text-base text-sumi-500">
              Trusted by hundreds of families throughout Loudoun County.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Shield, title: "Fully Insured", text: "Comprehensive liability and workers' compensation insurance for your peace of mind." },
              { icon: Star, title: "5-Star Rated", text: "Consistently rated 5 stars by our residential customers across all platforms." },
              { icon: CheckCircle, title: "Satisfaction Guaranteed", text: "If any window doesn't meet expectations, we'll return at a discounted rate." },
              { icon: Clock, title: "Flexible Scheduling", text: "We work around your schedule, including evenings and weekends." },
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
              Investment
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-sumi-900">
              Transparent Pricing
            </h2>
            <p className="mt-4 text-base text-sumi-500">
              No hidden fees -- just honest, upfront pricing.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded border border-sumi-100 bg-washi-50 p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-display text-base font-semibold text-sumi-800">
                  Pricing Factors
                </h3>
                <ul className="mt-4 space-y-2">
                  {["Number of windows", "Property height & accessibility", "Window condition & size", "Service package selected", "Frequency of service"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-sumi-600">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-base font-semibold text-sumi-800">
                  Typical Ranges
                </h3>
                <div className="mt-4 space-y-3">
                  {PRICING.map((row) => (
                    <div key={row.label} className="flex items-center justify-between border-b border-sumi-100 pb-2 last:border-0">
                      <span className="text-sm text-sumi-600">{row.label}</span>
                      <span className="text-sm font-semibold text-sumi-800">{row.price}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-sumi-400">
                  *Prices include interior and exterior cleaning.
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
            Ready for sparkling clean windows?
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

export default ResidentialServices;
