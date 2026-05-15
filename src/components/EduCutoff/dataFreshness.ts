/**
 * Central data-freshness metadata.
 *
 * Every piece of "current" data in the app — cutoffs, counselling dates,
 * application fees, college details — has a real last-updated date that
 * students should be able to see. This file is the single source of truth.
 *
 * When data is refreshed (manually, or via an admin tool later), update
 * BOTH the date here AND the underlying data file. Every UI surface reads
 * its freshness from this file so the date a student sees is the date
 * the data was actually verified.
 *
 * This is the honest baseline. It does not replace a proper update
 * pipeline (admin interface / scheduled refresh from official sources),
 * which is a separate, larger piece of work. It just makes staleness
 * visible instead of invisible.
 */

export interface FreshnessInfo {
  /** Human-readable date this dataset was last verified (e.g. "January 2026"). */
  lastUpdated: string;
  /** The official source this data was verified against. */
  source: string;
  /** Optional link to the official source. */
  sourceUrl?: string;
  /** Optional caveat the student should know. */
  note?: string;
}

export const DATA_FRESHNESS: Record<string, FreshnessInfo> = {
  // ── ENGINEERING (TNEA) ────────────────────────────────────────────────────
  'engineering-cutoffs': {
    lastUpdated: 'January 2026',
    source: 'TNEA 2025 published cutoff lists',
    sourceUrl: 'https://www.tneaonline.org',
    note: 'Curated 2025 estimates. Specific per-college numbers are representative — verify against the official allotment list.',
  },
  'tnea-counselling': {
    lastUpdated: 'January 2026',
    source: 'TNEA 2025 counselling schedule + DoTE notification patterns',
    sourceUrl: 'https://www.tneaonline.org',
    note: 'Tentative 2026 dates are projected from 2025 timing. Final dates will be confirmed by DoTE.',
  },

  // ── MEDICAL (NEET) ────────────────────────────────────────────────────────
  'medical-cutoffs': {
    lastUpdated: 'January 2026',
    source: 'NEET 2024-25 TN state allotment lists',
    sourceUrl: 'https://tnmedicalselection.net',
    note: 'Last fully-published cycle is 2024-25. 2025-26 numbers shown where available; 2026-27 will update after the next counselling.',
  },
  'medical-counselling': {
    lastUpdated: 'January 2026',
    source: 'TN Selection Committee NEET counselling schedule',
    sourceUrl: 'https://tnmedicalselection.net',
  },

  // ── PARAMEDICAL & PHARM.D ────────────────────────────────────────────────
  'paramedical-cutoffs': {
    lastUpdated: 'January 2026',
    source: 'TN Selection Committee published 2025-26 closing-cutoff ranges',
    sourceUrl: 'https://tnmedicalselection.net',
    note: 'Calibrated to published 2025-26 govt range bands. Specific per-college points within those ranges are representative estimates pending multi-year allotment data.',
  },
  'paramedical-counselling': {
    lastUpdated: 'January 2026',
    source: 'TN Selection Committee paramedical & Pharm.D prospectuses',
    sourceUrl: 'https://tnmedicalselection.net',
  },

  // ── GOVERNMENT EXAMS ──────────────────────────────────────────────────────
  'govt-exams': {
    lastUpdated: 'January 2026',
    source: 'TNPSC, SSC, RRB, India Post official notifications (2024-25 cycles)',
  },

  // ── OFFICIAL PORTAL POINTERS ─────────────────────────────────────────────
  // For surfaces that don't show curated data but link out to official sources.
  'official-portals': {
    lastUpdated: 'January 2026',
    source: 'Direct links to official TN admission portals',
  },
} as const;

export type DataKey = keyof typeof DATA_FRESHNESS;
