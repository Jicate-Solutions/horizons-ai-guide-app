/**
 * SPORTS QUOTA DATA — TNEA 2026
 *
 * SOURCE: Official TNEA 2026 Sports Quota notification (DoTE Tamil Nadu).
 * This data is compiled from public sources. Always verify with the college
 * before applying. Use the "Report incorrect info" button to flag any error.
 *
 * Last updated: May 2026
 */

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type SportLevel = 'school' | 'district' | 'state' | 'national' | 'international';

export type Gender = 'male' | 'female' | 'other';

export type Sport =
  | 'athletics' | 'basketball' | 'badminton' | 'ball-badminton'
  | 'boxing' | 'chess' | 'cricket' | 'football' | 'gymnastics'
  | 'handball' | 'hockey' | 'kabaddi' | 'kho-kho' | 'martial-arts'
  | 'karate' | 'taekwondo' | 'yoga' | 'powerlifting'
  | 'swimming' | 'table-tennis' | 'tennis' | 'volleyball'
  | 'weightlifting' | 'wrestling' | 'archery' | 'shooting' | 'other';

export type VerificationStatus = 'verified' | 'unverified' | 'tnea-default';

export interface SportInfoBilingual {
  id: Sport;
  en: string;
  ta: string;
}

export const ALL_SPORTS: SportInfoBilingual[] = [
  { id: 'athletics',      en: 'Athletics',       ta: 'அத்லெடிக்ஸ்' },
  { id: 'badminton',      en: 'Badminton',       ta: 'பேட்மிண்டன்' },
  { id: 'ball-badminton', en: 'Ball Badminton',  ta: 'பால் பேட்மிண்டன்' },
  { id: 'basketball',     en: 'Basketball',      ta: 'கூடைப்பந்து' },
  { id: 'boxing',         en: 'Boxing',          ta: 'குத்துச்சண்டை' },
  { id: 'chess',          en: 'Chess',           ta: 'சதுரங்கம்' },
  { id: 'cricket',        en: 'Cricket',         ta: 'கிரிக்கெட்' },
  { id: 'football',       en: 'Football',        ta: 'கால்பந்து' },
  { id: 'gymnastics',     en: 'Gymnastics',      ta: 'உடற்பயிற்சி' },
  { id: 'handball',       en: 'Handball',        ta: 'கைப்பந்து' },
  { id: 'hockey',         en: 'Hockey',          ta: 'ஹாக்கி' },
  { id: 'kabaddi',        en: 'Kabaddi',         ta: 'கபடி' },
  { id: 'kho-kho',        en: 'Kho-Kho',         ta: 'கோ-கோ' },
  { id: 'martial-arts',   en: 'Martial Arts',    ta: 'தற்காப்புக் கலை' },
  { id: 'karate',         en: 'Karate',          ta: 'கராத்தே' },
  { id: 'taekwondo',      en: 'Taekwondo',       ta: 'டேக்வாண்டோ' },
  { id: 'yoga',           en: 'Yoga',            ta: 'யோகா' },
  { id: 'powerlifting',   en: 'Powerlifting',    ta: 'பவர்லிஃப்டிங்' },
  { id: 'swimming',       en: 'Swimming',        ta: 'நீச்சல்' },
  { id: 'table-tennis',   en: 'Table Tennis',    ta: 'மேசைப் பந்தாட்டம்' },
  { id: 'tennis',         en: 'Tennis',          ta: 'டென்னிஸ்' },
  { id: 'volleyball',     en: 'Volleyball',      ta: 'கைப்பந்தாட்டம்' },
  { id: 'weightlifting',  en: 'Weightlifting',   ta: 'பளுதூக்குதல்' },
  { id: 'wrestling',      en: 'Wrestling',       ta: 'மல்யுத்தம்' },
  { id: 'archery',        en: 'Archery',         ta: 'வில்வித்தை' },
  { id: 'shooting',       en: 'Shooting',        ta: 'துப்பாக்கி சுடுதல்' },
  { id: 'other',          en: 'Other sport',     ta: 'வேறு விளையாட்டு' },
];

export const SPORT_LEVELS: { id: SportLevel; en: string; ta: string; helpEn: string; helpTa: string }[] = [
  { id: 'school',        en: 'School level',        ta: 'பள்ளி அளவு',     helpEn: 'Played for your school team in inter-school matches', helpTa: 'உங்கள் பள்ளி அணிக்காக போட்டியில் விளையாடினீர்கள்' },
  { id: 'district',      en: 'District level',      ta: 'மாவட்ட அளவு',    helpEn: 'Represented your district. Certificate signed by District Sports Officer', helpTa: 'உங்கள் மாவட்டத்திற்காக விளையாடினீர்கள். மாவட்ட விளையாட்டு அலுவலர் கையெழுத்திட்ட சான்றிதழ்' },
  { id: 'state',         en: 'State level',         ta: 'மாநில அளவு',     helpEn: 'Represented Tamil Nadu in state-level tournament', helpTa: 'மாநில அளவிலான போட்டியில் தமிழ்நாட்டிற்காக விளையாடினீர்கள்' },
  { id: 'national',      en: 'National level',      ta: 'தேசிய அளவு',     helpEn: 'Represented Tamil Nadu in a national tournament (e.g. National Games, SGFI, AIU)', helpTa: 'தேசிய அளவிலான போட்டியில் (உதா: National Games, SGFI, AIU) விளையாடினீர்கள்' },
  { id: 'international', en: 'International level', ta: 'சர்வதேச அளவு',   helpEn: 'Represented India in an international event', helpTa: 'சர்வதேச நிகழ்வில் இந்தியாவைப் பிரதிநிதித்துவப்படுத்தினீர்கள்' },
];

// ─────────────────────────────────────────────────────────────────────────────
// TNEA MASTER RULES (apply to ALL Tamil Nadu engineering colleges)
// Source: DoTE TNEA 2026 Sports Quota Notification
// ─────────────────────────────────────────────────────────────────────────────

