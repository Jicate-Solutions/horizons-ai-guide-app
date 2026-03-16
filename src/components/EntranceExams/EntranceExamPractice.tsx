import { useState } from 'react';
import { BookOpen, ChevronRight, ArrowLeft, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { examPracticeQuestions } from './practiceQuestionsData';
import { PracticeQuestions } from './PracticeQuestions';
import { PracticeQuestion } from './types';

interface ExamOption {
  id: string;
  name: string;
  icon: string;
  subjects: string;
  count: number;
  questions: PracticeQuestion[];
}

const examOptions: ExamOption[] = [
  { id: 'jee-main', name: 'JEE Main', icon: '⚙️', subjects: 'Physics, Chemistry, Maths', count: 0, questions: [] },
  { id: 'neet-ug', name: 'NEET UG', icon: '🏥', subjects: 'Physics, Chemistry, Biology', count: 0, questions: [] },
  { id: 'srmjeee', name: 'SRMJEEE', icon: '🎓', subjects: 'Physics, Chemistry, Maths, English', count: 0, questions: [] },
  { id: 'cuet', name: 'CUET', icon: '📚', subjects: 'English, GK, Maths, Reasoning', count: 0, questions: [] },
  { id: 'clat', name: 'CLAT', icon: '⚖️', subjects: 'Legal, English, GK, Reasoning', count: 0, questions: [] },
  { id: 'nda', name: 'NDA', icon: '🎖️', subjects: 'Maths, General Knowledge', count: 0, questions: [] },
  { id: 'bitsat', name: 'BITSAT', icon: '🔧', subjects: 'Physics, Chemistry, Maths', count: 0, questions: [] },
  { id: 'viteee', name: 'VITEEE', icon: '🏛️', subjects: 'Physics, Chemistry, Maths', count: 0, questions: [] },
  { id: 'tnau', name: 'TNAU', icon: '🌾', subjects: 'Biology, Chemistry, Agriculture', count: 0, questions: [] },
  { id: 'ca-cs-cma-foundation', name: 'CA Foundation', icon: '💼', subjects: 'Accounting, Law, Maths, Economics', count: 0, questions: [] },
].map(e => {
  const qs = examPracticeQuestions[e.id] || [];
  return { ...e, count: qs.length, questions: qs };
}).filter(e => e.count > 0);

const totalQuestions = examOptions.reduce((sum, e) => sum + e.count, 0);

export const EntranceExamPractice = () => {
  const [activeExam, setActiveExam] = useState<ExamOption | null>(null);

  if (activeExam) {
    return (
      <div className="space-y-3">
        <button
          onClick={() => setActiveExam(null)}
          className="flex items-center gap-2 text-sm font-bold text-violet-600 hover:text-violet-800 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Exams
        </button>
        <PracticeQuestions questions={activeExam.questions} examName={activeExam.name} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Entrance Exam Practice</h2>
            <p className="text-xs text-violet-200">நுழைவுத் தேர்வு பயிற்சி</p>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-lg">{totalQuestions} Questions</span>
          <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-lg">{examOptions.length} Exams</span>
          <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-lg">Instant Feedback</span>
        </div>
      </div>

      {/* Exam List */}
      <div className="space-y-2">
        {examOptions.map(exam => (
          <button
            key={exam.id}
            onClick={() => setActiveExam(exam)}
            className="w-full flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-violet-300 hover:shadow-md transition-all active:scale-[0.99] text-left"
          >
            <span className="text-2xl flex-shrink-0">{exam.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900">{exam.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{exam.subjects}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs font-bold bg-violet-100 text-violet-700 px-2 py-1 rounded-lg">{exam.count} Qs</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </button>
        ))}
      </div>

      {/* How it works */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <p className="text-xs font-bold text-gray-700 mb-2">How Practice Works:</p>
        <div className="space-y-1.5 text-xs text-gray-500">
          <p>1️⃣ Pick an exam above</p>
          <p>2️⃣ Answer MCQ questions one by one</p>
          <p>3️⃣ Get instant feedback — ✅ Correct or ❌ Wrong</p>
          <p>4️⃣ Read the explanation to learn</p>
          <p>5️⃣ See your final score at the end</p>
          <p>6️⃣ Practice again to improve</p>
        </div>
      </div>
    </div>
  );
};
