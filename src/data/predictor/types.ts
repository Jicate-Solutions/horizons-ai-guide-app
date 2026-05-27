/**
 * AI Career Predictor v2 — type system.
 *
 * Scope: course selection for 12th-standard students. The matching
 * engine uses five signals only — stream eligibility, interests,
 * priorities, budget/marks, and aversions. There is no aptitude quiz
 * and no objective scoring layer; see AI_PREDICTOR_V2_DESIGN.md for
 * why we cut them.
 */

// ─── i18n primitive ───────────────────────────────────────────────────
/** Locale codes already supported in src/hooks/useLanguage.tsx. */
export type LangCode =
  | 'en' | 'ta' | 'hi' | 'te' | 'kn' | 'ml' | 'bn' | 'mr' | 'gu' | 'pa';

/**
 * A piece of human-readable copy that exists in every supported language.
 * Always store as a translation `key` + an English fallback, never a bare
 * string. The fallback guarantees the UI never shows a raw key.
 */
export interface Localised {
  key: string;
  en: string;
}

// ─── Self-reported (the existing 8-step flow) ─────────────────────────

export type Stream =
  | 'pcm' | 'pcb' | 'pcmb' | 'commerce' | 'commerce_math' | 'arts';

export type Priority =
  | 'high_salary'
  | 'job_security'
  | 'helping_others'
  | 'growth'
  | 'creativity'
  | 'work_life_balance';

export interface SelfReported {
  stream: Stream | '';
  /** 0–100, or null if not entered. */
  percentage: number | null;
  /** Interest card IDs ('technology', 'science', …). */
  interests: string[];
  priorities: Priority[];
  /** Annual fees willingness, in INR. */
  budgetINR: { min: number; max: number } | null;
  durationYears: number | null;
}

// ─── Behavioural signals (aversion swipe) ─────────────────────────────

/**
 * The aversion taxonomy. Add new tags, never rename or remove existing
 * ones — they're referenced by course-tag tables and saved profiles.
 */
export type AversionTag =
  | 'sitting_long'
  | 'public_speaking'
  | 'memorisation'
  | 'maths_heavy'
  | 'lab_practical'
  | 'shift_work'
  | 'field_outdoor'
  | 'patient_care'
  | 'creative_pressure'
  | 'high_competition'
  | 'paperwork'
  | 'sales_persuasion';

export interface BehaviouralSignals {
  /** Tasks the student said they hate. STRICT FILTER, not a soft penalty. */
  aversions: AversionTag[];
  /** Free-text "what causes you burnout" capture, optional. */
  burnoutNote?: string;
}

// ─── Real-world constraints ───────────────────────────────────────────

export interface Constraints {
  /** Family budget for the *whole* education path, in lakhs INR. */
  maxBudgetLakh: number | null;
  relocate: 'any' | 'within_state' | 'home_only' | null;
  supportYears: number | null;
}

// ─── Confidence ───────────────────────────────────────────────────────

export interface ConfidenceReport {
  /** 0–100. Higher = the self-reported answers look coherent. */
  overall: number;
  reasons: Localised[];
  /** Whether the aversion check should trigger for this student. */
  needsAversionCheck: boolean;
}

// ─── The full profile ─────────────────────────────────────────────────

export interface UserProfile {
  schemaVersion: 2;
  language: LangCode;
  self: SelfReported;
  /** Present only if the aversion step was completed. */
  behaviour?: BehaviouralSignals;
  /** Present only if the constraints step was completed. */
  constraints?: Constraints;
  /** Internal: drives gating for the optional aversion check. */
  confidence?: ConfidenceReport;
}

// ─── Course tag side-tables (join by courseId) ────────────────────────

/**
 * Editorial, qualitative tag for how a career is likely to be reshaped
 * by automation. NOT a score. See AI_PREDICTOR_V2_DESIGN.md §7.
 */
export type AutomationTag =
  | 'high_human_judgment'
  | 'human_facing'
  | 'creative_judgment'
  | 'ai_augmented'
  | 'increasingly_automated'
  | 'physical_skilled';

export interface CourseTags {
  /** Aversions this course directly conflicts with. Hard-filtered. */
  aversionConflicts: AversionTag[];
  /** Qualitative automation outlook. */
  automation: AutomationTag;
  /** Editorial one-liner shown next to the automation tag. */
  automationNote: Localised;
}

// ─── Pivot pathways (aspiration recovery) ─────────────────────────────

export interface PivotPathway {
  /** The aspiration we're pivoting from, e.g. 'mbbs'. */
  fromCourseId: string;
  /** Localised label shown above the pivot block. */
  label: Localised;
  alternatives: PivotAlternative[];
}

export interface PivotAlternative {
  /** Must match an id in courseDatabase. */
  courseId: string;
  /** Why this is a viable alternative, in plain language. */
  rationale: Localised;
  /** How close to the original aspiration this is (0–100). */
  closeness: number;
}

// ─── Scoring output ───────────────────────────────────────────────────

export interface ScoredCourse {
  courseId: string;
  /** 0–100, integer. */
  matchScore: number;
  /** Localised reason strings the UI shows in result cards. */
  reasons: Localised[];
  /** True if the course was kept even though it failed a hard filter
   *  (e.g. shown as a pivot context, not in the main ranked list). */
  hardFiltered: boolean;
  /** Internal breakdown for explainability + debugging. */
  breakdown: ScoreBreakdown;
}

export interface ScoreBreakdown {
  base: number;
  interest: number;
  priority: number;
  budget: number;
  duration: number;
}

export interface ScoringResult {
  ranked: ScoredCourse[];
  /** If the student's top aspiration was filtered out, this surfaces it. */
  pivot?: {
    aspiration: ScoredCourse;
    pathway: PivotPathway;
  };
}
