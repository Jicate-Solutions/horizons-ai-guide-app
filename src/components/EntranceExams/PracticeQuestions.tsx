import { useState } from 'react';
import { CheckCircle, XCircle, ChevronRight, RotateCcw, BookOpen, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PracticeQuestion } from './types';

interface Props {
  questions: PracticeQuestion[];
  examName: string;
}

export const PracticeQuestions = ({ questions, examName }: Props) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentQ];

  const handleSelect = (idx: number) => {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);
    setAnswered(prev => prev + 1);
    if (idx === q.answer) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setCurrentQ(prev => prev + 1);
    setSelected(null);
    setShowAnswer(false);
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowAnswer(false);
    setScore(0);
    setAnswered(0);
    setFinished(false);
  };

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-white rounded-xl border-2 border-gray-200 p-5 text-center">
        <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-500">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Practice Complete!</h3>
        <p className="text-sm text-gray-500 mt-1">{examName}</p>
        <div className="my-4">
          <p className="text-4xl font-black" style={{ color: percent >= 70 ? '#059669' : percent >= 40 ? '#d97706' : '#dc2626' }}>
            {score}/{questions.length}
          </p>
          <p className="text-sm text-gray-500 mt-1">{percent}% correct</p>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          {percent >= 80 ? 'Excellent! You\'re well prepared.' :
           percent >= 60 ? 'Good effort! Review the topics you missed.' :
           percent >= 40 ? 'Keep practicing. Focus on weak subjects.' :
           'Don\'t give up! Start with basics and practice daily.'}
        </p>
        <button
          onClick={handleRestart}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all active:scale-[0.98]"
        >
          <RotateCcw className="w-4 h-4" /> Practice Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-white" />
          <span className="text-sm font-bold text-white">Practice Questions</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-violet-200 bg-white/20 px-2 py-0.5 rounded-full">{score}/{answered} correct</span>
          <span className="text-xs font-bold text-white bg-white/20 px-2 py-0.5 rounded-full">Q{currentQ + 1}/{questions.length}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1.5 bg-gray-100">
        <div className="h-full bg-violet-500 transition-all duration-300" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="p-4">
        {/* Subject + Difficulty */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{q.subject}</span>
          <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full",
            q.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
            q.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
            'bg-red-100 text-red-700'
          )}>{q.difficulty}</span>
        </div>

        {/* Question */}
        <p className="text-sm font-bold text-gray-900 leading-relaxed mb-4">{q.question}</p>

        {/* Options */}
        <div className="space-y-2">
          {q.options.map((opt, idx) => {
            const isCorrect = idx === q.answer;
            const isSelected = idx === selected;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showAnswer}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all text-sm",
                  showAnswer && isCorrect
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                    : showAnswer && isSelected && !isCorrect
                    ? "border-red-500 bg-red-50 text-red-800"
                    : isSelected
                    ? "border-violet-500 bg-violet-50"
                    : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300 active:scale-[0.98]"
                )}
              >
                <span className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                  showAnswer && isCorrect ? "bg-emerald-500 text-white" :
                  showAnswer && isSelected && !isCorrect ? "bg-red-500 text-white" :
                  "bg-gray-200 text-gray-600"
                )}>
                  {showAnswer && isCorrect ? <CheckCircle className="w-4 h-4" /> :
                   showAnswer && isSelected && !isCorrect ? <XCircle className="w-4 h-4" /> :
                   String.fromCharCode(65 + idx)}
                </span>
                <span className="font-medium">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showAnswer && (
          <div className={cn(
            "mt-4 p-3 rounded-xl border text-sm",
            selected === q.answer
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-amber-50 border-amber-200 text-amber-800"
          )}>
            <p className="font-bold mb-1">{selected === q.answer ? '✅ Correct!' : '❌ Wrong!'}</p>
            <p className="leading-relaxed">{q.explanation}</p>
          </div>
        )}

        {/* Next Button */}
        {showAnswer && (
          <button
            onClick={handleNext}
            className="flex items-center justify-center gap-2 w-full mt-4 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold transition-all active:scale-[0.98]"
          >
            {currentQ + 1 >= questions.length ? 'See Results' : 'Next Question'}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
