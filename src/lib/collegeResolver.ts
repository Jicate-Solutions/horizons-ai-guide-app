// ─────────────────────────────────────────────────────────────────────────────
// COLLEGE RESOLVER — "which real colleges offer this?"
// ─────────────────────────────────────────────────────────────────────────────
// When the Career Predictor recommends a course, a student naturally asks:
// "OK — but WHERE can I actually study it?" This module answers that, using
// ONLY the app's existing verified datasets:
//
//   - TNEA_COLLEGES   (full TNEA engineering-college list, real branch codes)
//   - neetColleges    (real TN/national medical colleges with cutoffs)
//
// It never invents a college. For careers that have no centralised dataset
// (CA, Law, Teacher, Civil Servant, Entrepreneur), it deliberately returns NO
// list and instead carries the pathway's honest `directAdmissionNote` — because
// a misleading half-list is worse than clear guidance.
//
// Results are grouped into tiers (government / aided / private) and sorted so a
// student sees the affordable, high-value options first.
// ─────────────────────────────────────────────────────────────────────────────

import {
  TNEA_COLLEGES,
  BRANCH_NAMES,
  type TneaCollege,
} from '@/data/tneaCollegesList';
import { neetColleges, type NeetCollege } from '@/data/college-cutoff-data';
import {
  CAREER_COLLEGE_RESOLVERS,
  type CareerPathway,
} from '@/data/careerPathways';

// ─── Output shape ────────────────────────────────────────────────────────────

export type CollegeTierKey = 'government' | 'aided' | 'private';

export interface ResolvedCollege {
  /** Display name */
  name: string;
  /** District (for "near me" relevance) */
  district: string | null;
  /** Which tier — drives grouping + the affordability message */
  tier: CollegeTierKey;
  /** The specific branch / course matched at this college */
  matchedCourse: string;
  /** TNEA code or NEET cutoff, shown as a small factual detail */
  detail: string;
  /** Official website, when available */
  website: string | null;
}

export interface CollegeResolution {
  /** Real colleges grouped by tier, government first */
  colleges: ResolvedCollege[];
  /** Total found before any display capping */
  totalFound: number;
  /** Honest guidance for careers with no centralised dataset (or as a footer) */
  guidanceNote?: string;
  /** A query string to pass to the in-app College Finder, when useful */
  collegeFinderQuery?: string;
  /** Which underlying dataset(s) the list came from — shown for transparency */
  source: 'tnea' | 'neet' | 'guidance' | 'tnea+guidance';
}

// ─── Tier mapping ────────────────────────────────────────────────────────────

const TNEA_TYPE_TO_TIER: Record<TneaCollege['type'], CollegeTierKey> = {
  university: 'government',
  government: 'government',
  constituent: 'government',
  research: 'government',
  aided: 'aided',
  self_financing: 'private',
};

const NEET_TYPE_TO_TIER: Record<NeetCollege['type'], CollegeTierKey> = {
  govt: 'government',
  private: 'private',
  deemed: 'private',
};

// Government first — that ordering is itself honest advice for a TN student.
const TIER_ORDER: Record<CollegeTierKey, number> = {
  government: 0,
  aided: 1,
  private: 2,
};

export const TIER_LABELS: Record<
  CollegeTierKey,
  { label: string; labelTa: string; note: string }
> = {
  government: {
    label: 'Government',
    labelTa: 'அரசு',
    note: 'Lowest fees — always apply here first',
  },
  aided: {
    label: 'Government-Aided',
    labelTa: 'அரசு உதவி',
    note: 'Still very affordable, well-regarded',
  },
  private: {
    label: 'Private / Self-Financing',
    labelTa: 'தனியார் / சுயநிதி',
    note: 'Higher fees — check scholarships',
  },
};

// ─── Resolvers ───────────────────────────────────────────────────────────────

