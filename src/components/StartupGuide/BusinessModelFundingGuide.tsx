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
  { category: '🏛️ Government Schemes (Tamil Nadu)', icon: '🏛️', color: 'from-emerald-600 to-green-700', sources: [
    { name: 'TANSIM Startup Grant', amount: 'Up to ₹30 Lakhs', eligibility: 'TN-based startup, registered under Startup TN', link: 'https://www.startuptn.in', difficulty: 'Medium', howToApply: '1. Register on startuptn.in → 2. Submit business plan → 3. Pitch to TANSIM panel → 4. Get approved', tip: 'Having a prototype or MVP significantly increases approval chances.' },
    { name: 'TANSEED 2.0', amount: '₹5L - ₹15L seed fund', eligibility: 'Startups incubated in TN', link: 'https://www.startuptn.in/tanseed', difficulty: 'Medium', howToApply: '1. Get incubated at a TN incubator → 2. Apply during TANSEED call → 3. Pitch to judges', tip: 'Apply through Anna University TBI or IIT-M incubator for best chances.' },
    { name: 'Pudhumai Penn Startup Support', amount: 'Special grants for women', eligibility: 'Women entrepreneurs in TN', link: 'https://www.startuptn.in', difficulty: 'Easy', howToApply: '1. Register as woman entrepreneur → 2. Submit plan → 3. Get mentoring + funding', tip: 'Combine with Stand Up India for up to ₹1 Crore.' },
    { name: 'TN Skill Development Corp', amount: 'Free training + placement', eligibility: 'TN youth 18-35', link: 'https://www.tnsdc.in', difficulty: 'Easy', howToApply: '1. Register on TNSDC portal → 2. Choose skill program → 3. Complete training → 4. Get certificate', tip: 'Great for building skills before starting a business.' },
  ]},
  { category: '🇮🇳 Central Government Schemes', icon: '🇮🇳', color: 'from-orange-500 to-red-600', sources: [
    { name: 'Startup India (DPIIT)', amount: 'Tax benefits + ₹10Cr Fund of Funds', eligibility: 'Any startup < 10 years old', link: 'https://www.startupindia.gov.in', difficulty: 'Medium', howToApply: '1. Register on startupindia.gov.in → 2. Get DPIIT recognition number → 3. Apply for tax exemption → 4. Access Fund of Funds', tip: 'DPIIT recognition is FREE and opens doors to all government benefits.' },
    { name: 'PMMY Mudra Loan', amount: 'Up to ₹10 Lakhs (NO collateral)', eligibility: 'Any Indian citizen with business plan', link: 'https://www.mudra.org.in', difficulty: 'Easy', howToApply: '1. Visit any bank branch → 2. Fill Mudra loan application → 3. Submit business plan → 4. Get loan in 7-14 days', tip: 'Shishu (₹50K), Kishore (₹5L), Tarun (₹10L). Start with Shishu — easiest to get!' },
    { name: 'Stand Up India', amount: '₹10 Lakhs - ₹1 Crore', eligibility: 'SC/ST/Women entrepreneurs', link: 'https://www.standupmitra.in', difficulty: 'Easy', howToApply: '1. Register on standupmitra.in → 2. Connect with bank → 3. Submit business plan → 4. Get loan', tip: 'Every bank branch MUST give at least 1 loan to SC/ST and 1 to women. Use this right!' },
    { name: 'MSME Udyam Registration', amount: 'Priority lending + subsidies + govt tenders', eligibility: 'All businesses', link: 'https://udyamregistration.gov.in', difficulty: 'Easy', howToApply: '1. Go to udyamregistration.gov.in → 2. Enter Aadhaar + PAN → 3. Fill business details → 4. Get certificate instantly (FREE)', tip: 'Takes just 10 minutes. Opens access to govt contracts, lower interest loans, and subsidies.' },
    { name: 'PM Vishwakarma Scheme', amount: '₹3 Lakhs collateral-free + training', eligibility: 'Traditional artisans/craftspeople', link: 'https://pmvishwakarma.gov.in', difficulty: 'Easy', howToApply: '1. Register via CSC/gram panchayat → 2. Verify skills → 3. Get ₹15K toolkit + ₹1L-3L loan', tip: 'Perfect for food, handicraft, or manufacturing startups.' },
    { name: 'NIDHI Seed Support (DST)', amount: 'Up to ₹25 Lakhs', eligibility: 'Startups in govt-recognized incubators', link: 'https://nidhi-sss.in', difficulty: 'Medium', howToApply: '1. Get incubated → 2. Apply through incubator → 3. Submit detailed plan → 4. Review panel', tip: 'Get incubated at IIT-M or Anna Univ TBI first, then apply.' },
  ]},
  { category: '🏆 Competitions, Grants & Prizes', icon: '🏆', color: 'from-amber-500 to-yellow-600', sources: [
    { name: 'Smart India Hackathon (SIH)', amount: '₹1L - ₹5L per team', eligibility: 'College students (team of 6)', link: 'https://sih.gov.in', difficulty: 'Medium', howToApply: '1. Form team of 6 → 2. Register on SIH portal → 3. Submit solution for a problem statement → 4. Win at college → 5. National finals', tip: 'Pick a problem from Ministry of Rural Development — they fund winning solutions!' },
    { name: 'Atal Innovation Mission (AIM)', amount: '₹10L - ₹20L', eligibility: 'School/College innovators', link: 'https://aim.gov.in', difficulty: 'Medium', howToApply: '1. Work through Atal Tinkering Lab → 2. Submit innovation → 3. Get funded', tip: 'If your school has an ATL, use it! Free equipment + mentoring.' },
    { name: 'TiE Young Entrepreneurs', amount: 'Mentorship + up to ₹5L', eligibility: 'Age 18-28', link: 'https://tie.org', difficulty: 'Hard', howToApply: '1. Apply online → 2. Business plan review → 3. Interview → 4. 6-month mentoring program', tip: 'TiE Chennai chapter is very active. Attend their monthly events to network.' },
    { name: 'Wadhwani Foundation', amount: 'Training + market access', eligibility: 'Student entrepreneurs', link: 'https://wfglobal.org', difficulty: 'Easy', howToApply: '1. Register on portal → 2. Complete NEN modules → 3. Get mentoring + pitch opportunities', tip: 'Free entrepreneurship training used by 1000+ colleges in India.' },
    { name: 'NASSCOM 10K Startups', amount: 'Incubation + connections + funding access', eligibility: 'Tech startups', link: 'https://10000startups.com', difficulty: 'Hard', howToApply: '1. Apply online → 2. Screening → 3. Get incubation + investor access', tip: 'Best for tech/software startups. Gets you direct access to VCs.' },
    { name: 'IIM Bangalore NSRCEL', amount: '₹10L - ₹50L', eligibility: 'Early-stage startups', link: 'https://www.nsrcel.org', difficulty: 'Hard', howToApply: '1. Apply to NSRCEL accelerator → 2. Selection process → 3. 6-month program → 4. Demo day + funding', tip: 'One of India\'s top accelerators. Apply even if you\'re from TN — they accept nationwide.' },
  ]},
  { category: '🏫 TN College Incubators', icon: '🏫', color: 'from-blue-500 to-indigo-600', sources: [
    { name: 'IIT Madras Incubation Cell', amount: 'Office space + ₹25L seed', eligibility: 'Any startup (nationwide)', link: 'https://www.iitmincubation.in', difficulty: 'Hard', howToApply: '1. Apply online → 2. Screening → 3. Interview → 4. Get incubated', tip: 'India\'s #1 incubator. Even non-IIT students can apply!' },
    { name: 'Anna University TBI', amount: 'Workspace + mentoring + seed funding', eligibility: 'TN students & alumni', link: 'https://www.annauniv.edu', difficulty: 'Medium', howToApply: '1. Visit Anna Univ TBI → 2. Submit application → 3. Present idea → 4. Get incubated', tip: 'Closest option for TN students. Walk-in consultations available.' },
    { name: 'PSG STEP (Coimbatore)', amount: 'Incubation + seed funding', eligibility: 'Coimbatore/Western TN region', link: 'https://www.psgstep.in', difficulty: 'Medium', howToApply: '1. Apply online → 2. Interview → 3. 6-month incubation', tip: 'Strong manufacturing and hardware focus. Great for product startups.' },
    { name: 'Villgro (Social Impact)', amount: 'Up to ₹50 Lakhs', eligibility: 'Social impact startups', link: 'https://villgro.org', difficulty: 'Medium', howToApply: '1. Apply during open call → 2. Due diligence → 3. Investment + mentoring', tip: 'Best for healthcare, agriculture, education, and clean energy startups.' },
    { name: 'FORGE Accelerator (Coimbatore)', amount: 'Mentoring + ₹5L', eligibility: 'Early-stage startups', link: 'https://www.forge.co.in', difficulty: 'Easy', howToApply: '1. Apply online → 2. Selection → 3. 3-month accelerator', tip: 'Great starter program. Less competitive than IIT-M.' },
  ]},
  { category: '💳 Alternative Funding', icon: '💳', color: 'from-violet-500 to-purple-600', sources: [
    { name: 'Crowdfunding (Ketto/Milaap)', amount: '₹1L - ₹50L+', eligibility: 'Anyone with a compelling story', link: 'https://www.ketto.org', difficulty: 'Medium', howToApply: '1. Create campaign on Ketto/Milaap → 2. Add video + story → 3. Share on WhatsApp/social media → 4. Collect funds', tip: 'Social impact and creative projects work best. Make a compelling 2-minute video!' },
    { name: 'Angel Investors (via LetsVenture)', amount: '₹10L - ₹1Cr', eligibility: 'Startups with traction/MVP', link: 'https://letsventure.com', difficulty: 'Hard', howToApply: '1. Build MVP → 2. Get some users → 3. Apply on LetsVenture → 4. Pitch to angels', tip: 'Chennai Angel Network is very active. Attend startup meetups to find angels.' },
    { name: 'Revenue-Based (Bootstrapping)', amount: 'Unlimited (self-funded)', eligibility: 'Any business with customers', difficulty: 'Easy', howToApply: '1. Start selling → 2. Reinvest profits → 3. Grow organically', tip: 'Zoho (Tenkasi, TN) was bootstrapped to $5B! No investors needed if you have customers.' },
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
              <p className="text-xl font-black text-amber-300">28</p>
              <p className="text-[9px] text-violet-400">Funding Sources</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-emerald-300">₹1Cr+</p>
              <p className="text-[9px] text-violet-400">Max Funding</p>
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
          {/* Stats banner */}
          <div className="rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-700 to-green-800 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Banknote className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Startup Funding Sources — India 2026</h3>
                  <p className="text-xs text-emerald-200">Complete guide for Tamil Nadu student entrepreneurs</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { val: '28+', label: 'Sources', color: 'text-white' },
                  { val: '5', label: 'Categories', color: 'text-amber-300' },
                  { val: '₹1Cr+', label: 'Max Funding', color: 'text-emerald-300' },
                  { val: 'FREE', label: 'To Apply', color: 'text-yellow-300' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/10 rounded-lg p-2 text-center">
                    <p className={`text-lg font-black ${s.color}`}>{s.val}</p>
                    <p className="text-[9px] text-emerald-300">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Quick tip */}
            <div className="bg-amber-50 border-t-2 border-amber-300 px-4 py-2.5 flex items-center gap-2">
              <span className="text-lg">💡</span>
              <p className="text-xs text-amber-800"><strong>Pro Tip:</strong> Start with Mudra Loan (₹10L, no collateral, any bank) + MSME Registration (free, 10 mins). These two alone give you funding + govt benefits.</p>
            </div>
          </div>

          {/* Funding categories */}
          {fundingSources.map((cat, ci) => {
            const isOpen = expandedFunding === ci;
            return (
              <div key={ci} className="rounded-xl border-2 overflow-hidden bg-white transition-all" style={{ borderColor: isOpen ? '#10b981' : '#e5e7eb' }}>
                <button onClick={() => setExpandedFunding(isOpen ? null : ci)} className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-lg text-white shadow-md`}>
                      {cat.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{cat.category}</p>
                      <p className="text-xs text-gray-500">{cat.sources.length} options available</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-100 text-emerald-700 text-[10px]">{cat.sources.length}</Badge>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 space-y-3">
                    {cat.sources.map((s, si) => (
                      <div key={si} className="rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all">
                        {/* Header */}
                        <div className="p-3 bg-gray-50 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-gray-900">{s.name}</p>
                            <Badge className={`text-[10px] ${difficultyColor[s.difficulty]}`}>{s.difficulty}</Badge>
                          </div>
                          <p className="text-sm font-black text-emerald-700">{s.amount}</p>
                        </div>
                        {/* Details */}
                        <div className="p-3 space-y-2.5">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-blue-50 rounded-lg p-2.5 border border-blue-100">
                              <p className="text-[10px] text-blue-500 font-medium">👤 Who Can Apply</p>
                              <p className="text-xs font-bold text-blue-800 mt-0.5">{s.eligibility}</p>
                            </div>
                            <div className="bg-emerald-50 rounded-lg p-2.5 border border-emerald-100">
                              <p className="text-[10px] text-emerald-500 font-medium">💰 Amount</p>
                              <p className="text-xs font-bold text-emerald-800 mt-0.5">{s.amount}</p>
                            </div>
                          </div>

                          {/* How to Apply */}
                          {s.howToApply && (
                            <div className="bg-violet-50 rounded-lg p-2.5 border border-violet-100">
                              <p className="text-[10px] text-violet-600 font-bold mb-1">📋 How to Apply:</p>
                              <p className="text-xs text-violet-800 leading-relaxed">{s.howToApply}</p>
                            </div>
                          )}

                          {/* Pro Tip */}
                          {s.tip && (
                            <div className="bg-amber-50 rounded-lg p-2.5 border border-amber-200">
                              <p className="text-[10px] text-amber-600 font-bold mb-0.5">💡 Insider Tip:</p>
                              <p className="text-xs text-amber-800">{s.tip}</p>
                            </div>
                          )}

                          {/* Apply button */}
                          {s.link && (
                            <Button
                              size="sm"
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg h-9 gap-1.5"
                              onClick={() => window.open(s.link, '_blank')}
                            >
                              <ExternalLink className="w-3.5 h-3.5" /> Apply Now — Visit Official Portal
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-gray-900 to-slate-800 rounded-xl p-5 text-center">
            <p className="text-lg font-bold text-white mb-1">🎯 Don't Know Where to Start?</p>
            <p className="text-xs text-gray-400 mb-3 max-w-md mx-auto">Follow this order: 1. MSME Registration (free) → 2. Mudra Loan (₹10L) → 3. Startup India (tax benefits) → 4. TANSIM (₹30L grant)</p>
            <div className="flex justify-center gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs">Step 1: MSME</Badge>
              <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs">Step 2: Mudra</Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs">Step 3: DPIIT</Badge>
              <Badge className="bg-violet-500/20 text-violet-300 border border-violet-500/30 text-xs">Step 4: TANSIM</Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
