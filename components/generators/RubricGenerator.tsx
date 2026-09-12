'use client';

import React, { useState } from 'react';
import { 
  CheckSquare, 
  Sparkles, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  Plus, 
  Trash2, 
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import { generateRubric, RubricGeneratorParams } from '@/lib/generator-templates';
import { GeneratedRubric, RubricCriterion } from '@/lib/types';

export default function RubricGenerator() {
  const [params, setParams] = useState<RubricGeneratorParams>({
    title: 'Persuasive Research Essay',
    gradeLevel: 'High School (9th - 10th Grade)',
    subject: 'English Language Arts',
    rubricType: 'analytic',
    scaleType: '4-point'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const [rubric, setRubric] = useState<GeneratedRubric>(() => 
    generateRubric({
      title: 'Persuasive Research Essay',
      gradeLevel: 'High School (9th - 10th Grade)',
      subject: 'English Language Arts',
      rubricType: 'analytic',
      scaleType: '4-point'
    })
  );

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const generated = generateRubric(params);
      setRubric(generated);
      setIsGenerating(false);
    }, 500);
  };

  const handleAddCriterion = () => {
    const newCrit: RubricCriterion = {
      id: `crit-${Date.now()}`,
      name: 'New Custom Performance Criteria',
      weight: '15%',
      levels: {
        exemplary: 'Exceptional evidence of mastery exceeds standard with nuanced depth.',
        proficient: 'Consistently meets target grade-level expectations with accuracy.',
        developing: 'Demonstrates inconsistent application; minor errors present.',
        beginning: 'Limited evidence of understanding; significant coaching required.'
      }
    };
    setRubric({
      ...rubric,
      criteria: [...rubric.criteria, newCrit]
    });
  };

  const handleDeleteCriterion = (id: string) => {
    if (rubric.criteria.length <= 1) return;
    setRubric({
      ...rubric,
      criteria: rubric.criteria.filter(c => c.id !== id)
    });
  };

  const handleCopy = () => {
    if (!rubric) return;
    let text = `RUBRIC: ${rubric.title.toUpperCase()}\nGrade: ${rubric.gradeLevel} | Subject: ${rubric.subject}\n\n`;
    rubric.criteria.forEach((c) => {
      text += `--- ${c.name} (${c.weight}) ---\n`;
      text += `[4] Exemplary: ${c.levels.exemplary}\n`;
      text += `[3] Proficient: ${c.levels.proficient}\n`;
      text += `[2] Developing: ${c.levels.developing}\n`;
      text += `[1] Beginning: ${c.levels.beginning}\n\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Controls (no-print) */}
        <div className="lg:col-span-4 space-y-6 print:hidden">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckSquare className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Rubric Builder</h2>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Generate 4-tier observable performance descriptors that remove subjective grading bias.
            </p>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="rubric-title">
                  Task / Project Title
                </label>
                <input
                  type="text"
                  id="rubric-title"
                  required
                  value={params.title}
                  onChange={(e) => setParams({ ...params, title: e.target.value })}
                  placeholder="e.g. Science Fair Lab Report or Historical Debate"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="rubric-grade">
                  Grade Band
                </label>
                <select
                  id="rubric-grade"
                  value={params.gradeLevel}
                  onChange={(e) => setParams({ ...params, gradeLevel: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                >
                  <option value="Elementary (3rd - 5th Grade)">Elementary (3rd - 5th Grade)</option>
                  <option value="Middle School (6th - 8th Grade)">Middle School (6th - 8th Grade)</option>
                  <option value="High School (9th - 10th Grade)">High School (9th - 10th Grade)</option>
                  <option value="High School (11th - 12th Grade)">High School (11th - 12th Grade)</option>
                  <option value="Collegiate / Adult">Collegiate / Adult</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="rubric-subject">
                  Subject Area
                </label>
                <select
                  id="rubric-subject"
                  value={params.subject}
                  onChange={(e) => setParams({ ...params, subject: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                >
                  <option value="English Language Arts">English Language Arts</option>
                  <option value="Science & STEM">Science & STEM</option>
                  <option value="Social Studies & History">Social Studies & History</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Arts & Design">Arts & Design</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="generate-rubric-btn"
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-900/10 transition-all cursor-pointer disabled:opacity-75"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Formulating Descriptors...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-200" />
                      <span>Generate 4-Level Rubric</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Quick Tip */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-900 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-emerald-700" />
              <span>Observable Language Standard</span>
            </div>
            <p>
              Each cell avoids vague qualifiers (like &ldquo;good&rdquo; or &ldquo;poor&rdquo;) in favor of concrete criteria students can verify themselves before submission.
            </p>
          </div>
        </div>

        {/* Right Rubric Preview Column */}
        <div className="lg:col-span-8 space-y-4">
          {/* Action Bar */}
          <div className="print:hidden bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="add-criterion-btn"
                onClick={handleAddCriterion}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Criterion Row</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                id="copy-rubric-btn"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                type="button"
                id="print-rubric-btn"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>

          {/* Printable Rubric Table Document */}
          <div 
            id="rubric-printable"
            className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm text-slate-900 space-y-6 print:p-0 print:border-none print:shadow-none"
          >
            {/* Rubric Header */}
            <div className="border-b-2 border-slate-900 pb-4">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Grading Matrix
                  </span>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                    {rubric.title}
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    {rubric.gradeLevel} • {rubric.subject} • 100 Points Total
                  </p>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div><strong>Student Name:</strong> _________________________</div>
                  <div><strong>Final Score:</strong> _______ / 100</div>
                </div>
              </div>
            </div>

            {/* Rubric Grid Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs border border-slate-300">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 border-b border-slate-300">
                    <th className="p-3 font-bold border-r border-slate-300 w-1/5">
                      Criteria & Weight
                    </th>
                    <th className="p-3 font-bold border-r border-slate-300 w-1/5 bg-emerald-50 text-emerald-950">
                      {rubric.scaleNames.level4}
                    </th>
                    <th className="p-3 font-bold border-r border-slate-300 w-1/5 bg-teal-50 text-teal-950">
                      {rubric.scaleNames.level3}
                    </th>
                    <th className="p-3 font-bold border-r border-slate-300 w-1/5 bg-amber-50 text-amber-950">
                      {rubric.scaleNames.level2}
                    </th>
                    <th className="p-3 font-bold w-1/5 bg-rose-50 text-rose-950">
                      {rubric.scaleNames.level1}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {rubric.criteria.map((crit) => (
                    <tr key={crit.id} className="hover:bg-slate-50/50">
                      <td className="p-3 align-top border-r border-slate-300 bg-slate-50/30">
                        <div className="font-bold text-slate-900 text-sm mb-1">
                          {crit.name}
                        </div>
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-200 text-slate-700">
                          Weight: {crit.weight}
                        </span>
                        <div className="no-print mt-2">
                          <button
                            type="button"
                            onClick={() => handleDeleteCriterion(crit.id)}
                            className="text-[10px] text-rose-600 hover:text-rose-800 flex items-center gap-1 font-medium"
                          >
                            <Trash2 className="w-3 h-3" /> Remove
                          </button>
                        </div>
                      </td>
                      <td className="p-3 align-top border-r border-slate-300 text-slate-700 leading-relaxed">
                        {crit.levels.exemplary}
                      </td>
                      <td className="p-3 align-top border-r border-slate-300 text-slate-700 leading-relaxed">
                        {crit.levels.proficient}
                      </td>
                      <td className="p-3 align-top border-r border-slate-300 text-slate-700 leading-relaxed">
                        {crit.levels.developing}
                      </td>
                      <td className="p-3 align-top text-slate-700 leading-relaxed">
                        {crit.levels.beginning}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Teacher Feedback Notes Section */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Teacher Specific Praise & Next Steps:
              </span>
              <div className="min-h-16 p-3 rounded-lg border border-slate-300 bg-slate-50/30 text-xs text-slate-400 italic">
                (Space for handwritten or digital qualitative feedback)
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
