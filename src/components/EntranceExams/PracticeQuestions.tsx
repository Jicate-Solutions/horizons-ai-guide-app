import { useState, useEffect, useRef, useMemo } from 'react';
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Trophy, Clock, BarChart3, ArrowLeft, Zap, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PracticeQuestion } from './types';

interface Props {
  questions: PracticeQuestion[];
  examName: string;
  showSetup?: boolean; // if true, show question count selector first
}

interface AttemptRecord {
  date: string;
  score: number;
  total: number;
  pct: number;
  timeSeconds: number;
  subjectBreakdown: Record<string, { correct: number; total: number }>;
}

const HISTORY_KEY = 'vzk_quiz_history';

const getHistory = (examName: string): AttemptRecord[] => {
  try { const all = JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}'); return all[examName] || []; } catch { return []; }
};

const saveAttempt = (examName: string, record: AttemptRecord) => {
  try {
    const all = JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}');
    if (!all[examName]) all[examName] = [];
    all[examName].unshift(record);
    if (all[examName].length > 10) all[examName] = all[examName].slice(0, 10);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(all));
  } catch {}
};

// Shuffle array
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const PracticeQuestions = ({ questions, examName, showSetup = true }: Props) => {
  const [quizQuestions, setQuizQuestions] = useState<PracticeQuestion[]>([]);
  const [started, setStarted] = useState(!showSetup);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<Record<number, { selected: number; correct: boolean }>>({});
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const history = getHistory(examName);

  // Available question counts
  const countOptions = useMemo(() => {
    const opts = [];
    if (questions.length >= 5) opts.push(5);
    if (questions.length >= 10) opts.push(10);
    if (questions.length >= 20) opts.push(20);
    if (questions.length >= 30) opts.push(30);
    if (questions.length >= 50) opts.push(50);
    opts.push(questions.length); // "All"
    return [...new Set(opts)];
  }, [questions]);

  // Start quiz with N questions
  const startQuiz = (count: number) => {
    const shuffled = shuffle(questions).slice(0, count);
    setQuizQuestions(shuffled);
    setStarted(true);
    setStartTime(Date.now());
    setCurrentQ(0);
    setSelected(null);
    setShowAnswer(false);
    setScore(0);
    setAnswered(0);
    setFinished(false);
    setAnswers({});
    setElapsed(0);
  };

  // Auto-start if showSetup is false
  useEffect(() => {
    if (!showSetup && quizQuestions.length === 0) {
      setQuizQuestions(shuffle(questions));
      setStartTime(Date.now());
    }
  }, [showSetup, questions]);

  // Timer
  useEffect(() => {
    if (started && !finished) {
      timerRef.current = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [started, finished, startTime]);

  const q = quizQuestions[currentQ];
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const handleSelect = (idx: number) => {
    if (showAnswer) return;
    const correct = idx === q.answer;
    setSelected(idx);
    setShowAnswer(true);
    setAnswered(a => a + 1);
    if (correct) setScore(s => s + 1);
    setAnswers(prev => ({ ...prev, [currentQ]: { selected: idx, correct } }));
  };

  const handleNext = () => {
    if (currentQ + 1 >= quizQuestions.length) {
      clearInterval(timerRef.current);
      setFinished(true);
      const breakdown: Record<string, { correct: number; total: number }> = {};
      quizQuestions.forEach((q, i) => {
        const sub = q.subject;
        if (!breakdown[sub]) breakdown[sub] = { correct: 0, total: 0 };
        breakdown[sub].total++;
        if (answers[i]?.correct) breakdown[sub].correct++;
        if (i === currentQ && selected === q.answer) breakdown[sub].correct++;
      });
      saveAttempt(examName, {
        date: new Date().toISOString(),
        score: score + (selected === q.answer ? 1 : 0),
        total: quizQuestions.length,
        pct: Math.round(((score + (selected === q.answer ? 1 : 0)) / quizQuestions.length) * 100),
        timeSeconds: elapsed,
        subjectBreakdown: breakdown,
      });
      return;
    }
    setCurrentQ(c => c + 1);
    setSelected(null);
    setShowAnswer(false);
  };

  const restart = () => {
    setStarted(false);
    setQuizQuestions([]);
    setCurrentQ(0); setSelected(null); setShowAnswer(false);
    setScore(0); setAnswered(0); setFinished(false); setAnswers({});
  };

  // ═══ HISTORY VIEW ═══
  if (showHistory) {
    return (
      <div className="space-y-4">
        <button onClick={() => setShowHistory(false)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-4 h-4" /> Back to Quiz
        </button>
        <h3 className="text-sm font-bold text-gray-800">📊 Past Attempts — {examName}</h3>
        {history.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-8">No attempts yet.</p>
        ) : (
          <div className="space-y-2">
            {history.map((h, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">{new Date(h.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                  <span className={cn("text-sm font-bold", h.pct >= 70 ? 'text-emerald-600' : h.pct >= 40 ? 'text-amber-600' : 'text-red-600')}>{h.pct}%</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span>✅ {h.score}/{h.total}</span>
                  <span>⏱ {formatTime(h.timeSeconds)}</span>
                </div>
                {h.subjectBreakdown && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Object.entries(h.subjectBreakdown).map(([sub, data]) => (
                      <span key={sub} className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium",
                        data.correct / data.total >= 0.7 ? 'bg-emerald-50 text-emerald-700' : data.correct / data.total >= 0.4 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                      )}>{sub}: {data.correct}/{data.total}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ═══ SETUP SCREEN — Pick question count ═══
  if (!started || quizQuestions.length === 0) {
    return (
      <div className="space-y-5">
        <div className="bg-white rounded-2xl p-5 border border-gray-200 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg mb-3">📝</div>
          <h2 className="text-base font-bold text-gray-900">{examName}</h2>
          <p className="text-xs text-gray-500 mt-1">{questions.length} questions available</p>
        </div>

        <div>
          <p className="text-sm font-bold text-gray-700 mb-3">How many questions do you want?</p>
          <div className="grid grid-cols-3 gap-2">
            {countOptions.map(count => (
              <button key={count} onClick={() => startQuiz(count)}
                className="bg-white rounded-xl p-4 border-2 border-gray-100 hover:border-violet-400 hover:shadow-lg transition-all text-center active:scale-[0.97]">
                <p className="text-2xl font-black text-gray-900">{count === questions.length ? 'All' : count}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{count === questions.length ? `${count} questions` : 'questions'}</p>
              </button>
            ))}
          </div>
        </div>

        {history.length > 0 && (
          <button onClick={() => setShowHistory(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-100">
            <BarChart3 className="w-4 h-4" /> View Past Attempts ({history.length})
          </button>
        )}
      </div>
    );
  }

  // ═══ RESULTS SCREEN ═══
  if (finished) {
    const pct = Math.round((score / quizQuestions.length) * 100);
    const subjectMap: Record<string, { correct: number; total: number }> = {};
    quizQuestions.forEach((q, i) => {
      const sub = q.subject;
      if (!subjectMap[sub]) subjectMap[sub] = { correct: 0, total: 0 };
      subjectMap[sub].total++;
      if (answers[i]?.correct) subjectMap[sub].correct++;
    });

    return (
      <div className="space-y-4">
        <div className={cn("rounded-2xl p-6 text-center border-2",
          pct >= 70 ? 'bg-emerald-50 border-emerald-300' : pct >= 40 ? 'bg-amber-50 border-amber-300' : 'bg-red-50 border-red-300')}>
          <Trophy className={cn("w-10 h-10 mx-auto mb-2", pct >= 70 ? 'text-emerald-500' : pct >= 40 ? 'text-amber-500' : 'text-red-500')} />
          <p className="text-3xl font-black text-gray-900">{score}/{quizQuestions.length}</p>
          <p className={cn("text-lg font-bold", pct >= 70 ? 'text-emerald-600' : pct >= 40 ? 'text-amber-600' : 'text-red-600')}>{pct}%</p>
          <p className="text-xs text-gray-500 mt-1">⏱ {formatTime(elapsed)} · {examName}</p>
          <p className="text-sm font-medium text-gray-700 mt-2">
            {pct >= 80 ? '🎉 Excellent! Well prepared.' : pct >= 60 ? '👍 Good! Focus on weak areas.' : pct >= 40 ? '📚 Keep practicing.' : '💪 Don\'t give up. Review explanations.'}
          </p>
        </div>

        <div>
          <p className="text-sm font-bold text-gray-800 mb-2">Subject-wise</p>
          <div className="space-y-2">
            {Object.entries(subjectMap).map(([sub, data]) => {
              const sp = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
              return (
                <div key={sub} className="bg-white rounded-xl p-3 border border-gray-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-gray-700">{sub}</span>
                    <span className={cn("text-xs font-bold", sp >= 70 ? 'text-emerald-600' : sp >= 40 ? 'text-amber-600' : 'text-red-600')}>{data.correct}/{data.total} ({sp}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", sp >= 70 ? 'bg-emerald-500' : sp >= 40 ? 'bg-amber-500' : 'bg-red-500')} style={{ width: `${sp}%` }} />
                  </div>
                  {sp < 50 && <p className="text-[10px] text-red-500 mt-1">⚠️ Needs more practice</p>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={restart} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-900 text-white text-sm font-bold">
            <RotateCcw className="w-4 h-4" /> New Quiz
          </button>
          <button onClick={() => setShowHistory(true)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-700 text-sm font-bold">
            <BarChart3 className="w-4 h-4" /> History
          </button>
        </div>
      </div>
    );
  }

  // ═══ QUIZ SCREEN ═══
  if (!q) return null;

  return (
    <div className="space-y-4">
      {/* Progress + timer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-600">{currentQ + 1}/{quizQuestions.length}</span>
          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${((currentQ + 1) / quizQuestions.length) * 100}%` }} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 flex items-center gap-1"><Zap className="w-3 h-3 text-emerald-500" /> {score}/{answered}</span>
          <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {formatTime(elapsed)}</span>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl p-5 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full",
            q.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700' : q.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
          )}>{q.difficulty}</span>
          <span className="text-[10px] text-gray-400">{q.subject}</span>
        </div>
        <p className="text-sm font-medium text-gray-900 leading-relaxed">{q.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {q.options.map((opt, idx) => {
          const isSelected = selected === idx;
          const isCorrect = idx === q.answer;
          let style = 'bg-white border-gray-200 hover:border-gray-400';
          if (showAnswer) {
            if (isCorrect) style = 'bg-emerald-50 border-emerald-400';
            else if (isSelected && !isCorrect) style = 'bg-red-50 border-red-400';
            else style = 'bg-gray-50 border-gray-200 opacity-60';
          }

          return (
            <button key={idx} onClick={() => handleSelect(idx)} disabled={showAnswer}
              className={cn("w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all active:scale-[0.98]", style)}>
              <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 border-2",
                showAnswer && isCorrect ? 'bg-emerald-500 border-emerald-500 text-white' :
                showAnswer && isSelected ? 'bg-red-500 border-red-500 text-white' :
                'bg-gray-100 border-gray-300 text-gray-600'
              )}>
                {showAnswer && isCorrect ? <CheckCircle className="w-4 h-4" /> :
                 showAnswer && isSelected ? <XCircle className="w-4 h-4" /> :
                 String.fromCharCode(65 + idx)}
              </div>
              <span className="text-sm text-gray-800">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showAnswer && (
        <div className={cn("rounded-xl p-4 border-2", selected === q.answer ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200')}>
          <p className="text-xs font-bold text-gray-700 mb-1">{selected === q.answer ? '✅ Correct!' : '❌ Wrong — Answer: ' + q.options[q.answer]}</p>
          <p className="text-xs text-gray-600 leading-relaxed">{q.explanation}</p>
        </div>
      )}

      {/* Next */}
      {showAnswer && (
        <button onClick={handleNext}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gray-900 text-white text-sm font-bold active:scale-[0.98]">
          {currentQ + 1 >= quizQuestions.length ? 'See Results' : 'Next Question'} <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
