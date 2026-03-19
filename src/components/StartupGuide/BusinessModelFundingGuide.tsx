import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, ExternalLink, Lightbulb, Target, DollarSign, Users, BarChart3, Truck, Handshake, Puzzle, Building2, Banknote, GraduationCap, Award, Rocket, Globe } from 'lucide-react';

// ═══════ BUSINESS MODEL CANVAS ═══════
const canvasBlocks = [
  { id: 'problem', icon: '🔍', title: 'Problem', desc: 'What pain are you solving?', color: 'from-red-500 to-rose-500', bg: 'bg-red-50', border: 'border-red-200',
    questions: ['What frustration do people face daily?', 'How are they solving it now (badly)?', 'Who suffers most from this problem?'],
    example: 'Students waste 2-3 months choosing careers because no single platform has all info in Tamil Nadu context.' },
  { id: 'solution', icon: '💡', title: 'Solution', desc: 'Your unique answer', color: 'from-amber-500 to-yellow-500', bg: 'bg-amber-50', border: 'border-amber-200',
    questions: ['What is your product/service?', 'Why is it 10x better than current solutions?', 'Can you explain it in one sentence?'],
    example: 'AI-powered career guidance app specifically for Tamil Nadu 12th students — all exams, colleges, cutoffs in one place.' },
  { id: 'customers', icon: '👥', title: 'Customer Segments', desc: 'Who pays you?', color: 'from-blue-500 to-indigo-500', bg: 'bg-blue-50', border: 'border-blue-200',
    questions: ['Who is your primary customer?', 'Who is your secondary customer?', 'How large is this market?'],
    example: 'Primary: 12th students (8L+ in TN yearly). Secondary: Parents, coaching centers, colleges.' },
  { id: 'revenue', icon: '💰', title: 'Revenue Model', desc: 'How you make money', color: 'from-emerald-500 to-green-500', bg: 'bg-emerald-50', border: 'border-emerald-200',
    questions: ['Free or paid? Freemium?', 'Subscription, one-time, or commission?', 'What is your pricing?'],
    example: 'Freemium: Basic free, Premium ₹299/year for AI predictor + mock tests. B2B: Schools pay ₹50K/year for bulk access.' },
  { id: 'channels', icon: '📢', title: 'Channels', desc: 'How customers find you', color: 'from-violet-500 to-purple-500', bg: 'bg-violet-50', border: 'border-violet-200',
    questions: ['Online or offline?', 'Social media, WhatsApp, school visits?', 'Referral or paid ads?'],
    example: 'WhatsApp groups of parents, school partnerships, YouTube shorts in Tamil, Instagram reels.' },
  { id: 'costs', icon: '📊', title: 'Cost Structure', desc: 'What you spend on', color: 'from-gray-600 to-slate-600', bg: 'bg-gray-50', border: 'border-gray-200',
    questions: ['What are your fixed costs?', 'What are variable costs?', 'What is your monthly burn rate?'],
    example: 'Server: ₹2K/mo, Domain: ₹800/yr, Marketing: ₹5K/mo, Team: ₹0 (student founders). Total: ~₹8K/mo.' },
];

// ═══════ FUNDING GUIDE ═══════
const fundingSources = [
  { category: '🏛️ Government Schemes', sources: [
    { name: 'Startup India (DPIIT)', amount: 'Tax benefits + ₹10Cr Fund of Funds', eligibility: 'Any startup < 10 years', link: 'https://www.startupindia.gov.in', difficulty: 'Medium' },
    { name: 'TANSIM (TN Startup)', amount: 'Up to ₹30 Lakhs grant', eligibility: 'TN-based startups', link: 'https://www.startuptn.in', difficulty: 'Medium' },
    { name: 'PMMY Mudra Loan', amount: 'Up to ₹10 Lakhs (no collateral)', eligibility: 'Any Indian citizen', link: 'https://www.mudra.org.in', difficulty: 'Easy' },
    { name: 'Stand Up India', amount: '₹10L - ₹1Cr loan', eligibility: 'SC/ST/Women entrepreneurs', link: 'https://www.standupmitra.in', difficulty: 'Easy' },
    { name: 'MSME/Udyam Registration', amount: 'Priority lending + subsidies', eligibility: 'All businesses', link: 'https://udyamregistration.gov.in', difficulty: 'Easy' },
  ]},
  { category: '🏆 Competitions & Grants', sources: [
    { name: 'Smart India Hackathon', amount: '₹1L - ₹5L prizes', eligibility: 'College students', difficulty: 'Medium' },
    { name: 'TiE Young Entrepreneurs', amount: 'Mentorship + ₹5L', eligibility: '18-28 years', difficulty: 'Hard' },
    { name: 'NASSCOM 10K Startups', amount: 'Incubation + funding', eligibility: 'Tech startups', difficulty: 'Hard' },
    { name: 'Atal Innovation Mission', amount: '₹10L - ₹20L', eligibility: 'School/College innovators', difficulty: 'Medium' },
    { name: 'NIDHI Seed Support', amount: 'Up to ₹25L', eligibility: 'Incubated startups', difficulty: 'Medium' },
  ]},
  { category: '🏫 College & Incubator', sources: [
    { name: 'IIT Madras Incubation Cell', amount: 'Office + ₹25L seed', eligibility: 'Any startup (apply)', difficulty: 'Hard' },
    { name: 'Anna University TBI', amount: 'Workspace + mentoring', eligibility: 'TN students', difficulty: 'Medium' },
    { name: 'PSG STEP', amount: 'Incubation + seed funding', eligibility: 'Coimbatore region', difficulty: 'Medium' },
    { name: 'Villgro (Social startups)', amount: 'Up to ₹50L', eligibility: 'Social impact focus', difficulty: 'Medium' },
  ]},
];

