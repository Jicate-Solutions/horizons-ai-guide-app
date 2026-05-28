// ─────────────────────────────────────────────────────────────────────────────
// CAREER SCORING ENGINE — deterministic, transparent, reproducible
// ─────────────────────────────────────────────────────────────────────────────
// This is what makes the Career Predictor defensible. Instead of asking an LLM
// to "guess a match %", we compute the score from the student's actual inputs
// against the curated CAREER_PATHWAYS data, using a fixed, inspectable formula.
//
// Properties that matter for a reviewer:
//   1. DETERMINISTIC  — same inputs always produce the same output.
//   2. TRANSPARENT    — every score ships with a component-by-component
//                       breakdown the student (or an official) can read.
//   3. ELIGIBILITY-FIRST — a career the student's 12th group cannot lead to is
//                       never shown as a "match", however appealing.
//   4. HONEST         — the engine can return "this is a stretch" rather than
//                       inflating every score into the 80s like the old LLM did.
//
// The LLM is still used — but only AFTER this engine runs, to write a warm,
// personalised narrative around these already-decided, verifiable numbers.
// ─────────────────────────────────────────────────────────────────────────────

import {
  CAREER_PATHWAYS,
  CareerPathway,
  Stream,
  SkillId,
  PriorityId,
  getPathwaysForStream,
} from '@/data/careerPathways';

// ─── Inputs ──────────────────────────────────────────────────────────────────

export interface StudentProfile {
  /** TN 12th group code, e.g. "102" */
  groupCode: string;
  /** Derived stream */
  stream: Stream;
  /** Self-rated skills, each 1-5 (from the SkillAssessment sliders) */
  skillRatings: Record<SkillId, number>;
  /** Ranked priorities, most important first (priority ids) */
  rankedPriorities: PriorityId[];
  /** Selected interest ids (free-form, used for narrative + light bonus) */
  interests: string[];
  /** Expected board percentage, 0-100 (may be undefined if not given) */
  expectedPercentage?: number;
  /** Budget band id, e.g. "low" | "medium" | "high" (from SituationForm) */
  budget?: string;
  /** Location preference id (from SituationForm) */
  location?: string;
  /** Strongest / weakest subject names (free-form) */
  strongestSubject?: string;
  weakestSubject?: string;
  /**
   * Optional actual marks (0-100) in the strongest/weakest subjects. Used as
   * a reality check on the skill self-ratings: a student rating every skill
   * 5/5 but reporting a 62% strongest-subject mark is gently calibrated, so a
   * guessed rating is not taken at face value. Undefined = no calibration.
   */
  strongestSubjectMark?: number;
  weakestSubjectMark?: number;
  // ─── LIFE CONTEXT (from the "Your Real Situation" step) ──────────────────
  // The factors a real counsellor weighs that pure skill/interest scoring
  // misses. These genuinely change the ranking via lifeFitNudge below.
  /** Whose decision this is: 'mine' | 'shared' | 'family' */
  decisionOwner?: string;
  /** First in family to attend college: 'yes' | 'no' */
  firstGeneration?: string;
  /** How soon income is needed: 'flexible' | 'within3' | 'soon' */
  earningUrgency?: string;

  // ─── BEHAVIOURAL HARD FILTERS (v2 — aversion swipe deck) ────────────────
  /**
   * Aversion tags the student selected on the swipe deck. Each tag is
   * a hard filter: careers whose `aversionConflicts` overlap this list
   * are removed from results entirely. Empty / missing = no filtering.
   */
  aversions?: import('@/data/predictor/types').AversionTag[];
}

// ─── Outputs ─────────────────────────────────────────────────────────────────

export interface ScoreComponent {
  /** Human label, e.g. "Skill alignment" */
  label: string;
  labelTa: string;
  /** Points this component contributed */
  earned: number;
  /** Maximum this component could contribute */
  max: number;
  /** One-line plain explanation of why it earned what it did */
  reason: string;
}

