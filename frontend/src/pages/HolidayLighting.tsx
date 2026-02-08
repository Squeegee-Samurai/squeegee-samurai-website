import { Helmet } from 'react-helmet-async';
import { Lightbulb, Sparkles, PackageOpen, Building2, Wrench, CheckCircle, Phone, Mail } from 'lucide-react';
import { useMemo } from 'react';

const PHONE_DISPLAY = '540-335-1059';
const PHONE_TEL = '5403351059';
const EMAIL = 'james@squeegee-samurai.com';

export default function HolidayLighting() {
  const title = 'Holiday Decorations & Lighting Services | Loudoun County, VA';
  const description = 'Holiday decorations & lighting in Loudoun County, VA \u2014 design, install, maintenance, removal & storage for homes and businesses. Get a free quote.';
  const canonical = 'https://squeegee-samurai.com/holiday-lighting/';

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Holiday Lighting & Decorations',
      serviceType: 'Holiday lighting installation, decoration, maintenance, removal & storage',
      areaServed: 'Loudoun County, VA',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Squeegee Samurai',
        url: canonical,
        email: EMAIL,
        telephone: PHONE_DISPLAY,
        areaServed: 'Loudoun County, VA',
      },
    }),
    []
  );

  const services = [
    { icon: <Lightbulb className="h-5 w-5 text-indigo-500" aria-hidden />, title: 'Custom Lighting Installation', desc: 'Classic white or colorful displays designed to fit your property and style.' },
    { icon: <Sparkles className="h-5 w-5 text-indigo-500" aria-hidden />, title: 'Professional Decorations', desc: 'Garlands, wreaths, and ornaments for interior and exterior festive designs.' },
    { icon: <PackageOpen className="h-5 w-5 text-indigo-500" aria-hidden />, title: 'Removal & Storage', desc: 'Safe takedown, packing, and storage so next year is hassle-free.' },
    { icon: <Building2 className="h-5 w-5 text-indigo-500" aria-hidden />, title: 'Commercial Displays', desc: 'Eye-catching storefront and campus designs that attract customers.' },
    { icon: <Wrench className="h-5 w-5 text-indigo-500" aria-hidden />, title: 'Maintenance & Repairs', desc: 'Keep your display bright all season with prompt support.' },
  ];

  const steps = [
    { title: 'Free Consultation', desc: 'Share ideas and get an on-site assessment.' },
    { title: 'Custom Proposal', desc: 'A design plan that fits your style and budget.' },
    { title: 'Installation', desc: 'Safe, professional setup for a flawless display.' },
    { title: 'Enjoy the Holidays', desc: 'Sit back and celebrate \u2014 no ladders, no tangles.' },
    { title: 'Removal & Storage', desc: 'We return to take down and store your decor.' },
  ];

  return (
    <main className="bg-washi-50">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Holiday Lighting & Decorations in Loudoun County" />
        <meta property="og:description" content="Design, installation, maintenance, removal & storage." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-sumi-800 py-20 text-washi-50">
        <div className="section-container text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sumi-300 mb-3">Seasonal Services</p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance">
            Holiday Lighting & Decorations
          </h1>
          <div className="mx-auto mt-4 h-px w-12 bg-aka-600" />
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-sumi-300">
            Bring the magic of the season to your home or business with professional holiday lighting across Loudoun County, VA.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#quote" className="btn-primary bg-washi-50 text-sumi-800 hover:bg-white">Get Free Quote</a>
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center rounded-sm border border-sumi-400 px-6 py-3 text-sm font-medium tracking-wide text-washi-50 transition-colors hover:bg-sumi-700 gap-2">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 border-b border-sumi-100">
        <div className="section-container">
          <h2 className="font-display text-2xl font-bold text-sumi-800 text-center mb-10">Our Holiday Services</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="bg-white border border-sumi-100 p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center bg-indigo-50 flex-shrink-0">{s.icon}</div>
                  <div>
                    <h3 className="font-display font-semibold text-sumi-800">{s.title}</h3>
                    <p className="mt-1 text-sm text-sumi-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 border-b border-sumi-100">
        <div className="section-container">
          <h2 className="font-display text-2xl font-bold text-sumi-800 text-center mb-10">Why Choose Squeegee Samurai?</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Local Expertise', desc: 'Proudly serving Loudoun County.' },
              { title: 'Safety First', desc: 'Trained, insured, and ladder-smart.' },
              { title: 'Custom Designs', desc: 'Tailored to your vision and property.' },
              { title: 'Stress-Free', desc: 'We handle everything \u2014 start to finish.' },
            ].map((r) => (
              <div key={r.title} className="bg-white border border-sumi-100 p-5">
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-indigo-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sumi-800">{r.title}</h3>
                    <p className="mt-1 text-sm text-sumi-500">{r.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 border-b border-sumi-100">
        <div className="section-container">
          <h2 className="font-display text-2xl font-bold text-sumi-800 text-center mb-10">How It Works</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <div key={step.title} className="bg-white border border-sumi-100 p-5">
                <span className="text-xs font-medium text-sumi-300 uppercase tracking-wider">Step {i + 1}</span>
                <h3 className="mt-1 font-display font-semibold text-sumi-800">{step.title}</h3>
                <p className="mt-1 text-sm text-sumi-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="quote" className="py-16 bg-sumi-800 text-washi-50 text-center">
        <div className="section-container">
          <h2 className="font-display text-2xl font-bold mb-3">Ready to Shine?</h2>
          <p className="text-sumi-300 mb-6">Contact Squeegee Samurai today for a free quote.</p>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-sumi-400">Email:</span>{' '}
              <a href={`mailto:${EMAIL}`} className="text-washi-100 underline underline-offset-4 decoration-sumi-500 hover:decoration-washi-200">{EMAIL}</a>
            </p>
            <p>
              <span className="text-sumi-400">Phone:</span>{' '}
              <a href={`tel:${PHONE_TEL}`} className="text-washi-100 underline underline-offset-4 decoration-sumi-500 hover:decoration-washi-200">{PHONE_DISPLAY}</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
