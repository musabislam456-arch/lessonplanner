import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { FileCheck, Shield, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service — LessonPlanner AI',
  description: 'Terms of Service, intellectual property ownership, and acceptable classroom use guidelines for LessonPlanner AI.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-3">
          <FileCheck className="w-3.5 h-3.5 text-teal-700" />
          <span>Classroom Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Effective Date: September 2026 • Teacher-Friendly Licensing
        </p>
      </div>

      <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or utilizing LessonPlanner AI (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service. If you are using the Service on behalf of an educational institution or school district, you represent that you have authority to bind that entity.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">2. Complete Teacher Content Ownership</h2>
          <p>
            We believe that instructional materials belong to the educators who craft them. Any output generated through our Lesson Plan, Worksheet, or Rubric tools—including modifications, exports, and printouts—is your exclusive property. LessonPlanner AI asserts zero copyright claims over your classroom materials.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="font-bold text-slate-900 block">You are explicitly permitted to:</span>
            <ul className="list-disc list-inside space-y-1 text-slate-700 pl-2">
              <li>Photocopy and distribute worksheets and rubrics to your enrolled students.</li>
              <li>Share lesson plans with co-teachers, department chairs, and student teachers.</li>
              <li>Upload generated plans to your school&apos;s LMS (Canvas, Google Classroom, Schoology).</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">3. Acceptable Use Guidelines</h2>
          <p>
            You agree to use our generators in compliance with all relevant laws, professional educator codes of ethics, and school district policies. You agree not to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
            <li>Generate defamatory, hateful, or explicit content unsuitable for minors.</li>
            <li>Input confidential student records, grades, or disciplinary histories into open text prompts.</li>
            <li>Attempt to reverse-engineer or deploy automated scraping bots against our web platform.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">4. Professional Educator Judgment Disclaimer</h2>
          <p>
            LessonPlanner AI provides instructional skeletons, standardized frameworks, and draft materials designed to save teachers time. The Service is an instructional assistant, not a replacement for professional human pedagogy. Teachers are responsible for verifying accuracy, safety protocols (e.g., in laboratory science exercises), and cultural appropriateness for their specific student demographic before teaching.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">5. Service Availability & Modifications</h2>
          <p>
            We strive to provide 99.9% uptime to support educators throughout the school year. We reserve the right to improve templates, introduce new pedagogical features, and modify services to maintain excellence.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">6. Questions Regarding Terms</h2>
          <p>
            For legal inquiries or district compliance documentation, please reach out to:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <strong>LessonPlanner AI Legal Affairs:</strong> legal@lessonplanner.ai
          </div>
        </section>
      </div>
    </div>
  );
}