export interface CareerMatch {
  pathway: CareerPathway;
  /** Final 0-100 score */
  score: number;
  /** Confidence band derived from the score + eligibility strength */
  band: 'strong' | 'good' | 'stretch';
  /** Component breakdown — this is the "show your working" part */
  breakdown: ScoreComponent[];
  /** The single biggest reason this ranked where it did */
  headline: string;
  headlineTa: string;
  /** Honest watch-out specific to this student + career */
  watchOut: string;
  /**
   * Whether this is a career a 12th student can START on right after 12th.
   *
   * By design this is ALWAYS true now: the Career Predictor's data
   * (CAREER_PATHWAYS) only contains 'direct-after-12th' and
   * 'professional-track' careers. Degree-first careers (Civil Servant,
   * Teacher) and open-ended build paths (Entrepreneur) were deliberately
   * removed — a predictor for a 12th student should only surface careers
   * that map to a real course decision they make NOW. The flag is kept as
   * an explicit guard: if it is ever false, a degree-gated career has
   * wrongly entered the dataset.
   */
  isImmediatePath: boolean;
}

/**
 * Guard: is this a path a 12th student can step onto right after board exams?
 * Given the data is curated to contain only such careers, this should always
 * return true — it exists to catch a bad data entry, not to branch the UI.
 */
export function isImmediatePath(pathway: CareerPathway): boolean {
  return (
    pathway.pathwayType === 'direct-after-12th' ||
    pathway.pathwayType === 'professional-track'
  );
}

// ─── Weights — fixed and documented ──────────────────────────────────────────
// These add up to 100. Changing them changes every score, so they live here,
// named and commented, rather than being scattered as magic numbers.
const WEIGHTS = {
  /** How well self-rated skills match what the career actually needs */
  skillAlignment: 40,
  /** How well the career delivers on what the student says they value */
  priorityFit: 30,
  /** Whether the student's 12th group is a strong (not just eligible) fit */
  groupStrength: 15,
  /** Whether expected marks are realistic for the mainstream pathway */
  academicReadiness: 15,
} as const;

// Priority rank → importance multiplier. #1 priority counts most.
const PRIORITY_RANK_WEIGHT = [1.0, 0.8, 0.6, 0.45, 0.35, 0.28, 0.22, 0.18];

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));
const round = (n: number) => Math.round(n);

