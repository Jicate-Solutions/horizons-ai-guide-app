import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, BookOpen, Clock, Calendar, ExternalLink, ChevronDown, ChevronUp,
  Target, Bell, FileText, Star, Zap, ArrowLeft, IndianRupee, Building2
} from 'lucide-react';
import { examCategories, entranceExams } from './examData';
import { examPracticeQuestions } from './practiceQuestionsData';
import { PracticeQuestions } from './PracticeQuestions';
import { EntranceExam } from './types';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

// ═══ STREAM → TOP EXAMS (ordered by importance) ═══
const streamTopExams: Record<string, { ids: string[]; label: string }> = {
  science_maths: { ids: ['tnea', 'jee-main', 'jee-advanced', 'bitsat', 'viteee', 'srmjeee', 'comedk', 'cuet'], label: 'Science (Maths)' },
  science_bio: { ids: ['neet-ug', 'tn-neet-counselling', 'jipmer-puducherry', 'bds-dental', 'bsc-nursing', 'bpharm', 'tnau', 'allied-health'], label: 'Science (Bio)' },
  commerce: { ids: ['ca-cs-cma-foundation', 'cuet', 'clat', 'tndalu', 'bba-bca-bcom-direct', 'ipm-iim', 'set-symbiosis'], label: 'Commerce' },
  arts: { ids: ['clat', 'tndalu', 'ailet', 'lsat-india', 'slat', 'cuet', 'bba-bca-bcom-direct'], label: 'Arts' },
  default: { ids: ['neet-ug', 'tnea', 'jee-main', 'clat', 'cuet', 'ca-cs-cma-foundation'], label: 'Student' },
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
  const [openExam, setOpenExam] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [practiceExam, setPracticeExam] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [filterCat, setFilterCat] = useState<string>('all');

  const meta = user?.user_metadata || {};
  const stream = detectStream(meta.stream || '');
  const streamConfig = streamTopExams[stream] || streamTopExams.default;
  const topExams = streamConfig.ids.map(id => entranceExams.find(e => e.id === id)).filter(Boolean) as EntranceExam[];

  // Practice mode
  const practiceQs = practiceExam ? examPracticeQuestions[practiceExam] : null;
  if (practiceExam && practiceQs) {
    const name = entranceExams.find(e => e.id === practiceExam)?.name || '';
    return (
      <div className="space-y-4">
        <button onClick={() => setPracticeExam(null)} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <PracticeQuestions questions={practiceQs} examName={name} />
      </div>
    );
  }

  // Filtered exams for "All Exams"
  const allFiltered = useMemo(() => {
    let list = [...entranceExams];
    if (filterCat !== 'all') list = list.filter(e => e.category === filterCat);
    if (searchQ) {
      const q = searchQ.toLowerCase();
      list = list.filter(e => (e.name + e.fullForm + e.tamilName).toLowerCase().includes(q));
    }
    return list;
  }, [filterCat, searchQ]);

  // Render one exam card
  const ExamCard = ({ exam, highlight }: { exam: EntranceExam; highlight?: boolean }) => {
    const isOpen = openExam === exam.id;
    const catIcon = examCategories.find(c => c.id === exam.category)?.icon || '📝';
    const pCount = examPracticeQuestions[exam.id]?.length || 0;

    return (
      <div className={cn("bg-white rounded-2xl border-2 overflow-hidden transition-all",
        highlight ? 'border-emerald-200 shadow-sm' : 'border-gray-100',
        isOpen && 'shadow-md')}>

        {/* Card header — tap to expand */}
        <button onClick={() => { setOpenExam(isOpen ? null : exam.id); setOpenSection(null); }}
          className="w-full p-4 text-left flex items-center gap-3">
          <span className="text-2xl flex-shrink-0">{catIcon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 leading-tight">{exam.name.replace(' ⭐', '')}</p>
            <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">{exam.fullForm}</p>
            <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-400">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {exam.importantDates.examDate}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {exam.duration}</span>
              {pCount > 0 && <span className="font-bold text-violet-600">{pCount}Q</span>}
            </div>
          </div>
          {isOpen ? <ChevronUp className="w-5 h-5 text-gray-300 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-300 flex-shrink-0" />}
        </button>

        {/* Expanded detail */}
        {isOpen && (
          <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-3">

            {/* Quick info row */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-50 rounded-lg py-2 px-1">
                <p className="text-[10px] text-gray-400">Mode</p>
                <p className="text-xs font-bold text-gray-800 mt-0.5">{exam.examMode.split('(')[0].trim()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg py-2 px-1">
                <p className="text-[10px] text-gray-400">Fee (Gen)</p>
                <p className="text-xs font-bold text-gray-800 mt-0.5">{exam.applicationFee.general}</p>
              </div>
              <div className="bg-gray-50 rounded-lg py-2 px-1">
                <p className="text-[10px] text-gray-400">Result</p>
                <p className="text-xs font-bold text-gray-800 mt-0.5">{exam.importantDates.resultDate}</p>
              </div>
            </div>

            {/* TN info — always visible, most important */}
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
              <p className="text-[10px] font-bold text-emerald-700">🏛️ For Tamil Nadu Students</p>
              <p className="text-xs text-emerald-600 mt-0.5">{exam.tnEligibility}</p>
            </div>

            {/* Expandable sections — clean, one at a time */}
            {[
              { key: 'syl', label: '📚 Syllabus', items: exam.syllabus },
              { key: 'elig', label: '✅ Eligibility', items: exam.eligibility },
              { key: 'col', label: `🏫 Colleges (${exam.tnCollegesAccepting.length})`, items: exam.tnCollegesAccepting },
            ].filter(s => s.items.length > 0).map(section => (
              <div key={section.key} className="border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setOpenSection(openSection === `${exam.id}-${section.key}` ? null : `${exam.id}-${section.key}`)}
                  className="w-full px-3 py-2.5 text-left flex items-center justify-between hover:bg-gray-50">
                  <p className="text-xs font-bold text-gray-700">{section.label}</p>
                  {openSection === `${exam.id}-${section.key}` ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
                </button>
                {openSection === `${exam.id}-${section.key}` && (
                  <div className="px-3 pb-3 border-t border-gray-100 pt-2 space-y-1">
                    {section.items.map((item, i) => (
                      <p key={i} className="text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2 leading-relaxed">{section.key === 'col' ? `🎓 ${item}` : `• ${item}`}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* 2-3 clear action buttons */}
            <div className="space-y-2 pt-1">
              <div className="flex gap-2">
                {pCount > 0 && (
                  <button onClick={() => setPracticeExam(exam.id)}
                    className="flex-1 py-2.5 rounded-xl bg-violet-600 text-white text-xs font-bold flex items-center justify-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> Practice {pCount} Questions
                  </button>
                )}
                <button onClick={() => exam.officialWebsite && window.open(exam.officialWebsite, '_blank')}
                  className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 text-xs font-bold flex items-center justify-center gap-1.5 hover:border-gray-400">
                  <ExternalLink className="w-3.5 h-3.5" /> Apply / Official Site
                </button>
              </div>
              <div className="flex gap-2">
                <button onClick={() => navigate('/study-guide')}
                  className="flex-1 py-2 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold flex items-center justify-center gap-1">
                  <BookOpen className="w-3 h-3" /> Study Guide
                </button>
                <button onClick={() => navigate('/question-bank')}
                  className="flex-1 py-2 rounded-lg bg-violet-50 border border-violet-200 text-violet-700 text-[11px] font-bold flex items-center justify-center gap-1">
                  <BookOpen className="w-3 h-3" /> Question Bank
                </button>
                <button onClick={() => navigate('/syllabus-tracker')}
                  className="flex-1 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold flex items-center justify-center gap-1">
                  <Target className="w-3 h-3" /> Track
                </button>
                <button onClick={() => navigate('/exam-alerts')}
                  className="flex-1 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[11px] font-bold flex items-center justify-center gap-1">
                  <Bell className="w-3 h-3" /> Dates
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-5">

      {/* ═══ YOUR EXAMS — based on stream ═══ */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Star className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-bold text-gray-800">Exams for {streamConfig.label}</h2>
        </div>
        <p className="text-[11px] text-gray-500 mb-3">Tap any exam to see full details</p>

        <div className="space-y-2">
          {topExams.map(exam => (
            <ExamCard key={exam.id} exam={exam} highlight />
          ))}
        </div>
      </div>

      {/* ═══ ALL EXAMS ═══ */}
      <div>
        <button onClick={() => setShowAll(!showAll)}
          className="w-full flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-500" />
            <p className="text-sm font-bold text-gray-800">All {entranceExams.length} Exams</p>
          </div>
          {showAll ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>

        {showAll && (
          <div className="space-y-3 mt-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search exams..." value={searchQ}
                onChange={e => { setSearchQ(e.target.value); setFilterCat('all'); }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-emerald-400 focus:ring-0 outline-none" />
            </div>

            {/* Category filter */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
              <button onClick={() => { setFilterCat('all'); setSearchQ(''); }}
                className={cn("px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border-2 transition-all",
                  filterCat === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200')}>
                All
              </button>
              {examCategories.map(cat => (
                <button key={cat.id} onClick={() => { setFilterCat(cat.id); setSearchQ(''); }}
                  className={cn("flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border-2 transition-all",
                    filterCat === cat.id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200')}>
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>

            {/* Exam list */}
            <div className="space-y-2">
              {allFiltered.map(exam => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
              {allFiltered.length === 0 && (
                <p className="text-center text-xs text-gray-400 py-8">No exams found</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
