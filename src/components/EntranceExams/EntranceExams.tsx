import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, BookOpen, Clock, Calendar, ExternalLink, ChevronDown, ChevronUp,
  ChevronRight, Target, Bell, FileText, Star, MapPin, IndianRupee,
  Zap, ArrowLeft, Bookmark
} from 'lucide-react';
import { examCategories, entranceExams } from './examData';
import { examPracticeQuestions } from './practiceQuestionsData';
import { PracticeQuestions } from './PracticeQuestions';
import { EntranceExam } from './types';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const MY_EXAM_KEY = 'vzk_my_target_exam';

/* ═══════════════════════════════════════
   CAREER PATHWAYS — what a student actually thinks
   ═══════════════════════════════════════ */
interface CareerPathway {
  id: string;
  career: string;
  emoji: string;
  tagline: string;
  mainExamId: string; // primary exam for this career
  alsoGetsYou: string[]; // other exam IDs that use the same score
  noExamNote?: string; // if no exam needed
  scoreGuide?: { range: string; outcome: string }[];
}

const scienceBioPathways: CareerPathway[] = [
  {
    id: 'doctor', career: 'Doctor (MBBS)', emoji: '🩺',
    tagline: 'Write NEET UG → Score decides your college',
    mainExamId: 'neet-ug',
    alsoGetsYou: ['tn-neet-counselling', 'jipmer-puducherry', 'bds-dental', 'ayush-bams-bhms-bsms'],
    scoreGuide: [
      { range: '600+ / 720', outcome: 'Top Govt Medical College (free seat!)' },
      { range: '500-600', outcome: 'Govt college (counselling rank matters)' },
      { range: '400-500', outcome: 'Private medical college' },
      { range: 'Below 400', outcome: 'Consider B.Pharm, Nursing, Allied Health' },
    ],
  },
  {
    id: 'nursing', career: 'Nurse (India & Abroad)', emoji: '🏥',
    tagline: 'NEET score OR merit-based admission in TN',
    mainExamId: 'bsc-nursing',
    alsoGetsYou: ['allied-health'],
    scoreGuide: [
      { range: 'NEET 300+', outcome: 'Govt nursing college' },
      { range: 'No NEET', outcome: 'Private nursing colleges accept 12th marks' },
    ],
  },
  {
    id: 'pharma', career: 'Pharmacist / Drug Research', emoji: '💊',
    tagline: 'Merit-based in TN — no separate exam needed',
    mainExamId: 'bpharm',
    alsoGetsYou: [],
    noExamNote: 'Most TN B.Pharm colleges admit on 12th marks. NEET score is a bonus.',
  },
  {
    id: 'agriculture', career: 'Agriculture / Food Science', emoji: '🌾',
    tagline: 'TNAU uses 12th marks — no entrance exam!',
    mainExamId: 'tnau',
    alsoGetsYou: ['tanuvas', 'icar-aieea'],
    noExamNote: 'TNAU admission is purely based on HSC marks. ICAR AIEEA is for national agri colleges.',
  },
];

const scienceMathsPathways: CareerPathway[] = [
  {
    id: 'engineer-tn', career: 'Engineer (TN Colleges)', emoji: '🏗️',
    tagline: 'TNEA uses your 12th marks — no exam!',
    mainExamId: 'tnea',
    alsoGetsYou: [],
    noExamNote: 'TNEA cutoff = Maths/200×100 + Physics/200×50 + Chemistry/200×50. Just apply online.',
    scoreGuide: [
      { range: '190+ cutoff', outcome: 'Top Govt colleges — Anna Univ, CEG, MIT' },
      { range: '170-190', outcome: 'Good Govt/Aided colleges' },
      { range: '150-170', outcome: 'Private engineering colleges' },
    ],
  },
  {
    id: 'engineer-national', career: 'Engineer (NITs, IIITs, Top Private)', emoji: '⚙️',
    tagline: 'Write JEE Main → Top 2.5 lakh qualify for JEE Advanced (IIT)',
    mainExamId: 'jee-main',
    alsoGetsYou: ['jee-advanced'],
    scoreGuide: [
      { range: '250+ / 300', outcome: 'IIT possible (via JEE Advanced)' },
      { range: '180-250', outcome: 'NIT, IIIT, top private colleges' },
      { range: '120-180', outcome: 'Good private colleges via JoSAA' },
    ],
  },
  {
    id: 'vit-srm-bits', career: 'VIT / SRM / BITS', emoji: '🎓',
    tagline: 'Each has its own entrance exam',
    mainExamId: 'viteee',
    alsoGetsYou: ['srmjeee', 'bitsat'],
  },
  {
    id: 'central-uni', career: 'Central University (DU, JNU, BHU)', emoji: '🏛️',
    tagline: 'Write CUET-UG for all central universities',
    mainExamId: 'cuet',
    alsoGetsYou: [],
  },
];