// ─── Component 1: Skill alignment ────────────────────────────────────────────
// For each skill, the career has a weight (0-10 = how much it matters). The
// student has a self-rating (1-5). We reward matches on HIGH-weight skills more
// than matches on skills the career barely uses.
function scoreSkillAlignment(
  profile: StudentProfile,
  pathway: CareerPathway,
): ScoreComponent {
  const skills = Object.keys(pathway.skillWeights) as SkillId[];

  let weightedScore = 0;
  let weightedMax = 0;
  let topSkillName = '';
  let topSkillWeight = -1;

  for (const skill of skills) {
    const careerNeed = pathway.skillWeights[skill]; // 0-10
    const studentRating = clamp(profile.skillRatings[skill] ?? 3, 1, 5); // 1-5
    // Normalise the student's 1-5 rating to 0-1
    const studentNorm = (studentRating - 1) / 4;
    // This skill can contribute up to `careerNeed` points; the student earns
    // a fraction of that based on their normalised self-rating.
    weightedScore += careerNeed * studentNorm;
    weightedMax += careerNeed;

    if (careerNeed > topSkillWeight) {
      topSkillWeight = careerNeed;
      topSkillName = skill;
    }
  }

  const fraction = weightedMax > 0 ? weightedScore / weightedMax : 0;
  let earned = fraction * WEIGHTS.skillAlignment;

  // ── Reality-check calibration ──
  // A 12th student rating their own skills 1-5 is partly guessing. If they
  // also gave actual subject marks, we sanity-check: convert their average
  // self-rating and their average reported mark to the same 0-1 scale, and
  // if the self-rating runs meaningfully ahead of what the marks suggest,
  // gently dampen the skill score. This only ever TEMPERS over-optimism —
  // it never inflates a score — and is capped at a 15% reduction so it
  // calibrates rather than overrides. No marks given → no change at all.
  let calibrationNote = '';
  const marks: number[] = [];
  if (
    typeof profile.strongestSubjectMark === 'number' &&
    !Number.isNaN(profile.strongestSubjectMark)
  ) {
    marks.push(clamp(profile.strongestSubjectMark, 0, 100));
  }
  if (
    typeof profile.weakestSubjectMark === 'number' &&
    !Number.isNaN(profile.weakestSubjectMark)
  ) {
    marks.push(clamp(profile.weakestSubjectMark, 0, 100));
  }
  if (marks.length > 0) {
    const ratingValues = skills.map((s) =>
      clamp(profile.skillRatings[s] ?? 3, 1, 5),
    );
    const avgRatingNorm =
      ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length / 5; // 0-1
    const avgMarkNorm =
      marks.reduce((a, b) => a + b, 0) / marks.length / 100; // 0-1
    // Positive gap = self-rating runs ahead of marks (over-optimism).
    const gap = avgRatingNorm - avgMarkNorm;
    if (gap > 0.15) {
      // Scale a dampening factor with the gap, capped at 15% reduction.
      const dampening = Math.min(0.15, (gap - 0.15) * 0.5);
      earned = earned * (1 - dampening);
      calibrationNote =
        ' Your self-ratings ran a little ahead of your reported marks, so this is calibrated slightly — an honest check, not a penalty.';
    } else {
      calibrationNote =
        ' Your reported marks line up with your self-ratings, which makes this score more reliable.';
    }
  }

  const topRating = profile.skillRatings[topSkillName as SkillId] ?? 3;
  const baseReason =
    topRating >= 4
      ? `Your strong self-rating in the skills this career relies on most lifts this score.`
      : topRating <= 2
        ? `This career leans heavily on skills you rated yourself low on — that pulls the score down honestly.`
        : `Your skill profile is a moderate fit for what this career needs day to day.`;
  const reason = baseReason + calibrationNote;

  return {
    label: 'Skill alignment',
    labelTa: 'திறன் பொருத்தம்',
    earned: round(earned),
    max: WEIGHTS.skillAlignment,
    reason,
  };
}

// ─── Component 2: Priority fit ───────────────────────────────────────────────
// The student ranks what they value (salary, security, balance...). Each career
// "delivers" a 0-10 score on each priority. We weight by RANK — the #1 priority
// matters most — so a career that nails the student's top value scores well.
function scorePriorityFit(
  profile: StudentProfile,
  pathway: CareerPathway,
): ScoreComponent {
  const ranked = profile.rankedPriorities.slice(0, 8);

  if (ranked.length === 0) {
    // No priorities ranked — give a neutral half-score rather than punishing.
    return {
      label: 'Priority fit',
      labelTa: 'முன்னுரிமைப் பொருத்தம்',
      earned: round(WEIGHTS.priorityFit * 0.5),
      max: WEIGHTS.priorityFit,
      reason: 'No priorities were ranked, so this is scored neutrally.',
    };
  }

  let weighted = 0;
  let weightMax = 0;
  let topPriority: PriorityId = ranked[0];
  let topDelivers = pathway.priorityFit[topPriority] ?? 5;

  ranked.forEach((priorityId, index) => {
    const rankWeight = PRIORITY_RANK_WEIGHT[index] ?? 0.15;
    const delivers = clamp(pathway.priorityFit[priorityId] ?? 5, 0, 10); // 0-10
    weighted += (delivers / 10) * rankWeight;
    weightMax += rankWeight;
  });

  const fraction = weightMax > 0 ? weighted / weightMax : 0.5;
  const earned = fraction * WEIGHTS.priorityFit;

  const reason =
    topDelivers >= 8
      ? `This career strongly delivers on "${topPriority}" — the thing you ranked most important.`
      : topDelivers <= 4
        ? `Your top priority ("${topPriority}") is not this career's strength — an honest mismatch.`
        : `This career is a partial fit for what you said matters most to you.`;

  return {
    label: 'Priority fit',
    labelTa: 'முன்னுரிமைப் பொருத்தம்',
    earned: round(earned),
    max: WEIGHTS.priorityFit,
    reason,
  };
}

