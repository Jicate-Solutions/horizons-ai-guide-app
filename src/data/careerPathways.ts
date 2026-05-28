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

  // ─── B.COM (BACHELOR OF COMMERCE) ──────────────────────────────────────────
  {
    id: 'bcom-graduate',
    needsCounsellorReview: true,
    aversionConflicts: [],
    automation: 'ai_augmented',
    automationNote: 'Routine book-keeping and basic accounting are automating, but the broader B.Com graduate path opens into finance, banking, GST practice, audit support and further study (M.Com, MBA, ACCA) — many of which remain firmly human.',
    title: 'B.Com Graduate',
    titleTa: 'வணிக இளங்கலை',
    icon: '📊',
    color: 'from-emerald-500 to-teal-600',
    whatIsIt:
      'A three-year commerce degree that opens doors into accounting, banking, taxation, GST practice, finance jobs, government exams and further study like M.Com, MBA, CA, ACCA or CMA.',
    eligibleStreams: ['commerce'],
    strongGroupCodes: ['301', '320'],
    ugCourses: ['B.Com (General)', 'B.Com (Hons.)', 'B.Com (CA)', 'B.Com (Bank Mgmt)'],
    entranceExams: ['None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'A 3-year direct-admission degree. Many B.Com graduates start working within 3 years of finishing 12th — though stronger careers usually come after a further qualification (M.Com, MBA, ACCA, CA inter).',
    skillWeights: {
      mathematics: 7,
      language: 7,
      science: 2,
      creativity: 4,
      people: 6,
      physical: 1,
      digital: 6,
    },
    priorityFit: {
      salary: 6,
      security: 7,
      balance: 7,
      abroad: 6,
      prestige: 5,
      passion: 5,
      growth: 7,
      hometown: 8,
    },
    competitiveBoardPct: { comfortable: 70, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — typically ₹2–4 LPA fresh, more with skills (Tally, Excel, GST) or further qualifications.',
      midCareerLPA: 'AI estimate — ₹6–15 LPA after 5+ years, especially with M.Com / MBA / CA / ACCA add-ons.',
      note: 'A B.Com alone rarely commands a high salary; the leverage comes from layering qualifications or specialised skills (GST practice, audit, financial analysis) on top.',
    },
    demand: {
      score: 7,
      note: 'AI estimate — steady demand from finance teams, tax practices, banks and government exam aspirants. Bottom-of-the-funnel work is being automated.',
    },
    entryDifficulty: {
      score: 3,
      note: 'Seats are widely available across TN with direct admission. The competitive part is choosing a college and specialisation that opens doors.',
    },
    collegeTiers: [
      {
        label: 'Top autonomous / aided colleges (AI estimate)',
        examples: ['Loyola College Chennai', 'Madras Christian College', 'PSG College of Arts & Science', 'St. Joseph\'s College Trichy'],
        cutoffGuide: 'AI estimate — direct admission; cut-off marks typically 80%+ at top tier.',
        feeRange: 'AI estimate — ₹15K–60K / year',
      },
      {
        label: 'Strong city colleges (AI estimate)',
        examples: ['Stella Maris (Women)', 'Ethiraj (Women)', 'D.G. Vaishnav', 'Bishop Heber Trichy'],
        cutoffGuide: 'AI estimate — 70–80% typical for direct admission.',
        feeRange: 'AI estimate — ₹15K–80K / year',
      },
      {
        label: 'Government / aided district colleges (AI estimate)',
        examples: ['Government Arts Colleges across districts', 'Many aided colleges in tier-2 towns'],
        cutoffGuide: 'AI estimate — wide access, cut-off as low as 60%.',
        feeRange: 'AI estimate — ₹2K–25K / year',
      },
    ],
    costReality:
      'AI estimate — a 3-year B.Com in TN costs roughly ₹10K–2L total depending on college. Government colleges are extremely affordable; aided autonomous colleges sit in the middle. The bigger cost is what you do AFTER the degree.',
    backupOptions: [
      'CMA (cost & management accountant) — registered alongside B.Com',
      'ACCA — international qualification, doable during B.Com',
      'MBA after 2-3 years of work experience',
      'Banking exams (IBPS, SBI PO)',
    ],
    honestCaveat:
      'A B.Com on its own without further study or specialised skills genuinely struggles in the TN job market. Plan from day one to add at least one of: M.Com, MBA, CA inter, CMA, ACCA, or strong applied skills (advanced Excel, Tally, GST, accounting software). The degree is a foundation, not a destination.',
    roadmap: [
      {
        title: 'Pass 12th Commerce with 70%+',
        titleTa: '+12-இல் 70%+ பெறுங்கள்',
        detail: 'Direct admission; marks matter for top colleges but not for getting a seat somewhere.',
        window: 'Now',
        phase: 'now',
      },
      {
        title: 'Join B.Com (3 years)',
        titleTa: 'பி.காம் சேருங்கள் (3 ஆண்டுகள்)',
        detail: 'Pick a college with strong placement and ideally autonomous syllabus. Add Tally, advanced Excel, GST practice on the side.',
        window: 'Years 1–3',
        phase: 'next',
      },
      {
        title: 'Specialise — CA Inter, CMA, M.Com, MBA, or ACCA',
        titleTa: 'CA இன்டர், CMA, எம்.காம், அல்லது MBA',
        detail: 'A B.Com alone rarely lands strong roles. Stack one professional qualification on top while you study or after.',
        window: 'Years 3–5',
        phase: 'later',
      },
    ],
    ninetyDayPlan: [
      {
        title: 'Pick the right specialisation',
        titleTa: 'சரியான சிறப்புப் பாடத்தைத் தேர்ந்தெடுக்கவும்',
        detail: 'B.Com General, B.Com (CA), B.Com (Bank Mgmt) and B.Com (Hons.) open slightly different doors. Match it to whether you want corporate jobs, banking, or a CA/CMA path.',
        priority: 'high',
      },
      {
        title: 'Open a free Tally and Excel account',
        titleTa: 'டாலி மற்றும் எக்செல் கற்க தொடங்கவும்',
        detail: 'Tally is the most-asked tool in TN commerce job interviews. YouTube has full free courses. Start in week 1.',
        priority: 'high',
      },
      {
        title: 'Decide on CA / CMA / ACCA early',
        titleTa: 'CA / CMA / ACCA பற்றி முன்கூட்டியே முடிவெடுக்கவும்',
        detail: 'These run in parallel with B.Com. Start the foundation paper in Year 1 if you\'re serious — it makes years 4–5 dramatically smoother.',
        priority: 'medium',
      },
    ],
    buildNowSkills: [
      {
        skill: 'Advanced Excel',
        why: 'The #1 skill TN commerce graduates lack — and the #1 skill that lifts your starting salary.',
        freeResource: 'Microsoft Excel free YouTube courses (Leila Gharani, ExcelIsFun)',
      },
      {
        skill: 'Tally Prime',
        why: 'Standard accounting software across small and mid-size TN businesses. Knowing it makes you instantly hireable for entry roles.',
        freeResource: 'Tally Education free courses, YouTube',
      },
      {
        skill: 'Spoken English & business writing',
        why: 'A B.Com candidate who can write a clear email and present confidently stands out immediately.',
        freeResource: 'BBC Learning English, free MOOCs',
      },
    ],
    lastReviewed: '2026-05',
  },

  // ─── BBA (BACHELOR OF BUSINESS ADMINISTRATION) ─────────────────────────────
  {
    id: 'bba-graduate',
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
    strongGroupCodes: ['301', '320'],
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
    strongGroupCodes: ['301', '320'],
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
    strongGroupCodes: ['902', '901'],
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
    strongGroupCodes: ['902', '901'],
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

  // ─── B.SC. ALLIED HEALTH SCIENCES ──────────────────────────────────────────
  {
    id: 'allied-health-professional',
    needsCounsellorReview: true,
    aversionConflicts: ['shift_work', 'lab_practical'],
    automation: 'ai_augmented',
    automationNote: 'Diagnostic imaging is being assisted by AI in scan interpretation, but the technologist who performs the scan, positions the patient and ensures quality is irreplaceable. Allied health roles work alongside AI tools, not against them.',
    title: 'Allied Health Sciences Professional',
    titleTa: 'மருத்துவத் துணைத் தொழில் நிபுணர்',
    icon: '🩺',
    color: 'from-blue-500 to-cyan-600',
    whatIsIt:
      'An umbrella for the technical clinical roles that make hospitals run: medical lab technology (MLT), radiology and imaging, cardiac care technology, anaesthesia technology, respiratory therapy, dialysis technology. 3–4 year B.Sc. degrees, hospital-based work.',
    eligibleStreams: ['pcb', 'pcmb'],
    strongGroupCodes: ['902', '901'],
    ugCourses: [
      'B.Sc Medical Lab Technology (MLT)',
      'B.Sc Radiology / Medical Imaging',
      'B.Sc Cardiac Care Technology',
      'B.Sc Anaesthesia Technology',
      'B.Sc Respiratory Therapy',
      'B.Sc Dialysis Technology',
    ],
    entranceExams: ['NEET-UG', 'None (direct admission)'],
    pathwayType: 'direct-after-12th',
    timeToCareer:
      'A 3-4 year degree depending on specialisation (most are 3 + 1 year internship). Practising technologist roles open at graduation. Specialisation via M.Sc. opens senior or academic roles.',
    skillWeights: {
      mathematics: 4,
      language: 5,
      science: 8,
      creativity: 4,
      people: 6,
      physical: 5,
      digital: 6,
    },
    priorityFit: {
      salary: 5,
      security: 8,
      balance: 5,
      abroad: 7,
      prestige: 5,
      passion: 6,
      growth: 6,
      hometown: 8,
    },
    competitiveBoardPct: { comfortable: 70, stretch: 60 },
    salaryReality: {
      startingLPA: 'AI estimate — ₹2–4 LPA fresh in TN hospitals; ₹3–5 LPA at top corporate hospitals (Apollo, Fortis, MIOT).',
      midCareerLPA: 'AI estimate — ₹5–12 LPA with 7+ years and specialisation. Abroad (Gulf, UK, Singapore) typically multiplies these significantly.',
      note: 'Allied health salaries in India are modest but steady — hospitals always need technologists. The earnings ceiling is lower than nursing or doctor paths in India; abroad mobility is the main upside.',
    },
    demand: {
      score: 7,
      note: 'AI estimate — every diagnostic and clinical procedure needs a trained technologist. Cardiac and radiology technologists are particularly in demand as those specialties expand.',
    },
    entryDifficulty: {
      score: 3,
      note: 'AI estimate — most allied health programs are direct-admission via 12th marks; some take NEET. Far easier entry than MBBS / BDS / Nursing.',
    },
    collegeTiers: [
      {
        label: 'Top medical college affiliates (AI estimate)',
        examples: ['Sri Ramachandra', 'Madras Medical Mission', 'Apollo Allied Health', 'PSG Coimbatore'],
        cutoffGuide: 'AI estimate — 75%+ in 12th typical; some programs require NEET.',
        feeRange: 'AI estimate — ₹50K–2L / year',
      },
      {
        label: 'Government / aided medical colleges (AI estimate)',
        examples: ['Madras Medical College allied health depts', 'Government MLT programs'],
        cutoffGuide: 'AI estimate — 70%+ typical for direct admission.',
        feeRange: 'AI estimate — ₹15K–60K / year',
      },
      {
        label: 'Private specialised colleges (AI estimate)',
        examples: ['Many private colleges across TN offering allied health'],
        cutoffGuide: 'AI estimate — widely accessible; often 60%+ minimum.',
        feeRange: 'AI estimate — ₹50K–1.5L / year',
      },
    ],
    costReality:
      'AI estimate — a 3-4 year allied health B.Sc. in TN costs roughly ₹50K–8L total depending on specialisation and college. Government colleges are dramatically more affordable.',
    backupOptions: [
      'M.Sc. in your specialisation — academic and senior clinical roles',
      'Move abroad (Gulf, UK, Singapore, Australia) — typically with bridge exams',
      'Hospital administration roles after 5+ years of clinical experience',
      'Cross-train into nursing or pharmacy if scope feels limited',
      'Medical equipment company technical/sales roles',
    ],
    honestCaveat:
      'Allied health is a deeply useful career — every hospital needs these technologists — but the salary ceiling in India is real. Career progression often requires either specialisation (M.Sc.) or moving abroad. Shift work is common in hospital settings. The route is also less culturally celebrated than MBBS/Nursing in TN families; be ready to explain the choice clearly.',
    roadmap: [
      {
        title: 'Score 70%+ in 12th PCB',
        titleTa: '+12 PCB-இல் 70%+',
        detail: 'Most allied health programs admit on 12th merit. Some specific specialisations (Radiology, Cardiac Care) may need NEET.',
        window: 'Now',
        phase: 'now',
      },
      {
        title: 'Join your specialisation (3 years + 1-year internship)',
        titleTa: 'சிறப்புத்துறை சேருங்கள்',
        detail: 'MLT, Radiology, Cardiac Care, Anaesthesia, Respiratory or Dialysis — each is a distinct career. Choose based on what excites you, not just availability.',
        window: 'Years 1–4',
        phase: 'next',
      },
      {
        title: 'Specialise (M.Sc.), or move abroad, or hospital admin',
        titleTa: 'M.Sc. / வெளிநாடு / நிர்வாகம்',
        detail: 'M.Sc. for senior clinical or academic roles. Abroad bridge exams (UK HCPC, Gulf licensing) multiply salaries. Hospital administration is the longer-term India path.',
        window: 'Years 4–7',
        phase: 'later',
      },
    ],
    ninetyDayPlan: [
      {
        title: 'Pick the right specialisation early',
        titleTa: 'சரியான சிறப்புத்துறை',
        detail: 'MLT (lab-based), Radiology (imaging), Cardiac Care (procedures), Anaesthesia Tech (OT), Respiratory Therapy (ICU), Dialysis (clinics) — these are different careers, not just different names.',
        priority: 'high',
      },
      {
        title: 'Visit / shadow at a hospital department',
        titleTa: 'மருத்துவமனை துறை பார்வை',
        detail: 'Even half a day spent watching a lab tech or radiology tech work tells you whether the day-to-day suits you. Worth the effort.',
        priority: 'high',
      },
      {
        title: 'Confirm NEET vs direct-admission for your chosen program',
        titleTa: 'NEET அல்லது நேரடி சேர்க்கை',
        detail: 'Some allied health specialisations (especially Radiology and Cardiac Care in top colleges) require NEET. Confirm for your shortlist.',
        priority: 'medium',
      },
    ],
    buildNowSkills: [
      {
        skill: 'Strong Biology + Chemistry fundamentals',
        why: 'Every allied health specialisation builds on these. Strong 12th fundamentals make every semester smoother.',
        freeResource: 'NCERT Biology + Chemistry, Khan Academy',
      },
      {
        skill: 'Patience and steady hands',
        why: 'Diagnostic and procedure technology rewards careful, methodical work over fast work. Practise being unhurried with detailed tasks.',
        freeResource: 'Any hobby that requires precision — drawing, electronics, embroidery, model-building',
      },
      {
        skill: 'Spoken English + Tamil patient communication',
        why: 'Allied health roles interact with patients constantly — anxious, often elderly, sometimes language-mixed. Confident bilingual communication is a real advantage.',
        freeResource: 'BBC Learning English, local Toastmasters clubs',
      },
    ],
    lastReviewed: '2026-05',
  },

  // ─── B.TECH BIOTECHNOLOGY ──────────────────────────────────────────────────
  {
    id: 'biotechnologist',
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
    strongGroupCodes: ['902', '101', '102'],
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
