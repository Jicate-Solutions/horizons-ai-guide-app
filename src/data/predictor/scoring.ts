/**
 * AI Career Predictor v2 — pure scoring engine.
 *
 * No React, no DOM, no side effects. All inputs are typed, all outputs
 * are derived. Designed to be unit-tested first, wired to UI later.
 *
 * Implements §3 (confidence), §4 (scoring), §6 (pivot) of the design.
 */

import type {
  AversionTag,
  ConfidenceReport,
  Localised,
  PivotPathway,
  ScoreBreakdown,
  ScoredCourse,
  ScoringResult,
  SkillDimension,
  UserProfile,
} from './types';
import type { Course } from '@/data/courseDatabase';
import { COURSE_TAGS, FALLBACK_COURSE_TAGS } from './courseTags';
import { PIVOT_PATHWAYS } from './pivotPathways';

// ─── Tunable constants — kept in one place on purpose ─────────────────

export const CONFIDENCE_THRESHOLDS = {
  /** ≥ this: no extra layers shown. */
  showResultsImmediately: 75,
  /** Below this: aversion check triggers. */
  needAversionBelow: 75,
  /** Below this: aptitude quiz triggers (and aversion). */
  needQuizBelow: 60,
  /** Below this: results page leads with "let's tighten this up". */
  tooLowForResultsBelow: 40,
} as const;

/** STEM-family interest IDs from the interest cards in AICareerPredictor.tsx. */
const STEM_INTEREST_IDS = new Set([
  'technology', 'science', 'data', 'healthcare', 'aviation', 'construction',
]);

const STREAM_INTEREST_MISMATCH: Record<string, string[]> = {
  arts: ['technology', 'data', 'science'],
  commerce: ['science', 'healthcare', 'aviation', 'construction'],
  commerce_math: ['healthcare'],
};

const CONFLICTING_PRIORITY_SETS: Array<string[]> = [
  ['high_salary', 'helping_others'],
  ['job_security', 'creativity'],
];

// ─── i18n helper ──────────────────────────────────────────────────────

const L = (key: string, en: string): Localised => ({ key, en });

// ─── §3 — Confidence ──────────────────────────────────────────────────

/**
 * Calculate how much we should trust the self-reported answers as-is.
 * Used to decide whether to trigger the optional layers.
 */
export function computeConfidence(profile: UserProfile): ConfidenceReport {
  const { self } = profile;
  let score = 100;
  const reasons: Localised[] = [];

  // Interest breadth
  if (self.interests.length > 4) {
    score -= 15;
    reasons.push(L('predictor.conf.interests_broad',
      'You selected many interests — narrowing helps us recommend better.'));
  } else if (self.interests.length < 2) {
    score -= 15;
    reasons.push(L('predictor.conf.interests_narrow',
      'Picking a few more interests will sharpen the match.'));
  }

  // Percentage missing
  if (self.percentage === null) {
    score -= 10;
    reasons.push(L('predictor.conf.no_percentage',
      'Adding your 12th percentage filters out unrealistic options.'));
  }

  // Conflicting priorities
  for (const conflict of CONFLICTING_PRIORITY_SETS) {
    if (conflict.every((p) => self.priorities.includes(p as never))) {
      score -= 15;
      reasons.push(L('predictor.conf.priority_conflict',
        'Some of your priorities pull in different directions.'));
      break;
    }
  }

  // Budget missing
  if (self.budgetINR === null) {
    score -= 10;
    reasons.push(L('predictor.conf.no_budget',
      'A budget range helps filter out courses your family cannot fund.'));
  }

  // Inflated self-rated skills
  if (self.selfSkills) {
    const fives = Object.values(self.selfSkills).filter((v) => v === 5).length;
    if (fives >= 3) {
      score -= 20;
      reasons.push(L('predictor.conf.skills_inflated',
        'You rated several skills at the top — a quick puzzle will help us confirm.'));
    }
  }

  // Stream–interest mismatch
  const mismatchSet = STREAM_INTEREST_MISMATCH[self.stream];
  if (mismatchSet) {
    const overlaps = self.interests.filter((i) => mismatchSet.includes(i)).length;
    if (overlaps) {
      score -= 10 * overlaps;
      reasons.push(L('predictor.conf.stream_mismatch',
        'Your stream and a few interests don\'t align — we\'ll factor that in.'));
    }
  }

  score = Math.max(0, Math.min(100, score));

  const hasStemInterest = self.interests.some((i) => STEM_INTEREST_IDS.has(i));
  const needsAptitudeQuiz = score < CONFIDENCE_THRESHOLDS.needQuizBelow && hasStemInterest;
  const needsAversionCheck = score < CONFIDENCE_THRESHOLDS.needAversionBelow;

  return { overall: score, reasons, needsAptitudeQuiz, needsAversionCheck };
}

