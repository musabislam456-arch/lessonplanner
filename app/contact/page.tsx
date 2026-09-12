'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  School, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  Send, 
  ChevronDown, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    schoolOrDistrict: '',
    role: 'Classroom Teacher',
    inquiryType: 'General Question',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  const faqs = [
    {
      q: 'Is LessonPlanner AI really free for classroom teachers?',
      a: 'Yes! All core generative features—including the Lesson Plan Generator, Fill-in-the-Blank Worksheet Builder, and Rubric Generator—are free for individual classroom educators. You can print, copy, and export markdown without artificial paywalls.'
    },
    {
      q: 'Do I need to upload student names or grades to use the tools?',
      a: 'Absolutely not. In compliance with FERPA and COPPA, our generators require zero student personally identifiable information (PII). Handouts provide clean blank headers for students to write their names by hand or through your existing secure LMS.'
    },
    {
      q: 'Can I customize the generated lesson plans before printing?',
      a: 'Yes. You can copy the generated text directly into Google Docs or Microsoft Word, or export as Markdown. You maintain 100% intellectual ownership of every curriculum asset created.'
    },
    {
      q: 'How do school district pilots and professional development workshops work?',
      a: 'We partner with districts and instructional coaches to offer tailored prompt libraries aligned with specific state standards (TEKS, NYSED, California Frameworks) and conduct interactive 45-minute PD webinars.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-3">
          <Mail className="w-3.5 h-3.5 text-teal-700" />
          <span>Educator Support & Partnerships</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          How can our instructional team support you?
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Whether you have feedback on a curriculum template, need help with a custom differentiation standard, or want to discuss a district-wide deployment, we&apos;re here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Message Received!</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you for reaching out, {formData.fullName}. An instructional specialist will review your note and respond to <strong className="text-slate-800">{formData.email}</strong> within 24 hours on school days.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    fullName: '',
                    email: '',
                    schoolOrDistrict: '',
                    role: 'Classroom Teacher',
                    inquiryType: 'General Question',
                    message: ''
                  });
                }}
                className="mt-4 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Send an Inquiry</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="c-name">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    id="c-name"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Maria Gonzalez"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="c-email">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="c-email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="teacher@district.k12.state.us"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="c-school">
                    School or District (Optional)
                  </label>
                  <input
                    type="text"
                    id="c-school"
                    value={formData.schoolOrDistrict}
                    onChange={(e) => setFormData({ ...formData, schoolOrDistrict: e.target.value })}
                    placeholder="e.g. Oakridge Middle School"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="c-role">
                    Educator Role
                  </label>
                  <select
                    id="c-role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  >
                    <option value="Classroom Teacher">Classroom Teacher</option>
                    <option value="Instructional Coach">Instructional Coach</option>
                    <option value="Department Chair">Department Chair</option>
                    <option value="School Principal / Administrator">School Principal / Administrator</option>
                    <option value="District Curriculum Director">District Curriculum Director</option>
                    <option value="Higher Ed / Preservice Professor">Higher Ed / Preservice Professor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="c-inquiry">
                  Topic of Inquiry
                </label>
                <select
                  id="c-inquiry"
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                >
                  <option value="General Question">General Question / Feedback</option>
                  <option value="Feature Request">Template or Feature Suggestion</option>
                  <option value="District Pilot">District Pilot or School Inquiry</option>
                  <option value="Pedagogical Standards Alignment">State Standards Customization</option>
                  <option value="Bug Report">Technical Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="c-message">
                  Message *
                </label>
                <textarea
                  id="c-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what grade level, subject, or challenge you're navigating..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-sm font-bold bg-teal-700 hover:bg-teal-800 text-white shadow-md transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Info & FAQ */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <School className="w-5 h-5 text-orange-400" />
              <span>Direct Support Channels</span>
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Educator Response Guarantee</strong>
                  We reply to all teacher tickets within 24 business hours (Monday – Friday, 8am – 6pm CST).
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Direct Email</strong>
                  support@lessonplanner.ai
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">FERPA & Vendor Inquiries</strong>
                  districts@lessonplanner.ai
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-teal-700" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-3.5 text-left text-xs font-bold text-slate-800 bg-slate-50/70 hover:bg-slate-100 flex items-center justify-between gap-2 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-teal-700' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-3.5 text-xs text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
