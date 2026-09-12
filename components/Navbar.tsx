'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, 
  BookOpen, 
  FileText, 
  CheckSquare, 
  Menu, 
  X, 
  ChevronDown, 
  GraduationCap, 
  ArrowRight
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isToolActive = pathname.startsWith('/tools');

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-xs print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            id="brand-logo"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg p-1"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-teal-700 to-teal-800 text-white flex items-center justify-center shadow-md shadow-teal-900/10 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-6 h-6 text-orange-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900">
                  LessonPlanner
                </span>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 border border-orange-200/80">
                  <Sparkles className="w-3 h-3 text-orange-500" />
                  AI
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                For K-12 & Higher Ed Educators
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {/* Tools Menu with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button
                type="button"
                id="nav-tools-dropdown-btn"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isToolActive 
                    ? 'text-teal-700 bg-teal-50' 
                    : 'text-slate-700 hover:text-teal-700 hover:bg-slate-50'
                }`}
                aria-expanded={toolsDropdownOpen}
              >
                <span>Teacher Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} />
              </button>

              {/* Dropdown Card */}
              {toolsDropdownOpen && (
                <div 
                  id="tools-dropdown-panel"
                  className="absolute left-0 mt-1 w-80 rounded-2xl bg-white p-2.5 shadow-xl border border-slate-200/90 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Core AI Generators
                  </div>

                  <Link
                    href="/tools/lesson-plan"
                    id="nav-dropdown-lesson-plan"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-teal-50/80 group transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-teal-100/80 text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-teal-700">
                        Lesson Plan Generator
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        Structured standards, objectives, 5E or I-Do/We-Do timelines & differentiation.
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/tools/worksheet"
                    id="nav-dropdown-worksheet"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-50/80 group transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-orange-100 text-orange-700 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-orange-700">
                        Worksheet Builder
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        Fill-in-the-blank practice, word banks, and student-ready printable layouts.
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/tools/rubric"
                    id="nav-dropdown-rubric"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50/80 group transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <CheckSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
                        Rubric Generator
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        4-level observable performance matrices with customizable grading criteria.
                      </p>
                    </div>
                  </Link>

                  <div className="pt-2 mt-1 border-t border-slate-100">
                    <Link
                      href="/tools"
                      id="nav-dropdown-all-tools"
                      className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-teal-700 hover:text-teal-800 rounded-lg hover:bg-slate-50"
                    >
                      <span>Explore Tools Hub</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              id="nav-link-blog"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                pathname.startsWith('/blog')
                  ? 'text-teal-700 bg-teal-50'
                  : 'text-slate-700 hover:text-teal-700 hover:bg-slate-50'
              }`}
            >
              Teacher Guides & Blog
            </Link>

            <Link
              href="/about"
              id="nav-link-about"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                pathname === '/about'
                  ? 'text-teal-700 bg-teal-50'
                  : 'text-slate-700 hover:text-teal-700 hover:bg-slate-50'
              }`}
            >
              About Us
            </Link>

            <Link
              href="/contact"
              id="nav-link-contact"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                pathname === '/contact'
                  ? 'text-teal-700 bg-teal-50'
                  : 'text-slate-700 hover:text-teal-700 hover:bg-slate-50'
              }`}
            >
              Contact & Support
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/tools/lesson-plan"
              id="nav-cta-generate-btn"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-teal-700 hover:bg-teal-800 text-white shadow-sm hover:shadow-md transition-all active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-orange-300" />
              <span>Generate Lesson Free</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/tools/lesson-plan"
              className="p-2 rounded-lg bg-teal-50 text-teal-700 text-xs font-semibold flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create</span>
            </Link>
            <button
              type="button"
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-panel" className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            <div className="px-3 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
              AI Tools
            </div>
            <Link
              href="/tools/lesson-plan"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-700"
            >
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>Lesson Plan Generator</span>
            </Link>
            <Link
              href="/tools/worksheet"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-orange-50 hover:text-orange-700"
            >
              <FileText className="w-4 h-4 text-orange-600" />
              <span>Worksheet Builder</span>
            </Link>
            <Link
              href="/tools/rubric"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <span>Rubric Generator</span>
            </Link>
          </div>

          <div className="border-t border-slate-100 pt-2 space-y-1">
            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              <span>All Tools Overview</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              <span>Teacher Guides & Blog</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-semibold">4 Articles</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Contact & School Support
            </Link>
          </div>

          <div className="pt-2">
            <Link
              href="/tools/lesson-plan"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-teal-700 text-white shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-orange-300" />
              <span>Start Planning a Lesson</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