// ─── §4 — Course scoring ──────────────────────────────────────────────

/** Map an interest card ID onto course categories it should boost. */
const INTEREST_TO_CATEGORIES: Record<string, string[]> = {
  technology: ['Engineering', 'Computer Applications', 'IT'],
  science: ['Science', 'Allied Health', 'Biotechnology', 'Pure Science'],
  healthcare: ['Medical', 'Allied Health', 'Nursing', 'Pharmacy'],
  business: ['Commerce', 'Management', 'Finance', 'Banking'],
  law: ['Law'],
  arts: ['Arts', 'Design', 'Fine Arts', 'Performing Arts'],
  aviation: ['Aviation'],
  construction: ['Architecture', 'Engineering'],
  media: ['Mass Communication', 'Journalism', 'Film', 'Media'],
  teaching: ['Education'],
  agriculture: ['Agriculture', 'Veterinary', 'Horticulture'],
  defence: ['Defence'],
  hospitality: ['Hotel Management', 'Tourism', 'Hospitality'],
  data: ['Computer Applications', 'Engineering', 'Statistics', 'Economics'],
};

const PRIORITY_TO_COURSE_HINT: Record<string, (c: Course) => boolean> = {
  high_salary: (c) => /Engineering|Medical|Law|MBA|Computer/i.test(c.category),
  job_security: (c) => /Government|Defence|Education|Banking/i.test(c.category),
  helping_others: (c) => /Medical|Nursing|Social|Education|Allied/i.test(c.category),
  growth: (c) => /Computer|Data|Biotech|AI|Engineering/i.test(c.category + ' ' + c.name),
  creativity: (c) => /Design|Arts|Architecture|Media|Film|Animation/i.test(c.category + ' ' + c.name),
  work_life_balance: (c) => /Education|Government|Library/i.test(c.category),
};

const tagsFor = (courseId: string) => COURSE_TAGS[courseId] ?? FALLBACK_COURSE_TAGS;

/**
 * Parse a fees string like "₹2-4 Lakhs/year" or "₹10-30 Lakhs total".
 * Returns the upper bound in lakhs for comparison, or null on failure.
 */
function parseFeesUpperLakh(fees: string): number | null {
  const m = fees.match(/(\d+(?:\.\d+)?)\s*[-–to]+\s*(\d+(?:\.\d+)?)\s*Lakh/i)
    ?? fees.match(/(\d+(?:\.\d+)?)\s*Lakh/i);
  if (!m) return null;
  return parseFloat(m[m.length - 1]);
}

interface ScoreOne {
  course: Course;
  profile: UserProfile;
  filtersDisabled?: boolean;
}

/**
 * Score and tag-check a single course against the profile.
 * Returns a ScoredCourse with hardFiltered=true if a strict filter failed.
 */
