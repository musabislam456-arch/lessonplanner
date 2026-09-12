import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';
import WorksheetGenerator from '@/components/generators/WorksheetGenerator';

export const metadata: Metadata = {
  title: 'Worksheet Builder — Fill-in-the-Blank & Cloze Handouts — LessonPlanner AI',
  description: 'Generate clean, printable fill-in-the-blank practice worksheets with optional word banks and teacher answer keys.',
};

export default function WorksheetToolPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb / Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 no-print">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-orange-600 transition-colors"
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
          <Link href="/tools/rubric" className="font-semibold text-emerald-700 hover:underline">
            Rubric Generator
          </Link>
        </div>
      </div>

      {/* Hero Title */}
      <div className="no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-800 border border-orange-200 mb-2">
          <FileText className="w-3.5 h-3.5 text-orange-600" />
          <span>Worksheet Builder</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Fill-in-the-Blank Worksheet Builder
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Build student-ready handouts instantly. Format with clean blanks, word bank boxes, and ready-to-use teacher answer keys.
        </p>
      </div>

      {/* Generator */}
      <WorksheetGenerator />
    </div>
  );
}
