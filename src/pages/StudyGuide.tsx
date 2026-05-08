import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, ChevronRight, Star, Target, Lightbulb, FlaskConical, BookMarked, TrendingUp } from 'lucide-react';
import { syllabusData } from '@/data/syllabusData';
import { studyGuideContent } from '@/data/studyGuideContent';
import { cn } from '@/lib/utils';

const subjectGradients: Record<string, string> = {
  'bg-emerald-600': 'from-emerald-500 to-teal-600',
  'bg-blue-600':    'from-blue-500 to-indigo-600',
  'bg-violet-600':  'from-violet-500 to-purple-600',
  'bg-orange-500':  'from-orange-500 to-amber-600',
  'bg-rose-600':    'from-rose-500 to-pink-600',
  'bg-indigo-600':  'from-indigo-500 to-blue-700',
  'bg-amber-500':   'from-amber-500 to-orange-500',
};

const priorityConfig = {
  high:   { label: 'High Priority', color: 'text-red-600',    bg: 'bg-red-50',    border: 'border-red-200' },
  medium: { label: 'Medium',        color: 'text-amber-600',  bg: 'bg-amber-50',  border: 'border-amber-200' },
  low:    { label: 'Low',           color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-200' },
};

const StudyGuide = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [openSubject, setOpenSubject] = useState<string | null>(null);
  const [openChapter, setOpenChapter] = useState<string | null>(null);

  const exam = selectedExam ? syllabusData[selectedExam] : null;

  // ─── Exam Selection ───
  if (!selectedExam) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 px-4 pt-4 pb-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-4">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">📖</div>
            <div>
              <h1 className="text-2xl font-black text-white">Study Guide</h1>
              <p className="text-sm text-blue-200 mt-0.5">Concepts · Formulas · Books · Tips</p>
            </div>
          </div>
        </div>

        {/* Exam Cards */}
        <div className="px-4 -mt-4 space-y-3">
          {Object.values(syllabusData).map(ex => {
            const highPriority = ex.subjects.reduce((a, s) => a + s.chapters.filter(c => c.priority === 'high').length, 0);
            return (
              <button key={ex.examId} onClick={() => setSelectedExam(ex.examId)}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all text-left flex items-center gap-4 active:scale-[0.98]">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                  {ex.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-gray-900">{ex.examName}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">{ex.totalChapters} chapters</span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500">{ex.subjects.length} subjects</span>
                    {highPriority > 0 && (
                      <>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-red-600 font-semibold">{highPriority} high priority</span>
                      </>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── Subject + Chapter View ───
  const totalChapters = exam!.subjects.reduce((a, s) => a + s.chapters.length, 0);
  const highCount = exam!.subjects.reduce((a, s) => a + s.chapters.filter(c => c.priority === 'high').length, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 px-4 pt-4 pb-6">
        <button onClick={() => { setSelectedExam(null); setOpenSubject(null); setOpenChapter(null); }}
          className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-4">
          <ArrowLeft className="w-4 h-4" /> All Exams
        </button>
        <div className="flex items-start gap-3">
          <span className="text-3xl">{exam!.emoji}</span>
          <div>
            <h1 className="text-xl font-black text-white">{exam!.examName}</h1>
            <p className="text-sm text-blue-200 mt-0.5">Study Guide</p>
          </div>
        </div>
        {/* Stats Row */}
        <div className="flex gap-3 mt-4">
          {[
            { label: 'Subjects', value: exam!.subjects.length },
            { label: 'Chapters', value: totalChapters },
            { label: 'High Priority', value: highCount, red: true },
          ].map(s => (
            <div key={s.label} className="flex-1 bg-white/15 rounded-xl px-3 py-2.5 text-center">
              <p className={cn("text-lg font-black", s.red ? 'text-red-300' : 'text-white')}>{s.value}</p>
              <p className="text-[10px] text-blue-200 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {exam!.subjects.map(sub => {
          const isSubOpen = openSubject === sub.id;
          const gradient = subjectGradients[sub.color] || 'from-gray-500 to-gray-600';
          const highChapters = sub.chapters.filter(c => c.priority === 'high').length;

          return (
            <div key={sub.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Subject Header */}
              <button onClick={() => { setOpenSubject(isSubOpen ? null : sub.id); setOpenChapter(null); }}
                className="w-full p-4 text-left flex items-center gap-3">
                <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center text-xl text-white bg-gradient-to-br shadow-sm flex-shrink-0", gradient)}>
                  {sub.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-gray-900">{sub.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500">{sub.chapters.length} chapters</span>
                    {highChapters > 0 && (
                      <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-100">
                        {highChapters} high priority
                      </span>
                    )}
                  </div>
                </div>
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-colors", isSubOpen ? 'bg-indigo-100' : 'bg-gray-100')}>
                  {isSubOpen ? <ChevronUp className="w-4 h-4 text-indigo-600" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </div>
              </button>

              {/* Chapters */}
              {isSubOpen && (
                <div className="border-t border-gray-100 divide-y divide-gray-50">
                  {sub.chapters.map(ch => {
                    const isChOpen = openChapter === ch.id;
                    const content = studyGuideContent[ch.id];
                    const keyConcepts = content?.keyConcepts || [`Read NCERT Class ${ch.class || '11/12'} — ${ch.name}`, 'Solve all back-exercise questions', 'Make revision notes'];
                    const formulas = content?.formulas;
                    const books = content?.books || [`NCERT Class ${ch.class || '11/12'}`];
                    const tip = content?.tip || `Focus on NCERT. Solve PYQ from this chapter.`;
                    const pc = ch.priority ? priorityConfig[ch.priority as keyof typeof priorityConfig] : null;

                    return (
                      <div key={ch.id}>
                        <button onClick={() => setOpenChapter(isChOpen ? null : ch.id)}
                          className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors">
                          <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-indigo-400 to-indigo-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-semibold text-gray-900 leading-snug">{ch.name}</p>
                              {pc && ch.priority === 'high' && (
                                <span className={cn("text-[9px] font-black px-1.5 py-0.5 rounded border uppercase tracking-wide", pc.color, pc.bg, pc.border)}>
                                  HIGH
                                </span>
                              )}
                              {ch.expectedQuestions && (
                                <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-full">~{ch.expectedQuestions}Q</span>
                              )}
                            </div>
                            <p className="text-[11px] text-gray-400 mt-0.5">Class {ch.class}</p>
                          </div>
                          <ChevronDown className={cn("w-4 h-4 text-gray-300 flex-shrink-0 transition-transform", isChOpen && "rotate-180")} />
                        </button>

                        {/* Chapter Content */}
                        {isChOpen && (
                          <div className="mx-3 mb-3 rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
                            {/* Key Concepts */}
                            <div className="p-3 border-b border-gray-100">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center">
                                  <Target className="w-3.5 h-3.5 text-indigo-600" />
                                </div>
                                <p className="text-xs font-bold text-indigo-700">Key Concepts</p>
                              </div>
                              <div className="space-y-1.5">
                                {keyConcepts.map((c, i) => (
                                  <div key={i} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2 border border-indigo-100">
                                    <span className="text-indigo-400 text-xs mt-0.5 font-bold">{i + 1}.</span>
                                    <p className="text-xs text-gray-700 leading-relaxed">{c}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Formulas */}
                            {formulas && formulas.length > 0 && (
                              <div className="p-3 border-b border-gray-100">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <FlaskConical className="w-3.5 h-3.5 text-purple-600" />
                                  </div>
                                  <p className="text-xs font-bold text-purple-700">Formulas & Equations</p>
                                </div>
                                <div className="bg-gray-900 rounded-xl p-3 space-y-1.5">
                                  {formulas.map((f, i) => (
                                    <p key={i} className="text-xs font-mono text-emerald-400 leading-relaxed">{f}</p>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Books */}
                            <div className="p-3 border-b border-gray-100">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center">
                                  <BookMarked className="w-3.5 h-3.5 text-emerald-600" />
                                </div>
                                <p className="text-xs font-bold text-emerald-700">Recommended Books</p>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {books.map((b, i) => (
                                  <span key={i} className="text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200 font-medium">
                                    📗 {b}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Tip */}
                            <div className="p-3 bg-amber-50">
                              <div className="flex items-start gap-2">
                                <div className="w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                                </div>
                                <p className="text-xs text-amber-800 leading-relaxed font-medium">{tip}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudyGuide;
