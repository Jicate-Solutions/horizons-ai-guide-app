import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { CollegesPageLayout } from '@/components/CollegesPageLayout';
import { cn } from '@/lib/utils';
import {
  BookOpen, Bell, MessageCircle, ChevronRight, TrendingUp, FileText, Sparkles, Brain
} from 'lucide-react';

/* ═══════════════════════════════════════
   STREAM CONFIG
   ═══════════════════════════════════════ */
type StreamKey = 'science_maths' | 'science_bio' | 'commerce' | 'arts' | 'default';

const streamConfig: Record<StreamKey, {
  label: string; emoji: string; color: string; bgLight: string;
  topCareers: string[];
  keyExams: { name: string; tag?: string }[];
  quickTip: string;
}> = {
  science_maths: {
    label: 'Science (Maths)', emoji: '💻', color: 'text-blue-700', bgLight: 'bg-blue-50',
    topCareers: ['Software Engineer', 'Data Scientist', 'Civil Engineer', 'AI/ML Engineer', 'Architect'],
    keyExams: [{ name: 'TNEA', tag: 'TN' }, { name: 'JEE Main' }, { name: 'JEE Advanced', tag: 'IIT' }, { name: 'BITSAT' }, { name: 'VITEEE', tag: 'TN' }],
    quickTip: 'Your TNEA cutoff = Maths/200 × 100 + Physics/200 × 50 + Chemistry/200 × 50. Use the Cutoff Calculator tab to check your score!',
  },
  science_bio: {
    label: 'Science (Biology)', emoji: '🧬', color: 'text-emerald-700', bgLight: 'bg-emerald-50',
    topCareers: ['Doctor (MBBS)', 'Dentist', 'Pharmacist', 'Biotechnologist', 'Nurse (International)'],
    keyExams: [{ name: 'NEET UG', tag: 'Must' }, { name: 'JIPMER' }, { name: 'AIIMS', tag: 'Madurai' }, { name: 'TNAU', tag: 'Agri' }],
    quickTip: 'NEET is your only gateway to MBBS. Biology = 360/720 marks (50%). Read NCERT Biology line-by-line, at least 4 times.',
  },
  commerce: {
    label: 'Commerce', emoji: '📊', color: 'text-purple-700', bgLight: 'bg-purple-50',
    topCareers: ['Chartered Accountant', 'Investment Banker', 'Digital Marketer', 'Entrepreneur', 'Bank PO'],
    keyExams: [{ name: 'CA Foundation', tag: 'Top' }, { name: 'CUET' }, { name: 'CLAT', tag: 'Law' }, { name: 'CS Foundation' }],
    quickTip: 'CA + B.Com is the most powerful combo. You can register for CA Foundation right after 12th — no entrance exam needed.',
  },
  arts: {
    label: 'Arts / Humanities', emoji: '📖', color: 'text-amber-700', bgLight: 'bg-amber-50',
    topCareers: ['Civil Services (IAS/IPS)', 'Lawyer', 'Journalist', 'Psychologist', 'Content Creator'],
    keyExams: [{ name: 'CLAT', tag: 'Law' }, { name: 'CUET' }, { name: 'TNPSC', tag: 'TN Govt' }, { name: 'TNDALU', tag: 'No Exam' }],
    quickTip: 'Arts students dominate Civil Services — UPSC toppers often come from Humanities. Start reading The Hindu daily from today.',
  },
  default: {
    label: 'Student', emoji: '🎓', color: 'text-gray-700', bgLight: 'bg-gray-50',
    topCareers: ['Software Engineer', 'Doctor', 'CA', 'Civil Services', 'Entrepreneur'],
    keyExams: [{ name: 'TNEA' }, { name: 'NEET' }, { name: 'JEE' }, { name: 'CLAT' }, { name: 'CUET' }],
    quickTip: 'Not sure about your career? Use the AI Career Chat below — ask any question and get instant guidance.',
  },
};

const detectStream = (raw: string): StreamKey => {
  if (!raw) return 'default';
  const s = raw.toLowerCase();
  if (s.includes('maths') || s.includes('pcm') || s.includes('engineering') || s.includes('computer')) return 'science_maths';
  if (s.includes('bio') || s.includes('pcb') || s.includes('medical') || s.includes('neet')) return 'science_bio';
  if (s.includes('commerce') || s.includes('business') || s.includes('accounting')) return 'commerce';
  if (s.includes('arts') || s.includes('humanities') || s.includes('history')) return 'arts';
  return 'default';
};

