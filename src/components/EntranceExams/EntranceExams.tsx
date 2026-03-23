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
const streamTopExams: Record<string, { ids: string[]; label: string; emoji: string }> = {
  science_maths: { ids: ['tnea','jee-main','jee-advanced','bitsat','viteee','srmjeee','comedk','cuet'], label: 'Science (Maths)', emoji: '⚙️' },
  science_bio: { ids: ['neet-ug','tn-neet-counselling','jipmer-puducherry','bds-dental','bsc-nursing','bpharm','tnau','allied-health'], label: 'Science (Bio)', emoji: '🏥' },
  commerce: { ids: ['ca-cs-cma-foundation','cuet','clat','tndalu','bba-bca-bcom-direct','ipm-iim','set-symbiosis'], label: 'Commerce', emoji: '📊' },
  arts: { ids: ['clat','tndalu','ailet','lsat-india','slat','cuet','bba-bca-bcom-direct'], label: 'Arts', emoji: '📖' },
  default: { ids: ['neet-ug','tnea','jee-main','clat','cuet','ca-cs-cma-foundation'], label: 'Student', emoji: '🎓' },
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

export const EntranceExams = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'hub' | 'exams' | 'all'>('hub');
  const [openExam, setOpenExam] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [practiceExam, setPracticeExam] = useState<string | null>(null);
  const [searchQ, setSearchQ] = useState('');
  const [filterCat, setFilterCat] = useState('all');

  const meta = user?.user_metadata || {};
  const stream = detectStream(meta.stream || '');
  const config = streamTopExams[stream] || streamTopExams.default;
  const topExams = config.ids.map(id => entranceExams.find(e => e.id === id)).filter(Boolean) as EntranceExam[];

  // Practice mode
  const practiceQs = practiceExam ? examPracticeQuestions[practiceExam] : null;
  if (practiceExam && practiceQs) {
    return (
      <div className="space-y-4">
        <button onClick={() => setPracticeExam(null)} className="text-sm text-gray-500 flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Back</button>
        <PracticeQuestions questions={practiceQs} examName={entranceExams.find(e => e.id === practiceExam)?.name || ''} />
      </div>
    );
  }

  // Question bank total
  const totalQB = Object.values(questionBank).reduce((sum, qs) => sum + qs.length, 0);

  // Filtered exams
  const allFiltered = useMemo(() => {
    let list = [...entranceExams];
    if (filterCat !== 'all') list = list.filter(e => e.category === filterCat);
    if (searchQ) { const q = searchQ.toLowerCase(); list = list.filter(e => (e.name + e.fullForm + e.tamilName).toLowerCase().includes(q)); }
    return list;
  }, [filterCat, searchQ]);

  // Tab navigation managed by activeTab state

  // ═══ EXAM CARD COMPONENT ═══
  const ExamCard = ({ exam }: { exam: EntranceExam }) => {
    const isOpen = openExam === exam.id;
    const catObj = examCategories.find(c => c.id === exam.category);
    const pCount = examPracticeQuestions[exam.id]?.length || 0;

    return (
      <div className={cn("bg-white rounded-2xl border overflow-hidden transition-all", isOpen ? 'border-emerald-300 shadow-md' : 'border-gray-200')}>
        <button onClick={() => { setOpenExam(isOpen ? null : exam.id); setOpenSection(null); }}
          className="w-full p-4 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors">
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
            {/* Quick info grid */}
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { label: 'Mode', value: exam.examMode.split('(')[0].trim() },
                { label: 'Duration', value: exam.duration },
                { label: 'Fee', value: exam.applicationFee.general },
                { label: 'Result', value: exam.importantDates.resultDate },
              ].map(item => (
                <div key={item.label} className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="text-[9px] text-gray-400 leading-tight">{item.label}</p>
                  <p className="text-[11px] font-bold text-gray-800 mt-0.5 leading-tight">{item.value}</p>
                </div>
              ))}
            </div>

            {/* TN info */}
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
              <p className="text-[10px] font-bold text-emerald-700 mb-0.5">🏛️ Tamil Nadu</p>
              <p className="text-[11px] text-emerald-600 leading-relaxed">{exam.tnEligibility}</p>
            </div>

            {/* Expandable sections */}
            <div className="space-y-1.5">
              {[
                { key: 'syl', label: '📚 Syllabus', items: exam.syllabus },
                { key: 'elig', label: '✅ Eligibility', items: exam.eligibility },
                { key: 'col', label: `🏫 Colleges (${exam.tnCollegesAccepting.length})`, items: exam.tnCollegesAccepting },
              ].filter(s => s.items.length > 0).map(section => (
                <div key={section.key} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => setOpenSection(openSection === `${exam.id}-${section.key}` ? null : `${exam.id}-${section.key}`)}
                    className="w-full px-3 py-2 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <p className="text-[11px] font-bold text-gray-700">{section.label}</p>
                    {openSection === `${exam.id}-${section.key}` ? <ChevronUp className="w-3 h-3 text-gray-400" /> : <ChevronDown className="w-3 h-3 text-gray-400" />}
                  </button>
                  {openSection === `${exam.id}-${section.key}` && (
                    <div className="px-3 pb-2.5 border-t border-gray-100 pt-2 space-y-1">
                      {section.items.map((item, i) => (
                        <p key={i} className="text-[11px] text-gray-600 leading-relaxed">{section.key === 'col' ? `🎓 ${item}` : `• ${item}`}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {pCount > 0 && (
                <button onClick={() => setPracticeExam(exam.id)}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-violet-600 text-white text-[11px] font-bold hover:bg-violet-700 transition-colors">
                  <Zap className="w-3.5 h-3.5" /> Practice {pCount}Q
                </button>
              )}
              <button onClick={() => exam.officialWebsite && window.open(exam.officialWebsite, '_blank')}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 text-[11px] font-bold hover:border-gray-400 transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Official Site
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* ═══ TAB BAR — Each tab has distinct color ═══ */}
      <div className="flex gap-2">
        <button onClick={() => setActiveTab('hub')}
          className={cn("flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold transition-all border-2",
            activeTab === 'hub' 
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200' 
              : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:border-indigo-400')}>
          <Layers className="w-4 h-4" /> Preparation
        </button>
        <button onClick={() => setActiveTab('exams')}
          className={cn("flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold transition-all border-2",
            activeTab === 'exams' 
              ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-200' 
              : 'bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-400')}>
          <Star className="w-4 h-4" /> Your Exams
        </button>
        <button onClick={() => setActiveTab('all')}
          className={cn("flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold transition-all border-2",
            activeTab === 'all' 
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200' 
              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-400')}>
          <Globe className="w-4 h-4" /> All {entranceExams.length}
        </button>
      </div>

      {/* ═══ TAB 1: PREPARATION HUB ═══ */}
      {activeTab === 'hub' && (
        <div className="space-y-4">
          {/* Hero */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-1"><Layers className="w-5 h-5 text-indigo-200" /><p className="text-lg font-bold">Preparation Hub</p></div>
            <p className="text-xs text-indigo-100 mt-1">Study Guide · Question Bank · Tracker · Alerts · PYQ · Predictor</p>
          </div>

          {/* 6 Preparation Tools */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { icon: '📖', label: 'Study Guide', desc: '187 chapters with concepts, formulas & books', route: '/study-guide', color: 'from-indigo-500 to-blue-600', count: '187 chapters' },
              { icon: '📝', label: 'Question Bank', desc: 'Chapter-wise practice — pick topic & count', route: '/question-bank', color: 'from-violet-500 to-purple-600', count: `${totalQB}+ questions` },
              { icon: '📊', label: 'Syllabus Tracker', desc: 'Track progress chapter by chapter', route: '/syllabus-tracker', color: 'from-emerald-500 to-green-600', count: 'NEET · JEE · CLAT' },
              { icon: '🔔', label: 'Exam Alerts', desc: 'Important dates & deadlines', route: '/exam-alerts', color: 'from-red-500 to-rose-600', count: '45+ events' },
              { icon: '📜', label: 'PYQ Practice', desc: 'Previous year questions by exam', route: '/career-assessment/colleges/pyq', color: 'from-amber-500 to-orange-600', count: '5 exams' },
              { icon: '🎯', label: 'Rank Predictor', desc: 'Enter score → see rank & colleges', route: '/rank-predictor', color: 'from-sky-500 to-cyan-600', count: 'NEET · TNEA · JEE' },
            ].map(tool => (
              <button key={tool.label} onClick={() => navigate(tool.route)}
                className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all text-left active:scale-[0.97] group">
                <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-xl mb-3 shadow-md group-hover:scale-110 transition-transform", tool.color)}>
                  {tool.icon}
                </div>
                <p className="text-xs font-bold text-gray-900">{tool.label}</p>
                <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{tool.desc}</p>
                <p className="text-[9px] font-bold text-emerald-600 mt-1.5">{tool.count}</p>
              </button>
            ))}
          </div>

          {/* Quick Exam Links */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Quick access — Top exams</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {['NEET UG', 'JEE Main', 'TNEA', 'CLAT', 'CUET', 'BITSAT'].map(name => {
                const exam = entranceExams.find(e => e.name.includes(name.split(' ')[0]));
                return exam ? (
                  <button key={name} onClick={() => { setActiveTab('exams'); setOpenExam(exam.id); }}
                    className="flex-shrink-0 px-3 py-2 rounded-full bg-white border border-gray-200 text-[11px] font-bold text-gray-700 hover:border-emerald-400 hover:bg-emerald-50 transition-all whitespace-nowrap">
                    {name}
                  </button>
                ) : null;
              })}
            </div>
          </div>
        </div>
      )}

      {/* ═══ TAB 2: YOUR EXAMS ═══ */}
      {activeTab === 'exams' && (
        <div className="space-y-3">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">{config.emoji}</div>
              <div>
                <p className="text-base font-bold">Exams for {config.label}</p>
                <p className="text-[11px] text-amber-100">{topExams.length} recommended exams · Tap to expand</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {topExams.map(exam => <ExamCard key={exam.id} exam={exam} />)}
          </div>

          {/* CTA to see all */}
          <button onClick={() => setActiveTab('all')}
            className="w-full py-3 rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 text-xs font-bold text-gray-500 hover:border-gray-400 hover:bg-gray-100 transition-all">
            Browse all {entranceExams.length} exams →
          </button>
        </div>
      )}

      {/* ═══ TAB 3: ALL EXAMS ═══ */}
      {activeTab === 'all' && (
        <div className="space-y-3">
          <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 mb-1"><Globe className="w-5 h-5 text-emerald-200" /><p className="text-base font-bold">All {entranceExams.length} Entrance Exams</p></div>
            <p className="text-[11px] text-emerald-100">Medical · Engineering · Law · Commerce · Defence · Agriculture</p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search exams..." value={searchQ}
              onChange={e => { setSearchQ(e.target.value); setFilterCat('all'); }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-emerald-400 focus:ring-0 outline-none bg-white" />
          </div>

          {/* Category filter */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
            <button onClick={() => { setFilterCat('all'); setSearchQ(''); }}
              className={cn("px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap border-2 transition-all",
                filterCat === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400')}>
              All ({entranceExams.length})
            </button>
            {examCategories.map(cat => {
              const count = entranceExams.filter(e => e.category === cat.id).length;
              return (
                <button key={cat.id} onClick={() => { setFilterCat(cat.id); setSearchQ(''); }}
                  className={cn("flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap border-2 transition-all",
                    filterCat === cat.id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400')}>
                  {cat.icon} {cat.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Results count */}
          <p className="text-[10px] text-gray-400">{allFiltered.length} exams found</p>

          {/* Exam list */}
          <div className="space-y-2">
            {allFiltered.map(exam => <ExamCard key={exam.id} exam={exam} />)}
            {allFiltered.length === 0 && (
              <div className="text-center py-10">
                <p className="text-sm text-gray-400">No exams match your search</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
