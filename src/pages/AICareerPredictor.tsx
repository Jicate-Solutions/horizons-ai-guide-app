import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  X,
  Check,
  ShieldCheck,
  Calculator,
  ListChecks,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  groupToStream,
  skillCategories,
  careerPriorities,
} from '@/data/tnGroupTaxonomy';
import type { Stream, SkillId, PriorityId } from '@/data/careerPathways';
import {
  topCareerMatches,
  topCareerMatchesWithPivot,
  type StudentProfile,
  type CareerMatch,
} from '@/lib/careerScoring';

import BoardSelector from '@/components/AICareerPredictor/BoardSelector';
import GroupSelector from '@/components/AICareerPredictor/GroupSelector';
import InterestAssessment from '@/components/AICareerPredictor/InterestAssessment';
import SkillAssessment from '@/components/AICareerPredictor/SkillAssessment';
import PriorityRanker from '@/components/AICareerPredictor/PriorityRanker';
import SituationForm from '@/components/AICareerPredictor/SituationForm';
import RealSituationStep from '@/components/AICareerPredictor/RealSituationStep';
import AcademicPerformance from '@/components/AICareerPredictor/AcademicPerformance';
import WizardProgress from '@/components/AICareerPredictor/WizardProgress';
import ResultsDashboard from '@/components/AICareerPredictor/ResultsDashboard';
import { AversionSwipe } from '@/components/AICareerPredictor/AversionSwipe';
import {
  computeConfidence,
  CONFIDENCE_THRESHOLDS,
  type AversionTag,
  type Priority as PredictorPriority,
  type Stream as PredictorStream,
  type UserProfile as PredictorUserProfile,
} from '@/data/predictor';

const stepVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

const TOTAL_STEPS = 8;
const STEP_LABELS = [
  'Board',
  'Group',
  'Interests',
  'Skills',
  'Priorities',
  'Situation',
  'Real Life',
  'Academics',
];

// localStorage key for the saved result, so a student can return to it.
const RESULT_STORAGE_KEY = 'vzk_career_result_v2';

// Map the AcademicPerformance band id → a representative numeric percentage.
const PERCENTAGE_BAND_TO_NUMBER: Record<string, number> = {
  '90plus': 93,
  '80to90': 85,
  '70to80': 75,
  '60to70': 65,
  below60: 55,
};

interface SavedResult {
  matches: CareerMatch[];
  narrative?: string;
  perCareerNotes?: Record<string, string>;
  narrativeDegraded?: boolean;
  /** Aspiration filtered out by aversions (v2) — drives pivot card on restore. */
  filteredAspiration?: CareerMatch | null;
  /** Aversions student selected (v2) — needed by the pivot filter on restore. */
  aversions?: AversionTag[];
  savedAt: string;
}