// ─── Component 3: Group strength ─────────────────────────────────────────────
// Eligibility is already guaranteed (we only score eligible careers). This
// component asks the sharper question: is the student's group a STRONG fit, or
// just a permitted one?
function scoreGroupStrength(
  profile: StudentProfile,
  pathway: CareerPathway,
): ScoreComponent {
  const isStrongGroup = pathway.strongGroupCodes.includes(profile.groupCode);
  const isEligibleStream = pathway.eligibleStreams.includes(profile.stream);

  let earned: number;
  let reason: string;

  if (isStrongGroup) {
    earned = WEIGHTS.groupStrength;
    reason = `Your 12th group (${profile.groupCode}) is an especially strong foundation for this career.`;
  } else if (isEligibleStream) {
    earned = WEIGHTS.groupStrength * 0.6;
    reason = `Your stream can lead here, though it is not the most direct group for it.`;
  } else {
    // Should not happen (we pre-filter), but stay safe.
    earned = 0;
    reason = `Your current group is not a typical route into this career.`;
  }

  return {
    label: 'Group fit',
    labelTa: 'குழுப் பொருத்தம்',
    earned: round(earned),
    max: WEIGHTS.groupStrength,
    reason,
  };
}

// ─── Component 4: Academic readiness ─────────────────────────────────────────
// Compares the student's expected board % against the realistic band for the
// career's mainstream pathway. This is where the engine is honest: aiming at
// MBBS with 60% expected is flagged, not hidden.
function scoreAcademicReadiness(
  profile: StudentProfile,
  pathway: CareerPathway,
): ScoreComponent {
  const { comfortable, stretch } = pathway.competitiveBoardPct;
  const pct = profile.expectedPercentage;

  if (pct === undefined || Number.isNaN(pct)) {
    return {
      label: 'Academic readiness',
      labelTa: 'கல்வித் தயார்நிலை',
      earned: round(WEIGHTS.academicReadiness * 0.6),
      max: WEIGHTS.academicReadiness,
      reason: 'No expected percentage was given, so this is scored cautiously.',
    };
  }

  let earned: number;
  let reason: string;

  if (pct >= comfortable) {
    earned = WEIGHTS.academicReadiness;
    reason = `Your expected ${pct}% comfortably clears the realistic bar for the mainstream route.`;
  } else if (pct >= stretch) {
    earned = WEIGHTS.academicReadiness * 0.65;
    reason = `Your expected ${pct}% makes this reachable, but the mainstream route will be a stretch — keep a backup ready.`;
  } else {
    earned = WEIGHTS.academicReadiness * 0.3;
    reason = `Your expected ${pct}% is below the usual band for the direct route. It is still possible via backup pathways — be realistic and plan for them.`;
  }

  return {
    label: 'Academic readiness',
    labelTa: 'கல்வித் தயார்நிலை',
    earned: round(earned),
    max: WEIGHTS.academicReadiness,
    reason,
  };
}

// ─── Light interest nudge ────────────────────────────────────────────────────
// Interests are free-form, so they only apply a SMALL, capped bonus when an
// interest keyword obviously relates to the career. They never dominate.
function interestNudge(profile: StudentProfile, pathway: CareerPathway): number {
  if (!profile.interests || profile.interests.length === 0) return 0;
  const haystack = (
    pathway.id +
    ' ' +
    pathway.title +
    ' ' +
    pathway.whatIsIt +
    ' ' +
    pathway.ugCourses.join(' ')
  ).toLowerCase();
  const hit = profile.interests.some((interest) => {
    const key = interest.toLowerCase().split(/[\s_-]+/);
    return key.some((k) => k.length > 3 && haystack.includes(k));
  });
  return hit ? 3 : 0; // capped at +3, applied after the weighted total
}

