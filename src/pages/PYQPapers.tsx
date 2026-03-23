import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ChevronDown, ChevronUp, Clock, FileText, CheckCircle2, BookOpen, BarChart3, Target } from 'lucide-react';
import { pyqPapers, getAvailableExams, PYQPaper } from '@/data/pyqFullPapers';
import { cn } from '@/lib/utils';

const PYQPapersPage = () => {
  const navigate = useNavigate();
  const [selExam, setSelExam] = useState<string | null>(null);
  const [selYear, setSelYear] = useState<number | null>(null);
  const [activePaper, setActivePaper] = useState<PYQPaper | null>(null);
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({});
  const [testMode, setTestMode] = useState(false);
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);

  const exams = getAvailableExams();

  // Test mode — attempt full paper
  if (testMode && activePaper && activeSubject) {
    const sub = activePaper.subjects.find(s => s.name === activeSubject);
    if (!sub) return null;
    const totalQ = sub.questions.length;
    const answered = Object.keys(testAnswers).length;

    if (testSubmitted) {
      const correct = sub.questions.filter((q, i) => testAnswers[i] === q.a).length;
      const score = Math.round((correct / totalQ) * 100);
      return (
        <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
          <div className="max-w-lg mx-auto space-y-4">
            <button onClick={() => { setTestMode(false); setTestSubmitted(false); setTestAnswers({}); }}
              className="text-sm text-gray-500 flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Back to paper</button>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
              <div className={cn("w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-black mb-3", score >= 70 ? 'bg-emerald-100 text-emerald-700' : score >= 40 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700')}>
                {score}%
              </div>
              <p className="text-lg font-bold text-gray-900">{correct}/{totalQ} Correct</p>
              <p className="text-xs text-gray-500 mt-1">{activePaper.exam} {activePaper.year} — {activeSubject}</p>
            </div>
            {/* Review answers */}
            <p className="text-xs font-bold text-gray-500">Review Answers:</p>
            {sub.questions.map((q, i) => (
              <div key={i} className={cn("bg-white rounded-xl p-4 border", testAnswers[i] === q.a ? 'border-emerald-300' : 'border-red-300')}>
                <p className="text-xs font-medium text-gray-800 mb-2">Q{i + 1}. {q.q}</p>
                {q.o.map((opt, j) => (
                  <p key={j} className={cn("text-[11px] px-3 py-1.5 rounded-lg mb-1",
                    j === q.a ? 'bg-emerald-100 text-emerald-800 font-bold' : j === testAnswers[i] && j !== q.a ? 'bg-red-100 text-red-700' : 'bg-gray-50 text-gray-600')}>
                    {String.fromCharCode(65 + j)}. {opt} {j === q.a ? '✓' : j === testAnswers[i] && j !== q.a ? '✗' : ''}
                  </p>
                ))}
                <p className="text-[10px] text-gray-500 mt-2 bg-gray-50 rounded-lg p-2">💡 {q.e}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
        <div className="max-w-lg mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <button onClick={() => { setTestMode(false); setTestAnswers({}); }}
              className="text-sm text-gray-500 flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Exit Test</button>
            <span className="text-xs font-bold text-gray-500">{answered}/{totalQ} answered</span>
          </div>
          <div className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-2xl p-4 text-white">
            <p className="text-sm font-bold">{activePaper.exam} {activePaper.year} — {activeSubject}</p>
            <p className="text-[10px] text-violet-200">{activePaper.date} | {activePaper.shift}</p>
          </div>
          {sub.questions.map((q, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-[10px] text-gray-400 mb-1">Question {i + 1} · {q.topic}</p>
              <p className="text-xs font-medium text-gray-800 mb-3 leading-relaxed">{q.q}</p>
              <div className="space-y-1.5">
                {q.o.map((opt, j) => (
                  <button key={j} onClick={() => setTestAnswers(p => ({ ...p, [i]: j }))}
                    className={cn("w-full text-left text-[11px] px-3 py-2 rounded-lg border-2 transition-all",
                      testAnswers[i] === j ? 'border-violet-500 bg-violet-50 text-violet-800 font-bold' : 'border-gray-200 text-gray-600 hover:border-gray-400')}>
                    {String.fromCharCode(65 + j)}. {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={() => setTestSubmitted(true)}
            className="w-full py-3.5 rounded-xl bg-violet-600 text-white text-sm font-bold active:scale-[0.98]">
            Submit Test ({answered}/{totalQ} answered)
          </button>
        </div>
      </div>
    );
  }

  // Paper detail view
  if (activePaper) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
        <div className="max-w-lg mx-auto space-y-4">
          <button onClick={() => { setActivePaper(null); setActiveSubject(null); setShowAnswers({}); }}
            className="text-sm text-gray-500 flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Back</button>

          {/* Paper header */}
          <div className="bg-gradient-to-br from-slate-800 to-gray-900 rounded-2xl p-5 text-white">
            <p className="text-lg font-bold">{activePaper.exam} {activePaper.year}</p>
            <p className="text-xs text-gray-300 mt-1">{activePaper.date} · {activePaper.shift}</p>
            <div className="grid grid-cols-4 gap-2 mt-3">
              {[
                { l: 'Questions', v: String(activePaper.totalQuestions) },
                { l: 'Marks', v: String(activePaper.totalMarks) },
                { l: 'Duration', v: activePaper.duration },
                { l: 'Level', v: activePaper.difficulty },
              ].map(item => (
                <div key={item.l} className="bg-white/10 rounded-lg p-2 text-center">
                  <p className="text-[9px] text-gray-400">{item.l}</p>
                  <p className="text-[11px] font-bold">{item.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subject selector */}
          <div className="flex gap-2">
            {activePaper.subjects.map(sub => (
              <button key={sub.name} onClick={() => setActiveSubject(activeSubject === sub.name ? null : sub.name)}
                className={cn("flex-1 py-2.5 rounded-xl text-xs font-bold text-center border-2 transition-all",
                  activeSubject === sub.name
                    ? sub.name === 'Physics' ? 'bg-blue-600 text-white border-blue-600' : sub.name === 'Chemistry' ? 'bg-green-600 text-white border-green-600' : sub.name === 'Mathematics' ? 'bg-purple-600 text-white border-purple-600' : 'bg-rose-600 text-white border-rose-600'
                    : sub.name === 'Physics' ? 'bg-blue-50 text-blue-700 border-blue-200' : sub.name === 'Chemistry' ? 'bg-green-50 text-green-700 border-green-200' : sub.name === 'Mathematics' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                )}>
                {sub.name} ({sub.questions.length})
              </button>
            ))}
          </div>

          {/* Take Test button */}
          {activeSubject && (
            <button onClick={() => { setTestMode(true); setTestAnswers({}); setTestSubmitted(false); }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-bold flex items-center justify-center gap-2 active:scale-[0.98] shadow-lg">
              <Target className="w-4 h-4" /> Attempt as Test — {activePaper.subjects.find(s => s.name === activeSubject)?.questions.length}Q
            </button>
          )}

          {/* Questions */}
          {activeSubject && activePaper.subjects.find(s => s.name === activeSubject)?.questions.map((q, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">Q{i + 1}</span>
                <span className="text-[9px] text-gray-400">{q.topic}</span>
              </div>
              <p className="text-xs font-medium text-gray-800 leading-relaxed">{q.q}</p>
              <div className="space-y-1">
                {q.o.map((opt, j) => (
                  <p key={j} className={cn("text-[11px] px-3 py-1.5 rounded-lg",
                    showAnswers[i] && j === q.a ? 'bg-emerald-100 text-emerald-800 font-bold' : 'bg-gray-50 text-gray-600')}>
                    {String.fromCharCode(65 + j)}. {opt}
                  </p>
                ))}
              </div>
              <button onClick={() => setShowAnswers(p => ({ ...p, [i]: !p[i] }))}
                className="text-[10px] font-bold text-violet-600">{showAnswers[i] ? 'Hide' : 'Show Answer & Explanation'}</button>
              {showAnswers[i] && <p className="text-[10px] text-gray-500 bg-gray-50 rounded-lg p-2.5">💡 {q.e}</p>}
            </div>
          ))}

          {!activeSubject && <p className="text-xs text-gray-400 text-center py-6">Select a subject above to view questions</p>}
        </div>
      </div>
    );
  }

  // Year selection for an exam
  if (selExam) {
    const papers = pyqPapers.filter(p => p.exam === selExam).sort((a, b) => b.year - a.year || a.session.localeCompare(b.session));
    const years = [...new Set(papers.map(p => p.year))].sort((a, b) => b - a);

    return (
      <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
        <div className="max-w-lg mx-auto space-y-4">
          <button onClick={() => { setSelExam(null); setSelYear(null); }}
            className="text-sm text-gray-500 flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> All Exams</button>

          <div className="bg-gradient-to-br from-slate-800 to-gray-900 rounded-2xl p-5 text-white">
            <p className="text-lg font-bold">{selExam} — Previous Year Papers</p>
            <p className="text-xs text-gray-300 mt-1">{papers.length} papers across {years.length} years · With solutions & answer key</p>
          </div>

          {years.map(year => {
            const yearPapers = papers.filter(p => p.year === year);
            const isOpen = selYear === year;
            return (
              <div key={year} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button onClick={() => setSelYear(isOpen ? null : year)}
                  className="w-full p-4 text-left flex items-center gap-3 hover:bg-gray-50">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-black text-sm">{year}</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{selExam} {year} Question Paper</p>
                    <p className="text-[10px] text-gray-500">{yearPapers.length} paper{yearPapers.length > 1 ? 's' : ''} · With answer key & solutions</p>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {isOpen && (
                  <div className="border-t border-gray-100 px-3 pb-3 pt-2 space-y-2">
                    {yearPapers.map(paper => (
                      <button key={paper.id} onClick={() => setActivePaper(paper)}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-left transition-all active:scale-[0.98]">
                        <FileText className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-800">{paper.date} — {paper.shift}</p>
                          <div className="flex items-center gap-2 mt-0.5 text-[9px] text-gray-500">
                            <span>{paper.session} Session</span>
                            <span>·</span>
                            <span>{paper.totalQuestions}Q</span>
                            <span>·</span>
                            <span className={cn("font-bold", paper.difficulty.includes('Easy') ? 'text-emerald-600' : paper.difficulty.includes('Difficult') ? 'text-red-600' : 'text-amber-600')}>{paper.difficulty}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Exam selection
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
      <div className="max-w-lg mx-auto space-y-5">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-500 flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Back</button>
        <div className="text-center py-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-slate-700 to-gray-800 flex items-center justify-center text-3xl shadow-lg mb-4">📜</div>
          <h1 className="text-2xl font-bold text-gray-900">Previous Year Papers</h1>
          <p className="text-sm text-gray-500 mt-1">Year-wise, shift-wise papers with solutions & answer key</p>
        </div>
        {Array.from(exams.entries()).map(([examName, data]) => (
          <button key={examName} onClick={() => setSelExam(examName)}
            className="w-full bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-indigo-400 hover:shadow-lg transition-all text-left flex items-center gap-4 active:scale-[0.98]">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-base font-bold text-gray-900">{examName}</p>
              <p className="text-xs text-gray-500">{data.years.join(', ')}</p>
              <p className="text-[10px] text-indigo-600 font-bold mt-1">{data.totalPapers} papers · With solutions</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PYQPapersPage;
