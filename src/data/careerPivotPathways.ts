/**
 * Career Pivot Pathways — for the LIVE engine.
 *
 * ╔════════════════════════════════════════════════════════════════╗
 * ║  STATUS: DRAFT — needs counsellor review before going live.    ║
 * ║  A wrong pivot ("MBBS isn't realistic, try Nursing") needs to  ║
 * ║  be accurate counselling advice, not a confident algorithm     ║
 * ║  guess. Please audit each entry. Bad pivots are worse than     ║
 * ║  no pivots.                                                    ║
 * ╚════════════════════════════════════════════════════════════════╝
 *
 * Surfaced on the results dashboard when the student's top aspiration
 * was hard-filtered out (currently: by the aversion swipe deck). The
 * card acknowledges what they wanted and offers concrete alternatives
 * — never silently discards the aspiration.
 *
 * Authoring rules:
 *  - `fromPathwayId`   MUST be an id in CAREER_PATHWAYS.
 *  - `toPathwayId` of each alternative MUST also be in CAREER_PATHWAYS.
 *  - `closeness` is relative (0-100), only used for sorting within
 *    this pathway — not an absolute match score.
 *  - Rationales are plain and honest. No marketing language.
 *  - 2-4 alternatives per aspiration. More is paralysis.
 *
 * Why only some pathways have pivots:
 *  The live CAREER_PATHWAYS table currently has 8 careers. We can only
 *  pivot to other entries in that table. As CAREER_PATHWAYS grows,
 *  more pivots become possible — add them here when the destination
 *  pathway exists.
 */

import type { CareerPathway } from './careerPathways';

export interface CareerPivotPathway {
  /** The aspiration the student is being pivoted from. */
  fromPathwayId: string;
  /** Shown above the pivot block as a friendly heading. */
  label: string;
  /** Optional Tamil heading; UI falls back to English when absent. */
  labelTa?: string;
  /** Ordered list of alternatives, highest closeness first. */
  alternatives: CareerPivotAlternative[];
}

export interface CareerPivotAlternative {
  /** Must match an id in CAREER_PATHWAYS. */
  toPathwayId: string;
  /** Plain-language reason — honest, not marketing. */
  rationale: string;
  /** Relative closeness to the original aspiration, 0-100. */
  closeness: number;
}

/**
 * Resolve a pivot pathway's alternatives to real CareerPathway objects.
 * Used by the UI so the pivot card can render the full career name,
 * icon, color etc. without duplicating that data here.
 */
export function resolvePivotAlternatives(
  pivot: CareerPivotPathway,
  allPathways: CareerPathway[],
): Array<{ alt: CareerPivotAlternative; pathway: CareerPathway }> {
  return pivot.alternatives
    .map((alt) => {
      const pathway = allPathways.find((p) => p.id === alt.toPathwayId);
      return pathway ? { alt, pathway } : null;
    })
    .filter((x): x is { alt: CareerPivotAlternative; pathway: CareerPathway } => x !== null);
}

