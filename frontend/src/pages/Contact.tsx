import React, { useState } from "react";

import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      alert('Failed to send message. Please try again.');
      console.error('Contact error:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-washi-50 py-16">
        <div className="mx-auto max-w-md px-5 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-indigo-200 bg-indigo-50">
            <CheckCircle className="h-7 w-7 text-indigo-600" />
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold text-sumi-900">
            Message Sent
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-sumi-500">
            Thank you for contacting Squeegee Samurai. We will get back to you within 24 hours.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href="tel:5403351059" className="btn-primary gap-2">
              <Phone className="h-3.5 w-3.5" /> (540) 335-1059
            </a>
            <button onClick={() => setIsSubmitted(false)} className="btn-outline">
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-sm border border-sumi-200 bg-washi-50 px-4 py-2.5 text-sm text-sumi-800 placeholder:text-sumi-300 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400";

  return (
    <div>
      {/* Hero */}
      <section className="bg-sumi-900 py-20 lg:py-24">
        <div className="section-container text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
            Get in Touch
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-washi-50 sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-sumi-300">
            Ready for crystal clear windows? Reach out to Squeegee Samurai today.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-washi-50 py-20 lg:py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Info */}
            <div>
              <h2 className="font-display text-2xl font-bold text-sumi-900">
                Get In Touch
              </h2>
              <div className="divider-line mt-4 ml-0" />

              <div className="mt-8 space-y-6">
                {[
                  {
                    icon: Phone,
                    title: "Phone",
                    sub: "Call us for immediate assistance",
                    content: (
                      <a href="tel:5403351059" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                        (540) 335-1059
                      </a>
                    ),
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    sub: "Send us a message anytime",
                    content: (
                      <a href="mailto:james@squeegee-samurai.com" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                        james@squeegee-samurai.com
                      </a>
                    ),
                  },
                  {
                    icon: MapPin,
                    title: "Service Area",
                    sub: "Proudly serving all of Loudoun County",
                    content: <span className="text-sm font-semibold text-sumi-700">Loudoun County, Virginia</span>,
                  },
                  {
                    icon: Clock,
                    title: "Business Hours",
                    sub: "",
                    content: (
                      <div className="space-y-0.5 text-sm text-sumi-600">
                        <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p>Saturday: 8:00 AM - 4:00 PM</p>
                        <p>Sunday: By appointment only</p>
                      </div>
                    ),
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-sumi-100 bg-washi-100">
                      <item.icon className="h-4 w-4 text-sumi-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-sumi-800">{item.title}</h3>
                      {item.sub && <p className="text-xs text-sumi-400">{item.sub}</p>}
                      <div className="mt-1">{item.content}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Emergency */}
              <div className="mt-8 rounded border border-aka-200 bg-aka-50 p-5">
                <h3 className="text-sm font-semibold text-aka-800">Emergency Service</h3>
                <p className="mt-1 text-xs leading-relaxed text-aka-700">
                  Need urgent window cleaning for a special event or emergency?
                </p>
                <a
                  href="tel:5403351059"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-aka-700 hover:text-aka-800"
                >
                  Call for Emergency Service
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div className="rounded border border-sumi-100 bg-washi-100 p-7">
              <h2 className="font-display text-xl font-semibold text-sumi-900">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-sumi-600">Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-sumi-600">Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-sumi-600">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-sumi-600">Subject *</label>
                  <select name="subject" required value={formData.subject} onChange={handleInputChange} className={inputClass}>
                    <option value="">Select a subject</option>
                    <option value="free-estimate">Request Free Estimate</option>
                    <option value="residential">Residential Service</option>
                    <option value="commercial">Commercial Service</option>
                    <option value="restaurant">Restaurant Service</option>
                    <option value="emergency">Emergency Service</option>
                    <option value="complaint">Service Complaint</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-sumi-600">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your window cleaning needs..."
                    className={inputClass}
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center gap-2">
                  <Send className="h-3.5 w-3.5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sumi-900 py-16">
        <div className="section-container text-center">
          <h2 className="font-display text-2xl font-bold text-washi-50 sm:text-3xl">
            Ready for crystal clear windows?
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a href="tel:5403351059" className="inline-flex items-center justify-center gap-2 rounded-sm bg-washi-50 px-7 py-3 text-sm font-medium tracking-wide text-sumi-900 transition-colors hover:bg-washi-200">
              <Phone className="h-3.5 w-3.5" /> (540) 335-1059
            </a>
            <Link to="/free-estimate" className="inline-flex items-center justify-center gap-2 rounded-sm border border-sumi-600 px-7 py-3 text-sm font-medium tracking-wide text-washi-200 transition-colors hover:border-sumi-400 hover:text-washi-50">
              Get Free Estimate
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
