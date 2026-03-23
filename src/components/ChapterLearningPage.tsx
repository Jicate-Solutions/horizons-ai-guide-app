import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, BookOpen, Zap, Clock, CheckCircle2, ChevronDown, ChevronUp, Trophy, BarChart3, Star, RotateCcw, ChevronRight, Flame } from 'lucide-react';
import { studyGuideContent } from '@/data/studyGuideContent';
import { questionBank, QBQuestion } from '@/data/questionBank';
import { pyqQuestions } from '@/components/PreviousYearQuestions/pyqQuestionsData';
import { cn } from '@/lib/utils';

interface ChapterInfo {
  id: string; name: string; class?: string; priority?: string; expectedQuestions?: number;
  subjectName: string; examId: string;
}

// ═══ Progress stored in localStorage ═══
const PROGRESS_KEY = 'vzk_chapter_progress';
const getProgress = (): Record<string, { completed: boolean; score: number; attempts: number; lastDate: string; streak: number }> => {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'); } catch { return {}; }
};
const saveProgress = (chapterId: string, data: { completed?: boolean; score?: number; attempts?: number }) => {
  const all = getProgress();
  const existing = all[chapterId] || { completed: false, score: 0, attempts: 0, lastDate: '', streak: 0 };
  const today = new Date().toDateString();
  const wasToday = existing.lastDate === today;
  all[chapterId] = {
    completed: data.completed ?? existing.completed,
    score: Math.max(data.score ?? 0, existing.score),
    attempts: (data.attempts ?? 0) + existing.attempts,
    lastDate: today,
    streak: wasToday ? existing.streak : existing.streak + 1,
  };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
};

// Shuffle
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a;
};

interface Props {
  chapter: ChapterInfo;
  onBack: () => void;
}

