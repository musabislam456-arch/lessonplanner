'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  Eye, 
  EyeOff, 
  Lightbulb, 
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { generateWorksheet, WorksheetGeneratorParams } from '@/lib/generator-templates';
import { GeneratedWorksheet } from '@/lib/types';

export default function WorksheetGenerator() {
  const [params, setParams] = useState<WorksheetGeneratorParams>({
    topic: 'Photosynthesis and Plant Cells',
    subject: 'Science & Biology',
    gradeLevel: 'Middle School (6th - 8th)',
    itemCount: 6,
    includeWordBank: true,
    rawText: ''
  });

  const [useCustomText, setUseCustomText] = useState(false);
  const [customInput, setCustomInput] = useState(
    'The process by which plants make food using sunlight is [photosynthesis]. Inside plant cells, the green organelle called the [chloroplast] traps sunlight energy. Leaves take in [carbon dioxide] through microscopic pores. As a result, plants produce [glucose] for energy and release [oxygen] into the atmosphere.'
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const [worksheet, setWorksheet] = useState<GeneratedWorksheet>(() => 
    generateWorksheet({
      topic: 'Photosynthesis and Plant Cells',
      subject: 'Science & Biology',
      gradeLevel: 'Middle School (6th - 8th)',
      itemCount: 6,
      includeWordBank: true
    })
  );

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const generated = generateWorksheet({
        ...params,
        rawText: useCustomText ? customInput : undefined
      });
      setWorksheet(generated);
      setIsGenerating(false);
    }, 500);
  };

  const handleCopy = () => {
    if (!worksheet) return;
    const studentText = `
${worksheet.title.toUpperCase()}
Name: _______________________   Date: ____________   Period: ______

${worksheet.instructions}

${worksheet.includeWordBank ? `WORD BANK:\n[ ${worksheet.wordBank.join('  •  ')} ]\n` : ''}

${worksheet.items.map((it) => `${it.id}. ${it.sentenceBefore} ____________________ ${it.sentenceAfter}`).join('\n\n')}

--------------------------------------------------
TEACHER ANSWER KEY:
${worksheet.items.map((it) => `${it.id}. ${it.blankAnswer}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(studentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Form Column */}
        <div className="lg:col-span-5 space-y-6 print:hidden">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Worksheet Builder</h2>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Create instant fill-in-the-blank practice sheets. Use pre-built curriculum topics or paste custom text with bracketed answers.
            </p>

            {/* Mode Switcher */}
            <div className="flex rounded-xl bg-slate-100 p-1 mb-5">
              <button
                type="button"
                onClick={() => setUseCustomText(false)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  !useCustomText 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Curriculum Presets
              </button>
              <button
                type="button"
                onClick={() => setUseCustomText(true)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  useCustomText 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Custom Passage [with brackets]
              </button>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              {!useCustomText ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="ws-topic">
                      Topic or Concept
                    </label>
                    <input
                      type="text"
                      id="ws-topic"
                      required
                      value={params.topic}
                      onChange={(e) => setParams({ ...params, topic: e.target.value })}
                      placeholder="e.g. Rhetorical Appeals (Ethos, Pathos, Logos) or Cellular Respiration"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="ws-grade">
                        Grade Level
                      </label>
                      <select
                        id="ws-grade"
                        value={params.gradeLevel}
                        onChange={(e) => setParams({ ...params, gradeLevel: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="Elementary (3rd - 5th)">Elementary (3rd - 5th)</option>
                        <option value="Middle School (6th - 8th)">Middle School (6th - 8th)</option>
                        <option value="High School (9th - 12th)">High School (9th - 12th)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="ws-count">
                        Item Count
                      </label>
                      <select
                        id="ws-count"
                        value={params.itemCount}
                        onChange={(e) => setParams({ ...params, itemCount: Number(e.target.value) })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value={4}>4 Questions</option>
                        <option value={6}>6 Questions</option>
                        <option value={8}>8 Questions</option>
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider" htmlFor="custom-passage">
                      Custom Text Passage
                    </label>
                    <span className="text-[11px] text-slate-500">
                      Put [brackets] around answers
                    </span>
                  </div>
                  <textarea
                    id="custom-passage"
                    rows={6}
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    className="w-full p-3 text-xs leading-relaxed font-mono rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-slate-50/50"
                  />
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Tip: Type &ldquo;[word]&rdquo; and the generator will replace it with a blank and populate the Word Bank.</span>
                  </p>
                </div>
              )}

              {/* Word Bank Checkbox */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Include Word Bank Box</span>
                  <span className="text-[11px] text-slate-500">Provide an alphabetized word scramble list for students</span>
                </div>
                <input
                  type="checkbox"
                  id="toggle-wordbank"
                  checked={params.includeWordBank}
                  onChange={(e) => setParams({ ...params, includeWordBank: e.target.checked })}
                  className="w-4 h-4 text-orange-600 rounded-sm focus:ring-orange-500 border-slate-300"
                />
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                id="generate-worksheet-btn"
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-900/10 transition-all cursor-pointer disabled:opacity-75"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Formatting Cloze Blanks...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-orange-200" />
                    <span>Generate Student Worksheet</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-200 text-xs text-orange-900 space-y-1">
            <span className="font-bold block">Classroom Photocopy Friendly:</span>
            <p>
              Output is rendered with high-contrast typography and standard 0.5-inch printer margins for clean reproduction on school copiers.
            </p>
          </div>
        </div>

        {/* Worksheet Preview Column */}
        <div className="lg:col-span-7 space-y-4">
          {/* Top Actions */}
          <div className="print:hidden bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="toggle-answerkey-btn"
                onClick={() => setShowAnswerKey(!showAnswerKey)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  showAnswerKey 
                    ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {showAnswerKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showAnswerKey ? 'Hide Answer Key' : 'Show Answer Key'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                id="copy-worksheet-btn"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                type="button"
                id="print-worksheet-btn"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-700 text-white shadow-xs transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Student Copy</span>
              </button>
            </div>
          </div>

          {/* Printable Student Handout */}
          <div 
            id="worksheet-printable"
            className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-slate-900 space-y-6 print:p-0 print:border-none print:shadow-none"
          >
            {/* Student Header Bar */}
            <div className="border-b-2 border-slate-900 pb-4 text-xs font-medium">
              <div className="flex justify-between items-end gap-4 mb-3">
                <div className="flex-1">
                  <span className="font-bold">Student Name:</span>
                  <span className="inline-block w-3/4 border-b border-slate-400 ml-2"></span>
                </div>
                <div className="w-40">
                  <span className="font-bold">Date:</span>
                  <span className="inline-block w-24 border-b border-slate-400 ml-2"></span>
                </div>
                <div className="w-28">
                  <span className="font-bold">Period:</span>
                  <span className="inline-block w-12 border-b border-slate-400 ml-2"></span>
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-500">
                Score: _______ / {worksheet.items.length * 5} pts
              </div>
            </div>

            {/* Title & Instructions */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {worksheet.title}
              </h1>
              <p className="text-xs text-slate-600 mt-2 italic">
                {worksheet.instructions}
              </p>
            </div>

            {/* Word Bank Box */}
            {worksheet.includeWordBank && (
              <div className="p-4 rounded-xl border-2 border-dashed border-slate-400/80 bg-slate-50/70">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2 text-center">
                  — Word Bank Box —
                </span>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-800">
                  {worksheet.wordBank.map((word, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white border border-slate-200 shadow-2xs">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Question Sentences */}
            <div className="space-y-6 pt-2">
              {worksheet.items.map((item) => (
                <div key={item.id} className="text-sm text-slate-900 leading-loose flex items-baseline gap-2">
                  <span className="font-bold text-slate-800 shrink-0">{item.id}.</span>
                  <div className="leading-loose flex-1">
                    {item.sentenceBefore}{' '}
                    <span className="inline-block min-w-40 border-b-2 border-slate-800 text-center font-bold text-teal-800 px-3">
                      {showAnswerKey ? item.blankAnswer : ''}
                    </span>{' '}
                    {item.sentenceAfter}
                  </div>
                </div>
              ))}
            </div>

            {/* Teacher Answer Key Box */}
            {showAnswerKey && (
              <div className="no-print mt-8 p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 space-y-2">
                <span className="font-bold text-xs uppercase tracking-wider text-amber-900 block flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-amber-700" />
                  Teacher Quick Grading Key
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {worksheet.items.map((item) => (
                    <div key={item.id} className="p-1.5 rounded bg-white border border-amber-200">
                      <strong className="text-amber-800">#{item.id}:</strong> {item.blankAnswer}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="pt-8 border-t border-slate-200 text-[10px] text-slate-400 flex justify-between">
              <span>{worksheet.subject} • {worksheet.gradeLevel}</span>
              <span>LessonPlanner AI Classroom Sheet</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
