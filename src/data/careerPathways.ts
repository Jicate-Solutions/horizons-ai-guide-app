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

  // ─── ACTION ────────────────────────────────────────────────────────────────
  roadmap: RoadmapStage[];
  ninetyDayPlan: NinetyDayAction[];
  /** Skills to actively build now, most-important first */
  buildNowSkills: { skill: string; why: string; freeResource: string }[];

  /** Freshness marker */
  lastReviewed: string;
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
];

// ─────────────────────────────────────────────────────────────────────────────
// Lookup helpers
// ─────────────────────────────────────────────────────────────────────────────

export const getPathwayById = (id: string): CareerPathway | undefined =>
  CAREER_PATHWAYS.find((p) => p.id === id);

/** Careers reachable from a given stream — the eligibility gate. */
export const getPathwaysForStream = (stream: Stream): CareerPathway[] =>
  CAREER_PATHWAYS.filter((p) => p.eligibleStreams.includes(stream));
