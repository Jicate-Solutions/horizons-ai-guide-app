import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Zap, Globe, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

// ═══ STREAM DATA ═══
interface CareerCard {
  career: string;
  why: string;
  salary: string;
  demand: number; // 1-5
  path: string;
  skills: string[];
}

interface StreamTrends {
  label: string;
  emoji: string;
  color: string;
  bgLight: string;
  rising: CareerCard[];
  declining: string[];
  tip: string;
}

const trends: Record<string, StreamTrends> = {
  science_maths: {
    label: 'Science (Maths)', emoji: '💻', color: 'text-blue-700', bgLight: 'bg-blue-50',
    rising: [
      { career: 'AI/ML Engineer', why: 'AI will be in every industry by 2030', salary: '₹10-25 LPA', demand: 5, path: 'B.Tech CSE → AI/ML specialization', skills: ['Python', 'TensorFlow', 'Mathematics'] },
      { career: 'Data Scientist', why: 'Every company needs data-driven decisions', salary: '₹8-20 LPA', demand: 5, path: 'B.Tech/B.Sc → M.Sc Data Science', skills: ['Python', 'SQL', 'Statistics'] },
      { career: 'Cybersecurity Expert', why: 'Digital threats increasing 300% yearly', salary: '₹8-18 LPA', demand: 4, path: 'B.Tech CSE → Security certifications', skills: ['Networking', 'Ethical Hacking', 'Cloud Security'] },
      { career: 'EV & Renewable Engineer', why: 'India targeting 50% EV by 2030', salary: '₹6-15 LPA', demand: 4, path: 'B.Tech EEE/Mech → EV specialization', skills: ['Power Electronics', 'Battery Tech', 'AutoCAD'] },
      { career: 'Semiconductor Engineer', why: 'India investing ₹76,000 Cr in chip fabs', salary: '₹8-20 LPA', demand: 4, path: 'B.Tech ECE → VLSI/Chip Design', skills: ['VLSI', 'Verilog', 'Circuit Design'] },
      { career: 'Full Stack Developer', why: 'Every business needs a web presence', salary: '₹6-18 LPA', demand: 5, path: 'B.Tech/BCA → Practice + Portfolio', skills: ['React', 'Node.js', 'Database'] },
    ],
    declining: ['Basic IT support (being automated)', 'Routine coding without problem-solving', 'Traditional mechanical jobs without tech skills'],
    tip: 'The golden combination: Engineering degree + AI/Cloud skills + one domain expertise (healthcare/finance/manufacturing). This makes you irreplaceable.',
  },
  science_bio: {
    label: 'Science (Biology)', emoji: '🧬', color: 'text-emerald-700', bgLight: 'bg-emerald-50',
    rising: [
      { career: 'Doctor (MBBS + Specialist)', why: 'Always in demand — AI cannot replace human touch', salary: '₹12-50+ LPA', demand: 5, path: 'NEET → MBBS → MD/MS', skills: ['Clinical skills', 'Empathy', 'Research'] },
      { career: 'International Nurse', why: 'Global nursing shortage — 5.9 million needed', salary: '₹30-60 LPA abroad', demand: 5, path: 'B.Sc Nursing → IELTS → UK/Canada/Australia', skills: ['Patient Care', 'English', 'Critical Care'] },
      { career: 'Biotechnologist', why: 'Gene therapy & mRNA vaccines are the future', salary: '₹6-18 LPA', demand: 4, path: 'B.Tech Biotech → M.Tech/PhD', skills: ['Molecular Biology', 'Bioinformatics', 'Lab Skills'] },
      { career: 'Clinical Research Associate', why: 'India is a global clinical trial hub', salary: '₹5-15 LPA', demand: 4, path: 'B.Pharm/Life Science → CRA certification', skills: ['GCP', 'Data Management', 'Regulatory'] },
      { career: 'Clinical Psychologist', why: 'Mental health awareness rapidly rising', salary: '₹5-15 LPA', demand: 4, path: 'BA/B.Sc Psychology → M.Phil Clinical Psychology', skills: ['Counselling', 'CBT', 'Assessment'] },
    ],
    declining: ['Traditional BAMS/BHMS (oversaturated in some areas)', 'Lab technician roles (automation coming)'],
    tip: 'NEET is your gateway, but think beyond MBBS. International nursing pays ₹30-60 LPA abroad. Biotech + AI (Bioinformatics) is the next big thing.',
  },
  commerce: {
    label: 'Commerce', emoji: '📊', color: 'text-purple-700', bgLight: 'bg-purple-50',
    rising: [
      { career: 'Chartered Accountant', why: 'Trusted profession — always needed', salary: '₹10-30 LPA', demand: 4, path: 'B.Com + CA Foundation → Inter → Final', skills: ['Accounting', 'Tax', 'Audit'] },
      { career: 'FinTech Professional', why: 'UPI, digital banking exploding — India leads globally', salary: '₹8-22 LPA', demand: 5, path: 'B.Com/BBA → FinTech certification', skills: ['Blockchain', 'Digital Payments', 'Data Analytics'] },
      { career: 'Digital Marketing Manager', why: 'Every business needs online presence', salary: '₹6-20 LPA', demand: 5, path: 'Any degree → Certifications + Portfolio', skills: ['SEO', 'Social Media', 'Google Ads', 'Analytics'] },
      { career: 'Investment Banker', why: 'India\'s investment market growing 15% yearly', salary: '₹12-40 LPA', demand: 4, path: 'B.Com → MBA Finance → CFA', skills: ['Financial Modeling', 'Valuation', 'Excel'] },
      { career: 'Startup Founder', why: 'India has 3rd largest startup ecosystem globally', salary: 'Unlimited', demand: 4, path: 'Any degree → Idea + Hustle', skills: ['Business Strategy', 'Marketing', 'Fundraising'] },
    ],
    declining: ['Traditional bank clerk (automation)', 'Basic bookkeeping (software replacing)', 'Tax filing agent (GST software)'],
    tip: 'CA + Tech skills = unstoppable. Learn Python and Power BI alongside your CA. A tech-enabled CA earns 2-3x more than a traditional one.',
  },
  arts: {
    label: 'Arts / Humanities', emoji: '📖', color: 'text-amber-700', bgLight: 'bg-amber-50',
    rising: [
      { career: 'Civil Services (IAS/IPS)', why: 'Most powerful career — direct nation-building impact', salary: '₹10-25 LPA + perks', demand: 3, path: 'Any Degree → UPSC Prep → CSE', skills: ['Current Affairs', 'Essay Writing', 'Ethics'] },
      { career: 'Corporate Lawyer', why: 'M&A, IP law booming with startup growth', salary: '₹12-40 LPA', demand: 4, path: 'CLAT → 5-year LLB → Corporate law', skills: ['Legal Research', 'Drafting', 'Negotiation'] },
      { career: 'Content Creator / Journalist', why: 'Digital media 10x growth — everyone needs content', salary: '₹4-20 LPA', demand: 5, path: 'BA Mass Comm → Portfolio + Social presence', skills: ['Writing', 'Video', 'Social Media'] },
      { career: 'UX Researcher', why: 'Every app needs to understand users', salary: '₹8-20 LPA', demand: 4, path: 'BA Psychology/Sociology → UX bootcamp', skills: ['User Research', 'Wireframing', 'Empathy'] },
      { career: 'Policy Researcher / Think Tank', why: 'India needs evidence-based policy', salary: '₹6-15 LPA', demand: 3, path: 'BA → MA Public Policy → Research roles', skills: ['Research', 'Data Analysis', 'Report Writing'] },
    ],
    declining: ['Traditional journalism (print dying)', 'Generic BA without specialization', 'Government clerical roles (digitization)'],
    tip: 'Arts students dominate UPSC — 7 of the last 10 toppers had humanities backgrounds. Start reading The Hindu and writing essays daily from today.',
  },
};

