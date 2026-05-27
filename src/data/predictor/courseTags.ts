/**
 * Editorial course tags — joined by courseId to courseDatabase.ts.
 *
 * ╔════════════════════════════════════════════════════════════════╗
 * ║  STATUS: DRAFT — needs review by the academic / counselling    ║
 * ║  team before going live. These tags drive hard filters         ║
 * ║  (aversionConflicts) and the scoring engine. A wrong tag will  ║
 * ║  silently hide a course from students or surface one badly.    ║
 * ║  Please audit every row before approving for production.       ║
 * ╚════════════════════════════════════════════════════════════════╝
 *
 * Coverage: ~50 most-trafficked courses are tagged explicitly.
 * Everything else falls back to FALLBACK_COURSE_TAGS (neutral).
 *
 * Authoring guidelines used here:
 * - aversionConflicts:  only include if the course is INHERENTLY about
 *                       that activity. CSE → 'sitting_long'. Nursing →
 *                       'patient_care' + 'shift_work'. Be strict — every
 *                       tag here removes the course for students with
 *                       that aversion.
 * - aptitudeDemands:    the 1–3 skills the course genuinely tests.
 * - stemFamily:         true for any course in engineering, medicine,
 *                       allied health, biotech, pure science, data.
 * - automation:         qualitative outlook — see types.ts comments.
 */

import type { CourseTags, Localised } from './types';

const L = (key: string, en: string): Localised => ({ key, en });

const NOTE = {
  ai_aug: L('predictor.auto.ai_augmented',
    'Workflows are changing fast — expect AI tools to handle routine parts; humans direct the work.'),
  high_judgment: L('predictor.auto.high_judgment',
    'High human-judgment role — AI assists but does not replace the practitioner.'),
  human_facing: L('predictor.auto.human_facing',
    'Care- and contact-heavy work — AI augments tools, not the relationship.'),
  creative: L('predictor.auto.creative',
    'Creative judgment matters — AI is a tool, the taste is yours.'),
  exposed: L('predictor.auto.exposed',
    'Routine parts of this work are increasingly automated — specialisation matters more than ever.'),
  physical: L('predictor.auto.physical',
    'Physical, skilled work — slow to automate; expect tools to change, not the trade.'),
};

/** Fallback tag set for any course not explicitly listed below. */
export const FALLBACK_COURSE_TAGS: CourseTags = {
  aversionConflicts: [],
  aptitudeDemands: [],
  stemFamily: false,
  automation: 'ai_augmented',
  automationNote: NOTE.ai_aug,
};