/* ═══════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════ */
const CareerAssessmentColleges = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const meta = user?.user_metadata || {};
  const userName = (meta.display_name || '').split(' ')[0] || 'Student';
  const rawStream = meta.stream || '';
  const district = meta.district || '';
  const streamKey = detectStream(rawStream);
  const config = streamConfig[streamKey];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <CollegesPageLayout activeTab="assessments">
      <div className="space-y-5 max-w-xl mx-auto">

        {/* ═══ GREETING ═══ */}
        <div className={cn("rounded-2xl p-5 border-2", config.bgLight)}>
          <p className="text-sm text-gray-500">{greeting},</p>
          <h1 className="text-xl font-bold text-gray-900 mb-2">{userName}! 👋</h1>
          <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
            {rawStream && <span className={cn("px-2.5 py-1 rounded-full font-bold", config.bgLight, config.color)}>{config.emoji} {config.label}</span>}
            {district && <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">📍 {district}</span>}
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-200 flex items-start gap-2.5">
            <span className="text-base mt-0.5">💡</span>
            <p className="text-xs text-gray-600 leading-relaxed">{config.quickTip}</p>
          </div>
        </div>

        {/* ═══ 4 PRIMARY ACTIONS ═══ */}
        <div className="space-y-2.5">
          {/* Syllabus Tracker */}
          <button onClick={() => navigate('/syllabus-tracker')}
            className="w-full bg-white rounded-2xl p-4 border-2 border-gray-100 hover:border-emerald-400 hover:shadow-lg transition-all text-left flex items-center gap-4 active:scale-[0.99] group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-gray-900">Syllabus Tracker</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">NEW</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Track every chapter for NEET / JEE / CLAT</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
          </button>

          {/* Exam Alerts */}
          <button onClick={() => navigate('/exam-alerts')}
            className="w-full bg-white rounded-2xl p-4 border-2 border-gray-100 hover:border-red-400 hover:shadow-lg transition-all text-left flex items-center gap-4 active:scale-[0.99] group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
              <Bell className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-gray-900">Exam Alerts 2026</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">NEW</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">All deadlines — never miss a registration</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-red-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
          </button>

          {/* AI Career Chat */}
          <button onClick={() => navigate('/career-assessment/chat')}
            className="w-full bg-white rounded-2xl p-4 border-2 border-gray-100 hover:border-orange-400 hover:shadow-lg transition-all text-left flex items-center gap-4 active:scale-[0.99] group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">Career AI Chat</p>
              <p className="text-xs text-gray-500 mt-0.5">Ask any career question — get instant AI guidance</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
          </button>

          {/* AI Career Predictor */}
          <button onClick={() => navigate('/career-assessment/ai-predictor')}
            className="w-full bg-white rounded-2xl p-4 border-2 border-gray-100 hover:border-violet-400 hover:shadow-lg transition-all text-left flex items-center gap-4 active:scale-[0.99] group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
              <Brain className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-gray-900">AI Career Predictor</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">AI</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Answer 7 questions → Get your ideal career match</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
          </button>

          {/* Rank Predictor */}
          <button onClick={() => navigate('/rank-predictor')}
            className="w-full bg-white rounded-2xl p-4 border-2 border-gray-100 hover:border-amber-400 hover:shadow-lg transition-all text-left flex items-center gap-4 active:scale-[0.99] group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">Rank Predictor</p>
              <p className="text-xs text-gray-500 mt-0.5">Enter score → See rank & eligible colleges</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
          </button>

          {/* Study Guide */}
          <button onClick={() => navigate('/study-guide')}
            className="w-full bg-white rounded-2xl p-4 border-2 border-gray-100 hover:border-indigo-400 hover:shadow-lg transition-all text-left flex items-center gap-4 active:scale-[0.99] group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-gray-900">Study Guide</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">NEW</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Topic-by-topic concepts, formulas & books</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
          </button>

          {/* Question Bank */}
          <button onClick={() => navigate('/question-bank')}
            className="w-full bg-white rounded-2xl p-4 border-2 border-gray-100 hover:border-violet-400 hover:shadow-lg transition-all text-left flex items-center gap-4 active:scale-[0.99] group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-gray-900">Question Bank</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">NEW</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Chapter-wise practice — pick topic, set count, start</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
          </button>
        </div>

        {/* ═══ TOP CAREERS FOR YOUR STREAM ═══ */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-gray-800">Top Careers for {config.label}</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {config.topCareers.map((career, i) => (
              <div key={i} className="flex-shrink-0 bg-white rounded-xl px-4 py-2.5 border border-gray-200 text-center">
                <p className="text-sm font-bold text-gray-800 whitespace-nowrap">{career}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ KEY EXAMS ═══ */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <FileText className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-gray-800">Key Exams for You</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {config.keyExams.map((exam, i) => (
              <button key={i} onClick={() => navigate('/career-assessment/colleges/entrance-exams')}
                className="flex-shrink-0 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl px-4 py-2.5 border border-indigo-200 hover:border-indigo-400 transition-all flex items-center gap-2">
                <span className="text-sm font-bold text-indigo-700 whitespace-nowrap">{exam.name}</span>
                {exam.tag && <span className="text-[9px] font-bold bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded">{exam.tag}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* ═══ EXPLORE MORE — subtle hint ═══ */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            <Sparkles className="w-3.5 h-3.5 inline-block mr-1 text-gray-400" />
            Scroll the tabs above to explore <strong>Colleges, Scholarships, Cutoff Calculator, Courses</strong> and more
          </p>
        </div>

      </div>
    </CollegesPageLayout>
  );
};

export default CareerAssessmentColleges;
