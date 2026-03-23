import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, BookOpen, Clock, Calendar, ExternalLink, ChevronDown, ChevronUp,
  Target, Bell, FileText, Star, Zap, ArrowLeft, GraduationCap, BarChart3,
  ClipboardList, Layers, Globe, CheckCircle2
} from 'lucide-react';
import { examCategories, entranceExams } from './examData';
import { examPracticeQuestions } from './practiceQuestionsData';
import { questionBank } from '@/data/questionBank';
import { PracticeQuestions } from './PracticeQuestions';
import { EntranceExam } from './types';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

// Stream detection
const streamMap: Record<string, { ids: string[]; label: string; emoji: string; examKey: string }> = {
  science_maths: { ids: ['tnea','jee-main','jee-advanced','bitsat','viteee','srmjeee','comedk','cuet'], label: 'Science (Maths)', emoji: '⚙️', examKey: 'jee' },
  science_bio: { ids: ['neet-ug','tn-neet-counselling','jipmer-puducherry','bds-dental','bsc-nursing','bpharm','tnau','allied-health'], label: 'Science (Bio)', emoji: '🏥', examKey: 'neet' },
  commerce: { ids: ['ca-cs-cma-foundation','cuet','clat','tndalu','bba-bca-bcom-direct','ipm-iim','set-symbiosis'], label: 'Commerce', emoji: '📊', examKey: 'clat' },
  arts: { ids: ['clat','tndalu','ailet','lsat-india','slat','cuet','bba-bca-bcom-direct'], label: 'Arts', emoji: '📖', examKey: 'clat' },
  default: { ids: ['neet-ug','tnea','jee-main','clat','cuet','ca-cs-cma-foundation'], label: 'Student', emoji: '🎓', examKey: 'neet' },
};

const detectStream = (raw: string): string => {
  if (!raw) return 'default';
  const s = raw.toLowerCase();
  if (s.includes('maths') || s.includes('pcm') || s.includes('engineering')) return 'science_maths';
  if (s.includes('bio') || s.includes('pcb') || s.includes('medical')) return 'science_bio';
  if (s.includes('commerce') || s.includes('business')) return 'commerce';
  if (s.includes('arts') || s.includes('humanities')) return 'arts';
  return 'default';
};

