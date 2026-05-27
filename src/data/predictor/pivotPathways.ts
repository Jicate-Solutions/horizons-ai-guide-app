/**
 * Pivot Pathways — when a student's top aspiration is out of reach
 * (because of marks, budget, or another hard filter), suggest the
 * closest viable alternative course path.
 *
 * ╔════════════════════════════════════════════════════════════════╗
 * ║  STATUS: DRAFT — needs counsellor review before going live.    ║
 * ║  Bad pivots are worse than no pivots; a student told "MBBS     ║
 * ║  isn't realistic, try B.Sc Nursing" needs that to be accurate  ║
 * ║  advice, not a wrong-but-confident algorithm. Please audit.    ║
 * ╚════════════════════════════════════════════════════════════════╝
 *
 * Authoring rules:
 * - `fromCourseId`     MUST exist in courseDatabase.ts.
 * - Every `courseId` in `alternatives` MUST also exist.
 * - `closeness` is a relative number (0–100), only used for sorting
 *   within this pathway — don't read it as an absolute "match".
 * - Rationales are short, plain, and honest. No marketing language.
 * - Show 2–4 alternatives per aspiration. More is paralysis.
 */

import type { PivotPathway, Localised } from './types';

const L = (key: string, en: string): Localised => ({ key, en });

