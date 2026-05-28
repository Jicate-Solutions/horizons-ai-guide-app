// ─────────────────────────────────────────────────────────────────────────────
// CAREER PATHWAYS — Curated, TN-specific source of truth
// ─────────────────────────────────────────────────────────────────────────────
// This file is the backbone of the Career Predictor. Every match score, roadmap
// stage, 90-day action and reality-check figure is derived from THIS data —
// not from an LLM guess. The LLM only writes a personalised narrative ON TOP of
// these verified facts.
//
// WHY THIS MATTERS: a deterministic, inspectable dataset means the same student
// profile always produces the same recommendation, and any reviewer can trace
// exactly why a career scored what it did. That is what makes the tool
// defensible — it is advice a counsellor could stand behind, not a black box.
//
// SOURCING NOTE: cutoffs and fee ranges reflect TN 2024-25 admission cycles
// (TNEA / NEET-UG / state counselling) and are intended as planning guidance.
// They are deliberately given as ranges, and every result in the UI is paired
// with "verify on the official source" guidance. `lastReviewed` tracks freshness.
// ─────────────────────────────────────────────────────────────────────────────

export type SkillId =
  | 'mathematics'
  | 'language'
  | 'science'
  | 'creativity'
  | 'people'
  | 'physical'
  | 'digital';

export type PriorityId =
  | 'salary'
  | 'security'
  | 'balance'
  | 'abroad'
  | 'prestige'
  | 'passion'
  | 'growth'
  | 'hometown';

// TN 12th group "streams" — matches groupToStream in tnGroupTaxonomy.ts
export type Stream = 'pcm' | 'pcmb' | 'pcb' | 'commerce' | 'arts' | 'vocational';

/**
 * CareerFamily — used for de-duplication when ranking results.
 *
 * The Career Predictor scores every eligible career and ranks them, but
 * showing a student a top-5 that is "5 variants of B.Com" or "5 different
 * allied health specialisations" is poor UX — they need a DIVERSE top list
 * AND a separate place to discover other paths within the same family.
 *
 * Each pathway is tagged with a family. The ranking engine then shows:
 *   - Top Matches: the highest-scoring pathway per family (family-diverse).
 *   - Worth a Look: the next-best family-leader that did not make Top.
 *
 * Granularity rule: a family is "the set of careers a student would be torn
 * between." Two B.Com tracks ARE that set. Mechanical and Civil Engineering
 * are NOT — they are genuinely different careers and should both appear in
 * Top Matches when both score well. So families are at the SPECIALISATION
 * level, not the broad-field level.
 */
export type CareerFamily =
  | 'tech-software'
  | 'tech-data'
  | 'tech-business-systems'
  | 'tech-cybersecurity'
  | 'healthcare-medical'
  | 'healthcare-pharma'
  | 'healthcare-nursing'
  | 'healthcare-physio'
  | 'healthcare-allied'
  | 'healthcare-nutrition'
  | 'engineering-mechanical'
  | 'engineering-electronics'
  | 'engineering-civil'
  | 'engineering-mechatronics'
  | 'engineering-biotech'
  | 'engineering-aerospace'
  | 'engineering-marine'
  | 'engineering-industrial-ops'
  | 'engineering-materials'
  | 'engineering-applied-chem'
  | 'engineering-textiles'
  | 'engineering-printing-packaging'
  | 'science-forensic'
  | 'science-food-tech'
  | 'science-fisheries'
  | 'commerce-ca-cma'
  | 'commerce-bcom'
  | 'commerce-bba'
  | 'law'
  | 'arts-criminology'
  | 'creative-design'
  | 'psychology'
  | 'defence-strategic'
  | 'arts-language'
  | 'agriculture';

export type EntranceExam =
  | 'TNEA'
  | 'JEE Main'
  | 'NEET-UG'
  | 'CLAT'
  | 'NATA'
  | 'CUET'
  | 'TNAU (Agri)'
  | 'CA Foundation'
  | 'None (direct admission)';

/**
 * InterestId — the 12 interest categories the wizard's Step 3 asks the
 * student to pick from. Each career carries an `interestTags` array of
 * these ids so interest matching is explicit (not a brittle keyword
 * search over the career's prose). See `scoreInterestMatch` in
 * src/lib/careerScoring.ts for the math.
 *
 * Source of truth for labels lives in InterestAssessment.tsx — keep
 * these two in sync if the wizard's interest list ever changes.
 */
export type InterestId =
  | 'tech'
  | 'healthcare'
  | 'finance'
  | 'design'
  | 'research'
  | 'govt'
  | 'travel'
  | 'media'
  | 'engineering'
  | 'law'
  | 'environment'
  | 'education'
  | 'defence';


export interface RoadmapStage {
  /** Short title, e.g. "Score 90%+ in Board exams" */
  title: string;
  titleTa: string;
  /** What the student concretely does in this stage */
  detail: string;
  /** Rough window — kept generic so it stays valid across cycles */
  window: string;
  /** 'now' = the stage a current 12th student is in */
  phase: 'now' | 'next' | 'later';
}

export interface NinetyDayAction {
  title: string;
  titleTa: string;
  detail: string;
  /** high = do this week, medium = this month, low = within 90 days */
  priority: 'high' | 'medium' | 'low';
  /** Optional official link — only government / official portals */
  link?: string;
  /** Optional in-app route to a relevant VAZHIKATTI tool */
  appRoute?: string;
}

export interface CollegeTier {
  /** e.g. "Top government colleges" */
  label: string;
  /** Real example institutions in TN */
  examples: string[];
  /** Cutoff / rank guidance for this tier */
  cutoffGuide: string;
  /** Indicative annual fee range */
  feeRange: string;
}

export interface CareerPathway {
  id: string;
  /** End-goal profession, e.g. "Software Engineer" */
  title: string;
  titleTa: string;
  icon: string;
  /** Tailwind gradient for the card */
  color: string;
  /** One-line plain description of what the job actually is */
  whatIsIt: string;

  /**
   * Dedup family — careers within the same family compete for ONE slot in
   * the family-diverse Top Matches section. Optional during the transition;
   * pathways without a family act as a singleton family (they always make
   * the top selection if scored high enough).
   */
  family?: CareerFamily;

  /**
   * Niche flag — REQUIRED structural classification. Decides eligibility
   * for the "Worth a Look" discovery section.
   *
   *   isNiche: false  → Mainstream career every TN family already knows
   *                     about (CSE, MBBS, Mechanical, generic B.Com, BBA,
   *                     CA, B.Pharm, BA English, etc.). These appear in
   *                     Top Matches when they fit, but NEVER in Worth a
   *                     Look — that section is reserved for true discovery.
   *
   *   isNiche: true   → Specialised / under-considered career students
   *                     usually don't know about (Ceramic Tech, Leather
   *                     Tech, Cyber Security, Forensic Science, Allied
   *                     Health roles, BBA Logistics, etc.). These can
   *                     appear in BOTH Top Matches (when score earns it)
   *                     AND Worth a Look (when they didn't make Top but
   *                     are a strong fit worth surfacing).
   *
   * This is a HARD STRUCTURAL boundary, not a score-based threshold.
   * No mainstream career can ever pollute the discovery section even
   * if it ranks high. Field is required at compile time so no career
   * can be added without explicit classification — see the topCareer-
   * MatchesWithDiscovery filter in src/lib/careerScoring.ts.
   */
  isNiche: boolean;

  /**
   * Interest tags — the wizard interest IDs this career genuinely aligns
   * with. Drives the dedicated 8-point interest-match scoring component
   * (Phase 0.5, May 2026). Optional during the transition; pathways
   * without tags get a neutral half-credit on the component (so they are
   * not punished, but they also do not benefit from interest signal).
   *
   * Rule of thumb: 1-3 tags per career. List the interests a student who
   * picked them would genuinely be excited by this career — not every
   * tag that could remotely apply. Over-tagging makes the signal noise.
   */
  interestTags?: InterestId[];

  // ─── ELIGIBILITY ───────────────────────────────────────────────────────────
  /** Streams from which this career is directly reachable after 12th */
  eligibleStreams: Stream[];
  /** Specific TN group codes that are an especially strong fit (bonus) */
  strongGroupCodes: string[];
  /** The UG course(s) that lead here */
  ugCourses: string[];
  /** Entrance exam(s) gating entry */
  entranceExams: EntranceExam[];
  /**
   * HOW a 12th student actually reaches this career.
   *
   * IMPORTANT — by design, the Career Predictor only contains careers a student
   * can ACT ON directly after 12th. Careers that require finishing a degree
   * first (Civil Servant, Teacher) or are long-build paths with no defined
   * entry (Entrepreneur) were deliberately removed: a predictor for a 12th
   * student should only surface things that map to a real course decision
   * they make NOW. The type below is intentionally narrow so such a career
   * cannot be re-added without a deliberate change here.
   *
   *  - 'direct-after-12th'  → you join the UG course straight after 12th and
   *                           that course IS the path (Engineer, Doctor, Nurse,
   *                           Lawyer via 5-yr integrated, Pharmacist).
   *  - 'professional-track' → a multi-year professional qualification you
   *                           register for directly after 12th, no prior
   *                           degree needed (CA via ICAI).
   */
  pathwayType: 'direct-after-12th' | 'professional-track';
  /**
   * Honest, plain-language summary of the realistic time from finishing 12th
   * to actually working in this career. Shown prominently in the UI.
   */
  timeToCareer: string;

  // ─── SCORING INPUTS ────────────────────────────────────────────────────────
  /**
   * Skill weights — how much each skill matters for this career, 0-10.
   * Used by the scoring engine: a student's self-rating is compared against
   * these weights so a strong match on a HIGH-weight skill counts more.
   */
  skillWeights: Record<SkillId, number>;
  /**
   * Which priorities this career naturally satisfies (0-10 "delivers" score).
   * If a student ranks "salary" #1 and this career delivers 9 on salary,
   * that alignment lifts the score.
   */
  priorityFit: Record<PriorityId, number>;
  /** Realistic board % band to be competitive for the mainstream pathway */
  competitiveBoardPct: { comfortable: number; stretch: number };

  // ─── REALITY CHECK ─────────────────────────────────────────────────────────
  /** Honest salary picture for India, early career → experienced */
  salaryReality: {
    startingLPA: string;
    midCareerLPA: string;
    note: string;
  };
  /** Job-market demand, 1-10, with a short honest note */
  demand: { score: number; note: string };
  /** How hard entry actually is, 1-10 (10 = extremely competitive) */
  entryDifficulty: { score: number; note: string };
  /** College tiers with real TN examples + cutoff/fee guidance */
  collegeTiers: CollegeTier[];
  /** Honest cost-of-pathway summary */
  costReality: string;
  /** Backup / adjacent options if the main plan does not work out */
  backupOptions: string[];
  /** The uncomfortable truth a good counsellor would still say */
  honestCaveat: string;

  // ─── BEHAVIOURAL HARD FILTERS (v2) ─────────────────────────────────────────
  /**
   * Aversion tags this career inherently demands tolerance for. If a student
   * marks any of these aversions in the swipe deck, the career is removed
   * from results — a hard filter, not a soft penalty. Tags should ONLY be
   * included if the career is genuinely about that activity (a software
   * engineer truly does sit at a desk all day; a doctor truly does care for
   * sick people). Conservatism here matters: every tag potentially hides an
   * aspirational career from a student. Empty list = no behavioural conflicts.
   */
  aversionConflicts?: import('./predictor/types').AversionTag[];

  /**
   * Qualitative outlook on how this career is reshaping under automation.
   * Deliberately NOT a score — see AI_PREDICTOR_V2_DESIGN.md §7 for why.
   * Editorial; reviewed annually. Shown as a one-line callout on the
   * results dashboard.
   */
  automation?: import('./predictor/types').AutomationTag;
  /** One-line editorial explainer shown next to the automation tag. */
  automationNote?: string;

  // ─── ACTION ────────────────────────────────────────────────────────────────
  roadmap: RoadmapStage[];
  ninetyDayPlan: NinetyDayAction[];
  /** Skills to actively build now, most-important first */
  buildNowSkills: { skill: string; why: string; freeResource: string }[];

  /** Freshness marker */
  lastReviewed: string;

  /**
   * v2 — DRAFT MARKER. When true, the TN-specific numeric fields on this
   * pathway (collegeTiers, salaryReality, costReality, demand, etc.) are
   * AI-generated drafts that have NOT yet been audited by a counsellor.
   * The UI shows a visible "pending counsellor review" banner on the
   * detail card so students know which figures are verified and which
   * are estimates. Flip to false after a counsellor has signed off on
   * the numbers for this career. Skill weights, priority fit, skills-
   * to-build and roadmap structure are model-derived and don't need to
   * gate this flag — only the TN-specific quantitative claims do.
   */
  needsCounsellorReview?: boolean;
}

/**
 * How to resolve REAL Tamil Nadu colleges for a career, from the existing
 * verified datasets. Kept as a separate, explicit table (rather than guessed)
 * so every mapping is reviewable:
 *   - tneaBranchCodes → looked up in TNEA_COLLEGES (engineering)
 *   - neetCourses     → looked up in neetColleges (medical)
 *   - directAdmissionNote → for careers with no centralised college dataset
 *     (CA, Law), an honest explanation of where to study instead of a
 *     misleading half-list.
 */
export interface CollegeResolver {
  /** 2-letter TNEA branch codes whose colleges suit this career */
  tneaBranchCodes?: string[];
  /** NEET course names (MBBS, BDS, etc.) whose colleges suit this career */
  neetCourses?: string[];
  /** For non-centralised careers: honest guidance instead of a fake list */
  directAdmissionNote?: string;
  /** Deep-link query for the in-app College Finder, when relevant */
  collegeFinderQuery?: string;
}

/**
 * Career id → college resolver. Engineering and medical careers map onto real
 * named-college datasets; the rest get honest "how to choose where to study"
 * guidance, because a half-accurate college list is worse than none.
 */
export const CAREER_COLLEGE_RESOLVERS: Record<string, CollegeResolver> = {
  'software-engineer': {
    // CS, CSE(SS), IT, IT(SS), AI&DS, CSE(AI/ML), Computer & Communication,
    // Computer Tech, Information Science, CS & Business System.
    tneaBranchCodes: ['CS', 'CM', 'IT', 'IM', 'AD', 'AM', 'CO', 'CT', 'IG', 'CB', 'TS'],
    collegeFinderQuery: 'Computer Science',
  },
  'data-scientist': {
    // AI & Data Science, CSE(AI/ML), CSE(Big Data), CS, CSE(SS), IT.
    tneaBranchCodes: ['AD', 'AM', 'BD', 'CS', 'CM', 'IT'],
    collegeFinderQuery: 'Data Science',
  },
  'mechanical-engineer': {
    // Mechanical and its many variants + Automobile + Mechatronics.
    tneaBranchCodes: ['ME', 'MH', 'MS', 'MF', 'MU', 'XM', 'AU', 'AS', 'MC', 'MZ', 'MG', 'PR'],
    collegeFinderQuery: 'Mechanical',
  },
  'doctor-mbbs': {
    neetCourses: ['MBBS'],
  },
  // Nurse & Pharmacist: there is no single centralised "named college" dataset
  // bundled in the app yet, so we give honest guidance + a finder query rather
  // than a misleading partial list. (B.Pharm appears partly via the TNEA "PH"
  // pharmaceutical-tech branch, which we surface as a related option.)
  nurse: {
    directAdmissionNote:
      'B.Sc Nursing has no single state counselling portal like TNEA. Apply directly to government nursing colleges (attached to government medical colleges in most districts) and to private nursing colleges. Government seats are far cheaper — always apply there first.',
    collegeFinderQuery: 'Nursing',
  },
  pharmacist: {
    tneaBranchCodes: ['PH', 'PM'], // Pharmaceutical Technology (degree-level)
    directAdmissionNote:
      'Most B.Pharm / Pharm.D admissions are direct to the college (no single state portal). Apply to government pharmacy colleges first — they are attached to government medical colleges in several districts — then private colleges as backup.',
    collegeFinderQuery: 'Pharmacy',
  },
  'chartered-accountant': {
    directAdmissionNote:
      'CA needs no college admission at all — you register directly with ICAI after 12th and study from anywhere. For the recommended parallel B.Com safety net, any arts & science college works; pick one that is affordable and close to home.',
    collegeFinderQuery: 'B.Com',
  },
  lawyer: {
    directAdmissionNote:
      'Law colleges are not in a single engineering-style list. For the 5-year integrated degree: CLAT leads to the National Law Universities, while Tamil Nadu government law colleges (Chennai, Madurai, Coimbatore, Tirunelveli, Tiruchirappalli) admit through their own affordable, merit-based process. Private law colleges admit on 12th marks.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Shared action fragments — keeps the data DRY while staying per-career honest
// ─────────────────────────────────────────────────────────────────────────────

const documentsAction: NinetyDayAction = {
  title: 'Collect and digitise your certificates',
  titleTa: 'உங்கள் சான்றிதழ்களைச் சேகரித்து இணையப் பிரதி எடுக்கவும்',
  detail:
    '10th & 12th mark sheets, transfer certificate, community certificate, income certificate, Aadhaar, passport photos. Keep clear scans in one folder — every counselling portal asks for these.',
  priority: 'high',
};

// ─────────────────────────────────────────────────────────────────────────────
// THE PATHWAYS
// ─────────────────────────────────────────────────────────────────────────────

export const CAREER_PATHWAYS: CareerPathway[] = [
  // ─── SOFTWARE ENGINEER ─────────────────────────────────────────────────────
  {
    id: 'software-engineer',
    family: 'tech-software',
    isNiche: false,
    interestTags: ['tech', 'engineering'],
    aversionConflicts: ['sitting_long'],
    automation: 'ai_augmented',
    automationNote: 'AI tools handle more boilerplate every year, but the work of designing, debugging and shipping real systems still needs strong engineers — your specialisation matters more than ever.',
    title: 'Software Engineer',
    titleTa: 'மென்பொருள் பொறியியலாளர்',
    icon: '💻',
    color: 'from-blue-500 to-indigo-600',
    whatIsIt:
      'Design and build the apps, websites and systems people use every day — by writing and testing code.',
    eligibleStreams: ['pcm', 'pcmb'],
    strongGroupCodes: ['102', '101'],
    ugCourses: ['B.E / B.Tech CSE', 'B.E / B.Tech IT', 'B.Sc Computer Science', 'BCA'],
    entranceExams: ['TNEA', 'JEE Main'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'After 12th you join a 4-year B.E/B.Tech directly — that degree is the path. Working as a software engineer typically ~4 years from now.',
    skillWeights: {
      mathematics: 8,
      language: 5,
      science: 6,
      creativity: 7,
      people: 4,
      physical: 1,
      digital: 10,
    },
    priorityFit: {
      salary: 9,
      security: 6,
      balance: 6,
      abroad: 9,
      prestige: 7,
      passion: 7,
      growth: 9,
      hometown: 5,
    },
    competitiveBoardPct: { comfortable: 80, stretch: 70 },
    salaryReality: {
      startingLPA: '₹3.5–7 LPA at most TN colleges; ₹8–15 LPA at top-tier campuses',
      midCareerLPA: '₹12–30 LPA with 5–8 years and steady upskilling',
      note: 'Salaries vary hugely by college tier and personal skill. The degree opens the door; your actual coding ability decides the offer.',
    },
    demand: {
      score: 9,
      note: 'Consistently high demand, but entry-level competition is real — projects and internships matter more than marks.',
    },
    entryDifficulty: {
      score: 6,
      note: 'Getting a CSE seat is achievable across many TN colleges. Getting a GOOD first job is the competitive part.',
    },
    collegeTiers: [
      {
        label: 'Top government / Anna University campuses',
        examples: ['CEG Guindy', 'MIT Chrompet', 'GCT Coimbatore', 'TCE Madurai'],
        cutoffGuide: 'TNEA cutoff ~195–200 (OC). Aim for 95%+ in PCM.',
        feeRange: '₹15K–55K / year',
      },
      {
        label: 'Strong private / autonomous colleges',
        examples: ['PSG Tech', 'SSN', 'Kongu', 'Coimbatore Institute of Technology'],
        cutoffGuide: 'TNEA cutoff ~185–197 (OC).',
        feeRange: '₹50K–1.8L / year',
      },
      {
        label: 'Accessible private colleges',
        examples: ['Many TNEA-affiliated colleges across all districts'],
        cutoffGuide: 'TNEA cutoff ~150–185 (OC) — seats widely available.',
        feeRange: '₹40K–1.4L / year',
      },
    ],
    costReality:
      'A 4-year B.E in TN costs roughly ₹1L–8L total depending on college tier. Government colleges are dramatically cheaper. Fee waivers (first-graduate, 7.5% reservation, post-matric scholarships) can cut this significantly.',
    backupOptions: [
      'B.Sc Computer Science or BCA → MCA (cheaper, same destination)',
      'Diploma → lateral entry into B.E (second year)',
      'Government IT roles via TNPSC after a computer degree',
    ],
    honestCaveat:
      'A CSE degree alone does not guarantee a software job. Students who only attend classes and never build projects struggle. Students who code consistently from year 1 do well — regardless of their college’s name.',
    roadmap: [
      {
        title: 'Score well in 12th PCM board exams',
        titleTa: '12-ஆம் வகுப்பு PCM தேர்வில் நன்றாக மதிப்பெண் பெறவும்',
        detail: 'Your board % decides your TNEA cutoff. Maths and Physics carry the most weight.',
        window: 'Now → board exams',
        phase: 'now',
      },
      {
        title: 'Register for TNEA (and JEE Main if aiming higher)',
        titleTa: 'TNEA-வில் பதிவு செய்யவும்',
        detail:
          'TNEA is the main route for TN engineering. JEE Main is optional and only needed for NITs/IIITs outside the TN quota.',
        window: 'After board exams',
        phase: 'next',
      },
      {
        title: 'Attend TNEA counselling and lock a CSE/IT seat',
        titleTa: 'TNEA கலந்தாய்வில் கலந்துகொள்ளவும்',
        detail:
          'Use the cutoff calculator to build a realistic college preference list before counselling opens.',
        window: 'Counselling season',
        phase: 'next',
      },
      {
        title: 'Build real projects from semester 1',
        titleTa: 'முதல் செமஸ்டரிலிருந்தே திட்டப்பணிகளைச் செய்யவும்',
        detail:
          'A GitHub with 4–5 working projects beats a high CGPA in interviews. Start with small web apps.',
        window: 'Year 1–2 of college',
        phase: 'later',
      },
      {
        title: 'Do internships and apply widely in final year',
        titleTa: 'பயிற்சி மற்றும் வேலை விண்ணப்பங்கள்',
        detail: 'Campus placements + off-campus applications + open-source. Cast a wide net.',
        window: 'Year 3–4',
        phase: 'later',
      },
    ],
    ninetyDayPlan: [
      {
        title: 'Lock your board exam revision plan for Maths & Physics',
        titleTa: 'கணிதம் & இயற்பியல் திருப்புதல் திட்டத்தை உறுதி செய்யவும்',
        detail:
          'These two subjects move your TNEA cutoff the most. Solve previous-year papers under timed conditions.',
        priority: 'high',
        appRoute: '/career-assessment/colleges/pyq',
      },
      {
        title: 'Calculate your realistic TNEA cutoff',
        titleTa: 'உங்கள் TNEA கட்-ஆஃப்-ஐ கணக்கிடுங்கள்',
        detail:
          'Use the Cutoff Calculator with your expected marks to see which colleges are realistic — before counselling, not during.',
        priority: 'high',
        appRoute: '/career-assessment/colleges/educutoff',
      },
      documentsAction,
      {
        title: 'Try a free beginner coding course',
        titleTa: 'இலவச programming பாடத்தை முயற்சிக்கவும்',
        detail:
          'Spend 2–3 hours total trying Python or web basics. If you enjoy it, this path is right. If you hate it, better to know now.',
        priority: 'medium',
        link: 'https://www.youtube.com/results?search_query=python+for+beginners+tamil',
      },
      {
        title: 'Shortlist 10–15 engineering colleges',
        titleTa: '10–15 பொறியியல் கல்லூரிகளை தேர்வு செய்யவும்',
        detail: 'Mix of dream / realistic / safe colleges across districts you would actually move to.',
        priority: 'medium',
        appRoute: '/career-assessment/colleges/find-colleges',
      },
      {
        title: 'Check engineering scholarships you qualify for',
        titleTa: 'தகுதியான உதவித்தொகைகளைச் சரிபார்க்கவும்',
        detail: 'First-graduate, post-matric, and merit scholarships can cut fees substantially.',
        priority: 'low',
        appRoute: '/career-assessment/colleges/scholarships',
      },
    ],
    buildNowSkills: [
      {
        skill: 'Basic programming logic',
        why: 'Everything in this career builds on it. Starting now gives you a 6-month head start over classmates.',
        freeResource: 'freeCodeCamp / YouTube "Python for beginners" (Tamil tutorials available)',
      },
      {
        skill: 'English reading comfort',
        why: 'Almost all programming documentation and error messages are in English.',
        freeResource: 'Read tech blogs slowly; use a dictionary — fluency is not needed, comfort is.',
      },
      {
        skill: 'Typing speed',
        why: 'A small but real productivity multiplier for the next 40 years of your work.',
        freeResource: 'typingclub.com — 10 minutes a day',
      },
    ],
    lastReviewed: '2026-05',
  },

  // ─── DOCTOR (MBBS) ─────────────────────────────────────────────────────────
  {
    id: 'doctor-mbbs',
    family: 'healthcare-medical',
    isNiche: false,
    interestTags: ['healthcare', 'research'],
    aversionConflicts: ['patient_care', 'shift_work', 'high_competition'],
    automation: 'high_human_judgment',
    automationNote: 'AI helps doctors read scans, flag risks and draft notes — but the diagnosis, the call, and the conversation with the patient remain firmly human. One of the most automation-resilient careers.',
    title: 'Doctor (MBBS)',
    titleTa: 'மருத்துவர் (MBBS)',
    icon: '🩺',
    color: 'from-rose-500 to-red-600',
    whatIsIt:
      'Diagnose and treat patients. The MBBS route is long and demanding, but it is one of the most respected and secure careers in India.',
    eligibleStreams: ['pcb', 'pcmb'],
    strongGroupCodes: ['208', '103'],
    ugCourses: ['MBBS'],
    entranceExams: ['NEET-UG'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'After 12th you take NEET, then join MBBS directly. It is a long course: ~5.5 years to a basic doctor, more for specialisation.',
    skillWeights: {
      mathematics: 3,
      language: 6,
      science: 10,
      creativity: 3,
      people: 8,
      physical: 7,
      digital: 3,
    },
    priorityFit: {
      salary: 7,
      security: 9,
      balance: 3,
      abroad: 7,
      prestige: 10,
      passion: 8,
      growth: 6,
      hometown: 6,
    },
    competitiveBoardPct: { comfortable: 90, stretch: 85 },
    salaryReality: {
      startingLPA: '₹6–10 LPA as a junior doctor after MBBS; private practice varies widely',
      midCareerLPA: '₹15–40 LPA+ after MD/MS specialisation and experience',
      note: 'The big earnings come AFTER post-graduation (MD/MS). The MBBS years themselves are financially lean.',
    },
    demand: {
      score: 8,
      note: 'Healthcare demand is permanent. But the bottleneck is the NEET seat, not the job.',
    },
    entryDifficulty: {
      score: 9,
      note: 'NEET-UG is extremely competitive. Government MBBS seats need very high ranks; private seats are expensive.',
    },
    collegeTiers: [
      {
        label: 'Government medical colleges (TN)',
        examples: ['Madras Medical College', 'Stanley', 'Coimbatore MC', 'Madurai MC', 'Thanjavur MC'],
        cutoffGuide: 'Need a strong NEET rank — typically 600+/720 for TN govt seats (OC).',
        feeRange: '₹15K–50K / year — by far the most affordable route',
      },
      {
        label: 'Self-financing / private medical colleges',
        examples: ['Several private medical colleges across TN'],
        cutoffGuide: 'Lower NEET cutoff than government, but fees are very high.',
        feeRange: '₹6L–25L / year',
      },
      {
        label: 'Deemed universities',
        examples: ['Deemed medical universities (management/NRI quotas)'],
        cutoffGuide: 'Qualifying NEET score required; admission via management quota.',
        feeRange: '₹15L–30L+ / year',
      },
    ],
    costReality:
      'A government MBBS seat is one of the best-value education paths in India (₹1L–3L total). A private seat can cost ₹40L–1Cr+ for the full course. This single fact should shape how hard you prepare for NEET.',
    backupOptions: [
      'BDS (Dental), BAMS (Ayurveda), BHMS (Homeopathy) — also via NEET, lower cutoffs',
      'B.Sc Nursing → strong, secure healthcare career with a much lower entry bar',
      'B.Pharm / Pharm.D, Physiotherapy, BMLT (lab technology), Veterinary Science',
      'Re-attempt NEET with one focused drop year — common and accepted in medicine',
    ],
    honestCaveat:
      'NEET is a multi-year commitment for many students. Have a genuine backup (BDS, Nursing, Allied Health) decided in advance — it is not "failure", it is planning. Do not bet everything on one attempt with no plan B.',
    roadmap: [
      {
        title: 'Score 90%+ in 12th, especially Biology',
        titleTa: '12-ஆம் வகுப்பில் 90%+ — குறிப்பாக உயிரியல்',
        detail: 'Board marks and NEET prep reinforce each other. Biology is the highest-weight subject.',
        window: 'Now → board exams',
        phase: 'now',
      },
      {
        title: 'Take NEET-UG',
        titleTa: 'NEET-UG தேர்வு எழுதவும்',
        detail: 'NEET is the single gateway to MBBS, BDS, BAMS and most medical courses in India.',
        window: 'NEET exam date',
        phase: 'next',
      },
      {
        title: 'Attend medical counselling (state + AIQ)',
        titleTa: 'மருத்துவ கலந்தாய்வில் கலந்துகொள்ளவும்',
        detail:
          'Apply for both Tamil Nadu state quota and the 15% All India Quota. Know your rank-vs-college reality.',
        window: 'Counselling season',
        phase: 'next',
      },
      {
        title: 'Complete MBBS (4.5 years + 1 year internship)',
        titleTa: 'MBBS படிப்பை முடிக்கவும்',
        detail: 'A long, demanding course. Clinical postings begin in the later years.',
        window: '5.5 years',
        phase: 'later',
      },
      {
        title: 'Specialise via NEET-PG (MD / MS)',
        titleTa: 'NEET-PG மூலம் சிறப்புத் தேர்ச்சி பெறவும்',
        detail: 'Post-graduation is where most doctors specialise and where earnings rise significantly.',
        window: 'After MBBS',
        phase: 'later',
      },
    ],
    ninetyDayPlan: [
      {
        title: 'Build a daily Biology + Chemistry revision routine',
        titleTa: 'தினசரி உயிரியல் + வேதியியல் திருப்புதல்',
        detail:
          'NEET rewards consistency over months. Start a fixed daily slot now — even 2 focused hours compounds.',
        priority: 'high',
      },
      {
        title: 'Solve NEET previous-year question papers',
        titleTa: 'NEET முந்தைய ஆண்டு வினாத்தாள்களைத் தீர்க்கவும்',
        detail: 'PYQs reveal the real pattern and difficulty. Practising them is the highest-return activity.',
        priority: 'high',
        appRoute: '/career-assessment/colleges/pyq',
      },
      {
        title: 'Honestly decide your backup course',
        titleTa: 'உங்கள் மாற்று படிப்பை நேர்மையாக முடிவு செய்யவும்',
        detail:
          'Read about BDS, Nursing and Allied Health now. Going in with a clear plan B removes panic later.',
        priority: 'high',
        appRoute: '/career-assessment/colleges/course-explorer',
      },
      documentsAction,
      {
        title: 'Understand the NEET counselling + fee landscape',
        titleTa: 'NEET கலந்தாய்வு & கட்டண நிலையைப் புரிந்துகொள்ளவும்',
        detail:
          'Know the gap between government and private fees. It explains exactly why your rank matters so much.',
        priority: 'medium',
      },
      {
        title: 'Check medical-stream scholarships',
        titleTa: 'மருத்துவ உதவித்தொகைகளைச் சரிபார்க்கவும்',
        detail: 'Government MBBS + scholarships can make the entire course nearly free for eligible students.',
        priority: 'low',
        appRoute: '/career-assessment/colleges/scholarships',
      },
    ],
    buildNowSkills: [
      {
        skill: 'Long-form focus and study stamina',
        why: 'NEET and MBBS both reward sustained daily effort over years. Building the habit now is the real edge.',
        freeResource: 'Pomodoro technique — start with 25-minute focused blocks',
      },
      {
        skill: 'NCERT-level Biology mastery',
        why: 'NEET Biology is heavily NCERT-based. Deep familiarity with it is non-negotiable.',
        freeResource: 'NCERT textbooks + free YouTube NEET Biology channels',
      },
      {
        skill: 'Emotional resilience',
        why: 'This is a long path with setbacks. Knowing how to handle a low score without giving up matters.',
        freeResource: 'Talk to current medical students; understand the journey is normal',
      },
    ],
    lastReviewed: '2026-05',
  },

  // ─── CHARTERED ACCOUNTANT ──────────────────────────────────────────────────
  {
    id: 'chartered-accountant',
    family: 'commerce-ca-cma',
    isNiche: false,
    interestTags: ['finance'],
    aversionConflicts: ['paperwork', 'high_competition'],
    automation: 'ai_augmented',
    automationNote: 'Routine book-keeping, reconciliation and basic tax returns are automating fast. Audit judgment, advisory work and complex tax remain firmly human — specialise early.',
    title: 'Chartered Accountant (CA)',
    titleTa: 'பட்டயக் கணக்காளர் (CA)',
    icon: '📊',
    color: 'from-amber-500 to-orange-600',
    whatIsIt:
      'Audit, taxation and financial strategy for businesses. A professional qualification you can start right after 12th — no expensive degree needed.',
    eligibleStreams: ['commerce', 'pcm', 'arts'],
    strongGroupCodes: ['301', '302', '304', '308'],
    ugCourses: ['CA (via ICAI)', 'B.Com alongside CA', 'BBA alongside CA'],
    entranceExams: ['CA Foundation'],
    pathwayType: 'professional-track',
    timeToCareer:
      'After 12th you register with ICAI directly and begin the CA course. Qualifying as a CA realistically takes ~4-5 years of exams plus articleship.',
    skillWeights: {
      mathematics: 8,
      language: 6,
      science: 2,
      creativity: 3,
      people: 6,
      physical: 1,
      digital: 6,
    },
    priorityFit: {
      salary: 8,
      security: 8,
      balance: 5,
      abroad: 6,
      prestige: 9,
      passion: 6,
      growth: 8,
      hometown: 7,
    },
    competitiveBoardPct: { comfortable: 75, stretch: 60 },
    salaryReality: {
      startingLPA: '₹7–12 LPA as a fresh CA; ₹6–9 LPA in smaller firms',
      midCareerLPA: '₹15–40 LPA+ in industry, or independent practice income',
      note: 'The CA qualification itself is cheap. The "cost" is the years of disciplined study and articleship.',
    },
    demand: {
      score: 8,
      note: 'Every company needs financial compliance. Demand is steady and recession-resistant.',
    },
    entryDifficulty: {
      score: 8,
      note: 'CA exam pass rates are low at each level. It rewards discipline more than raw intelligence.',
    },
    collegeTiers: [
      {
        label: 'CA route (no college admission needed)',
        examples: ['Register directly with ICAI after 12th — study from anywhere'],
        cutoffGuide: 'No entrance cutoff. You must pass CA Foundation, Intermediate, Final.',
        feeRange: '₹70K–1.5L total for the full CA course — extraordinarily low cost',
      },
      {
        label: 'B.Com alongside CA (recommended safety net)',
        examples: ['Any UG arts & science college — Loyola, PSG CAS, government arts colleges'],
        cutoffGuide: 'B.Com admission is widely available; many do it in parallel with CA.',
        feeRange: '₹5K–60K / year',
      },
    ],
    costReality:
      'CA is the highest "return on fees" professional path in India — the full qualification costs under ₹1.5L. The real investment is 4–5 years of serious study and a 3-year articleship (which is paid, though modestly).',
    backupOptions: [
      'B.Com / BBA → M.Com / MBA — a solid finance career without the CA exams',
      'CMA (Cost Accountancy) or CS (Company Secretary) — sister qualifications',
      'Banking and government finance roles via competitive exams',
    ],
    honestCaveat:
      'Many students start CA and stop after one failed attempt. The qualification is valuable precisely because it is hard. Always run a B.Com in parallel so you finish with a degree no matter what.',
    roadmap: [
      {
        title: 'Finish 12th and register for CA Foundation',
        titleTa: '12-ஐ முடித்து CA Foundation-ல் பதிவு செய்யவும்',
        detail: 'You can register with ICAI right after 12th. Commerce students have a head start, but any stream is allowed.',
        window: 'Now → after board exams',
        phase: 'now',
      },
      {
        title: 'Clear CA Foundation, then enrol in B.Com too',
        titleTa: 'CA Foundation-ஐ முடித்து B.Com-லும் சேரவும்',
        detail: 'Doing B.Com in parallel gives you a degree as a safety net while you pursue CA.',
        window: 'Year 1',
        phase: 'next',
      },
      {
        title: 'Clear CA Intermediate and begin articleship',
        titleTa: 'CA Intermediate & பயிற்சிப் பணி',
        detail: 'Articleship is 3 years of paid, real-world training under a practising CA.',
        window: 'Years 2–4',
        phase: 'later',
      },
      {
        title: 'Clear CA Final and qualify',
        titleTa: 'CA Final-ஐ முடித்து தகுதி பெறவும்',
        detail: 'On passing CA Final and completing articleship, you become a Chartered Accountant.',
        window: 'Years 4–5',
        phase: 'later',
      },
    ],
    ninetyDayPlan: [
      {
        title: 'Read the official ICAI CA Foundation prospectus',
        titleTa: 'ICAI CA Foundation விவரக்குறிப்பைப் படிக்கவும்',
        detail: 'Understand the four papers, registration windows and exam structure directly from the source.',
        priority: 'high',
        link: 'https://www.icai.org',
      },
      {
        title: 'Strengthen Accountancy and Business Maths',
        titleTa: 'கணக்கியல் & வணிகக் கணிதத்தை வலுப்படுத்தவும்',
        detail: 'These map directly onto CA Foundation papers. Your 12th syllabus is the foundation — master it.',
        priority: 'high',
      },
      {
        title: 'Plan your parallel B.Com admission',
        titleTa: 'இணையான B.Com சேர்க்கையைத் திட்டமிடவும்',
        detail: 'Shortlist arts & science colleges offering B.Com so you can run it alongside CA.',
        priority: 'medium',
        appRoute: '/career-assessment/colleges/find-colleges',
      },
      documentsAction,
      {
        title: 'Talk to one practising CA or CA student',
        titleTa: 'ஒரு CA-விடம் பேசவும்',
        detail: 'A 20-minute honest conversation about the articleship years will tell you if this path fits you.',
        priority: 'low',
      },
    ],
    buildNowSkills: [
      {
        skill: 'Accountancy fundamentals',
        why: 'CA Foundation builds directly on 12th Accountancy. A strong base here saves a year of struggle later.',
        freeResource: 'Your 12th Accountancy textbook + free ICAI study material',
      },
      {
        skill: 'Self-discipline and routine',
        why: 'CA is mostly self-study. Students who can sit and study without supervision pass; others do not.',
        freeResource: 'Build a fixed daily study slot now and protect it',
      },
      {
        skill: 'Spreadsheet basics',
        why: 'Excel is the daily tool of every finance professional.',
        freeResource: 'Free "Excel basics" YouTube series',
      },
    ],
    lastReviewed: '2026-05',
  },

  // ─── MECHANICAL / CORE ENGINEER ────────────────────────────────────────────
  {
    id: 'mechanical-engineer',
    family: 'engineering-mechanical',
    isNiche: false,
    interestTags: ['engineering'],
    aversionConflicts: [],
    automation: 'physical_skilled',
    automationNote: 'Tools change — robotics, CAD, simulation — but the trade of designing and running real physical systems is slow to automate. Demand stays steady in manufacturing, energy and infrastructure.',
    title: 'Mechanical Engineer',
    titleTa: 'இயந்திரப் பொறியியலாளர்',
    icon: '⚙️',
    color: 'from-slate-500 to-zinc-700',
    whatIsIt:
      'Design, build and maintain machines, engines and manufacturing systems — the backbone of every physical industry.',
    eligibleStreams: ['pcm', 'pcmb'],
    strongGroupCodes: ['101', '102', '103'],
    ugCourses: ['B.E / B.Tech Mechanical', 'B.E Automobile', 'B.E Mechatronics', 'Diploma → B.E lateral entry'],
    entranceExams: ['TNEA', 'JEE Main'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'After 12th you join a 4-year B.E/B.Tech directly. Working as a mechanical engineer is typically ~4 years from now.',
    skillWeights: {
      mathematics: 8,
      language: 4,
      science: 9,
      creativity: 6,
      people: 4,
      physical: 5,
      digital: 5,
    },
    priorityFit: {
      salary: 6,
      security: 7,
      balance: 6,
      abroad: 6,
      prestige: 6,
      passion: 7,
      growth: 6,
      hometown: 7,
    },
    competitiveBoardPct: { comfortable: 70, stretch: 55 },
    salaryReality: {
      startingLPA: '₹2.5–5 LPA in core roles; higher if you move into software or management',
      midCareerLPA: '₹8–20 LPA with experience, especially in PSUs or specialised industries',
      note: 'Core mechanical starting salaries are modest. Many mechanical engineers later move into IT, management or government jobs.',
    },
    demand: {
      score: 6,
      note: 'Steady but not booming. Strongest in manufacturing hubs, PSUs and the growing EV sector.',
    },
    entryDifficulty: {
      score: 4,
      note: 'Mechanical seats are widely available across TN. The challenge is getting a well-paid core job.',
    },
    collegeTiers: [
      {
        label: 'Top government colleges',
        examples: ['CEG Guindy', 'GCT Coimbatore', 'MIT Chrompet', 'TCE Madurai'],
        cutoffGuide: 'TNEA cutoff ~185–197 (OC) — noticeably lower than CSE.',
        feeRange: '₹15K–55K / year',
      },
      {
        label: 'Private / autonomous colleges',
        examples: ['PSG Tech', 'Kongu', 'Bannari Amman', 'Coimbatore Institute of Technology'],
        cutoffGuide: 'TNEA cutoff ~150–190 (OC).',
        feeRange: '₹45K–1.5L / year',
      },
      {
        label: 'Accessible private colleges',
        examples: ['Widely available across all TN districts'],
        cutoffGuide: 'TNEA cutoff well below 170 — seats easy to get.',
        feeRange: '₹40K–1.2L / year',
      },
    ],
    costReality:
      'Similar to other B.E courses: ₹1L–6L total depending on tier. The diploma → lateral-entry route is a cheaper, very common path in TN.',
    backupOptions: [
      'Diploma in Mechanical → B.E lateral entry (saves a year and money)',
      'Government jobs: TNPSC, RRB, PSU recruitment all hire mechanical engineers',
      'Switch into IT/software (very common — a B.E in any branch is accepted)',
    ],
    honestCaveat:
      'If your real interest is software, do not choose mechanical "because the cutoff is lower" and then plan to switch — you will spend 4 years on the wrong subjects. Choose mechanical because you genuinely like machines and physical systems.',
    roadmap: [
      {
        title: 'Score well in 12th PCM',
        titleTa: '12-ஆம் வகுப்பு PCM-ல் நன்றாக மதிப்பெண் பெறவும்',
        detail: 'Physics and Maths are the core. Your board % sets your TNEA cutoff.',
        window: 'Now → board exams',
        phase: 'now',
      },
      {
        title: 'Register for TNEA',
        titleTa: 'TNEA-வில் பதிவு செய்யவும்',
        detail: 'TNEA is the main route. JEE Main only if you target NITs.',
        window: 'After board exams',
        phase: 'next',
      },
      {
        title: 'Counselling — lock a mechanical / core seat',
        titleTa: 'கலந்தாய்வில் இயந்திரப் பொறியியல் இடம் பெறவும்',
        detail: 'Build your preference list with the cutoff calculator first.',
        window: 'Counselling season',
        phase: 'next',
      },
      {
        title: 'Specialise: design, manufacturing, or EV/automation',
        titleTa: 'வடிவமைப்பு / உற்பத்தி / EV — சிறப்புத் தேர்வு',
        detail: 'Pick a focus area by year 2 and build skills (CAD, CAM, automation) around it.',
        window: 'Years 2–4',
        phase: 'later',
      },
      {
        title: 'Internships in manufacturing / PSU / placements',
        titleTa: 'பயிற்சி & வேலைவாய்ப்பு',
        detail: 'Core internships, PSU exams (GATE), and campus placements are all live options.',
        window: 'Years 3–4',
        phase: 'later',
      },
    ],
    ninetyDayPlan: [
      {
        title: 'Prioritise Physics and Maths board revision',
        titleTa: 'இயற்பியல் & கணித திருப்புதலுக்கு முன்னுரிமை',
        detail: 'These decide your TNEA cutoff. Timed previous-year practice is the fastest way to improve.',
        priority: 'high',
        appRoute: '/career-assessment/colleges/pyq',
      },
      {
        title: 'Calculate your TNEA cutoff and college range',
        titleTa: 'TNEA கட்-ஆஃப் & கல்லூரி வரம்பைக் கணக்கிடவும்',
        detail: 'See realistically which colleges and branches are in reach before counselling.',
        priority: 'high',
        appRoute: '/career-assessment/colleges/educutoff',
      },
      documentsAction,
      {
        title: 'Decide: do you genuinely like machines?',
        titleTa: 'இயந்திரங்கள் மீது உண்மையான ஆர்வம் உள்ளதா?',
        detail:
          'Watch a few "how engines / factories work" videos. Mechanical is a great fit IF the physical world excites you.',
        priority: 'medium',
      },
      {
        title: 'Compare mechanical vs other branches honestly',
        titleTa: 'இயந்திரப் பொறியியலை மற்ற பிரிவுகளுடன் ஒப்பிடவும்',
        detail: 'Use the Course Explorer to compare scope, fees and salary across engineering branches.',
        priority: 'low',
        appRoute: '/career-assessment/colleges/course-explorer',
      },
    ],
    buildNowSkills: [
      {
        skill: 'Strong Physics fundamentals',
        why: 'Mechanics, thermodynamics and materials all build directly on 12th Physics.',
        freeResource: 'NCERT Physics + free YouTube concept channels',
      },
      {
        skill: 'Basic CAD awareness',
        why: 'Design software is central to modern mechanical work — early familiarity helps.',
        freeResource: 'Free "intro to CAD" videos; some tools have free student versions',
      },
      {
        skill: 'Hands-on curiosity',
        why: 'The best mechanical engineers are people who like opening things up to see how they work.',
        freeResource: 'Repair / build / disassemble things around you',
      },
    ],
    lastReviewed: '2026-05',
  },
  // ─── NURSE / ALLIED HEALTH ─────────────────────────────────────────────────
  {
    id: 'nurse',
    family: 'healthcare-nursing',
    isNiche: false,
    interestTags: ['healthcare'],
    aversionConflicts: ['shift_work', 'patient_care'],
    automation: 'human_facing',
    automationNote: 'Care of another person is the work — the bedside, the conversation, the watchfulness. AI may handle records and monitors, but it does not replace the nurse.',
    title: 'Nurse (B.Sc Nursing)',
    titleTa: 'செவிலியர் (B.Sc Nursing)',
    icon: '🏥',
    color: 'from-teal-500 to-cyan-600',
    whatIsIt:
      'Frontline patient care in hospitals and communities. A secure, in-demand healthcare career with a far lower entry bar than MBBS — and strong opportunities abroad.',
    eligibleStreams: ['pcb', 'pcmb'],
    strongGroupCodes: ['204', '208'],
    ugCourses: ['B.Sc Nursing', 'GNM (diploma route)', 'B.Sc Allied Health Sciences'],
    entranceExams: ['None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'After 12th you join a 4-year B.Sc Nursing directly — that degree is the path. Working as a nurse is typically ~4 years from now.',
    skillWeights: {
      mathematics: 3,
      language: 6,
      science: 8,
      creativity: 3,
      people: 9,
      physical: 8,
      digital: 3,
    },
    priorityFit: {
      salary: 5,
      security: 9,
      balance: 4,
      abroad: 9,
      prestige: 6,
      passion: 8,
      growth: 7,
      hometown: 7,
    },
    competitiveBoardPct: { comfortable: 60, stretch: 50 },
    salaryReality: {
      startingLPA: '₹2.5–4.5 LPA in India; significantly higher abroad (Gulf, UK, etc.)',
      midCareerLPA: '₹6–12 LPA in India; abroad earnings can be multiples of this',
      note: 'Indian starting pay is modest, but nursing is one of the strongest paths to a well-paid career abroad.',
    },
    demand: {
      score: 9,
      note: 'Global nursing shortage. One of the most reliably employable healthcare degrees.',
    },
    entryDifficulty: {
      score: 3,
      note: 'B.Sc Nursing admission is widely accessible in TN — no national entrance bottleneck like NEET.',
    },
    collegeTiers: [
      {
        label: 'Government nursing colleges',
        examples: ['Government nursing colleges attached to medical colleges across TN'],
        cutoffGuide: 'Merit-based on 12th marks (PCB). Government seats are competitive but reachable.',
        feeRange: '₹10K–40K / year',
      },
      {
        label: 'Private nursing colleges',
        examples: ['Many private nursing colleges across all districts'],
        cutoffGuide: 'Admission widely available based on 12th PCB marks.',
        feeRange: '₹40K–1.2L / year',
      },
    ],
    costReality:
      'B.Sc Nursing is affordable compared with MBBS — ₹50K–5L total. For families who want a healthcare career without the NEET pressure or private-MBBS fees, it is an excellent value path.',
    backupOptions: [
      'GNM diploma → bridge to B.Sc Nursing later',
      'Allied health: BMLT (lab tech), B.Sc Radiology, Physiotherapy, B.Pharm',
      'Hospital administration after nursing experience',
    ],
    honestCaveat:
      'Nursing is physically and emotionally demanding — shift work, long hours, real human suffering. Choose it because you genuinely want to care for people, not only for the abroad opportunity. The students who thrive truly want this work.',
    roadmap: [
      {
        title: 'Score well in 12th PCB',
        titleTa: '12-ஆம் வகுப்பு PCB-ல் நன்றாக மதிப்பெண் பெறவும்',
        detail: 'Nursing admissions are merit-based on your 12th Biology/Chemistry/Physics marks.',
        window: 'Now → board exams',
        phase: 'now',
      },
      {
        title: 'Apply to B.Sc Nursing colleges',
        titleTa: 'B.Sc Nursing கல்லூரிகளுக்கு விண்ணப்பிக்கவும்',
        detail: 'Apply to both government and private colleges. Government seats are far cheaper.',
        window: 'After board exams',
        phase: 'next',
      },
      {
        title: 'Complete B.Sc Nursing (4 years incl. clinical training)',
        titleTa: 'B.Sc Nursing படிப்பை முடிக்கவும்',
        detail: 'Includes hospital postings from early years. Register with the Nursing Council on completion.',
        window: '4 years',
        phase: 'later',
      },
      {
        title: 'Work in India or pursue opportunities abroad',
        titleTa: 'இந்தியாவில் அல்லது வெளிநாட்டில் பணி',
        detail: 'After 1–2 years of experience, abroad pathways (Gulf, UK, etc.) open up significantly.',
        window: 'After graduation',
        phase: 'later',
      },
    ],
    ninetyDayPlan: [
      {
        title: 'Focus board revision on Biology and Chemistry',
        titleTa: 'உயிரியல் & வேதியியல் திருப்புதலில் கவனம்',
        detail: 'These marks directly determine your nursing college admission.',
        priority: 'high',
        appRoute: '/career-assessment/colleges/pyq',
      },
      {
        title: 'List government + private nursing colleges',
        titleTa: 'அரசு & தனியார் நர்சிங் கல்லூரிகளைப் பட்டியலிடவும்',
        detail: 'Government seats are much cheaper — apply to those first, with private as backup.',
        priority: 'high',
        appRoute: '/career-assessment/colleges/find-colleges',
      },
      documentsAction,
      {
        title: 'Spend a day understanding what nurses actually do',
        titleTa: 'செவிலியர்களின் வேலையைப் புரிந்துகொள்ளவும்',
        detail:
          'Talk to a working nurse if you can. The job is rewarding but demanding — go in with clear eyes.',
        priority: 'medium',
      },
      {
        title: 'Check nursing / healthcare scholarships',
        titleTa: 'நர்சிங் உதவித்தொகைகளைச் சரிபார்க்கவும்',
        detail: 'Several scholarships support healthcare students — they can make a government seat near-free.',
        priority: 'low',
        appRoute: '/career-assessment/colleges/scholarships',
      },
    ],
    buildNowSkills: [
      {
        skill: 'Biology comfort',
        why: 'Anatomy and physiology are the core of nursing study — a strong 12th Biology base helps enormously.',
        freeResource: 'NCERT Biology + free anatomy basics videos',
      },
      {
        skill: 'Communication and empathy',
        why: 'Nursing is people-work. Calmly explaining things and reassuring patients is a daily skill.',
        freeResource: 'Practise active listening; volunteer if you can',
      },
      {
        skill: 'Physical stamina',
        why: 'Long shifts on your feet are the reality. Building general fitness now helps.',
        freeResource: 'Regular walking / basic fitness routine',
      },
    ],
    lastReviewed: '2026-05',
  },

  // ─── LAWYER ────────────────────────────────────────────────────────────────
  {
    id: 'lawyer',
    family: 'law',
    isNiche: false,
    interestTags: ['law', 'govt'],
    aversionConflicts: ['memorisation', 'public_speaking', 'high_competition'],
    automation: 'high_human_judgment',
    automationNote: 'Document review and research are accelerating with AI tools, but arguing in court, drafting strategy and advising clients remain firmly human work. Litigators are particularly safe.',
    title: 'Lawyer / Advocate',
    titleTa: 'வழக்கறிஞர்',
    icon: '⚖️',
    color: 'from-stone-600 to-neutral-800',
    whatIsIt:
      'Advise clients, argue cases and work with the law — in courts, companies or government. Entered via a 5-year integrated law degree right after 12th.',
    eligibleStreams: ['arts', 'commerce', 'pcm', 'pcb', 'pcmb'],
    strongGroupCodes: ['304', '404', '305'],
    ugCourses: ['BA LLB (5-year integrated)', 'BBA LLB', 'B.Com LLB', 'LLB (after any degree)'],
    entranceExams: ['CLAT', 'CUET'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'After 12th you join a 5-year integrated law degree directly. Practising as a lawyer is typically ~5 years from now.',
    skillWeights: {
      mathematics: 3,
      language: 10,
      science: 2,
      creativity: 6,
      people: 9,
      physical: 2,
      digital: 4,
    },
    priorityFit: {
      salary: 7,
      security: 6,
      balance: 4,
      abroad: 5,
      prestige: 9,
      passion: 8,
      growth: 7,
      hometown: 7,
    },
    competitiveBoardPct: { comfortable: 70, stretch: 55 },
    salaryReality: {
      startingLPA: '₹3–6 LPA in most firms; ₹10–18 LPA at top firms for top-college graduates',
      midCareerLPA: '₹12–40 LPA+; independent practice income is highly variable',
      note: 'The first few years of litigation can be financially hard. Corporate law and top-college pedigree change the picture significantly.',
    },
    demand: {
      score: 7,
      note: 'Steady demand across litigation, corporate, and government. The legal field keeps expanding.',
    },
    entryDifficulty: {
      score: 6,
      note: 'CLAT for national law universities is competitive; state and private law colleges are far more accessible.',
    },
    collegeTiers: [
      {
        label: 'National Law Universities (via CLAT)',
        examples: ['NLUs across India — admission through CLAT'],
        cutoffGuide: 'Strong CLAT rank required. The most competitive law-entry route.',
        feeRange: '₹2L–3L / year',
      },
      {
        label: 'Government & strong private law colleges (TN)',
        examples: ['Government law colleges in TN', 'Reputed private law schools'],
        cutoffGuide: 'Government law colleges via 12th merit / state process — affordable and respected.',
        feeRange: '₹10K–1.5L / year',
      },
      {
        label: 'Private law colleges',
        examples: ['Private BA LLB programmes across TN'],
        cutoffGuide: 'Widely accessible based on 12th marks.',
        feeRange: '₹60K–2L / year',
      },
    ],
    costReality:
      'A 5-year integrated law degree costs ₹1L–15L total depending on tier. Government law colleges in TN are excellent value. Litigation income is slow to start, so a low-debt degree is wise.',
    backupOptions: [
      'LLB after a regular degree (3-year route) if the 5-year integrated path is missed',
      'Company secretary (CS) — law-adjacent, exam-based',
      'Use a BA / B.Com base for civil services or other careers',
    ],
    honestCaveat:
      'Litigation rewards patience — the early years are slow and modestly paid. Corporate law pays better sooner but is competitive. Be honest about whether you can sustain the lean start, and choose a low-cost college accordingly.',
    roadmap: [
      {
        title: 'Finish 12th — any stream qualifies for law',
        titleTa: '12-ஐ முடிக்கவும் — எந்த பிரிவும் சட்டத்திற்கு தகுதி',
        detail: 'Law is open to all streams. Strong language and reasoning skills matter more than your group.',
        window: 'Now → board exams',
        phase: 'now',
      },
      {
        title: 'Take CLAT (and/or apply to state law colleges)',
        titleTa: 'CLAT எழுதவும் / மாநில சட்டக் கல்லூரிகளுக்கு விண்ணப்பிக்கவும்',
        detail: 'CLAT for NLUs; TN government law colleges have their own merit-based process.',
        window: 'After board exams',
        phase: 'next',
      },
      {
        title: 'Complete the 5-year integrated law degree',
        titleTa: '5-ஆண்டு ஒருங்கிணைந்த சட்டப் பட்டம்',
        detail: 'Internships during college years are critical — they decide your early career options.',
        window: '5 years',
        phase: 'later',
      },
      {
        title: 'Enrol with the Bar Council and begin practice',
        titleTa: 'பார் கவுன்சிலில் பதிவு செய்து பயிற்சி தொடங்கவும்',
        detail: 'Choose a track: litigation, corporate, judiciary exams, or legal services.',
        window: 'After graduation',
        phase: 'later',
      },
    ],
    ninetyDayPlan: [
      {
        title: 'Start reading editorials and improving English',
        titleTa: 'தலையங்கங்களைப் படித்து ஆங்கிலத்தை மேம்படுத்தவும்',
        detail: 'CLAT and law itself are language-heavy. Daily reading is the highest-return preparation.',
        priority: 'high',
      },
      {
        title: 'Understand the CLAT exam pattern',
        titleTa: 'CLAT தேர்வு முறையைப் புரிந்துகொள்ளவும்',
        detail: 'Legal reasoning, logical reasoning, English, GK, maths. Know what you are preparing for.',
        priority: 'high',
      },
      {
        title: 'List TN government + private law colleges',
        titleTa: 'TN அரசு & தனியார் சட்டக் கல்லூரிகளைப் பட்டியலிடவும்',
        detail: 'Government law colleges are affordable and well-regarded — apply there alongside CLAT.',
        priority: 'medium',
        appRoute: '/career-assessment/colleges/find-colleges',
      },
      documentsAction,
      {
        title: 'Talk to a practising lawyer about the early years',
        titleTa: 'ஒரு வழக்கறிஞரிடம் பேசவும்',
        detail: 'An honest conversation about the first 3 years of practice will tell you if you can sustain it.',
        priority: 'low',
      },
    ],
    buildNowSkills: [
      {
        skill: 'Advanced reading and comprehension',
        why: 'Law is a profession of reading dense text closely and fast. This is the core skill.',
        freeResource: 'Daily editorial reading + summarising in your own words',
      },
      {
        skill: 'Logical reasoning',
        why: 'CLAT and legal argument both test structured reasoning.',
        freeResource: 'Free logical-reasoning practice sets online',
      },
      {
        skill: 'Confident speaking',
        why: 'Arguing, advising and negotiating are daily work — public speaking comfort matters.',
        freeResource: 'Join debates / speak up in class / practise aloud',
      },
    ],
    lastReviewed: '2026-05',
  },

  // ─── DATA SCIENTIST / ANALYST ──────────────────────────────────────────────
  {
    id: 'data-scientist',
    family: 'tech-data',
    isNiche: false,
    interestTags: ['tech', 'research'],
    aversionConflicts: ['sitting_long', 'maths_heavy'],
    automation: 'ai_augmented',
    automationNote: 'The toolset is changing fastest of any field — AI now writes much of the code and tunes many of the models. The work that endures is asking the right questions and judging whether the model can be trusted.',
    title: 'Data Scientist / Analyst',
    titleTa: 'தரவு அறிவியலாளர்',
    icon: '📈',
    color: 'from-violet-500 to-purple-600',
    whatIsIt:
      'Turn data into decisions — find patterns, build models and answer business questions with statistics and code.',
    eligibleStreams: ['pcm', 'pcmb', 'commerce'],
    strongGroupCodes: ['101', '102', '301', '302'],
    ugCourses: [
      'B.Tech CSE / AI & Data Science',
      'B.Sc Statistics / Maths',
      'B.Sc Data Science',
      'B.Com with analytics',
    ],
    entranceExams: ['TNEA', 'JEE Main', 'CUET'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'After 12th you join a relevant UG degree (B.Tech / B.Sc) directly, building data skills alongside. Working in the field is typically ~4 years from now.',
    skillWeights: {
      mathematics: 10,
      language: 5,
      science: 6,
      creativity: 6,
      people: 5,
      physical: 1,
      digital: 9,
    },
    priorityFit: {
      salary: 9,
      security: 6,
      balance: 6,
      abroad: 8,
      prestige: 7,
      passion: 7,
      growth: 9,
      hometown: 5,
    },
    competitiveBoardPct: { comfortable: 80, stretch: 70 },
    salaryReality: {
      startingLPA: '₹4–9 LPA for entry analysts; higher with strong skills and a good college',
      midCareerLPA: '₹15–35 LPA+ for experienced data scientists',
      note: 'This is a skills-first field. Certifications and a portfolio of real analysis projects matter as much as the degree.',
    },
    demand: {
      score: 9,
      note: 'Very high and growing demand across every industry — but you must actually build the skills, not just hold the degree.',
    },
    entryDifficulty: {
      score: 6,
      note: 'Many degree routes lead here. The competitive part is proving you can actually analyse data.',
    },
    collegeTiers: [
      {
        label: 'Top colleges with CSE / Data Science / Statistics',
        examples: ['CEG Guindy', 'PSG Tech', 'Loyola (Statistics)', 'reputed B.Sc Statistics programmes'],
        cutoffGuide: 'TNEA ~190–200 for engineering routes; strong 12th marks for B.Sc Statistics.',
        feeRange: '₹15K–1.8L / year',
      },
      {
        label: 'Accessible B.Sc Statistics / Maths / Data Science',
        examples: ['Many arts & science colleges offer B.Sc Statistics or Data Science'],
        cutoffGuide: 'Merit-based on 12th marks — widely available, affordable.',
        feeRange: '₹5K–60K / year',
      },
    ],
    costReality:
      'The cheapest route is a B.Sc in Statistics or Maths (₹15K–2L total) plus free online data-science learning. You do NOT need an expensive degree to enter this field — you need demonstrable skills.',
    backupOptions: [
      'Business analyst / MIS roles (lower bar, same direction)',
      'Software engineering (overlapping skill set)',
      'Actuarial science if you love probability and statistics',
    ],
    honestCaveat:
      'A "Data Science" degree name does not make you a data scientist. Employers test for real ability — SQL, statistics, a project portfolio. Treat the degree as the start, not the finish.',
    roadmap: [
      {
        title: 'Score well in 12th — Maths is essential',
        titleTa: '12-ஆம் வகுப்பில் நன்றாக — கணிதம் அவசியம்',
        detail: 'Strong Maths is the foundation of everything in data science.',
        window: 'Now → board exams',
        phase: 'now',
      },
      {
        title: 'Choose your route: B.Tech or B.Sc Statistics/DS',
        titleTa: 'B.Tech அல்லது B.Sc Statistics/DS — வழியைத் தேர்வு செய்யவும்',
        detail: 'Both work. B.Sc Statistics is far cheaper and equally valid if you self-learn coding.',
        window: 'After board exams',
        phase: 'next',
      },
      {
        title: 'Learn Python, SQL and statistics alongside your degree',
        titleTa: 'பட்டப்படிப்புடன் Python, SQL, புள்ளியியல் கற்கவும்',
        detail: 'Free online resources cover everything. Consistency beats intensity here.',
        window: 'College years 1–3',
        phase: 'later',
      },
      {
        title: 'Build a project portfolio and apply for analyst roles',
        titleTa: 'திட்டப் போர்ட்ஃபோலியோ உருவாக்கி விண்ணப்பிக்கவும்',
        detail: '3–4 real analysis projects on public datasets will get you interviews.',
        window: 'College years 3–4',
        phase: 'later',
      },
    ],
    ninetyDayPlan: [
      {
        title: 'Make Maths your top board-revision priority',
        titleTa: 'கணிதத்திற்கு திருப்புதலில் முன்னுரிமை',
        detail: 'It is the foundation of this entire field. Timed previous-year practice works best.',
        priority: 'high',
        appRoute: '/career-assessment/colleges/pyq',
      },
      {
        title: 'Try a free "intro to data" lesson',
        titleTa: 'இலவச "intro to data" பாடத்தை முயற்சிக்கவும்',
        detail:
          'Spend 2 hours with a beginner data/statistics video. It will tell you quickly if this excites you.',
        priority: 'high',
        link: 'https://www.youtube.com/results?search_query=data+science+for+beginners',
      },
      {
        title: 'Compare B.Tech vs B.Sc Statistics routes',
        titleTa: 'B.Tech vs B.Sc Statistics — ஒப்பிடவும்',
        detail: 'Use the Course Explorer to weigh cost, scope and outcomes for each route.',
        priority: 'medium',
        appRoute: '/career-assessment/colleges/course-explorer',
      },
      documentsAction,
      {
        title: 'Shortlist colleges for your chosen route',
        titleTa: 'தேர்ந்தெடுத்த வழிக்கான கல்லூரிகளைப் பட்டியலிடவும்',
        detail: 'Whether engineering or B.Sc, build a realistic mixed list.',
        priority: 'low',
        appRoute: '/career-assessment/colleges/find-colleges',
      },
    ],
    buildNowSkills: [
      {
        skill: 'Strong mathematics, especially statistics',
        why: 'Probability and statistics are the literal substance of the job.',
        freeResource: 'NCERT Maths + free "statistics basics" courses',
      },
      {
        skill: 'Python programming',
        why: 'Python is the dominant tool in data science. Starting now is a major head start.',
        freeResource: 'freeCodeCamp / Kaggle Learn — both free',
      },
      {
        skill: 'Spreadsheet and SQL thinking',
        why: 'Most real data work starts in spreadsheets and databases.',
        freeResource: 'Free Excel + SQL beginner tutorials',
      },
    ],
    lastReviewed: '2026-05',
  },
  // ─── PHARMACIST ────────────────────────────────────────────────────────────
  {
    id: 'pharmacist',
    family: 'healthcare-pharma',
    isNiche: false,
    interestTags: ['healthcare', 'research'],
    aversionConflicts: ['lab_practical'],
    automation: 'ai_augmented',
    automationNote: 'Dispensing is steadily automating in larger pharmacies, but clinical pharmacy — counselling patients, checking interactions, hospital pharmacy roles — is growing. Specialise toward clinical work.',
    title: 'Pharmacist (B.Pharm / Pharm.D)',
    titleTa: 'மருந்தாளர்',
    icon: '💊',
    color: 'from-cyan-500 to-blue-600',
    whatIsIt:
      'Work with medicines — in pharmacies, hospitals, the pharma industry, or drug research. A stable healthcare career without the NEET-MBBS bottleneck.',
    eligibleStreams: ['pcb', 'pcm', 'pcmb'],
    strongGroupCodes: ['208', '203', '104'],
    ugCourses: ['B.Pharm', 'Pharm.D', 'D.Pharm (diploma route)'],
    entranceExams: ['None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'After 12th you join B.Pharm (4 years) or Pharm.D (6 years) directly — that degree is the path.',
    skillWeights: {
      mathematics: 4,
      language: 5,
      science: 9,
      creativity: 3,
      people: 6,
      physical: 4,
      digital: 4,
    },
    priorityFit: {
      salary: 6,
      security: 7,
      balance: 7,
      abroad: 7,
      prestige: 6,
      passion: 6,
      growth: 6,
      hometown: 7,
    },
    competitiveBoardPct: { comfortable: 65, stretch: 50 },
    salaryReality: {
      startingLPA: '₹2.5–5 LPA in retail/hospital pharmacy; higher in the pharma industry',
      midCareerLPA: '₹6–15 LPA in industry roles (production, QA, regulatory affairs)',
      note: 'Retail pharmacy pay is modest; the pharmaceutical industry and abroad opportunities pay considerably better.',
    },
    demand: {
      score: 7,
      note: 'Steady demand — every hospital, pharmacy and pharma company needs pharmacists.',
    },
    entryDifficulty: {
      score: 3,
      note: 'B.Pharm admission is widely available in TN based on 12th marks — no national entrance bottleneck.',
    },
    collegeTiers: [
      {
        label: 'Government / aided pharmacy colleges',
        examples: ['Government pharmacy colleges attached to medical colleges in TN'],
        cutoffGuide: 'Merit-based on 12th PCB/PCM marks. Government seats are affordable and competitive.',
        feeRange: '₹15K–50K / year',
      },
      {
        label: 'Private pharmacy colleges',
        examples: ['Many private B.Pharm / Pharm.D colleges across TN'],
        cutoffGuide: 'Admission widely available on 12th marks.',
        feeRange: '₹40K–1.2L / year',
      },
    ],
    costReality:
      'B.Pharm costs roughly ₹1L–5L total; Pharm.D is longer (6 years) and costs more. A solid-value healthcare path, especially via government colleges.',
    backupOptions: [
      'D.Pharm diploma → B.Pharm later (cheaper, faster start)',
      'Other allied health: BMLT, B.Sc Nursing, B.Sc Biotechnology',
      'Pharma industry roles (sales, QA, regulatory) after the degree',
    ],
    honestCaveat:
      'Retail pharmacy alone does not pay well. The better-paid paths are the pharmaceutical industry and abroad — plan from the start to move toward industry roles or higher study, not just a medical-shop counter.',
    roadmap: [
      {
        title: 'Score well in 12th science (PCB or PCM)',
        titleTa: '12-ஆம் வகுப்பு அறிவியலில் நன்றாக மதிப்பெண் பெறவும்',
        detail: 'Chemistry and Biology are central. Admissions are merit-based on these marks.',
        window: 'Now → board exams',
        phase: 'now',
      },
      {
        title: 'Apply to B.Pharm / Pharm.D colleges',
        titleTa: 'B.Pharm / Pharm.D கல்லூரிகளுக்கு விண்ணப்பிக்கவும்',
        detail: 'Government colleges first (affordable), private as backup. No national entrance needed.',
        window: 'After board exams',
        phase: 'next',
      },
      {
        title: 'Complete the degree and register as a pharmacist',
        titleTa: 'பட்டப்படிப்பை முடித்து மருந்தாளராகப் பதிவு செய்யவும்',
        detail: 'B.Pharm is 4 years; Pharm.D is 6. Registration with the Pharmacy Council follows.',
        window: '4–6 years',
        phase: 'later',
      },
      {
        title: 'Choose a track: industry, hospital, or higher study',
        titleTa: 'தொழில் / மருத்துவமனை / உயர் படிப்பு — வழியைத் தேர்வு செய்யவும்',
        detail: 'Industry roles (QA, production, regulatory) and M.Pharm open the better-paid doors.',
        window: 'After graduation',
        phase: 'later',
      },
    ],
    ninetyDayPlan: [
      {
        title: 'Focus board revision on Chemistry and Biology',
        titleTa: 'வேதியியல் & உயிரியல் திருப்புதலில் கவனம்',
        detail: 'These marks determine your pharmacy college admission directly.',
        priority: 'high',
        appRoute: '/career-assessment/colleges/pyq',
      },
      {
        title: 'List government and private pharmacy colleges',
        titleTa: 'அரசு & தனியார் மருந்தியல் கல்லூரிகளைப் பட்டியலிடவும்',
        detail: 'Government seats are far cheaper — apply there first, private as backup.',
        priority: 'high',
        appRoute: '/career-assessment/colleges/find-colleges',
      },
      {
        title: 'Decide B.Pharm vs Pharm.D',
        titleTa: 'B.Pharm vs Pharm.D — முடிவு செய்யவும்',
        detail: 'Pharm.D is longer and more clinical; B.Pharm is shorter and industry-oriented. Compare both.',
        priority: 'medium',
        appRoute: '/career-assessment/colleges/course-explorer',
      },
      documentsAction,
      {
        title: 'Check healthcare-stream scholarships',
        titleTa: 'சுகாதாரப் பிரிவு உதவித்தொகைகளைச் சரிபார்க்கவும்',
        detail: 'Scholarships can substantially reduce pharmacy college fees for eligible students.',
        priority: 'low',
        appRoute: '/career-assessment/colleges/scholarships',
      },
    ],
    buildNowSkills: [
      {
        skill: 'Strong Chemistry',
        why: 'Pharmaceutical chemistry is the heart of the degree — a strong 12th base is a real advantage.',
        freeResource: 'NCERT Chemistry + free concept videos',
      },
      {
        skill: 'Attention to detail',
        why: 'Dosages and drug interactions leave no room for carelessness — precision is a core habit.',
        freeResource: 'Practise careful, accurate work in everything you do',
      },
      {
        skill: 'Biology fundamentals',
        why: 'Understanding how drugs act on the body builds on 12th Biology.',
        freeResource: 'NCERT Biology — human physiology chapters especially',
      },
    ],
    lastReviewed: '2026-05',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── DRAFT BATCH (May 2026) — pending counsellor review ───────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  // The five entries below are AI-generated drafts. Their TN-specific
  // quantitative fields (cutoff guidance, fee ranges, salary ranges, college
  // examples, demand notes) need to be audited by a counsellor before being
  // treated as authoritative. The needsCounsellorReview flag is honoured by
  // the UI, which shows a clear "AI estimate, pending review" banner on the
  // detail card. Once a career is reviewed, flip its flag to false (or
  // remove it) and the banner disappears for that career.

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── B.COM FAMILY (split from 'bcom-graduate' umbrella, May 2026) ─────────
  // ═══════════════════════════════════════════════════════════════════════════
  // The original bcom-graduate umbrella was split into 5 distinct cards so a
  // student sees the specific degree they would actually pursue rather than
  // an institutional category. Track-specific differences focus on aversions,
  // salary expectations, and the specialised second-step (CA, banking, etc.).

  // ─── B.COM (GENERAL) ───────────────────────────────────────────────────────
  {
    id: 'bcom-general',
    family: 'commerce-bcom',
    isNiche: false,
    interestTags: ['finance'],
    needsCounsellorReview: true,
    aversionConflicts: ['paperwork'],
    automation: 'ai_augmented',
    automationNote: 'Routine book-keeping is automating fast, but the broader B.Com path opens into audit support, GST practice, banking, government exams and further professional study (CA, CMA, MBA) — many of which remain firmly human.',
    title: 'B.Com (General)',
    titleTa: 'பி.காம் (பொது)',
    icon: '📊',
    color: 'from-emerald-500 to-teal-600',
    whatIsIt:
      'A three-year core commerce degree covering accounting, corporate law, taxation, business economics and financial management. The broadest B.Com track — feeds into CA, CMA, MBA, banking exams, GST practice and entry corporate finance roles.',
    eligibleStreams: ['commerce'],
    strongGroupCodes: ['301', '302', '304', '308'],
    ugCourses: ['B.Com (General)', 'B.Com (Hons.)'],
    entranceExams: ['None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'A 3-year direct-admission degree. Entry roles open at graduation; stronger careers usually come after a further qualification (M.Com, MBA, CA inter, CMA).',
    skillWeights: { mathematics: 7, language: 7, science: 2, creativity: 4, people: 6, physical: 1, digital: 6 },
    priorityFit: { salary: 6, security: 7, balance: 7, abroad: 6, prestige: 5, passion: 5, growth: 7, hometown: 8 },
    competitiveBoardPct: { comfortable: 70, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2–4 LPA fresh; more with skills (Tally, Excel, GST) or further qualifications.',
      midCareerLPA: 'AI estimate — ₹6–15 LPA after 5+ years, especially with M.Com / MBA / CA / ACCA add-ons.',
      note: 'A B.Com General alone rarely commands a high salary; the leverage comes from layering qualifications or skills (GST practice, audit, financial analysis) on top.',
    },
    demand: { score: 7, note: 'AI estimate — steady demand from finance teams, tax practices, banks. Bottom-of-the-funnel work is being automated; specialisation pays off.' },
    entryDifficulty: { score: 3, note: 'Direct admission, seats widely available. Top autonomous colleges are mildly competitive.' },
    collegeTiers: [
      { label: 'Top autonomous / aided colleges (AI estimate)', examples: ['Loyola College Chennai', 'Madras Christian College', 'PSG College of Arts & Science'], cutoffGuide: 'AI estimate — 80%+ at top tier; direct admission.', feeRange: 'AI estimate — ₹15K–60K / year' },
      { label: 'Strong city colleges (AI estimate)', examples: ['Stella Maris (Women)', 'Ethiraj (Women)', 'D.G. Vaishnav'], cutoffGuide: 'AI estimate — 70–80% typical for direct admission.', feeRange: 'AI estimate — ₹15K–80K / year' },
      { label: 'Government / aided district colleges (AI estimate)', examples: ['Government Arts Colleges across districts'], cutoffGuide: 'AI estimate — wide access, cut-off as low as 60%.', feeRange: 'AI estimate — ₹2K–25K / year' },
    ],
    costReality: 'AI estimate — a 3-year B.Com General in TN costs roughly ₹10K–2L total depending on college. The bigger cost is what you do AFTER the degree.',
    backupOptions: ['CA / CMA registered alongside B.Com', 'ACCA — international qualification, doable during B.Com', 'MBA after 2-3 years of work experience', 'Banking exams (IBPS, SBI PO)'],
    honestCaveat: 'A B.Com General on its own without further study or applied skills genuinely struggles in the TN job market. Plan from day one to add at least one of: M.Com, MBA, CA inter, CMA, ACCA, or strong applied skills (advanced Excel, Tally, GST). The degree is a foundation, not a destination.',
    roadmap: [
      { title: 'Pass 12th Commerce with 70%+', titleTa: '+12-இல் 70%+', detail: 'Direct admission; marks matter for top colleges but not for a seat somewhere.', window: 'Now', phase: 'now' },
      { title: 'Join B.Com General (3 years) + applied skills', titleTa: 'பி.காம் + பயன்பாட்டுத் திறன்கள்', detail: 'Pick an autonomous syllabus where possible. Add Tally, Excel, GST practice on the side from semester 1.', window: 'Years 1–3', phase: 'next' },
      { title: 'Specialise — CA Inter, CMA, M.Com, MBA, or ACCA', titleTa: 'CA / CMA / எம்.காம் / MBA', detail: 'B.Com General alone rarely lands strong roles. Stack one qualification on top while you study or after.', window: 'Years 3–5', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Confirm autonomous vs affiliated syllabus', titleTa: 'பாடத்திட்டத்தை உறுதிசெய்', detail: 'Autonomous colleges often update content faster (GST, fintech, IFRS). Worth choosing for the same fee.', priority: 'high' },
      { title: 'Open a free Tally and Excel account', titleTa: 'டாலி + எக்செல் கற்க தொடங்கவும்', detail: 'Tally is the most-asked tool in TN commerce interviews. Free YouTube courses are enough. Start week 1.', priority: 'high' },
      { title: 'Decide on CA / CMA / ACCA early', titleTa: 'CA / CMA / ACCA முடிவு', detail: 'These run in parallel with B.Com. Start the foundation in Year 1 if serious.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Advanced Excel', why: 'The #1 skill TN commerce graduates lack and the #1 skill that lifts your starting salary.', freeResource: 'Microsoft Excel free YouTube courses (Leila Gharani, ExcelIsFun)' },
      { skill: 'Tally Prime', why: 'Standard accounting software across small and mid-size TN businesses. Knowing it makes you instantly hireable for entry roles.', freeResource: 'Tally Education free courses, YouTube' },
      { skill: 'Spoken English & business writing', why: 'A B.Com candidate who can write a clear email and present confidently stands out immediately.', freeResource: 'BBC Learning English, free MOOCs' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.COM (COMPUTER APPLICATIONS) / B.COM CA ──────────────────────────────
  {
    id: 'bcom-computer-applications',
    family: 'commerce-bcom',
    isNiche: false,
    interestTags: ['finance', 'tech'],
    needsCounsellorReview: true,
    aversionConflicts: ['sitting_long'],
    automation: 'ai_augmented',
    automationNote: 'The tech-adjacent B.Com path benefits most directly from AI tools — automation that displaces traditional accounting jobs actually upgrades the role of graduates who already know Tally, e-commerce platforms and basic databases.',
    title: 'B.Com (Computer Applications)',
    titleTa: 'பி.காம் (கணினி பயன்பாடுகள்)',
    icon: '💻',
    color: 'from-blue-500 to-indigo-600',
    whatIsIt:
      'A three-year commerce degree integrating software — Tally, advanced Excel, e-commerce platforms, basic databases (SQL), accounting software, business analytics tools. Strongest landing pad for FinTech ops, corporate accounting tech, e-commerce roles and digital audit support.',
    eligibleStreams: ['commerce', 'pcm'],
    strongGroupCodes: ['301', '302', '304', '308'],
    ugCourses: ['B.Com (Computer Applications)', 'B.Com (CA)', 'B.Com (Information Systems)'],
    entranceExams: ['None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'A 3-year direct-admission degree. Entry corporate accounting-tech and e-commerce roles open at graduation; further specialisation (data analytics, fintech) typically follows.',
    skillWeights: { mathematics: 7, language: 6, science: 2, creativity: 5, people: 5, physical: 1, digital: 8 },
    priorityFit: { salary: 7, security: 6, balance: 7, abroad: 7, prestige: 6, passion: 6, growth: 8, hometown: 7 },
    competitiveBoardPct: { comfortable: 70, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2.5–5 LPA fresh; tech-adjacent commerce roles pay slightly above B.Com General.',
      midCareerLPA: 'AI estimate — ₹7–18 LPA with 5+ years, especially with data analytics or fintech specialisations layered on top.',
      note: 'The tech-adjacent track typically out-earns B.Com General because graduates can pivot into fintech ops, e-commerce, and corporate accounting tech roles unavailable to General graduates.',
    },
    demand: { score: 8, note: 'AI estimate — strong demand from e-commerce companies, fintech, GST consultants, corporate accounting teams that need staff comfortable with both finance and software.' },
    entryDifficulty: { score: 3, note: 'Direct admission. Fewer colleges offer this specific track than General, but seats are widely available.' },
    collegeTiers: [
      { label: 'Top autonomous colleges (AI estimate)', examples: ['Loyola College Chennai', 'Madras Christian College', 'PSG College of Arts & Science', 'D.G. Vaishnav'], cutoffGuide: 'AI estimate — 75%+ in 12th typical at top tier.', feeRange: 'AI estimate — ₹25K–80K / year' },
      { label: 'Strong city colleges (AI estimate)', examples: ['Bishop Heber Trichy', 'PSGR Krishnammal', 'SRM Easwari'], cutoffGuide: 'AI estimate — 65–75% range; direct admission.', feeRange: 'AI estimate — ₹30K–1L / year' },
      { label: 'Accessible colleges (AI estimate)', examples: ['Many TN private colleges with B.Com CA'], cutoffGuide: 'AI estimate — 60%+; wide access.', feeRange: 'AI estimate — ₹20K–80K / year' },
    ],
    costReality: 'AI estimate — a 3-year B.Com CA in TN costs roughly ₹15K–2.5L total. Computer-lab-heavy programs at private colleges trend slightly higher than General.',
    backupOptions: ['MCA after B.Com CA — pivot into pure tech', 'Data Analytics / Power BI certifications + finance roles', 'MBA Systems / Analytics specialisation', 'Fintech / e-commerce operations roles'],
    honestCaveat: 'B.Com CA is genuinely useful only if you actually engage with the tech side — students who treat the computer applications as an afterthought end up as ordinary B.Com graduates with one extra subject. Build real software fluency during the 3 years.',
    roadmap: [
      { title: 'Pass 12th with 70%+', titleTa: '+12 70%+', detail: 'Direct admission for most. PCM students can also enter — Maths background helps.', window: 'Now', phase: 'now' },
      { title: 'Join B.Com CA + active software practice', titleTa: 'B.Com CA + நிரலாக்க பயிற்சி', detail: 'Tally + Excel + SQL + one analytics tool (Power BI / Tableau) by graduation. The tech is the point of this track.', window: 'Years 1–3', phase: 'next' },
      { title: 'Specialise — analytics, MCA, fintech ops', titleTa: 'பகுப்பாய்வு / MCA / ஃபின்டெக்', detail: 'The strongest BCom CA careers combine commerce knowledge with one strong tech skill. Pick yours by year 3.', window: 'Years 3–5', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Confirm the program actually teaches modern tools', titleTa: 'நவீன கருவிகள் கற்பிக்கின்றனரா?', detail: 'Some colleges still teach FoxPro in 2026. Ask current students what software they actually use before joining.', priority: 'high' },
      { title: 'Start Python or SQL basics over the summer', titleTa: 'பைதான் / SQL அடிப்படை', detail: 'Free courses; 2-3 hours a day for a month gives you a real head start over year-1 classmates.', priority: 'high' },
      { title: 'Install Tally + Excel and try real bookkeeping', titleTa: 'டாலி + எக்செல் பயிற்சி', detail: 'Practise on dummy data. Hands-on time before college beats any theoretical preview.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Tally + advanced Excel + SQL basics', why: 'The triad that every corporate accounting-tech role expects. Strong fundamentals here pay off through every semester.', freeResource: 'Tally Education, ExcelIsFun YouTube, W3Schools SQL' },
      { skill: 'Power BI or Tableau (one tool well)', why: 'Data visualisation is the modern accountant\'s leverage. One tool deeply known is better than three known shallowly.', freeResource: 'Microsoft Learn (Power BI free), Tableau Public free' },
      { skill: 'Spoken English + presentation skills', why: 'B.Com CA graduates who can explain a dashboard to a non-technical manager land the best roles.', freeResource: 'BBC Learning English, Toastmasters clubs' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.COM (ACCOUNTING & FINANCE) ──────────────────────────────────────────
  {
    id: 'bcom-accounting-finance',
    family: 'commerce-bcom',
    isNiche: false,
    interestTags: ['finance'],
    needsCounsellorReview: true,
    aversionConflicts: ['paperwork', 'maths_heavy'],
    automation: 'ai_augmented',
    automationNote: 'AI tools handle routine financial analysis, but investment judgement, cost auditing decisions and portfolio strategy remain firmly human. The strongest A&F graduates pair classical finance with comfort using analytical tools.',
    title: 'B.Com (Accounting & Finance)',
    titleTa: 'பி.காம் (கணக்கியல் மற்றும் நிதி)',
    icon: '📈',
    color: 'from-cyan-500 to-blue-600',
    whatIsIt:
      'A three-year commerce degree with a sharper finance focus — investment analysis, cost auditing, portfolio management, advanced corporate finance, financial reporting. The closest B.Com track to CA work and a strong stepping stone to CFA, CMA or MBA Finance.',
    eligibleStreams: ['commerce', 'pcm'],
    strongGroupCodes: ['301', '302', '304', '308'],
    ugCourses: ['B.Com (Accounting & Finance)', 'B.Com (A&F)', 'B.Com Hons. (Finance)'],
    entranceExams: ['None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'A 3-year direct-admission degree. Junior analyst / finance executive roles open at graduation; senior finance careers typically need CA/CFA/MBA on top.',
    skillWeights: { mathematics: 8, language: 6, science: 2, creativity: 4, people: 5, physical: 1, digital: 7 },
    priorityFit: { salary: 7, security: 7, balance: 6, abroad: 7, prestige: 7, passion: 5, growth: 8, hometown: 7 },
    competitiveBoardPct: { comfortable: 75, stretch: 65 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹3–5 LPA fresh; corporate finance roles at top firms can reach ₹5–8 LPA for strong candidates.',
      midCareerLPA: 'AI estimate — ₹10–25 LPA after 5–7 years with CFA / CA / MBA Finance layered on; less without.',
      note: 'Pays above B.Com General because the curriculum maps directly onto early-career finance and analyst roles. The earnings ceiling really opens up with a CFA or MBA Finance.',
    },
    demand: { score: 7, note: 'AI estimate — steady demand from corporate finance teams, fund houses, audit firms and fintech. Less volume than CSE but better-paid for the right candidate.' },
    entryDifficulty: { score: 4, note: 'Direct admission, but fewer colleges offer this specific track and they tend to be more selective on 12th marks.' },
    collegeTiers: [
      { label: 'Top finance-focused colleges (AI estimate)', examples: ['Loyola College Chennai (Hons.)', 'Madras Christian College', 'PSG College of Arts & Science'], cutoffGuide: 'AI estimate — 80%+ in 12th typical at top tier.', feeRange: 'AI estimate — ₹30K–1L / year' },
      { label: 'Strong autonomous colleges (AI estimate)', examples: ['Stella Maris', 'Ethiraj', 'Bishop Heber Trichy'], cutoffGuide: 'AI estimate — 70–80% range.', feeRange: 'AI estimate — ₹25K–80K / year' },
      { label: 'Other private colleges (AI estimate)', examples: ['Many TN private colleges with A&F or Hons. tracks'], cutoffGuide: 'AI estimate — 65%+ typical.', feeRange: 'AI estimate — ₹25K–1L / year' },
    ],
    costReality: 'AI estimate — a 3-year B.Com A&F in TN costs roughly ₹20K–3L total. The ROI is strong if you layer a CA / CFA / MBA on top.',
    backupOptions: ['CFA Level 1 alongside B.Com — strong combo', 'CA Inter — natural progression', 'MBA Finance after 2-3 years of work', 'Corporate finance / FP&A roles', 'Audit firm roles (Big 4 article assistants)'],
    honestCaveat: 'B.Com A&F is the most "finance-pure" B.Com track and rewards students who genuinely engage with markets, financial statements and investment thinking. Students who picked it because "finance pays well" without that pull tend to struggle once the early-career grunt work hits.',
    roadmap: [
      { title: 'Pass 12th Commerce with 75%+', titleTa: '+12 75%+', detail: 'Maths background helps; A&F leans on it more than General.', window: 'Now', phase: 'now' },
      { title: 'Join B.Com A&F + CFA Level 1 in year 2-3', titleTa: 'B.Com A&F + CFA Level 1', detail: 'CFA Level 1 alongside B.Com is the strongest combination for finance careers. Start preparing in year 2.', window: 'Years 1–3', phase: 'next' },
      { title: 'Specialise — CA, CFA, MBA Finance, or analyst track', titleTa: 'CA / CFA / MBA / பகுப்பாய்வு', detail: 'A&F + one professional qualification is the formula that lifts earnings sharply.', window: 'Years 3–5', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Read one financial-statements book over summer', titleTa: 'நிதி அறிக்கைகள் புத்தகம்', detail: 'Knowing how to read a balance sheet and P&L before year 1 starts is a massive head start.', priority: 'high' },
      { title: 'Open a virtual trading account', titleTa: 'மெய்நிகர் வர்த்தக கணக்கு', detail: 'NSE Pathshala or similar free platforms. Spend a few months watching markets without real money before college.', priority: 'high' },
      { title: 'Decide on CFA vs CA vs MBA early', titleTa: 'CFA / CA / MBA முடிவு', detail: 'These are very different paths. Each suits a different temperament. Decide by end of year 1.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Reading financial statements', why: 'The foundational skill — balance sheet, P&L, cash flow. Strong here means every accounting class clicks faster.', freeResource: 'Investopedia free guides, "Financial Statements" by Ittelson (cheap)' },
      { skill: 'Advanced Excel — financial modelling specifically', why: 'The single most valuable skill for B.Com A&F students. Modelling discipline learned early compounds for a decade.', freeResource: 'Wall Street Prep free intro, Corporate Finance Institute free courses' },
      { skill: 'Following Indian markets weekly', why: 'Builds intuition for the firms that will hire you. 30 minutes a week is enough.', freeResource: 'Mint, The Ken, Moneycontrol' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.COM (BANKING & INSURANCE) ───────────────────────────────────────────
  {
    id: 'bcom-banking-insurance',
    family: 'commerce-bcom',
    isNiche: false,
    interestTags: ['finance', 'govt'],
    needsCounsellorReview: true,
    aversionConflicts: ['paperwork', 'shift_work'],
    automation: 'ai_augmented',
    automationNote: 'Branch banking and insurance underwriting are automating fast, but customer-facing relationship roles, risk assessment judgement and complex claims handling remain firmly human. The strongest B&I graduates aim at bank officer roles (IBPS PO) or specialist insurance careers.',
    title: 'B.Com (Banking & Insurance)',
    titleTa: 'பி.காம் (வங்கி மற்றும் காப்பீடு)',
    icon: '🏦',
    color: 'from-indigo-500 to-purple-600',
    whatIsIt:
      'A three-year commerce degree specialising in banking operations, risk management, insurance systems and financial services. Designed as a direct on-ramp to nationalised bank exams (IBPS PO, SBI PO), insurance company roles and financial services careers.',
    eligibleStreams: ['commerce', 'pcm'],
    strongGroupCodes: ['301', '302', '304', '308'],
    ugCourses: ['B.Com (Banking & Insurance)', 'B.Com (B&I)', 'B.Com (Banking Management)'],
    entranceExams: ['None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'A 3-year direct-admission degree. Entry roles open at graduation; the strongest career step is clearing IBPS PO or SBI PO (typically 1-3 years post-graduation).',
    skillWeights: { mathematics: 7, language: 7, science: 2, creativity: 3, people: 7, physical: 1, digital: 6 },
    priorityFit: { salary: 6, security: 9, balance: 7, abroad: 4, prestige: 6, passion: 5, growth: 6, hometown: 9 },
    competitiveBoardPct: { comfortable: 70, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — Bank PO (post-IBPS): ₹6–10 LPA. Insurance officer: ₹3–6 LPA. Private banking sales: ₹2.5–5 LPA + incentives.',
      midCareerLPA: 'AI estimate — Bank officer mid-career: ₹10–22 LPA. Senior insurance roles ₹8–18 LPA. Both with strong pension/job security.',
      note: 'Bank officer roles (IBPS PO / SBI PO) are among the most secure, well-respected jobs in India — they should be on every B&I student\'s radar from year 1. The salary is only one part; the security is the real prize.',
    },
    demand: { score: 7, note: 'AI estimate — public sector banks hire steadily; insurance is growing as middle-class penetration deepens. Branch-level work is automating; customer-facing and risk roles are secure.' },
    entryDifficulty: { score: 3, note: 'Direct admission. Fewer colleges offer this specific track than General but seats are widely available where offered.' },
    collegeTiers: [
      { label: 'Top autonomous colleges (AI estimate)', examples: ['Loyola College Chennai', 'Madras Christian College', 'PSG College of Arts & Science'], cutoffGuide: 'AI estimate — 75%+ in 12th typical.', feeRange: 'AI estimate — ₹25K–80K / year' },
      { label: 'Strong colleges (AI estimate)', examples: ['Bishop Heber Trichy', 'D.G. Vaishnav', 'PSGR Krishnammal'], cutoffGuide: 'AI estimate — 65–75%.', feeRange: 'AI estimate — ₹20K–80K / year' },
      { label: 'Accessible colleges (AI estimate)', examples: ['Many TN colleges with B&I track'], cutoffGuide: 'AI estimate — 60%+.', feeRange: 'AI estimate — ₹15K–60K / year' },
    ],
    costReality: 'AI estimate — a 3-year B.Com B&I in TN costs roughly ₹15K–2.5L total. The ROI is excellent if you clear a bank officer exam.',
    backupOptions: ['IBPS PO / SBI PO (the headline target)', 'NABARD / RBI Grade B exams', 'Insurance specialist exams (LIC AAO, IRDA)', 'CAIIB after joining a bank', 'MBA Banking & Finance later'],
    honestCaveat: 'The ROI of B&I is hugely amplified by clearing one government bank exam — without that, it is a fairly ordinary B.Com track. Treat bank-exam preparation as a parallel commitment from year 2, not a "later" thing. Job security is the real value here.',
    roadmap: [
      { title: 'Pass 12th Commerce with 70%+', titleTa: '+12 70%+', detail: 'Direct admission. Marks matter for top colleges but seats are widely available.', window: 'Now', phase: 'now' },
      { title: 'Join B.Com B&I + start IBPS/SBI PO prep in year 2', titleTa: 'B.Com B&I + வங்கி தேர்வு', detail: 'The bank-exam track is the point. Begin quantitative aptitude, reasoning and English practice from semester 3.', window: 'Years 1–3', phase: 'next' },
      { title: 'Clear IBPS PO / SBI PO / insurance officer exam', titleTa: 'வங்கி அல்லது காப்பீடு அதிகாரி தேர்வு', detail: 'A bank PO post is typically the highest-value outcome. 1-3 years post-graduation is realistic.', window: 'Years 3–5', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Start IBPS prep awareness now', titleTa: 'IBPS தயாரிப்பு ஆரம்பம்', detail: 'You don\'t need to grind yet, but understand what the exam is, what it tests, and what good preparation looks like.', priority: 'high', link: 'https://www.ibps.in' },
      { title: 'Begin daily English newspaper reading', titleTa: 'தினசரி ஆங்கில செய்தித்தாள்', detail: 'IBPS English is killed by daily newspaper reading. The Hindu or Indian Express, 30 minutes daily.', priority: 'high' },
      { title: 'Learn basic quantitative aptitude', titleTa: 'அளவு திறன் அடிப்படை', detail: 'Free YouTube channels cover the IBPS-style maths thoroughly. Start the habit before college.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Quantitative aptitude (IBPS-style)', why: 'The exam that opens the secure-job door. Built up over 3 years of B&I, not crammed at the end.', freeResource: 'Career Power, Adda247, Oliveboard free practice tests' },
      { skill: 'English newspaper-reading discipline', why: 'IBPS English questions are killed by 30 daily minutes of newspaper reading. Start the habit early.', freeResource: 'The Hindu, Indian Express, Editorial sections specifically' },
      { skill: 'Banking awareness — current affairs', why: 'The IBPS General Awareness section rewards consistent following of banking news. Year 1 onwards.', freeResource: 'RBI website, Mint banking section, free GA monthly digests' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.COM (FINANCIAL MARKETING ANALYTICS) ─────────────────────────────────
  {
    id: 'bcom-financial-marketing-analytics',
    family: 'commerce-bcom',
    isNiche: true,
    interestTags: ['finance', 'tech'],
    needsCounsellorReview: true,
    aversionConflicts: ['high_competition'],
    automation: 'ai_augmented',
    automationNote: 'Algorithmic trading and AI-driven analysis are reshaping the financial markets industry. The strongest FMA graduates use these tools rather than competing with them — combining classical markets knowledge with data fluency.',
    title: 'B.Com (Financial Marketing Analytics)',
    titleTa: 'பி.காம் (நிதி சந்தை பகுப்பாய்வு)',
    icon: '📊',
    color: 'from-violet-500 to-purple-600',
    whatIsIt:
      'A three-year commerce degree focused on the capital markets — stock markets, derivatives, technical analysis, financial data analytics, mutual funds and investment products. Designed for the FinTech, broking, asset-management and equity-research worlds.',
    eligibleStreams: ['commerce', 'pcm'],
    strongGroupCodes: ['301', '302', '304', '308'],
    ugCourses: ['B.Com (Financial Marketing Analytics)', 'B.Com (Capital Markets)', 'B.Com (FMA)'],
    entranceExams: ['None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'A 3-year direct-admission degree. Entry analyst / dealer / sub-broker roles open at graduation; senior research and portfolio careers typically need CFA on top.',
    skillWeights: { mathematics: 8, language: 6, science: 3, creativity: 5, people: 5, physical: 1, digital: 7 },
    priorityFit: { salary: 8, security: 5, balance: 5, abroad: 7, prestige: 7, passion: 6, growth: 8, hometown: 6 },
    competitiveBoardPct: { comfortable: 75, stretch: 65 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹3–6 LPA fresh in broking, equity research junior, fintech analyst roles. Tier-1 firms can reach ₹6–10 LPA for strong candidates.',
      midCareerLPA: 'AI estimate — ₹12–35 LPA in 7-10 years for equity analysts and traders. Variable / bonus-heavy — the ceiling is high, the floor is real.',
      note: 'Highest earnings ceiling of any B.Com track BUT also the most volatile — stock-market firms hire heavily in bull markets and shed in bear markets. Salary + bonus structure means good years pay extremely well; bad years can be tight.',
    },
    demand: { score: 6, note: 'AI estimate — strong from fintech (Zerodha, Groww, Upstox, Smallcase), broking houses, mutual fund houses. Hiring is cyclical with market conditions.' },
    entryDifficulty: { score: 4, note: 'Direct admission but very few colleges offer this specific track — most are concentrated in Chennai, Coimbatore, and a handful of autonomous colleges.' },
    collegeTiers: [
      { label: 'Top autonomous colleges (AI estimate)', examples: ['Loyola College Chennai', 'Madras Christian College', 'PSG College of Arts & Science'], cutoffGuide: 'AI estimate — 80%+ at top tier typically expected.', feeRange: 'AI estimate — ₹30K–1L / year' },
      { label: 'Strong city colleges (AI estimate)', examples: ['Stella Maris', 'D.G. Vaishnav', 'Bishop Heber'], cutoffGuide: 'AI estimate — 70–80%.', feeRange: 'AI estimate — ₹25K–80K / year' },
      { label: 'Other colleges with FMA / Capital Markets track (AI estimate)', examples: ['Limited availability — verify before applying'], cutoffGuide: 'AI estimate — varies; 65%+ where offered.', feeRange: 'AI estimate — ₹20K–80K / year' },
    ],
    costReality: 'AI estimate — a 3-year B.Com FMA in TN costs roughly ₹20K–3L total. The earnings ceiling justifies the investment for students who genuinely follow markets.',
    backupOptions: ['CFA Level 1 → 2 → 3 in parallel', 'NISM certifications (entry into broking firms)', 'MBA Finance', 'Pivot to general B.Com track if markets feel wrong', 'Data analytics roles (FMA grads with Python do well)'],
    honestCaveat: 'The FMA track works for students who genuinely follow markets out of interest — the kind who read about a stock split for fun. Students who picked it because "it sounds prestigious" or "trading pays well" usually struggle once they realise it requires obsessive daily attention to global events, charts and earnings reports. The earnings ceiling is the highest among B.Com tracks; the volatility is also the highest.',
    roadmap: [
      { title: 'Pass 12th Commerce with 75%+', titleTa: '+12 75%+', detail: 'Maths foundation matters; FMA leans on quantitative skills.', window: 'Now', phase: 'now' },
      { title: 'Join B.Com FMA + active market participation', titleTa: 'B.Com FMA + சந்தை பங்கேற்பு', detail: 'A virtual or small real trading account from year 1 builds intuition the syllabus alone cannot.', window: 'Years 1–3', phase: 'next' },
      { title: 'CFA Level 1 + first analyst / dealer role', titleTa: 'CFA Level 1 + பகுப்பாய்வாளர் வேலை', detail: 'CFA Level 1 alongside the degree, then first job in broking, research or fintech.', window: 'Years 3–5', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Open a free demat + virtual trading account', titleTa: 'டெமாட் + மெய்நிகர் வர்த்தகம்', detail: 'NSE Pathshala virtual trading or any free demo platform. Spend 6 months watching before risking real money.', priority: 'high' },
      { title: 'Read one investing book over summer', titleTa: 'முதலீட்டு புத்தகம்', detail: '"The Intelligent Investor" or "One Up On Wall Street" — classics that shape how you think about markets.', priority: 'high' },
      { title: 'Follow Indian markets daily', titleTa: 'தினசரி இந்திய சந்தைகள்', detail: 'Moneycontrol, Mint, Bloomberg Quint — 30 minutes daily for 90 days builds the daily-attention habit FMA demands.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Reading earnings reports and balance sheets', why: 'The fundamental skill of any markets career. Build the comfort with annual reports from year 1.', freeResource: 'Free annual reports on company investor pages, Moneycontrol' },
      { skill: 'Python for finance basics', why: 'Modern markets work is increasingly data-driven. Python + Pandas opens analyst and quant-adjacent roles.', freeResource: 'freeCodeCamp Python, Quantra free courses' },
      { skill: 'Following one specific sector deeply', why: 'Pick a sector (banking / pharma / IT) and follow every news item for 6 months. Specialist knowledge pays off in interviews.', freeResource: 'Company filings on BSE / NSE, sector reports on Moneycontrol' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── BBA (BACHELOR OF BUSINESS ADMINISTRATION) ─────────────────────────────
  {
    id: 'bba-graduate',
    family: 'commerce-bba',
    isNiche: false,
    interestTags: ['finance'],
    needsCounsellorReview: true,
    aversionConflicts: ['sitting_long'],
    automation: 'ai_augmented',
    automationNote: 'AI is changing how reports are written and meetings are summarised, but the work of leading teams, building client relationships and making business calls remains human. The strongest BBAs combine business judgement with comfort using new tools.',
    title: 'BBA Graduate',
    titleTa: 'வணிக நிர்வாக இளங்கலை',
    icon: '💼',
    color: 'from-amber-500 to-orange-600',
    whatIsIt:
      'A three-year management degree that builds business foundations — marketing, HR, finance, operations — and feeds into MBA, family business, sales, banking, and corporate roles.',
    eligibleStreams: ['commerce', 'pcm', 'arts'],
    strongGroupCodes: ['301', '302', '304', '308'],
    ugCourses: ['BBA', 'BBA (Hons.)', 'BBM', 'Integrated BBA + MBA'],
    entranceExams: ['CUET', 'None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'A 3-year direct-admission degree. BBA + an MBA (typically 2 years after some work experience) is the strongest combined path; entry corporate roles open after BBA alone.',
    skillWeights: {
      mathematics: 6,
      language: 8,
      science: 2,
      creativity: 7,
      people: 9,
      physical: 2,
      digital: 7,
    },
    priorityFit: {
      salary: 6,
      security: 5,
      balance: 6,
      abroad: 7,
      prestige: 7,
      passion: 6,
      growth: 8,
      hometown: 6,
    },
    competitiveBoardPct: { comfortable: 75, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — typically ₹3–5 LPA at strong city colleges, less in tier-2.',
      midCareerLPA: 'AI estimate — ₹8–25 LPA after MBA + 5–7 years experience.',
      note: 'BBA alone is often a stepping stone to MBA or family business. Pure BBA salaries cluster around entry corporate roles unless paired with strong communication, internships, or further study.',
    },
    demand: {
      score: 6,
      note: 'AI estimate — many graduates, so the differentiator is the college tier, internships, and English fluency. Demand for management graduates is steady, not exceptional.',
    },
    entryDifficulty: {
      score: 4,
      note: 'Most TN BBA programs are direct-admission. Top-tier programs (Christ, Loyola, Stella Maris BBA) are mildly competitive.',
    },
    collegeTiers: [
      {
        label: 'Top autonomous colleges (AI estimate)',
        examples: ['Loyola College Chennai', 'Madras Christian College', 'Stella Maris (Women)', 'PSG College of Arts & Science'],
        cutoffGuide: 'AI estimate — 85%+ in 12th typically expected at top tier.',
        feeRange: 'AI estimate — ₹40K–1.2L / year',
      },
      {
        label: 'Strong private colleges (AI estimate)',
        examples: ['SRM Easwari', 'Ethiraj College for Women', 'D.G. Vaishnav', 'PSGR Krishnammal'],
        cutoffGuide: 'AI estimate — 70–85% range; direct admission.',
        feeRange: 'AI estimate — ₹50K–1.5L / year',
      },
      {
        label: 'Accessible private colleges (AI estimate)',
        examples: ['Many TN affiliated colleges across districts'],
        cutoffGuide: 'AI estimate — wide access, often 60%+ minimum.',
        feeRange: 'AI estimate — ₹30K–1L / year',
      },
    ],
    costReality:
      'AI estimate — a 3-year BBA in TN typically costs ₹1L–4.5L total, with sharp variation by college tier. An MBA on top adds ₹2L–25L depending on programme.',
    backupOptions: [
      'MBA after 2 years of work experience',
      'Banking exams (IBPS PO, SBI PO)',
      'Family business / entrepreneurship',
      'Switch to ACCA or CMA for finance specialisation',
    ],
    honestCaveat:
      'BBA without strong English, without internships, and from a non-tier-1 college genuinely struggles. The degree is most valuable for those who plan an MBA, run/inherit a family business, or grind out internships and communication skills during the 3 years.',
    roadmap: [
      {
        title: 'Pass 12th with 75%+ for top colleges',
        titleTa: '+12-இல் 75%+ பெறுங்கள்',
        detail: 'Direct admission for most; top autonomous colleges look at 12th marks and English skills.',
        window: 'Now',
        phase: 'now',
      },
      {
        title: 'Join BBA (3 years) + 2-3 internships',
        titleTa: 'BBA + இன்டர்ன்ஷிப்கள்',
        detail: 'Internships matter more than marks for placements. Aim for at least 2 in years 2-3 — marketing, sales, HR, ops.',
        window: 'Years 1–3',
        phase: 'next',
      },
      {
        title: 'MBA, work, or family business',
        titleTa: 'MBA, வேலை, அல்லது குடும்ப தொழில்',
        detail: 'MBA from a good college after 2 years of work multiplies BBA returns sharply. Otherwise enter the workforce and grow.',
        window: 'Years 3–6',
        phase: 'later',
      },
    ],
    ninetyDayPlan: [
      {
        title: 'Choose a specialisation track',
        titleTa: 'சிறப்புப் பாடத்தைத் தேர்ந்தெடுக்கவும்',
        detail: 'BBA Marketing, Finance, HR, IB and General have different outcomes. Pick based on what excites you, not what sounds prestigious.',
        priority: 'high',
      },
      {
        title: 'Sharpen English — speaking AND writing',
        titleTa: 'ஆங்கிலம் — பேசவும் எழுதவும்',
        detail: 'The single biggest determinant of BBA placement outcomes. Daily 30 minutes — podcasts, free MOOCs, mock interviews.',
        priority: 'high',
      },
      {
        title: 'Find an internship within Semester 2',
        titleTa: 'செமஸ்டர் 2-க்குள் இன்டர்ன்ஷிப்',
        detail: 'Even unpaid; even at a small TN firm. The discipline of working in a real business changes how you view classes.',
        priority: 'medium',
      },
    ],
    buildNowSkills: [
      {
        skill: 'Spoken English fluency',
        why: 'The single skill that most separates a placed BBA from one that struggles. Worth more than any GPA point.',
        freeResource: 'BBC Learning English, English Speeches YouTube, Toastmasters clubs',
      },
      {
        skill: 'PowerPoint + storytelling',
        why: 'Every business role involves communicating ideas. Practise pitching things you care about for 2 minutes with 3 slides.',
        freeResource: 'YouTube — "How to make a pitch deck", free Canva',
      },
      {
        skill: 'Reading business news weekly',
        why: 'You need to know how Indian businesses think. 30 minutes a week of Mint or The Ken is enough.',
        freeResource: 'Mint, The Ken (free articles), The Morning Context',
      },
    ],
    lastReviewed: '2026-05',
  },

  // ─── CMA (COST & MANAGEMENT ACCOUNTANT) ────────────────────────────────────
  {
    id: 'cost-management-accountant',
    family: 'commerce-ca-cma',
    isNiche: true,
    interestTags: ['finance'],
    needsCounsellorReview: true,
    aversionConflicts: ['paperwork', 'high_competition'],
    automation: 'ai_augmented',
    automationNote: 'Routine cost reporting is being automated, but cost analysis, pricing decisions, and management accounting judgement remain firmly human. CMAs increasingly use AI tools to do more analysis per hour, not less.',
    title: 'Cost & Management Accountant (CMA)',
    titleTa: 'செலவு மற்றும் மேலாண்மை கணக்காளர்',
    icon: '💰',
    color: 'from-cyan-500 to-blue-600',
    whatIsIt:
      'A professional qualification from ICMAI (Institute of Cost Accountants of India) focused on cost accounting, financial management, and strategic decision-making in manufacturing and service businesses. Structurally similar to CA.',
    eligibleStreams: ['commerce', 'pcm', 'pcmb', 'arts'],
    strongGroupCodes: ['301', '302', '304', '308'],
    ugCourses: ['CMA Foundation → Intermediate → Final (alongside B.Com if desired)'],
    entranceExams: ['None (direct admission)'],
    pathwayType: 'professional-track',
    timeToCareer:
      'Professional track registered directly after 12th. Foundation → Intermediate → Final + 3 years of practical training. Realistic time to qualified CMA: 4–5 years from 12th, though many take longer.',
    skillWeights: {
      mathematics: 8,
      language: 6,
      science: 2,
      creativity: 4,
      people: 5,
      physical: 1,
      digital: 7,
    },
    priorityFit: {
      salary: 8,
      security: 8,
      balance: 6,
      abroad: 6,
      prestige: 7,
      passion: 6,
      growth: 8,
      hometown: 7,
    },
    competitiveBoardPct: { comfortable: 70, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹4–8 LPA on qualifying. ₹6–12 LPA at larger firms in Chennai / Bangalore / Coimbatore.',
      midCareerLPA: 'AI estimate — ₹15–35 LPA in 8–10 years; senior cost controllers and management roles can reach much higher.',
      note: 'CMA salaries are typically a step below CA at the same experience level but the work-life balance and entry difficulty are slightly easier. Manufacturing and PSU companies value CMAs particularly highly.',
    },
    demand: {
      score: 7,
      note: 'AI estimate — strong steady demand from manufacturing, PSUs and large corporates. Less well-known to small businesses than CA, so brand-recognition is a soft headwind early.',
    },
    entryDifficulty: {
      score: 7,
      note: 'AI estimate — passing rates are low (typically 10–20% for finals), but lower than CA. A multi-year commitment with real attrition.',
    },
    collegeTiers: [
      {
        label: 'Direct ICMAI registration (no college tier)',
        examples: ['Register directly with ICMAI', 'Most students study alongside B.Com at any college'],
        cutoffGuide: 'No cut-off. Eligibility is 12th pass (any stream).',
        feeRange: 'AI estimate — total ICMAI fees across all 3 levels: ₹50K–1L',
      },
    ],
    costReality:
      'AI estimate — total cost is dominated by ICMAI fees (~₹50K–1L for all 3 levels) plus optional coaching (₹30K–1.5L). Far cheaper than an MBA. The hidden cost is the years of study during your 20s.',
    backupOptions: [
      'B.Com (do in parallel as an academic backup)',
      'CA — switch path if cost-accounting feels narrow',
      'MBA Finance — broader credential if CMA Final attempts don\'t clear',
      'Corporate finance / FP&A roles',
    ],
    honestCaveat:
      'CMA is structurally identical to CA — multi-year commitment, low pass rates, real attrition. Have a clean Plan B in place from day one (usually a B.Com running alongside). Manufacturing firms and PSUs are the best landing spots; pure-services firms tend to prefer CA.',
    roadmap: [
      {
        title: 'Pass 12th in any stream',
        titleTa: '+12 எந்த குரூப்பிலும் தேர்ச்சி',
        detail: 'No specific marks needed — eligibility is just 12th pass. Maths is helpful but not required.',
        window: 'Now',
        phase: 'now',
      },
      {
        title: 'Clear CMA Foundation (8 months minimum) then Intermediate',
        titleTa: 'CMA அடிப்படை, பின்பு இடைநிலை',
        detail: 'Foundation papers run every June and December. Pair with a B.Com for backup safety.',
        window: 'Years 1–3',
        phase: 'next',
      },
      {
        title: 'CMA Final + 3 years practical training',
        titleTa: 'CMA இறுதி + பயிற்சி',
        detail: 'Final papers + the mandatory practical training. Together these decide your starting role.',
        window: 'Years 3–5',
        phase: 'later',
      },
    ],
    ninetyDayPlan: [
      {
        title: 'Register for CMA Foundation with ICMAI',
        titleTa: 'CMA அடிப்படை பதிவு',
        detail: 'Registration is direct on the icmai.in portal. The Foundation course must be completed before sitting the exam.',
        priority: 'high',
        link: 'https://icmai.in',
      },
      {
        title: 'Enrol in a B.Com (parallel safety net)',
        titleTa: 'பி.காம் (இணை பாதுகாப்பு)',
        detail: 'Run B.Com in parallel. If CMA proves not to be your path, you still have a degree to build on.',
        priority: 'high',
      },
      {
        title: 'Build a 6-day study discipline early',
        titleTa: 'ஆரம்பத்திலேயே படிப்பு ஒழுக்கம்',
        detail: 'CMA succeeds for those who study consistently every week, not who burst-study before exams. Set a routine in month 1.',
        priority: 'medium',
      },
    ],
    buildNowSkills: [
      {
        skill: 'Cost accounting fundamentals',
        why: 'The core of every CMA paper. Strong fundamentals in year 1 compound through every subsequent level.',
        freeResource: 'ICMAI study material (free PDF), YouTube playlists by CMA toppers',
      },
      {
        skill: 'Advanced Excel for costing',
        why: 'CMAs spend their working lives in Excel — cost sheets, budgets, variance analyses. Strong Excel from year 1 pays off forever.',
        freeResource: 'Microsoft Excel free YouTube courses',
      },
      {
        skill: 'Reading manufacturing & PSU business news',
        why: 'CMAs work where things are made. Following manufacturing news weekly builds intuition for the firms that will hire you.',
        freeResource: 'Mint, Business Line, Economic Times manufacturing section',
      },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.SC. AGRICULTURE ─────────────────────────────────────────────────────
  {
    id: 'agriculture-graduate',
    family: 'agriculture',
    isNiche: true,
    interestTags: ['environment', 'research', 'govt'],
    needsCounsellorReview: true,
    aversionConflicts: ['field_outdoor'],
    automation: 'physical_skilled',
    automationNote: 'Farming itself is increasingly augmented by precision tools, drones, and data — but the trained agriculturist is who decides what to plant, when, and how. Strong demand from agribusiness, government extension services, food companies, and farm-tech start-ups.',
    title: 'Agricultural Scientist / Officer (B.Sc. Agri)',
    titleTa: 'வேளாண்மை விஞ்ஞானி / அதிகாரி',
    icon: '🌾',
    color: 'from-green-500 to-emerald-600',
    whatIsIt:
      'A four-year B.Sc. (Hons.) Agriculture degree that opens roles in government agriculture departments, agribusiness, banks (agriculture officer), seed/fertiliser companies, and competitive exams like ICAR, NABARD, and IBPS-AFO.',
    eligibleStreams: ['pcb', 'pcmb', 'pcm'],
    strongGroupCodes: ['208', '204', '203'],
    ugCourses: ['B.Sc. (Hons.) Agriculture', 'B.Sc. Horticulture', 'B.Sc. Forestry', 'B.Sc. Agricultural Engineering'],
    entranceExams: ['TNAU (Agri)'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'A 4-year direct degree at a TN agricultural university. Government agriculture officer or bank agriculture officer roles are typically reachable within 5–6 years of finishing 12th.',
    skillWeights: {
      mathematics: 5,
      language: 5,
      science: 8,
      creativity: 5,
      people: 7,
      physical: 7,
      digital: 5,
    },
    priorityFit: {
      salary: 6,
      security: 8,
      balance: 7,
      abroad: 5,
      prestige: 6,
      passion: 7,
      growth: 7,
      hometown: 9,
    },
    competitiveBoardPct: { comfortable: 80, stretch: 70 },
    salaryReality: {
      startingLPA: 'AI estimate — Agriculture officer in nationalised banks: ₹6–10 LPA. Government extension services: ₹4–6 LPA. Private agribusiness: ₹3–7 LPA.',
      midCareerLPA: 'AI estimate — ₹10–22 LPA in banks or government, ₹8–18 LPA in agribusiness with experience and specialisation.',
      note: 'Bank Agriculture Officer roles (IBPS-AFO) are some of the most secure, well-paid jobs available to B.Sc. Agriculture graduates — they should be on every student\'s radar from year 1.',
    },
    demand: {
      score: 7,
      note: 'AI estimate — government extension services, agriculture banks, seed/fertiliser firms, food processing and farm-tech start-ups all hire. Tamil Nadu has strong agricultural employment.',
    },
    entryDifficulty: {
      score: 6,
      note: 'AI estimate — TNAU and its constituent colleges are competitive (similar to engineering counselling). Other state agricultural universities are also options.',
    },
    collegeTiers: [
      {
        label: 'TNAU constituent colleges (AI estimate)',
        examples: ['TNAU Coimbatore (HQ)', 'Agricultural College Madurai', 'Killikulam', 'Trichy', 'Vazhavachanur'],
        cutoffGuide: 'AI estimate — TNAU counselling cut-offs typically equivalent to 85%+ in PCB/PCMB.',
        feeRange: 'AI estimate — ₹30K–60K / year (heavily subsidised)',
      },
      {
        label: 'Other Tamil Nadu agricultural colleges (AI estimate)',
        examples: ['Annamalai University', 'Bharathiar / Bharathidasan affiliates'],
        cutoffGuide: 'AI estimate — 70%+ typical; more accessible.',
        feeRange: 'AI estimate — ₹40K–1L / year',
      },
      {
        label: 'Private agricultural colleges (AI estimate)',
        examples: ['Several private agri colleges across TN'],
        cutoffGuide: 'AI estimate — accessible, often 60%+.',
        feeRange: 'AI estimate — ₹50K–2L / year',
      },
    ],
    costReality:
      'AI estimate — a 4-year B.Sc. Agriculture at TNAU costs roughly ₹1.5L–3L total. Private colleges are 2-3x more expensive. Government and aided colleges are dramatically more affordable.',
    backupOptions: [
      'Bank Agriculture Officer (IBPS AFO) — major and secure',
      'ICAR JRF (research career)',
      'NABARD Grade A / B exam',
      'M.Sc. Agriculture → academia or specialised industry',
      'Agribusiness / farm-tech start-ups',
    ],
    honestCaveat:
      'B.Sc. Agriculture is one of the most underrated degrees in TN — strong government and banking prospects, hometown-friendly, secure. The trade-off is that many roles involve field work (heat, travel to remote areas) — students who specifically dislike outdoor / field work should look elsewhere.',
    roadmap: [
      {
        title: 'Score 80%+ in 12th PCB / PCMB',
        titleTa: '+12 PCB / PCMB-இல் 80%+',
        detail: 'TNAU counselling rewards strong board marks. Biology and Chemistry especially.',
        window: 'Now',
        phase: 'now',
      },
      {
        title: 'Join B.Sc. Agriculture (4 years)',
        titleTa: 'B.Sc. வேளாண்மை சேருங்கள் (4 ஆண்டுகள்)',
        detail: 'Aim for TNAU constituent colleges via TNEA-equivalent agricultural counselling. Government colleges are cheap and well-respected.',
        window: 'Years 1–4',
        phase: 'next',
      },
      {
        title: 'Specialise via job exam OR M.Sc.',
        titleTa: 'வேலை தேர்வு அல்லது M.Sc.',
        detail: 'IBPS Agriculture Officer (banks), NABARD, government extension services, or M.Sc./ICAR research. Decide in year 3.',
        window: 'Years 4–6',
        phase: 'later',
      },
    ],
    ninetyDayPlan: [
      {
        title: 'Register for TNAU counselling',
        titleTa: 'TNAU கவுன்சிலிங் பதிவு',
        detail: 'TNAU runs its own counselling. Registration windows usually open mid-year — confirm the current cycle on tnau.ac.in.',
        priority: 'high',
        link: 'https://tnau.ac.in',
      },
      {
        title: 'Visit a TNAU campus / constituent college',
        titleTa: 'TNAU வளாகத்திற்குச் செல்லவும்',
        detail: 'A campus visit clarifies what agriculture really involves day-to-day. Especially valuable if you\'ve only seen farming from a distance.',
        priority: 'medium',
      },
      {
        title: 'Begin reading about Indian agriculture',
        titleTa: 'இந்திய வேளாண்மை பற்றி படிக்கத் தொடங்கவும்',
        detail: 'Farm news, government schemes, agritech start-ups. Build the intuition early — it pays off in interviews and career choices later.',
        priority: 'medium',
      },
    ],
    buildNowSkills: [
      {
        skill: 'Biology + Chemistry fundamentals',
        why: 'B.Sc. Agriculture leans heavily on plant biology, soil chemistry, and biochemistry. Strong 12th fundamentals make year 1 smoother.',
        freeResource: 'NCERT Biology + Chemistry, Khan Academy',
      },
      {
        skill: 'Spoken English + Tamil communication',
        why: 'Agriculture officers work with farmers AND with bank/government systems — both languages matter. Confident communication is the hidden multiplier.',
        freeResource: 'Local Toastmasters clubs, BBC Learning English',
      },
      {
        skill: 'Curiosity about technology in farming',
        why: 'Agritech (precision farming, drones, satellite data) is the biggest growth area for B.Sc. Ag graduates over the next decade. Familiarity helps.',
        freeResource: 'Follow Indian agritech start-ups (Cropin, DeHaat) on LinkedIn',
      },
    ],
    lastReviewed: '2026-05',
  },

  // ─── BA ENGLISH ────────────────────────────────────────────────────────────
  {
    id: 'ba-english-graduate',
    family: 'arts-language',
    isNiche: false,
    interestTags: ['education', 'media'],
    needsCounsellorReview: true,
    aversionConflicts: [],
    automation: 'creative_judgment',
    automationNote: 'AI writes faster than any human — but it also makes editorial judgement, taste, and clear thinking more valuable, not less. The strongest BA English graduates work WITH AI tools in roles like content strategy, editing, communications, and teaching.',
    title: 'BA English Graduate',
    titleTa: 'ஆங்கில இளங்கலை',
    icon: '📖',
    color: 'from-rose-500 to-pink-600',
    whatIsIt:
      'A three-year arts degree in English literature, language, and communication — opens paths into content writing, teaching, journalism, civil services, publishing, communications, further study (M.A., B.Ed., MBA), and civil-services preparation.',
    eligibleStreams: ['arts', 'commerce', 'pcm', 'pcb', 'pcmb'],
    strongGroupCodes: [],
    ugCourses: ['BA English (Literature)', 'BA English (Functional / Communicative)', 'Integrated MA English'],
    entranceExams: ['CUET', 'None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'A 3-year direct-admission degree. Many graduates work within 3 years of finishing 12th, but the strongest careers usually involve further study (M.A., B.Ed., journalism school) or a focused skill build (content, communications, exam prep).',
    skillWeights: {
      mathematics: 2,
      language: 10,
      science: 2,
      creativity: 9,
      people: 8,
      physical: 1,
      digital: 6,
    },
    priorityFit: {
      salary: 4,
      security: 6,
      balance: 7,
      abroad: 6,
      prestige: 6,
      passion: 8,
      growth: 6,
      hometown: 7,
    },
    competitiveBoardPct: { comfortable: 70, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — content roles: ₹3–6 LPA. Teaching (B.Ed. needed): ₹2.5–4.5 LPA. Journalism: ₹2.5–5 LPA. Civil services qualifies for Group I/II salaries on success.',
      midCareerLPA: 'AI estimate — content / communications / editing: ₹8–18 LPA with 5+ years. Senior teaching, civil services: variable but secure.',
      note: 'BA English salaries depend heavily on the path chosen. Content strategy and tech-writing pay best; teaching and journalism are more about meaning than money.',
    },
    demand: {
      score: 6,
      note: 'AI estimate — strong demand for clear writers in content, communications, edtech, and product. Teaching demand is steady; print journalism is shrinking but digital-native journalism is growing.',
    },
    entryDifficulty: {
      score: 3,
      note: 'AI estimate — direct admission across most TN colleges. Top tier (Stella Maris, MCC, Loyola) is mildly competitive.',
    },
    collegeTiers: [
      {
        label: 'Top arts colleges (AI estimate)',
        examples: ['Stella Maris (Women)', 'Madras Christian College', 'Loyola College', 'Women\'s Christian College'],
        cutoffGuide: 'AI estimate — 80%+ in 12th typically expected at top tier.',
        feeRange: 'AI estimate — ₹30K–80K / year',
      },
      {
        label: 'Strong autonomous colleges (AI estimate)',
        examples: ['Ethiraj College for Women', 'Bishop Heber Trichy', 'PSG College of Arts & Science'],
        cutoffGuide: 'AI estimate — 65–80%; direct admission.',
        feeRange: 'AI estimate — ₹15K–60K / year',
      },
      {
        label: 'Government / aided colleges (AI estimate)',
        examples: ['Government Arts Colleges across TN districts', 'Many aided colleges'],
        cutoffGuide: 'AI estimate — widely accessible; cut-offs as low as 50–60%.',
        feeRange: 'AI estimate — ₹2K–20K / year',
      },
    ],
    costReality:
      'AI estimate — a 3-year BA English in TN costs roughly ₹6K–2.5L total, with sharp variation. Government colleges are extremely affordable; top autonomous colleges sit in the middle.',
    backupOptions: [
      'M.A. + B.Ed. for teaching career',
      'M.A. + UGC NET for college teaching',
      'Civil services prep (UPSC / TNPSC)',
      'Content / communications / edtech roles',
      'M.A. Mass Communication for journalism',
    ],
    honestCaveat:
      'A BA English from a non-tier-1 college, without strong communication skills built deliberately during the 3 years, genuinely struggles in the TN job market. The degree is what you make of it — graduates who read widely, write often, build a portfolio, and learn one digital skill (SEO, social media, video editing) do very well. Those who only attend classes struggle.',
    roadmap: [
      {
        title: 'Pass 12th — any stream qualifies',
        titleTa: '+12 — எந்த குரூப்பும் ஏற்கப்படும்',
        detail: 'BA English is open to all streams. Top colleges look at 12th English marks and overall percentage.',
        window: 'Now',
        phase: 'now',
      },
      {
        title: 'Join BA English (3 years) + build a writing portfolio',
        titleTa: 'BA ஆங்கிலம் + எழுத்து போர்ட்ஃபோலியோ',
        detail: 'The 3 years are an opportunity to read 50+ books and write 100+ pieces. The portfolio matters more than the marks for placements.',
        window: 'Years 1–3',
        phase: 'next',
      },
      {
        title: 'Specialise — M.A., B.Ed., content, journalism, or civil services',
        titleTa: 'சிறப்பு — M.A. / B.Ed. / பத்திரிக்கை / சிவில் சர்வீஸ்',
        detail: 'BA English alone is a foundation. Pair it with at least one focused specialisation by year 3.',
        window: 'Years 3–5',
        phase: 'later',
      },
    ],
    ninetyDayPlan: [
      {
        title: 'Start a writing habit — 200 words daily',
        titleTa: 'எழுத்துப் பழக்கம் — தினசரி 200 வார்த்தைகள்',
        detail: 'A Substack, a blog, even Notes on your phone. Consistency builds the muscle that any English-graduate role demands.',
        priority: 'high',
      },
      {
        title: 'Read at least one book and one long article weekly',
        titleTa: 'வாரம் ஒரு புத்தகம், ஒரு கட்டுரை',
        detail: 'BA English is a slow-build degree. The students who read the most outside the syllabus consistently win placements and exams.',
        priority: 'high',
      },
      {
        title: 'Decide your specialisation track by semester 4',
        titleTa: 'செமஸ்டர் 4-க்குள் சிறப்புப் பாதை',
        detail: 'Teaching, content, journalism, civil services — the four common landings. Pick one to lean into mid-degree.',
        priority: 'medium',
      },
    ],
    buildNowSkills: [
      {
        skill: 'Writing clearly under deadline',
        why: 'The single skill that monetises an English degree. Practise writing tight 500-word pieces with a 60-minute timer.',
        freeResource: 'On Writing Well (Zinsser, free PDFs available), free Substack accounts',
      },
      {
        skill: 'Reading widely outside the syllabus',
        why: 'Range — across fiction, non-fiction, journalism, history — is what separates a good BA English graduate from a forgettable one.',
        freeResource: 'Library card, Project Gutenberg, free Substack newsletters',
      },
      {
        skill: 'One digital skill — SEO / social / video editing',
        why: 'Pairing English with one digital ability is the most reliable way to land a modern content / communications role.',
        freeResource: 'Free YouTube courses on Canva, CapCut, basic SEO',
      },
    ],
    lastReviewed: '2026-05',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── DRAFT BATCH 2 (May 2026) — engineering expansion ─────────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  // The three entries below are AI-generated drafts for three engineering
  // disciplines distinct from software-engineer and mechanical-engineer (both
  // of which already exist as verified entries). All TN-specific numbers are
  // marked AI-estimate and gated behind the per-career acknowledgment UI.
  //
  // NOT included from the original ask:
  //  - B.E. Mechanical:  already covered by the verified 'mechanical-engineer'
  //                      pathway. Adding would create a duplicate.
  //  - B.Tech IT:        already listed inside software-engineer.ugCourses.
  //                      The existing career IS the bucket for it.

  // ─── B.E. ECE (ELECTRONICS & COMMUNICATIONS) ───────────────────────────────
  {
    id: 'electronics-engineer',
    family: 'engineering-electronics',
    isNiche: false,
    interestTags: ['engineering', 'tech'],
    needsCounsellorReview: true,
    aversionConflicts: ['sitting_long'],
    automation: 'ai_augmented',
    automationNote: 'Routine PCB layout and basic firmware are accelerating with AI tools, but designing real electronics — semiconductors, RF, embedded control, 5G/6G systems — still needs strong engineers. The work that endures is hardware-software integration, where AI helps but cannot lead.',
    title: 'Electronics & Communications Engineer',
    titleTa: 'மின்னணு மற்றும் தகவல்தொடர்பு பொறியியலாளர்',
    icon: '📡',
    color: 'from-cyan-500 to-blue-600',
    whatIsIt:
      'Design and build the electronic systems behind phones, networks, semiconductors, satellites and embedded devices — combining hardware design with the software that runs on it.',
    eligibleStreams: ['pcm', 'pcmb'],
    strongGroupCodes: ['102', '101'],
    ugCourses: ['B.E / B.Tech ECE', 'B.E / B.Tech Electronics', 'B.E / B.Tech Telecom', 'B.E / B.Tech VLSI Design'],
    entranceExams: ['TNEA', 'JEE Main'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'After 12th you join a 4-year B.E/B.Tech ECE directly. Working as an electronics or hardware engineer typically ~4 years from now. Many ECE graduates also pivot into software roles — that path adds no time.',
    skillWeights: {
      mathematics: 9,
      language: 5,
      science: 8,
      creativity: 7,
      people: 4,
      physical: 3,
      digital: 9,
    },
    priorityFit: {
      salary: 7,
      security: 7,
      balance: 6,
      abroad: 8,
      prestige: 7,
      passion: 7,
      growth: 8,
      hometown: 6,
    },
    competitiveBoardPct: { comfortable: 80, stretch: 70 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹3–6 LPA at most TN colleges; ₹6–12 LPA at top-tier campuses for core electronics roles. Software-leaning roles match CSE salaries.',
      midCareerLPA: 'AI estimate — ₹10–25 LPA with 5–8 years in core electronics; semiconductor / VLSI specialists in Bangalore-Chennai corridor can exceed this.',
      note: 'A genuine fork in ECE: students who go into "core" electronics (hardware, VLSI, embedded, RF) often start lower than CSE classmates, but the senior end can rival or exceed it. Students who pivot to software match CSE outcomes.',
    },
    demand: {
      score: 7,
      note: 'AI estimate — core electronics demand is steady (semiconductors, telecom, defence, IoT). Many ECE graduates ultimately work in software due to broader hiring there — that flexibility is the field\'s strength.',
    },
    entryDifficulty: {
      score: 6,
      note: 'AI estimate — ECE seats are widely available across TN colleges via TNEA. Top branches (CEG, MIT Chrompet, PSG Tech, SSN) require strong TNEA cutoffs.',
    },
    collegeTiers: [
      {
        label: 'Top government / Anna University campuses (AI estimate)',
        examples: ['CEG Guindy', 'MIT Chrompet', 'GCT Coimbatore', 'TCE Madurai'],
        cutoffGuide: 'AI estimate — TNEA cutoff ~193–198 (OC). Aim for 93%+ in PCM.',
        feeRange: 'AI estimate — ₹15K–55K / year',
      },
      {
        label: 'Strong private / autonomous colleges (AI estimate)',
        examples: ['PSG Tech', 'SSN', 'Kongu', 'CIT Coimbatore'],
        cutoffGuide: 'AI estimate — TNEA cutoff ~183–195 (OC).',
        feeRange: 'AI estimate — ₹50K–1.8L / year',
      },
      {
        label: 'Accessible private colleges (AI estimate)',
        examples: ['Many TNEA-affiliated colleges across all districts'],
        cutoffGuide: 'AI estimate — TNEA cutoff ~145–183 (OC) — seats widely available.',
        feeRange: 'AI estimate — ₹40K–1.4L / year',
      },
    ],
    costReality:
      'AI estimate — a 4-year B.E ECE in TN costs roughly ₹1L–8L total depending on college tier. Government colleges are dramatically cheaper. Fee waivers (first-graduate, 7.5% reservation, post-matric scholarships) reduce this significantly.',
    backupOptions: [
      'Software engineering roles (most ECE grads who pivot go here)',
      'M.Tech / M.S. in VLSI, Embedded, RF',
      'PSU jobs via GATE (BEL, ISRO, BHEL, BSNL)',
      'Defence research (DRDO labs)',
      'Telecom and semiconductor industry',
    ],
    honestCaveat:
      'ECE is broad — that\'s a strength and a trap. Students who choose a specialisation (VLSI, embedded, RF, communication) by year 3 do well. Students who drift through 4 years without a focus end up in lower-paid generalist roles or competing with CSE grads in software without the same depth. Pick a track early.',
    roadmap: [
      {
        title: 'Score well in 12th PCM (board + JEE / TNEA)',
        titleTa: '+12 PCM-இல் நன்கு மதிப்பெண்',
        detail: 'Strong Maths and Physics matter most. TNEA is the main TN route; JEE Main opens NITs and IIITs.',
        window: 'Now',
        phase: 'now',
      },
      {
        title: 'Join B.E / B.Tech ECE (4 years) + pick a track by year 3',
        titleTa: 'B.E ECE + சிறப்புத்துறை',
        detail: 'VLSI, embedded systems, RF/wireless, telecom, or software — choose a focus by semester 5. The first 4 semesters are foundations.',
        window: 'Years 1–4',
        phase: 'next',
      },
      {
        title: 'Job, M.Tech, or PSU exam',
        titleTa: 'வேலை, M.Tech, அல்லது PSU தேர்வு',
        detail: 'Core roles via campus placement, software roles via pivot, PSU roles via GATE, or M.Tech for specialisation.',
        window: 'Years 4–6',
        phase: 'later',
      },
    ],
    ninetyDayPlan: [
      {
        title: 'Confirm TNEA / JEE counselling registration',
        titleTa: 'TNEA / JEE கவுன்சிலிங் பதிவு',
        detail: 'TNEA is the main TN route. JEE Main opens NITs (Trichy is in TN). Confirm both windows.',
        priority: 'high',
      },
      {
        title: 'Learn Arduino / basic circuits while waiting',
        titleTa: 'அர்டுயினோ / அடிப்படை சர்க்யூட்கள்',
        detail: 'A cheap Arduino kit + free YouTube tutorials gives you a 4-year head start on hardware intuition.',
        priority: 'high',
      },
      {
        title: 'Strengthen Maths fundamentals — calculus & complex numbers',
        titleTa: 'கணித அடிப்படைகள் வலுப்படுத்துதல்',
        detail: 'Signals and systems (semester 3-4) leans heavily on calculus and complex numbers. A strong base here pays off all 4 years.',
        priority: 'medium',
      },
    ],
    buildNowSkills: [
      {
        skill: 'Basic electronics with Arduino / Raspberry Pi',
        why: 'Hands-on tinkering is the strongest predictor of ECE success. Start in 12th if possible.',
        freeResource: 'Arduino Project Hub (free), YouTube channels (GreatScott!, Andreas Spiess)',
      },
      {
        skill: 'Programming — C and Python',
        why: 'Embedded systems live in C. Software-pivot roles need Python. Both are essential by year 2.',
        freeResource: 'NPTEL C programming, Python.org free tutorials',
      },
      {
        skill: 'Strong Mathematics — calculus, linear algebra, complex numbers',
        why: 'Signals, communications, control systems and VLSI all depend on this. Weakness here cascades.',
        freeResource: 'NPTEL Engineering Mathematics, Khan Academy',
      },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.E. CIVIL ENGINEERING ────────────────────────────────────────────────
  {
    id: 'civil-engineer',
    family: 'engineering-civil',
    isNiche: false,
    interestTags: ['engineering'],
    needsCounsellorReview: true,
    aversionConflicts: ['field_outdoor'],
    automation: 'physical_skilled',
    automationNote: 'Drawing and structural analysis are increasingly software-assisted (BIM, AutoCAD, ETABS, STAAD), but the built world is physical — buildings, bridges, water systems, roads — and someone has to design, supervise and verify them on site. Slow to automate, strong with experience.',
    title: 'Civil Engineer',
    titleTa: 'சிவில் பொறியியலாளர்',
    icon: '🏗️',
    color: 'from-stone-500 to-amber-700',
    whatIsIt:
      'Design, build, supervise and maintain the physical infrastructure people use every day — buildings, bridges, roads, water systems, dams, urban infrastructure.',
    eligibleStreams: ['pcm', 'pcmb'],
    strongGroupCodes: ['102', '101'],
    ugCourses: ['B.E / B.Tech Civil', 'B.E Construction Engineering', 'B.E Environmental Engineering'],
    entranceExams: ['TNEA', 'JEE Main'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'After 12th you join a 4-year B.E/B.Tech Civil directly. Site engineer or junior design engineer roles open at graduation. Senior positions, consultancy or government engineering services typically need 5+ years of experience or further qualifications.',
    skillWeights: {
      mathematics: 8,
      language: 5,
      science: 7,
      creativity: 7,
      people: 6,
      physical: 6,
      digital: 6,
    },
    priorityFit: {
      salary: 5,
      security: 8,
      balance: 5,
      abroad: 7,
      prestige: 6,
      passion: 6,
      growth: 6,
      hometown: 8,
    },
    competitiveBoardPct: { comfortable: 75, stretch: 65 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2.5–5 LPA at site / junior engineer level. ₹4–8 LPA at top-tier construction companies (L&T, Tata Projects, Shapoorji) and consultancies.',
      midCareerLPA: 'AI estimate — ₹8–20 LPA with 7–10 years experience as project engineer, design specialist, or consultant. Government engineering services (TNPSC AE, IES via GATE) offer secure ₹12–18 LPA-equivalent total packages.',
      note: 'Civil engineering pays less than CSE/ECE on average but offers strong government job pathways (PWD, NHAI, Indian Railways, Indian Engineering Services). Site experience compounds — senior PMs and consultants are well-paid.',
    },
    demand: {
      score: 6,
      note: 'AI estimate — India\'s infrastructure spend is high, so demand for civil engineers is steady. Government jobs are particularly attractive. Private construction work depends on real estate cycles.',
    },
    entryDifficulty: {
      score: 4,
      note: 'AI estimate — civil seats are widely available across TN colleges. Cutoffs are typically below CSE/ECE. The competitive part is getting into government engineering services later via GATE / TNPSC.',
    },
    collegeTiers: [
      {
        label: 'Top government / Anna University campuses (AI estimate)',
        examples: ['CEG Guindy', 'MIT Chrompet', 'GCT Coimbatore', 'TCE Madurai'],
        cutoffGuide: 'AI estimate — TNEA cutoff ~178–192 (OC). 88%+ in PCM is comfortable.',
        feeRange: 'AI estimate — ₹15K–55K / year',
      },
      {
        label: 'Strong private / autonomous colleges (AI estimate)',
        examples: ['PSG Tech', 'SSN', 'Kongu', 'Coimbatore Institute of Technology'],
        cutoffGuide: 'AI estimate — TNEA cutoff ~170–188 (OC).',
        feeRange: 'AI estimate — ₹50K–1.5L / year',
      },
      {
        label: 'Accessible private colleges (AI estimate)',
        examples: ['Many TNEA-affiliated colleges across districts'],
        cutoffGuide: 'AI estimate — TNEA cutoff ~130–175 (OC) — widely accessible.',
        feeRange: 'AI estimate — ₹35K–1.2L / year',
      },
    ],
    costReality:
      'AI estimate — a 4-year B.E Civil in TN costs roughly ₹1L–6L total depending on tier. Government colleges are dramatically cheaper. Fee waivers reduce this further for eligible students.',
    backupOptions: [
      'TNPSC Assistant Engineer (state PWD jobs)',
      'IES via GATE (central government engineering services)',
      'PSU jobs via GATE (NHAI, NTPC, Indian Railways)',
      'M.Tech in structural / transportation / environmental',
      'M.Plan (urban planning) — adjacent field',
    ],
    honestCaveat:
      'Civil engineering involves real fieldwork — heat, dust, travel, supervision on construction sites — especially in the first 5 years. Students who specifically want a desk-only career should look elsewhere. The reward is direct: the bridges, buildings and roads you helped build are visible for decades. Government job paths are excellent for the security-minded.',
    roadmap: [
      {
        title: 'Score 75%+ in 12th PCM',
        titleTa: '+12 PCM-இல் 75%+',
        detail: 'TNEA cutoffs for Civil are typically more accessible than CSE/ECE. Maths and Physics matter most.',
        window: 'Now',
        phase: 'now',
      },
      {
        title: 'Join B.E Civil (4 years) + AutoCAD / STAAD by year 3',
        titleTa: 'B.E சிவில் + AutoCAD',
        detail: 'Master at least one industry software (AutoCAD, STAAD, ETABS, Revit) by graduation. Internships at construction firms in summers matter.',
        window: 'Years 1–4',
        phase: 'next',
      },
      {
        title: 'GATE / TNPSC / private — choose your track',
        titleTa: 'GATE / TNPSC / தனியார் — பாதை தேர்வு',
        detail: 'GATE → IES or PSU = secure & well-paid. TNPSC AE = TN government. Private construction = faster start, harder grind.',
        window: 'Years 4–6',
        phase: 'later',
      },
    ],
    ninetyDayPlan: [
      {
        title: 'TNEA counselling registration',
        titleTa: 'TNEA கவுன்சிலிங் பதிவு',
        detail: 'TNEA is the main TN route to government civil engineering colleges. Confirm the window for the current cycle.',
        priority: 'high',
      },
      {
        title: 'Learn AutoCAD basics before college',
        titleTa: 'AutoCAD அடிப்படைகள்',
        detail: 'Free AutoCAD student license + YouTube tutorials. Walking into year 1 with basic AutoCAD knowledge is a real head start.',
        priority: 'high',
      },
      {
        title: 'Visit a construction site if possible',
        titleTa: 'கட்டுமான தளம் பார்வை',
        detail: 'Civil engineering is a hands-on field — even one site visit clarifies what the work actually looks like day-to-day.',
        priority: 'medium',
      },
    ],
    buildNowSkills: [
      {
        skill: 'AutoCAD (2D drawing)',
        why: 'The industry-standard drawing tool — every civil engineer uses it. Free student license; start in 12th if possible.',
        freeResource: 'Autodesk Education (free student license), YouTube tutorials',
      },
      {
        skill: 'Strong fundamentals in Mathematics & Physics',
        why: 'Structural mechanics, fluid mechanics, surveying — all flow from 12th PCM. Weakness here cascades through every semester.',
        freeResource: 'NCERT Physics + Maths, NPTEL Engineering Mechanics',
      },
      {
        skill: 'Spoken English + Tamil communication',
        why: 'Civil engineers work with contractors (often Tamil-speaking) AND with consultants/clients (often English-speaking). Both languages are real assets.',
        freeResource: 'BBC Learning English, local Toastmasters clubs',
      },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.E. MECHATRONICS ─────────────────────────────────────────────────────
  {
    id: 'mechatronics-engineer',
    family: 'engineering-mechatronics',
    isNiche: true,
    interestTags: ['engineering', 'tech'],
    needsCounsellorReview: true,
    aversionConflicts: [],
    automation: 'physical_skilled',
    automationNote: 'Mechatronics IS the field automating other industries — robotics, automated factory lines, electric vehicles, IoT-driven manufacturing. The trained mechatronics engineer is who builds these systems, not who is replaced by them.',
    title: 'Mechatronics / Robotics Engineer',
    titleTa: 'மெக்காட்ரானிக்ஸ் / ரோபோடிக்ஸ் பொறியியலாளர்',
    icon: '🤖',
    color: 'from-purple-500 to-indigo-600',
    whatIsIt:
      'Design and build the systems that combine mechanical parts, electronics, control software and computing — robots, automated factory equipment, electric vehicle systems, drones, smart manufacturing lines.',
    eligibleStreams: ['pcm', 'pcmb'],
    strongGroupCodes: ['102', '101'],
    ugCourses: ['B.E / B.Tech Mechatronics', 'B.E Robotics & Automation', 'B.E Automation Engineering'],
    entranceExams: ['TNEA', 'JEE Main'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'After 12th you join a 4-year B.E Mechatronics directly. Automation, robotics, automotive electronics or manufacturing engineer roles open at graduation. Tamil Nadu\'s automotive belt (Chennai-Hosur) is a major employer.',
    skillWeights: {
      mathematics: 8,
      language: 5,
      science: 8,
      creativity: 8,
      people: 4,
      physical: 5,
      digital: 9,
    },
    priorityFit: {
      salary: 7,
      security: 6,
      balance: 6,
      abroad: 7,
      prestige: 7,
      passion: 8,
      growth: 9,
      hometown: 6,
    },
    competitiveBoardPct: { comfortable: 78, stretch: 68 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹3–6 LPA at typical TN colleges; ₹5–10 LPA at top-tier campuses and automotive companies (TVS, Ashok Leyland, Hyundai, Renault-Nissan).',
      midCareerLPA: 'AI estimate — ₹10–22 LPA with 5–8 years in automation / robotics / EV roles. Specialists in industrial robotics or EV motor control can exceed this.',
      note: 'Tamil Nadu\'s automotive cluster (Chennai-Hosur-Coimbatore) gives mechatronics graduates a real advantage. EV transition is creating new openings. Smaller graduate pool than core mechanical or ECE — less competition for specialised roles.',
    },
    demand: {
      score: 7,
      note: 'AI estimate — strong and growing. Industrial automation, EV manufacturing, robotics, smart factories all hire mechatronics grads. TN\'s automotive belt is a major draw.',
    },
    entryDifficulty: {
      score: 5,
      note: 'AI estimate — fewer colleges offer Mechatronics than CSE/ECE/Mechanical, so seats are more limited. Cutoffs vary widely; top programmes (PSG Tech, SSN, CEG) are competitive.',
    },
    collegeTiers: [
      {
        label: 'Top private / autonomous colleges (AI estimate)',
        examples: ['PSG Tech', 'SSN', 'Kumaraguru', 'Hindustan Institute of Tech & Science'],
        cutoffGuide: 'AI estimate — TNEA cutoff ~180–193 (OC); availability varies by year.',
        feeRange: 'AI estimate — ₹60K–1.8L / year',
      },
      {
        label: 'Anna University constituent / aided (AI estimate)',
        examples: ['CEG Guindy (Production / Manufacturing branches)', 'GCT Coimbatore'],
        cutoffGuide: 'AI estimate — competitive; check current TNEA cutoffs each year.',
        feeRange: 'AI estimate — ₹15K–55K / year',
      },
      {
        label: 'Accessible private colleges (AI estimate)',
        examples: ['Several TN colleges with Mechatronics or Robotics specialisations'],
        cutoffGuide: 'AI estimate — varies; many seats available below ~170 TNEA cutoff.',
        feeRange: 'AI estimate — ₹50K–1.5L / year',
      },
    ],
    costReality:
      'AI estimate — a 4-year B.E Mechatronics in TN costs roughly ₹1.5L–8L total depending on college tier. Government / aided colleges are dramatically cheaper. Mechatronics labs are equipment-heavy, so private college fees skew higher than CSE.',
    backupOptions: [
      'Software / embedded systems roles (transferable strongly)',
      'Automotive companies (TVS, Ashok Leyland, Hyundai, Renault-Nissan)',
      'EV start-ups (Ather, Ola Electric)',
      'M.Tech in Robotics / Control Systems / EV',
      'PSU jobs via GATE',
    ],
    honestCaveat:
      'Mechatronics is the hybrid degree — broad and exciting, but a "jack of all trades" risk is real. Students who pick a focused specialisation by year 3 (industrial robotics, EV systems, embedded automation, control systems) do exceptionally well. Those who drift through without choosing tend to lose to focused Mechanical or ECE grads in their respective domains. The TN automotive cluster makes this a particularly strong fit for staying in TN.',
    roadmap: [
      {
        title: 'Score 78%+ in 12th PCM',
        titleTa: '+12 PCM-இல் 78%+',
        detail: 'Strong Maths and Physics base needed — Mechatronics combines several engineering disciplines and the early semesters are dense.',
        window: 'Now',
        phase: 'now',
      },
      {
        title: 'Join B.E Mechatronics (4 years) + pick a focus by year 3',
        titleTa: 'B.E மெக்காட்ரானிக்ஸ் + சிறப்பு',
        detail: 'Industrial robotics, EV systems, embedded automation, or control — pick one by semester 5. Internships at TN automotive companies are gold.',
        window: 'Years 1–4',
        phase: 'next',
      },
      {
        title: 'Automotive / robotics / EV — choose your industry',
        titleTa: 'வாகனத் தொழில் / ரோபோடிக்ஸ் / EV',
        detail: 'TN automotive belt (TVS, Ashok Leyland, Hyundai), EV start-ups (Ather, Ola), or industrial automation (Siemens, ABB, Bosch). M.Tech is also a strong option.',
        window: 'Years 4–6',
        phase: 'later',
      },
    ],
    ninetyDayPlan: [
      {
        title: 'Confirm which TN colleges offer Mechatronics in current cycle',
        titleTa: 'மெக்காட்ரானிக்ஸ் வழங்கும் கல்லூரிகள்',
        detail: 'Fewer colleges offer Mechatronics than Mechanical or ECE. Confirm the specific colleges and their TNEA cutoffs early — gives you a realistic counselling plan.',
        priority: 'high',
      },
      {
        title: 'Learn Arduino / basic robotics with a starter kit',
        titleTa: 'அர்டுயினோ / அடிப்படை ரோபோடிக்ஸ்',
        detail: 'A ₹2,000 Arduino kit + free tutorials gets you genuinely tinkering with mechatronics concepts before year 1 even starts.',
        priority: 'high',
      },
      {
        title: 'Strengthen Mathematics + basic programming',
        titleTa: 'கணிதம் + நிரலாக்கம் வலுப்படுத்துதல்',
        detail: 'Control systems lean heavily on differential equations; embedded systems on C. A strong base in both is the year-1 advantage.',
        priority: 'medium',
      },
    ],
    buildNowSkills: [
      {
        skill: 'Arduino / Raspberry Pi tinkering',
        why: 'The single most predictive skill for mechatronics success. Cheap, hands-on, transferable to every specialisation in the field.',
        freeResource: 'Arduino Project Hub, YouTube channels (DroneBot Workshop, GreatScott!)',
      },
      {
        skill: 'Programming — C, Python and basic embedded',
        why: 'Mechatronics systems run on code. C for embedded, Python for prototyping and data — both are essential.',
        freeResource: 'NPTEL C programming, Python.org tutorials, freeCodeCamp YouTube',
      },
      {
        skill: 'Strong Mathematics — calculus, linear algebra, differential equations',
        why: 'Control systems and robotics depend on this. Weakness here makes year 3-4 deeply painful.',
        freeResource: 'NPTEL Engineering Mathematics, Khan Academy',
      },
    ],
    lastReviewed: '2026-05',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── DRAFT BATCH 3 (May 2026) — Bioscience & Allied Health ────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  // Three biology-side careers distinct from the verified pharmacist, nurse
  // and doctor-mbbs entries. All TN-specific numbers are AI estimates and
  // gated behind the per-career acknowledgment UI.
  //
  // NOT included from the original ask, with explanation:
  //  - B.Pharm: already covered by the verified 'pharmacist' pathway.
  //             Adding a duplicate "B.Pharm Graduate" career would surface
  //             the same career twice in a student's ranked list.

  // ─── BPT (BACHELOR OF PHYSIOTHERAPY) ───────────────────────────────────────
  {
    id: 'physiotherapist',
    family: 'healthcare-physio',
    isNiche: false,
    interestTags: ['healthcare'],
    needsCounsellorReview: true,
    aversionConflicts: ['patient_care'],
    automation: 'human_facing',
    automationNote: 'Hands-on rehabilitation, sports physio and elderly care are inherently human. AI may help with assessment or exercise tracking, but the work of physically guiding recovery sits firmly with the trained physiotherapist.',
    title: 'Physiotherapist (BPT)',
    titleTa: 'உடல் சிகிச்சை நிபுணர்',
    icon: '🦴',
    color: 'from-teal-500 to-cyan-600',
    whatIsIt:
      'A 4.5-year clinical degree training you to assess, treat and rehabilitate patients through movement, exercise and manual therapy — hospitals, sports clinics, rehab centres, home-care practice or your own practice.',
    eligibleStreams: ['pcb', 'pcmb'],
    strongGroupCodes: ['208', '204', '203'],
    ugCourses: ['BPT (Bachelor of Physiotherapy)'],
    entranceExams: ['NEET-UG'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'A 4-year academic degree + 6-month internship (4.5 years total). Practising physiotherapist roles open at graduation. Private practice typically starts after 3–5 years of clinical experience.',
    skillWeights: {
      mathematics: 3,
      language: 6,
      science: 8,
      creativity: 5,
      people: 9,
      physical: 7,
      digital: 4,
    },
    priorityFit: {
      salary: 5,
      security: 7,
      balance: 7,
      abroad: 8,
      prestige: 6,
      passion: 8,
      growth: 7,
      hometown: 8,
    },
    competitiveBoardPct: { comfortable: 75, stretch: 65 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2–4 LPA in hospitals fresh out of internship. ₹3–6 LPA at corporate hospitals and sports clinics.',
      midCareerLPA: 'AI estimate — ₹6–15 LPA with 7+ years and a specialisation (sports, neuro, paediatric). Private practice can exceed this — depends on patient base.',
      note: 'Physio salaries in India are modest until private practice or international moves. UK and Gulf physio roles pay multiples of Indian salaries, and Indian BPT is accepted (often with bridge exams). Sports and neuro physios earn most.',
    },
    demand: {
      score: 7,
      note: 'AI estimate — growing demand from elderly care, sports, post-surgical rehab and lifestyle disorders. The Indian middle class is just beginning to use physio routinely.',
    },
    entryDifficulty: {
      score: 5,
      note: 'AI estimate — BPT entry typically requires NEET in Tamil Nadu but cut-offs are well below MBBS. Many private colleges admit on 12th merit. Significantly easier entry than MBBS/BDS.',
    },
    collegeTiers: [
      {
        label: 'Top deemed / government colleges (AI estimate)',
        examples: ['SRM IST', 'Saveetha Physiotherapy', 'Madras Medical College physio dept', 'Govt physio colleges in TN'],
        cutoffGuide: 'AI estimate — NEET typically 250+ for top colleges; some take 12th merit.',
        feeRange: 'AI estimate — ₹40K–2L / year',
      },
      {
        label: 'Strong private medical-college affiliates (AI estimate)',
        examples: ['Sri Ramachandra', 'Chettinad', 'PSG Coimbatore physio program'],
        cutoffGuide: 'AI estimate — NEET 200+; some direct admission on 12th marks.',
        feeRange: 'AI estimate — ₹60K–2.5L / year',
      },
      {
        label: 'Accessible private colleges (AI estimate)',
        examples: ['Several TN private physiotherapy colleges across districts'],
        cutoffGuide: 'AI estimate — often 12th marks-based admission; widely accessible.',
        feeRange: 'AI estimate — ₹50K–1.5L / year',
      },
    ],
    costReality:
      'AI estimate — a 4.5-year BPT in TN costs roughly ₹2L–10L total depending on college. Government colleges are dramatically cheaper. Private colleges vary sharply.',
    backupOptions: [
      'MPT (Master of Physiotherapy) — specialisation in sports, neuro, ortho or paediatric',
      'Move abroad — UK CPSM, US DPT bridge exams, Gulf clinical roles',
      'Own private practice (after 3–5 years\' clinical experience)',
      'Allied health roles in corporate hospitals',
      'Personal training / sports rehab — combine BPT with fitness certifications',
    ],
    honestCaveat:
      'BPT is direct patient work — many hours on your feet, hands-on with patients in pain or recovery. Students who don\'t want close patient contact should look elsewhere. Indian salaries are modest until private practice or international moves; the meaningful work and abroad-mobility are the real attractions.',
    roadmap: [
      {
        title: 'Score 75%+ in 12th PCB',
        titleTa: '+12 PCB-இல் 75%+',
        detail: 'NEET is the main entry route for BPT in TN. Some colleges allow 12th-merit admission.',
        window: 'Now',
        phase: 'now',
      },
      {
        title: 'Join BPT (4 years + 6-month internship)',
        titleTa: 'BPT சேருங்கள் (4 ஆண்டுகள் + 6 மாத பயிற்சி)',
        detail: 'Choose a hospital-attached college if possible — clinical exposure during the degree matters more than the college\'s rank.',
        window: 'Years 1–5',
        phase: 'next',
      },
      {
        title: 'Specialise (MPT) OR work + private practice OR abroad',
        titleTa: 'MPT அல்லது வேலை அல்லது வெளிநாடு',
        detail: 'MPT lifts your earning ceiling sharply. Going abroad (UK/Gulf) multiplies salaries. Private practice takes 3-5 years of clinical experience first.',
        window: 'Years 5–8',
        phase: 'later',
      },
    ],
    ninetyDayPlan: [
      {
        title: 'Register for NEET',
        titleTa: 'NEET பதிவு',
        detail: 'NEET is the main route to TN BPT colleges. Confirm the registration window for the current cycle.',
        priority: 'high',
        link: 'https://neet.nta.nic.in',
      },
      {
        title: 'Shadow a physiotherapist for half a day',
        titleTa: 'உடல் சிகிச்சை நிபுணரை ஒரு நாள் பார்க்கவும்',
        detail: 'Most local physios will let a 12th student observe for half a day. This single experience tells you whether the work suits you better than any brochure can.',
        priority: 'high',
      },
      {
        title: 'Build basic biology + human anatomy fundamentals',
        titleTa: 'அடிப்படை உயிரியல் + உடற்கூற்றியல்',
        detail: 'BPT is anatomy-heavy from semester 1. Strong 12th Biology fundamentals make year 1 dramatically smoother.',
        priority: 'medium',
      },
    ],
    buildNowSkills: [
      {
        skill: 'Human anatomy basics',
        why: 'Anatomy is the foundation of all physio practice. Strong 12th Biology + a head start on anatomy makes year 1 significantly easier.',
        freeResource: 'NCERT Biology — human physiology chapters, free Kenhub anatomy basics',
      },
      {
        skill: 'Physical fitness — your own body awareness',
        why: 'You\'ll teach patients movement and exercise. Being comfortable in your own body matters — many strong physios were athletes or dancers first.',
        freeResource: 'Local gym, free YouTube workout channels (Fitness Blender, Yoga With Adriene)',
      },
      {
        skill: 'Spoken English + Tamil patient communication',
        why: 'Physio is one-on-one work with patients. Confident, kind communication in both languages is the hidden multiplier between an okay physio and a thriving one.',
        freeResource: 'BBC Learning English, local Toastmasters clubs',
      },
    ],
    lastReviewed: '2026-05',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── ALLIED HEALTH FAMILY (split from umbrella, May 2026) ─────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  // The original allied-health-professional umbrella was split into 9 distinct
  // cards corresponding to the official B.Sc Allied Health Sciences course
  // list. Each card has slightly varied skill weights, aversion conflicts and
  // salary expectations reflecting genuine differences between specialisations
  // (Cardiac Tech vs Medical Record Science vs Radiology Imaging are very
  // different careers in practice — they only share the institutional
  // umbrella). All TN-specific numbers are AI estimates and behind the
  // per-career acknowledgment gate.

  // ─── B.SC CARDIAC TECHNOLOGY ───────────────────────────────────────────────
  {
    id: 'cardiac-technologist',
    family: 'healthcare-allied',
    isNiche: true,
    interestTags: ['healthcare'],
    needsCounsellorReview: true,
    aversionConflicts: ['shift_work', 'patient_care'],
    automation: 'human_facing',
    automationNote: 'ECG interpretation increasingly involves AI assistance, but cath-lab procedures, stress tests and patient-side cardiac diagnostics remain firmly human work. Among the most secure allied-health specialisations.',
    title: 'Cardiac Technologist (B.Sc Cardiac Tech)',
    titleTa: 'இதய தொழில்நுட்ப நிபுணர்',
    icon: '❤️',
    color: 'from-rose-500 to-red-600',
    whatIsIt:
      'A 3-4 year B.Sc focused on cardiac procedures — ECG, echocardiography, stress tests, cath lab assistance, pacemaker monitoring, holter studies. Cardiac technologists work alongside cardiologists in hospitals and dedicated cardiac centres.',
    eligibleStreams: ['pcb', 'pcmb'],
    strongGroupCodes: ['208', '204', '203'],
    ugCourses: ['B.Sc Cardiac Technology', 'B.Sc Cardiac Care Technology'],
    entranceExams: ['NEET-UG', 'None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 3-4 year degree (most are 3 years + 1-year internship). Cardiac technologist roles open immediately at graduation. Specialisation via M.Sc. opens senior roles.',
    skillWeights: { mathematics: 4, language: 5, science: 8, creativity: 4, people: 7, physical: 4, digital: 7 },
    priorityFit: { salary: 6, security: 8, balance: 5, abroad: 8, prestige: 6, passion: 7, growth: 7, hometown: 7 },
    competitiveBoardPct: { comfortable: 70, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹3–5 LPA fresh in TN hospitals; ₹4–6.5 LPA at top corporate cardiac centres (Madras Medical Mission, Frontier Lifeline, Apollo cardiac wing).',
      midCareerLPA: 'AI estimate — ₹7–14 LPA with 7+ years experience and specialisation. Abroad mobility (Gulf, UK, Singapore) typically multiplies these significantly.',
      note: 'Among the higher-paid allied-health specialisations because of the cath-lab skill scarcity. Strong demand from corporate cardiac centres.',
    },
    demand: { score: 8, note: 'AI estimate — strong and consistent. Cardiovascular disease is India\'s leading cause of death; cardiac centres are expanding across tier-1 and tier-2 cities.' },
    entryDifficulty: { score: 4, note: 'AI estimate — most cardiac tech programs accept on 12th merit; some top hospitals require NEET. Significantly easier entry than nursing or MBBS.' },
    collegeTiers: [
      { label: 'Top cardiac-specialty colleges (AI estimate)', examples: ['Sri Ramachandra', 'Madras Medical Mission', 'PSG Coimbatore', 'Apollo Allied Health'], cutoffGuide: 'AI estimate — 75%+ in 12th typical; some programs require NEET.', feeRange: 'AI estimate — ₹60K–2.5L / year' },
      { label: 'Government / aided medical colleges (AI estimate)', examples: ['Madras Medical College allied health depts', 'Govt General Hospital cardiac dept programs'], cutoffGuide: 'AI estimate — 70%+ typical; far cheaper.', feeRange: 'AI estimate — ₹15K–60K / year' },
      { label: 'Private specialised colleges (AI estimate)', examples: ['Several TN colleges with cardiac tech tracks'], cutoffGuide: 'AI estimate — widely accessible; 60%+.', feeRange: 'AI estimate — ₹50K–1.5L / year' },
    ],
    costReality: 'AI estimate — a 3-4 year B.Sc Cardiac Technology in TN costs roughly ₹50K–8L total. Government / aided colleges are dramatically more affordable; specialty colleges trend higher.',
    backupOptions: ['M.Sc. Cardiac Technology — senior clinical or academic roles', 'Move abroad (Gulf, UK, Singapore) with bridge exams', 'Cardiac equipment company technical roles', 'Cross-train into general critical care or echocardiography'],
    honestCaveat: 'Cardiac tech work involves real shift rotation and high-acuity patient situations — including emergencies. Students who want predictable hours should look at Medical Record Science or Respiratory Therapy outpatient instead. The reward is genuinely meaningful clinical work, often with stronger pay than other allied-health tracks.',
    roadmap: [
      { title: 'Score 70%+ in 12th PCB', titleTa: '+12 PCB 70%+', detail: 'NEET is required for some top colleges; many accept on 12th merit. Confirm per college.', window: 'Now', phase: 'now' },
      { title: 'Join B.Sc Cardiac Technology + clinical rotations', titleTa: 'B.Sc இதய தொழில்நுட்பம் + பயிற்சி', detail: 'Choose hospital-attached colleges where possible — clinical exposure during the degree matters more than the college name.', window: 'Years 1–4', phase: 'next' },
      { title: 'M.Sc. specialisation or move abroad', titleTa: 'M.Sc. அல்லது வெளிநாடு', detail: 'M.Sc. for senior clinical / academic roles. Gulf and UK bridge exams unlock substantially higher salaries.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Confirm NEET vs direct-admission for your target colleges', titleTa: 'NEET அல்லது நேரடி சேர்க்கை', detail: 'Some cardiac tech programs require NEET; others accept 12th merit. Confirm before committing.', priority: 'high' },
      { title: 'Visit a cardiac department — even half a day', titleTa: 'இதய துறை பார்வை', detail: 'Watching an ECG room or stress-test setup at a local hospital tells you whether the work suits you.', priority: 'high' },
      { title: 'Strengthen 12th Biology + basic Physics', titleTa: 'உயிரியல் + பௌதீகம் வலுப்படுத்துதல்', detail: 'Cardiac physiology + the physics of ECG/echo are year-1 essentials. Strong fundamentals make every semester smoother.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Strong Biology — especially cardiovascular physiology', why: 'The foundation of all cardiac tech work. Strong 12th Biology + a head start on cardiac chapters makes year 1 dramatically easier.', freeResource: 'NCERT Biology — circulation chapters, free Kenhub cardiology basics' },
      { skill: 'Steady hands and patience', why: 'Cath-lab and ECG work rewards careful, methodical execution. Hobbies needing precision build the right habit.', freeResource: 'Any precision hobby — drawing, electronics, embroidery' },
      { skill: 'Spoken English + Tamil patient communication', why: 'Cardiac patients are often elderly and anxious. Calm bilingual reassurance is a real career asset.', freeResource: 'BBC Learning English, local Toastmasters clubs' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.SC ACCIDENT & EMERGENCY CARE TECHNOLOGY ─────────────────────────────
  {
    id: 'ae-care-technologist',
    family: 'healthcare-allied',
    isNiche: true,
    interestTags: ['healthcare'],
    needsCounsellorReview: true,
    aversionConflicts: ['shift_work', 'patient_care'],
    automation: 'human_facing',
    automationNote: 'Emergency response work is inherently human — triage decisions, trauma stabilisation, and split-second patient assessment cannot be automated. AI assists with documentation, never with the call.',
    title: 'A&E Care Technologist (B.Sc A&E)',
    titleTa: 'விபத்து மற்றும் அவசர சிகிச்சை தொழில்நுட்ப நிபுணர்',
    icon: '🚑',
    color: 'from-orange-500 to-red-600',
    whatIsIt:
      'A 3-4 year B.Sc preparing graduates for hospital emergency rooms, trauma centres and ambulance-side critical response — triage, basic life support, trauma stabilisation, emergency procedures. High-stakes, high-stress, high-meaning work.',
    eligibleStreams: ['pcb', 'pcmb'],
    strongGroupCodes: ['208', '204', '203'],
    ugCourses: ['B.Sc Accident & Emergency Care Technology', 'B.Sc Emergency Medical Technology'],
    entranceExams: ['NEET-UG', 'None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 3-4 year degree (typically 3 + 1-year internship). A&E tech roles open immediately at graduation. ER expansion in TN means strong placement.',
    skillWeights: { mathematics: 4, language: 6, science: 7, creativity: 4, people: 8, physical: 6, digital: 6 },
    priorityFit: { salary: 5, security: 7, balance: 4, abroad: 7, prestige: 6, passion: 8, growth: 6, hometown: 8 },
    competitiveBoardPct: { comfortable: 70, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2.5–5 LPA fresh in TN hospital ERs; ₹4–6 LPA at top corporate ER departments.',
      midCareerLPA: 'AI estimate — ₹6–12 LPA with 7+ years and senior ER tech specialisation. Abroad opportunities (Gulf, UK) can multiply earnings.',
      note: 'A&E pay sits in the middle of allied-health salaries but the work-experience compounds quickly — senior ER techs are deeply valued by hospitals.',
    },
    demand: { score: 8, note: 'AI estimate — high demand. India\'s emergency-medicine infrastructure is expanding rapidly; trained A&E techs are a chronic shortage in tier-2 cities.' },
    entryDifficulty: { score: 3, note: 'AI estimate — most A&E programs accept on 12th merit. Direct admission widely available.' },
    collegeTiers: [
      { label: 'Top emergency-medicine programs (AI estimate)', examples: ['Sri Ramachandra ER track', 'Madras Medical Mission', 'Apollo Allied Health'], cutoffGuide: 'AI estimate — 70%+ typical; few require NEET.', feeRange: 'AI estimate — ₹50K–2L / year' },
      { label: 'Government / aided programs (AI estimate)', examples: ['Madras Medical College', 'Govt General Hospital trauma centres'], cutoffGuide: 'AI estimate — 65%+ typical.', feeRange: 'AI estimate — ₹15K–60K / year' },
      { label: 'Private colleges (AI estimate)', examples: ['Several TN colleges with A&E tracks'], cutoffGuide: 'AI estimate — widely accessible; 60%+.', feeRange: 'AI estimate — ₹40K–1.2L / year' },
    ],
    costReality: 'AI estimate — a 3-4 year B.Sc A&E in TN costs roughly ₹50K–6L total. Government / aided are dramatically cheaper.',
    backupOptions: ['M.Sc. Emergency Medicine Tech — senior roles', 'Paramedic / ambulance services roles', 'Cross-train into Critical Care Tech', 'Move abroad — strong demand in Gulf and UK'],
    honestCaveat: 'A&E work is genuinely high-stress — trauma, death, families in crisis, fast-paced decisions. The work changes you. Students who want predictable, low-stress hospital roles should look at Medical Record Science or outpatient diagnostics instead. For those drawn to it, the work is deeply meaningful.',
    roadmap: [
      { title: 'Score 65%+ in 12th PCB', titleTa: '+12 PCB 65%+', detail: 'Most A&E programs are direct admission on 12th marks.', window: 'Now', phase: 'now' },
      { title: 'Join B.Sc A&E + clinical rotations in ER', titleTa: 'B.Sc A&E + ER பயிற்சி', detail: 'Hospital-attached colleges with active emergency departments are dramatically better than purely classroom programs.', window: 'Years 1–4', phase: 'next' },
      { title: 'M.Sc. specialisation OR cross into Critical Care', titleTa: 'M.Sc. அல்லது தீவிர சிகிச்சை', detail: 'Senior ER tech roles or pivot into ICU/critical care. Abroad mobility is real and lucrative.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Visit a busy hospital ER — even half a day', titleTa: 'மருத்துவமனை ER பார்வை', detail: 'A&E work is unlike anything you have seen. One observation visit tells you more than 100 pages of brochure.', priority: 'high' },
      { title: 'Learn basic first-aid and CPR formally', titleTa: 'அடிப்படை முதலுதவி + CPR', detail: 'Indian Red Cross runs short certified courses. Real preparation, not abstract reading.', priority: 'high' },
      { title: 'Strengthen Biology + basic Physics', titleTa: 'உயிரியல் + பௌதீகம்', detail: 'Year 1 leans on human physiology and the physics of pulse, BP, ventilation. Strong fundamentals matter.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Basic life support (BLS) + CPR — formal certification', why: 'Foundational skills for any ER role. Walking into year 1 already certified is a real advantage.', freeResource: 'Indian Red Cross, St. John\'s Ambulance — short certified courses' },
      { skill: 'Composure under pressure', why: 'A&E rewards people who stay steady when others panic. Build this deliberately — sports under pressure, public speaking, exam practice.', freeResource: 'Sports clubs, debate societies, mock-exam discipline' },
      { skill: 'Spoken English + Tamil — clear, calm communication', why: 'ER patients and families are anxious. Calm, clear bilingual communication is the single most career-defining soft skill.', freeResource: 'BBC Learning English, Toastmasters' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.SC OPERATION THEATRE & ANAESTHESIA TECHNOLOGY ───────────────────────
  {
    id: 'ot-anaesthesia-technologist',
    family: 'healthcare-allied',
    isNiche: true,
    interestTags: ['healthcare'],
    needsCounsellorReview: true,
    aversionConflicts: ['shift_work'],
    automation: 'human_facing',
    automationNote: 'OT setup, instrument preparation and anaesthesia monitoring all involve precise, accountable human work alongside surgeons and anaesthetists. AI assists with record-keeping; the patient-side work remains firmly human.',
    title: 'OT & Anaesthesia Technologist (B.Sc OT)',
    titleTa: 'அறுவை சிகிச்சை மற்றும் மயக்க மருந்து தொழில்நுட்ப நிபுணர்',
    icon: '🩺',
    color: 'from-teal-500 to-cyan-600',
    whatIsIt:
      'A 3-4 year B.Sc training graduates as the technical partner to surgeons and anaesthetists — OT setup, instrument sterilisation, anaesthesia equipment management, patient monitoring during surgery, post-operative handover.',
    eligibleStreams: ['pcb', 'pcmb'],
    strongGroupCodes: ['208', '204', '203'],
    ugCourses: ['B.Sc Operation Theatre & Anaesthesia Technology', 'B.Sc OT Technology'],
    entranceExams: ['NEET-UG', 'None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 3-4 year degree (3 + 1-year internship typical). OT/Anaesthesia tech roles open at graduation. Strong placement at tier-1 hospitals due to mandatory OT staffing.',
    skillWeights: { mathematics: 4, language: 5, science: 8, creativity: 3, people: 4, physical: 5, digital: 7 },
    priorityFit: { salary: 6, security: 9, balance: 6, abroad: 7, prestige: 6, passion: 6, growth: 6, hometown: 8 },
    competitiveBoardPct: { comfortable: 70, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2.5–4.5 LPA fresh in TN hospitals; ₹4–6 LPA at top corporate hospitals with active surgery volumes.',
      midCareerLPA: 'AI estimate — ₹6–12 LPA with 7+ years. Senior OT supervisors at large hospitals can exceed. Gulf hospitals pay significantly more.',
      note: 'Steady, secure salaries — every hospital needs OT staff and the role is hard to outsource or automate. Less patient-facing than nursing.',
    },
    demand: { score: 8, note: 'AI estimate — consistent demand. Every operating theatre needs trained OT staff; the shortage in tier-2 / tier-3 TN cities is real.' },
    entryDifficulty: { score: 3, note: 'AI estimate — most programs accept on 12th merit; some top colleges require NEET. Direct admission widely available.' },
    collegeTiers: [
      { label: 'Top hospital-attached colleges (AI estimate)', examples: ['Sri Ramachandra', 'Madras Medical Mission', 'PSG Coimbatore', 'Apollo Allied Health'], cutoffGuide: 'AI estimate — 70%+ in 12th typical.', feeRange: 'AI estimate — ₹50K–2L / year' },
      { label: 'Government / aided programs (AI estimate)', examples: ['Madras Medical College', 'Government Stanley Medical College'], cutoffGuide: 'AI estimate — 65%+ typical.', feeRange: 'AI estimate — ₹15K–55K / year' },
      { label: 'Private colleges (AI estimate)', examples: ['Several TN colleges with OT tech tracks'], cutoffGuide: 'AI estimate — widely accessible; 60%+.', feeRange: 'AI estimate — ₹45K–1.3L / year' },
    ],
    costReality: 'AI estimate — a 3-4 year B.Sc OT in TN costs roughly ₹45K–6L total. Government colleges are dramatically cheaper.',
    backupOptions: ['M.Sc. OT Technology — supervisor / faculty roles', 'Move abroad — strong demand in Gulf, UK', 'Cross-train into Anaesthesia-specific senior roles', 'Hospital administration after 5+ years'],
    honestCaveat: 'OT work involves shift rotation including on-call duties for emergency surgeries. Students who specifically want predictable 9-5 hours should look elsewhere. The reward is real — surgeons remember the OT techs who do their job well, and senior roles are well-paid and respected.',
    roadmap: [
      { title: 'Score 65%+ in 12th PCB', titleTa: '+12 PCB 65%+', detail: 'Most OT programs are direct admission. Some top colleges require NEET.', window: 'Now', phase: 'now' },
      { title: 'Join B.Sc OT + active OT rotations', titleTa: 'B.Sc OT + பயிற்சி', detail: 'Hospital-attached colleges where OT exposure during the degree is real, not just theoretical.', window: 'Years 1–4', phase: 'next' },
      { title: 'M.Sc. or senior OT supervisor track', titleTa: 'M.Sc. அல்லது மேற்பார்வை', detail: 'Senior OT tech roles or M.Sc. for academic / faculty paths. Abroad mobility well established.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Visit a hospital OT department if possible', titleTa: 'OT துறை பார்வை', detail: 'Even a short observation visit clarifies what the work day-to-day involves. Many local hospitals will allow this for prospective students.', priority: 'high' },
      { title: 'Strengthen Biology — anatomy and surgical-relevant chapters', titleTa: 'உடற்கூற்றியல் வலுப்படுத்துதல்', detail: 'OT work is anatomy-intensive. Strong 12th Biology with an early start on anatomy basics makes year 1 smoother.', priority: 'high' },
      { title: 'Build patience and steady hands', titleTa: 'பொறுமை + உறுதியான கைகள்', detail: 'OT work rewards careful, methodical execution. Hobbies needing precision are real training.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Human anatomy fundamentals', why: 'The foundation of all OT work. A head start on anatomy in 12th makes year 1 dramatically easier.', freeResource: 'NCERT Biology, free Kenhub anatomy basics' },
      { skill: 'Steady hands and methodical precision', why: 'OT work has no room for hurried mistakes. Practise being unhurried with detailed tasks.', freeResource: 'Precision hobbies — drawing, model-building, embroidery, electronics' },
      { skill: 'Reading hospital workflow basics', why: 'Understanding how operating theatres run end-to-end before joining is a real advantage.', freeResource: 'YouTube — surgical workflow / OT setup tutorials by hospital channels' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.SC DIALYSIS TECHNOLOGY ──────────────────────────────────────────────
  {
    id: 'dialysis-technologist',
    family: 'healthcare-allied',
    isNiche: true,
    interestTags: ['healthcare'],
    needsCounsellorReview: true,
    aversionConflicts: ['shift_work', 'patient_care'],
    automation: 'human_facing',
    automationNote: 'Dialysis machines automate the procedure mechanics, but patient monitoring, machine setup, sterile technique and patient relationship management remain inherently human. Chronic kidney disease is rising — demand is structurally growing.',
    title: 'Dialysis Technologist (B.Sc Dialysis Tech)',
    titleTa: 'டயாலிசிஸ் தொழில்நுட்ப நிபுணர்',
    icon: '💧',
    color: 'from-sky-500 to-blue-600',
    whatIsIt:
      'A 3-4 year B.Sc preparing graduates to run haemodialysis and peritoneal dialysis procedures — machine setup, patient vital monitoring during sessions, troubleshooting, sterile technique. Dialysis techs work in hospital dialysis units and dedicated dialysis centres.',
    eligibleStreams: ['pcb', 'pcmb'],
    strongGroupCodes: ['208', '204', '203'],
    ugCourses: ['B.Sc Dialysis Technology', 'B.Sc Renal Dialysis Technology'],
    entranceExams: ['NEET-UG', 'None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 3-4 year degree. Dialysis tech roles open at graduation. Demand is strong and consistent because chronic patients need lifelong sessions.',
    skillWeights: { mathematics: 4, language: 5, science: 7, creativity: 3, people: 7, physical: 4, digital: 6 },
    priorityFit: { salary: 5, security: 8, balance: 6, abroad: 7, prestige: 5, passion: 7, growth: 6, hometown: 8 },
    competitiveBoardPct: { comfortable: 65, stretch: 55 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2–4 LPA fresh in TN dialysis centres and hospitals; ₹3–5 LPA at top corporate hospitals.',
      midCareerLPA: 'AI estimate — ₹5–10 LPA with 7+ years and senior tech specialisation. Abroad (Gulf, UK) significantly higher.',
      note: 'Modest but very steady salaries. The role offers strong job security — every dialysis unit needs trained techs and the patient base is structurally growing.',
    },
    demand: { score: 8, note: 'AI estimate — high and growing. Chronic kidney disease prevalence in India is rising sharply; dialysis centres are expanding even in tier-3 cities.' },
    entryDifficulty: { score: 2, note: 'AI estimate — most programs are direct admission. Among the most accessible allied-health tracks.' },
    collegeTiers: [
      { label: 'Top hospital-attached colleges (AI estimate)', examples: ['Sri Ramachandra', 'Madras Medical Mission', 'Apollo Allied Health'], cutoffGuide: 'AI estimate — 65%+ in 12th typical.', feeRange: 'AI estimate — ₹40K–1.5L / year' },
      { label: 'Government / aided programs (AI estimate)', examples: ['Madras Medical College', 'Government General Hospital programs'], cutoffGuide: 'AI estimate — 60%+ typical.', feeRange: 'AI estimate — ₹10K–50K / year' },
      { label: 'Private dialysis-focused colleges (AI estimate)', examples: ['Several TN colleges with dialysis tracks'], cutoffGuide: 'AI estimate — widely accessible.', feeRange: 'AI estimate — ₹35K–1L / year' },
    ],
    costReality: 'AI estimate — a 3-4 year B.Sc Dialysis Tech in TN costs roughly ₹30K–4.5L total. Government colleges are dramatically cheaper.',
    backupOptions: ['M.Sc. Dialysis Tech / Renal Technology', 'Senior dialysis centre supervisor roles', 'Move abroad — Gulf countries hire actively', 'Cross-train into Critical Care or Cardiac Tech'],
    honestCaveat: 'Dialysis tech work involves close relationships with chronic patients — many sessions weekly, year after year. Some techs find this deeply meaningful; others find the emotional load draining. Students who form attachments easily should think honestly about this. Shift work and weekend rotations are standard.',
    roadmap: [
      { title: 'Score 60%+ in 12th PCB', titleTa: '+12 PCB 60%+', detail: 'Among the most accessible allied-health tracks. Direct admission widely available.', window: 'Now', phase: 'now' },
      { title: 'Join B.Sc Dialysis Tech + clinical rotations', titleTa: 'B.Sc டயாலிசிஸ் + பயிற்சி', detail: 'Hospital-attached colleges with active dialysis units are dramatically better than purely classroom programs.', window: 'Years 1–4', phase: 'next' },
      { title: 'M.Sc. or senior tech / supervisor role', titleTa: 'M.Sc. அல்லது மேற்பார்வை', detail: 'Career path opens via senior supervisor roles or M.Sc. for academic / faculty work. Abroad mobility is real.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Visit a dialysis unit if possible', titleTa: 'டயாலிசிஸ் மையம் பார்வை', detail: 'Watching one full session in a local centre gives more clarity than any brochure. Many centres allow prospective students to observe.', priority: 'high' },
      { title: 'Strengthen Biology — renal physiology specifically', titleTa: 'சிறுநீரக உடலியல் வலுப்படுத்துதல்', detail: 'Year 1 leans on kidney function. A 12th-Biology head start on the renal chapters compounds through every semester.', priority: 'high' },
      { title: 'Think honestly about chronic-patient relationships', titleTa: 'நோயாளி உறவுகள் பற்றி யோசிக்கவும்', detail: 'Dialysis techs see the same patients for years. Reflect on whether this kind of long-term clinical relationship suits your temperament.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Biology — kidney function specifically', why: 'The renal system is the technical foundation of all dialysis work. Strong 12th Biology on this topic compounds.', freeResource: 'NCERT Biology — excretion chapters, free Kenhub renal physiology' },
      { skill: 'Empathy + sustained patience', why: 'Dialysis patients return for years. The technician who treats them with steady warmth across hundreds of sessions builds career-defining trust.', freeResource: 'Volunteer with elderly-care organisations for short stints' },
      { skill: 'Spoken English + Tamil patient communication', why: 'Bilingual reassurance during a difficult procedure is a real career advantage.', freeResource: 'BBC Learning English, Toastmasters' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.SC PHYSICIAN ASSISTANT ──────────────────────────────────────────────
  {
    id: 'physician-assistant',
    family: 'healthcare-allied',
    isNiche: true,
    interestTags: ['healthcare', 'research'],
    needsCounsellorReview: true,
    aversionConflicts: ['patient_care', 'high_competition'],
    automation: 'high_human_judgment',
    automationNote: 'Among the most automation-resilient allied-health roles. PAs do clinical assessment, history-taking and supervised diagnosis — work that requires human judgement under physician oversight. The role is expanding rapidly in India.',
    title: 'Physician Assistant (B.Sc PA)',
    titleTa: 'மருத்துவ உதவியாளர்',
    icon: '🩺',
    color: 'from-emerald-500 to-green-600',
    whatIsIt:
      'A 3-4 year B.Sc training graduates as the closest non-doctor clinical role — history-taking, basic examination, diagnostic assistance, treatment planning support under physician supervision, certain procedures with delegation. The PA role is rapidly expanding in corporate Indian hospitals.',
    eligibleStreams: ['pcb', 'pcmb'],
    strongGroupCodes: ['208', '204', '203'],
    ugCourses: ['B.Sc Physician Assistant'],
    entranceExams: ['NEET-UG', 'None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 3-4 year degree + supervised clinical practice. PA roles in TN corporate hospitals are growing rapidly. Senior PA roles typically require additional certification.',
    skillWeights: { mathematics: 4, language: 7, science: 9, creativity: 5, people: 8, physical: 3, digital: 6 },
    priorityFit: { salary: 7, security: 8, balance: 6, abroad: 9, prestige: 7, passion: 8, growth: 8, hometown: 6 },
    competitiveBoardPct: { comfortable: 75, stretch: 65 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹3–6 LPA fresh in TN corporate hospitals; ₹5–8 LPA at top tier-1 hospitals for strong candidates.',
      midCareerLPA: 'AI estimate — ₹10–18 LPA with 7+ years and specialisation. Among the highest-earning allied-health tracks in India.',
      note: 'The PA role pays among the best of all allied-health tracks because the clinical work is closer to junior doctor scope. Strong international mobility, especially to the US where the PA profession is well-established.',
    },
    demand: { score: 7, note: 'AI estimate — strong and growing in corporate hospitals; smaller TN-wide volume than nursing because the role is newer. Tier-1 corporate hospitals are the strongest employers.' },
    entryDifficulty: { score: 5, note: 'AI estimate — many top PA programs require NEET; some accept high 12th marks. More selective entry than most allied-health tracks.' },
    collegeTiers: [
      { label: 'Top PA programs (AI estimate)', examples: ['Sri Ramachandra (one of the strongest PA programs in India)', 'Madras Medical Mission', 'PSG Coimbatore'], cutoffGuide: 'AI estimate — 80%+ in 12th OR NEET 250+.', feeRange: 'AI estimate — ₹1L–3L / year' },
      { label: 'Strong private programs (AI estimate)', examples: ['Several large TN private medical colleges'], cutoffGuide: 'AI estimate — 70–80% typical.', feeRange: 'AI estimate — ₹80K–2L / year' },
      { label: 'Other colleges (AI estimate)', examples: ['Limited — PA programs are concentrated in tier-1 colleges'], cutoffGuide: 'AI estimate — varies; 65%+ where available.', feeRange: 'AI estimate — ₹70K–1.8L / year' },
    ],
    costReality: 'AI estimate — a 3-4 year PA degree in TN costs roughly ₹3L–12L total. Among the more expensive allied-health tracks but the ROI is also among the best.',
    backupOptions: ['M.Sc. Physician Assistant Studies — senior roles', 'Move abroad (US PA bridge exams especially)', 'Specialise into surgery PA, cardiology PA, etc.', 'Hospital administration after 5+ years'],
    honestCaveat: 'PA work IS clinical patient care — examination, diagnosis support, treatment planning. Students who want a hospital role without close patient contact should look at Medical Record Science or Radiology. The reward: among the highest pay and abroad-mobility of any allied-health track, and genuinely autonomous clinical work under physician oversight.',
    roadmap: [
      { title: 'Score 75%+ in 12th PCB', titleTa: '+12 PCB 75%+', detail: 'Top PA programs are selective. Strong 12th marks AND possibly NEET matter.', window: 'Now', phase: 'now' },
      { title: 'Join B.Sc PA at a hospital-attached college', titleTa: 'B.Sc PA + மருத்துவமனை பயிற்சி', detail: 'Hospital-attached colleges with active clinical rotations are essential — purely classroom programs don\'t produce strong PAs.', window: 'Years 1–4', phase: 'next' },
      { title: 'M.Sc. PA OR move abroad OR specialise', titleTa: 'M.Sc. அல்லது வெளிநாடு', detail: 'M.Sc. for senior clinical roles; US PA bridge exams unlock substantial international mobility.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Confirm NEET requirement for your target colleges', titleTa: 'NEET தேவையா என உறுதிசெய்', detail: 'Top PA programs often require NEET; some accept high 12th marks. Confirm before committing your prep direction.', priority: 'high', link: 'https://neet.nta.nic.in' },
      { title: 'Shadow a physician assistant if possible', titleTa: 'PA-வை பின்தொடர்ந்து பாருங்கள்', detail: 'The PA role is newer in India; many students don\'t fully understand what PAs do. A day of shadowing is invaluable.', priority: 'high' },
      { title: 'Build strong 12th Biology + general communication', titleTa: 'உயிரியல் + தொடர்பாடல்', detail: 'PA work is medicine + people. Strong fundamentals in both pay off through every semester.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Strong Biology — physiology and pathology basics', why: 'PA work is closer to medicine than other allied-health tracks. Strong Biology in 12th is the foundation everything builds on.', freeResource: 'NCERT Biology, free Khan Academy medicine basics' },
      { skill: 'Spoken English + Tamil — fluent, professional', why: 'PAs talk with patients, families and doctors all day. Confident bilingual communication is the most career-defining soft skill.', freeResource: 'BBC Learning English, Toastmasters, daily English news' },
      { skill: 'Reading current medical news', why: 'Builds clinical intuition early. Familiarity with how diseases present and how treatments are evolving compounds through the degree.', freeResource: 'The Lancet abstracts, NPR Health podcasts, NEJM blog' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.SC RESPIRATORY THERAPY ──────────────────────────────────────────────
  {
    id: 'respiratory-therapist',
    family: 'healthcare-allied',
    isNiche: true,
    interestTags: ['healthcare'],
    needsCounsellorReview: true,
    aversionConflicts: ['shift_work', 'patient_care'],
    automation: 'human_facing',
    automationNote: 'Ventilators run on machines; the trained respiratory therapist who configures them, monitors patients, troubleshoots crises and weans patients off support is irreplaceable. India\'s post-pandemic appreciation of respiratory medicine has accelerated demand.',
    title: 'Respiratory Therapist (B.Sc Resp. Therapy)',
    titleTa: 'சுவாச சிகிச்சை நிபுணர்',
    icon: '🫁',
    color: 'from-cyan-500 to-blue-500',
    whatIsIt:
      'A 3-4 year B.Sc preparing graduates to manage breathing-impaired patients — ICU ventilator management, oxygen therapy, pulmonary rehabilitation, sleep medicine support, neonatal respiratory care. ICUs, pulmonology departments and sleep labs are the main employers.',
    eligibleStreams: ['pcb', 'pcmb'],
    strongGroupCodes: ['208', '204', '203'],
    ugCourses: ['B.Sc Respiratory Therapy', 'B.Sc Cardio-Respiratory Care'],
    entranceExams: ['NEET-UG', 'None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 3-4 year degree (3 + 1-year internship typical). RT roles open at graduation. Post-pandemic ICU expansion has boosted demand significantly.',
    skillWeights: { mathematics: 4, language: 6, science: 8, creativity: 4, people: 7, physical: 4, digital: 7 },
    priorityFit: { salary: 6, security: 8, balance: 5, abroad: 8, prestige: 6, passion: 7, growth: 7, hometown: 7 },
    competitiveBoardPct: { comfortable: 70, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2.5–5 LPA fresh in TN hospitals; ₹4–6 LPA at top corporate hospital ICUs.',
      midCareerLPA: 'AI estimate — ₹7–13 LPA with 7+ years experience and senior RT specialisation. Gulf and UK opportunities multiply these substantially.',
      note: 'Strong abroad mobility — US and UK have well-established RT professions where Indian graduates can transition with bridge exams. Domestic salaries grew sharply post-pandemic.',
    },
    demand: { score: 8, note: 'AI estimate — strong and growing. Every modern ICU needs dedicated RT staff; the role is structurally underbuilt in TN tier-2 hospitals.' },
    entryDifficulty: { score: 3, note: 'AI estimate — most programs accept on 12th merit. Some top hospitals require NEET. Direct admission widely available.' },
    collegeTiers: [
      { label: 'Top hospital-attached programs (AI estimate)', examples: ['Sri Ramachandra', 'Madras Medical Mission', 'Apollo Allied Health'], cutoffGuide: 'AI estimate — 70%+ in 12th typical.', feeRange: 'AI estimate — ₹60K–2L / year' },
      { label: 'Government / aided programs (AI estimate)', examples: ['Madras Medical College allied health', 'Government chest hospital programs'], cutoffGuide: 'AI estimate — 65%+ typical.', feeRange: 'AI estimate — ₹15K–55K / year' },
      { label: 'Private colleges (AI estimate)', examples: ['Several TN colleges with RT tracks'], cutoffGuide: 'AI estimate — widely accessible; 60%+.', feeRange: 'AI estimate — ₹50K–1.4L / year' },
    ],
    costReality: 'AI estimate — a 3-4 year B.Sc RT in TN costs roughly ₹50K–7L total. Government / aided are dramatically cheaper.',
    backupOptions: ['M.Sc. Respiratory Therapy', 'Move abroad (US, UK, Gulf — well-established RT profession)', 'Sleep medicine specialisation', 'Cross-train into Critical Care Tech'],
    honestCaveat: 'RT work is ICU work — high-acuity patients, including end-of-life situations. Shift rotation including nights is standard. Students looking for predictable hours should look at outpatient pulmonology assistance or Medical Record Science instead. The reward is genuinely life-saving clinical work and strong international mobility.',
    roadmap: [
      { title: 'Score 65%+ in 12th PCB', titleTa: '+12 PCB 65%+', detail: 'Most RT programs are direct admission on 12th marks. Some top colleges require NEET.', window: 'Now', phase: 'now' },
      { title: 'Join B.Sc RT + ICU rotations', titleTa: 'B.Sc RT + ICU பயிற்சி', detail: 'Hospital-attached colleges with active ICUs are dramatically better than purely classroom programs.', window: 'Years 1–4', phase: 'next' },
      { title: 'M.Sc. RT or move abroad', titleTa: 'M.Sc. அல்லது வெளிநாடு', detail: 'M.Sc. for senior clinical / academic roles; US/UK bridge exams unlock substantial international mobility.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Visit an ICU if possible', titleTa: 'ICU பார்வை', detail: 'RT work happens primarily in ICU. One observation visit clarifies the nature of the work better than any brochure.', priority: 'high' },
      { title: 'Strengthen Biology — respiratory physiology specifically', titleTa: 'சுவாச உடலியல்', detail: 'The respiratory chapters in 12th Biology are the foundation. A head start here compounds.', priority: 'high' },
      { title: 'Build emotional resilience deliberately', titleTa: 'மன வலிமை வளர்த்துக்கொள்ளுங்கள்', detail: 'ICU work involves patient suffering and sometimes loss. Build resilience through honest reflection and conversation with healthcare professionals.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Biology — respiratory + cardiovascular physiology', why: 'RT work integrates lung and heart function. Strong 12th fundamentals are the foundation.', freeResource: 'NCERT Biology, free Kenhub respiratory physiology' },
      { skill: 'Emotional resilience + professional composure', why: 'ICU work demands steady presence in difficult situations. Build deliberately through honest exposure and reflection.', freeResource: 'Talk to working healthcare professionals; reflective journaling' },
      { skill: 'Spoken English + Tamil — calm patient communication', why: 'RT work involves anxious patients and worried families. Calm bilingual reassurance is a real career asset.', freeResource: 'BBC Learning English, Toastmasters' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.SC MEDICAL RECORD SCIENCE ───────────────────────────────────────────
  {
    id: 'medical-record-scientist',
    family: 'healthcare-allied',
    isNiche: true,
    interestTags: ['healthcare', 'tech'],
    needsCounsellorReview: true,
    aversionConflicts: [],
    automation: 'ai_augmented',
    automationNote: 'Medical coding and records management are increasingly AI-assisted, but compliance review, clinical documentation improvement and health-informatics judgement remain firmly human. The role is also one of the few clinic-domain careers with predictable hours and no patient contact.',
    title: 'Medical Record Scientist (B.Sc Med. Records)',
    titleTa: 'மருத்துவ பதிவுகள் விஞ்ஞானி',
    icon: '📋',
    color: 'from-slate-500 to-gray-600',
    whatIsIt:
      'A 3-4 year B.Sc training graduates in health information management — medical coding (ICD-10, CPT), clinical documentation, healthcare data analytics, compliance, and hospital information systems. Predominantly desk-based work in hospital records departments, insurance, and increasingly health-tech companies.',
    eligibleStreams: ['pcb', 'pcmb'],
    strongGroupCodes: ['208', '204', '203'],
    ugCourses: ['B.Sc Medical Record Science', 'B.Sc Health Information Management'],
    entranceExams: ['None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 3-4 year degree. Roles in hospital records departments, insurance companies and US-facing medical coding firms open at graduation. Coding certifications (CPC, CCS) accelerate earnings.',
    skillWeights: { mathematics: 4, language: 7, science: 5, creativity: 3, people: 4, physical: 1, digital: 8 },
    priorityFit: { salary: 5, security: 8, balance: 9, abroad: 7, prestige: 4, passion: 5, growth: 6, hometown: 8 },
    competitiveBoardPct: { comfortable: 65, stretch: 55 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2–4 LPA fresh in TN hospital records; ₹3–6 LPA at medical coding firms serving US clients (very common in Chennai).',
      midCareerLPA: 'AI estimate — ₹6–14 LPA with 7+ years and CPC / CCS certifications. US-facing roles pay particularly well.',
      note: 'Among the lowest stress and most predictable-hour allied-health careers. US-facing medical coding (very common in Chennai) pays among the best because of the dollar-rupee differential.',
    },
    demand: { score: 8, note: 'AI estimate — strong and structural. Every hospital needs records management; US-facing medical coding firms in Chennai hire constantly. Health informatics is a growing field.' },
    entryDifficulty: { score: 2, note: 'AI estimate — direct admission widely available; among the most accessible allied-health tracks.' },
    collegeTiers: [
      { label: 'Top colleges (AI estimate)', examples: ['Sri Ramachandra', 'Madras Medical Mission', 'Apollo Allied Health', 'Manipal'], cutoffGuide: 'AI estimate — 65%+ in 12th typical.', feeRange: 'AI estimate — ₹40K–1.5L / year' },
      { label: 'Government / aided programs (AI estimate)', examples: ['Madras Medical College allied health depts'], cutoffGuide: 'AI estimate — 60%+ typical.', feeRange: 'AI estimate — ₹10K–45K / year' },
      { label: 'Private colleges (AI estimate)', examples: ['Several TN colleges with health information management tracks'], cutoffGuide: 'AI estimate — widely accessible.', feeRange: 'AI estimate — ₹35K–1L / year' },
    ],
    costReality: 'AI estimate — a 3-4 year B.Sc Med. Records in TN costs roughly ₹30K–5L total. Government / aided are dramatically cheaper. The CPC/CCS certifications add ~₹30-50K.',
    backupOptions: ['CPC (Certified Professional Coder) — boosts earnings sharply', 'CCS (Certified Coding Specialist)', 'M.Sc. Health Information Management', 'Hospital administration roles', 'Health-tech / electronic health record companies'],
    honestCaveat: 'The role is unglamorous compared to clinical allied-health tracks — no white coat, no patient stories. But it offers what almost no other healthcare career does: predictable hours, no shift work, no patient contact, steady demand, and good earnings potential through US-facing coding work. The trade-off is meaningful for the right student.',
    roadmap: [
      { title: 'Score 60%+ in 12th PCB', titleTa: '+12 PCB 60%+', detail: 'Among the most accessible allied-health tracks. Direct admission widely available.', window: 'Now', phase: 'now' },
      { title: 'Join B.Sc Med. Records + start CPC prep in year 3', titleTa: 'B.Sc + CPC தயாரிப்பு', detail: 'The CPC certification dramatically lifts entry-level earnings. Start preparation in semester 5.', window: 'Years 1–3', phase: 'next' },
      { title: 'Clear CPC + first medical coding role', titleTa: 'CPC + வேலை', detail: 'Chennai has many US-facing medical coding firms. CPC + good English typically lands ₹4-6 LPA fresh roles.', window: 'Years 3–5', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Confirm the program teaches modern coding standards', titleTa: 'நவீன கோடிங் தரநிலை', detail: 'Programs that still teach only ICD-9 or outdated standards aren\'t worth joining. Confirm ICD-10 and modern EHR exposure.', priority: 'high' },
      { title: 'Begin English fluency work', titleTa: 'ஆங்கில திறன்', detail: 'US-facing medical coding firms hire heavily on English clarity. Daily practice from now compounds over 3 years.', priority: 'high' },
      { title: 'Try a free introductory coding course', titleTa: 'அறிமுக கோர்ஸ்', detail: 'AAPC / AHIMA both offer free introductory content. A few hours clarifies whether the work suits you.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Strong English — particularly written', why: 'US-facing medical coding requires precise English reading and clear written communication. Daily practice from year 1 separates ₹3 LPA and ₹6 LPA candidates.', freeResource: 'BBC Learning English, daily English-language reading' },
      { skill: 'Attention to detail + patience', why: 'Medical coding rewards methodical, accurate work. Practise being unhurried with detailed tasks.', freeResource: 'Any precision hobby — checking spreadsheets, careful editing, methodical reading' },
      { skill: 'Comfort with computers and data', why: 'Modern records work is almost entirely on screens. Comfort with spreadsheets, EHR systems, and data tools is essential.', freeResource: 'Free Excel courses, free EHR demo systems' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.SC CRITICAL CARE TECHNOLOGY ─────────────────────────────────────────
  {
    id: 'critical-care-technologist',
    family: 'healthcare-allied',
    isNiche: true,
    interestTags: ['healthcare'],
    needsCounsellorReview: true,
    aversionConflicts: ['shift_work', 'patient_care'],
    automation: 'high_human_judgment',
    automationNote: 'Critical care is among the most automation-resilient healthcare roles. ICU monitoring systems are sophisticated, but interpreting alarms, recognising deterioration, and managing complex patient situations require deep human judgement under physician supervision.',
    title: 'Critical Care Technologist (B.Sc CCT)',
    titleTa: 'தீவிர சிகிச்சை தொழில்நுட்ப நிபுணர்',
    icon: '🏥',
    color: 'from-red-500 to-rose-600',
    whatIsIt:
      'A 3-4 year B.Sc preparing graduates to work in intensive care units — multi-system patient monitoring, complex equipment management (ventilators, ECMO, IABP), emergency response, working alongside intensivists. Among the most demanding and well-respected allied-health roles.',
    eligibleStreams: ['pcb', 'pcmb'],
    strongGroupCodes: ['208', '204', '203'],
    ugCourses: ['B.Sc Critical Care Technology', 'B.Sc Critical Care Nursing (separate, more clinical)'],
    entranceExams: ['NEET-UG', 'None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 3-4 year degree (typically 3 + 1-year ICU internship). CCT roles open at graduation; senior ICU roles typically need M.Sc. or extensive experience.',
    skillWeights: { mathematics: 5, language: 6, science: 9, creativity: 4, people: 6, physical: 4, digital: 7 },
    priorityFit: { salary: 6, security: 8, balance: 4, abroad: 8, prestige: 7, passion: 8, growth: 7, hometown: 7 },
    competitiveBoardPct: { comfortable: 75, stretch: 65 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹3–6 LPA fresh in TN hospitals with active ICUs; ₹5–8 LPA at top corporate hospitals.',
      midCareerLPA: 'AI estimate — ₹8–16 LPA with 7+ years experience. Among the higher-paid allied-health roles because of skill intensity. Gulf and UK opportunities multiply substantially.',
      note: 'Pays among the best of all allied-health tracks because of the skill scarcity — trained CCT staff are a structural shortage in TN tier-2 hospitals.',
    },
    demand: { score: 8, note: 'AI estimate — strong and structurally growing. ICU capacity expansion is a national priority post-pandemic; trained CCT staff are a chronic shortage.' },
    entryDifficulty: { score: 5, note: 'AI estimate — many top CCT programs require NEET. Some accept high 12th marks. More selective than most allied-health tracks.' },
    collegeTiers: [
      { label: 'Top hospital-attached programs (AI estimate)', examples: ['Sri Ramachandra', 'Madras Medical Mission', 'Apollo Allied Health'], cutoffGuide: 'AI estimate — 75%+ in 12th typical; some programs require NEET.', feeRange: 'AI estimate — ₹70K–2.5L / year' },
      { label: 'Government / aided programs (AI estimate)', examples: ['Madras Medical College ICU rotations programs'], cutoffGuide: 'AI estimate — 70%+ typical.', feeRange: 'AI estimate — ₹15K–60K / year' },
      { label: 'Private colleges (AI estimate)', examples: ['Limited — CCT programs concentrate in top medical centres'], cutoffGuide: 'AI estimate — varies; 65%+ where offered.', feeRange: 'AI estimate — ₹60K–1.5L / year' },
    ],
    costReality: 'AI estimate — a 3-4 year B.Sc CCT in TN costs roughly ₹60K–10L total. Among the more expensive allied-health tracks; ROI is also among the best.',
    backupOptions: ['M.Sc. Critical Care Technology', 'Move abroad — strong Gulf, UK and Singapore demand', 'Cross-train into Respiratory Therapy or A&E', 'Hospital administration after 7+ years'],
    honestCaveat: 'Critical care work is genuinely intense — multi-system patient management, regular emergencies, occasional patient deaths, demanding shift rotation. The work changes you. Students who want predictable, lower-stress hospital roles should look elsewhere. Those drawn to it find genuinely meaningful, well-paid work that scales internationally.',
    roadmap: [
      { title: 'Score 75%+ in 12th PCB', titleTa: '+12 PCB 75%+', detail: 'Top CCT programs are selective. Strong 12th marks AND possibly NEET matter.', window: 'Now', phase: 'now' },
      { title: 'Join B.Sc CCT at a hospital with active ICU', titleTa: 'B.Sc CCT + ICU பயிற்சி', detail: 'Hospital-attached colleges with multiple ICUs (medical, surgical, neuro, cardiac) are dramatically better than smaller hospitals.', window: 'Years 1–4', phase: 'next' },
      { title: 'M.Sc. CCT OR move abroad OR cross-specialise', titleTa: 'M.Sc. அல்லது வெளிநாடு', detail: 'M.Sc. for senior ICU roles; bridge exams unlock substantial international mobility.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Confirm NEET requirement for your shortlist', titleTa: 'NEET தேவையா என உறுதிசெய்', detail: 'Top CCT programs often require NEET. Confirm before committing your prep direction.', priority: 'high', link: 'https://neet.nta.nic.in' },
      { title: 'Visit an ICU if possible', titleTa: 'ICU பார்வை', detail: 'ICU work is unlike anything else in healthcare. One observation visit clarifies the work better than any brochure.', priority: 'high' },
      { title: 'Build emotional resilience deliberately', titleTa: 'மன வலிமை வளர்த்துக்கொள்ளுங்கள்', detail: 'ICU work involves significant patient suffering and occasional death. Build resilience through honest conversation and reflection.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Biology — integrated systems thinking', why: 'ICU patients have multiple failing systems at once. Strong fundamentals across all body systems matter more than depth in any one.', freeResource: 'NCERT Biology comprehensively, free Kenhub anatomy + physiology' },
      { skill: 'Emotional resilience + professional composure', why: 'ICU rewards people who stay steady under pressure. Build deliberately.', freeResource: 'Sports under pressure, public speaking, honest conversation with ICU staff' },
      { skill: 'Strong English — for clinical handover', why: 'ICU handovers are detail-intensive and high-stakes. Clear, structured English communication is career-defining.', freeResource: 'BBC Learning English, Toastmasters' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.SC RADIOLOGY IMAGING TECHNOLOGY ─────────────────────────────────────
  {
    id: 'radiology-imaging-technologist',
    family: 'healthcare-allied',
    isNiche: true,
    interestTags: ['healthcare', 'tech'],
    needsCounsellorReview: true,
    aversionConflicts: ['shift_work'],
    automation: 'ai_augmented',
    automationNote: 'AI assists radiologists with image interpretation, but the technologist who positions the patient, runs the scan, ensures image quality and manages radiation safety is irreplaceable. Among the most equipment-fluent allied-health roles.',
    title: 'Radiology Imaging Technologist (B.Sc RIT)',
    titleTa: 'கதிரியக்க இமேஜிங் தொழில்நுட்ப நிபுணர்',
    icon: '🔬',
    color: 'from-purple-500 to-indigo-600',
    whatIsIt:
      'A 3-4 year B.Sc training graduates in medical imaging — X-ray, CT scan, MRI, ultrasound, mammography, fluoroscopy. Radiology techs work in hospital radiology departments, dedicated diagnostic centres and increasingly mobile imaging services.',
    eligibleStreams: ['pcb', 'pcmb'],
    strongGroupCodes: ['208', '204', '203'],
    ugCourses: ['B.Sc Radiology Imaging Technology', 'B.Sc Medical Imaging Technology', 'B.Sc Radiotherapy (separate sub-track)'],
    entranceExams: ['NEET-UG', 'None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 3-4 year degree (typically 3 + 1-year internship). Radiology tech roles open at graduation. Diagnostic centres expansion in TN tier-2 / tier-3 has boosted demand.',
    skillWeights: { mathematics: 5, language: 5, science: 7, creativity: 4, people: 5, physical: 3, digital: 9 },
    priorityFit: { salary: 6, security: 8, balance: 6, abroad: 8, prestige: 6, passion: 6, growth: 7, hometown: 8 },
    competitiveBoardPct: { comfortable: 70, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2.5–5 LPA fresh in TN hospitals and diagnostic centres; ₹4–7 LPA at top corporate hospitals with active MRI / CT departments.',
      midCareerLPA: 'AI estimate — ₹7–14 LPA with 7+ years and MRI / CT specialisation. Gulf and UK opportunities multiply substantially.',
      note: 'Pays in the upper half of allied-health tracks because the equipment skill is genuinely specialised. MRI specialists earn particularly well; X-ray-only generalists less so.',
    },
    demand: { score: 8, note: 'AI estimate — strong and growing. Diagnostic imaging volumes are rising sharply across TN; trained radiology techs are a chronic shortage in tier-2 cities.' },
    entryDifficulty: { score: 4, note: 'AI estimate — most programs accept on 12th merit; some top hospitals require NEET. Slightly more selective than basic allied-health tracks.' },
    collegeTiers: [
      { label: 'Top hospital-attached programs (AI estimate)', examples: ['Sri Ramachandra', 'Madras Medical Mission', 'Apollo Allied Health', 'Madras ENT Research Foundation imaging'], cutoffGuide: 'AI estimate — 70%+ in 12th typical.', feeRange: 'AI estimate — ₹60K–2L / year' },
      { label: 'Government / aided medical colleges (AI estimate)', examples: ['Madras Medical College radiology dept', 'Government Stanley'], cutoffGuide: 'AI estimate — 65%+ typical.', feeRange: 'AI estimate — ₹15K–60K / year' },
      { label: 'Private colleges (AI estimate)', examples: ['Several TN colleges with radiology imaging tracks'], cutoffGuide: 'AI estimate — widely accessible; 60%+.', feeRange: 'AI estimate — ₹50K–1.4L / year' },
    ],
    costReality: 'AI estimate — a 3-4 year B.Sc RIT in TN costs roughly ₹50K–7L total. Government / aided are dramatically cheaper. Equipment-heavy programs at private colleges trend higher.',
    backupOptions: ['M.Sc. Radiology Imaging — senior roles, sonography specialisation', 'Specialise in MRI or CT (higher pay)', 'Move abroad — strong Gulf, UK, Australia demand', 'Diagnostic equipment company technical roles'],
    honestCaveat: 'Radiology tech work involves radiation exposure (small, controlled, but real) and shift rotation including weekends — diagnostic centres operate seven days. Patient contact is brief (positioning for the scan) which suits some students well and disappoints others. The reward is genuine specialty skill, strong pay, and excellent international mobility.',
    roadmap: [
      { title: 'Score 65%+ in 12th PCB', titleTa: '+12 PCB 65%+', detail: 'Most radiology imaging programs are direct admission. Some top colleges require NEET.', window: 'Now', phase: 'now' },
      { title: 'Join B.Sc RIT + active equipment exposure', titleTa: 'B.Sc RIT + உபகரண பயிற்சி', detail: 'Hospital-attached colleges where you actually run real machines during the degree are dramatically better than purely classroom programs.', window: 'Years 1–4', phase: 'next' },
      { title: 'Specialise in MRI / CT OR move abroad', titleTa: 'MRI / CT சிறப்பு அல்லது வெளிநாடு', detail: 'MRI and CT specialists earn substantially more than generalists. M.Sc. or focused experience builds this.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Visit a diagnostic centre if possible', titleTa: 'நோய்க் கண்டறிதல் மையம் பார்வை', detail: 'Watching X-ray / CT / MRI workflows clarifies the day-to-day work. Many centres allow prospective student observation.', priority: 'high' },
      { title: 'Strengthen Physics + Biology basics', titleTa: 'பௌதீகம் + உயிரியல்', detail: 'Radiology depends on both — physics of imaging plus anatomy. Strong 12th fundamentals make year 1 smoother.', priority: 'high' },
      { title: 'Build comfort with technology', titleTa: 'தொழில்நுட்ப பழக்கம்', detail: 'Modern radiology equipment is software-heavy. Comfort with computers, software interfaces and digital workflows is essential.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Physics fundamentals (especially radiation, electromagnetism)', why: 'The technical foundation of all imaging work. Strong 12th Physics directly translates into year 1 understanding.', freeResource: 'NCERT Physics, NPTEL Medical Physics introductions' },
      { skill: 'Human anatomy basics', why: 'Knowing where organs sit (and look) is the day-to-day work of radiology. Build the comfort early.', freeResource: 'NCERT Biology, free Kenhub anatomy' },
      { skill: 'Comfort with software and digital systems', why: 'Modern imaging equipment runs on dedicated software. Computer comfort separates strong RITs from average ones.', freeResource: 'Free PACS demos, computer literacy courses' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.TECH BIOTECHNOLOGY ──────────────────────────────────────────────────
  {
    id: 'biotechnologist',
    family: 'engineering-biotech',
    isNiche: true,
    interestTags: ['research', 'healthcare', 'engineering'],
    needsCounsellorReview: true,
    aversionConflicts: ['lab_practical'],
    automation: 'ai_augmented',
    automationNote: 'AI is changing biotech research dramatically — protein folding, drug discovery, genomic analysis. The result is more research done per person, not fewer biotechnologists. Strong fit for students excited by computational + biological work.',
    title: 'Biotechnologist / Biotech Engineer',
    titleTa: 'உயிரித் தொழில்நுட்ப பொறியியலாளர்',
    icon: '🧬',
    color: 'from-green-500 to-lime-600',
    whatIsIt:
      'A 4-year engineering degree applying biology to industry: pharma R&D, agritech, food technology, genetic engineering, biofuels, vaccine development. Distinct from medicine — you work with cells, processes and lab equipment, not patients.',
    eligibleStreams: ['pcm', 'pcb', 'pcmb'],
    strongGroupCodes: ['208', '101', '102'],
    ugCourses: ['B.Tech Biotechnology', 'B.E Bio-Medical Engineering', 'B.Tech Industrial Biotechnology', 'B.Sc Biotech + M.Sc Biotech'],
    entranceExams: ['TNEA', 'JEE Main', 'NEET-UG'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'After 12th you join a 4-year B.Tech Biotechnology directly. Junior research / lab engineer roles open at graduation, though most strong biotech careers in India involve an M.Tech or M.Sc. on top — meaningful work often starts ~6 years from now.',
    skillWeights: {
      mathematics: 6,
      language: 5,
      science: 9,
      creativity: 7,
      people: 4,
      physical: 4,
      digital: 7,
    },
    priorityFit: {
      salary: 4,
      security: 6,
      balance: 6,
      abroad: 8,
      prestige: 6,
      passion: 8,
      growth: 7,
      hometown: 5,
    },
    competitiveBoardPct: { comfortable: 80, stretch: 70 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2.5–4.5 LPA at most TN colleges; ₹4–7 LPA at top-tier campuses. Notably lower than CSE / ECE for the same college tier.',
      midCareerLPA: 'AI estimate — ₹6–18 LPA with 5–8 years; specialisation in computational biology or pharma R&D leadership can exceed. PhD + abroad pathway pays substantially more.',
      note: 'Honest reality: biotech salaries in India are below mainstream engineering for the same effort. The strongest financial paths involve either pharma industry (Dr. Reddy\'s, Biocon, Serum Institute) or moving abroad for PhD + research. Students who pick biotech for love of the science do well; those who pick it expecting CSE salaries are disappointed.',
    },
    demand: {
      score: 6,
      note: 'AI estimate — steady demand from pharma R&D, agritech and biotech start-ups. Lower-volume hiring than software, so a strong college matters more than in CSE.',
    },
    entryDifficulty: {
      score: 5,
      note: 'AI estimate — TNEA / JEE entry comparable to other engineering disciplines. Top tier (CEG, MIT Chrompet, SSN, SRM) is competitive; many private colleges offer biotech with accessible cut-offs.',
    },
    collegeTiers: [
      {
        label: 'Top government / autonomous (AI estimate)',
        examples: ['CEG Guindy', 'SSN', 'PSG Tech (Biotech)', 'SASTRA'],
        cutoffGuide: 'AI estimate — TNEA / JEE cut-offs comparable to mid-tier engineering branches.',
        feeRange: 'AI estimate — ₹15K–2L / year',
      },
      {
        label: 'Strong private (AI estimate)',
        examples: ['Anna University constituent colleges', 'B.S. Abdur Rahman', 'Vellore Institute', 'SRM Biotech'],
        cutoffGuide: 'AI estimate — accessible TNEA / JEE / direct admission for most.',
        feeRange: 'AI estimate — ₹80K–2.5L / year',
      },
      {
        label: 'Accessible private (AI estimate)',
        examples: ['Many TN private engineering colleges with biotech branches'],
        cutoffGuide: 'AI estimate — widely accessible; many seats below ~170 TNEA cutoff.',
        feeRange: 'AI estimate — ₹50K–1.5L / year',
      },
    ],
    costReality:
      'AI estimate — a 4-year B.Tech Biotech in TN costs roughly ₹1L–10L total depending on college tier. Government colleges are dramatically cheaper. Lab-heavy programs at private colleges trend toward the upper range.',
    backupOptions: [
      'M.Tech / M.Sc. Biotechnology — improves placement substantially',
      'Pharma industry R&D (Dr. Reddy\'s, Biocon, Serum Institute, Cipla)',
      'PhD abroad (US/EU) — best long-term financial path',
      'Bioinformatics + computational biology — combines biotech with software',
      'Quality control / regulatory roles in pharma and food companies',
      'Pivot to software engineering — many biotech grads do this through self-taught coding',
    ],
    honestCaveat:
      'Be honest with yourself: biotech in India pays less than CSE / ECE for similar effort, and the strongest financial paths require either an MS/PhD abroad or many years in pharma R&D. The reward is the work itself — students who love biology and lab science thrive; those who picked biotech because it "sounded scientific" without that genuine pull regret the choice. The lab_practical aversion is built in for a reason: B.Tech Biotech is deeply lab-heavy from year 1.',
    roadmap: [
      {
        title: 'Score 80%+ in 12th PCB / PCMB (or strong PCM)',
        titleTa: '+12 PCB / PCMB-இல் 80%+',
        detail: 'Biology and Chemistry depth matters most; Maths is needed for the engineering-side coursework.',
        window: 'Now',
        phase: 'now',
      },
      {
        title: 'Join B.Tech Biotech (4 years) + at least 1 research internship',
        titleTa: 'B.Tech உயிரித் தொழில்நுட்பம் + ஆராய்ச்சி பயிற்சி',
        detail: 'Internships at research institutes (IISc, CSIR labs) or pharma companies during summers shape your trajectory far more than the college brand.',
        window: 'Years 1–4',
        phase: 'next',
      },
      {
        title: 'M.Tech / M.Sc. — OR pharma industry — OR PhD abroad',
        titleTa: 'M.Tech / தொழில் / PhD',
        detail: 'In India, an M.Tech / M.Sc. roughly doubles your earning ceiling. For the best long-term careers, PhD abroad is the strongest path.',
        window: 'Years 4–6',
        phase: 'later',
      },
    ],
    ninetyDayPlan: [
      {
        title: 'Be honest with yourself about salary expectations',
        titleTa: 'சம்பள எதிர்பார்ப்புகள் பற்றி நேர்மை',
        detail: 'Talk to a biotech graduate working 3-5 years. Their starting and current salaries are crucial reality. If lower salary kills your motivation, biotech is not for you — that is honest, not a failure.',
        priority: 'high',
      },
      {
        title: 'Confirm TNEA / JEE / NEET registration',
        titleTa: 'TNEA / JEE / NEET பதிவு',
        detail: 'Different colleges accept different entrance routes for biotech. Confirm your specific shortlist.',
        priority: 'high',
      },
      {
        title: 'Begin reading recent biotech / pharma news',
        titleTa: 'உயிரித் தொழில்நுட்பம் / மருந்தியல் செய்திகள்',
        detail: 'Follow industry developments to see what actually excites you — drug discovery, agritech, vaccines, gene therapy, fermentation? The intuition built now shapes your specialisation later.',
        priority: 'medium',
      },
    ],
    buildNowSkills: [
      {
        skill: 'Strong Biology + Chemistry fundamentals',
        why: 'Every biotech subject builds on these. Weakness here cascades through the entire degree.',
        freeResource: 'NCERT Biology + Chemistry, Khan Academy',
      },
      {
        skill: 'Basic programming — Python preferred',
        why: 'Modern biotech is computational. Python opens bioinformatics, computational biology and ML-for-biology roles — all of which pay better than wet-lab roles.',
        freeResource: 'Python.org tutorials, freeCodeCamp YouTube, Rosalind bioinformatics problems',
      },
      {
        skill: 'Reading scientific papers',
        why: 'Biotech is research-driven. Comfort reading and interpreting papers is the difference between someone who follows the field and someone who shapes it.',
        freeResource: 'PubMed (free abstracts), bioRxiv preprints, "How to Read a Paper" guides',
      },
    ],
    lastReviewed: '2026-05',
  },  // ═══════════════════════════════════════════════════════════════════════════
  // ─── BATCH 1: NEXT-GEN TECH (Discovery Expansion, May 2026) ────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  // First of 5 batches adding niche/high-value TN UG courses students often
  // don't know exist. All four sit in the tech-adjacent space but each is a
  // genuinely distinct career — uniquely-tuned skillWeights ensure they
  // surface for the right students, not as generic CS variants. All DRAFT
  // pending counsellor review.

  // ─── B.TECH ARTIFICIAL INTELLIGENCE & DATA SCIENCE (AIDS) ──────────────────
  {
    id: 'btech-aids',
    family: 'tech-data',
    isNiche: true,
    interestTags: ['tech', 'research'],
    needsCounsellorReview: true,
    aversionConflicts: ['sitting_long', 'maths_heavy'],
    automation: 'ai_augmented',
    automationNote: 'AIDS graduates build the AI systems that automate other work. The field itself is one of the strongest hedges against automation — those who shape AI are not displaced by it. Strong fit for students excited by mathematics, statistics, and the rapidly changing ML/DL landscape.',
    title: 'B.Tech AI & Data Science (AIDS)',
    titleTa: 'பி.டெக் செயற்கை நுண்ணறிவு மற்றும் தரவு அறிவியல்',
    icon: '🤖',
    color: 'from-violet-500 to-indigo-600',
    whatIsIt:
      'A four-year B.Tech specialising in machine learning, deep learning, statistics, big data engineering and AI applications. Distinct from general CSE — graduates are trained from year 1 in maths-heavy ML foundations, statistical inference, and modern AI tooling (PyTorch, TensorFlow, MLOps). Career outcomes: ML engineer, data scientist, AI researcher, applied scientist roles at tech firms and startups.',
    eligibleStreams: ['pcm', 'pcmb'],
    strongGroupCodes: ['102', '101'],
    ugCourses: ['B.Tech AI & Data Science', 'B.E. AI & Machine Learning', 'B.Tech AI & ML'],
    entranceExams: ['TNEA', 'JEE Main'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 4-year B.Tech. Strong placement in 7th-8th semester at tech firms. ML/AI roles typically pay above general CSE because of the specialised skill premium. Many graduates also pursue M.Tech/MS abroad.',
    skillWeights: { mathematics: 9, language: 6, science: 7, creativity: 6, people: 4, physical: 1, digital: 9 },
    priorityFit: { salary: 9, security: 7, balance: 6, abroad: 9, prestige: 8, passion: 7, growth: 9, hometown: 6 },
    competitiveBoardPct: { comfortable: 85, stretch: 75 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹6–14 LPA fresh at tier-1 tech firms; ₹4–8 LPA at mid-tier. Top performers at FAANG-tier and AI-focused startups can reach ₹20+ LPA fresh.',
      midCareerLPA: 'AI estimate — ₹20–60 LPA after 5-7 years for strong performers; senior AI/ML engineers and applied scientists routinely exceed this. International (US, EU) opportunities multiply substantially.',
      note: 'Among the highest-earning UG paths in India right now BUT the variance is huge — the gap between a strong AIDS graduate and an average one is wider than in most fields. The maths-and-statistics foundation matters more than the brand name of the college.',
    },
    demand: { score: 9, note: 'AI estimate — exceptionally strong. The AI/ML hiring wave shows no sign of slowing; demand from tech, fintech, healthcare-tech and AI-focused startups outstrips trained supply.' },
    entryDifficulty: { score: 7, note: 'AI estimate — competitive at top TN colleges. Anna University AIDS programs and top private engineering colleges have rising cutoffs as the field grows in popularity.' },
    collegeTiers: [
      { label: 'Top AIDS programs (AI estimate)', examples: ['Anna University CEG / MIT', 'PSG Tech Coimbatore', 'SSN College of Engineering', 'Thiagarajar College of Engineering'], cutoffGuide: 'AI estimate — TNEA cutoff 195+ (out of 200) typical at top tier.', feeRange: 'AI estimate — ₹50K–2L / year' },
      { label: 'Strong private engineering colleges (AI estimate)', examples: ['SRM University', 'VIT (entry via VITEEE)', 'Sastra University', 'Kongu Engineering College'], cutoffGuide: 'AI estimate — TNEA cutoff 180-195; private exams vary.', feeRange: 'AI estimate — ₹1.5L–4L / year' },
      { label: 'Other TN colleges with AIDS specialisation (AI estimate)', examples: ['Many Anna University affiliated colleges now offer the track'], cutoffGuide: 'AI estimate — TNEA cutoff 160-180 typical.', feeRange: 'AI estimate — ₹80K–2L / year' },
    ],
    costReality: 'AI estimate — a 4-year B.Tech AIDS in TN costs roughly ₹2L–16L total depending on college. Government-aided colleges (CEG, MIT) are dramatically cheaper than top private institutions. ROI is strong if you actually engage with the maths.',
    backupOptions: ['M.Tech / MS in AI/ML (India or abroad — strong abroad mobility)', 'Pivot to general SDE roles if ML market softens', 'Kaggle/research publications during UG as alternative credentials', 'AI-focused startups (often hire on portfolio + projects more than CGPA)'],
    honestCaveat: 'AIDS rewards students who genuinely enjoy mathematics — linear algebra, probability, statistics, calculus. Students who picked it because "AI is the future" without that pull often struggle once the maths-heavy foundation courses hit in years 1-2. The brand of "AI" attracts many; the discipline of statistical thinking sorts them out. Be honest with yourself about the maths before committing.',
    roadmap: [
      { title: 'Score 80%+ in 12th PCM (especially strong in Mathematics)', titleTa: '+12 PCM 80%+ (கணிதம் வலுவாக)', detail: 'TNEA / JEE Main entry. Maths is the single strongest predictor of AIDS performance — score it well.', window: 'Now', phase: 'now' },
      { title: 'Join B.Tech AIDS + active project work', titleTa: 'B.Tech AIDS + திட்டப் பணி', detail: 'Build real ML projects from year 1 — Kaggle competitions, GitHub portfolio, open-source contributions. Coursework alone is not enough.', window: 'Years 1–4', phase: 'next' },
      { title: 'M.Tech/MS abroad OR top tech firm OR AI-focused startup', titleTa: 'M.Tech / MS / தொடக்க நிறுவனம்', detail: 'Three credible exits. Strong students go abroad; pragmatic students take tier-1 placements; ambitious students join an AI startup.', window: 'Years 4–6', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Strengthen Mathematics — especially probability + linear algebra', titleTa: 'கணிதம் வலுப்படுத்துதல்', detail: 'AIDS is 60% applied maths. A head start on linear algebra and probability before year 1 starts is a real advantage.', priority: 'high', freeResource: '3Blue1Brown linear algebra series, Khan Academy probability' },
      { title: 'Try a free intro ML course over summer', titleTa: 'இலவச ML கோர்ஸ்', detail: 'Andrew Ng\'s Coursera Machine Learning (audit free). 2-3 hours/week before year 1 clarifies whether ML genuinely interests you.', priority: 'high' },
      { title: 'Set up Python + start with simple scripts', titleTa: 'பைதான் தொடங்க', detail: 'Python fluency is essential. Free tutorials on freeCodeCamp / Codecademy build the comfort.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Mathematics — linear algebra + probability fundamentals', why: 'The deep foundation of ML. Students who arrive in year 1 already comfortable with vectors, matrices and probability distributions are dramatically more productive.', freeResource: '3Blue1Brown YouTube (Essence of Linear Algebra, Essence of Calculus), Khan Academy' },
      { skill: 'Python programming', why: 'The lingua franca of AI/ML. Comfortable Python from day 1 frees you to focus on the maths.', freeResource: 'freeCodeCamp Python, Codecademy Python, Real Python tutorials' },
      { skill: 'Reading data analysis case studies', why: 'Real-world AI is messy data + careful thinking, not just algorithms. Reading case studies builds judgement.', freeResource: 'Kaggle competition writeups, Distill.pub articles, Towards Data Science (free)' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.TECH COMPUTER SCIENCE & BUSINESS SYSTEMS (CSBS) ─────────────────────
  {
    id: 'btech-csbs',
    family: 'tech-business-systems',
    isNiche: true,
    interestTags: ['tech', 'finance'],
    needsCounsellorReview: true,
    aversionConflicts: ['sitting_long'],
    automation: 'ai_augmented',
    automationNote: 'CSBS sits at the tech-business interface — the work of translating between engineering teams and business stakeholders is among the most automation-resilient tech roles. Strong fit for students who like tech but also enjoy working with people.',
    title: 'B.Tech Computer Science & Business Systems (CSBS)',
    titleTa: 'பி.டெக் கணினி அறிவியல் மற்றும் வணிக அமைப்புகள்',
    icon: '💼',
    color: 'from-blue-500 to-cyan-600',
    whatIsIt:
      'A four-year B.Tech (designed jointly with TCS) blending core computer science with business systems — finance, operations, design thinking, supply chain analytics. Distinct from CSE: graduates are trained from year 1 for tech-business hybrid roles like technology consulting, product management, business analyst, fintech operations. Career outcomes: consulting (Big 4 tech advisory), product roles, fintech, enterprise tech.',
    eligibleStreams: ['pcm', 'pcmb'],
    strongGroupCodes: ['102', '101'],
    ugCourses: ['B.Tech Computer Science & Business Systems', 'B.Tech CSBS'],
    entranceExams: ['TNEA', 'JEE Main'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 4-year B.Tech. Placement profile differs from CSE — fewer pure-coding roles, more consulting / product / business-analyst pathways. Strong corporate hiring through partner companies including TCS.',
    skillWeights: { mathematics: 7, language: 7, science: 4, creativity: 6, people: 7, physical: 1, digital: 8 },
    priorityFit: { salary: 8, security: 7, balance: 7, abroad: 7, prestige: 7, passion: 6, growth: 8, hometown: 7 },
    competitiveBoardPct: { comfortable: 80, stretch: 70 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹5–10 LPA fresh at tier-1 tech consulting (TCS, Infosys, Deloitte tech advisory); ₹4–7 LPA at mid-tier. Product/consulting roles often start lower than pure SDE but reach higher mid-career.',
      midCareerLPA: 'AI estimate — ₹15–40 LPA in 7-10 years for senior consultants, product managers and fintech leads. Top performers in product / consulting can exceed substantially.',
      note: 'Strong long-term earnings ceiling because the tech-business interface is hard to automate AND hard to replace. The trade-off vs CSE: typically lower starting salaries, higher mid-career trajectory for those who lean into business work.',
    },
    demand: { score: 8, note: 'AI estimate — strong demand from consulting firms, fintech, enterprise tech. The TCS partnership in many CSBS programs creates direct hiring pipelines.' },
    entryDifficulty: { score: 6, note: 'AI estimate — competitive but slightly less than top CSE. CSBS is newer; awareness is growing.' },
    collegeTiers: [
      { label: 'Top CSBS programs (AI estimate)', examples: ['PSG Tech Coimbatore', 'SSN College', 'Sri Sairam Engineering', 'Sastra University'], cutoffGuide: 'AI estimate — TNEA cutoff 185-195 typical.', feeRange: 'AI estimate — ₹80K–2L / year' },
      { label: 'Strong private colleges (AI estimate)', examples: ['SRM University', 'Hindustan Institute', 'Kongu Engineering College'], cutoffGuide: 'AI estimate — TNEA cutoff 170-185.', feeRange: 'AI estimate — ₹1.5L–3L / year' },
      { label: 'Other CSBS offering colleges (AI estimate)', examples: ['Growing number of Anna University affiliated colleges'], cutoffGuide: 'AI estimate — TNEA cutoff 155-175 typical.', feeRange: 'AI estimate — ₹80K–2L / year' },
    ],
    costReality: 'AI estimate — a 4-year CSBS in TN costs roughly ₹3L–12L total. The TCS-tied programs often include guaranteed placement interviews, which materially improves ROI.',
    backupOptions: ['MBA after 2-3 years (CSBS is excellent MBA prep)', 'Pivot to pure software roles if business work loses appeal', 'Consulting (Big 4) recruitment', 'Product management entry roles', 'Fintech operations / analyst roles'],
    honestCaveat: 'CSBS works best for students who are genuinely curious about both tech AND business — not just "tech but easier than CSE." Students who joined hoping for less coding find the business modules unexpectedly demanding (operations, finance, statistics). The double-hybrid nature is its strength but requires real engagement with both sides.',
    roadmap: [
      { title: 'Score 75%+ in 12th PCM with balanced Maths + language', titleTa: '+12 PCM 75%+ (கணிதம் + மொழி சமநிலை)', detail: 'CSBS leans on both quantitative AND communication skills more than pure CSE. Strong language scores matter.', window: 'Now', phase: 'now' },
      { title: 'Join B.Tech CSBS + parallel business reading', titleTa: 'B.Tech CSBS + வணிக படிப்பு', detail: 'Read one business book per semester (HBR articles, Drucker, Lean Startup). The business curriculum benefits from outside reading.', window: 'Years 1–4', phase: 'next' },
      { title: 'Consulting / product / MBA — pick one', titleTa: 'ஆலோசனை / தயாரிப்பு / MBA', detail: 'CSBS opens multiple paths. Decide by year 3 based on what you actually enjoyed — tech, business strategy, or product thinking.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Confirm the CSBS program is TCS-tied (where applicable)', titleTa: 'TCS பிணைப்பு உறுதிசெய்', detail: 'TCS-tied CSBS programs typically offer guaranteed interviews. Standalone CSBS programs vary in placement. Confirm before committing.', priority: 'high' },
      { title: 'Read "The Lean Startup" or similar over summer', titleTa: 'வணிக புத்தகம் படிக்கவும்', detail: 'Understanding how tech companies actually operate is the missing context that makes year 1 business modules click.', priority: 'high' },
      { title: 'Start Python + spreadsheet basics', titleTa: 'பைதான் + எக்செல்', detail: 'Both are essential. Free courses are enough — comfort by day 1 is the advantage.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Spoken + written English (business communication)', why: 'CSBS roles are communication-intensive. Students who arrive fluent in business English pull ahead of equally-smart classmates who struggle to express ideas.', freeResource: 'BBC Learning English, daily English newspaper editorial reading' },
      { skill: 'Spreadsheet fluency (advanced Excel)', why: 'Business analyst, consulting and product roles all run on spreadsheets. Strong Excel from year 1 is a career-defining base skill.', freeResource: 'Microsoft Excel free YouTube courses (Leila Gharani, ExcelIsFun)' },
      { skill: 'Reading how tech companies work', why: 'Builds the business intuition that classroom modules can\'t. 30 minutes a week of business news compounds rapidly.', freeResource: 'The Ken, Mint, Stratechery, Lenny\'s Newsletter (some free)' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.E. ROBOTICS & AUTOMATION ────────────────────────────────────────────
  {
    id: 'robotics-automation-engineer',
    family: 'engineering-mechatronics',
    isNiche: true,
    interestTags: ['engineering', 'tech'],
    needsCounsellorReview: true,
    aversionConflicts: ['lab_practical'],
    automation: 'human_facing',
    automationNote: 'Robotics engineers design the systems that automate other industries — among the most automation-resilient engineering roles. India\'s manufacturing automation push (Make in India, Industry 4.0) drives sustained demand.',
    title: 'B.E. Robotics & Automation Engineer',
    titleTa: 'பி.இ. ரோபோடிக்ஸ் மற்றும் தானியங்கி பொறியியல்',
    icon: '🦾',
    color: 'from-orange-500 to-red-600',
    whatIsIt:
      'A four-year B.E. focused on robot systems, control engineering, industrial automation, computer vision and AI-driven robotics. Distinct from Mechatronics: more emphasis on autonomous systems, machine learning for robotics, software-control over mechanical-systems integration. Career outcomes: robotics engineer, automation engineer, industrial controls specialist, robotics R&D roles.',
    eligibleStreams: ['pcm', 'pcmb'],
    strongGroupCodes: ['102', '101'],
    ugCourses: ['B.E. Robotics & Automation', 'B.Tech Robotics & Automation Engineering'],
    entranceExams: ['TNEA', 'JEE Main'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 4-year degree. Placement strong at automation-focused manufacturing firms (automotive, electronics assembly, FMCG). Robotics-specific roles at startups and R&D centres also growing.',
    skillWeights: { mathematics: 8, language: 4, science: 6, creativity: 7, people: 4, physical: 3, digital: 9 },
    priorityFit: { salary: 7, security: 7, balance: 5, abroad: 8, prestige: 7, passion: 8, growth: 8, hometown: 6 },
    competitiveBoardPct: { comfortable: 75, stretch: 65 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹3.5–6 LPA fresh in TN manufacturing/automation roles; ₹5–9 LPA at automation-focused tech firms and robotics startups.',
      midCareerLPA: 'AI estimate — ₹10–22 LPA after 7+ years for specialised robotics engineers. Abroad opportunities (US, Japan, Germany) multiply substantially because robotics is a global specialty.',
      note: 'Pays in the upper-middle of engineering tracks. The earnings ceiling rises sharply with deep specialisation (computer vision, autonomous systems, surgical robotics).',
    },
    demand: { score: 8, note: 'AI estimate — strong and structurally growing. India\'s Industry 4.0 push and global automation trend create sustained demand. TN has automotive (Chennai cluster) and electronics manufacturing concentrations.' },
    entryDifficulty: { score: 6, note: 'AI estimate — direct TNEA admission. Robotics programs are less common than CSE or general mechanical, so seats are limited but cutoffs are moderate.' },
    collegeTiers: [
      { label: 'Top Robotics programs (AI estimate)', examples: ['Anna University MIT', 'PSG Tech Coimbatore', 'Sastra University', 'SRM University'], cutoffGuide: 'AI estimate — TNEA cutoff 180-195 typical.', feeRange: 'AI estimate — ₹60K–2.5L / year' },
      { label: 'Strong private engineering colleges (AI estimate)', examples: ['VIT (via VITEEE)', 'Hindustan Institute', 'Kongu Engineering College', 'SSN College'], cutoffGuide: 'AI estimate — TNEA cutoff 165-185.', feeRange: 'AI estimate — ₹1.5L–3.5L / year' },
      { label: 'Other TN colleges with Robotics specialisation (AI estimate)', examples: ['Growing number; verify program quality per college'], cutoffGuide: 'AI estimate — TNEA cutoff 150-175 typical.', feeRange: 'AI estimate — ₹80K–2L / year' },
    ],
    costReality: 'AI estimate — a 4-year B.E. Robotics & Automation in TN costs roughly ₹2L–14L total. Hands-on programs with actual robotics labs (not just classroom theory) cost more but produce stronger graduates.',
    backupOptions: ['M.Tech Robotics / Control Systems', 'Move abroad — strong demand in US, Japan, Germany, Korea', 'Pivot to general mechatronics or industrial automation roles', 'Robotics startups and R&D (Asimov Robotics, Difacto, GreyOrange, Addverb)', 'PLC / SCADA programming roles in industry'],
    honestCaveat: 'Robotics is hands-on AND software-heavy. Students who joined imagining only "cool robots" find the deep maths (control theory, kinematics), the long debugging cycles, and the project work demanding. Students who genuinely enjoy building things AND coding thrive. The hands-on lab work is essential — choose a college with real robotics labs, not just curriculum on paper.',
    roadmap: [
      { title: 'Score 70%+ in 12th PCM', titleTa: '+12 PCM 70%+', detail: 'TNEA / JEE Main entry. Strong Maths + Physics matter more than Chemistry for robotics.', window: 'Now', phase: 'now' },
      { title: 'Join B.E. Robotics & active project work + ROS/Arduino', titleTa: 'B.E. ரோபோடிக்ஸ் + திட்டங்கள்', detail: 'Build personal projects from year 1 — Arduino, ROS (Robot Operating System), basic computer vision. Coursework alone is not enough.', window: 'Years 1–4', phase: 'next' },
      { title: 'M.Tech, abroad, OR robotics startup', titleTa: 'M.Tech / வெளிநாடு / தொடக்க நிறுவனம்', detail: 'Indian robotics startups (GreyOrange, Difacto, Addverb) and abroad M.Tech are the strongest paths into specialised work.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Confirm the program has actual robotics labs', titleTa: 'ரோபோடிக்ஸ் ஆய்வகங்கள் உள்ளனவா?', detail: 'Some colleges teach robotics on paper without serious lab work. Visit or ask current students. Hands-on time matters enormously here.', priority: 'high' },
      { title: 'Start an Arduino starter kit over summer', titleTa: 'Arduino தொடக்க கருவி', detail: 'A ₹2-3K starter kit teaches more in 2 weeks than 1 semester of theory alone. Build small projects — LED patterns, sensor readings, simple motors.', priority: 'high' },
      { title: 'Watch ROS (Robot Operating System) intro tutorials', titleTa: 'ROS அறிமுகம்', detail: 'ROS is the dominant robotics software framework. Familiarity before year 1 puts you ahead of classmates who first see it in year 3.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Mathematics — calculus + linear algebra (for kinematics)', why: 'Robot motion is fundamentally calculus and linear algebra. Students with strong fundamentals in these breeze through kinematics; students without struggle for years.', freeResource: '3Blue1Brown YouTube (linear algebra, calculus), Khan Academy' },
      { skill: 'Hands-on tinkering with Arduino / electronics kits', why: 'The single highest-ROI preparation. Practical comfort with sensors, motors and microcontrollers transforms year 1 from confusing to obvious.', freeResource: 'Arduino starter kit (~₹2-3K) + free Paul McWhorter YouTube tutorials' },
      { skill: 'Python programming (especially with NumPy)', why: 'Robotics increasingly runs on Python — ROS bindings, computer vision (OpenCV), ML libraries. Strong Python from year 1 is essential.', freeResource: 'freeCodeCamp Python, Real Python tutorials' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.TECH CYBER SECURITY ─────────────────────────────────────────────────
  {
    id: 'btech-cybersecurity',
    family: 'tech-cybersecurity',
    isNiche: true,
    interestTags: ['tech', 'govt'],
    needsCounsellorReview: true,
    aversionConflicts: ['sitting_long'],
    automation: 'human_facing',
    automationNote: 'Cyber security is inherently adversarial — attackers innovate continuously, requiring human creativity to defend. Among the most automation-resilient tech roles. India\'s data-protection laws (DPDP Act) and corporate cyber spend create sustained demand.',
    title: 'B.Tech Cyber Security',
    titleTa: 'பி.டெக் இணைய பாதுகாப்பு',
    icon: '🔒',
    color: 'from-slate-700 to-zinc-800',
    whatIsIt:
      'A four-year B.Tech specialising in network security, cryptography, ethical hacking, digital forensics, secure software development, and security operations. Distinct from general CSE: graduates are trained from year 1 in offensive security thinking, defensive architecture, and the legal/compliance side of cyber. Career outcomes: security analyst, penetration tester, SOC engineer, security consultant, government / defence cyber roles.',
    eligibleStreams: ['pcm', 'pcmb'],
    strongGroupCodes: ['102', '101'],
    ugCourses: ['B.Tech Cyber Security', 'B.Tech Information Security', 'B.E. Cyber Security & Forensics'],
    entranceExams: ['TNEA', 'JEE Main'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 4-year B.Tech. Strong placement at security firms, banks, IT services security divisions, and growing government cyber agencies. Certifications (CEH, OSCP, CISSP later) significantly boost earnings.',
    skillWeights: { mathematics: 8, language: 6, science: 6, creativity: 7, people: 5, physical: 1, digital: 9 },
    priorityFit: { salary: 8, security: 8, balance: 6, abroad: 7, prestige: 7, passion: 8, growth: 9, hometown: 7 },
    competitiveBoardPct: { comfortable: 80, stretch: 70 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹4–8 LPA fresh at TN security firms and IT services; ₹6–12 LPA at top corporate security teams (banks, fintech, MNCs). Certifications fast-track this.',
      midCareerLPA: 'AI estimate — ₹15–35 LPA after 7+ years for skilled penetration testers, security architects, and CISO-track professionals. Abroad opportunities pay dramatically more — cyber is a global specialty.',
      note: 'Among the strongest mid-career trajectories in tech because trained security professionals are in chronic shortage. Specialisation (cloud security, application security, OT/IoT security) multiplies earnings further.',
    },
    demand: { score: 9, note: 'AI estimate — extreme demand. India\'s DPDP Act enforcement, rising ransomware threats, and corporate cyber budgets create a chronic shortage of trained security professionals at every level.' },
    entryDifficulty: { score: 6, note: 'AI estimate — competitive but the program is newer than CSE. Top cyber security programs at PSG, SRM, VIT etc. have rising cutoffs but seats are widely available.' },
    collegeTiers: [
      { label: 'Top cyber security programs (AI estimate)', examples: ['Anna University MIT', 'PSG Tech Coimbatore', 'SRM University', 'SSN College'], cutoffGuide: 'AI estimate — TNEA cutoff 185-195 typical.', feeRange: 'AI estimate — ₹80K–2.5L / year' },
      { label: 'Strong private colleges (AI estimate)', examples: ['VIT (via VITEEE)', 'Sastra University', 'Hindustan Institute', 'Kongu Engineering College'], cutoffGuide: 'AI estimate — TNEA cutoff 170-185.', feeRange: 'AI estimate — ₹1.5L–3.5L / year' },
      { label: 'Other TN colleges with Cyber Security tracks (AI estimate)', examples: ['Growing number of Anna University affiliated colleges'], cutoffGuide: 'AI estimate — TNEA cutoff 160-180 typical.', feeRange: 'AI estimate — ₹80K–2L / year' },
    ],
    costReality: 'AI estimate — a 4-year B.Tech Cyber Security in TN costs roughly ₹3L–14L total. Certifications during/after the degree (CEH, OSCP, Security+) cost additional ₹15K–80K but materially boost placement outcomes.',
    backupOptions: ['Industry certifications (CEH, OSCP, Security+) — bypass college brand to some extent', 'Government / defence cyber roles (CDAC, NIC, ISRO, defence research)', 'M.Tech / MS in Information Security', 'Move abroad — extreme demand in US, UK, EU, Australia', 'Bug bounty hunting (legitimate side income / portfolio building)'],
    honestCaveat: 'Cyber security rewards students who enjoy puzzle-solving, are persistent (debugging exploits takes hours), and can think adversarially — "how would someone misuse this?" Students who picked it because "hacking sounds cool" without that pull usually find the actual work — log analysis, policy compliance, incident reports — surprisingly tedious. The exciting parts (penetration testing, exploit research) are a small fraction of most jobs. Be honest about whether you find the boring parts interesting too.',
    roadmap: [
      { title: 'Score 75%+ in 12th PCM', titleTa: '+12 PCM 75%+', detail: 'TNEA / JEE Main entry. Strong Maths + curiosity about systems matter more than any one subject.', window: 'Now', phase: 'now' },
      { title: 'Join B.Tech Cyber Security + active CTF participation', titleTa: 'B.Tech இணைய பாதுகாப்பு + CTF', detail: 'Capture-the-Flag competitions are the standard way security students build real skill. Free platforms (TryHackMe, HackTheBox, PicoCTF) — start in year 1.', window: 'Years 1–4', phase: 'next' },
      { title: 'Industry certs + first security role', titleTa: 'சான்றிதழ்கள் + வேலை', detail: 'CEH (entry), OSCP (technical). One cert during the degree typically lifts placement salary by 30-50%.', window: 'Years 3–5', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Try TryHackMe / PicoCTF free over the summer', titleTa: 'TryHackMe / PicoCTF', detail: 'Both are free platforms with beginner-friendly cyber security puzzles. A few hours weekly tells you whether the work suits you BEFORE committing 4 years.', priority: 'high', link: 'https://tryhackme.com' },
      { title: 'Read "The Cuckoo\'s Egg" or "Sandworm"', titleTa: 'புத்தகம் படிக்கவும்', detail: 'Classic real-world cyber security narratives. Builds the mindset before formal coursework.', priority: 'high' },
      { title: 'Start Linux command-line basics', titleTa: 'லினக்ஸ் கட்டளை வரி', detail: 'Almost all cyber security work happens on Linux. Comfort with the terminal before year 1 is a major advantage.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Linux command-line fluency', why: 'The basic working environment for nearly all security work. Comfort with the terminal makes year 1 dramatically easier.', freeResource: 'OverTheWire Bandit (free Linux puzzle game), LinuxJourney free course' },
      { skill: 'Networking fundamentals (TCP/IP, DNS, HTTP)', why: 'You cannot secure what you do not understand. Strong networking fundamentals from year 1 compound through every course.', freeResource: 'Computer Networking from the Ground Up (Coursera, audit free), free Cisco Networking Academy intro modules' },
      { skill: 'Python programming + basic scripting', why: 'Security tooling is heavily Python — automation scripts, exploit prototypes, log analysis. Strong Python is a working necessity.', freeResource: 'freeCodeCamp Python, Automate the Boring Stuff with Python (free online)' },
    ],
    lastReviewed: '2026-05',
  },  // ═══════════════════════════════════════════════════════════════════════════
  // ─── BATCH 2: MODERN SCIENCES (Discovery Expansion, May 2026) ──────────────
  // ═══════════════════════════════════════════════════════════════════════════
  // Niche TN UG science courses students rarely consider. Each entry is in
  // its own family — no dedup against existing careers — because each is a
  // genuinely distinct domain (forensics ≠ biotech, food tech ≠ chemistry,
  // fisheries ≠ agriculture, clinical nutrition ≠ general healthcare).
  // First batch to exercise the new `graphic_content` aversion tag.

  // ─── B.SC FORENSIC SCIENCE ─────────────────────────────────────────────────
  {
    id: 'forensic-scientist',
    family: 'science-forensic',
    isNiche: true,
    interestTags: ['research', 'law'],
    needsCounsellorReview: true,
    aversionConflicts: ['graphic_content', 'lab_practical', 'sitting_long'],
    automation: 'human_facing',
    automationNote: 'Forensic analysis combines scientific testing with court-defensible expert judgement — work that demands a human who can be cross-examined under oath. AI helps with pattern matching; the conclusions and testimony remain firmly human.',
    title: 'Forensic Scientist (B.Sc Forensic Science)',
    titleTa: 'நீதி அறிவியல் விஞ்ஞானி',
    icon: '🔬',
    color: 'from-stone-600 to-slate-700',
    whatIsIt:
      'A three-year B.Sc that trains graduates to apply science to crime investigation — DNA analysis, fingerprinting, ballistics, toxicology, document examination, digital forensics, forensic psychology basics. Career outcomes: state and central forensic science labs, police forensic units, private forensic labs, expert witness work, increasingly cyber-forensics roles. The work is part science, part courtroom — graduates testify under oath about their findings.',
    eligibleStreams: ['pcb', 'pcm', 'pcmb'],
    strongGroupCodes: ['208', '204', '102', '103'],
    ugCourses: ['B.Sc Forensic Science', 'B.Sc Forensic Science & Criminology', 'B.Sc Cyber Forensics'],
    entranceExams: ['None (direct admission)', 'CUET'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 3-year degree, typically followed by M.Sc Forensic Science for serious career roles. Government forensic lab positions usually require the M.Sc and a recruitment exam.',
    skillWeights: { mathematics: 5, language: 7, science: 8, creativity: 6, people: 4, physical: 2, digital: 7 },
    priorityFit: { salary: 5, security: 7, balance: 6, abroad: 5, prestige: 7, passion: 8, growth: 6, hometown: 7 },
    competitiveBoardPct: { comfortable: 75, stretch: 65 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2.5–5 LPA fresh at private forensic labs and as research assistants; government forensic scientist roles (post M.Sc + exam) pay ₹4–8 LPA fresh with strong job security.',
      midCareerLPA: 'AI estimate — ₹8–18 LPA after 7+ years in senior government forensic roles; private cyber-forensics specialists can exceed this. Court expert witness work is paid separately and can be substantial.',
      note: 'Modest starting salaries but extraordinary job security in the government track. Cyber-forensics is the fastest-growing specialisation — pays particularly well as corporate and law-enforcement demand grows.',
    },
    demand: { score: 7, note: 'AI estimate — steady but limited volume in the government track; growing fast in cyber-forensics and private investigation labs.' },
    entryDifficulty: { score: 3, note: 'AI estimate — direct admission for most B.Sc programs; the bottleneck is the M.Sc + state forensic-scientist recruitment exam later.' },
    collegeTiers: [
      { label: 'Top forensic-science programs (AI estimate)', examples: ['Madras University', 'Madurai Kamaraj University', 'SRM University (Forensic Sciences)'], cutoffGuide: 'AI estimate — 75%+ in 12th typical at top tier.', feeRange: 'AI estimate — ₹25K–80K / year at university programs; ₹1L+ at private universities.' },
      { label: 'Strong colleges (AI estimate)', examples: ['Bharathidasan University', 'Periyar University Salem', 'a small number of TN private colleges'], cutoffGuide: 'AI estimate — 65–75%.', feeRange: 'AI estimate — ₹20K–60K / year' },
      { label: 'Other options (AI estimate)', examples: ['Limited TN-wide availability — verify each program individually'], cutoffGuide: 'AI estimate — varies; 60%+.', feeRange: 'AI estimate — ₹15K–80K / year' },
    ],
    costReality: 'AI estimate — a 3-year B.Sc Forensic Science in TN costs roughly ₹60K–4L total. The serious investment is the M.Sc that typically follows.',
    backupOptions: ['M.Sc Forensic Science (typically required for government roles)', 'Cyber-forensics specialisation — fastest growing subfield', 'Police / law enforcement entry (some states have direct routes)', 'Pivot to general lab analyst, QA chemistry, or research roles', 'M.Sc + PhD academic route'],
    honestCaveat: 'The CSI/Forensic Files version of this career is dramatically different from the day-to-day reality. Most forensic work is meticulous, slow lab testing — running 200 samples through standardised protocols — not solving murders. Court testimony is real but not glamorous: you spend hours being cross-examined on chain-of-custody documentation. Students drawn by the TV-show version often quit; those drawn by the science thrive. The graphic-content reality (crime scene photos, autopsy reports, decomposition descriptions) is constant — be honest with yourself about your tolerance before joining.',
    roadmap: [
      { title: 'Score 70%+ in 12th PCB or PCM', titleTa: '+12 PCB/PCM 70%+', detail: 'Most B.Sc Forensic programs accept multiple streams. Strong Chemistry + Biology (or Chemistry + Physics) matters more than one specific group.', window: 'Now', phase: 'now' },
      { title: 'Join B.Sc Forensic Science + active lab practice', titleTa: 'B.Sc + ஆய்வக பயிற்சி', detail: 'Choose programs with serious lab access. Visit a forensic lab during the degree if at all possible — connections matter for M.Sc admissions and government recruitment.', window: 'Years 1–3', phase: 'next' },
      { title: 'M.Sc Forensic Science + forensic-scientist recruitment exam', titleTa: 'M.Sc + அரசு தேர்வு', detail: 'For state forensic-lab roles. Alternative: cyber-forensics specialisation + private-sector role.', window: 'Years 3–6', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Honestly test your tolerance for graphic content', titleTa: 'வரைகலை உள்ளடக்க சகிப்புத்தன்மை சோதனை', detail: 'Watch a few real forensic documentaries (not crime dramas) — Forensic Files, autopsy-explanation YouTube channels. If you cannot watch comfortably for 30 minutes, this is not the right field.', priority: 'high' },
      { title: 'Strengthen 12th Chemistry + Biology', titleTa: 'வேதியியல் + உயிரியல் வலுப்படுத்து', detail: 'The science foundation of all forensic work. Year 1 leans heavily on chemistry; weak fundamentals make it grindingly hard.', priority: 'high' },
      { title: 'Read a forensic-science introduction', titleTa: 'அறிமுக புத்தகம் படிக்கவும்', detail: '"Forensic Science: An Introduction" by Saferstein gives an honest picture of the field. Cheap on Amazon India / available in libraries.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Strong Chemistry — analytical chemistry specifically', why: 'The technical foundation of forensic toxicology, drug analysis, and chemical evidence work. Strong 12th Chemistry makes year 1 dramatically easier.', freeResource: 'NCERT Chemistry, MIT OpenCourseWare introductory chemistry' },
      { skill: 'Clear, precise written English', why: 'Forensic reports become court evidence. A forensic scientist who writes ambiguously gets cases thrown out. Practice precise technical writing from year 1.', freeResource: 'BBC Learning English, online technical-writing tutorials' },
      { skill: 'Attention to procedural detail', why: 'Chain-of-custody documentation is the most-tested topic in court. Methodical, accurate process-following is the career-defining habit.', freeResource: 'Any hobby that rewards process precision — laboratory home-experiments, methodical cooking, structured note-taking' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.TECH FOOD TECHNOLOGY ────────────────────────────────────────────────
  {
    id: 'food-technologist',
    family: 'science-food-tech',
    isNiche: true,
    interestTags: ['research', 'engineering'],
    needsCounsellorReview: true,
    aversionConflicts: ['lab_practical', 'field_outdoor'],
    automation: 'ai_augmented',
    automationNote: 'Automation has transformed food manufacturing, but the food technologist who designs the process, ensures food safety, and develops new products is irreplaceable. India\'s food-processing sector is among the fastest-growing in the world.',
    title: 'Food Technologist (B.Tech Food Technology)',
    titleTa: 'உணவு தொழில்நுட்ப நிபுணர்',
    icon: '🍲',
    color: 'from-amber-500 to-orange-600',
    whatIsIt:
      'A four-year B.Tech blending chemical engineering, microbiology and food science — process design, food safety (HACCP, FSSAI compliance), product development, packaging technology, sensory science, dairy/cereal/meat technology. Career outcomes: FMCG companies (ITC, Nestle, Britannia, Amul), dairy cooperatives, food-safety roles, food-tech startups, government food-quality labs.',
    eligibleStreams: ['pcm', 'pcb', 'pcmb'],
    strongGroupCodes: ['102', '101', '208'],
    ugCourses: ['B.Tech Food Technology', 'B.Tech Food Process Engineering', 'B.Sc Food Science & Technology'],
    entranceExams: ['TNEA', 'TNAU (Agri)', 'JEE Main'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 4-year B.Tech. Strong placement at FMCG companies, dairy cooperatives, and food-tech startups during the final year. The FSSAI Food Safety Officer recruitment route is also well-trodden after the degree.',
    skillWeights: { mathematics: 7, language: 5, science: 8, creativity: 5, people: 4, physical: 3, digital: 6 },
    priorityFit: { salary: 6, security: 7, balance: 7, abroad: 6, prestige: 6, passion: 7, growth: 7, hometown: 7 },
    competitiveBoardPct: { comfortable: 75, stretch: 65 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹3.5–6 LPA fresh at FMCG companies; ₹4–7 LPA at top dairy cooperatives and food-tech startups. FSSAI Food Safety Officer roles ₹5–8 LPA fresh with government benefits.',
      midCareerLPA: 'AI estimate — ₹10–22 LPA after 7+ years for product development specialists, food-safety leads, and operations managers. Senior R&D roles at large FMCGs can exceed substantially.',
      note: 'Modest at entry, but the food sector\'s structural growth (food-processing is among India\'s priority sectors) creates strong mid-career trajectories. Specialisation in dairy, packaging, or food-safety auditing materially boosts earnings.',
    },
    demand: { score: 8, note: 'AI estimate — strong and growing. India\'s food-processing sector expansion (post-Production Linked Incentive schemes), rising packaged-food consumption, and FSSAI regulation enforcement all create sustained hiring.' },
    entryDifficulty: { score: 4, note: 'AI estimate — direct admission at most colleges. Top programs at IICPT Thanjavur and Anna University CFT are more selective.' },
    collegeTiers: [
      { label: 'Top food-tech programs (AI estimate)', examples: ['IICPT Thanjavur (Indian Institute of Crop Processing Technology)', 'Anna University CFT (Centre for Food Technology)', 'TNAU Coimbatore'], cutoffGuide: 'AI estimate — TNEA cutoff 175-195 / strong 12th marks typical.', feeRange: 'AI estimate — ₹40K–1.5L / year' },
      { label: 'Strong programs (AI estimate)', examples: ['Periyar University', 'Annamalai University', 'Karunya Institute', 'Sastra University'], cutoffGuide: 'AI estimate — 65%+ in 12th typical.', feeRange: 'AI estimate — ₹50K–2L / year' },
      { label: 'Other TN colleges with Food Tech tracks (AI estimate)', examples: ['Several Anna University affiliated and private colleges'], cutoffGuide: 'AI estimate — 60%+ typical.', feeRange: 'AI estimate — ₹40K–1.5L / year' },
    ],
    costReality: 'AI estimate — a 4-year B.Tech Food Technology in TN costs roughly ₹2L–8L total. IICPT and government programs are dramatically cheaper than private universities.',
    backupOptions: ['M.Tech Food Technology — research/academic route', 'FSSAI Food Safety Officer (state recruitment exam)', 'Pivot to general chemical engineering or biotech roles', 'Quality assurance / QC roles in pharma or chemicals', 'Food-tech startups (D2C food brands, agritech)'],
    honestCaveat: 'Food Technology is process engineering applied to food — students who pictured restaurant chef work or food blogging end up disappointed. The work is industrial: stainless steel tanks, sterile production lines, HACCP audits, batch records. Engineers who genuinely enjoy industrial chemistry and process problem-solving thrive; those who wanted "food" without "technology" usually struggle. Visit a food-processing plant before committing if at all possible.',
    roadmap: [
      { title: 'Score 70%+ in 12th PCM or PCB', titleTa: '+12 70%+', detail: 'TNEA / TNAU / JEE Main entry. Strong Chemistry + Mathematics matter most.', window: 'Now', phase: 'now' },
      { title: 'Join B.Tech Food Tech + industry exposure', titleTa: 'B.Tech + தொழில் அனுபவம்', detail: 'Choose programs with active industry tie-ups. Internships at FMCG companies during summer breaks transform placement outcomes.', window: 'Years 1–4', phase: 'next' },
      { title: 'Industry, FSSAI, or M.Tech', titleTa: 'தொழில் / FSSAI / M.Tech', detail: 'FMCG companies, FSSAI officer recruitment, or research-track M.Tech. Three credible exits.', window: 'Years 4–6', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Visit a food-processing facility if possible', titleTa: 'உணவு பதப்படுத்தும் ஆலை பார்வை', detail: 'Many Amul, Aavin, ITC and Britannia facilities offer student tours. One visit transforms understanding of the field.', priority: 'high' },
      { title: 'Strengthen Chemistry — organic + general', titleTa: 'வேதியியல் வலுப்படுத்துதல்', detail: 'Food science is applied chemistry. Strong 12th Chemistry on organic + general topics makes year 1 dramatically easier.', priority: 'high' },
      { title: 'Read the FSSAI website intro pages', titleTa: 'FSSAI அறிமுகம்', detail: 'India\'s food regulator. Understanding what FSSAI does, and the role of food technologists in compliance, sets useful expectations.', priority: 'medium', link: 'https://www.fssai.gov.in' },
    ],
    buildNowSkills: [
      { skill: 'Strong Chemistry — particularly organic and biochemistry basics', why: 'The deep foundation of food technology. Strong 12th Chemistry directly translates into year 1 understanding.', freeResource: 'NCERT Chemistry, MIT OpenCourseWare biochemistry intro' },
      { skill: 'Methodical, process-oriented thinking', why: 'Food production is about controlled, reproducible processes. Practising methodical step-by-step work (precision cooking, structured experiments) builds the right habit.', freeResource: 'Serious cooking with measurements and timing; following industrial-cooking YouTube channels' },
      { skill: 'Basic Excel for batch records / quality data', why: 'Food-tech work involves constant data tracking — yields, defect rates, sensory scores. Comfort with Excel from year 1 is a real asset.', freeResource: 'Microsoft Excel free YouTube basics' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.F.SC FISHERIES SCIENCE ──────────────────────────────────────────────
  {
    id: 'fisheries-scientist',
    family: 'science-fisheries',
    isNiche: true,
    interestTags: ['environment', 'research', 'govt'],
    needsCounsellorReview: true,
    aversionConflicts: ['field_outdoor', 'lab_practical', 'travel_away'],
    automation: 'human_facing',
    automationNote: 'Fisheries science combines field work (fish farms, coastal surveys, hatcheries) with lab analysis and policy work. The hands-on nature of aquaculture and the judgement-heavy work of fisheries management remain firmly human. India\'s blue-economy push (PMMSY) drives sustained growth.',
    title: 'Fisheries Scientist (B.F.Sc)',
    titleTa: 'மீன்வளம் விஞ்ஞானி',
    icon: '🐟',
    color: 'from-cyan-600 to-blue-700',
    whatIsIt:
      'A four-year B.F.Sc (Bachelor of Fisheries Science) — aquaculture, marine biology, fish processing technology, fishery economics, fisheries extension. Career outcomes: TN Fisheries Department, ICAR research institutes, aquaculture companies, fisheries cooperatives, hatchery management, fish-processing exports, fisheries extension officer roles. India is the world\'s second-largest fish producer; the sector is rapidly modernising.',
    eligibleStreams: ['pcb', 'pcmb'],
    strongGroupCodes: ['208', '204', '203'],
    ugCourses: ['B.F.Sc (Bachelor of Fisheries Science)', 'B.Sc Aquaculture'],
    entranceExams: ['TNAU (Agri)', 'None (direct admission via 12th marks)'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 4-year degree. Government fisheries officer recruitment via TNPSC after the degree; private sector aquaculture and fish-processing roles are open at graduation.',
    skillWeights: { mathematics: 5, language: 5, science: 8, creativity: 5, people: 5, physical: 6, digital: 5 },
    priorityFit: { salary: 5, security: 8, balance: 5, abroad: 5, prestige: 5, passion: 8, growth: 6, hometown: 6 },
    competitiveBoardPct: { comfortable: 70, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2.5–4.5 LPA fresh at private aquaculture and fish-processing firms; ₹4–7 LPA fresh at TN Fisheries Department roles via TNPSC.',
      midCareerLPA: 'AI estimate — ₹7–14 LPA after 7+ years for senior aquaculture managers, research scientists, and government fisheries officers. Mid-career private hatchery roles and exports specialists can exceed.',
      note: 'Modest but very secure salaries in the government track. The blue-economy growth means private aquaculture (shrimp farming, ornamental fish, value-added seafood) has rising upside.',
    },
    demand: { score: 7, note: 'AI estimate — moderate but growing. India\'s seafood exports (₹60,000+ Cr annually), aquaculture expansion, and the PMMSY (Pradhan Mantri Matsya Sampada Yojana) scheme create sustained demand.' },
    entryDifficulty: { score: 3, note: 'AI estimate — TN has the dedicated TNJFU and Fisheries College at Thoothukudi; seats are limited but cutoffs are accessible.' },
    collegeTiers: [
      { label: 'Top fisheries colleges in TN (AI estimate)', examples: ['Fisheries College & Research Institute Thoothukudi (TNJFU)', 'Fisheries College & Research Institute Ponneri (TNJFU)', 'Tamil Nadu Dr. J. Jayalalithaa Fisheries University main campus'], cutoffGuide: 'AI estimate — 70%+ in 12th PCB typical.', feeRange: 'AI estimate — ₹15K–60K / year (state university fees)' },
      { label: 'Alternative TN options (AI estimate)', examples: ['B.Sc Aquaculture at some Annamalai University and Bharathidasan University programs'], cutoffGuide: 'AI estimate — 60%+ typical.', feeRange: 'AI estimate — ₹15K–50K / year' },
      { label: 'National alternatives (if open to relocation)', examples: ['College of Fisheries CIFE Mumbai (ICAR)', 'KUFOS Kerala', 'College of Fisheries Mangalore'], cutoffGuide: 'AI estimate — national entrance test ICAR-AIEEA for some programs.', feeRange: 'AI estimate — varies; mostly affordable state programs' },
    ],
    costReality: 'AI estimate — a 4-year B.F.Sc in TN costs roughly ₹80K–3L total. State fisheries university fees are among the most affordable of any 4-year professional degree.',
    backupOptions: ['M.F.Sc / M.Sc Fisheries — research and academic track', 'TNPSC Fisheries Officer recruitment exam', 'Aquaculture entrepreneurship (shrimp farms, ornamental fish, fish hatcheries)', 'Seafood exports — TN is a major exporter, roles in QC and operations', 'PhD + ICAR scientist track'],
    honestCaveat: 'Fisheries Science is genuinely niche — most students have never heard of it, the colleges are few, and career visibility is low. The trade-off: dedicated TN-state fisheries university, near-zero competition, and a fast-growing sector. Field work involves real physical demands — coastal heat, salt water, fish handling, hatchery odors. Students who pictured a marine-biology research career often find the agricultural-extension reality different. Those drawn to applied aquaculture and food security find it deeply meaningful work.',
    roadmap: [
      { title: 'Score 65%+ in 12th PCB', titleTa: '+12 PCB 65%+', detail: 'TNJFU / direct admission at most fisheries programs. Strong Biology is the main signal.', window: 'Now', phase: 'now' },
      { title: 'Join B.F.Sc + active field exposure', titleTa: 'B.F.Sc + களப் பயிற்சி', detail: 'Hands-on time at TN coastal hatcheries (Mahabalipuram, Pulicat, Rameswaram) during the degree is essential. The TNJFU programs include this; verify with other programs.', window: 'Years 1–4', phase: 'next' },
      { title: 'TNPSC Fisheries Officer OR private aquaculture OR M.F.Sc', titleTa: 'TNPSC / தனியார் / M.F.Sc', detail: 'Three credible exits. Government route (TNPSC) is highest security; private aquaculture is highest growth.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Visit a coastal hatchery or aquaculture farm', titleTa: 'மீன் வளர்ப்பு மையம் பார்வை', detail: 'TN has many. A half-day visit transforms understanding of what the work involves day-to-day.', priority: 'high' },
      { title: 'Strengthen Biology — especially aquatic and ecosystem topics', titleTa: 'உயிரியல் — நீர்வாழ்வு', detail: 'Year 1 leans on aquatic biology, fish anatomy, water chemistry. Strong 12th Biology with a head start on aquatic ecosystems compounds.', priority: 'high' },
      { title: 'Read about India\'s blue economy and PMMSY', titleTa: 'நீலப் பொருளாதாரம் + PMMSY', detail: 'Understanding the policy context (PMMSY scheme, exports targets, aquaculture goals) sets realistic expectations and motivates the academic work.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Strong Biology — aquatic ecosystems, fish physiology', why: 'The technical foundation of all fisheries work. Strong 12th Biology with curiosity about aquatic life makes year 1 dramatically easier.', freeResource: 'NCERT Biology — ecosystems chapters, ICAR free e-learning portal' },
      { skill: 'Comfort with physical/outdoor work', why: 'Fisheries work involves real physical demands. Building stamina and tolerance for outdoor conditions before joining is honest preparation.', freeResource: 'Spend time at coastal areas, fish markets, hatcheries; build outdoor stamina through walking/swimming' },
      { skill: 'Basic Tamil/local-language fluency', why: 'Fisheries extension work involves direct community engagement with fishing communities. Comfortable Tamil is a career multiplier.', freeResource: 'Daily Tamil reading and listening; coastal community visits build vocabulary naturally' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.SC CLINICAL NUTRITION & DIETETICS ───────────────────────────────────
  {
    id: 'clinical-nutritionist',
    family: 'healthcare-nutrition',
    isNiche: true,
    interestTags: ['healthcare', 'research'],
    needsCounsellorReview: true,
    aversionConflicts: ['patient_care', 'sales_persuasion'],
    automation: 'high_human_judgment',
    automationNote: 'Apps can track calories; the clinical nutritionist who designs medical-nutrition therapy for a diabetic patient or counsels a child with an eating disorder cannot be automated. India\'s lifestyle-disease epidemic (diabetes, cardiac, obesity) drives sustained demand.',
    title: 'Clinical Nutritionist & Dietitian (B.Sc Nutrition)',
    titleTa: 'மருத்துவ ஊட்டச்சத்து நிபுணர்',
    icon: '🥗',
    color: 'from-green-500 to-emerald-600',
    whatIsIt:
      'A three-year B.Sc in Clinical Nutrition and Dietetics, typically followed by an M.Sc + Registered Dietitian (RD) qualification. Coursework spans biochemistry, human physiology, medical nutrition therapy, community nutrition, food science and counselling. Career outcomes: hospital dietitian, sports nutritionist, corporate wellness, private practice, public-health nutrition roles, increasingly health-tech and D2C wellness companies.',
    eligibleStreams: ['pcb', 'pcmb'],
    strongGroupCodes: ['208', '204', '203'],
    ugCourses: ['B.Sc Clinical Nutrition & Dietetics', 'B.Sc Nutrition & Dietetics', 'B.Sc Food Science & Nutrition'],
    entranceExams: ['None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 3-year degree + typical M.Sc + Indian Dietetic Association (IDA) Registered Dietitian (RD) certification — full pathway typically 5-6 years to a senior clinical role.',
    skillWeights: { mathematics: 5, language: 7, science: 8, creativity: 5, people: 8, physical: 2, digital: 5 },
    priorityFit: { salary: 5, security: 6, balance: 8, abroad: 7, prestige: 6, passion: 8, growth: 7, hometown: 7 },
    competitiveBoardPct: { comfortable: 70, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2–4 LPA fresh as a hospital diet assistant or wellness-app nutritionist; ₹3–6 LPA fresh at corporate hospitals after the M.Sc + RD certification.',
      midCareerLPA: 'AI estimate — ₹8–18 LPA after 7+ years for senior hospital dietitians, sports nutritionists at pro teams, and senior corporate wellness consultants. Private practice can substantially exceed for established practitioners.',
      note: 'Modest salaries in the early years (before M.Sc + RD) but strong long-term trajectory because demand is structural — India\'s lifestyle-disease burden creates a permanent need for clinical nutrition expertise. Private practice is the highest-earning route for those with strong patient relationships.',
    },
    demand: { score: 8, note: 'AI estimate — strong and growing. Hospital dietitian roles, corporate wellness programs, health-tech apps (HealthifyMe etc.), and private practice all expanding rapidly.' },
    entryDifficulty: { score: 2, note: 'AI estimate — direct admission at most colleges; among the most accessible health-science tracks.' },
    collegeTiers: [
      { label: 'Top nutrition programs in TN (AI estimate)', examples: ['Women\'s Christian College Chennai', 'Stella Maris Chennai', 'Ethiraj College Chennai', 'PSGR Krishnammal Coimbatore'], cutoffGuide: 'AI estimate — 70%+ in 12th typical at top tier.', feeRange: 'AI estimate — ₹25K–80K / year' },
      { label: 'Strong programs (AI estimate)', examples: ['Mother Teresa Women\'s University Kodaikanal', 'Avinashilingam Coimbatore', 'Madurai Kamaraj University', 'Bharathiar University'], cutoffGuide: 'AI estimate — 65–75%.', feeRange: 'AI estimate — ₹20K–60K / year' },
      { label: 'Other TN colleges with Nutrition tracks (AI estimate)', examples: ['Numerous TN women\'s colleges and home-science colleges'], cutoffGuide: 'AI estimate — 60%+ typical.', feeRange: 'AI estimate — ₹15K–60K / year' },
    ],
    costReality: 'AI estimate — a 3-year B.Sc Clinical Nutrition in TN costs roughly ₹60K–2.5L total. M.Sc + RD certification adds another ₹50K–1.5L. Total full-pathway investment is modest compared to most medical careers.',
    backupOptions: ['M.Sc Nutrition + Registered Dietitian (RD) — the standard career step', 'Sports nutrition specialisation (rising demand from pro teams, fitness industry)', 'Corporate wellness consulting', 'Health-tech apps (HealthifyMe, Cure.fit, GOQii)', 'Public health nutrition (government, NGOs, UN agencies)', 'Move abroad — Gulf countries actively hire Indian RDs'],
    honestCaveat: 'Clinical nutrition is patient counselling — emotional work with people who often need to change difficult habits (diabetic patients, eating disorders, post-surgery recovery). Students who pictured a "give people meal plans" version of the work find the emotional labour of behavioural counselling unexpectedly heavy. The Instagram-influencer version of "nutrition coaching" is unrelated to clinical work; choose this degree only if you genuinely want medical-nutrition therapy, not "fitness nutrition" social media. Salary at entry is modest — the trajectory rewards patience.',
    roadmap: [
      { title: 'Score 65%+ in 12th PCB', titleTa: '+12 PCB 65%+', detail: 'Direct admission. Strong Biology + Chemistry matter most.', window: 'Now', phase: 'now' },
      { title: 'Join B.Sc Nutrition + hospital exposure', titleTa: 'B.Sc + மருத்துவமனை பயிற்சி', detail: 'Programs with hospital tie-ups for internships are dramatically better. Year 3 clinical rotation is the most valuable part of the degree.', window: 'Years 1–3', phase: 'next' },
      { title: 'M.Sc + Registered Dietitian (RD) certification', titleTa: 'M.Sc + RD சான்றிதழ்', detail: 'The Indian Dietetic Association (IDA) RD certification is the credential employers seek. M.Sc + RD typically takes 2-3 years.', window: 'Years 3–6', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Shadow a hospital dietitian if possible', titleTa: 'மருத்துவமனை ஊட்டச்சத்து நிபுணரை பின்தொடரவும்', detail: 'Many TN hospitals (Apollo, Fortis, MIOT, Vijaya) allow short shadowing. One day of observation clarifies the day-to-day work better than any brochure.', priority: 'high' },
      { title: 'Strengthen Biology — especially nutrition and physiology', titleTa: 'உயிரியல் — ஊட்டச்சத்து + உடலியல்', detail: 'Year 1 leans heavily on human physiology and biochemistry. Strong 12th Biology with a head start on metabolism makes year 1 smoother.', priority: 'high' },
      { title: 'Read about real clinical nutrition cases', titleTa: 'மருத்துவ வழக்கு ஆய்வுகள் படிக்கவும்', detail: 'NIN (National Institute of Nutrition) Hyderabad publishes case studies and dietary guidelines. Free, authoritative, and a real picture of the field.', priority: 'medium', link: 'https://www.nin.res.in' },
    ],
    buildNowSkills: [
      { skill: 'Strong Biology — physiology, biochemistry, metabolism', why: 'The deep foundation of clinical nutrition. Strong 12th Biology with curiosity about how the body uses food makes year 1 dramatically easier.', freeResource: 'NCERT Biology, free Khan Academy biochemistry, NIN dietary guidelines' },
      { skill: 'Spoken English + Tamil (patient counselling)', why: 'Clinical nutrition is half medicine, half counselling. Confident, patient bilingual communication is the most career-defining soft skill.', freeResource: 'BBC Learning English, daily English reading, local Toastmasters clubs' },
      { skill: 'Empathy and active-listening practice', why: 'Behavioural change is hard. The nutritionist who listens carefully to patients\' lives builds lasting trust. Practise deliberately.', freeResource: 'Volunteer with elderly-care or disability organisations for short stints; honest reflective journaling' },
    ],
    lastReviewed: '2026-05',
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // ─── BATCH 3: AERO, MARINE & DEFENCE (Discovery Expansion, May 2026) ───────
  // ═══════════════════════════════════════════════════════════════════════════
  // Three high-stakes specialised tracks. First batch to exercise the new
  // `travel_away` aversion tag (Marine + Aerospace involve extended time
  // away from home) and `physical_training` aversion tag (Marine cadets and
  // Defence Studies students often face PT discipline as a cultural norm
  // even when not pursuing the armed forces).
  //
  // Note: Defence Studies is an ACADEMIC discipline (history, strategy,
  // geopolitics) — it is NOT a direct armed-forces entry. The honest
  // caveat on that entry calls this out clearly.

  // ─── B.E. AEROSPACE / AERONAUTICAL ENGINEERING ─────────────────────────────
  {
    id: 'aerospace-engineer',
    family: 'engineering-aerospace',
    isNiche: true,
    interestTags: ['engineering', 'research', 'defence'],
    needsCounsellorReview: true,
    aversionConflicts: ['travel_away', 'sitting_long', 'maths_heavy'],
    automation: 'high_human_judgment',
    automationNote: 'Aerospace engineering remains among the most automation-resilient engineering fields — designing aircraft, satellites, and propulsion systems requires deep judgement under extreme safety constraints. ISRO\'s Gaganyaan, private spaceflight (Skyroot, Agnikul), and HAL programs all create sustained demand for Indian aerospace engineers.',
    title: 'Aerospace / Aeronautical Engineer',
    titleTa: 'விண்வெளி / விமான பொறியியல்',
    icon: '🚀',
    color: 'from-indigo-600 to-blue-700',
    whatIsIt:
      'A four-year B.E. covering aircraft design, propulsion systems, aerodynamics, avionics, satellite/spacecraft engineering, and structural analysis. Career outcomes: ISRO, HAL, DRDO, private aerospace companies (Skyroot, Agnikul, Pixxel), aviation MRO firms (Air India Engineering Services), global aerospace majors (Boeing, Airbus India, GE Aerospace Bangalore). Among the most technically demanding engineering tracks; rewards genuinely curious engineers.',
    eligibleStreams: ['pcm'],
    strongGroupCodes: ['101', '102', '104'],
    ugCourses: ['B.E. Aerospace Engineering', 'B.E. Aeronautical Engineering', 'B.Tech Aerospace Engineering'],
    entranceExams: ['TNEA', 'JEE Main'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 4-year B.E. ISRO/HAL/DRDO recruitment via specific exams after graduation. Strong M.Tech / MS options abroad. Private aerospace startups increasingly hire UG graduates directly.',
    skillWeights: { mathematics: 9, language: 5, science: 9, creativity: 6, people: 4, physical: 2, digital: 8 },
    priorityFit: { salary: 7, security: 7, balance: 5, abroad: 8, prestige: 9, passion: 9, growth: 7, hometown: 5 },
    competitiveBoardPct: { comfortable: 85, stretch: 75 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹4–7 LPA fresh in domestic aerospace roles; ₹6–12 LPA at top private aerospace startups and global firms\' India centers. ISRO/HAL/DRDO scientist roles ₹8–14 LPA fresh with exceptional benefits and security.',
      midCareerLPA: 'AI estimate — ₹15–35 LPA after 7+ years for senior aerospace engineers in India; abroad opportunities (US, EU, Israel, Singapore) can multiply substantially. ISRO senior scientist roles at high ranks earn comparable to private with stronger pension/benefits.',
      note: 'Among the most prestigious engineering tracks in India. The trade-off: limited number of employers (5-6 major) means specific opportunities, less geographic flexibility. ISRO/HAL stability is exceptional but typically comes with relocation away from TN.',
    },
    demand: { score: 7, note: 'AI estimate — strong but specialised. India\'s space economy push, private spaceflight emergence (4-5 well-funded startups), and ongoing defence aerospace programs drive consistent hiring but volumes are smaller than CSE.' },
    entryDifficulty: { score: 8, note: 'AI estimate — highly competitive at top programs. MIT Chennai\'s Aerospace, Madras Institute of Technology, and Hindustan Institute Aeronautical have rising cutoffs as the field grows in visibility.' },
    collegeTiers: [
      { label: 'Top aerospace programs in TN (AI estimate)', examples: ['MIT Chennai (Anna University Madras Institute of Technology) — historic aerospace lineage', 'Madras Institute of Technology Chromepet', 'Hindustan Institute of Technology and Science (HITS) Chennai'], cutoffGuide: 'AI estimate — TNEA cutoff 190+ typical / JEE Main strong.', feeRange: 'AI estimate — ₹50K–2L / year' },
      { label: 'Strong aerospace programs (AI estimate)', examples: ['SRM University', 'Sastra University', 'Sri Krishna College of Technology Coimbatore', 'Karunya Institute'], cutoffGuide: 'AI estimate — TNEA cutoff 175-190.', feeRange: 'AI estimate — ₹1.5L–3.5L / year' },
      { label: 'National alternatives (if open to relocation)', examples: ['IIT Madras Aerospace (JEE Advanced)', 'IIT Bombay / Kanpur / Kharagpur Aerospace'], cutoffGuide: 'AI estimate — top IIT branches; JEE Advanced rank under ~3000 for general.', feeRange: 'AI estimate — ₹2.5L / year (IIT fees)' },
    ],
    costReality: 'AI estimate — a 4-year B.E. Aerospace in TN costs roughly ₹2L–14L total. The earnings ceiling justifies the investment for students with genuine aerospace interest and strong fundamentals.',
    backupOptions: ['M.Tech / MS Aerospace abroad (US, EU) — strong route for top performers', 'Pivot to general Mechanical Engineering roles if aerospace recruitment is tight', 'ISRO/HAL/DRDO recruitment exams', 'Private spaceflight startups (Skyroot, Agnikul, Pixxel, Bellatrix)', 'Aviation MRO and airline engineering departments'],
    honestCaveat: 'Aerospace rewards students who genuinely love mathematics and physics — especially mechanics, thermodynamics, fluid dynamics. Students who joined because "rockets are cool" without that pull struggle once the maths-heavy years 2-3 hit (linear algebra, partial differential equations, control theory). The job market is also genuinely smaller than CSE — strong aerospace engineers find roles, but average ones often pivot to general mechanical or software roles. Project sites (test facilities, launch ranges, manufacturing plants) frequently require extended periods away from home.',
    roadmap: [
      { title: 'Score 85%+ in 12th PCM with very strong Maths + Physics', titleTa: '+12 PCM 85%+ (கணிதம் + பௌதீகம் வலுவாக)', detail: 'TNEA / JEE Main entry. Mathematics and Physics are the foundation of every aerospace course — score them as high as possible.', window: 'Now', phase: 'now' },
      { title: 'Join B.E. Aerospace + research / project involvement', titleTa: 'B.E. + ஆராய்ச்சி திட்டங்கள்', detail: 'Get involved with student rocketry / UAV / aero modeling clubs from year 1. Personal projects matter enormously for ISRO/HAL/private aerospace recruitment.', window: 'Years 1–4', phase: 'next' },
      { title: 'ISRO/HAL exam OR M.Tech abroad OR private aerospace startup', titleTa: 'ISRO / M.Tech / தனியார் வெளியீடு', detail: 'Three strong exits. ISRO/HAL via specific recruitment exams; M.Tech abroad for research careers; private spaceflight startups for the most ambitious.', window: 'Years 4–6', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Strengthen Mathematics — calculus + linear algebra specifically', titleTa: 'கணிதம் வலுப்படுத்துதல்', detail: 'Aerospace is built on calculus and linear algebra. A head start before year 1 is a major advantage.', priority: 'high', freeResource: '3Blue1Brown YouTube (Essence of Calculus, Linear Algebra), Khan Academy advanced' },
      { title: 'Strengthen Physics — particularly mechanics and fluid behaviour', titleTa: 'பௌதீகம் — இயக்கவியல் + திரவம்', detail: 'The physical intuition behind aerospace. Strong 12th Physics with extra reading on fluid dynamics makes year 1 dramatically smoother.', priority: 'high' },
      { title: 'Follow ISRO + private Indian aerospace developments', titleTa: 'ISRO + தனியார் விண்வெளி தொடர்', detail: 'Knowing what ISRO, Skyroot, Agnikul, and Pixxel are doing builds context for choosing the right specialisation later.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Mathematics — calculus + linear algebra fundamentals', why: 'The single highest-ROI preparation. Aerospace is built on these two; arriving comfortable transforms year 1.', freeResource: '3Blue1Brown YouTube, MIT OpenCourseWare 18.01 + 18.06' },
      { skill: 'Hands-on aero modeling (RC planes, drones, model rockets)', why: 'Practical familiarity with how flying things actually behave separates good aerospace students from textbook-only ones. Year 1 makes far more sense with hands-on context.', freeResource: 'Indian aero-modelling clubs, free Flite Test YouTube tutorials, accessible RC aircraft kits' },
      { skill: 'Python programming for engineering simulation', why: 'Modern aerospace runs on computational tools. Python + NumPy + basic Matplotlib opens the door to MATLAB-style work and simulation skill development.', freeResource: 'freeCodeCamp Python, NumPy tutorials' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.E. MARINE ENGINEERING ───────────────────────────────────────────────
  {
    id: 'marine-engineer',
    family: 'engineering-marine',
    isNiche: true,
    interestTags: ['engineering', 'travel', 'defence'],
    needsCounsellorReview: true,
    aversionConflicts: ['travel_away', 'physical_training', 'shift_work'],
    automation: 'human_facing',
    automationNote: 'Shipboard engineering remains firmly human — ships sail for weeks far from any technician support, with marine engineers responsible for engine room, propulsion, electrical systems and emergency response. The job is automation-resistant by physical necessity.',
    title: 'Marine Engineer (B.E. Marine Engineering)',
    titleTa: 'கப்பல் பொறியியல்',
    icon: '⚓',
    color: 'from-blue-700 to-indigo-800',
    whatIsIt:
      'A four-year B.E. specifically structured for the merchant navy. Coursework covers marine propulsion (steam, diesel, gas turbine), shipboard electrical systems, refrigeration & air conditioning, marine auxiliary machinery, naval architecture basics, ship operations, and the international maritime law and safety conventions (STCW, MARPOL, SOLAS). Graduates sit for the Marine Engineering Officer Class IV exam and join merchant ships as junior engineer officers. Career outcomes: international shipping companies, oil-and-gas offshore platforms, cruise lines, naval architecture firms, marine surveying, shipyard engineering, port operations.',
    eligibleStreams: ['pcm'],
    strongGroupCodes: ['101', '102'],
    ugCourses: ['B.E. Marine Engineering (DGS-approved)', 'B.Tech Naval Architecture & Marine Engineering'],
    entranceExams: ['IMU-CET (Indian Maritime University)', 'JEE Main'],
    pathwayType: 'professional-track',
    timeToCareer: 'A 4-year B.E. followed by the Marine Engineering Officer Class IV exam, then onboard appointment as junior engineer. Career progression to Chief Engineer is typically 8-12 years of sea service. The earnings trajectory is dramatic across that period.',
    skillWeights: { mathematics: 8, language: 5, science: 7, creativity: 5, people: 5, physical: 7, digital: 7 },
    priorityFit: { salary: 9, security: 7, balance: 3, abroad: 9, prestige: 7, passion: 7, growth: 8, hometown: 3 },
    competitiveBoardPct: { comfortable: 75, stretch: 65 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹6–10 LPA tax-free fresh as a junior engineer on international shipping vessels (most marine officers receive salary tax-free under NRI status). Indian-flag vessels pay less.',
      midCareerLPA: 'AI estimate — Second Engineer (5-7 years): ₹15–30 LPA tax-free. Chief Engineer (8-12 years): ₹30–80 LPA tax-free. Among the highest-earning engineering paths in India when sailing internationally.',
      note: 'The financial trajectory is among the strongest in any UG path BUT it comes with extraordinary trade-offs: 6-9 months at sea per voyage, no contact with family for weeks at a time, no work-life balance during contracts, rotating night shifts, and physical/mental demands of shipboard life. The salary reflects these trade-offs.',
    },
    demand: { score: 8, note: 'AI estimate — strong global demand for trained marine officers; chronic shortage of qualified Indian officers globally. Shipping is the literal backbone of global trade.' },
    entryDifficulty: { score: 6, note: 'AI estimate — moderate at TN colleges. IMU-CET is the standard entrance; the more selective filter is the mandatory medical examination (vision, hearing, physical fitness standards must be met before joining).' },
    collegeTiers: [
      { label: 'Top marine engineering colleges in TN (AI estimate)', examples: ['Indian Maritime University (IMU) Chennai Campus', 'Academy of Maritime Education and Training (AMET) University', 'Hindustan Institute Marine Engineering'], cutoffGuide: 'AI estimate — IMU-CET rank under ~1500 / JEE Main strong.', feeRange: 'AI estimate — ₹2L–6L / year (marine engineering programs are among the more expensive)' },
      { label: 'Other DGS-approved colleges (AI estimate)', examples: ['CV Raman Global Marine College Chennai', 'Tolani Maritime Institute Pune (if relocating)'], cutoffGuide: 'AI estimate — IMU-CET / direct admission with strong marks.', feeRange: 'AI estimate — ₹3L–6L / year' },
      { label: 'Critical: DGS approval check', examples: ['DGS (Directorate General of Shipping) approval is MANDATORY for the Class IV exam'], cutoffGuide: 'Confirm DGS approval status at https://www.dgshipping.gov.in before admitting to any college.', feeRange: 'Non-DGS-approved programs are functionally useless for the merchant navy career.' },
    ],
    costReality: 'AI estimate — a 4-year B.E. Marine Engineering in TN costs roughly ₹8L–25L total. Education-loan-funded; the loan is typically repayable in 2-3 years of sailing because of the strong international earnings.',
    backupOptions: ['Shore-based marine engineering roles (port operations, shipyard engineering, marine surveying)', 'Naval Architecture / Ship design (typically after M.Tech)', 'Oil-and-gas offshore platform engineering', 'Marine insurance / maritime law (after additional qualifications)', 'Pivot to general Mechanical Engineering if sea life is not viable'],
    honestCaveat: 'Marine Engineering trades extraordinary income for genuinely difficult life conditions. Months at sea away from family, rotating watches, isolated working environments, and the physical/mental demands of shipboard life are real. Students enchanted by "travel the world" often discover that you mostly see the engine room, not exotic ports. The career suits people who genuinely enjoy mechanical systems, can tolerate isolation, and find the financial trade-off worth it. Verify your medical eligibility (vision, hearing, fitness) BEFORE joining — failing the merchant navy medical examination after the degree is genuinely heartbreaking. Verify DGS approval of the college — non-approved colleges produce graduates who cannot sail.',
    roadmap: [
      { title: 'Score 70%+ in 12th PCM + pass medical examination', titleTa: '+12 PCM 70%+ + மருத்துவ பரிசோதனை', detail: 'IMU-CET or JEE Main entry. The mandatory medical examination (vision 6/6 with/without correction, hearing standards) is the single most important pre-step — get it done early.', window: 'Now', phase: 'now' },
      { title: 'Join DGS-approved B.E. Marine Engineering', titleTa: 'DGS அங்கீகாரம் கொண்ட B.E.', detail: 'DGS approval is non-negotiable. Verify status at the DGS website before any college. The shipboard training cruise during the degree is essential.', window: 'Years 1–4', phase: 'next' },
      { title: 'MEO Class IV exam + first ship as junior engineer officer', titleTa: 'MEO Class IV தேர்வு + முதல் கப்பல்', detail: 'The Marine Engineering Officer Class IV certification opens the actual career. First international voyage is typically 6-9 months.', window: 'Years 4–6', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Get a complete medical examination', titleTa: 'முழுமையான மருத்துவ பரிசோதனை', detail: 'Especially vision (corrected and uncorrected), color blindness test, hearing, and general fitness. The merchant navy standards are strict. Knowing your eligibility BEFORE committing 4 years is essential.', priority: 'high' },
      { title: 'Verify DGS approval for any target college', titleTa: 'DGS அங்கீகாரம் சரிபார்', detail: 'Visit https://www.dgshipping.gov.in/Content/ApprovedTrainingInstitutes.aspx — only DGS-approved colleges produce employable marine engineers.', priority: 'high', link: 'https://www.dgshipping.gov.in' },
      { title: 'Read honest accounts of life at sea', titleTa: 'கடல் வாழ்க்கை பற்றி நேர்மையான கதைகள் படிக்கவும்', detail: 'Find merchant navy officers on YouTube / blogs who honestly describe shipboard life — the lows as well as the highs. The trade-off becomes clear with first-hand accounts.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Strong Mathematics + Physics (mechanics, thermodynamics)', why: 'Marine engineering is applied mechanical engineering with naval architecture flavor. Strong 12th Maths + Physics fundamentals are essential.', freeResource: 'NCERT Maths + Physics, MIT OpenCourseWare 8.01 + 8.02' },
      { skill: 'Physical fitness and tolerance for hard work', why: 'Shipboard work is physically demanding. Building stamina, swimming, and general fitness before joining is honest preparation.', freeResource: 'Daily exercise routine, swimming, structured fitness work' },
      { skill: 'Mechanical curiosity (how engines and machines work)', why: 'Marine engineers spend their careers troubleshooting machinery. Genuine curiosity about how engines work is the working temperament that makes this career enjoyable.', freeResource: 'Engineering Explained YouTube, How Things Work books, time spent with car/bike repairs' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.A. DEFENCE AND STRATEGIC STUDIES ────────────────────────────────────
  {
    id: 'defence-strategic-studies-graduate',
    family: 'defence-strategic',
    isNiche: true,
    interestTags: ['defence', 'research', 'govt'],
    needsCounsellorReview: true,
    aversionConflicts: ['physical_training', 'memorisation', 'high_competition'],
    automation: 'high_human_judgment',
    automationNote: 'Strategic analysis, geopolitical assessment, and defence policy work all centre on contextual human judgement — exactly the work AI struggles with. The graduates who go on to think-tank, policy research and defence journalism roles do work that is fundamentally human.',
    title: 'Defence & Strategic Studies (B.A.)',
    titleTa: 'பாதுகாப்பு மற்றும் மூலோபாய ஆய்வு (B.A.)',
    icon: '🛡️',
    color: 'from-zinc-700 to-stone-800',
    whatIsIt:
      'A three-year B.A. that studies military history, defence policy, geopolitics, international relations, strategic thinking, internal security, and disaster management as academic disciplines. IMPORTANT: this is an ACADEMIC degree, NOT a direct entry route into the armed forces — the armed forces are entered via NDA (12th), CDS (post-graduation), or Agnipath. Career outcomes from the B.A. itself: civil services preparation (extremely common), defence journalism, think-tank research, internal-security roles in government, academic teaching, and corporate strategic analysis.',
    eligibleStreams: ['arts', 'pcm', 'pcb', 'pcmb', 'commerce'],
    strongGroupCodes: ['401', '402', '404', '405'],
    ugCourses: ['B.A. Defence and Strategic Studies', 'B.A. Defence Studies', 'B.A. Strategic and Defence Studies'],
    entranceExams: ['None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 3-year B.A. The strongest career trajectories typically involve a subsequent UPSC (Civil Services) attempt, M.A. + PhD academic route, or direct entry into defence journalism / policy think-tanks.',
    skillWeights: { mathematics: 3, language: 8, science: 4, creativity: 5, people: 7, physical: 3, digital: 5 },
    priorityFit: { salary: 5, security: 7, balance: 6, abroad: 6, prestige: 8, passion: 8, growth: 6, hometown: 7 },
    competitiveBoardPct: { comfortable: 65, stretch: 55 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2–4 LPA fresh in defence journalism, junior think-tank researcher, or academic teaching assistant roles. Direct B.A.-level employment in defence is limited.',
      midCareerLPA: 'AI estimate — Strongest trajectory is via UPSC Civil Services (₹8–20 LPA at IAS/IPS junior levels, growing substantially). Defence journalism and policy think-tank seniors ₹10–25 LPA after 7+ years. Academic faculty in defence studies ₹8–18 LPA.',
      note: 'The B.A. alone is a modest credential — its real value comes from what you do AFTER. Top earners use the degree as a stepping stone to UPSC, defence journalism with byline credibility, or policy think-tank research (ORF, Carnegie India, IDSA). Direct corporate employment is limited.',
    },
    demand: { score: 5, note: 'AI estimate — limited direct demand for the B.A. itself; strong demand for the SECONDARY career paths it feeds (civil services aspirants, defence journalists, think-tank researchers).' },
    entryDifficulty: { score: 2, note: 'AI estimate — direct admission; widely available where offered. Madras University, Madurai Kamaraj University, and several private colleges run B.A. Defence Studies programs.' },
    collegeTiers: [
      { label: 'Top Defence Studies programs in TN (AI estimate)', examples: ['Madras University', 'Madurai Kamaraj University', 'Madras Christian College'], cutoffGuide: 'AI estimate — 60–70% in 12th typical.', feeRange: 'AI estimate — ₹15K–60K / year' },
      { label: 'Alternative programs (AI estimate)', examples: ['Loyola College Chennai (related International Studies)', 'a small number of TN colleges with related programs'], cutoffGuide: 'AI estimate — 55–70%.', feeRange: 'AI estimate — ₹15K–80K / year' },
      { label: 'National alternatives (if open to relocation)', examples: ['University of Madras has a strong tradition; nationally, Allahabad and Pune University Defence Studies are well-regarded'], cutoffGuide: 'AI estimate — varies; typically accessible.', feeRange: 'AI estimate — ₹15K–60K / year' },
    ],
    costReality: 'AI estimate — a 3-year B.A. Defence Studies in TN costs roughly ₹50K–2.5L total. Among the most affordable degrees on offer. The real investment is the post-graduation specialisation (M.A., UPSC preparation, or journalism credentials).',
    backupOptions: ['UPSC Civil Services preparation — the most common destination', 'M.A. + PhD in Defence Studies → academic faculty career', 'Defence journalism (The Hindu, Indian Express, Times of India defence desks; print + TV)', 'Internal-security adjacent roles in state and central government', 'NDA / CDS / Agnipath if armed-forces interest is strong', 'Corporate strategic analysis (limited but exists at large consultancies)'],
    honestCaveat: 'Defence Studies is an ACADEMIC degree — not a uniform, not a path to direct armed-forces commission. Students who join expecting "military training" find a classroom-based study of strategy, history, and policy. The strongest career trajectories require POST-graduation investment: UPSC preparation (2-3 year grind), M.A. + PhD (5+ years), or journalism credentials. Direct B.A.-level employment in defence is limited. Choose this only if you genuinely love reading military history and strategic theory, AND have a clear post-graduation plan. The PT-discipline culture in some Defence Studies programs (uniformed faculty, parade ground references) is genuine but does not translate to actual armed forces eligibility — that requires separate NDA/CDS routes.',
    roadmap: [
      { title: 'Score 60%+ in 12th (any stream)', titleTa: '+12 60%+ (எந்த பாடப்பிரிவும்)', detail: 'Direct admission. Strong English + History + Civics backgrounds help most.', window: 'Now', phase: 'now' },
      { title: 'Join B.A. Defence Studies + post-graduation planning from year 1', titleTa: 'B.A. + பட்டப்படிப்பு திட்டமிடல்', detail: 'The B.A. alone is not the destination. Decide by year 1 whether you target UPSC, journalism, or academia — and start building toward that.', window: 'Years 1–3', phase: 'next' },
      { title: 'UPSC / M.A. / Defence journalism — pick one and commit', titleTa: 'UPSC / M.A. / பத்திரிகை', detail: 'Three credible exits. UPSC is the most common and most competitive. M.A. + PhD opens academia. Journalism opens defence-desk careers.', window: 'Years 3–6', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Read one military-history book and one geopolitics book', titleTa: 'இராணுவ வரலாறு + உலக அரசியல் புத்தகங்கள்', detail: 'Honest test of whether you actually enjoy the material. "India\'s Wars" by Arjun Subramaniam, "The Grand Chessboard" by Brzezinski — accessible starting points.', priority: 'high' },
      { title: 'Decide your post-B.A. trajectory early', titleTa: 'B.A.-க்கு பிந்தைய திட்டம்', detail: 'UPSC, M.A., or defence journalism — they require very different preparation. The earlier you choose, the better positioned you are at graduation.', priority: 'high' },
      { title: 'Daily news + editorial habit', titleTa: 'தினசரி செய்தி + ஆசிரியர் கட்டுரை', detail: 'Strategic studies students who read The Hindu editorials + foreign affairs sections daily compound through 3 years — and arrive at UPSC preparation already prepared.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Strong English — both written and read', why: 'Defence Studies is a reading-heavy and writing-heavy discipline. Strong English from year 1 transforms every course.', freeResource: 'The Hindu daily editorial reading, BBC Learning English, daily writing practice' },
      { skill: 'Daily current-affairs and geopolitical news habit', why: 'The discipline rewards students who follow global events with curiosity. 30 minutes daily compounds over 3 years.', freeResource: 'The Hindu, Indian Express, The Diplomat, BBC News, free Brookings articles' },
      { skill: 'Critical reading and structured argument', why: 'Defence policy work IS argument from evidence. Practising structured writing and argument from year 1 directly translates to career skill.', freeResource: 'Free online debate clubs, structured essay-writing exercises, IDSA free working papers' },
    ],
    lastReviewed: '2026-05',
  },  // ═══════════════════════════════════════════════════════════════════════════
  // ─── BATCH 4a: NICHE INDUSTRIAL ENGINEERING — PART 1 (May 2026) ────────────
  // ═══════════════════════════════════════════════════════════════════════════
  // First half of the niche industrial track. Each entry's skillWeights are
  // tuned to differentiate it from generic Mechanical Engineering (which has
  // math 8, science 8, physical 4, digital 6). Two pairs share a family for
  // dedup: industrial + manufacturing (factory-ops twins) and metallurgy +
  // ceramics (materials-science twins, finished in 4b).

  // ─── B.E. INDUSTRIAL ENGINEERING ───────────────────────────────────────────
  {
    id: 'industrial-engineer',
    family: 'engineering-industrial-ops',
    isNiche: true,
    interestTags: ['engineering', 'finance'],
    needsCounsellorReview: true,
    aversionConflicts: ['sitting_long', 'paperwork'],
    automation: 'ai_augmented',
    automationNote: 'Industrial engineering IS the discipline of automating and optimising other work. AI tools extend what one IE can do; they do not replace the judgement of designing a better process or supply chain. India\'s Industry 4.0 transition drives sustained demand.',
    title: 'Industrial Engineer',
    titleTa: 'தொழில்துறை பொறியியலாளர்',
    icon: '📈',
    color: 'from-indigo-500 to-blue-600',
    whatIsIt:
      'A four-year B.E. focused on the science of running operations efficiently — operations research, supply chain optimisation, work-study and ergonomics, quality management (Six Sigma), production planning, and increasingly data-driven decision systems. The "white-collar engineer" — much of the work happens at a desk with data and stakeholders, not at a workbench. Career outcomes: operations management, supply chain analyst, consulting (Big 4 operations advisory), production planning, manufacturing optimisation roles.',
    eligibleStreams: ['pcm'],
    strongGroupCodes: ['101', '102'],
    ugCourses: ['B.E. Industrial Engineering', 'B.Tech Industrial Engineering & Management', 'B.E. Industrial Engineering & Operations Research'],
    entranceExams: ['TNEA', 'JEE Main'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 4-year B.E. Strong placement at manufacturing companies (automotive, FMCG), supply-chain consulting firms, and increasingly e-commerce operations roles. MBA after 2-3 years is the most common acceleration step.',
    skillWeights: { mathematics: 8, language: 6, science: 5, creativity: 6, people: 7, physical: 2, digital: 8 },
    priorityFit: { salary: 7, security: 7, balance: 7, abroad: 7, prestige: 6, passion: 6, growth: 8, hometown: 6 },
    competitiveBoardPct: { comfortable: 75, stretch: 65 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹3.5–6 LPA fresh at manufacturing companies; ₹5–9 LPA at Big 4 operations consulting and supply-chain roles at top firms. Higher than entry-level mechanical because of the analytical/consulting tilt.',
      midCareerLPA: 'AI estimate — ₹12–28 LPA after 7+ years for operations managers, senior consultants, and supply-chain leads. MBA + 5-7 years of IE experience can substantially exceed this in consulting.',
      note: 'Industrial Engineering pays well at mid-career because the analytical skills translate directly into consulting, operations management, and supply-chain leadership. The MBA route from IE is unusually high-ROI.',
    },
    demand: { score: 8, note: 'AI estimate — strong demand across manufacturing, e-commerce logistics, consulting, and supply-chain analytics. India\'s manufacturing push (Make in India, PLI schemes) creates sustained hiring.' },
    entryDifficulty: { score: 5, note: 'AI estimate — direct TNEA admission. Programs are less common than CSE or general mechanical so seats are limited.' },
    collegeTiers: [
      { label: 'Top Industrial Engineering programs in TN (AI estimate)', examples: ['Anna University CEG Chennai', 'PSG College of Technology Coimbatore', 'NIT Trichy (Industrial Engineering elective in Production Engg)'], cutoffGuide: 'AI estimate — TNEA cutoff 185+ typical; NIT via JEE Main.', feeRange: 'AI estimate — ₹40K–1.5L / year' },
      { label: 'Strong colleges (AI estimate)', examples: ['Thiagarajar College of Engineering Madurai', 'Sastra University', 'Sri Sairam Engineering'], cutoffGuide: 'AI estimate — TNEA cutoff 170-185.', feeRange: 'AI estimate — ₹1L–3L / year' },
      { label: 'Other TN colleges with IE / Production Engineering tracks (AI estimate)', examples: ['Several Anna University affiliated colleges'], cutoffGuide: 'AI estimate — TNEA cutoff 150-170.', feeRange: 'AI estimate — ₹80K–2L / year' },
    ],
    costReality: 'AI estimate — a 4-year B.E. Industrial Engineering in TN costs roughly ₹2L–10L total. Strong ROI because of the analytical/consulting career tilt.',
    backupOptions: ['MBA after 2-3 years — IE + MBA is unusually high-ROI', 'Pivot to general mechanical / production engineering roles', 'Supply chain / logistics analyst roles at e-commerce companies', 'Big 4 operations consulting (Deloitte, EY, PwC, KPMG)', 'Six Sigma + Lean certifications + senior operations roles'],
    honestCaveat: 'Industrial Engineering is less hands-on than mechanical or manufacturing — much of the work is at a desk, analysing data, building dashboards, talking to stakeholders. Students who imagined "engineering" as designing physical things often find IE feels more like business analytics. The career rewards students who genuinely enjoy data-driven problem-solving and process thinking. Many IE students eventually pivot fully into consulting or operations management roles where the engineering label fades.',
    roadmap: [
      { title: 'Score 75%+ in 12th PCM', titleTa: '+12 PCM 75%+', detail: 'TNEA / JEE Main entry. Strong Mathematics matters more than Physics for IE.', window: 'Now', phase: 'now' },
      { title: 'Join B.E. IE + strong analytical skill-building', titleTa: 'B.E. IE + பகுப்பாய்வு திறன்', detail: 'Master Excel, Power BI / Tableau, basic Python during the degree. Six Sigma green belt by year 4 is standard. Internships at manufacturing companies are essential.', window: 'Years 1–4', phase: 'next' },
      { title: 'Operations role, consulting, or MBA — pick one', titleTa: 'வேலை / ஆலோசனை / MBA', detail: 'Industrial engineers split into three trajectories. Pick by year 3 based on what you actually enjoyed.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Start learning Excel + basic data analysis', titleTa: 'எக்செல் + தரவு பகுப்பாய்வு', detail: 'IE is data-driven. Comfort with spreadsheets and basic data manipulation from year 1 is the single highest-ROI prep skill.', priority: 'high' },
      { title: 'Read one book on operations / supply chain', titleTa: 'செயல்பாடுகள் / விநியோகச் சங்கிலி புத்தகம்', detail: '"The Goal" by Eliyahu Goldratt is the classic IE introduction — a novel that teaches operations thinking. Cheap on Amazon India.', priority: 'high' },
      { title: 'Visit a manufacturing facility if possible', titleTa: 'உற்பத்தி வசதி பார்வை', detail: 'Many TN factories (TVS, Hyundai, Ford suppliers) offer student tours. Understanding the physical reality of operations sharpens later coursework.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Mathematics — statistics + linear programming basics', why: 'Operations research is built on these. Strong 12th Maths with a head start on statistics dramatically eases year 2-3 OR courses.', freeResource: 'NCERT Maths, Khan Academy statistics, MIT OpenCourseWare introductory OR' },
      { skill: 'Excel + spreadsheet fluency', why: 'IE work happens in spreadsheets — supply chain models, capacity calculations, ROI analyses. Strong Excel from day 1 is a working necessity.', freeResource: 'Microsoft Excel free YouTube (Leila Gharani, ExcelIsFun)' },
      { skill: 'Reading about how factories and supply chains actually work', why: 'IE coursework makes far more sense with industry context. Strong supply-chain intuition compounds for a decade.', freeResource: 'Bloomberg supply-chain coverage, The Goal (book), free Coursera Supply Chain Foundations' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.E. MANUFACTURING ENGINEERING ────────────────────────────────────────
  {
    id: 'manufacturing-engineer',
    family: 'engineering-industrial-ops',
    isNiche: true,
    interestTags: ['engineering'],
    needsCounsellorReview: true,
    aversionConflicts: ['field_outdoor'],
    automation: 'human_facing',
    automationNote: 'Manufacturing engineers DESIGN automation systems — they extend automation rather than being displaced by it. Lean manufacturing, Industry 4.0 implementation, and CNC programming all remain firmly human work. India\'s manufacturing-growth push creates strong demand.',
    title: 'Manufacturing Engineer',
    titleTa: 'உற்பத்தி பொறியியலாளர்',
    icon: '🏭',
    color: 'from-zinc-500 to-slate-600',
    whatIsIt:
      'A four-year B.E. focused on the engineering of making things at scale — CNC programming, CAD/CAM, lean manufacturing, production planning, quality control, automated production lines, additive manufacturing (3D printing). The hands-on counterpart to Industrial Engineering — most of the work happens on a factory floor or in a CAD/CAM environment. Career outcomes: production engineer, manufacturing technologist, CNC programmer, lean / continuous-improvement engineer, plant engineering roles at automotive, electronics, FMCG, defence manufacturing.',
    eligibleStreams: ['pcm'],
    strongGroupCodes: ['101', '102'],
    ugCourses: ['B.E. Manufacturing Engineering', 'B.E. Production Engineering', 'B.Tech Manufacturing Engineering & Technology'],
    entranceExams: ['TNEA', 'JEE Main'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 4-year B.E. Strong placement at manufacturing companies in years 7-8 (final placement season). Career path typically starts on the factory floor and progresses to plant management.',
    skillWeights: { mathematics: 7, language: 4, science: 7, creativity: 5, people: 5, physical: 5, digital: 7 },
    priorityFit: { salary: 6, security: 7, balance: 6, abroad: 6, prestige: 5, passion: 6, growth: 7, hometown: 7 },
    competitiveBoardPct: { comfortable: 70, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹3.5–5.5 LPA fresh at TN manufacturing companies (automotive, electronics, FMCG); ₹4–7 LPA at top corporate manufacturing operations.',
      midCareerLPA: 'AI estimate — ₹10–22 LPA after 7+ years for plant engineers, production managers, and lean / continuous-improvement leads. Senior plant managers at large facilities can exceed substantially.',
      note: 'Steady earnings, strong job security in the manufacturing-heavy TN economy (automotive cluster Chennai, electronics manufacturing). Less prestige than CSE, but stable factory-based career.',
    },
    demand: { score: 8, note: 'AI estimate — strong and structural. TN is one of India\'s leading manufacturing states; demand from automotive (Chennai cluster), electronics, FMCG, and defence manufacturing is consistent.' },
    entryDifficulty: { score: 4, note: 'AI estimate — direct TNEA admission widely available. Cutoffs lower than CSE but the field has strong placement.' },
    collegeTiers: [
      { label: 'Top Manufacturing Engineering programs (AI estimate)', examples: ['Anna University CEG / MIT', 'PSG Tech Coimbatore', 'NIT Trichy', 'Thiagarajar College of Engineering'], cutoffGuide: 'AI estimate — TNEA cutoff 180-195 typical.', feeRange: 'AI estimate — ₹40K–1.5L / year' },
      { label: 'Strong programs (AI estimate)', examples: ['Sastra University', 'SSN College', 'Kongu Engineering College Erode', 'Coimbatore Institute of Technology'], cutoffGuide: 'AI estimate — TNEA cutoff 165-185.', feeRange: 'AI estimate — ₹1L–3L / year' },
      { label: 'Other TN colleges with Manufacturing Engineering (AI estimate)', examples: ['Many Anna University affiliated colleges'], cutoffGuide: 'AI estimate — TNEA cutoff 145-170.', feeRange: 'AI estimate — ₹70K–2L / year' },
    ],
    costReality: 'AI estimate — a 4-year B.E. Manufacturing Engineering in TN costs roughly ₹2L–10L total. TN\'s manufacturing strength means hometown jobs are realistic — a real cost saving vs students who relocate for tech jobs.',
    backupOptions: ['M.Tech Manufacturing / Industrial Engineering — senior plant roles', 'CNC / CAM specialisation certifications', 'Pivot to mechanical / production engineering roles', 'Lean Six Sigma certifications + senior operations roles', 'Manufacturing-tech startups (additive manufacturing, robotics)'],
    honestCaveat: 'Manufacturing engineering is genuinely hands-on — students who picked engineering hoping to avoid factory floors are in the wrong field. Work conditions include factory noise, heat in some plants, rotating-shift exposure during the first 2-3 years, and physical presence at the production line. Students who genuinely enjoy seeing physical things being made thrive; those who imagined air-conditioned offices usually pivot away. Pay starts modest but the trajectory is steady, and TN\'s manufacturing density means hometown work is realistic.',
    roadmap: [
      { title: 'Score 70%+ in 12th PCM', titleTa: '+12 PCM 70%+', detail: 'TNEA / JEE Main entry. Strong Maths + Physics matter most.', window: 'Now', phase: 'now' },
      { title: 'Join B.E. Manufacturing + hands-on practical exposure', titleTa: 'B.E. + நடைமுறை பயிற்சி', detail: 'Choose programs with active machine shops, CNC labs, and CAD/CAM software access. Coursework alone is not enough — practical comfort with workshops is the differentiator.', window: 'Years 1–4', phase: 'next' },
      { title: 'Plant engineer role + Lean Six Sigma certification', titleTa: 'வேலை + Lean Six Sigma', detail: 'First role typically on factory floor as production / plant engineer. Lean Six Sigma green belt is the standard mid-career accelerator.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Visit a manufacturing facility', titleTa: 'உற்பத்தி வசதி பார்வை', detail: 'TN automotive cluster (Hyundai Sriperumbudur, TVS Hosur, Royal Enfield Chennai), electronics manufacturing — many allow student tours. Essential reality check.', priority: 'high' },
      { title: 'Learn basic CAD software over the summer', titleTa: 'CAD மென்பொருள் தொடக்கம்', detail: 'AutoCAD or SolidWorks (free student versions) — basic 2D and 3D drafting before year 1 puts you ahead of classmates seeing it for the first time.', priority: 'high' },
      { title: 'Strengthen Physics + basic mechanics', titleTa: 'பௌதீகம் + இயக்கவியல்', detail: 'The foundation of manufacturing engineering. Strong 12th Physics makes year 1 dramatically easier.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'CAD software (AutoCAD / SolidWorks)', why: 'The working tool of manufacturing engineers. Free student versions; comfort before year 1 is a major advantage in design / drafting coursework.', freeResource: 'Autodesk Student license (free), SolidWorks free trial, YouTube CAD tutorials' },
      { skill: 'Mechanical curiosity — how machines and tools actually work', why: 'Manufacturing engineering rewards genuine curiosity about machinery. Time spent in workshops, garages, or maker spaces builds real intuition.', freeResource: 'Engineering Explained YouTube, "How It\'s Made" series, local maker spaces' },
      { skill: 'Basic Excel for production data', why: 'Plant work involves constant data tracking — yields, defect rates, downtime. Comfort with Excel from year 1 is a real asset.', freeResource: 'Microsoft Excel free YouTube basics' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.E. METALLURGICAL ENGINEERING ────────────────────────────────────────
  {
    id: 'metallurgical-engineer',
    family: 'engineering-materials',
    isNiche: true,
    interestTags: ['engineering', 'research'],
    needsCounsellorReview: true,
    aversionConflicts: ['lab_practical', 'field_outdoor'],
    automation: 'human_facing',
    automationNote: 'Metallurgy is materials-science applied to industry — designing new alloys, controlling steel-mill operations, ensuring metal quality. The science-judgement combination remains firmly human. India\'s defence (DRDO), steel (SAIL, Tata Steel), automotive, and aerospace industries all employ metallurgists.',
    title: 'Metallurgical Engineer',
    titleTa: 'உலோகவியல் பொறியியலாளர்',
    icon: '⚙️',
    color: 'from-amber-700 to-orange-800',
    whatIsIt:
      'A four-year B.E. covering extractive metallurgy (turning ore into metal), physical metallurgy (structure-property relationships), mechanical metallurgy (deformation and failure), and materials engineering (alloy design, heat treatment, corrosion). Career outcomes: SAIL, Tata Steel, JSW, defence metallurgy (DRDO labs), automotive metallurgy (engine and transmission alloys), aerospace metallurgy (HAL, ISRO), and increasingly advanced-materials startups. The classical engineering discipline — among India\'s oldest and most-respected.',
    eligibleStreams: ['pcm'],
    strongGroupCodes: ['101', '102', '104'],
    ugCourses: ['B.E. Metallurgical Engineering', 'B.Tech Metallurgical & Materials Engineering', 'B.E. Materials Science & Engineering'],
    entranceExams: ['TNEA', 'JEE Main'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 4-year B.E. Strong placement at steel majors and defence labs in final year. Career progression to senior plant metallurgist or research scientist typically 7-10 years.',
    skillWeights: { mathematics: 7, language: 4, science: 9, creativity: 5, people: 3, physical: 5, digital: 5 },
    priorityFit: { salary: 6, security: 8, balance: 6, abroad: 7, prestige: 7, passion: 7, growth: 6, hometown: 6 },
    competitiveBoardPct: { comfortable: 75, stretch: 65 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹4–7 LPA fresh at steel majors (SAIL, Tata Steel, JSW) and at defence labs (DRDO); ₹3.5–6 LPA at smaller foundries and automotive metallurgy roles. PSU steel positions include exceptional benefits (housing, medical, pension).',
      midCareerLPA: 'AI estimate — ₹12–25 LPA after 7+ years for senior plant metallurgists, research scientists, and corrosion specialists. Abroad opportunities (Middle East steel, Australian mining, German automotive metallurgy) can multiply substantially.',
      note: 'PSU steel sector remains a defining destination — among the most stable, well-respected industrial careers in India. The trade-off is geographic: most steel mills are in eastern India (Jamshedpur, Bhilai, Rourkela), requiring relocation from TN for the headline jobs.',
    },
    demand: { score: 7, note: 'AI estimate — steady and structural. India\'s steel demand growth, defence-metallurgy investment (advanced alloys for missiles, submarines, aircraft), and the corrosion / failure-analysis niche all create consistent hiring.' },
    entryDifficulty: { score: 6, note: 'AI estimate — moderate competition. Fewer TN colleges offer metallurgy than other branches, so seats are limited but cutoffs are reasonable.' },
    collegeTiers: [
      { label: 'Top Metallurgical programs (AI estimate)', examples: ['Anna University CEG Chennai', 'NIT Trichy Metallurgical & Materials', 'Government College of Engineering Salem'], cutoffGuide: 'AI estimate — TNEA cutoff 180+ for top tier; NIT via JEE Main.', feeRange: 'AI estimate — ₹40K–1.5L / year' },
      { label: 'Other programs in TN (AI estimate)', examples: ['Limited — verify each program individually'], cutoffGuide: 'AI estimate — TNEA cutoff 155-180 where offered.', feeRange: 'AI estimate — ₹80K–2L / year' },
      { label: 'National alternatives (if open to relocation)', examples: ['IIT Madras Metallurgical & Materials (JEE Advanced)', 'IIT BHU Metallurgical Engineering', 'NIT Rourkela / Warangal'], cutoffGuide: 'AI estimate — top IITs are highly competitive; NITs more accessible.', feeRange: 'AI estimate — ₹2L–2.5L / year (IIT/NIT fees)' },
    ],
    costReality: 'AI estimate — a 4-year B.E. Metallurgical Engineering in TN costs roughly ₹2L–10L total. PSU steel jobs typically pay off the loan in 2-3 years.',
    backupOptions: ['M.Tech Metallurgical Engineering — research, R&D roles', 'PhD + DRDO scientist / academic faculty track', 'Steel plant engineering roles (SAIL, Tata Steel, JSW)', 'Corrosion engineering specialisation — strong in oil-and-gas', 'Pivot to general mechanical engineering if metallurgy roles are tight', 'Move abroad — Middle East steel, Australian mining, German automotive metallurgy actively hire'],
    honestCaveat: 'Metallurgy is genuinely science-heavy — students who picked it imagining "regular engineering" find years 1-2 surprisingly chemistry-and-physics-intensive (thermodynamics, phase diagrams, crystallography). Plant work involves real foundry conditions — heat, dust, shift rotation in early career. The PSU steel career is genuinely rewarding for those drawn to materials science, but the geographic concentration (Jharkhand, Chhattisgarh, Odisha) is a significant trade-off for TN students. Defence-metallurgy roles (DRDO) keep you near major cities but are competitive entry.',
    roadmap: [
      { title: 'Score 75%+ in 12th PCM', titleTa: '+12 PCM 75%+', detail: 'TNEA / JEE Main entry. Strong Chemistry + Physics matter more for metallurgy than for most other engineering branches.', window: 'Now', phase: 'now' },
      { title: 'Join B.E. Metallurgy + active lab + plant exposure', titleTa: 'B.E. + ஆய்வகம் + ஆலை பயிற்சி', detail: 'Choose colleges with active metallurgical labs (furnaces, microscopes, testing equipment). Industrial summer internships at SAIL / Tata Steel are essential.', window: 'Years 1–4', phase: 'next' },
      { title: 'Steel plant / DRDO / M.Tech', titleTa: 'எஃகு ஆலை / DRDO / M.Tech', detail: 'Three credible exits. Steel sector for stability; DRDO for defence research; M.Tech / PhD for academic and R&D careers.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Strengthen Chemistry — particularly inorganic and physical chemistry', titleTa: 'வேதியியல் வலுப்படுத்துதல்', detail: 'Metallurgy is fundamentally applied chemistry. Strong 12th Chemistry directly translates into year 1 understanding.', priority: 'high' },
      { title: 'Read about India\'s steel and defence-metallurgy sectors', titleTa: 'எஃகு + பாதுகாப்பு உலோகவியல்', detail: 'Understanding what SAIL, Tata Steel, JSW, and DRDO actually do builds context that classroom theory alone misses.', priority: 'high' },
      { title: 'Visit a steel plant or foundry if possible', titleTa: 'எஃகு ஆலை அல்லது வார்ப்படை பார்வை', detail: 'Smaller foundries operate across TN. One visit clarifies the physical reality of the work — heat, noise, scale.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Strong Chemistry — physical, inorganic, and basic thermodynamics', why: 'The deep foundation of all metallurgical work. Strong 12th Chemistry with a head start on thermodynamics is the single highest-ROI prep.', freeResource: 'NCERT Chemistry, MIT OpenCourseWare introductory thermodynamics' },
      { skill: 'Hands-on tinkering with metals (if accessible)', why: 'Welding, basic blacksmithing, or even careful soldering builds intuition that pure book study cannot. Local fabrication shops can be a learning resource.', freeResource: 'YouTube — basic welding tutorials, machining basics; visit fabrication shops' },
      { skill: 'Reading about materials science and engineering applications', why: 'The "why metallurgy matters" context — knowing why aerospace needs nickel superalloys or why submarines need HY-100 steel makes coursework click.', freeResource: 'Materials Science basics on Khan Academy, Smithsonian materials articles, free DRDO public information' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.TECH TEXTILE TECHNOLOGY ─────────────────────────────────────────────
  {
    id: 'textile-technologist',
    family: 'engineering-textiles',
    isNiche: true,
    interestTags: ['engineering', 'design'],
    needsCounsellorReview: true,
    aversionConflicts: ['lab_practical'],
    automation: 'ai_augmented',
    automationNote: 'Textile production is heavily automated, but the technologist who designs new yarns, sets up dyeing chemistry, ensures fabric quality, and bridges between fashion designers and factories cannot be automated. India is the world\'s second-largest textile producer; TN (Tiruppur, Coimbatore, Erode) is a global textile hub.',
    title: 'Textile Technologist (B.Tech Textile Technology)',
    titleTa: 'ஜவுளி தொழில்நுட்ப நிபுணர்',
    icon: '🧵',
    color: 'from-fuchsia-500 to-pink-600',
    whatIsIt:
      'A four-year B.Tech covering fibre science (cotton, polyester, wool, blends), yarn manufacturing (spinning), fabric production (weaving, knitting), wet processing (dyeing, printing, finishing), textile chemistry, garment manufacturing technology, and increasingly technical textiles (medical, automotive, defence applications). Career outcomes: textile manufacturing companies (Aditya Birla, Welspun, Trident, Arvind), garment exporters (heavy concentration in Tiruppur), quality and process roles, fashion industry technical roles, technical textiles R&D.',
    eligibleStreams: ['pcm', 'pcb'],
    strongGroupCodes: ['101', '102', '104'],
    ugCourses: ['B.Tech Textile Technology', 'B.Tech Textile Chemistry', 'B.E. Textile Engineering', 'B.Tech Apparel Technology'],
    entranceExams: ['TNEA', 'JEE Main'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 4-year B.Tech. Strong placement at TN textile cluster companies (Tiruppur, Coimbatore, Erode) during final year. The technical-textiles sub-field is the fastest-growing specialisation.',
    skillWeights: { mathematics: 5, language: 5, science: 8, creativity: 6, people: 4, physical: 3, digital: 6 },
    priorityFit: { salary: 5, security: 7, balance: 7, abroad: 7, prestige: 5, passion: 7, growth: 6, hometown: 9 },
    competitiveBoardPct: { comfortable: 70, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2.5–4.5 LPA fresh at TN textile companies; ₹3.5–6 LPA at large textile groups and garment exporters. Technical textiles (medical, automotive applications) pay above the textile average.',
      midCareerLPA: 'AI estimate — ₹7–18 LPA after 7+ years for production heads, quality leads, and technical-textile specialists. Senior export-house roles can exceed substantially. Abroad (Bangladesh, Vietnam, Middle East) garment industry opportunities multiply.',
      note: 'Modest at entry but TN\'s textile cluster (Tiruppur is among India\'s largest garment-export hubs) makes hometown jobs unusually realistic — a significant advantage for students from western/southern TN. Technical textiles is the high-growth segment.',
    },
    demand: { score: 7, note: 'AI estimate — strong demand from TN\'s textile cluster; structural growth in technical textiles. The PLI scheme for textiles drives sustained hiring.' },
    entryDifficulty: { score: 4, note: 'AI estimate — direct TNEA admission. Top programs at Anna University BIT and PSG Tech are more selective.' },
    collegeTiers: [
      { label: 'Top textile engineering programs (AI estimate)', examples: ['Anna University BIT Campus Tiruchirappalli', 'PSG College of Technology Coimbatore', 'Kumaraguru College of Technology Coimbatore'], cutoffGuide: 'AI estimate — TNEA cutoff 165-185 typical.', feeRange: 'AI estimate — ₹50K–1.5L / year' },
      { label: 'Strong programs (AI estimate)', examples: ['Sona College of Technology Salem', 'Bannari Amman Institute Sathyamangalam', 'Karunya Institute Coimbatore'], cutoffGuide: 'AI estimate — TNEA cutoff 150-170.', feeRange: 'AI estimate — ₹1L–2.5L / year' },
      { label: 'Other TN colleges with textile tracks (AI estimate)', examples: ['Several colleges in textile-cluster cities (Coimbatore, Tiruppur, Erode, Karur)'], cutoffGuide: 'AI estimate — accessible; 60%+ typical.', feeRange: 'AI estimate — ₹80K–2L / year' },
    ],
    costReality: 'AI estimate — a 4-year B.Tech Textile Technology in TN costs roughly ₹2L–8L total. The hometown-employment advantage in textile-cluster cities (Coimbatore, Tiruppur, Erode) is a real ongoing cost saving.',
    backupOptions: ['M.Tech Textile / Fibre Science — technical textiles specialisation', 'Move into garment-export operations (Tiruppur is global hub)', 'Fashion industry technical roles (production, quality)', 'Technical textiles R&D (medical, automotive, defence)', 'MBA in operations / supply chain after 3-5 years industry experience'],
    honestCaveat: 'Textile Technology is engineering applied to textiles — students who pictured fashion-design work end up disappointed. The day-to-day involves textile chemistry, yarn engineering, dye process control, and quality testing. Factory work conditions in the textile cluster include heat, fibre dust, and shift rotation in early career. Students who genuinely enjoy textile science thrive; those who wanted "fashion without the math" usually struggle. The TN textile cluster employment density makes this one of the very few engineering branches where hometown jobs are realistic across western and southern TN.',
    roadmap: [
      { title: 'Score 70%+ in 12th PCM or PCB', titleTa: '+12 70%+', detail: 'TNEA / JEE Main entry. Strong Chemistry helps more than Maths for textile chemistry tracks.', window: 'Now', phase: 'now' },
      { title: 'Join B.Tech Textile + textile-cluster internships', titleTa: 'B.Tech + பயிற்சி', detail: 'Summer internships at TN textile cluster companies (Tiruppur, Coimbatore) are essential — placement networks run through these.', window: 'Years 1–4', phase: 'next' },
      { title: 'Mill role, technical textiles, or M.Tech', titleTa: 'ஆலை வேலை / தொழில்நுட்ப ஜவுளி / M.Tech', detail: 'Three credible exits. Production roles at mills; technical-textiles R&D; M.Tech for specialisation in advanced textiles.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Visit a textile mill if possible', titleTa: 'ஜவுளி ஆலை பார்வை', detail: 'TN textile cluster (Coimbatore, Tiruppur) is large enough that arranged tours are realistic. One visit clarifies the day-to-day reality.', priority: 'high' },
      { title: 'Strengthen Chemistry — especially organic and polymer basics', titleTa: 'வேதியியல் (கரிம வேதியியல்)', detail: 'Textile chemistry is the technical core. Strong 12th Chemistry with a head start on polymers makes year 1 smoother.', priority: 'high' },
      { title: 'Read about technical textiles and India\'s textile-PLI scheme', titleTa: 'தொழில்நுட்ப ஜவுளி + PLI', detail: 'The high-growth segment of the field. Understanding government textile policy and technical-textiles applications sets realistic expectations.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Chemistry — particularly organic chemistry and polymers', why: 'The technical foundation of textile science. Strong 12th Chemistry directly translates into yarn / dye / fibre coursework.', freeResource: 'NCERT Chemistry, free polymer chemistry intros on YouTube' },
      { skill: 'Visual / pattern observation', why: 'Textile quality work involves spotting subtle pattern defects, colour variations, and weave irregularities. Practising careful visual observation matters.', freeResource: 'Time spent at fabric stores, textile museums; visual-attention exercises' },
      { skill: 'Basic spreadsheet skills for quality data', why: 'Production work involves constant quality data — defect rates, yields, colour-fastness scores. Excel from day 1 is a useful base.', freeResource: 'Microsoft Excel free YouTube basics' },
    ],
    lastReviewed: '2026-05',
  },  // ═══════════════════════════════════════════════════════════════════════════
  // ─── BATCH 4b: NICHE INDUSTRIAL ENGINEERING (Discovery Expansion) ──────────
  // ═══════════════════════════════════════════════════════════════════════════
  // The genuinely niche tracks of the Discovery Expansion — courses many TN
  // students have never heard of, taught at just one or two TN institutions
  // each (CLRI Adyar for Leather, Alagappa CT Karaikudi for Ceramic, Anna
  // University MIT/AC Tech for Rubber & Plastics, AC Tech for Printing).
  // Each entry uses HEAVILY differentiated skillWeights from generic
  // mechanical / chemical engineering — these are not "mechanical with a
  // material name" but distinct applied-chemistry careers.

  // ─── B.TECH CERAMIC TECHNOLOGY ─────────────────────────────────────────────
  {
    id: 'ceramic-technologist',
    family: 'engineering-applied-chem',
    isNiche: true,
    interestTags: ['engineering', 'research'],
    needsCounsellorReview: true,
    aversionConflicts: ['lab_practical', 'field_outdoor', 'sitting_long'],
    automation: 'human_facing',
    automationNote: 'Ceramic engineering combines deep materials chemistry with industrial process control — formulating refractories for steel plants, advanced ceramics for electronics, or biomedical ceramics for implants. The judgement-heavy materials work and direct involvement with high-temperature kiln operations remain firmly human.',
    title: 'Ceramic Technologist (B.Tech Ceramic Technology)',
    titleTa: 'மட்பாண்ட தொழில்நுட்ப நிபுணர்',
    icon: '🏺',
    color: 'from-orange-700 to-amber-800',
    whatIsIt:
      'A four-year B.Tech focused on the science and industry of ceramics, glass, and refractory materials — formulation, processing, kiln operations, advanced ceramics (electronic, biomedical, aerospace ceramics), refractories for steel/cement/glass industries, and increasingly nano-ceramics. Distinct from materials science: more applied, more industrial. Career outcomes: refractory companies (RHI Magnesita, Vesuvius India), tile and sanitaryware (Kajaria, Somany, Hindustan Sanitaryware), glass industry, advanced ceramics R&D, and the underserved electronics-ceramics segment (capacitors, piezoelectric devices).',
    eligibleStreams: ['pcm'],
    strongGroupCodes: ['101', '102', '104'],
    ugCourses: ['B.Tech Ceramic Technology', 'B.Tech Ceramic Engineering'],
    entranceExams: ['TNEA', 'JEE Main'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 4-year B.Tech. Placement at refractory, ceramic-tile, and glass companies during final year. The niche nature means smaller hiring pool but also less competition — strong students rarely lack offers.',
    skillWeights: { mathematics: 7, language: 4, science: 9, creativity: 5, people: 3, physical: 4, digital: 5 },
    priorityFit: { salary: 5, security: 7, balance: 6, abroad: 6, prestige: 5, passion: 7, growth: 6, hometown: 6 },
    competitiveBoardPct: { comfortable: 65, stretch: 55 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹3–5 LPA fresh at TN ceramic/refractory/tile companies; ₹4–6.5 LPA at top corporate refractory and electronics-ceramics roles. Lower than mainstream engineering but rises steadily.',
      midCareerLPA: 'AI estimate — ₹8–18 LPA after 7+ years for senior process engineers, quality leads, and R&D specialists. Advanced ceramics R&D (electronics, biomedical, aerospace applications) can substantially exceed.',
      note: 'Modest starting pay but unusually stable career path because of low supply of trained ceramic engineers in India. The advanced-ceramics segment (electronics-grade, biomedical, aerospace) pays well above the tile/sanitaryware mainstream.',
    },
    demand: { score: 7, note: 'AI estimate — moderate but very stable. India\'s refractory industry, ceramic tile sector (TN has Morbi-adjacent cluster around Vellore), and growing advanced-ceramics segment create consistent demand. The Atmanirbhar Bharat semiconductor push will increase advanced-ceramics hiring.' },
    entryDifficulty: { score: 3, note: 'AI estimate — direct TNEA admission widely available; the bottleneck is awareness — most students have never heard of the program, so seats are not heavily competed for despite quality programs being limited.' },
    collegeTiers: [
      { label: 'Primary TN program (AI estimate)', examples: ['Alagappa College of Technology (Anna University) Karaikudi — historic Ceramic Technology program; the dominant TN destination for this field'], cutoffGuide: 'AI estimate — TNEA cutoff 160-180 typical; substantially less competitive than mainstream engineering branches.', feeRange: 'AI estimate — ₹40K–1L / year' },
      { label: 'National alternatives (if open to relocation)', examples: ['IIT BHU Ceramic Engineering (top program nationally; JEE Advanced)', 'Government College of Engineering & Ceramic Technology Kolkata'], cutoffGuide: 'AI estimate — JEE Advanced for IIT BHU; state-level for Kolkata program.', feeRange: 'AI estimate — ₹2.5L / year (IIT BHU); ₹15K–50K / year (state)' },
      { label: 'Note on TN availability', examples: ['Pure Ceramic Technology B.Tech programs are limited in TN — Alagappa CT Karaikudi is by far the most established. Verify program availability per college individually.'], cutoffGuide: '—', feeRange: '—' },
    ],
    costReality: 'AI estimate — a 4-year B.Tech Ceramic Technology in TN at Alagappa CT costs roughly ₹2L–4L total. Genuinely one of the more affordable engineering degrees because of the established government-aided program structure.',
    backupOptions: ['M.Tech Ceramic / Materials Engineering — opens advanced ceramics R&D', 'Pivot to general Materials Science or Metallurgy roles', 'Glass and refractory industry process engineering', 'Electronics-ceramics segment (capacitors, piezoelectrics, semiconductor substrates)', 'Cement industry — adjacent skill set, larger employer base in TN', 'Sanitaryware industry — Hindustan Sanitaryware, Cera have R&D roles'],
    honestCaveat: 'Ceramic Technology is one of the most genuinely niche programs in TN engineering — small batch sizes, fewer alumni, less visibility on placement-portal job postings. The trade-off: low competition for seats, low competition for jobs because trained ceramic engineers are scarce. Plant work involves real industrial conditions — high temperatures around kilns, dust, hot environments. Students drawn to materials science thrive; those who picked it because of low cut-offs without genuine interest tend to drift. The advanced-ceramics segment (electronics, biomedical, aerospace) is where the field is heading and where the best pay sits.',
    roadmap: [
      { title: 'Score 65%+ in 12th PCM', titleTa: '+12 PCM 65%+', detail: 'TNEA entry. Strong Chemistry matters most — ceramic engineering is fundamentally materials chemistry.', window: 'Now', phase: 'now' },
      { title: 'Join B.Tech Ceramic Technology + serious chemistry depth', titleTa: 'B.Tech + வேதியியல் ஆழம்', detail: 'Build genuine depth in inorganic chemistry, materials science, and process engineering. Internships at refractory or tile companies during summer breaks transform placement outcomes.', window: 'Years 1–4', phase: 'next' },
      { title: 'M.Tech advanced ceramics OR industry role', titleTa: 'M.Tech / தொழில் வேலை', detail: 'M.Tech in advanced ceramics opens the high-pay electronics/biomedical/aerospace segments. Direct industry role for refractory/tile/sanitaryware companies is the standard path.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Strengthen 12th Chemistry — particularly inorganic', titleTa: 'வேதியியல் — கனிம வேதியியல்', detail: 'Ceramics IS inorganic chemistry applied to industry. Strong 12th Chemistry on solids, crystal structures and reactions makes year 1 dramatically easier.', priority: 'high' },
      { title: 'Visit a ceramic tile or refractory plant if possible', titleTa: 'ஆலை பார்வை', detail: 'TN ceramic plants (Vellore area, parts of Salem) offer student tours. Understanding kiln operations and the physical reality of the work is essential before committing.', priority: 'high' },
      { title: 'Read about advanced ceramics applications', titleTa: 'மேம்பட்ட மட்பாண்டம் பயன்பாடுகள்', detail: 'Most students think "ceramics = tiles." Understanding electronic ceramics, biomedical ceramics, and aerospace ceramics opens the high-growth segment of the field.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Inorganic chemistry — solid state and crystal structures', why: 'The technical foundation of all ceramic engineering. Strong 12th inorganic chemistry directly translates into year 1 materials coursework.', freeResource: 'NCERT Chemistry — solid state chapter, MIT OpenCourseWare 3.091 (Introduction to Solid-State Chemistry)' },
      { skill: 'Hands-on tinkering with materials (pottery, glasswork)', why: 'Practical familiarity with how clay/glass actually behaves transforms classroom theory. Local pottery classes are excellent preparation.', freeResource: 'Local pottery studios, school art rooms, traditional craft exposure' },
      { skill: 'Physics — thermodynamics and heat transfer basics', why: 'Kiln operations and material processing are fundamentally thermal. Strong 12th Physics on heat and thermodynamics is a real asset.', freeResource: 'NCERT Physics — thermodynamics chapter, Khan Academy thermal physics' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.TECH LEATHER TECHNOLOGY ─────────────────────────────────────────────
  {
    id: 'leather-technologist',
    family: 'engineering-applied-chem',
    isNiche: true,
    interestTags: ['engineering', 'environment'],
    needsCounsellorReview: true,
    aversionConflicts: ['lab_practical', 'field_outdoor', 'graphic_content'],
    automation: 'human_facing',
    automationNote: 'Leather processing combines chemistry, biology, and process control — automation handles repetitive steps but the chemistry decisions (tanning agents, dye chemistry, finish formulations) and quality work remain firmly human. India is among the world\'s top leather exporters; TN (Vellore, Ranipet, Ambur, Chennai) is the global hub for the Indian leather industry.',
    title: 'Leather Technologist (B.Tech Leather Technology)',
    titleTa: 'தோல் தொழில்நுட்ப நிபுணர்',
    icon: '🐂',
    color: 'from-amber-800 to-stone-900',
    whatIsIt:
      'A four-year B.Tech that applies chemistry, biology, and process engineering to the leather industry — beam-house operations, tanning chemistry (chrome and vegetable tannage), dyeing and finishing, leather chemistry research, footwear and leather-goods technology, environmental management of tannery effluent. Distinct from chemical engineering: it is specifically the science of converting hides to finished leather with deep environmental dimensions. Career outcomes: TN leather cluster companies (Florence Shoes, Farida Group, KH Group, Tata International), CLRI scientist roles, leather-export quality and process roles, tannery environmental management, and the emerging sustainable-leather and synthetic-leather R&D segment.',
    eligibleStreams: ['pcm', 'pcb', 'pcmb'],
    strongGroupCodes: ['101', '102', '104', '208'],
    ugCourses: ['B.Tech Leather Technology', 'B.Tech Footwear Science & Engineering'],
    entranceExams: ['TNEA', 'JEE Main'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 4-year B.Tech. Strong placement at TN leather cluster companies during final year. The CLRI (CSIR\'s Central Leather Research Institute) Chennai is the global research hub — internships there transform R&D career outcomes.',
    skillWeights: { mathematics: 6, language: 4, science: 9, creativity: 5, people: 4, physical: 4, digital: 4 },
    priorityFit: { salary: 5, security: 7, balance: 6, abroad: 6, prestige: 4, passion: 7, growth: 6, hometown: 8 },
    competitiveBoardPct: { comfortable: 60, stretch: 50 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2.5–4.5 LPA fresh at TN leather cluster companies; ₹3.5–5.5 LPA at top leather export houses (Florence Shoes, Farida, Tata International). CLRI research positions ₹4–7 LPA for fresh graduates with strong academic record.',
      midCareerLPA: 'AI estimate — ₹7–15 LPA after 7+ years for senior tannery managers, process engineers, and R&D specialists. Senior export-house roles and CLRI scientists can exceed substantially. Abroad opportunities (Bangladesh, Italy, China leather industries) multiply earnings for experienced professionals.',
      note: 'Modest entry pay but TN\'s leather cluster (Vellore-Ranipet-Ambur belt is the world\'s largest tannery cluster) makes hometown work realistic across northern TN. The environmental-management and sustainable-leather segments are the growth areas — students who specialise there earn well.',
    },
    demand: { score: 7, note: 'AI estimate — steady demand from TN leather cluster; growing demand from sustainable-leather R&D (synthetic leather alternatives are an active field). India\'s leather exports remain among the top globally.' },
    entryDifficulty: { score: 2, note: 'AI estimate — direct TNEA admission; among the LEAST competitive engineering branches for seat availability. Awareness is the bottleneck.' },
    collegeTiers: [
      { label: 'Primary TN program (AI estimate)', examples: ['AC Tech (Alagappa College of Technology, Anna University) Guindy — the historic and primary Leather Technology destination in TN, deeply integrated with CLRI'], cutoffGuide: 'AI estimate — TNEA cutoff 150-175 typical; substantially less competitive than mainstream engineering.', feeRange: 'AI estimate — ₹40K–1L / year' },
      { label: 'Critical resource: CLRI Adyar', examples: ['Central Leather Research Institute (CLRI), Adyar Chennai — CSIR\'s flagship leather research institute. The global research hub for leather science. Internships and project work here transform careers — even more important than the college.'], cutoffGuide: 'CLRI itself does not offer B.Tech; it partners with AC Tech and others for industrial training, M.Tech and PhD work.', feeRange: 'CLRI summer internship programs are typically supported by stipends.' },
      { label: 'National alternatives (if open to relocation)', examples: ['Harcourt Butler Technical University (HBTU) Kanpur Leather Technology', 'Government College of Engineering & Leather Technology Kolkata'], cutoffGuide: 'AI estimate — state-level entrance for non-TN programs.', feeRange: 'AI estimate — varies by state' },
    ],
    costReality: 'AI estimate — a 4-year B.Tech Leather Technology in TN at AC Tech costs roughly ₹2L–4L total. Among the most affordable engineering degrees because of the established government-aided program structure. CLRI internship support is typically free with stipend.',
    backupOptions: ['M.Tech Leather Technology — typically at CLRI / AC Tech', 'PhD + CSIR scientist track at CLRI (highly respected research path)', 'Pivot to general Chemical Engineering roles', 'Environmental engineering — leather effluent treatment is genuine specialty', 'Sustainable / synthetic leather R&D (active field, attracting global investment)', 'Footwear and leather-goods design adjacent to tech work'],
    honestCaveat: 'Leather Technology is genuinely visceral — tannery work involves direct exposure to hides, animal byproducts, chromium chemistry, strong odors, and environmental conditions that many students find harder to tolerate than they expected. The work also has ethical dimensions students should think honestly about (animal sourcing, environmental impact of tanning chemicals, worker conditions in some plants). Students drawn to the chemistry and the sustainability challenges thrive; those who picked it for low cut-offs without that pull often quit. The trade-off: extraordinarily low competition, established TN industry employment, and a field where individual technical contribution genuinely matters because the talent pool is small. The "graphic content" aversion applies — hide processing involves butchery-adjacent materials.',
    roadmap: [
      { title: 'Score 60%+ in 12th PCM or PCB', titleTa: '+12 60%+', detail: 'AC Tech direct admission via TNEA. Strong Chemistry matters most. Open to both PCM and PCB students.', window: 'Now', phase: 'now' },
      { title: 'Join B.Tech Leather Tech at AC Tech + CLRI exposure', titleTa: 'B.Tech + CLRI பயிற்சி', detail: 'CLRI Adyar is the global leader in leather research. Summer internships there during the degree are the highest-ROI single decision you can make.', window: 'Years 1–4', phase: 'next' },
      { title: 'TN leather cluster role, CLRI research, OR sustainable-leather R&D', titleTa: 'வேலை / CLRI / சுற்றுச்சூழல்', detail: 'Three credible exits. Industry roles in Vellore-Ranipet-Ambur cluster; CLRI scientist track; or the emerging sustainable-leather R&D segment.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Visit a tannery — honest test of tolerance', titleTa: 'பதனிடும் ஆலை பார்வை', detail: 'TN tanneries in Vellore/Ranipet/Ambur or Pallavaram offer student tours. The conditions, smells, and atmosphere are NOT for everyone. Honest reality check before committing 4 years.', priority: 'high' },
      { title: 'Strengthen Chemistry — organic and biochemistry', titleTa: 'வேதியியல் — கரிம + உயிர் வேதியியல்', detail: 'Leather processing is applied biochemistry. Strong 12th Chemistry on organic and biochemistry topics directly translates into year 1 success.', priority: 'high' },
      { title: 'Read about CLRI\'s research and the sustainable-leather movement', titleTa: 'CLRI ஆராய்ச்சி + நிலையான தோல்', detail: 'Understanding where the field is going (sustainability, synthetic alternatives, ethics) helps set realistic expectations and identify your specialisation early.', priority: 'medium', link: 'https://www.clri.org' },
    ],
    buildNowSkills: [
      { skill: 'Strong organic chemistry + biochemistry basics', why: 'Leather processing is biochemistry applied to industry. The chemistry foundation determines whether year 1 makes sense or feels like a foreign language.', freeResource: 'NCERT Chemistry, free MIT OpenCourseWare biochemistry intro, CLRI online resources' },
      { skill: 'Tolerance for industrial conditions', why: 'Tannery work involves real environmental challenges. Building tolerance through visits to industrial sites (not necessarily leather — any plant work) is honest preparation.', freeResource: 'Industrial-site visits, factory tours through local industry associations' },
      { skill: 'Environmental chemistry awareness', why: 'Modern leather work is increasingly defined by environmental compliance (chromium recovery, effluent treatment). Comfort with environmental chemistry is a real career multiplier.', freeResource: 'Free environmental-engineering MOOCs, CPCB and TNPCB publications on tannery effluent' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.TECH RUBBER AND PLASTICS TECHNOLOGY ─────────────────────────────────
  {
    id: 'rubber-plastics-technologist',
    family: 'engineering-applied-chem',
    isNiche: true,
    interestTags: ['engineering', 'environment'],
    needsCounsellorReview: true,
    aversionConflicts: ['lab_practical', 'sitting_long'],
    automation: 'ai_augmented',
    automationNote: 'Polymer science and rubber-plastic processing combine deep chemistry with industrial process control. AI helps with formulation optimisation but the chemistry judgement, recipe development, and quality work remain firmly human. India\'s polymer industry growth (packaging, automotive, medical devices) and the emerging bioplastics / circular-economy push drive sustained demand.',
    title: 'Rubber & Plastics Technologist (B.Tech Polymer Technology)',
    titleTa: 'ரப்பர் மற்றும் பிளாஸ்டிக் தொழில்நுட்ப நிபுணர்',
    icon: '🧴',
    color: 'from-emerald-700 to-teal-800',
    whatIsIt:
      'A four-year B.Tech in polymer science applied to industry — rubber technology (tyres, automotive seals, footwear, industrial rubber), plastics processing (injection moulding, extrusion, blow moulding), polymer chemistry and characterisation, composite materials, and the rapidly growing bioplastics / circular-economy field. Distinct from generic chemical engineering: specifically the science of long-chain molecules and their processing. Career outcomes: tyre companies (MRF, Apollo, JK), polymer producers (Reliance Industries, IOC), automotive component manufacturers, packaging industry (Berger, Asian Paints adjacent), medical-device polymer roles, and the emerging biopolymer / recycling R&D segment.',
    eligibleStreams: ['pcm'],
    strongGroupCodes: ['101', '102', '104'],
    ugCourses: ['B.Tech Rubber and Plastics Technology', 'B.Tech Polymer Technology', 'B.Tech Polymer Engineering & Technology'],
    entranceExams: ['TNEA', 'JEE Main'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 4-year B.Tech. Strong placement at tyre companies, polymer producers, and packaging companies during final year. The CIPET (Central Institute of Petrochemicals Engineering & Technology) Chennai partnership for some programs adds significant industry credibility.',
    skillWeights: { mathematics: 7, language: 4, science: 9, creativity: 6, people: 4, physical: 3, digital: 6 },
    priorityFit: { salary: 6, security: 7, balance: 6, abroad: 6, prestige: 5, passion: 7, growth: 7, hometown: 7 },
    competitiveBoardPct: { comfortable: 65, stretch: 55 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹3.5–6 LPA fresh at tyre companies (MRF, Apollo, CEAT) and polymer producers; ₹4–7 LPA at automotive component manufacturers. CIPET-trained graduates often command slight premiums in the industry.',
      midCareerLPA: 'AI estimate — ₹10–22 LPA after 7+ years for senior R&D specialists, polymer formulation experts, and process leads at tyre/automotive/medical-polymer companies. Senior CIPET-affiliated experts and bioplastics R&D specialists can exceed substantially.',
      note: 'Stable mid-tier engineering pay with strong upside in specialisations. The bioplastics / recycling / circular-economy segment is the fastest-growing area — students who specialise there are unusually well-positioned given India\'s plastic-waste legislation (EPR rules).',
    },
    demand: { score: 7, note: 'AI estimate — steady demand from tyre, automotive, packaging, and polymer-producer industries. The rapid growth in bioplastics R&D, packaging EPR compliance, and medical-device polymers creates emerging premium roles.' },
    entryDifficulty: { score: 3, note: 'AI estimate — direct TNEA admission widely available. Less competition than mainstream engineering branches despite quality programs.' },
    collegeTiers: [
      { label: 'Primary TN programs (AI estimate)', examples: ['Madras Institute of Technology (MIT, Anna University) Chrompet — long-established Rubber & Plastics Technology program', 'AC Tech (Alagappa College of Technology, Anna University) Guindy — Polymer Technology program'], cutoffGuide: 'AI estimate — TNEA cutoff 165-185 typical.', feeRange: 'AI estimate — ₹40K–1.2L / year' },
      { label: 'CIPET partnership programs (AI estimate)', examples: ['Some TN engineering colleges partner with CIPET Chennai for plastics/polymer programs; CIPET itself runs primarily M.Tech and diploma-level programs but partnership UG programs exist'], cutoffGuide: 'AI estimate — direct admission via TNEA; CIPET-partnered programs have industry-focus advantages.', feeRange: 'AI estimate — varies; ₹50K–1.5L / year' },
      { label: 'National alternatives (if open to relocation)', examples: ['HBTU Kanpur Rubber Technology', 'Cochin University of Science and Technology Polymer Tech', 'IIT Roorkee Polymer Engineering'], cutoffGuide: 'AI estimate — state-level or JEE Advanced depending on program.', feeRange: 'AI estimate — varies' },
    ],
    costReality: 'AI estimate — a 4-year B.Tech Rubber & Plastics Technology in TN costs roughly ₹2L–5L total. The MIT and AC Tech government-aided programs are dramatically more affordable than private alternatives.',
    backupOptions: ['M.Tech Polymer Engineering — typically at CIPET, IIT, or AC Tech', 'Bioplastics / sustainable-polymer R&D (rapidly growing segment)', 'Pivot to general chemical engineering or materials science roles', 'Packaging industry (EPR compliance is a growing specialty)', 'Automotive component manufacturing process roles', 'Medical-device polymer specialisation (high-pay niche)'],
    honestCaveat: 'Rubber & Plastics Technology is genuinely chemistry-heavy — students who picked engineering hoping to avoid chemistry struggle quickly. The work is industrially-oriented (less academic than Ceramic, more applied than general Chemical Engineering). Plant work involves real industrial conditions — process odours, chemical handling, shift exposure during early career. The growth segments (bioplastics, recycling, medical polymers, EPR compliance) require students who genuinely engage with both chemistry AND environmental thinking. Students who treat the polymer side as an afterthought end up as generic process engineers rather than polymer specialists.',
    roadmap: [
      { title: 'Score 65%+ in 12th PCM', titleTa: '+12 PCM 65%+', detail: 'TNEA / JEE Main entry. Strong Chemistry matters most — polymer technology is applied chemistry.', window: 'Now', phase: 'now' },
      { title: 'Join B.Tech Rubber/Plastics + serious polymer-chemistry depth', titleTa: 'B.Tech + பாலிமர் வேதியியல்', detail: 'Build genuine depth in polymer chemistry, characterisation, and processing. CIPET-linked internships or short courses during the degree materially boost industry credibility.', window: 'Years 1–4', phase: 'next' },
      { title: 'Tyre/polymer industry, M.Tech, OR bioplastics R&D', titleTa: 'தொழில் / M.Tech / உயிர் பிளாஸ்டிக்', detail: 'Three credible exits. Industry roles in established polymer companies; M.Tech for specialisation; or the emerging bioplastics/circular-economy R&D segment.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Strengthen Chemistry — organic and physical chemistry', titleTa: 'வேதியியல் — கரிம + இயற்பியல் வேதியியல்', detail: 'Polymer science is built on organic chemistry (molecular structure) and physical chemistry (chain dynamics, phase behaviour). Strong 12th Chemistry on both topics is essential.', priority: 'high' },
      { title: 'Visit a polymer or tyre manufacturing plant if possible', titleTa: 'பாலிமர் ஆலை பார்வை', detail: 'TN has many — MRF (Chennai), CEAT (adjacent regions), JK Tyre, Apollo Tyres operations. Student tours clarify the day-to-day work better than any brochure.', priority: 'high' },
      { title: 'Read about India\'s EPR rules and bioplastics policy', titleTa: 'EPR + உயிர் பிளாஸ்டிக் கொள்கை', detail: 'The Extended Producer Responsibility rules and India\'s push toward sustainable polymers are reshaping the industry. Awareness positions you for the growth segments.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Strong organic chemistry — particularly polymerisation reactions', why: 'The deep technical foundation of polymer science. Strong 12th Chemistry on organic reactions, especially polymerisation mechanisms, transforms year 1.', freeResource: 'NCERT Chemistry — polymers chapter, free MIT OpenCourseWare polymer chemistry intro' },
      { skill: 'Hands-on tinkering with plastics and polymers', why: 'Practical familiarity with how plastics actually behave (melt, flow, set) transforms classroom theory into intuition. Even hobbyist 3D-printing or polymer-clay work helps.', freeResource: '3D printing communities, polymer clay hobby work, observation of plastic-processing demonstrations' },
      { skill: 'Environmental thinking + sustainability awareness', why: 'The growth segments of polymer engineering (bioplastics, recycling, EPR compliance) reward students who genuinely engage with sustainability. Not optional anymore.', freeResource: 'Free environmental-engineering MOOCs, India\'s plastic-waste rules documentation' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.E. PRINTING AND PACKAGING TECHNOLOGY ────────────────────────────────
  {
    id: 'printing-packaging-engineer',
    family: 'engineering-printing-packaging',
    isNiche: true,
    interestTags: ['engineering', 'design'],
    needsCounsellorReview: true,
    aversionConflicts: ['creative_pressure', 'sitting_long'],
    automation: 'ai_augmented',
    automationNote: 'Digital printing and AI-driven packaging design have transformed the industry, but the engineer who specifies materials, runs the press, ensures colour-fidelity, and bridges between brand designers and factory operations cannot be automated. India\'s e-commerce growth has made packaging engineering one of the most demanded niche fields.',
    title: 'Printing & Packaging Engineer (B.E. Printing & Packaging Tech)',
    titleTa: 'அச்சு மற்றும் தொகுப்பு பொறியியலாளர்',
    icon: '📦',
    color: 'from-violet-500 to-fuchsia-600',
    whatIsIt:
      'A four-year B.E. that combines design sensibility with engineering — printing technology (offset, flexography, digital, gravure), packaging materials science (paper, plastic, glass, metal), package design and structural engineering, brand colour management, sustainable packaging, and the rapidly growing e-commerce packaging segment. Distinct from generic design or mechanical: graduates BUILD the printing presses and packaging lines that designers\' work runs on. Career outcomes: packaging companies (TCPL Packaging, Uflex, Huhtamaki PPL), printing companies (Manipal Technologies, Repro India), brand-side packaging engineering roles (FMCG companies\' packaging departments), e-commerce packaging operations (Amazon, Flipkart packaging optimisation), and the emerging sustainable-packaging R&D segment.',
    eligibleStreams: ['pcm'],
    strongGroupCodes: ['101', '102', '104'],
    ugCourses: ['B.E. Printing and Packaging Technology', 'B.Tech Packaging Technology', 'B.E. Printing Technology'],
    entranceExams: ['TNEA', 'JEE Main'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 4-year B.E. Strong placement at packaging companies and FMCG packaging departments during final year. The e-commerce packaging segment (Amazon, Flipkart) has driven significant recent hiring.',
    skillWeights: { mathematics: 6, language: 5, science: 6, creativity: 7, people: 5, physical: 4, digital: 7 },
    priorityFit: { salary: 6, security: 7, balance: 7, abroad: 6, prestige: 5, passion: 7, growth: 7, hometown: 7 },
    competitiveBoardPct: { comfortable: 65, stretch: 55 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹3.5–5.5 LPA fresh at packaging and printing companies; ₹4–7 LPA at FMCG company packaging departments and e-commerce packaging operations. Sustainable-packaging R&D roles increasingly pay a premium.',
      midCareerLPA: 'AI estimate — ₹10–22 LPA after 7+ years for senior packaging engineers at FMCG companies, e-commerce packaging leads, and sustainable-packaging specialists. Senior packaging consultants and brand-side packaging heads can exceed substantially.',
      note: 'Strong mid-career trajectory because the field combines engineering rigour with brand-design sensibility — a rare combination that commands premium pay. The sustainable-packaging segment is the fastest-growing area, driven by India\'s plastic-waste rules and global brand commitments to reduce packaging impact.',
    },
    demand: { score: 8, note: 'AI estimate — strong and structurally growing. E-commerce packaging operations, FMCG packaging redesigns, sustainable-packaging R&D, and the broader packaging industry expansion all create sustained hiring.' },
    entryDifficulty: { score: 3, note: 'AI estimate — direct TNEA admission widely available. Among the more accessible engineering branches despite genuinely strong career prospects.' },
    collegeTiers: [
      { label: 'Primary TN programs (AI estimate)', examples: ['AC Tech (Alagappa College of Technology, Anna University) Guindy — established Printing Technology program', 'SRM University — has Printing & Packaging tracks', 'Specific TN colleges with packaging tracks (verify per program)'], cutoffGuide: 'AI estimate — TNEA cutoff 160-180 typical.', feeRange: 'AI estimate — ₹50K–2L / year' },
      { label: 'Strong programs (AI estimate)', examples: ['Indian Institute of Packaging (IIP) Chennai — runs PG diploma + M.Tech in Packaging Technology; the dominant packaging-specific institute. Worth shortlisting as a follow-on after B.E.'], cutoffGuide: 'AI estimate — IIP entry typically at PG level via separate exam.', feeRange: 'AI estimate — IIP programs ₹1L–3L / year' },
      { label: 'National alternatives (if open to relocation)', examples: ['Jadavpur University Printing Engineering', 'PVG\'s College of Engineering Pune Printing Engg', 'Manipal Institute of Technology Printing & Media Engg'], cutoffGuide: 'AI estimate — state-level entrance or direct admission.', feeRange: 'AI estimate — varies' },
    ],
    costReality: 'AI estimate — a 4-year B.E. Printing & Packaging in TN costs roughly ₹2L–8L total depending on college. AC Tech and government-aided programs are dramatically more affordable than private universities.',
    backupOptions: ['IIP (Indian Institute of Packaging) PG Diploma or M.Tech in Packaging Technology', 'Pivot to brand-side packaging engineering at FMCG companies', 'E-commerce packaging operations (Amazon, Flipkart heavily hire)', 'Sustainable packaging R&D (emerging high-growth field)', 'Design-engineering crossover roles', 'Printing-industry production management', 'MBA after 3-5 years for senior brand or operations roles'],
    honestCaveat: 'Printing & Packaging is unusually creative for an engineering degree — students who picked engineering specifically to AVOID creative pressure (deadlines tied to brand launches, colour-fidelity disputes, packaging-design iteration cycles) often find this surprisingly draining. Conversely, students who wanted design without the math find the engineering side (substrate chemistry, press mechanics, structural packaging engineering) more demanding than expected. The field rewards a genuine combination of engineering rigour AND aesthetic sensibility — and is one of the few engineering branches where that combination pays well. E-commerce packaging is the recent growth driver; sustainable packaging is the future.',
    roadmap: [
      { title: 'Score 65%+ in 12th PCM', titleTa: '+12 PCM 65%+', detail: 'TNEA entry. Strong Chemistry and Maths matter; visual sensibility helps for the design side.', window: 'Now', phase: 'now' },
      { title: 'Join B.E. Printing & Packaging + active brand exposure', titleTa: 'B.E. + பிராண்ட் தொடர்பு', detail: 'Internships at FMCG companies (packaging departments) and e-commerce packaging operations during summer breaks are particularly valuable — they bridge the engineering and brand sides.', window: 'Years 1–4', phase: 'next' },
      { title: 'Industry, IIP PG Diploma, or sustainability R&D', titleTa: 'தொழில் / IIP / நிலையான', detail: 'Three credible exits. Direct industry role; IIP PG Diploma for specialisation; or sustainable-packaging R&D for the emerging high-growth segment.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Visit a printing press or packaging factory if possible', titleTa: 'அச்சு / தொகுப்பு ஆலை பார்வை', detail: 'TN has many printing and packaging plants. Student tours dramatically clarify the day-to-day work — the speed of modern presses surprises most first-time visitors.', priority: 'high' },
      { title: 'Develop colour and design awareness', titleTa: 'வண்ணம் + வடிவமைப்பு உணர்வு', detail: 'Spend time observing packaging in supermarkets, e-commerce parcels, and brand designs. The trained eye is a real career advantage. Free design-fundamentals videos help.', priority: 'high' },
      { title: 'Read about India\'s plastic-waste rules and EPR for packaging', titleTa: 'EPR + நிலையான தொகுப்பு', detail: 'The Extended Producer Responsibility rules are reshaping packaging engineering. Awareness positions you for the high-growth sustainability roles.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Visual / design literacy + colour theory basics', why: 'Printing and packaging engineering reward genuine aesthetic sensibility. Students who can engage with both engineering precision AND visual / brand design are dramatically more valuable.', freeResource: 'Free design-fundamentals courses (Coursera audit), packaging observation in stores, brand-design YouTube channels' },
      { skill: 'Chemistry — particularly polymer and substrate chemistry', why: 'Packaging is fundamentally materials chemistry. Strong 12th Chemistry on polymers, paper, and substrate behaviour underpins the technical side of the work.', freeResource: 'NCERT Chemistry — polymers, free materials-chemistry MOOCs' },
      { skill: 'Software fluency — design and CAD tools', why: 'Modern packaging engineering uses design software (Adobe Illustrator, ArtiosCAD for structural packaging, Esko software for prepress). Free / student-version comfort with basic tools is a real asset.', freeResource: 'Adobe student trials, free Inkscape, YouTube tutorials' },
    ],
    lastReviewed: '2026-05',
  },  // ═══════════════════════════════════════════════════════════════════════════
  // ─── BATCH 5: SPECIALISED ARTS & MANAGEMENT (Discovery Expansion) ──────────
  // ═══════════════════════════════════════════════════════════════════════════
  // Final batch of the Discovery roadmap. Six careers with the highest
  // tag-overlap risk in the entire dataset — every entry's skillWeights and
  // interestTags were tuned with explicit attention to:
  //   - Psychology vs BBA: different families (psychology vs commerce-bba),
  //     completely different skill profile (psychology people: 9, science: 8;
  //     BBA-style careers people: 5-7, science: 3-4).
  //   - VisCom vs B.Des: same family (creative-design — they DO dedup), but
  //     different secondary skill / aversion profiles (VisCom higher digital
  //     and language; B.Des higher physical for prototyping work).
  //   - BBA Logistics vs BBA Aviation vs existing BBA: all three share the
  //     commerce-bba family (intentional dedup so a BBA-leaning student sees
  //     ONE in Top, the others in Worth a Look). Skill weights distinguish
  //     them sharply: Logistics math 7 + digital 7 (ops research); Aviation
  //     people 8 + language 7 (service industry); General BBA balanced.
  //   - Criminology vs Lawyer: different families (arts-criminology vs law),
  //     different interest tags (research adds the academic / NCRB / IB
  //     research dimension that pure lawyer doesn't capture).

  // ─── B.A. CRIMINOLOGY ──────────────────────────────────────────────────────
  {
    id: 'criminologist',
    family: 'arts-criminology',
    isNiche: true,
    interestTags: ['law', 'research', 'govt'],
    needsCounsellorReview: true,
    aversionConflicts: ['memorisation', 'graphic_content', 'sitting_long'],
    automation: 'high_human_judgment',
    automationNote: 'Criminology combines social-science research with contextual judgement work that AI cannot replicate — understanding why crime happens, designing intervention programs, evaluating police and prison policies. India\'s data-driven policing push (NCRB analytics, predictive policing pilots) creates emerging demand for analytically-trained criminologists.',
    title: 'Criminologist (B.A. Criminology)',
    titleTa: 'குற்றவியல் ஆய்வாளர்',
    icon: '🔎',
    color: 'from-slate-700 to-stone-800',
    whatIsIt:
      'A three-year B.A. that studies crime as a social phenomenon — criminological theory, criminal psychology, victimology, penology (prison studies), policing studies, juvenile justice, white-collar crime, cybercrime, and increasingly crime-data analysis. Distinct from law (which studies legal frameworks): criminology asks why crime happens and what works to prevent it. Career outcomes: NCRB and state crime-research roles, police-research positions, prison administration, juvenile justice, NGO work in restorative justice, academic research, and the emerging crime-analytics segment with state police forces.',
    eligibleStreams: ['arts', 'commerce', 'pcm', 'pcb', 'pcmb'],
    strongGroupCodes: ['401', '402', '404', '405', '301'],
    ugCourses: ['B.A. Criminology', 'B.A. Criminology & Police Science', 'B.Sc Criminology & Forensic Science'],
    entranceExams: ['None (direct admission)', 'CUET'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 3-year B.A. Strong career trajectories typically require M.A. Criminology + UPSC / state PSC for government roles, or M.A. + PhD for academic and policy research careers.',
    skillWeights: { mathematics: 4, language: 8, science: 5, creativity: 5, people: 7, physical: 2, digital: 6 },
    priorityFit: { salary: 4, security: 6, balance: 6, abroad: 5, prestige: 6, passion: 8, growth: 5, hometown: 7 },
    competitiveBoardPct: { comfortable: 65, stretch: 55 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2–4 LPA fresh as a research assistant, NGO researcher, or junior crime analyst. Government roles (post UPSC / state PSC) ₹6–10 LPA fresh with strong job security.',
      midCareerLPA: 'AI estimate — ₹7–18 LPA after 7+ years for senior researchers, government criminologists, and academic faculty. PhD + research-institute roles (Lok Nayak Jayaprakash Narayan National Institute, ICSSR) can reach this range with strong publication record.',
      note: 'Modest direct earnings — the B.A. itself is a foundational credential. Real career value emerges from POST-graduation specialisation: M.A. + PhD for academic / policy research, UPSC for civil services, or law-enforcement-adjacent roles via state recruitment.',
    },
    demand: { score: 5, note: 'AI estimate — limited direct demand for the B.A. itself; growing demand for analytically-trained criminologists in police data units, NGO research, and academic policy research. Cybercrime and white-collar crime specialisations have the strongest growth.' },
    entryDifficulty: { score: 2, note: 'AI estimate — direct admission at most TN universities offering the program; among the least-competitive social-science admissions.' },
    collegeTiers: [
      { label: 'Primary TN programs (AI estimate)', examples: ['Madras University Department of Criminology', 'Madurai Kamaraj University', 'Bharathiar University Coimbatore'], cutoffGuide: 'AI estimate — 60–70% in 12th typical.', feeRange: 'AI estimate — ₹15K–60K / year' },
      { label: 'Strong programs (AI estimate)', examples: ['Bharathidasan University', 'Periyar University Salem', 'a small number of TN private universities with criminology tracks'], cutoffGuide: 'AI estimate — 55–70%.', feeRange: 'AI estimate — ₹20K–80K / year' },
      { label: 'National alternatives (if open to relocation)', examples: ['LNJN National Institute of Criminology and Forensic Science New Delhi (M.A. level)', 'Tata Institute of Social Sciences (TISS) — strong criminology adjacency'], cutoffGuide: 'AI estimate — entrance exams at PG level.', feeRange: 'AI estimate — varies; mostly affordable government programs' },
    ],
    costReality: 'AI estimate — a 3-year B.A. Criminology in TN costs roughly ₹50K–2.5L total. Among the most affordable degrees on offer. The real investment is the post-graduation specialisation track.',
    backupOptions: ['M.A. Criminology + PhD academic route', 'UPSC Civil Services preparation (criminology is a strong optional subject)', 'State PSC police recruitment exams', 'NGO research in restorative justice and juvenile justice', 'Crime-data analytics roles emerging with state police forces', 'Cybercrime specialisation — fastest-growing sub-field', 'Pivot to law (LL.B. after B.A.) for legal-criminology crossover'],
    honestCaveat: 'Criminology is an academic social-science discipline — NOT a direct entry route to becoming a detective, IPS officer, or crime-show investigator. Students who join expecting "CSI / detective work" find heavy theory reading (Durkheim, Merton, contemporary criminological theory), data analysis assignments, and policy research papers. The graphic-content reality is real — case studies routinely involve violence, abuse, and disturbing evidence. Real career trajectories require POST-graduation investment: PhD for academia, UPSC for civil services, or police-recruitment exams for law-enforcement adjacent roles. Choose this degree only if you genuinely enjoy theory + research, AND have a clear post-graduation plan.',
    roadmap: [
      { title: 'Score 60%+ in 12th (any stream)', titleTa: '+12 60%+ (எந்த பாடப்பிரிவும்)', detail: 'Direct admission. Strong English + Civics + History backgrounds help most.', window: 'Now', phase: 'now' },
      { title: 'Join B.A. Criminology + active research / internship work', titleTa: 'B.A. + ஆராய்ச்சி பயிற்சி', detail: 'Volunteer with NGOs working in juvenile justice or victim support; internships at NCRB, state crime-records bureaus, or research institutes are particularly valuable.', window: 'Years 1–3', phase: 'next' },
      { title: 'M.A. + UPSC / PhD / law / crime-analytics — pick one', titleTa: 'M.A. + பல வழிகள்', detail: 'Four credible exits. UPSC + criminology optional is well-trodden; M.A. + PhD opens academia; LL.B. opens legal-criminology crossover; crime-analytics is the emerging private-sector path.', window: 'Years 3–6', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Read a foundational criminology text', titleTa: 'அடிப்படை குற்றவியல் புத்தகம்', detail: 'Sutherland & Cressey\'s "Principles of Criminology" or a modern equivalent. Tests honestly whether you enjoy the theoretical reading.', priority: 'high' },
      { title: 'Honest tolerance test for graphic case material', titleTa: 'வரைகலை உள்ளடக்க சகிப்புத்தன்மை', detail: 'Real criminology coursework involves disturbing case studies. Reading honest crime journalism (not entertainment crime shows) for a few hours clarifies your tolerance.', priority: 'high' },
      { title: 'Daily news + crime-data awareness', titleTa: 'தினசரி செய்தி + குற்ற தரவு', detail: 'NCRB annual reports, The Hindu and Indian Express crime coverage, IndiaJustice reports. Builds the data-aware criminologist mindset.', priority: 'medium', link: 'https://ncrb.gov.in' },
    ],
    buildNowSkills: [
      { skill: 'Strong English — both written and read', why: 'Criminology is a reading-and-writing-heavy discipline. Strong English from day 1 transforms every course.', freeResource: 'The Hindu daily reading, BBC Learning English, structured writing practice' },
      { skill: 'Basic statistics and data interpretation', why: 'Modern criminology is increasingly data-driven. Comfort with statistics (means, distributions, correlation) opens the high-growth crime-analytics roles.', freeResource: 'Khan Academy statistics, free Coursera statistics intros' },
      { skill: 'Reading actual research papers', why: 'Criminology rewards students who engage with original research, not just textbook summaries. Practising paper-reading from year 1 compounds.', freeResource: 'Free abstracts on JSTOR, Google Scholar; ICSSR working papers' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.SC VISUAL COMMUNICATION ─────────────────────────────────────────────
  {
    id: 'visual-communication-graduate',
    family: 'creative-design',
    isNiche: true,
    interestTags: ['design', 'media'],
    needsCounsellorReview: true,
    aversionConflicts: ['maths_heavy', 'creative_pressure', 'high_competition'],
    automation: 'ai_augmented',
    automationNote: 'AI image and video generation has reshaped visual communication, but the trained communicator who knows brand storytelling, audience-fit design, and the practical realities of production cannot be automated. The strongest VisCom graduates use AI tools rather than competing with them — combining classical visual literacy with prompt and production fluency.',
    title: 'Visual Communication Graduate (B.Sc VisCom)',
    titleTa: 'காட்சி தொடர்பாடல் பட்டதாரி',
    icon: '🎬',
    color: 'from-pink-500 to-rose-600',
    whatIsIt:
      'A three-year B.Sc focused on the COMMUNICATION side of design — graphics, advertising, photography, videography and editing, animation basics, broadcast production, branding, digital media production. Output-focused: graduates produce communication artifacts (ads, videos, brand campaigns, social content) for clients. Distinct from B.Des (which focuses on the design PROCESS itself). Career outcomes: advertising agencies, digital marketing agencies, brand-side creative roles, OTT and streaming content production, social media content houses, freelance creative work, photography studios, animation studios.',
    eligibleStreams: ['arts', 'commerce', 'pcm', 'pcb', 'pcmb'],
    strongGroupCodes: ['401', '402', '404', '405'],
    ugCourses: ['B.Sc Visual Communication', 'B.Sc Electronic Media', 'B.Sc Animation & Visual Effects'],
    entranceExams: ['None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 3-year B.Sc. Active portfolio building during the degree is THE single highest-value activity — agencies and studios hire on portfolio first, marks second. Strong placements at year 3 from active-portfolio students.',
    skillWeights: { mathematics: 3, language: 6, science: 3, creativity: 9, people: 6, physical: 3, digital: 8 },
    priorityFit: { salary: 5, security: 5, balance: 5, abroad: 6, prestige: 6, passion: 9, growth: 7, hometown: 7 },
    competitiveBoardPct: { comfortable: 60, stretch: 50 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2.5–5 LPA fresh at advertising agencies and digital marketing firms; ₹3–6 LPA at brand-side creative roles and top OTT/streaming content houses. Freelance income varies widely.',
      midCareerLPA: 'AI estimate — ₹8–25 LPA after 7+ years for creative directors, senior brand designers, and senior content producers. Successful freelancers and creator-economy participants can substantially exceed.',
      note: 'Salary at entry is genuinely modest because portfolio matters more than degree. The trajectory is non-linear — strong creatives with good portfolios accelerate rapidly; weak portfolios stagnate regardless of degree. The brand-side and creator-economy upside is real for those who actually build a body of work.',
    },
    demand: { score: 7, note: 'AI estimate — strong demand from digital marketing agencies, OTT content explosion, brand-direct creative teams, and the broader creator economy. AI tools have changed the work but not reduced overall demand.' },
    entryDifficulty: { score: 2, note: 'AI estimate — direct admission widely available. Most TN women\'s colleges and Christian colleges run strong VisCom programs.' },
    collegeTiers: [
      { label: 'Top VisCom programs in TN (AI estimate)', examples: ['Loyola College Chennai', 'Madras Christian College (MCC)', 'MOP Vaishnav College for Women', 'Women\'s Christian College Chennai'], cutoffGuide: 'AI estimate — 70%+ in 12th typical at top tier.', feeRange: 'AI estimate — ₹25K–80K / year' },
      { label: 'Strong programs (AI estimate)', examples: ['Stella Maris College', 'Ethiraj College for Women', 'PSGR Krishnammal Coimbatore', 'Bishop Heber Trichy'], cutoffGuide: 'AI estimate — 65–75%.', feeRange: 'AI estimate — ₹25K–80K / year' },
      { label: 'Other TN colleges with VisCom programs (AI estimate)', examples: ['Numerous TN private and aided colleges offer VisCom'], cutoffGuide: 'AI estimate — widely accessible.', feeRange: 'AI estimate — ₹20K–80K / year' },
    ],
    costReality: 'AI estimate — a 3-year B.Sc VisCom in TN costs roughly ₹75K–2.5L total. The bigger investment is in tools (camera, computer, Adobe Creative Cloud subscription) — typically ₹1–3L additional over the degree.',
    backupOptions: ['M.A. Communication / M.Sc Electronic Media — academic specialisation', 'Direct portfolio + agency / studio roles', 'Independent creator economy (YouTube, Instagram, freelance creative)', 'Pivot to digital marketing (broader skill set)', 'M.A. Animation / VFX for animation studio careers', 'Brand-side creative roles after 3-5 years agency experience'],
    honestCaveat: 'VisCom is a portfolio-driven career — your DEGREE counts dramatically less than your BODY OF WORK at graduation. Students who treat the degree as the destination rather than a foundation for active portfolio building stagnate. The early-career salary reality is modest; the breakthrough comes 3-5 years in for those who genuinely built strong portfolios during the degree. AI tools have shifted the work but not eliminated it — the strongest VisCom graduates are those who learn to use AI as a multiplier while maintaining classical visual literacy. Creative-deadline pressure is real and continuous; students who picked VisCom expecting low-stress work usually struggle.',
    roadmap: [
      { title: 'Score 60%+ in 12th (any stream)', titleTa: '+12 60%+ (எந்த பாடப்பிரிவும்)', detail: 'Direct admission. Bring a small portfolio to interviews at top colleges — even amateur photography or design work makes you memorable.', window: 'Now', phase: 'now' },
      { title: 'Join B.Sc VisCom + AGGRESSIVE portfolio building', titleTa: 'B.Sc + பணி தொகுப்பு', detail: 'From year 1, build a portfolio. Volunteer with college fests, NGOs, small businesses. The portfolio you graduate with is more valuable than your degree certificate.', window: 'Years 1–3', phase: 'next' },
      { title: 'Agency, brand role, OR creator-economy launch', titleTa: 'ஏஜென்சி / பிராண்ட் / உள்ளடக்கம்', detail: 'Three credible exits. Agency role for learning craft fast; brand-side for stability; independent creator economy for those with strong personal brand.', window: 'Years 3–5', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Start building a real portfolio NOW', titleTa: 'பணி தொகுப்பு ஆரம்பம்', detail: 'Free tools — Canva, Figma, Adobe student trials, smartphone camera. The earlier you start producing, the further you\'ll be at graduation.', priority: 'high' },
      { title: 'Pick ONE tool and learn it deeply', titleTa: 'ஒரு கருவியை ஆழமாக கற்க', detail: 'Photoshop, Figma, Adobe Premiere, or DaVinci Resolve — pick one based on what excites you and go deep before year 1.', priority: 'high', freeResource: 'YouTube tutorials, free Adobe trials, DaVinci Resolve free version' },
      { title: 'Observe and analyse — develop the trained eye', titleTa: 'காட்சி கூர்மை', detail: 'Spend time analysing ads, brand campaigns, films — what works, what doesn\'t, why. The trained eye is the career-defining skill.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'One core design tool — Photoshop, Figma, Premiere, or similar', why: 'Tool fluency is the working necessity of VisCom. One tool deeply known is more valuable than five known shallowly.', freeResource: 'Adobe Student trials, Figma free tier, YouTube deep-tutorials' },
      { skill: 'Visual analysis and design fundamentals', why: 'Composition, colour theory, typography — the foundations that separate trained designers from people who push buttons. Years 1-2 lean on these.', freeResource: 'Free Coursera design fundamentals courses, "The Non-Designer\'s Design Book" by Robin Williams' },
      { skill: 'Spoken English + presentation skills', why: 'Designers pitch their work daily. Clear, confident presentation is the difference between great work going unused and average work getting approved.', freeResource: 'BBC Learning English, local Toastmasters clubs, design-presentation YouTube channels' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.DES (BACHELOR OF DESIGN) ────────────────────────────────────────────
  {
    id: 'design-graduate',
    family: 'creative-design',
    isNiche: true,
    interestTags: ['design'],
    needsCounsellorReview: true,
    aversionConflicts: ['maths_heavy', 'creative_pressure', 'sitting_long'],
    automation: 'high_human_judgment',
    automationNote: 'AI can generate visuals; the designer who researches users, defines the right problem to solve, and iterates toward a working product or experience cannot be automated. Design thinking — the structured methodology behind product design, UX design, and service design — is among the most automation-resilient creative work.',
    title: 'Designer (B.Des — Bachelor of Design)',
    titleTa: 'வடிவமைப்பு பட்டதாரி',
    icon: '✏️',
    color: 'from-purple-500 to-indigo-600',
    whatIsIt:
      'A four-year B.Des focused on the DESIGN PROCESS itself — user research, problem definition, ideation, prototyping, iteration, and final delivery. Distinct from B.Sc VisCom (which focuses on producing communication output): B.Des trains the systematic DESIGN THINKING methodology used by product designers, UX designers, industrial designers, and service designers. Career outcomes: product design at tech firms (Flipkart, Swiggy, Razorpay UX teams), industrial design at automotive and consumer-electronics companies, UX research, service design at consultancies, design-led startups, and increasingly design-strategy roles at FMCG and fintech brands.',
    eligibleStreams: ['arts', 'commerce', 'pcm', 'pcb', 'pcmb'],
    strongGroupCodes: ['401', '402', '101', '102', '301'],
    ugCourses: ['B.Des (Product Design)', 'B.Des (Communication Design)', 'B.Des (Industrial Design)', 'B.Des (Fashion Design)', 'B.Des (UX/UI Design)'],
    entranceExams: ['UCEED', 'NID DAT', 'NIFT Entrance', 'None (direct admission for some private)'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 4-year B.Des. Top tier (IIT design programs via UCEED, NID via DAT, NIFT) place strongly at year 4 — product/UX teams at tech firms, industrial design houses, fashion brands. Tier-2 programs require stronger portfolio work to bridge the gap.',
    skillWeights: { mathematics: 4, language: 5, science: 4, creativity: 9, people: 6, physical: 4, digital: 7 },
    priorityFit: { salary: 6, security: 6, balance: 6, abroad: 8, prestige: 7, passion: 9, growth: 8, hometown: 5 },
    competitiveBoardPct: { comfortable: 70, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹5–10 LPA fresh from IIT design / NID / NIFT to tier-1 tech firms and design consultancies; ₹3–6 LPA from tier-2 private B.Des programs. Strong portfolios bridge the college-tier gap.',
      midCareerLPA: 'AI estimate — ₹15–40 LPA after 7+ years for senior product designers, UX leads, and design-strategy professionals at tech firms. Top design-consultancy partners and successful design-led founders substantially exceed.',
      note: 'Strong mid-career trajectory at the top tier — design is among the highest-paid creative paths in India because product/UX work directly impacts business outcomes. The salary gap between top-tier (IIT/NID/NIFT) and tier-2 programs is real but bridgeable via portfolio quality.',
    },
    demand: { score: 8, note: 'AI estimate — exceptional demand for product / UX designers from Indian tech, fintech, and e-commerce. Industrial and service design also growing. Fashion design has cyclical demand but strong top-end.' },
    entryDifficulty: { score: 7, note: 'AI estimate — top programs (IIT design, NID, NIFT) are highly competitive — UCEED and DAT require focused 6-12 month preparation. Tier-2 private B.Des programs accessible.' },
    collegeTiers: [
      { label: 'Top design programs (AI estimate)', examples: ['IIT Madras Design (B.Des via UCEED)', 'NID (National Institute of Design) — multiple campuses; entry via NID DAT', 'NIFT Chennai (entry via NIFT Entrance Exam)'], cutoffGuide: 'AI estimate — UCEED rank under 500 for IIT Madras; NID DAT clearance; NIFT entrance clearance.', feeRange: 'AI estimate — ₹2.5–4L / year (IIT/NID/NIFT)' },
      { label: 'Strong private design programs (AI estimate)', examples: ['Sastra University B.Des', 'Hindustan Institute of Technology Design programs', 'Vellore Institute of Technology Design programs', 'Karunya University Design'], cutoffGuide: 'AI estimate — direct admission with strong 12th marks; some require portfolio.', feeRange: 'AI estimate — ₹2L–4L / year' },
      { label: 'Other design programs in TN (AI estimate)', examples: ['Several TN private universities now offer B.Des — verify program quality per college'], cutoffGuide: 'AI estimate — direct admission; portfolio matters significantly.', feeRange: 'AI estimate — ₹1.5L–3.5L / year' },
    ],
    costReality: 'AI estimate — a 4-year B.Des in TN costs roughly ₹6L–16L total depending on college tier. IIT/NID/NIFT are dramatically more affordable per year than private B.Des programs. Tools and software add ₹1.5–4L over the degree.',
    backupOptions: ['M.Des at top design institutions', 'Direct product/UX role at tech firm (portfolio-led hiring)', 'Pivot to design-strategy consulting', 'Design-led startup founding', 'Industrial design at automotive / consumer electronics firms', 'Move abroad — strong demand in US, EU, Singapore for Indian-trained designers'],
    honestCaveat: 'B.Des rewards students who genuinely enjoy the design METHODOLOGY (research, ideation, iteration) — not just the outputs. Students who picked B.Des hoping for "fun creative work without engineering" find the structured-iteration aspect surprisingly demanding. The top-tier UCEED/NID/DAT preparation grind is real and competitive — students unwilling to invest in entrance preparation often end up at tier-2 programs where the placement reality is genuinely different. The trade-off vs B.Sc VisCom: B.Des is more rigorous, more competitive entry, but pays substantially better at career trajectory. Both are creative-pressure-heavy.',
    roadmap: [
      { title: 'Score 70%+ in 12th + prepare for UCEED / NID DAT / NIFT', titleTa: '+12 70%+ + நுழைவுத் தேர்வுகள்', detail: 'Top tier requires focused entrance preparation (6-12 months). Tier-2 private programs offer direct admission.', window: 'Now', phase: 'now' },
      { title: 'Join B.Des + IMMERSIVE design practice', titleTa: 'B.Des + ஆழமான பயிற்சி', detail: 'Use the 4 years to build a deep portfolio across product design, UX, and one specialisation. Internships at tech firms / design consultancies during summer breaks are essential.', window: 'Years 1–4', phase: 'next' },
      { title: 'Tier-1 tech product role, design consultancy, or M.Des', titleTa: 'தொழில்நுட்ப / ஆலோசனை / M.Des', detail: 'Three strong exits. Product/UX role at tech firm for income and growth; consultancy for variety; M.Des for academic / specialisation depth.', window: 'Years 4–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Decide: UCEED/NID/NIFT track or direct admission?', titleTa: 'நுழைவுத் தேர்வு அல்லது நேரடி?', detail: 'Top tier requires entrance prep starting now. Tier-2 private B.Des skips this. The college-tier decision has real career implications — make it deliberately.', priority: 'high', link: 'https://www.uceed.iitb.ac.in' },
      { title: 'Build a starter design portfolio', titleTa: 'வடிவமைப்பு தொகுப்பு ஆரம்பம்', detail: 'Sketches, redesigns of bad UIs you encounter, photographed prototypes of small products you make. Quality of thought matters more than polish at this stage.', priority: 'high' },
      { title: 'Read "The Design of Everyday Things" by Don Norman', titleTa: 'வடிவமைப்பு புத்தகம்', detail: 'The foundational text of design thinking. Cheap on Amazon India / widely available in libraries. Genuinely transforms how you see designed products.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Sketching and visual thinking', why: 'Designers communicate through sketches throughout their career. Comfortable rapid sketching is more important than polished output at the foundation level.', freeResource: 'YouTube sketching-for-designers tutorials, free practice sketchbooks, "Sketching User Experiences" by Buxton' },
      { skill: 'Design fundamentals — composition, colour, typography, hierarchy', why: 'The classical foundations that separate trained designers from amateurs. Strong foundations make every subsequent tool and trend easier to absorb.', freeResource: 'Free Coursera design fundamentals, "The Non-Designer\'s Design Book", design-fundamentals YouTube channels' },
      { skill: 'Design research and observation', why: 'Modern design IS user research. Practising the discipline of observing how people actually use things builds the most career-defining design habit.', freeResource: 'IDEO\'s Design Kit (free), "The Design of Everyday Things" book, structured observation exercises' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── BBA LOGISTICS & SUPPLY CHAIN ──────────────────────────────────────────
  {
    id: 'bba-logistics',
    family: 'commerce-bba',
    isNiche: true,
    interestTags: ['finance', 'engineering'],
    needsCounsellorReview: true,
    aversionConflicts: ['sitting_long', 'paperwork'],
    automation: 'ai_augmented',
    automationNote: 'AI has dramatically changed logistics — route optimisation, demand forecasting, inventory automation. The supply-chain manager who designs the system, negotiates with vendors, and manages crisis disruption (a port closure, a customs delay, a supplier failure) remains firmly human. India\'s e-commerce growth and the Make in India manufacturing push drive sustained demand.',
    title: 'BBA Logistics & Supply Chain Management',
    titleTa: 'BBA தளவாட மற்றும் விநியோகச் சங்கிலி',
    icon: '🚚',
    color: 'from-blue-600 to-indigo-700',
    whatIsIt:
      'A three-year BBA specialising in logistics operations, supply chain design, procurement, inventory management, warehousing, transportation systems, port operations, customs and international trade. Distinct from general BBA: heavier on operations research, quantitative methods, and supply-chain technology systems. Career outcomes: e-commerce logistics (Amazon, Flipkart, Delhivery), port and shipping operations, manufacturing supply-chain roles, third-party logistics providers, retail supply chain at FMCG companies, and increasingly the supply-chain consulting segment.',
    eligibleStreams: ['commerce', 'pcm', 'arts'],
    strongGroupCodes: ['301', '302', '304', '308', '101', '102'],
    ugCourses: ['BBA Logistics & Supply Chain Management', 'BBA Logistics Management', 'B.Com Logistics & Supply Chain'],
    entranceExams: ['None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 3-year BBA. Strong placement at e-commerce logistics firms during final year. The MBA in Supply Chain / Operations after 2-3 years of industry experience is a common acceleration step.',
    skillWeights: { mathematics: 7, language: 6, science: 3, creativity: 4, people: 7, physical: 3, digital: 7 },
    priorityFit: { salary: 6, security: 7, balance: 6, abroad: 6, prestige: 5, passion: 6, growth: 7, hometown: 7 },
    competitiveBoardPct: { comfortable: 70, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹3.5–6 LPA fresh at e-commerce logistics firms (Amazon, Flipkart, Delhivery); ₹4–7 LPA at top 3PL providers (DHL, FedEx, Mahindra Logistics). Higher than generic BBA because of the quantitative / tech-adjacent skill premium.',
      midCareerLPA: 'AI estimate — ₹12–25 LPA after 7+ years for senior supply-chain managers, logistics operations leads, and supply-chain consultants. Post-MBA roles at top consultancies (Big 4 supply-chain practices) substantially exceed.',
      note: 'Pays above generic BBA because the analytical / tech-adjacent skill set translates directly into e-commerce and consulting roles. The MBA route from BBA Logistics is unusually high-ROI — operations is among the most in-demand MBA specialisations.',
    },
    demand: { score: 8, note: 'AI estimate — exceptionally strong. India\'s e-commerce growth, Make in India manufacturing push, and the broader logistics industry expansion (logistics market projected to triple by 2030) create sustained hiring at every level.' },
    entryDifficulty: { score: 3, note: 'AI estimate — direct admission widely available. Most TN private universities now offer BBA Logistics tracks.' },
    collegeTiers: [
      { label: 'Top BBA Logistics programs in TN (AI estimate)', examples: ['AMET University (Academy of Maritime Education) — maritime logistics specialty', 'Sastra University BBA Logistics', 'SRM University BBA Logistics & Supply Chain'], cutoffGuide: 'AI estimate — 75%+ in 12th typical.', feeRange: 'AI estimate — ₹1.5L–3L / year' },
      { label: 'Strong programs (AI estimate)', examples: ['Vels University BBA Logistics', 'Hindustan Institute', 'Loyola Institute of Business Administration (LIBA)'], cutoffGuide: 'AI estimate — 65–75%.', feeRange: 'AI estimate — ₹1L–2.5L / year' },
      { label: 'Other TN colleges with BBA Logistics tracks (AI estimate)', examples: ['Growing number of TN private universities offer BBA Logistics; verify program quality per college'], cutoffGuide: 'AI estimate — accessible; 60%+ typical.', feeRange: 'AI estimate — ₹80K–2L / year' },
    ],
    costReality: 'AI estimate — a 3-year BBA Logistics in TN costs roughly ₹2.5L–9L total. Strong ROI because of the e-commerce / consulting career tilt.',
    backupOptions: ['MBA Operations / Supply Chain (post 2-3 years industry) — strongest acceleration', 'CSCP / CSCMP certifications (Certified Supply Chain Professional) — industry credential', 'Pivot to general BBA / commerce roles if logistics specialty loses appeal', 'E-commerce operations leadership track', 'Maritime / port operations specialisation', 'Move abroad — Gulf and Singapore logistics industries actively hire'],
    honestCaveat: 'BBA Logistics rewards students who genuinely enjoy operations thinking, optimisation problems, and getting things done at scale. Students who picked it hoping for "BBA without the maths" find the quantitative components (operations research, inventory mathematics, forecasting) unexpectedly demanding. The day-to-day work involves real time pressure (a delayed truck, a stuck container, a vendor failure) — students looking for low-stress desk work usually find logistics surprisingly intense. The trade-off: among the highest-demand BBA specialisations, with genuine career mobility.',
    roadmap: [
      { title: 'Score 70%+ in 12th (any stream)', titleTa: '+12 70%+', detail: 'Direct admission. Commerce and PCM streams equally welcome.', window: 'Now', phase: 'now' },
      { title: 'Join BBA Logistics + active industry internships', titleTa: 'BBA + தொழில் பயிற்சி', detail: 'Summer internships at e-commerce logistics firms or 3PL providers transform placement outcomes. The hiring networks run through these.', window: 'Years 1–3', phase: 'next' },
      { title: 'Logistics role + CSCP certification + MBA (in that order)', titleTa: 'வேலை + சான்றிதழ் + MBA', detail: 'First role typically operations / coordinator. CSCP certification + 2-3 years experience + MBA Operations is the standard career acceleration sequence.', window: 'Years 3–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Strengthen Mathematics + basic statistics', titleTa: 'கணிதம் + புள்ளியியல்', detail: 'BBA Logistics leans on operations research and inventory mathematics. Strong 12th Maths + a head start on basic statistics makes year 1 dramatically easier.', priority: 'high' },
      { title: 'Read "The Goal" by Eliyahu Goldratt', titleTa: 'புத்தகம் — "The Goal"', detail: 'A novel that teaches operations / supply-chain thinking through a story. Cheap on Amazon India. Essential pre-reading.', priority: 'high' },
      { title: 'Visit a logistics facility / warehouse if possible', titleTa: 'பெரிய கிடங்கு பார்வை', detail: 'Amazon, Flipkart, and major 3PL warehouses across TN sometimes offer student tours. Understanding the physical reality of logistics operations sharpens later coursework.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Excel + spreadsheet fluency for supply-chain data', why: 'Logistics work runs on spreadsheets — inventory tables, shipment trackers, cost models. Strong Excel from day 1 is a working necessity.', freeResource: 'Microsoft Excel free YouTube (Leila Gharani, ExcelIsFun)' },
      { skill: 'Basic statistics — forecasting and distributions', why: 'Demand forecasting is at the core of supply chain. Comfort with basic statistical concepts (means, distributions, regression) directly translates into year 2-3 coursework.', freeResource: 'Khan Academy statistics, free Coursera Supply Chain Fundamentals' },
      { skill: 'Understanding how e-commerce actually works', why: 'India\'s e-commerce economy is reshaping logistics. Reading about Amazon\'s supply-chain operations, Flipkart\'s last-mile delivery, etc. builds career-relevant intuition.', freeResource: 'The Ken supply-chain coverage, Bloomberg logistics articles, free Coursera courses' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── BBA AVIATION MANAGEMENT ───────────────────────────────────────────────
  {
    id: 'bba-aviation',
    family: 'commerce-bba',
    isNiche: true,
    interestTags: ['finance', 'travel'],
    needsCounsellorReview: true,
    aversionConflicts: ['shift_work', 'sales_persuasion'],
    automation: 'human_facing',
    automationNote: 'Aviation operations remain heavily human despite automation in flight systems — ground operations, customer service, ramp coordination, airport management, and the broader aviation business all require trained human professionals. India\'s aviation expansion (UDAN scheme, new airport projects, fleet growth at IndiGo, Air India, Akasa) drives sustained demand.',
    title: 'BBA Aviation Management',
    titleTa: 'BBA விமான மேலாண்மை',
    icon: '✈️',
    color: 'from-sky-500 to-blue-600',
    whatIsIt:
      'A three-year BBA specialising in airline management, airport operations, aviation safety and regulations, ground handling, in-flight services, aviation marketing, and the broader aviation industry. Distinct from general BBA: industry-specific curriculum covering DGCA regulations, airline economics, airport operations, and aviation service standards. Career outcomes: airline ground operations (IndiGo, Air India, Akasa, Vistara), airport operations (GMR, Adani Airports), aviation customer service, cargo operations, aviation regulatory and compliance roles, and increasingly tourism-aviation crossover roles.',
    eligibleStreams: ['commerce', 'arts', 'pcm', 'pcb', 'pcmb'],
    strongGroupCodes: ['301', '302', '304', '308'],
    ugCourses: ['BBA Aviation Management', 'BBA Airline & Airport Management', 'B.Sc Aviation Management'],
    entranceExams: ['None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 3-year BBA. Strong placement at airlines and airport operators during final year. The aviation industry rewards experience — career trajectory accelerates with 3-5 years of direct industry exposure.',
    skillWeights: { mathematics: 6, language: 7, science: 3, creativity: 4, people: 8, physical: 3, digital: 6 },
    priorityFit: { salary: 6, security: 6, balance: 4, abroad: 8, prestige: 7, passion: 7, growth: 7, hometown: 5 },
    competitiveBoardPct: { comfortable: 70, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹3–5 LPA fresh at airline ground operations and airport service roles; ₹4–6 LPA at major airport operators and cargo operations. International airline career routes pay substantially higher.',
      midCareerLPA: 'AI estimate — ₹10–22 LPA after 7+ years for airport operations managers, airline operations leads, and senior aviation specialists. Aviation industry leadership roles at major airlines and airports significantly exceed.',
      note: 'Modest entry pay but strong abroad mobility — aviation is a global industry, and TN aviation graduates frequently move to Gulf airlines and Singapore-based aviation careers. Shift work and irregular hours are real and continuous in early career.',
    },
    demand: { score: 8, note: 'AI estimate — strong demand from India\'s aviation expansion. UDAN scheme is creating tier-2 / tier-3 airports; major fleet growth at IndiGo, Air India, Akasa; new private airports. Demand will continue through this decade.' },
    entryDifficulty: { score: 3, note: 'AI estimate — direct admission widely available. The bottleneck is awareness — most students don\'t consider aviation management as a structured BBA track.' },
    collegeTiers: [
      { label: 'Top BBA Aviation programs in TN (AI estimate)', examples: ['Hindustan Institute of Technology — Aviation Management', 'SRM University BBA Aviation', 'AMET University Aviation Management'], cutoffGuide: 'AI estimate — 70%+ in 12th typical.', feeRange: 'AI estimate — ₹1.5L–3L / year' },
      { label: 'Strong programs (AI estimate)', examples: ['Sri Sairam Institute of Aviation Management', 'Vels University BBA Aviation', 'Sastra University BBA Aviation'], cutoffGuide: 'AI estimate — 65–75%.', feeRange: 'AI estimate — ₹1L–2.5L / year' },
      { label: 'Other TN aviation programs (AI estimate)', examples: ['Several TN private universities offer BBA Aviation tracks; verify program quality and industry partnerships per college'], cutoffGuide: 'AI estimate — accessible; 60%+ typical.', feeRange: 'AI estimate — ₹80K–2L / year' },
    ],
    costReality: 'AI estimate — a 3-year BBA Aviation in TN costs roughly ₹2.5L–9L total. Programs with active airline / airport industry partnerships (internship placement) materially improve ROI.',
    backupOptions: ['Direct airline / airport operations role + industry-specific certifications', 'IATA (International Air Transport Association) certifications — industry credential', 'Pivot to general hospitality / tourism management', 'MBA Aviation / MBA general after 3-5 years industry experience', 'Move abroad — Gulf airlines, Singapore Airlines, and others actively hire Indian aviation graduates', 'Tourism management adjacent roles'],
    honestCaveat: 'Aviation Management is a service industry — daily work involves direct customer interaction, irregular hours including night shifts and weekends, and the realities of airline operations (delays, frustrated passengers, weather disruptions). Students who picked aviation management hoping for "glamorous travel" find the operations reality (long hours at airports, customer complaint handling, regulatory paperwork) less glamorous than expected. Work-life balance during the first 3-5 years is genuinely difficult. The trade-off: strong abroad mobility, industry growth, and the global nature of aviation careers. The aviation-pilot route is separate (requires CPL training, not this degree) and should not be confused with aviation management.',
    roadmap: [
      { title: 'Score 65%+ in 12th + good English skills', titleTa: '+12 65%+ + ஆங்கில திறன்', detail: 'Direct admission. Strong English is non-negotiable for aviation careers — communication is the core skill.', window: 'Now', phase: 'now' },
      { title: 'Join BBA Aviation + airline / airport internships', titleTa: 'BBA + பயிற்சி', detail: 'Summer internships at airlines or airport operators during the degree are essential. The placement networks run heavily through these.', window: 'Years 1–3', phase: 'next' },
      { title: 'Airline / airport role + IATA certification + abroad pathway', titleTa: 'வேலை + சான்றிதழ் + வெளிநாடு', detail: 'First role typically at an airline ground ops or airport operator. IATA certifications + 3-5 years experience + abroad pathway (Gulf, Singapore) is the standard high-trajectory sequence.', window: 'Years 3–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Strengthen Spoken English', titleTa: 'ஆங்கில திறன் வலுப்படுத்துதல்', detail: 'Aviation IS communication. Daily English practice, watching English news, reading aloud — all build the foundation career skill.', priority: 'high', freeResource: 'BBC Learning English, daily English news, free Coursera English communication courses' },
      { title: 'Visit an airport — observe operations carefully', titleTa: 'விமான நிலையம் பார்வை', detail: 'A few hours at Chennai or Madurai airport, observing check-in, security, gate operations clarifies what "aviation management" actually involves. Free reality check.', priority: 'high' },
      { title: 'Read about India\'s aviation industry and DGCA basics', titleTa: 'இந்திய விமான தொழில்', detail: 'Understanding airline economics, airport operations, and DGCA regulatory basics sets useful context. Industry trade publications are free online.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Spoken English + clear professional communication', why: 'Aviation careers are communication-intensive. Strong English from day 1 is non-negotiable — it separates ₹3 LPA careers from ₹6 LPA careers from the first job.', freeResource: 'BBC Learning English, Toastmasters clubs, daily English news consumption' },
      { skill: 'Customer service mindset + empathy', why: 'Aviation IS service work. Practice handling difficult situations calmly (a frustrated customer, a confused traveller). The empathy + composure combination defines career advancement.', freeResource: 'Customer service YouTube training, role-play exercises with peers, retail / service part-time work' },
      { skill: 'Basic geography + world awareness', why: 'Aviation is global. Knowing routes, airport codes, time zones, and basic world geography is the unglamorous but career-defining literacy.', freeResource: 'Geography quizzes, airline route maps, free aviation-industry YouTube channels' },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.SC PSYCHOLOGY ───────────────────────────────────────────────────────
  {
    id: 'psychology-graduate',
    family: 'psychology',
    isNiche: true,
    interestTags: ['healthcare', 'research', 'education'],
    needsCounsellorReview: true,
    aversionConflicts: ['patient_care', 'sitting_long', 'memorisation'],
    automation: 'high_human_judgment',
    automationNote: 'Clinical psychology, counselling, and behavioural research are among the most automation-resilient careers — they rely on contextual human empathy, deep listening, and the careful judgement of complex individual situations. India\'s mental health awareness growth (post-2020 in particular) and the Mental Healthcare Act\'s implementation create sustained and growing demand for trained psychology professionals.',
    title: 'Psychologist (B.Sc Psychology)',
    titleTa: 'உளவியல் பட்டதாரி',
    icon: '🧠',
    color: 'from-teal-500 to-emerald-600',
    whatIsIt:
      'A three-year B.Sc covering general psychology, abnormal psychology, biopsychology, social psychology, developmental psychology, statistics in psychology, and introduction to clinical / counselling / industrial-organisational specialisations. IMPORTANT: a B.Sc Psychology alone does NOT make you a clinical psychologist — that requires an M.Phil. Clinical Psychology + RCI registration (a 2-3 year additional commitment). Career outcomes from the B.Sc itself: research assistant, HR / talent roles in companies, school counsellor (with M.A. Counselling), market-research roles, mental-health support roles in NGOs. Strongest mid-career trajectories require M.A. or M.Phil. specialisation.',
    eligibleStreams: ['arts', 'commerce', 'pcm', 'pcb', 'pcmb'],
    strongGroupCodes: ['401', '402', '404', '405', '208', '204'],
    ugCourses: ['B.Sc Psychology', 'B.A. Psychology', 'B.Sc Applied Psychology'],
    entranceExams: ['None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer: 'A 3-year B.Sc, but the full clinical career pathway typically takes 5-7 years (B.Sc + M.A./M.Sc + M.Phil. Clinical Psychology + RCI registration). The B.Sc alone is a foundational credential.',
    skillWeights: { mathematics: 4, language: 7, science: 8, creativity: 5, people: 9, physical: 2, digital: 5 },
    priorityFit: { salary: 4, security: 6, balance: 7, abroad: 7, prestige: 6, passion: 9, growth: 6, hometown: 7 },
    competitiveBoardPct: { comfortable: 65, stretch: 55 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2–3.5 LPA fresh as a research assistant, HR executive, or school counsellor support role; ₹2.5–4.5 LPA in entry NGO mental-health roles. RCI-registered clinical psychologists (post M.Phil.) ₹4–7 LPA fresh, growing substantially.',
      midCareerLPA: 'AI estimate — Clinical psychologists (RCI-registered) ₹8–18 LPA after 7+ years; private practice can substantially exceed. HR / organisational psychologists at corporate firms ₹10–20 LPA. Academic faculty ₹8–18 LPA after PhD.',
      note: 'The B.Sc alone earns modestly because direct mental-health work requires the additional M.Phil. + RCI credentials. The real ROI emerges 5-7 years in for those who complete the clinical specialisation pathway. Mental health is one of the genuinely growing demand sectors in India — long-term career security is strong for those who specialise.',
    },
    demand: { score: 8, note: 'AI estimate — strong and growing. India\'s mental health awareness post-2020, corporate wellness programs, school counselling expansion, and the Mental Healthcare Act all create sustained demand. Chronic shortage of trained / registered clinical psychologists in India.' },
    entryDifficulty: { score: 2, note: 'AI estimate — direct admission widely available; among the most accessible B.Sc tracks. Awareness is the bottleneck.' },
    collegeTiers: [
      { label: 'Top Psychology programs in TN (AI estimate)', examples: ['Women\'s Christian College Chennai', 'Madras Christian College (MCC)', 'Stella Maris College', 'Ethiraj College for Women'], cutoffGuide: 'AI estimate — 70%+ in 12th typical at top tier.', feeRange: 'AI estimate — ₹25K–80K / year' },
      { label: 'Strong programs (AI estimate)', examples: ['Loyola College', 'PSGR Krishnammal Coimbatore', 'MOP Vaishnav College for Women', 'Bishop Heber Trichy'], cutoffGuide: 'AI estimate — 65–75%.', feeRange: 'AI estimate — ₹25K–80K / year' },
      { label: 'Other TN colleges with Psychology programs (AI estimate)', examples: ['Numerous TN aided and private colleges offer Psychology'], cutoffGuide: 'AI estimate — widely accessible.', feeRange: 'AI estimate — ₹20K–60K / year' },
    ],
    costReality: 'AI estimate — a 3-year B.Sc Psychology in TN costs roughly ₹75K–2.5L total. The bigger investment is the M.A./M.Sc + M.Phil. specialisation that follows — typically ₹2–6L additional over 3-4 years for the full pathway.',
    backupOptions: ['M.A. / M.Sc Psychology + M.Phil. Clinical Psychology + RCI registration — the full clinical pathway', 'M.A. Counselling Psychology — for school / corporate counselling roles', 'M.A. Industrial-Organisational Psychology — HR / corporate path', 'PhD + academic faculty career', 'Pivot to HR / talent acquisition (less specialised but B.Sc-accessible)', 'NGO mental-health support roles (rural mental health, community programs)', 'Move abroad — Gulf countries actively hire Indian-trained psychology graduates'],
    honestCaveat: 'A B.Sc Psychology is NOT a license to practise clinical psychology — that requires M.Phil. + RCI registration, which is a 2-3 year additional commitment. Students who joined imagining "I want to be a therapist" need to know the full pathway is 5-7 years post-12th, not 3. Direct B.Sc-level employment is modest in pay and limited in scope. Clinical work also involves emotional labour — daily exposure to others\' suffering changes you. Students drawn to the science AND the long-term commitment thrive; those who picked it for "interesting subject" without that commitment usually pivot to HR or other careers. The science dimension is also real — biopsychology and statistics in psychology are more demanding than students expect.',
    roadmap: [
      { title: 'Score 65%+ in 12th (any stream)', titleTa: '+12 65%+ (எந்த பாடப்பிரிவும்)', detail: 'Direct admission. Strong Biology + English help most; PCM students benefit from the statistics components.', window: 'Now', phase: 'now' },
      { title: 'Join B.Sc Psychology + DECIDE specialisation by year 2', titleTa: 'B.Sc + சிறப்பு பாடம் முடிவு', detail: 'Clinical, Counselling, Industrial-Organisational, or Academic — these require very different post-graduation paths. Decide by year 2 to align coursework and internships.', window: 'Years 1–3', phase: 'next' },
      { title: 'M.A. / M.Sc + M.Phil. + RCI (for clinical) OR alternative specialisation', titleTa: 'M.A. + M.Phil. + RCI / மாற்று வழி', detail: 'Clinical pathway: M.Sc Clinical Psych + M.Phil. + RCI registration. HR pathway: M.A. I-O Psych + corporate role. Academic pathway: PhD. Each is 2-4 additional years.', window: 'Years 3–7', phase: 'later' },
    ],
    ninetyDayPlan: [
      { title: 'Read one foundational psychology text', titleTa: 'அடிப்படை உளவியல் புத்தகம்', detail: '"The Man Who Mistook His Wife for a Hat" by Oliver Sacks, or any introductory psychology textbook. Tests honestly whether you find the discipline genuinely interesting.', priority: 'high' },
      { title: 'Decide: clinical or non-clinical specialisation?', titleTa: 'மருத்துவ அல்லது பிற சிறப்பு?', detail: 'The clinical pathway (M.Phil. + RCI) is significantly longer and more demanding than non-clinical paths. Knowing your direction early shapes your B.Sc choices.', priority: 'high' },
      { title: 'Strengthen 12th Biology + basic statistics', titleTa: 'உயிரியல் + புள்ளியியல்', detail: 'Year 1 leans heavily on biopsychology (brain, neurons) and introductory statistics. Strong fundamentals make a real difference.', priority: 'medium' },
    ],
    buildNowSkills: [
      { skill: 'Strong English — written and spoken', why: 'Psychology is communication-intensive — case notes, research papers, client counselling, presentations. Strong English from day 1 is the working necessity.', freeResource: 'BBC Learning English, daily reading practice, structured writing exercises' },
      { skill: 'Active listening and empathy practice', why: 'The single most career-defining skill in psychology. Practising attentive, non-judgemental listening (with friends, family, volunteer work) builds the foundation.', freeResource: 'Volunteer with elderly-care or counselling helplines, structured listening exercises' },
      { skill: 'Basic statistics — distributions, correlation, significance', why: 'Modern psychology is research-driven, and statistics is the language of psychological research. Strong fundamentals from year 1 ease coursework dramatically.', freeResource: 'Khan Academy statistics, free Coursera "Statistics in Psychology" courses' },
    ],
    lastReviewed: '2026-05',
  },





];

// ─────────────────────────────────────────────────────────────────────────────
// Lookup helpers
// ─────────────────────────────────────────────────────────────────────────────

export const getPathwayById = (id: string): CareerPathway | undefined =>
  CAREER_PATHWAYS.find((p) => p.id === id);

/** Careers reachable from a given stream — the eligibility gate. */
export const getPathwaysForStream = (stream: Stream): CareerPathway[] =>
  CAREER_PATHWAYS.filter((p) => p.eligibleStreams.includes(stream));