function scoreOne({ course, profile, filtersDisabled }: ScoreOne): ScoredCourse {
  const { self, behaviour, objective, constraints } = profile;
  const tags = tagsFor(course.id);
  const reasons: Localised[] = [];
  let hardFiltered = false;

  // ── Hard filters ───────────────────────────────────────────────────
  // Stream eligibility is already handled by the existing filter step;
  // here we only check the new aversion/percentage/budget filters.

  if (!filtersDisabled && behaviour) {
    const blocking = tags.aversionConflicts.filter((t) => behaviour.aversions.includes(t));
    if (blocking.length) hardFiltered = true;
  }

  if (!filtersDisabled && self.percentage !== null) {
    // If the course wants 70%+ and the student is below by >10, drop.
    const reqMatch = course.eligibility.match(/(\d{2})\s*%/);
    if (reqMatch) {
      const need = parseInt(reqMatch[1], 10);
      if (self.percentage < need - 10) hardFiltered = true;
    }
  }

  if (!filtersDisabled && constraints?.maxBudgetLakh !== null && constraints?.maxBudgetLakh !== undefined) {
    const upper = parseFeesUpperLakh(course.feesRange);
    if (upper !== null && upper > constraints.maxBudgetLakh * 1.2) {
      hardFiltered = true;
    }
  }

  // ── Score (always computed, even for filtered courses, for pivot UX) ─
  const breakdown: ScoreBreakdown = {
    base: 50, interest: 0, objective: 0, priority: 0,
    budget: 0, duration: 0, microTask: 0,
  };

  // Interest match: +5 per overlap, capped at +30.
  let interestHits = 0;
  for (const i of self.interests) {
    const cats = INTEREST_TO_CATEGORIES[i] ?? [];
    if (cats.some((c) => course.category.toLowerCase().includes(c.toLowerCase()))) {
      interestHits += 1;
    }
  }
  breakdown.interest = Math.min(30, interestHits * 5);
  if (interestHits > 0) {
    reasons.push(L('predictor.reason.interest_match',
      `Matches ${interestHits} of your selected interest area${interestHits > 1 ? 's' : ''}.`));
  }

  // Objective fit: ±20 for STEM, modest verbal bonus for arts.
  if (objective) {
    const quant = objective.scores.quantitative ?? 50;
    const logical = objective.scores.logical ?? 50;
    const verbal = objective.scores.verbal ?? 50;
    const stemScore = (quant + logical) / 2;

    if (tags.stemFamily) {
      if (stemScore >= 75) {
        breakdown.objective = 20;
        reasons.push(L('predictor.reason.objective_high',
          'Your aptitude scores show this matches your real strengths.'));
      } else if (stemScore >= 60) {
        breakdown.objective = 8;
      } else if (stemScore < 40) {
        breakdown.objective = -15;
        reasons.push(L('predictor.reason.objective_low',
          'Your aptitude scores suggest this would be a tough fit right now.'));
      }
    } else if (tags.aptitudeDemands.includes('verbal') && verbal >= 70) {
      breakdown.objective = 10;
      reasons.push(L('predictor.reason.verbal_strong',
        'Your verbal aptitude is a strong match here.'));
    }
  }

  // Priority alignment: +3 per matching priority.
  let priorityHits = 0;
  for (const p of self.priorities) {
    const hint = PRIORITY_TO_COURSE_HINT[p];
    if (hint && hint(course)) priorityHits += 1;
  }
  breakdown.priority = Math.min(9, priorityHits * 3);
  if (priorityHits > 0) {
    reasons.push(L('predictor.reason.priority_match',
      `Aligns with what you value most (${priorityHits} of your priorities).`));
  }

  // Budget fit: +8 if comfortably inside, +4 if within 1.2× slack.
  if (constraints?.maxBudgetLakh !== null && constraints?.maxBudgetLakh !== undefined) {
    const upper = parseFeesUpperLakh(course.feesRange);
    if (upper !== null) {
      if (upper <= constraints.maxBudgetLakh) {
        breakdown.budget = 8;
        reasons.push(L('predictor.reason.in_budget', 'Fits within your family budget.'));
      } else if (upper <= constraints.maxBudgetLakh * 1.2) {
        breakdown.budget = 4;
      }
    }
  }

  // Duration preference.
  if (self.durationYears !== null) {
    const m = course.duration.match(/(\d+(?:\.\d+)?)\s*year/i);
    if (m) {
      const d = parseFloat(m[1]);
      if (Math.abs(d - self.durationYears) <= 0.5) {
        breakdown.duration = 5;
        reasons.push(L('predictor.reason.duration_fit',
          'Matches your preferred course length.'));
      }
    }
  }

  // Micro-task.
  const mt = behaviour?.microTasks?.[course.id];
  if (mt) {
    if (mt.tolerance >= 4) {
      breakdown.microTask = 6;
      reasons.push(L('predictor.reason.microtask_loved',
        'You enjoyed the hands-on preview of this work.'));
    } else if (mt.tolerance <= 2) {
      breakdown.microTask = -12;
      reasons.push(L('predictor.reason.microtask_disliked',
        'The hands-on preview suggested this isn\'t your cup of tea.'));
    }
  }

  let total = Object.values(breakdown).reduce((s, v) => s + v, 0);
  total = Math.max(0, Math.min(100, Math.round(total)));

  if (reasons.length === 0) {
    reasons.push(L('predictor.reason.stream_match',
      'You\'re eligible based on your stream.'));
  }

  return {
    courseId: course.id,
    matchScore: total,
    reasons,
    hardFiltered,
    breakdown,
  };
}

