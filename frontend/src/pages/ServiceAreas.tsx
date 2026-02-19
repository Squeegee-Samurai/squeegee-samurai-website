
import { MapPin, CheckCircle, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CITIES = [
  { name: "Ashburn", description: "Serving all of Ashburn including Broadlands, Brambleton, and surrounding neighborhoods", zips: ["20147", "20148", "20149"] },
  { name: "Leesburg", description: "Complete coverage of Leesburg, including historic downtown and all residential areas", zips: ["20175", "20176"] },
  { name: "Sterling", description: "Professional window cleaning throughout Sterling and Potomac Falls", zips: ["20164", "20165", "20166"] },
  { name: "Herndon", description: "Serving Herndon and the surrounding Reston area", zips: ["20170", "20171"] },
  { name: "Reston", description: "Full service coverage of Reston, including Lake Anne and Town Center", zips: ["20190", "20191", "20194"] },
  { name: "Purcellville", description: "Window cleaning services for Purcellville and western Loudoun County", zips: ["20132"] },
  { name: "Middleburg", description: "Serving Middleburg and the surrounding horse country", zips: ["20117", "20118"] },
  { name: "Hamilton", description: "Professional services for Hamilton and rural Loudoun County areas", zips: ["20158"] },
];

const ServiceAreas = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-sumi-900 py-20 lg:py-24">
        <div className="section-container text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
            Coverage
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-washi-50 sm:text-5xl">
            Service Areas
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-sumi-300">
            Professional window cleaning services throughout Loudoun County, Virginia.
          </p>
        </div>
      </section>

      {/* Cities */}
      <section className="bg-washi-50 py-20 lg:py-24">
        <div className="section-container">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold text-sumi-900">
              Proudly Serving Loudoun County
            </h2>
            <p className="mt-4 text-base leading-relaxed text-sumi-500">
              We provide professional window cleaning to residential and commercial
              properties throughout Northern Virginia.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CITIES.map((city) => (
              <div
                key={city.name}
                className="rounded border border-sumi-100 bg-washi-50 p-6 transition-shadow hover:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-indigo-600" />
                  <h3 className="font-display text-base font-semibold text-sumi-900">
                    {city.name}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-sumi-500">
                  {city.description}
                </p>
                <div className="mt-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-sumi-400">
                    ZIP Codes
                  </span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {city.zips.map((zip) => (
                      <span
                        key={zip}
                        className="rounded-sm bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700"
                      >
                        {zip}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-indigo-600">
                  <CheckCircle className="h-3 w-3" />
                  Full Service Available
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="border-t border-sumi-100 bg-washi-100 py-20 lg:py-24">
        <div className="section-container">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-sumi-900">
              What We Offer in Every Area
            </h2>
            <p className="mt-4 text-base text-sumi-500">
              Consistent, high-quality service no matter where you are in Loudoun County.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "Residential",
                items: ["Single-family homes", "Townhouses & condos", "Interior & exterior cleaning", "Screen cleaning"],
              },
              {
                title: "Commercial",
                items: ["Office buildings", "Retail stores", "Medical facilities", "Regular maintenance"],
              },
              {
                title: "Specialized",
                items: ["Restaurant cleaning", "Post-construction cleanup", "Solar panel cleaning", "Emergency service"],
              },
            ].map((group) => (
              <div key={group.title} className="rounded border border-sumi-100 bg-washi-50 p-6">
                <h3 className="font-display text-base font-semibold text-sumi-800">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-sumi-600">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Info */}
      <section className="bg-washi-50 py-20 lg:py-24">
        <div className="section-container">
          <div className="mx-auto max-w-4xl rounded border border-sumi-100 bg-washi-100 p-8">
            <h2 className="font-display text-2xl font-bold text-sumi-900">
              Service Area Information
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-display text-base font-semibold text-sumi-800">
                  Service Radius
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sumi-500">
                  We serve all of Loudoun County, Virginia, with our primary focus on
                  the eastern and central areas -- from Ashburn and Sterling in the east
                  to Purcellville and Hamilton in the west.
                </p>
                <ul className="mt-4 space-y-2">
                  {["No travel charges within Loudoun County", "Same-day service available in most areas", "Emergency service throughout coverage area"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-sumi-600">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-sumi-800">
                  Scheduling & Availability
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sumi-500">
                  We offer flexible scheduling to accommodate your needs, with service
                  available throughout the week and on weekends when necessary.
                </p>
                <ul className="mt-4 space-y-2">
                  {["Monday - Friday service available", "Evening appointments by request", "Regular maintenance scheduling"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-sumi-600">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2c4a6e] py-16">
        <div className="section-container text-center">
          <h2 className="font-display text-2xl font-bold text-washi-50 sm:text-3xl">
            Ready to schedule service?
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

export default ServiceAreas;
