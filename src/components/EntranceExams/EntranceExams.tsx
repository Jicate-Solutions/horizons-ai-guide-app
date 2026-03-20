import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, BookOpen, Clock, Calendar, ExternalLink, ChevronDown, ChevronUp,
  ChevronRight, Target, Bell, FileText, Star, MapPin, IndianRupee, Building2
} from 'lucide-react';
import { ExamCard } from './ExamCard';
import { examCategories, entranceExams, getExamsByCategory } from './examData';
import { examPracticeQuestions } from './practiceQuestionsData';
import { PracticeQuestions } from './PracticeQuestions';
import { ExamCategory } from './types';
import { cn } from '@/lib/utils';

const MY_EXAM_KEY = 'vzk_my_target_exam';

// Popular exams students are most likely targeting
const popularExams = ['neet-ug', 'jee-main', 'tnea', 'clat', 'jee-advanced', 'viteee', 'srmjeee', 'bitsat', 'cuet', 'ca-cs-cma-foundation'];

export const EntranceExams = () => {
  const navigate = useNavigate();
  const [myExamId, setMyExamId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<ExamCategory>('engineering');
  const [expandedExam, setExpandedExam] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllExams, setShowAllExams] = useState(false);
  const [practiceExam, setPracticeExam] = useState<string | null>(null);

  // Load saved exam
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

  const filteredExams = useMemo(() => {
    let exams = getExamsByCategory(activeCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      exams = entranceExams.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.fullForm.toLowerCase().includes(q) ||
        e.tamilName.toLowerCase().includes(q)
      );
    }
    return exams;
  }, [activeCategory, searchQuery]);

  // Practice questions for an exam
  const practiceQs = practiceExam ? examPracticeQuestions[practiceExam] : null;

  // If practicing
  if (practiceExam && practiceQs) {
    const examName = entranceExams.find(e => e.id === practiceExam)?.name || '';
    return (
      <div className="space-y-4">
        <button onClick={() => setPracticeExam(null)} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
          ← Back to Exams
        </button>
        <PracticeQuestions questions={practiceQs} examName={examName} />
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* ═══ MY TARGET EXAM ═══ */}
      {myExam ? (
        <div className="bg-white rounded-2xl border-2 border-emerald-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">My Target Exam</p>
              <button onClick={() => { setMyExamId(null); localStorage.removeItem(MY_EXAM_KEY); }} className="text-[10px] text-gray-400 hover:text-gray-600">Change</button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-2xl shadow-md">
                {examCategories.find(c => c.id === myExam.category)?.icon || '📝'}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">{myExam.name}</h2>
                <p className="text-xs text-gray-500">{myExam.fullForm}</p>
              </div>
            </div>
          </div>

          {/* Key info strip */}
          <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100">
            <div className="p-3 text-center">
              <Calendar className="w-3.5 h-3.5 text-gray-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-gray-800">{myExam.importantDates.examDate}</p>
              <p className="text-[9px] text-gray-400">Exam Date</p>
            </div>
            <div className="p-3 text-center">
              <Clock className="w-3.5 h-3.5 text-gray-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-gray-800">{myExam.duration}</p>
              <p className="text-[9px] text-gray-400">Duration</p>
            </div>
            <div className="p-3 text-center">
              <FileText className="w-3.5 h-3.5 text-gray-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-gray-800">{myExam.examMode.split('(')[0].trim()}</p>
              <p className="text-[9px] text-gray-400">Mode</p>
            </div>
          </div>

          {/* Quick actions */}
          <div className="p-3 border-t border-gray-100 grid grid-cols-3 gap-2">
            <button onClick={() => navigate('/syllabus-tracker')}
              className="bg-emerald-50 rounded-xl p-2.5 text-center border border-emerald-200 hover:bg-emerald-100 transition-colors">
              <BookOpen className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-emerald-700">Track Syllabus</p>
            </button>
            <button onClick={() => navigate('/exam-alerts')}
              className="bg-red-50 rounded-xl p-2.5 text-center border border-red-200 hover:bg-red-100 transition-colors">
              <Bell className="w-4 h-4 text-red-600 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-red-700">Exam Alerts</p>
            </button>
            <button onClick={() => myExam.officialWebsite && window.open(myExam.officialWebsite, '_blank')}
              className="bg-blue-50 rounded-xl p-2.5 text-center border border-blue-200 hover:bg-blue-100 transition-colors">
              <ExternalLink className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-blue-700">Official Site</p>
            </button>
          </div>
        </div>
      ) : (
        /* ═══ PICK YOUR EXAM ═══ */
        <div className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xl shadow-md">🎯</div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Which exam are you preparing for?</h2>
              <p className="text-xs text-gray-500">Select your target exam for a personalised view</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularExams.map(id => {
              const exam = entranceExams.find(e => e.id === id);
              if (!exam) return null;
              return (
                <button key={id} onClick={() => selectMyExam(id)}
                  className="px-3 py-2 rounded-xl border-2 border-gray-200 bg-gray-50 hover:border-emerald-400 hover:bg-emerald-50 transition-all text-xs font-bold text-gray-700">
                  {exam.name.replace(' ⭐', '')}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══ PRACTICE QUESTIONS ═══ */}
      {(() => {
        const examsWithPractice = Object.keys(examPracticeQuestions).map(id => {
          const exam = entranceExams.find(e => e.id === id);
          const qs = examPracticeQuestions[id];
          return exam && qs ? { exam, count: qs.length } : null;
        }).filter(Boolean) as { exam: typeof entranceExams[0]; count: number }[];

        if (examsWithPractice.length === 0) return null;

        return (
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Target className="w-4 h-4 text-violet-600" />
              <h2 className="text-sm font-bold text-gray-800">Practice Questions</h2>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {examsWithPractice.map(({ exam, count }) => (
                <button key={exam.id} onClick={() => setPracticeExam(exam.id)}
                  className="flex-shrink-0 bg-white rounded-xl px-4 py-3 border-2 border-gray-100 hover:border-violet-400 hover:shadow-md transition-all text-left min-w-[140px]">
                  <p className="text-sm font-bold text-gray-800">{exam.name.replace(' ⭐', '')}</p>
                  <p className="text-xs text-violet-600 font-bold mt-0.5">{count} questions</p>
                </button>
              ))}
            </div>
          </div>
        );
      })()}

      {/* ═══ BROWSE ALL EXAMS ═══ */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-600" />
            <h2 className="text-sm font-bold text-gray-800">All Exams ({entranceExams.length})</h2>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search exams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 transition-colors"
          />
        </div>

        {/* Category tabs */}
        {!searchQuery && (
          <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-1 px-1 mb-3">
            {examCategories.map(cat => {
              const count = getExamsByCategory(cat.id).length;
              return (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={cn("flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border-2",
                    activeCategory === cat.id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400')}>
                  <span>{cat.icon}</span> {cat.label} <span className="text-[9px] opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Exam list */}
        <div className="space-y-2">
          {filteredExams.map((exam) => {
            const isExpanded = expandedExam === exam.id;
            const hasPractice = !!examPracticeQuestions[exam.id];

            return (
              <div key={exam.id} className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden transition-all hover:border-gray-300">
                {/* Compact header */}
                <button onClick={() => setExpandedExam(isExpanded ? null : exam.id)}
                  className="w-full p-3.5 flex items-center gap-3 text-left">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-gray-900">{exam.name}</p>
                      {hasPractice && <span className="text-[9px] font-bold bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded">Practice</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{exam.fullForm}</p>
                  </div>
                  <div className="text-right flex-shrink-0 mr-1">
                    <p className="text-[10px] text-gray-400">{exam.importantDates.examDate}</p>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-4 space-y-3 bg-gray-50">
                    {/* Key info */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white rounded-lg p-2.5 border border-gray-200">
                        <p className="text-[9px] text-gray-400 uppercase">Conducting Body</p>
                        <p className="text-xs font-bold text-gray-800">{exam.conductingBody}</p>
                      </div>
                      <div className="bg-white rounded-lg p-2.5 border border-gray-200">
                        <p className="text-[9px] text-gray-400 uppercase">Mode & Duration</p>
                        <p className="text-xs font-bold text-gray-800">{exam.examMode.split('(')[0].trim()}</p>
                        <p className="text-[10px] text-gray-500">{exam.duration}</p>
                      </div>
                    </div>

                    {/* Syllabus */}
                    <div>
                      <p className="text-xs font-bold text-gray-700 mb-1.5">📋 Syllabus & Pattern</p>
                      <div className="space-y-1">
                        {exam.syllabus.map((s, i) => (
                          <p key={i} className="text-xs text-gray-600 leading-relaxed bg-white rounded-lg px-3 py-2 border border-gray-100">{s}</p>
                        ))}
                      </div>
                    </div>

                    {/* Eligibility */}
                    <div>
                      <p className="text-xs font-bold text-gray-700 mb-1.5">✅ Eligibility</p>
                      <div className="space-y-1">
                        {exam.eligibility.map((e, i) => (
                          <p key={i} className="text-xs text-gray-600 bg-white rounded-lg px-3 py-2 border border-gray-100">{e}</p>
                        ))}
                      </div>
                    </div>

                    {/* TN specific */}
                    <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                      <p className="text-xs font-bold text-emerald-700 mb-0.5">🏛️ For Tamil Nadu Students</p>
                      <p className="text-xs text-emerald-600">{exam.tnEligibility}</p>
                    </div>

                    {/* Dates & Fees */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white rounded-lg p-2.5 border border-gray-200 text-center">
                        <p className="text-[9px] text-gray-400">Registration</p>
                        <p className="text-[10px] font-bold text-gray-700">{exam.importantDates.registration}</p>
                      </div>
                      <div className="bg-white rounded-lg p-2.5 border border-gray-200 text-center">
                        <p className="text-[9px] text-gray-400">Exam</p>
                        <p className="text-[10px] font-bold text-gray-700">{exam.importantDates.examDate}</p>
                      </div>
                      <div className="bg-white rounded-lg p-2.5 border border-gray-200 text-center">
                        <p className="text-[9px] text-gray-400">Fee (Gen)</p>
                        <p className="text-[10px] font-bold text-gray-700">{exam.applicationFee.general}</p>
                      </div>
                    </div>

                    {/* TN Colleges */}
                    {exam.tnCollegesAccepting.length > 0 && (
                      <div>
                        <p className="text-xs font-bold text-gray-700 mb-1.5">🏫 Colleges Accepting</p>
                        <div className="flex flex-wrap gap-1.5">
                          {exam.tnCollegesAccepting.map((c, i) => (
                            <span key={i} className="text-[10px] bg-white px-2.5 py-1 rounded-full border border-gray-200 text-gray-600">{c}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button onClick={() => selectMyExam(exam.id)}
                        className="flex-1 bg-emerald-600 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1">
                        <Star className="w-3.5 h-3.5" /> Set as My Exam
                      </button>
                      {exam.officialWebsite && (
                        <button onClick={() => window.open(exam.officialWebsite, '_blank')}
                          className="px-4 bg-white border-2 border-gray-200 text-gray-700 text-xs font-bold py-2.5 rounded-xl hover:border-gray-400 transition-colors flex items-center gap-1">
                          <ExternalLink className="w-3.5 h-3.5" /> Website
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredExams.length === 0 && (
          <div className="text-center py-8">
            <p className="text-2xl mb-2">🔍</p>
            <p className="text-sm text-gray-500">No exams found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};