// Progress
export const EntranceExams = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'study' | 'exams' | 'all'>('study');
  const [openExam, setOpenExam] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [searchQ, setSearchQ] = useState('');
  const [filterCat, setFilterCat] = useState('all');

  const meta = user?.user_metadata || {};
  const stream = detectStream(meta.stream || '');
  const config = streamMap[stream] || streamMap.default;
  const topExams = config.ids.map(id => entranceExams.find(e => e.id === id)).filter(Boolean) as EntranceExam[];

  // Filtered exams for All tab
  const allFiltered = useMemo(() => {
    let list = [...entranceExams];
    if (filterCat !== 'all') list = list.filter(e => e.category === filterCat);
    if (searchQ) { const q = searchQ.toLowerCase(); list = list.filter(e => (e.name + e.fullForm + e.tamilName).toLowerCase().includes(q)); }
    return list;
  }, [filterCat, searchQ]);

  // Exam card
  const ExamCard = ({ exam }: { exam: EntranceExam }) => {
    const isOpen = openExam === exam.id;
    const catObj = examCategories.find(c => c.id === exam.category);
    return (
      <div className={cn("bg-white rounded-2xl border overflow-hidden transition-all", isOpen ? 'border-emerald-300 shadow-md' : 'border-gray-200')}>
        <button onClick={() => { setOpenExam(isOpen ? null : exam.id); setOpenSection(null); }}
          className="w-full p-4 text-left flex items-center gap-3 hover:bg-gray-50">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">{catObj?.icon || '📝'}</div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-gray-900 leading-tight">{exam.name.replace(' ⭐', '')}</p>
            <p className="text-[11px] text-gray-500 mt-0.5 truncate">{exam.fullForm}</p>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-[10px] text-gray-400">{exam.importantDates.examDate}</span>
            {isOpen ? <ChevronUp className="w-4 h-4 text-gray-300" /> : <ChevronDown className="w-4 h-4 text-gray-300" />}
          </div>
        </button>
        {isOpen && (
          <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-3">
            <div className="grid grid-cols-4 gap-1.5">
              {[{ l: 'Mode', v: exam.examMode.split('(')[0].trim() }, { l: 'Duration', v: exam.duration }, { l: 'Fee', v: exam.applicationFee.general }, { l: 'Result', v: exam.importantDates.resultDate }].map(i => (
                <div key={i.l} className="bg-gray-50 rounded-lg p-2 text-center"><p className="text-[9px] text-gray-400">{i.l}</p><p className="text-[11px] font-bold text-gray-800 mt-0.5">{i.v}</p></div>
              ))}
            </div>
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
              <p className="text-[10px] font-bold text-emerald-700 mb-0.5">🏛️ Tamil Nadu</p>
              <p className="text-[11px] text-emerald-600 leading-relaxed">{exam.tnEligibility}</p>
            </div>
            {[{ key: 'syl', label: '📚 Syllabus', items: exam.syllabus }, { key: 'elig', label: '✅ Eligibility', items: exam.eligibility }, { key: 'col', label: `🏫 Colleges (${exam.tnCollegesAccepting.length})`, items: exam.tnCollegesAccepting }].filter(s => s.items.length > 0).map(section => (
              <div key={section.key} className="border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setOpenSection(openSection === `${exam.id}-${section.key}` ? null : `${exam.id}-${section.key}`)}
                  className="w-full px-3 py-2 text-left flex items-center justify-between hover:bg-gray-50">
                  <p className="text-[11px] font-bold text-gray-700">{section.label}</p>
                  {openSection === `${exam.id}-${section.key}` ? <ChevronUp className="w-3 h-3 text-gray-400" /> : <ChevronDown className="w-3 h-3 text-gray-400" />}
                </button>
                {openSection === `${exam.id}-${section.key}` && (
                  <div className="px-3 pb-2.5 border-t border-gray-100 pt-2 space-y-1">
                    {section.items.map((item, i) => <p key={i} className="text-[11px] text-gray-600">{section.key === 'col' ? `🎓 ${item}` : `• ${item}`}</p>)}
                  </div>
                )}
              </div>
            ))}
            <button onClick={() => exam.officialWebsite && window.open(exam.officialWebsite, '_blank')}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 text-[11px] font-bold hover:border-gray-400">
              <ExternalLink className="w-3.5 h-3.5" /> Official Website
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* ═══ TAB BAR ═══ */}
      <div className="flex gap-2">
        <button onClick={() => setActiveTab('study')}
          className={cn("flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold transition-all border-2",
            activeTab === 'study' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200')}>
          <Layers className="w-4 h-4" /> Study Material
        </button>
        <button onClick={() => setActiveTab('exams')}
          className={cn("flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold transition-all border-2",
            activeTab === 'exams' ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-200' : 'bg-amber-50 text-amber-700 border-amber-200')}>
          <Star className="w-4 h-4" /> My Exams
        </button>
        <button onClick={() => setActiveTab('all')}
          className={cn("flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold transition-all border-2",
            activeTab === 'all' ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200')}>
          <Globe className="w-4 h-4" /> All Exams
        </button>
      </div>

      {/* ═══ STUDY MATERIAL TAB — Topic-wise learning ═══ */}
      {activeTab === 'study' && (
        <div className="space-y-4">
          {/* Hero */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-1"><Layers className="w-5 h-5 text-indigo-200" /><p className="text-lg font-bold">Study Material</p></div>
            <p className="text-xs text-indigo-100 mt-1">Study + Practice + PYQ — everything topic-wise in one place</p>
          </div>

          {/* PRIMARY: Topic Hub */}
          <button onClick={() => navigate('/topic-hub')}
            className="w-full bg-white rounded-2xl p-5 border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-xl transition-all text-left active:scale-[0.98] group">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">📚</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-base font-bold text-gray-900">Topic Hub</p>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">START HERE</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">Pick chapter → Study concepts → Practice questions → Solve PYQ → Track progress</p>
                <div className="flex items-center gap-3 mt-2 text-[10px]">
                  <span className="text-indigo-600 font-bold">📖 187 chapters</span>
                  <span className="text-violet-600 font-bold">📝 {totalQB}+ questions</span>
                  <span className="text-amber-600 font-bold">📜 PYQ</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
            </div>
          </button>

          {/* Individual tools */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Individual Tools</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: '📖', label: 'Study Guide', route: '/study-guide', color: 'text-indigo-600' },
                { icon: '📝', label: 'Question Bank', route: '/question-bank', color: 'text-violet-600' },
                { icon: '📊', label: 'Syllabus Tracker', route: '/syllabus-tracker', color: 'text-emerald-600' },
                { icon: '🔔', label: 'Exam Alerts', route: '/exam-alerts', color: 'text-red-600' },
                { icon: '📜', label: 'PYQ Practice', route: '/career-assessment/colleges/pyq', color: 'text-amber-600' },
                { icon: '🎯', label: 'Rank Predictor', route: '/rank-predictor', color: 'text-sky-600' },
              ].map(tool => (
                <button key={tool.label} onClick={() => navigate(tool.route)}
                  className="bg-white rounded-xl p-3 border border-gray-200 hover:border-gray-400 transition-all text-center active:scale-[0.97]">
                  <span className="text-lg">{tool.icon}</span>
                  <p className={cn("text-[10px] font-bold mt-1", tool.color)}>{tool.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ MY EXAMS TAB ═══ */}
      {activeTab === 'exams' && (
        <div className="space-y-3">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">{config.emoji}</div>
              <div><p className="text-base font-bold">Exams for {config.label}</p><p className="text-[11px] text-amber-100">{topExams.length} recommended · Tap for details</p></div>
            </div>
          </div>
          <div className="space-y-2">{topExams.map(exam => <ExamCard key={exam.id} exam={exam} />)}</div>
          <button onClick={() => setActiveTab('all')} className="w-full py-3 rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 text-xs font-bold text-gray-500">Browse all {entranceExams.length} exams →</button>
        </div>
      )}

      {/* ═══ ALL EXAMS TAB ═══ */}
      {activeTab === 'all' && (
        <div className="space-y-3">
          <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 mb-1"><Globe className="w-5 h-5 text-emerald-200" /><p className="text-base font-bold">All {entranceExams.length} Exams</p></div>
            <p className="text-[11px] text-emerald-100">Medical · Engineering · Law · Commerce · Defence · Agriculture</p>
          </div>
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search exams..." value={searchQ} onChange={e => { setSearchQ(e.target.value); setFilterCat('all'); }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-emerald-400 focus:ring-0 outline-none bg-white" /></div>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            <button onClick={() => { setFilterCat('all'); setSearchQ(''); }} className={cn("px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap border-2", filterCat === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200')}>All</button>
            {examCategories.map(cat => (<button key={cat.id} onClick={() => { setFilterCat(cat.id); setSearchQ(''); }} className={cn("flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap border-2", filterCat === cat.id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200')}>{cat.icon} {cat.label}</button>))}
          </div>
          <div className="space-y-2">{allFiltered.map(exam => <ExamCard key={exam.id} exam={exam} />)}{allFiltered.length === 0 && <p className="text-center py-10 text-sm text-gray-400">No exams found</p>}</div>
        </div>
      )}
    </div>
  );
};
