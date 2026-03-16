import { useState } from 'react';
import { BookOpen, ChevronRight, ArrowLeft, Trophy, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { topicWiseData, getExamTotalQuestions, getTotalPracticeQuestions, ExamPracticeData, Subject, Topic } from './topicWiseQuestions';
import { PracticeQuestion } from './types';

// ═══ QUIZ COMPONENT ═══
const Quiz = ({ questions, topicName, onBack }: { questions: PracticeQuestion[]; topicName: string; onBack: () => void }) => {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAns, setShowAns] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[idx];

  const pick = (i: number) => {
    if (showAns) return;
    setSelected(i);
    setShowAns(true);
    if (i === q.answer) setScore(s => s + 1);
  };

  const next = () => {
    if (idx + 1 >= questions.length) { setDone(true); return; }
    setIdx(i => i + 1);
    setSelected(null);
    setShowAns(false);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="p-6 text-center">
        <Trophy className="w-12 h-12 mx-auto mb-3 text-amber-500" />
        <p className="text-lg font-bold text-gray-900">Quiz Complete!</p>
        <p className="text-sm text-gray-500">{topicName}</p>
        <p className="text-4xl font-black mt-3" style={{ color: pct >= 70 ? '#059669' : pct >= 40 ? '#d97706' : '#dc2626' }}>{score}/{questions.length}</p>
        <p className="text-sm text-gray-500 mt-1">{pct}% correct</p>
        <p className="text-sm text-gray-600 mt-3">{pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good effort! Review weak topics.' : pct >= 40 ? 'Keep practicing.' : 'Start with basics and try again.'}</p>
        <div className="flex gap-2 mt-4">
          <button onClick={() => { setIdx(0); setSelected(null); setShowAns(false); setScore(0); setDone(false); }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-600 text-white text-sm font-bold">
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
          <button onClick={onBack}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-700">
            Back to Topics
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-violet-600">{topicName}</span>
        <span className="text-xs font-bold text-gray-500">Q{idx + 1}/{questions.length}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full mb-4">
        <div className="h-full bg-violet-500 rounded-full transition-all" style={{ width: `${((idx + 1) / questions.length) * 100}%` }} />
      </div>

      {/* Difficulty */}
      <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full mb-3 inline-block",
        q.difficulty === 'easy' ? 'bg-green-100 text-green-700' : q.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
      )}>{q.difficulty}</span>

      {/* Question */}
      <p className="text-sm font-bold text-gray-900 leading-relaxed mb-4">{q.question}</p>

      {/* Options */}
      <div className="space-y-2">
        {q.options.map((opt, i) => (
          <button key={i} onClick={() => pick(i)} disabled={showAns}
            className={cn("w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left text-sm transition-all",
              showAns && i === q.answer ? "border-emerald-500 bg-emerald-50" :
              showAns && i === selected ? "border-red-500 bg-red-50" :
              "border-gray-200 hover:border-gray-300 active:scale-[0.98]"
            )}>
            <span className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
              showAns && i === q.answer ? "bg-emerald-500 text-white" :
              showAns && i === selected ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600"
            )}>
              {showAns && i === q.answer ? <CheckCircle className="w-4 h-4" /> :
               showAns && i === selected ? <XCircle className="w-4 h-4" /> : String.fromCharCode(65 + i)}
            </span>
            <span className="font-medium">{opt}</span>
          </button>
        ))}
      </div>

      {/* Explanation */}
      {showAns && (
        <div className={cn("mt-4 p-3 rounded-xl border text-sm",
          selected === q.answer ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-amber-50 border-amber-200 text-amber-800"
        )}>
          <p className="font-bold mb-1">{selected === q.answer ? '✅ Correct!' : '❌ Wrong!'}</p>
          <p>{q.explanation}</p>
        </div>
      )}

      {showAns && (
        <button onClick={next}
          className="w-full mt-4 py-3 rounded-xl bg-violet-600 text-white text-sm font-bold flex items-center justify-center gap-2">
          {idx + 1 >= questions.length ? 'See Results' : 'Next Question'} <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

// ═══ MAIN COMPONENT ═══
export const EntranceExamPractice = () => {
  const [activeExam, setActiveExam] = useState<ExamPracticeData | null>(null);
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);

  const totalQs = getTotalPracticeQuestions();

  // LEVEL 4: Taking Quiz
  if (activeTopic) {
    return (
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-between">
          <button onClick={() => setActiveTopic(null)} className="flex items-center gap-1 text-white text-sm font-bold">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-xs font-bold text-white/80">{activeExam?.name} → {activeSubject?.name}</span>
        </div>
        <Quiz questions={activeTopic.questions} topicName={activeTopic.name} onBack={() => setActiveTopic(null)} />
      </div>
    );
  }

  // LEVEL 3: Topics in a Subject
  if (activeSubject && activeExam) {
    return (
      <div className="space-y-3">
        <button onClick={() => setActiveSubject(null)} className="flex items-center gap-2 text-sm font-bold text-violet-600">
          <ArrowLeft className="w-4 h-4" /> {activeExam.name}
        </button>
        <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
          <div className={cn("px-4 py-4",
            activeSubject.color === 'blue' ? 'bg-gradient-to-r from-blue-600 to-blue-700' :
            activeSubject.color === 'green' ? 'bg-gradient-to-r from-emerald-600 to-green-700' :
            activeSubject.color === 'orange' ? 'bg-gradient-to-r from-orange-600 to-amber-700' :
            'bg-gradient-to-r from-purple-600 to-violet-700'
          )}>
            <p className="text-lg font-bold text-white">{activeSubject.icon} {activeSubject.name}</p>
            <p className="text-xs text-white/70 mt-1">{activeSubject.topics.length} topics · Select one to start practicing</p>
          </div>
          <div className="divide-y divide-gray-100">
            {activeSubject.topics.map(topic => (
              <button key={topic.id} onClick={() => setActiveTopic(topic)}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-all text-left active:scale-[0.99]">
                <span className="text-xl flex-shrink-0">{topic.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">{topic.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{topic.questions.length} questions</p>
                </div>
                <span className="text-xs font-bold bg-violet-100 text-violet-700 px-2.5 py-1 rounded-lg">{topic.questions.length} Qs</span>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // LEVEL 2: Subjects in an Exam
  if (activeExam) {
    return (
      <div className="space-y-3">
        <button onClick={() => setActiveExam(null)} className="flex items-center gap-2 text-sm font-bold text-violet-600">
          <ArrowLeft className="w-4 h-4" /> All Exams
        </button>
        <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
          <div className="px-4 py-4 bg-gradient-to-r from-violet-600 to-purple-600">
            <p className="text-lg font-bold text-white">{activeExam.icon} {activeExam.name}</p>
            <p className="text-xs text-white/70 mt-1">{activeExam.subjects.length} subjects · {getExamTotalQuestions(activeExam.id)} questions</p>
          </div>
          <div className="p-3 space-y-2">
            {activeExam.subjects.map(subject => {
              const topicCount = subject.topics.length;
              const qCount = subject.topics.reduce((s, t) => s + t.questions.length, 0);
              return (
                <button key={subject.id} onClick={() => setActiveSubject(subject)}
                  className={cn("w-full flex items-center gap-3 p-4 rounded-xl border-2 hover:shadow-md transition-all text-left active:scale-[0.99]",
                    subject.color === 'blue' ? 'border-blue-200 bg-blue-50 hover:border-blue-400' :
                    subject.color === 'green' ? 'border-emerald-200 bg-emerald-50 hover:border-emerald-400' :
                    subject.color === 'orange' ? 'border-orange-200 bg-orange-50 hover:border-orange-400' :
                    'border-purple-200 bg-purple-50 hover:border-purple-400'
                  )}>
                  <span className="text-2xl flex-shrink-0">{subject.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-gray-900">{subject.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{topicCount} topics · {qCount} questions</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // LEVEL 1: Exam List
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Topic-wise Practice</h2>
            <p className="text-xs text-violet-200">பாடம் வாரியாக பயிற்சி</p>
          </div>
        </div>
        <p className="text-sm text-violet-200 mt-1">Select an exam → pick a subject → choose a topic → answer questions</p>
        <div className="flex gap-2 mt-3">
          <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-lg">{totalQs} Questions</span>
          <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-lg">{topicWiseData.length} Exams</span>
          <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-lg">Topic-wise</span>
        </div>
      </div>

      <div className="space-y-2">
        {topicWiseData.map(exam => {
          const qCount = getExamTotalQuestions(exam.id);
          const subjectNames = exam.subjects.map(s => s.name).join(', ');
          return (
            <button key={exam.id} onClick={() => setActiveExam(exam)}
              className="w-full flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-violet-300 hover:shadow-md transition-all active:scale-[0.99] text-left">
              <span className="text-2xl flex-shrink-0">{exam.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900">{exam.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{subjectNames}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-xs font-bold bg-violet-100 text-violet-700 px-2.5 py-1 rounded-lg">{qCount} Qs</span>
                <span className="text-xs text-gray-400">{exam.subjects.length} subjects</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
