/**
 * AI Career Predictor v2 — pure scoring engine.
 *
 * No React, no DOM, no side effects. Deterministic for a given input.
 *
 * Signals used:
 *   - stream eligibility (upstream filter — courses passed in are already eligible)
 *   - interest matches
 *   - priority alignment
 *   - budget fit
 *   - duration preference
 *   - hard filters: aversion conflicts, percentage cut-offs, budget caps
 *   - pivot pathway when the top aspiration was hard-filtered
 */

import type {
  AversionTag,
  ConfidenceReport,
  Localised,
  PivotPathway,
  ScoreBreakdown,
  ScoredCourse,
  ScoringResult,
  UserProfile,
} from './types';
import type { Course } from '@/data/courseDatabase';
import { COURSE_TAGS, FALLBACK_COURSE_TAGS } from './courseTags';
import { PIVOT_PATHWAYS } from './pivotPathways';

// ─── Tunable constants — kept in one place on purpose ─────────────────

export const CONFIDENCE_THRESHOLDS = {
  /** ≥ this: no aversion check shown. */
  showResultsImmediately: 75,
  /** Below this: aversion check triggers. */
  needAversionBelow: 75,
  /** Below this: results page leads with "let's tighten this up". */
  tooLowForResultsBelow: 40,
} as const;

const STREAM_INTEREST_MISMATCH: Record<string, string[]> = {
  arts: ['technology', 'data', 'science'],
  commerce: ['science', 'healthcare', 'aviation', 'construction'],
  commerce_math: ['healthcare'],
};

const CONFLICTING_PRIORITY_SETS: Array<string[]> = [
  ['high_salary', 'helping_others'],
  ['job_security', 'creativity'],
];

const L = (key: string, en: string): Localised => ({ key, en });

// ─── Confidence ───────────────────────────────────────────────────────

/**
 * Calculate how much we should trust the self-reported answers as-is.
 * Used to decide whether to trigger the aversion check.
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
    if (conflict.every((p) => (self.priorities as string[]).includes(p))) {
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

  return {
    overall: score,
    reasons,
    needsAversionCheck: score < CONFIDENCE_THRESHOLDS.needAversionBelow,
  };
}

// ─── Course scoring ───────────────────────────────────────────────────

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
  const range = fees.match(/(\d+(?:\.\d+)?)\s*[-–to]+\s*(\d+(?:\.\d+)?)\s*Lakh/i);
  if (range) return parseFloat(range[2]);
  const single = fees.match(/(\d+(?:\.\d+)?)\s*Lakh/i);
  if (single) return parseFloat(single[1]);
  return null;
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
  const { self, behaviour, constraints } = profile;
  const tags = tagsFor(course.id);
  const reasons: Localised[] = [];
  let hardFiltered = false;

  // ── Hard filters ───────────────────────────────────────────────────
  if (!filtersDisabled && behaviour) {
    const blocking = tags.aversionConflicts.filter((t) => behaviour.aversions.includes(t));
    if (blocking.length) hardFiltered = true;
  }

  if (!filtersDisabled && self.percentage !== null) {
    const reqMatch = course.eligibility.match(/(\d{2})\s*%/);
    if (reqMatch) {
      const need = parseInt(reqMatch[1], 10);
      if (self.percentage < need - 10) hardFiltered = true;
    }
  }

  if (
    !filtersDisabled
    && constraints?.maxBudgetLakh !== null
    && constraints?.maxBudgetLakh !== undefined
  ) {
    const upper = parseFeesUpperLakh(course.feesRange);
    if (upper !== null && upper > constraints.maxBudgetLakh * 1.2) {
      hardFiltered = true;
    }
  }

  // ── Score ─────────────────────────────────────────────────────────
  const breakdown: ScoreBreakdown = {
    base: 50, interest: 0, priority: 0, budget: 0, duration: 0,
  };

  // Interest match: +6 per overlap, capped at +36.
  let interestHits = 0;
  for (const i of self.interests) {
    const cats = INTEREST_TO_CATEGORIES[i] ?? [];
    if (cats.some((c) => course.category.toLowerCase().includes(c.toLowerCase()))) {
      interestHits += 1;
    }
  }
  breakdown.interest = Math.min(36, interestHits * 6);
  if (interestHits > 0) {
    reasons.push(L('predictor.reason.interest_match',
      `Matches ${interestHits} of your selected interest area${interestHits > 1 ? 's' : ''}.`));
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

// ─── Pivot pathway injection ──────────────────────────────────────────

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
  ScoredCourse, ScoringResult, UserProfile,
};