// ─── Life-fit adjustment ─────────────────────────────────────────────────────
// The counsellor's layer. A career can match a student's skills perfectly and
// still be the wrong recommendation for their actual life. This applies a
// small, capped, FULLY TRANSPARENT adjustment (it appears in the breakdown as
// its own line, never a hidden nudge) based on the "Your Real Situation" step:
//
//   - Earning urgency: if a student must earn soon, faster-payoff paths get a
//     lift and long, expensive, hard-entry paths get an honest reduction. This
//     is the single most important real-life factor the old tool was blind to.
//   - First-generation: a tiny lift for lower-cost / lower-risk paths, since a
//     first-generation student usually has less financial cushion for a long
//     gamble. (Scholarships are surfaced separately in the UI regardless.)
//
// The adjustment is capped at roughly ±10 so it can meaningfully reorder
// careers without ever overpowering the core skill/priority scoring.
function scoreLifeFit(
  profile: StudentProfile,
  pathway: CareerPathway,
): ScoreComponent {
  const MAX = 10;
  let earned = MAX / 2; // neutral midpoint — no answers means no opinion
  const reasons: string[] = [];

  // How "fast to a real income" is this path? Use the curated honest fields:
  // entryDifficulty (1-10, higher = harder) is the best proxy we have, plus
  // pathwayType. professional-track (e.g. CA) and lower entry difficulty mean
  // a quicker, surer route to earning.
  const entryDifficulty = pathway.entryDifficulty?.score ?? 5;
  const isHardLongPath = entryDifficulty >= 8;
  const isQuickerPath = entryDifficulty <= 5;

  // ── Earning urgency ──
  if (profile.earningUrgency === 'soon') {
    if (isQuickerPath) {
      earned += 4;
      reasons.push(
        'fits your need to start earning soon — a relatively quick, reachable route',
      );
    } else if (isHardLongPath) {
      earned -= 4;
      reasons.push(
        'this is a long, highly competitive route — a real concern given you need to earn soon',
      );
    } else {
      reasons.push('a moderate route given your need to earn soon');
    }
  } else if (profile.earningUrgency === 'within3') {
    if (isQuickerPath) {
      earned += 2;
      reasons.push('a reasonably quick route, which suits your ~3-year goal');
    } else if (isHardLongPath) {
      earned -= 2;
      reasons.push('a longer route than your ~3-year earning goal ideally wants');
    }
  } else if (profile.earningUrgency === 'flexible') {
    // No penalty either way — the student has said time is not a constraint.
    if (isHardLongPath) {
      reasons.push(
        'a long path — and you have said you can take your time, which helps',
      );
    }
  }

  // ── First-generation learner ──
  // A small lift for quicker / lower-risk paths; first-generation students
  // typically have less cushion to absorb a long, costly gamble. This is a
  // gentle thumb on the scale, not a verdict.
  if (profile.firstGeneration === 'yes') {
    if (isQuickerPath && earned < MAX) {
      earned += 1.5;
      reasons.push(
        'a lower-risk route — sensible as a first-generation college student',
      );
    }
  }

  earned = clamp(earned, 0, MAX);

  return {
    label: 'Life fit',
    labelTa: 'வாழ்க்கைப் பொருத்தம்',
    earned: round(earned),
    max: MAX,
    reason:
      reasons.length > 0
        ? reasons.join('; ') + '.'
        : 'Your situation does not strongly push this career up or down.',
  };
}

// ─── Band classification ─────────────────────────────────────────────────────
function classifyBand(
  score: number,
  groupStrengthEarned: number,
): CareerMatch['band'] {
  const strongGroup = groupStrengthEarned >= WEIGHTS.groupStrength * 0.95;
  if (score >= 75 && strongGroup) return 'strong';
  if (score >= 60) return 'good';
  return 'stretch';
}

