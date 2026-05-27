/**
 * AI Career Predictor v2 — public API.
 *
 * Import from '@/data/predictor' for everything: types, scoring engine,
 * editorial tag tables, draft pivot pathways, aversion cards.
 *
 * Scope: course selection for 12th-standard students. See
 * AI_PREDICTOR_V2_DESIGN.md for what's in and (deliberately) what's out.
 */

export * from './types';
export * from './scoring';
export { COURSE_TAGS, FALLBACK_COURSE_TAGS } from './courseTags';
export { PIVOT_PATHWAYS } from './pivotPathways';
export { AVERSION_CARDS } from './aversionCards';
export type { AversionCard } from './aversionCards';
