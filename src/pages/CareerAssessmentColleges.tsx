import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { CollegesPageLayout } from '@/components/CollegesPageLayout';
import { cn } from '@/lib/utils';
import {
  Target, Brain, BookOpen, Calculator, FileText, Landmark,
  Building2, Compass, Rocket, GraduationCap, Sparkles,
  ArrowRight, ChevronRight, Clock, Star, TrendingUp,
  Bookmark, MessageCircle, School, Zap, Users, Bell
} from 'lucide-react';

/* ═══════════════════════════════════════
   STREAM → RECOMMENDATION MAPPING
   ═══════════════════════════════════════ */
type StreamKey = 'science_maths' | 'science_bio' | 'commerce' | 'arts' | 'default';

const streamConfig: Record<StreamKey, {
  label: string; emoji: string; color: string; bgLight: string;
  topCareers: string[];
  keyExams: string[];
  quickTip: string;
  recommendedTabs: string[];
}> = {
  science_maths: {
    label: 'Science (Maths)', emoji: '💻', color: 'text-blue-700', bgLight: 'bg-blue-50',
    topCareers: ['Software Engineer', 'Data Scientist', 'Civil Engineer', 'AI/ML Engineer', 'Architect'],
    keyExams: ['TNEA', 'JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE'],
    quickTip: 'Your TNEA cutoff = Maths/200 × 100 + Physics/200 × 50 + Chemistry/200 × 50. Calculate yours now!',
    recommendedTabs: ['syllabus_tracker', 'educutoff', 'entranceexams'],
  },
  science_bio: {
    label: 'Science (Biology)', emoji: '🧬', color: 'text-emerald-700', bgLight: 'bg-emerald-50',
    topCareers: ['Doctor (MBBS)', 'Dentist', 'Pharmacist', 'Biotechnologist', 'Nurse (International)'],
    keyExams: ['NEET UG', 'AIIMS', 'JIPMER', 'TNAU', 'BCECE'],
    quickTip: 'NEET is your gateway — 720 marks, 200 questions. Biology carries the most weightage (360 marks).',
    recommendedTabs: ['syllabus_tracker', 'entranceexams', 'scholarships'],
  },
  commerce: {
    label: 'Commerce', emoji: '📊', color: 'text-purple-700', bgLight: 'bg-purple-50',
    topCareers: ['Chartered Accountant', 'Investment Banker', 'Digital Marketer', 'Entrepreneur', 'Bank PO'],
    keyExams: ['CA Foundation', 'CUET', 'CLAT', 'Banking (IBPS)', 'CS Foundation'],
    quickTip: 'CA + B.Com is the most powerful combo in Commerce. Start CA Foundation right after 12th.',
    recommendedTabs: ['syllabus_tracker', 'courseexplorer', 'ai_predictor'],
  },
  arts: {
    label: 'Arts / Humanities', emoji: '📖', color: 'text-amber-700', bgLight: 'bg-amber-50',
    topCareers: ['Civil Services (IAS/IPS)', 'Lawyer', 'Journalist', 'Psychologist', 'Content Creator'],
    keyExams: ['CLAT', 'CUET', 'UPSC (after degree)', 'TNPSC', 'Mass Comm Entrance'],
    quickTip: 'Arts is the backbone of Civil Services — UPSC toppers often come from Humanities background.',
    recommendedTabs: ['syllabus_tracker', 'govtjobs', 'courseexplorer'],
  },
  default: {
    label: 'Student', emoji: '🎓', color: 'text-gray-700', bgLight: 'bg-gray-50',
    topCareers: ['Software Engineer', 'Doctor', 'CA', 'Civil Services', 'Entrepreneur'],
    keyExams: ['TNEA', 'NEET', 'JEE', 'CLAT', 'CUET'],
    quickTip: 'Not sure about your path? Take the AI Career Predictor — it analyzes your interests and suggests the best careers for you.',
    recommendedTabs: ['syllabus_tracker', 'ai_predictor', 'courseexplorer'],
  },
};

