// =============================================================================
// SPORTS QUOTA DISCOVERY DATA
// -----------------------------------------------------------------------------
// This module exposes ONLY the user-provided ("team-verified") colleges that
// have been added to COLLEGE_SPORTS_QUOTA from official 2026-27 sports quota
// notifications shared by the team. It also flattens each college into one or
// more "trial sessions" so the Discovery page can list, filter, and sort them
// like a finder application.
//
// The list is INTENTIONALLY curated. Generic engineering colleges that only
// inherit TNEA defaults (no specific trial date / no team-provided notification)
// are excluded from Discovery.
// =============================================================================

import {
  COLLEGE_SPORTS_QUOTA,
  ALL_SPORTS,
  CollegeSportsQuota,
  Sport,
  SportTrialDate,
} from './sportsQuotaData';

// -----------------------------------------------------------------------------
// IDs of the colleges added to Discovery from team notifications (2026-27)
// -----------------------------------------------------------------------------
// SRMIST is included because the team provided the 12-17 April 2026 trial
// schedule for the 2026-27 cycle. Nandha Polytechnic and Christ Academy are
// the two original team-provided entries from May 2026.
//
// To add a new college to Discovery: add its `id` here AND add a full entry
// to COLLEGE_SPORTS_QUOTA in sportsQuotaData.ts.
export const DISCOVERY_COLLEGE_IDS: string[] = [
  'nandha_polytechnic_erode',
  'caias_bengaluru',
  'ngpit_coimbatore',
  'kkcas_coimbatore',
  'kgisl_coimbatore',
  'thenewcollege_chennai',
  'srmist_kattankulathur',
  'jit_kanchipuram',
  'vistas_pallavaram',
  'vlbj_coimbatore',
  'gtn_dindigul',
  'shanmugha_salem',
  'gems_malappuram',
  'stjosephs_trichy',
  'dace_kanchipuram',
  'annai_dharmapuri',
  'jawahar_neyveli',
  'rathinam_coimbatore',
  'srcas_coimbatore',
  'maher_chennai',
  'cheran_karur',
  'nachiappa_polytechnic_sivaganga',
  'wcc_chennai',
  'avs_salem',
  'mkj_tirupattur',
  'snmv_coimbatore',
  'karpagam_coimbatore',
  'kongunadu_cet_tiruchirappalli',
  'joy_tirunelveli',
  'thiagarajar_polytechnic_salem',
];

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/** All Discovery colleges, in the order declared above. */
export const getDiscoveryColleges = (): CollegeSportsQuota[] => {
  const map = new Map(COLLEGE_SPORTS_QUOTA.map((c) => [c.id, c] as const));
  return DISCOVERY_COLLEGE_IDS
    .map((id) => map.get(id))
    .filter((c): c is CollegeSportsQuota => Boolean(c));
};

/** Bilingual label for a Sport id. */
export const getSportLabel = (id: Sport, lang: 'en' | 'ta'): string => {
  const s = ALL_SPORTS.find((x) => x.id === id);
  return s ? s[lang] : id;
};

export interface CollegeTrialSummary {
  /** Earliest trial date across all genders for this college, or null. */
  earliestDate: Date | null;
  /** Latest trial date across all genders for this college, or null. */
  latestDate: Date | null;
  /** Distinct dates (sorted ascending) with their venue and time. */
  dates: { date: Date; iso: string; time: string; venue: string; sports: Sport[] }[];
  /** Sports trialled for men (deduped). */
  sportsMen: Sport[];
  /** Sports trialled for women (deduped). */
  sportsWomen: Sport[];
  /** Union of sports trialled for either gender. */
  sportsAll: Sport[];
}

/**
 * Build a summary of trial sessions for a college — collapses the per-sport
 * trialsMen/trialsWomen arrays into one row per (date, time, venue) bucket so
 * the UI can display "April 10 · 8 AM · 5 sports" instead of 5 rows.
 *
 * Falls back gracefully when a college doesn't have any trial dates set
 * (e.g. rolling-admission colleges like Thiagarajar Polytechnic) — those
 * still appear in Discovery but with no date and a "Rolling / Direct admission"
 * label rendered by the page.
 */
