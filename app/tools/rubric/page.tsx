import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { CheckSquare, ArrowLeft } from 'lucide-react';
import RubricGenerator from '@/components/generators/RubricGenerator';

export const metadata: Metadata = {
  title: 'Rubric Generator — 4-Level Performance Matrix — LessonPlanner AI',
  description: 'Design objective, observable 4-level grading rubrics across Exemplary, Proficient, Developing, and Beginning tiers. 100% free and customizable.',
};

export default function RubricToolPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb / Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 no-print">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Tools</span>
        </Link>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Other Tools:</span>
          <Link href="/tools/lesson-plan" className="font-semibold text-teal-700 hover:underline">
            Lesson Plan Generator
          </Link>
          <span className="text-slate-300">•</span>
          <Link href="/tools/worksheet" className="font-semibold text-orange-600 hover:underline">
            Worksheet Builder
          </Link>
        </div>
      </div>

      {/* Hero Title */}
      <div className="no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
          <CheckSquare className="w-3.5 h-3.5 text-emerald-700" />
          <span>Rubric Generator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Observable Rubric Generator
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Construct fair, transparent 4-tier rubrics. Clearly communicates expectations to students and simplifies grading workflows.
        </p>
      </div>

      {/* Generator */}
      <RubricGenerator />
    </div>
  );
}