const defaultTrends = trends.science_maths;

// Global trends applicable to all
const globalTrends = [
  { factor: 'AI in Workplaces', now: '25% jobs use AI', future: '60%+ jobs will need AI skills', icon: '🤖' },
  { factor: 'Remote Work', now: '30% workforce', future: '45% hybrid/remote by 2028', icon: '🏠' },
  { factor: 'Green Economy', now: 'Emerging sector', future: '10M new jobs in India by 2030', icon: '🌱' },
  { factor: 'Healthcare Boom', now: 'High demand', future: 'Critical shortage = huge opportunity', icon: '🏥' },
  { factor: 'Gig Economy', now: 'Growing fast', future: '25% workforce will freelance', icon: '💼' },
];

const detectStream = (raw: string): string => {
  if (!raw) return 'science_maths';
  const s = raw.toLowerCase();
  if (s.includes('bio') || s.includes('pcb') || s.includes('medical')) return 'science_bio';
  if (s.includes('commerce') || s.includes('business')) return 'commerce';
  if (s.includes('arts') || s.includes('humanities')) return 'arts';
  return 'science_maths';
};

const DemandBar = ({ level }: { level: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <div key={i} className={cn("w-3 h-1.5 rounded-full", i <= level ? 'bg-emerald-500' : 'bg-gray-200')} />
    ))}
  </div>
);

