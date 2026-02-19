
import { Camera, CheckCircle, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const beforeAfterImages = [
    { id: 1, title: 'Residential Home - Ashburn', description: 'Complete exterior window cleaning for a 2-story home', category: 'Residential' },
    { id: 2, title: 'Office Building - Leesburg', description: 'Commercial storefront and office windows', category: 'Commercial' },
    { id: 3, title: 'Restaurant - Sterling', description: 'Kitchen and dining area window deep cleaning', category: 'Restaurant' },
    { id: 4, title: 'Townhouse - Herndon', description: 'Interior and exterior window cleaning with screen service', category: 'Residential' },
    { id: 5, title: 'Retail Store - Reston', description: 'Large display windows and entrance cleaning', category: 'Commercial' },
    { id: 6, title: 'Single Family Home - Purcellville', description: 'Post-construction window cleanup', category: 'Residential' },
  ];

  return (
    <div className="bg-washi-50">
      {/* Hero */}
      <section className="bg-sumi-800 py-20 text-washi-50">
        <div className="section-container text-center">
          <Camera className="mx-auto mb-6 h-12 w-12 text-sumi-400" />
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sumi-300 mb-3">Our Portfolio</p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance">
            Work Gallery
          </h1>
          <div className="mx-auto mt-4 h-px w-12 bg-aka-600" />
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-sumi-300">
            See the difference professional window cleaning makes for homes and businesses throughout Loudoun County
          </p>
        </div>
      </section>

      {/* Before & After Gallery */}
      <section className="py-16 border-b border-sumi-100">
        <div className="section-container">
          <h2 className="font-display text-2xl font-bold text-sumi-800 text-center mb-3">Before & After Results</h2>
          <p className="text-center text-sm text-sumi-500 mb-10">Crystal clear transformations that speak for themselves</p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {beforeAfterImages.map((project) => (
              <div key={project.id} className="bg-white border border-sumi-100 overflow-hidden">
                <div className="h-56 bg-sumi-50 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="mx-auto mb-3 h-10 w-10 text-sumi-300" />
                    <p className="text-sm font-medium text-sumi-500">Before & After Photos</p>
                    <p className="text-xs text-sumi-400 mt-1">Available upon request</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-sm font-semibold text-sumi-800">{project.title}</h3>
                    <span className="bg-indigo-50 text-indigo-600 text-[10px] font-medium px-2 py-0.5 tracking-wide uppercase">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-sm text-sumi-500 leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="py-16 border-b border-sumi-100">
        <div className="section-container">
          <h2 className="font-display text-2xl font-bold text-sumi-800 text-center mb-3">Why Our Results Stand Out</h2>
          <p className="text-center text-sm text-sumi-500 mb-10">The Squeegee Samurai difference in every project</p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Streak-Free Results', desc: 'Professional techniques ensure crystal clear, streak-free windows every time.' },
              { title: 'Eco-Friendly Products', desc: 'Biodegradable cleaning solutions safe for your family and the environment.' },
              { title: 'Attention to Detail', desc: 'We clean frames, sills, and screens for a complete window care service.' },
              { title: 'Professional Equipment', desc: 'State-of-the-art tools and safety equipment for superior results.' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center bg-indigo-50">
                  <CheckCircle className="h-5 w-5 text-indigo-500" />
                </div>
                <h3 className="font-display text-sm font-semibold text-sumi-800 mb-2">{item.title}</h3>
                <p className="text-sm text-sumi-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 border-b border-sumi-100">
        <div className="section-container">
          <h2 className="font-display text-2xl font-bold text-sumi-800 text-center mb-3">Our Process</h2>
          <p className="text-center text-sm text-sumi-500 mb-10">A systematic approach that delivers consistent, high-quality results</p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              { step: '1', title: 'Assessment', desc: 'We evaluate your windows and discuss your specific needs and preferences.' },
              { step: '2', title: 'Preparation', desc: 'We protect your property and set up our professional equipment safely.' },
              { step: '3', title: 'Cleaning', desc: 'Using professional techniques and eco-friendly products for perfect results.' },
              { step: '4', title: 'Final Inspection', desc: 'Quality check to ensure every window meets our high standards.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-sumi-800 text-washi-50 font-display text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="font-display font-semibold text-sumi-800 mb-2">{item.title}</h3>
                <p className="text-sm text-sumi-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2c4a6e] py-16">
        <div className="section-container text-center">
          <h2 className="font-display text-2xl font-bold text-washi-50 sm:text-3xl">
            Ready to See These Results at Your Property?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-sumi-300">
            Contact us today for a free estimate and join our gallery of satisfied customers.
          </p>
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

export default Gallery;
