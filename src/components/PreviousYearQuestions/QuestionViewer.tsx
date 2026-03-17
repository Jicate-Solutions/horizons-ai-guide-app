import { useState } from 'react';
import { ArrowLeft, Eye, BookOpen, Clock, ChevronUp, BookMarked, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { getTopicQuestions, PYQQuestion } from './pyqQuestionsData';
import { getTopicSyllabus } from './syllabusData';

interface QuestionViewerProps {
  examId: string;
  examName: string;
  subject: string;
  topicName: string;
  onBack: () => void;
}

export const QuestionViewer = ({ examId, examName, subject, topicName, onBack }: QuestionViewerProps) => {
  const questions = getTopicQuestions(examId, subject, topicName);
  const syllabus = getTopicSyllabus(examId, subject, topicName);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [showAll, setShowAll] = useState(false);
  const [showSyllabus, setShowSyllabus] = useState(true);

  const toggleAnswer = (qId: number) => {
    setRevealedAnswers(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleShowAll = () => {
    if (showAll) {
      setRevealedAnswers({});
      setShowAll(false);
    } else {
      const all: Record<number, boolean> = {};
      questions.forEach(q => { all[q.id] = true; });
      setRevealedAnswers(all);
      setShowAll(true);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Button variant="ghost" size="sm" className="mb-3 text-gray-600 hover:text-gray-800 rounded-xl -ml-2" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Topics
        </Button>

        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-2xl p-5 text-white">
          <p className="text-blue-200 text-sm font-medium">{examName} → {subject}</p>
          <h3 className="text-xl md:text-2xl font-bold mt-1">{topicName}</h3>
          <p className="text-blue-100 text-sm mt-1">Official Syllabus + Previous Year Questions</p>
          <div className="flex gap-3 mt-4 flex-wrap">
            <div className="bg-white/15 backdrop-blur rounded-xl px-3 py-2 text-center border border-white/20">
              <div className="text-lg font-bold">{questions.length}</div>
              <div className="text-[10px] text-white/70 uppercase tracking-wider">PYQ</div>
            </div>
            {syllabus && (
              <>
                <div className="bg-white/15 backdrop-blur rounded-xl px-3 py-2 text-center border border-white/20">
                  <div className="text-lg font-bold">{syllabus.officialTopics.length}</div>
                  <div className="text-[10px] text-white/70 uppercase tracking-wider">Syllabus Topics</div>
                </div>
                <div className="bg-white/15 backdrop-blur rounded-xl px-3 py-2 text-center border border-white/20">
                  <div className="text-lg font-bold">{syllabus.books.length}</div>
                  <div className="text-[10px] text-white/70 uppercase tracking-wider">Books</div>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* ═══ OFFICIAL SYLLABUS + BOOKS ═══ */}
      {syllabus && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <button
            onClick={() => setShowSyllabus(!showSyllabus)}
            className="w-full flex items-center justify-between p-4 bg-white rounded-xl border-2 border-emerald-200 hover:border-emerald-300 transition-all"
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-bold text-gray-800">Official Syllabus & Books to Study</span>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">{showSyllabus ? 'Hide' : 'Show'}</Badge>
          </button>

          {showSyllabus && (
            <div className="mt-2 space-y-3">
              {/* Syllabus Topics */}
              <Card className="rounded-xl border-2 border-emerald-100 overflow-hidden">
                <div className="px-4 py-3 bg-emerald-50 border-b border-emerald-100">
                  <p className="text-sm font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Official Syllabus — What to Study
                  </p>
                  <p className="text-xs text-emerald-600 mt-0.5">These exact topics appear in the {examName} exam</p>
                </div>
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {syllabus.officialTopics.map((topic, idx) => (
                      <span key={idx} className="text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1.5 rounded-lg">
                        {topic}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Books */}
              <Card className="rounded-xl border-2 border-amber-100 overflow-hidden">
                <div className="px-4 py-3 bg-amber-50 border-b border-amber-100">
                  <p className="text-sm font-bold text-amber-800 flex items-center gap-1.5">
                    <BookMarked className="w-4 h-4" /> Books to Study — Recommended for {examName}
                  </p>
                  <p className="text-xs text-amber-600 mt-0.5">Read these books to score well in this topic</p>
                </div>
                <CardContent className="p-3 space-y-2">
                  {syllabus.books.map((book, idx) => (
                    <div key={idx} className="flex gap-3 p-3 bg-white rounded-xl border border-gray-100">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900">{book.name}</p>
                        <p className="text-xs text-gray-500">by {book.author}</p>
                        <p className="text-xs text-emerald-700 mt-1 bg-emerald-50 px-2 py-1 rounded-md inline-block">{book.why}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      )}

      {/* ═══ PREVIOUS YEAR QUESTIONS ═══ */}
      {questions.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              Previous Year Questions ({questions.length})
            </h4>
            <Button onClick={handleShowAll} variant="outline" size="sm" className="rounded-xl text-xs border-blue-200 text-blue-600 hover:bg-blue-50">
              {showAll ? <ChevronUp className="w-3.5 h-3.5 mr-1" /> : <Eye className="w-3.5 h-3.5 mr-1" />}
              {showAll ? 'Hide All' : 'Show All'}
            </Button>
          </div>

          <div className="space-y-4">
            {questions.map((q, qIdx) => {
              const isRevealed = revealedAnswers[q.id];
              const correctLetter = String.fromCharCode(65 + q.answer);

              return (
                <motion.div key={q.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(qIdx * 0.04, 0.5) }}>
                  <Card className="overflow-hidden rounded-xl border border-gray-200">
                    <CardContent className="p-0">
                      <div className="px-4 pt-4 pb-2">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-lg">Q{qIdx + 1}</span>
                          <Badge variant="outline" className="text-[10px] border-amber-300 text-amber-700 bg-amber-50 font-semibold">
                            <Clock className="w-2.5 h-2.5 mr-0.5" />{q.exam}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-gray-800 leading-relaxed">{q.question}</p>
                      </div>

                      <div className="px-4 pb-3 space-y-1.5">
                        {q.options.map((opt, oIdx) => {
                          const letter = String.fromCharCode(65 + oIdx);
                          const isCorrect = q.answer === oIdx;
                          return (
                            <div key={oIdx} className={cn(
                              "px-3 py-2.5 rounded-xl border-2 flex items-center gap-3 text-sm transition-all",
                              isRevealed && isCorrect ? "border-green-400 bg-green-50" : "border-gray-200 bg-white"
                            )}>
                              <span className={cn(
                                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                                isRevealed && isCorrect ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"
                              )}>{letter}</span>
                              <span className={cn("flex-1", isRevealed && isCorrect && "font-semibold text-green-800")}>{opt}</span>
                              {isRevealed && isCorrect && <span className="text-green-600 text-xs font-bold">✅</span>}
                            </div>
                          );
                        })}
                      </div>

                      <button onClick={() => toggleAnswer(q.id)} className={cn(
                        "w-full border-t text-sm font-semibold py-3 transition-all flex items-center justify-center gap-2",
                        isRevealed ? "bg-green-50 border-green-200 text-green-700" : "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-100 text-blue-600"
                      )}>
                        {isRevealed ? (
                          <><ChevronUp className="w-4 h-4" />Answer: ({correctLetter}) {q.options[q.answer]}</>
                        ) : (
                          <><Eye className="w-4 h-4" />Show Answer</>
                        )}
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </>
      )}

      {/* No questions state */}
      {questions.length === 0 && (
        <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-700 font-bold">PYQ for "{topicName}" — Coming Soon</p>
          <p className="text-gray-400 text-sm mt-1 px-4">We're adding verified previous year questions from official {examName} papers. Only real exam questions will appear here.</p>
          {syllabus && (
            <p className="text-emerald-600 text-sm mt-3 font-medium">📚 Syllabus & Books are available above — start preparing!</p>
          )}
        </div>
      )}

      {/* Back Button */}
      <div className="text-center pt-2 pb-4">
        <Button variant="outline" className="rounded-xl" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Topics
        </Button>
      </div>
    </div>
  );
};
