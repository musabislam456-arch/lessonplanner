'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Clock, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  RefreshCw, 
  AlertCircle, 
  Edit3, 
  GraduationCap, 
  Target, 
  Users, 
  Layers, 
  FileText,
  Lightbulb
} from 'lucide-react';
import { 
  Subject, 
  GradeLevel, 
  Duration, 
  DifferentiationFocus, 
  LessonPlanRequest, 
  GeneratedLessonPlan 
} from '@/lib/types';
import { generateLessonPlan, QUICK_PROMPT_PRESETS } from '@/lib/generator-templates';

const SUBJECTS: Subject[] = [
  'English Language Arts',
  'Mathematics',
  'Science & Biology',
  'Social Studies & History',
  'Visual & Performing Arts',
  'Foreign Languages',
  'Health & Physical Education',
  'Computer Science & Tech'
];

const GRADES: GradeLevel[] = [
  'Kindergarten',
  '1st - 2nd Grade',
  '3rd - 5th Grade',
  '6th - 8th Grade (Middle School)',
  '9th - 10th Grade (High School)',
  '11th - 12th Grade (High School)',
  'Higher Ed / College'
];

const DURATIONS: Duration[] = [
  '30 minutes',
  '45 minutes',
  '60 minutes',
  '90 minutes (Block)'
];

const METHODS = [
  'Gradual Release (I Do, We Do, You Do)',
  '5E Model (Engage, Explore, Explain, Elaborate, Evaluate)',
  'Inquiry-Based & Socratic',
  'Project & Problem-Based'
] as const;

