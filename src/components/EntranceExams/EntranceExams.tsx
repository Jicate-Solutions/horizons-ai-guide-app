import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, BookOpen, Clock, Calendar, ExternalLink, ChevronDown, ChevronUp, ChevronRight,
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

// Official syllabus PDF links per exam
const syllabusLinks: Record<string, {pdf: string; label: string}> = {
  // Official PDFs — open directly
  'neet-ug':       { pdf: '/neet-ug-2026-syllabus.pdf',      label: 'Official NEET UG 2026 Syllabus — NMC' },
  'jee-main':      { pdf: '/jee-main-2026-syllabus.pdf',     label: 'Official JEE Main 2026 Syllabus — NTA' },
  'jee-advanced':  { pdf: '/jee-advanced-2026-syllabus.pdf', label: 'Official JEE Advanced 2026 Syllabus — IIT' },
  'viteee':        { pdf: '/Physics_VITEEE2026.pdf',         label: 'VITEEE 2026 Syllabus — VIT Official' },
  'srmjeee':       { pdf: '/srmjeee-2026-syllabus.pdf',      label: 'SRMJEEE 2026 Official Syllabus' },
  'bitsat':        { pdf: '/bitsat-2026-syllabus.pdf',       label: 'BITSAT 2026 Official Syllabus — BITS Pilani' },
  'aeee':          { pdf: '/aeee-2026-syllabus.pdf',         label: 'AEEE 2026 Official Syllabus — Amrita Vishwa Vidyapeetham' },
  'clat':          { pdf: '/clat-2026-syllabus.pdf',         label: 'CLAT 2026 Official Syllabus — Consortium of NLUs' },
  'nift-chennai':  { pdf: '/nift-2026-syllabus.pdf',         label: 'NIFT 2026 Official Syllabus — Ministry of Textiles' },
  'jee-arch':      { pdf: '/jee-main-2026-syllabus.pdf',     label: 'JEE Main 2026 Paper 2A Syllabus — NTA' },
};



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
  const totalQB = Object.values(questionBank).reduce((sum, qs) => sum + qs.length, 0);

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
    const [activeTab, setActiveTab] = useState<'overview'|'pattern'|'eligibility'|'syllabus'|'colleges'>('overview');
    const [openSylSubject, setOpenSylSubject] = useState<string|null>(null);
    const catObj = examCategories.find(c => c.id === exam.category);
    const syllabusLink = syllabusLinks[exam.id];
    const pattern = examPatterns[exam.id];

    const tabs = [
      { id: 'overview' as const, label: 'Overview', icon: '📋' },
      ...(pattern ? [{ id: 'pattern' as const, label: 'Exam Pattern', icon: '📊' }] : []),
      { id: 'eligibility' as const, label: 'Eligibility', icon: '✅' },
      ...(exam.tnCollegesAccepting.length > 0 ? [{ id: 'colleges' as const, label: `Colleges`, icon: '🏫' }] : []),
    ];

    return (
      <div className={cn("bg-white rounded-2xl border-2 overflow-hidden transition-all", isOpen ? 'border-blue-300 shadow-lg' : 'border-gray-200')}>
        {/* Exam Header */}
        <button onClick={() => { setOpenExam(isOpen ? null : exam.id); setActiveTab('overview'); }}
          className="w-full p-4 text-left flex items-center gap-3 hover:bg-gray-50">
          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-xl flex-shrink-0 border border-blue-100">
            {catObj?.icon || '📝'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 leading-tight">{exam.name.replace(' ⭐', '')}</p>
            <p className="text-xs text-gray-500 mt-0.5 truncate">{exam.fullForm}</p>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-xs font-bold text-blue-600">{exam.importantDates.examDate}</span>
            {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </div>
        </button>

        {isOpen && (
          <div className="border-t-2 border-gray-100">
            {/* Tab Bar */}
            <div className="flex overflow-x-auto border-b border-gray-100 bg-gray-50 px-3 gap-1 pt-2">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-lg whitespace-nowrap border-b-2 transition-colors flex-shrink-0",
                    activeTab === tab.id
                      ? 'bg-white text-blue-700 border-blue-600'
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  )}>
                  <span>{tab.icon}</span>{tab.label}
                </button>
              ))}
              {/* Syllabus tab — opens directly on tap */}
              {exam.syllabus.length > 0 && (
                syllabusLink ? (
                  <a href={syllabusLink.pdf} target="_blank" rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-lg whitespace-nowrap border-b-2 transition-colors flex-shrink-0",
                      "text-gray-500 border-transparent hover:text-gray-700"
                    )}>
                    <span>📚</span>Syllabus
                  </a>
                ) : (
                  <button onClick={() => setActiveTab('syllabus' as any)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-lg whitespace-nowrap border-b-2 transition-colors flex-shrink-0",
                      activeTab === 'syllabus'
                        ? 'bg-white text-blue-700 border-blue-600'
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    )}>
                    <span>📚</span>Syllabus
                  </button>
                )
              )}

            </div>

            {/* Tab Content */}
            <div className="p-4 space-y-3">

              {/* ── OVERVIEW TAB ── */}
              {activeTab === 'overview' && (
                <div className="space-y-3">
                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Mode', value: exam.examMode.split('(')[0].trim(), icon: '🖥️' },
                      { label: 'Duration', value: exam.duration, icon: '⏱️' },
                      { label: 'Fee (General)', value: exam.applicationFee.general, icon: '💳' },
                      { label: 'Result', value: exam.importantDates.resultDate, icon: '📅' },
                    ].map(s => (
                      <div key={s.label} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <p className="text-[10px] text-gray-400 font-medium">{s.icon} {s.label}</p>
                        <p className="text-sm font-bold text-gray-800 mt-0.5 leading-tight">{s.value}</p>
                      </div>
                    ))}
                  </div>
                  {/* TN note */}
                  <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
                    <p className="text-xs font-bold text-emerald-700 mb-1">🏛️ Tamil Nadu</p>
                    <p className="text-xs text-emerald-700 leading-relaxed">{exam.tnEligibility}</p>
                  </div>
                  {/* Official website */}
                  <a href={exam.officialWebsite} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-200 text-gray-700 text-sm font-bold hover:border-blue-400 hover:text-blue-600 transition-all">
                    <ExternalLink className="w-4 h-4" /> Official Website
                  </a>
                </div>
              )}

              {/* ── EXAM PATTERN TAB ── */}
              {activeTab === 'pattern' && pattern && (
                <div className="space-y-4">
                  {/* Summary row */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Total Questions', value: pattern.totalQuestions },
                      { label: 'Total Marks', value: pattern.totalMarks },
                      { label: 'Duration', value: pattern.duration },
                    ].map(s => (
                      <div key={s.label} className="bg-blue-50 rounded-xl p-2.5 text-center border border-blue-100">
                        <p className="text-base font-black text-blue-700">{s.value}</p>
                        <p className="text-[10px] text-blue-500 mt-0.5 leading-tight">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  {/* Marking scheme */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 flex items-center gap-2">
                    <span className="text-sm">📝</span>
                    <p className="text-xs font-semibold text-amber-800">{pattern.marking}</p>
                  </div>
                  {/* Subject tables */}
                  {pattern.sections.map((sec, si) => (
                    <div key={si}>
                      {pattern.sections.length > 1 && (
                        <p className="text-xs font-bold text-gray-600 mb-2">{sec.name}</p>
                      )}
                      <div className="rounded-xl overflow-hidden border border-gray-200">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-blue-700 text-white">
                              <th className="text-left px-3 py-2.5 text-xs font-bold">Subject</th>
                              <th className="text-center px-3 py-2.5 text-xs font-bold">Questions</th>
                              <th className="text-center px-3 py-2.5 text-xs font-bold">Marks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sec.subjects.map((sub, i) => (
                              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-3 py-2.5 text-xs font-semibold text-gray-800">{sub.subject}</td>
                                <td className="px-3 py-2.5 text-xs text-center font-bold text-blue-700">{sub.questions}</td>
                                <td className="px-3 py-2.5 text-xs text-center font-bold text-emerald-700">{sub.marks}</td>
                              </tr>
                            ))}
                            <tr className="bg-blue-50 border-t-2 border-blue-200">
                              <td className="px-3 py-2.5 text-xs font-black text-blue-800">Total</td>
                              <td className="px-3 py-2.5 text-xs text-center font-black text-blue-800">
                                {sec.subjects.reduce((a,s) => a + s.questions, 0)}
                              </td>
                              <td className="px-3 py-2.5 text-xs text-center font-black text-blue-800">
                                {sec.subjects.reduce((a,s) => a + s.marks, 0)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                  {pattern.note && (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                      <p className="text-xs text-gray-600 leading-relaxed">ℹ️ {pattern.note}</p>
                    </div>
                  )}
                </div>
              )}

              {/* ── ELIGIBILITY TAB ── */}
              {activeTab === 'eligibility' && (
                <div className="space-y-2">
                  {exam.eligibility.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                      <span className="text-emerald-500 font-bold text-sm shrink-0 mt-0.5">✓</span>
                      <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* ── SYLLABUS TAB ── */}
              {activeTab === 'syllabus' && (() => {
                // Parse structured syllabus into subjects
                const sylSubjects: {name: string; emoji: string; color: string; bg: string; border: string; chapters: {name: string; topics: string}[]; pdfUrl: string; pdfLabel: string}[] = [];
                const colorMap: Record<string, {emoji: string; color: string; bg: string; border: string}> = {
                  'Physics':    {emoji:'⚛️', color:'text-violet-800', bg:'bg-violet-50',  border:'border-violet-200'},
                  'Chemistry':  {emoji:'🧪', color:'text-blue-800',   bg:'bg-blue-50',    border:'border-blue-200'},
                  'Mathematics':{emoji:'📐', color:'text-orange-800', bg:'bg-orange-50',  border:'border-orange-200'},
                  'Maths':      {emoji:'📐', color:'text-orange-800', bg:'bg-orange-50',  border:'border-orange-200'},
                  'Biology':    {emoji:'🧬', color:'text-emerald-800',bg:'bg-emerald-50', border:'border-emerald-200'},
                  'Botany':     {emoji:'🌿', color:'text-green-800',  bg:'bg-green-50',   border:'border-green-200'},
                  'Zoology':    {emoji:'🦋', color:'text-teal-800',   bg:'bg-teal-50',    border:'border-teal-200'},
                  'English':    {emoji:'📝', color:'text-rose-800',   bg:'bg-rose-50',    border:'border-rose-200'},
                  'Aptitude':   {emoji:'🧠', color:'text-indigo-800', bg:'bg-indigo-50',  border:'border-indigo-200'},
                  'General':    {emoji:'📖', color:'text-amber-800',  bg:'bg-amber-50',   border:'border-amber-200'},
                };
                let cur: typeof sylSubjects[0] | null = null;
                exam.syllabus.forEach(line => {
                  if (line.startsWith('SUBJECT:')) {
                    if (cur) sylSubjects.push(cur);
                    const parts = line.replace('SUBJECT:', '').split('|');
                    const key = Object.keys(colorMap).find(k => parts[0].includes(k)) || 'General';
                    const c = colorMap[key];
                    cur = {name: parts[0], ...c, chapters: [], pdfUrl: '', pdfLabel: ''};
                  } else if (line.startsWith('CHAPTER:') && cur) {
                    const parts = line.replace('CHAPTER:', '').split('|');
                    cur.chapters.push({name: parts[0], topics: parts[1] || ''});
                  } else if (line.startsWith('PDF:') && cur) {
                    const parts = line.replace('PDF:', '').split('|');
                    cur.pdfUrl = parts[0];
                    cur.pdfLabel = parts[1] || 'Official Syllabus PDF';
                  } else if (line.startsWith('TIP:')) {
                    // skip tips
                  }
                });
                if (cur) sylSubjects.push(cur);

                if (sylSubjects.length === 0) {
                  // Fallback: plain list
                  return (
                    <div className="space-y-1.5">
                      {exam.syllabus.map((item, i) => (
                        <p key={i} className="text-xs text-gray-700 bg-gray-50 rounded-lg px-3 py-2 leading-relaxed">{item}</p>
                      ))}
                    </div>
                  );
                }

                return (
                  <div className="space-y-3">
                    {/* PDF download button if available */}
                    {syllabusLink && (
                      <a href={syllabusLink.pdf} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-between w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-3 transition-all">
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg">📄</span>
                          <div>
                            <p className="text-xs font-bold">Download Official Syllabus PDF</p>
                            <p className="text-[10px] text-blue-200">{syllabusLink.label}</p>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-blue-200"/>
                      </a>
                    )}
                    {/* Subject cards grid */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {sylSubjects.map((sub, si) => (
                        <button key={si} onClick={() => setOpenSylSubject(openSylSubject === sub.name ? null : sub.name)}
                          className={cn("rounded-2xl p-4 border-2 text-left transition-all active:scale-[0.97]",
                            openSylSubject === sub.name ? `${sub.bg} ${sub.border} shadow-sm` : 'bg-white border-gray-100 hover:border-gray-300'
                          )}>
                          <div className="flex items-center gap-2.5 mb-1">
                            <span className="text-2xl">{sub.emoji}</span>
                            <div>
                              <p className={cn("text-xs font-black uppercase tracking-wide", sub.color)}>{sub.name}</p>
                              <p className="text-[10px] text-gray-400">{sub.chapters.length} chapters</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    {/* Expanded subject chapters */}
                    {openSylSubject && (() => {
                      const sub = sylSubjects.find(s => s.name === openSylSubject);
                      if (!sub) return null;
                      return (
                        <div className={cn("rounded-2xl border-2 overflow-hidden", sub.border)}>
                          <div className={cn("px-4 py-3 flex items-center justify-between gap-2", sub.bg)}>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{sub.emoji}</span>
                              <p className={cn("text-sm font-black", sub.color)}>{sub.name}</p>
                              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/70", sub.color)}>{sub.chapters.length} chapters</span>
                            </div>
                            {sub.pdfUrl && (
                              <a href={sub.pdfUrl} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg hover:bg-blue-700 shrink-0">
                                <span>📄</span> PDF
                              </a>
                            )}
                          </div>
                          <div className="divide-y divide-gray-100 bg-white">
                            {sub.chapters.map((ch, ci) => (
                              <div key={ci} className="px-4 py-2.5 flex items-start gap-3">
                                <span className={cn("text-xs font-bold mt-0.5 shrink-0", sub.color)}>{ci + 1}.</span>
                                <div>
                                  <p className="text-xs font-semibold text-gray-900">{ch.name}</p>
                                  {ch.topics && <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{ch.topics}</p>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                );
              })()}

              {/* ── COLLEGES TAB ── */}
              {activeTab === 'colleges' && (
                <div className="space-y-1.5">
                  {exam.tnCollegesAccepting.map((college, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                      <span className="text-sm shrink-0">🎓</span>
                      <p className="text-sm text-gray-700 leading-relaxed">{college}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
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
                <div className="flex items-center gap-3 mt-2 text-xs">
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
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Individual Tools</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '📖', label: 'Study Guide', sub: 'Concepts, formulas & books', route: '/study-guide', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
                { icon: '📝', label: 'Question Bank', sub: 'Chapter-wise MCQ practice', route: '/question-bank', color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100' },
                { icon: '📊', label: 'Syllabus Tracker', sub: 'Track every chapter', route: '/syllabus-tracker', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
                { icon: '🔔', label: 'Exam Alerts', sub: 'Dates & deadlines 2026', route: '/exam-alerts', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
                { icon: '📜', label: 'PYQ Papers', sub: 'Previous year papers', route: '/pyq-papers', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
                { icon: '🎯', label: 'Rank Predictor', sub: 'TNEA, NEET, JEE ranks', route: '/rank-predictor', color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-100' },
              ].map(tool => (
                <button key={tool.label} onClick={() => navigate(tool.route)}
                  className={cn("bg-white rounded-2xl p-4 border-2 hover:shadow-md transition-all text-left active:scale-[0.97]", tool.border)}>
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3", tool.bg)}>
                    {tool.icon}
                  </div>
                  <p className={cn("text-sm font-bold", tool.color)}>{tool.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{tool.sub}</p>
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