export const COURSE_TAGS: Record<string, CourseTags> = {
  // ── Engineering & CS ────────────────────────────────────────────────
  'btech-cs':         { aversionConflicts: ['sitting_long'],                  aptitudeDemands: ['quantitative', 'logical', 'analytical'], stemFamily: true,  automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'btech-it':         { aversionConflicts: ['sitting_long'],                  aptitudeDemands: ['quantitative', 'logical'],               stemFamily: true,  automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'btech-ai':         { aversionConflicts: ['sitting_long', 'maths_heavy'],   aptitudeDemands: ['quantitative', 'logical', 'analytical'], stemFamily: true,  automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'btech-ds':         { aversionConflicts: ['sitting_long', 'maths_heavy'],   aptitudeDemands: ['quantitative', 'logical', 'analytical'], stemFamily: true,  automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'btech-ece':        { aversionConflicts: ['sitting_long'],                  aptitudeDemands: ['quantitative', 'logical', 'spatial'],    stemFamily: true,  automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'btech-ee':         { aversionConflicts: [],                                aptitudeDemands: ['quantitative', 'logical'],               stemFamily: true,  automation: 'physical_skilled',     automationNote: NOTE.physical },
  'btech-mech':       { aversionConflicts: [],                                aptitudeDemands: ['quantitative', 'spatial', 'analytical'], stemFamily: true,  automation: 'physical_skilled',     automationNote: NOTE.physical },
  'btech-civil':      { aversionConflicts: ['field_outdoor'],                aptitudeDemands: ['spatial', 'quantitative'],               stemFamily: true,  automation: 'physical_skilled',     automationNote: NOTE.physical },
  'btech-aerospace':  { aversionConflicts: [],                                aptitudeDemands: ['quantitative', 'spatial', 'analytical'], stemFamily: true,  automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'btech-robotics':   { aversionConflicts: [],                                aptitudeDemands: ['quantitative', 'spatial', 'logical'],    stemFamily: true,  automation: 'physical_skilled',     automationNote: NOTE.physical },
  'bca':              { aversionConflicts: ['sitting_long'],                  aptitudeDemands: ['logical', 'quantitative'],               stemFamily: true,  automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'bsc-cs':           { aversionConflicts: ['sitting_long'],                  aptitudeDemands: ['logical', 'quantitative'],               stemFamily: true,  automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'bsc-data-science': { aversionConflicts: ['sitting_long'],                  aptitudeDemands: ['quantitative', 'logical', 'analytical'], stemFamily: true,  automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'diploma-engg':     { aversionConflicts: [],                                aptitudeDemands: ['quantitative', 'spatial'],               stemFamily: true,  automation: 'physical_skilled',     automationNote: NOTE.physical },
  'barch':            { aversionConflicts: ['creative_pressure'],             aptitudeDemands: ['spatial', 'analytical'],                 stemFamily: true,  automation: 'creative_judgment',    automationNote: NOTE.creative },

  // ── Pure Sciences ───────────────────────────────────────────────────
  'bsc-physics':      { aversionConflicts: ['lab_practical'],                 aptitudeDemands: ['quantitative', 'analytical', 'logical'], stemFamily: true,  automation: 'high_human_judgment',  automationNote: NOTE.high_judgment },
  'bsc-math':         { aversionConflicts: ['maths_heavy'],                   aptitudeDemands: ['quantitative', 'logical', 'analytical'], stemFamily: true,  automation: 'high_human_judgment',  automationNote: NOTE.high_judgment },
  'bsc-stats':        { aversionConflicts: ['sitting_long', 'maths_heavy'],   aptitudeDemands: ['quantitative', 'logical', 'analytical'], stemFamily: true,  automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'integrated-msc':   { aversionConflicts: ['lab_practical'],                 aptitudeDemands: ['quantitative', 'analytical'],            stemFamily: true,  automation: 'high_human_judgment',  automationNote: NOTE.high_judgment },
  'bsc-biotech':      { aversionConflicts: ['lab_practical'],                 aptitudeDemands: ['analytical'],                            stemFamily: true,  automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'bsc-microbiology': { aversionConflicts: ['lab_practical'],                 aptitudeDemands: ['analytical'],                            stemFamily: true,  automation: 'high_human_judgment',  automationNote: NOTE.high_judgment },
  'bsc-biochemistry': { aversionConflicts: ['lab_practical'],                 aptitudeDemands: ['analytical'],                            stemFamily: true,  automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'bsc-zoology':      { aversionConflicts: ['lab_practical'],                 aptitudeDemands: ['analytical'],                            stemFamily: true,  automation: 'high_human_judgment',  automationNote: NOTE.high_judgment },
  'bsc-botany':       { aversionConflicts: ['lab_practical'],                 aptitudeDemands: ['analytical'],                            stemFamily: true,  automation: 'high_human_judgment',  automationNote: NOTE.high_judgment },

  // ── Medical / Allied Health ─────────────────────────────────────────
  'mbbs':             { aversionConflicts: ['shift_work', 'patient_care', 'high_competition'], aptitudeDemands: ['analytical'],            stemFamily: true,  automation: 'high_human_judgment',  automationNote: NOTE.high_judgment },
  'bds':              { aversionConflicts: ['patient_care', 'high_competition'],               aptitudeDemands: ['spatial', 'analytical'], stemFamily: true,  automation: 'high_human_judgment',  automationNote: NOTE.high_judgment },
  'bams':             { aversionConflicts: ['patient_care', 'memorisation'],                  aptitudeDemands: [],                        stemFamily: true,  automation: 'high_human_judgment',  automationNote: NOTE.high_judgment },
  'bhms':             { aversionConflicts: ['patient_care', 'memorisation'],                  aptitudeDemands: [],                        stemFamily: true,  automation: 'high_human_judgment',  automationNote: NOTE.high_judgment },
  'bums':             { aversionConflicts: ['patient_care', 'memorisation'],                  aptitudeDemands: [],                        stemFamily: true,  automation: 'high_human_judgment',  automationNote: NOTE.high_judgment },
  'bpharm':           { aversionConflicts: ['lab_practical'],                                  aptitudeDemands: ['analytical'],            stemFamily: true,  automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'dpharm':           { aversionConflicts: ['lab_practical'],                                  aptitudeDemands: [],                        stemFamily: true,  automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'bsc-nursing':      { aversionConflicts: ['shift_work', 'patient_care'],                     aptitudeDemands: [],                        stemFamily: true,  automation: 'human_facing',         automationNote: NOTE.human_facing },
  'gnm':              { aversionConflicts: ['shift_work', 'patient_care'],                     aptitudeDemands: [],                        stemFamily: true,  automation: 'human_facing',         automationNote: NOTE.human_facing },
  'bpt':              { aversionConflicts: ['patient_care'],                                   aptitudeDemands: [],                        stemFamily: true,  automation: 'human_facing',         automationNote: NOTE.human_facing },
  'bot':              { aversionConflicts: ['patient_care'],                                   aptitudeDemands: [],                        stemFamily: true,  automation: 'human_facing',         automationNote: NOTE.human_facing },
  'bsc-mlt':          { aversionConflicts: ['lab_practical'],                                  aptitudeDemands: ['analytical'],            stemFamily: true,  automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'bsc-radiology':    { aversionConflicts: ['lab_practical'],                                  aptitudeDemands: ['spatial'],               stemFamily: true,  automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'bsc-optometry':    { aversionConflicts: ['patient_care'],                                   aptitudeDemands: ['spatial'],               stemFamily: true,  automation: 'human_facing',         automationNote: NOTE.human_facing },
  'baslp':            { aversionConflicts: [],                                                 aptitudeDemands: ['verbal'],                stemFamily: true,  automation: 'human_facing',         automationNote: NOTE.human_facing },
  'paramedical':      { aversionConflicts: ['shift_work', 'patient_care'],                     aptitudeDemands: [],                        stemFamily: true,  automation: 'human_facing',         automationNote: NOTE.human_facing },

  // ── Commerce / Business / Law ───────────────────────────────────────
  'bcom-hons':        { aversionConflicts: [],                                aptitudeDemands: ['quantitative'],                          stemFamily: false, automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'bcom-general':     { aversionConflicts: [],                                aptitudeDemands: ['quantitative'],                          stemFamily: false, automation: 'increasingly_automated', automationNote: NOTE.exposed },
  'bba':              { aversionConflicts: [],                                aptitudeDemands: ['verbal'],                                stemFamily: false, automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'ca':               { aversionConflicts: ['paperwork', 'high_competition'], aptitudeDemands: ['quantitative', 'analytical'],            stemFamily: false, automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'cs':               { aversionConflicts: ['paperwork'],                     aptitudeDemands: ['verbal', 'analytical'],                  stemFamily: false, automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'cma':              { aversionConflicts: ['paperwork'],                     aptitudeDemands: ['quantitative'],                          stemFamily: false, automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'bsc-economics':    { aversionConflicts: [],                                aptitudeDemands: ['quantitative', 'analytical'],            stemFamily: false, automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'ba-llb':           { aversionConflicts: ['memorisation'],                  aptitudeDemands: ['verbal', 'analytical'],                  stemFamily: false, automation: 'high_human_judgment',  automationNote: NOTE.high_judgment },
  'llb':              { aversionConflicts: ['memorisation'],                  aptitudeDemands: ['verbal', 'analytical'],                  stemFamily: false, automation: 'high_human_judgment',  automationNote: NOTE.high_judgment },
  'bba-llb':          { aversionConflicts: ['memorisation'],                  aptitudeDemands: ['verbal', 'analytical'],                  stemFamily: false, automation: 'high_human_judgment',  automationNote: NOTE.high_judgment },

  // ── Arts / Design / Media ───────────────────────────────────────────
  'ba-english':       { aversionConflicts: [],                                aptitudeDemands: ['verbal'],                                stemFamily: false, automation: 'creative_judgment',    automationNote: NOTE.creative },
  'ba-psychology':    { aversionConflicts: [],                                aptitudeDemands: ['verbal', 'analytical'],                  stemFamily: false, automation: 'human_facing',         automationNote: NOTE.human_facing },
  'ba-economics':     { aversionConflicts: [],                                aptitudeDemands: ['quantitative', 'analytical'],            stemFamily: false, automation: 'ai_augmented',         automationNote: NOTE.ai_aug },
  'bdes-fashion':     { aversionConflicts: ['creative_pressure'],             aptitudeDemands: ['spatial'],                               stemFamily: false, automation: 'creative_judgment',    automationNote: NOTE.creative },
  'bdes-graphic':     { aversionConflicts: ['creative_pressure', 'sitting_long'], aptitudeDemands: ['spatial'],                           stemFamily: false, automation: 'creative_judgment',    automationNote: NOTE.creative },
  'bdes-interior':    { aversionConflicts: [],                                aptitudeDemands: ['spatial'],                               stemFamily: false, automation: 'creative_judgment',    automationNote: NOTE.creative },
  'bdes-product':     { aversionConflicts: [],                                aptitudeDemands: ['spatial', 'analytical'],                 stemFamily: false, automation: 'creative_judgment',    automationNote: NOTE.creative },
  'bjmc':             { aversionConflicts: ['public_speaking'],               aptitudeDemands: ['verbal'],                                stemFamily: false, automation: 'creative_judgment',    automationNote: NOTE.creative },
  'bmm':              { aversionConflicts: [],                                aptitudeDemands: ['verbal', 'analytical'],                  stemFamily: false, automation: 'creative_judgment',    automationNote: NOTE.creative },

  // ── Education / Defence / Aviation ──────────────────────────────────
  'bed':              { aversionConflicts: ['public_speaking'],               aptitudeDemands: ['verbal'],                                stemFamily: false, automation: 'human_facing',         automationNote: NOTE.human_facing },
  'nda':              { aversionConflicts: ['high_competition', 'sitting_long'], aptitudeDemands: ['logical', 'quantitative'],            stemFamily: false, automation: 'human_facing',         automationNote: NOTE.human_facing },
  'cpl':              { aversionConflicts: ['shift_work'],                    aptitudeDemands: ['spatial', 'analytical'],                 stemFamily: true,  automation: 'high_human_judgment',  automationNote: NOTE.high_judgment },
  'merchant-navy':    { aversionConflicts: ['shift_work', 'field_outdoor'],   aptitudeDemands: ['analytical'],                            stemFamily: true,  automation: 'physical_skilled',     automationNote: NOTE.physical },
  'bsc-aviation':     { aversionConflicts: ['shift_work'],                    aptitudeDemands: ['analytical'],                            stemFamily: true,  automation: 'ai_augmented',         automationNote: NOTE.ai_aug },

  // ── Agriculture / Veterinary ────────────────────────────────────────
  'bvsc':             { aversionConflicts: ['patient_care'],                  aptitudeDemands: [],                                        stemFamily: true,  automation: 'human_facing',         automationNote: NOTE.human_facing },
  'bsc-agriculture':  { aversionConflicts: ['field_outdoor'],                aptitudeDemands: [],                                        stemFamily: true,  automation: 'physical_skilled',     automationNote: NOTE.physical },
  'bsc-horticulture': { aversionConflicts: ['field_outdoor'],                aptitudeDemands: [],                                        stemFamily: true,  automation: 'physical_skilled',     automationNote: NOTE.physical },
  'bsc-forestry':     { aversionConflicts: ['field_outdoor'],                aptitudeDemands: [],                                        stemFamily: true,  automation: 'physical_skilled',     automationNote: NOTE.physical },

  // ── Hotel / Hospitality ─────────────────────────────────────────────
  'hotel-mgmt':       { aversionConflicts: ['shift_work'],                    aptitudeDemands: ['verbal'],                                stemFamily: false, automation: 'human_facing',         automationNote: NOTE.human_facing },
};
