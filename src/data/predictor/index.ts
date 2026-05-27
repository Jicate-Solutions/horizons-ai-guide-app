/**
 * AI Career Predictor v2 — public API.
 *
 * Import from '@/data/predictor' for everything: types, scoring engine,
 * editorial tag tables, draft quiz pool, draft pivot pathways, aversion
 * cards. The UI in src/components/AICareerPredictor*.tsx is NOT wired
 * to this yet — that comes next, after the data is reviewed.
 *
 * See AI_PREDICTOR_V2_DESIGN.md for the design that underpins all this.
 */

export * from './types';
export * from './scoring';
export { COURSE_TAGS, FALLBACK_COURSE_TAGS } from './courseTags';
export { PIVOT_PATHWAYS } from './pivotPathways';
export { QUIZ_POOL, QUIZ_META, sampleQuizSession } from './quizPool';
export type { QuizQuestion } from './quizPool';
export { AVERSION_CARDS } from './aversionCards';
export type { AversionCard } from './aversionCards';