const commercePathways: CareerPathway[] = [
  {
    id: 'ca', career: 'Chartered Accountant', emoji: '📊',
    tagline: 'Register for CA Foundation right after 12th — no entrance exam',
    mainExamId: 'ca-cs-cma-foundation',
    alsoGetsYou: [],
    noExamNote: 'CA Foundation: Register anytime after 12th. Exam in May & Nov. Do B.Com alongside.',
  },
  {
    id: 'law', career: 'Lawyer (NLUs & Private)', emoji: '⚖️',
    tagline: 'CLAT for 26 NLUs, TNDALU for TN law colleges (no exam!)',
    mainExamId: 'clat',
    alsoGetsYou: ['tndalu', 'ailet', 'lsat-india', 'slat'],
    scoreGuide: [
      { range: 'CLAT 100+/150', outcome: 'Top NLU (NLSIU, NALSAR, NLUJ)' },
      { range: 'CLAT 80-100', outcome: 'Good NLUs' },
      { range: 'No exam', outcome: 'TNDALU — TN law colleges on 12th marks (70%+ cutoff)' },
    ],
  },
  {
    id: 'bba-bcom', career: 'BBA / BCA / B.Com', emoji: '💼',
    tagline: 'Direct admission in most TN colleges on 12th marks',
    mainExamId: 'bba-bca-bcom-direct',
    alsoGetsYou: ['cuet'],
    noExamNote: 'Most colleges: direct admission. For DU/JNU/BHU → write CUET-UG.',
  },
  {
    id: 'management', career: 'Management (IIM after 12th)', emoji: '🎯',
    tagline: 'IPM Aptitude Test for 5-year integrated MBA at IIM',
    mainExamId: 'ipm-iim',
    alsoGetsYou: ['set-symbiosis'],
  },
];

const artsPathways: CareerPathway[] = [
  {
    id: 'law-arts', career: 'Lawyer', emoji: '⚖️',
    tagline: 'CLAT for NLUs, TNDALU for TN (no exam!)',
    mainExamId: 'clat',
    alsoGetsYou: ['tndalu', 'ailet', 'lsat-india', 'slat'],
    scoreGuide: [
      { range: 'CLAT 100+', outcome: 'Top NLU' },
      { range: 'No exam needed', outcome: 'TNDALU — 70%+ in 12th gets you TN law college' },
    ],
  },
  {
    id: 'central-arts', career: 'Central University (DU, JNU, BHU)', emoji: '🏛️',
    tagline: 'Write CUET-UG for India\'s best universities',
    mainExamId: 'cuet',
    alsoGetsYou: [],
  },
  {
    id: 'direct-arts', career: 'BBA / BCA / B.Com / BA', emoji: '📖',
    tagline: 'Direct admission in TN colleges',
    mainExamId: 'bba-bca-bcom-direct',
    alsoGetsYou: [],
    noExamNote: 'Most arts/humanities courses in TN have direct admission on 12th marks.',
  },
];

