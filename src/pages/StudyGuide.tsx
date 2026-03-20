import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, ChevronRight, Star } from 'lucide-react';
import { syllabusData } from '@/data/syllabusData';
import { studyGuideContent } from '@/data/studyGuideContent';
import { cn } from '@/lib/utils';

const StudyGuide = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [openSubject, setOpenSubject] = useState<string | null>(null);
  const [openChapter, setOpenChapter] = useState<string | null>(null);

  const exam = selectedExam ? syllabusData[selectedExam] : null;

  if (!selectedExam) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
        <div className="max-w-lg mx-auto space-y-5">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-3xl shadow-lg mb-4">📖</div>
            <h1 className="text-2xl font-bold text-gray-900">Study Guide</h1>
            <p className="text-sm text-gray-500 mt-1">Every chapter — concepts, formulas, books & tips</p>
          </div>
          <div className="space-y-3">
            {Object.values(syllabusData).map(ex => (
              <button key={ex.examId} onClick={() => setSelectedExam(ex.examId)}
                className="w-full bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-indigo-400 hover:shadow-lg transition-all text-left flex items-center gap-4 active:scale-[0.98]">
                <span className="text-3xl">{ex.emoji}</span>
                <div className="flex-1">
                  <p className="text-base font-bold text-gray-900">{ex.examName}</p>
                  <p className="text-xs text-gray-500">{ex.totalChapters} chapters · {ex.subjects.length} subjects</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
      <div className="max-w-lg mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={() => { setSelectedExam(null); setOpenSubject(null); setOpenChapter(null); }}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" /> Change Exam
          </button>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{exam!.emoji}</span>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{exam!.examName} — Study Guide</h1>
              <p className="text-xs text-gray-500">{exam!.totalChapters} chapters · Every topic covered</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {exam!.subjects.map(sub => {
            const isSubOpen = openSubject === sub.id;
            return (
              <div key={sub.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button onClick={() => { setOpenSubject(isSubOpen ? null : sub.id); setOpenChapter(null); }}
                  className="w-full p-4 text-left flex items-center gap-3 hover:bg-gray-50">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg", sub.color)}>
                    {sub.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{sub.name}</p>
                    <p className="text-[10px] text-gray-500">{sub.chapters.length} chapters</p>
                  </div>
                  {isSubOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                {isSubOpen && (
                  <div className="border-t border-gray-100 px-3 pb-3 pt-2 space-y-1.5">
                    {sub.chapters.map(ch => {
                      const isChOpen = openChapter === ch.id;
                      const content = studyGuideContent[ch.id];
                      const keyConcepts = content?.keyConcepts || [`Read NCERT Class ${ch.class || '11/12'} — ${ch.name}`, 'Solve all in-text + back exercise questions', 'Make concise notes with diagrams'];
                      const formulas = content?.formulas;
                      const books = content?.books || [`NCERT Class ${ch.class || '11/12'}`];
                      const tip = content?.tip || `Focus on NCERT. Solve previous year questions from this chapter.`;

                      return (
                        <div key={ch.id} className="border border-gray-200 rounded-xl overflow-hidden">
                          <button onClick={() => setOpenChapter(isChOpen ? null : ch.id)}
                            className="w-full px-3 py-2.5 text-left flex items-center gap-2 hover:bg-gray-50">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-xs font-bold text-gray-800">{ch.name}</p>
                                {ch.priority === 'high' && <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700">HIGH</span>}
                                {ch.expectedQuestions && <span className="text-[8px] text-gray-400">~{ch.expectedQuestions}Q</span>}
                              </div>
                              <p className="text-[10px] text-gray-400 mt-0.5">Class {ch.class}</p>
                            </div>
                            {isChOpen ? <ChevronUp className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />}
                          </button>

                          {isChOpen && (
                            <div className="border-t border-gray-100 px-3 pb-3 pt-2 space-y-2.5">
                              <div>
                                <p className="text-[10px] font-bold text-indigo-700 mb-1">🎯 Key Concepts</p>
                                <div className="space-y-1">
                                  {keyConcepts.map((c, i) => (
                                    <p key={i} className="text-[11px] text-gray-700 leading-relaxed bg-indigo-50 rounded-lg px-2.5 py-1.5">• {c}</p>
                                  ))}
                                </div>
                              </div>

                              {formulas && formulas.length > 0 && (
                                <div>
                                  <p className="text-[10px] font-bold text-purple-700 mb-1">📝 Formulas</p>
                                  <div className="bg-purple-50 rounded-lg p-2.5 space-y-0.5">
                                    {formulas.map((f, i) => (
                                      <p key={i} className="text-[11px] font-mono text-purple-800">{f}</p>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div>
                                <p className="text-[10px] font-bold text-emerald-700 mb-1">📚 Books</p>
                                {books.map((b, i) => (
                                  <p key={i} className="text-[11px] text-gray-600">• {b}</p>
                                ))}
                              </div>

                              <div className="bg-amber-50 rounded-lg p-2.5 border border-amber-200">
                                <p className="text-[11px] text-amber-700">💡 {tip}</p>
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
    </div>
  );
};

export default StudyGuide;
