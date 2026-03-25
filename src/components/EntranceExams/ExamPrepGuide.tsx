import { BookOpen, Calculator, GraduationCap, Target, Trophy, Clock, FileText, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PrepStep {
  icon: string;
  title: string;
  action: string;
  route?: string;
  priority: 'must' | 'should' | 'nice';
}

interface ExamPrepGuide {
  cutoff?: string;
  totalMarks: string;
  duration: string;
  steps: PrepStep[];
}

const prepGuides: Record<string, ExamPrepGuide> = {
  'jee-main': {
    cutoff: '75+ percentile for NIT, 90+ for top NITs',
    totalMarks: '300 marks (Physics 100 + Chemistry 100 + Maths 100)',
    duration: '3 hours',
    steps: [
      { icon: '📖', title: 'Practice Questions', action: 'Solve 30 JEE questions in this app', priority: 'must' },
      { icon: '🧮', title: 'Cutoff Calculator', action: 'Calculate your TNEA cutoff from 12th marks', route: '/career-assessment/colleges/educutoff', priority: 'must' },
      { icon: '🏛️', title: 'Find Colleges', action: 'Search NIT, IIT, Govt Engineering colleges', route: '/career-assessment/colleges/find-colleges', priority: 'must' },
      { icon: '📋', title: 'Counselling Tracker', action: 'Track JoSAA counselling steps — don\'t miss deadlines', route: '/career-assessment/colleges/educutoff', priority: 'must' },
      { icon: '📊', title: 'Previous Cutoffs', action: 'Check last year NIT/IIT cutoff marks', route: '/career-assessment/colleges/educutoff', priority: 'should' },
      { icon: '📝', title: 'Govt Exam Backup', action: 'Prepare SSC/Railway as backup option', route: '/government-exams', priority: 'nice' },
    ],
  },
  'neet-ug': {
    cutoff: '138/720 (General), 108/720 (SC/ST) for qualifying',
    totalMarks: '720 marks (Physics 180 + Chemistry 180 + Biology 360)',
    duration: '3 hours 20 minutes',
    steps: [
      { icon: '📖', title: 'Practice Questions', action: 'Solve 30 NEET questions in this app', priority: 'must' },
      { icon: '📋', title: 'Counselling Tracker', action: 'Track TN Medical counselling — 9 critical steps', route: '/career-assessment/colleges/educutoff', priority: 'must' },
      { icon: '📊', title: 'Previous Cutoffs', action: 'Check NEET cutoff for Govt Medical colleges', route: '/career-assessment/colleges/educutoff', priority: 'must' },
      { icon: '🏛️', title: 'Find Medical Colleges', action: 'Search Medical colleges in your district', route: '/career-assessment/colleges/find-colleges', priority: 'should' },
      { icon: '🔍', title: 'Course Explorer', action: 'Explore MBBS, BDS, BAMS, Nursing, Pharmacy', route: '/career-assessment/colleges/course-explorer', priority: 'should' },
      { icon: '💰', title: 'Scholarships', action: 'Find medical scholarships (BC/MBC/SC/ST)', route: '/career-assessment/colleges/scholarships', priority: 'nice' },
    ],
  },
  'cuet': {
    cutoff: 'University-specific (DU, BHU, JNU have different cutoffs)',
    totalMarks: '200 marks per section',
    duration: '45 min per section',
    steps: [
      { icon: '📖', title: 'Practice Questions', action: 'Solve 10 CUET questions in this app', priority: 'must' },
      { icon: '🔍', title: 'Course Explorer', action: 'Find BA, BSc, BCom courses at central universities', route: '/career-assessment/colleges/course-explorer', priority: 'must' },
      { icon: '🏫', title: 'University Hub', action: 'Browse central universities accepting CUET', route: '/career-assessment/colleges/tn-university', priority: 'must' },
      { icon: '📋', title: 'Counselling Tracker', action: 'Track CUET counselling process', route: '/career-assessment/colleges/educutoff', priority: 'should' },
      { icon: '💰', title: 'Scholarships', action: 'Central university scholarships', route: '/career-assessment/colleges/scholarships', priority: 'nice' },
    ],
  },
  'clat': {
    cutoff: '~100/150 for top 5 NLUs',
    totalMarks: '150 marks (120 Qs)',
    duration: '2 hours',
    steps: [
      { icon: '📖', title: 'Practice Questions', action: 'Solve 10 CLAT questions in this app', priority: 'must' },
      { icon: '🔍', title: 'Course Explorer', action: 'Explore LLB, BA LLB courses', route: '/career-assessment/colleges/course-explorer', priority: 'must' },
      { icon: '🏛️', title: 'Find Law Colleges', action: 'Search Law colleges in Tamil Nadu', route: '/career-assessment/colleges/find-colleges', priority: 'should' },
      { icon: '📝', title: 'Govt Exam Option', action: 'Judicial services exam after LLB', route: '/government-exams', priority: 'nice' },
    ],
  },
  'nda': {
    cutoff: '340-370/900 (written), then SSB interview',
    totalMarks: '900 marks (Maths 300 + GAT 600)',
    duration: '2.5 hours per paper',
    steps: [
      { icon: '📖', title: 'Practice Questions', action: 'Solve 10 NDA questions in this app', priority: 'must' },
      { icon: '📝', title: 'Govt Exam Section', action: 'Full NDA syllabus + study plan', route: '/government-exams', priority: 'must' },
      { icon: '🔍', title: 'Course Explorer', action: 'Explore defence academy courses', route: '/career-assessment/colleges/course-explorer', priority: 'should' },
      { icon: '🏋️', title: 'Physical Fitness', action: 'SSB interview has physical tests — prepare early', priority: 'should' },
    ],
  },
  'bitsat': {
    cutoff: '~280/390 for Pilani campus, ~250 for Goa/Hyderabad',
    totalMarks: '390 marks (150 Qs)',
    duration: '3 hours',
    steps: [
      { icon: '📖', title: 'Practice Questions', action: 'Solve 8 BITSAT questions in this app', priority: 'must' },
      { icon: '🏫', title: 'University Hub', action: 'Check BITS Pilani details', route: '/career-assessment/colleges/tn-university', priority: 'should' },
      { icon: '🧮', title: 'Cutoff Calculator', action: 'Calculate your 12th marks percentage', route: '/career-assessment/colleges/educutoff', priority: 'should' },
    ],
  },
  'viteee': {
    cutoff: '~85/125 for CSE at Vellore campus',
    totalMarks: '125 marks (125 Qs)',
    duration: '2.5 hours',
    steps: [
      { icon: '📖', title: 'Practice Questions', action: 'Solve 8 VITEEE questions in this app', priority: 'must' },
      { icon: '🏛️', title: 'Find Colleges', action: 'Check VIT campus details', route: '/career-assessment/colleges/find-colleges', priority: 'should' },
      { icon: '🔍', title: 'Course Explorer', action: 'Explore VIT B.Tech branches', route: '/career-assessment/colleges/course-explorer', priority: 'should' },
    ],
  },
  'tnau': {
    cutoff: 'Merit-based on 12th PCB/PCM marks',
    totalMarks: '12th board marks (no separate exam)',
    duration: 'N/A — merit based',
    steps: [
      { icon: '📖', title: 'Practice Questions', action: 'Solve 8 TNAU questions in this app', priority: 'must' },
      { icon: '🧮', title: 'Cutoff Calculator', action: 'Calculate cutoff from 12th marks', route: '/career-assessment/colleges/educutoff', priority: 'must' },
      { icon: '📋', title: 'Counselling Tracker', action: 'Track TNAU counselling — 6 steps', route: '/career-assessment/colleges/educutoff', priority: 'must' },
      { icon: '🔍', title: 'Course Explorer', action: 'Explore Agriculture, Horticulture, Forestry', route: '/career-assessment/colleges/course-explorer', priority: 'should' },
    ],
  },
  'srmjeee': {
    cutoff: '~120/160 for CSE, varies by campus',
    totalMarks: '160 marks (125 Qs)',
    duration: '2.5 hours',
    steps: [
      { icon: '📖', title: 'Practice Questions', action: 'Solve 20 SRMJEEE questions in this app', priority: 'must' },
      { icon: '🏛️', title: 'Find Colleges', action: 'Search SRM campus details', route: '/career-assessment/colleges/find-colleges', priority: 'should' },
      { icon: '🔍', title: 'Course Explorer', action: 'Explore B.Tech branch options', route: '/career-assessment/colleges/course-explorer', priority: 'should' },
    ],
  },
  'ca-cs-cma-foundation': {
    cutoff: '40% per paper, 50% aggregate to pass',
    totalMarks: '400 marks (4 papers × 100)',
    duration: '3 hours per paper',
    steps: [
      { icon: '📖', title: 'Practice Questions', action: 'Solve 15 CA Foundation questions in this app', priority: 'must' },
      { icon: '🔍', title: 'Course Explorer', action: 'Explore CA, CS, CMA career paths', route: '/career-assessment/colleges/course-explorer', priority: 'must' },
      { icon: '📝', title: 'Govt Exam Backup', action: 'Bank PO, SSC CGL as alternate careers', route: '/government-exams', priority: 'nice' },
    ],
  },
};

interface Props {
  examId: string;
  examName: string;
}

export const ExamPrepGuide = ({ examId, examName }: Props) => {
  const navigate = useNavigate();
  const guide = prepGuides[examId];
  if (!guide) return null;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-white" />
          <span className="text-sm font-bold text-white">How to Pass {examName}</span>
        </div>
      </div>

      {/* Exam Info */}
      <div className="px-4 py-3 grid grid-cols-3 gap-2 border-b border-blue-200">
        <div className="text-center">
          <p className="text-xs text-gray-500">Total Marks</p>
          <p className="text-xs font-bold text-gray-800">{guide.totalMarks.split('(')[0].trim()}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Duration</p>
          <p className="text-xs font-bold text-gray-800">{guide.duration}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Pass/Cutoff</p>
          <p className="text-xs font-bold text-blue-700">{guide.cutoff?.split('(')[0].trim() || 'Varies'}</p>
        </div>
      </div>

      {/* Steps */}
      <div className="p-3 space-y-2">
        <p className="text-xs font-bold text-gray-700 mb-1">Use these features to prepare:</p>
        {guide.steps.map((step, i) => (
          <button
            key={i}
            onClick={() => step.route && navigate(step.route)}
            className={cn(
              "w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all active:scale-[0.98]",
              step.route ? "hover:bg-white/80 cursor-pointer" : "cursor-default",
              step.priority === 'must' ? "bg-white border border-blue-200" :
              step.priority === 'should' ? "bg-white/60 border border-gray-200" :
              "bg-white/40 border border-gray-100"
            )}
          >
            <span className="text-lg flex-shrink-0">{step.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-gray-800">{step.title}</p>
                <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                  step.priority === 'must' ? "bg-red-100 text-red-700" :
                  step.priority === 'should' ? "bg-amber-100 text-amber-700" :
                  "bg-gray-100 text-gray-500"
                )}>
                  {step.priority === 'must' ? 'Must Do' : step.priority === 'should' ? 'Recommended' : 'Optional'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{step.action}</p>
            </div>
            {step.route && <span className="text-xs text-blue-500">→</span>}
          </button>
        ))}
      </div>
    </div>
  );
};
