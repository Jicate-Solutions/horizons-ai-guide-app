import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Rocket, Lightbulb, DollarSign, Star, ArrowRight, ExternalLink,
  BookOpen, ChevronDown, ChevronUp, CheckCircle2, Users, Award,
  Building2, BarChart3, Target, GraduationCap, Map, Zap, Globe,
  Play, TrendingUp, Sparkles, Brain
} from 'lucide-react';
import { BusinessModelFundingGuide } from './BusinessModelFundingGuide';
import { FounderJourney } from './FounderJourney';
import { cn } from '@/lib/utils';

/* ═══════════════════════════════════════
   40-DAY ROADMAP DATA
   ═══════════════════════════════════════ */
const roadmapPhases = [
  {
    phase: 1, title: 'Discover', days: 'Day 1–10', emoji: '🔍', color: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50', border: 'border-blue-300',
    goal: 'Find a real problem worth solving',
    tasks: [
      'Day 1-2: List 10 problems you see daily around your school, home, or town',
      'Day 3-4: Interview 5 people — ask "What frustrates you most about ___?"',
      'Day 5-6: Research if anyone else is solving these problems (Google, YouTube)',
      'Day 7-8: Pick your best 1 problem. Write: WHO has it, HOW OFTEN, WHY it matters',
      'Day 9-10: Talk to 10 more people who have this problem. Validate it\'s real.',
    ],
    outcome: '✅ 1 validated problem statement with proof that real people face it',
  },
  {
    phase: 2, title: 'Design', days: 'Day 11–20', emoji: '📋', color: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', border: 'border-violet-300',
    goal: 'Design your business model',
    tasks: [
      'Day 11-12: Write your solution in ONE sentence (the simpler, the better)',
      'Day 13-14: Fill the Business Model Canvas (use the Build tab here!)',
      'Day 15-16: Set pricing — ask 5 potential customers "Would you pay ₹__ for this?"',
      'Day 17-18: Calculate costs vs revenue. Can you break even in 3 months?',
      'Day 19-20: Create a simple prototype or mockup (paper, Canva, or WhatsApp group)',
    ],
    outcome: '✅ Complete business model + prototype/mockup ready',
  },
  {
    phase: 3, title: 'Test', days: 'Day 21–30', emoji: '🧪', color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50', border: 'border-amber-300',
    goal: 'Test with real customers and get feedback',
    tasks: [
      'Day 21-22: Launch your prototype to 10 real people (friends, family, schoolmates)',
      'Day 23-24: Collect feedback — "What worked? What didn\'t? Would you pay?"',
      'Day 25-26: Fix the top 3 complaints. Improve the product.',
      'Day 27-28: Try to get your FIRST paying customer or first 50 users',
      'Day 29-30: Document everything — what you learned, numbers, testimonials',
    ],
    outcome: '✅ First customers/users + real feedback + improved product',
  },
  {
    phase: 4, title: 'Launch', days: 'Day 31–40', emoji: '🚀', color: 'from-emerald-500 to-green-600', bg: 'bg-emerald-50', border: 'border-emerald-300',
    goal: 'Register, fund, and officially launch',
    tasks: [
      'Day 31-32: Register on Startup India (DPIIT) — it\'s free!',
      'Day 33-34: Register MSME/Udyam (free) — gets you govt subsidies',
      'Day 35-36: Apply for TANSIM grant or Mudra loan (use Funding tab here!)',
      'Day 37-38: Create social media presence — Instagram, WhatsApp Business',
      'Day 39-40: Official launch! Tell 100 people. Post on social media. Celebrate! 🎉',
    ],
    outcome: '✅ Registered startup + funding applied + launched to the world',
  },
];

/* ═══════════════════════════════════════
   GOVT RESOURCES
   ═══════════════════════════════════════ */
const launchResources = [
  { title: 'Startup India (DPIIT)', desc: 'Free registration. Tax benefits. Fund of Funds access.', icon: '🇮🇳', link: 'https://www.startupindia.gov.in/', gradient: 'from-orange-500 to-amber-500' },
  { title: 'TANSIM — TN Startup', desc: 'Tamil Nadu grants up to ₹30 Lakhs + mentorship.', icon: '🏛️', link: 'https://www.startuptn.in/', gradient: 'from-emerald-500 to-green-500' },
  { title: 'MSME/Udyam Registration', desc: 'Priority bank lending + govt subsidies. Free.', icon: '📋', link: 'https://udyamregistration.gov.in/', gradient: 'from-blue-500 to-indigo-500' },
  { title: 'Mudra Loan (PMMY)', desc: 'Up to ₹10 Lakhs without collateral. For anyone.', icon: '🏦', link: 'https://www.mudra.org.in/', gradient: 'from-violet-500 to-purple-500' },
  { title: 'Stand Up India', desc: '₹10L–₹1Cr for SC/ST & Women entrepreneurs.', icon: '👩', link: 'https://www.standupmitra.in/', gradient: 'from-rose-500 to-pink-500' },
  { title: 'Atal Innovation Mission', desc: '₹10–20 Lakhs for school & college innovators.', icon: '💡', link: 'https://aim.gov.in/', gradient: 'from-cyan-500 to-teal-500' },
];