const streamPathways: Record<string, CareerPathway[]> = {
  science_bio: scienceBioPathways,
  science_maths: scienceMathsPathways,
  commerce: commercePathways,
  arts: artsPathways,
  default: [...scienceMathsPathways.slice(0, 2), ...scienceBioPathways.slice(0, 1), ...commercePathways.slice(0, 1)],
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

/* ═══════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════ */
export const EntranceExams = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [expandedPathway, setExpandedPathway] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [practiceExam, setPracticeExam] = useState<string | null>(null);
  const [showAllExams, setShowAllExams] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewingExamInAll, setViewingExamInAll] = useState<string | null>(null);

  const meta = user?.user_metadata || {};
  const stream = detectStream(meta.stream || '');
  const pathways = streamPathways[stream] || streamPathways.default;

  const practiceQs = practiceExam ? examPracticeQuestions[practiceExam] : null;

  // Filtered exams for Browse All
  const filteredAllExams = useMemo(() => {
    let exams = [...entranceExams];
    if (activeCategory !== 'all') exams = exams.filter(e => e.category === activeCategory);
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

  // ═══ RENDER EXAM MINI DETAIL (inside pathway) ═══
  const renderExamMini = (examId: string) => {
    const exam = entranceExams.find(e => e.id === examId);
    if (!exam) return null;
    const hasPractice = !!examPracticeQuestions[exam.id];
    const practiceCount = examPracticeQuestions[exam.id]?.length || 0;
    const isExpanded = expandedSection === examId;

    return (
      <div key={examId} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
        <button onClick={() => setExpandedSection(isExpanded ? null : examId)}
          className="w-full p-3 text-left flex items-center gap-2 hover:bg-gray-50">
          <span className="text-sm">{examCategories.find(c => c.id === exam.category)?.icon || '📝'}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-800">{exam.name.replace(' ⭐', '')}</p>
            <p className="text-[10px] text-gray-400">{exam.importantDates.examDate} · {exam.examMode}</p>
          </div>
          {hasPractice && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700">{practiceCount}Q</span>}
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
        </button>

        {isExpanded && (
          <div className="border-t border-gray-100 p-3 space-y-3">
            {/* Quick facts */}
            <div className="flex gap-2">
              <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-[10px] font-bold text-gray-700">{exam.duration}</p>
                <p className="text-[9px] text-gray-400">Duration</p>
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-[10px] font-bold text-gray-700">{exam.applicationFee.general}</p>
                <p className="text-[9px] text-gray-400">Fee</p>
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-[10px] font-bold text-gray-700">{exam.applicationFee.scst}</p>
                <p className="text-[9px] text-gray-400">SC/ST Fee</p>
              </div>
            </div>

            {/* TN note */}
            <div className="bg-emerald-50 rounded-lg p-2.5 border border-emerald-200">
              <p className="text-[10px] text-emerald-700">{exam.tnEligibility}</p>
            </div>

            {/* Syllabus preview */}
            <div>
              <p className="text-[10px] font-bold text-gray-600 mb-1">Syllabus:</p>
              {exam.syllabus.slice(0, 3).map((s, i) => (
                <p key={i} className="text-[10px] text-gray-500 leading-relaxed">• {s}</p>
              ))}
              {exam.syllabus.length > 3 && <p className="text-[10px] text-gray-400">+{exam.syllabus.length - 3} more topics...</p>}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {hasPractice && (
                <button onClick={() => setPracticeExam(exam.id)}
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-violet-500 text-white text-[10px] font-bold">
                  <Zap className="w-3 h-3" /> Practice {practiceCount}Q
                </button>
              )}
              <button onClick={() => exam.officialWebsite && window.open(exam.officialWebsite, '_blank')}
                className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border border-gray-200 text-gray-600 text-[10px] font-bold hover:bg-gray-50">
                <ExternalLink className="w-3 h-3" /> Website
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-5">

      {/* ═══ CAREER PATHWAYS ═══ */}
      {pathways.map(pathway => {
        const isOpen = expandedPathway === pathway.id;
        const mainExam = entranceExams.find(e => e.id === pathway.mainExamId);
        const hasPractice = !!examPracticeQuestions[pathway.mainExamId];

        return (
          <div key={pathway.id} className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-sm">
            {/* Pathway header — always visible */}
            <button onClick={() => setExpandedPathway(isOpen ? null : pathway.id)}
              className="w-full p-4 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl flex-shrink-0">
                {pathway.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900">{pathway.career}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{pathway.tagline}</p>
              </div>
              {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
            </button>

            {/* Expanded content */}
            {isOpen && (
              <div className="border-t border-gray-100 p-4 space-y-4">

                {/* Score guide if available */}
                {pathway.scoreGuide && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">What score gets you where?</p>
                    {pathway.scoreGuide.map((sg, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[80px] text-center",
                          i === 0 ? 'bg-emerald-100 text-emerald-700' :
                          i === 1 ? 'bg-blue-100 text-blue-700' :
                          i === 2 ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-200 text-gray-600'
                        )}>{sg.range}</span>
                        <p className="text-xs text-gray-700">{sg.outcome}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* No exam note */}
                {pathway.noExamNote && (
                  <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                    <p className="text-xs text-blue-700">💡 {pathway.noExamNote}</p>
                  </div>
                )}

                {/* Quick actions for main exam */}
                <div className="flex gap-2">
                  <button onClick={() => navigate('/syllabus-tracker')}
                    className="flex-1 bg-emerald-50 rounded-xl p-2.5 text-center border border-emerald-200 hover:bg-emerald-100">
                    <BookOpen className="w-4 h-4 text-emerald-600 mx-auto mb-0.5" />
                    <p className="text-[10px] font-bold text-emerald-700">Track Syllabus</p>
                  </button>
                  {hasPractice && (
                    <button onClick={() => setPracticeExam(pathway.mainExamId)}
                      className="flex-1 bg-violet-50 rounded-xl p-2.5 text-center border border-violet-200 hover:bg-violet-100">
                      <Zap className="w-4 h-4 text-violet-600 mx-auto mb-0.5" />
                      <p className="text-[10px] font-bold text-violet-700">Practice</p>
                    </button>
                  )}
                  <button onClick={() => navigate('/exam-alerts')}
                    className="flex-1 bg-red-50 rounded-xl p-2.5 text-center border border-red-200 hover:bg-red-100">
                    <Bell className="w-4 h-4 text-red-600 mx-auto mb-0.5" />
                    <p className="text-[10px] font-bold text-red-700">Dates</p>
                  </button>
                  <button onClick={() => navigate('/rank-predictor')}
                    className="flex-1 bg-indigo-50 rounded-xl p-2.5 text-center border border-indigo-200 hover:bg-indigo-100">
                    <Target className="w-4 h-4 text-indigo-600 mx-auto mb-0.5" />
                    <p className="text-[10px] font-bold text-indigo-700">Rank</p>
                  </button>
                </div>

                {/* Main exam detail */}
                {renderExamMini(pathway.mainExamId)}

                {/* Also gets you into */}
                {pathway.alsoGetsYou.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Same exam also gets you into:
                    </p>
                    <div className="space-y-1.5">
                      {pathway.alsoGetsYou.map(id => renderExamMini(id))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* ═══ BROWSE ALL 40 EXAMS ═══ */}
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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search exams..." value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setActiveCategory('all'); }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-emerald-400 focus:ring-0 outline-none" />
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
              <button onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className={cn("px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border-2",
                  activeCategory === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200')}>
                All
              </button>
              {examCategories.map(cat => (
                <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                  className={cn("flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border-2",
                    activeCategory === cat.id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200')}>
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>

            <div className="space-y-1.5">
              {filteredAllExams.map(exam => {
                const isViewing = viewingExamInAll === exam.id;
                const catInfo = examCategories.find(c => c.id === exam.category);
                const hasPractice = !!examPracticeQuestions[exam.id];
                return (
                  <div key={exam.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button onClick={() => setViewingExamInAll(isViewing ? null : exam.id)}
                      className="w-full p-3 text-left flex items-center gap-2.5 hover:bg-gray-50">
                      <span className="text-base">{catInfo?.icon || '📝'}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-900">{exam.name.replace(' ⭐', '')}</p>
                        <p className="text-[10px] text-gray-400">{exam.importantDates.examDate}</p>
                      </div>
                      {hasPractice && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700">{examPracticeQuestions[exam.id]?.length}Q</span>}
                      {isViewing ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
                    </button>
                    {isViewing && (
                      <div className="border-t border-gray-100 p-3 space-y-2">
                        <div className="bg-emerald-50 rounded-lg p-2.5 border border-emerald-200">
                          <p className="text-[10px] text-emerald-700">{exam.tnEligibility}</p>
                        </div>
                        <div className="flex gap-2 text-center">
                          <div className="flex-1 bg-gray-50 rounded-lg p-2"><p className="text-[10px] font-bold">{exam.duration}</p><p className="text-[8px] text-gray-400">Duration</p></div>
                          <div className="flex-1 bg-gray-50 rounded-lg p-2"><p className="text-[10px] font-bold">{exam.applicationFee.general}</p><p className="text-[8px] text-gray-400">Fee</p></div>
                          <div className="flex-1 bg-gray-50 rounded-lg p-2"><p className="text-[10px] font-bold">{exam.examMode.split('(')[0]}</p><p className="text-[8px] text-gray-400">Mode</p></div>
                        </div>
                        <div className="flex gap-2">
                          {hasPractice && (
                            <button onClick={() => setPracticeExam(exam.id)}
                              className="flex-1 py-2 rounded-lg bg-violet-500 text-white text-[10px] font-bold flex items-center justify-center gap-1">
                              <Zap className="w-3 h-3" /> Practice
                            </button>
                          )}
                          <button onClick={() => exam.officialWebsite && window.open(exam.officialWebsite, '_blank')}
                            className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-600 text-[10px] font-bold flex items-center justify-center gap-1">
                            <ExternalLink className="w-3 h-3" /> Website
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {filteredAllExams.length === 0 && <p className="text-center text-xs text-gray-500 py-8">No exams found</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
