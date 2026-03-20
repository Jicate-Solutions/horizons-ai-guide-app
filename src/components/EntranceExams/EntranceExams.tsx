import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, BookOpen, Clock, Calendar, ExternalLink, ChevronDown, ChevronUp,
  ChevronRight, Target, Bell, FileText, Star, MapPin, IndianRupee, Building2,
  Zap, Check, ArrowLeft
} from 'lucide-react';
import { examCategories, entranceExams, getExamsByCategory } from './examData';
import { examPracticeQuestions } from './practiceQuestionsData';
import { PracticeQuestions } from './PracticeQuestions';
import { ExamCategory, EntranceExam } from './types';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const MY_EXAM_KEY = 'vzk_my_target_exam';

// Stream → recommended exam IDs
const streamExams: Record<string, string[]> = {
  science_maths: ['tnea', 'jee-main', 'jee-advanced', 'bitsat', 'viteee', 'srmjeee', 'cuet'],
  science_bio: ['neet-ug', 'tn-neet-counselling', 'jipmer-puducherry', 'tnau', 'tanuvas', 'bsc-nursing', 'bpharm', 'allied-health'],
  commerce: ['ca-cs-cma-foundation', 'cuet', 'clat', 'tndalu', 'bba-bca-bcom-direct', 'ipm-iim', 'set-symbiosis'],
  arts: ['clat', 'tndalu', 'ailet', 'lsat-india', 'slat', 'cuet', 'bba-bca-bcom-direct'],
  default: ['tnea', 'neet-ug', 'jee-main', 'clat', 'cuet', 'ca-cs-cma-foundation'],
};

const detectStream = (raw: string): string => {
  if (!raw) return 'default';
  const s = raw.toLowerCase();
  if (s.includes('maths') || s.includes('pcm') || s.includes('engineering') || s.includes('computer')) return 'science_maths';
  if (s.includes('bio') || s.includes('pcb') || s.includes('medical') || s.includes('neet')) return 'science_bio';
  if (s.includes('commerce') || s.includes('business') || s.includes('accounting')) return 'commerce';
  if (s.includes('arts') || s.includes('humanities') || s.includes('history')) return 'arts';
  return 'default';
};