const detectStream = (raw: string): StreamKey => {
  if (!raw) return 'default';
  const s = raw.toLowerCase();
  if (s.includes('maths') || s.includes('pcm') || s.includes('engineering') || s.includes('computer') || s.includes('101') || s.includes('102') || s.includes('103')) return 'science_maths';
  if (s.includes('bio') || s.includes('pcb') || s.includes('medical') || s.includes('neet') || s.includes('201') || s.includes('202')) return 'science_bio';
  if (s.includes('commerce') || s.includes('business') || s.includes('accounting') || s.includes('301') || s.includes('302')) return 'commerce';
  if (s.includes('arts') || s.includes('humanities') || s.includes('history') || s.includes('401') || s.includes('402')) return 'arts';
  return 'default';
};

/* ═══════════════════════════════════════
   FEATURE CARDS
   ═══════════════════════════════════════ */
const allFeatures = [
  { id: 'syllabus_tracker', title: 'Syllabus Tracker', desc: 'Track every chapter — know exactly where you stand', icon: BookOpen, route: '/syllabus-tracker', color: 'from-emerald-500 to-green-600', tag: 'NEW', category: 'explore' },
  { id: 'exam_alerts', title: 'Exam Alerts 2026', desc: 'All deadlines & dates — never miss a registration', icon: Bell, route: '/exam-alerts', color: 'from-red-500 to-rose-600', tag: 'NEW', category: 'explore' },
  { id: 'ai_predictor', title: 'AI Career Predictor', desc: 'Answer 7 questions → Get AI-powered career predictions', icon: Brain, route: '/career-assessment/ai-predictor', color: 'from-violet-500 to-purple-600', tag: 'AI Powered', category: 'explore' },
  { id: 'career_chat', title: 'Career AI Chat', desc: 'Chat with AI counselor — ask any career question instantly', icon: MessageCircle, route: '/career-assessment/chat', color: 'from-orange-500 to-amber-600', tag: '24/7 AI', category: 'explore' },
  { id: 'industry_trends', title: 'Industry Trends', desc: 'Job market analytics, salary data & future career insights', icon: TrendingUp, route: '/career-assessment/industry-trends', color: 'from-emerald-500 to-teal-600', tag: 'Live Data', category: 'explore' },
  { id: 'courseexplorer', title: 'Course Explorer', desc: 'Discover 144+ courses available for your stream', icon: Compass, route: '/career-assessment/colleges/course-explorer', color: 'from-cyan-500 to-teal-600', tag: '144+ Courses', category: 'explore' },
  { id: 'educutoff', title: 'Cutoff Calculator', desc: 'Enter your marks → See which colleges you can get', icon: Calculator, route: '/career-assessment/colleges/educutoff', color: 'from-amber-500 to-orange-600', tag: 'TNEA + NEET', category: 'admit' },
  { id: 'entranceexams', title: 'Entrance Exams', desc: 'Exam details, 149 practice questions & study plans', icon: FileText, route: '/career-assessment/colleges/entrance-exams', color: 'from-indigo-500 to-blue-600', tag: '40 Exams', category: 'admit' },
  { id: 'colleges', title: 'Find Colleges', desc: 'Search colleges by district with full details', icon: Building2, route: '/career-assessment/colleges/find-colleges', color: 'from-green-500 to-emerald-600', tag: '38 Districts', category: 'admit' },
  { id: 'scholarships', title: 'Scholarships', desc: 'Find scholarships you qualify for — govt, private, NGO', icon: Bookmark, route: '/career-assessment/colleges/scholarships', color: 'from-rose-500 to-pink-600', tag: '61 Schemes', category: 'admit' },
  { id: 'govtjobs', title: 'Government Jobs', desc: 'Exams, salary, mock tests & preparation guide', icon: Landmark, route: '/career-assessment/colleges/govt-jobs', color: 'from-slate-600 to-gray-700', tag: 'Open Now', category: 'more' },
  { id: 'tnuniversity', title: 'University Hub', desc: 'TN State, Central & Deemed universities', icon: School, route: '/career-assessment/colleges/tn-university', color: 'from-violet-500 to-indigo-600', tag: '50+ Unis', category: 'more' },
  { id: 'startup', title: 'Startup Guide', desc: '40-day plan to build your own startup', icon: Rocket, route: '/career-assessment/colleges/startup', color: 'from-orange-500 to-red-500', tag: '₹30L Grants', category: 'more' },
];

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
  const school = meta.school_name || '';
  const careerInterest = meta.career_interest || '';
  const streamKey = detectStream(rawStream);
  const config = streamConfig[streamKey];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const recommended = useMemo(() => {
    return config.recommendedTabs.map(id => allFeatures.find(f => f.id === id)).filter(Boolean);
  }, [config]);

  return (
    <CollegesPageLayout activeTab="assessments">
      <div className="space-y-6 max-w-4xl mx-auto">

        {/* ═══════ PERSONALIZED GREETING ═══════ */}
        <div className={cn("rounded-2xl p-5 md:p-6 border-2", config.bgLight)}>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
              {config.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-500">{greeting},</p>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{userName}! 👋</h1>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {rawStream && <span className={cn("px-2.5 py-1 rounded-full font-bold", config.bgLight, config.color)}>{config.emoji} {config.label}</span>}
                {district && <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">📍 {district}</span>}
                {school && <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium hidden md:inline">🏫 {school}</span>}
              </div>
            </div>
          </div>

          <div className="mt-4 bg-white rounded-xl p-3.5 border border-gray-200 flex items-start gap-3">
            <span className="text-lg flex-shrink-0">💡</span>
            <div>
              <p className="text-xs font-bold text-gray-800">Quick Tip for You</p>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{config.quickTip}</p>
            </div>
          </div>
        </div>

        {/* ═══════ YOUR TOP CAREERS ═══════ */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-gray-800">Top Careers for {config.label}</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {config.topCareers.map((career, i) => (
              <div key={i} className="flex-shrink-0 bg-white rounded-xl px-4 py-3 border border-gray-200 hover:border-emerald-300 hover:shadow-sm transition-all text-center min-w-[120px]">
                <p className="text-sm font-bold text-gray-800">{career}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ KEY EXAMS ═══════ */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-gray-800">Key Exams for You</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {config.keyExams.map((exam, i) => (
              <button key={i} onClick={() => navigate('/career-assessment/colleges/entrance-exams')}
                className="flex-shrink-0 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl px-4 py-2.5 border border-indigo-200 hover:border-indigo-400 hover:shadow-sm transition-all flex items-center gap-2">
                <span className="text-sm font-bold text-indigo-700">{exam}</span>
                <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />
              </button>
            ))}
          </div>
        </div>

        {/* ═══════ RECOMMENDED FOR YOU ═══════ */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-gray-800">Recommended for You</h2>
          </div>
          <div className="grid gap-3">
            {(recommended as typeof allFeatures).map((feature) => {
              const Icon = feature.icon;
              return (
                <button key={feature.id} onClick={() => navigate(feature.route)}
                  className="w-full bg-white rounded-2xl p-4 border-2 border-gray-100 hover:border-emerald-300 hover:shadow-lg transition-all text-left group flex items-center gap-4 active:scale-[0.99]">
                  <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform flex-shrink-0", feature.color)}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-gray-900">{feature.title}</p>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{feature.tag}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{feature.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══════ ALL FEATURES — GROUPED ═══════ */}
        <div>
          <h2 className="text-sm font-bold text-gray-800 mb-3">All Features</h2>

          {[
            { label: 'Explore Careers', icon: Target, cat: 'explore' },
            { label: 'Get Admitted', icon: GraduationCap, cat: 'admit' },
            { label: 'More Opportunities', icon: Zap, cat: 'more' },
          ].map((section) => (
            <div key={section.cat} className="mb-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <section.icon className="w-3 h-3" /> {section.label}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {allFeatures.filter(f => f.category === section.cat).map(f => {
                  const Icon = f.icon;
                  return (
                    <button key={f.id} onClick={() => navigate(f.route)}
                      className="bg-white rounded-xl p-3.5 border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all text-left group">
                      <div className={cn("w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-white shadow-sm mb-2 group-hover:scale-110 transition-transform", f.color)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-gray-800">{f.title}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{f.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </CollegesPageLayout>
  );
};

export default CareerAssessmentColleges;