export default function LessonPlanGenerator() {
  const [formData, setFormData] = useState<LessonPlanRequest>({
    subject: 'Science & Biology',
    gradeLevel: '6th - 8th Grade (Middle School)',
    topic: 'Photosynthesis & Plant Cell Energy',
    duration: '45 minutes',
    standard: 'NGSS MS-LS1-6: Construct a scientific explanation based on evidence for the role of photosynthesis.',
    differentiation: 'Mixed Ability (Balanced)',
    teachingMethod: '5E Model (Engage, Explore, Explain, Elaborate, Evaluate)'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [result, setResult] = useState<GeneratedLessonPlan | null>(() => generateLessonPlan({
    subject: 'Science & Biology',
    gradeLevel: '6th - 8th Grade (Middle School)',
    topic: 'Photosynthesis & Plant Cell Energy',
    duration: '45 minutes',
    standard: 'NGSS MS-LS1-6: Construct a scientific explanation based on evidence for the role of photosynthesis in the cycling of matter.',
    differentiation: 'Mixed Ability (Balanced)',
    teachingMethod: '5E Model (Engage, Explore, Explain, Elaborate, Evaluate)'
  }));

  const [copied, setCopied] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handlePresetClick = (preset: typeof QUICK_PROMPT_PRESETS[0]) => {
    setFormData({
      subject: preset.subject,
      gradeLevel: preset.grade,
      topic: preset.title,
      duration: preset.duration,
      standard: '',
      differentiation: preset.diff,
      teachingMethod: preset.method
    });
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.topic.trim()) return;

    setIsGenerating(true);
    setGenerationStep(1);

    const timer1 = setTimeout(() => setGenerationStep(2), 350);
    const timer2 = setTimeout(() => setGenerationStep(3), 750);
    const timer3 = setTimeout(() => {
      const generated = generateLessonPlan(formData);
      setResult(generated);
      setIsGenerating(false);
      setGenerationStep(0);
    }, 1100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const handleCopyText = () => {
    if (!result) return;
    const textContent = `
LESSON PLAN: ${result.title}
Subject: ${result.subject} | Grade: ${result.gradeLevel} | Duration: ${result.duration}
Standard: ${result.standard}
Differentiation Focus: ${result.differentiationFocus}

OBJECTIVES (SWBAT):
${result.objectives.map(o => `• ${o}`).join('\n')}

ESSENTIAL QUESTIONS:
${result.essentialQuestions.map(q => `• ${q}`).join('\n')}

MATERIALS NEEDED:
${result.materials.map(m => `• ${m}`).join('\n')}

INSTRUCTIONAL SEQUENCE:
${result.sections.map(s => `
[${s.title} - ${s.durationMinutes} mins]
${s.content.map(c => `- ${c}`).join('\n')}
${s.teacherTip ? `Teacher Note: ${s.teacherTip}` : ''}
`).join('\n')}

ASSESSMENT:
Formative: ${result.assessment.formativeCheck}
Exit Ticket:
${result.assessment.exitTicketQuestions.map(q => `• ${q}`).join('\n')}

DIFFERENTIATION:
Scaffolding:
${result.differentiationDetails.scaffolding.map(s => `• ${s}`).join('\n')}
ELL Scaffolds:
${result.differentiationDetails.ellSupport.map(e => `• ${e}`).join('\n')}
Extensions:
${result.differentiationDetails.extensions.map(x => `• ${x}`).join('\n')}

HOMEWORK / EXTENSION:
${result.homeworkOrExtension}
    `.trim();

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    if (!result) return;
    const mdContent = `# ${result.title}

- **Subject:** ${result.subject}
- **Grade Level:** ${result.gradeLevel}
- **Duration:** ${result.duration}
- **Standard Alignment:** ${result.standard}
- **Differentiation:** ${result.differentiationFocus}

---

## 🎯 Learning Objectives (SWBAT)
${result.objectives.map(o => `- ${o}`).join('\n')}

## ❓ Essential Questions
${result.essentialQuestions.map(q => `- ${q}`).join('\n')}

## 📦 Materials & Tech
${result.materials.map(m => `- ${m}`).join('\n')}

---

## ⏱️ Instructional Timeline
${result.sections.map(s => `
### ${s.title} (${s.durationMinutes} mins)
${s.content.map(c => `- ${c}`).join('\n')}
${s.teacherTip ? `> **Teacher Tip:** ${s.teacherTip}` : ''}
`).join('\n')}

---

## 📝 Formative Assessment & Exit Ticket
- **Formative Strategy:** ${result.assessment.formativeCheck}

### Exit Ticket Questions:
${result.assessment.exitTicketQuestions.map(q => `1. ${q}`).join('\n')}

---

## 🤝 Differentiation Matrix
### Scaffolding for Striving Learners
${result.differentiationDetails.scaffolding.map(s => `- ${s}`).join('\n')}

### Multilingual / ELL Accommodations
${result.differentiationDetails.ellSupport.map(e => `- ${e}`).join('\n')}

### Enrichment & Accelerated Extensions
${result.differentiationDetails.extensions.map(x => `- ${x}`).join('\n')}

---
**Generated by LessonPlanner AI**
`;

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${result.title.replace(/[^a-zA-Z0-9]/g, '_')}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full">
      {/* Interactive Form & Result Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Column (no-print) */}
        <div className="lg:col-span-5 space-y-6 print:hidden">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Lesson Parameters</h2>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Specify your classroom context. The engine builds objectives, phased timings, and differentiation instantly.
            </p>

            {/* Quick Inspiration Chips */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>Quick Prompt Presets (1-Click Load):</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PROMPT_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePresetClick(p)}
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 border border-slate-200/80 text-slate-700 font-medium transition-colors text-left"
                  >
                    {p.title.split(':')[0]}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="plan-subject">
                  Academic Subject
                </label>
                <select
                  id="plan-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value as Subject })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Grade & Duration Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="plan-grade">
                    Grade Level
                  </label>
                  <select
                    id="plan-grade"
                    value={formData.gradeLevel}
                    onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value as GradeLevel })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  >
                    {GRADES.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="plan-duration">
                    Class Duration
                  </label>
                  <select
                    id="plan-duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value as Duration })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  >
                    {DURATIONS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Topic */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="plan-topic">
                  Lesson Topic / Unit Goal
                </label>
                <input
                  type="text"
                  id="plan-topic"
                  required
                  placeholder="e.g. Ecosystems & Food Webs or Introduction to Quadratic Equations"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                />
              </div>

              {/* Teaching Method */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="plan-method">
                  Pedagogical Framework
                </label>
                <select
                  id="plan-method"
                  value={formData.teachingMethod}
                  onChange={(e) => setFormData({ ...formData, teachingMethod: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                >
                  {METHODS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Differentiation Focus */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="plan-diff">
                  Primary Differentiation Focus
                </label>
                <select
                  id="plan-diff"
                  value={formData.differentiation}
                  onChange={(e) => setFormData({ ...formData, differentiation: e.target.value as DifferentiationFocus })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                >
                  <option value="Mixed Ability (Balanced)">Mixed Ability (Balanced Tiered Support)</option>
                  <option value="English Language Learners (ELL scaffolds)">English Language Learners (ELL scaffolds & bilingual aids)</option>
                  <option value="Special Education / IEP Accommodations">Special Education / IEP Accommodations (Chunking & Visuals)</option>
                  <option value="Gifted & Accelerated Learners">Gifted & Accelerated Learners (Inquiry & Synthesis)</option>
                </select>
              </div>

              {/* Standard Alignment (Optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="plan-standard">
                  Standard Code / Custom Requirement (Optional)
                </label>
                <input
                  type="text"
                  id="plan-standard"
                  placeholder="e.g., CCSS.ELA-LITERACY.RI.8.2 or TEKS Math 4.3"
                  value={formData.standard}
                  onChange={(e) => setFormData({ ...formData, standard: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="generate-lesson-btn"
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-sm font-bold bg-teal-700 hover:bg-teal-800 active:scale-[0.99] text-white shadow-md shadow-teal-900/10 transition-all cursor-pointer disabled:opacity-75"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-orange-300" />
                      <span>
                        {generationStep === 1 && 'Aligning Bloom\'s Objectives...'}
                        {generationStep === 2 && 'Structuring Phase Timelines...'}
                        {generationStep === 3 && 'Formulating Scaffolds & Exit Ticket...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-orange-300" />
                      <span>Generate Structured Lesson Plan</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Trust Banner */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-2">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-teal-700" />
              <span>Designed with Active Classroom Educators</span>
            </div>
            <p>
              Built following Universal Design for Learning (UDL) and Bloom&apos;s Revised Taxonomy. You maintain 100% intellectual property of all materials produced.
            </p>
          </div>
        </div>

        {/* Right Output Column */}
        <div className="lg:col-span-7 space-y-4">
          {result && (
            <div className="space-y-4">
              {/* Output Actions Bar (no-print) */}
              <div className="print:hidden bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                    <Check className="w-3.5 h-3.5 text-teal-600" />
                    Ready to Teach
                  </span>
                  <span className="text-xs text-slate-500 hidden sm:inline">
                    Created: {result.createdAt}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    id="copy-lesson-btn"
                    onClick={handleCopyText}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                    title="Copy full text to clipboard"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                  </button>

                  <button
                    type="button"
                    id="download-markdown-btn"
                    onClick={handleDownloadMarkdown}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                    title="Export as Markdown document"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .md</span>
                  </button>

                  <button
                    type="button"
                    id="print-lesson-btn"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-700 text-white shadow-xs transition-colors cursor-pointer"
                    title="Print clean layout or save as PDF"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save PDF</span>
                  </button>
                </div>
              </div>

              {/* Printable Document Container */}
              <article 
                id="lesson-plan-printable"
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 text-slate-800 print:p-0 print:border-none print:shadow-none"
              >
                {/* Header Meta */}
                <div className="border-b border-slate-200 pb-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">
                      {result.subject}
                    </span>
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {result.duration}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {result.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-xs text-slate-600">
                    <div><strong className="text-slate-900 font-semibold">Grade Level:</strong> {result.gradeLevel}</div>
                    <div><strong className="text-slate-900 font-semibold">Framework:</strong> {result.sections[0]?.title.includes('Phase') ? '5E Inquiry Model' : 'Gradual Release (I-Do/We-Do/You-Do)'}</div>
                    <div><strong className="text-slate-900 font-semibold">Differentiation:</strong> {result.differentiationFocus}</div>
                  </div>

                  {result.standard && (
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                      <strong className="font-semibold text-slate-900">Curricular Standard:</strong> {result.standard}
                    </div>
                  )}
                </div>

                {/* Measurable Objectives & Essential Questions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100/90 space-y-2">
                    <h3 className="text-xs font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-teal-700" />
                      <span>Student Learning Objectives (SWBAT)</span>
                    </h3>
                    <ul className="space-y-1.5 text-xs text-teal-950">
                      {result.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="font-bold text-teal-600 mt-0.5">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-100/90 space-y-2">
                    <h3 className="text-xs font-bold text-orange-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-orange-700" />
                      <span>Essential Guiding Questions</span>
                    </h3>
                    <ul className="space-y-1.5 text-xs text-orange-950">
                      {result.essentialQuestions.map((q, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="font-bold text-orange-600 mt-0.5">•</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Materials & Resources */}
                <div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-slate-600" />
                    <span>Instructional Materials & Tech</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {result.materials.map((mat, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                        <span>{mat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phased Instructional Timeline */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-600" />
                      Instructional Sequence & Time Allocations
                    </span>
                    <span className="text-[11px] font-normal text-slate-500 lowercase">
                      Total: {result.duration}
                    </span>
                  </h3>

                  <div className="space-y-3">
                    {result.sections.map((section, idx) => (
                      <div 
                        key={idx} 
                        className="p-4 rounded-xl border border-slate-200 hover:border-teal-200 transition-colors bg-white shadow-2xs"
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h4 className="font-bold text-sm text-slate-900">
                            {section.title}
                          </h4>
                          {section.durationMinutes && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                              ~{section.durationMinutes} min
                            </span>
                          )}
                        </div>

                        <ul className="space-y-1.5 text-xs text-slate-700 mb-2">
                          {section.content.map((c, ci) => (
                            <li key={ci} className="flex items-start gap-2">
                              <span className="text-slate-400 mt-0.5">•</span>
                              <span className="leading-relaxed">{c}</span>
                            </li>
                          ))}
                        </ul>

                        {section.teacherTip && (
                          <div className="mt-2 text-xs p-2 rounded-lg bg-amber-50/80 border border-amber-200/70 text-amber-900 flex items-start gap-1.5">
                            <span className="font-bold shrink-0">💡 Teacher Move:</span>
                            <span>{section.teacherTip}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assessment & Exit Ticket */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-teal-700" />
                    <span>Formative Assessment & Exit Ticket</span>
                  </h3>
                  <p className="text-xs text-slate-600">
                    <strong className="text-slate-900">Check for Understanding:</strong> {result.assessment.formativeCheck}
                  </p>
                  
                  <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-800 block">
                      3-Minute Exit Ticket Questions:
                    </span>
                    <ol className="space-y-1.5 text-xs text-slate-700 list-decimal list-inside">
                      {result.assessment.exitTicketQuestions.map((q, i) => (
                        <li key={i} className="leading-relaxed">
                          <span className="font-medium text-slate-800">{q}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Differentiation Grid */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-orange-600" />
                    <span>Differentiation & Inclusion Matrix</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-teal-50/50 border border-teal-100">
                      <span className="font-bold text-teal-900 block mb-1">Striving / IEP Support</span>
                      <ul className="space-y-1 text-slate-700">
                        {result.differentiationDetails.scaffolding.map((s, i) => (
                          <li key={i}>• {s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100">
                      <span className="font-bold text-blue-900 block mb-1">ELL / Multilingual</span>
                      <ul className="space-y-1 text-slate-700">
                        {result.differentiationDetails.ellSupport.map((s, i) => (
                          <li key={i}>• {s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-lg bg-orange-50/50 border border-orange-100">
                      <span className="font-bold text-orange-900 block mb-1">Extension / Gifted</span>
                      <ul className="space-y-1 text-slate-700">
                        {result.differentiationDetails.extensions.map((s, i) => (
                          <li key={i}>• {s}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Homework / Home Connection */}
                <div className="text-xs p-3 rounded-lg bg-slate-100/80 border border-slate-200 text-slate-700">
                  <strong className="font-bold text-slate-900">Independent Review / Homework:</strong> {result.homeworkOrExtension}
                </div>
              </article>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
