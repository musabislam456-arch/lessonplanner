import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  GraduationCap, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  CheckCircle2, 
  Clock, 
  Users, 
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — LessonPlanner AI Mission & Pedagogical Framework',
  description: 'Built by former educators to give teachers their weekends back. Learn about our pedagogy-first approach, UDL principles, and data ethics.',
};

export default function AboutPage() {
  const values = [
    {
      title: 'Pedagogy Before Technology',
      description: 'We do not believe in AI for the sake of AI. Every algorithm and template is anchored to proven frameworks: Bloom\'s Revised Taxonomy, the 5E Inquiry Model, and Gradual Release of Responsibility.',
      icon: BookOpen
    },
    {
      title: 'Teacher Ownership of Curriculum',
      description: 'Educators are creative professionals. Every lesson plan, student worksheet, and grading rubric you generate on our platform is 100% your intellectual property to modify, print, or share freely.',
      icon: Award
    },
    {
      title: 'Privacy-First & Student Protected',
      description: 'We never collect or process student Personally Identifiable Information (PII). Our generators are FERPA and COPPA safe, requiring zero student logins or record syncing.',
      icon: ShieldCheck
    },
    {
      title: 'Protecting Teacher Well-Being',
      description: 'Teacher burnout is at an all-time high. By streamlining repetitive administrative formatting, our goal is to give every educator 3 to 5 hours of their personal life back each week.',
      icon: Heart
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Hero */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-3">
          <GraduationCap className="w-4 h-4 text-teal-700" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Built by educators who know what a Sunday night feels like.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          LessonPlanner AI was founded with a straightforward goal: eliminate the repetitive, exhausting administrative formatting that consumes teacher evenings, while holding the bar high for classroom rigor.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed text-sm sm:text-base">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Why We Started LessonPlanner AI
          </h2>
          <p>
            In 2024, our founding team—comprising former public school teachers and instructional specialists—observed a heartbreaking reality: passionate teachers were leaving the profession not because they didn&apos;t love their students, but because administrative compliance had swallowed their personal lives.
          </p>
          <p>
            Writing out 45-minute lesson plans with standards codes, Bloom&apos;s action verbs, differentiated ELL tiers, and rubrics took 90 to 120 minutes per subject. Multiply that by three preps, and a teacher&apos;s weekend was gone before it began.
          </p>
          <p>
            We realized that instructional design has predictable structural logic: objectives must be measurable, direct instruction must be chunked, and practice must be scaffolded. By encoding these instructional best practices into an intuitive, rule-grounded generator, we created an engine that produces exemplary curriculum skeletons in 60 seconds.
          </p>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-br from-teal-900 to-teal-950 text-white p-8 rounded-3xl shadow-lg space-y-6">
          <h3 className="text-lg font-bold text-orange-400">
            Our 2026 Impact Snapshot
          </h3>
          <div className="space-y-4">
            <div className="border-b border-teal-800 pb-3">
              <div className="text-3xl font-extrabold text-white">45,000+</div>
              <div className="text-xs text-teal-200">Lesson plans generated across 50 states</div>
            </div>
            <div className="border-b border-teal-800 pb-3">
              <div className="text-3xl font-extrabold text-white">120,000+</div>
              <div className="text-xs text-teal-200">Hours of teacher weekend prep preserved</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white">350+</div>
              <div className="text-xs text-teal-200">School districts & teacher preparation programs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
            Pedagogical Integrity
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            The Principles That Guide Every Tool We Build
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-1">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-slate-900">{v.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{v.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Meet the Advisory Educators */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Educator Advisory Council
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Our generator logic and rubric criteria are continuously audited by active classroom professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="font-bold text-slate-900 text-sm">Sarah Jenkins, M.Ed.</div>
            <div className="text-xs text-teal-700 font-medium">Curriculum Specialist</div>
            <p className="text-xs text-slate-500 mt-2">14 years in middle school STEM & secondary instructional coaching.</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="font-bold text-slate-900 text-sm">Marcus Vance, Ed.S.</div>
            <div className="text-xs text-orange-600 font-medium">Inclusion & UDL Lead</div>
            <p className="text-xs text-slate-500 mt-2">Special education coordinator and multi-tiered systems of support (MTSS) author.</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="font-bold text-slate-900 text-sm">Dr. Elena Rostova</div>
            <div className="text-xs text-emerald-700 font-medium">Assessment Specialist</div>
            <p className="text-xs text-slate-500 mt-2">Researcher in standards-based grading and observable rubric design.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          href="/tools/lesson-plan"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-teal-700 hover:bg-teal-800 text-white shadow-md transition-all"
        >
          <Sparkles className="w-4 h-4 text-orange-300" />
          <span>Experience the Generator in Action</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
