import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqs = [
    {
      category: "General Services",
      questions: [
        {
          question: "What areas do you serve?",
          answer: "We proudly serve all of Loudoun County, Virginia, including Ashburn, Leesburg, Sterling, Herndon, Reston, Purcellville, Middleburg, and Hamilton. We provide service to both residential and commercial properties throughout the county."
        },
        {
          question: "How often should I have my windows cleaned?",
          answer: "For residential properties, we recommend cleaning 2-4 times per year depending on your location and preferences. Commercial properties typically benefit from monthly or quarterly service. We offer flexible scheduling to meet your specific needs."
        },
        {
          question: "Do you clean both interior and exterior windows?",
          answer: "Yes! Our complete service includes both interior and exterior window cleaning, along with screen cleaning, sill wiping, and frame cleaning. You can also choose exterior-only service if preferred."
        },
        {
          question: "Are you licensed and insured?",
          answer: "Absolutely. Squeegee Samurai is fully licensed and carries comprehensive liability insurance and workers' compensation coverage. We're happy to provide proof of insurance upon request."
        }
      ]
    },
    {
      category: "Pricing & Estimates",
      questions: [
        {
          question: "How much does window cleaning cost?",
          answer: "Pricing varies based on the number of windows, property height, accessibility, and services requested. Typical residential jobs range from $80-280. We provide free, detailed estimates for all projects."
        },
        {
          question: "Do you offer free estimates?",
          answer: "Yes! We provide free, no-obligation estimates for all residential and commercial properties. You can request an estimate online or call us directly."
        },
        {
          question: "Do you offer discounts for regular service?",
          answer: "Yes, we offer significant discounts for regular service contracts. Monthly service saves 20%, quarterly service saves 15%, and bi-annual service saves 10% compared to one-time pricing."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept cash, check, and all major credit cards. Payment is due upon completion of service unless other arrangements have been made for commercial accounts."
        }
      ]
    },
    {
      category: "Service Details",
      questions: [
        {
          question: "What cleaning products do you use?",
          answer: "We use only eco-friendly, biodegradable cleaning solutions that are safe for your family, pets, and the environment. Our products are non-toxic and leave no harmful residues."
        },
        {
          question: "Do you clean screens?",
          answer: "Yes, screen cleaning is included in our complete service package. We carefully remove, clean, and reinstall screens, or clean them in place when removal isn't possible."
        },
        {
          question: "What if it rains after you clean my windows?",
          answer: "Rain actually helps keep windows clean longer by rinsing away dust and pollen. However, if you're not satisfied with the appearance after rain, we'll return to touch up at no charge."
        },
        {
          question: "How long does window cleaning take?",
          answer: "Most residential jobs take 1-3 hours depending on the size of the home and number of windows. Commercial properties vary widely based on size and complexity."
        }
      ]
    },
    {
      category: "Scheduling & Preparation",
      questions: [
        {
          question: "Do I need to be home during the service?",
          answer: "For exterior-only service, you don't need to be home. For interior cleaning, someone should be present to provide access. We can work around your schedule to find convenient times."
        },
        {
          question: "How far in advance should I schedule?",
          answer: "We typically can schedule service within a few days to a week, depending on the season. During peak times (spring and fall), we recommend scheduling 1-2 weeks in advance."
        },
        {
          question: "What should I do to prepare for window cleaning?",
          answer: "Please remove any items from window sills and ensure access to windows. For interior cleaning, please move any furniture or decorations that might be in the way."
        },
        {
          question: "Do you work in all weather conditions?",
          answer: "We work in most weather conditions but may reschedule during heavy rain, snow, or high winds for safety reasons. We'll contact you if weather affects your scheduled service."
        }
      ]
    },
    {
      category: "Commercial Services",
      questions: [
        {
          question: "Do you provide commercial window cleaning?",
          answer: "Yes! We provide comprehensive commercial window cleaning for office buildings, retail stores, restaurants, and other commercial properties throughout Loudoun County."
        },
        {

          question: "Can you clean high-rise windows?",
          answer: "No, we clean windows up to the third story but have partners we can refer you to for high-rise work."
        },
        {

          question: "Do you offer after-hours service?",
          answer: "Absolutely. We understand that businesses need flexibility, so we offer evening and weekend service to minimize disruption to your operations."
        },
        {
          question: "Do you provide regular maintenance contracts?",
          answer: "Yes, we offer customized maintenance contracts with significant savings. Regular service ensures your business always looks professional and well-maintained."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 text-primary-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Find answers to common questions about our window cleaning services in Loudoun County
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 border-b-2 border-primary-600 pb-2">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 100 + questionIndex;
                  const isOpen = openQuestion === globalIndex;
                  
                  return (
                    <div key={questionIndex} className="bg-white border border-neutral-200 rounded-lg shadow-sm">
                      <button
                        onClick={() => toggleQuestion(globalIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-neutral-50 transition-colors"
                      >
                        <span className="font-semibold text-neutral-900 pr-4">{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-primary-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-primary-600 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">Still Have Questions?</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Can't find the answer you're looking for? We're here to help!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:5403351059"
              className="flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call (540) 335-1059
            </a>
            <Link
              to="/contact"
              className="bg-neutral-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-neutral-700 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/free-estimate"
              className="bg-accent-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-700 transition-colors"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Quick Tips</h2>
            <p className="text-lg text-neutral-600">
              Helpful information to get the most from your window cleaning service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary-900 mb-3">Best Time to Clean</h3>
              <p className="text-primary-800">
                Spring and fall are ideal times for comprehensive window cleaning. Summer and winter 
                maintenance keeps them looking great year-round.
              </p>
            </div>
            
            <div className="bg-accent-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-accent-900 mb-3">Maintenance Between Cleanings</h3>
              <p className="text-accent-800">
                Use a microfiber cloth for light dusting and spot cleaning. Avoid paper towels 
                and household cleaners that can leave streaks.
              </p>
            </div>
            
            <div className="bg-gold-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gold-900 mb-3">Maximize Your Investment</h3>
              <p className="text-gold-800">
                Regular cleaning prevents buildup that can damage windows over time. It's more 
                cost-effective than dealing with permanent staining or replacement.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
