
import { Shield, Award, Users, Leaf, ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const VALUES = [
  {
    icon: Shield,
    title: "Integrity",
    text: "We do what we say we'll do, when we say we'll do it. Our word is our bond.",
  },
  {
    icon: Award,
    title: "Excellence",
    text: "We strive for perfection in every job, no matter how big or small.",
  },
  {
    icon: Users,
    title: "Respect",
    text: "We treat every customer, team member, and property with the utmost respect.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    text: "We're committed to protecting the environment for future generations.",
  },
];

const WHY_US = [
  {
    title: "Licensed & Insured",
    text: "Fully licensed and insured for your peace of mind. We carry comprehensive liability insurance and workers' compensation coverage.",
  },
  {
    title: "Eco-Friendly Products",
    text: "We use only biodegradable, non-toxic cleaning solutions that are safe for your family, pets, and the environment.",
  },
  {
    title: "Professional Equipment",
    text: "State-of-the-art equipment including water-fed pole systems, professional squeegees, and safety gear.",
  },
  {
    title: "Satisfaction Guarantee",
    text: "If you're not completely satisfied with our work, we'll return within 24 hours to make it right at no additional charge.",
  },
  {
    title: "Flexible Scheduling",
    text: "We work around your schedule with convenient appointment times, including evenings and weekends when needed.",
  },
  {
    title: "Local Expertise",
    text: "As a local Loudoun County business, we understand the unique challenges of our climate and building styles.",
  },
];

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-sumi-900 py-20 lg:py-24">
        <div className="section-container text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
            Our Story
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-washi-50 sm:text-5xl">
            About Squeegee Samurai
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-sumi-300">
            Bringing the precision and dedication of the samurai to window cleaning
            in Loudoun County, Virginia.
          </p>
        </div>
      </section>

      {/* Story + Mission */}
      <section className="bg-washi-50 py-20 lg:py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-display text-3xl font-bold text-sumi-900">
                Our Story
              </h2>
              <div className="divider-line mt-4 ml-0" />
              <p className="mt-6 text-base leading-relaxed text-sumi-600">
                Founded in 2025, Squeegee Samurai brings the precision, discipline,
                and honor of the samurai to modern window cleaning.
              </p>
              <p className="mt-4 text-base leading-relaxed text-sumi-600">
                What began as a local service has quickly become Loudoun County's
                go-to for spotless windows -- serving homes, businesses, and restaurants
                across Northern Virginia. Our team operates with unwavering commitment
                to excellence, eco-conscious practices, and the samurai code: respect,
                precision, and integrity in every pane we touch.
              </p>
            </div>

            <div className="rounded border border-sumi-100 bg-washi-100 p-8">
              <div className="mb-8">
                <h3 className="font-display text-xl font-semibold text-sumi-900">
                  Our Mission
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-sumi-600">
                  To provide exceptional window cleaning services that exceed expectations
                  while protecting the environment and supporting our local community.
                </p>
              </div>
              <div className="border-t border-sumi-200 pt-8">
                <h3 className="font-display text-xl font-semibold text-sumi-900">
                  Our Vision
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-sumi-600">
                  To be the most trusted and respected window cleaning service in
                  Northern Virginia, known for our integrity, quality, and environmental
                  stewardship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-sumi-100 bg-washi-100 py-20 lg:py-24">
        <div className="section-container">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
              Principles
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-sumi-900 sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-base text-sumi-500">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm border border-sumi-100 bg-washi-50">
                  <value.icon className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-sumi-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sumi-500">
                  {value.text}
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
              The Difference
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-sumi-900 sm:text-4xl">
              Why Choose Squeegee Samurai?
            </h2>
            <p className="mt-4 text-base text-sumi-500">
              Experience the difference that dedication and expertise make.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((item) => (
              <div
                key={item.title}
                className="rounded border border-sumi-100 bg-washi-50 p-6 transition-shadow hover:shadow-sm"
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

      {/* CTA */}
      <section className="bg-[#2c4a6e] py-16">
        <div className="section-container text-center">
          <h2 className="font-display text-2xl font-bold text-washi-50 sm:text-3xl">
            Ready to experience the Samurai difference?
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

export default About;
