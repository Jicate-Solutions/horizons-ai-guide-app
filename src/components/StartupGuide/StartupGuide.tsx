import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Rocket, Lightbulb, Users, TrendingUp, BookOpen, Target, DollarSign, Award,
  ExternalLink, ChevronDown, ChevronUp, Search, BarChart3, Mic,
  Gamepad2, Map, Trophy, Activity, CheckCircle2, Lock,
  Star, Flame, ArrowRight, Sparkles, GraduationCap, Building2, Zap,
  Brain, Compass, BadgeCheck, Layers, Route, Globe
} from 'lucide-react';
import { DailyLesson } from './DailyLesson';
import { AIProblemFinder } from './AIProblemFinder';
import { MoneyMinuteQuiz } from './MoneyMinuteQuiz';
import { ProblemOfTheDay } from './ProblemOfTheDay';
import { StartupSimulator } from './StartupSimulator';
import { FounderStories } from './FounderStories';
import { FounderJourney } from './FounderJourney';
import { BusinessModelFundingGuide } from './BusinessModelFundingGuide';
import { useStartupProgress } from './useStartupProgress';

const journeyStages = [
  { id: 1, weeks: '1–2', title: 'What Even Is Entrepreneurship?', description: 'Shatter myths. Discover that entrepreneurs are problem-solvers.', outcome: '"Wait… maybe I could do this too."', color: 'from-amber-500 to-orange-500' },
  { id: 2, weeks: '3–6', title: 'Find a Problem Worth Solving', description: 'Learn customer discovery, observation, and problem validation.', outcome: '2–3 validated problems worth solving.', color: 'from-blue-500 to-indigo-600' },
  { id: 3, weeks: '7–10', title: 'Turn a Problem Into a Business', description: 'Business Model Canvas, MVPs, and unit economics.', outcome: '1 strong idea with a validated model.', color: 'from-orange-500 to-green-600' },
  { id: 4, weeks: '11–16', title: 'Plan and Build It', description: 'Business plan, brand identity, marketing, financials.', outcome: 'Complete business plan + confident pitch.', color: 'from-purple-500 to-violet-600' },
  { id: 5, weeks: '17–24', title: 'Test in the Real World', description: 'Simulation, mentors, and real-world testing.', outcome: 'Experience the startup rollercoaster safely.', color: 'from-rose-500 to-pink-600' },
  { id: 6, weeks: '25–40', title: 'Actually Launch', description: 'Startup India, MSME, TANSIM, competitions.', outcome: 'Launch-ready or know exactly what to develop.', color: 'from-cyan-500 to-amber-600' },
];