export const summarizeCollegeTrials = (c: CollegeSportsQuota): CollegeTrialSummary => {
  const trialsMen = c.overrides?.trialsMen ?? [];
  const trialsWomen = c.overrides?.trialsWomen ?? [];
  const all: SportTrialDate[] = [...trialsMen, ...trialsWomen];

  // Bucket by (date, time, venue) — distinct trial sessions
  const bucketMap = new Map<string, { date: Date; iso: string; time: string; venue: string; sports: Set<Sport> }>();
  for (const t of all) {
    const key = `${t.date}|${t.time}|${t.venue}`;
    if (!bucketMap.has(key)) {
      // Parse ISO date safely (YYYY-MM-DD). Fallback to original string.
      const d = parseIsoDate(t.date);
      bucketMap.set(key, { date: d, iso: t.date, time: t.time, venue: t.venue, sports: new Set() });
    }
    bucketMap.get(key)!.sports.add(t.sport);
  }

  const dates = Array.from(bucketMap.values())
    .map((b) => ({ ...b, sports: Array.from(b.sports) }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const allDates = all.map((t) => parseIsoDate(t.date)).filter((d) => !Number.isNaN(d.getTime()));
  const earliestDate = allDates.length ? new Date(Math.min(...allDates.map((d) => d.getTime()))) : null;
  const latestDate = allDates.length ? new Date(Math.max(...allDates.map((d) => d.getTime()))) : null;

  const sportsMen = unique(trialsMen.map((t) => t.sport));
  const sportsWomen = unique(trialsWomen.map((t) => t.sport));
  // If the college doesn't have trial dates set but does have sportsForMen/Women
  // (e.g. rolling-admission colleges), use those.
  const fallbackMen = c.overrides?.sportsForMen ?? [];
  const fallbackWomen = c.overrides?.sportsForWomen ?? [];
  const finalSportsMen = sportsMen.length ? sportsMen : fallbackMen;
  const finalSportsWomen = sportsWomen.length ? sportsWomen : fallbackWomen;

  const sportsAll = unique([...finalSportsMen, ...finalSportsWomen]);

  return {
    earliestDate,
    latestDate,
    dates,
    sportsMen: finalSportsMen,
    sportsWomen: finalSportsWomen,
    sportsAll,
  };
};

/** Parse an ISO date like '2026-04-18' as a local-time Date (avoiding UTC shift). */
const parseIsoDate = (iso: string): Date => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return new Date(NaN);
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
};

const unique = <T,>(arr: T[]): T[] => Array.from(new Set(arr));

// -----------------------------------------------------------------------------
// Filter types
// -----------------------------------------------------------------------------

export type GenderFilter = 'all' | 'male' | 'female';
export type TimingFilter = 'all' | 'upcoming' | 'past';

export interface DiscoveryFilters {
  district: string; // 'all' or a district name
  sport: 'all' | Sport;
  gender: GenderFilter;
  timing: TimingFilter;
}

export const DEFAULT_FILTERS: DiscoveryFilters = {
  district: 'all',
  sport: 'all',
  gender: 'all',
  timing: 'all',
};

// -----------------------------------------------------------------------------
// Filter application
// -----------------------------------------------------------------------------

/** Today at 00:00 local time — anything strictly before is "past". */
const todayLocal = (): Date => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

/**
 * Returns true if the given college passes ALL active filters.
 */
export const collegeMatchesFilters = (
  c: CollegeSportsQuota,
  summary: CollegeTrialSummary,
  filters: DiscoveryFilters
): boolean => {
  // District
  if (filters.district !== 'all' && c.district !== filters.district) return false;

  // Gender presence (when sport filter is 'all', we still respect gender)
  if (filters.gender === 'male' && summary.sportsMen.length === 0) return false;
  if (filters.gender === 'female' && summary.sportsWomen.length === 0) return false;

  // Sport (cross-checked with gender)
  if (filters.sport !== 'all') {
    if (filters.gender === 'male' && !summary.sportsMen.includes(filters.sport)) return false;
    if (filters.gender === 'female' && !summary.sportsWomen.includes(filters.sport)) return false;
    if (filters.gender === 'all' && !summary.sportsAll.includes(filters.sport)) return false;
  }

  // Timing
  if (filters.timing !== 'all') {
    const today = todayLocal();
    if (filters.timing === 'upcoming') {
      // No trial date set → rolling admission, treat as still open
      if (!summary.latestDate) return true;
      if (summary.latestDate.getTime() < today.getTime()) return false;
    }
    if (filters.timing === 'past') {
      // Rolling admission colleges (no date) don't count as "past"
      if (!summary.latestDate) return false;
      if (summary.latestDate.getTime() >= today.getTime()) return false;
    }
  }

  return true;
};

/**
 * Sort colleges for display:
 * - Upcoming trials first, sorted by earliestDate ascending (next trial first)
 * - Then rolling-admission colleges (no date)
 * - Then past trials, sorted by latestDate descending (most-recent past first)
 */
export const sortCollegesForDiscovery = (
  rows: { college: CollegeSportsQuota; summary: CollegeTrialSummary }[]
): { college: CollegeSportsQuota; summary: CollegeTrialSummary }[] => {
  const today = todayLocal().getTime();
  return [...rows].sort((a, b) => {
    const aBucket = bucketFor(a.summary, today);
    const bBucket = bucketFor(b.summary, today);
    if (aBucket !== bBucket) return aBucket - bBucket;

    if (aBucket === 0) {
      // Both upcoming → earliest first
      return (a.summary.earliestDate?.getTime() ?? 0) - (b.summary.earliestDate?.getTime() ?? 0);
    }
    if (aBucket === 2) {
      // Both past → most-recent past first
      return (b.summary.latestDate?.getTime() ?? 0) - (a.summary.latestDate?.getTime() ?? 0);
    }
    // Both rolling → alphabetical by name
    return a.college.collegeName.localeCompare(b.college.collegeName);
  });
};

const bucketFor = (s: CollegeTrialSummary, today: number): 0 | 1 | 2 => {
  if (!s.latestDate) return 1; // rolling
  if (s.latestDate.getTime() >= today) return 0; // upcoming
  return 2; // past
};

// -----------------------------------------------------------------------------
// District list (only districts that actually have a Discovery college)
// -----------------------------------------------------------------------------

export const getDiscoveryDistricts = (): string[] => {
  const set = new Set(getDiscoveryColleges().map((c) => c.district));
  return Array.from(set).sort();
};

// -----------------------------------------------------------------------------
// Sports list (only sports actually offered by at least one Discovery college)
// -----------------------------------------------------------------------------

export const getDiscoverySports = (): Sport[] => {
  const set = new Set<Sport>();
  for (const c of getDiscoveryColleges()) {
    const s = summarizeCollegeTrials(c);
    s.sportsAll.forEach((sp) => set.add(sp));
  }
  // Return them in ALL_SPORTS order so the dropdown is alphabetical
  return ALL_SPORTS.filter((x) => set.has(x.id)).map((x) => x.id);
};

// -----------------------------------------------------------------------------
// Pretty date formatter
// -----------------------------------------------------------------------------

export const formatTrialDate = (d: Date, lang: 'en' | 'ta' = 'en'): string => {
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateRange = (start: Date | null, end: Date | null, lang: 'en' | 'ta' = 'en'): string => {
  if (!start) return '';
  if (!end || start.getTime() === end.getTime()) return formatTrialDate(start, lang);
  // Same month/year → show day-day month
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    const month = start.toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-IN', { month: 'short' });
    const year = start.getFullYear();
    return `${start.getDate()}–${end.getDate()} ${month} ${year}`;
  }
  return `${formatTrialDate(start, lang)} – ${formatTrialDate(end, lang)}`;
};

export const daysFromToday = (d: Date | null): number | null => {
  if (!d) return null;
  const today = todayLocal();
  return Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};