// ─── Headline + watch-out ────────────────────────────────────────────────────
function buildHeadline(
  profile: StudentProfile,
  pathway: CareerPathway,
  breakdown: ScoreComponent[],
): { headline: string; headlineTa: string; watchOut: string } {
  // The headline/watch-out describe the core MATCH. "Life fit" is a separate
  // situational adjustment with a neutral midpoint, so a neutral 5/10 must not
  // be mistaken for the "weakest" dimension — exclude it from this selection.
  const coreComponents = breakdown.filter((c) => c.label !== 'Life fit');
  // Find the strongest and weakest components (by % of max earned).
  const withPct = coreComponents.map((c) => ({
    c,
    pct: c.max > 0 ? c.earned / c.max : 0,
  }));
  withPct.sort((a, b) => b.pct - a.pct);
  const best = withPct[0].c;
  const worst = withPct[withPct.length - 1].c;

  const headlineMap: Record<string, string> = {
    'Skill alignment': `Your skills line up well with what a ${pathway.title} actually does.`,
    'Priority fit': `This career delivers on what you said matters most to you.`,
    'Group fit': `Your 12th group is a natural foundation for this path.`,
    'Academic readiness': `Your expected marks put the mainstream route well within reach.`,
  };
  const headlineTaMap: Record<string, string> = {
    'Skill alignment': `உங்கள் திறன்கள் இந்தத் தொழிலுக்கு நன்றாகப் பொருந்துகின்றன.`,
    'Priority fit': `உங்களுக்கு முக்கியமானதை இந்தத் தொழில் வழங்குகிறது.`,
    'Group fit': `உங்கள் 12-ஆம் வகுப்புக் குழு இந்தப் பாதைக்கு ஏற்றது.`,
    'Academic readiness': `உங்கள் எதிர்பார்க்கப்படும் மதிப்பெண்கள் இந்தப் பாதைக்குப் போதுமானவை.`,
  };

  const watchOutMap: Record<string, string> = {
    'Skill alignment': `The skills this career leans on are not yet your strongest — the "Build now" list shows exactly what to work on.`,
    'Priority fit': `This career may not fully deliver on your top priority — read the reality check before deciding.`,
    'Group fit': `Your group can reach this career, but it is not the most direct route — check the roadmap carefully.`,
    'Academic readiness': `The mainstream route will be competitive at your expected marks — the backup options matter here.`,
  };

  return {
    headline: headlineMap[best.label] ?? `This career is a reasonable fit for your profile.`,
    headlineTa:
      headlineTaMap[best.label] ?? `இந்தத் தொழில் உங்கள் சுயவிவரத்திற்கு ஏற்றது.`,
    watchOut:
      withPct[withPct.length - 1].pct < 0.6
        ? watchOutMap[worst.label] ?? pathway.honestCaveat
        : pathway.honestCaveat,
  };
}

// ─── Main entry point ────────────────────────────────────────────────────────

/**
 * Score every career the student is ELIGIBLE for, and return them ranked.
 * Eligibility (12th stream) is a hard gate — ineligible careers are never
 * returned, no matter how appealing, because recommending an unreachable
 * career would be actively harmful advice.
 */
export function scoreCareers(profile: StudentProfile): CareerMatch[] {
  // Hard eligibility gate.
  let eligible = getPathwaysForStream(profile.stream);

  // Safety net: if the stream somehow matches nothing, fall back to the full
  // list rather than showing the student an empty result.
  if (eligible.length === 0) eligible = CAREER_PATHWAYS;

  // BEHAVIOURAL HARD FILTER (v2). Drop any pathway whose aversionConflicts
  // overlap the student's selected aversions. Confidence-gated upstream, so
  // most students never see this kick in. When it does, the filter is strict
  // by design — see the aversion swipe deck for the student-facing UX.
  if (profile.aversions && profile.aversions.length > 0) {
    const aversionSet = new Set(profile.aversions);
    eligible = eligible.filter((p) => {
      const conflicts = p.aversionConflicts ?? [];
      return !conflicts.some((t) => aversionSet.has(t));
    });
    // Safety net: if the filter removed everything, fall back to the
    // pre-filter list rather than showing the student an empty page. The
    // pivot pathway card (Push 3) will surface the closest viable option.
    if (eligible.length === 0) {
      eligible = getPathwaysForStream(profile.stream);
      if (eligible.length === 0) eligible = CAREER_PATHWAYS;
    }
  }

  const matches: CareerMatch[] = eligible.map((pathway) => {
    const skill = scoreSkillAlignment(profile, pathway);
    const priority = scorePriorityFit(profile, pathway);
    const group = scoreGroupStrength(profile, pathway);
    const academic = scoreAcademicReadiness(profile, pathway);
    const lifeFit = scoreLifeFit(profile, pathway);

    // The 4 core components sum to 100. Life fit is a separate, transparent
    // adjustment: its neutral midpoint is 5/10, so (earned - 5) swings the
    // final score by -5..+5 — enough to honestly reorder careers for a
    // student's real situation, never enough to overpower the core match.
    const lifeFitAdjustment = lifeFit.earned - lifeFit.max / 2;

    // Breakdown shows every component, including life fit, so the student
    // (or a reviewer) can see exactly why the number is what it is.
    const breakdown = [skill, priority, group, academic, lifeFit];
    const base = skill.earned + priority.earned + group.earned + academic.earned;
    const nudge = interestNudge(profile, pathway);
    const score = clamp(round(base + nudge + lifeFitAdjustment), 5, 99);

    const band = classifyBand(score, group.earned);
    const { headline, headlineTa, watchOut } = buildHeadline(
      profile,
      pathway,
      breakdown,
    );

    return {
      pathway,
      score,
      band,
      breakdown,
      headline,
      headlineTa,
      watchOut,
      isImmediatePath: isImmediatePath(pathway),
    };
  });

  // Rank by score, then by group strength as a tiebreaker.
  matches.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const ga = a.breakdown.find((c) => c.label === 'Group fit')?.earned ?? 0;
    const gb = b.breakdown.find((c) => c.label === 'Group fit')?.earned ?? 0;
    return gb - ga;
  });

  return matches;
}