/* ═══════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════ */
export const StartupGuide = () => {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);

  return (
    <div className="space-y-4">

      {/* ═══════ HERO ═══════ */}
      <div className="overflow-hidden rounded-2xl shadow-xl border border-emerald-800/30">
        {/* Visible image */}
        <div className="relative h-44 md:h-52 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=500&fit=crop&auto=format" alt="Startup team" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-[#14532d]" />
          {/* Floating quote */}
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-black/50 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10 max-w-md">
              <p className="text-white text-sm font-medium italic">"The best time to start a business was yesterday. The second best time is today."</p>
              <p className="text-amber-300 text-[10px] font-bold mt-1">— Tamil Nadu has produced ₹10,000+ Crore startups from small towns</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-b from-[#14532d] to-[#1a4731] px-5 py-6 text-center">
          <div className="mx-auto w-[64px] h-[64px] rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl shadow-amber-500/30 -mt-12 border-4 border-[#14532d] mb-3">
            <Rocket className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white mb-1">
            From Zero to <span className="bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">Startup</span> in 40 Days
          </h2>
          <p className="text-xs text-emerald-300 font-medium mb-1">தொழில்முனைவோர் வழிகாட்டி</p>
          <p className="text-xs text-white/50 max-w-md mx-auto">A step-by-step guide designed for Tamil Nadu students — no experience needed, no money needed to start</p>

          <div className="flex justify-center gap-8 mt-4">
            {[
              { val: '40', label: 'Day Plan', icon: '📅' },
              { val: '₹30L', label: 'Grants Available', icon: '💰' },
              { val: '6', label: 'Govt Schemes', icon: '🏛️' },
              { val: '15+', label: 'Founder Stories', icon: '🌟' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-lg font-black text-white">{s.val}</p>
                <p className="text-[9px] text-emerald-400/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════ TAB NAVIGATION ═══════ */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white rounded-xl p-1.5 border-2 border-gray-200 shadow-sm">
          <TabsList className="w-full grid grid-cols-4 bg-transparent p-0 h-auto gap-1">
            {[
              { id: 'roadmap', icon: Map, label: '40-Day Plan', emoji: '🗺️' },
              { id: 'build', icon: Lightbulb, label: 'Build Model', emoji: '📋' },
              { id: 'funding', icon: DollarSign, label: 'Funding', emoji: '💰' },
              { id: 'founders', icon: Star, label: 'Founders', emoji: '🌟' },
            ].map(tab => (
              <TabsTrigger key={tab.id} value={tab.id}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2.5 rounded-lg text-[11px] font-bold transition-all",
                  "data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg",
                  "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                )}>
                <span className="text-lg">{tab.emoji}</span>
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* ═══════ TAB 1: 40-DAY ROADMAP ═══════ */}
        <TabsContent value="roadmap" className="mt-4 space-y-4">
          {/* Phase overview */}
          <div className="grid grid-cols-4 gap-2">
            {roadmapPhases.map(p => (
              <button key={p.phase} onClick={() => setExpandedPhase(p.phase)}
                className={cn("rounded-xl p-3 text-center border-2 transition-all",
                  expandedPhase === p.phase ? `${p.bg} ${p.border} shadow-md` : 'bg-white border-gray-200 hover:border-gray-300')}>
                <span className="text-2xl block mb-1">{p.emoji}</span>
                <p className="text-xs font-bold text-gray-800">{p.title}</p>
                <p className="text-[9px] text-gray-500">{p.days}</p>
              </button>
            ))}
          </div>

          {/* Expanded phase detail */}
          {expandedPhase && (() => {
            const p = roadmapPhases.find(r => r.phase === expandedPhase)!;
            return (
              <Card className={cn("border-2 overflow-hidden", p.border)}>
                <div className={cn("p-4", p.bg)}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br text-white flex items-center justify-center text-2xl shadow-lg", p.color)}>
                      {p.emoji}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">Phase {p.phase}: {p.title}</h3>
                      <p className="text-xs text-gray-600">{p.days} — {p.goal}</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4 space-y-3">
                  {p.tasks.map((task, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[10px] font-bold text-gray-500">{i + 1}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{task}</p>
                    </div>
                  ))}
                  <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                    <p className="text-xs font-bold text-emerald-800">{p.outcome}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })()}

          {/* What you'll achieve */}
          <div className="bg-gradient-to-r from-gray-900 to-slate-800 rounded-2xl p-5 text-center">
            <p className="text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">After 40 Days, You'll Have</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { emoji: '🎯', text: 'Validated Problem' },
                { emoji: '📋', text: 'Business Model' },
                { emoji: '👥', text: 'First Customers' },
                { emoji: '📄', text: 'Govt Registration' },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <span className="text-2xl block mb-1">{item.emoji}</span>
                  <p className="text-xs font-bold text-white">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links to govt resources */}
          <div>
            <p className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-emerald-600" /> Government Resources — Start for Free
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              {launchResources.map((r, i) => (
                <button key={i} onClick={() => r.link && window.open(r.link, '_blank')}
                  className="bg-white rounded-xl p-3 border border-gray-200 text-left hover:shadow-md hover:border-emerald-300 transition-all group">
                  <span className="text-xl block mb-1.5">{r.icon}</span>
                  <p className="text-xs font-bold text-gray-900 mb-0.5">{r.title}</p>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{r.desc}</p>
                  {r.link && (
                    <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-1.5 group-hover:underline">
                      Visit <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ═══════ TAB 2: BUILD MODEL ═══════ */}
        <TabsContent value="build" className="mt-4">
          <BusinessModelFundingGuide defaultSection="canvas" />
        </TabsContent>

        {/* ═══════ TAB 3: FUNDING ═══════ */}
        <TabsContent value="funding" className="mt-4">
          <BusinessModelFundingGuide defaultSection="funding" />
        </TabsContent>

        {/* ═══════ TAB 4: FOUNDER STORIES ═══════ */}
        <TabsContent value="founders" className="mt-4">
          <FounderJourney />
        </TabsContent>
      </Tabs>
    </div>
  );
};