// ─── §6 — Pivot pathway injection ─────────────────────────────────────

/**
 * Find the course the student most aspired to but was hard-filtered out of,
 * and return its pivot pathway if one exists in our editorial table.
 */
function findPivot(
  profile: UserProfile,
  allScored: ScoredCourse[],
  courses: Course[],
): ScoringResult['pivot'] {
  if (!profile.self.interests.length) return undefined;

  // Look at the top interest first. Find the highest-scoring course for it
  // that was hard-filtered out.
  const topInterest = profile.self.interests[0];
  const interestCats = INTEREST_TO_CATEGORIES[topInterest] ?? [];

  const candidates = allScored
    .filter((s) => s.hardFiltered)
    .map((s) => {
      const c = courses.find((cc) => cc.id === s.courseId);
      return c ? { scored: s, course: c } : null;
    })
    .filter((x): x is { scored: ScoredCourse; course: Course } => x !== null)
    .filter(({ course }) =>
      interestCats.some((cat) =>
        course.category.toLowerCase().includes(cat.toLowerCase())))
    .sort((a, b) => b.scored.matchScore - a.scored.matchScore);

  if (!candidates.length) return undefined;

  const top = candidates[0];
  const pathway = PIVOT_PATHWAYS.find((p) => p.fromCourseId === top.course.id);
  if (!pathway) return undefined;

  return { aspiration: top.scored, pathway };
}

// ─── Top-level entrypoint ─────────────────────────────────────────────

interface ScoreArgs {
  profile: UserProfile;
  /** Courses already pre-filtered by stream eligibility upstream. */
  eligibleCourses: Course[];
  /** Course list (used to resolve pivot aspirations). */
  allCourses?: Course[];
  /** Limit on the returned ranked list. Default 15. */
  topN?: number;
}

/**
 * Score, rank, hard-filter and pivot-augment the candidate course list.
 * Pure function — no side effects, fully deterministic for a given input.
 */
export function scoreCourses({
  profile,
  eligibleCourses,
  allCourses,
  topN = 15,
}: ScoreArgs): ScoringResult {
  const allScored = eligibleCourses.map((course) => scoreOne({ course, profile }));

  // The ranked list excludes hard-filtered courses.
  const ranked = allScored
    .filter((s) => !s.hardFiltered)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, topN);

  const pivot = findPivot(profile, allScored, allCourses ?? eligibleCourses);

  return { ranked, pivot };
}

// ─── Re-exports for convenience ───────────────────────────────────────
export type {
  AversionTag, ConfidenceReport, Localised, PivotPathway,
  ScoredCourse, ScoringResult, SkillDimension, UserProfile,
};