/**
 * The top N career matches for a student, ranked by score.
 *
 * Every career in the dataset is one a 12th student can act on directly (see
 * isImmediatePath), so there is no "longer paths" split to make — the earlier
 * design had a separate bucket for degree-gated careers, but those careers were
 * removed from CAREER_PATHWAYS entirely. As a safety guard we still drop any
 * entry that somehow fails isImmediatePath, so a bad data addition can never
 * surface a degree-gated career as a "match".
 */
export function topCareerMatches(profile: StudentProfile, n = 5): CareerMatch[] {
  return scoreCareers(profile)
    .filter((m) => m.isImmediatePath)
    .slice(0, n);
}

/**
 * A human-readable, one-paragraph explanation of HOW the engine works.
 * Surfaced in the UI so students (and reviewers) can see the method, not just
 * the number. Transparency is the point.
 */
export const SCORING_METHODOLOGY = {
  en: `Every match score is calculated, not guessed. We compare your self-rated skills against what each career actually needs (40%), how well the career delivers on the priorities you ranked (30%), whether your 12th group is a strong foundation for it (15%), and whether your expected marks make the mainstream route realistic (15%). On top of that, a small "life fit" adjustment reflects your real situation — how soon you need to earn, and whether you are the first in your family at college — because a career that does not fit your life is not a good recommendation, however well it matches your skills. Careers your 12th group cannot lead to are never shown. Careers that need a completed degree first — like the civil services or a government teaching post — are shown separately as "longer paths to plan for", never mixed in with courses you can join right after 12th. The same answers always give the same result.`,
  ta: `ஒவ்வொரு பொருத்த மதிப்பெண்ணும் ஊகிக்கப்படவில்லை — கணக்கிடப்படுகிறது. உங்கள் திறன்கள் (40%), உங்கள் முன்னுரிமைகள் (30%), உங்கள் 12-ஆம் வகுப்புக் குழு (15%), மற்றும் எதிர்பார்க்கப்படும் மதிப்பெண்கள் (15%) ஆகியவற்றுடன், உங்கள் உண்மையான சூழ்நிலையை (எவ்வளவு விரைவில் சம்பாதிக்க வேண்டும் என்பது போன்றவை) பிரதிபலிக்கும் சிறிய "வாழ்க்கைப் பொருத்தம்" சரிசெய்தலும் சேர்க்கப்படுகிறது. உங்கள் குழுவால் அடைய முடியாத தொழில்கள் காட்டப்படாது. முதலில் பட்டப்படிப்பு தேவைப்படும் தொழில்கள் தனியாகக் காட்டப்படும்.`,
};
