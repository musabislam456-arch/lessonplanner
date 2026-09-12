'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Sparkles, 
  Mail, 
  CheckCircle2, 
  Shield, 
  BookOpen, 
  Heart,
  FileCheck,
  School
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 print:hidden">
      {/* Top Newsletter & Assurance Banner */}
      <div className="border-b border-slate-800/80 bg-slate-950/40 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-900/60 text-teal-300 border border-teal-700/50 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>The Modern Educator Weekly</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                High-yield teaching strategies, delivered every Sunday morning.
              </h3>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Join over 28,000 instructional coaches and classroom teachers. We send one actionable lesson idea, printable template, or differentiation tip each week. Zero spam.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div 
                  id="newsletter-success-box"
                  className="p-4 rounded-xl bg-teal-950/60 border border-teal-700/60 text-teal-200 flex items-center gap-3 text-sm animate-in fade-in"
                >
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                  <div>
                    <span className="font-semibold block text-white">You&apos;re on the list!</span>
                    Look out for our first template bundle in your inbox this Sunday.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your school or personal email"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      id="newsletter-email-input"
                    />
                  </div>
                  <button
                    type="submit"
                    id="newsletter-subscribe-btn"
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-orange-600 hover:bg-orange-500 text-white shadow-md transition-colors shrink-0"
                  >
                    Subscribe Free
                  </button>
                </form>
              )}
              <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-teal-400" />
                <span>We respect teacher privacy. FERPA compliant, unsubscribe anytime.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-orange-200" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                LessonPlanner <span className="text-orange-400">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Purpose-built instructional software designed to give teachers their evenings back. Structured templates, pedagogical best practices, and 100% teacher-owned materials.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-slate-800 text-slate-300 border border-slate-700">
                <Shield className="w-3 h-3 text-teal-400" /> Zero Student PII Needed
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-slate-800 text-slate-300 border border-slate-700">
                <FileCheck className="w-3 h-3 text-orange-400" /> Free Classroom Export
              </span>
            </div>
          </div>

          {/* Col 1: Tools */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Core Generators
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tools/lesson-plan" className="hover:text-teal-400 transition-colors">
                  Lesson Plan Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/worksheet" className="hover:text-teal-400 transition-colors">
                  Worksheet Builder
                </Link>
              </li>
              <li>
                <Link href="/tools/rubric" className="hover:text-teal-400 transition-colors">
                  Rubric Generator
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-teal-400 transition-colors">
                  All Teacher Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Guides */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Pedagogical Guides
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/blog/5-minute-lesson-planning-tips" className="hover:text-teal-400 transition-colors">
                  5-Minute Lesson Planning
                </Link>
              </li>
              <li>
                <Link href="/blog/differentiated-instruction-ideas" className="hover:text-teal-400 transition-colors">
                  Differentiated Instruction
                </Link>
              </li>
              <li>
                <Link href="/blog/designing-fair-grading-rubrics" className="hover:text-teal-400 transition-colors">
                  Fair Grading Rubrics
                </Link>
              </li>
              <li>
                <Link href="/blog/worksheet-design-principles" className="hover:text-teal-400 transition-colors">
                  Worksheet Design & Cognition
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-teal-400 hover:text-teal-300 font-medium inline-flex items-center gap-1 pt-1">
                  View All Guides →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Trust */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-teal-400 transition-colors">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-400 transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-teal-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-teal-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} LessonPlanner AI. All curriculum and generated teaching materials belong 100% to the teacher.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-orange-500 fill-orange-500 inline" />
            <span>for hard-working educators</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