const AICareerPredictor = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0 = intro

  // Wizard state
  const [selectedBoard, setSelectedBoard] = useState('tn_state');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [skillRatings, setSkillRatings] = useState<Record<string, number>>(
    () => {
      const defaults: Record<string, number> = {};
      skillCategories.forEach((s) => {
        defaults[s.id] = 3;
      });
      return defaults;
    },
  );
  const [rankedPriorities, setRankedPriorities] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [examReadiness, setExamReadiness] = useState('');
  // "Your Real Situation" step — the counsellor-style life context.
  const [decisionOwner, setDecisionOwner] = useState('');
  const [firstGeneration, setFirstGeneration] = useState('');
  const [earningUrgency, setEarningUrgency] = useState('');
  const [percentage, setPercentage] = useState('');
  const [strongestSubject, setStrongestSubject] = useState('');
  const [weakestSubject, setWeakestSubject] = useState('');
  // Optional reality-check marks — calibrate the skill self-ratings.
  const [strongestSubjectMark, setStrongestSubjectMark] = useState('');
  const [weakestSubjectMark, setWeakestSubjectMark] = useState('');
  const [entranceScore, setEntranceScore] = useState('');
  const [notAppeared, setNotAppeared] = useState(false);

  // Results
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState<CareerMatch[]>([]);
  const [narrative, setNarrative] = useState<string>('');
  const [perCareerNotes, setPerCareerNotes] = useState<Record<string, string>>(
    {},
  );
  const [narrativeDegraded, setNarrativeDegraded] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);

  // Aversion swipe (v2) — only shown when computeConfidence drops below the
  // threshold, between step 8 and the loading screen.
  const [showAversionDeck, setShowAversionDeck] = useState(false);
  const [aversions, setAversions] = useState<AversionTag[]>([]);
  /** Aspiration that got filtered out by aversions — drives the pivot card. */
  const [filteredAspiration, setFilteredAspiration] = useState<CareerMatch | null>(null);

  // On mount, offer to restore a previous result.
  const [hasSavedResult, setHasSavedResult] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(RESULT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SavedResult;
        if (parsed?.matches?.length) setHasSavedResult(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const selectedStream = (groupToStream[selectedGroup] || '') as Stream;

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : prev.length < 3
          ? [...prev, id]
          : prev,
    );
  };
  const handleUpdateSkill = (skillId: string, value: number) =>
    setSkillRatings((prev) => ({ ...prev, [skillId]: value }));

  // ─── Build the StudentProfile the scoring engine expects ──────────────────
  const buildProfile = (): StudentProfile => {
    // skillRatings keys already match SkillId ids (mathematics, language, ...).
    const skills = skillRatings as Record<SkillId, number>;
    const expectedPercentage = PERCENTAGE_BAND_TO_NUMBER[percentage];

    return {
      groupCode: selectedGroup,
      stream: selectedStream,
      skillRatings: skills,
      rankedPriorities: rankedPriorities as PriorityId[],
      interests: selectedInterests,
      expectedPercentage,
      budget,
      location,
      strongestSubject,
      weakestSubject,
      // Optional reality-check marks (parsed to numbers; NaN if unfilled).
      strongestSubjectMark: strongestSubjectMark
        ? Number(strongestSubjectMark)
        : undefined,
      weakestSubjectMark: weakestSubjectMark
        ? Number(weakestSubjectMark)
        : undefined,
      // "Your Real Situation" — counsellor-style life context.
      decisionOwner,
      firstGeneration,
      earningUrgency,
      // BEHAVIOURAL HARD FILTER — aversions selected on the swipe deck (v2).
      aversions: aversions.length > 0 ? aversions : undefined,
    };
  };

  /**
   * Build the v2 predictor profile used only for the confidence calculation
   * (which decides whether the aversion swipe deck should trigger). Maps the
   * live wizard's TN-specific shape (group code, ranked priority IDs, etc.)
   * onto the predictor's generic UserProfile shape.
   */
  const buildPredictorProfile = (): PredictorUserProfile => {
    const priorityIdToTag: Record<string, PredictorPriority> = {
      salary: 'high_salary',
      security: 'job_security',
      balance: 'work_life_balance',
      growth: 'growth',
      passion: 'helping_others',
      // 'abroad', 'prestige', 'hometown' have no clean predictor analogue;
      // they simply don't contribute to the conflict-detection heuristic.
    };
    return {
      schemaVersion: 2,
      language: 'en',
      self: {
        stream: (selectedStream || '') as PredictorStream,
        percentage: PERCENTAGE_BAND_TO_NUMBER[percentage] ?? null,
        interests: selectedInterests,
        priorities: rankedPriorities
          .map((p) => priorityIdToTag[p])
          .filter((p): p is PredictorPriority => Boolean(p)),
        budgetINR: null,
        durationYears: null,
      },
    };
  };

  // ─── Run the analysis: engine first, then optional AI narrative ───────────
  const runAnalysis = async () => {
    setIsLoading(true);
    setLoadingStage(0);

    // 1) DETERMINISTIC ENGINE — this is the source of truth and never fails.
    const profile = buildProfile();
    const { matches: computed, filteredAspiration: aspiration } =
      topCareerMatchesWithPivot(profile, 5);
    setMatches(computed);
    setFilteredAspiration(aspiration ?? null);
    setLoadingStage(1);

    // Brief, honest staged loading — the engine is instant, but a moment of
    // "calculating" reads better than a flash.
    await new Promise((r) => setTimeout(r, 450));
    setLoadingStage(2);

    // 2) NARRATIVE LAYER — optional. The app is fully usable without it.
    let narrativeText = '';
    let notes: Record<string, string> = {};
    let degraded = false;
    try {
      const { data, error } = await supabase.functions.invoke(
        'career-predictor',
        {
          body: {
            groupCode: profile.groupCode,
            stream: profile.stream,
            expectedPercentage: profile.expectedPercentage,
            topPriorities: profile.rankedPriorities.slice(0, 3),
            interests: profile.interests,
            // "Your Real Situation" context — lets the AI narrative speak to
            // the student's actual life, not just their skills.
            decisionOwner: profile.decisionOwner,
            firstGeneration: profile.firstGeneration,
            earningUrgency: profile.earningUrgency,
            matches: computed.slice(0, 3).map((m) => ({
              title: m.pathway.title,
              score: m.score,
              band: m.band,
              headline: m.headline,
              watchOut: m.watchOut,
            })),
          },
        },
      );
      if (!error && data) {
        narrativeText = data.narrative || '';
        notes = data.perCareer || {};
        degraded = !!data.degraded;
      } else {
        degraded = true;
      }
    } catch (e) {
      console.error('Narrative layer unavailable:', e);
      degraded = true;
    }

    setLoadingStage(3);
    await new Promise((r) => setTimeout(r, 350));

    setNarrative(narrativeText);
    setPerCareerNotes(notes);
    setNarrativeDegraded(degraded);

    // 3) Persist the result so the student can return to it.
    try {
      const toSave: SavedResult = {
        matches: computed,
        narrative: narrativeText,
        perCareerNotes: notes,
        narrativeDegraded: degraded,
        filteredAspiration: aspiration ?? null,
        aversions,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      /* storage unavailable — result simply won't persist */
    }

    setIsLoading(false);
    setShowResults(true);
  };

  const restoreSavedResult = () => {
    try {
      const raw = localStorage.getItem(RESULT_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as SavedResult;
      if (parsed?.matches?.length) {
        setMatches(parsed.matches);
        setNarrative(parsed.narrative || '');
        setPerCareerNotes(parsed.perCareerNotes || {});
        setNarrativeDegraded(!!parsed.narrativeDegraded);
        setFilteredAspiration(parsed.filteredAspiration ?? null);
        setAversions(parsed.aversions ?? []);
        setShowResults(true);
      }
    } catch {
      toast.error('Could not load your saved result.');
    }
  };

  const canProceed = (): boolean => {
    if (step === 0) return true;
    if (step === 1) return !!selectedBoard;
    if (step === 2) return !!selectedGroup;
    if (step === 3) return selectedInterests.length > 0;
    if (step === 4) return true;
    if (step === 5) return true;
    if (step === 6)
      return !!budget && !!location && !!duration && !!examReadiness;
    if (step === 7)
      return !!decisionOwner && !!firstGeneration && !!earningUrgency;
    if (step === 8) return !!percentage;
    return true;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      return;
    }
    // Step 8 → final action. Confidence-gate: if the self-reported answers
    // look coherent, run the analysis straight away. Otherwise show the
    // aversion swipe deck first, then run the analysis from its onComplete.
    const { needsAversionCheck } = computeConfidence(buildPredictorProfile());
    if (needsAversionCheck && aversions.length === 0) {
      setShowAversionDeck(true);
    } else {
      runAnalysis();
    }
  };

  /**
   * Called when the student finishes (or skips) the aversion swipe deck.
   * Records the aversions and proceeds directly to the analysis.
   */
  const handleAversionComplete = (chosen: AversionTag[]) => {
    setAversions(chosen);
    setShowAversionDeck(false);
    runAnalysis();
  };
  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else navigate(-1);
  };
  const handleRetake = () => {
    setShowResults(false);
    setMatches([]);
    setNarrative('');
    setPerCareerNotes({});
    setStep(0);
    // Behavioural filters reset too so re-running with different inputs
    // doesn't silently inherit stale aversions.
    setAversions([]);
    setShowAversionDeck(false);
    setFilteredAspiration(null);
  };

  // ─── Results view ─────────────────────────────────────────────────────────
  if (showResults) {
    return (
      <ResultsDashboard
        matches={matches}
        narrative={narrative}
        perCareerNotes={perCareerNotes}
        narrativeDegraded={narrativeDegraded}
        filteredAspiration={filteredAspiration}
        studentAversions={aversions}
        onBack={() => setShowResults(false)}
        onRetake={handleRetake}
      />
    );
  }

  // ─── Aversion swipe (v2) ──────────────────────────────────────────────────
  // Shown only when the confidence calculator flagged the student's answers
  // as inconsistent (broad / conflicting / stream-mismatched interests etc.).
  // Skipping is allowed — the deck has its own "Skip to results" button.
  if (showAversionDeck) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <AversionSwipe
          onBack={() => setShowAversionDeck(false)}
          onComplete={handleAversionComplete}
        />
      </div>
    );
  }

  const loadingStages = [
    'Reading your answers…',
    'Scoring every career you are eligible for…',
    'Building your roadmap and 90-day plan…',
    'Adding a personalised summary…',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={step > 0 ? handleBack : () => navigate(-1)}
          className="group mb-4 hover:bg-primary/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back
        </Button>

        {/* ─── Intro ───────────────────────────────────────────────── */}
        {step === 0 && (
          <motion.div
            className="mx-auto max-w-3xl py-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="mb-6 overflow-hidden border-0 shadow-xl">
              <CardContent className="p-6 md:p-12">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-xl shadow-primary/25">
                  <Brain className="h-10 w-10 text-white" />
                </div>

                <h1 className="mb-1 text-3xl font-bold md:text-4xl">
                  Career Predictor
                </h1>
                <p className="mb-4 text-base font-medium text-emerald-600">
                  தொழில் கணிப்பான்
                </p>
                <p className="mx-auto mb-7 max-w-xl text-base text-muted-foreground">
                  Answer 8 honest questions. We calculate — transparently — which
                  careers genuinely fit you, and give you a real roadmap and a
                  90-day action plan you can start tomorrow.
                </p>

                {/* HONEST badges — every one of these is literally true */}
                <div className="mb-8 flex flex-wrap justify-center gap-2">
                  <Badge
                    variant="secondary"
                    className="px-3 py-1.5 text-[13px]"
                  >
                    <Calculator className="mr-1 h-3.5 w-3.5" />
                    Calculated, not guessed
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="px-3 py-1.5 text-[13px]"
                  >
                    <ShieldCheck className="mr-1 h-3.5 w-3.5" />
                    Every score is explained
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="px-3 py-1.5 text-[13px]"
                  >
                    <ListChecks className="mr-1 h-3.5 w-3.5" />
                    Real 90-day plan
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="px-3 py-1.5 text-[13px]"
                  >
                    ⏱️ About 5 minutes
                  </Badge>
                </div>

                {/* How it works — honest about the method */}
                <div className="mx-auto mb-8 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
                  {[
                    {
                      emoji: '📝',
                      label: 'You answer 8 questions',
                    },
                    {
                      emoji: '🧮',
                      label: 'We score every eligible career',
                    },
                    {
                      emoji: '🗺️',
                      label: 'You get a plan you can act on',
                    },
                  ].map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-2xl">
                        {s.emoji}
                      </div>
                      <p className="text-[13px] font-semibold text-muted-foreground">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => setStep(1)}
                  size="lg"
                  className="w-full max-w-sm rounded-2xl bg-gradient-to-r from-primary to-primary/80 py-6 text-lg text-primary-foreground shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start
                </Button>

                {/* Restore previous result */}
                {hasSavedResult && (
                  <button
                    onClick={restoreSavedResult}
                    className="mt-3 text-sm font-medium text-primary hover:underline"
                  >
                    Or view your previous result
                  </button>
                )}

                {/* Honest method note instead of fake stats / testimonials */}
                <div className="mx-auto mt-8 max-w-xl rounded-xl bg-muted/50 p-5 text-left">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    Why you can trust this
                  </p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
                    This tool does not invent match percentages. It scores each
                    career from your own answers against a curated database of
                    Tamil Nadu education pathways — and shows you the exact
                    calculation. Careers your 12th group cannot lead to are never
                    suggested. The same answers always give the same result.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ─── Wizard ──────────────────────────────────────────────── */}
        {step >= 1 && (
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
                <Brain className="h-4 w-4 text-primary" />
                <span className="text-[15px] font-medium text-primary">
                  Career Predictor
                </span>
              </div>
            </div>

            <WizardProgress
              currentStep={step}
              totalSteps={TOTAL_STEPS}
              stepLabels={STEP_LABELS}
            />

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="s1"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <BoardSelector
                    selectedBoard={selectedBoard}
                    onSelectBoard={setSelectedBoard}
                  />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="s2"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <GroupSelector
                    selectedGroup={selectedGroup}
                    onSelectGroup={setSelectedGroup}
                  />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  key="s3"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <InterestAssessment
                    selectedInterests={selectedInterests}
                    onToggleInterest={toggleInterest}
                  />
                </motion.div>
              )}
              {step === 4 && (
                <motion.div
                  key="s4"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <SkillAssessment
                    skillRatings={skillRatings}
                    onUpdateSkill={handleUpdateSkill}
                  />
                </motion.div>
              )}
              {step === 5 && (
                <motion.div
                  key="s5"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <PriorityRanker
                    rankedPriorities={rankedPriorities}
                    onReorder={setRankedPriorities}
                  />
                </motion.div>
              )}
              {step === 6 && (
                <motion.div
                  key="s6"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <SituationForm
                    budget={budget}
                    location={location}
                    duration={duration}
                    examReadiness={examReadiness}
                    onChangeBudget={setBudget}
                    onChangeLocation={setLocation}
                    onChangeDuration={setDuration}
                    onChangeExamReadiness={setExamReadiness}
                  />
                </motion.div>
              )}
              {step === 7 && (
                <motion.div
                  key="s7"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <RealSituationStep
                    decisionOwner={decisionOwner}
                    firstGeneration={firstGeneration}
                    earningUrgency={earningUrgency}
                    onChangeDecisionOwner={setDecisionOwner}
                    onChangeFirstGeneration={setFirstGeneration}
                    onChangeEarningUrgency={setEarningUrgency}
                  />
                </motion.div>
              )}
              {step === 8 && (
                <motion.div
                  key="s8"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <AcademicPerformance
                    percentage={percentage}
                    onChangePercentage={setPercentage}
                    strongestSubject={strongestSubject}
                    onChangeStrongest={setStrongestSubject}
                    weakestSubject={weakestSubject}
                    onChangeWeakest={setWeakestSubject}
                    entranceScore={entranceScore}
                    onChangeEntranceScore={setEntranceScore}
                    notAppeared={notAppeared}
                    onChangeNotAppeared={setNotAppeared}
                    selectedGroup={selectedGroup}
                    strongestSubjectMark={strongestSubjectMark}
                    onChangeStrongestMark={setStrongestSubjectMark}
                    weakestSubjectMark={weakestSubjectMark}
                    onChangeWeakestMark={setWeakestSubjectMark}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading */}
            {isLoading && (
              <Card className="mt-6 animate-fade-in overflow-hidden border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="p-8 text-center">
                  <div className="relative mx-auto mb-6 h-20 w-20">
                    <div
                      className="absolute inset-0 rounded-full bg-primary/10"
                      style={{ animation: 'ping 2s infinite' }}
                    />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-xl shadow-primary/25">
                      <Calculator className="h-10 w-10 animate-pulse text-white" />
                    </div>
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-primary">
                    Calculating your matches
                  </h3>
                  <p className="mb-5 text-sm text-muted-foreground">
                    {loadingStages[loadingStage] ?? loadingStages[0]}
                  </p>
                  <div className="mx-auto flex max-w-xs justify-center gap-2">
                    {loadingStages.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          i <= loadingStage ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            {!isLoading && (
              <div className="mt-10 flex justify-between gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleBack}
                  className="gap-2"
                >
                  <ChevronLeft className="h-5 w-5" />
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="min-w-[180px] gap-2 shadow-lg shadow-primary/20"
                >
                  {step === TOTAL_STEPS ? (
                    <>
                      <Sparkles className="h-5 w-5" />
                      See my results
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AICareerPredictor;