export const TNEA_RULES = {
  source: 'TNEA 2026 Official Notification, DoTE Tamil Nadu',
  sourceUrl: 'https://tneaonline.org/',
  year: 2026,

  reservationPercent: 2, // up from 1% in 2025
  approximateSeats: 4801,
  totalColleges: 433,

  // Class 12 stream
  requiredSubjects: ['Physics', 'Chemistry', 'Mathematics'],

  // Minimum marks
  minMarks: {
    general: 45,
    reserved: 40,
    reservedCategories: ['SC', 'ST', 'MBC', 'DNC', 'SCA'],
  },

  // Minimum sports level
  minSportsLevel: 'state' as SportLevel,
  acceptedLevels: ['state', 'national', 'international'] as SportLevel[],

  // Sports accepted by TNEA (universal list)
  acceptedSports: [
    'athletics', 'basketball', 'badminton', 'boxing', 'chess', 'cricket',
    'football', 'gymnastics', 'kabaddi', 'martial-arts', 'swimming',
    'table-tennis', 'tennis', 'volleyball', 'hockey', 'kho-kho',
    'handball', 'ball-badminton', 'weightlifting', 'wrestling',
    'archery', 'shooting',
  ] as Sport[],

  // Universal documents
  documents: [
    {
      id: 'sports-cert',
      titleEn: 'Sports achievement certificates',
      titleTa: 'விளையாட்டு சாதனை சான்றிதழ்கள்',
      detailEn: 'Original certificates of all sports achievements at State / National / International level. Signed by the recognised authority (District Sports Officer for state certificates).',
      detailTa: 'மாநில / தேசிய / சர்வதேச அளவிலான அனைத்து விளையாட்டு சாதனை சான்றிதழ்களின் அசல் நகல்கள். மாவட்ட விளையாட்டு அலுவலர் (அல்லது அதற்கு மேற்பட்ட அதிகாரி) கையெழுத்திட்டிருக்க வேண்டும்.',
      critical: true,
    },
    {
      id: '12th-marks',
      titleEn: '12th Standard mark sheet',
      titleTa: '12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்',
      detailEn: 'Must have Physics + Chemistry + Mathematics. Minimum 45% (General) or 40% (SC/ST/MBC/DNC/SCA).',
      detailTa: 'இயற்பியல் + வேதியியல் + கணிதம் இருக்க வேண்டும். குறைந்தபட்சம் 45% (பொது) அல்லது 40% (SC/ST/MBC/DNC/SCA).',
      critical: true,
    },
    {
      id: 'nativity',
      titleEn: 'Nativity certificate (if applicable)',
      titleTa: 'பூர்வீகச் சான்றிதழ் (தேவைப்பட்டால்)',
      detailEn: 'Required if you did not study Classes 8–12 in Tamil Nadu. Issued by the Tahsildar.',
      detailTa: '8 முதல் 12 வரை தமிழ்நாட்டில் படிக்கவில்லை என்றால் தேவை. வட்டாட்சியர் (Tahsildar) வழங்கும்.',
      critical: false,
    },
    {
      id: 'community',
      titleEn: 'Community certificate (if SC/ST/BC/MBC etc.)',
      titleTa: 'சாதிச் சான்றிதழ் (SC/ST/BC/MBC முதலியன என்றால்)',
      detailEn: 'For applying under reduced 40% marks cut-off and reserved seats.',
      detailTa: '40% குறைக்கப்பட்ட மதிப்பெண் வரம்பு மற்றும் இடஒதுக்கீட்டு இருக்கைக்கு விண்ணப்பிக்க.',
      critical: false,
    },
    {
      id: 'transfer-cert',
      titleEn: 'Transfer certificate from school',
      titleTa: 'பள்ளி மாற்றுச் சான்றிதழ் (TC)',
      detailEn: 'Original TC from your 12th standard school.',
      detailTa: '12-ஆம் வகுப்பு படித்த பள்ளியிலிருந்து அசல் TC.',
      critical: true,
    },
    {
      id: 'aadhaar',
      titleEn: 'Aadhaar card',
      titleTa: 'ஆதார் அட்டை',
      detailEn: 'Original + photocopy.',
      detailTa: 'அசல் + நகல்.',
      critical: true,
    },
    {
      id: 'photo',
      titleEn: 'Passport size photos',
      titleTa: 'பாஸ்போர்ட் அளவு புகைப்படங்கள்',
      detailEn: 'Recent (last 6 months), white background, 4-6 copies. Some colleges require <50kb JPG for online upload.',
      detailTa: 'சமீபத்திய (கடந்த 6 மாதம்), வெள்ளை பின்னணி, 4-6 நகல்கள். சில கல்லூரிகள் ஆன்லைனில் <50kb JPG கேட்கின்றன.',
      critical: true,
    },
  ],

  // Common rejection reasons
  rejectionReasons: [
    {
      en: 'PT teacher\'s signature instead of District Sports Officer',
      ta: 'மாவட்ட விளையாட்டு அலுவலருக்குப் பதிலாக PT ஆசிரியர் கையெழுத்து',
    },
    {
      en: 'Certificate older than the eligibility window (most colleges: last 4 years)',
      ta: 'தகுதி காலத்திற்கு (பெரும்பாலும் கடந்த 4 ஆண்டுகள்) முந்தைய சான்றிதழ்',
    },
    {
      en: 'No SDAT (Sports Development Authority of Tamil Nadu) seal/counter-signature',
      ta: 'SDAT (Sports Development Authority of Tamil Nadu) முத்திரை/கூட்டு-கையெழுத்து இல்லை',
    },
    {
      en: 'School/district-level certificate when state-level minimum is required',
      ta: 'மாநில அளவு குறைந்தபட்சம் தேவையானபோது பள்ளி/மாவட்ட அளவு சான்றிதழ்',
    },
    {
      en: '12th marks below 45% (General) or 40% (Reserved)',
      ta: '12-ஆம் வகுப்பு மதிப்பெண் 45%-க்கு (பொது) அல்லது 40%-க்கு (இடஒதுக்கீடு) குறைவு',
    },
  ],

  // Key dates 2026 — verified May 12, 2026 from tneaonline.org and
  // multiple secondary sources reporting the official DoTE notification
  dates: {
    registrationOpened: 'May 3, 2026',
    registrationDeadline: 'June 2, 2026',          // URGENT — last date to apply
    randomNumberRelease: 'June 5, 2026',
    tfcVerificationWindow: 'June 8 – 20, 2026',
    rankListRelease: 'June 29, 2026',
    grievanceRedressal: 'June 29 – July 4, 2026',
    choiceFillingMonth: '4th week of July 2026',
    counsellingMonth: 'July 2026',
    note: 'Sports quota counselling is held IN PERSON and BEFORE general counselling.',
  },

  // Official TNEA contact for students with questions
  helpline: {
    phone: '1800-425-0110',                         // toll-free
    timing: '8:00 AM – 6:00 PM',
    website: 'https://tneaonline.org/',
  },

  // Counselling registration fees (one-time, online payment)
  counsellingFees: {
    general: '₹500',
    reserved: '₹250',                               // SC / SCA / ST from Tamil Nadu only
    sportsQuota: '₹100',                            // Special categories incl. Sports
    note: 'Pay via debit/credit card, UPI, net banking, or demand draft on tneaonline.org. Sports-quota applicants pay the lower ₹100 special-category rate.',
  },

  // Document upload specifications (sports-quota applicants)
  documentSpecs: {
    formats: ['PDF', 'JPEG'],
    maxFileSizeMB: 2,
    note: 'All documents must be clear, legible and unaltered. Sports certificates must be signed by the concerned sports authority and show the level of competition (State / National / International).',
  },

  // After seat allotment, candidates have 4 options
  allotmentOptions: [
    { id: 'accept-join',     en: 'Accept and Join',          ta: 'ஏற்று சேர்' },
    { id: 'accept-upward',   en: 'Accept and Upward',        ta: 'ஏற்று மேலே செல்' },
    { id: 'reject-next',     en: 'Reject and Go to Next Round', ta: 'நிராகரித்து அடுத்த சுற்றுக்கு செல்' },
    { id: 'reject-withdraw', en: 'Reject and Withdraw',      ta: 'நிராகரித்து விலகு' },
  ],

  // The 10 top engineering colleges most actively used for TNEA sports quota,
  // per the DoTE 2026 notification. Useful for "where can I realistically aim?"
  // queries from students with strong sports profiles.
  topSportsQuotaColleges: [
    { name: 'College of Engineering, Guindy (CEG)',  district: 'Chennai',     ownership: 'Govt' },
    { name: 'Madras Institute of Technology (MIT)',  district: 'Chennai',     ownership: 'Govt' },
    { name: 'PSG College of Technology',             district: 'Coimbatore',  ownership: 'Private' },
    { name: 'Kumaraguru College of Technology',      district: 'Coimbatore',  ownership: 'Private' },
    { name: 'SSN College of Engineering',            district: 'Chengalpattu', ownership: 'Private' },
    { name: 'Coimbatore Institute of Technology',    district: 'Coimbatore',  ownership: 'Govt-Aided' },
    { name: 'Thiagarajar College of Engineering',    district: 'Madurai',     ownership: 'Private' },
    { name: 'Kongu Engineering College',             district: 'Erode',       ownership: 'Private' },
    { name: 'Velammal Engineering College',          district: 'Chennai',     ownership: 'Private' },
    { name: "St. Joseph's College of Engineering",   district: 'Chennai',     ownership: 'Private' },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// TNEA SPORTS MARKS SCORING TABLE
// Used by the marks-calculator feature. Source: DoTE TNEA 2026 official
// "Structured Marks Allocation for Sports Achievements" table.
// ─────────────────────────────────────────────────────────────────────────────

export type MedalType = 'gold' | 'silver' | 'bronze' | 'participation';

export interface MarksRow {
  id: string;
  competitionEn: string;
  competitionTa: string;
  category: 'international' | 'national' | 'state' | 'regional' | 'district';
  frequencyEn?: string;
  gold: number | null;
  silver: number | null;
  bronze: number | null;
  participation: number | null;
}

export const TNEA_MARKS_TABLE: MarksRow[] = [
  // ── International ──
  {
    id: 'intl-olympics',
    competitionEn: 'Olympics / Asian Games (representing India)',
    competitionTa: 'ஒலிம்பிக்ஸ் / ஆசிய விளையாட்டுப் போட்டிகள் (இந்தியாவைப் பிரதிநிதித்துவம்)',
    category: 'international',
    frequencyEn: 'Once in 4 years',
    gold: 1000, silver: 850, bronze: 650, participation: 400,
  },
  {
    id: 'intl-2yr',
    competitionEn: 'International (Category II — every 2 years, representing India)',
    competitionTa: 'சர்வதேச (வகை II — 2 ஆண்டுகளுக்கு ஒருமுறை, இந்தியாவைப் பிரதிநிதித்துவம்)',
    category: 'international',
    frequencyEn: 'Once in 2 years',
    gold: 500, silver: 450, bronze: 400, participation: 150,
  },
  {
    id: 'intl-annual',
    competitionEn: 'International (Category III — annual, representing India)',
    competitionTa: 'சர்வதேச (வகை III — ஆண்டுதோறும், இந்தியாவைப் பிரதிநிதித்துவம்)',
    category: 'international',
    frequencyEn: 'Every year',
    gold: 400, silver: 350, bronze: 300, participation: 200,
  },

  // ── National ──
  {
    id: 'nat-federation',
    competitionEn: 'National Championships / National Games (National Federations / IOA)',
    competitionTa: 'தேசிய சாம்பியன்ஷிப் / தேசிய விளையாட்டுகள் (தேசிய கூட்டமைப்புகள் / IOA)',
    category: 'national',
    gold: 190, silver: 160, bronze: 130, participation: 100,
  },
  {
    id: 'nat-sgfi',
    competitionEn: 'SGFI National Level Competition',
    competitionTa: 'SGFI தேசிய அளவிலான போட்டி',
    category: 'national',
    gold: 190, silver: 160, bronze: 130, participation: 100,
  },
  {
    id: 'nat-khelo-india',
    competitionEn: 'Khelo India Youth Games (National Level)',
    competitionTa: 'Khelo India இளைஞர் விளையாட்டுகள் (தேசிய அளவு)',
    category: 'national',
    gold: 190, silver: 160, bronze: 130, participation: 100,
  },

  // ── State ──
  {
    id: 'state-association',
    competitionEn: 'State Championship (representing revenue district, State Sports Associations)',
    competitionTa: 'மாநில சாம்பியன்ஷிப் (வருவாய் மாவட்டப் பிரதிநிதி, மாநில விளையாட்டுச் சங்கங்கள்)',
    category: 'state',
    gold: 95, silver: 80, bronze: 65, participation: 50,
  },
  {
    id: 'state-bharathiyar',
    competitionEn: 'Bharathiyar Day Sports Meet (State Level)',
    competitionTa: 'பாரதியார் தின விளையாட்டுக் கூட்டம் (மாநில அளவு)',
    category: 'state',
    gold: 95, silver: 80, bronze: 65, participation: 50,
  },
  {
    id: 'state-republic',
    competitionEn: 'Republic Day Sports Meet (State Level)',
    competitionTa: 'குடியரசு தின விளையாட்டுக் கூட்டம் (மாநில அளவு)',
    category: 'state',
    gold: 95, silver: 80, bronze: 65, participation: 50,
  },

  // ── Regional ──
  {
    id: 'regional-board',
    competitionEn: 'KVS / CBSE / CISCE (ICSE) Board Sports Meet (Regional Level)',
    competitionTa: 'KVS / CBSE / CISCE (ICSE) வாரிய விளையாட்டுக் கூட்டம் (வட்டார அளவு)',
    category: 'regional',
    gold: 60, silver: 45, bronze: 30, participation: 10,
  },

  // ── District ──
  {
    id: 'district-association',
    competitionEn: 'District Tournaments / Sports Meet (District Sports Associations, SDAT/TNOA recognised)',
    competitionTa: 'மாவட்ட போட்டிகள் / விளையாட்டுக் கூட்டம் (SDAT / TNOA அங்கீகாரம் பெற்ற மாவட்ட விளையாட்டுச் சங்கங்கள்)',
    category: 'district',
    gold: 45, silver: 30, bronze: 15, participation: 5,
  },
  {
    id: 'district-school',
    competitionEn: 'District / Education District Inter-School Competition',
    competitionTa: 'மாவட்ட / கல்வி மாவட்ட பள்ளிகளுக்கிடையேயான போட்டி',
    category: 'district',
    gold: 45, silver: 30, bronze: 15, participation: 5,
  },
  {
    id: 'district-cm-trophy',
    competitionEn: 'SDAT — District Level Chief Minister\'s Trophy',
    competitionTa: 'SDAT — மாவட்ட அளவிலான முதலமைச்சர் கோப்பை',
    category: 'district',
    gold: 45, silver: 30, bronze: 15, participation: 5,
  },
];

/**
 * Calculate a candidate's TNEA sports score given a list of achievements.
 */
export interface SportAchievement {
  marksRowId: string;     // id from TNEA_MARKS_TABLE
  medal: MedalType;
}

export const calculateTNEASportsScore = (
  achievements: SportAchievement[]
): { totalMarks: number; breakdown: { row: MarksRow; medal: MedalType; marks: number }[] } => {
  let totalMarks = 0;
  const breakdown: { row: MarksRow; medal: MedalType; marks: number }[] = [];

  for (const ach of achievements) {
    const row = TNEA_MARKS_TABLE.find(r => r.id === ach.marksRowId);
    if (!row) continue;
    const m = row[ach.medal];
    if (m == null) continue;
    totalMarks += m;
    breakdown.push({ row, medal: ach.medal, marks: m });
  }
  return { totalMarks, breakdown };
};

// ─────────────────────────────────────────────────────────────────────────────
// COLLEGE-SPECIFIC SPORTS QUOTA DATA
// Each college may have additional rules on top of TNEA's universal rules.
// ─────────────────────────────────────────────────────────────────────────────

export interface SportTrialDate {
  sport: Sport;
  date: string;       // ISO 'YYYY-MM-DD'
  time: string;       // 'HH:MM' or human-readable '9:00 AM'
  venue: string;
}

export interface CollegeSportsQuota {
  id: string;
  collegeName: string;
  collegeNameTa?: string;
  district: string;
  type: 'Govt' | 'Govt-Aided' | 'Private' | 'Deemed' | 'Autonomous';
  field: 'engineering' | 'medical' | 'arts' | 'law' | 'agriculture' | 'other';

  // Counselling body — null if college handles its own admission directly
  counsellingBody: 'TNEA' | 'NEET-UG' | 'DGE-TN' | 'Direct' | 'Other';

  // College-specific overrides (only if different from counsellingBody defaults)
  overrides?: {
    minLevel?: SportLevel;
    achievementsRequired?: number; // e.g. 5 for Kongu
    achievementWindowYears?: number; // e.g. last 4 years
    sportsForMen?: Sport[]; // if college restricts sports by gender
    sportsForWomen?: Sport[];
    extraDocuments?: { titleEn: string; titleTa: string; detailEn: string; detailTa: string }[];
    sportsScholarship?: string; // e.g. "50% fee waiver for nationals"
    freeEducation?: boolean;    // e.g. PSG CAS — true if 100% free for deserving players
    freeEducationNote?: string; // explanation
    selectionProcess?: string;
    // Trial dates (one per sport, for direct-admission colleges)
    trialsMen?: SportTrialDate[];
    trialsWomen?: SportTrialDate[];
    // Infrastructure highlights
    infrastructure?: { en: string; ta: string }[];
    // Recognition/scheme affiliations (e.g. Khelo India, SAI)
    schemes?: string[];
    // Application deadline for the college's own sports admission (direct admission colleges only)
    applicationDeadline?: string;
  };

  // Contact (multiple sports officers possible)
  contact: {
    sportsOfficer?: string;
    designation?: string;
    phone?: string;
    sportsOfficer2?: string;
    designation2?: string;
    phone2?: string;
    email?: string;
    website?: string;
    applicationLink?: string;
  };

  // Trust signals
  verification: VerificationStatus;
  sourceUrl?: string;
  sourceNote?: string;
  lastVerified?: string; // YYYY-MM-DD
}

export const COLLEGE_SPORTS_QUOTA: CollegeSportsQuota[] = [
  // ─── VERIFIED: Kongu Engineering College ─────────────────────────────────
  {
    id: 'kongu_erode',
    collegeName: 'Kongu Engineering College',
    collegeNameTa: 'கொங்கு பொறியியல் கல்லூரி',
    district: 'Erode',
    type: 'Autonomous',
    field: 'engineering',
    counsellingBody: 'TNEA',
    overrides: {
      minLevel: 'state',
      achievementsRequired: 5,
      achievementWindowYears: 4,
      sportsForMen: [
        'athletics', 'badminton', 'ball-badminton', 'basketball',
        'handball', 'hockey', 'kho-kho', 'table-tennis', 'tennis', 'volleyball',
      ],
      sportsForWomen: [
        'athletics', 'badminton', 'ball-badminton', 'basketball',
        'volleyball', 'kabaddi', 'table-tennis',
      ],
      extraDocuments: [
        {
          titleEn: 'Achievement certificates as JPG (max 100KB each)',
          titleTa: 'சாதனை சான்றிதழ்கள் JPG-ஆக (ஒவ்வொன்றும் அதிகபட்சம் 100KB)',
          detailEn: 'All 5 sports achievement certificates uploaded online. Each file under 100KB, JPG format only.',
          detailTa: 'அனைத்து 5 விளையாட்டு சாதனை சான்றிதழ்களும் ஆன்லைனில் பதிவேற்றம் செய்யப்பட வேண்டும். ஒவ்வொரு கோப்பும் 100KB-க்கு கீழ், JPG வடிவம் மட்டும்.',
        },
        {
          titleEn: 'Passport photo (JPG, max 50KB)',
          titleTa: 'பாஸ்போர்ட் புகைப்படம் (JPG, அதிகபட்சம் 50KB)',
          detailEn: 'For online registration. Use a phone app to compress your photo if needed.',
          detailTa: 'ஆன்லைன் பதிவுக்கு. தேவைப்பட்டால் புகைப்படத்தை சுருக்க தொலைபேசி பயன்பாட்டைப் பயன்படுத்தவும்.',
        },
      ],
      selectionProcess: 'Online registration → Shortlist based on achievements → Trials announced later',
    },
    contact: {
      sportsOfficer: 'Dr R. Jeyaraman',
      designation: 'DPE (Director of Physical Education)',
      phone: '9842411828',
      website: 'https://www.kongu.edu/',
    },
    verification: 'verified',
    sourceUrl: 'https://www.kongu.edu/',
    sourceNote: 'Direct from Kongu Engineering College official sports quota notification 2025-26',
    lastVerified: '2026-05-11',
  },

  // ─── VERIFIED: PSG College of Arts & Science (PSGCAS) ────────────────────
  {
    id: 'psgcas_coimbatore',
    collegeName: 'PSG College of Arts & Science',
    collegeNameTa: 'பி.எஸ்.ஜி கலை அறிவியல் கல்லூரி',
    district: 'Coimbatore',
    type: 'Autonomous',
    field: 'arts',
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district', // Lower bar than TNEA — arts colleges typically accept district level
      achievementWindowYears: 4,
      sportsForMen: [
        'athletics', 'badminton', 'ball-badminton', 'basketball', 'boxing',
        'chess', 'cricket', 'football', 'handball', 'hockey', 'kho-kho',
        'martial-arts', // covers Karate and Taekwondo
        'swimming', 'table-tennis', 'tennis', 'volleyball', 'weightlifting',
        // Yoga and Powerlifting included but not in our standard list — they map to 'other'
      ],
      sportsForWomen: [
        // From official PSGCAS Women's Sports Quota Selection Trials 2026-27 PDF:
        // Basketball, Chess, Boxing, Badminton, Swimming, Tennis, Table Tennis,
        // Yoga, Karate, Handball, Powerlifting, Kho-Kho, Taekwondo, Weightlifting.
        // Note: NO athletics, volleyball, cricket, football, hockey for women.
        'basketball', 'chess', 'boxing', 'badminton', 'swimming',
        'tennis', 'table-tennis',
        'martial-arts', // covers Karate AND Taekwondo
        'handball', 'kho-kho', 'weightlifting',
        // Yoga and Powerlifting are not in our standard sport list, so a woman
        // playing these can pick "Other sport" in the eligibility flow.
      ],
      extraDocuments: [
        {
          titleEn: 'Online application via PSGCAS Google Form',
          titleTa: 'PSGCAS Google Form மூலம் ஆன்லைன் விண்ணப்பம்',
          detailEn: 'Apply through the Google Form linked from www.psgcas.ac.in admissions page.',
          detailTa: 'www.psgcas.ac.in சேர்க்கை பக்கத்தில் இணைக்கப்பட்டுள்ள Google Form மூலம் விண்ணப்பிக்கவும்.',
        },
        {
          titleEn: 'Attend physical sports trial at PSG CAS campus',
          titleTa: 'PSG CAS வளாகத்தில் நேரடி விளையாட்டு தேர்வு கலந்து கொள்ளவும்',
          detailEn: 'Trials are sport-specific. Check the date and time for YOUR sport on the official notification. Bring all certificates in original.',
          detailTa: 'தேர்வுகள் விளையாட்டு வாரியாக நடைபெறும். உங்கள் விளையாட்டுக்கான தேதி மற்றும் நேரத்தை அதிகாரப்பூர்வ அறிவிப்பில் சரிபார்க்கவும். அனைத்து சான்றிதழ்களின் அசலையும் கொண்டு வாரவும்.',
        },
      ],
      sportsScholarship: 'FREE EDUCATION for deserving players. SAI – Khelo India Scheme (Basketball Men & Women). NIS-certified coaches, indoor stadium, players gym, medical insurance.',
      selectionProcess: 'Online application → Physical trials at PSG CAS campus (April 2026) → Selection',
      trialsMen: [
        { sport: 'swimming',      date: '2026-04-07', time: '9:00 AM',  venue: 'PSG CAS' },
        { sport: 'basketball',    date: '2026-04-08', time: '9:00 AM',  venue: 'PSG CAS' },
        { sport: 'ball-badminton', date: '2026-04-08', time: '3:00 PM',  venue: 'PSG CAS' },
        { sport: 'karate',        date: '2026-04-09', time: '10:00 AM', venue: 'PSG CAS' },
        { sport: 'yoga',          date: '2026-04-09', time: '9:00 AM',  venue: 'PSG CAS' },
        { sport: 'kho-kho',       date: '2026-04-09', time: '3:00 PM',  venue: 'PSG CAS' },
        { sport: 'powerlifting',  date: '2026-04-10', time: '9:00 AM',  venue: 'PSG CAS' },
        { sport: 'taekwondo',     date: '2026-04-11', time: '9:00 AM',  venue: 'PSG CAS' },
        { sport: 'weightlifting', date: '2026-04-11', time: '11:00 AM', venue: 'PSG CAS' },
        { sport: 'volleyball',    date: '2026-04-13', time: '8:00 AM',  venue: 'PSG CAS' },
        { sport: 'table-tennis',  date: '2026-04-13', time: '3:00 PM',  venue: 'PSG CAS' },
        { sport: 'badminton',     date: '2026-04-15', time: '9:00 AM',  venue: 'PSG CAS' },
        { sport: 'chess',         date: '2026-04-15', time: '9:00 AM',  venue: 'PSG CAS' },
        { sport: 'tennis',        date: '2026-04-15', time: '3:00 PM',  venue: 'PSG CAS' },
        { sport: 'cricket',       date: '2026-04-16', time: '9:00 AM',  venue: 'PSG Medical College' },
        { sport: 'athletics',     date: '2026-04-17', time: '9:00 AM',  venue: 'PSG Medical College' },
        { sport: 'boxing',        date: '2026-04-17', time: '3:00 PM',  venue: 'PSG CAS' },
        { sport: 'football',      date: '2026-04-20', time: '9:00 AM',  venue: 'PSG CAS' },
        { sport: 'hockey',        date: '2026-04-25', time: '9:00 AM',  venue: 'PSG CAS' },
        { sport: 'handball',      date: '2026-04-25', time: '3:00 PM',  venue: 'PSG CAS' },
      ],
      trialsWomen: [
        { sport: 'basketball',    date: '2026-04-06', time: '9:00 AM',  venue: 'PSG CAS' },
        { sport: 'chess',         date: '2026-04-06', time: '9:00 AM',  venue: 'PSG CAS' },
        { sport: 'boxing',        date: '2026-04-06', time: '3:00 PM',  venue: 'PSG CAS' },
        { sport: 'badminton',     date: '2026-04-07', time: '9:00 AM',  venue: 'PSG CAS' },
        { sport: 'swimming',      date: '2026-04-07', time: '9:00 AM',  venue: 'PSG CAS' },
        { sport: 'tennis',        date: '2026-04-07', time: '3:00 PM',  venue: 'PSG CAS' },
        { sport: 'table-tennis',  date: '2026-04-08', time: '3:00 PM',  venue: 'PSG CAS' },
        { sport: 'yoga',          date: '2026-04-09', time: '9:00 AM',  venue: 'PSG CAS' },
        { sport: 'karate',        date: '2026-04-09', time: '10:00 AM', venue: 'PSG CAS' },
        { sport: 'handball',      date: '2026-04-09', time: '3:00 PM',  venue: 'PSG CAS' },
        { sport: 'powerlifting',  date: '2026-04-10', time: '9:00 AM',  venue: 'PSG CAS' },
        { sport: 'kho-kho',       date: '2026-04-10', time: '3:00 PM',  venue: 'PSG CAS' },
        { sport: 'taekwondo',     date: '2026-04-11', time: '9:00 AM',  venue: 'PSG CAS' },
        { sport: 'weightlifting', date: '2026-04-11', time: '11:00 AM', venue: 'PSG CAS' },
      ],
    },
    contact: {
      sportsOfficer: 'Dr B. Navaneethan',
      designation: 'Director of Physical Education',
      phone: '9894188251',
      sportsOfficer2: 'Dr R. Soundararajan',
      designation2: 'Asst. Physical Director',
      phone2: '9865555599',
      email: 'hodphysicaleducation@psgcas.ac.in',
      website: 'https://www.psgcas.ac.in',
      applicationLink: 'https://www.psgcas.ac.in/admissions/',
    },
    verification: 'verified',
    sourceUrl: 'https://www.psgcas.ac.in/admissions/',
    sourceNote: 'Official PSGCAS Sports Quota Admission Selection Trials 2026-27 brochure (Men & Women)',
    lastVerified: '2026-05-11',
  },

  // ─── VERIFIED CONTACT, DEFAULTS APPLY: PSG College of Technology ─────────
  {
    id: 'psgtech_coimbatore',
    collegeName: 'PSG College of Technology',
    collegeNameTa: 'பி.எஸ்.ஜி தொழில்நுட்பக் கல்லூரி',
    district: 'Coimbatore',
    type: 'Autonomous',
    field: 'engineering',
    counsellingBody: 'TNEA',
    // No college-specific overrides — admissions are via TNEA, so TNEA rules apply:
    // - Min State level
    // - 45% / 40% marks
    // - All TNEA-listed sports
    // PSG Tech has a Department of Physical Education and conducts sport trials
    // (e.g. football trials are announced annually).
    overrides: {
      selectionProcess: 'TNEA online application → TNEA sports quota counselling (July 2026) → Sport-specific trial at PSG Tech campus',
    },
    contact: {
      designation: 'Department of Physical Education, PSG Tech',
      website: 'https://www.psgtech.edu/',
      // No direct phone listed publicly for the PE Department — students should
      // use the main college contact form on the website to reach the DPE.
    },
    verification: 'verified',
    sourceUrl: 'https://www.psgtech.edu/',
    sourceNote: 'PSG Tech B.E./B.Tech admissions are exclusively through TNEA. Sports quota seats are filled via TNEA sports quota counselling. The college has a Department of Physical Education that conducts trials for selected candidates.',
    lastVerified: '2026-05-11',
  },

  // ─── VERIFIED: SSN College of Engineering ────────────────────────────────
  // SSN has TWO admission paths for sports candidates:
  //   1. TNEA Sports Quota (2% state seats — applies to all TN engineering)
  //   2. SSN Management Sports Quota (25 seats/year, direct admission, NATIONAL+ only)
  // Plus a separate Sports Scholarship pool of up to ₹40 lakhs/year.
  // Source: ssn.edu.in/sports-annexes, ssn.edu.in/admissions/b-e-b-tech-admissions
  {
    id: 'ssn_chengalpattu',
    collegeName: 'SSN College of Engineering',
    collegeNameTa: 'SSN பொறியியல் கல்லூரி',
    district: 'Chengalpattu',
    type: 'Autonomous',
    field: 'engineering',
    counsellingBody: 'TNEA',
    overrides: {
      // TNEA quota seat accepts State level (universal TNEA rule).
      // SSN's separate management sports quota requires National OR International.
      // We surface the higher bar in the verdict reason for clarity.
      minLevel: 'state',
      // Sports accepted by SSN's management sports quota (from official site):
      // Athletics, Basketball, Tennis, Badminton, Cricket, Chess, Football,
      // Table Tennis, Squash. Same list for both men and women.
      sportsForMen: [
        'athletics', 'basketball', 'tennis', 'badminton', 'cricket',
        'chess', 'football', 'table-tennis',
        // Squash not in our standard sport list — a squash player would
        // pick "Other sport" and is still eligible per SSN's policy.
      ],
      sportsForWomen: [
        'athletics', 'basketball', 'tennis', 'badminton', 'cricket',
        'chess', 'football', 'table-tennis',
      ],
      sportsScholarship: 'Up to ₹40 lakhs/year scholarship pool for sports achievers. Plus 25 dedicated engineering seats per year under SSN Management Sports Quota for those who have represented India at National or International level. Apply via the admission form by selecting "Sports Quota".',
      schemes: [
        'SSN Management Sports Quota (25 seats/year, National/International level required)',
        'SSN Sports Scholarship (up to ₹40 lakh annual pool)',
      ],
      infrastructure: [
        { en: 'Cricket ground with turf wicket (has hosted Ranji Trophy)', ta: 'டர்ஃப் விக்கெட் கொண்ட கிரிக்கெட் மைதானம் (ரஞ்சி டிராஃபி நடத்தியது)' },
        { en: 'Indoor stadium (international standards) — basketball, badminton, table tennis, squash', ta: 'சர்வதேச தரத்திலான உட்புற விளையாட்டரங்கம் — கூடைப்பந்து, பேட்மிண்டன், மேசை பந்து, ஸ்குவாஷ்' },
        { en: 'Synthetic tennis courts', ta: 'செயற்கை டென்னிஸ் கோர்ட்' },
        { en: 'Football, volleyball and athletics grounds', ta: 'கால்பந்து, கைப்பந்து மற்றும் தடகள மைதானங்கள்' },
        { en: 'Separate AC gyms for boys and girls', ta: 'ஆண்களுக்கும் பெண்களுக்கும் தனித்தனி AC ஜிம்' },
        { en: 'Modern Fitness Centre', ta: 'நவீன உடற்பயிற்சி மையம்' },
      ],
      selectionProcess: 'Two paths: (1) TNEA sports quota — apply via TNEA. (2) SSN Management Sports Quota — fill SSN admission form online, select "Sports Quota" category, attend interview/trial. National or International achievement certificates required for path 2.',
    },
    contact: {
      designation: 'Department of Physical Education, SSN College of Engineering',
      phone: '+91-44-27469700',
      phone2: '+91-7358768700',
      website: 'https://www.ssn.edu.in/',
      applicationLink: 'https://www.ssn.edu.in/admissions/b-e-b-tech-admissions/',
      // SSN does not publish a direct phone for the DPE — the numbers above
      // are the main admissions lines (working hours 8 AM – 3:30 PM). When
      // calling, ask to be connected to the Director of Physical Education.
    },
    verification: 'verified',
    sourceUrl: 'https://www.ssn.edu.in/sports-annexes/',
    sourceNote: 'Sourced from SSN official website (Sports Annexes page + B.E./B.Tech admissions page). SSN offers BOTH TNEA sports quota AND its own 25-seat Management Sports Quota for National/International achievers, plus up to ₹40L annual scholarship pool. Sports list: Athletics, Basketball, Tennis, Badminton, Cricket, Chess, Football, Table Tennis, Squash.',
    lastVerified: '2026-05-12',
  },

  // ─── VERIFIED: SRM Institute of Science and Technology (SRMIST) ──────────
  // Source: Official SRMIST Scholarship Policy 2023 onwards + ssn.edu.in
  // confirmation. Sports quota via Founder's Scholarship (Category B —
  // Exemplary Sports Persons). NOT through TNEA — institutional admission
  // via SRMJEEE + a mandatory trial at the Directorate of Sports.
  {
    id: 'srmist_kattankulathur',
    collegeName: 'SRM Institute of Science and Technology (SRMIST)',
    collegeNameTa: 'SRM அறிவியல் மற்றும் தொழில்நுட்ப நிறுவனம்',
    district: 'Chengalpattu',
    type: 'Deemed',
    field: 'engineering',
    counsellingBody: 'Direct', // Deemed university — own admission via SRMJEEE
    overrides: {
      // SRMIST has the WIDEST acceptance bar of any verified college so far.
      // Per their policy doc: "Exemplary sports persons representing
      // University / District (Province) / Zone / State / National /
      // International" are all eligible. So District-level players who
      // wouldn't qualify for TNEA sports quota CAN still apply here.
      minLevel: 'district',
      sportsScholarship: 'Up to 100% Sports Scholarship under the Founder\'s Scholarship (Sub-Category B — Exemplary Sports Persons). Admissions open across Engineering, Management, Science & Humanities, Hotel Management, and Law. Renewable yearly subject to CGPA > 7 and continued representation of the University.',
      schemes: [
        'Up to 100% Sports Scholarship (Founder\'s Scholarship — Exemplary Sports Persons)',
        'Open to Engineering, Management, Science & Humanities, Hotel Management, Law',
        'University / District / Zone / State / National / International level all accepted',
      ],
      selectionProcess: 'Sports Quota Selection Trials 2026-27 — Apply via Google Form / official SRMIST website. Reporting time on trial day: 8:00 AM at the Directorate of Sports, SRMIST Kattankulathur Campus. Trial-specific dates are sport-wise (see schedule below). After the trial, candidates must also apply through SRMJEEE counselling — the trial recommendation feeds into the sports quota seat allocation.',
      // 2026-27 published trial schedule from official notification:
      //   12 Apr: Aquatics (Swimming & Diving), Basketball, Beach Volleyball
      //   13 Apr: Football, Kabaddi (M), Volleyball (W)
      //   14 Apr: Athletics, Boxing, Cricket (M), Fencing, Kabaddi (W)
      //   15 Apr: Hockey, Ball Badminton, Volleyball (M)
      //   16 Apr: Archery, Chess, Judo & Taekwondo, Tennis, Weightlifting
      //   17 Apr: Badminton, Cricket (W), Table Tennis
      // Beach Volleyball, Diving, Fencing, Judo not in our standard sport enum
      // — players pick "Other sport" in the eligibility flow (mapped to 'other').
      sportsForMen: [
        'swimming', 'basketball',
        'football', 'kabaddi',
        'athletics', 'boxing', 'cricket',
        'hockey', 'ball-badminton', 'volleyball',
        'archery', 'chess', 'taekwondo', 'tennis', 'weightlifting',
        'badminton', 'table-tennis',
        'martial-arts', // Judo (also Taekwondo)
        'other', // Diving, Beach Volleyball, Fencing
      ],
      sportsForWomen: [
        'swimming', 'basketball',
        'volleyball', 'football',
        'athletics', 'boxing', 'kabaddi',
        'hockey', 'ball-badminton',
        'archery', 'chess', 'taekwondo', 'tennis', 'weightlifting',
        'badminton', 'cricket', 'table-tennis',
        'martial-arts', // Judo
        'other', // Diving, Beach Volleyball, Fencing
      ],
      trialsMen: [
        // 12 April 2026
        { sport: 'swimming',       date: '2026-04-12', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'basketball',     date: '2026-04-12', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'other',          date: '2026-04-12', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' }, // Beach Volleyball + Diving
        // 13 April 2026
        { sport: 'football',       date: '2026-04-13', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'kabaddi',        date: '2026-04-13', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        // 14 April 2026
        { sport: 'athletics',      date: '2026-04-14', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'boxing',         date: '2026-04-14', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'cricket',        date: '2026-04-14', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        // 15 April 2026
        { sport: 'hockey',         date: '2026-04-15', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'ball-badminton', date: '2026-04-15', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'volleyball',     date: '2026-04-15', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        // 16 April 2026
        { sport: 'archery',        date: '2026-04-16', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'chess',          date: '2026-04-16', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'taekwondo',      date: '2026-04-16', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'martial-arts',   date: '2026-04-16', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' }, // Judo
        { sport: 'tennis',         date: '2026-04-16', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'weightlifting',  date: '2026-04-16', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        // 17 April 2026
        { sport: 'badminton',      date: '2026-04-17', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'table-tennis',   date: '2026-04-17', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
      ],
      trialsWomen: [
        // 12 April 2026
        { sport: 'swimming',       date: '2026-04-12', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'basketball',     date: '2026-04-12', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'other',          date: '2026-04-12', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' }, // Beach Volleyball + Diving
        // 13 April 2026
        { sport: 'volleyball',     date: '2026-04-13', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'football',       date: '2026-04-13', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        // 14 April 2026
        { sport: 'athletics',      date: '2026-04-14', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'boxing',         date: '2026-04-14', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'kabaddi',        date: '2026-04-14', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        // 15 April 2026
        { sport: 'hockey',         date: '2026-04-15', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'ball-badminton', date: '2026-04-15', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        // 16 April 2026
        { sport: 'archery',        date: '2026-04-16', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'chess',          date: '2026-04-16', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'taekwondo',      date: '2026-04-16', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'martial-arts',   date: '2026-04-16', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' }, // Judo
        { sport: 'tennis',         date: '2026-04-16', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'weightlifting',  date: '2026-04-16', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        // 17 April 2026
        { sport: 'badminton',      date: '2026-04-17', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'cricket',        date: '2026-04-17', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
        { sport: 'table-tennis',   date: '2026-04-17', time: '8:00 AM', venue: 'SRMIST Kattankulathur — Directorate of Sports' },
      ],
      applicationDeadline: '12 April 2026', // first trial date — overall window 12-17 April 2026
      extraDocuments: [
        {
          titleEn: 'Original sports certificates (University/District/Zone/State/National/International)',
          titleTa: 'அசல் விளையாட்டு சான்றிதழ்கள் (பல்கலைக்கழக/மாவட்ட/மண்டல/மாநில/தேசிய/சர்வதேச)',
          detailEn: 'SRMIST accepts certificates from any of these levels. First-attempt 12th pass in current admission year is required.',
          detailTa: 'SRMIST இந்த எந்த அளவிலான சான்றிதழையும் ஏற்கும். தற்போதைய சேர்க்கை ஆண்டில் முதல் முயற்சியில் 12-ஆம் வகுப்பு தேர்ச்சி தேவை.',
        },
        {
          titleEn: 'SRMJEEE application + counselling',
          titleTa: 'SRMJEEE விண்ணப்பம் + ஆலோசனை',
          detailEn: 'Sports quota candidates must still appear for SRMJEEE (or other entrance exam as applicable) and attend counselling. Trial recommendation alone is not enough.',
          detailTa: 'விளையாட்டு கோட்டா விண்ணப்பதாரர்கள் SRMJEEE (அல்லது பொருந்தும் வேறு நுழைவுத் தேர்வு) எழுதி ஆலோசனையில் கலந்து கொள்ள வேண்டும். தேர்வுப் பரிந்துரை மட்டும் போதாது.',
        },
        {
          titleEn: 'Online application form (Google Form / website)',
          titleTa: 'ஆன்லைன் விண்ணப்பப் படிவம் (Google Form / இணையதளம்)',
          detailEn: 'Submit the online sports trial application via Google Form (link from srmist.edu.in) before reporting on your sport-specific trial date.',
          detailTa: 'உங்கள் விளையாட்டுக்கான தேர்வு நாளில் வருவதற்கு முன், Google Form (srmist.edu.in இணைப்பு) மூலம் ஆன்லைன் விளையாட்டு தேர்வு விண்ணப்பத்தை சமர்ப்பிக்கவும்.',
        },
      ],
    },
    contact: {
      designation: 'Directorate of Sports, SRMIST Kattankulathur Campus',
      phone: '+91-80-69087000',
      phone2: '+91-44-27453902',
      email: 'directorateofsportssrm@gmail.com',
      website: 'https://www.srmist.edu.in/about-us/administrative-heads/director-sports/',
      applicationLink: 'https://www.srmist.edu.in/admissions/',
    },
    verification: 'verified',
    sourceUrl: 'https://www.srmist.edu.in/about-us/administrative-heads/director-sports/',
    sourceNote: 'Sources: (1) Official SRMIST Sports Quota Selection Trials 2026-27 notification (provided by team May 2026) — includes the full 12-17 April 2026 sport-wise trial schedule, 100% scholarship, 8:00 AM reporting time, helpline 080 69087000 / 044 27453902 and email directorateofsportssrm@gmail.com. (2) SRMIST Founder\'s Scholarship Policy (Sub-Category B — Exemplary Sports Persons). Admissions across Engineering, Management, Science & Humanities, Hotel Management, and Law. Inquiry: Directorate of Admissions, 2nd Floor, University Building, SRM Nagar, Kattankulathur.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: KCG College of Technology (Sports Quota 2026-27) ───────────
  // Source: Official KCG sports scholarship notification (provided by team).
  // Selection conducted OFFLINE at campus. Trained by international players.
  // 200+ students admitted via Sports Scholarship since inception.
  {
    id: 'kcg_chennai',
    collegeName: 'KCG College of Technology',
    collegeNameTa: 'KCG தொழில்நுட்பக் கல்லூரி',
    district: 'Chennai',
    type: 'Private',
    field: 'engineering',
    counsellingBody: 'Direct', // College runs its own Sports Scholarship admission
    overrides: {
      // Minimum: State / Inter-University / National per the official notice
      minLevel: 'state',
      sportsScholarship: 'KCG Sports Scholarship 2026-27. Selection is offline at the KCG campus, Karapakkam, Chennai. More than 200 students have entered via sports scholarship since inception. Trained by international players and experts in various fields within campus.',
      schemes: [
        'KCG Sports Scholarship (200+ admissions since inception)',
        'Trained by international players and experts within campus',
      ],
      selectionProcess: 'Online Sports Scholarship Application + sports and academic certificates → Selection trial conducted OFFLINE at KCG campus, Karapakkam, Chennai → Selection by Department of Physical Education',
      // 19 sports — same list applies to both men and women (per notification)
      sportsForMen: [
        'athletics', 'archery', 'basketball', 'badminton', 'boxing',
        'chess', 'cricket', 'football', 'gymnastics', 'kabaddi',
        // Horse Riding not in our standard list — student picks "other"
        'martial-arts', // covers Martial Arts category
        // Sailing not in our standard list — student picks "other"
        'swimming', 'table-tennis',
        // Throwball & Target Ball not in our standard list — student picks "other"
        'tennis', 'volleyball',
      ],
      sportsForWomen: [
        'athletics', 'archery', 'basketball', 'badminton', 'boxing',
        'chess', 'cricket', 'football', 'gymnastics', 'kabaddi',
        'martial-arts',
        'swimming', 'table-tennis', 'tennis', 'volleyball',
      ],
      extraDocuments: [
        {
          titleEn: 'KCG Online Sports Scholarship Application',
          titleTa: 'KCG ஆன்லைன் விளையாட்டு உதவித்தொகை விண்ணப்பம்',
          detailEn: 'Apply online by 1 June 2026 (deadline). Upload academic and sports certificates with the application.',
          detailTa: '1 ஜூன் 2026-க்குள் (கடைசி நாள்) ஆன்லைனில் விண்ணப்பிக்கவும். விண்ணப்பத்துடன் கல்வி மற்றும் விளையாட்டு சான்றிதழ்களை பதிவேற்றவும்.',
        },
        {
          titleEn: 'Attend offline trial at KCG Karapakkam campus',
          titleTa: 'KCG கரப்பாக்கம் வளாகத்தில் நேரடி தேர்வு',
          detailEn: 'Trial dates communicated after application review. Bring all certificates in original. Selection is in-person at the campus.',
          detailTa: 'விண்ணப்ப பரிசீலனைக்கு பிறகு தேர்வு தேதிகள் தெரிவிக்கப்படும். அனைத்து சான்றிதழ்களின் அசலையும் கொண்டு வரவும். தேர்வு வளாகத்தில் நேரடியாக நடக்கும்.',
        },
        {
          titleEn: '12th marks: minimum 45% in PCM',
          titleTa: '12-ஆம் வகுப்பு: PCM-ல் குறைந்தபட்சம் 45%',
          detailEn: 'Must score at least 45% combined in Physics, Chemistry and Mathematics. No separate reserved-category lower bar mentioned in the KCG notice — confirm with college if applicable.',
          detailTa: 'இயற்பியல், வேதியியல், கணிதம் (PCM) ஆகியவற்றில் சேர்த்து குறைந்தபட்சம் 45% பெற வேண்டும். KCG அறிவிப்பில் இடஒதுக்கீட்டுக்கான தனி குறைந்த வரம்பு குறிப்பிடப்படவில்லை — பொருந்தினால் கல்லூரியுடன் உறுதிப்படுத்தவும்.',
        },
      ],
      applicationDeadline: '1 June 2026',
    },
    contact: {
      sportsOfficer: 'Dr N. Premkumar',
      designation: 'Head, Department of Physical Education & Sports Sciences',
      phone: '+91-98407-62975',
      email: 'prem.sports@kcgcollege.com',
      website: 'https://www.kcgcollege.com/',
      // Postal address: KCG College of Technology, Karapakkam, Chennai 600 097
    },
    verification: 'verified',
    sourceUrl: 'https://www.kcgcollege.com/',
    sourceNote: 'Direct from KCG College of Technology official Sports Scholarship 2026-27 notification (provided by team May 2026). Last date for online registration: 1 June 2026. Selection offline at campus.',
    lastVerified: '2026-05-12',
  },

  // ─── VERIFIED: Nandha Polytechnic College ─────────────────────────────
  // Source: Official Sports Quota Selection Trials 2026-2027 notification
  // (provided by team May 2026). Trials were conducted 20 April 2026 at NPC
  // Playground. 100% scholarship for eligible candidates. 10th-pass entry.
  {
    id: 'nandha_polytechnic_erode',
    collegeName: 'Nandha Polytechnic College',
    collegeNameTa: 'நந்தா பாலிடெக்னிக் கல்லூரி',
    district: 'Erode',
    type: 'Private',
    field: 'other', // polytechnic — not classified under engineering/medical/arts/law/agriculture
    counsellingBody: 'Direct', // College runs its own sports-quota selection trials
    overrides: {
      // Minimum: 10th pass (polytechnic entry — lower than degree-level requirement)
      minLevel: 'district', // accepts even district-level achievers given 10th-pass entry
      sportsScholarship: '100% Scholarship for eligible candidates selected through the offline trials at NPC Playground. Diploma-level admission (10th pass entry).',
      schemes: [
        '100% Sports Scholarship for selected candidates',
        'Diploma courses — 10th-pass eligibility (polytechnic level)',
      ],
      selectionProcess: 'Offline selection trials held 20 April 2026 at NPC Playground, 09:00 AM. Trial day: bring Aadhaar, passport photos, birth certificate, sports achievement certificates. Selected candidates receive 100% scholarship for the 2026-27 academic year.',
      // 13 sports listed in the official notification (same list applies to both genders):
      // Football, Handball, Cricket, Table Tennis, Chess, Carrom, Kabaddi,
      // Volleyball, Athletics, Badminton, Throwball, Basketball, Kho-Kho.
      // Carrom and Throwball are not in the standard sport enum — students playing
      // either pick "Other sport" in the eligibility flow (mapped to 'other').
      sportsForMen: [
        'football', 'handball', 'cricket', 'table-tennis', 'chess',
        'kabaddi', 'volleyball', 'athletics', 'badminton',
        'basketball', 'kho-kho',
        'other', // Carrom + Throwball
      ],
      sportsForWomen: [
        'football', 'handball', 'cricket', 'table-tennis', 'chess',
        'kabaddi', 'volleyball', 'athletics', 'badminton',
        'basketball', 'kho-kho',
        'other', // Carrom + Throwball
      ],
      trialsMen: [
        { sport: 'football',     date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'handball',     date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'cricket',      date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'table-tennis', date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'chess',        date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'kabaddi',      date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'volleyball',   date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'athletics',    date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'badminton',    date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'basketball',   date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'kho-kho',      date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'other',        date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' }, // Carrom + Throwball
      ],
      trialsWomen: [
        { sport: 'football',     date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'handball',     date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'cricket',      date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'table-tennis', date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'chess',        date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'kabaddi',      date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'volleyball',   date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'athletics',    date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'badminton',    date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'basketball',   date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'kho-kho',      date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' },
        { sport: 'other',        date: '2026-04-20', time: '9:00 AM', venue: 'NPC Playground' }, // Carrom + Throwball
      ],
      extraDocuments: [
        {
          titleEn: 'Aadhaar Card',
          titleTa: 'ஆதார் அட்டை',
          detailEn: 'Required as identity proof on trial day.',
          detailTa: 'தேர்வு நாளில் அடையாள ஆதாரமாக தேவை.',
        },
        {
          titleEn: 'Passport-size photographs',
          titleTa: 'பாஸ்போர்ட் அளவு புகைப்படங்கள்',
          detailEn: 'Multiple copies to be brought on trial day.',
          detailTa: 'தேர்வு நாளில் பல நகல்கள் கொண்டு வரவும்.',
        },
        {
          titleEn: 'Birth Certificate',
          titleTa: 'பிறப்புச் சான்றிதழ்',
          detailEn: 'Original to verify age eligibility.',
          detailTa: 'வயது தகுதியை சரிபார்க்க அசல் தேவை.',
        },
        {
          titleEn: 'Sports Achievement Certificates',
          titleTa: 'விளையாட்டு சாதனை சான்றிதழ்கள்',
          detailEn: 'All achievement certificates in any of the 13 listed sports — original copies for verification at trial.',
          detailTa: 'பட்டியலிடப்பட்ட 13 விளையாட்டுகளில் எதிலும் உள்ள அனைத்து சாதனை சான்றிதழ்களும் — தேர்வின் போது சரிபார்ப்புக்காக அசல் நகல்கள்.',
        },
        {
          titleEn: '10th Standard pass certificate',
          titleTa: '10-ஆம் வகுப்பு தேர்ச்சி சான்றிதழ்',
          detailEn: 'Minimum eligibility for polytechnic admission.',
          detailTa: 'பாலிடெக்னிக் சேர்க்கைக்கான குறைந்தபட்ச தகுதி.',
        },
      ],
      applicationDeadline: '20 April 2026', // trial date (past); contact college for any late-application window
    },
    contact: {
      sportsOfficer: 'Mr M. Manikandan',
      designation: 'Department of Physical Education',
      phone: '+91-82208-71970',
      // No email or website provided in notification — contact via phone only
    },
    verification: 'verified',
    sourceNote: 'Direct from Nandha Polytechnic College official Sports Quota Selection Trials 2026-2027 notification (provided by team May 2026). Trials conducted 20 April 2026 at NPC Playground, 09:00 AM. 100% scholarship offered. Contact: Mr. M. Manikandan (8220871970) for current admission status.',
    lastVerified: '2026-05-12',
  },

  // ─── VERIFIED: Christ Academy Institute for Advanced Studies (CAIAS) ─────
  // Bengaluru, Karnataka — UG & PG sports scholarships for 2026-27.
  // Direct admission via campus trial (not through TNEA).
  {
    id: 'caias_bengaluru',
    collegeName: 'Christ Academy Institute for Advanced Studies (CAIAS)',
    collegeNameTa: 'கிறிஸ்ட் அகாடமி இன்ஸ்டிடியூட் ஃபார் அட்வான்ஸ்டு ஸ்டடீஸ் (CAIAS)',
    district: 'Bengaluru',
    type: 'Private',
    field: 'arts', // UG & PG programmes in Commerce, Management, Science, Arts
    counsellingBody: 'Direct',
    overrides: {
      // Open trial — accepts school/district level candidates as well
      minLevel: 'school',
      sportsForMen: [
        'basketball', 'football', 'volleyball', 'kabaddi', 'kho-kho',
        // Throwball is not in the standard sport list — players can pick "Other sport"
        'other',
      ],
      sportsForWomen: [
        'basketball', 'football', 'volleyball', 'kabaddi', 'kho-kho',
        // Throwball — pick "Other sport" in the eligibility flow
        'other',
      ],
      extraDocuments: [
        {
          titleEn: 'Sports achievement certificates (originals)',
          titleTa: 'விளையாட்டு சாதனை சான்றிதழ்கள் (அசல்)',
          detailEn: 'Bring originals of all sports/games certificates earned at school, district, state, or national level for verification on trial day.',
          detailTa: 'பள்ளி, மாவட்ட, மாநில, அல்லது தேசிய அளவில் பெற்ற அனைத்து விளையாட்டு சான்றிதழ்களின் அசலை தேர்வு நாளில் சரிபார்ப்புக்காக கொண்டு வரவும்.',
        },
        {
          titleEn: 'Passport-size photographs',
          titleTa: 'பாஸ்போர்ட் அளவு புகைப்படங்கள்',
          detailEn: 'Multiple copies for registration on trial day.',
          detailTa: 'தேர்வு நாளில் பதிவுக்காக பல நகல்கள்.',
        },
        {
          titleEn: '10th and 12th mark sheets',
          titleTa: '10-ஆம் மற்றும் 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்கள்',
          detailEn: 'For UG admission. PG applicants should also bring graduation mark sheet.',
          detailTa: 'UG சேர்க்கைக்கு. PG விண்ணப்பதாரர்கள் பட்டப்படிப்பு மதிப்பெண் சான்றிதழையும் கொண்டு வரவும்.',
        },
        {
          titleEn: 'Sports kit / playing attire',
          titleTa: 'விளையாட்டு உடை / விளையாடும் உடை',
          detailEn: 'Wear/bring appropriate sports gear for the trial — you will play on the spot.',
          detailTa: 'தேர்வுக்கான பொருத்தமான விளையாட்டு உடையை அணிந்து வரவும் — நிகழ்வில் நேரடியாக விளையாட வேண்டும்.',
        },
      ],
      sportsScholarship: 'Sports scholarships available for UG and PG courses. Awarded based on performance at the selection trial and prior achievement level.',
      selectionProcess: 'Walk-in trial at CAIAS Campus on 18 April 2026, 8:00 AM onwards → On-spot selection → Scholarship offer based on performance',
      trialsMen: [
        { sport: 'basketball', date: '2026-04-18', time: '8:00 AM', venue: 'CAIAS Campus, Bengaluru' },
        { sport: 'football',   date: '2026-04-18', time: '8:00 AM', venue: 'CAIAS Campus, Bengaluru' },
        { sport: 'volleyball', date: '2026-04-18', time: '8:00 AM', venue: 'CAIAS Campus, Bengaluru' },
        { sport: 'kabaddi',    date: '2026-04-18', time: '8:00 AM', venue: 'CAIAS Campus, Bengaluru' },
        { sport: 'kho-kho',    date: '2026-04-18', time: '8:00 AM', venue: 'CAIAS Campus, Bengaluru' },
        { sport: 'other',      date: '2026-04-18', time: '8:00 AM', venue: 'CAIAS Campus, Bengaluru' }, // Throwball
      ],
      trialsWomen: [
        { sport: 'basketball', date: '2026-04-18', time: '8:00 AM', venue: 'CAIAS Campus, Bengaluru' },
        { sport: 'football',   date: '2026-04-18', time: '8:00 AM', venue: 'CAIAS Campus, Bengaluru' },
        { sport: 'volleyball', date: '2026-04-18', time: '8:00 AM', venue: 'CAIAS Campus, Bengaluru' },
        { sport: 'kabaddi',    date: '2026-04-18', time: '8:00 AM', venue: 'CAIAS Campus, Bengaluru' },
        { sport: 'kho-kho',    date: '2026-04-18', time: '8:00 AM', venue: 'CAIAS Campus, Bengaluru' },
        { sport: 'other',      date: '2026-04-18', time: '8:00 AM', venue: 'CAIAS Campus, Bengaluru' }, // Throwball
      ],
      applicationDeadline: '18 April 2026', // walk-in trial date
    },
    contact: {
      sportsOfficer: 'Dr. Devaraj N D',
      designation: 'Director — Physical Education',
      phone: '9787136105',
      email: 'sports.degree@caias.in',
      website: 'https://caias.in/',
    },
    verification: 'verified',
    sourceUrl: 'https://caias.in/',
    sourceNote: 'Direct from CAIAS Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). Group & individual events: Basketball, Football, Volleyball, Throwball, Kabaddi, Kho-Kho. Open to Men and Women. Sports scholarships for UG and PG courses.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: Dr. N.G.P. Institute of Technology (NGPIT) ────────────────
  // Source: Official Sports Quota Admissions 2026-27 notification (provided by
  // team May 2026). NGPIT is an autonomous engineering college in Coimbatore
  // (Kalapatti Road), affiliated to Anna University, NAAC A+ & NBA-accredited.
  // UG admissions go through TNEA + a Management/Direct route. The sports quota
  // route offers 100% scholarship (tuition + hostel) for exceptional athletes,
  // plus free education, food & nutrition support, medical insurance, and
  // physiotherapy. No fixed trial date in the notification — admissions are
  // rolling on a "Limited Seats" basis. Contact the college to schedule.
  {
    id: 'ngpit_coimbatore',
    collegeName: 'Dr. N.G.P. Institute of Technology',
    collegeNameTa: 'டாக்டர் என்.ஜி.பி தொழில்நுட்ப நிறுவனம்',
    district: 'Coimbatore',
    type: 'Autonomous',
    field: 'engineering',
    // NGPIT B.E./B.Tech seats are split between TNEA and a direct/management
    // sports-quota route. We mark it as TNEA so the standard TNEA counselling
    // info still surfaces, but the override below explains the direct route.
    counsellingBody: 'TNEA',
    overrides: {
      // Notification highlights "exceptional athletes" — i.e. state level and
      // above for the 100% scholarship. Lower achievers can still apply via
      // standard TNEA sports quota counselling.
      minLevel: 'state',
      sportsScholarship: '100% Scholarship (tuition + hostel) for exceptional athletes. Free education, food & nutrition support, medical insurance, physiotherapy, customized sports diet, and world-class infrastructure for selected student-athletes.',
      schemes: [
        '100% Tuition Scholarship for exceptional athletes',
        '100% Hostel Fee Waiver',
        'Food & Nutrition support + customized sports diet',
        'Medical insurance and on-campus physiotherapy',
      ],
      infrastructure: [
        { en: 'World-class indoor and outdoor sports facilities on the 19-acre Kalapatti campus', ta: 'கலபட்டி வளாகத்தில் (19 ஏக்கர்) உலகத் தரத்திலான உட்புற & வெளிப்புற விளையாட்டு வசதிகள்' },
        { en: 'Cricket ground, basketball, volleyball, football, athletics, handball, throwball courts', ta: 'கிரிக்கெட் மைதானம், கூடைப்பந்து, கைப்பந்தாட்டம், கால்பந்து, அத்லெடிக்ஸ், கைப்பந்து, த்ரோபால் கோர்ட்டுகள்' },
        { en: 'Indoor stadium with chess, carrom, table tennis, badminton', ta: 'உட்புற அரங்கம் — சதுரங்கம், கேரம், மேசைப் பந்தாட்டம், பேட்மிண்டன்' },
        { en: 'On-campus physiotherapy & medical support via KMCH partnership', ta: 'KMCH கூட்டாண்மை மூலம் வளாகத்திலேயே ஃபிசியோதெரபி & மருத்துவ உதவி' },
      ],
      // Standard sports list at NGPIT (per official college info)
      sportsForMen: [
        'cricket', 'basketball', 'volleyball', 'football', 'athletics',
        'handball', 'kabaddi', 'badminton', 'table-tennis', 'chess',
        'hockey', 'swimming',
        'other', // Throwball + Carrom
      ],
      sportsForWomen: [
        'cricket', 'basketball', 'volleyball', 'football', 'athletics',
        'handball', 'kabaddi', 'badminton', 'table-tennis', 'chess',
        'hockey', 'swimming',
        'other', // Throwball + Carrom
      ],
      extraDocuments: [
        {
          titleEn: 'Sports achievement certificates (originals)',
          titleTa: 'விளையாட்டு சாதனை சான்றிதழ்கள் (அசல்)',
          detailEn: 'All state/national/international level certificates in original. Higher achievement level = higher scholarship.',
          detailTa: 'அனைத்து மாநில/தேசிய/சர்வதேச அளவிலான சான்றிதழ்களையும் அசலில். உயர் சாதனை அளவு = அதிக உதவித்தொகை.',
        },
        {
          titleEn: '10th and 12th mark sheets',
          titleTa: '10-ஆம் & 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்கள்',
          detailEn: 'Original mark sheets — required for TNEA verification and direct sports-quota admission.',
          detailTa: 'அசல் மதிப்பெண் சான்றிதழ்கள் — TNEA சரிபார்ப்பு மற்றும் நேரடி விளையாட்டு கோட்டா சேர்க்கைக்கு தேவை.',
        },
        {
          titleEn: 'Transfer Certificate (TC) and Conduct Certificate',
          titleTa: 'மாற்றுச் சான்றிதழ் (TC) & நடத்தைச் சான்றிதழ்',
          detailEn: 'From last attended school/college.',
          detailTa: 'கடைசியாக பயின்ற பள்ளி / கல்லூரியிலிருந்து.',
        },
        {
          titleEn: 'Aadhaar card + passport photos',
          titleTa: 'ஆதார் அட்டை + பாஸ்போர்ட் புகைப்படங்கள்',
          detailEn: 'Standard ID and 4-6 passport-size photos.',
          detailTa: 'வழக்கமான அடையாள ஆதாரம் மற்றும் 4-6 பாஸ்போர்ட் அளவு புகைப்படங்கள்.',
        },
      ],
      selectionProcess: 'Two routes: (1) TNEA Sports Quota — apply via tneaonline.org for the universal 2% reservation. (2) NGPIT Direct Sports Admission — contact the college directly (numbers below) to arrange a sport-specific trial at the Kalapatti campus. Selected athletes are offered 100% scholarship covering tuition and hostel, plus food and medical support. Limited seats — admissions open and rolling.',
      // No fixed trial date in the notification — rolling admissions
    },
    contact: {
      designation: 'NGPIT Sports Admissions',
      phone: '+91-94896-66767',
      phone2: '+91-77086-66767',
      website: 'https://www.drngpit.ac.in',
      applicationLink: 'https://www.drngpit.ac.in',
    },
    verification: 'verified',
    sourceUrl: 'https://www.drngpit.ac.in',
    sourceNote: 'Direct from Dr. N.G.P. Institute of Technology Sports Quota Admissions 2026-27 notification (provided by team May 2026). 100% Scholarship (Tuition & Hostel) for exceptional athletes, free education + hostel, food & nutrition support, world-class infrastructure, medical insurance & physiotherapy, customized sports diet. Admissions open with limited seats — contact numbers: 9489666767, 7708666767, 9025286806. Anna University-affiliated autonomous engineering college, NAAC A+ and NBA accredited, located on Kalapatti Road, Coimbatore.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: Kovai Kalaimagal College of Arts and Science (KKCAS) ─────
  // Source: Official KKCAS Sports Quota Selection Trials 2026-27 notification
  // (provided by team May 2026). KKCAS is an autonomous arts & science college
  // in Narasipuram, Coimbatore, affiliated to Bharathiar University.
  // Performance-based scholarship: District 25%, State 50%, National 100%.
  // Trials run across two days (6 & 7 May 2026), 09:30 AM – 04:30 PM at KKCAS
  // Ground. Wide list of 22 sports including water (Swimming), traditional
  // (Silambam, Kabaddi, Kho-Kho), combat (Boxing, Karate, Taekwondo) and
  // standard ball games. Silambam is not in our standard sport enum — players
  // pick "Other sport" in the flow (mapped to 'other').
  {
    id: 'kkcas_coimbatore',
    collegeName: 'Kovai Kalaimagal College of Arts and Science',
    collegeNameTa: 'கோவை கலைமகள் கலை மற்றும் அறிவியல் கல்லூரி',
    district: 'Coimbatore',
    type: 'Autonomous',
    field: 'arts',
    counsellingBody: 'Direct', // KKCAS runs its own sports-quota selection trials
    overrides: {
      // Accepts district-level and above. Tiered scholarship reflects the level:
      //   District = 25%, State = 50%, National = 100%
      minLevel: 'district',
      sportsScholarship: 'Up to 100% Scholarship for outstanding sports achievers. Tiered by level: District = 25%, State = 50%, National = 100%. Scholarship is performance-based and conditional on maintaining athletic performance, participating in competitions, and meeting minimum 75% attendance.',
      schemes: [
        'Up to 100% Scholarship (performance-based)',
        'District level = 25% fee waiver',
        'State level = 50% fee waiver',
        'National level = 100% fee waiver',
        'Renewal conditional on athletic performance + 75% attendance',
      ],
      // 22 sports listed in the official notification — same for men & women
      sportsForMen: [
        // Ball games
        'volleyball', 'football', 'basketball', 'handball', 'cricket',
        'tennis', 'table-tennis', 'ball-badminton', 'badminton',
        // Martial arts & combat
        'karate', 'boxing', 'taekwondo',
        // Athletics & strength
        'weightlifting', 'powerlifting', 'athletics',
        // Traditional & board games
        'kho-kho', 'kabaddi', 'chess', 'yoga',
        // Water sports
        'swimming',
        // Silambam not in the standard enum — student picks "Other sport"
        'other',
      ],
      sportsForWomen: [
        'volleyball', 'football', 'basketball', 'handball', 'cricket',
        'tennis', 'table-tennis', 'ball-badminton', 'badminton',
        'karate', 'boxing', 'taekwondo',
        'weightlifting', 'powerlifting', 'athletics',
        'kho-kho', 'kabaddi', 'chess', 'yoga',
        'swimming',
        'other', // Silambam
      ],
      extraDocuments: [
        {
          titleEn: 'Sports Participation Certificates',
          titleTa: 'விளையாட்டு பங்கேற்பு சான்றிதழ்கள்',
          detailEn: 'All participation certificates from recognized sports bodies — district / state / national level. Originals required at the trial.',
          detailTa: 'அங்கீகரிக்கப்பட்ட விளையாட்டு அமைப்புகளிலிருந்து அனைத்து பங்கேற்பு சான்றிதழ்கள் — மாவட்ட / மாநில / தேசிய அளவில். தேர்வின் போது அசல் தேவை.',
        },
        {
          titleEn: 'Sports Achievement Records',
          titleTa: 'விளையாட்டு சாதனை பதிவுகள்',
          detailEn: 'All medal certificates, position records, ranking proof — these determine your scholarship tier (25% / 50% / 100%).',
          detailTa: 'அனைத்து பதக்க சான்றிதழ்கள், இடம் பெற்ற பதிவுகள், தரவரிசை ஆதாரம் — இவை உங்கள் உதவித்தொகை அளவை (25% / 50% / 100%) தீர்மானிக்கும்.',
        },
        {
          titleEn: '10th and 12th mark sheets',
          titleTa: '10-ஆம் & 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்கள்',
          detailEn: 'Minimum academic qualification required — bring originals.',
          detailTa: 'குறைந்தபட்ச கல்வித் தகுதி தேவை — அசல் சான்றிதழ்களை கொண்டு வாரவும்.',
        },
        {
          titleEn: 'Aadhaar card + passport photos',
          titleTa: 'ஆதார் அட்டை + பாஸ்போர்ட் புகைப்படங்கள்',
          detailEn: 'Standard ID and passport-size photographs for trial registration.',
          detailTa: 'தேர்வு பதிவுக்கு வழக்கமான அடையாள ஆதாரம் மற்றும் பாஸ்போர்ட் அளவு புகைப்படங்கள்.',
        },
      ],
      selectionProcess: 'Two-day offline selection trial held 6 & 7 May 2026, 09:30 AM – 04:30 PM at KKCAS Ground, Narasipuram, Coimbatore. Performance-based selection. Trial day: bring all sports participation & achievement certificates (originals), academic mark sheets, Aadhaar and photos. Scholarship tier decided on the spot based on highest verified level — District (25%), State (50%) or National (100%). Renewal requires continued athletic performance and minimum 75% attendance.',
      // Earlier of the two trial dates — used by the splash banner
      applicationDeadline: '6 May 2026',
      trialsMen: [
        // Day 1 — 6 May 2026
        { sport: 'volleyball',     date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'football',       date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'basketball',     date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'handball',       date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'cricket',        date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'tennis',         date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'table-tennis',   date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'ball-badminton', date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'badminton',      date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'kho-kho',        date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'kabaddi',        date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        // Day 2 — 7 May 2026
        { sport: 'karate',         date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'boxing',         date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'taekwondo',      date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'weightlifting',  date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'powerlifting',   date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'athletics',      date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'chess',          date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'yoga',           date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'swimming',       date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'other',          date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' }, // Silambam
      ],
      trialsWomen: [
        // Day 1 — 6 May 2026
        { sport: 'volleyball',     date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'football',       date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'basketball',     date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'handball',       date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'cricket',        date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'tennis',         date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'table-tennis',   date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'ball-badminton', date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'badminton',      date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'kho-kho',        date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'kabaddi',        date: '2026-05-06', time: '9:30 AM', venue: 'KKCAS Ground' },
        // Day 2 — 7 May 2026
        { sport: 'karate',         date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'boxing',         date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'taekwondo',      date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'weightlifting',  date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'powerlifting',   date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'athletics',      date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'chess',          date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'yoga',           date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'swimming',       date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' },
        { sport: 'other',          date: '2026-05-07', time: '9:30 AM', venue: 'KKCAS Ground' }, // Silambam
      ],
    },
    contact: {
      sportsOfficer: 'Dr. K. Ooraniyan',
      designation: 'Department of Physical Education',
      phone: '+91-82200-94942',
      sportsOfficer2: 'Mrs. A. Maheshwari',
      designation2: 'Department of Physical Education',
      phone2: '+91-99651-64552',
    },
    verification: 'verified',
    sourceNote: 'Direct from Kovai Kalaimagal College of Arts and Science (KKCAS) Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). Bharathiar University-affiliated autonomous arts & science college, Narasipuram, Coimbatore. Trials conducted 6 & 7 May 2026, 09:30 AM – 04:30 PM at KKCAS Ground. Up to 100% Scholarship (tiered: District 25%, State 50%, National 100%). 22 sports across ball games, martial arts, athletics, traditional/board games, and swimming. Renewal requires athletic performance + 75% attendance. Contact: Dr. K. Ooraniyan (8220094942) or Mrs. A. Maheshwari (9965164552) for current admission status.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: KGiSL Educational Institutions ────────────────────────────
  // Source: Official KGiSL Sports Quota Selection Trials 2026-27 notification
  // (provided by team May 2026). KGiSL Educational Institutions is an umbrella
  // group in Saravanampatti, Coimbatore covering engineering (KGiSL Institute
  // of Technology), management/IT (KGiSL Institute of Information Management),
  // and Microcollege. Trials are split across two days — team games on 10 Apr,
  // individual events on 11 Apr 2026. Application deadline was 10-11 April
  // 2026 (before 6:30 PM). Up to 100% scholarship for eligible candidates.
  // Note: Cricket (PG-Men) and Basketball (Men) are gender-restricted in the
  // notification; we set those only in sportsForMen / trialsMen.
  {
    id: 'kgisl_coimbatore',
    collegeName: 'KGiSL Educational Institutions',
    collegeNameTa: 'KGiSL கல்வி நிறுவனங்கள்',
    district: 'Coimbatore',
    type: 'Private',
    field: 'engineering', // primary route (KGiSL Institute of Technology); also covers IIM and Microcollege
    counsellingBody: 'Direct', // KGiSL runs its own sports-quota selection trials
    overrides: {
      // Notification doesn't specify min level — open to all participation/
      // achievement levels, scored on the trial day. Defaulting to 'district'
      // so school-level players know to call before showing up.
      minLevel: 'district',
      sportsScholarship: 'Up to 100% Scholarship for eligible candidates selected through the offline trials at KGiSL Play Grounds. Admissions across engineering, IT/management, and other KGiSL Educational Institutions programmes for the 2026-27 academic year.',
      schemes: [
        'Up to 100% Sports Scholarship (eligible candidates)',
        'Open across KGiSL Educational Institutions (KGiSL IT, IIM, Microcollege)',
      ],
      selectionProcess: 'Two-day offline selection trials at KGiSL Play Grounds, Saravanampatti, Coimbatore. Day 1 (10 April 2026): Team games — Volleyball, Ball Badminton, Kho-Kho, Kabaddi (Men), Hockey, Basketball (Men), Cricket (PG-Men). Day 2 (11 April 2026): Individual events — Athletics, Powerlifting, Boxing, Swimming, Chess, Taekwondo, Judo, Weightlifting. Application closed 10-11 April 2026 before 6:30 PM — contact the Directors of Physical Education for current admission status.',
      // Sports list per official notification. Note gender restrictions:
      //   Kabaddi   → Men only
      //   Basketball → Men only
      //   Cricket (PG) → Men only
      //   Other team games — both M & W
      //   All individual events — both M & W
      // Judo not in the standard sport enum — mapped to 'martial-arts'
      sportsForMen: [
        // Team games (Day 1)
        'volleyball', 'ball-badminton', 'kho-kho', 'kabaddi', 'hockey',
        'basketball', 'cricket',
        // Individual events (Day 2)
        'athletics', 'powerlifting', 'boxing', 'swimming', 'chess',
        'taekwondo', 'weightlifting',
        'martial-arts', // Judo
      ],
      sportsForWomen: [
        // Team games (Day 1) — no Kabaddi, Basketball, Cricket for women
        'volleyball', 'ball-badminton', 'kho-kho', 'hockey',
        // Individual events (Day 2) — all sports
        'athletics', 'powerlifting', 'boxing', 'swimming', 'chess',
        'taekwondo', 'weightlifting',
        'martial-arts', // Judo
      ],
      trialsMen: [
        // Day 1 — 10 April 2026 (team games)
        { sport: 'volleyball',     date: '2026-04-10', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'ball-badminton', date: '2026-04-10', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'kho-kho',        date: '2026-04-10', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'kabaddi',        date: '2026-04-10', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'hockey',         date: '2026-04-10', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'basketball',     date: '2026-04-10', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'cricket',        date: '2026-04-10', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' }, // PG only
        // Day 2 — 11 April 2026 (individual events)
        { sport: 'athletics',      date: '2026-04-11', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'powerlifting',   date: '2026-04-11', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'boxing',         date: '2026-04-11', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'swimming',       date: '2026-04-11', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'chess',          date: '2026-04-11', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'taekwondo',      date: '2026-04-11', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'martial-arts',   date: '2026-04-11', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' }, // Judo
        { sport: 'weightlifting',  date: '2026-04-11', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
      ],
      trialsWomen: [
        // Day 1 — 10 April 2026 (team games — Volleyball, Ball Badminton, Kho-Kho, Hockey only)
        { sport: 'volleyball',     date: '2026-04-10', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'ball-badminton', date: '2026-04-10', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'kho-kho',        date: '2026-04-10', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'hockey',         date: '2026-04-10', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        // Day 2 — 11 April 2026 (individual events — all)
        { sport: 'athletics',      date: '2026-04-11', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'powerlifting',   date: '2026-04-11', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'boxing',         date: '2026-04-11', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'swimming',       date: '2026-04-11', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'chess',          date: '2026-04-11', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'taekwondo',      date: '2026-04-11', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
        { sport: 'martial-arts',   date: '2026-04-11', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' }, // Judo
        { sport: 'weightlifting',  date: '2026-04-11', time: '6:30 PM (apply by)', venue: 'KGiSL Play Grounds, Saravanampatti' },
      ],
      extraDocuments: [
        {
          titleEn: 'Sports Achievement Certificates (originals)',
          titleTa: 'விளையாட்டு சாதனை சான்றிதழ்கள் (அசல்)',
          detailEn: 'All achievement certificates in the listed sports — bring originals for verification at trial.',
          detailTa: 'பட்டியலிடப்பட்ட விளையாட்டுகளில் உள்ள அனைத்து சாதனை சான்றிதழ்களும் — தேர்வில் சரிபார்ப்புக்காக அசல் கொண்டு வாரவும்.',
        },
        {
          titleEn: 'Aadhaar Card',
          titleTa: 'ஆதார் அட்டை',
          detailEn: 'Required as identity proof on trial day.',
          detailTa: 'தேர்வு நாளில் அடையாள ஆதாரமாக தேவை.',
        },
        {
          titleEn: 'Recent passport-size photograph',
          titleTa: 'சமீபத்திய பாஸ்போர்ட் அளவு புகைப்படம்',
          detailEn: 'Carry multiple recent passport-size photos for trial registration.',
          detailTa: 'தேர்வு பதிவுக்காக பல சமீபத்திய பாஸ்போர்ட் அளவு புகைப்படங்களை கொண்டு வாரவும்.',
        },
      ],
      applicationDeadline: '10 April 2026', // first trial day — overall window 10-11 April 2026
    },
    contact: {
      sportsOfficer: 'Dr. J Suresh',
      designation: 'Director of Physical Education',
      phone: '+91-99760-08900',
      sportsOfficer2: 'Mr. M Murugan',
      designation2: 'Director of Physical Education',
      phone2: '+91-97875-76263',
    },
    verification: 'verified',
    sourceNote: 'Direct from KGiSL Educational Institutions Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). Trials at KGiSL Play Grounds, Saravanampatti, Coimbatore. Day 1 (10 April): Volleyball, Ball Badminton, Kho-Kho, Kabaddi (M), Hockey, Basketball (M), Cricket PG (M). Day 2 (11 April): Athletics, Powerlifting, Boxing, Swimming, Chess, Taekwondo, Judo, Weightlifting (all M/W). Up to 100% scholarship. Application deadline was 10-11 April 2026 before 6:30 PM. Additional contacts: Dr. N Arjunan (DPE) 9789793798; Dr. K Amirthavalli (DPE) 9842983421; Ms. M Pavithra (Asst. PD) 8072275315.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: The New College (Autonomous), Chennai ────────────────────
  // Source: Official The New College Sports Quota Selection Trials 2026-27
  // notification (provided by team May 2026). The New College is an autonomous
  // arts & science college affiliated to the University of Madras, NAAC A++
  // (3.61/4) accredited, located at 147 Peters Road, Royapettah, Chennai-14.
  // IMPORTANT: This year's trials are for MEN ONLY — trialsWomen and
  // sportsForWomen are left empty so the eligibility flow correctly excludes
  // women candidates from this match. Up to 100% sports scholarship for both
  // UG & PG programmes; free food and accommodation during the trial period.
  {
    id: 'thenewcollege_chennai',
    collegeName: 'The New College (Autonomous), Chennai',
    collegeNameTa: 'த நியூ காலேஜ் (தன்னாட்சி), சென்னை',
    district: 'Chennai',
    type: 'Autonomous',
    field: 'arts',
    counsellingBody: 'Direct', // College runs its own sports-quota selection trials
    overrides: {
      minLevel: 'district',
      sportsScholarship: 'Up to 100% Sports Scholarship for UG and PG programmes. Free food and accommodation provided during the trial period at the college campus. The New College is NAAC A++ (3.61/4) accredited and affiliated to the University of Madras.',
      schemes: [
        'Up to 100% Sports Scholarship (UG and PG)',
        'Free food and accommodation during trial days',
        'NAAC A++ (3.61/4) accredited',
      ],
      selectionProcess: 'Sports Quota Selection Trials 2026-27 (MEN ONLY) — held at The New College campus, 147 Peters Road, Royapettah, Chennai-600 014. Online registration via Google Form (link in official notification). Sport-specific dates and times: 29 April (Kabaddi 7 AM), 30 April (Football, Volleyball 6:30 AM; Basketball, Handball 9:00 AM), 1 May (Kho-Kho, Ball Badminton, Hockey 9:00 AM), 2 May (Athletics, Cricket 7 AM; Weightlifting, Powerlifting, Taekwondo, Best Physique/Bodybuilding, Judo, Badminton, Chess, Tennis, Table Tennis, Boxing, Rowing, Swimming, Shooting, Fencing, Archery & Yoga 10 AM). Trial uniform: proper sports attire required.',
      // Per the official notification, trials are for MEN ONLY this year.
      // Best Physique / Bodybuilding, Rowing, Fencing, Judo not in our standard
      // enum — mapped to 'other' (judo also surfaces under 'martial-arts').
      sportsForMen: [
        // 29 Apr
        'kabaddi',
        // 30 Apr
        'football', 'volleyball', 'basketball', 'handball',
        // 1 May
        'kho-kho', 'ball-badminton', 'hockey',
        // 2 May AM
        'athletics', 'cricket',
        // 2 May Late AM batch
        'weightlifting', 'powerlifting', 'taekwondo',
        'martial-arts', // Judo
        'badminton', 'chess', 'tennis', 'table-tennis', 'boxing',
        'swimming', 'shooting', 'archery', 'yoga',
        'other', // Best Physique / Bodybuilding, Rowing, Fencing
      ],
      // Women's trials not conducted this cycle — empty array signals the
      // eligibility flow to exclude women candidates from this college.
      sportsForWomen: [],
      trialsMen: [
        // 29 April 2026
        { sport: 'kabaddi',        date: '2026-04-29', time: '7:00 AM',  venue: 'The New College campus, Royapettah, Chennai' },
        // 30 April 2026
        { sport: 'football',       date: '2026-04-30', time: '6:30 AM',  venue: 'The New College campus, Royapettah, Chennai' },
        { sport: 'volleyball',     date: '2026-04-30', time: '6:30 AM',  venue: 'The New College campus, Royapettah, Chennai' },
        { sport: 'basketball',     date: '2026-04-30', time: '9:00 AM',  venue: 'The New College campus, Royapettah, Chennai' },
        { sport: 'handball',       date: '2026-04-30', time: '9:00 AM',  venue: 'The New College campus, Royapettah, Chennai' },
        // 1 May 2026
        { sport: 'kho-kho',        date: '2026-05-01', time: '9:00 AM',  venue: 'The New College campus, Royapettah, Chennai' },
        { sport: 'ball-badminton', date: '2026-05-01', time: '9:00 AM',  venue: 'The New College campus, Royapettah, Chennai' },
        { sport: 'hockey',         date: '2026-05-01', time: '9:00 AM',  venue: 'The New College campus, Royapettah, Chennai' },
        // 2 May 2026 AM
        { sport: 'athletics',      date: '2026-05-02', time: '7:00 AM',  venue: 'The New College campus, Royapettah, Chennai' },
        { sport: 'cricket',        date: '2026-05-02', time: '7:00 AM',  venue: 'The New College campus, Royapettah, Chennai' },
        // 2 May 2026 Late AM (10 AM batch)
        { sport: 'weightlifting',  date: '2026-05-02', time: '10:00 AM', venue: 'The New College campus, Royapettah, Chennai' },
        { sport: 'powerlifting',   date: '2026-05-02', time: '10:00 AM', venue: 'The New College campus, Royapettah, Chennai' },
        { sport: 'taekwondo',      date: '2026-05-02', time: '10:00 AM', venue: 'The New College campus, Royapettah, Chennai' },
        { sport: 'martial-arts',   date: '2026-05-02', time: '10:00 AM', venue: 'The New College campus, Royapettah, Chennai' }, // Judo
        { sport: 'badminton',      date: '2026-05-02', time: '10:00 AM', venue: 'The New College campus, Royapettah, Chennai' },
        { sport: 'chess',          date: '2026-05-02', time: '10:00 AM', venue: 'The New College campus, Royapettah, Chennai' },
        { sport: 'tennis',         date: '2026-05-02', time: '10:00 AM', venue: 'The New College campus, Royapettah, Chennai' },
        { sport: 'table-tennis',   date: '2026-05-02', time: '10:00 AM', venue: 'The New College campus, Royapettah, Chennai' },
        { sport: 'boxing',         date: '2026-05-02', time: '10:00 AM', venue: 'The New College campus, Royapettah, Chennai' },
        { sport: 'swimming',       date: '2026-05-02', time: '10:00 AM', venue: 'The New College campus, Royapettah, Chennai' },
        { sport: 'shooting',       date: '2026-05-02', time: '10:00 AM', venue: 'The New College campus, Royapettah, Chennai' },
        { sport: 'archery',        date: '2026-05-02', time: '10:00 AM', venue: 'The New College campus, Royapettah, Chennai' },
        { sport: 'yoga',           date: '2026-05-02', time: '10:00 AM', venue: 'The New College campus, Royapettah, Chennai' },
        { sport: 'other',          date: '2026-05-02', time: '10:00 AM', venue: 'The New College campus, Royapettah, Chennai' }, // Best Physique/Bodybuilding, Rowing, Fencing
      ],
      // No women's trials this cycle — left intentionally empty.
      trialsWomen: [],
      extraDocuments: [
        {
          titleEn: 'Photocopy of Aadhaar Card',
          titleTa: 'ஆதார் அட்டையின் நகல்',
          detailEn: 'Bring a photocopy of your Aadhaar card to the trial.',
          detailTa: 'உங்கள் ஆதார் அட்டையின் நகலை தேர்வுக்கு கொண்டு வாரவும்.',
        },
        {
          titleEn: 'Original academic certificates',
          titleTa: 'அசல் கல்விச் சான்றிதழ்கள்',
          detailEn: 'Originals of 10th, 12th, and UG mark sheets (PG applicants).',
          detailTa: '10-ஆம், 12-ஆம் வகுப்பு, மற்றும் UG மதிப்பெண் சான்றிதழ்களின் அசல் (PG விண்ணப்பதாரர்கள்).',
        },
        {
          titleEn: 'Original sports certificates',
          titleTa: 'அசல் விளையாட்டு சான்றிதழ்கள்',
          detailEn: 'All sports achievement and participation certificates in original — verified at the trial.',
          detailTa: 'அனைத்து விளையாட்டு சாதனை மற்றும் பங்கேற்பு சான்றிதழ்கள் அசலில் — தேர்வில் சரிபார்க்கப்படும்.',
        },
        {
          titleEn: 'Proper sports uniform',
          titleTa: 'பொருத்தமான விளையாட்டு உடை',
          detailEn: 'Wear/bring appropriate sports uniform — participants must attend the trial in proper sports attire.',
          detailTa: 'பொருத்தமான விளையாட்டு உடையை அணிந்து வரவும் — பங்கேற்பாளர்கள் சரியான விளையாட்டு உடையில் தேர்வில் கலந்து கொள்ள வேண்டும்.',
        },
        {
          titleEn: 'Online Google Form registration',
          titleTa: 'ஆன்லைன் Google Form பதிவு',
          detailEn: 'Register online via the Google Form link in the official notification before the trial date.',
          detailTa: 'தேர்வு நாளுக்கு முன்பு அதிகாரப்பூர்வ அறிவிப்பில் உள்ள Google Form இணைப்பு மூலம் ஆன்லைனில் பதிவு செய்யவும்.',
        },
      ],
      applicationDeadline: '29 April 2026', // first trial date — overall window 29 April – 2 May 2026
    },
    contact: {
      sportsOfficer: 'Dr. U. Mahaboob Basha',
      designation: 'Director of Physical Education',
      phone: '+91-99404-55991',
      sportsOfficer2: 'Prof. M. Nasar Khan',
      designation2: 'Assistant Director of Physical Education',
      phone2: '+91-96778-46006',
      email: 'physicaldirector@thenewcollege.edu.in',
      website: 'http://www.thenewcollege.edu.in',
    },
    verification: 'verified',
    sourceUrl: 'http://www.thenewcollege.edu.in',
    sourceNote: 'Direct from The New College (Autonomous), Chennai Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). MEN ONLY this cycle. NAAC A++ (3.61/4), University of Madras affiliated. Trials held 29 April – 2 May 2026 at The New College campus, 147 Peters Road, Royapettah, Chennai-600 014. Up to 100% Sports Scholarship for UG & PG. Free food + accommodation during trial period. Additional contact: Prof. M. Yashwanth (Asst. DPE) 9087147093. Email: physicaldirector@thenewcollege.edu.in. Online registration via Google Form linked in the official notification.',
    lastVerified: '2026-05-13',
  },

  // The rest of TN engineering colleges will inherit TNEA defaults below.
  // They are populated programmatically from the college database in
  // sportsQuotaHelpers.ts to avoid duplicating data.
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Compare two sports levels. Returns >0 if a is higher, <0 if b is higher, 0 if equal.
 */
export const compareLevels = (a: SportLevel, b: SportLevel): number => {
  const order: Record<SportLevel, number> = {
    'school': 0, 'district': 1, 'state': 2, 'national': 3, 'international': 4,
  };
  return order[a] - order[b];
};

/**
 * Check if a candidate qualifies for TNEA sports quota.
 */
export interface CandidateProfile {
  sport: Sport;
  level: SportLevel;
  yearOfAchievement: number;
  marks12th: number; // percentage
  category: 'general' | 'reserved'; // SC/ST/MBC/DNC/SCA = reserved
  gender: Gender;
  district?: string;
}

export type Verdict = 'qualified' | 'borderline' | 'aim-higher';

export interface EligibilityResult {
  verdict: Verdict;
  reasonEn: string;
  reasonTa: string;
  growthPathEn?: string;
  growthPathTa?: string;
}

export const checkTNEAEligibility = (c: CandidateProfile): EligibilityResult => {
  const minMarks = c.category === 'general' ? TNEA_RULES.minMarks.general : TNEA_RULES.minMarks.reserved;
  const marksOK = c.marks12th >= minMarks;
  const levelOK = compareLevels(c.level, TNEA_RULES.minSportsLevel) >= 0;
  const sportOK = TNEA_RULES.acceptedSports.includes(c.sport);

  // Achievement freshness (most colleges: last 4 years)
  const currentYear = new Date().getFullYear();
  const ageOK = (currentYear - c.yearOfAchievement) <= 4;

  if (!sportOK) {
    return {
      verdict: 'aim-higher',
      reasonEn: 'Your sport is not in the TNEA list of accepted sports.',
      reasonTa: 'உங்கள் விளையாட்டு TNEA ஏற்றுக்கொள்ளும் விளையாட்டுகள் பட்டியலில் இல்லை.',
    };
  }

  if (levelOK && marksOK && ageOK) {
    return {
      verdict: 'qualified',
      reasonEn: `Your ${c.level}-level achievement and ${c.marks12th}% marks meet TNEA's minimum.`,
      reasonTa: `உங்கள் ${c.level} அளவு சாதனையும் ${c.marks12th}% மதிப்பெண்களும் TNEA-வின் குறைந்தபட்சத்தை அடைகின்றன.`,
    };
  }

  if (!levelOK && c.level === 'district' && marksOK) {
    return {
      verdict: 'aim-higher',
      reasonEn: 'TNEA requires State level minimum. District is not enough.',
      reasonTa: 'TNEA-க்கு குறைந்தபட்சம் மாநில அளவு தேவை. மாவட்டம் போதாது.',
      growthPathEn: 'Aim to play in a State-level tournament this year. Contact your District Sports Officer for selection trials.',
      growthPathTa: 'இந்த ஆண்டு மாநில அளவிலான போட்டியில் விளையாட முயற்சி செய்யவும். தேர்வுகளுக்கு உங்கள் மாவட்ட விளையாட்டு அலுவலரைத் தொடர்பு கொள்ளவும்.',
    };
  }

  if (!marksOK) {
    return {
      verdict: 'aim-higher',
      reasonEn: `Your 12th marks (${c.marks12th}%) are below TNEA's minimum of ${minMarks}% for the ${c.category} category.`,
      reasonTa: `உங்கள் 12-ஆம் வகுப்பு மதிப்பெண்கள் (${c.marks12th}%) ${c.category === 'general' ? 'பொது' : 'இடஒதுக்கீடு'} பிரிவின் TNEA குறைந்தபட்சமான ${minMarks}%-க்கு கீழ் உள்ளன.`,
    };
  }

  if (!ageOK) {
    return {
      verdict: 'borderline',
      reasonEn: `Your certificate is older than 4 years. Some colleges may still accept it — call to confirm.`,
      reasonTa: `உங்கள் சான்றிதழ் 4 ஆண்டுகளுக்கு மேலானது. சில கல்லூரிகள் ஏற்கலாம் — உறுதிப்படுத்த அழைக்கவும்.`,
    };
  }

  return {
    verdict: 'borderline',
    reasonEn: 'You partially meet TNEA criteria. Verify with the college sports officer.',
    reasonTa: 'நீங்கள் TNEA தகுதியை ஓரளவு பூர்த்தி செய்கிறீர்கள். கல்லூரி விளையாட்டு அலுவலருடன் சரிபார்க்கவும்.',
  };
};

/**
 * Check if a specific college accepts this candidate's sport for their gender.
 */
export const collegeAcceptsCandidateSport = (
  college: CollegeSportsQuota,
  sport: Sport,
  gender: Gender,
): { accepted: boolean; reason?: string } => {
  const ov = college.overrides;
  if (!ov) return { accepted: true }; // No restriction — TNEA defaults apply

  if (gender === 'male' && ov.sportsForMen && !ov.sportsForMen.includes(sport)) {
    return {
      accepted: false,
      reason: `This college does not offer the men's quota seat for ${sport}.`,
    };
  }
  if (gender === 'female' && ov.sportsForWomen && !ov.sportsForWomen.includes(sport)) {
    return {
      accepted: false,
      reason: `This college does not offer the women's quota seat for ${sport}.`,
    };
  }
  return { accepted: true };
};

export const getSportLabel = (id: Sport, lang: 'en' | 'ta' = 'en'): string => {
  const s = ALL_SPORTS.find(x => x.id === id);
  return s ? (lang === 'ta' ? s.ta : s.en) : id;
};

export const getLevelLabel = (id: SportLevel, lang: 'en' | 'ta' = 'en'): string => {
  const l = SPORT_LEVELS.find(x => x.id === id);
  return l ? (lang === 'ta' ? l.ta : l.en) : id;
};