const difficultyColor: Record<string, string> = {
  'Easy': 'bg-emerald-100 text-emerald-700',
  'Medium': 'bg-amber-100 text-amber-700',
  'Hard': 'bg-red-100 text-red-700',
};

export const BusinessModelFundingGuide = () => {
  const [activeSection, setActiveSection] = useState<'model' | 'funding'>('model');
  const [expandedBlock, setExpandedBlock] = useState<string | null>('problem');
  const [expandedFunding, setExpandedFunding] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: '180px' }}>
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop&auto=format" alt="Team building a business" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 via-violet-800/90 to-indigo-900/95" />
        <div className="relative z-10 p-6 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl shadow-amber-500/25 mb-3">
            <Puzzle className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white mb-1">
            Build Your <span className="text-amber-300">Startup</span>
          </h2>
          <p className="text-xs text-violet-300 font-medium mb-1">உங்கள் தொழிலை உருவாக்குங்கள்</p>
          <p className="text-xs text-violet-200/60 max-w-md mx-auto">
            Create your business model step-by-step and find real funding sources — all tailored for Indian student entrepreneurs
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <div className="text-center">
              <p className="text-xl font-black text-white">6</p>
              <p className="text-[9px] text-violet-400">Model Blocks</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-amber-300">14</p>
              <p className="text-[9px] text-violet-400">Funding Sources</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-emerald-300">₹30L+</p>
              <p className="text-[9px] text-violet-400">Max Grants</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle */}
      <div className="bg-white rounded-xl p-1.5 border-2 border-gray-200 shadow-sm">
        <div className="grid grid-cols-2 gap-1.5">
          <button onClick={() => setActiveSection('model')}
            className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${activeSection === 'model' ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}>
            <Puzzle className="w-4 h-4" /> Business Model
          </button>
          <button onClick={() => setActiveSection('funding')}
            className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${activeSection === 'funding' ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}>
            <Banknote className="w-4 h-4" /> Funding Guide
          </button>
        </div>
      </div>

      {/* ═══ BUSINESS MODEL CANVAS ═══ */}
      {activeSection === 'model' && (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📋</span>
              <div>
                <h3 className="text-sm font-bold text-violet-800">Business Model Canvas</h3>
                <p className="text-xs text-violet-600 mt-0.5">Answer these 6 blocks to build your startup's business model. Tap each block to see guiding questions and examples.</p>
              </div>
            </div>
          </div>

          {canvasBlocks.map((block) => {
            const isOpen = expandedBlock === block.id;
            return (
              <div key={block.id} className={`rounded-xl border-2 overflow-hidden transition-all ${isOpen ? block.border + ' shadow-md' : 'border-gray-200'}`}>
                <button onClick={() => setExpandedBlock(isOpen ? null : block.id)} className={`w-full flex items-center gap-3 p-4 text-left ${isOpen ? block.bg : 'bg-white hover:bg-gray-50'}`}>
                  <span className="text-2xl flex-shrink-0">{block.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">{block.title}</p>
                    <p className="text-xs text-gray-500">{block.desc}</p>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {isOpen && (
                  <div className={`px-4 pb-4 space-y-3 ${block.bg}`}>
                    <div>
                      <p className="text-xs font-bold text-gray-700 mb-2">💭 Ask yourself:</p>
                      <div className="space-y-1.5">
                        {block.questions.map((q, i) => (
                          <div key={i} className="flex items-start gap-2 bg-white rounded-lg p-2.5 border border-gray-200">
                            <span className="text-xs font-bold text-gray-400 mt-0.5">{i + 1}.</span>
                            <p className="text-xs text-gray-700">{q}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs font-bold text-emerald-700 mb-1">✅ Example:</p>
                      <p className="text-xs text-gray-600 italic">{block.example}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ═══ FUNDING GUIDE ═══ */}
      {activeSection === 'funding' && (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <h3 className="text-sm font-bold text-emerald-800">Startup Funding Sources — India 2026</h3>
                <p className="text-xs text-emerald-600 mt-0.5">14 real funding options for student entrepreneurs. Most require zero investment to apply!</p>
              </div>
            </div>
          </div>

          {fundingSources.map((cat, ci) => {
            const isOpen = expandedFunding === ci;
            return (
              <div key={ci} className="rounded-xl border border-gray-200 overflow-hidden bg-white">
                <button onClick={() => setExpandedFunding(isOpen ? null : ci)} className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{cat.category}</p>
                    <p className="text-xs text-gray-500">{cat.sources.length} options</p>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 space-y-2">
                    {cat.sources.map((s, si) => (
                      <div key={si} className="bg-gray-50 rounded-lg p-3 border border-gray-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-gray-900">{s.name}</p>
                          <Badge className={`text-[10px] ${difficultyColor[s.difficulty]}`}>{s.difficulty}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white rounded p-2 border border-gray-100">
                            <p className="text-[10px] text-gray-500">Amount</p>
                            <p className="text-xs font-bold text-emerald-700">{s.amount}</p>
                          </div>
                          <div className="bg-white rounded p-2 border border-gray-100">
                            <p className="text-[10px] text-gray-500">Eligibility</p>
                            <p className="text-xs font-bold text-gray-700">{s.eligibility}</p>
                          </div>
                        </div>
                        {s.link && (
                          <Button variant="link" size="sm" className="text-xs p-0 h-auto text-emerald-700" onClick={() => window.open(s.link, '_blank')}>
                            Visit Portal <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