export const CAREER_PIVOT_PATHWAYS: CareerPivotPathway[] = [
  // ── Doctor (MBBS) — the most common aspiration that gets filtered out
  //    by the patient_care, shift_work or high_competition aversions.
  {
    fromPathwayId: 'doctor-mbbs',
    label: 'Closer to medicine without MBBS',
    labelTa: 'MBBS இல்லாமல் மருத்துவத்திற்கு நெருக்கமாக',
    alternatives: [
      {
        toPathwayId: 'nurse',
        rationale:
          'Direct patient care, fast entry, strong international demand. Can advance to M.Sc. Nursing and Nurse Practitioner roles — work alongside doctors, not under them.',
        closeness: 85,
      },
      {
        toPathwayId: 'pharmacist',
        rationale:
          'Deep in the medicine world without the NEET grind. Clinical pharmacy in hospitals is growing fast — counselling patients, managing therapies, working with doctors.',
        closeness: 75,
      },
    ],
  },

  // ── Chartered Accountant — filtered out by paperwork or high_competition.
  {
    fromPathwayId: 'chartered-accountant',
    label: 'Finance careers without committing to CA',
    labelTa: 'CA-வுக்கு உறுதியளிக்காமல் நிதிக் தொழில்கள்',
    alternatives: [
      {
        toPathwayId: 'cost-management-accountant',
        rationale:
          'Same family — cost & management accounting. Slightly lower pass-rate pressure than CA, with manufacturing firms and PSUs valuing CMAs particularly highly. Many students run CMA alongside a B.Com.',
        closeness: 88,
      },
      {
        toPathwayId: 'bcom-accounting-finance',
        rationale:
          'The B.Com track closest to CA work — investment analysis, cost auditing, portfolio management. Strong Excel + a CFA or CMA later builds a real finance career without the CA pass-rate grind.',
        closeness: 78,
      },
      {
        toPathwayId: 'bcom-general',
        rationale:
          'A broader B.Com keeps the most options open — strong with Tally, Excel and GST skills, with the door still open to CA/CMA later if you change your mind.',
        closeness: 70,
      },
      {
        toPathwayId: 'bba-graduate',
        rationale:
          'BBA Finance + an MBA later is the management-side route to finance — more focus on business decisions, less on technical accounting.',
        closeness: 65,
      },
    ],
  },

  // ── Data Scientist — filtered out by sitting_long or maths_heavy.
  {
    fromPathwayId: 'data-scientist',
    label: 'Working with data without a desk-only role',
    labelTa: 'டெஸ்க் மட்டுமே இல்லாமல் டேட்டாவுடன் வேலை செய்தல்',
    alternatives: [
      {
        toPathwayId: 'software-engineer',
        rationale:
          'Software engineering is broader than data work — backend, infrastructure, mobile, embedded all involve less continuous mathematics and more variety in the day.',
        closeness: 70,
      },
    ],
  },

  // ── Lawyer — filtered out by memorisation, public_speaking or high_competition.
  {
    fromPathwayId: 'lawyer',
    label: 'Reasoning-heavy careers without the bar exam grind',
    labelTa: 'பார் தேர்வு கடினமின்றி தர்க்க அடிப்படையிலான தொழில்கள்',
    alternatives: [
      {
        toPathwayId: 'chartered-accountant',
        rationale:
          'Both careers reward careful reading of rules and clear writing. CA work involves less courtroom pressure and less rote memorisation — but the entrance grind is still real.',
        closeness: 60,
      },
      {
        toPathwayId: 'bcom-general',
        rationale:
          'A broad B.Com keeps the door open to business law via M.B.L. or company secretary route later, without committing 5 years upfront to LL.B.',
        closeness: 55,
      },
    ],
  },

  // ── Electronics Engineer — filtered out by sitting_long.
  {
    fromPathwayId: 'electronics-engineer',
    label: 'Engineering careers with less time at a desk',
    labelTa: 'குறைந்த டெஸ்க் நேரம் கொண்ட பொறியியல்',
    alternatives: [
      {
        toPathwayId: 'mechatronics-engineer',
        rationale:
          'Hardware-software hybrid like ECE but more lab and shop-floor time. Strong fit if you liked electronics but want to be on your feet building systems, not seated at a workstation.',
        closeness: 80,
      },
      {
        toPathwayId: 'mechanical-engineer',
        rationale:
          'Manufacturing, design and shop-floor work — physical, hands-on engineering. Less day-to-day software than ECE, more time around real systems.',
        closeness: 65,
      },
      {
        toPathwayId: 'civil-engineer',
        rationale:
          'Infrastructure work — site supervision, project management, real-world impact. Trade-off: outdoor / site exposure replaces sitting.',
        closeness: 55,
      },
    ],
  },

  // ── Civil Engineer — filtered out by field_outdoor.
  {
    fromPathwayId: 'civil-engineer',
    label: 'Engineering careers with less site / outdoor exposure',
    labelTa: 'குறைந்த வெளிக்களம் கொண்ட பொறியியல்',
    alternatives: [
      {
        toPathwayId: 'mechanical-engineer',
        rationale:
          'Some shop-floor time but mostly indoor design, manufacturing and quality work. Less site exposure than civil, especially in the early years.',
        closeness: 70,
      },
      {
        toPathwayId: 'electronics-engineer',
        rationale:
          'Almost entirely lab- and office-based. If infrastructure interested you but outdoor work doesn\'t, ECE — especially embedded systems for smart-city / IoT — keeps the systems thinking, drops the site work.',
        closeness: 60,
      },
      {
        toPathwayId: 'software-engineer',
        rationale:
          'A clean pivot to an indoor desk career. Civil-engineering-trained software engineers do well in BIM, construction-tech and infrastructure SaaS — your domain knowledge is an asset.',
        closeness: 55,
      },
    ],
  },

  // NOTE: mechatronics-engineer has no aversionConflicts in CAREER_PATHWAYS,
  // so no pivot table entry is needed yet — the engine never hard-filters
  // mechatronics for v1. If aversion tags are added to mechatronics later
  // (e.g. 'sitting_long' becomes more honest), add a pivot here.
];

/** Look up a pivot pathway by the career the student aspired to. */
export function getPivotPathway(
  fromPathwayId: string,
): CareerPivotPathway | undefined {
  return CAREER_PIVOT_PATHWAYS.find((p) => p.fromPathwayId === fromPathwayId);
}