export const EntranceExams = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [myExamId, setMyExamId] = useState<string | null>(null);
  const [expandedExam, setExpandedExam] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [practiceExam, setPracticeExam] = useState<string | null>(null);
  const [showAllExams, setShowAllExams] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const meta = user?.user_metadata || {};
  const stream = detectStream(meta.stream || '');
  const recommendedIds = streamExams[stream] || streamExams.default;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(MY_EXAM_KEY);
      if (saved) setMyExamId(saved);
    } catch {}
  }, []);

  const selectMyExam = (id: string) => {
    setMyExamId(id);
    setExpandedExam(null);
    try { localStorage.setItem(MY_EXAM_KEY, id); } catch {}
  };

  const myExam = myExamId ? entranceExams.find(e => e.id === myExamId) : null;
  const recommendedExams = recommendedIds.map(id => entranceExams.find(e => e.id === id)).filter(Boolean) as EntranceExam[];
  const practiceQs = practiceExam ? examPracticeQuestions[practiceExam] : null;

  // Practice mode
  if (practiceExam && practiceQs) {
    const examName = entranceExams.find(e => e.id === practiceExam)?.name || '';
    return (
      <div className="space-y-4">
        <button onClick={() => setPracticeExam(null)} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Exams
        </button>
        <PracticeQuestions questions={practiceQs} examName={examName} />
      </div>
    );
  }

  // Render exam detail card
  const renderExamDetail = (exam: EntranceExam) => {
    const isExpanded = expandedExam === exam.id;
    const hasPractice = !!examPracticeQuestions[exam.id];
    const practiceCount = examPracticeQuestions[exam.id]?.length || 0;
    const catInfo = examCategories.find(c => c.id === exam.category);

    return (
      <div key={exam.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <button onClick={() => setExpandedExam(isExpanded ? null : exam.id)}
          className="w-full p-4 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors">
          <span className="text-xl">{catInfo?.icon || '📝'}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-bold text-gray-900">{exam.name.replace(' ⭐', '')}</p>
              {hasPractice && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700">{practiceCount}Q</span>}
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">{exam.importantDates.examDate}</p>
          </div>
          {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>

        {isExpanded && (
          <div className="border-t border-gray-100 p-4 space-y-4">
            {/* Key info */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                <p className="text-xs font-bold text-gray-800">{exam.importantDates.examDate}</p>
                <p className="text-[9px] text-gray-400">Exam Date</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                <p className="text-xs font-bold text-gray-800">{exam.duration}</p>
                <p className="text-[9px] text-gray-400">Duration</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                <p className="text-xs font-bold text-gray-800">{exam.applicationFee.general}</p>
                <p className="text-[9px] text-gray-400">Fee (Gen)</p>
              </div>
            </div>

            {/* Syllabus */}
            <div>
              <button onClick={() => setExpandedSection(expandedSection === `${exam.id}-syl` ? null : `${exam.id}-syl`)}
                className="flex items-center justify-between w-full text-left mb-1">
                <p className="text-xs font-bold text-gray-700">📚 Syllabus & Pattern</p>
                {expandedSection === `${exam.id}-syl` ? <ChevronUp className="w-3 h-3 text-gray-400" /> : <ChevronDown className="w-3 h-3 text-gray-400" />}
              </button>
              {expandedSection === `${exam.id}-syl` && (
                <div className="space-y-1.5 mt-2">
                  {exam.syllabus.map((s, i) => (
                    <p key={i} className="text-xs text-gray-600 leading-relaxed bg-gray-50 rounded-lg px-3 py-2">{s}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Eligibility */}
            <div>
              <button onClick={() => setExpandedSection(expandedSection === `${exam.id}-elig` ? null : `${exam.id}-elig`)}
                className="flex items-center justify-between w-full text-left mb-1">
                <p className="text-xs font-bold text-gray-700">✅ Eligibility</p>
                {expandedSection === `${exam.id}-elig` ? <ChevronUp className="w-3 h-3 text-gray-400" /> : <ChevronDown className="w-3 h-3 text-gray-400" />}
              </button>
              {expandedSection === `${exam.id}-elig` && (
                <div className="space-y-1 mt-2">
                  {exam.eligibility.map((e, i) => (
                    <p key={i} className="text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2">• {e}</p>
                  ))}
                </div>
              )}
            </div>

            {/* TN specific */}
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
              <p className="text-[10px] font-bold text-emerald-700 mb-0.5">🏛️ For Tamil Nadu Students</p>
              <p className="text-xs text-emerald-600">{exam.tnEligibility}</p>
            </div>

            {/* TN Colleges */}
            {exam.tnCollegesAccepting.length > 0 && (
              <div>
                <button onClick={() => setExpandedSection(expandedSection === `${exam.id}-col` ? null : `${exam.id}-col`)}
                  className="flex items-center justify-between w-full text-left mb-1">
                  <p className="text-xs font-bold text-gray-700">🏫 Colleges ({exam.tnCollegesAccepting.length})</p>
                  {expandedSection === `${exam.id}-col` ? <ChevronUp className="w-3 h-3 text-gray-400" /> : <ChevronDown className="w-3 h-3 text-gray-400" />}
                </button>
                {expandedSection === `${exam.id}-col` && (
                  <div className="space-y-1 mt-2">
                    {exam.tnCollegesAccepting.map((c, i) => (
                      <p key={i} className="text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2">🎓 {c}</p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2">
              {hasPractice && (
                <button onClick={() => setPracticeExam(exam.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold hover:from-violet-600 hover:to-purple-700">
                  <Zap className="w-3.5 h-3.5" /> Practice {practiceCount}Q
                </button>
              )}
              <button onClick={() => exam.officialWebsite && window.open(exam.officialWebsite, '_blank')}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white border-2 border-gray-200 text-gray-700 text-xs font-bold hover:border-gray-400">
                <ExternalLink className="w-3.5 h-3.5" /> Official Website
              </button>
            </div>

            {/* Set as my exam */}
            {myExamId !== exam.id && (
              <button onClick={() => selectMyExam(exam.id)}
                className="w-full text-center text-xs text-emerald-600 font-bold hover:underline py-1">
                ⭐ Set as My Target Exam
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-5">

      {/* ═══ MY TARGET EXAM (if selected) ═══ */}
      {myExam && (
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-4 border-2 border-emerald-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">⭐ My Target Exam</p>
            <button onClick={() => { setMyExamId(null); localStorage.removeItem(MY_EXAM_KEY); }} className="text-[10px] text-gray-400">Change</button>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{examCategories.find(c => c.id === myExam.category)?.icon || '📝'}</span>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{myExam.name.replace(' ⭐', '')}</h2>
              <p className="text-xs text-gray-500">{myExam.importantDates.examDate} · {myExam.duration}</p>
            </div>
          </div>
          {/* Quick actions for my exam */}
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => navigate('/syllabus-tracker')}
              className="bg-white rounded-xl p-2.5 text-center border border-emerald-200 hover:bg-emerald-100 transition-colors">
              <BookOpen className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-emerald-700">Track Syllabus</p>
            </button>
            {examPracticeQuestions[myExam.id] && (
              <button onClick={() => setPracticeExam(myExam.id)}
                className="bg-white rounded-xl p-2.5 text-center border border-violet-200 hover:bg-violet-100 transition-colors">
                <Zap className="w-4 h-4 text-violet-600 mx-auto mb-1" />
                <p className="text-[10px] font-bold text-violet-700">Practice {examPracticeQuestions[myExam.id]?.length}Q</p>
              </button>
            )}
            <button onClick={() => navigate('/exam-alerts')}
              className="bg-white rounded-xl p-2.5 text-center border border-red-200 hover:bg-red-100 transition-colors">
              <Bell className="w-4 h-4 text-red-600 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-red-700">Alerts</p>
            </button>
          </div>
        </div>
      )}

      {/* ═══ RECOMMENDED FOR YOUR STREAM ═══ */}
      {!myExam && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-gray-800">Recommended for You</h2>
          </div>
          <p className="text-xs text-gray-500 mb-3">Tap any exam to set it as your target and see preparation options</p>
          <div className="space-y-2">
            {recommendedExams.slice(0, 5).map(exam => {
              const catInfo = examCategories.find(c => c.id === exam.category);
              const hasPractice = !!examPracticeQuestions[exam.id];
              return (
                <button key={exam.id} onClick={() => selectMyExam(exam.id)}
                  className="w-full bg-white rounded-xl p-4 border-2 border-gray-100 hover:border-emerald-400 hover:shadow-md transition-all text-left flex items-center gap-3 active:scale-[0.99]">
                  <span className="text-xl">{catInfo?.icon || '📝'}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{exam.name.replace(' ⭐', '')}</p>
                    <p className="text-[11px] text-gray-500">{exam.importantDates.examDate} · {exam.duration}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {hasPractice && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700">Quiz</span>}
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══ PRACTICE QUESTIONS — Scrollable ═══ */}
      {(() => {
        const withPractice = Object.keys(examPracticeQuestions).map(id => {
          const exam = entranceExams.find(e => e.id === id);
          const qs = examPracticeQuestions[id];
          return exam && qs ? { exam, count: qs.length } : null;
        }).filter(Boolean) as { exam: EntranceExam; count: number }[];
        if (withPractice.length === 0) return null;
        return (
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Zap className="w-4 h-4 text-violet-600" />
              <h2 className="text-sm font-bold text-gray-800">Practice Questions</h2>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {withPractice.map(({ exam, count }) => (
                <button key={exam.id} onClick={() => setPracticeExam(exam.id)}
                  className="flex-shrink-0 bg-white rounded-xl px-4 py-3 border-2 border-gray-100 hover:border-violet-400 hover:shadow-md transition-all text-left min-w-[130px]">
                  <p className="text-xs font-bold text-gray-800">{exam.name.replace(' ⭐', '')}</p>
                  <p className="text-[11px] text-violet-600 font-bold mt-0.5">{count} questions →</p>
                </button>
              ))}
            </div>
          </div>
        );
      })()}

      {/* ═══ BROWSE ALL EXAMS ═══ */}
      <div>
        <button onClick={() => setShowAllExams(!showAllExams)}
          className="flex items-center justify-between w-full mb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-600" />
            <h2 className="text-sm font-bold text-gray-800">All {entranceExams.length} Exams</h2>
          </div>
          {showAllExams ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>

        {showAllExams && (
          <div className="space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search exams..." value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-emerald-400 focus:ring-0 outline-none" />
            </div>

            {/* Category tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
              {examCategories.map(cat => (
                <button key={cat.id} onClick={() => setSearchQuery('')}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border border-gray-200 bg-white hover:bg-gray-50">
                  <span>{cat.icon}</span> {cat.label}
                </button>
              ))}
            </div>

            {/* Exam list */}
            <div className="space-y-2">
              {(searchQuery
                ? entranceExams.filter(e => (e.name + e.fullForm + e.tamilName).toLowerCase().includes(searchQuery.toLowerCase()))
                : entranceExams
              ).map(exam => renderExamDetail(exam))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
