import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  RotateCcw,
  ChevronDown,
  Trophy,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import type { CareerMatch } from '@/lib/careerScoring';
import { SCORING_METHODOLOGY } from '@/lib/careerScoring';
import ScoreBreakdown from './ScoreBreakdown';
import RealityCheck from './RealityCheck';
import CollegesForCareer from './CollegesForCareer';
import CareerRoadmap from './CareerRoadmap';
import ActionItems from './ActionItems';
import BuildNowSkills from './BuildNowSkills';
import PathwayTypeBanner from './PathwayTypeBanner';

interface ResultsDashboardProps {
  /** Ranked matches from the deterministic scoring engine */
  matches: CareerMatch[];
  /** Optional warm narrative from the AI layer (presentation only) */
  narrative?: string;
  /** Optional per-career one-liners from the AI layer, keyed by career title */
  perCareerNotes?: Record<string, string>;
  /** True if the AI narrative degraded (rate-limit etc.) — shown subtly */
  narrativeDegraded?: boolean;
  onBack: () => void;
  onRetake: () => void;
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

const bandChip: Record<CareerMatch['band'], string> = {
  strong: 'bg-emerald-100 text-emerald-700',
  good: 'bg-blue-100 text-blue-700',
  stretch: 'bg-amber-100 text-amber-700',
};
const bandLabel: Record<CareerMatch['band'], string> = {
  strong: 'Strong match',
  good: 'Good match',
  stretch: 'Reach option',
};

export const ResultsDashboard = ({
  matches,
  narrative,
  perCareerNotes,
  narrativeDegraded,
  onBack,
  onRetake,
}: ResultsDashboardProps) => {
  // The career the student is currently exploring in depth (defaults to #1).
  const [activeId, setActiveId] = useState<string>(
    matches[0]?.pathway.id ?? '',
  );
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // A gentle, single celebratory burst — earned, not constant.
    confetti({
      particleCount: 70,
      spread: 65,
      origin: { x: 0.5, y: 0.35 },
      colors: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'],
    });
  }, []);

  if (!matches || matches.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
          <p className="text-sm text-muted-foreground">
            No results to show. Please retake the assessment.
          </p>
          <Button onClick={onRetake} className="mt-4 gap-2">
            <RotateCcw className="h-4 w-4" /> Retake
          </Button>
        </div>
      </div>
    );
  }

  const top3 = matches.slice(0, 3);
  const rest = matches.slice(3);
  const activeMatch =
    matches.find((m) => m.pathway.id === activeId) ?? matches[0];

  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleShare = (method: 'whatsapp' | 'email') => {
    const top = matches[0];
    const text = `My VAZHIKATTI Career Analysis\n\nTop match: ${top.pathway.title} (${top.score}%)\n2nd: ${matches[1]?.pathway.title ?? '-'}\n3rd: ${matches[2]?.pathway.title ?? '-'}\n\nEvery score is calculated transparently from my answers. Try it: ${window.location.origin}/career-assessment/colleges`;
    if (method === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      window.open(
        `mailto:?subject=My Career Analysis&body=${encodeURIComponent(text)}`,
        '_blank',
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-6 lg:px-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* ─── Header ─────────────────────────────────────────────── */}
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700">
              Calculated from your answers — not guessed
            </span>
          </div>
          <h1 className="text-2xl font-bold md:text-3xl">
            Your Career Analysis
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Generated {today}
          </p>
        </motion.div>

        {/* ─── AI narrative (presentation layer only) ─────────────── */}
        {narrative && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Card className="border-emerald-100 bg-emerald-50/40">
              <CardContent className="flex gap-3 p-4">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <div>
                  <p className="text-base leading-relaxed text-gray-700">
                    {narrative}
                  </p>
                  {narrativeDegraded && (
                    <p className="mt-1 text-xs italic text-gray-400">
                      (AI summary briefly unavailable — your full calculated
                      results are unaffected.)
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ─── Section 1: Top matches ─────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <h2 className="mb-3 flex items-center gap-2 text-base font-bold">
            <Trophy className="h-4 w-4 text-amber-500" />
            Your Top Matches
          </h2>

          <div className="grid gap-3 sm:grid-cols-3">
            {top3.map((match, index) => {
              const isActive = match.pathway.id === activeId;
              return (
                <motion.button
                  key={match.pathway.id}
                  variants={itemVariants}
                  onClick={() => {
                    setActiveId(match.pathway.id);
                    // Scroll the detail section into view on mobile.
                    document
                      .getElementById('career-detail')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`relative overflow-hidden rounded-xl border bg-white p-4 text-left transition-all ${
                    isActive
                      ? 'border-emerald-400 ring-2 ring-emerald-100'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="absolute right-0 top-0 rounded-bl-lg bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-500">
                    #{index + 1}
                  </div>
                  <div className="text-3xl">{match.pathway.icon}</div>
                  <h3 className="mt-2 text-base font-bold leading-tight text-gray-900">
                    {match.pathway.title}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {match.pathway.titleTa}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${match.pathway.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${match.score}%` }}
                        transition={{ duration: 0.9, delay: index * 0.15 }}
                      />
                    </div>
                    <span className="text-xs font-bold tabular-nums">
                      {match.score}%
                    </span>
                  </div>

                  <Badge
                    className={`mt-2 px-1.5 py-0 text-xs font-bold ${bandChip[match.band]}`}
                  >
                    {bandLabel[match.band]}
                  </Badge>

                  {/* Pathway type — visible BEFORE the student clicks in, so a
                      long-game career is flagged honestly right on the card. */}
                  <div className="mt-1.5">
                    <PathwayTypeBanner pathway={match.pathway} variant="compact" />
                  </div>

                  {isActive && (
                    <p className="mt-2 text-xs font-medium text-emerald-600">
                      ▾ Showing details below
                    </p>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Remaining matches */}
          {rest.length > 0 && (
            <Collapsible open={showAll} onOpenChange={setShowAll}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="mt-3 w-full gap-2">
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
                  />
                  {showAll
                    ? 'Hide other options'
                    : `See ${rest.length} more option${rest.length > 1 ? 's' : ''} you are eligible for`}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-3 space-y-2">
                  {rest.map((match) => {
                    const isActive = match.pathway.id === activeId;
                    return (
                      <button
                        key={match.pathway.id}
                        onClick={() => {
                          setActiveId(match.pathway.id);
                          document
                            .getElementById('career-detail')
                            ?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start',
                            });
                        }}
                        className={`flex w-full items-center gap-3 rounded-lg border bg-white p-3 text-left transition-all ${
                          isActive
                            ? 'border-emerald-400 ring-1 ring-emerald-100'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-2xl">{match.pathway.icon}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900">
                              {match.pathway.title}
                            </span>
                            <Badge
                              className={`px-1.5 py-0 text-xs font-bold ${bandChip[match.band]}`}
                            >
                              {match.score}%
                            </Badge>
                          </div>
                          <p className="truncate text-xs text-gray-500">
                            {match.pathway.whatIsIt}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </motion.div>

        {/* ─── Section 2: Deep dive on the selected career ────────── */}
        {/* Two columns on desktop: LEFT = who & why (identity, score
            breakdown, honest reality check); RIGHT = what to do next
            (colleges, roadmap, 90-day plan, build-now skills). Collapses to
            a single stacked column on mobile. Left column is sticky on large
            screens so the match score stays visible while scrolling actions. */}
        <div id="career-detail" className="scroll-mt-4">
          <motion.div
            key={activeMatch.pathway.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start"
          >
            {/* ── LEFT COLUMN — who & why ── */}
            <div className="space-y-4 lg:col-span-5 lg:sticky lg:top-4">
            {/* Selected-career header */}
            <Card className="overflow-hidden border-gray-200">
              <div
                className={`bg-gradient-to-r ${activeMatch.pathway.color} px-4 py-3`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeMatch.pathway.icon}</span>
                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-white">
                      {activeMatch.pathway.title}
                    </h2>
                    <p className="text-sm text-white/80">
                      {activeMatch.score}% match · {bandLabel[activeMatch.band]}
                    </p>
                  </div>
                </div>
              </div>
              <CardContent className="space-y-2 p-4">
                <p className="text-sm leading-snug text-gray-700">
                  {activeMatch.pathway.whatIsIt}
                </p>
                <p className="text-sm font-medium text-emerald-700">
                  {activeMatch.headline}
                </p>
                {perCareerNotes?.[activeMatch.pathway.title] && (
                  <p className="text-sm italic leading-snug text-gray-500">
                    {perCareerNotes[activeMatch.pathway.title]}
                  </p>
                )}

                {/* HOW a 12th student actually reaches this career — shown
                    prominently so the real route and realistic time-to-career
                    are clear before a student gets attached to a match score.
                    Every career here is one they can act on directly now. */}
                <PathwayTypeBanner pathway={activeMatch.pathway} variant="full" />

                {/* The UG course(s) that lead here */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  <span className="text-xs font-semibold text-gray-400">
                    UG course:
                  </span>
                  {activeMatch.pathway.ugCourses.map((c) => (
                    <span
                      key={c}
                      className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {/* Entrance exam — only shown when there genuinely IS one.
                    For 'None (direct admission)' careers we deliberately do NOT
                    show a chip, because "Exam: None" misleads a 12th student
                    into thinking the whole career is direct. The PathwayTypeBanner
                    above already explains the real route honestly. */}
                {activeMatch.pathway.entranceExams.some(
                  (e) => e !== 'None (direct admission)',
                ) && (
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-xs font-semibold text-gray-400">
                      Entrance exam:
                    </span>
                    {activeMatch.pathway.entranceExams
                      .filter((e) => e !== 'None (direct admission)')
                      .map((e) => (
                        <span
                          key={e}
                          className="rounded bg-violet-50 px-1.5 py-0.5 text-xs font-medium text-violet-600"
                        >
                          {e}
                        </span>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* The transparent score breakdown */}
            <ScoreBreakdown match={activeMatch} defaultOpen />

            {/* The honest reality check */}
            <RealityCheck pathway={activeMatch.pathway} />
            </div>

            {/* ── RIGHT COLUMN — what to do next ── */}
            <div className="space-y-4 lg:col-span-7">
            {/* Real, named colleges that offer this career's courses */}
            <CollegesForCareer pathway={activeMatch.pathway} />

            {/* The genuinely per-career roadmap */}
            <CareerRoadmap pathway={activeMatch.pathway} />

            {/* The 90-day action plan with persistence */}
            <ActionItems pathway={activeMatch.pathway} />

            {/* Skills to start building now */}
            <BuildNowSkills pathway={activeMatch.pathway} />
            </div>
          </motion.div>
        </div>

        {/* ─── Methodology note — transparency for everyone ───────── */}
        <Card className="mt-6 border-gray-200 bg-gray-50/60">
          <CardContent className="flex gap-2 p-3">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
            <div>
              <p className="text-sm font-semibold text-gray-600">
                How these results were produced
              </p>
              <p className="mt-0.5 text-xs leading-snug text-gray-500">
                {SCORING_METHODOLOGY.en}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ─── Actions ────────────────────────────────────────────── */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => handleShare('whatsapp')}
          >
            Share on WhatsApp
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => handleShare('email')}
          >
            Email my results
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={onRetake}
          >
            <RotateCcw className="h-4 w-4" />
            Retake assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
