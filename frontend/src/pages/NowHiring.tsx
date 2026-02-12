import React, { useState } from 'react';

import { MapPin, Clock, DollarSign, ChevronDown, Send, Users, Building } from 'lucide-react';

const NowHiring = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [applicationData, setApplicationData] = useState({
    name: '', email: '', phone: '', position: '', experience: '', availability: '', message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const jobs = [
    {
      id: 1,
      title: 'Window Washing Professionals',
      type: 'Full-time / Part-time',
      location: 'Loudoun County, VA',
      salary: '$18-25/hour',
      icon: <Users className="h-6 w-6" />,
      description: 'Join our team of professional window cleaning technicians serving residential and commercial properties throughout Loudoun County.',
      responsibilities: [
        'Perform high-quality window cleaning for residential and commercial properties',
        'Operate professional window cleaning equipment safely and efficiently',
        'Maintain excellent customer service standards',
        'Follow safety protocols and procedures',
        'Work independently and as part of a team',
        'Complete daily route assignments on schedule',
      ],
      requirements: [
        'Previous window cleaning experience preferred but not required',
        'Ability to work at heights and on ladders safely',
        'Physical fitness and ability to lift up to 50 lbs',
        "Valid driver's license with clean driving record",
        'Reliable transportation',
        'Professional appearance and demeanor',
      ],
      benefits: [
        'Competitive hourly wage ($18-25/hr based on experience)',
        'Performance bonuses and tips',
        'Flexible scheduling options',
        'Professional training provided',
        'Opportunity for advancement',
        'Uniform and equipment provided',
      ],
    },
    {
      id: 2,
      title: 'Office Manager',
      type: 'Full-time',
      location: 'Loudoun County, VA',
      salary: '$45,000-55,000/year',
      icon: <Building className="h-6 w-6" />,
      description: "We're seeking an organized and detail-oriented Office Manager to oversee daily operations and support our growing window cleaning business.",
      responsibilities: [
        'Manage customer inquiries and schedule appointments',
        'Coordinate daily routes and technician assignments',
        'Handle billing, invoicing, and payment processing',
        'Maintain customer database and service records',
        'Assist with marketing and social media efforts',
        'Support hiring and training of new employees',
      ],
      requirements: [
        '2+ years of office management or administrative experience',
        'Excellent communication and customer service skills',
        'Proficiency in Microsoft Office Suite',
        'Strong organizational and multitasking abilities',
        'Experience with scheduling software preferred',
        'Knowledge of QuickBooks or similar a plus',
      ],
      benefits: [
        'Competitive annual salary ($45,000-55,000)',
        'Health insurance contribution',
        'Paid vacation and sick leave',
        'Professional development opportunities',
        'Flexible work arrangements',
        'Performance-based bonuses',
      ],
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    try {
      const response = await fetch(`${apiUrl}/api/career`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setApplicationData({
          name: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          availability: '',
          message: '',
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      alert('Failed to submit application. Please try again.');
      console.error('Application error:', error);
    }
  };

  const inputClass =
    'w-full border border-sumi-200 bg-white px-4 py-3 text-sumi-800 placeholder:text-sumi-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors';
  const labelClass = 'block text-sm font-medium text-sumi-600 mb-1.5';

  return (
    <div className="bg-washi-50">
      {/* Hero */}
      <section className="bg-sumi-800 py-20 text-center text-washi-50">
        <div className="section-container">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sumi-300 mb-3">Careers</p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl text-balance">Now Hiring</h1>
          <div className="mx-auto mt-4 h-px w-12 bg-aka-600" />
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-sumi-300">
            Join the Squeegee Samurai team and help deliver exceptional window cleaning services throughout Loudoun County.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 border-b border-sumi-100">
        <div className="section-container">
          <h2 className="font-display text-2xl font-bold text-sumi-800 text-center mb-10">Why Squeegee Samurai?</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { title: 'Growth', desc: 'Advance your career with training, certifications, and leadership opportunities.' },
              { title: 'Competitive Pay', desc: 'Earn competitive wages with performance bonuses and tips.' },
              { title: 'Flexible Schedule', desc: 'Flexible scheduling options that work with your lifestyle.' },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-sumi-100 p-6 text-center">
                <h3 className="font-display text-lg font-semibold text-sumi-800 mb-2">{item.title}</h3>
                <p className="text-sm text-sumi-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 border-b border-sumi-100">
        <div className="section-container">
          <h2 className="font-display text-2xl font-bold text-sumi-800 text-center mb-10">Open Positions</h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white border border-sumi-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center bg-indigo-50 text-indigo-600 flex-shrink-0">{job.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-sumi-800">{job.title}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-sumi-400">
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{job.type}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                        <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />{job.salary}</span>
                      </div>
                      <p className="mt-3 text-sm text-sumi-500">{job.description}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                    className="mt-4 flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    {selectedJob === job.id ? 'Hide Details' : 'View Details'}
                    <ChevronDown className={`h-4 w-4 transition-transform ${selectedJob === job.id ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {selectedJob === job.id && (
                  <div className="border-t border-sumi-100 bg-sumi-50 p-6">
                    <div className="space-y-6 text-sm">
                      {[
                        { heading: 'Responsibilities', items: job.responsibilities },
                        { heading: 'Requirements', items: job.requirements },
                        { heading: 'Benefits', items: job.benefits },
                      ].map((section) => (
                        <div key={section.heading}>
                          <h4 className="font-display font-semibold text-sumi-700 mb-2">{section.heading}</h4>
                          <ul className="space-y-1.5">
                            {section.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sumi-500">
                                <span className="mt-1.5 h-1 w-1 rounded-full bg-indigo-400 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="section-container">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-sumi-800 text-center mb-2">Apply Now</h2>
            <p className="text-center text-sumi-500 mb-10">Ready to join our team? Submit your application below.</p>

            {isSubmitted ? (
              <div className="bg-white border border-sumi-100 p-10 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-indigo-50">
                  <Send className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-display text-xl font-semibold text-sumi-800 mb-2">Application Submitted</h3>
                <p className="text-sumi-500">{"Thank you for your interest. We'll be in touch soon."}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-sumi-100 p-8 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div><label className={labelClass}>Full Name *</label><input type="text" name="name" required value={applicationData.name} onChange={handleInputChange} className={inputClass} /></div>
                  <div><label className={labelClass}>Email *</label><input type="email" name="email" required value={applicationData.email} onChange={handleInputChange} className={inputClass} /></div>
                  <div><label className={labelClass}>Phone *</label><input type="tel" name="phone" required value={applicationData.phone} onChange={handleInputChange} className={inputClass} /></div>
                  <div>
                    <label className={labelClass}>Position *</label>
                    <select name="position" required value={applicationData.position} onChange={handleInputChange} className={inputClass}>
                      <option value="">Select</option>
                      <option value="window-washing">Window Washing Professional</option>
                      <option value="office-manager">Office Manager</option>
                    </select>
                  </div>
                </div>
                <div><label className={labelClass}>Relevant Experience</label><textarea name="experience" rows={3} value={applicationData.experience} onChange={handleInputChange} className={inputClass + ' resize-none'} placeholder="Tell us about your relevant work experience..." /></div>
                <div><label className={labelClass}>Availability</label><input type="text" name="availability" value={applicationData.availability} onChange={handleInputChange} className={inputClass} placeholder="e.g. Full-time, Part-time, Weekends only" /></div>
                <div><label className={labelClass}>Additional Message</label><textarea name="message" rows={3} value={applicationData.message} onChange={handleInputChange} className={inputClass + ' resize-none'} placeholder="Tell us why you'd like to work with Squeegee Samurai..." /></div>
                <button type="submit" className="w-full btn-primary py-3 gap-2">
                  <Send className="h-4 w-4" /> Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-sumi-100 bg-sumi-800 py-16 text-center text-washi-50">
        <div className="section-container">
          <h2 className="font-display text-2xl font-bold mb-3">Questions About These Positions?</h2>
          <p className="text-sumi-300 mb-8">Contact us directly to learn more about career opportunities.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href="tel:5403351059" className="btn-primary bg-washi-50 text-sumi-800 hover:bg-white">Call (540) 335-1059</a>
            <a href="mailto:james@squeegee-samurai.com" className="inline-flex items-center justify-center rounded-sm border border-sumi-400 px-6 py-3 text-sm font-medium tracking-wide text-washi-50 transition-colors hover:bg-sumi-700">Email Us</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NowHiring;