function resolveFromTnea(branchCodes: string[]): ResolvedCollege[] {
  const codeSet = new Set(branchCodes);
  const out: ResolvedCollege[] = [];

  for (const college of TNEA_COLLEGES) {
    // Find the matching branches this college offers for the career.
    const matched = college.branches.filter((b) => codeSet.has(b.code));
    if (matched.length === 0) continue;

    // Prefer the "primary" branch name for display (first match in our
    // priority-ordered codes list that this college actually has).
    const primaryCode =
      branchCodes.find((c) => matched.some((m) => m.code === c)) ??
      matched[0].code;
    const branchName = BRANCH_NAMES[primaryCode] ?? primaryCode;

    out.push({
      name: college.name,
      district: college.district,
      tier: TNEA_TYPE_TO_TIER[college.type],
      matchedCourse: branchName,
      detail: `TNEA code ${college.code}`,
      website: college.website,
    });
  }
  return out;
}

function resolveFromNeet(courseNames: string[]): ResolvedCollege[] {
  const wanted = new Set(courseNames.map((c) => c.toUpperCase()));
  return neetColleges
    .filter((c) => wanted.has(c.course.toUpperCase()))
    .map((c) => ({
      name: c.name,
      district: c.district,
      tier: NEET_TYPE_TO_TIER[c.type],
      matchedCourse: c.course,
      detail: `~${c.cutoffScore}/720 cutoff · ${c.seats} seats`,
      website: null,
    }));
}

/**
 * Sort: government tier first, then (for engineering) Anna University / govt
 * names ahead of the long private tail, then alphabetical. Keeps the most
 * useful, most affordable options at the top of each tier.
 */
function sortColleges(list: ResolvedCollege[]): ResolvedCollege[] {
  return [...list].sort((a, b) => {
    if (TIER_ORDER[a.tier] !== TIER_ORDER[b.tier]) {
      return TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
    }
    return a.name.localeCompare(b.name);
  });
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Resolve real colleges for a career pathway.
 *
 * @param pathway  the recommended career
 * @param opts.preferDistrict  if given, colleges in that district float to the
 *                             top within their tier (the student's "near me")
 * @param opts.limit           max colleges to return (UI shows a few, links out
 *                             for the rest). Default 12.
 */
export function resolveCollegesForCareer(
  pathway: CareerPathway,
  opts: { preferDistrict?: string; limit?: number } = {},
): CollegeResolution {
  const { preferDistrict, limit = 12 } = opts;
  const resolver = CAREER_COLLEGE_RESOLVERS[pathway.id];

  if (!resolver) {
    return {
      colleges: [],
      totalFound: 0,
      guidanceNote:
        'College admission for this career is direct — see the roadmap and reality check above for where to study.',
      source: 'guidance',
    };
  }

  let colleges: ResolvedCollege[] = [];
  let source: CollegeResolution['source'] = 'guidance';

  if (resolver.neetCourses && resolver.neetCourses.length > 0) {
    colleges = resolveFromNeet(resolver.neetCourses);
    source = 'neet';
  } else if (resolver.tneaBranchCodes && resolver.tneaBranchCodes.length > 0) {
    colleges = resolveFromTnea(resolver.tneaBranchCodes);
    source = resolver.directAdmissionNote ? 'tnea+guidance' : 'tnea';
  }

  const totalFound = colleges.length;

  // Sort by tier, then optionally float the student's home district up.
  let sorted = sortColleges(colleges);
  if (preferDistrict) {
    const wanted = preferDistrict.trim().toLowerCase();
    sorted = [...sorted].sort((a, b) => {
      // keep tier order first
      if (TIER_ORDER[a.tier] !== TIER_ORDER[b.tier]) {
        return TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
      }
      const aHome = (a.district ?? '').toLowerCase() === wanted ? 0 : 1;
      const bHome = (b.district ?? '').toLowerCase() === wanted ? 0 : 1;
      if (aHome !== bHome) return aHome - bHome;
      return a.name.localeCompare(b.name);
    });
  }

  return {
    colleges: sorted.slice(0, limit),
    totalFound,
    guidanceNote: resolver.directAdmissionNote,
    collegeFinderQuery: resolver.collegeFinderQuery,
    source,
  };
}

/** Group a resolved list by tier, preserving order — handy for the UI. */
export function groupByTier(
  colleges: ResolvedCollege[],
): { tier: CollegeTierKey; colleges: ResolvedCollege[] }[] {
  const order: CollegeTierKey[] = ['government', 'aided', 'private'];
  return order
    .map((tier) => ({
      tier,
      colleges: colleges.filter((c) => c.tier === tier),
    }))
    .filter((g) => g.colleges.length > 0);
}
