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
  Calculator,
  Scale,
  Building2,
  ListChecks,
  Download,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';

import type { CareerMatch } from '@/lib/careerScoring';
import { SCORING_METHODOLOGY } from '@/lib/careerScoring';
import ScoreBreakdown from './ScoreBreakdown';
import RealityCheck from './RealityCheck';
import CollegesForCareer from './CollegesForCareer';
import CareerRoadmap from './CareerRoadmap';
import ActionItems from './ActionItems';
import BuildNowSkills from './BuildNowSkills';
import PathwayTypeBanner from './PathwayTypeBanner';
import PathwayAutomationTag from './PathwayAutomationTag';
import CareerPivotCard from './CareerPivotCard';
import { generateCareerPredictorPDF } from './generateCareerPredictorPDF';

interface ResultsDashboardProps {
  /** Ranked matches from the deterministic scoring engine (combined list — used for activeId, share, save). */
  matches: CareerMatch[];
  /**
   * Phase 0 (May 2026): family-de-duplicated split. If omitted (e.g. on
   * localStorage restore from a pre-Phase-0 saved result), the dashboard
   * derives the split itself from `matches` using the family field.
   */
  topMatches?: CareerMatch[];
  discoveryMatches?: CareerMatch[];
  /** Optional warm narrative from the AI layer (presentation only) */
  narrative?: string;
  /** Optional per-career one-liners from the AI layer, keyed by career title */
  perCareerNotes?: Record<string, string>;
  /** True if the AI narrative degraded (rate-limit etc.) — shown subtly */
  narrativeDegraded?: boolean;
  /** v2: aspiration filtered out by aversions — drives the pivot card. */
  filteredAspiration?: CareerMatch | null;
  /** v2: aversions the student selected — used to filter pivot alternatives. */
  studentAversions?: import('@/data/predictor').AversionTag[];
  onBack: () => void;
  onRetake: () => void;
}

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
  topMatches: topMatchesProp,
  discoveryMatches: discoveryMatchesProp,
  narrative,
  perCareerNotes,
  narrativeDegraded,
  filteredAspiration,
  studentAversions,
  onBack,
  onRetake,
}: ResultsDashboardProps) => {
  // The career the student is currently exploring in depth (defaults to #1).
  const [activeId, setActiveId] = useState<string>(
    matches[0]?.pathway.id ?? '',
  );
  const [showAll, setShowAll] = useState(false);
  /**
   * Per-career acknowledgment of the DRAFT-numbers gate. When a pathway has
   * needsCounsellorReview = true, the tab section (which contains salaries,
   * cutoffs and college lists) is hidden behind a "Show estimated figures"
   * button until the student adds that pathway's id here. Switching to a
   * different DRAFT career re-gates. Casual screenshots of the safe header
   * alone capture no numbers.
   */
  const [acknowledgedDrafts, setAcknowledgedDrafts] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    // A gentle, single celebratory burst — earned, not constant.
    confetti({
      particleCount: 70,
      spread: 65,
      origin: { x: 0.5, y: 0.3 },
      colors: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'],
    });
  }, []);

  if (!matches || matches.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
          <p className="text-base text-muted-foreground">
            No results to show. Please retake the assessment.
          </p>
          <Button onClick={onRetake} className="mt-4 gap-2">
            <RotateCcw className="h-4 w-4" /> Retake
          </Button>
        </div>
      </div>
    );
  }

  /**
   * Family-de-duplicated split for the Top Matches + Worth a Look sections.
   *
   * If the caller passed topMatches / discoveryMatches (the normal Phase 0+
   * path from AICareerPredictor.tsx), use them directly.
   *
   * Otherwise (e.g. localStorage restore from a pre-Phase-0 saved result),
   * derive the split here by bucketing `matches` by the `family` field on
   * each pathway. Pathways with no family act as singleton families.
   *
   * The "rest" collapsible (existing UI for additional same-family options)
   * is preserved — it now expands to show the secondary family members so a
   * student curious about other B.Com tracks (after one is featured in Top)
   * can still reach all of them without the family taking 5 slots up top.
   */
  const familyKey = (m: CareerMatch) =>
    m.pathway.family ?? `__singleton_${m.pathway.id}`;

  let topMatches: CareerMatch[];
  let discoveryMatches: CareerMatch[];
  let restWithinFamilies: CareerMatch[];

  if (topMatchesProp && topMatchesProp.length > 0) {
    // Caller-provided split (the normal path).
    topMatches = topMatchesProp;
    discoveryMatches = discoveryMatchesProp ?? [];
    const featuredKeys = new Set(
      [...topMatches, ...discoveryMatches].map(familyKey),
    );
    const featuredIds = new Set(
      [...topMatches, ...discoveryMatches].map((m) => m.pathway.id),
    );
    // Secondary family members: same family as a featured card but a
    // different pathway. These are what the collapsible reveals.
    restWithinFamilies = matches.filter(
      (m) => featuredKeys.has(familyKey(m)) && !featuredIds.has(m.pathway.id),
    );
  } else {
    // Fallback: re-derive the split from matches alone.
    const byFamily = new Map<string, CareerMatch[]>();
    for (const m of matches) {
      const k = familyKey(m);
      if (!byFamily.has(k)) byFamily.set(k, []);
      byFamily.get(k)!.push(m);
    }
    const familyLeaders = Array.from(byFamily.values()).map((arr) => arr[0]);
    familyLeaders.sort((a, b) => b.score - a.score);
    topMatches = familyLeaders.slice(0, 5);
    const topFamilyKeys = new Set(topMatches.map(familyKey));
    discoveryMatches = familyLeaders
      .filter((m) => !topFamilyKeys.has(familyKey(m)))
      .slice(0, 5);
    const featuredIds = new Set(
      [...topMatches, ...discoveryMatches].map((m) => m.pathway.id),
    );
    restWithinFamilies = matches.filter((m) => !featuredIds.has(m.pathway.id));
  }

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

  // Download the full result as a PDF the student can keep, print, or show
  // to parents and teachers. The generator is fully client-side (jsPDF).
  const handleDownloadPDF = () => {
    try {
      generateCareerPredictorPDF({ matches, narrative });
    } catch (err) {
      console.error('PDF generation failed:', err);
    }
  };

  // Selecting a career: set it active, and on narrow screens scroll the detail
  // pane into view (on wide screens the two columns are side-by-side already).
  const selectCareer = (id: string) => {
    setActiveId(id);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      document
        .getElementById('career-detail')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isWide =
    typeof window !== 'undefined' && window.innerWidth >= 1024;

  // ─── A single career row in the left selector column ──────────────────────
  const MatchRow = ({
    match,
    index,
  }: {
    match: CareerMatch;
    index: number;
  }) => {
    const isActive = match.pathway.id === activeMatch.pathway.id;
    return (
      <button
        onClick={() => selectCareer(match.pathway.id)}
        className={`w-full rounded-xl border bg-white p-4 text-left transition-all ${
          isActive
            ? 'border-emerald-400 shadow-sm ring-2 ring-emerald-100'
            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-start gap-3">
          <span className="text-3xl leading-none">{match.pathway.icon}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-[15px] font-bold leading-tight text-gray-900">
                {match.pathway.title}
              </h3>
              <span className="shrink-0 rounded-md bg-gray-100 px-1.5 py-0.5 text-[11px] font-bold text-gray-500">
                #{index + 1}
              </span>
            </div>
            <p className="text-[12px] text-gray-400">
              {match.pathway.titleTa}
            </p>

            <div className="mt-2 flex items-center gap-2">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${match.pathway.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${match.score}%` }}
                  transition={{ duration: 0.9, delay: index * 0.12 }}
                />
              </div>
              <span className="text-sm font-bold tabular-nums text-gray-700">
                {match.score}%
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <Badge
                className={`px-2 py-0.5 text-[11px] font-bold ${bandChip[match.band]}`}
              >
                {bandLabel[match.band]}
              </Badge>
              <PathwayTypeBanner pathway={match.pathway} variant="compact" />
            </div>
          </div>
        </div>
        {isActive && (
          <p className="mt-2.5 text-[12px] font-semibold text-emerald-600">
            ● Showing full details {isWide ? 'on the right' : 'below'}
          </p>
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Wide container — uses the full page on desktop instead of a thin strip */}
      <div className="container mx-auto max-w-7xl px-4 py-6 lg:px-8">
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
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span className="text-[13px] font-semibold text-emerald-700">
              Calculated from your answers — not guessed
            </span>
          </div>
          <h1 className="text-3xl font-bold md:text-4xl">
            Your Career Analysis
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Generated {today}
          </p>
        </motion.div>

        {/* ─── AI narrative (presentation layer only) ─────────────── */}
        {narrative && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mb-6 max-w-4xl"
          >
            <Card className="border-emerald-100 bg-emerald-50/40">
              <CardContent className="flex gap-3 p-4">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                <div>
                  <p className="text-[15px] leading-relaxed text-gray-700">
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

        {/* ═══ TWO-COLUMN LAYOUT ═══════════════════════════════════════
            Desktop (lg+): left = career selector, right = full details,
            side by side, using the whole page width.
            Mobile: stacks — selector first, details below. */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(320px,380px)_1fr]">
          {/* ─── LEFT: career selector column ───────────────────────── */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            {/* Pivot pathway — shown when the aversion deck filtered out the
                student's top aspiration. Tapping an alternative selects it in
                the right-hand detail pane. */}
            {filteredAspiration && (
              <CareerPivotCard
                filteredAspiration={filteredAspiration}
                studentAversions={studentAversions}
                onSelectAlternative={(id) => {
                  if (matches.some((m) => m.pathway.id === id)) selectCareer(id);
                }}
              />
            )}

            <h2 className="mb-2 flex items-center gap-2 text-lg font-bold">
              <Trophy className="h-5 w-5 text-amber-500" />
              Top Matches
            </h2>
            <p className="mb-3 text-[13px] text-muted-foreground">
              The best fit per career family for your profile. Tap any to see
              the full breakdown.
            </p>

            <div className="space-y-2.5">
              {topMatches.map((match, index) => (
                <motion.div
                  key={match.pathway.id}
                  variants={itemVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.08 }}
                >
                  <MatchRow match={match} index={index} />
                </motion.div>
              ))}
            </div>

            {/* "Worth a Look" — next-best family-leaders that didn't make Top.
                This is where niche / less-mainstream careers surface for
                students who would otherwise never see them. Hidden entirely
                when empty so the dashboard stays clean for narrow profiles. */}
            {discoveryMatches.length > 0 && (
              <>
                <h2 className="mb-2 mt-6 flex items-center gap-2 text-lg font-bold">
                  <Sparkles className="h-5 w-5 text-violet-500" />
                  Worth a Look
                </h2>
                <p className="mb-3 text-[13px] text-muted-foreground">
                  Less-mainstream paths your profile also fits — sometimes the
                  best career is one you didn't know to ask about.
                </p>
                <div className="space-y-2.5">
                  {discoveryMatches.map((match, index) => (
                    <motion.div
                      key={match.pathway.id}
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: index * 0.08 }}
                    >
                      <MatchRow
                        match={match}
                        index={topMatches.length + index}
                      />
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {/* Within-family secondary cards — e.g. other B.Com tracks when
                B.Com General is featured. Lets students reach every member
                of a family without the family monopolising the Top section. */}
            {restWithinFamilies.length > 0 && (
              <Collapsible open={showAll} onOpenChange={setShowAll}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="mt-3 w-full gap-2">
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
                    />
                    {showAll
                      ? 'Hide other options in these families'
                      : `See ${restWithinFamilies.length} other option${restWithinFamilies.length > 1 ? 's' : ''} in these families`}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2.5 space-y-2.5">
                    {restWithinFamilies.map((match, i) => (
                      <MatchRow
                        key={match.pathway.id}
                        match={match}
                        index={topMatches.length + discoveryMatches.length + i}
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Methodology note — sits quietly under the selector on desktop */}
            <Card className="mt-4 border-gray-200 bg-gray-50/60">
              <CardContent className="flex gap-2 p-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                <div>
                  <p className="text-[12px] font-semibold text-gray-600">
                    How these results were produced
                  </p>
                  <p className="mt-0.5 text-[12px] leading-snug text-gray-500">
                    {SCORING_METHODOLOGY.en}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ─── RIGHT: detailed view of the selected career ────────── */}
          <div id="career-detail" className="scroll-mt-4">
            <motion.div
              key={activeMatch.pathway.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Selected-career header */}
              <Card className="overflow-hidden border-gray-200">
                <div
                  className={`bg-gradient-to-r ${activeMatch.pathway.color} px-5 py-4`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{activeMatch.pathway.icon}</span>
                    <div className="min-w-0">
                      <h2 className="text-xl font-bold text-white">
                        {activeMatch.pathway.title}
                      </h2>
                      <p className="text-[13px] text-white/90">
                        {activeMatch.score}% match ·{' '}
                        {bandLabel[activeMatch.band]}
                      </p>
                    </div>
                  </div>
                </div>
                <CardContent className="space-y-3 p-5">
                  {/* DRAFT marker — appears for careers whose TN-specific
                      numeric fields (cutoffs, fees, salaries, college lists)
                      have not yet been audited by a counsellor. The flag
                      lives on the CareerPathway itself; once a counsellor
                      signs off, the flag flips and this banner disappears
                      for that career. */}
                  {activeMatch.pathway.needsCounsellorReview && (
                    <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      <p className="text-[12px] leading-relaxed text-amber-900">
                        <strong>AI estimate, pending counsellor review.</strong>{' '}
                        The specific numbers on this career (cutoffs, fees,
                        salary ranges, college examples) are AI-generated
                        drafts. Treat them as guidance and verify on the
                        official source before deciding.
                      </p>
                    </div>
                  )}

                  <p className="text-[15px] leading-relaxed text-gray-700">
                    {activeMatch.pathway.whatIsIt}
                  </p>
                  <p className="text-sm font-medium text-emerald-700">
                    {activeMatch.headline}
                  </p>
                  {perCareerNotes?.[activeMatch.pathway.title] && (
                    <p className="text-[13px] italic leading-relaxed text-gray-500">
                      {perCareerNotes[activeMatch.pathway.title]}
                    </p>
                  )}

                  {/* HOW a 12th student actually reaches this career — shown
                      prominently so the real route and realistic time-to-career
                      are clear. Every career here is one they can act on now. */}
                  <PathwayTypeBanner
                    pathway={activeMatch.pathway}
                    variant="full"
                  />

                  {/* QUALITATIVE automation outlook — informational, not a score.
                      Returns null for untagged pathways so we don't bluff. */}
                  <PathwayAutomationTag pathway={activeMatch.pathway} />

                  {/* The UG course(s) that lead here */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    <span className="text-[12px] font-semibold text-gray-400">
                      UG course:
                    </span>
                    {activeMatch.pathway.ugCourses.map((c) => (
                      <span
                        key={c}
                        className="rounded-md bg-gray-100 px-2 py-0.5 text-[12px] font-medium text-gray-600"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Entrance exam — only shown when there genuinely IS one.
                      For 'None (direct admission)' careers we deliberately do
                      NOT show a chip, because "Exam: None" misleads a 12th
                      student. The PathwayTypeBanner above explains the real
                      route honestly. */}
                  {activeMatch.pathway.entranceExams.some(
                    (e) => e !== 'None (direct admission)',
                  ) && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[12px] font-semibold text-gray-400">
                        Entrance exam:
                      </span>
                      {activeMatch.pathway.entranceExams
                        .filter((e) => e !== 'None (direct admission)')
                        .map((e) => (
                          <span
                            key={e}
                            className="rounded-md bg-violet-50 px-2 py-0.5 text-[12px] font-medium text-violet-600"
                          >
                            {e}
                          </span>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* The detailed view, organized into tabs so a student takes in
                  one thing at a time instead of an overwhelming long scroll.
                  Tab state is keyed to the career so switching careers resets
                  to the Overview tab.

                  GATE: When the active pathway has needsCounsellorReview set
                  AND the student has not yet acknowledged this specific
                  career's draft status, hide the tabs entirely. The student
                  taps an explicit button to reveal the estimated numbers.
                  This protects against out-of-context screenshots — a
                  casual capture of the header alone never includes numeric
                  estimates. The acknowledgment is per-career, so switching
                  to a different DRAFT career re-gates. */}
              {activeMatch.pathway.needsCounsellorReview &&
              !acknowledgedDrafts.has(activeMatch.pathway.id) ? (
                <Card className="border-2 border-dashed border-amber-300 bg-amber-50/40">
                  <CardContent className="px-5 py-6 text-center">
                    <Info className="mx-auto mb-2 h-6 w-6 text-amber-600" />
                    <h4 className="mb-1.5 text-base font-semibold text-amber-900">
                      Estimated figures hidden
                    </h4>
                    <p className="mx-auto mb-4 max-w-md text-[13px] leading-relaxed text-amber-900/80">
                      Salaries, fees, cutoffs and college examples for{' '}
                      <strong>{activeMatch.pathway.title}</strong> are
                      AI-generated drafts. They are hidden by default to
                      prevent out-of-context sharing. Tap below to reveal them
                      — and remember, these are guidance, not verified.
                    </p>
                    <Button
                      variant="default"
                      className="bg-amber-600 text-white hover:bg-amber-700"
                      onClick={() =>
                        setAcknowledgedDrafts((prev) => {
                          const next = new Set(prev);
                          next.add(activeMatch.pathway.id);
                          return next;
                        })
                      }
                    >
                      Show estimated figures
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid h-auto w-full grid-cols-2 gap-1 sm:grid-cols-4">
                    <TabsTrigger
                      value="overview"
                      className="flex items-center gap-1.5 py-2 text-[12px]"
                    >
                      <Calculator className="h-3.5 w-3.5" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="reality"
                      className="flex items-center gap-1.5 py-2 text-[12px]"
                    >
                      <Scale className="h-3.5 w-3.5" />
                      Reality Check
                    </TabsTrigger>
                    <TabsTrigger
                      value="colleges"
                      className="flex items-center gap-1.5 py-2 text-[12px]"
                    >
                      <Building2 className="h-3.5 w-3.5" />
                      Colleges
                    </TabsTrigger>
                    <TabsTrigger
                      value="plan"
                      className="flex items-center gap-1.5 py-2 text-[12px]"
                    >
                      <ListChecks className="h-3.5 w-3.5" />
                      Action Plan
                    </TabsTrigger>
                  </TabsList>

                  {/* OVERVIEW — why this career scored what it did */}
                  <TabsContent value="overview" className="mt-4">
                    <ScoreBreakdown match={activeMatch} defaultOpen />
                  </TabsContent>

                  {/* REALITY CHECK — the honest picture */}
                  <TabsContent value="reality" className="mt-4">
                    <RealityCheck pathway={activeMatch.pathway} />
                  </TabsContent>

                  {/* COLLEGES — where to actually study this */}
                  <TabsContent value="colleges" className="mt-4">
                    <CollegesForCareer pathway={activeMatch.pathway} />
                  </TabsContent>

                  {/* ACTION PLAN — the roadmap, 90-day plan and skills to build */}
                  <TabsContent value="plan" className="mt-4 space-y-4">
                    <CareerRoadmap pathway={activeMatch.pathway} />
                    <ActionItems pathway={activeMatch.pathway} />
                    <BuildNowSkills pathway={activeMatch.pathway} />
                  </TabsContent>
                </Tabs>
              )}
            </motion.div>
          </div>
        </div>

        {/* ─── Actions ────────────────────────────────────────────── */}
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          <Button className="gap-2" onClick={handleDownloadPDF}>
            <Download className="h-4 w-4" />
            Download as PDF
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => handleShare('whatsapp')}
          >
            Share on WhatsApp
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => handleShare('email')}
          >
            Email my results
          </Button>
          <Button variant="outline" className="gap-2" onClick={onRetake}>
            <RotateCcw className="h-4 w-4" />
            Retake assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
