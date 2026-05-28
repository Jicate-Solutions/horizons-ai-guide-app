/**
 * Aversion swipe deck — the "what would burn you out?" cards shown to
 * students whose confidence score triggers the behavioural check.
 *
 * ╔════════════════════════════════════════════════════════════════╗
 * ║  STATUS: DRAFT — copy needs review by the counselling team.    ║
 * ║  These cards drive HARD FILTERS in the scoring engine: a       ║
 * ║  student who swipes "yes I hate this" against `patient_care`   ║
 * ║  will no longer see MBBS, BDS, Nursing, etc. in their results. ║
 * ║  Please confirm every card is unambiguous before approving.    ║
 * ╚════════════════════════════════════════════════════════════════╝
 *
 * Localisation: every visible string is a Localised key with English
 * fallback; translations slot in via src/hooks/useLanguage.tsx.
 */

import type { AversionTag, Localised } from './types';

const L = (key: string, en: string): Localised => ({ key, en });

export interface AversionCard {
  tag: AversionTag;
  /** Single-line headline, like a scenario the student imagines themselves in. */
  headline: Localised;
  /** Second-line elaboration so the student knows what they're choosing. */
  detail: Localised;
  /** Emoji shown alongside the card. */
  emoji: string;
}

export const AVERSION_CARDS: AversionCard[] = [
  {
    tag: 'sitting_long',
    emoji: '💺',
    headline: L('predictor.aversion.sitting_long.headline',
      'Sitting at a desk for 8+ hours a day'),
    detail: L('predictor.aversion.sitting_long.detail',
      'Most software, design, finance and writing roles need this.'),
  },
  {
    tag: 'public_speaking',
    emoji: '🎤',
    headline: L('predictor.aversion.public_speaking.headline',
      'Presenting in front of a roomful of people'),
    detail: L('predictor.aversion.public_speaking.detail',
      'Teaching, sales, law, journalism and management all need confident speakers.'),
  },
  {
    tag: 'memorisation',
    emoji: '📚',
    headline: L('predictor.aversion.memorisation.headline',
      'Memorising large amounts of material for exams'),
    detail: L('predictor.aversion.memorisation.detail',
      'Medical entrance grinds, law, AYUSH and competitive exams demand this.'),
  },
  {
    tag: 'maths_heavy',
    emoji: '➗',
    headline: L('predictor.aversion.maths_heavy.headline',
      'Heavy mathematics every single working day'),
    detail: L('predictor.aversion.maths_heavy.detail',
      'Engineering, data science, statistics and economics live in numbers.'),
  },
  {
    tag: 'lab_practical',
    emoji: '🧪',
    headline: L('predictor.aversion.lab_practical.headline',
      'Wearing a lab coat and running experiments'),
    detail: L('predictor.aversion.lab_practical.detail',
      'Pure sciences, biotech, pharmacy and many medical paths require lab time.'),
  },
  {
    tag: 'shift_work',
    emoji: '🌙',
    headline: L('predictor.aversion.shift_work.headline',
      'Night shifts and irregular hours'),
    detail: L('predictor.aversion.shift_work.detail',
      'Hospitals, hospitality, aviation and merchant navy roles all rotate.'),
  },
  {
    tag: 'field_outdoor',
    emoji: '🌦️',
    headline: L('predictor.aversion.field_outdoor.headline',
      'Working outdoors in heat, rain and dust'),
    detail: L('predictor.aversion.field_outdoor.detail',
      'Civil engineering, agriculture, forestry and field research happen on site.'),
  },
  {
    tag: 'patient_care',
    emoji: '🏥',
    headline: L('predictor.aversion.patient_care.headline',
      'Being close to people who are sick, in pain, or distressed'),
    detail: L('predictor.aversion.patient_care.detail',
      'All medical, nursing and therapy careers centre on this.'),
  },
  {
    tag: 'creative_pressure',
    emoji: '🎨',
    headline: L('predictor.aversion.creative_pressure.headline',
      'Inventing something original on a tight deadline'),
    detail: L('predictor.aversion.creative_pressure.detail',
      'Design, advertising, architecture and content roles run on this pressure.'),
  },
  {
    tag: 'high_competition',
    emoji: '🥇',
    headline: L('predictor.aversion.high_competition.headline',
      'A 2–3 year grind for an entrance exam with a tiny pass rate'),
    detail: L('predictor.aversion.high_competition.detail',
      'NEET, JEE Advanced, CLAT, UPSC and CA all demand this kind of stamina.'),
  },
  {
    tag: 'paperwork',
    emoji: '🧾',
    headline: L('predictor.aversion.paperwork.headline',
      'Spending the day on forms, filings and compliance'),
    detail: L('predictor.aversion.paperwork.detail',
      'Chartered accountancy, company secretary, government, banking and law involve this.'),
  },
  {
    tag: 'sales_persuasion',
    emoji: '🤝',
    headline: L('predictor.aversion.sales_persuasion.headline',
      'Convincing strangers to buy or commit to something'),
    detail: L('predictor.aversion.sales_persuasion.detail',
      'Sales, marketing, hospitality and entrepreneurship lean on this skill.'),
  },
  // ─── Discovery Expansion additions (May 2026) ────────────────────────────
  // Three tags added alongside Batches 2 + 3 of the Discovery roadmap so the
  // new niche careers (Forensic Science, Marine Engineering, Aerospace,
  // Defence Studies) can be honestly filtered for students whose temperament
  // would not suit those specific demands.
  {
    tag: 'travel_away',
    emoji: '🧳',
    headline: L('predictor.aversion.travel_away.headline',
      'Months away from home for work'),
    detail: L('predictor.aversion.travel_away.detail',
      'Merchant navy, oil rigs, aerospace project sites and many defence postings require extended periods away from family.'),
  },
  {
    tag: 'physical_training',
    emoji: '🏃',
    headline: L('predictor.aversion.physical_training.headline',
      'Daily physical training, drills and fitness standards'),
    detail: L('predictor.aversion.physical_training.detail',
      'Defence, marine cadet programs and some uniformed services demand sustained PT and fitness discipline.'),
  },
  {
    tag: 'graphic_content',
    emoji: '🩸',
    headline: L('predictor.aversion.graphic_content.headline',
      'Working with crime scenes, autopsies, or graphic forensic evidence'),
    detail: L('predictor.aversion.graphic_content.detail',
      'Forensic science, pathology and some criminology work involve regular exposure to disturbing physical evidence.'),
  },
];
