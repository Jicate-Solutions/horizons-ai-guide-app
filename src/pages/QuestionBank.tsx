import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, ChevronRight, Search, Zap } from 'lucide-react';
import { syllabusData } from '@/data/syllabusData';
import { questionBank, QBQuestion } from '@/data/questionBank';
import { PracticeQuestions } from '@/components/EntranceExams/PracticeQuestions';
import { cn } from '@/lib/utils';

const QuestionBankPage = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [openSubject, setOpenSubject] = useState<string | null>(null);
  const [activeChapter, setActiveChapter] = useState<{ id: string; name: string } | null>(null);
  const [searchQ, setSearchQ] = useState('');

  const exam = selectedExam ? syllabusData[selectedExam] : null;

  // Convert QB questions to PracticeQuestion format for the quiz component
  const chapterQuestions = useMemo(() => {
    if (!activeChapter) return [];
    const raw = questionBank[activeChapter.id] || [];
    return raw.map((q, i) => ({
      id: `${activeChapter.id}-${i}`,
      question: q.q,
      options: q.o,
      answer: q.a,
      explanation: q.e,
      difficulty: q.d,
      subject: activeChapter.name,
      topic: activeChapter.name,
    }));
  }, [activeChapter]);

  // Quiz mode
  if (activeChapter && chapterQuestions.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
        <div className="max-w-lg mx-auto space-y-4">
          <button onClick={() => setActiveChapter(null)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" /> Back to Chapters
          </button>
          <PracticeQuestions
            questions={chapterQuestions}
            examName={`${activeChapter.name}`}
            showSetup={true}
          />
        </div>
      </div>
    );
  }

  // Exam selection
  if (!selectedExam) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
        <div className="max-w-lg mx-auto space-y-5">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg mb-4">📝</div>
            <h1 className="text-2xl font-bold text-gray-900">Question Bank</h1>
            <p className="text-sm text-gray-500 mt-1">Chapter-wise practice — pick topic, set count, start quiz</p>
          </div>
          <div className="space-y-3">
            {Object.values(syllabusData).map(ex => {
              // Count total questions available
              let totalQ = 0;
              let chaptersWithQ = 0;
              ex.subjects.forEach(s => s.chapters.forEach(ch => {
                const count = (questionBank[ch.id] || []).length;
                totalQ += count;
                if (count > 0) chaptersWithQ++;
              }));
              return (
                <button key={ex.examId} onClick={() => setSelectedExam(ex.examId)}
                  className="w-full bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-violet-400 hover:shadow-lg transition-all text-left flex items-center gap-4 active:scale-[0.98]">
                  <span className="text-3xl">{ex.emoji}</span>
                  <div className="flex-1">
                    <p className="text-base font-bold text-gray-900">{ex.examName}</p>
                    <p className="text-xs text-gray-500">{totalQ} questions · {chaptersWithQ} chapters ready</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Chapter browser
  const filteredSubjects = exam!.subjects.map(sub => {
    if (!searchQ) return sub;
    const filtered = sub.chapters.filter(ch => ch.name.toLowerCase().includes(searchQ.toLowerCase()));
    return { ...sub, chapters: filtered };
  }).filter(sub => sub.chapters.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
      <div className="max-w-lg mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={() => { setSelectedExam(null); setOpenSubject(null); setSearchQ(''); }}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" /> Change Exam
          </button>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{exam!.emoji}</span>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{exam!.examName} — Question Bank</h1>
              <p className="text-xs text-gray-500">Tap chapter → Pick count → Start quiz</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search chapters..." value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-violet-400 focus:ring-0 outline-none" />
        </div>

        {/* Subjects + Chapters */}
        <div className="space-y-3">
          {filteredSubjects.map(sub => {
            const isOpen = openSubject === sub.id;
            const subTotal = sub.chapters.reduce((sum, ch) => sum + (questionBank[ch.id]?.length || 0), 0);
            return (
              <div key={sub.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button onClick={() => setOpenSubject(isOpen ? null : sub.id)}
                  className="w-full p-4 text-left flex items-center gap-3 hover:bg-gray-50">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg", sub.color)}>
                    {sub.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{sub.name}</p>
                    <p className="text-[10px] text-gray-500">{sub.chapters.length} chapters · {subTotal}Q ready</p>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 px-3 pb-3 pt-2 space-y-1.5">
                    {sub.chapters.map(ch => {
                      const qCount = (questionBank[ch.id] || []).length;
                      return (
                        <button key={ch.id}
                          onClick={() => qCount > 0 ? setActiveChapter({ id: ch.id, name: ch.name }) : null}
                          disabled={qCount === 0}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all",
                            qCount > 0 ? "border border-gray-200 hover:border-violet-400 hover:bg-violet-50 active:scale-[0.98]" : "border border-gray-100 opacity-50"
                          )}>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-800 leading-tight">{ch.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-gray-400">Class {ch.class}</span>
                              {ch.priority === 'high' && <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700">HIGH</span>}
                            </div>
                          </div>
                          {qCount > 0 ? (
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <span className="text-xs font-bold text-violet-600">{qCount}Q</span>
                              <Zap className="w-3.5 h-3.5 text-violet-500" />
                            </div>
                          ) : (
                            <span className="text-[10px] text-gray-400 flex-shrink-0">Coming soon</span>
                          )}
                        </button>
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

export default QuestionBankPage;
