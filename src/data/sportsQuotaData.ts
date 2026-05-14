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

  // ─── VERIFIED: Jeppiaar Institute of Technology (JIT) ───────────────────
  // Source: Official JIT Sports Quota Admissions 2026-27 notification
  // (provided by team May 2026). Autonomous engineering college near Chennai
  // (Sriperumbudur area, Kanchipuram district). NAAC A+ and NBA accredited.
  // TNEA counselling code 1140. Single-day trial on 4 April 2026 — long past
  // by mid-May 2026, so this entry surfaces in the "Verified colleges" card
  // for late applicants who can call the coach to confirm next steps.
  {
    id: 'jit_kanchipuram',
    collegeName: 'Jeppiaar Institute of Technology (JIT)',
    collegeNameTa: 'ஜெப்பியார் தொழில்நுட்ப நிறுவனம் (JIT)',
    district: 'Kanchipuram',
    type: 'Autonomous',
    field: 'engineering',
    // JIT is Anna University-affiliated and admits via TNEA (counselling code
    // 1140); the sports-quota seats are filled through a direct trial held
    // before TNEA counselling. We mark counsellingBody as 'TNEA' so the
    // standard TNEA timeline still surfaces.
    counsellingBody: 'TNEA',
    overrides: {
      minLevel: 'district',
      sportsScholarship: '100% Scholarship based on sports certification. TNEA counselling code 1140. NAAC A+ and NBA-accredited autonomous engineering college near Chennai.',
      schemes: [
        '100% Sports Scholarship (based on certification level)',
        'TNEA counselling code 1140',
        'NAAC A+ and NBA accredited',
      ],
      selectionProcess: 'Sports Selection Trials held 4 April 2026 at JIT Ground. Time slots: certain sports (marked orange on the official poster) start at 3:00 PM; all other games start at 9:30 AM. Registration deadline was 31 March 2026. After the trial, sports-quota candidates also apply through TNEA counselling using code 1140. Contact the coach / physical directors below to confirm any late-application window.',
      // Cycling, Rowing not in the standard enum — mapped to 'other'.
      // Carrom not in the enum either — also 'other'.
      sportsForMen: [
        // Combat & Individual
        'boxing', 'taekwondo', 'wrestling', 'archery', 'shooting',
        'athletics', 'martial-arts', // Judo
        // Team Games
        'cricket', 'volleyball', 'kabaddi', 'basketball', 'kho-kho',
        'football',
        // Racket & Indoor
        'badminton', 'tennis', 'chess',
        // Cycling, Rowing, Carrom → 'other'
        'other',
      ],
      sportsForWomen: [
        'boxing', 'taekwondo', 'wrestling', 'archery', 'shooting',
        'athletics', 'martial-arts', // Judo
        'cricket', 'volleyball', 'kabaddi', 'basketball', 'kho-kho',
        'football',
        'badminton', 'tennis', 'chess',
        'other', // Cycling, Rowing, Carrom
      ],
      trialsMen: [
        // All on 4 April 2026 at JIT Ground.
        // The official poster splits start times into 9:30 AM (default) and
        // 3:00 PM (orange-marked games). The notification did not disclose
        // which specific games are in the 3:00 PM slot — we default to
        // 9:30 AM and direct candidates to confirm with the coach.
        { sport: 'boxing',       date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'taekwondo',    date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'martial-arts', date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' }, // Judo
        { sport: 'wrestling',    date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'archery',      date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'shooting',     date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'athletics',    date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'cricket',      date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'volleyball',   date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'kabaddi',      date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'basketball',   date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'kho-kho',      date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'football',     date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'badminton',    date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'tennis',       date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'chess',        date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'other',        date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' }, // Cycling, Rowing, Carrom
      ],
      trialsWomen: [
        { sport: 'boxing',       date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'taekwondo',    date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'martial-arts', date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' }, // Judo
        { sport: 'wrestling',    date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'archery',      date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'shooting',     date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'athletics',    date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'cricket',      date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'volleyball',   date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'kabaddi',      date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'basketball',   date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'kho-kho',      date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'football',     date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'badminton',    date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'tennis',       date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'chess',        date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' },
        { sport: 'other',        date: '2026-04-04', time: '9:30 AM / 3:00 PM (confirm with coach)', venue: 'JIT Ground' }, // Cycling, Rowing, Carrom
      ],
      extraDocuments: [
        {
          titleEn: 'Original sports certificates',
          titleTa: 'அசல் விளையாட்டு சான்றிதழ்கள்',
          detailEn: 'All achievement and participation certificates in original — scholarship is awarded based on the certification level.',
          detailTa: 'அனைத்து சாதனை மற்றும் பங்கேற்பு சான்றிதழ்களும் அசலில் — சான்றிதழ் அளவை அடிப்படையாகக் கொண்டே உதவித்தொகை வழங்கப்படும்.',
        },
        {
          titleEn: 'TNEA application',
          titleTa: 'TNEA விண்ணப்பம்',
          detailEn: 'Apply through TNEA using counselling code 1140. Sports-quota candidates need both the trial recommendation and the TNEA seat allotment.',
          detailTa: 'ஆலோசனை குறியீடு 1140 பயன்படுத்தி TNEA மூலம் விண்ணப்பிக்கவும். விளையாட்டு கோட்டா விண்ணப்பதாரர்களுக்கு தேர்வு பரிந்துரை மற்றும் TNEA இட ஒதுக்கீடு இரண்டும் தேவை.',
        },
        {
          titleEn: 'Aadhaar + 10th & 12th mark sheets',
          titleTa: 'ஆதார் + 10-ஆம் & 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்கள்',
          detailEn: 'Standard ID and academic transcripts for TNEA verification.',
          detailTa: 'TNEA சரிபார்ப்புக்கான வழக்கமான அடையாள ஆதாரம் மற்றும் கல்வி சான்றிதழ்கள்.',
        },
      ],
      applicationDeadline: '4 April 2026', // trial date (already past in May 2026)
    },
    contact: {
      sportsOfficer: 'M. Kumaravel',
      designation: 'Physical Director',
      phone: '+91-97862-07757',
      sportsOfficer2: 'V. Pratheep Kumar',
      designation2: 'Physical Director',
      phone2: '+91-90039-90413',
      website: 'https://www.jeppiaarinstitute.org',
    },
    verification: 'verified',
    sourceUrl: 'https://www.jeppiaarinstitute.org',
    sourceNote: 'Direct from Jeppiaar Institute of Technology (JIT) Sports Quota Admissions 2026-27 notification (provided by team May 2026). NAAC A+ and NBA accredited autonomous engineering college near Chennai, TNEA counselling code 1140. Sports trials held 4 April 2026 at JIT Ground (9:30 AM and 3:00 PM batches). 100% scholarship based on sports certification. Additional contact: Ravishankar (Coach) 9790756904; M. Kumaravel office 044-2715 9000.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: Vels Institute of Science, Technology & Advanced Studies (VISTAS) ──
  // Source: Official VISTAS Sports Quota Selection Trials 2026-27 notification
  // (provided by team May 2026). Multi-campus deemed-to-be university based at
  // Pallavaram, Chennai (Chengalpattu district), with additional campuses at
  // Thalambur, Periyapalayam, and Thiruvanmiyur. NAAC A++ accredited and
  // UGC Category 1 Institution. Three-day main trial (10-12 April) plus a
  // separate Football trial (7 May at Home Games Sports Arena, Thalambur).
  {
    id: 'vistas_pallavaram',
    collegeName: 'Vels Institute of Science, Technology & Advanced Studies (VISTAS)',
    collegeNameTa: 'வேல்ஸ் அறிவியல், தொழில்நுட்பம் & மேம்பட்ட படிப்புகள் நிறுவனம் (VISTAS)',
    district: 'Chengalpattu',
    type: 'Deemed',
    field: 'other', // multi-campus, multi-discipline (Engineering, Arts, Pharmacy, Management, etc.)
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district',
      sportsScholarship: 'Sports quota admissions across all VISTAS programmes (Engineering, Pharmacy, Management, Arts & Science). NAAC A++ accredited and ranked Category 1 Institution by UGC. Multi-campus access — main trial at Pallavaram, separate Football trial at the Home Games Sports Arena, Thalambur.',
      schemes: [
        'Sports quota admission across all VISTAS programmes',
        'NAAC A++ accredited',
        'UGC Category 1 Institution',
        'Multi-campus: Pallavaram, Thalambur, Periyapalayam, Thiruvanmiyur',
      ],
      selectionProcess: 'Three-day main sports trial: 10-12 April 2026, daily reporting at 7:00 AM at VISTAS Pallavaram. Sport-specific days: 10 April — Cricket, Athletics, Boxing, Judo, Mallakhamb. 11 April — Aquatics (Swimming), Fencing, Gymnastics, Volleyball, Tennis. 12 April — Kabaddi, Table Tennis, Badminton, Taekwondo, Wrestling. Separate Football trial: 7 May 2026, 7:00 AM reporting at Home Games Sports Arena, Thalambur. Registration via QR code on the official poster.',
      // Mallakhamb and Fencing not in the standard sport enum — mapped to 'other'.
      sportsForMen: [
        // 10 April
        'cricket', 'athletics', 'boxing', 'martial-arts', // Judo
        // 11 April
        'swimming', 'gymnastics', 'volleyball', 'tennis',
        // 12 April
        'kabaddi', 'table-tennis', 'badminton', 'taekwondo', 'wrestling',
        // 7 May (separate trial)
        'football',
        'other', // Mallakhamb + Fencing
      ],
      sportsForWomen: [
        'cricket', 'athletics', 'boxing', 'martial-arts',
        'swimming', 'gymnastics', 'volleyball', 'tennis',
        'kabaddi', 'table-tennis', 'badminton', 'taekwondo', 'wrestling',
        'football',
        'other', // Mallakhamb + Fencing
      ],
      trialsMen: [
        // 10 April 2026 — Pallavaram
        { sport: 'cricket',      date: '2026-04-10', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'athletics',    date: '2026-04-10', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'boxing',       date: '2026-04-10', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'martial-arts', date: '2026-04-10', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' }, // Judo
        { sport: 'other',        date: '2026-04-10', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' }, // Mallakhamb
        // 11 April 2026 — Pallavaram
        { sport: 'swimming',     date: '2026-04-11', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' }, // Aquatics
        { sport: 'gymnastics',   date: '2026-04-11', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'volleyball',   date: '2026-04-11', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'tennis',       date: '2026-04-11', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        // 12 April 2026 — Pallavaram
        { sport: 'kabaddi',      date: '2026-04-12', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'table-tennis', date: '2026-04-12', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'badminton',    date: '2026-04-12', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'taekwondo',    date: '2026-04-12', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'wrestling',    date: '2026-04-12', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        // 7 May 2026 — separate Football trial at Thalambur
        { sport: 'football',     date: '2026-05-07', time: '7:00 AM', venue: 'Home Games Sports Arena, Thalambur' },
      ],
      trialsWomen: [
        { sport: 'cricket',      date: '2026-04-10', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'athletics',    date: '2026-04-10', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'boxing',       date: '2026-04-10', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'martial-arts', date: '2026-04-10', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' }, // Judo
        { sport: 'other',        date: '2026-04-10', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' }, // Mallakhamb
        { sport: 'swimming',     date: '2026-04-11', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'gymnastics',   date: '2026-04-11', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'volleyball',   date: '2026-04-11', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'tennis',       date: '2026-04-11', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'kabaddi',      date: '2026-04-12', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'table-tennis', date: '2026-04-12', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'badminton',    date: '2026-04-12', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'taekwondo',    date: '2026-04-12', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'wrestling',    date: '2026-04-12', time: '7:00 AM', venue: 'VISTAS, Pallavaram (Chennai)' },
        { sport: 'football',     date: '2026-05-07', time: '7:00 AM', venue: 'Home Games Sports Arena, Thalambur' },
      ],
      extraDocuments: [
        {
          titleEn: 'Online registration via QR code',
          titleTa: 'QR கோடு மூலம் ஆன்லைன் பதிவு',
          detailEn: 'Scan the QR code on the official poster to register before reporting on your sport-specific trial date.',
          detailTa: 'உங்கள் விளையாட்டுக்கான தேர்வு நாளில் வருவதற்கு முன், அதிகாரப்பூர்வ சுவரொட்டியில் உள்ள QR கோடை ஸ்கேன் செய்து பதிவு செய்யவும்.',
        },
        {
          titleEn: 'Sports certificates (originals)',
          titleTa: 'விளையாட்டு சான்றிதழ்கள் (அசல்)',
          detailEn: 'All achievement and participation certificates — originals required at trial.',
          detailTa: 'அனைத்து சாதனை மற்றும் பங்கேற்பு சான்றிதழ்களும் — தேர்வில் அசல் தேவை.',
        },
        {
          titleEn: 'Aadhaar + academic mark sheets',
          titleTa: 'ஆதார் + கல்வி மதிப்பெண் சான்றிதழ்கள்',
          detailEn: 'Aadhaar card and original 10th, 12th (and UG marks card for PG applicants).',
          detailTa: 'ஆதார் அட்டை மற்றும் அசல் 10-ஆம், 12-ஆம் வகுப்பு (PG விண்ணப்பதாரர்களுக்கு UG மதிப்பெண் அட்டை).',
        },
      ],
      applicationDeadline: '10 April 2026', // first day of the main trial window
    },
    contact: {
      designation: 'VISTAS Sports Quota Admissions',
      phone: '+91-98840-22166',
      phone2: '+91-99767-73065',
      website: 'https://www.vistas.ac.in',
    },
    verification: 'verified',
    sourceUrl: 'https://www.vistas.ac.in',
    sourceNote: 'Direct from Vels Institute of Science, Technology & Advanced Studies (VISTAS) Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). NAAC A++ accredited, UGC Category 1 Institution. Main 3-day trial 10-12 April 2026 at Pallavaram, Chennai (7 AM reporting). Separate Football trial 7 May 2026, 7 AM at Home Games Sports Arena, Thalambur. Other campuses: Thalambur, Periyapalayam, Thiruvanmiyur. Additional contact: 7708667413. Registration via QR code on the official poster.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: VLB Janakiammal College of Arts and Science ──────────────
  // Source: Official VLB Janakiammal Sports Quota Selection Trials 2026-27
  // notification (provided by team May 2026). Autonomous arts & science
  // college in Kovaipudur, Coimbatore. Bharathiar University affiliated,
  // AICTE approved, NAAC re-accredited. Generous benefit package — Free
  // Education + Food + Accommodation for deserving men & women players.
  // Three-day trial 16-18 April 2026, 8 AM at the College Ground.
  {
    id: 'vlbj_coimbatore',
    collegeName: 'VLB Janakiammal College of Arts and Science',
    collegeNameTa: 'VLB ஜானகியம்மாள் கலை மற்றும் அறிவியல் கல்லூரி',
    district: 'Coimbatore',
    type: 'Autonomous',
    field: 'arts',
    counsellingBody: 'Direct',
    overrides: {
      // Notification specifies State / University / National / International
      // level achievers only — district players DO NOT qualify here.
      minLevel: 'state',
      sportsScholarship: 'Free Education + Free Food + Free Accommodation for deserving men & women players. Open to State, University, National, and International level achievers. Autonomous arts & science college, Bharathiar University affiliated, NAAC re-accredited.',
      schemes: [
        'Free Education (deserving players)',
        'Free Food (deserving players)',
        'Free Accommodation (deserving players)',
        'Open across 24 UG and 4 PG programmes including AI courses and V-ALPHA (MBA / BCA / BBA)',
      ],
      selectionProcess: 'Three-day offline selection trial held 16-18 April 2026, 8:00 AM daily at the College Ground (Kovaipudur, Coimbatore-641 042). Sport-specific days: 16 April — Football, Kho-Kho. 17 April — Handball, Kabaddi. 18 April — Cricket, Chess, Athletics, Swimming, Taekwondo, Best Physique, Weightlifting, Powerlifting, Boxing, Karate, Silambam. Bring original sports certificates. Open ONLY to State / University / National / International level achievers.',
      // Silambam and Best Physique not in standard enum — mapped to 'other'.
      sportsForMen: [
        // 16 April
        'football', 'kho-kho',
        // 17 April
        'handball', 'kabaddi',
        // 18 April
        'cricket', 'chess', 'athletics', 'swimming', 'taekwondo',
        'weightlifting', 'powerlifting', 'boxing', 'karate',
        'other', // Best Physique + Silambam
      ],
      sportsForWomen: [
        'football', 'kho-kho',
        'handball', 'kabaddi',
        'cricket', 'chess', 'athletics', 'swimming', 'taekwondo',
        'weightlifting', 'powerlifting', 'boxing', 'karate',
        'other', // Best Physique + Silambam
      ],
      trialsMen: [
        // Day 1 — 16 April 2026
        { sport: 'football',      date: '2026-04-16', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'kho-kho',       date: '2026-04-16', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        // Day 2 — 17 April 2026
        { sport: 'handball',      date: '2026-04-17', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'kabaddi',       date: '2026-04-17', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        // Day 3 — 18 April 2026
        { sport: 'cricket',       date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'chess',         date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'athletics',     date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'swimming',      date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'taekwondo',     date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'weightlifting', date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'powerlifting',  date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'boxing',        date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'karate',        date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'other',         date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' }, // Best Physique + Silambam
      ],
      trialsWomen: [
        { sport: 'football',      date: '2026-04-16', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'kho-kho',       date: '2026-04-16', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'handball',      date: '2026-04-17', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'kabaddi',       date: '2026-04-17', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'cricket',       date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'chess',         date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'athletics',     date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'swimming',      date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'taekwondo',     date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'weightlifting', date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'powerlifting',  date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'boxing',        date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'karate',        date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' },
        { sport: 'other',         date: '2026-04-18', time: '8:00 AM', venue: 'VLB Janakiammal College Ground, Kovaipudur, Coimbatore' }, // Best Physique + Silambam
      ],
      extraDocuments: [
        {
          titleEn: 'Original sports certificates (State / University / National / International)',
          titleTa: 'அசல் விளையாட்டு சான்றிதழ்கள் (மாநில / பல்கலைக்கழக / தேசிய / சர்வதேச)',
          detailEn: 'Originals are mandatory at the trial. Only State / University / National / International level certificates are accepted — district-level alone does NOT qualify.',
          detailTa: 'தேர்வில் அசல் கட்டாயம். மாநில / பல்கலைக்கழக / தேசிய / சர்வதேச அளவிலான சான்றிதழ்கள் மட்டுமே ஏற்கப்படும் — மாவட்ட அளவு மட்டும் தகுதியாகாது.',
        },
        {
          titleEn: '10th and 12th mark sheets',
          titleTa: '10-ஆம் & 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்கள்',
          detailEn: 'For UG admission. PG applicants should also bring graduation mark sheet.',
          detailTa: 'UG சேர்க்கைக்கு. PG விண்ணப்பதாரர்கள் பட்டப்படிப்பு மதிப்பெண் சான்றிதழையும் கொண்டு வரவும்.',
        },
        {
          titleEn: 'Aadhaar + passport photos',
          titleTa: 'ஆதார் + பாஸ்போர்ட் புகைப்படங்கள்',
          detailEn: 'Standard ID and multiple passport-size photos for registration.',
          detailTa: 'பதிவுக்கான வழக்கமான அடையாள ஆதாரம் மற்றும் பல பாஸ்போர்ட் அளவு புகைப்படங்கள்.',
        },
      ],
      applicationDeadline: '16 April 2026', // first day of the trial window
    },
    contact: {
      sportsOfficer: 'Mr. Pradheep',
      designation: 'Sports Quota Coordinator',
      phone: '+91-70923-48060',
      sportsOfficer2: 'Mr. Veerabathiran',
      designation2: 'Sports Quota Coordinator',
      phone2: '+91-82481-61717',
    },
    verification: 'verified',
    sourceNote: 'Direct from VLB Janakiammal College of Arts and Science Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). Autonomous arts & science college, Kovaipudur, Coimbatore-641 042. Bharathiar University affiliated, AICTE approved, NAAC re-accredited. Three-day trial 16-18 April 2026, 8 AM daily at the College Ground. Free Education + Food + Accommodation for deserving men & women players. Eligibility: State / University / National / International level only. 24 UG + 4 PG programmes including AI courses and V-ALPHA (MBA / BCA / BBA).',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: G T N Arts College (GTNAC) ────────────────────────────────
  // Source: Official GTN College Sports Quota Admission 2026-27 notification
  // (provided by team May 2026). Arts & Science college in Dindigul, Tamil
  // Nadu. Single-day trial on 12 April 2026 at 7:30 AM. Wide list of 26 sports.
  {
    id: 'gtn_dindigul',
    collegeName: 'G T N Arts College',
    collegeNameTa: 'ஜி.டி.என். கலைக் கல்லூரி',
    district: 'Dindigul',
    type: 'Private', // Aided arts & science college; not explicitly autonomous
    field: 'arts',
    counsellingBody: 'Direct',
    overrides: {
      // No minimum level specified in the notification — open trial. Defaulting
      // to 'district' so school-level players know to call before showing up.
      minLevel: 'district',
      sportsScholarship: 'Sports Quota Admission for 2026-27 — admission to UG and PG arts & commerce & science programmes at GTN Arts College, Dindigul. Trial-based selection, in-charge: Dr. Rajasekar.',
      schemes: [
        'Sports Quota Admission (UG and PG)',
        'Trial-based selection',
      ],
      selectionProcess: 'Single-day offline sports trial held 12 April 2026, 7:30 AM at GTN Arts College, Dindigul. All listed sports trialled the same day. Bring original sports certificates and academic mark sheets. Contact Dr. Rajasekar (in-charge) to confirm any late-application window.',
      // 26 sports listed in the notification. Cycling, Best Physique,
      // Traditional Archery, Skating not in the standard enum — mapped to
      // 'other' or the closest available sport.
      sportsForMen: [
        'basketball', 'handball', 'football', 'tennis', 'hockey',
        'boxing', 'martial-arts', // Judo
        'kabaddi', 'kho-kho', 'taekwondo', 'swimming', 'karate',
        'weightlifting', 'powerlifting', 'chess', 'yoga', 'shooting',
        'gymnastics', 'volleyball', 'table-tennis', 'cricket', 'athletics',
        'archery', // Traditional Archery
        'other', // Fencing, Skating, Best Physique
      ],
      sportsForWomen: [
        'basketball', 'handball', 'football', 'tennis', 'hockey',
        'boxing', 'martial-arts',
        'kabaddi', 'kho-kho', 'taekwondo', 'swimming', 'karate',
        'weightlifting', 'powerlifting', 'chess', 'yoga', 'shooting',
        'gymnastics', 'volleyball', 'table-tennis', 'cricket', 'athletics',
        'archery',
        'other', // Fencing, Skating, Best Physique
      ],
      trialsMen: [
        // All on 12 April 2026, 7:30 AM at GTN Arts College Ground.
        { sport: 'basketball',   date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'handball',     date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'football',     date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'tennis',       date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'hockey',       date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'boxing',       date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'martial-arts', date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' }, // Judo
        { sport: 'kabaddi',      date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'kho-kho',      date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'taekwondo',    date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'swimming',     date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'karate',       date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'weightlifting',date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'powerlifting', date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'chess',        date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'yoga',         date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'shooting',     date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'gymnastics',   date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'volleyball',   date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'table-tennis', date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'cricket',      date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'athletics',    date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'archery',      date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' }, // Traditional Archery
        { sport: 'other',        date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' }, // Fencing, Skating, Best Physique
      ],
      trialsWomen: [
        { sport: 'basketball',   date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'handball',     date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'football',     date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'tennis',       date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'hockey',       date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'boxing',       date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'martial-arts', date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'kabaddi',      date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'kho-kho',      date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'taekwondo',    date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'swimming',     date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'karate',       date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'weightlifting',date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'powerlifting', date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'chess',        date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'yoga',         date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'shooting',     date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'gymnastics',   date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'volleyball',   date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'table-tennis', date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'cricket',      date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'athletics',    date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'archery',      date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
        { sport: 'other',        date: '2026-04-12', time: '7:30 AM', venue: 'GTN Arts College, Dindigul' },
      ],
      extraDocuments: [
        {
          titleEn: 'Original sports certificates',
          titleTa: 'அசல் விளையாட்டு சான்றிதழ்கள்',
          detailEn: 'All achievement and participation certificates — originals for verification at trial.',
          detailTa: 'அனைத்து சாதனை மற்றும் பங்கேற்பு சான்றிதழ்கள் — தேர்வில் சரிபார்ப்புக்காக அசல்.',
        },
        {
          titleEn: '10th and 12th mark sheets',
          titleTa: '10-ஆம் & 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்கள்',
          detailEn: 'For UG admission. PG applicants should also bring graduation mark sheet.',
          detailTa: 'UG சேர்க்கைக்கு. PG விண்ணப்பதாரர்கள் பட்டப்படிப்பு மதிப்பெண் சான்றிதழையும் கொண்டு வரவும்.',
        },
      ],
      applicationDeadline: '12 April 2026',
    },
    contact: {
      sportsOfficer: 'Dr. Rajasekar',
      designation: 'Sports In-charge',
      phone: '+91-94441-20045',
    },
    verification: 'verified',
    sourceNote: 'Direct from G T N Arts College Sports Quota Admission 2026-27 notification (provided by team May 2026). Aided arts & science college in Dindigul, Tamil Nadu. Single-day sports trial held 12 April 2026, 7:30 AM. 26 sports including Best Physique, Traditional Archery, Skating, Fencing (mapped to nearest enum or "other"). In-charge: Dr. Rajasekar (9444120045).',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: Sri Shanmugha Educational Institutions (SSEI) ─────────────
  // Source: Official SSEI Sports Quota Selection Trials 2026-27 notification
  // (provided by team May 2026). Multi-disciplinary educational group on a
  // 130-acre campus at Pullipalayam, Sankari Taluk, Salem (Tamil Nadu).
  // Includes Engineering & Technology (Autonomous), Pharmacy, Nursing, Allied
  // Health Science, Medical Science & Research, and Health Inspector courses.
  // Single-day trial on 2 May 2026 at the SSEI Ground.
  {
    id: 'shanmugha_salem',
    collegeName: 'Sri Shanmugha Educational Institutions (SSEI)',
    collegeNameTa: 'ஸ்ரீ சண்முக கல்வி நிறுவனங்கள் (SSEI)',
    district: 'Salem',
    type: 'Private',
    field: 'engineering', // primary route (autonomous engineering college); group also covers Pharmacy, Nursing, Allied Health, Medical Science
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district',
      sportsScholarship: '100% Scholarship for eligible candidates. Admissions across the Sri Shanmugha Educational Institutions group: Engineering & Technology (Autonomous), Pharmacy, Nursing, Allied Health Science, Medical Science & Research, and Health Inspector courses.',
      schemes: [
        '100% Sports Scholarship (eligible candidates)',
        'Open across Engineering, Pharmacy, Nursing, Allied Health, Medical Science, Health Inspector',
        '130-acre campus, Pullipalayam, Sankari Taluk, Salem',
      ],
      selectionProcess: 'Single-day offline sports trial held 2 May 2026 at SSEI Ground (Pullipalayam, Sankari Taluk, Salem). All 7 listed sports trialled the same day. Open for both Men and Women. Online registration via QR code on the official poster. Contact 9688728161 for current admission status.',
      sportsForMen: [
        'kabaddi', 'hockey', 'cricket', 'athletics', 'volleyball',
        'badminton', 'football',
      ],
      sportsForWomen: [
        'kabaddi', 'hockey', 'cricket', 'athletics', 'volleyball',
        'badminton', 'football',
      ],
      trialsMen: [
        { sport: 'kabaddi',    date: '2026-05-02', time: 'Morning (confirm)', venue: 'SSEI Ground, Pullipalayam, Sankari, Salem' },
        { sport: 'hockey',     date: '2026-05-02', time: 'Morning (confirm)', venue: 'SSEI Ground, Pullipalayam, Sankari, Salem' },
        { sport: 'cricket',    date: '2026-05-02', time: 'Morning (confirm)', venue: 'SSEI Ground, Pullipalayam, Sankari, Salem' },
        { sport: 'athletics',  date: '2026-05-02', time: 'Morning (confirm)', venue: 'SSEI Ground, Pullipalayam, Sankari, Salem' },
        { sport: 'volleyball', date: '2026-05-02', time: 'Morning (confirm)', venue: 'SSEI Ground, Pullipalayam, Sankari, Salem' },
        { sport: 'badminton',  date: '2026-05-02', time: 'Morning (confirm)', venue: 'SSEI Ground, Pullipalayam, Sankari, Salem' },
        { sport: 'football',   date: '2026-05-02', time: 'Morning (confirm)', venue: 'SSEI Ground, Pullipalayam, Sankari, Salem' },
      ],
      trialsWomen: [
        { sport: 'kabaddi',    date: '2026-05-02', time: 'Morning (confirm)', venue: 'SSEI Ground, Pullipalayam, Sankari, Salem' },
        { sport: 'hockey',     date: '2026-05-02', time: 'Morning (confirm)', venue: 'SSEI Ground, Pullipalayam, Sankari, Salem' },
        { sport: 'cricket',    date: '2026-05-02', time: 'Morning (confirm)', venue: 'SSEI Ground, Pullipalayam, Sankari, Salem' },
        { sport: 'athletics',  date: '2026-05-02', time: 'Morning (confirm)', venue: 'SSEI Ground, Pullipalayam, Sankari, Salem' },
        { sport: 'volleyball', date: '2026-05-02', time: 'Morning (confirm)', venue: 'SSEI Ground, Pullipalayam, Sankari, Salem' },
        { sport: 'badminton',  date: '2026-05-02', time: 'Morning (confirm)', venue: 'SSEI Ground, Pullipalayam, Sankari, Salem' },
        { sport: 'football',   date: '2026-05-02', time: 'Morning (confirm)', venue: 'SSEI Ground, Pullipalayam, Sankari, Salem' },
      ],
      extraDocuments: [
        {
          titleEn: 'Online registration via QR code',
          titleTa: 'QR கோடு மூலம் ஆன்லைன் பதிவு',
          detailEn: 'Scan the QR code on the bottom left of the official poster to register before the trial date.',
          detailTa: 'தேர்வு நாளுக்கு முன், அதிகாரப்பூர்வ சுவரொட்டியின் கீழ்-இடதுபுறத்தில் உள்ள QR கோடை ஸ்கேன் செய்து பதிவு செய்யவும்.',
        },
        {
          titleEn: 'Sports certificates (originals)',
          titleTa: 'விளையாட்டு சான்றிதழ்கள் (அசல்)',
          detailEn: 'All achievement and participation certificates in original.',
          detailTa: 'அனைத்து சாதனை மற்றும் பங்கேற்பு சான்றிதழ்கள் அசலில்.',
        },
        {
          titleEn: 'Aadhaar + academic certificates',
          titleTa: 'ஆதார் + கல்விச் சான்றிதழ்கள்',
          detailEn: 'Aadhaar card and 10th, 12th (and UG for PG applicants) mark sheets.',
          detailTa: 'ஆதார் அட்டை மற்றும் 10-ஆம், 12-ஆம் (PG விண்ணப்பதாரர்களுக்கு UG) வகுப்பு மதிப்பெண் சான்றிதழ்கள்.',
        },
      ],
      applicationDeadline: '2 May 2026',
    },
    contact: {
      designation: 'Sri Shanmugha Educational Institutions — Sports Admissions',
      phone: '+91-96887-28161',
      website: 'https://shanmugha.edu.in',
    },
    verification: 'verified',
    sourceUrl: 'https://shanmugha.edu.in',
    sourceNote: 'Direct from Sri Shanmugha Educational Institutions (SSEI) Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). 130-acre campus, Pullipalayam, Sankari Taluk, Salem, Tamil Nadu. Engineering & Technology (Autonomous), Pharmacy, Nursing, Allied Health Science, Medical Science & Research, Health Inspector. Single-day trial on 2 May 2026 at SSEI Ground. 100% scholarship for eligible candidates. 7 sports (Kabaddi, Hockey, Cricket, Athletics, Volleyball, Badminton, Football) for Men & Women. Registration via QR code on the official poster. More info: 9688728161.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: GEMS Arts and Science College (Autonomous) ────────────────
  // Source: Official GEMS Sports Quota Selection Trials 2026-27 notification
  // (provided by team May 2026). NAAC-accredited (First Cycle, 'A' Grade)
  // autonomous arts & science college in Ramapuram, Malappuram district,
  // Kerala (affiliated to the University of Calicut). Two-day trial held
  // 29-30 April 2026, 9 AM daily. Open for both Men and Women.
  {
    id: 'gems_malappuram',
    collegeName: 'GEMS Arts and Science College (Autonomous)',
    collegeNameTa: 'GEMS கலை மற்றும் அறிவியல் கல்லூரி (தன்னாட்சி)',
    district: 'Malappuram',
    type: 'Autonomous',
    field: 'arts',
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district',
      sportsScholarship: 'Sports Quota Admission 2026-27 — admissions across UG and PG programmes at GEMS Arts and Science College (Autonomous), Ramapuram, Malappuram, Kerala. NAAC-accredited (First Cycle) with "A" Grade. ISO 9001:2015 certified institution. Affiliated to University of Calicut.',
      schemes: [
        'Sports Quota Admission (UG and PG)',
        'NAAC "A" Grade (First Cycle)',
        'ISO 9001:2015 certified',
        'Affiliated to University of Calicut',
      ],
      selectionProcess: 'Two-day offline sports trial held 29-30 April 2026, 9:00 AM daily at GEMS Arts and Science College, Ramapuram (Kadungapuram P.O.), Malappuram, Kerala. Day 1 (29 April): Football, Basketball, Athletics, Badminton, Tug of War. Day 2 (30 April): Cricket, Kabaddi, Karate, Volleyball, Table Tennis, Chess. Open for both Men & Women. Online registration via QR code on the official poster.',
      // Tug of War not in the standard sport enum — mapped to 'other'.
      sportsForMen: [
        // 29 April
        'football', 'basketball', 'athletics', 'badminton',
        // 30 April
        'cricket', 'kabaddi', 'karate', 'volleyball', 'table-tennis', 'chess',
        'other', // Tug of War
      ],
      sportsForWomen: [
        'football', 'basketball', 'athletics', 'badminton',
        'cricket', 'kabaddi', 'karate', 'volleyball', 'table-tennis', 'chess',
        'other', // Tug of War
      ],
      trialsMen: [
        // Day 1 — 29 April 2026
        { sport: 'football',     date: '2026-04-29', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
        { sport: 'basketball',   date: '2026-04-29', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
        { sport: 'athletics',    date: '2026-04-29', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
        { sport: 'badminton',    date: '2026-04-29', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
        { sport: 'other',        date: '2026-04-29', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' }, // Tug of War
        // Day 2 — 30 April 2026
        { sport: 'cricket',      date: '2026-04-30', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
        { sport: 'kabaddi',      date: '2026-04-30', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
        { sport: 'karate',       date: '2026-04-30', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
        { sport: 'volleyball',   date: '2026-04-30', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
        { sport: 'table-tennis', date: '2026-04-30', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
        { sport: 'chess',        date: '2026-04-30', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
      ],
      trialsWomen: [
        { sport: 'football',     date: '2026-04-29', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
        { sport: 'basketball',   date: '2026-04-29', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
        { sport: 'athletics',    date: '2026-04-29', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
        { sport: 'badminton',    date: '2026-04-29', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
        { sport: 'other',        date: '2026-04-29', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' }, // Tug of War
        { sport: 'cricket',      date: '2026-04-30', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
        { sport: 'kabaddi',      date: '2026-04-30', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
        { sport: 'karate',       date: '2026-04-30', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
        { sport: 'volleyball',   date: '2026-04-30', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
        { sport: 'table-tennis', date: '2026-04-30', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
        { sport: 'chess',        date: '2026-04-30', time: '9:00 AM', venue: 'GEMS Arts and Science College, Ramapuram, Malappuram' },
      ],
      extraDocuments: [
        {
          titleEn: 'Online registration via QR code',
          titleTa: 'QR கோடு மூலம் ஆன்லைன் பதிவு',
          detailEn: 'Scan the QR code on the official poster to register before the trial date.',
          detailTa: 'தேர்வு நாளுக்கு முன், அதிகாரப்பூர்வ சுவரொட்டியில் உள்ள QR கோடை ஸ்கேன் செய்து பதிவு செய்யவும்.',
        },
        {
          titleEn: 'Sports certificates (originals)',
          titleTa: 'விளையாட்டு சான்றிதழ்கள் (அசல்)',
          detailEn: 'All achievement and participation certificates in original.',
          detailTa: 'அனைத்து சாதனை மற்றும் பங்கேற்பு சான்றிதழ்கள் அசலில்.',
        },
        {
          titleEn: 'Plus Two / UG mark sheets',
          titleTa: 'பிளஸ் டூ / UG மதிப்பெண் சான்றிதழ்கள்',
          detailEn: '10th, +2, and UG (for PG applicants) original mark sheets.',
          detailTa: '10-ஆம் வகுப்பு, +2, மற்றும் UG (PG விண்ணப்பதாரர்களுக்கு) அசல் மதிப்பெண் சான்றிதழ்கள்.',
        },
      ],
      applicationDeadline: '29 April 2026', // first day of the trial window
    },
    contact: {
      designation: 'GEMS Arts and Science College — Sports Admissions',
      phone: '+91-94470-17280',
      phone2: '+91-77361-45972',
      website: 'https://gemsasc.ac.in',
      applicationLink: 'https://digivista.gemsasc.ac.in/online-admission/#/sign-in',
    },
    verification: 'verified',
    sourceUrl: 'https://gemsasc.ac.in',
    sourceNote: 'Direct from GEMS Arts and Science College (Autonomous) Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). NAAC-accredited (First Cycle, "A" Grade), ISO 9001:2015 certified. Autonomous arts & science college affiliated to University of Calicut, located at Kadungapuram P.O., Ramapuram, Malappuram, Kerala 679321. Two-day trial 29-30 April 2026, 9 AM daily. Day 1: Football, Basketball, Athletics, Badminton, Tug of War. Day 2: Cricket, Kabaddi, Karate, Volleyball, Table Tennis, Chess. Open for Men & Women. Online application via the College portal; registration via QR code on the official poster.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: St. Joseph's College (Autonomous), Trichy ─────────────────
  // Source: Official St. Joseph's College Sports Quota Admission notification
  // (provided by team May 2026). NAAC A++ (Cycle IV), Heritage Status, awarded
  // "College with Potential for Excellence". Located at Trichy-620002, Tamil
  // Nadu. NOTE: The notification provided lists 2025 (last cycle) trial
  // dates, not 2026-27 dates — we capture the historical schedule and the
  // contact information so candidates can call the Department of Physical
  // Education for the current 2026-27 trial window. We intentionally OMIT
  // applicationDeadline and trialsMen/Women so the splash card shows the
  // generic "Direct admission · Contact college" label instead of surfacing
  // last year's dates as if they were live.
  {
    id: 'stjosephs_trichy',
    collegeName: "St. Joseph's College (Autonomous), Trichy",
    collegeNameTa: 'புனித ஜோசப் கல்லூரி (தன்னாட்சி), திருச்சி',
    district: 'Tiruchirappalli',
    type: 'Autonomous',
    field: 'arts',
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district',
      sportsScholarship: 'Up to 100% Scholarship on college fees and hostel fees for meritorious sports players. St. Joseph\'s College is NAAC A++ (Cycle IV) accredited, holds Heritage Status, and is awarded "College with Potential for Excellence" by UGC.',
      schemes: [
        'Up to 100% Scholarship on college fees',
        'Up to 100% Scholarship on hostel fees',
        'NAAC A++ (Cycle IV) accredited',
        'Heritage Status + Potential for Excellence',
      ],
      // We list the previous-cycle (2025) schedule here as historical context
      // — the 2026-27 dates have not yet been published. Candidates should
      // call the contacts below to confirm the current trial schedule.
      selectionProcess: 'Direct admission via Department of Physical Education at St. Joseph\'s College, Trichy. PREVIOUS CYCLE (2025) trial schedule was: Cricket 3 April 8:00 AM, Football 4 April 7:00 AM, Ball Badminton 15 April 8:00 AM, Basketball 16 April 7:00 AM, Volleyball 17 April 7:00 AM, Kabaddi 19 April 7:00 AM. The 2026-27 dates have not been published in the available notification — contact Dr. A. Prem Edwin (9789697373) or Dr. S. Renilton Breeze (9944351303) to confirm the current trial schedule. Bring all original academic and sports certificates for verification.',
      sportsForMen: [
        'cricket', 'football', 'ball-badminton', 'basketball',
        'volleyball', 'kabaddi',
      ],
      sportsForWomen: [
        'cricket', 'football', 'ball-badminton', 'basketball',
        'volleyball', 'kabaddi',
      ],
      // applicationDeadline + trialsMen/trialsWomen INTENTIONALLY OMITTED —
      // the 2026-27 dates aren't published. See selectionProcess for the
      // 2025 historical schedule as a guide.
      extraDocuments: [
        {
          titleEn: 'Original academic certificates',
          titleTa: 'அசல் கல்விச் சான்றிதழ்கள்',
          detailEn: 'All academic certificates (10th, 12th, UG marks card for PG) in original for verification.',
          detailTa: 'அனைத்து கல்விச் சான்றிதழ்களும் (10-ஆம், 12-ஆம் வகுப்பு, PG-க்கு UG மதிப்பெண் அட்டை) சரிபார்ப்புக்காக அசலில்.',
        },
        {
          titleEn: 'Original sports certificates',
          titleTa: 'அசல் விளையாட்டு சான்றிதழ்கள்',
          detailEn: 'All sports achievement certificates in original — required for the scholarship tier.',
          detailTa: 'அனைத்து விளையாட்டு சாதனை சான்றிதழ்களும் அசலில் — உதவித்தொகை அளவுக்குத் தேவை.',
        },
      ],
    },
    contact: {
      sportsOfficer: 'Dr. A. Prem Edwin',
      designation: 'Director of Physical Education',
      phone: '+91-97896-97373',
      sportsOfficer2: 'Dr. S. Renilton Breeze',
      designation2: 'Asst. Director of Physical Education',
      phone2: '+91-99443-51303',
    },
    verification: 'verified',
    sourceNote: 'Direct from St. Joseph\'s College (Autonomous), Trichy Sports Quota Admission notification (provided by team May 2026). NAAC A++ (Cycle IV), Heritage Status, "College with Potential for Excellence". Located at Trichy-620002. Up to 100% Scholarship on college and hostel fees for meritorious sports players. Sports: Cricket, Football, Ball Badminton, Basketball, Volleyball, Kabaddi. IMPORTANT: The notification provided lists 2025 (last cycle) trial dates — 2026-27 schedule must be confirmed by calling Dr. A. Prem Edwin (9789697373) or Dr. S. Renilton Breeze (9944351303).',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: Dhaanish Ahmed College of Engineering (DACE) ─────────────
  // Source: Official DACE TAIIKU BECA 2026 sports quota notification
  // (provided by team May 2026). NAAC A+ accredited autonomous engineering
  // college, Anna University affiliated, AICTE approved. TNEA counselling
  // code 1424. Open to School / District / State / National-level players —
  // this is a college-run direct sports trial separate from TNEA's universal
  // 2% sports quota (which only accepts State+). No specific trial date in
  // the notification — students register via the QR code / Bitly link.
  {
    id: 'dace_kanchipuram',
    collegeName: 'Dhaanish Ahmed College of Engineering (DACE)',
    collegeNameTa: 'தானிஷ் அஹமது பொறியியல் கல்லூரி (DACE)',
    district: 'Kanchipuram',
    type: 'Autonomous',
    field: 'engineering',
    // DACE admits via TNEA (counselling code 1424). The TAIIKU BECA 2026
    // trial is a college-run direct path on top of TNEA — accepts even
    // school-level achievers, which the universal TNEA quota would not.
    counsellingBody: 'TNEA',
    overrides: {
      // Notification explicitly accepts School / District / State / National
      minLevel: 'school',
      sportsScholarship: 'Up to 100% Sports Scholarship for eligible players selected through TAIIKU BECA 2026. NAAC A+ accredited autonomous engineering college, Anna University affiliated, AICTE approved.',
      schemes: [
        'Up to 100% Sports Scholarship (TAIIKU BECA 2026)',
        'TNEA counselling code 1424',
        'NAAC A+, Anna University affiliated, AICTE approved',
        'School / District / State / National level all accepted (college direct path)',
      ],
      selectionProcess: 'TAIIKU BECA 2026 — DACE\'s college-run sports trial open to players from School, District, State, or National levels (broader than the TNEA universal sports quota which only accepts State+). Online registration via QR code or the official link: https://bit.ly/4rk8gUR. Selection-trial date and venue to be confirmed by the Physical Director — call Dr. S Dhayanithi (9094883773) for the current schedule. Sports quota candidates also need to apply through TNEA using counselling code 1424.',
      sportsForMen: [
        'cricket', 'volleyball', 'football', 'athletics', 'kabaddi',
      ],
      sportsForWomen: [
        'cricket', 'volleyball', 'football', 'athletics', 'kabaddi',
      ],
      // No specific trial date in the notification — applicationDeadline and
      // trialsMen/trialsWomen intentionally omitted so the splash card shows
      // the standard "Via TNEA · Counselling Jul 2026" label.
      extraDocuments: [
        {
          titleEn: 'Sports achievement certificate (original)',
          titleTa: 'விளையாட்டு சாதனை சான்றிதழ் (அசல்)',
          detailEn: 'Valid sports certificate is mandatory — players from School/District/State/National levels all eligible.',
          detailTa: 'செல்லுபடியாகும் விளையாட்டு சான்றிதழ் கட்டாயம் — பள்ளி / மாவட்ட / மாநில / தேசிய அளவிலான ஆட்டக்காரர்கள் எல்லோரும் தகுதியானவர்கள்.',
        },
        {
          titleEn: 'Transfer Certificate (TC)',
          titleTa: 'மாற்றுச் சான்றிதழ் (TC)',
          detailEn: 'From last attended school/college.',
          detailTa: 'கடைசியாக பயின்ற பள்ளி / கல்லூரியிலிருந்து.',
        },
        {
          titleEn: '2 passport-size photos',
          titleTa: '2 பாஸ்போர்ட் அளவு புகைப்படங்கள்',
          detailEn: 'Two recent passport-size photographs.',
          detailTa: 'இரண்டு சமீபத்திய பாஸ்போர்ட் அளவு புகைப்படங்கள்.',
        },
        {
          titleEn: 'E-Community Certificate',
          titleTa: 'மின்-சமூகம் சான்றிதழ்',
          detailEn: 'Online Community Certificate (E-Community) from the Tamil Nadu government portal.',
          detailTa: 'தமிழ்நாடு அரசின் இணையதளத்தில் இருந்து ஆன்லைன் சமூக சான்றிதழ் (மின்-சமூகம்).',
        },
        {
          titleEn: '10th and 12th mark sheets (copies)',
          titleTa: '10-ஆம் & 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்களின் நகல்கள்',
          detailEn: 'Photocopies of 10th and 12th mark sheets.',
          detailTa: '10-ஆம் & 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்களின் நகல்கள்.',
        },
        {
          titleEn: 'Online registration (QR code / bit.ly link)',
          titleTa: 'ஆன்லைன் பதிவு (QR கோடு / bit.ly இணைப்பு)',
          detailEn: 'Register at https://bit.ly/4rk8gUR or scan the QR code on the official poster.',
          detailTa: 'https://bit.ly/4rk8gUR-ல் பதிவு செய்யவும் அல்லது அதிகாரப்பூர்வ சுவரொட்டியில் உள்ள QR கோடை ஸ்கேன் செய்யவும்.',
        },
      ],
    },
    contact: {
      sportsOfficer: 'Dr. S Dhayanithi',
      designation: 'Physical Director',
      phone: '+91-90948-83773',
      sportsOfficer2: 'Mr. C Elayaraja',
      designation2: 'Admission Counselor',
      phone2: '+91-87786-12120',
      applicationLink: 'https://bit.ly/4rk8gUR',
    },
    verification: 'verified',
    sourceNote: 'Direct from Dhaanish Ahmed College of Engineering (DACE) TAIIKU BECA 2026 Sports Quota notification (provided by team May 2026). NAAC A+ accredited autonomous engineering college, Anna University affiliated, AICTE approved. TNEA counselling code 1424. Open to School / District / State / National level players in Cricket, Volleyball, Football, Athletics, Kabaddi. Up to 100% Sports Scholarship for eligible players. Online registration via QR code or https://bit.ly/4rk8gUR. Contacts: Dr. S Dhayanithi (PD) 9094883773; Mr. C Elayaraja (Admission Counselor) 8778612120.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: Annai Arts and Science College, Harur ─────────────────────
  // Source: Official Annai College Sports Quota Selection Trials 2026-27
  // notification (provided by team May 2026). Located at Salem Main Road,
  // Nambipatti, Harur, Dharmapuri district. Tiered scholarship: State level
  // = 100%, District level = 50%. Free-entry team-format trial (volleyball,
  // kabaddi, basketball — minimum 3 members per team). Trial dates 25-26
  // April 2026; cash prizes of ₹4000 (1st) / ₹2000 (2nd) for winning teams.
  {
    id: 'annai_dharmapuri',
    collegeName: 'Annai Arts and Science College, Harur',
    collegeNameTa: 'அன்னை கலை மற்றும் அறிவியல் கல்லூரி, ஹாரூர்',
    district: 'Dharmapuri',
    type: 'Private',
    field: 'arts',
    counsellingBody: 'Direct',
    overrides: {
      // Tiered: District = 50% scholarship; State = 100% scholarship.
      // District is the lower acceptance level.
      minLevel: 'district',
      sportsScholarship: 'Tiered Sports Scholarship — State Level = 100% Scholarship, District Level = 50% Scholarship. Cash prizes for winning teams: ₹4000 (1st), ₹2000 (2nd). Free entry. Open for Men & Women across Volleyball, Kabaddi, and Basketball.',
      schemes: [
        '100% Scholarship for State level achievers',
        '50% Scholarship for District level achievers',
        '₹4000 prize (1st), ₹2000 prize (2nd) for winning teams',
        'Free entry · Team format (min 3 members per team)',
      ],
      selectionProcess: 'Two-day team-format selection trial held 25 & 26 April 2026 at Annai College Campus, Salem Main Road, Nambipatti, Harur, Dharmapuri-636 903. Sports: Volleyball, Kabaddi, Basketball — for both Men and Women. Each team must consist of a minimum of 3 members who passed the 12th grade in 2025 or 2026. Bring original Aadhaar card (photocopies and mobile photos NOT accepted). Must attend in proper game kit. Entry is free.',
      sportsForMen: [
        'volleyball', 'kabaddi', 'basketball',
      ],
      sportsForWomen: [
        'volleyball', 'kabaddi', 'basketball',
      ],
      trialsMen: [
        { sport: 'volleyball', date: '2026-04-25', time: 'See poster', venue: 'Annai College Campus, Salem Main Road, Nambipatti, Harur' },
        { sport: 'kabaddi',    date: '2026-04-25', time: 'See poster', venue: 'Annai College Campus, Salem Main Road, Nambipatti, Harur' },
        { sport: 'basketball', date: '2026-04-25', time: 'See poster', venue: 'Annai College Campus, Salem Main Road, Nambipatti, Harur' },
        { sport: 'volleyball', date: '2026-04-26', time: 'See poster', venue: 'Annai College Campus, Salem Main Road, Nambipatti, Harur' },
        { sport: 'kabaddi',    date: '2026-04-26', time: 'See poster', venue: 'Annai College Campus, Salem Main Road, Nambipatti, Harur' },
        { sport: 'basketball', date: '2026-04-26', time: 'See poster', venue: 'Annai College Campus, Salem Main Road, Nambipatti, Harur' },
      ],
      trialsWomen: [
        { sport: 'volleyball', date: '2026-04-25', time: 'See poster', venue: 'Annai College Campus, Salem Main Road, Nambipatti, Harur' },
        { sport: 'kabaddi',    date: '2026-04-25', time: 'See poster', venue: 'Annai College Campus, Salem Main Road, Nambipatti, Harur' },
        { sport: 'basketball', date: '2026-04-25', time: 'See poster', venue: 'Annai College Campus, Salem Main Road, Nambipatti, Harur' },
        { sport: 'volleyball', date: '2026-04-26', time: 'See poster', venue: 'Annai College Campus, Salem Main Road, Nambipatti, Harur' },
        { sport: 'kabaddi',    date: '2026-04-26', time: 'See poster', venue: 'Annai College Campus, Salem Main Road, Nambipatti, Harur' },
        { sport: 'basketball', date: '2026-04-26', time: 'See poster', venue: 'Annai College Campus, Salem Main Road, Nambipatti, Harur' },
      ],
      extraDocuments: [
        {
          titleEn: 'Original Aadhaar card',
          titleTa: 'அசல் ஆதார் அட்டை',
          detailEn: 'STRICT requirement — original Aadhaar card only. Photocopies and mobile photos will NOT be accepted on the trial day.',
          detailTa: 'கடுமையான விதி — அசல் ஆதார் அட்டை மட்டுமே. நகல்கள் மற்றும் மொபைல் புகைப்படங்கள் தேர்வு நாளில் ஏற்கப்படாது.',
        },
        {
          titleEn: 'Original sports certificates',
          titleTa: 'அசல் விளையாட்டு சான்றிதழ்கள்',
          detailEn: 'Sports achievement certificates — State level = 100% scholarship, District level = 50%.',
          detailTa: 'விளையாட்டு சாதனை சான்றிதழ்கள் — மாநில அளவு = 100% உதவித்தொகை, மாவட்ட அளவு = 50%.',
        },
        {
          titleEn: '12th-grade pass certificate (2025 or 2026)',
          titleTa: '12-ஆம் வகுப்பு தேர்ச்சிச் சான்றிதழ் (2025 அல்லது 2026)',
          detailEn: 'Must have passed 12th grade in 2025 or 2026. Minimum 3 team members required per team.',
          detailTa: '2025 அல்லது 2026-ல் 12-ஆம் வகுப்பு தேர்ச்சி பெற்றிருக்க வேண்டும். ஒரு அணியில் குறைந்தபட்சம் 3 உறுப்பினர்கள் தேவை.',
        },
        {
          titleEn: 'Proper game kit',
          titleTa: 'பொருத்தமான விளையாட்டு உடை',
          detailEn: 'Attend in proper sports/game uniform.',
          detailTa: 'பொருத்தமான விளையாட்டு / கேம் உடையில் வரவும்.',
        },
      ],
      applicationDeadline: '25 April 2026', // first day of the trial window
    },
    contact: {
      sportsOfficer: 'Team Registration',
      designation: 'Sports Trials Coordinator',
      phone: '+91-95002-03612',
      sportsOfficer2: 'General Admissions',
      designation2: 'Admissions Office',
      phone2: '+91-94865-77717',
    },
    verification: 'verified',
    sourceNote: 'Direct from Annai Arts and Science College, Harur Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). Salem Main Road, Nambipatti, Harur, Dharmapuri-636 903. Two-day team-format selection trial 25-26 April 2026. Sports: Volleyball, Kabaddi, Basketball (M&W). Tiered scholarship: State = 100%, District = 50%. ₹4000 / ₹2000 cash prizes. Free entry. Team min 3 members, 12th-grade pass in 2025 or 2026 required. STRICT: bring ORIGINAL Aadhaar (no photocopy or mobile photo). 24+ UG/PG programmes including B.Sc. AI & Data Science, Hotel Management, Clinical Lab Tech, and a Ph.D. in Tamil.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: Jawahar Science College, Neyveli ─────────────────────────
  // Source: Official Jawahar Science College Sports Quota Admission Trials
  // 2026-27 notification (provided by team May 2026). Affiliated to Annamalai
  // University. Managed by Jawahar Education Society. Located at Block-14,
  // Neyveli-3 (Cuddalore district). Two-day trial 17-18 April 2026, 8:30 AM
  // daily. Wide list of sports (20+) including Pencak Silat, Mallakhamb, and
  // Best Physique — mapped to "Other sport" in the eligibility flow.
  {
    id: 'jawahar_neyveli',
    collegeName: 'Jawahar Science College, Neyveli',
    collegeNameTa: 'ஜவஹர் அறிவியல் கல்லூரி, நெய்வேலி',
    district: 'Cuddalore',
    type: 'Private',
    field: 'arts',
    counsellingBody: 'Direct',
    overrides: {
      // Notification accepts International / National / SGFI / State / District / Zonal —
      // setting min level to 'district' since district achievers are explicitly listed.
      minLevel: 'district',
      sportsScholarship: 'Special fees concession for selected sports admissions. Limited seats on First Come – First Served basis. Affiliated to Annamalai University, managed by Jawahar Education Society. UG programmes (B.A. English, B.Com, BBA, BCA, B.Sc.) and PG programmes (M.A., M.Com, M.S.W, M.Sc.) available.',
      schemes: [
        'Special fees concession (sports quota)',
        'Limited seats — First Come, First Served',
        'Open to International / National / SGFI / State / District / Zonal level achievers',
        'Affiliated to Annamalai University',
      ],
      selectionProcess: 'Two-day offline sports trial held 17-18 April 2026, 8:30 AM daily at Jawahar Science College, Block-14, Neyveli-3. Sport-specific days: 17 April — Cricket, Football, Handball, Hockey, Kabaddi, Kho-Kho, Volleyball, Judo. 18 April — Athletics, Archery, Pencak Silat, Ball Badminton, Badminton, Basketball, Best Physique, Mallakhamb, Swimming, Table Tennis, Taekwondo, Weight Lifting. Open for both Men & Women. Online application available — contact 9080685043 for the application link.',
      // Pencak Silat, Mallakhamb, Best Physique not in standard enum — mapped to 'other'.
      // Judo → 'martial-arts'.
      sportsForMen: [
        // 17 April
        'cricket', 'football', 'handball', 'hockey', 'kabaddi', 'kho-kho',
        'volleyball', 'martial-arts', // Judo
        // 18 April
        'athletics', 'archery', 'ball-badminton', 'badminton', 'basketball',
        'swimming', 'table-tennis', 'taekwondo', 'weightlifting',
        'other', // Pencak Silat, Mallakhamb, Best Physique
      ],
      sportsForWomen: [
        'cricket', 'football', 'handball', 'hockey', 'kabaddi', 'kho-kho',
        'volleyball', 'martial-arts',
        'athletics', 'archery', 'ball-badminton', 'badminton', 'basketball',
        'swimming', 'table-tennis', 'taekwondo', 'weightlifting',
        'other',
      ],
      trialsMen: [
        // Day 1 — 17 April 2026
        { sport: 'cricket',      date: '2026-04-17', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'football',     date: '2026-04-17', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'handball',     date: '2026-04-17', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'hockey',       date: '2026-04-17', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'kabaddi',      date: '2026-04-17', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'kho-kho',      date: '2026-04-17', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'volleyball',   date: '2026-04-17', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'martial-arts', date: '2026-04-17', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' }, // Judo
        // Day 2 — 18 April 2026
        { sport: 'athletics',    date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'archery',      date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'ball-badminton',date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'badminton',    date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'basketball',   date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'swimming',     date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'table-tennis', date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'taekwondo',    date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'weightlifting',date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'other',        date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' }, // Pencak Silat, Mallakhamb, Best Physique
      ],
      trialsWomen: [
        { sport: 'cricket',      date: '2026-04-17', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'football',     date: '2026-04-17', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'handball',     date: '2026-04-17', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'hockey',       date: '2026-04-17', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'kabaddi',      date: '2026-04-17', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'kho-kho',      date: '2026-04-17', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'volleyball',   date: '2026-04-17', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'martial-arts', date: '2026-04-17', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'athletics',    date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'archery',      date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'ball-badminton',date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'badminton',    date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'basketball',   date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'swimming',     date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'table-tennis', date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'taekwondo',    date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'weightlifting',date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
        { sport: 'other',        date: '2026-04-18', time: '8:30 AM', venue: 'Jawahar Science College, Block-14, Neyveli-3' },
      ],
      extraDocuments: [
        {
          titleEn: '10th Mark Sheet',
          titleTa: '10-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்',
          detailEn: 'Original 10th-grade mark sheet for verification.',
          detailTa: 'சரிபார்ப்புக்காக அசல் 10-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்.',
        },
        {
          titleEn: 'Aadhaar Card',
          titleTa: 'ஆதார் அட்டை',
          detailEn: 'Required as identity proof on trial day.',
          detailTa: 'தேர்வு நாளில் அடையாள ஆதாரமாக தேவை.',
        },
        {
          titleEn: 'Birth Certificate',
          titleTa: 'பிறப்புச் சான்றிதழ்',
          detailEn: 'Original to verify age eligibility.',
          detailTa: 'வயது தகுதியை சரிபார்க்க அசல் தேவை.',
        },
        {
          titleEn: 'Passport Size Photo',
          titleTa: 'பாஸ்போர்ட் அளவு புகைப்படம்',
          detailEn: 'Recent passport-size photographs for registration.',
          detailTa: 'பதிவுக்கான சமீபத்திய பாஸ்போர்ட் அளவு புகைப்படங்கள்.',
        },
        {
          titleEn: 'Sports Certificate (originals)',
          titleTa: 'விளையாட்டு சான்றிதழ் (அசல்)',
          detailEn: 'All sports achievement certificates in original — required to verify your eligibility level (International / National / SGFI / State / District / Zonal).',
          detailTa: 'உங்கள் தகுதி அளவை சரிபார்க்க அனைத்து விளையாட்டு சாதனை சான்றிதழ்கள் அசலில் (சர்வதேச / தேசிய / SGFI / மாநில / மாவட்ட / மண்டல) தேவை.',
        },
      ],
      applicationDeadline: '17 April 2026', // first day of the trial window
    },
    contact: {
      designation: 'Jawahar Science College — Sports Admissions',
      phone: '+91-90806-85043',
    },
    verification: 'verified',
    sourceNote: 'Direct from Jawahar Science College, Neyveli Sports Quota Admission Trials 2026-27 notification (provided by team May 2026). Affiliated to Annamalai University, managed by Jawahar Education Society. Located at Block-14, Neyveli-3 (Cuddalore district). Two-day trial 17-18 April 2026, 8:30 AM daily. Wide eligibility: International, National, SGFI, State, District, Zonal. Special fees concession for sports admissions on First Come – First Served basis. 20+ sports including Pencak Silat, Mallakhamb, Best Physique (mapped to "Other"). Online application available; contact 9080685043 for application link.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: Rathinam College of Arts & Science ───────────────────────
  // Source: Official Rathinam College Kabaddi Sports Quota Selection Trials
  // 2026-27 notification (provided by team May 2026). NAAC A++ (3.60 CGPA),
  // Bharathiar University, AICTE approved. Rathinam Techzone Campus,
  // Eachanari, Coimbatore-641021. NOTE: This is the FIRST TRIAL and is for
  // KABADDI ONLY — Men 13 April, Women 17 April 2026, 6:00 AM reporting.
  // Up to 100% scholarship + free food, hostel, gym, kit, coaching.
  {
    id: 'rathinam_coimbatore',
    collegeName: 'Rathinam College of Arts & Science',
    collegeNameTa: 'ரத்தினம் கலை மற்றும் அறிவியல் கல்லூரி',
    district: 'Coimbatore',
    type: 'Autonomous',
    field: 'arts',
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district',
      sportsScholarship: 'Up to 100% Scholarship for selected athletes. Benefits package: Free Education + Free Food + Free Hostel + Free Accommodation + Playing Kit + Gym Facilities + Professional Coaching + Tournament Exposure. NAAC A++ (3.60 CGPA), Bharathiar University affiliated.',
      schemes: [
        'Up to 100% Sports Scholarship',
        'Free Education',
        'Free Food + Free Hostel + Free Accommodation',
        'Playing Kit + Gym + Professional Coaching + Tournament Exposure',
        'NAAC A++ (3.60 CGPA)',
      ],
      selectionProcess: 'First Trial — KABADDI ONLY for 2026-27 academic year. Men\'s Kabaddi trial: 13 April 2026, 6:00 AM reporting. Women\'s Kabaddi trial: 17 April 2026, 6:00 AM reporting. Venue: Rathinam Techzone Campus, Eachanari, Coimbatore-641021. Registration via QR code → Google Form (on the official poster). Other sports trials, if any, will be announced separately by the Department of Physical Education.',
      // First trial covers Kabaddi only — other sports may be announced later.
      sportsForMen: ['kabaddi'],
      sportsForWomen: ['kabaddi'],
      trialsMen: [
        { sport: 'kabaddi', date: '2026-04-13', time: '6:00 AM', venue: 'Rathinam Techzone Campus, Eachanari, Coimbatore' },
      ],
      trialsWomen: [
        { sport: 'kabaddi', date: '2026-04-17', time: '6:00 AM', venue: 'Rathinam Techzone Campus, Eachanari, Coimbatore' },
      ],
      extraDocuments: [
        {
          titleEn: 'Online registration via QR code / Google Form',
          titleTa: 'QR கோடு / Google Form மூலம் ஆன்லைன் பதிவு',
          detailEn: 'Scan the QR code on the official poster to access the Google Form and register before reporting on your trial date.',
          detailTa: 'உங்கள் தேர்வு நாளில் வருவதற்கு முன், அதிகாரப்பூர்வ சுவரொட்டியில் உள்ள QR கோடை ஸ்கேன் செய்து Google Form-ல் பதிவு செய்யவும்.',
        },
        {
          titleEn: 'Sports certificates (originals)',
          titleTa: 'விளையாட்டு சான்றிதழ்கள் (அசல்)',
          detailEn: 'All Kabaddi achievement and participation certificates in original.',
          detailTa: 'அனைத்து கபடி சாதனை மற்றும் பங்கேற்பு சான்றிதழ்கள் அசலில்.',
        },
        {
          titleEn: '10th and 12th mark sheets',
          titleTa: '10-ஆம் & 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்கள்',
          detailEn: 'For UG admission. PG applicants should also bring graduation mark sheet.',
          detailTa: 'UG சேர்க்கைக்கு. PG விண்ணப்பதாரர்கள் பட்டப்படிப்பு மதிப்பெண் சான்றிதழையும் கொண்டு வரவும்.',
        },
        {
          titleEn: 'Kabaddi kit / sports attire',
          titleTa: 'கபடி உடை / விளையாட்டு உடை',
          detailEn: 'Wear/bring appropriate kabaddi attire — trial will be on the mat.',
          detailTa: 'பொருத்தமான கபடி உடையை அணிந்து வரவும் — தேர்வு மேட்டில் நடைபெறும்.',
        },
      ],
      applicationDeadline: '13 April 2026', // Men's trial date (earliest of the two)
    },
    contact: {
      sportsOfficer: 'Dr. S. Joisy',
      designation: 'Director of Physical Education',
      phone: '+91-86101-75821', // Kabaddi Men's Coach (primary callable number)
      sportsOfficer2: 'Mr. S. Ramesh',
      designation2: 'Asst. Director of Physical Education (Kabaddi Women: 8428186118)',
      phone2: '+91-84281-86118', // Kabaddi Women's Coach
      website: 'https://www.rathinamcollege.edu.in',
    },
    verification: 'verified',
    sourceUrl: 'https://www.rathinamcollege.edu.in',
    sourceNote: 'Direct from Rathinam College of Arts & Science Kabaddi Sports Quota Selection Trials (First Trial) 2026-27 notification (provided by team May 2026). NAAC A++ (3.60 CGPA), Bharathiar University affiliated, AICTE approved. Rathinam Techzone Campus, Eachanari, Coimbatore-641021. First trial covers KABADDI ONLY — Men 13 April 2026, Women 17 April 2026, 6:00 AM reporting. Up to 100% scholarship + Free Education + Food + Hostel + Accommodation + Kit + Gym + Coaching + Tournament Exposure. Kabaddi Men\'s Coach: 8610175821. Kabaddi Women\'s Coach: 8428186118. Physical Education Leadership: Dr. S. Joisy (DPE), Mr. S. Ramesh (Asst. DPE). Other sports trials may be announced separately.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: Sri Ramakrishna College of Arts & Science (SRCAS) ────────
  // Source: Official SRCAS Sports Quota Selection Trials 2026-27 notification
  // (provided by team May 2026). Autonomous arts & science college at Nava
  // India, Coimbatore-641 006. NAAC A+, ISO 9001:2015 certified, AICTE & UGC
  // approved. Ranked 76th in NIRF 2025. Three-day trial 6-8 April 2026 with
  // gender-specific sport allocations.
  {
    id: 'srcas_coimbatore',
    collegeName: 'Sri Ramakrishna College of Arts & Science (SRCAS)',
    collegeNameTa: 'ஸ்ரீ ராமகிருஷ்ணா கலை மற்றும் அறிவியல் கல்லூரி',
    district: 'Coimbatore',
    type: 'Autonomous',
    field: 'arts',
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district',
      sportsScholarship: 'Sports Quota Admission 2026-27 — admissions across UG and PG programmes at Sri Ramakrishna College of Arts & Science. Autonomous, NAAC A+, ISO 9001:2015 certified, AICTE & UGC approved. Ranked 76th in NIRF 2025.',
      schemes: [
        'Sports Quota Admission (UG and PG)',
        'NAAC A+ accredited',
        'ISO 9001:2015 certified',
        'NIRF 2025 Rank 76',
        'AICTE & UGC approved',
      ],
      selectionProcess: 'Three-day offline sports trial held 6-8 April 2026 at SRCAS, Nava India, Coimbatore-641 006. Sport-specific days with gender-specific allocations: 6 April — Football (M), Volleyball (M & W), Hockey (M). 7 April — Basketball (M & W), Kho-Kho (M & W), Kabaddi (M). 8 April — Ball Badminton (M & W), Table Tennis (M & W). Online registration via QR code on the official poster.',
      // Gender-specific allocations per the notification:
      //   Men:   Football, Volleyball, Hockey, Basketball, Kho-Kho, Kabaddi, Ball Badminton, Table Tennis
      //   Women: Volleyball, Basketball, Kho-Kho, Ball Badminton, Table Tennis
      // Football, Hockey, and Kabaddi are MEN ONLY this cycle.
      sportsForMen: [
        'football', 'volleyball', 'hockey',
        'basketball', 'kho-kho', 'kabaddi',
        'ball-badminton', 'table-tennis',
      ],
      sportsForWomen: [
        'volleyball',
        'basketball', 'kho-kho',
        'ball-badminton', 'table-tennis',
      ],
      trialsMen: [
        // 6 April 2026
        { sport: 'football',       date: '2026-04-06', time: 'See poster', venue: 'SRCAS, Nava India, Coimbatore' },
        { sport: 'volleyball',     date: '2026-04-06', time: 'See poster', venue: 'SRCAS, Nava India, Coimbatore' },
        { sport: 'hockey',         date: '2026-04-06', time: 'See poster', venue: 'SRCAS, Nava India, Coimbatore' },
        // 7 April 2026
        { sport: 'basketball',     date: '2026-04-07', time: 'See poster', venue: 'SRCAS, Nava India, Coimbatore' },
        { sport: 'kho-kho',        date: '2026-04-07', time: 'See poster', venue: 'SRCAS, Nava India, Coimbatore' },
        { sport: 'kabaddi',        date: '2026-04-07', time: 'See poster', venue: 'SRCAS, Nava India, Coimbatore' },
        // 8 April 2026
        { sport: 'ball-badminton', date: '2026-04-08', time: 'See poster', venue: 'SRCAS, Nava India, Coimbatore' },
        { sport: 'table-tennis',   date: '2026-04-08', time: 'See poster', venue: 'SRCAS, Nava India, Coimbatore' },
      ],
      trialsWomen: [
        // 6 April 2026 — Volleyball only
        { sport: 'volleyball',     date: '2026-04-06', time: 'See poster', venue: 'SRCAS, Nava India, Coimbatore' },
        // 7 April 2026
        { sport: 'basketball',     date: '2026-04-07', time: 'See poster', venue: 'SRCAS, Nava India, Coimbatore' },
        { sport: 'kho-kho',        date: '2026-04-07', time: 'See poster', venue: 'SRCAS, Nava India, Coimbatore' },
        // 8 April 2026
        { sport: 'ball-badminton', date: '2026-04-08', time: 'See poster', venue: 'SRCAS, Nava India, Coimbatore' },
        { sport: 'table-tennis',   date: '2026-04-08', time: 'See poster', venue: 'SRCAS, Nava India, Coimbatore' },
      ],
      extraDocuments: [
        {
          titleEn: 'Online registration via QR code',
          titleTa: 'QR கோடு மூலம் ஆன்லைன் பதிவு',
          detailEn: 'Scan the QR code on the official poster to register before reporting on your sport-specific trial date.',
          detailTa: 'உங்கள் விளையாட்டுக்கான தேர்வு நாளில் வருவதற்கு முன், அதிகாரப்பூர்வ சுவரொட்டியில் உள்ள QR கோடை ஸ்கேன் செய்து பதிவு செய்யவும்.',
        },
        {
          titleEn: 'Sports certificates (originals)',
          titleTa: 'விளையாட்டு சான்றிதழ்கள் (அசல்)',
          detailEn: 'All achievement and participation certificates in original.',
          detailTa: 'அனைத்து சாதனை மற்றும் பங்கேற்பு சான்றிதழ்கள் அசலில்.',
        },
        {
          titleEn: '10th and 12th mark sheets',
          titleTa: '10-ஆம் & 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்கள்',
          detailEn: 'For UG admission. PG applicants should also bring graduation mark sheet.',
          detailTa: 'UG சேர்க்கைக்கு. PG விண்ணப்பதாரர்கள் பட்டப்படிப்பு மதிப்பெண் சான்றிதழையும் கொண்டு வரவும்.',
        },
      ],
      applicationDeadline: '6 April 2026', // first day of the trial window
    },
    contact: {
      designation: 'SRCAS — Department of Physical Education',
      phone: '+91-98946-48915',
      phone2: '+91-63808-14199',
    },
    verification: 'verified',
    sourceNote: 'Direct from Sri Ramakrishna College of Arts & Science (SRCAS) Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). Autonomous arts & science college at Nava India, Coimbatore-641 006. NAAC A+, ISO 9001:2015 certified, AICTE & UGC approved. Ranked 76th in NIRF 2025. Three-day trial 6-8 April 2026 organised by the Department of Physical Education. Gender-specific sports allocations: Football, Hockey, Kabaddi are MEN ONLY this cycle. Additional contact: 9865706011. Online registration via QR code on the official poster.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: Meenakshi Academy of Higher Education & Research (MAHER) ─
  // Source: Official MAHER 100% Sports Scholarship Admission Selection Trials
  // 2026-27 notification (provided by team May 2026). NAAC A+ accredited
  // Deemed University located at K.K. Nagar, Chennai-78. Sports admissions
  // restricted to UG & PG programmes under the Faculty of Humanities &
  // Sciences and the Faculty of Yoga Sciences and Therapy. Single-day trial
  // on 10 April 2026 — Women at 8:00 AM, Men at 1:00 PM (gender-specific
  // time slots, expressed via separate trialsMen / trialsWomen arrays).
  // Sports: Kabaddi & Volleyball only. Important rule: only certificates
  // from the past 3 years (2023 onwards) are verified.
  {
    id: 'maher_chennai',
    collegeName: 'Meenakshi Academy of Higher Education & Research (MAHER)',
    collegeNameTa: 'மீனாட்சி உயர் கல்வி & ஆராய்ச்சி கழகம் (MAHER)',
    district: 'Chennai',
    type: 'Deemed',
    field: 'arts', // Faculty of Humanities & Sciences and Faculty of Yoga Sciences and Therapy
    counsellingBody: 'Direct', // Deemed university — own admission
    overrides: {
      // No minimum level stated — open trial.
      minLevel: 'district',
      // Sports certificates older than 3 years are NOT verified at MAHER.
      // Other colleges use 4 years; we mirror that field but with the stricter
      // window so the eligibility flow can correctly reject 2022-and-earlier
      // certificates for MAHER specifically.
      achievementWindowYears: 3,
      sportsScholarship: '100% Sports Scholarship for selected athletes. Admissions across UG & PG programmes under the Faculty of Humanities & Sciences and the Faculty of Yoga Sciences and Therapy. NAAC A+ accredited Deemed University at K.K. Nagar, Chennai.',
      schemes: [
        '100% Sports Scholarship',
        'NAAC A+ accredited Deemed University',
        'Faculty of Humanities & Sciences (UG & PG)',
        'Faculty of Yoga Sciences and Therapy (UG & PG)',
        'STRICT: Only sports certificates from the past 3 years are verified',
      ],
      selectionProcess: 'Single-day offline sports trial on 10 April 2026 at MAHER University Campus, K.K. Nagar, Chennai-78. Gender-specific time slots: Women report 8:00 AM, Men report 1:00 PM. Sports: Kabaddi & Volleyball (both M & W). Trial day: bring original sports certificates and sports achievement proofs (only certs from the past 3 years will be verified). Wear proper sports attire for the trial.',
      sportsForMen: ['kabaddi', 'volleyball'],
      sportsForWomen: ['kabaddi', 'volleyball'],
      trialsMen: [
        // Men trials at 1:00 PM
        { sport: 'kabaddi',    date: '2026-04-10', time: '1:00 PM', venue: 'MAHER University Campus, K.K. Nagar, Chennai-78' },
        { sport: 'volleyball', date: '2026-04-10', time: '1:00 PM', venue: 'MAHER University Campus, K.K. Nagar, Chennai-78' },
      ],
      trialsWomen: [
        // Women trials at 8:00 AM
        { sport: 'kabaddi',    date: '2026-04-10', time: '8:00 AM', venue: 'MAHER University Campus, K.K. Nagar, Chennai-78' },
        { sport: 'volleyball', date: '2026-04-10', time: '8:00 AM', venue: 'MAHER University Campus, K.K. Nagar, Chennai-78' },
      ],
      extraDocuments: [
        {
          titleEn: 'Original sports certificates (within last 3 years only)',
          titleTa: 'அசல் விளையாட்டு சான்றிதழ்கள் (கடந்த 3 ஆண்டுகளுக்குள் மட்டுமே)',
          detailEn: 'STRICT: Only sports certificates from the past 3 years (2023-2026) will be verified. Older certificates will not be accepted.',
          detailTa: 'கடுமையான விதி: கடந்த 3 ஆண்டுகளில் (2023-2026) பெற்ற விளையாட்டு சான்றிதழ்கள் மட்டுமே சரிபார்க்கப்படும். பழைய சான்றிதழ்கள் ஏற்கப்படாது.',
        },
        {
          titleEn: 'Sports achievement proofs',
          titleTa: 'விளையாட்டு சாதனை ஆதாரங்கள்',
          detailEn: 'Medal photographs, news clippings, tournament certificates — all originals.',
          detailTa: 'பதக்க புகைப்படங்கள், செய்தித்தாள் வெட்டுகள், போட்டி சான்றிதழ்கள் — அனைத்தும் அசலில்.',
        },
        {
          titleEn: 'Proper sports attire',
          titleTa: 'பொருத்தமான விளையாட்டு உடை',
          detailEn: 'Wear proper sports kit/uniform for active trial — you will play on the spot.',
          detailTa: 'நேரடியாக விளையாட பொருத்தமான விளையாட்டு உடையை அணிந்து வரவும்.',
        },
      ],
      applicationDeadline: '10 April 2026',
    },
    contact: {
      sportsOfficer: 'Dr. C.M. Balasubramanian',
      designation: 'Deputy Director, Physical Education & Sports, MAHER',
      phone: '+91-81246-13513',
    },
    verification: 'verified',
    sourceNote: 'Direct from Meenakshi Academy of Higher Education & Research (MAHER) 100% Sports Scholarship Admission Selection Trials 2026-27 notification (provided by team May 2026). NAAC A+ accredited Deemed University at K.K. Nagar, Chennai-78. Sports admissions restricted to UG & PG programmes under the Faculty of Humanities & Sciences and the Faculty of Yoga Sciences and Therapy. Single-day trial 10 April 2026 — Women report 8:00 AM, Men report 1:00 PM. Sports: Kabaddi & Volleyball. STRICT: only sports certificates from the past 3 years are verified.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: Cheran College of Physical Education & Research Centre ──
  // Source: Official Cheran College of Physical Education Sports Quota
  // Selection Trials 2026-27 notification (provided by team May 2026).
  // NCTE-approved physical education college affiliated to TNPESU (Tamil Nadu
  // Physical Education and Sports University). Located at Punnamchathiram,
  // Erode Main Road, Karur-639136. Two-day trial 18-19 April 2026, 7 AM
  // daily. Tiered fee concession 50-100% for merit players.
  // NOTE: Programmes are physical-education only (B.P.Ed, M.P.Ed, B.P.Es, Ph.D)
  // — students interested in regular UG/PG arts/engineering should look at
  // other colleges.
  {
    id: 'cheran_karur',
    collegeName: 'Cheran College of Physical Education & Research Centre',
    collegeNameTa: 'சேரன் உடற்கல்வி & ஆராய்ச்சி மைய கல்லூரி',
    district: 'Karur',
    type: 'Private',
    field: 'other', // Physical education college (B.P.Ed / M.P.Ed / B.P.Es / Ph.D in PE only)
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district',
      sportsScholarship: '50% to 100% Fee Concession for merit players, based on achievement certificates and skills demonstrated at the trial. Physical-education-focused college offering B.P.Ed, M.P.Ed, B.P.Es, and Ph.D programmes. NCTE-approved, affiliated to TNPESU (Tamil Nadu Physical Education and Sports University).',
      schemes: [
        '50%-100% Fee Concession (merit-based)',
        'Programmes: B.P.Ed / M.P.Ed / B.P.Es / Ph.D in Physical Education',
        'NCTE-approved, TNPESU-affiliated',
      ],
      selectionProcess: 'Two-day offline selection trial held 18-19 April 2026, 7:00 AM daily at Cheran College of Physical Education, Punnamchathiram, Erode Main Road, Karur-639136. Sport-specific days: 18 April — Cricket, Volleyball, Athletics, Basketball, Kho-Kho, Judo, Tennis. 19 April — Kabaddi, Handball, Hockey, Football, Table Tennis, Mallakhamb, Taekwondo. Bring originals: sports certificates, 10th, 12th, UG mark sheets, Aadhaar, community certificate, passport + stamp photos.',
      // Mallakhamb not in standard enum — mapped to 'other'. Judo → 'martial-arts'.
      sportsForMen: [
        // 18 April
        'cricket', 'volleyball', 'athletics', 'basketball', 'kho-kho',
        'martial-arts', // Judo
        'tennis',
        // 19 April
        'kabaddi', 'handball', 'hockey', 'football', 'table-tennis',
        'taekwondo',
        'other', // Mallakhamb
      ],
      sportsForWomen: [
        'cricket', 'volleyball', 'athletics', 'basketball', 'kho-kho',
        'martial-arts', 'tennis',
        'kabaddi', 'handball', 'hockey', 'football', 'table-tennis',
        'taekwondo',
        'other',
      ],
      trialsMen: [
        // Day 1 — 18 April 2026
        { sport: 'cricket',      date: '2026-04-18', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'volleyball',   date: '2026-04-18', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'athletics',    date: '2026-04-18', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'basketball',   date: '2026-04-18', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'kho-kho',      date: '2026-04-18', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'martial-arts', date: '2026-04-18', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' }, // Judo
        { sport: 'tennis',       date: '2026-04-18', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        // Day 2 — 19 April 2026
        { sport: 'kabaddi',      date: '2026-04-19', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'handball',     date: '2026-04-19', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'hockey',       date: '2026-04-19', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'football',     date: '2026-04-19', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'table-tennis', date: '2026-04-19', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'taekwondo',    date: '2026-04-19', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'other',        date: '2026-04-19', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' }, // Mallakhamb
      ],
      trialsWomen: [
        { sport: 'cricket',      date: '2026-04-18', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'volleyball',   date: '2026-04-18', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'athletics',    date: '2026-04-18', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'basketball',   date: '2026-04-18', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'kho-kho',      date: '2026-04-18', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'martial-arts', date: '2026-04-18', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'tennis',       date: '2026-04-18', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'kabaddi',      date: '2026-04-19', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'handball',     date: '2026-04-19', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'hockey',       date: '2026-04-19', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'football',     date: '2026-04-19', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'table-tennis', date: '2026-04-19', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'taekwondo',    date: '2026-04-19', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
        { sport: 'other',        date: '2026-04-19', time: '7:00 AM', venue: 'Cheran College of Physical Education, Punnamchathiram, Karur' },
      ],
      extraDocuments: [
        {
          titleEn: 'Original Sports Certificates',
          titleTa: 'அசல் விளையாட்டு சான்றிதழ்கள்',
          detailEn: 'All achievement certificates in original — concession tier (50% to 100%) is decided based on level and skill.',
          detailTa: 'அனைத்து சாதனை சான்றிதழ்களும் அசலில் — அளவு மற்றும் திறன் அடிப்படையில் சலுகை அளவு (50%-100%) தீர்மானிக்கப்படும்.',
        },
        {
          titleEn: '10th and 12th Mark Sheets',
          titleTa: '10-ஆம் & 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்கள்',
          detailEn: 'Originals required for verification.',
          detailTa: 'சரிபார்ப்புக்காக அசல் தேவை.',
        },
        {
          titleEn: 'UG Mark Sheets (for M.P.Ed / Ph.D applicants)',
          titleTa: 'UG மதிப்பெண் சான்றிதழ்கள் (M.P.Ed / Ph.D விண்ணப்பதாரர்களுக்கு)',
          detailEn: 'Bachelor\'s degree mark sheet originals.',
          detailTa: 'பட்டப்படிப்பு மதிப்பெண் சான்றிதழ்களின் அசல்.',
        },
        {
          titleEn: 'Aadhaar + Community Certificate',
          titleTa: 'ஆதார் + சமூகச் சான்றிதழ்',
          detailEn: 'Aadhaar card and Tamil Nadu Community Certificate (originals).',
          detailTa: 'ஆதார் அட்டை மற்றும் தமிழ்நாடு சமூகச் சான்றிதழ் (அசல்).',
        },
        {
          titleEn: 'Passport + Stamp size photos',
          titleTa: 'பாஸ்போர்ட் + ஸ்டாம்ப் அளவு புகைப்படங்கள்',
          detailEn: 'Multiple passport-size and stamp-size photographs.',
          detailTa: 'பல பாஸ்போர்ட் அளவு மற்றும் ஸ்டாம்ப் அளவு புகைப்படங்கள்.',
        },
      ],
      applicationDeadline: '18 April 2026',
    },
    contact: {
      designation: 'Cheran College of Physical Education — Sports Admissions',
      phone: '+91-96263-22044',
      phone2: '+91-90807-38884',
      email: 'cheranbped@gmail.com',
    },
    verification: 'verified',
    sourceNote: 'Direct from Cheran College of Physical Education & Research Centre Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). NCTE-approved, affiliated to TNPESU. Located at Punnamchathiram, Erode Main Road, Karur-639136. Two-day trial 18-19 April 2026, 7:00 AM daily. 50% to 100% Fee Concession for merit players. Programmes are physical-education only: B.P.Ed, M.P.Ed, B.P.Es, Ph.D. Phone: 9626322044, 9080738884. Email: cheranbped@gmail.com.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: Nachiappa Swamigal Polytechnic College ───────────────────
  // Source: Official Nachiappa Swamigal Polytechnic Sports Quota Selection
  // Trials 2026-27 notification (provided by team May 2026). Polytechnic
  // college (Code 824) located at Koviloor, Karaikudi-630307 (Sivaganga
  // district). Diploma-level engineering programmes (Civil, Mechanical, EEE,
  // ECE). Single-day trial 13 April 2026, 8:00 AM. Football & Handball are
  // MEN ONLY this cycle.
  {
    id: 'nachiappa_polytechnic_sivaganga',
    collegeName: 'Nachiappa Swamigal Polytechnic College',
    collegeNameTa: 'நாச்சியப்ப சுவாமிகள் பாலிடெக்னிக் கல்லூரி',
    district: 'Sivaganga',
    type: 'Private',
    field: 'other', // Polytechnic — diploma-level
    counsellingBody: 'Direct',
    overrides: {
      // Polytechnic admission — accepts district-level achievers.
      minLevel: 'district',
      sportsScholarship: 'Sports Quota Admission to Diploma-level programmes (Polytechnic, Code 824) — Civil, Mechanical, EEE, ECE. Single-day trial-based selection. Contact the Department of Physical Education for fee concession / scholarship details.',
      schemes: [
        'Diploma-level engineering programmes (Civil / Mechanical / EEE / ECE)',
        'Polytechnic Code 824',
        '10th-pass eligibility (Diploma level)',
      ],
      selectionProcess: 'Single-day offline sports trial on 13 April 2026, 8:00 AM at Nachiappa Swamigal Polytechnic College, Koviloor, Karaikudi-630307. Open for both Men & Women across most sports — but Football and Handball are MEN ONLY this cycle. Bring: Aadhaar, passport-size photo, original Birth Certificate, and Sports Achievement Certificate (if any). Multiple coach contacts available — call C. Saravanan (9944761547) or any coach below for details.',
      // Gender allocations:
      //   Men only: Football, Handball
      //   Both: Kho-Kho, Kabaddi, Volleyball, Athletics, Basketball, Hockey
      //   Indoor Games (chess / carrom / TT etc) — both, mapped to 'other'
      sportsForMen: [
        'football', 'handball',
        'kho-kho', 'kabaddi', 'volleyball', 'athletics',
        'basketball', 'hockey',
        'other', // Indoor Games (chess, carrom, table tennis bundled)
      ],
      sportsForWomen: [
        // No football, no handball for women
        'kho-kho', 'kabaddi', 'volleyball', 'athletics',
        'basketball', 'hockey',
        'other', // Indoor Games
      ],
      trialsMen: [
        { sport: 'football',   date: '2026-04-13', time: '8:00 AM', venue: 'Nachiappa Swamigal Polytechnic College, Koviloor, Karaikudi' },
        { sport: 'handball',   date: '2026-04-13', time: '8:00 AM', venue: 'Nachiappa Swamigal Polytechnic College, Koviloor, Karaikudi' },
        { sport: 'kho-kho',    date: '2026-04-13', time: '8:00 AM', venue: 'Nachiappa Swamigal Polytechnic College, Koviloor, Karaikudi' },
        { sport: 'kabaddi',    date: '2026-04-13', time: '8:00 AM', venue: 'Nachiappa Swamigal Polytechnic College, Koviloor, Karaikudi' },
        { sport: 'volleyball', date: '2026-04-13', time: '8:00 AM', venue: 'Nachiappa Swamigal Polytechnic College, Koviloor, Karaikudi' },
        { sport: 'athletics',  date: '2026-04-13', time: '8:00 AM', venue: 'Nachiappa Swamigal Polytechnic College, Koviloor, Karaikudi' },
        { sport: 'basketball', date: '2026-04-13', time: '8:00 AM', venue: 'Nachiappa Swamigal Polytechnic College, Koviloor, Karaikudi' },
        { sport: 'hockey',     date: '2026-04-13', time: '8:00 AM', venue: 'Nachiappa Swamigal Polytechnic College, Koviloor, Karaikudi' },
        { sport: 'other',      date: '2026-04-13', time: '8:00 AM', venue: 'Nachiappa Swamigal Polytechnic College, Koviloor, Karaikudi' }, // Indoor Games
      ],
      trialsWomen: [
        { sport: 'kho-kho',    date: '2026-04-13', time: '8:00 AM', venue: 'Nachiappa Swamigal Polytechnic College, Koviloor, Karaikudi' },
        { sport: 'kabaddi',    date: '2026-04-13', time: '8:00 AM', venue: 'Nachiappa Swamigal Polytechnic College, Koviloor, Karaikudi' },
        { sport: 'volleyball', date: '2026-04-13', time: '8:00 AM', venue: 'Nachiappa Swamigal Polytechnic College, Koviloor, Karaikudi' },
        { sport: 'athletics',  date: '2026-04-13', time: '8:00 AM', venue: 'Nachiappa Swamigal Polytechnic College, Koviloor, Karaikudi' },
        { sport: 'basketball', date: '2026-04-13', time: '8:00 AM', venue: 'Nachiappa Swamigal Polytechnic College, Koviloor, Karaikudi' },
        { sport: 'hockey',     date: '2026-04-13', time: '8:00 AM', venue: 'Nachiappa Swamigal Polytechnic College, Koviloor, Karaikudi' },
        { sport: 'other',      date: '2026-04-13', time: '8:00 AM', venue: 'Nachiappa Swamigal Polytechnic College, Koviloor, Karaikudi' }, // Indoor Games
      ],
      extraDocuments: [
        {
          titleEn: 'Aadhaar Card',
          titleTa: 'ஆதார் அட்டை',
          detailEn: 'Required as identity proof on trial day.',
          detailTa: 'தேர்வு நாளில் அடையாள ஆதாரமாக தேவை.',
        },
        {
          titleEn: 'Passport-size photo',
          titleTa: 'பாஸ்போர்ட் அளவு புகைப்படம்',
          detailEn: 'Recent passport-size photographs for registration.',
          detailTa: 'பதிவுக்கான சமீபத்திய பாஸ்போர்ட் அளவு புகைப்படங்கள்.',
        },
        {
          titleEn: 'Original Birth Certificate',
          titleTa: 'அசல் பிறப்புச் சான்றிதழ்',
          detailEn: 'Required to verify age eligibility for the diploma programme.',
          detailTa: 'டிப்ளமா படிப்புக்கான வயது தகுதியை சரிபார்க்க தேவை.',
        },
        {
          titleEn: 'Sports Achievement Certificate (if any)',
          titleTa: 'விளையாட்டு சாதனை சான்றிதழ் (ஏதேனும் இருந்தால்)',
          detailEn: 'Optional but recommended — improves your chances and scholarship tier.',
          detailTa: 'விருப்பத்தேர்வு ஆனால் பரிந்துரைக்கப்படுகிறது — உங்கள் வாய்ப்புகள் மற்றும் உதவித்தொகை அளவை மேம்படுத்தும்.',
        },
        {
          titleEn: '10th-standard pass certificate',
          titleTa: '10-ஆம் வகுப்பு தேர்ச்சி சான்றிதழ்',
          detailEn: 'Minimum academic eligibility for diploma admission.',
          detailTa: 'டிப்ளமா சேர்க்கைக்கான குறைந்தபட்ச கல்வித் தகுதி.',
        },
      ],
      applicationDeadline: '13 April 2026',
    },
    contact: {
      sportsOfficer: 'C. Saravanan',
      designation: 'M.Ped, M.Phil, Ph.D (Department of Physical Education)',
      phone: '+91-99447-61547',
      sportsOfficer2: 'Muruganantham P. (Coach)',
      designation2: 'Coach (other coaches: Senthilganesh.P 9840475257, Saravanan.KS 9843529772, Amalraj.S 9943282447, Pandimurugan.J 9944102551)',
      phone2: '+91-78455-95723',
    },
    verification: 'verified',
    sourceNote: 'Direct from Nachiappa Swamigal Polytechnic College (Code 824) Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). Diploma-level polytechnic in Koviloor, Karaikudi-630307 (Sivaganga district). Programmes: Civil, Mechanical, EEE, ECE. Single-day trial 13 April 2026, 8:00 AM. Football & Handball are MEN ONLY; other sports open to both M&W. Indoor Games (chess / carrom / TT bundle) available. Multiple coaches available: C. Saravanan (9944761547 - DPE), Muruganantham.P (7845595723), Senthilganesh.P (9840475257), Saravanan.KS (9843529772), Amalraj.S (9943282447), Pandimurugan.J (9944102551).',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: Women's Christian College (WCC), Chennai ─────────────────
  // Source: Official WCC Sports Quota Selection Trials 2026-27 notification
  // (provided by team May 2026). Autonomous arts & science college affiliated
  // to the University of Madras, re-accredited by NAAC in July 2025 with
  // Grade A+, recognised as "College with Potential for Excellence".
  // IMPORTANT: WCC is a WOMEN-ONLY college — sportsForMen and trialsMen
  // are intentionally empty so men are correctly excluded from this match.
  {
    id: 'wcc_chennai',
    collegeName: "Women's Christian College (WCC), Chennai",
    collegeNameTa: 'பெண்கள் கிறிஸ்தவ கல்லூரி (WCC), சென்னை',
    district: 'Chennai',
    type: 'Autonomous',
    field: 'arts',
    counsellingBody: 'Direct',
    overrides: {
      // Notification accepts International / National / State / District /
      // Divisional / Inter-school — i.e. school-level players also accepted.
      minLevel: 'school',
      sportsScholarship: 'Performance-based Scholarship and awards for sports achievers. WCC is a women-only autonomous arts & science college affiliated to the University of Madras, NAAC A+ (re-accredited July 2025), recognised as "College with Potential for Excellence".',
      schemes: [
        'Performance-based Scholarship + Awards for achievers',
        'Refreshments + Jersey + Conveyance for matches',
        'Medical insurance for student-athletes',
        'Special academic coaching for sports students',
        'NAAC A+ (re-accredited July 2025)',
        'WOMEN ONLY college',
      ],
      selectionProcess: 'Single-day offline sports trial on 8 April 2026, 8:00 AM at WCC Playfield, Chennai. Open to players from International / National / State / District / Divisional / Inter-school levels. Bring sports kit + original and photocopies of Sports Merit certificates. Selected students receive performance-based scholarship, jersey, refreshments, conveyance for matches, medical insurance, and special academic coaching.',
      // WOMEN ONLY college — sportsForMen and trialsMen left intentionally empty.
      // Throwball, Squash, Fencing not in standard enum — mapped to 'other'.
      // Rifle Shooting → 'shooting'.
      sportsForMen: [],
      sportsForWomen: [
        'volleyball', 'basketball', 'football', 'cricket', 'tennis',
        'ball-badminton', 'handball', 'athletics', 'badminton',
        'table-tennis', 'chess', 'yoga', 'shooting', 'swimming', 'boxing',
        'other', // Throwball + Squash + Fencing
      ],
      trialsMen: [],
      trialsWomen: [
        { sport: 'volleyball',     date: '2026-04-08', time: '8:00 AM', venue: 'WCC Playfield, Chennai' },
        { sport: 'basketball',     date: '2026-04-08', time: '8:00 AM', venue: 'WCC Playfield, Chennai' },
        { sport: 'football',       date: '2026-04-08', time: '8:00 AM', venue: 'WCC Playfield, Chennai' },
        { sport: 'cricket',        date: '2026-04-08', time: '8:00 AM', venue: 'WCC Playfield, Chennai' },
        { sport: 'tennis',         date: '2026-04-08', time: '8:00 AM', venue: 'WCC Playfield, Chennai' },
        { sport: 'ball-badminton', date: '2026-04-08', time: '8:00 AM', venue: 'WCC Playfield, Chennai' },
        { sport: 'handball',       date: '2026-04-08', time: '8:00 AM', venue: 'WCC Playfield, Chennai' },
        { sport: 'athletics',      date: '2026-04-08', time: '8:00 AM', venue: 'WCC Playfield, Chennai' },
        { sport: 'badminton',      date: '2026-04-08', time: '8:00 AM', venue: 'WCC Playfield, Chennai' },
        { sport: 'table-tennis',   date: '2026-04-08', time: '8:00 AM', venue: 'WCC Playfield, Chennai' },
        { sport: 'chess',          date: '2026-04-08', time: '8:00 AM', venue: 'WCC Playfield, Chennai' },
        { sport: 'yoga',           date: '2026-04-08', time: '8:00 AM', venue: 'WCC Playfield, Chennai' },
        { sport: 'shooting',       date: '2026-04-08', time: '8:00 AM', venue: 'WCC Playfield, Chennai' }, // Rifle Shooting
        { sport: 'swimming',       date: '2026-04-08', time: '8:00 AM', venue: 'WCC Playfield, Chennai' },
        { sport: 'boxing',         date: '2026-04-08', time: '8:00 AM', venue: 'WCC Playfield, Chennai' },
        { sport: 'other',          date: '2026-04-08', time: '8:00 AM', venue: 'WCC Playfield, Chennai' }, // Throwball, Squash, Fencing
      ],
      extraDocuments: [
        {
          titleEn: 'Sports kit',
          titleTa: 'விளையாட்டு உடை',
          detailEn: 'Wear/bring proper sports kit — you will play on the spot.',
          detailTa: 'பொருத்தமான விளையாட்டு உடையை அணிந்து வரவும் — நிகழ்வில் நேரடியாக விளையாட வேண்டும்.',
        },
        {
          titleEn: 'Sports Merit certificates (originals + photocopies)',
          titleTa: 'விளையாட்டு திறமை சான்றிதழ்கள் (அசல் + நகல்கள்)',
          detailEn: 'Bring BOTH original and photocopies of all sports merit certificates.',
          detailTa: 'அனைத்து விளையாட்டு திறமை சான்றிதழ்களின் அசல் மற்றும் நகல்கள் இரண்டையும் கொண்டு வாரவும்.',
        },
        {
          titleEn: '10th / 12th mark sheets',
          titleTa: '10-ஆம் / 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்கள்',
          detailEn: 'Originals for admission verification.',
          detailTa: 'சேர்க்கை சரிபார்ப்புக்கான அசல்.',
        },
      ],
      applicationDeadline: '8 April 2026',
    },
    contact: {
      sportsOfficer: 'Dr. Agnes Vijaya Rani',
      designation: 'Director of Physical Education',
      phone: '+91-97909-30415',
      sportsOfficer2: 'Dr. Naveena Priya',
      designation2: 'Director of Physical Education',
      phone2: '+91-90922-25279',
    },
    verification: 'verified',
    sourceNote: 'Direct from Women\'s Christian College (WCC), Chennai Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). WOMEN ONLY college. Autonomous arts & science college affiliated to University of Madras, re-accredited by NAAC in July 2025 with Grade A+, "College with Potential for Excellence". Single-day trial 8 April 2026, 8:00 AM at WCC Playfield. 18 sports including Volleyball, Basketball, Football, Cricket, Tennis, Ball Badminton, Handball, Throwball, Athletics, Badminton, Table Tennis, Chess, Yoga, Rifle Shooting, Swimming, Boxing, Squash, Fencing. Eligibility: International / National / State / District / Divisional / Inter-school. Performance-based scholarship + jersey + refreshments + conveyance + medical insurance + academic coaching.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: AVS College of Arts & Science, Salem ─────────────────────
  // Source: Official AVS College Sports Quota Selection Trials 2026-27
  // notification (provided by team May 2026). Autonomous arts & science
  // college at Ramalingapuram, Salem-106. 10-sport schedule across 9 trial
  // dates from 10-21 April 2026, all at 3:00 PM at AVS Campus. Open to
  // both Men and Women across all sports.
  {
    id: 'avs_salem',
    collegeName: 'AVS College of Arts & Science (Autonomous), Salem',
    collegeNameTa: 'AVS கலை மற்றும் அறிவியல் கல்லூரி (தன்னாட்சி), சேலம்',
    district: 'Salem',
    type: 'Autonomous',
    field: 'arts',
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district',
      sportsScholarship: 'Sports Quota Admission 2026-27 at AVS College of Arts & Science (Autonomous), Ramalingapuram, Salem-106. Contact Director of Physical Education for scholarship details based on level and skill demonstrated at the trial.',
      schemes: [
        'Sports Quota Admission (Autonomous arts & science)',
        'Trials across 9 dates (10-21 April 2026) at 3:00 PM daily',
      ],
      selectionProcess: 'Multi-day offline sports trial held 10-21 April 2026, 3:00 PM daily at AVS Campus, Ramalingapuram, Salem-106. Sport-specific dates: 10 April — Volleyball; 11 April — Basketball; 13 April — Hockey; 15 April — Athletics, Handball; 16 April — Kabaddi; 17 April — Kho-Kho, Ball Badminton; 18 April — Football; 20 April — Cricket; 21 April — Badminton, Judo. Open for both Men & Women across all sports.',
      // Judo → 'martial-arts'
      sportsForMen: [
        'volleyball', 'basketball', 'hockey', 'athletics', 'handball',
        'kabaddi', 'kho-kho', 'ball-badminton', 'football', 'cricket',
        'badminton', 'martial-arts', // Judo
      ],
      sportsForWomen: [
        'volleyball', 'basketball', 'hockey', 'athletics', 'handball',
        'kabaddi', 'kho-kho', 'ball-badminton', 'football', 'cricket',
        'badminton', 'martial-arts',
      ],
      trialsMen: [
        { sport: 'volleyball',     date: '2026-04-10', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'basketball',     date: '2026-04-11', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'hockey',         date: '2026-04-13', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'athletics',      date: '2026-04-15', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'handball',       date: '2026-04-15', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'kabaddi',        date: '2026-04-16', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'kho-kho',        date: '2026-04-17', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'ball-badminton', date: '2026-04-17', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'football',       date: '2026-04-18', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'cricket',        date: '2026-04-20', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'badminton',      date: '2026-04-21', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'martial-arts',   date: '2026-04-21', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' }, // Judo
      ],
      trialsWomen: [
        { sport: 'volleyball',     date: '2026-04-10', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'basketball',     date: '2026-04-11', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'hockey',         date: '2026-04-13', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'athletics',      date: '2026-04-15', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'handball',       date: '2026-04-15', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'kabaddi',        date: '2026-04-16', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'kho-kho',        date: '2026-04-17', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'ball-badminton', date: '2026-04-17', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'football',       date: '2026-04-18', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'cricket',        date: '2026-04-20', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'badminton',      date: '2026-04-21', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
        { sport: 'martial-arts',   date: '2026-04-21', time: '3:00 PM', venue: 'AVS Campus, Ramalingapuram, Salem' },
      ],
      extraDocuments: [
        {
          titleEn: 'Sports certificates (originals)',
          titleTa: 'விளையாட்டு சான்றிதழ்கள் (அசல்)',
          detailEn: 'All achievement and participation certificates in original.',
          detailTa: 'அனைத்து சாதனை மற்றும் பங்கேற்பு சான்றிதழ்கள் அசலில்.',
        },
        {
          titleEn: '10th and 12th mark sheets',
          titleTa: '10-ஆம் & 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்கள்',
          detailEn: 'For UG admission. PG applicants should also bring graduation mark sheet.',
          detailTa: 'UG சேர்க்கைக்கு. PG விண்ணப்பதாரர்கள் பட்டப்படிப்பு மதிப்பெண் சான்றிதழையும் கொண்டு வரவும்.',
        },
        {
          titleEn: 'Aadhaar + passport photos',
          titleTa: 'ஆதார் + பாஸ்போர்ட் புகைப்படங்கள்',
          detailEn: 'Standard ID and recent passport-size photographs.',
          detailTa: 'வழக்கமான அடையாள ஆதாரம் மற்றும் சமீபத்திய பாஸ்போர்ட் அளவு புகைப்படங்கள்.',
        },
      ],
      applicationDeadline: '10 April 2026', // first day of the trial window
    },
    contact: {
      sportsOfficer: 'Dr. R. Suresh Kumar',
      designation: 'Director of Physical Education',
      phone: '+91-94432-18257',
      phone2: '+91-80728-52795',
    },
    verification: 'verified',
    sourceNote: 'Direct from AVS College of Arts & Science (Autonomous), Salem Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). Located at Ramalingapuram, Salem-106. 10-sport schedule across 9 trial dates from 10-21 April 2026, all at 3:00 PM at AVS Campus. Sport-specific dates: 10 April Volleyball; 11 April Basketball; 13 April Hockey; 15 April Athletics & Handball; 16 April Kabaddi; 17 April Kho-Kho & Ball Badminton; 18 April Football; 20 April Cricket; 21 April Badminton & Judo. Open for both Men & Women. Contact Dr. R. Suresh Kumar (DPE): 9443218257 / 8072852795.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: Marudhar Kesari Jain College for Women ───────────────────
  // Source: Official Marudhar Kesari Jain College for Women Sports Quota
  // Selection Trials 2026-27 notification (provided by team May 2026).
  // Autonomous women's college at Vaniyambadi, Tirupattur District-635 751.
  // NAAC A (3rd cycle), recognised under UGC 2(f) & 12(B), permanently
  // affiliated to Thiruvalluvar University. Single-day trial 1 April 2026,
  // 9:00 AM. WOMEN ONLY college — sportsForMen and trialsMen empty.
  // Strong sports track record: 9 international + 56 national + 138 state +
  // 52 university players in 2025-26. Up to 100% scholarship for selected.
  {
    id: 'mkj_tirupattur',
    collegeName: 'Marudhar Kesari Jain College for Women (Autonomous)',
    collegeNameTa: 'மருதர் கேசரி ஜெயின் பெண்கள் கல்லூரி (தன்னாட்சி)',
    district: 'Tirupathur',
    type: 'Autonomous',
    field: 'arts',
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district',
      sportsScholarship: 'Up to 100% Scholarship for selected candidates. Women-only autonomous arts & science college at Vaniyambadi, Tirupattur District. NAAC A (3rd cycle), UGC 2(f) & 12(B), permanently affiliated to Thiruvalluvar University. Track record (2025-26): 9 International + 56 National + 138 State + 52 University players. ₹6.65L in CM Trophy cash prizes, ₹10.10L overall cash prizes, ₹23.02L in sports fee concessions.',
      schemes: [
        'Up to 100% Scholarship for selected athletes',
        '14 professional coaches + 7 PED staff members',
        '2025-26 track record: 9 International, 56 National, 138 State, 52 University players',
        '₹23+ lakh in sports fee concessions awarded (2025-26)',
        'NAAC A (3rd cycle), Thiruvalluvar University affiliated',
        'WOMEN ONLY college',
      ],
      selectionProcess: 'Single-day offline sports trial on 1 April 2026, 9:00 AM at Marudhar Kesari Jain College for Women campus, Vaniyambadi, Tirupattur District-635 751. Conducted by the Department of Physical Education. Open to women across 20 outdoor & general sports. Indoor facilities also available for Badminton, Table Tennis, Volleyball, Basketball, Kabaddi, and Chess. Bring academic and sports certificates for verification.',
      // WOMEN ONLY — sportsForMen and trialsMen left intentionally empty.
      // Silambam and Malkhumb (Mallakhamb) not in standard enum — mapped to 'other'.
      // Judo → 'martial-arts'. Karate is in the enum.
      sportsForMen: [],
      sportsForWomen: [
        'athletics', 'badminton', 'ball-badminton', 'basketball', 'chess',
        'cricket', 'kho-kho', 'football',
        'martial-arts', // Judo
        'karate', 'boxing', 'taekwondo',
        'volleyball', 'handball', 'hockey', 'table-tennis', 'kabaddi',
        'swimming',
        'other', // Silambam + Malkhumb (Mallakhamb)
      ],
      trialsMen: [],
      trialsWomen: [
        { sport: 'athletics',      date: '2026-04-01', time: '9:00 AM', venue: 'Marudhar Kesari Jain College for Women, Vaniyambadi' },
        { sport: 'badminton',      date: '2026-04-01', time: '9:00 AM', venue: 'Marudhar Kesari Jain College for Women, Vaniyambadi' },
        { sport: 'ball-badminton', date: '2026-04-01', time: '9:00 AM', venue: 'Marudhar Kesari Jain College for Women, Vaniyambadi' },
        { sport: 'basketball',     date: '2026-04-01', time: '9:00 AM', venue: 'Marudhar Kesari Jain College for Women, Vaniyambadi' },
        { sport: 'chess',          date: '2026-04-01', time: '9:00 AM', venue: 'Marudhar Kesari Jain College for Women, Vaniyambadi' },
        { sport: 'cricket',        date: '2026-04-01', time: '9:00 AM', venue: 'Marudhar Kesari Jain College for Women, Vaniyambadi' },
        { sport: 'kho-kho',        date: '2026-04-01', time: '9:00 AM', venue: 'Marudhar Kesari Jain College for Women, Vaniyambadi' },
        { sport: 'football',       date: '2026-04-01', time: '9:00 AM', venue: 'Marudhar Kesari Jain College for Women, Vaniyambadi' },
        { sport: 'martial-arts',   date: '2026-04-01', time: '9:00 AM', venue: 'Marudhar Kesari Jain College for Women, Vaniyambadi' }, // Judo
        { sport: 'karate',         date: '2026-04-01', time: '9:00 AM', venue: 'Marudhar Kesari Jain College for Women, Vaniyambadi' },
        { sport: 'boxing',         date: '2026-04-01', time: '9:00 AM', venue: 'Marudhar Kesari Jain College for Women, Vaniyambadi' },
        { sport: 'taekwondo',      date: '2026-04-01', time: '9:00 AM', venue: 'Marudhar Kesari Jain College for Women, Vaniyambadi' },
        { sport: 'volleyball',     date: '2026-04-01', time: '9:00 AM', venue: 'Marudhar Kesari Jain College for Women, Vaniyambadi' },
        { sport: 'handball',       date: '2026-04-01', time: '9:00 AM', venue: 'Marudhar Kesari Jain College for Women, Vaniyambadi' },
        { sport: 'hockey',         date: '2026-04-01', time: '9:00 AM', venue: 'Marudhar Kesari Jain College for Women, Vaniyambadi' },
        { sport: 'table-tennis',   date: '2026-04-01', time: '9:00 AM', venue: 'Marudhar Kesari Jain College for Women, Vaniyambadi' },
        { sport: 'kabaddi',        date: '2026-04-01', time: '9:00 AM', venue: 'Marudhar Kesari Jain College for Women, Vaniyambadi' },
        { sport: 'swimming',       date: '2026-04-01', time: '9:00 AM', venue: 'Marudhar Kesari Jain College for Women, Vaniyambadi' },
        { sport: 'other',          date: '2026-04-01', time: '9:00 AM', venue: 'Marudhar Kesari Jain College for Women, Vaniyambadi' }, // Silambam + Mallakhamb
      ],
      extraDocuments: [
        {
          titleEn: 'Academic Certificates',
          titleTa: 'கல்விச் சான்றிதழ்கள்',
          detailEn: 'Original 10th, 12th (and UG marks card for PG) certificates for verification.',
          detailTa: 'சரிபார்ப்புக்காக அசல் 10-ஆம், 12-ஆம் (PG-க்கு UG மதிப்பெண் அட்டை) வகுப்பு சான்றிதழ்கள்.',
        },
        {
          titleEn: 'Sports Certificates',
          titleTa: 'விளையாட்டு சான்றிதழ்கள்',
          detailEn: 'All achievement and participation certificates in original.',
          detailTa: 'அனைத்து சாதனை மற்றும் பங்கேற்பு சான்றிதழ்கள் அசலில்.',
        },
      ],
      applicationDeadline: '1 April 2026',
    },
    contact: {
      sportsOfficer: 'Dr. D. Prince Deva Fredrick',
      designation: 'Director of Physical Education',
      phone: '+91-99947-87139',
      phone2: '+91-79045-54871',
    },
    verification: 'verified',
    sourceNote: 'Direct from Marudhar Kesari Jain College for Women (Autonomous) Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). WOMEN ONLY autonomous college at Vaniyambadi, Tirupattur District-635 751. NAAC A (3rd cycle), UGC 2(f) & 12(B), permanently affiliated to Thiruvalluvar University. Single-day trial 1 April 2026, 9:00 AM. Up to 100% scholarship for selected candidates. Strong sports record (2025-26): 9 International + 56 National + 138 State + 52 University players. ₹6.65L CM Trophy cash prizes, ₹10.10L overall cash prizes, ₹23.02L in fee concessions. 7 PED staff, 14 professional coaches. 20 outdoor sports + indoor facilities for Badminton, TT, Volleyball, Basketball, Kabaddi, Chess. DPE: Dr. D. Prince Deva Fredrick. Phones: 9994787139, 7904554871.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: Shri Nehru Maha Vidyalaya College (SNMV), Coimbatore ─────
  // Source: Official SNMV Sports Quota Selection Trials 2026-27 notification
  // (provided by team May 2026). Autonomous arts & science college affiliated
  // to Bharathiar University, NAAC A+ re-accredited. Located at Shri Gambhira
  // Bafna Nagar, Malumachampatti, Coimbatore-641 050. Single-day trial on
  // 15 April 2026, 9:30 AM at SNMV Campus. Up to 100% Merit Scholarship.
  {
    id: 'snmv_coimbatore',
    collegeName: 'Shri Nehru Maha Vidyalaya College of Arts and Science (SNMV)',
    collegeNameTa: 'ஸ்ரீ நேரு மகா வித்யாலயா கலை & அறிவியல் கல்லூரி (SNMV)',
    district: 'Coimbatore',
    type: 'Autonomous',
    field: 'arts',
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district',
      sportsScholarship: 'Up to 100% Merit Scholarship for sports students offering free education. Autonomous arts & science college affiliated to Bharathiar University, NAAC A+ re-accredited.',
      schemes: [
        'Up to 100% Merit Scholarship (free education)',
        'NAAC A+ re-accredited',
        'Bharathiar University affiliated',
      ],
      selectionProcess: 'Single-day offline sports trial on 15 April 2026, 9:30 AM at SNMV Campus, Shri Gambhira Bafna Nagar, Malumachampatti, Coimbatore-641 050. Online registration via QR code or https://forms.gle/ehihiWE4sXnDNG9V8 (registration closed 13 April 2026 — contact Mr. G. Sadeesh Kumar for any late-application window). Bring Sports Certificates on trial day.',
      sportsForMen: [
        'kabaddi', 'volleyball', 'basketball', 'badminton', 'football',
        'athletics', 'cricket', 'weightlifting', 'powerlifting',
        'taekwondo', 'karate',
      ],
      sportsForWomen: [
        'kabaddi', 'volleyball', 'basketball', 'badminton', 'football',
        'athletics', 'cricket', 'weightlifting', 'powerlifting',
        'taekwondo', 'karate',
      ],
      trialsMen: [
        { sport: 'kabaddi',       date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'volleyball',    date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'basketball',    date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'badminton',     date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'football',      date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'athletics',     date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'cricket',       date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'weightlifting', date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'powerlifting',  date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'taekwondo',     date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'karate',        date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
      ],
      trialsWomen: [
        { sport: 'kabaddi',       date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'volleyball',    date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'basketball',    date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'badminton',     date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'football',      date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'athletics',     date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'cricket',       date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'weightlifting', date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'powerlifting',  date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'taekwondo',     date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
        { sport: 'karate',        date: '2026-04-15', time: '9:30 AM', venue: 'SNMV Campus, Malumachampatti, Coimbatore' },
      ],
      extraDocuments: [
        {
          titleEn: 'Sports Certificates',
          titleTa: 'விளையாட்டு சான்றிதழ்கள்',
          detailEn: 'All achievement and participation certificates in original — mandatory on trial day.',
          detailTa: 'அனைத்து சாதனை மற்றும் பங்கேற்பு சான்றிதழ்கள் அசலில் — தேர்வு நாளில் கட்டாயம்.',
        },
        {
          titleEn: 'Online registration (Google Form)',
          titleTa: 'ஆன்லைன் பதிவு (Google Form)',
          detailEn: 'Register at https://forms.gle/ehihiWE4sXnDNG9V8 or scan the QR code on the official poster.',
          detailTa: 'https://forms.gle/ehihiWE4sXnDNG9V8-ல் பதிவு செய்யவும் அல்லது அதிகாரப்பூர்வ சுவரொட்டியில் உள்ள QR கோடை ஸ்கேன் செய்யவும்.',
        },
      ],
      applicationDeadline: '15 April 2026',
    },
    contact: {
      sportsOfficer: 'Mr. G. Sadeesh Kumar',
      designation: 'Physical Director',
      phone: '+91-96550-13890',
      applicationLink: 'https://forms.gle/ehihiWE4sXnDNG9V8',
    },
    verification: 'verified',
    sourceNote: 'Direct from Shri Nehru Maha Vidyalaya College of Arts and Science (SNMV) Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). Autonomous arts & science college affiliated to Bharathiar University, NAAC A+ re-accredited. Located at Shri Gambhira Bafna Nagar, Malumachampatti, Coimbatore-641 050. Single-day trial 15 April 2026, 9:30 AM at SNMV Campus. Up to 100% Merit Scholarship for sports students (free education). Registration closed 13 April 2026 — call Mr. G. Sadeesh Kumar (9655013890) for any late-application window. Online registration link: https://forms.gle/ehihiWE4sXnDNG9V8',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: Karpagam Academy of Higher Education (KAHE) ──────────────
  // Source: Official Karpagam Academy Sports Quota Selection Trials 2026-27
  // notification (provided by team May 2026). Deemed-to-be University at
  // Coimbatore. Up to 100% Scholarship for meritorious players.
  // IMPORTANT: This cycle's trial schedule is heavily MEN-FOCUSED — only
  // Volleyball (W) on 10 April is listed for women; all other sports (Kabaddi,
  // Volleyball, Football, Handball, Silambam) are Men-only on the schedule.
  // Silambam not in standard sport enum → mapped to 'other'.
  {
    id: 'karpagam_coimbatore',
    collegeName: 'Karpagam Academy of Higher Education (KAHE)',
    collegeNameTa: 'கர்ப்பகம் உயர் கல்வி கழகம் (KAHE)',
    district: 'Coimbatore',
    type: 'Deemed',
    field: 'arts', // Deemed University with multi-disciplinary programmes
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district',
      sportsScholarship: 'Up to 100% Scholarship for meritorious players. Deemed-to-be University at Coimbatore. Overall coordinator: Dr. S. Suthakar (Director of Physical Education and Sports).',
      schemes: [
        'Up to 100% Scholarship for meritorious players',
        'Deemed-to-be University',
      ],
      selectionProcess: 'Multi-day offline sports trial across 10-16 April 2026 at Karpagam Academy, Coimbatore. Gender-specific schedule: 10 April — Volleyball (W) + Kabaddi (M); 11 April — Volleyball (M); 13 April — Football (M); 15 April — Handball (M); 16 April — Silambam (M). Online registration via QR code or https://forms.gle/GieRuWsNt9J6jqQu9. Bring originals: 10th mark sheet, Aadhaar, Birth Certificate, Sports Certificate, Community Certificate, passport-size photo.',
      // This cycle's trials only list 1 women's sport (Volleyball) — set the
      // women's array accordingly so the eligibility flow correctly excludes
      // women who play other sports. Men's trials cover 5 sports including
      // Silambam (mapped to 'other').
      sportsForMen: [
        'kabaddi', 'volleyball', 'football', 'handball',
        'other', // Silambam
      ],
      sportsForWomen: [
        'volleyball', // only sport listed for women this cycle
      ],
      trialsMen: [
        // 10 April — Kabaddi (M)
        { sport: 'kabaddi',    date: '2026-04-10', time: 'See poster', venue: 'Karpagam Academy of Higher Education, Coimbatore' },
        // 11 April — Volleyball (M)
        { sport: 'volleyball', date: '2026-04-11', time: 'See poster', venue: 'Karpagam Academy of Higher Education, Coimbatore' },
        // 13 April — Football (M)
        { sport: 'football',   date: '2026-04-13', time: 'See poster', venue: 'Karpagam Academy of Higher Education, Coimbatore' },
        // 15 April — Handball (M)
        { sport: 'handball',   date: '2026-04-15', time: 'See poster', venue: 'Karpagam Academy of Higher Education, Coimbatore' },
        // 16 April — Silambam (M)
        { sport: 'other',      date: '2026-04-16', time: 'See poster', venue: 'Karpagam Academy of Higher Education, Coimbatore' }, // Silambam
      ],
      trialsWomen: [
        // 10 April — Volleyball (W) ONLY
        { sport: 'volleyball', date: '2026-04-10', time: 'See poster', venue: 'Karpagam Academy of Higher Education, Coimbatore' },
      ],
      extraDocuments: [
        {
          titleEn: '10th Marksheet (original)',
          titleTa: '10-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ் (அசல்)',
          detailEn: 'Original 10th-grade mark sheet required.',
          detailTa: 'அசல் 10-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ் தேவை.',
        },
        {
          titleEn: 'Aadhaar Card',
          titleTa: 'ஆதார் அட்டை',
          detailEn: 'Identity proof.',
          detailTa: 'அடையாள ஆதாரம்.',
        },
        {
          titleEn: 'Birth Certificate',
          titleTa: 'பிறப்புச் சான்றிதழ்',
          detailEn: 'Original.',
          detailTa: 'அசல்.',
        },
        {
          titleEn: 'Sports Certificate',
          titleTa: 'விளையாட்டு சான்றிதழ்',
          detailEn: 'All sports achievement and participation certificates in original.',
          detailTa: 'அனைத்து சாதனை மற்றும் பங்கேற்பு சான்றிதழ்கள் அசலில்.',
        },
        {
          titleEn: 'Community Certificate',
          titleTa: 'சமூகச் சான்றிதழ்',
          detailEn: 'Tamil Nadu Community Certificate.',
          detailTa: 'தமிழ்நாடு சமூகச் சான்றிதழ்.',
        },
        {
          titleEn: 'Passport-size photo',
          titleTa: 'பாஸ்போர்ட் அளவு புகைப்படம்',
          detailEn: 'Recent passport-size photos.',
          detailTa: 'சமீபத்திய பாஸ்போர்ட் அளவு புகைப்படங்கள்.',
        },
        {
          titleEn: 'Online registration (Google Form)',
          titleTa: 'ஆன்லைன் பதிவு (Google Form)',
          detailEn: 'Register at https://forms.gle/GieRuWsNt9J6jqQu9 or scan the QR code on the official poster.',
          detailTa: 'https://forms.gle/GieRuWsNt9J6jqQu9-ல் பதிவு செய்யவும் அல்லது அதிகாரப்பூர்வ சுவரொட்டியில் உள்ள QR கோடை ஸ்கேன் செய்யவும்.',
        },
      ],
      applicationDeadline: '10 April 2026', // first day of the trial window
    },
    contact: {
      sportsOfficer: 'Dr. S. Suthakar',
      designation: 'Director of Physical Education and Sports (Overall Coordinator)',
      phone: '+91-99650-65096',
      applicationLink: 'https://forms.gle/GieRuWsNt9J6jqQu9',
    },
    verification: 'verified',
    sourceNote: 'Direct from Karpagam Academy of Higher Education (KAHE) Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). Deemed-to-be University at Coimbatore. Up to 100% Scholarship for meritorious players. This cycle\'s trials are heavily MEN-FOCUSED — only Volleyball (Women) on 10 April is listed for women; Kabaddi, Volleyball, Football, Handball, and Silambam are all MEN-only across 10-16 April. Overall coordinator: Dr. S. Suthakar (9965065096). Online registration: https://forms.gle/GieRuWsNt9J6jqQu9',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: Kongunadu College of Engineering and Technology ──────────
  // Source: Official Kongunadu CET Sports Quota Selection Trials 2026-27
  // notification (provided by team May 2026). Autonomous engineering college,
  // AICTE approved, NAAC accredited, Anna University affiliated. Located at
  // Namakkal-Trichy Main Road, Tholurpatti, Thottiam, Tiruchirappalli-621215.
  // Gender-specific trial DATES: Women on 12 April, Men on 13 April 2026.
  // Some sports are gender-restricted: Football, Cricket, Boxing — Women
  // only this cycle; Squash — Men only this cycle.
  {
    id: 'kongunadu_cet_tiruchirappalli',
    collegeName: 'Kongunadu College of Engineering and Technology',
    collegeNameTa: 'கொங்குநாடு பொறியியல் மற்றும் தொழில்நுட்பக் கல்லூரி',
    district: 'Tiruchirappalli',
    type: 'Autonomous',
    field: 'engineering',
    // Anna University affiliated — admits via TNEA. Sports quota direct route
    // available; we mark counsellingBody as 'TNEA' so general TNEA info still
    // surfaces and add the direct-trial details via overrides.
    counsellingBody: 'TNEA',
    overrides: {
      minLevel: 'district',
      sportsScholarship: 'Up to 100% Scholarship for meritorious players including free education and free hostel fees. Autonomous engineering college, AICTE approved, NAAC accredited, Anna University affiliated. Programmes: Agri, AI&DS, BME, Civil, CSE, ECE, EEE, IT, Mech.',
      schemes: [
        'Up to 100% Sports Scholarship',
        'Free Education + Free Hostel Fees (meritorious players)',
        'Programmes: Agri, AI&DS, BME, Civil, CSE, ECE, EEE, IT, Mech',
        'Anna University affiliated, NAAC accredited',
      ],
      selectionProcess: 'Gender-specific trial dates at Kongunadu College of Engineering and Technology, Tholurpatti, Thottiam, Tiruchirappalli-621215. Women\'s trials: 12 April 2026. Men\'s trials: 13 April 2026. Most sports open to both genders (Athletics, Hockey, Basketball, Volleyball, Kabaddi, Handball, Taekwondo, Kho-Kho, Judo). Women-only sports this cycle: Football, Cricket, Boxing. Men-only: Squash. Apply through TNEA as well (sports quota seats coordinated with general counselling).',
      // Squash not in standard enum → 'other'. Judo → 'martial-arts'.
      sportsForMen: [
        // Common (M & W)
        'athletics', 'hockey', 'basketball', 'volleyball', 'kabaddi',
        'handball', 'taekwondo', 'kho-kho', 'martial-arts', // Judo
        // Men Only
        'other', // Squash
      ],
      sportsForWomen: [
        // Common
        'athletics', 'hockey', 'basketball', 'volleyball', 'kabaddi',
        'handball', 'taekwondo', 'kho-kho', 'martial-arts', // Judo
        // Women Only
        'football', 'cricket', 'boxing',
      ],
      trialsMen: [
        // 13 April 2026 — Men's day
        { sport: 'athletics',    date: '2026-04-13', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' },
        { sport: 'hockey',       date: '2026-04-13', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' },
        { sport: 'basketball',   date: '2026-04-13', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' },
        { sport: 'volleyball',   date: '2026-04-13', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' },
        { sport: 'kabaddi',      date: '2026-04-13', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' },
        { sport: 'handball',     date: '2026-04-13', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' },
        { sport: 'taekwondo',    date: '2026-04-13', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' },
        { sport: 'kho-kho',      date: '2026-04-13', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' },
        { sport: 'martial-arts', date: '2026-04-13', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' }, // Judo
        { sport: 'other',        date: '2026-04-13', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' }, // Squash
      ],
      trialsWomen: [
        // 12 April 2026 — Women's day
        { sport: 'athletics',    date: '2026-04-12', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' },
        { sport: 'hockey',       date: '2026-04-12', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' },
        { sport: 'basketball',   date: '2026-04-12', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' },
        { sport: 'volleyball',   date: '2026-04-12', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' },
        { sport: 'kabaddi',      date: '2026-04-12', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' },
        { sport: 'handball',     date: '2026-04-12', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' },
        { sport: 'taekwondo',    date: '2026-04-12', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' },
        { sport: 'kho-kho',      date: '2026-04-12', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' },
        { sport: 'martial-arts', date: '2026-04-12', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' }, // Judo
        // Women-only sports
        { sport: 'football',     date: '2026-04-12', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' },
        { sport: 'cricket',      date: '2026-04-12', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' },
        { sport: 'boxing',       date: '2026-04-12', time: 'See poster', venue: 'Kongunadu CET, Tholurpatti, Thottiam, Tiruchirappalli' },
      ],
      extraDocuments: [
        {
          titleEn: 'Sports certificates (originals)',
          titleTa: 'விளையாட்டு சான்றிதழ்கள் (அசல்)',
          detailEn: 'All achievement and participation certificates in original.',
          detailTa: 'அனைத்து சாதனை மற்றும் பங்கேற்பு சான்றிதழ்கள் அசலில்.',
        },
        {
          titleEn: '10th and 12th mark sheets',
          titleTa: '10-ஆம் & 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்கள்',
          detailEn: 'For UG admission. Both TNEA and direct admission paths require these in original.',
          detailTa: 'UG சேர்க்கைக்கு. TNEA மற்றும் நேரடி சேர்க்கை இரண்டுக்கும் அசல் தேவை.',
        },
        {
          titleEn: 'TNEA application',
          titleTa: 'TNEA விண்ணப்பம்',
          detailEn: 'Apply through TNEA as well — sports quota seats are coordinated with general counselling.',
          detailTa: 'TNEA மூலமாகவும் விண்ணப்பிக்கவும் — விளையாட்டு கோட்டா இடங்கள் பொது ஆலோசனையுடன் ஒருங்கிணைக்கப்படுகின்றன.',
        },
      ],
      applicationDeadline: '12 April 2026', // women's trial — earlier of the two
    },
    contact: {
      sportsOfficer: 'Mr. S. Palanivel',
      designation: 'Kongunadu CET Sports Admissions',
      phone: '+91-94885-19521',
      sportsOfficer2: 'Mr. T. Saravanakumar',
      designation2: 'Kongunadu CET Sports Admissions',
      phone2: '+91-97879-23620',
    },
    verification: 'verified',
    sourceNote: 'Direct from Kongunadu College of Engineering and Technology Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). Autonomous engineering college, AICTE approved, NAAC accredited, Anna University affiliated. Located at Namakkal-Trichy Main Road, Tholurpatti, Thottiam, Tiruchirappalli-621215. Gender-specific trial dates: Women 12 April 2026, Men 13 April 2026. Up to 100% scholarship including free education and free hostel fees. Programmes: Agri, AI&DS, BME, Civil, CSE, ECE, EEE, IT, Mech. Additional contacts: Mr. S. Palanivel 9488519521 / 8012505039, Mr. T. Saravanakumar 9787923620, Mrs. J. Nithyalaksmi 9894034066, Mr. T. Sathish 8667874787, Mr. S. Ilayaraja 9894918764.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: Joy University, Tirunelveli ──────────────────────────────
  // Source: Official Joy University Sports Quota Selection Trials 2026-27
  // notification (provided by team May 2026). Private university established
  // under TNPU Act 2019, UGC-recognised under Section 2(f). Located at
  // Raja Nagar, Vadakangulam, Near Kanyakumari, Tirunelveli Dist-627116.
  // Eight-day trial schedule across 15-23 April 2026 at 3:00 PM daily at
  // Joy University Ground. Up to 100% Merit Scholarship.
  {
    id: 'joy_tirunelveli',
    collegeName: 'Joy University, Tirunelveli',
    collegeNameTa: 'ஜாய் பல்கலைக்கழகம், திருநெல்வேலி',
    district: 'Tirunelveli',
    type: 'Private',
    field: 'other', // Private university with multi-disciplinary programmes
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district',
      sportsScholarship: 'Up to 100% Merit Scholarship for selected athletes. Private university established via TNPU Act 2019 & TNPU (Amend.) Act 2024, UGC-recognised under Section 2(f) of the UGC Act 1956. Located at Raja Nagar, Vadakangulam, near Kanyakumari.',
      schemes: [
        'Up to 100% Merit Scholarship',
        'Private University (TNPU Act 2019)',
        'UGC-recognised under Section 2(f)',
      ],
      selectionProcess: 'Eight-day offline sports trial across 15-23 April 2026 at Joy University Ground, Raja Nagar, Vadakangulam, near Kanyakumari (Tirunelveli district-627116). Reporting time: 3:00 PM for all trial dates. Sport-specific schedule: 15 April — Table Tennis, Badminton, Ball Badminton; 16 April — Tennis, Handball; 17 April — Kho-Kho, Taekwondo; 18 April — Kabaddi, Beach Sports, Wrestling; 20 April — Volleyball, Basketball; 21 April — Cricket, Hockey; 22 April — Boxing, Weightlifting, Powerlifting; 23 April — Squash, Athletics, Chess. Open for both Boys & Girls across all sports.',
      // Beach Sports + Squash not in standard sport enum → mapped to 'other'.
      sportsForMen: [
        // 15 April
        'table-tennis', 'badminton', 'ball-badminton',
        // 16 April
        'tennis', 'handball',
        // 17 April
        'kho-kho', 'taekwondo',
        // 18 April
        'kabaddi', 'wrestling',
        // 20 April
        'volleyball', 'basketball',
        // 21 April
        'cricket', 'hockey',
        // 22 April
        'boxing', 'weightlifting', 'powerlifting',
        // 23 April
        'athletics', 'chess',
        // Beach Sports + Squash
        'other',
      ],
      sportsForWomen: [
        'table-tennis', 'badminton', 'ball-badminton',
        'tennis', 'handball',
        'kho-kho', 'taekwondo',
        'kabaddi', 'wrestling',
        'volleyball', 'basketball',
        'cricket', 'hockey',
        'boxing', 'weightlifting', 'powerlifting',
        'athletics', 'chess',
        'other',
      ],
      trialsMen: [
        // 15 April 2026
        { sport: 'table-tennis',   date: '2026-04-15', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'badminton',      date: '2026-04-15', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'ball-badminton', date: '2026-04-15', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        // 16 April 2026
        { sport: 'tennis',         date: '2026-04-16', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'handball',       date: '2026-04-16', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        // 17 April 2026
        { sport: 'kho-kho',        date: '2026-04-17', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'taekwondo',      date: '2026-04-17', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        // 18 April 2026
        { sport: 'kabaddi',        date: '2026-04-18', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'wrestling',      date: '2026-04-18', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'other',          date: '2026-04-18', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' }, // Beach Sports
        // 20 April 2026
        { sport: 'volleyball',     date: '2026-04-20', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'basketball',     date: '2026-04-20', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        // 21 April 2026
        { sport: 'cricket',        date: '2026-04-21', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'hockey',         date: '2026-04-21', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        // 22 April 2026
        { sport: 'boxing',         date: '2026-04-22', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'weightlifting',  date: '2026-04-22', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'powerlifting',   date: '2026-04-22', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        // 23 April 2026
        { sport: 'athletics',      date: '2026-04-23', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'chess',          date: '2026-04-23', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        // 23 April — also Squash (separate 'other' entry)
      ],
      trialsWomen: [
        { sport: 'table-tennis',   date: '2026-04-15', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'badminton',      date: '2026-04-15', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'ball-badminton', date: '2026-04-15', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'tennis',         date: '2026-04-16', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'handball',       date: '2026-04-16', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'kho-kho',        date: '2026-04-17', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'taekwondo',      date: '2026-04-17', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'kabaddi',        date: '2026-04-18', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'wrestling',      date: '2026-04-18', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'other',          date: '2026-04-18', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' }, // Beach Sports
        { sport: 'volleyball',     date: '2026-04-20', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'basketball',     date: '2026-04-20', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'cricket',        date: '2026-04-21', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'hockey',         date: '2026-04-21', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'boxing',         date: '2026-04-22', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'weightlifting',  date: '2026-04-22', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'powerlifting',   date: '2026-04-22', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'athletics',      date: '2026-04-23', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
        { sport: 'chess',          date: '2026-04-23', time: '3:00 PM', venue: 'Joy University Ground, Vadakangulam' },
      ],
      extraDocuments: [
        {
          titleEn: 'Sports certificates (originals)',
          titleTa: 'விளையாட்டு சான்றிதழ்கள் (அசல்)',
          detailEn: 'All achievement and participation certificates in original.',
          detailTa: 'அனைத்து சாதனை மற்றும் பங்கேற்பு சான்றிதழ்கள் அசலில்.',
        },
        {
          titleEn: '10th and 12th mark sheets',
          titleTa: '10-ஆம் & 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்கள்',
          detailEn: 'For UG admission. PG applicants should also bring graduation mark sheet.',
          detailTa: 'UG சேர்க்கைக்கு. PG விண்ணப்பதாரர்கள் பட்டப்படிப்பு மதிப்பெண் சான்றிதழையும் கொண்டு வரவும்.',
        },
        {
          titleEn: 'Aadhaar + passport photos',
          titleTa: 'ஆதார் + பாஸ்போர்ட் புகைப்படங்கள்',
          detailEn: 'Standard ID and recent passport-size photographs.',
          detailTa: 'வழக்கமான அடையாள ஆதாரம் மற்றும் சமீபத்திய பாஸ்போர்ட் அளவு புகைப்படங்கள்.',
        },
      ],
      applicationDeadline: '15 April 2026', // first day of the trial window
    },
    contact: {
      sportsOfficer: 'Dr. M. Murugan',
      designation: 'Director of Physical Education & Sports',
      phone: '+91-97872-49719',
    },
    verification: 'verified',
    sourceNote: 'Direct from Joy University Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). Private university established via TNPU Act 2019 & TNPU (Amend.) Act 2024, UGC-recognised under Section 2(f). Located at Raja Nagar, Vadakangulam, Near Kanyakumari, Tirunelveli Dist-627116. Eight-day trial 15-23 April 2026, 3:00 PM daily at Joy University Ground. Up to 100% Merit Scholarship. Sport-specific schedule across 8 days. Open for both Boys & Girls. Contact: Dr. M. Murugan (Director of PE & Sports) — 9787249719.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: Thiagarajar Polytechnic College (TPC), Salem ─────────────
  // Source: Official Thiagarajar Polytechnic College Sports Admissions 2026-27
  // notification (provided by team May 2026). Government-aided, autonomous,
  // NBA-accredited polytechnic at Junction Main Road, Salem-636 005.
  // RECOGNITION: "Best Institution Award" winner for 16 consecutive years —
  // the highest sports award in polytechnic history. 100% scholarship for
  // eligible players. NOTE: No fixed trial date in the notification — rolling
  // admissions across the year. Several sports are MEN ONLY this cycle.
  {
    id: 'thiagarajar_polytechnic_salem',
    collegeName: 'Thiagarajar Polytechnic College (TPC), Salem',
    collegeNameTa: 'தியாகராஜர் பாலிடெக்னிக் கல்லூரி (TPC), சேலம்',
    district: 'Salem',
    type: 'Govt-Aided',
    field: 'other', // Polytechnic / diploma-level
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district',
      sportsScholarship: '100% Scholarship for eligible players. Government-aided autonomous polytechnic, NBA accredited. RECOGNITION: "Best Institution Award" winner for 16 consecutive years — the highest sports award in polytechnic history.',
      schemes: [
        '100% Scholarship (eligible players)',
        '"Best Institution Award" — 16 consecutive years',
        'NBA-accredited Government-aided Autonomous polytechnic',
        'Aided programmes: CIVIL, MECH, PROD, TEXT, EEE',
        'Self-supporting programmes: AIML, CSE, ECE, ARCH, CSIT & CE, IOT',
        'Free sports equipment + kits, on-duty permissions',
        'Financial assistance for tournament participation + injury treatment',
        'Management and sports scholarships',
      ],
      selectionProcess: 'Direct sports-quota admission at Thiagarajar Polytechnic College, Junction Main Road, Salem-636 005. The Department of Physical Education conducts sports trials and admissions across the year (no fixed single trial date in the notification — rolling). Contact Dr. D. Soundarraj (Physical Director, 9443518126) to schedule a sport-specific trial. Programmes: Aided (CIVIL, MECH, PROD, TEXT, EEE), Self-supporting (AIML, CSE, ECE, ARCH, CSIT & CE, IOT).',
      // Gender allocations per notification:
      //   M&W: Athletics, Carrom, Badminton, Ball Badminton, Throwball, Chess,
      //        Kabaddi, Kho-Kho, Tennikoit, Table Tennis, Volleyball
      //   Men only: Basketball, Cricket, Football, Handball, Hockey
      // Carrom, Throwball, Tennikoit not in standard enum → mapped to 'other'.
      sportsForMen: [
        'athletics', 'badminton', 'ball-badminton', 'chess',
        'kabaddi', 'kho-kho', 'table-tennis', 'volleyball',
        'other', // Carrom + Throwball + Tennikoit
        // Men only
        'basketball', 'cricket', 'football', 'handball', 'hockey',
      ],
      sportsForWomen: [
        // Only M&W sports — no Basketball, Cricket, Football, Handball, Hockey
        'athletics', 'badminton', 'ball-badminton', 'chess',
        'kabaddi', 'kho-kho', 'table-tennis', 'volleyball',
        'other', // Carrom + Throwball + Tennikoit
      ],
      // No fixed trial date in the notification — admissions are rolling.
      // trialsMen and trialsWomen intentionally omitted so the splash card
      // shows "Direct admission · Contact college" instead of a fake date.
      extraDocuments: [
        {
          titleEn: 'Sports certificates (originals)',
          titleTa: 'விளையாட்டு சான்றிதழ்கள் (அசல்)',
          detailEn: 'All achievement and participation certificates in original.',
          detailTa: 'அனைத்து சாதனை மற்றும் பங்கேற்பு சான்றிதழ்கள் அசலில்.',
        },
        {
          titleEn: '10th-grade pass certificate',
          titleTa: '10-ஆம் வகுப்பு தேர்ச்சி சான்றிதழ்',
          detailEn: 'Minimum eligibility for polytechnic admission.',
          detailTa: 'பாலிடெக்னிக் சேர்க்கைக்கான குறைந்தபட்ச தகுதி.',
        },
        {
          titleEn: 'TNPOLY application',
          titleTa: 'TNPOLY விண்ணப்பம்',
          detailEn: 'Apply through the TN Directorate of Technical Education TNPOLY admission portal as well.',
          detailTa: 'TN தொழில்நுட்பக் கல்வி இயக்ககத்தின் TNPOLY சேர்க்கை இணையதளம் மூலமாகவும் விண்ணப்பிக்கவும்.',
        },
      ],
      // applicationDeadline intentionally OMITTED — no fixed trial date.
    },
    contact: {
      sportsOfficer: 'Dr. D. Soundarraj',
      designation: 'Physical Director',
      phone: '+91-94435-18126',
      sportsOfficer2: 'L. Kannan',
      designation2: 'Department of Physical Education',
      phone2: '+91-97151-61942',
      website: 'https://www.tpt.edu.in',
    },
    verification: 'verified',
    sourceUrl: 'https://www.tpt.edu.in',
    sourceNote: 'Direct from Thiagarajar Polytechnic College (TPC), Salem Sports Admissions 2026-27 notification (provided by team May 2026). Government-aided autonomous NBA-accredited polytechnic at Junction Main Road, Salem-636 005. RECOGNITION: "Best Institution Award" winner for 16 consecutive years (highest sports award in polytechnic history). 100% Scholarship for eligible players. Athlete support: free sports equipment & kits, on-duty permissions for sports activities, financial assistance for tournament participation and injury treatment, management and sports scholarships. Aided programmes: CIVIL, MECH, PROD, TEXT, EEE. Self-supporting: AIML, CSE, ECE, ARCH, CSIT & CE, IOT. M&W sports: Athletics, Carrom, Badminton, Ball Badminton, Throwball, Chess, Kabaddi, Kho-Kho, Tennikoit, Table Tennis, Volleyball. Men only: Basketball, Cricket, Football, Handball, Hockey.',
    lastVerified: '2026-05-13',
  },

  // ─── VERIFIED: SNS College of Technology (SNSCT), Coimbatore ─────────────
  // Source: Official SNS Group Sports Scholarship Selection Trials 2026-27
  // notification (provided by team May 2026). Single-day Basketball-only
  // trial on 9 April 2026, 7:00 AM at SNS College of Technology campus,
  // Vazhiyampalayam, Saravanampatti, Coimbatore-641035. Trials cover BOTH
  // SNS College of Technology and Dr. SNS Rajalakshmi College of Arts and
  // Science. Up to 100% sports scholarship. Open to Boys and Girls. Register
  // by scanning QR code on official poster.
  {
    id: 'snsct_coimbatore',
    collegeName: 'SNS College of Technology / Dr. SNS Rajalakshmi College of Arts and Science',
    collegeNameTa: 'எஸ்.என்.எஸ். தொழில்நுட்பக் கல்லூரி / டாக்டர். எஸ்.என்.எஸ். ராஜலக்ஷ்மி கலை அறிவியல் கல்லூரி',
    district: 'Coimbatore',
    type: 'Autonomous',
    field: 'engineering',
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district',
      sportsScholarship: 'Up to 100% Sports Scholarship for selected Basketball players (Boys & Girls). Joint selection trial covering BOTH SNS College of Technology (engineering) and Dr. SNS Rajalakshmi College of Arts and Science. Single-day Basketball-only trial. Register by scanning QR code on official poster.',
      schemes: [
        'Up to 100% Sports Scholarship',
        'Joint trial for SNSCT (engineering) + Dr. SNS Rajalakshmi (arts & science)',
        'Basketball ONLY — Boys and Girls both eligible',
        'Single-day offline trial',
      ],
      selectionProcess: 'Single-day offline Basketball trial on 9 April 2026 at 7:00 AM at SNS College of Technology campus, Vazhiyampalayam, Saravanampatti, Coimbatore-641035. Open to both Boys and Girls. Common selection for SNS College of Technology and Dr. SNS Rajalakshmi College of Arts and Science. Register via QR code on the official poster.',
      sportsForMen: ['basketball'],
      sportsForWomen: ['basketball'],
      trialsMen: [
        { sport: 'basketball', date: '2026-04-09', time: '7:00 AM', venue: 'SNS College of Technology, Vazhiyampalayam, Saravanampatti, Coimbatore-641035' },
      ],
      trialsWomen: [
        { sport: 'basketball', date: '2026-04-09', time: '7:00 AM', venue: 'SNS College of Technology, Vazhiyampalayam, Saravanampatti, Coimbatore-641035' },
      ],
      extraDocuments: [
        {
          titleEn: 'Sports Certificates',
          titleTa: 'விளையாட்டு சான்றிதழ்கள்',
          detailEn: 'Bring original Basketball achievement certificates (school / district / state / national level) for verification.',
          detailTa: 'சரிபார்ப்புக்காக அசல் கூடைப்பந்து சாதனை சான்றிதழ்கள் (பள்ளி/மாவட்டம்/மாநிலம்/தேசிய நிலை) கொண்டு வரவும்.',
        },
        {
          titleEn: 'Academic Certificates',
          titleTa: 'கல்விச் சான்றிதழ்கள்',
          detailEn: 'Original 10th & 12th marks cards for verification.',
          detailTa: 'சரிபார்ப்புக்காக அசல் 10-ஆம் & 12-ஆம் வகுப்பு மதிப்பெண் அட்டைகள்.',
        },
      ],
      applicationDeadline: '9 April 2026',
    },
    contact: {
      sportsOfficer: 'SNS Sports Cell',
      designation: 'Department of Physical Education',
      phone: '+91-81441-55544',
      website: 'https://www.snsgroups.com',
    },
    verification: 'verified',
    sourceUrl: 'https://www.snsgroups.com',
    sourceNote: 'Direct from SNS Group Sports Scholarship Selection Trials 2026-27 notification (provided by team May 2026). Basketball-only joint trial covering SNS College of Technology (autonomous engineering, Vazhiyampalayam, Saravanampatti, Coimbatore-641035) and Dr. SNS Rajalakshmi College of Arts and Science. Single-day trial on 9 April 2026 at 7:00 AM. Open to Boys and Girls. Up to 100% sports scholarship for selected players. QR code registration via the official poster. Phone: +91-81441-55544. Website: https://www.snsgroups.com',
    lastVerified: '2026-05-14',
  },

  // ─── VERIFIED: Holy Cross College (Autonomous), Trichy ──────────────────
  // Source: Official Holy Cross College Tiruchirappalli Sports Quota
  // Admission 2026-27 notification (provided by team May 2026). Autonomous
  // women's arts and science college, Tiruchirappalli. Single-day trial
  // on 31 March 2026, 7:00 AM. WOMEN ONLY — exclusively for sportswomen.
  // 100% Scholarship + Free Education + Free Accommodation + Free Food +
  // Medical Insurance + Government recruitment support under Sports Quota.
  {
    id: 'holycross_trichy',
    collegeName: 'Holy Cross College (Autonomous), Trichy',
    collegeNameTa: 'ஹோலி கிராஸ் கல்லூரி (தன்னாட்சி), திருச்சி',
    district: 'Tiruchirappalli',
    type: 'Autonomous',
    field: 'arts',
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district',
      sportsScholarship: '100% Scholarship + Completely Free Education + Free Accommodation + Free Food + Medical insurance for all players. Career support: recruitment under Sports Quota in Central and State Government. Exclusively for women.',
      schemes: [
        '100% Scholarship — completely free education',
        'Free accommodation and food',
        'Medical insurance for all selected players',
        'Career: recruitment support under Central & State Govt. Sports Quota',
        'WOMEN ONLY college',
      ],
      selectionProcess: 'Single-day offline trial on 31 March 2026 at 7:00 AM at Holy Cross College (Autonomous), Tiruchirappalli campus. Exclusively for women. Trials cover team sports (Volleyball, Basketball, Kabaddi, Hockey, Football, Handball, Kho-Kho, Cricket, Softball, Netball), racket sports (Ball Badminton, Table Tennis, Badminton, Tennis) and individual/combat sports (Athletics, Boxing, Chess, Fencing, Cycling, Swimming). Apply online via admission.hcctrichy.ac.in.',
      // Softball, Netball, Fencing, Cycling → 'other' (not in standard enum).
      // "Shuttle" = Shuttlecock = Badminton (deduped).
      sportsForMen: [],
      sportsForWomen: [
        'volleyball', 'basketball', 'kabaddi', 'hockey', 'football', 'handball',
        'kho-kho', 'cricket',
        'other', // Softball + Netball + Fencing + Cycling
        'ball-badminton', 'table-tennis', 'badminton', 'tennis',
        'athletics', 'boxing', 'chess', 'swimming',
      ],
      trialsMen: [],
      trialsWomen: [
        { sport: 'volleyball',     date: '2026-03-31', time: '7:00 AM', venue: 'Holy Cross College (Autonomous), Tiruchirappalli' },
        { sport: 'basketball',     date: '2026-03-31', time: '7:00 AM', venue: 'Holy Cross College (Autonomous), Tiruchirappalli' },
        { sport: 'kabaddi',        date: '2026-03-31', time: '7:00 AM', venue: 'Holy Cross College (Autonomous), Tiruchirappalli' },
        { sport: 'hockey',         date: '2026-03-31', time: '7:00 AM', venue: 'Holy Cross College (Autonomous), Tiruchirappalli' },
        { sport: 'football',       date: '2026-03-31', time: '7:00 AM', venue: 'Holy Cross College (Autonomous), Tiruchirappalli' },
        { sport: 'handball',       date: '2026-03-31', time: '7:00 AM', venue: 'Holy Cross College (Autonomous), Tiruchirappalli' },
        { sport: 'kho-kho',        date: '2026-03-31', time: '7:00 AM', venue: 'Holy Cross College (Autonomous), Tiruchirappalli' },
        { sport: 'cricket',        date: '2026-03-31', time: '7:00 AM', venue: 'Holy Cross College (Autonomous), Tiruchirappalli' },
        { sport: 'ball-badminton', date: '2026-03-31', time: '7:00 AM', venue: 'Holy Cross College (Autonomous), Tiruchirappalli' },
        { sport: 'table-tennis',   date: '2026-03-31', time: '7:00 AM', venue: 'Holy Cross College (Autonomous), Tiruchirappalli' },
        { sport: 'badminton',      date: '2026-03-31', time: '7:00 AM', venue: 'Holy Cross College (Autonomous), Tiruchirappalli' },
        { sport: 'tennis',         date: '2026-03-31', time: '7:00 AM', venue: 'Holy Cross College (Autonomous), Tiruchirappalli' },
        { sport: 'athletics',      date: '2026-03-31', time: '7:00 AM', venue: 'Holy Cross College (Autonomous), Tiruchirappalli' },
        { sport: 'boxing',         date: '2026-03-31', time: '7:00 AM', venue: 'Holy Cross College (Autonomous), Tiruchirappalli' },
        { sport: 'chess',          date: '2026-03-31', time: '7:00 AM', venue: 'Holy Cross College (Autonomous), Tiruchirappalli' },
        { sport: 'swimming',       date: '2026-03-31', time: '7:00 AM', venue: 'Holy Cross College (Autonomous), Tiruchirappalli' },
        { sport: 'other',          date: '2026-03-31', time: '7:00 AM', venue: 'Holy Cross College (Autonomous), Tiruchirappalli' }, // Softball + Netball + Fencing + Cycling
      ],
      extraDocuments: [
        {
          titleEn: 'Sports Certificates',
          titleTa: 'விளையாட்டு சான்றிதழ்கள்',
          detailEn: 'Original sports achievement and participation certificates for verification at the trial.',
          detailTa: 'விளையாட்டு சாதனை மற்றும் பங்கேற்பு சான்றிதழ்கள் (அசல்) - முயற்சியில் சரிபார்ப்புக்காக.',
        },
        {
          titleEn: 'Academic Certificates',
          titleTa: 'கல்விச் சான்றிதழ்கள்',
          detailEn: 'Original 10th and 12th marks cards for verification.',
          detailTa: 'அசல் 10-ஆம் மற்றும் 12-ஆம் வகுப்பு மதிப்பெண் அட்டைகள் சரிபார்ப்புக்காக.',
        },
      ],
      applicationDeadline: '31 March 2026',
    },
    contact: {
      sportsOfficer: 'Dr. Glady',
      designation: 'Sports Department',
      phone: '+91-85085-32365',
      sportsOfficer2: 'Ms. Bhavithra',
      designation2: 'Sports Department',
      phone2: '+91-63813-22533',
      website: 'https://www.hcctrichy.ac.in',
      applicationLink: 'https://admission.hcctrichy.ac.in/',
    },
    verification: 'verified',
    sourceUrl: 'https://www.hcctrichy.ac.in',
    sourceNote: 'Direct from Holy Cross College (Autonomous), Tiruchirappalli Sports Quota Admission 2026-27 notification (provided by team May 2026). WOMEN ONLY autonomous arts & science college in Tiruchirappalli. Single-day trial on 31 March 2026, 7:00 AM. Comprehensive benefits package: 100% Scholarship, completely free education, free accommodation & food, medical insurance for all players, career recruitment support under Central & State Govt. Sports Quota. Sports covered: team sports (Volleyball, Basketball, Kabaddi, Hockey, Football, Handball, Kho-Kho, Cricket, Softball, Netball), racket sports (Ball Badminton, Table Tennis, Badminton, Tennis), individual/combat sports (Athletics, Boxing, Chess, Fencing, Cycling, Swimming). Contacts: Dr. Glady 8508532365, Ms. Bhavithra 6381322533. Apply online at admission.hcctrichy.ac.in.',
    lastVerified: '2026-05-14',
  },

  // ─── VERIFIED: Hindusthan College of Engineering and Technology (HiCET) ─
  // Source: Official HiCET Sports Quota Admissions 2026-27 notification
  // (provided by team May 2026). Autonomous AICTE-approved engineering
  // college, NAAC A++ accredited, affiliated to Anna University. Located at
  // Valley Campus, Pollachi Highway, Coimbatore. Two-day trial schedule:
  // Boys on 17 April 2026, Girls on 18 April 2026. 100% Sports Scholarship.
  {
    id: 'hicet_coimbatore',
    collegeName: 'Hindusthan College of Engineering and Technology (HiCET)',
    collegeNameTa: 'ஹிந்துஸ்தான் பொறியியல் மற்றும் தொழில்நுட்பக் கல்லூரி (HiCET)',
    district: 'Coimbatore',
    type: 'Autonomous',
    field: 'engineering',
    counsellingBody: 'TNEA',
    overrides: {
      minLevel: 'district',
      sportsScholarship: '100% Sports Scholarship for aspiring sportspeople (both boys and girls). Autonomous AICTE-approved NAAC A++ engineering college affiliated to Anna University, Chennai. Admissions open for Engineering (BE/BTech) and Management (MBA, MCA, ME) programmes.',
      schemes: [
        '100% Sports Scholarship for selected players (boys and girls)',
        'Autonomous · AICTE approved · NAAC A++ accredited',
        'Affiliated to Anna University, Chennai',
        'UG: AIML, CSE, EEE, ECE, Aero, IT, Mech, Food Tech, Civil, Mechatronics, EIE, Auto, Bio-Med, Agri, Chem',
        'PG: MBA, MCA, ME',
      ],
      selectionProcess: 'Two-day offline selection trials at HiCET Valley Campus, Pollachi Highway, Coimbatore. Boys trial on 17 April 2026; Girls trial on 18 April 2026. Register by scanning the QR code provided on the official poster. Trials cover 12 sports: Ball Badminton, Basketball, Volleyball, Kho-Kho, Badminton, Table Tennis, Kabaddi, Handball, Hockey, Athletics, Tennis, Cricket — all open to both Men and Women.',
      sportsForMen: [
        'ball-badminton', 'basketball', 'volleyball', 'kho-kho',
        'badminton', 'table-tennis', 'kabaddi', 'handball',
        'hockey', 'athletics', 'tennis', 'cricket',
      ],
      sportsForWomen: [
        'ball-badminton', 'basketball', 'volleyball', 'kho-kho',
        'badminton', 'table-tennis', 'kabaddi', 'handball',
        'hockey', 'athletics', 'tennis', 'cricket',
      ],
      trialsMen: [
        { sport: 'ball-badminton', date: '2026-04-17', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'basketball',     date: '2026-04-17', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'volleyball',     date: '2026-04-17', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'kho-kho',        date: '2026-04-17', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'badminton',      date: '2026-04-17', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'table-tennis',   date: '2026-04-17', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'kabaddi',        date: '2026-04-17', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'handball',       date: '2026-04-17', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'hockey',         date: '2026-04-17', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'athletics',      date: '2026-04-17', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'tennis',         date: '2026-04-17', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'cricket',        date: '2026-04-17', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
      ],
      trialsWomen: [
        { sport: 'ball-badminton', date: '2026-04-18', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'basketball',     date: '2026-04-18', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'volleyball',     date: '2026-04-18', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'kho-kho',        date: '2026-04-18', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'badminton',      date: '2026-04-18', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'table-tennis',   date: '2026-04-18', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'kabaddi',        date: '2026-04-18', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'handball',       date: '2026-04-18', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'hockey',         date: '2026-04-18', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'athletics',      date: '2026-04-18', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'tennis',         date: '2026-04-18', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
        { sport: 'cricket',        date: '2026-04-18', time: '8:00 AM', venue: 'HiCET Valley Campus, Pollachi Highway, Coimbatore' },
      ],
      extraDocuments: [
        {
          titleEn: 'Sports Certificates',
          titleTa: 'விளையாட்டு சான்றிதழ்கள்',
          detailEn: 'Original sports achievement certificates (school / district / state / national / inter-collegiate level) for verification at the trial.',
          detailTa: 'விளையாட்டு சாதனை சான்றிதழ்கள் (பள்ளி/மாவட்டம்/மாநிலம்/தேசிய/கல்லூரிகளுக்கிடையேயான நிலை) அசலில் சரிபார்ப்புக்காக.',
        },
        {
          titleEn: 'Academic Certificates',
          titleTa: 'கல்விச் சான்றிதழ்கள்',
          detailEn: 'Original 10th and 12th mark sheets; for PG admissions also bring UG provisional/degree certificate.',
          detailTa: 'அசல் 10-ஆம் & 12-ஆம் வகுப்பு மதிப்பெண் அட்டைகள்; PG சேர்க்கைக்கு UG தற்காலிக/பட்டச் சான்றிதழும் கொண்டு வரவும்.',
        },
      ],
      applicationDeadline: '17 April 2026 (Boys) / 18 April 2026 (Girls)',
    },
    contact: {
      sportsOfficer: 'Lt Dr. Ravikumar V',
      designation: 'Director of Physical Education',
      phone: '+91-98943-01002',
      sportsOfficer2: 'Mr. Vimal',
      designation2: 'Sports Department',
      phone2: '+91-99947-73060',
      website: 'https://www.hicet.ac.in',
    },
    verification: 'verified',
    sourceUrl: 'https://www.hicet.ac.in',
    sourceNote: 'Direct from Hindusthan College of Engineering and Technology (HiCET) Sports Quota Admissions 2026-27 notification (provided by team May 2026). Autonomous AICTE-approved engineering college, NAAC A++ accredited, affiliated to Anna University, Chennai. Valley Campus, Pollachi Highway, Coimbatore. Two-day trial: Boys 17 April 2026, Girls 18 April 2026. 100% Sports Scholarship for selected players. 12 sports for both M & W: Ball Badminton, Basketball, Volleyball, Kho-Kho, Badminton, Table Tennis, Kabaddi, Handball, Hockey, Athletics, Tennis, Cricket. UG programmes: AIML, CSE, EEE, ECE, Aeronautical, IT, Mechanical, Food Tech, Civil, Mechatronics, EIE, Automobile, Bio-Medical, Agricultural, Chemical. PG: MBA, MCA, ME. Contacts: Lt Dr. Ravikumar V 98943 01002, Mr. Vimal 99947 73060, Mr. Kannan 86670 63961, Mr. Bharani 81480 01621. QR code registration via official poster.',
    lastVerified: '2026-05-14',
  },

  // ─── VERIFIED: Dr. N.G.P. Arts and Science College, Coimbatore ──────────
  // Source: Official Dr. N.G.P. Arts and Science College Sports Quota
  // Selection Trials 2026-27 notification (provided by team May 2026).
  // Separate from Dr. N.G.P. Institute of Technology (ngpit_coimbatore) —
  // this is the dedicated arts and science college. Four-day trial schedule
  // (15-18 April 2026) covering Kabaddi, Athletics, Volleyball, Basketball.
  // Most events are Men-only; Athletics open to Men & Women. Comprehensive
  // benefits: completely free education + food + accommodation + kits +
  // medical insurance + KMCH Hospital sports injury treatment.
  {
    id: 'drngpasc_coimbatore',
    collegeName: 'Dr. N.G.P. Arts and Science College',
    collegeNameTa: 'டாக்டர். என்.ஜி.பி. கலை மற்றும் அறிவியல் கல்லூரி',
    district: 'Coimbatore',
    type: 'Autonomous',
    field: 'arts',
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district',
      sportsScholarship: 'Completely FREE education for UG and PG sports-quota admits — includes free food and accommodation, playing kits, medical insurance, healthy dietary food, free physiotherapy, and free treatment for sports injuries at KMCH Hospital. Integrated infrastructure for combined education and sports training with qualified coaching staff.',
      schemes: [
        'Completely FREE education + food + accommodation',
        'Free playing kits and sports equipment',
        'Medical insurance + healthy dietary food + free physiotherapy',
        'Free sports-injury treatment at KMCH Hospital',
        'Qualified coaching staff + integrated training infrastructure',
        'Both UG and PG sports quota admissions',
      ],
      selectionProcess: 'Four-day sport-specific trial schedule at Dr. N.G.P. Arts and Science College, Coimbatore. All trials begin at 8:00 AM. Kabaddi (Men): 15 April 2026; Athletics (Men & Women): 16 April 2026; Volleyball (Men): 17 April 2026; Basketball (Men): 18 April 2026. Bring sports + academic certificates in original.',
      sportsForMen: ['kabaddi', 'athletics', 'volleyball', 'basketball'],
      sportsForWomen: ['athletics'],
      trialsMen: [
        { sport: 'kabaddi',    date: '2026-04-15', time: '8:00 AM', venue: 'Dr. N.G.P. Arts and Science College, Coimbatore' },
        { sport: 'athletics',  date: '2026-04-16', time: '8:00 AM', venue: 'Dr. N.G.P. Arts and Science College, Coimbatore' },
        { sport: 'volleyball', date: '2026-04-17', time: '8:00 AM', venue: 'Dr. N.G.P. Arts and Science College, Coimbatore' },
        { sport: 'basketball', date: '2026-04-18', time: '8:00 AM', venue: 'Dr. N.G.P. Arts and Science College, Coimbatore' },
      ],
      trialsWomen: [
        { sport: 'athletics',  date: '2026-04-16', time: '8:00 AM', venue: 'Dr. N.G.P. Arts and Science College, Coimbatore' },
      ],
      extraDocuments: [
        {
          titleEn: 'Sports Certificates',
          titleTa: 'விளையாட்டு சான்றிதழ்கள்',
          detailEn: 'Original achievement and participation certificates for the trial sport — school, district, state, national, or university level.',
          detailTa: 'விளையாட்டுக்கான அசல் சாதனை மற்றும் பங்கேற்பு சான்றிதழ்கள் — பள்ளி, மாவட்டம், மாநிலம், தேசிய அல்லது பல்கலைக்கழக நிலை.',
        },
        {
          titleEn: 'Academic Certificates',
          titleTa: 'கல்விச் சான்றிதழ்கள்',
          detailEn: 'Original 10th & 12th mark sheets (and UG provisional certificate for PG aspirants).',
          detailTa: 'அசல் 10-ஆம் & 12-ஆம் வகுப்பு மதிப்பெண் அட்டைகள் (PG-க்கு UG தற்காலிக சான்றிதழும்).',
        },
      ],
      applicationDeadline: '15-18 April 2026 (sport-specific)',
    },
    contact: {
      sportsOfficer: 'Mr. A. Thanasingh',
      designation: 'Sports Department',
      phone: '+91-94445-66273',
      sportsOfficer2: 'Mr. D. Vinoth Rohan',
      designation2: 'Sports Department',
      phone2: '+91-63838-34632',
      email: 'drngpsports@gmail.com',
      website: 'https://www.drngpasc.ac.in',
    },
    verification: 'verified',
    sourceUrl: 'https://www.drngpasc.ac.in',
    sourceNote: 'Direct from Dr. N.G.P. Arts and Science College Sports Quota Selection Trials 2026-27 notification (provided by team May 2026). Autonomous arts and science college in Coimbatore (separate institution from Dr. N.G.P. Institute of Technology). Four-day sport-wise trial schedule starting 8:00 AM: Kabaddi M (15 Apr), Athletics M+W (16 Apr), Volleyball M (17 Apr), Basketball M (18 Apr). UG + PG sports quota admissions. Comprehensive support: completely free education + food + accommodation + playing kits + medical insurance + healthy dietary food + free physiotherapy + free KMCH Hospital sports-injury treatment. Coaching: qualified coaching staff with integrated education-sports infrastructure. Contacts: Mr. A. Thanasingh 94445 66273, Mr. D. Vinoth Rohan 63838 34632, Ms. T. Dhurga Devi 82487 16027. Email: drngpsports@gmail.com. Website: https://www.drngpasc.ac.in',
    lastVerified: '2026-05-14',
  },

  // ─── VERIFIED: Shree Venkateshwara Group of Institutions, Erode ─────────
  // Source: Official Shree Venkateshwara Group of Institutions Sports Quota
  // Selection Trials 2026 notification (provided by team May 2026). Located
  // at Othakuthirai, Gobichettipalayam, Erode. Two-day trial schedule:
  // 7 April 2026 and 8 April 2026. Up to 100% free education for deserving
  // sports players based on achievement and trial performance. The flyer
  // does not split events by gender, so trials are treated as open to both
  // Men and Women. The flyer also does not state a reporting time, so the
  // trial time is marked "See poster" rather than guessed. Carrom, Throwball
  // and Best Physique are not in the standard Sport enum — mapped to 'other'.
  {
    id: 'svgi_erode',
    collegeName: 'Shree Venkateshwara Group of Institutions',
    collegeNameTa: 'ஶ்ரீ வெங்கடேஶ்வரா குழும நிறுவனங்கள்',
    district: 'Erode',
    type: 'Private',
    field: 'engineering',
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district',
      sportsScholarship: 'Up to 100% free education for deserving sports players, awarded based on sporting achievements and performance in the selection trials. Trials conducted across two days covering a wide range of team, combat and individual sports.',
      schemes: [
        'Up to 100% free education for deserving sports players',
        'Scholarship based on achievements + trial performance',
        'Two-day trial schedule covering 16 sports',
        'Open to both Men and Women',
      ],
      selectionProcess: 'Two-day offline selection trials at Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode. Day 1 (7 April 2026): Kabaddi, Volleyball, Chess, Carrom, Cricket, Football, Handball, Throwball. Day 2 (8 April 2026): Kho-Kho, Weight Lifting, Power Lifting, Best Physique, Wrestling, Hockey, Athletics (Track & Field), Yoga. Bring sports achievement certificates for verification. Contact a coordinator to register.',
      sportsForMen: [
        'kabaddi', 'volleyball', 'chess', 'cricket', 'football', 'handball',
        'kho-kho', 'weightlifting', 'powerlifting', 'wrestling', 'hockey',
        'athletics', 'yoga',
        'other', // Carrom + Throwball + Best Physique
      ],
      sportsForWomen: [
        'kabaddi', 'volleyball', 'chess', 'cricket', 'football', 'handball',
        'kho-kho', 'weightlifting', 'powerlifting', 'wrestling', 'hockey',
        'athletics', 'yoga',
        'other', // Carrom + Throwball + Best Physique
      ],
      trialsMen: [
        { sport: 'kabaddi',      date: '2026-04-07', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'volleyball',   date: '2026-04-07', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'chess',        date: '2026-04-07', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'cricket',      date: '2026-04-07', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'football',     date: '2026-04-07', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'handball',     date: '2026-04-07', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'other',        date: '2026-04-07', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' }, // Carrom + Throwball (Day 1)
        { sport: 'kho-kho',      date: '2026-04-08', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'weightlifting', date: '2026-04-08', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'powerlifting', date: '2026-04-08', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'wrestling',    date: '2026-04-08', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'hockey',       date: '2026-04-08', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'athletics',    date: '2026-04-08', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'yoga',         date: '2026-04-08', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'other',        date: '2026-04-08', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' }, // Best Physique (Day 2)
      ],
      trialsWomen: [
        { sport: 'kabaddi',      date: '2026-04-07', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'volleyball',   date: '2026-04-07', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'chess',        date: '2026-04-07', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'cricket',      date: '2026-04-07', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'football',     date: '2026-04-07', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'handball',     date: '2026-04-07', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'other',        date: '2026-04-07', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' }, // Carrom + Throwball (Day 1)
        { sport: 'kho-kho',      date: '2026-04-08', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'weightlifting', date: '2026-04-08', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'powerlifting', date: '2026-04-08', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'wrestling',    date: '2026-04-08', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'hockey',       date: '2026-04-08', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'athletics',    date: '2026-04-08', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'yoga',         date: '2026-04-08', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' },
        { sport: 'other',        date: '2026-04-08', time: 'See poster', venue: 'Shree Venkateshwara Group of Institutions, Othakuthirai, Gobichettipalayam, Erode' }, // Best Physique (Day 2)
      ],
      extraDocuments: [
        {
          titleEn: 'Sports Certificates',
          titleTa: 'விளையாட்டு சான்றிதழ்கள்',
          detailEn: 'Original sports achievement and participation certificates for verification at the trial.',
          detailTa: 'முயற்சியில் சரிபார்ப்புக்காக அசல் விளையாட்டு சாதனை மற்றும் பங்கேற்பு சான்றிதழ்கள்.',
        },
        {
          titleEn: 'Academic Certificates',
          titleTa: 'கல்விச் சான்றிதழ்கள்',
          detailEn: 'Original 10th and 12th mark sheets for verification.',
          detailTa: 'சரிபார்ப்புக்காக அசல் 10-ஆம் மற்றும் 12-ஆம் வகுப்பு மதிப்பெண் அட்டைகள்.',
        },
      ],
      applicationDeadline: '7-8 April 2026 (trial dates)',
    },
    contact: {
      sportsOfficer: 'Mr. N. Prabakaran',
      designation: 'Sports Quota Coordinator',
      phone: '+91-80156-43050',
      sportsOfficer2: 'Mr. P. Dinesh',
      designation2: 'Sports Quota Coordinator',
      phone2: '+91-96591-21351',
    },
    verification: 'verified',
    sourceNote: 'Direct from Shree Venkateshwara Group of Institutions Sports Quota Selection Trials 2026 notification (provided by team May 2026). Located at Othakuthirai, Gobichettipalayam, Erode. Up to 100% free education for deserving sports players based on achievements and trial performance. Two-day trial schedule: Day 1 (7 April 2026) — Kabaddi, Volleyball, Chess, Carrom, Cricket, Football, Handball, Throwball; Day 2 (8 April 2026) — Kho-Kho, Weight Lifting, Power Lifting, Best Physique, Wrestling, Hockey, Athletics (Track & Field), Yoga. Carrom, Throwball and Best Physique mapped to "other" (not in standard enum). Flyer does not split events by gender — treated as open to both Men and Women. Coordinators: Mr. N. Prabakaran 80156 43050, Mr. P. Dinesh 96591 21351, Mr. A. Elavarasan 95976 72410, Mr. K. Manikandan 96987 82434, Ms. S. Bhavani 84385 43050, Mr. N. Ramu Udhyakumar 96888 82626.',
    lastVerified: '2026-05-14',
  },

  // ─── VERIFIED: Excel Group Institutions, Komarapalayam ─────────────────
  // Source: Official Excel Group Institutions Sports Quota Admissions &
  // Selection Trials 2026-27 notification (provided by team May 2026).
  // Located on NH-544, Salem-Coimbatore Highway, Komarapalayam-637 303
  // (Namakkal district). Single-day trial on 29 May 2026, 9:30 AM at the
  // Excel Aero Ground. Open to District / State / National level athletes
  // with valid sports achievement certificates. All events open to Men &
  // Women except Football, which is Men-only. Judo mapped to 'martial-arts'.
  {
    id: 'excel_komarapalayam',
    collegeName: 'Excel Group Institutions',
    collegeNameTa: 'எக்செல் குழும நிறுவனங்கள்',
    district: 'Namakkal',
    type: 'Private',
    field: 'engineering',
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district',
      sportsScholarship: 'Sports Quota admissions for the 2026-27 academic year. Open to District, State and National level participants with valid sports achievement certificates. The institution seeks athletes with discipline, commitment, team spirit, strong athletic performance and leadership qualities.',
      schemes: [
        'Sports Quota admissions for 2026-27',
        'Open to District / State / National level athletes',
        'Valid sports achievement certificates required',
        'All events open to Men & Women (Football is Men-only)',
      ],
      selectionProcess: 'Single-day offline selection trials on 29 May 2026, starting 9:30 AM at the Excel Aero Ground, Excel Group Institutions, NH-544, Salem-Coimbatore Highway, Komarapalayam-637 303. Trials cover team sports (Volleyball, Ball Badminton, Basketball, Football [Men only], Kabaddi), combat sports (Judo, Taekwondo, Boxing, Wrestling) and individual/field sports (Athletics Track & Field, Table Tennis, Weight Lifting). Bring valid sports achievement certificates for verification.',
      sportsForMen: [
        'volleyball', 'ball-badminton', 'basketball', 'football', 'kabaddi',
        'martial-arts', // Judo
        'taekwondo', 'boxing', 'wrestling',
        'athletics', 'table-tennis', 'weightlifting',
      ],
      sportsForWomen: [
        'volleyball', 'ball-badminton', 'basketball', 'kabaddi',
        'martial-arts', // Judo
        'taekwondo', 'boxing', 'wrestling',
        'athletics', 'table-tennis', 'weightlifting',
      ],
      trialsMen: [
        { sport: 'volleyball',    date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
        { sport: 'ball-badminton', date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
        { sport: 'basketball',    date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
        { sport: 'football',      date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
        { sport: 'kabaddi',       date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
        { sport: 'martial-arts',  date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' }, // Judo
        { sport: 'taekwondo',     date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
        { sport: 'boxing',        date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
        { sport: 'wrestling',     date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
        { sport: 'athletics',     date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
        { sport: 'table-tennis',  date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
        { sport: 'weightlifting', date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
      ],
      trialsWomen: [
        { sport: 'volleyball',    date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
        { sport: 'ball-badminton', date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
        { sport: 'basketball',    date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
        { sport: 'kabaddi',       date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
        { sport: 'martial-arts',  date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' }, // Judo
        { sport: 'taekwondo',     date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
        { sport: 'boxing',        date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
        { sport: 'wrestling',     date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
        { sport: 'athletics',     date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
        { sport: 'table-tennis',  date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
        { sport: 'weightlifting', date: '2026-05-29', time: '9:30 AM', venue: 'Excel Aero Ground, Excel Group Institutions, NH-544, Komarapalayam' },
      ],
      extraDocuments: [
        {
          titleEn: 'Sports Achievement Certificates',
          titleTa: 'விளையாட்டு சாதனை சான்றிதழ்கள்',
          detailEn: 'Valid original sports achievement certificates at District, State or National level — required for eligibility and verification at the trial.',
          detailTa: 'மாவட்டம், மாநிலம் அல்லது தேசிய அளவிலான செல்லுபடியாகும் அசல் விளையாட்டு சாதனை சான்றிதழ்கள் — தகுதி மற்றும் சரிபார்ப்புக்குத் தேவை.',
        },
        {
          titleEn: 'Academic Certificates',
          titleTa: 'கல்விச் சான்றிதழ்கள்',
          detailEn: 'Original 10th and 12th mark sheets for verification.',
          detailTa: 'சரிபார்ப்புக்காக அசல் 10-ஆம் மற்றும் 12-ஆம் வகுப்பு மதிப்பெண் அட்டைகள்.',
        },
      ],
      applicationDeadline: '29 May 2026 (trial date)',
    },
    contact: {
      sportsOfficer: 'C. Vivek',
      designation: 'Physical Director',
      phone: '+91-99435-29099',
      sportsOfficer2: 'G. Raja',
      designation2: 'Physical Director',
      phone2: '+91-99444-05054',
      website: 'https://excelinstitutions.com',
    },
    verification: 'verified',
    sourceUrl: 'https://excelinstitutions.com',
    sourceNote: 'Direct from Excel Group Institutions Sports Quota Admissions & Selection Trials 2026-27 notification (provided by team May 2026). Located on NH-544, Salem-Coimbatore Highway, Komarapalayam-637 303 (Namakkal district). Single-day trial on 29 May 2026, 9:30 AM at the Excel Aero Ground. Trials for Men & Women: team sports (Volleyball, Ball Badminton, Basketball, Football [Men only], Kabaddi), combat sports (Judo, Taekwondo, Boxing, Wrestling), individual/field sports (Athletics Track & Field, Table Tennis, Weight Lifting). Judo mapped to "martial-arts". Open to District / State / National level participants with valid sports achievement certificates. Physical Directors: C. Vivek 99435 29099, G. Raja 99444 05054, L. Prakash 93454 10153. Website: excelinstitutions.com',
    lastVerified: '2026-05-14',
  },

  // ─── VERIFIED: Vellalar College for Women (Autonomous), Erode ───────────
  // Source: Official Vellalar College for Women Sports Quota Admission
  // 2026-27 notification (provided by team May 2026). WOMEN ONLY autonomous
  // arts & science college at Thindal, Erode, affiliated to Bharathiar
  // University, Coimbatore. Scholarship is MERIT-CERTIFICATE based — no fixed
  // selection-trial date on the flyer; scholarship awarded on sports merit
  // certificates, judged on peak performance over the past two calendar
  // years. Because there is no trial date, applicationDeadline / trialsMen /
  // trialsWomen are intentionally omitted — the Discovery card will show
  // "Direct admission · Contact college". Wushu is not in the standard Sport
  // enum — mapped to 'other'. Judo → 'martial-arts'.
  {
    id: 'vellalar_erode',
    collegeName: 'Vellalar College for Women (Autonomous)',
    collegeNameTa: 'வெள்ளாளர் மகளிர் கல்லூரி (தன்னாட்சி)',
    district: 'Erode',
    type: 'Autonomous',
    field: 'arts',
    counsellingBody: 'Direct',
    overrides: {
      minLevel: 'district',
      achievementWindowYears: 2,
      sportsScholarship: 'Sports Quota Scholarship awarded on the basis of sports merit certificates. Selection considers the candidate\'s peak performance over the past two calendar years. WOMEN ONLY autonomous arts & science college at Thindal, Erode, affiliated to Bharathiar University, Coimbatore.',
      schemes: [
        'Sports Quota Scholarship based on sports merit certificates',
        'Selection judged on peak performance over the last 2 calendar years',
        'Affiliated to Bharathiar University, Coimbatore',
        'WOMEN ONLY college',
      ],
      selectionProcess: 'Scholarship-based admission via the Department of Physical Education. No fixed selection-trial date — the Sports Quota Scholarship is awarded on the strength of submitted sports merit certificates, with the candidate\'s peak performance over the past two calendar years (2024 and 2025) considered. Contact the college directly for admission and to submit certificates. Phone: 99948 68115 / 70101 42525. Email: vcwsportsquota@gmail.com. Instagram: @vellalites_sports.',
      // WOMEN ONLY — sportsForMen left intentionally empty.
      // Wushu not in standard enum → 'other'. Judo → 'martial-arts'.
      sportsForMen: [],
      sportsForWomen: [
        'football', 'handball', 'ball-badminton', 'badminton', 'volleyball',
        'kho-kho', 'kabaddi', 'cricket',
        'tennis', 'table-tennis', 'chess',
        'wrestling', 'taekwondo', 'boxing', 'karate',
        'martial-arts', // Judo
        'other', // Wushu
        'athletics', 'powerlifting', 'weightlifting',
        'swimming',
      ],
      extraDocuments: [
        {
          titleEn: 'Sports Merit Certificates',
          titleTa: 'விளையாட்டு தகுதிச் சான்றிதழ்கள்',
          detailEn: 'Original sports merit / achievement certificates — peak performance over the past two calendar years is considered for the scholarship.',
          detailTa: 'அசல் விளையாட்டு தகுதி / சாதனை சான்றிதழ்கள் — கடந்த இரண்டு நாட்காட்டி ஆண்டுகளில் சிறந்த செயல்திறன் உதவித்தொகைக்காகக் கருதப்படும்.',
        },
        {
          titleEn: 'Academic Certificates',
          titleTa: 'கல்விச் சான்றிதழ்கள்',
          detailEn: 'Original 10th and 12th mark sheets for admission.',
          detailTa: 'சேர்க்கைக்காக அசல் 10-ஆம் மற்றும் 12-ஆம் வகுப்பு மதிப்பெண் அட்டைகள்.',
        },
      ],
    },
    contact: {
      sportsOfficer: 'Department of Physical Education',
      designation: 'Sports Quota Admissions',
      phone: '+91-99948-68115',
      phone2: '+91-70101-42525',
      email: 'vcwsportsquota@gmail.com',
    },
    verification: 'verified',
    sourceNote: 'Direct from Vellalar College for Women (Autonomous) Sports Quota Admission 2026-27 notification (provided by team May 2026). WOMEN ONLY autonomous arts & science college at Thindal, Erode, affiliated to Bharathiar University, Coimbatore. Sports Quota Scholarship awarded on sports merit certificates — selection considers peak performance over the past two calendar years. No fixed trial date on the flyer (merit-certificate based admission). Eligible disciplines: Football, Handball, Ball Badminton, Badminton, Volleyball, Kho-Kho, Kabaddi, Cricket, Tennis, Table Tennis, Chess, Wrestling, Taekwondo, Boxing, Karate, Judo, Wushu, Athletics, Power Lifting, Weight Lifting, Swimming. Wushu mapped to "other" (not in standard enum); Judo mapped to "martial-arts". Contact: Phone 99948 68115 / 70101 42525, Email vcwsportsquota@gmail.com, Instagram @vellalites_sports.',
    lastVerified: '2026-05-14',
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