const ChapterLearningPage = ({ chapter, onBack }: Props) => {
  const [activeTab, setActiveTab] = useState<'study' | 'practice' | 'pyq' | 'progress'>('study');

  // Study content
  const content = studyGuideContent[chapter.id];
  const keyConcepts = content?.keyConcepts || [`Read NCERT Class ${chapter.class} — ${chapter.name}`];
  const formulas = content?.formulas;
  const books = content?.books || [`NCERT Class ${chapter.class}`];
  const tip = content?.tip || 'Focus on NCERT. Solve PYQs.';

  // Practice questions
  const practiceQs = questionBank[chapter.id] || [];

  // PYQ — find matching questions
  const pyqList = useMemo(() => {
    const results: { year: number; exam: string; question: string; options: string[]; answer: number; topic: string }[] = [];
    const examMap: Record<string, string> = { neet: 'neet', jee: 'jee-main', clat: 'clat' };
    const searchExamId = examMap[chapter.examId] || chapter.examId;
    Object.entries(pyqQuestions).forEach(([key, qs]) => {
      if (key.startsWith(searchExamId + '::')) {
        // Check if topic matches roughly
        const topic = key.split('::')[2] || '';
        const chName = chapter.name.toLowerCase();
        const topicLow = topic.toLowerCase();
        if (chName.includes(topicLow.substring(0, 6)) || topicLow.includes(chName.substring(0, 6)) ||
            chName.includes('inheritance') && topicLow.includes('genetic') ||
            chName.includes('reproduction') && topicLow.includes('reproduc') ||
            chName.includes('electro') && topicLow.includes('electro') ||
            chName.includes('optics') && topicLow.includes('optic') ||
            chName.includes('kinetics') && topicLow.includes('kinetic') ||
            chName.includes('thermo') && topicLow.includes('thermo') ||
            chName.includes('bonding') && topicLow.includes('bond') ||
            chName.includes('organic') && topicLow.includes('organic') ||
            chName.includes('ecology') && topicLow.includes('ecol') ||
            chName.includes('cell') && topicLow.includes('cell')) {
          results.push(...qs);
        }
      }
    });
    return results;
  }, [chapter]);

  // Progress
  const progress = getProgress()[chapter.id] || { completed: false, score: 0, attempts: 0, lastDate: '', streak: 0 };

  // Quiz state
  const [quizMode, setQuizMode] = useState(false);
  const [quizQs, setQuizQs] = useState<QBQuestion[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAns, setShowAns] = useState(false);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isPyqQuiz, setIsPyqQuiz] = useState(false);

  // Timer
  useEffect(() => {
    if (quizMode && !quizDone) {
      const t = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
      return () => clearInterval(t);
    }
  }, [quizMode, quizDone, startTime]);

  const startQuiz = (count: number, pyq = false) => {
    const source = pyq ? pyqList.map(q => ({ q: q.question, o: q.options, a: q.answer, e: `${q.exam} — ${q.topic}`, d: 'medium' as const })) : practiceQs;
    setQuizQs(shuffle(source).slice(0, count));
    setQuizMode(true); setIsPyqQuiz(pyq); setQIdx(0); setSelected(null); setShowAns(false);
    setScore(0); setQuizDone(false); setStartTime(Date.now()); setElapsed(0);
  };

  const handleSelect = (idx: number) => {
    if (showAns) return;
    setSelected(idx); setShowAns(true);
    if (idx === quizQs[qIdx].a) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (qIdx + 1 >= quizQs.length) {
      setQuizDone(true);
      const finalScore = score + (selected === quizQs[qIdx].a ? 1 : 0);
      saveProgress(chapter.id, { score: Math.round((finalScore / quizQs.length) * 100), attempts: 1 });
      return;
    }
    setQIdx(i => i + 1); setSelected(null); setShowAns(false);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const toggleComplete = () => {
    const newVal = !progress.completed;
    saveProgress(chapter.id, { completed: newVal });
    window.location.reload(); // refresh to update
  };

  // ═══ QUIZ RESULTS ═══
  if (quizDone) {
    const finalScore = score + (selected === quizQs[qIdx]?.a ? 1 : 0);
    const pct = Math.round((finalScore / quizQs.length) * 100);
    return (
      <div className="space-y-4">
        <div className={cn("rounded-2xl p-6 text-center border-2",
          pct >= 70 ? 'bg-emerald-50 border-emerald-300' : pct >= 40 ? 'bg-amber-50 border-amber-300' : 'bg-red-50 border-red-300')}>
          <Trophy className={cn("w-10 h-10 mx-auto mb-2", pct >= 70 ? 'text-emerald-500' : pct >= 40 ? 'text-amber-500' : 'text-red-500')} />
          <p className="text-3xl font-black text-gray-900">{finalScore}/{quizQs.length}</p>
          <p className={cn("text-lg font-bold", pct >= 70 ? 'text-emerald-600' : pct >= 40 ? 'text-amber-600' : 'text-red-600')}>{pct}%</p>
          <p className="text-xs text-gray-500 mt-1">⏱ {formatTime(elapsed)} · {isPyqQuiz ? 'PYQ' : 'Practice'} · {chapter.name}</p>
          <p className="text-sm font-medium text-gray-700 mt-2">
            {pct >= 80 ? '🎉 Excellent!' : pct >= 60 ? '👍 Good. Review weak areas.' : pct >= 40 ? '📚 Need more practice.' : '💪 Don\'t give up. Re-read concepts.'}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setQuizMode(false)} className="flex-1 py-3 rounded-xl bg-gray-900 text-white text-sm font-bold flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Chapter
          </button>
          <button onClick={() => startQuiz(quizQs.length, isPyqQuiz)} className="flex-1 py-3 rounded-xl bg-violet-600 text-white text-sm font-bold flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  // ═══ QUIZ IN PROGRESS ═══
  if (quizMode && quizQs.length > 0) {
    const q = quizQs[qIdx];
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-600">{qIdx + 1}/{quizQs.length}</span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-emerald-600 font-bold">✅ {score}</span>
            <span className="text-xs text-gray-400"><Clock className="w-3 h-3 inline" /> {formatTime(elapsed)}</span>
          </div>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full"><div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${((qIdx + 1) / quizQs.length) * 100}%` }} /></div>
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full", q.d === 'easy' ? 'bg-emerald-100 text-emerald-700' : q.d === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700')}>{q.d}</span>
          <p className="text-sm font-medium text-gray-900 mt-2 leading-relaxed">{q.q}</p>
        </div>
        <div className="space-y-2">
          {q.o.map((opt, idx) => {
            let style = 'bg-white border-gray-200 hover:border-gray-400';
            if (showAns) {
              if (idx === q.a) style = 'bg-emerald-50 border-emerald-400';
              else if (idx === selected) style = 'bg-red-50 border-red-400';
              else style = 'bg-gray-50 border-gray-200 opacity-50';
            }
            return (
              <button key={idx} onClick={() => handleSelect(idx)} disabled={showAns}
                className={cn("w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all", style)}>
                <div className={cn("w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold border",
                  showAns && idx === q.a ? 'bg-emerald-500 border-emerald-500 text-white' :
                  showAns && idx === selected ? 'bg-red-500 border-red-500 text-white' :
                  'bg-gray-100 border-gray-300 text-gray-600')}>{String.fromCharCode(65 + idx)}</div>
                <span className="text-xs text-gray-800">{opt}</span>
              </button>
            );
          })}
        </div>
        {showAns && (
          <>
            <div className={cn("rounded-xl p-3 border", selected === q.a ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200')}>
              <p className="text-[11px] text-gray-700">{selected === q.a ? '✅' : '❌'} {q.e}</p>
            </div>
            <button onClick={handleNext} className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-bold">
              {qIdx + 1 >= quizQs.length ? 'See Results' : 'Next →'}
            </button>
          </>
        )}
      </div>
    );
  }

  // ═══ MAIN CHAPTER VIEW ═══
  const tabs = [
    { id: 'study' as const, label: '📖 Study', color: 'indigo' },
    { id: 'practice' as const, label: `📝 Practice (${practiceQs.length})`, color: 'violet' },
    { id: 'pyq' as const, label: `📜 PYQ (${pyqList.length})`, color: 'amber' },
    { id: 'progress' as const, label: '📊 Progress', color: 'emerald' },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"><ArrowLeft className="w-4 h-4 text-gray-600" /></button>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-900">{chapter.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] text-gray-500">Class {chapter.class}</span>
            {chapter.priority === 'high' && <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700">HIGH PRIORITY</span>}
            {chapter.expectedQuestions && <span className="text-[8px] text-gray-400">~{chapter.expectedQuestions}Q in exam</span>}
            {progress.completed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={cn("flex-1 py-2 rounded-lg text-[10px] font-bold transition-all text-center",
              activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500')}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ═══ STUDY TAB ═══ */}
      {activeTab === 'study' && (
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold text-indigo-700 mb-1.5">🎯 Key Concepts</p>
            <div className="space-y-1">
              {keyConcepts.map((c, i) => (
                <p key={i} className="text-[11px] text-gray-700 leading-relaxed bg-indigo-50 rounded-lg px-3 py-2">• {c}</p>
              ))}
            </div>
          </div>
          {formulas && formulas.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-purple-700 mb-1">📝 Important Formulas</p>
              <div className="bg-purple-50 rounded-lg p-3 space-y-1">
                {formulas.map((f, i) => <p key={i} className="text-[11px] font-mono text-purple-800">{f}</p>)}
              </div>
            </div>
          )}
          <div>
            <p className="text-[10px] font-bold text-emerald-700 mb-1">📚 Recommended Books</p>
            {books.map((b, i) => <p key={i} className="text-[11px] text-gray-600">• {b}</p>)}
          </div>
          <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
            <p className="text-[11px] text-amber-700">💡 {tip}</p>
          </div>
          {/* Quick action to practice */}
          {practiceQs.length > 0 && (
            <button onClick={() => setActiveTab('practice')} className="w-full py-3 rounded-xl bg-violet-600 text-white text-xs font-bold flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" /> Done reading? Practice {practiceQs.length} questions →
            </button>
          )}
        </div>
      )}

      {/* ═══ PRACTICE TAB ═══ */}
      {activeTab === 'practice' && (
        <div className="space-y-4">
          {practiceQs.length === 0 ? (
            <div className="text-center py-10"><p className="text-sm text-gray-400">Questions coming soon for this chapter</p></div>
          ) : (
            <>
              <div className="bg-violet-50 rounded-xl p-4 border border-violet-200">
                <p className="text-sm font-bold text-violet-800">{practiceQs.length} Practice Questions</p>
                <p className="text-[11px] text-violet-600 mt-1">Syllabus-based questions with explanations. Pick how many you want.</p>
              </div>
              <p className="text-xs font-bold text-gray-700">How many questions?</p>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, practiceQs.length].filter((v, i, a) => a.indexOf(v) === i && v <= practiceQs.length).map(count => (
                  <button key={count} onClick={() => startQuiz(count)}
                    className="py-3 rounded-xl bg-white border-2 border-gray-200 hover:border-violet-400 text-center active:scale-[0.97] transition-all">
                    <p className="text-lg font-black text-gray-900">{count === practiceQs.length ? 'All' : count}</p>
                    <p className="text-[9px] text-gray-500">{count === practiceQs.length ? `${count}Q` : 'questions'}</p>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ═══ PYQ TAB ═══ */}
      {activeTab === 'pyq' && (
        <div className="space-y-4">
          {pyqList.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm text-gray-400">No previous year questions mapped to this chapter yet</p>
              <p className="text-[11px] text-gray-400 mt-1">Use the Practice tab for chapter-wise questions</p>
            </div>
          ) : (
            <>
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <p className="text-sm font-bold text-amber-800">{pyqList.length} Previous Year Questions</p>
                <p className="text-[11px] text-amber-600 mt-1">Real exam questions from {[...new Set(pyqList.map(q => q.exam.split(' ')[0]))].join(', ')} ({[...new Set(pyqList.map(q => q.year))].sort().join(', ')})</p>
              </div>
              <p className="text-xs font-bold text-gray-700">Practice PYQ</p>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, pyqList.length].filter((v, i, a) => a.indexOf(v) === i && v <= pyqList.length).map(count => (
                  <button key={count} onClick={() => startQuiz(count, true)}
                    className="py-3 rounded-xl bg-white border-2 border-gray-200 hover:border-amber-400 text-center active:scale-[0.97] transition-all">
                    <p className="text-lg font-black text-gray-900">{count === pyqList.length ? 'All' : count}</p>
                    <p className="text-[9px] text-gray-500">{count === pyqList.length ? `${count} PYQ` : 'PYQ'}</p>
                  </button>
                ))}
              </div>
              {/* Show questions list */}
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">Questions by year:</p>
                {pyqList.slice(0, 10).map((q, i) => (
                  <div key={i} className="bg-white rounded-lg p-3 border border-gray-200 mb-1.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">{q.exam}</span>
                    </div>
                    <p className="text-[11px] text-gray-800">{q.question}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ═══ PROGRESS TAB ═══ */}
      {activeTab === 'progress' && (
        <div className="space-y-4">
          {/* Status card */}
          <div className={cn("rounded-2xl p-5 border-2 text-center",
            progress.completed ? 'bg-emerald-50 border-emerald-300' : 'bg-gray-50 border-gray-200')}>
            {progress.completed ? <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" /> : <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-2" />}
            <p className="text-sm font-bold text-gray-900">{progress.completed ? 'Chapter Completed ✅' : 'Not yet completed'}</p>
            <button onClick={toggleComplete}
              className={cn("mt-3 px-6 py-2 rounded-xl text-xs font-bold transition-all",
                progress.completed ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' : 'bg-emerald-600 text-white hover:bg-emerald-700')}>
              {progress.completed ? 'Mark as Incomplete' : 'Mark as Completed ✅'}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white rounded-xl p-3 border border-gray-200 text-center">
              <p className="text-lg font-black text-violet-600">{progress.attempts}</p>
              <p className="text-[9px] text-gray-500">Tests Taken</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-200 text-center">
              <p className="text-lg font-black text-emerald-600">{progress.score}%</p>
              <p className="text-[9px] text-gray-500">Best Score</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-200 text-center">
              <p className="text-lg font-black text-amber-600">{progress.streak}</p>
              <p className="text-[9px] text-gray-500">Day Streak</p>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <p className="text-[10px] font-bold text-blue-700 mb-1">💡 What to do next</p>
            {progress.score === 0 && <p className="text-xs text-blue-600">Start with the Study tab → Read concepts → Take a 5-question practice test</p>}
            {progress.score > 0 && progress.score < 60 && <p className="text-xs text-blue-600">Your score is below 60%. Re-read the concepts and try again with more questions.</p>}
            {progress.score >= 60 && progress.score < 80 && <p className="text-xs text-blue-600">Good progress! Try PYQ to test with real exam questions. Aim for 80%+.</p>}
            {progress.score >= 80 && <p className="text-xs text-blue-600">Excellent! This chapter is strong. Move to the next chapter or revise weekly.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterLearningPage;