const IndustryTrends = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [expandedCareer, setExpandedCareer] = useState<string | null>(null);

  const meta = user?.user_metadata || {};
  const streamKey = detectStream(meta.stream || '');
  const data = trends[streamKey] || defaultTrends;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4 pb-24">
      <div className="max-w-lg mx-auto space-y-5">
        {/* Header */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className={cn("rounded-2xl p-5 border-2", data.bgLight)}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl shadow-lg">📈</div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Industry Trends 2026</h1>
              <p className="text-xs text-gray-500">Top careers for {data.label} students</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-200 mt-3">
            <p className="text-xs text-gray-600 leading-relaxed">💡 {data.tip}</p>
          </div>
        </div>

        {/* Rising Careers */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-gray-800">Rising Careers for {data.label}</h2>
          </div>
          <div className="space-y-2">
            {data.rising.map((career) => {
              const isExpanded = expandedCareer === career.career;
              return (
                <div key={career.career} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button onClick={() => setExpandedCareer(isExpanded ? null : career.career)}
                    className="w-full p-4 text-left flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-bold text-gray-900">{career.career}</p>
                        <DemandBar level={career.demand} />
                      </div>
                      <p className="text-xs text-gray-500">{career.salary}</p>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-2 border-t border-gray-100 pt-3">
                      <div className="bg-emerald-50 rounded-lg p-3">
                        <p className="text-[10px] font-bold text-emerald-700 mb-0.5">Why it's rising</p>
                        <p className="text-xs text-emerald-600">{career.why}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-[10px] font-bold text-blue-700 mb-0.5">Career Path</p>
                        <p className="text-xs text-blue-600">{career.path}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {career.skills.map(s => (
                          <span key={s} className="text-[10px] font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Declining / Be Careful */}
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <p className="text-xs font-bold text-red-700 mb-2">⚠️ Declining / Saturated — Be Careful</p>
          {data.declining.map((d, i) => (
            <p key={i} className="text-xs text-red-600 mb-1">• {d}</p>
          ))}
        </div>

        {/* Global Trends */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-gray-800">Global Job Market 2026</h2>
          </div>
          <div className="space-y-2">
            {globalTrends.map(t => (
              <div key={t.factor} className="bg-white rounded-xl p-3 border border-gray-200 flex items-center gap-3">
                <span className="text-xl">{t.icon}</span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-800">{t.factor}</p>
                  <p className="text-[10px] text-gray-500">Now: {t.now} → {t.future}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryTrends;
