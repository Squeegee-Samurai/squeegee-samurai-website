import { Link } from 'react-router-dom';
import { Shield, Leaf, Star, Phone, CheckCircle, Users, Building, ExternalLink } from 'lucide-react';

interface Partner {
  name: string;
  url: string;
  description: string;
}

interface CityLandingProps {
  city: string;
  partners?: Partner[];
}

const CityLanding = ({ city, partners }: CityLandingProps) => {
  const cities = ['Ashburn', 'Leesburg', 'Sterling', 'Herndon', 'Reston', 'Purcellville', 'Middleburg', 'Hamilton'];

  return (
    <div className="bg-washi-50">
      {/* Hero */}
      <section className="bg-sumi-800 py-20 text-washi-50">
        <div className="section-container text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sumi-300 mb-3">{city}, Virginia</p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance">
            Crystal Clear Window Cleaning
            <br />
            <span className="text-indigo-300">in {city}, VA</span>
          </h1>
          <div className="mx-auto mt-4 h-px w-12 bg-aka-600" />
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-sumi-300">
            Professional and eco-friendly window cleaning for homes and businesses
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/free-estimate" className="btn-primary bg-washi-50 text-sumi-800 hover:bg-white">Get Free Estimate</Link>
            <a href="tel:5403351059" className="inline-flex items-center justify-center rounded-sm border border-sumi-400 px-6 py-3 text-sm font-medium tracking-wide text-washi-50 transition-colors hover:bg-sumi-700 gap-2">
              <Phone className="h-4 w-4" /> (540) 335-1059
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-b border-sumi-100">
        <div className="section-container">
          <h2 className="font-display text-2xl font-bold text-sumi-800 text-center mb-10">Why Choose Squeegee Samurai?</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: <Shield className="h-6 w-6 text-indigo-500" />, title: 'Fully Insured', desc: 'Licensed and insured for your peace of mind. We protect your property and our team.' },
              { icon: <Leaf className="h-6 w-6 text-indigo-500" />, title: 'Eco-Friendly', desc: 'Biodegradable cleaning solutions safe for your family, pets, and the environment.' },
              { icon: <Star className="h-6 w-6 text-indigo-500" />, title: '5-Star Service', desc: 'Consistently rated 5 stars by our customers. Quality work and exceptional service.' },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-sumi-100 p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-indigo-50">{item.icon}</div>
                <h3 className="font-display text-lg font-semibold text-sumi-800 mb-2">{item.title}</h3>
                <p className="text-sm text-sumi-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      {partners && partners.length > 0 && (
        <section className="py-16 border-b border-sumi-100">
          <div className="section-container">
            <h2 className="font-display text-2xl font-bold text-sumi-800 text-center mb-10">Our Partners</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-3xl mx-auto">
              {partners.map((partner, index) => (
                <div key={index} className="bg-white border border-sumi-100 p-6 text-center">
                  <h3 className="font-display text-lg font-semibold text-sumi-800 mb-1">{partner.name}</h3>
                  <p className="text-sm text-sumi-500 mb-3">{partner.description}</p>
                  <a href={partner.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                    Visit Website <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 border-b border-sumi-100">
        <div className="section-container">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-sumi-800 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                { q: 'How often should I clean my windows?', a: 'Most homes benefit from window cleaning twice a year. Storefronts and high-traffic businesses may prefer monthly or quarterly service.' },
                { q: 'Do you offer window cleaning in Loudoun County?', a: `Yes. We serve homes and businesses throughout the county including ${city}, and surrounding areas.` },
                { q: 'Are you insured?', a: "Absolutely. We're fully insured for your peace of mind." },
              ].map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-display font-semibold text-sumi-800 mb-1">{faq.q}</h3>
                  <p className="text-sm text-sumi-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 border-b border-sumi-100">
        <div className="section-container">
          <h2 className="font-display text-2xl font-bold text-sumi-800 text-center mb-10">Our Services</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: <Users className="h-6 w-6 text-indigo-500" />, title: 'Residential', desc: 'Professional window cleaning for homes, townhouses, and condos.', features: ['Interior & exterior cleaning', 'Screen cleaning', 'Sill & frame cleaning'], link: '/services/residential' },
              { icon: <Building className="h-6 w-6 text-indigo-500" />, title: 'Commercial', desc: 'Regular maintenance for offices, retail stores, and commercial buildings.', features: ['Scheduled maintenance', 'Third story capabilities', 'Flexible scheduling'], link: '/services/commercial' },
              { icon: <Building className="h-6 w-6 text-indigo-500" />, title: 'Additional Services', desc: 'Pressure washing, gutter cleaning, and specialized cleaning.', features: ['Pressure washing', 'Gutter cleaning', 'Solar panel cleaning'], link: '/services' },
            ].map((svc) => (
              <div key={svc.title} className="bg-white border border-sumi-100 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center bg-indigo-50">{svc.icon}</div>
                <h3 className="font-display text-lg font-semibold text-sumi-800 mb-2">{svc.title}</h3>
                <p className="text-sm text-sumi-500 mb-4">{svc.desc}</p>
                <ul className="space-y-2 mb-5">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-sumi-500">
                      <CheckCircle className="h-3.5 w-3.5 text-indigo-500 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to={svc.link} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                  {'Learn More \u2192'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 border-b border-sumi-100">
        <div className="section-container">
          <h2 className="font-display text-2xl font-bold text-sumi-800 text-center mb-10">Serving Loudoun County</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {cities.map((c) => {
              const slug = c.toLowerCase() + '-window-cleaning';
              return (
                <Link
                  key={c}
                  to={`/${slug}`}
                  className={`bg-white border border-sumi-100 p-4 text-center text-sm font-medium transition-colors hover:border-indigo-300 ${c === city ? 'border-indigo-400 bg-indigo-50 text-indigo-700' : 'text-sumi-700'}`}
                >
                  {c}
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-6">
            <Link to="/service-areas" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              {'View All Service Areas \u2192'}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sumi-800 py-16 text-center text-washi-50">
        <div className="section-container">
          <h2 className="font-display text-2xl font-bold mb-3">Ready for Crystal Clear Windows?</h2>
          <p className="text-sumi-300 mb-8">Get your free estimate today and see the Squeegee Samurai difference.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/free-estimate" className="btn-primary bg-washi-50 text-sumi-800 hover:bg-white">Get Free Estimate</Link>
            <a href="tel:5403351059" className="inline-flex items-center justify-center rounded-sm border border-sumi-400 px-6 py-3 text-sm font-medium tracking-wide text-washi-50 transition-colors hover:bg-sumi-700 gap-2">
              <Phone className="h-4 w-4" /> (540) 335-1059
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CityLanding;
