import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { BookOpen, FileText, CheckSquare, Sparkles, ArrowRight, Printer, Download, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Teacher Tools — LessonPlanner AI Suite',
  description: 'Explore the complete suite of teacher-first planning tools: Lesson Plan Generator, Fill-in-the-blank Worksheet Builder, and 4-Level Rubric Creator.',
};

export default function ToolsHubPage() {
  const tools = [
    {
      id: 'lesson-plan',
      title: 'Lesson Plan Generator',
      subtitle: 'Complete 5E & Gradual Release Curriculum Architect',
      description: 'Generates structured objectives, timed phases (Hook, I Do, We Do, You Do), Bloom\'s SWBAT statements, formative exit tickets, and tiered differentiation scaffolds.',
      href: '/tools/lesson-plan',
      icon: BookOpen,
      color: 'teal',
      features: ['5E & Gradual Release Timelines', 'Differentiation for ELL & IEP', 'Printable & Markdown Export']
    },
    {
      id: 'worksheet',
      title: 'Worksheet Builder',
      subtitle: 'Cloze Reading & Fill-in-the-Blank Practice Generator',
      description: 'Transform subject topics or custom text passages into student-ready handouts. Includes customizable word bank boxes and a discrete teacher answer key.',
      href: '/tools/worksheet',
      icon: FileText,
      color: 'orange',
      features: ['Auto-Detects [Bracketed] Answers', 'Word Bank Toggle', 'Student & Answer Key Sheets']
    },
    {
      id: 'rubric',
      title: 'Rubric Generator',
      subtitle: '4-Level Observable Performance Criteria Matrix',
      description: 'Eliminates grading ambiguity with objective descriptors across Exemplary, Proficient, Developing, and Beginning tiers. Fully customizable weights and criteria rows.',
      href: '/tools/rubric',
      icon: CheckSquare,
      color: 'emerald',
      features: ['Observable Performance Descriptors', 'Custom Weighted Criteria', 'Teacher Feedback Space']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>Complete Instructional Tool Suite</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Teacher-First Generative Tools
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Every tool is grounded in evidence-based pedagogical frameworks, designed to produce clean, ready-to-teach materials you can print or export immediately.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  tool.color === 'teal' 
                    ? 'bg-teal-100 text-teal-700' 
                    : tool.color === 'orange'
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h2 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {tool.title}
                </h2>
                <div className="text-xs font-semibold text-slate-500 mt-0.5 mb-3">
                  {tool.subtitle}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {tool.description}
                </p>

                <div className="space-y-2 mb-6">
                  {tool.features.map((feat, i) => (
                    <div key={i} className="text-xs text-slate-700 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={tool.href}
                className={`w-full py-3 px-4 rounded-xl text-sm font-bold text-center inline-flex items-center justify-center gap-2 transition-all shadow-xs ${
                  tool.color === 'teal'
                    ? 'bg-teal-700 hover:bg-teal-800 text-white'
                    : tool.color === 'orange'
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                }`}
              >
                <span>Launch {tool.title}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Assurance Box */}
      <div className="rounded-2xl bg-slate-100 p-6 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-teal-700 shrink-0" />
          <div>
            <strong className="text-slate-900 block font-semibold">Teacher Intellectual Property Protection</strong>
            Everything you generate belongs exclusively to you. We do not sell your curricula or require student personal identifiers.
          </div>
        </div>
        <Link
          href="/privacy"
          className="text-xs font-bold text-teal-700 hover:underline shrink-0"
        >
          View Privacy Standards →
        </Link>
      </div>
    </div>
  );
}
