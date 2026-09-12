import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Sparkles, ArrowLeft } from 'lucide-react';
import LessonPlanGenerator from '@/components/generators/LessonPlanGenerator';

export const metadata: Metadata = {
  title: 'Lesson Plan Generator — LessonPlanner AI',
  description: 'Design structured, standards-aligned 5E and Gradual Release lesson plans in under 5 minutes. Custom timings, differentiation, and exit tickets.',
  openGraph: {
    title: 'Lesson Plan Generator — LessonPlanner AI',
    description: 'Instant standards-aligned lesson plans with 5E or Gradual Release frameworks, Bloom\'s objectives, and differentiation scaffolds.',
  }
};

export default function LessonPlanToolPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb / Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 no-print">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Tools</span>
        </Link>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Other Tools:</span>
          <Link href="/tools/worksheet" className="font-semibold text-orange-600 hover:underline">
            Worksheet Builder
          </Link>
          <span className="text-slate-300">•</span>
          <Link href="/tools/rubric" className="font-semibold text-emerald-700 hover:underline">
            Rubric Generator
          </Link>
        </div>
      </div>

      {/* Hero Title */}
      <div className="no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-2">
          <BookOpen className="w-3.5 h-3.5 text-teal-700" />
          <span>Lesson Plan Generator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Structured Lesson Plan Generator
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Fill in your subject, grade, topic, and duration. The system formats pedagogical objectives, step-by-step instructional timelines, and differentiation matrices.
        </p>
      </div>

      {/* Generator */}
      <LessonPlanGenerator />
    </div>
  );
}
