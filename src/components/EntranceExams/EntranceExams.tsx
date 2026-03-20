import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, BookOpen, Clock, Calendar, ExternalLink, ChevronDown, ChevronUp,
  ChevronRight, Target, Bell, FileText, Star, MapPin, IndianRupee, Building2,
  Zap, Check, ArrowLeft, Bookmark
} from 'lucide-react';
import { examCategories, entranceExams, getExamsByCategory } from './examData';
import { examPracticeQuestions } from './practiceQuestionsData';
import { PracticeQuestions } from './PracticeQuestions';
import { ExamCategory, EntranceExam } from './types';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const MY_EXAM_KEY = 'vzk_my_target_exam';

// Stream → recommended exam IDs (ordered by relevance)
const streamExams: Record<string, string[]> = {
  science_maths: ['tnea', 'jee-main', 'jee-advanced', 'bitsat', 'viteee', 'srmjeee', 'cuet', 'comedk'],
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
  const [viewingExam, setViewingExam] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [practiceExam, setPracticeExam] = useState<string | null>(null);
  const [showAllExams, setShowAllExams] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

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
    try { localStorage.setItem(MY_EXAM_KEY, id); } catch {}
  };

  const myExam = myExamId ? entranceExams.find(e => e.id === myExamId) : null;
  const recommendedExams = recommendedIds.map(id => entranceExams.find(e => e.id === id)).filter(Boolean) as EntranceExam[];
  const practiceQs = practiceExam ? examPracticeQuestions[practiceExam] : null;

  // Stream-filtered practice exams (only show relevant ones)
  const streamPracticeExams = useMemo(() => {
    return Object.keys(examPracticeQuestions)
      .filter(id => recommendedIds.includes(id) || id === myExamId)
      .map(id => {
        const exam = entranceExams.find(e => e.id === id);
        const qs = examPracticeQuestions[id];
        return exam && qs ? { exam, count: qs.length } : null;
      }).filter(Boolean) as { exam: EntranceExam; count: number }[];
  }, [recommendedIds, myExamId]);

  // Filtered exams for "All Exams" section
  const filteredAllExams = useMemo(() => {
    let exams = [...entranceExams];
    if (activeCategory !== 'all') {
      exams = exams.filter(e => e.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      exams = exams.filter(e => (e.name + e.fullForm + e.tamilName).toLowerCase().includes(q));
    }
    return exams;
  }, [activeCategory, searchQuery]);

  // ═══ PRACTICE MODE ═══
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

  // ═══ EXAM DETAIL VIEW ═══
  const renderExamDetail = (exam: EntranceExam, isInline?: boolean) => {
    const hasPractice = !!examPracticeQuestions[exam.id];
    const practiceCount = examPracticeQuestions[exam.id]?.length || 0;
    const isMyExam = myExamId === exam.id;

    return (
      <div className={cn("space-y-4", isInline ? "" : "bg-white rounded-2xl border-2 border-gray-200 p-4")}>
        {/* Key info strip */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-50 rounded-lg p-2.5 text-center">
            <Calendar className="w-3.5 h-3.5 text-gray-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-gray-800">{exam.importantDates.examDate}</p>
            <p className="text-[9px] text-gray-400">Exam Date</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5 text-center">
            <Clock className="w-3.5 h-3.5 text-gray-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-gray-800">{exam.duration}</p>
            <p className="text-[9px] text-gray-400">Duration</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5 text-center">
            <IndianRupee className="w-3.5 h-3.5 text-gray-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-gray-800">{exam.applicationFee.general}</p>
            <p className="text-[9px] text-gray-400">Fee (Gen)</p>
          </div>
        </div>

        {/* TN specific — always visible, most important for TN students */}
        <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
          <p className="text-[10px] font-bold text-emerald-700 mb-0.5">🏛️ For Tamil Nadu Students</p>
          <p className="text-xs text-emerald-600">{exam.tnEligibility}</p>
        </div>

        {/* Collapsible: Syllabus */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <button onClick={() => setExpandedSection(expandedSection === `${exam.id}-syl` ? null : `${exam.id}-syl`)}
            className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50">
            <p className="text-xs font-bold text-gray-700">📚 Syllabus & Pattern</p>
            {expandedSection === `${exam.id}-syl` ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
          </button>
          {expandedSection === `${exam.id}-syl` && (
            <div className="px-3 pb-3 space-y-1.5 border-t border-gray-100 pt-2">
              {exam.syllabus.map((s, i) => (
                <p key={i} className="text-xs text-gray-600 leading-relaxed bg-gray-50 rounded-lg px-3 py-2">{s}</p>
              ))}
            </div>
          )}
        </div>

        {/* Collapsible: Eligibility */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <button onClick={() => setExpandedSection(expandedSection === `${exam.id}-elig` ? null : `${exam.id}-elig`)}
            className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50">
            <p className="text-xs font-bold text-gray-700">✅ Eligibility</p>
            {expandedSection === `${exam.id}-elig` ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
          </button>
          {expandedSection === `${exam.id}-elig` && (
            <div className="px-3 pb-3 space-y-1 border-t border-gray-100 pt-2">
              {exam.eligibility.map((e, i) => (
                <p key={i} className="text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2">• {e}</p>
              ))}
            </div>
          )}
        </div>

        {/* Collapsible: Colleges */}
        {exam.tnCollegesAccepting.length > 0 && (
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button onClick={() => setExpandedSection(expandedSection === `${exam.id}-col` ? null : `${exam.id}-col`)}
              className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50">
              <p className="text-xs font-bold text-gray-700">🏫 TN Colleges ({exam.tnCollegesAccepting.length})</p>
              {expandedSection === `${exam.id}-col` ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
            </button>
            {expandedSection === `${exam.id}-col` && (
              <div className="px-3 pb-3 space-y-1 border-t border-gray-100 pt-2">
                {exam.tnCollegesAccepting.map((c, i) => (
                  <p key={i} className="text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2">🎓 {c}</p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-2">
          <div className="flex gap-2">
            {hasPractice && (
              <button onClick={() => setPracticeExam(exam.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold">
                <Zap className="w-3.5 h-3.5" /> Practice {practiceCount} Questions
              </button>
            )}
            <button onClick={() => exam.officialWebsite && window.open(exam.officialWebsite, '_blank')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white border-2 border-gray-200 text-gray-700 text-xs font-bold hover:border-gray-400">
              <ExternalLink className="w-3.5 h-3.5" /> Official Website
            </button>
          </div>
          {!isMyExam && (
            <button onClick={() => selectMyExam(exam.id)}
              className="w-full py-2.5 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition-all flex items-center justify-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5" /> Set as My Target Exam
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5">

      {/* ═══ SECTION 1: MY TARGET EXAM + PREPARATION ROADMAP ═══ */}
      {myExam && (
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border-2 border-emerald-200 overflow-hidden">
          {/* Header */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">⭐ My Target Exam</p>
              <button onClick={() => { setMyExamId(null); localStorage.removeItem(MY_EXAM_KEY); setViewingExam(null); }} className="text-[10px] text-gray-400 hover:text-gray-600">Change</button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{examCategories.find(c => c.id === myExam.category)?.icon || '📝'}</span>
              <div>
                <h2 className="text-base font-bold text-gray-900">{myExam.name.replace(' ⭐', '')}</h2>
                <p className="text-xs text-gray-500">{myExam.importantDates.examDate} · {myExam.duration}</p>
              </div>
            </div>
          </div>

          {/* Preparation Roadmap — Step by step */}
          <div className="px-4 pb-4">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Your Preparation Path</p>
            <div className="space-y-2">
              <button onClick={() => navigate('/syllabus-tracker')}
                className="w-full bg-white rounded-xl p-3 border border-emerald-200 hover:bg-emerald-50 transition-all text-left flex items-center gap-3 active:scale-[0.99]">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">1</div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-800">Track Syllabus</p>
                  <p className="text-[10px] text-gray-500">Mark chapters as you study them</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </button>
              {examPracticeQuestions[myExam.id] && (
                <button onClick={() => setPracticeExam(myExam.id)}
                  className="w-full bg-white rounded-xl p-3 border border-violet-200 hover:bg-violet-50 transition-all text-left flex items-center gap-3 active:scale-[0.99]">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 font-bold text-xs">2</div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-800">Practice Questions</p>
                    <p className="text-[10px] text-gray-500">{examPracticeQuestions[myExam.id]?.length} questions with explanations</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </button>
              )}
              <button onClick={() => navigate('/exam-alerts')}
                className="w-full bg-white rounded-xl p-3 border border-red-200 hover:bg-red-50 transition-all text-left flex items-center gap-3 active:scale-[0.99]">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">3</div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-800">Check Deadlines</p>
                  <p className="text-[10px] text-gray-500">Registration, exam dates, result dates</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </button>
              <button onClick={() => setViewingExam(viewingExam === myExam.id ? null : myExam.id)}
                className="w-full bg-white rounded-xl p-3 border border-blue-200 hover:bg-blue-50 transition-all text-left flex items-center gap-3 active:scale-[0.99]">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">ℹ️</div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-800">Exam Details</p>
                  <p className="text-[10px] text-gray-500">Syllabus, eligibility, TN colleges, fee</p>
                </div>
                {viewingExam === myExam.id ? <ChevronUp className="w-4 h-4 text-gray-300" /> : <ChevronDown className="w-4 h-4 text-gray-300" />}
              </button>
            </div>

            {/* Expanded exam details inline */}
            {viewingExam === myExam.id && (
              <div className="mt-3 bg-white rounded-xl p-4 border border-gray-200">
                {renderExamDetail(myExam, true)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ SECTION 2: RECOMMENDED FOR YOUR STREAM ═══ */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-bold text-gray-800">{myExam ? 'Other Exams for You' : 'Recommended for You'}</h2>
        </div>
        {!myExam && <p className="text-xs text-gray-500 mb-3">Tap to see details, then decide your target exam</p>}
        <div className="space-y-2">
          {recommendedExams
            .filter(e => e.id !== myExamId)
            .slice(0, myExam ? 3 : 5)
            .map(exam => {
              const catInfo = examCategories.find(c => c.id === exam.category);
              const hasPractice = !!examPracticeQuestions[exam.id];
              const isViewing = viewingExam === exam.id;

              return (
                <div key={exam.id} className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden">
                  <button onClick={() => setViewingExam(isViewing ? null : exam.id)}
                    className="w-full p-4 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors">
                    <span className="text-xl">{catInfo?.icon || '📝'}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-gray-900">{exam.name.replace(' ⭐', '')}</p>
                        {hasPractice && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700">Quiz</span>}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">{exam.importantDates.examDate} · {exam.duration}</p>
                    </div>
                    {isViewing ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                  {isViewing && (
                    <div className="border-t border-gray-100 p-4">
                      {renderExamDetail(exam, true)}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* ═══ SECTION 3: PRACTICE QUESTIONS (stream-filtered) ═══ */}
      {streamPracticeExams.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <Zap className="w-4 h-4 text-violet-600" />
            <h2 className="text-sm font-bold text-gray-800">Practice Questions</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {streamPracticeExams.map(({ exam, count }) => (
              <button key={exam.id} onClick={() => setPracticeExam(exam.id)}
                className="flex-shrink-0 bg-white rounded-xl px-4 py-3 border-2 border-gray-100 hover:border-violet-400 hover:shadow-md transition-all text-left min-w-[130px]">
                <p className="text-xs font-bold text-gray-800">{exam.name.replace(' ⭐', '')}</p>
                <p className="text-[11px] text-violet-600 font-bold mt-0.5">{count} questions →</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══ SECTION 4: BROWSE ALL EXAMS ═══ */}
      <div>
        <button onClick={() => setShowAllExams(!showAllExams)}
          className="flex items-center justify-between w-full mb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-600" />
            <h2 className="text-sm font-bold text-gray-800">Browse All {entranceExams.length} Exams</h2>
          </div>
          {showAllExams ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>

        {showAllExams && (
          <div className="space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search exams..." value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setActiveCategory('all'); }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-emerald-400 focus:ring-0 outline-none" />
            </div>

            {/* Category filters — WORKING */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
              <button onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className={cn("flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border-2 transition-all",
                  activeCategory === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200')}>
                📅 All
              </button>
              {examCategories.map(cat => (
                <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                  className={cn("flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border-2 transition-all",
                    activeCategory === cat.id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200')}>
                  <span>{cat.icon}</span> {cat.label}
                </button>
              ))}
            </div>

            {/* Exam list */}
            <div className="space-y-2">
              {filteredAllExams.map(exam => {
                const isViewing = viewingExam === exam.id;
                const catInfo = examCategories.find(c => c.id === exam.category);
                const hasPractice = !!examPracticeQuestions[exam.id];
                const isMyExam = myExamId === exam.id;

                return (
                  <div key={exam.id} className={cn("bg-white rounded-xl border overflow-hidden", isMyExam ? 'border-emerald-300' : 'border-gray-200')}>
                    <button onClick={() => setViewingExam(isViewing ? null : exam.id)}
                      className="w-full p-3.5 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors">
                      <span className="text-lg">{catInfo?.icon || '📝'}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-bold text-gray-900">{exam.name.replace(' ⭐', '')}</p>
                          {isMyExam && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">⭐ Target</span>}
                          {hasPractice && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700">{examPracticeQuestions[exam.id]?.length}Q</span>}
                        </div>
                        <p className="text-[10px] text-gray-500 mt-0.5">{exam.importantDates.examDate}</p>
                      </div>
                      {isViewing ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>
                    {isViewing && (
                      <div className="border-t border-gray-100 p-4">
                        {renderExamDetail(exam, true)}
                      </div>
                    )}
                  </div>
                );
              })}
              {filteredAllExams.length === 0 && (
                <p className="text-center text-xs text-gray-500 py-8">No exams found for "{searchQuery}"</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
