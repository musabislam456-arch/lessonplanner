'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  BookOpen, 
  FileText, 
  CheckSquare, 
  GraduationCap, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Layers, 
  Star,
  Download,
  Printer
} from 'lucide-react';
import LessonPlanGenerator from '@/components/generators/LessonPlanGenerator';
import WorksheetGenerator from '@/components/generators/WorksheetGenerator';
import RubricGenerator from '@/components/generators/RubricGenerator';
import { BLOG_POSTS } from '@/lib/blog-data';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'plan' | 'worksheet' | 'rubric'>('plan');

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* Top Interactive Workspace Hero */}
      <section className="pt-6 sm:pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header Title & Value Proposition */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200/80 mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>AI-Assisted Instructional Suite for K-12 & Higher Ed</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Design Standards-Aligned Lesson Materials in <span className="text-teal-700 underline decoration-orange-400 decoration-wavy decoration-2">Minutes</span>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Generate rigorous 5E & Gradual Release lesson plans, fill-in-the-blank practice sheets with answer keys, and observable 4-level grading rubrics. 100% free and teacher-owned.
          </p>

          {/* Quick Tool Switcher Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/90 max-w-xl mx-auto shadow-xs">
            <button
              type="button"
              id="tab-btn-lesson-plan"
              onClick={() => setActiveTab('plan')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'plan'
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Lesson Plan Generator</span>
            </button>

            <button
              type="button"
              id="tab-btn-worksheet"
              onClick={() => setActiveTab('worksheet')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'worksheet'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Worksheet Builder</span>
            </button>

            <button
              type="button"
              id="tab-btn-rubric"
              onClick={() => setActiveTab('rubric')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'rubric'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Rubric Generator</span>
            </button>
          </div>
        </div>

        {/* Live Interactive Workspace Component */}
        <div className="bg-white/40 backdrop-blur-xs p-1 sm:p-2 rounded-3xl">
          {activeTab === 'plan' && <LessonPlanGenerator />}
          {activeTab === 'worksheet' && <WorksheetGenerator />}
          {activeTab === 'rubric' && <RubricGenerator />}
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
            Why Educators Trust LessonPlanner AI
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Instructional rigor, without the administrative burnout.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              Modular 5E & Gradual Release
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              No generic bullet lists. Outputs follow explicit instructional timelines: Hook, I Do (Explicit Modeling), We Do (Guided Collaboration), and You Do (Tiered Mastery).
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-teal-700 flex items-center gap-1">
              <span>Includes Blooms Taxonomy SWBAT</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              Photocopy-Ready Worksheets
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Turn any topic or custom passage into clean, formatted fill-in-the-blank practice sheets complete with student headers, word banks, and separate teacher grading keys.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-orange-700 flex items-center gap-1">
              <span>Supports custom bracketed text</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <CheckSquare className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              Observable 4-Tier Rubrics
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Eliminate subjective grading disputes. Generate matrices with concrete, observable criteria across Exemplary, Proficient, Developing, and Beginning tiers.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-emerald-700 flex items-center gap-1">
              <span>Customizable weights & criteria</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Teacher Guides & Blog */}
      <section className="bg-slate-50/80 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-700 bg-orange-100/80 px-2.5 py-1 rounded-md mb-2">
                <span>Free Pedagogical Guides</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Classroom-Tested Strategies
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                Practical, actionable frameworks written by former educators and instructional coaches.
              </p>
            </div>
            <Link
              href="/blog"
              id="home-view-all-guides"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-800 transition-colors"
            >
              <span>Explore All Guides & Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-700">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug mb-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {post.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center">
                      {post.author.name[0]}
                    </div>
                    <span className="text-xs font-medium text-slate-700">
                      {post.author.name.split(',')[0]}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-teal-700 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Trust & District Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-teal-800 to-teal-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-teal-700/20 blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-900/80 text-teal-200 border border-teal-700/50">
                <GraduationCap className="w-4 h-4 text-orange-400" />
                <span>By Educators, For Educators</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                &ldquo;It saved me 4 hours every single Sunday afternoon.&rdquo;
              </h3>
              <p className="text-sm sm:text-base text-teal-100 leading-relaxed">
                &ldquo;As an 8th-grade science teacher with 140 students and diverse IEP needs, building differentiated lesson phases used to keep me up past 10 PM. LessonPlanner AI gives me the complete Gradual Release structure and formative exit tickets in seconds. I just tweak for my students and hit print.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  MT
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Maria Torres</div>
                  <div className="text-xs text-teal-300">Middle School Science Dept Chair • Austin ISD</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-teal-900/50 border border-teal-700/60 p-4 rounded-2xl backdrop-blur-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-orange-400">45,000+</div>
                <div className="text-xs text-teal-200 mt-1 font-medium">Lesson Plans Created</div>
              </div>
              <div className="bg-teal-900/50 border border-teal-700/60 p-4 rounded-2xl backdrop-blur-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-orange-400">100%</div>
                <div className="text-xs text-teal-200 mt-1 font-medium">Teacher Owned IP</div>
              </div>
              <div className="bg-teal-900/50 border border-teal-700/60 p-4 rounded-2xl backdrop-blur-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-teal-300">FERPA</div>
                <div className="text-xs text-teal-200 mt-1 font-medium">Student Privacy Safe</div>
              </div>
              <div className="bg-teal-900/50 border border-teal-700/60 p-4 rounded-2xl backdrop-blur-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-teal-300">4.9 / 5</div>
                <div className="text-xs text-teal-200 mt-1 font-medium">Teacher Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="text-center max-w-3xl mx-auto px-4 sm:px-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Ready to prepare tomorrow&apos;s class in 5 minutes?
        </h3>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          No credit cards, no login walls, and no complex prompts required. Choose your subject and start planning now.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setActiveTab('plan');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-xl text-sm font-bold bg-teal-700 hover:bg-teal-800 text-white shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-orange-300" />
            <span>Open Lesson Plan Generator</span>
          </button>
          <Link
            href="/about"
            className="px-5 py-3 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
          >
            Learn About Our Pedagogical Model
          </Link>
        </div>
      </section>

    </div>
  );
}
