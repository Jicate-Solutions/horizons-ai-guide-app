import type { College } from './types';
import { TNEA_COLLEGES, BRANCH_NAMES, type TneaCollege } from '@/data/tneaCollegesList';

/**
 * Bridge: converts the official TNEA 2021 brochure dataset into the
 * existing `College` shape used by CollegeSearch, grouped by district.
 *
 * The brochure dataset is the broadest source we have (468 colleges
 * across 36 districts). Curated `*_FEATURED_COLLEGES` lists take
 * priority — they contain NAAC grades, placement stats, fees, etc.
 * that the brochure doesn't. Brochure-only colleges are appended.
 */

const TYPE_MAP: Record<TneaCollege['type'], College['type']> = {
  university: 'government',
  government: 'government',
  aided: 'government-aided',
  constituent: 'government',
  research: 'government',
  self_financing: 'private',
};

function brochureToCollege(tc: TneaCollege): College {
  // Compose a readable "courses" string from the branch list.
  const courses = tc.branches.length
    ? tc.branches
        .slice(0, 8) // keep card-sized
        .map((b) => BRANCH_NAMES[b.code] ?? b.code)
        .join(', ') +
      (tc.branches.length > 8 ? `, +${tc.branches.length - 8} more` : '')
    : 'Engineering branches (see college website)';

  // Detect autonomous status from the brochure flag OR the name itself.
  const isAuto =
    tc.autonomous === true ||
    /(autonomous|deemed)/i.test(tc.name);

  return {
    id: `tnea-${tc.code}`,
    name: tc.name,
    type: isAuto ? 'autonomous' : TYPE_MAP[tc.type],
    category: 'engineering',
    courses,
    address: [tc.address, tc.district, tc.pincode].filter(Boolean).join(', '),
    website: tc.website ?? undefined,
    contact: tc.email ?? undefined,
  };
}

/**
 * Normalised string for de-duplication (lower-cased alphanumerics only,
 * with common filler words stripped). Mirrors the logic used elsewhere
 * in CollegeSearch.
 */
function norm(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\b(college|institute|institution|of|and|the|for|government|govt|hospital|engineering|technology|university|department|departments)\b/g, ' ')
    .replace(/\s+/g, '')
    .trim();
}

/**
 * Brochure colleges grouped by district, ready to merge into the
 * district-keyed lookup in CollegeSearch.
 */
export const BROCHURE_COLLEGES_BY_DISTRICT: Record<string, College[]> = (() => {
  const out: Record<string, College[]> = {};
  for (const tc of TNEA_COLLEGES) {
    if (!tc.district) continue;
    const c = brochureToCollege(tc);
    if (!out[tc.district]) out[tc.district] = [];
    out[tc.district].push(c);
  }
  return out;
})();

/**
 * Merge curated featured colleges with brochure colleges for a district.
 * Curated entries always win on name collisions (they have richer data).
 * Returns null if neither source has data for that district.
 */
export function mergeWithBrochure(
  district: string,
  curated: College[] | undefined,
): College[] {
  const brochure = BROCHURE_COLLEGES_BY_DISTRICT[district] ?? [];
  if (!curated || curated.length === 0) return brochure;
  if (brochure.length === 0) return curated;

  const seen = new Set(curated.map((c) => norm(c.name)));
  const extras = brochure.filter((b) => !seen.has(norm(b.name)));
  return [...curated, ...extras];
}

/** All TN districts that have at least one brochure college. */
export const BROCHURE_DISTRICTS: string[] = Object.keys(BROCHURE_COLLEGES_BY_DISTRICT).sort();
