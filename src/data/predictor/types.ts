/**
 * AI Career Predictor v2 — type system.
 *
 * One source of truth for the unified UserProfile, the new modules
 * (objective scores, behavioural signals, constraints) and the result
 * shapes used by the scoring engine. See AI_PREDICTOR_V2_DESIGN.md.
 *
 * Status: foundation, not wired into the UI yet.
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
  /** Optional self-rated skills, 1–5. Used as a prior, overridden by quiz. */
  selfSkills?: Partial<Record<SkillDimension, 1 | 2 | 3 | 4 | 5>>;
}

// ─── Module 1: Objective aptitude scores ──────────────────────────────

export type SkillDimension =
  | 'quantitative'
  | 'logical'
  | 'verbal'
  | 'spatial'
  | 'analytical';

export interface ObjectiveScores {
  /** Per-dimension 0–100, only set for dimensions actually tested. */
  scores: Partial<Record<SkillDimension, number>>;
  timeSpentSec: number;
  takenAt: string;            // ISO timestamp
  questionsAnswered: number;
}

// ─── Module 2: Behavioural signals (aversions + micro-tasks) ──────────

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

export interface MicroTaskResult {
  /** Career being validated, e.g. 'data_analyst'. */
  careerId: string;
  outcome: 'completed' | 'abandoned' | 'timed_out';
  /** Self-rated tolerance after the task: 1 (hated) – 5 (loved). */
  tolerance: 1 | 2 | 3 | 4 | 5;
  timeSpentSec: number;
}

export interface BehaviouralSignals {
  aversions: AversionTag[];
  microTasks: Record<string, MicroTaskResult>;
  burnoutNote?: string;
}

// ─── Module 3: Real-world constraints ─────────────────────────────────

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
  /** Whether each optional layer should trigger for this student. */
  needsAptitudeQuiz: boolean;
  needsAversionCheck: boolean;
}

// ─── The full profile ─────────────────────────────────────────────────

export interface UserProfile {
  schemaVersion: 2;
  language: LangCode;
  self: SelfReported;
  /** Present only if the aptitude quiz was taken. */
  objective?: ObjectiveScores;
  /** Present only if the aversion step was completed. */
  behaviour?: BehaviouralSignals;
  /** Present only if the constraints step was completed. */
  constraints?: Constraints;
  /** Internal: drives gating decisions for the optional layers. */
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
  /** Aptitudes this course is genuinely demanding in. Used by scoring. */
  aptitudeDemands: SkillDimension[];
  /** Whether the course sits in the STEM/data family. */
  stemFamily: boolean;
  /** Qualitative automation outlook. */
  automation: AutomationTag;
  /** Editorial one-liner shown next to the automation tag. */
  automationNote: Localised;
}

// ─── Pivot pathways (Module 3 — aspiration recovery) ──────────────────

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
  objective: number;
  priority: number;
  budget: number;
  duration: number;
  microTask: number;
}

export interface ScoringResult {
  ranked: ScoredCourse[];
  /** If the student's top aspiration was filtered out, this surfaces it. */
  pivot?: {
    aspiration: ScoredCourse;
    pathway: PivotPathway;
  };
}