export const StartupGuide = () => {
  const [activeTab, setActiveTab] = useState('build');
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const progress = useStartupProgress();

  return (
    <div className="space-y-0">
      {/* ===== GREEN HERO SECTION ===== */}
      <div className="overflow-hidden rounded-2xl mb-6 shadow-xl border border-emerald-800/50">
        {/* TOP: Clearly visible image */}
        <div className="relative h-44 md:h-56 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=500&fit=crop&auto=format" alt="Startup team working together" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#14532d]" />
          {/* Badge on image */}
          <div className="absolute top-4 left-4">
            <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-white border border-white/20 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Startup Blueprint · India 2026
            </div>
          </div>
          {/* Stats floating on image */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <div className="bg-black/50 backdrop-blur-md rounded-lg px-3 py-2 text-center border border-white/10">
              <p className="text-lg font-black text-amber-300">{progress.xp}</p>
              <p className="text-[8px] text-white/60 uppercase">XP</p>
            </div>
            <div className="bg-black/50 backdrop-blur-md rounded-lg px-3 py-2 text-center border border-white/10">
              <p className="text-lg font-black text-orange-300">{progress.streak}🔥</p>
              <p className="text-[8px] text-white/60 uppercase">Streak</p>
            </div>
          </div>
        </div>

        {/* BOTTOM: Content on solid green */}
        <div className="bg-gradient-to-b from-[#14532d] to-[#1a4731] px-6 py-6 text-center">
          {/* Rocket icon overlapping image */}
          <div className="mx-auto w-[68px] h-[68px] rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl shadow-amber-500/30 -mt-12 border-4 border-[#14532d] mb-4">
            <Rocket className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight font-serif italic">
            The <span className="bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">Complete</span> Startup
          </h2>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight font-serif italic mb-2">
            Guide for <span className="bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">Student Founders</span>
          </h2>

          <p className="text-sm text-emerald-300 font-medium mb-2">தொழில்முனைவோர் வழிகாட்டி</p>
          <p className="text-xs text-white/50 max-w-lg mx-auto mb-5">
            AI-powered problem finding → Business model → Funding guide → 40-week launch roadmap
          </p>

          {/* Stats row */}
          <div className="flex justify-center gap-5 md:gap-8">
            {[
              { icon: <Zap className="w-4 h-4" />, val: progress.xp, label: 'XP Earned', color: 'text-amber-300' },
              { icon: <Flame className="w-4 h-4" />, val: progress.streak, label: 'Day Streak', color: 'text-yellow-300' },
              { icon: <BookOpen className="w-4 h-4" />, val: progress.completedLessons.length, label: 'Lessons', color: 'text-emerald-300' },
              { icon: <Activity className="w-4 h-4" />, val: progress.overallScore, label: 'Readiness', color: 'text-green-300' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className={`flex items-center justify-center gap-1.5 ${s.color}`}>
                  {s.icon}
                  <span className="text-xl font-black text-white">{s.val}</span>
                </div>
                <p className="text-[9px] text-white/40 font-medium uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== WHAT YOU'LL LEARN STRIP ===== */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
        {[
          { emoji: '💡', label: 'Find Ideas' },
          { emoji: '📚', label: 'Learn & Quiz' },
          { emoji: '📋', label: 'Business Model' },
          { emoji: '🎮', label: 'Simulator' },
          { emoji: '🌟', label: 'Founders' },
          { emoji: '💰', label: 'Funding Guide' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-2.5 border border-gray-200 text-center shadow-sm hover:shadow-md hover:border-emerald-300 transition-all">
            <span className="text-xl block mb-1">{item.emoji}</span>
            <p className="text-[10px] font-bold text-gray-700 leading-tight">{item.label}</p>
          </div>
        ))}
      </div>

      {/* ===== FEATURE TABS ===== */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-gradient-to-r from-[#14532d] via-[#166534] to-[#14532d] rounded-xl p-1.5 mb-5 border border-emerald-700/30 shadow-lg">
          <TabsList className="w-full flex overflow-x-auto gap-1 bg-transparent p-0 h-auto">
            <TabsTrigger value="ideas" className="text-[11px] md:text-xs flex-1 min-w-[70px] px-2 py-2.5 text-white/50 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400 data-[state=active]:text-green-900 data-[state=active]:font-bold data-[state=active]:shadow-lg hover:text-white/80 font-medium gap-1">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Find Ideas</span>
            </TabsTrigger>
            <TabsTrigger value="learn" className="text-[11px] md:text-xs flex-1 min-w-[70px] px-2 py-2.5 text-white/50 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400 data-[state=active]:text-green-900 data-[state=active]:font-bold data-[state=active]:shadow-lg hover:text-white/80 font-medium gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Learn</span>
            </TabsTrigger>
            <TabsTrigger value="build" className="text-[11px] md:text-xs flex-1 min-w-[70px] px-2 py-2.5 text-white/50 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400 data-[state=active]:text-green-900 data-[state=active]:font-bold data-[state=active]:shadow-lg hover:text-white/80 font-medium gap-1 relative">
              <Layers className="w-3.5 h-3.5" />
              <span>Build</span>
              <span className="absolute -top-1.5 -right-1 bg-red-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full leading-none shadow-md animate-pulse">NEW</span>
            </TabsTrigger>
            <TabsTrigger value="simulate" className="text-[11px] md:text-xs flex-1 min-w-[70px] px-2 py-2.5 text-white/50 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400 data-[state=active]:text-green-900 data-[state=active]:font-bold data-[state=active]:shadow-lg hover:text-white/80 font-medium gap-1">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Simulator</span>
            </TabsTrigger>
            <TabsTrigger value="founders" className="text-[11px] md:text-xs flex-1 min-w-[70px] px-2 py-2.5 text-white/50 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400 data-[state=active]:text-green-900 data-[state=active]:font-bold data-[state=active]:shadow-lg hover:text-white/80 font-medium gap-1">
              <Star className="w-3.5 h-3.5" />
              <span>TN Founders</span>
            </TabsTrigger>
            <TabsTrigger value="journey" className="text-[11px] md:text-xs flex-1 min-w-[70px] px-2 py-2.5 text-white/50 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-400 data-[state=active]:text-green-900 data-[state=active]:font-bold data-[state=active]:shadow-lg hover:text-white/80 font-medium gap-1">
              <Route className="w-3.5 h-3.5" />
              <span>My Journey</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* === TAB 1: FIND IDEAS === */}
        <TabsContent value="ideas" className="mt-4 space-y-4">
          <AIProblemFinder />
          <ProblemOfTheDay onSubmit={progress.submitProblem} />
        </TabsContent>

        {/* === TAB 2: LEARN === */}
        <TabsContent value="learn" className="mt-4 space-y-4">
          <MoneyMinuteQuiz onComplete={progress.completeQuiz} />
        </TabsContent>

        {/* === TAB 3: BUILD (Business Model + Funding) === */}
        <TabsContent value="build" className="mt-4">
          <BusinessModelFundingGuide />
        </TabsContent>

        {/* === TAB 4: SIMULATOR === */}
        <TabsContent value="simulate" className="mt-4">
          <StartupSimulator completedScenarios={progress.completedScenarios} onCompleteScenario={progress.completeScenario} />
        </TabsContent>

        {/* === TAB 4: TN FOUNDERS === */}
        <TabsContent value="founders" className="mt-4">
          <FounderStories />
        </TabsContent>

        {/* === TAB 5: MY JOURNEY === */}
        <TabsContent value="journey" className="mt-4 space-y-4">
          <FounderJourney />

          {/* My Progress & Achievements */}
          <div className="bg-gradient-to-br from-[#14532d] via-[#166534] to-[#1a4731] rounded-xl p-5 border border-emerald-700/30 text-center shadow-lg">
              <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/25 text-amber-300 px-4 py-1.5 rounded-full text-[11px] font-semibold mb-3">
                <Users className="w-3.5 h-3.5" />
                My Progress
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Startup Journey Tracker</h3>
              <p className="text-xs text-white/50 max-w-md mx-auto">
                Track your progress, achievements, and milestones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Progress Card */}
              <Card className="border-border/40 overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-md">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">My Progress</p>
                      <p className="text-xs text-muted-foreground">Your startup readiness score</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Overall Readiness</span>
                      <span className="font-bold text-foreground">{progress.overallScore}%</span>
                    </div>
                    <Progress value={progress.overallScore} className="h-2" />
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="bg-amber-50 rounded-lg p-3 text-center">
                        <p className="text-lg font-bold text-amber-700">{progress.xp}</p>
                        <p className="text-[10px] text-amber-600 font-medium">XP Earned</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3 text-center">
                        <p className="text-lg font-bold text-orange-700">{progress.streak}</p>
                        <p className="text-[10px] text-orange-600 font-medium">Day Streak</p>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-3 text-center">
                        <p className="text-lg font-bold text-emerald-700">{progress.completedLessons.length}</p>
                        <p className="text-[10px] text-emerald-600 font-medium">Lessons Done</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <p className="text-lg font-bold text-blue-700">{progress.completedScenarios.length}</p>
                        <p className="text-[10px] text-blue-600 font-medium">Scenarios</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements Card */}
              <Card className="border-border/40 overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-md">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Achievements</p>
                      <p className="text-xs text-muted-foreground">Badges & milestones unlocked</p>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { title: 'First Problem Identified', desc: 'Found your first problem to solve', icon: '🎯', done: progress.xp > 0 },
                      { title: 'Quiz Champion', desc: 'Completed a funding quiz', icon: '🧠', done: progress.completedLessons.length > 0 },
                      { title: 'Week Warrior', desc: '7-day learning streak', icon: '🔥', done: progress.streak >= 7 },
                      { title: 'Scenario Master', desc: 'Completed 3 startup scenarios', icon: '🚀', done: progress.completedScenarios.length >= 3 },
                      { title: 'Startup Ready', desc: 'Reached 80% readiness score', icon: '⭐', done: progress.overallScore >= 80 },
                    ].map((badge, i) => (
                      <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg border ${badge.done ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200 opacity-50'}`}>
                        <span className="text-xl">{badge.icon}</span>
                        <div className="flex-1">
                          <p className={`text-xs font-semibold ${badge.done ? 'text-emerald-800' : 'text-gray-500'}`}>{badge.title}</p>
                          <p className="text-[10px] text-muted-foreground">{badge.desc}</p>
                        </div>
                        {badge.done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Journey Stages */}
            <Card className="border-border/40 overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md">
                    <Map className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">My Startup Journey</p>
                    <p className="text-xs text-muted-foreground">40-week roadmap to launching your startup</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {journeyStages.map((stage) => (
                    <div key={stage.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/40 hover:border-emerald-300/50 transition-all">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center text-white text-xs font-bold shadow-md flex-shrink-0`}>
                        {stage.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground">{stage.title}</p>
                        <p className="text-[10px] text-muted-foreground">Weeks {stage.weeks}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground font-medium px-2 py-1 bg-gray-100 rounded-full">Upcoming</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
        </TabsContent>
      </Tabs>

      {/* ===== LAUNCH RESOURCES ===== */}
      <div className="mt-6">
        <div className="bg-gradient-to-r from-[#14532d] via-[#166534] to-[#14532d] rounded-xl p-4 mb-4 border border-emerald-700/30 shadow-lg">
          <h3 className="text-sm font-bold text-white text-center flex items-center justify-center gap-2">
            <Rocket className="w-4 h-4 text-amber-300" />
            Real-World Launchkit
          </h3>
          <p className="text-[10px] text-white/50 text-center mt-1">Step-by-step guidance to start a business in India</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { title: 'Startup India Registration', desc: 'DPIIT recognition, tax benefits, IPR support.', icon: <Building2 className="w-4 h-4" />, link: 'https://www.startupindia.gov.in/', gradient: 'from-orange-500 to-amber-500' },
            { title: 'MSME/Udyam Registration', desc: 'Free registration. Priority lending & subsidies.', icon: <Award className="w-4 h-4" />, link: 'https://udyamregistration.gov.in/', gradient: 'from-emerald-500 to-green-500' },
            { title: 'TANSIM Programs', desc: 'Tamil Nadu startup grants up to ₹30L & mentorship.', icon: <Map className="w-4 h-4" />, link: 'https://www.startuptn.in/', gradient: 'from-blue-500 to-indigo-500' },
            { title: 'PMMY Mudra Loans', desc: 'Up to ₹10L without collateral. Shishu/Kishore/Tarun.', icon: <DollarSign className="w-4 h-4" />, link: 'https://www.mudra.org.in/', gradient: 'from-violet-500 to-purple-500' },
            { title: 'GST Registration', desc: 'When needed (₹20L+ turnover) and how to register.', icon: <BarChart3 className="w-4 h-4" />, gradient: 'from-rose-500 to-pink-500' },
            { title: 'TANSIM Incubation', desc: 'Access TN startup incubators, mentors, and seed funding.', icon: <GraduationCap className="w-4 h-4" />, gradient: 'from-cyan-500 to-teal-500' },
            { title: 'College E-Cells', desc: 'Best startup incubators: IIT-M, IIM-A, NSRCEL, EDII.', icon: <Building2 className="w-4 h-4" />, gradient: 'from-amber-500 to-yellow-500' },
            { title: 'Startup Competitions', desc: 'Smart India Hackathon, TiE, NASSCOM & more.', icon: <Trophy className="w-4 h-4" />, gradient: 'from-red-500 to-orange-500' },
          ].map((guide, i) => (
            <Card key={i} className="group border-border/40 hover:border-green-300/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 overflow-hidden">
              <CardContent className="p-3.5 flex items-start gap-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${guide.gradient} text-white flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                  {guide.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{guide.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{guide.desc}</p>
                  {guide.link && (
                    <Button variant="link" size="sm" className="text-xs p-0 h-auto mt-1 text-green-700 hover:text-green-800" onClick={() => window.open(guide.link, '_blank')}>
                      Visit Portal <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