export const PIVOT_PATHWAYS: PivotPathway[] = [
  // ── MBBS (the big one — most common pivot scenario) ─────────────────
  {
    fromCourseId: 'mbbs',
    label: L('predictor.pivot.from.mbbs',
      'Closer to medicine without MBBS'),
    alternatives: [
      {
        courseId: 'bsc-nursing',
        rationale: L('predictor.pivot.mbbs.nursing',
          'Direct patient care, strong hiring across India and abroad; can pursue M.Sc. Nursing or Nurse Practitioner roles later.'),
        closeness: 85,
      },
      {
        courseId: 'bpharm',
        rationale: L('predictor.pivot.mbbs.bpharm',
          'Deep in the medicine world without the NEET grind — clinical pharmacy, hospital pharmacy, regulatory affairs all open up.'),
        closeness: 78,
      },
      {
        courseId: 'bsc-radiology',
        rationale: L('predictor.pivot.mbbs.radiology',
          'Hospital-based, technical, well-paid; can specialise further with M.Sc.'),
        closeness: 75,
      },
      {
        courseId: 'bpt',
        rationale: L('predictor.pivot.mbbs.bpt',
          'Hands-on rehab work — high-touch with patients, good private-practice potential.'),
        closeness: 72,
      },
    ],
  },

  // ── BDS ─────────────────────────────────────────────────────────────
  {
    fromCourseId: 'bds',
    label: L('predictor.pivot.from.bds',
      'Healthcare careers if BDS is out of reach'),
    alternatives: [
      {
        courseId: 'bsc-optometry',
        rationale: L('predictor.pivot.bds.optometry',
          'Patient-facing, technical, you can run a private practice — similar career shape, faster entry.'),
        closeness: 78,
      },
      {
        courseId: 'bsc-mlt',
        rationale: L('predictor.pivot.bds.mlt',
          'Lab-based diagnostic work in hospitals; technical and detail-oriented.'),
        closeness: 70,
      },
      {
        courseId: 'baslp',
        rationale: L('predictor.pivot.bds.aslp',
          'Audiology and speech therapy — highly specialised, growing demand, lower entry barrier.'),
        closeness: 65,
      },
    ],
  },

  // ── B.Tech CSE (high-cutoff branch) ─────────────────────────────────
  {
    fromCourseId: 'btech-cs',
    label: L('predictor.pivot.from.btech_cs',
      'Software careers without the top-tier B.Tech CSE seat'),
    alternatives: [
      {
        courseId: 'bca',
        rationale: L('predictor.pivot.btech_cs.bca',
          '3-year computing degree — same job market entry through MCA, often half the fees.'),
        closeness: 88,
      },
      {
        courseId: 'bsc-cs',
        rationale: L('predictor.pivot.btech_cs.bsc_cs',
          'Strong foundation in CS theory; pairs well with M.Sc. or specialised certifications.'),
        closeness: 85,
      },
      {
        courseId: 'btech-it',
        rationale: L('predictor.pivot.btech_cs.btech_it',
          'Same family, slightly different focus; cutoffs and fees usually lower.'),
        closeness: 90,
      },
      {
        courseId: 'btech-ece',
        rationale: L('predictor.pivot.btech_cs.ece',
          'Wide doors open from ECE into core electronics, IoT, embedded systems, and software.'),
        closeness: 72,
      },
    ],
  },

  // ── B.Tech AI / Data Science ────────────────────────────────────────
  {
    fromCourseId: 'btech-ai',
    label: L('predictor.pivot.from.btech_ai',
      'AI and data careers via other routes'),
    alternatives: [
      {
        courseId: 'bsc-data-science',
        rationale: L('predictor.pivot.btech_ai.bsc_ds',
          '3-year data science focus; M.Sc. AI/DS afterwards is a fast track to the same jobs.'),
        closeness: 88,
      },
      {
        courseId: 'btech-cs',
        rationale: L('predictor.pivot.btech_ai.btech_cs',
          'CSE with AI/ML electives gets you to the same roles via a broader path.'),
        closeness: 82,
      },
      {
        courseId: 'bsc-stats',
        rationale: L('predictor.pivot.btech_ai.bsc_stats',
          'A statistics degree is one of the strongest pre-requisites for ML — pair with programming.'),
        closeness: 70,
      },
    ],
  },

  // ── Chartered Accountant ────────────────────────────────────────────
  {
    fromCourseId: 'ca',
    label: L('predictor.pivot.from.ca',
      'Finance careers without committing to the CA route'),
    alternatives: [
      {
        courseId: 'bcom-hons',
        rationale: L('predictor.pivot.ca.bcom_hons',
          'Strong base for finance jobs and for later professional papers (ACCA, CFA) if you change your mind.'),
        closeness: 80,
      },
      {
        courseId: 'cma',
        rationale: L('predictor.pivot.ca.cma',
          'Cost & management focus — corporate roles, slightly easier entry exam than CA.'),
        closeness: 78,
      },
      {
        courseId: 'bba-finance',
        rationale: L('predictor.pivot.ca.bba_finance',
          'Management-side of finance; MBA Finance afterwards leads to banking and corporate roles.'),
        closeness: 70,
      },
      {
        courseId: 'bsc-economics',
        rationale: L('predictor.pivot.ca.bsc_econ',
          'Economics gives you analytical depth for finance, research, and policy.'),
        closeness: 68,
      },
    ],
  },

  // ── NDA / Armed Forces ──────────────────────────────────────────────
  {
    fromCourseId: 'nda',
    label: L('predictor.pivot.from.nda',
      'Other routes to a uniformed career'),
    alternatives: [
      {
        courseId: 'bsc-physics',
        rationale: L('predictor.pivot.nda.bsc_physics',
          'Then apply to CDS / TGC / SSC Tech after graduation — engineering and science grads are sought.'),
        closeness: 75,
      },
      {
        courseId: 'merchant-navy',
        rationale: L('predictor.pivot.nda.merchant_navy',
          'Disciplined seafaring career, well-paid, structured progression.'),
        closeness: 70,
      },
      {
        courseId: 'cpl',
        rationale: L('predictor.pivot.nda.cpl',
          'Commercial pilot training — high upfront cost but a strong career if you can fund it.'),
        closeness: 65,
      },
    ],
  },

  // ── Architecture ────────────────────────────────────────────────────
  {
    fromCourseId: 'barch',
    label: L('predictor.pivot.from.barch',
      'Design careers if B.Arch isn\'t the right fit'),
    alternatives: [
      {
        courseId: 'bdes-interior',
        rationale: L('predictor.pivot.barch.bdes_interior',
          'Closely related, more focused on residential and commercial interiors, 4-year degree.'),
        closeness: 85,
      },
      {
        courseId: 'btech-civil',
        rationale: L('predictor.pivot.barch.civil',
          'Engineering of the built environment; can specialise in structural or urban planning later.'),
        closeness: 70,
      },
      {
        courseId: 'bplan',
        rationale: L('predictor.pivot.barch.bplan',
          'Urban and regional planning — design at the scale of cities.'),
        closeness: 78,
      },
    ],
  },

  // ── Law (NLU-tier) ──────────────────────────────────────────────────
  {
    fromCourseId: 'ba-llb',
    label: L('predictor.pivot.from.ba_llb',
      'Law without a top-tier NLU seat'),
    alternatives: [
      {
        courseId: 'llb',
        rationale: L('predictor.pivot.law.llb',
          'Complete a bachelor\'s degree first, then 3-year LL.B. — same Bar Council eligibility.'),
        closeness: 90,
      },
      {
        courseId: 'bba-llb',
        rationale: L('predictor.pivot.law.bba_llb',
          'Corporate-law track from day one; strong for in-house counsel and corporate roles.'),
        closeness: 85,
      },
      {
        courseId: 'bcom-llb',
        rationale: L('predictor.pivot.law.bcom_llb',
          'Commercial and tax law focus; excellent for tax practice and chartered accountancy crossover.'),
        closeness: 82,
      },
    ],
  },
];
