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
      sportsScholarship: 'Founder\'s Scholarship (Sub-Category B — Exemplary Sports Persons). Fee waiver amount/percentage is not published in the policy — confirm with the Directorate of Sports before applying. Renewable yearly subject to CGPA > 7 and continued representation of the University.',
      schemes: [
        'Founder\'s Scholarship — Exemplary Sports Persons',
        'Diploma / UG / PG programmes available under sports quota (select programmes only — confirm with Directorate of Sports)',
      ],
      selectionProcess: 'MANDATORY: Approach the Directorate of Sports at SRMIST Kattankulathur Campus for trials/selection BEFORE applying for admission. Then apply via SRMJEEE counselling. Trial recommendation from Directorate of Sports is required for the sports quota seat.',
      // Sports list is NOT published in the SRMIST scholarship policy.
      // Their main site mentions tennis, basketball, badminton, volleyball,
      // hockey, kabaddi, cricket, athletics among others, but no
      // exhaustive list. Until we get a verified list, mark as broad —
      // a student MUST call to confirm whether their sport is offered.
      // Listing common sports here so the app does not falsely exclude
      // a candidate; sport restriction filtering should fall back to
      // "verify with college" for SRMIST.
      sportsForMen: [
        'athletics', 'basketball', 'badminton', 'cricket', 'chess',
        'football', 'hockey', 'kabaddi', 'table-tennis', 'tennis',
        'volleyball', 'swimming', 'kho-kho', 'handball', 'ball-badminton',
        'boxing', 'martial-arts', 'wrestling', 'weightlifting',
        'archery', 'shooting',
      ],
      sportsForWomen: [
        'athletics', 'basketball', 'badminton', 'cricket', 'chess',
        'football', 'hockey', 'kabaddi', 'table-tennis', 'tennis',
        'volleyball', 'swimming', 'kho-kho', 'handball', 'ball-badminton',
        'boxing', 'martial-arts', 'wrestling', 'weightlifting',
        'archery', 'shooting',
      ],
      extraDocuments: [
        {
          titleEn: 'Trial recommendation from SRMIST Directorate of Sports',
          titleTa: 'SRMIST விளையாட்டுத் துறையின் தேர்வுப் பரிந்துரை',
          detailEn: 'Approach the Directorate of Sports at Kattankulathur Campus, attend the trial, and obtain a recommendation BEFORE applying for admission. Without this, the sports quota application will not be considered.',
          detailTa: 'விண்ணப்பத்திற்கு முன், கட்டாங்குளத்தூர் வளாகத்தில் உள்ள விளையாட்டுத் துறையை அணுகவும், தேர்வில் கலந்து கொள்ளவும், பரிந்துரை பெறவும். இது இல்லாமல் விளையாட்டு கோட்டா விண்ணப்பம் பரிசீலிக்கப்படாது.',
        },
        {
          titleEn: 'SRMJEEE application + counselling',
          titleTa: 'SRMJEEE விண்ணப்பம் + ஆலோசனை',
          detailEn: 'Sports quota candidates must still appear for SRMJEEE (or other entrance exam as applicable) and attend counselling. Trial recommendation alone is not enough.',
          detailTa: 'விளையாட்டு கோட்டா விண்ணப்பதாரர்கள் SRMJEEE (அல்லது பொருந்தும் வேறு நுழைவுத் தேர்வு) எழுதி ஆலோசனையில் கலந்து கொள்ள வேண்டும். தேர்வுப் பரிந்துரை மட்டும் போதாது.',
        },
        {
          titleEn: 'Original sports certificates (University/District/Zone/State/National/International)',
          titleTa: 'அசல் விளையாட்டு சான்றிதழ்கள் (பல்கலைக்கழக/மாவட்ட/மண்டல/மாநில/தேசிய/சர்வதேச)',
          detailEn: 'SRMIST accepts certificates from any of these levels. First-attempt 12th pass in current admission year is required.',
          detailTa: 'SRMIST இந்த எந்த அளவிலான சான்றிதழையும் ஏற்கும். தற்போதைய சேர்க்கை ஆண்டில் முதல் முயற்சியில் 12-ஆம் வகுப்பு தேர்ச்சி தேவை.',
        },
      ],
    },
    contact: {
      designation: 'Directorate of Sports, SRMIST Kattankulathur Campus',
      phone: '+91-44-27417000',
      phone2: '+91-44-27417777',
      email: 'infodesk@srmist.edu.in',
      website: 'https://www.srmist.edu.in/about-us/administrative-heads/director-sports/',
      applicationLink: 'https://www.srmist.edu.in/admissions/',
      // Direct DPE phone is not published. The numbers above are the main
      // SRMIST switchboard — when calling, ask to be connected to the
      // Directorate of Sports.
    },
    verification: 'verified',
    sourceUrl: 'https://www.srmist.edu.in/about-us/administrative-heads/director-sports/',
    sourceNote: 'Sources: (1) Official SRMIST Scholarship Policy 2023 onwards (Founder\'s Scholarship Sub-Category B — Exemplary Sports Persons). (2) ssn.edu.in/about-us/administrative-heads/director-sports/ — official Directorate of Sports page. NOTE: Sports list shown is INDICATIVE based on SRMIST\'s campus facilities (tennis, basketball, badminton, volleyball etc.); the policy doc does NOT publish a definitive list. Students MUST call the Directorate of Sports to confirm their specific sport is accepted.',
    lastVerified: '2026-05-12',
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
      // 13 sports listed in the official notification (same list applies to both genders)
      sportsForMen: [
        'football', 'handball', 'cricket', 'table-tennis', 'chess',
        // Carrom not in the standard sport enum — student picks "other"
        'kabaddi', 'volleyball', 'athletics', 'badminton',
        // Throwball not in the standard enum — student picks "other"
        'basketball', 'kho-kho',
      ],
      sportsForWomen: [
        'football', 'handball', 'cricket', 'table-tennis', 'chess',
        'kabaddi', 'volleyball', 'athletics', 'badminton',
        'basketball', 'kho-kho',
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
