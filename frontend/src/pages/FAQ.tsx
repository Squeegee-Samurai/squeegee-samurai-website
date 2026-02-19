import { useState } from "react";
import { ChevronDown, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FAQS = [
  {
    category: "General Services",
    questions: [
      { q: "What areas do you serve?", a: "We proudly serve all of Loudoun County, Virginia, including Ashburn, Leesburg, Sterling, Herndon, Reston, Purcellville, Middleburg, and Hamilton. We provide service to both residential and commercial properties throughout the county." },
      { q: "How often should I have my windows cleaned?", a: "For residential properties, we recommend cleaning 2-4 times per year depending on your location and preferences. Commercial properties typically benefit from monthly or quarterly service. We offer flexible scheduling to meet your specific needs." },
      { q: "Do you clean both interior and exterior windows?", a: "Yes! Our complete service includes both interior and exterior window cleaning, along with screen cleaning, sill wiping, and frame cleaning. You can also choose exterior-only service if preferred." },
      { q: "Are you licensed and insured?", a: "Absolutely. Squeegee Samurai is fully licensed and carries comprehensive liability insurance and workers' compensation coverage. We're happy to provide proof of insurance upon request." },
    ],
  },
  {
    category: "Pricing & Estimates",
    questions: [
      { q: "How much does window cleaning cost?", a: "Pricing varies based on the number of windows, property height, accessibility, and services requested. Typical residential jobs range from $80-280. We provide free, detailed estimates for all projects." },
      { q: "Do you offer free estimates?", a: "Yes! We provide free, no-obligation estimates for all residential and commercial properties. You can request an estimate online or call us directly." },
      { q: "Do you offer discounts for regular service?", a: "Yes, we offer significant discounts for regular service contracts. Monthly service saves 20%, quarterly service saves 15%, and bi-annual service saves 10% compared to one-time pricing." },
      { q: "What payment methods do you accept?", a: "We accept cash, check, and all major credit cards. Payment is due upon completion of service unless other arrangements have been made for commercial accounts." },
    ],
  },
  {
    category: "Service Details",
    questions: [
      { q: "What cleaning products do you use?", a: "We use only eco-friendly, biodegradable cleaning solutions that are safe for your family, pets, and the environment. Our products are non-toxic and leave no harmful residues." },
      { q: "Do you clean screens?", a: "Yes, screen cleaning is included in our complete service package. We carefully remove, clean, and reinstall screens, or clean them in place when removal isn't possible." },
      { q: "What if it rains after you clean my windows?", a: "Rain actually helps keep windows clean longer by rinsing away dust and pollen. However, if you're not satisfied with the appearance after rain, we'll return to touch up at no charge." },
      { q: "How long does window cleaning take?", a: "Most residential jobs take 1-3 hours depending on the size of the home and number of windows. Commercial properties vary widely based on size and complexity." },
    ],
  },
  {
    category: "Scheduling & Preparation",
    questions: [
      { q: "Do I need to be home during the service?", a: "For exterior-only service, you don't need to be home. For interior cleaning, someone should be present to provide access. We can work around your schedule to find convenient times." },
      { q: "How far in advance should I schedule?", a: "We typically can schedule service within a few days to a week, depending on the season. During peak times (spring and fall), we recommend scheduling 1-2 weeks in advance." },
      { q: "What should I do to prepare for window cleaning?", a: "Please remove any items from window sills and ensure access to windows. For interior cleaning, please move any furniture or decorations that might be in the way." },
      { q: "Do you work in all weather conditions?", a: "We work in most weather conditions but may reschedule during heavy rain, snow, or high winds for safety reasons. We'll contact you if weather affects your scheduled service." },
    ],
  },
  {
    category: "Commercial Services",
    questions: [
      { q: "Do you provide commercial window cleaning?", a: "Yes! We provide comprehensive commercial window cleaning for office buildings, retail stores, restaurants, and other commercial properties throughout Loudoun County." },
      { q: "Can you clean high-rise windows?", a: "No, we clean windows up to the third story but have partners we can refer you to for high-rise work." },
      { q: "Do you offer after-hours service?", a: "Absolutely. We understand that businesses need flexibility, so we offer evening and weekend service to minimize disruption to your operations." },
      { q: "Do you provide regular maintenance contracts?", a: "Yes, we offer customized maintenance contracts with significant savings. Regular service ensures your business always looks professional and well-maintained." },
    ],
  },
];

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-sumi-100 last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="pr-4 text-sm font-medium text-sumi-800">{question}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-sumi-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-4">
          <p className="text-sm leading-relaxed text-sumi-500">{answer}</p>
        </div>
      )}
    </div>
  );
}

const FAQ = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-sumi-900 py-20 lg:py-24">
        <div className="section-container text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
            Support
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-washi-50 sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-sumi-300">
            Find answers to common questions about our window cleaning services.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="bg-washi-50 py-20 lg:py-24">
        <div className="section-container">
          <div className="mx-auto max-w-3xl space-y-12">
            {FAQS.map((cat) => (
              <div key={cat.category}>
                <h2 className="font-display text-lg font-semibold text-sumi-900">
                  {cat.category}
                </h2>
                <div className="divider-line mt-2 ml-0" />
                <div className="mt-4">
                  {cat.questions.map((faq) => (
                    <AccordionItem key={faq.q} question={faq.q} answer={faq.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="border-t border-sumi-100 bg-washi-100 py-20 lg:py-24">
        <div className="section-container">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-sumi-900">Quick Tips</h2>
            <p className="mt-4 text-base text-sumi-500">
              Helpful information to get the most from your window cleaning service.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { title: "Best Time to Clean", text: "Spring and fall are ideal for comprehensive cleaning. Summer and winter maintenance keeps them looking great year-round." },
              { title: "Between Cleanings", text: "Use a microfiber cloth for light dusting and spot cleaning. Avoid paper towels and household cleaners that leave streaks." },
              { title: "Maximize Your Investment", text: "Regular cleaning prevents buildup that can damage windows over time. It's more cost-effective than dealing with permanent staining." },
            ].map((tip) => (
              <div key={tip.title} className="rounded border border-sumi-100 bg-washi-50 p-6">
                <h3 className="font-display text-base font-semibold text-sumi-800">{tip.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sumi-500">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="bg-[#2c4a6e] py-16">
        <div className="section-container text-center">
          <h2 className="font-display text-2xl font-bold text-washi-50 sm:text-3xl">
            Still have questions?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-sumi-300">
            {"Can't find the answer you're looking for? We're here to help."}
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

export default FAQ;
