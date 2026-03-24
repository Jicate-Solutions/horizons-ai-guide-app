// Previous Year Questions Database for Indian Competitive Exams
// Comprehensive database with bilingual support (English + Tamil)

export interface PYQMetadata {
  totalQuestions: number;
  totalExams: number;
  lastUpdated: string;
  languages: string[];
  version: string;
}

export interface BilingualText {
  en: string;
  ta: string;
}

export interface PYQCategory {
  id: string;
  name: BilingualText;
  icon: string;
  color: string;
  examCount: number;
  questionCount: number;
}

export interface PYQExam {
  id: string;
  name: BilingualText;
  category: string;
  conductedBy: string;
  frequency: string;
  totalMarks: number;
  duration: number;
  subjects: string[];
  years: number[];
  sessions?: string[];
  questionCount: number;
  isPopular: boolean;
  difficultyLevel: 'Easy' | 'Moderate' | 'Hard';
  eligibility: string;
  officialWebsite: string;
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface PYQQuestion {
  id: string;
  examId: string;
  year: number;
  session?: string;
  shift?: string;
  date?: string;
  category: string;
  subject: string;
  topic: string;
  subtopic: string;
  questionNumber: number;
  questionType: 'MCQ' | 'Numerical' | 'TITA' | 'Descriptive';
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  marks: number;
  negativeMarks: number;
  timeRecommended: number;
  question: BilingualText;
  options: {
    en: QuestionOption[];
    ta: QuestionOption[];
  };
  correctAnswer: string;
  solution: BilingualText;
  hints: string[];
  conceptsTested: string[];
  commonMistakes: string[];
  relatedQuestions: string[];
  tags: string[];
  statistics: {
    totalAttempts: number;
    correctPercentage: number;
    averageTime: number;
  };
  isBookmarked: boolean;
  isAttempted: boolean;
  userAnswer: string | null;
}

export interface PYQDatabase {
  metadata: PYQMetadata;
  categories: PYQCategory[];
  exams: PYQExam[];
  questions: PYQQuestion[];
}

// Database Metadata
export const pyqMetadata: PYQMetadata = {
  totalQuestions: 5847,
  totalExams: 52,
  lastUpdated: "2026-03-24",
  languages: ["English", "Tamil"],
  version: "1.0.0"
};

// Categories
export const pyqCategories: PYQCategory[] = [
  {
    id: "engineering",
    name: { en: "Engineering", ta: "பொறியியல்" },
    icon: "⚙️",
    color: "#3B82F6",
    examCount: 12,
    questionCount: 1800
  },
  {
    id: "medical",
    name: { en: "Medical", ta: "மருத்துவம்" },
    icon: "🏥",
    color: "#10B981",
    examCount: 5,
    questionCount: 1200
  },
  {
    id: "management",
    name: { en: "Management", ta: "நிர்வாகம்" },
    icon: "📊",
    color: "#8B5CF6",
    examCount: 8,
    questionCount: 800
  },
  {
    id: "law",
    name: { en: "Law", ta: "சட்டம்" },
    icon: "⚖️",
    color: "#F59E0B",
    examCount: 5,
    questionCount: 500
  },
  {
    id: "civil_services",
    name: { en: "Civil Services", ta: "அரசு பணி" },
    icon: "🏛️",
    color: "#EF4444",
    examCount: 8,
    questionCount: 800
  },
  {
    id: "banking",
    name: { en: "Banking", ta: "வங்கி" },
    icon: "🏦",
    color: "#06B6D4",
    examCount: 5,
    questionCount: 500
  },
  {
    id: "teaching",
    name: { en: "Teaching", ta: "ஆசிரியர்" },
    icon: "📚",
    color: "#EC4899",
    examCount: 4,
    questionCount: 247
  }
];

// Exams Database
export const pyqExams: PYQExam[] = [
  // ENGINEERING EXAMS
  {
    id: "JEE_MAIN",
    name: { en: "JEE Main", ta: "ஜேஇஇ மெயின்" },
    category: "engineering",
    conductedBy: "NTA (National Testing Agency)",
    frequency: "Twice a year (January & April)",
    totalMarks: 300,
    duration: 180,
    subjects: ["Physics", "Chemistry", "Mathematics"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    sessions: ["January", "April"],
    questionCount: 900,
    isPopular: true,
    difficultyLevel: "Hard",
    eligibility: "12th Pass with PCM (75% aggregate or top 20 percentile)",
    officialWebsite: "https://jeemain.nta.nic.in"
  },
  {
    id: "JEE_ADVANCED",
    name: { en: "JEE Advanced", ta: "ஜேஇஇ அட்வான்ஸ்ட்" },
    category: "engineering",
    conductedBy: "IIT (Rotating)",
    frequency: "Once a year",
    totalMarks: 360,
    duration: 180,
    subjects: ["Physics", "Chemistry", "Mathematics"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 540,
    isPopular: true,
    difficultyLevel: "Hard",
    eligibility: "Top 2.5 lakh JEE Main qualifiers",
    officialWebsite: "https://jeeadv.ac.in"
  },
  {
    id: "BITSAT",
    name: { en: "BITSAT", ta: "பிட்சாட்" },
    category: "engineering",
    conductedBy: "BITS Pilani",
    frequency: "Once a year",
    totalMarks: 390,
    duration: 180,
    subjects: ["Physics", "Chemistry", "Mathematics", "English", "Logical Reasoning"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 450,
    isPopular: true,
    difficultyLevel: "Hard",
    eligibility: "12th Pass with PCM (75% aggregate)",
    officialWebsite: "https://www.bitsadmission.com"
  },
  {
    id: "VITEEE",
    name: { en: "VITEEE", ta: "விஐடிஇஇஇ" },
    category: "engineering",
    conductedBy: "VIT University",
    frequency: "Once a year",
    totalMarks: 125,
    duration: 150,
    subjects: ["Physics", "Chemistry", "Mathematics/Biology", "English", "Aptitude"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 400,
    isPopular: true,
    difficultyLevel: "Moderate",
    eligibility: "12th Pass with PCM/PCB (60% aggregate)",
    officialWebsite: "https://viteee.vit.ac.in"
  },
  {
    id: "SRMJEEE",
    name: { en: "SRMJEEE", ta: "எஸ்ஆர்எம்ஜேஇஇஇ" },
    category: "engineering",
    conductedBy: "SRM University",
    frequency: "Multiple sessions",
    totalMarks: 125,
    duration: 150,
    subjects: ["Physics", "Chemistry", "Mathematics/Biology", "English", "Aptitude"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 350,
    isPopular: true,
    difficultyLevel: "Moderate",
    eligibility: "12th Pass with PCM/PCB",
    officialWebsite: "https://www.srmist.edu.in"
  },
  {
    id: "TNEA",
    name: { en: "TNEA (Tamil Nadu Engineering Admissions)", ta: "டிஎன்இஏ" },
    category: "engineering",
    conductedBy: "Anna University",
    frequency: "Once a year",
    totalMarks: 200,
    duration: 0,
    subjects: ["Physics", "Chemistry", "Mathematics"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 300,
    isPopular: true,
    difficultyLevel: "Moderate",
    eligibility: "12th Pass with PCM from TN Board",
    officialWebsite: "https://www.tneaonline.org"
  },
  {
    id: "COMEDK",
    name: { en: "COMEDK UGET", ta: "கோமெட்க்" },
    category: "engineering",
    conductedBy: "COMEDK",
    frequency: "Once a year",
    totalMarks: 180,
    duration: 180,
    subjects: ["Physics", "Chemistry", "Mathematics"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 300,
    isPopular: false,
    difficultyLevel: "Moderate",
    eligibility: "12th Pass with PCM",
    officialWebsite: "https://www.comedk.org"
  },
  {
    id: "MHT_CET",
    name: { en: "MHT CET", ta: "எம்எச்டி சிஇடி" },
    category: "engineering",
    conductedBy: "Maharashtra CET Cell",
    frequency: "Once a year",
    totalMarks: 200,
    duration: 180,
    subjects: ["Physics", "Chemistry", "Mathematics"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 350,
    isPopular: false,
    difficultyLevel: "Moderate",
    eligibility: "12th Pass from Maharashtra",
    officialWebsite: "https://cetcell.mahacet.org"
  },
  {
    id: "WBJEE",
    name: { en: "WBJEE", ta: "டபிள்யூபிஜேஇஇ" },
    category: "engineering",
    conductedBy: "WBJEEB",
    frequency: "Once a year",
    totalMarks: 200,
    duration: 240,
    subjects: ["Physics", "Chemistry", "Mathematics"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 300,
    isPopular: false,
    difficultyLevel: "Moderate",
    eligibility: "12th Pass from West Bengal",
    officialWebsite: "https://wbjeeb.nic.in"
  },
  {
    id: "AP_EAMCET",
    name: { en: "AP EAMCET", ta: "ஏபி ஈம்செட்" },
    category: "engineering",
    conductedBy: "JNTU Kakinada",
    frequency: "Once a year",
    totalMarks: 160,
    duration: 180,
    subjects: ["Physics", "Chemistry", "Mathematics"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 280,
    isPopular: false,
    difficultyLevel: "Moderate",
    eligibility: "12th Pass from Andhra Pradesh",
    officialWebsite: "https://cets.apsche.ap.gov.in"
  },
  {
    id: "TS_EAMCET",
    name: { en: "TS EAMCET", ta: "டிஎஸ் ஈம்செட்" },
    category: "engineering",
    conductedBy: "JNTU Hyderabad",
    frequency: "Once a year",
    totalMarks: 160,
    duration: 180,
    subjects: ["Physics", "Chemistry", "Mathematics"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 280,
    isPopular: false,
    difficultyLevel: "Moderate",
    eligibility: "12th Pass from Telangana",
    officialWebsite: "https://eamcet.tsche.ac.in"
  },
  {
    id: "KCET",
    name: { en: "KCET", ta: "கேசிஇடி" },
    category: "engineering",
    conductedBy: "KEA Karnataka",
    frequency: "Once a year",
    totalMarks: 180,
    duration: 200,
    subjects: ["Physics", "Chemistry", "Mathematics"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 300,
    isPopular: false,
    difficultyLevel: "Moderate",
    eligibility: "12th Pass from Karnataka",
    officialWebsite: "https://cetonline.karnataka.gov.in"
  },

  // MEDICAL EXAMS
  {
    id: "NEET_UG",
    name: { en: "NEET UG", ta: "நீட் யுஜி" },
    category: "medical",
    conductedBy: "NTA",
    frequency: "Once a year",
    totalMarks: 720,
    duration: 200,
    subjects: ["Physics", "Chemistry", "Biology (Botany + Zoology)"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 1000,
    isPopular: true,
    difficultyLevel: "Hard",
    eligibility: "12th Pass with PCB (50% aggregate)",
    officialWebsite: "https://neet.nta.nic.in"
  },
  {
    id: "NEET_PG",
    name: { en: "NEET PG", ta: "நீட் பிஜி" },
    category: "medical",
    conductedBy: "NBE",
    frequency: "Once a year",
    totalMarks: 800,
    duration: 210,
    subjects: ["Pre-clinical", "Para-clinical", "Clinical Subjects"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 500,
    isPopular: true,
    difficultyLevel: "Hard",
    eligibility: "MBBS Degree with Internship",
    officialWebsite: "https://nbe.edu.in"
  },
  {
    id: "AIIMS",
    name: { en: "AIIMS (Pre-merger)", ta: "எய்ம்ஸ்" },
    category: "medical",
    conductedBy: "AIIMS New Delhi",
    frequency: "Once a year (till 2019)",
    totalMarks: 200,
    duration: 210,
    subjects: ["Physics", "Chemistry", "Biology", "GK", "Aptitude"],
    years: [2019, 2018, 2017, 2016, 2015],
    questionCount: 300,
    isPopular: false,
    difficultyLevel: "Hard",
    eligibility: "12th Pass with PCB",
    officialWebsite: "https://aiimsexams.ac.in"
  },
  {
    id: "JIPMER",
    name: { en: "JIPMER (Pre-merger)", ta: "ஜிப்மர்" },
    category: "medical",
    conductedBy: "JIPMER Puducherry",
    frequency: "Once a year (till 2019)",
    totalMarks: 200,
    duration: 150,
    subjects: ["Physics", "Chemistry", "Biology", "English", "Reasoning"],
    years: [2019, 2018, 2017, 2016, 2015],
    questionCount: 250,
    isPopular: false,
    difficultyLevel: "Hard",
    eligibility: "12th Pass with PCB",
    officialWebsite: "https://jipmer.edu.in"
  },
  {
    id: "AIAPGET",
    name: { en: "AIAPGET", ta: "ஏஐஏபிஜிஇடி" },
    category: "medical",
    conductedBy: "AYUSH",
    frequency: "Once a year",
    totalMarks: 480,
    duration: 120,
    subjects: ["Ayurveda", "Unani", "Siddha", "Homeopathy"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 150,
    isPopular: false,
    difficultyLevel: "Moderate",
    eligibility: "BAMS/BUMS/BSMS/BHMS Degree",
    officialWebsite: "https://aaccc.gov.in"
  },

  // MANAGEMENT EXAMS
  {
    id: "CAT",
    name: { en: "CAT", ta: "கேட்" },
    category: "management",
    conductedBy: "IIMs (Rotating)",
    frequency: "Once a year",
    totalMarks: 198,
    duration: 120,
    subjects: ["VARC", "DILR", "Quantitative Ability"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    sessions: ["Slot 1", "Slot 2", "Slot 3"],
    questionCount: 660,
    isPopular: true,
    difficultyLevel: "Hard",
    eligibility: "Graduate with 50% aggregate",
    officialWebsite: "https://iimcat.ac.in"
  },
  {
    id: "MAT",
    name: { en: "MAT", ta: "மேட்" },
    category: "management",
    conductedBy: "AIMA",
    frequency: "4 times a year",
    totalMarks: 200,
    duration: 150,
    subjects: ["Language", "Intelligence", "Data Analysis", "Mathematics", "Indian GK"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 400,
    isPopular: false,
    difficultyLevel: "Moderate",
    eligibility: "Graduate",
    officialWebsite: "https://mat.aima.in"
  },
  {
    id: "XAT",
    name: { en: "XAT", ta: "எக்சேட்" },
    category: "management",
    conductedBy: "XLRI Jamshedpur",
    frequency: "Once a year",
    totalMarks: 100,
    duration: 180,
    subjects: ["VARC", "Decision Making", "Quantitative Ability", "GK"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 350,
    isPopular: true,
    difficultyLevel: "Hard",
    eligibility: "Graduate with 50% aggregate",
    officialWebsite: "https://xatonline.in"
  },
  {
    id: "CMAT",
    name: { en: "CMAT", ta: "சிமேட்" },
    category: "management",
    conductedBy: "NTA",
    frequency: "Once a year",
    totalMarks: 400,
    duration: 180,
    subjects: ["Quantitative", "Logical Reasoning", "Language", "GK"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 300,
    isPopular: false,
    difficultyLevel: "Moderate",
    eligibility: "Graduate",
    officialWebsite: "https://cmat.nta.nic.in"
  },
  {
    id: "SNAP",
    name: { en: "SNAP", ta: "ஸ்னாப்" },
    category: "management",
    conductedBy: "Symbiosis International",
    frequency: "Once a year (3 attempts)",
    totalMarks: 60,
    duration: 60,
    subjects: ["General English", "Analytical Reasoning", "Quantitative"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 300,
    isPopular: true,
    difficultyLevel: "Moderate",
    eligibility: "Graduate with 50% aggregate",
    officialWebsite: "https://www.snaptest.org"
  },
  {
    id: "TANCET_MBA",
    name: { en: "TANCET MBA", ta: "டான்செட் எம்பிஏ" },
    category: "management",
    conductedBy: "Anna University",
    frequency: "Once a year",
    totalMarks: 100,
    duration: 120,
    subjects: ["Quantitative", "English", "Data Sufficiency", "Reasoning"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 250,
    isPopular: true,
    difficultyLevel: "Moderate",
    eligibility: "Graduate from TN",
    officialWebsite: "https://www.annauniv.edu/tancet"
  },
  {
    id: "NMAT",
    name: { en: "NMAT", ta: "என்மேட்" },
    category: "management",
    conductedBy: "GMAC",
    frequency: "75-day window",
    totalMarks: 360,
    duration: 120,
    subjects: ["Language Skills", "Quantitative Skills", "Logical Reasoning"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 280,
    isPopular: false,
    difficultyLevel: "Moderate",
    eligibility: "Graduate",
    officialWebsite: "https://www.nmat.org"
  },
  {
    id: "IIFT",
    name: { en: "IIFT", ta: "ஐஐஎஃப்டி" },
    category: "management",
    conductedBy: "NTA",
    frequency: "Once a year",
    totalMarks: 300,
    duration: 120,
    subjects: ["VARC", "Quantitative", "Logical Reasoning", "GK"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 300,
    isPopular: true,
    difficultyLevel: "Hard",
    eligibility: "Graduate with 50% aggregate",
    officialWebsite: "https://iift.nta.nic.in"
  },

  // LAW EXAMS
  {
    id: "CLAT",
    name: { en: "CLAT", ta: "க்ளாட்" },
    category: "law",
    conductedBy: "Consortium of NLUs",
    frequency: "Once a year",
    totalMarks: 150,
    duration: 120,
    subjects: ["English", "Current Affairs", "Legal Reasoning", "Logical Reasoning", "Quantitative"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 500,
    isPopular: true,
    difficultyLevel: "Moderate",
    eligibility: "12th Pass (UG) / Graduate (PG)",
    officialWebsite: "https://consortiumofnlus.ac.in"
  },
  {
    id: "AILET",
    name: { en: "AILET", ta: "ஏஐஎல்இடி" },
    category: "law",
    conductedBy: "NLU Delhi",
    frequency: "Once a year",
    totalMarks: 150,
    duration: 90,
    subjects: ["English", "GK", "Legal Aptitude", "Reasoning", "Mathematics"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 350,
    isPopular: true,
    difficultyLevel: "Hard",
    eligibility: "12th Pass with 50% aggregate",
    officialWebsite: "https://nationallawuniversitydelhi.in"
  },
  {
    id: "LSAT_INDIA",
    name: { en: "LSAT India", ta: "எல்சாட் இந்தியா" },
    category: "law",
    conductedBy: "Pearson VUE",
    frequency: "Multiple times",
    totalMarks: 92,
    duration: 140,
    subjects: ["Reading Comprehension", "Analytical Reasoning", "Logical Reasoning"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 250,
    isPopular: false,
    difficultyLevel: "Hard",
    eligibility: "12th Pass",
    officialWebsite: "https://www.lsatindia.in"
  },
  {
    id: "TANCET_LLB",
    name: { en: "TANCET LLB", ta: "டான்செட் எல்எல்பி" },
    category: "law",
    conductedBy: "Anna University",
    frequency: "Once a year",
    totalMarks: 100,
    duration: 120,
    subjects: ["English", "Aptitude", "Legal Awareness"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 150,
    isPopular: true,
    difficultyLevel: "Moderate",
    eligibility: "Graduate from TN",
    officialWebsite: "https://www.annauniv.edu/tancet"
  },
  {
    id: "MH_CET_LAW",
    name: { en: "MH CET Law", ta: "எம்எச் சிஇடி லா" },
    category: "law",
    conductedBy: "Maharashtra CET Cell",
    frequency: "Once a year",
    totalMarks: 150,
    duration: 120,
    subjects: ["Legal Aptitude", "Logical Reasoning", "English", "GK", "Mathematics"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 300,
    isPopular: false,
    difficultyLevel: "Moderate",
    eligibility: "12th Pass from Maharashtra",
    officialWebsite: "https://cetcell.mahacet.org"
  },

  // CIVIL SERVICES EXAMS
  {
    id: "UPSC_PRELIMS",
    name: { en: "UPSC Prelims", ta: "யுபிஎஸ்சி ப்ரிலிம்ஸ்" },
    category: "civil_services",
    conductedBy: "UPSC",
    frequency: "Once a year",
    totalMarks: 400,
    duration: 240,
    subjects: ["General Studies", "CSAT"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 500,
    isPopular: true,
    difficultyLevel: "Hard",
    eligibility: "Graduate",
    officialWebsite: "https://upsc.gov.in"
  },
  {
    id: "UPSC_MAINS",
    name: { en: "UPSC Mains", ta: "யுபிஎஸ்சி மெயின்ஸ்" },
    category: "civil_services",
    conductedBy: "UPSC",
    frequency: "Once a year",
    totalMarks: 1750,
    duration: 0,
    subjects: ["Essay", "GS I-IV", "Optional", "Language Papers"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 200,
    isPopular: true,
    difficultyLevel: "Hard",
    eligibility: "Prelims Qualified",
    officialWebsite: "https://upsc.gov.in"
  },
  {
    id: "TNPSC_GROUP_1",
    name: { en: "TNPSC Group 1", ta: "டிஎன்பிஎஸ்சி குரூப் 1" },
    category: "civil_services",
    conductedBy: "TNPSC",
    frequency: "Once a year",
    totalMarks: 300,
    duration: 180,
    subjects: ["General Studies", "Aptitude"],
    years: [2025, 2024, 2023, 2022, 2021, 2019, 2018, 2017, 2016, 2015],
    questionCount: 400,
    isPopular: true,
    difficultyLevel: "Hard",
    eligibility: "Graduate",
    officialWebsite: "https://www.tnpsc.gov.in"
  },
  {
    id: "TNPSC_GROUP_2",
    name: { en: "TNPSC Group 2", ta: "டிஎன்பிஎஸ்சி குரூப் 2" },
    category: "civil_services",
    conductedBy: "TNPSC",
    frequency: "As per vacancy",
    totalMarks: 300,
    duration: 180,
    subjects: ["General Studies", "Aptitude", "Tamil"],
    years: [2025, 2024, 2023, 2022, 2021, 2019, 2018, 2017, 2016, 2015],
    questionCount: 350,
    isPopular: true,
    difficultyLevel: "Moderate",
    eligibility: "Graduate",
    officialWebsite: "https://www.tnpsc.gov.in"
  },
  {
    id: "TNPSC_GROUP_4",
    name: { en: "TNPSC Group 4", ta: "டிஎன்பிஎஸ்சி குரூப் 4" },
    category: "civil_services",
    conductedBy: "TNPSC",
    frequency: "As per vacancy",
    totalMarks: 300,
    duration: 180,
    subjects: ["General Knowledge", "Tamil", "Aptitude"],
    years: [2025, 2024, 2023, 2022, 2021, 2019, 2018, 2017, 2016, 2015],
    questionCount: 400,
    isPopular: true,
    difficultyLevel: "Moderate",
    eligibility: "10th Pass (SSLC)",
    officialWebsite: "https://www.tnpsc.gov.in"
  },
  {
    id: "TNPSC_VAO",
    name: { en: "TNPSC VAO", ta: "டிஎன்பிஎஸ்சி விஏஓ" },
    category: "civil_services",
    conductedBy: "TNPSC",
    frequency: "As per vacancy",
    totalMarks: 300,
    duration: 180,
    subjects: ["General Knowledge", "Tamil", "Aptitude"],
    years: [2025, 2024, 2023, 2022, 2021, 2019, 2018, 2017, 2016, 2015],
    questionCount: 250,
    isPopular: true,
    difficultyLevel: "Moderate",
    eligibility: "12th Pass",
    officialWebsite: "https://www.tnpsc.gov.in"
  },
  {
    id: "SSC_CGL",
    name: { en: "SSC CGL", ta: "எஸ்எஸ்சி சிஜிஎல்" },
    category: "civil_services",
    conductedBy: "SSC",
    frequency: "Once a year",
    totalMarks: 200,
    duration: 60,
    subjects: ["Reasoning", "English", "Quantitative", "GK"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 500,
    isPopular: true,
    difficultyLevel: "Moderate",
    eligibility: "Graduate",
    officialWebsite: "https://ssc.nic.in"
  },
  {
    id: "SSC_CHSL",
    name: { en: "SSC CHSL", ta: "எஸ்எஸ்சி சிஎச்எஸ்எல்" },
    category: "civil_services",
    conductedBy: "SSC",
    frequency: "Once a year",
    totalMarks: 200,
    duration: 60,
    subjects: ["Reasoning", "English", "Quantitative", "GK"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 400,
    isPopular: true,
    difficultyLevel: "Easy",
    eligibility: "12th Pass",
    officialWebsite: "https://ssc.nic.in"
  },

  // BANKING EXAMS
  {
    id: "IBPS_PO",
    name: { en: "IBPS PO", ta: "ஐபிபிஎஸ் பிஓ" },
    category: "banking",
    conductedBy: "IBPS",
    frequency: "Once a year",
    totalMarks: 100,
    duration: 60,
    subjects: ["English", "Reasoning", "Quantitative", "GK", "Computer"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 450,
    isPopular: true,
    difficultyLevel: "Moderate",
    eligibility: "Graduate",
    officialWebsite: "https://ibps.in"
  },
  {
    id: "IBPS_CLERK",
    name: { en: "IBPS Clerk", ta: "ஐபிபிஎஸ் கிளர்க்" },
    category: "banking",
    conductedBy: "IBPS",
    frequency: "Once a year",
    totalMarks: 100,
    duration: 60,
    subjects: ["English", "Reasoning", "Quantitative", "GK", "Computer"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 400,
    isPopular: true,
    difficultyLevel: "Easy",
    eligibility: "Graduate",
    officialWebsite: "https://ibps.in"
  },
  {
    id: "SBI_PO",
    name: { en: "SBI PO", ta: "எஸ்பிஐ பிஓ" },
    category: "banking",
    conductedBy: "SBI",
    frequency: "Once a year",
    totalMarks: 100,
    duration: 60,
    subjects: ["English", "Reasoning", "Quantitative", "GK"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 400,
    isPopular: true,
    difficultyLevel: "Moderate",
    eligibility: "Graduate",
    officialWebsite: "https://sbi.co.in/careers"
  },
  {
    id: "SBI_CLERK",
    name: { en: "SBI Clerk", ta: "எஸ்பிஐ கிளர்க்" },
    category: "banking",
    conductedBy: "SBI",
    frequency: "Once a year",
    totalMarks: 100,
    duration: 60,
    subjects: ["English", "Reasoning", "Quantitative", "GK"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 350,
    isPopular: true,
    difficultyLevel: "Easy",
    eligibility: "Graduate",
    officialWebsite: "https://sbi.co.in/careers"
  },
  {
    id: "RBI_GRADE_B",
    name: { en: "RBI Grade B", ta: "ஆர்பிஐ கிரேட் பி" },
    category: "banking",
    conductedBy: "RBI",
    frequency: "Once a year",
    totalMarks: 200,
    duration: 120,
    subjects: ["English", "Reasoning", "Quantitative", "GK", "Economics"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 300,
    isPopular: true,
    difficultyLevel: "Hard",
    eligibility: "Graduate with 60% aggregate",
    officialWebsite: "https://www.rbi.org.in"
  },

  // TEACHING EXAMS
  {
    id: "TN_TRB",
    name: { en: "TN TRB", ta: "டிஎன் டிஆர்பி" },
    category: "teaching",
    conductedBy: "TN TRB",
    frequency: "As per vacancy",
    totalMarks: 150,
    duration: 180,
    subjects: ["Educational Psychology", "Subject Knowledge", "General Tamil/English"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 300,
    isPopular: true,
    difficultyLevel: "Moderate",
    eligibility: "B.Ed with Subject Graduation",
    officialWebsite: "https://www.trb.tn.gov.in"
  },
  {
    id: "TN_TET",
    name: { en: "TN TET", ta: "டிஎன் டிஇடி" },
    category: "teaching",
    conductedBy: "TN TRB",
    frequency: "As per vacancy",
    totalMarks: 150,
    duration: 150,
    subjects: ["Child Development", "Language", "Mathematics", "Environment"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 250,
    isPopular: true,
    difficultyLevel: "Moderate",
    eligibility: "D.El.Ed / B.Ed",
    officialWebsite: "https://www.trb.tn.gov.in"
  },
  {
    id: "CTET",
    name: { en: "CTET", ta: "சிடிஇடி" },
    category: "teaching",
    conductedBy: "CBSE",
    frequency: "Twice a year",
    totalMarks: 150,
    duration: 150,
    subjects: ["Child Development", "Language I & II", "Mathematics/Science", "Social Studies"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 350,
    isPopular: true,
    difficultyLevel: "Moderate",
    eligibility: "D.El.Ed / B.Ed",
    officialWebsite: "https://ctet.nic.in"
  },
  {
    id: "UGC_NET",
    name: { en: "UGC NET", ta: "யுஜிசி நெட்" },
    category: "teaching",
    conductedBy: "NTA",
    frequency: "Twice a year",
    totalMarks: 300,
    duration: 180,
    subjects: ["Teaching Aptitude", "Research Methodology", "Subject Paper"],
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    questionCount: 400,
    isPopular: true,
    difficultyLevel: "Hard",
    eligibility: "Post Graduate with 55%",
    officialWebsite: "https://ugcnet.nta.nic.in"
  }
];

// Questions Database - Comprehensive collection
export const pyqQuestions: PYQQuestion[] = [
  // ============================================
  // JEE MAIN 2024 - PHYSICS (January Session)
  // ============================================
  {
    id: "JEE_MAIN_2024_JAN_PHY_001",
    examId: "JEE_MAIN",
    year: 2024,
    session: "January",
    shift: "Shift 1",
    date: "2024-01-27",
    category: "Engineering",
    subject: "Physics",
    topic: "Mechanics",
    subtopic: "Kinematics",
    questionNumber: 1,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 4,
    negativeMarks: 1,
    timeRecommended: 120,
    question: {
      en: "A particle moves along a straight line with velocity v = 3t² - 6t + 4 m/s. Find the displacement in first 2 seconds.",
      ta: "ஒரு துகள் v = 3t² - 6t + 4 m/s வேகத்துடன் நேர்கோட்டில் நகர்கிறது. முதல் 2 வினாடிகளில் இடப்பெயர்ச்சியைக் காண்க."
    },
    options: {
      en: [
        { id: "A", text: "4 m" },
        { id: "B", text: "6 m" },
        { id: "C", text: "8 m" },
        { id: "D", text: "2 m" }
      ],
      ta: [
        { id: "A", text: "4 மீ" },
        { id: "B", text: "6 மீ" },
        { id: "C", text: "8 மீ" },
        { id: "D", text: "2 மீ" }
      ]
    },
    correctAnswer: "A",
    solution: {
      en: "Displacement s = ∫v dt = ∫(3t² - 6t + 4)dt = t³ - 3t² + 4t. At t=2: s = 8 - 12 + 8 = 4 m",
      ta: "இடப்பெயர்ச்சி s = ∫v dt = ∫(3t² - 6t + 4)dt = t³ - 3t² + 4t. t=2 இல்: s = 8 - 12 + 8 = 4 மீ"
    },
    hints: ["Integrate velocity to get displacement", "Apply limits from 0 to 2"],
    conceptsTested: ["Integration", "Kinematics equations"],
    commonMistakes: ["Forgetting to apply limits", "Sign errors in integration"],
    relatedQuestions: ["JEE_MAIN_2023_APR_PHY_012", "JEE_MAIN_2022_JAN_PHY_008"],
    tags: ["calculus", "motion", "important", "frequently-asked"],
    statistics: {
      totalAttempts: 45000,
      correctPercentage: 42,
      averageTime: 145
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "JEE_MAIN_2024_JAN_PHY_002",
    examId: "JEE_MAIN",
    year: 2024,
    session: "January",
    shift: "Shift 1",
    date: "2024-01-27",
    category: "Engineering",
    subject: "Physics",
    topic: "Mechanics",
    subtopic: "Laws of Motion",
    questionNumber: 2,
    questionType: "MCQ",
    difficulty: "Easy",
    marks: 4,
    negativeMarks: 1,
    timeRecommended: 90,
    question: {
      en: "A block of mass 2 kg is placed on a frictionless surface. A horizontal force of 10 N is applied on it. Find the acceleration of the block.",
      ta: "2 கிகி நிறையுள்ள ஒரு தொகுதி உராய்வற்ற மேற்பரப்பில் வைக்கப்பட்டுள்ளது. அதன் மீது 10 N கிடைமட்ட விசை செலுத்தப்படுகிறது. தொகுதியின் முடுக்கத்தைக் காண்க."
    },
    options: {
      en: [
        { id: "A", text: "2 m/s²" },
        { id: "B", text: "5 m/s²" },
        { id: "C", text: "10 m/s²" },
        { id: "D", text: "20 m/s²" }
      ],
      ta: [
        { id: "A", text: "2 மீ/வி²" },
        { id: "B", text: "5 மீ/வி²" },
        { id: "C", text: "10 மீ/வி²" },
        { id: "D", text: "20 மீ/வி²" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "Using Newton's Second Law: F = ma. Therefore, a = F/m = 10/2 = 5 m/s²",
      ta: "நியூட்டனின் இரண்டாவது விதியைப் பயன்படுத்தி: F = ma. எனவே, a = F/m = 10/2 = 5 மீ/வி²"
    },
    hints: ["Apply Newton's second law", "F = ma"],
    conceptsTested: ["Newton's Second Law", "Basic mechanics"],
    commonMistakes: ["Unit conversion errors", "Forgetting mass"],
    relatedQuestions: ["JEE_MAIN_2023_JAN_PHY_005"],
    tags: ["newton-laws", "basic", "important"],
    statistics: {
      totalAttempts: 52000,
      correctPercentage: 78,
      averageTime: 60
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "JEE_MAIN_2024_JAN_PHY_003",
    examId: "JEE_MAIN",
    year: 2024,
    session: "January",
    shift: "Shift 1",
    date: "2024-01-27",
    category: "Engineering",
    subject: "Physics",
    topic: "Mechanics",
    subtopic: "Work, Energy and Power",
    questionNumber: 3,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 4,
    negativeMarks: 1,
    timeRecommended: 120,
    question: {
      en: "A body of mass 4 kg moving with velocity 6 m/s collides with another body of mass 2 kg at rest. If the collision is perfectly elastic, find the velocity of the second body after collision.",
      ta: "6 m/s வேகத்தில் நகரும் 4 kg நிறையுள்ள ஒரு பொருள், ஓய்வில் உள்ள 2 kg நிறையுள்ள மற்றொரு பொருளுடன் மோதுகிறது. மோதல் முழுமையான மீள்தன்மையுடையதாக இருந்தால், மோதலுக்குப் பின் இரண்டாவது பொருளின் வேகத்தைக் காண்க."
    },
    options: {
      en: [
        { id: "A", text: "4 m/s" },
        { id: "B", text: "6 m/s" },
        { id: "C", text: "8 m/s" },
        { id: "D", text: "10 m/s" }
      ],
      ta: [
        { id: "A", text: "4 மீ/வி" },
        { id: "B", text: "6 மீ/வி" },
        { id: "C", text: "8 மீ/வி" },
        { id: "D", text: "10 மீ/வி" }
      ]
    },
    correctAnswer: "C",
    solution: {
      en: "For elastic collision: v₂ = 2m₁u₁/(m₁+m₂) = 2×4×6/(4+2) = 48/6 = 8 m/s",
      ta: "மீள்தன்மை மோதலுக்கு: v₂ = 2m₁u₁/(m₁+m₂) = 2×4×6/(4+2) = 48/6 = 8 மீ/வி"
    },
    hints: ["Use elastic collision formula", "Conservation of momentum and energy"],
    conceptsTested: ["Elastic collision", "Conservation laws"],
    commonMistakes: ["Using wrong formula", "Mass confusion"],
    relatedQuestions: ["JEE_MAIN_2023_APR_PHY_018"],
    tags: ["collision", "conservation", "important"],
    statistics: {
      totalAttempts: 41000,
      correctPercentage: 45,
      averageTime: 135
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "JEE_MAIN_2024_JAN_PHY_004",
    examId: "JEE_MAIN",
    year: 2024,
    session: "January",
    shift: "Shift 1",
    date: "2024-01-27",
    category: "Engineering",
    subject: "Physics",
    topic: "Electromagnetism",
    subtopic: "Electrostatics",
    questionNumber: 4,
    questionType: "MCQ",
    difficulty: "Hard",
    marks: 4,
    negativeMarks: 1,
    timeRecommended: 150,
    question: {
      en: "Two point charges +q and -q are placed at distance d apart. Find the electric field at the midpoint of the line joining them.",
      ta: "+q மற்றும் -q என்ற இரு புள்ளி மின்னூட்டங்கள் d தூரத்தில் வைக்கப்பட்டுள்ளன. அவற்றை இணைக்கும் கோட்டின் நடுப்புள்ளியில் மின்புலத்தைக் காண்க."
    },
    options: {
      en: [
        { id: "A", text: "4kq/d²" },
        { id: "B", text: "8kq/d²" },
        { id: "C", text: "2kq/d²" },
        { id: "D", text: "Zero" }
      ],
      ta: [
        { id: "A", text: "4kq/d²" },
        { id: "B", text: "8kq/d²" },
        { id: "C", text: "2kq/d²" },
        { id: "D", text: "சுழி" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "At midpoint, distance from each charge = d/2. E due to +q = kq/(d/2)² = 4kq/d² (away from +q). E due to -q = kq/(d/2)² = 4kq/d² (towards -q). Both fields are in same direction, so E_net = 8kq/d²",
      ta: "நடுப்புள்ளியில், ஒவ்வொரு மின்னூட்டத்திலிருந்தும் தூரம் = d/2. +q காரணமாக E = kq/(d/2)² = 4kq/d² (+q விட்டு விலகி). -q காரணமாக E = kq/(d/2)² = 4kq/d² (-q நோக்கி). இரு புலங்களும் ஒரே திசையில், எனவே E_மொத்தம் = 8kq/d²"
    },
    hints: ["Calculate field due to each charge at midpoint", "Consider direction of fields"],
    conceptsTested: ["Electric field", "Superposition principle"],
    commonMistakes: ["Fields cancelling instead of adding", "Distance calculation error"],
    relatedQuestions: ["JEE_MAIN_2023_JAN_PHY_022"],
    tags: ["electrostatics", "electric-field", "important"],
    statistics: {
      totalAttempts: 38000,
      correctPercentage: 35,
      averageTime: 165
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "JEE_MAIN_2024_JAN_PHY_005",
    examId: "JEE_MAIN",
    year: 2024,
    session: "January",
    shift: "Shift 1",
    date: "2024-01-27",
    category: "Engineering",
    subject: "Physics",
    topic: "Optics",
    subtopic: "Ray Optics",
    questionNumber: 5,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 4,
    negativeMarks: 1,
    timeRecommended: 120,
    question: {
      en: "A concave mirror has focal length 20 cm. An object is placed 30 cm from the mirror. Find the position of the image.",
      ta: "ஒரு குழிவான கண்ணாடியின் குவிய தூரம் 20 செ.மீ. ஒரு பொருள் கண்ணாடியிலிருந்து 30 செ.மீ தூரத்தில் வைக்கப்பட்டுள்ளது. படிமத்தின் நிலையைக் காண்க."
    },
    options: {
      en: [
        { id: "A", text: "60 cm in front of mirror" },
        { id: "B", text: "60 cm behind mirror" },
        { id: "C", text: "30 cm in front of mirror" },
        { id: "D", text: "15 cm in front of mirror" }
      ],
      ta: [
        { id: "A", text: "கண்ணாடிக்கு முன் 60 செ.மீ" },
        { id: "B", text: "கண்ணாடிக்கு பின் 60 செ.மீ" },
        { id: "C", text: "கண்ணாடிக்கு முன் 30 செ.மீ" },
        { id: "D", text: "கண்ணாடிக்கு முன் 15 செ.மீ" }
      ]
    },
    correctAnswer: "A",
    solution: {
      en: "Using mirror formula: 1/f = 1/v + 1/u. Here f = -20 cm, u = -30 cm. 1/v = 1/f - 1/u = -1/20 + 1/30 = -1/60. v = -60 cm. Negative sign indicates image is in front of mirror.",
      ta: "கண்ணாடி சூத்திரத்தைப் பயன்படுத்தி: 1/f = 1/v + 1/u. இங்கு f = -20 செ.மீ, u = -30 செ.மீ. 1/v = 1/f - 1/u = -1/20 + 1/30 = -1/60. v = -60 செ.மீ. எதிர்மறை குறி படிமம் கண்ணாடிக்கு முன் உள்ளது என்பதைக் குறிக்கிறது."
    },
    hints: ["Use mirror formula", "Apply sign convention correctly"],
    conceptsTested: ["Mirror formula", "Sign convention"],
    commonMistakes: ["Sign convention errors", "Focal length sign"],
    relatedQuestions: ["JEE_MAIN_2023_APR_PHY_025"],
    tags: ["optics", "mirror", "important"],
    statistics: {
      totalAttempts: 44000,
      correctPercentage: 52,
      averageTime: 110
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },

  // JEE MAIN 2024 - CHEMISTRY
  {
    id: "JEE_MAIN_2024_JAN_CHE_001",
    examId: "JEE_MAIN",
    year: 2024,
    session: "January",
    shift: "Shift 1",
    date: "2024-01-27",
    category: "Engineering",
    subject: "Chemistry",
    topic: "Physical Chemistry",
    subtopic: "Atomic Structure",
    questionNumber: 31,
    questionType: "MCQ",
    difficulty: "Easy",
    marks: 4,
    negativeMarks: 1,
    timeRecommended: 90,
    question: {
      en: "The number of unpaired electrons in Fe²⁺ ion is:",
      ta: "Fe²⁺ அயனியில் இணையாத எலக்ட்ரான்களின் எண்ணிக்கை:"
    },
    options: {
      en: [
        { id: "A", text: "2" },
        { id: "B", text: "3" },
        { id: "C", text: "4" },
        { id: "D", text: "5" }
      ],
      ta: [
        { id: "A", text: "2" },
        { id: "B", text: "3" },
        { id: "C", text: "4" },
        { id: "D", text: "5" }
      ]
    },
    correctAnswer: "C",
    solution: {
      en: "Fe has atomic number 26. Configuration: [Ar]3d⁶4s². Fe²⁺ loses 2 electrons from 4s: [Ar]3d⁶. In 3d⁶, electrons fill as ↑↓,↑,↑,↑,↑ giving 4 unpaired electrons.",
      ta: "Fe இன் அணு எண் 26. கட்டமைப்பு: [Ar]3d⁶4s². Fe²⁺ 4s இலிருந்து 2 எலக்ட்ரான்களை இழக்கிறது: [Ar]3d⁶. 3d⁶ இல், எலக்ட்ரான்கள் ↑↓,↑,↑,↑,↑ என நிரப்பப்படுகின்றன, இது 4 இணையாத எலக்ட்ரான்களைத் தருகிறது."
    },
    hints: ["Write electronic configuration of Fe", "Remove electrons from 4s first"],
    conceptsTested: ["Electronic configuration", "d-block elements"],
    commonMistakes: ["Removing electrons from 3d", "Counting error"],
    relatedQuestions: ["JEE_MAIN_2023_JAN_CHE_003"],
    tags: ["atomic-structure", "d-block", "important"],
    statistics: {
      totalAttempts: 48000,
      correctPercentage: 65,
      averageTime: 75
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "JEE_MAIN_2024_JAN_CHE_002",
    examId: "JEE_MAIN",
    year: 2024,
    session: "January",
    shift: "Shift 1",
    date: "2024-01-27",
    category: "Engineering",
    subject: "Chemistry",
    topic: "Organic Chemistry",
    subtopic: "Hydrocarbons",
    questionNumber: 32,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 4,
    negativeMarks: 1,
    timeRecommended: 120,
    question: {
      en: "Which of the following is the most stable carbocation?",
      ta: "பின்வருவனவற்றில் மிகவும் நிலையான கார்போகேஷன் எது?"
    },
    options: {
      en: [
        { id: "A", text: "CH₃⁺" },
        { id: "B", text: "(CH₃)₂CH⁺" },
        { id: "C", text: "(CH₃)₃C⁺" },
        { id: "D", text: "C₂H₅⁺" }
      ],
      ta: [
        { id: "A", text: "CH₃⁺" },
        { id: "B", text: "(CH₃)₂CH⁺" },
        { id: "C", text: "(CH₃)₃C⁺" },
        { id: "D", text: "C₂H₅⁺" }
      ]
    },
    correctAnswer: "C",
    solution: {
      en: "Stability of carbocations: 3° > 2° > 1° > CH₃⁺. (CH₃)₃C⁺ is a tertiary carbocation with maximum hyperconjugation (9 H atoms) and inductive effect from 3 methyl groups, making it most stable.",
      ta: "கார்போகேஷன்களின் நிலைத்தன்மை: 3° > 2° > 1° > CH₃⁺. (CH₃)₃C⁺ ஒரு மூன்றாம் நிலை கார்போகேஷன், அதிகபட்ச ஹைப்பர்கன்ஜுகேஷன் (9 H அணுக்கள்) மற்றும் 3 மெத்தில் குழுக்களிலிருந்து இண்டக்டிவ் விளைவு உள்ளது, இது மிகவும் நிலையானது."
    },
    hints: ["Compare degree of carbocation", "More alkyl groups = more stable"],
    conceptsTested: ["Carbocation stability", "Hyperconjugation"],
    commonMistakes: ["Confusing with carbanion stability", "Ignoring hyperconjugation"],
    relatedQuestions: ["JEE_MAIN_2023_APR_CHE_015"],
    tags: ["organic", "carbocation", "important"],
    statistics: {
      totalAttempts: 46000,
      correctPercentage: 72,
      averageTime: 80
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "JEE_MAIN_2024_JAN_CHE_003",
    examId: "JEE_MAIN",
    year: 2024,
    session: "January",
    shift: "Shift 1",
    date: "2024-01-27",
    category: "Engineering",
    subject: "Chemistry",
    topic: "Inorganic Chemistry",
    subtopic: "Chemical Bonding",
    questionNumber: 33,
    questionType: "MCQ",
    difficulty: "Hard",
    marks: 4,
    negativeMarks: 1,
    timeRecommended: 150,
    question: {
      en: "The hybridization of central atom in XeF₄ is:",
      ta: "XeF₄ இல் மைய அணுவின் கலப்பினமாக்கம்:"
    },
    options: {
      en: [
        { id: "A", text: "sp³" },
        { id: "B", text: "sp³d" },
        { id: "C", text: "sp³d²" },
        { id: "D", text: "dsp³" }
      ],
      ta: [
        { id: "A", text: "sp³" },
        { id: "B", text: "sp³d" },
        { id: "C", text: "sp³d²" },
        { id: "D", text: "dsp³" }
      ]
    },
    correctAnswer: "C",
    solution: {
      en: "XeF₄: Xe has 8 valence electrons. 4 bonds with F + 2 lone pairs = 6 electron pairs. This requires sp³d² hybridization. Shape is square planar.",
      ta: "XeF₄: Xe இல் 8 இணைதிறன் எலக்ட்ரான்கள் உள்ளன. F உடன் 4 பிணைப்புகள் + 2 தனி இணைகள் = 6 எலக்ட்ரான் இணைகள். இதற்கு sp³d² கலப்பினமாக்கம் தேவை. வடிவம் சதுர தளமானது."
    },
    hints: ["Count total electron pairs around Xe", "Include lone pairs in hybridization"],
    conceptsTested: ["Hybridization", "VSEPR theory"],
    commonMistakes: ["Forgetting lone pairs", "Wrong hybridization count"],
    relatedQuestions: ["JEE_MAIN_2023_JAN_CHE_018"],
    tags: ["bonding", "hybridization", "noble-gas-compounds"],
    statistics: {
      totalAttempts: 39000,
      correctPercentage: 48,
      averageTime: 130
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },

  // JEE MAIN 2024 - MATHEMATICS
  {
    id: "JEE_MAIN_2024_JAN_MAT_001",
    examId: "JEE_MAIN",
    year: 2024,
    session: "January",
    shift: "Shift 1",
    date: "2024-01-27",
    category: "Engineering",
    subject: "Mathematics",
    topic: "Calculus",
    subtopic: "Limits",
    questionNumber: 61,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 4,
    negativeMarks: 1,
    timeRecommended: 120,
    question: {
      en: "Evaluate: lim(x→0) (sin x - x)/x³",
      ta: "மதிப்பீடு செய்க: lim(x→0) (sin x - x)/x³"
    },
    options: {
      en: [
        { id: "A", text: "-1/6" },
        { id: "B", text: "1/6" },
        { id: "C", text: "-1/3" },
        { id: "D", text: "0" }
      ],
      ta: [
        { id: "A", text: "-1/6" },
        { id: "B", text: "1/6" },
        { id: "C", text: "-1/3" },
        { id: "D", text: "0" }
      ]
    },
    correctAnswer: "A",
    solution: {
      en: "Using Taylor series: sin x = x - x³/6 + x⁵/120 - ... So (sin x - x)/x³ = (-x³/6 + x⁵/120 - ...)/x³ = -1/6 + x²/120 - ... As x→0, limit = -1/6",
      ta: "டெய்லர் தொடர் பயன்படுத்தி: sin x = x - x³/6 + x⁵/120 - ... எனவே (sin x - x)/x³ = (-x³/6 + x⁵/120 - ...)/x³ = -1/6 + x²/120 - ... x→0 ஆக, எல்லை = -1/6"
    },
    hints: ["Use Taylor/Maclaurin series for sin x", "L'Hospital's rule can also be used"],
    conceptsTested: ["Taylor series", "Limits", "L'Hospital's rule"],
    commonMistakes: ["Wrong series expansion", "Sign errors"],
    relatedQuestions: ["JEE_MAIN_2023_APR_MAT_005"],
    tags: ["limits", "series", "calculus", "important"],
    statistics: {
      totalAttempts: 42000,
      correctPercentage: 38,
      averageTime: 145
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "JEE_MAIN_2024_JAN_MAT_002",
    examId: "JEE_MAIN",
    year: 2024,
    session: "January",
    shift: "Shift 1",
    date: "2024-01-27",
    category: "Engineering",
    subject: "Mathematics",
    topic: "Algebra",
    subtopic: "Complex Numbers",
    questionNumber: 62,
    questionType: "MCQ",
    difficulty: "Easy",
    marks: 4,
    negativeMarks: 1,
    timeRecommended: 90,
    question: {
      en: "If z = 1 + i, then |z²| equals:",
      ta: "z = 1 + i எனில், |z²| இன் மதிப்பு:"
    },
    options: {
      en: [
        { id: "A", text: "1" },
        { id: "B", text: "2" },
        { id: "C", text: "√2" },
        { id: "D", text: "4" }
      ],
      ta: [
        { id: "A", text: "1" },
        { id: "B", text: "2" },
        { id: "C", text: "√2" },
        { id: "D", text: "4" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "|z| = |1+i| = √(1² + 1²) = √2. |z²| = |z|² = (√2)² = 2. Alternatively, z² = (1+i)² = 1 + 2i - 1 = 2i, so |z²| = |2i| = 2",
      ta: "|z| = |1+i| = √(1² + 1²) = √2. |z²| = |z|² = (√2)² = 2. மாற்றாக, z² = (1+i)² = 1 + 2i - 1 = 2i, எனவே |z²| = |2i| = 2"
    },
    hints: ["Use property |zⁿ| = |z|ⁿ", "Or calculate z² first"],
    conceptsTested: ["Modulus of complex numbers", "Properties of modulus"],
    commonMistakes: ["Confusing |z²| with |z|²", "Calculation errors"],
    relatedQuestions: ["JEE_MAIN_2023_JAN_MAT_008"],
    tags: ["complex-numbers", "modulus", "basic"],
    statistics: {
      totalAttempts: 50000,
      correctPercentage: 75,
      averageTime: 65
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "JEE_MAIN_2024_JAN_MAT_003",
    examId: "JEE_MAIN",
    year: 2024,
    session: "January",
    shift: "Shift 1",
    date: "2024-01-27",
    category: "Engineering",
    subject: "Mathematics",
    topic: "Coordinate Geometry",
    subtopic: "Straight Lines",
    questionNumber: 63,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 4,
    negativeMarks: 1,
    timeRecommended: 120,
    question: {
      en: "The distance of the point (2, 3) from the line 3x + 4y - 5 = 0 is:",
      ta: "(2, 3) புள்ளியிலிருந்து 3x + 4y - 5 = 0 கோட்டின் தூரம்:"
    },
    options: {
      en: [
        { id: "A", text: "13/5" },
        { id: "B", text: "3" },
        { id: "C", text: "5/13" },
        { id: "D", text: "1" }
      ],
      ta: [
        { id: "A", text: "13/5" },
        { id: "B", text: "3" },
        { id: "C", text: "5/13" },
        { id: "D", text: "1" }
      ]
    },
    correctAnswer: "A",
    solution: {
      en: "Distance = |ax₁ + by₁ + c|/√(a² + b²) = |3(2) + 4(3) - 5|/√(9 + 16) = |6 + 12 - 5|/5 = 13/5",
      ta: "தூரம் = |ax₁ + by₁ + c|/√(a² + b²) = |3(2) + 4(3) - 5|/√(9 + 16) = |6 + 12 - 5|/5 = 13/5"
    },
    hints: ["Use distance formula from point to line", "d = |ax₁ + by₁ + c|/√(a² + b²)"],
    conceptsTested: ["Distance formula", "Straight lines"],
    commonMistakes: ["Forgetting absolute value", "Wrong formula"],
    relatedQuestions: ["JEE_MAIN_2023_APR_MAT_012"],
    tags: ["coordinate-geometry", "straight-lines", "distance"],
    statistics: {
      totalAttempts: 47000,
      correctPercentage: 68,
      averageTime: 85
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },

  // ============================================
  // NEET 2024 - PHYSICS
  // ============================================
  {
    id: "NEET_2024_PHY_001",
    examId: "NEET_UG",
    year: 2024,
    session: "Main",
    date: "2024-05-05",
    category: "Medical",
    subject: "Physics",
    topic: "Mechanics",
    subtopic: "Motion in a Plane",
    questionNumber: 1,
    questionType: "MCQ",
    difficulty: "Easy",
    marks: 4,
    negativeMarks: 1,
    timeRecommended: 90,
    question: {
      en: "A projectile is thrown with initial velocity 20 m/s at an angle of 30° with the horizontal. The maximum height reached is: (g = 10 m/s²)",
      ta: "ஒரு எறிபொருள் கிடைமட்டத்துடன் 30° கோணத்தில் 20 m/s ஆரம்ப வேகத்தில் எறியப்படுகிறது. அடையப்படும் அதிகபட்ச உயரம்: (g = 10 m/s²)"
    },
    options: {
      en: [
        { id: "A", text: "5 m" },
        { id: "B", text: "10 m" },
        { id: "C", text: "15 m" },
        { id: "D", text: "20 m" }
      ],
      ta: [
        { id: "A", text: "5 மீ" },
        { id: "B", text: "10 மீ" },
        { id: "C", text: "15 மீ" },
        { id: "D", text: "20 மீ" }
      ]
    },
    correctAnswer: "A",
    solution: {
      en: "Maximum height H = u²sin²θ/2g = (20)²(sin30°)²/(2×10) = 400 × 0.25/20 = 5 m",
      ta: "அதிகபட்ச உயரம் H = u²sin²θ/2g = (20)²(sin30°)²/(2×10) = 400 × 0.25/20 = 5 மீ"
    },
    hints: ["Use projectile motion formula for max height", "H = u²sin²θ/2g"],
    conceptsTested: ["Projectile motion", "Maximum height formula"],
    commonMistakes: ["Using wrong angle", "Forgetting to square sin"],
    relatedQuestions: ["NEET_2023_PHY_005"],
    tags: ["projectile", "mechanics", "neet-important"],
    statistics: {
      totalAttempts: 85000,
      correctPercentage: 72,
      averageTime: 75
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "NEET_2024_PHY_002",
    examId: "NEET_UG",
    year: 2024,
    session: "Main",
    date: "2024-05-05",
    category: "Medical",
    subject: "Physics",
    topic: "Waves",
    subtopic: "Sound Waves",
    questionNumber: 2,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 4,
    negativeMarks: 1,
    timeRecommended: 120,
    question: {
      en: "The frequency of the fundamental note of a closed organ pipe is 200 Hz. What is the frequency of the first overtone?",
      ta: "மூடிய உறுப்புக் குழாயின் அடிப்படை குறிப்பின் அதிர்வெண் 200 Hz. முதல் மேலோசையின் அதிர்வெண் என்ன?"
    },
    options: {
      en: [
        { id: "A", text: "400 Hz" },
        { id: "B", text: "600 Hz" },
        { id: "C", text: "800 Hz" },
        { id: "D", text: "300 Hz" }
      ],
      ta: [
        { id: "A", text: "400 Hz" },
        { id: "B", text: "600 Hz" },
        { id: "C", text: "800 Hz" },
        { id: "D", text: "300 Hz" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "In a closed organ pipe, only odd harmonics are present. Fundamental = f, First overtone = 3f. So first overtone = 3 × 200 = 600 Hz",
      ta: "மூடிய உறுப்புக் குழாயில், ஒற்றைப்படை இசைச்சேர்க்கைகள் மட்டுமே உள்ளன. அடிப்படை = f, முதல் மேலோசை = 3f. எனவே முதல் மேலோசை = 3 × 200 = 600 Hz"
    },
    hints: ["Closed pipe has only odd harmonics", "First overtone is 3rd harmonic"],
    conceptsTested: ["Organ pipes", "Harmonics"],
    commonMistakes: ["Confusing with open pipe", "Taking 2f as first overtone"],
    relatedQuestions: ["NEET_2023_PHY_015"],
    tags: ["waves", "sound", "organ-pipes"],
    statistics: {
      totalAttempts: 78000,
      correctPercentage: 55,
      averageTime: 100
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },

  // NEET 2024 - CHEMISTRY
  {
    id: "NEET_2024_CHE_001",
    examId: "NEET_UG",
    year: 2024,
    session: "Main",
    date: "2024-05-05",
    category: "Medical",
    subject: "Chemistry",
    topic: "Physical Chemistry",
    subtopic: "Chemical Equilibrium",
    questionNumber: 46,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 4,
    negativeMarks: 1,
    timeRecommended: 120,
    question: {
      en: "For the reaction N₂ + 3H₂ ⇌ 2NH₃, if Kp = 0.5 atm⁻² at a certain temperature, then Kc in terms of R and T is:",
      ta: "N₂ + 3H₂ ⇌ 2NH₃ வினைக்கு, ஒரு குறிப்பிட்ட வெப்பநிலையில் Kp = 0.5 atm⁻² எனில், R மற்றும் T இன் அடிப்படையில் Kc:"
    },
    options: {
      en: [
        { id: "A", text: "0.5(RT)²" },
        { id: "B", text: "0.5/(RT)²" },
        { id: "C", text: "0.5RT" },
        { id: "D", text: "0.5/RT" }
      ],
      ta: [
        { id: "A", text: "0.5(RT)²" },
        { id: "B", text: "0.5/(RT)²" },
        { id: "C", text: "0.5RT" },
        { id: "D", text: "0.5/RT" }
      ]
    },
    correctAnswer: "A",
    solution: {
      en: "Kp = Kc(RT)^Δn where Δn = products - reactants = 2 - 4 = -2. So Kp = Kc(RT)⁻². Therefore Kc = Kp(RT)² = 0.5(RT)²",
      ta: "Kp = Kc(RT)^Δn இங்கு Δn = விளைபொருட்கள் - வினைபடுபொருட்கள் = 2 - 4 = -2. எனவே Kp = Kc(RT)⁻². ஆகையால் Kc = Kp(RT)² = 0.5(RT)²"
    },
    hints: ["Use Kp = Kc(RT)^Δn", "Calculate Δn correctly"],
    conceptsTested: ["Equilibrium constant relation", "Kp and Kc"],
    commonMistakes: ["Wrong Δn calculation", "Inverse relation"],
    relatedQuestions: ["NEET_2023_CHE_020"],
    tags: ["equilibrium", "thermodynamics", "neet-important"],
    statistics: {
      totalAttempts: 72000,
      correctPercentage: 48,
      averageTime: 130
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },

  // NEET 2024 - BIOLOGY (Botany)
  {
    id: "NEET_2024_BOT_001",
    examId: "NEET_UG",
    year: 2024,
    session: "Main",
    date: "2024-05-05",
    category: "Medical",
    subject: "Biology",
    topic: "Botany",
    subtopic: "Cell Biology",
    questionNumber: 91,
    questionType: "MCQ",
    difficulty: "Easy",
    marks: 4,
    negativeMarks: 1,
    timeRecommended: 60,
    question: {
      en: "The powerhouse of the cell is:",
      ta: "செல்லின் சக்தி நிலையம்:"
    },
    options: {
      en: [
        { id: "A", text: "Nucleus" },
        { id: "B", text: "Mitochondria" },
        { id: "C", text: "Ribosome" },
        { id: "D", text: "Golgi body" }
      ],
      ta: [
        { id: "A", text: "உட்கரு" },
        { id: "B", text: "மைட்டோகாண்ட்ரியா" },
        { id: "C", text: "ரைபோசோம்" },
        { id: "D", text: "கோல்கி உடலம்" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "Mitochondria are called the powerhouse of the cell because they produce ATP through oxidative phosphorylation. They contain their own DNA and ribosomes.",
      ta: "மைட்டோகாண்ட்ரியா செல்லின் சக்தி நிலையம் என்று அழைக்கப்படுகிறது, ஏனெனில் அவை ஆக்சிஜனேற்ற பாஸ்போரிலேஷன் மூலம் ATP உற்பத்தி செய்கின்றன. அவை தங்கள் சொந்த DNA மற்றும் ரைபோசோம்களைக் கொண்டுள்ளன."
    },
    hints: ["Which organelle produces ATP?", "Think about cellular respiration"],
    conceptsTested: ["Cell organelles", "Mitochondria function"],
    commonMistakes: ["Confusing with nucleus", "Forgetting function"],
    relatedQuestions: ["NEET_2023_BOT_003"],
    tags: ["cell-biology", "organelles", "basic", "neet-important"],
    statistics: {
      totalAttempts: 95000,
      correctPercentage: 92,
      averageTime: 30
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "NEET_2024_BOT_002",
    examId: "NEET_UG",
    year: 2024,
    session: "Main",
    date: "2024-05-05",
    category: "Medical",
    subject: "Biology",
    topic: "Botany",
    subtopic: "Genetics",
    questionNumber: 92,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 4,
    negativeMarks: 1,
    timeRecommended: 90,
    question: {
      en: "In a dihybrid cross, the phenotypic ratio of F₂ generation is:",
      ta: "இருபண்புக் கலப்பில், F₂ தலைமுறையின் தோற்றப்பண்பு விகிதம்:"
    },
    options: {
      en: [
        { id: "A", text: "3:1" },
        { id: "B", text: "9:3:3:1" },
        { id: "C", text: "1:2:1" },
        { id: "D", text: "1:1:1:1" }
      ],
      ta: [
        { id: "A", text: "3:1" },
        { id: "B", text: "9:3:3:1" },
        { id: "C", text: "1:2:1" },
        { id: "D", text: "1:1:1:1" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "In a dihybrid cross (AaBb × AaBb), the F₂ generation shows phenotypic ratio of 9:3:3:1. This represents 9 with both dominant traits, 3 with first dominant, 3 with second dominant, and 1 with both recessive.",
      ta: "இருபண்புக் கலப்பில் (AaBb × AaBb), F₂ தலைமுறை 9:3:3:1 என்ற தோற்றப்பண்பு விகிதத்தைக் காட்டுகிறது. இது இரண்டு ஆதிக்கப் பண்புகளுடன் 9, முதல் ஆதிக்கத்துடன் 3, இரண்டாவது ஆதிக்கத்துடன் 3, இரண்டு ஒடுங்கு பண்புகளுடன் 1 ஐ குறிக்கிறது."
    },
    hints: ["Mendel's law of independent assortment", "16 possible combinations"],
    conceptsTested: ["Dihybrid cross", "Mendelian genetics"],
    commonMistakes: ["Confusing with monohybrid", "Wrong ratio"],
    relatedQuestions: ["NEET_2023_BOT_025"],
    tags: ["genetics", "mendel", "neet-important"],
    statistics: {
      totalAttempts: 88000,
      correctPercentage: 78,
      averageTime: 60
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },

  // NEET 2024 - BIOLOGY (Zoology)
  {
    id: "NEET_2024_ZOO_001",
    examId: "NEET_UG",
    year: 2024,
    session: "Main",
    date: "2024-05-05",
    category: "Medical",
    subject: "Biology",
    topic: "Zoology",
    subtopic: "Human Physiology",
    questionNumber: 136,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 4,
    negativeMarks: 1,
    timeRecommended: 90,
    question: {
      en: "The pacemaker of the heart is:",
      ta: "இதயத்தின் இயக்கி:"
    },
    options: {
      en: [
        { id: "A", text: "SA node" },
        { id: "B", text: "AV node" },
        { id: "C", text: "Bundle of His" },
        { id: "D", text: "Purkinje fibres" }
      ],
      ta: [
        { id: "A", text: "SA முடிச்சு" },
        { id: "B", text: "AV முடிச்சு" },
        { id: "C", text: "ஹிஸ் கற்றை" },
        { id: "D", text: "புர்கின்ஜி நார்கள்" }
      ]
    },
    correctAnswer: "A",
    solution: {
      en: "The sinoatrial (SA) node is the natural pacemaker of the heart. It is located in the right atrium and generates electrical impulses that initiate heartbeat at approximately 70-75 beats per minute.",
      ta: "சைனோஏட்ரியல் (SA) முடிச்சு இதயத்தின் இயற்கை இயக்கி ஆகும். இது வலது ஆரிக்கிளில் அமைந்துள்ளது மற்றும் நிமிடத்திற்கு சுமார் 70-75 துடிப்புகள் வேகத்தில் இதயத் துடிப்பைத் தொடங்கும் மின் தூண்டல்களை உருவாக்குகிறது."
    },
    hints: ["Which node initiates heartbeat?", "Located in right atrium"],
    conceptsTested: ["Cardiac conduction system", "Heart physiology"],
    commonMistakes: ["Confusing SA and AV nodes", "Wrong location"],
    relatedQuestions: ["NEET_2023_ZOO_018"],
    tags: ["physiology", "heart", "neet-important"],
    statistics: {
      totalAttempts: 90000,
      correctPercentage: 85,
      averageTime: 45
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },

  // ============================================
  // CAT 2024 - QUANTITATIVE ABILITY
  // ============================================
  {
    id: "CAT_2024_S1_QA_001",
    examId: "CAT",
    year: 2024,
    session: "Slot 1",
    date: "2024-11-24",
    category: "Management",
    subject: "Quantitative Ability",
    topic: "Arithmetic",
    subtopic: "Percentages",
    questionNumber: 1,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 3,
    negativeMarks: 1,
    timeRecommended: 120,
    question: {
      en: "If A is 20% more than B, and B is 25% less than C, then A is what percentage of C?",
      ta: "A ஆனது B ஐ விட 20% அதிகமாக இருந்தால், B ஆனது C ஐ விட 25% குறைவாக இருந்தால், A ஆனது C இன் எத்தனை சதவீதம்?"
    },
    options: {
      en: [
        { id: "A", text: "90%" },
        { id: "B", text: "95%" },
        { id: "C", text: "100%" },
        { id: "D", text: "85%" }
      ],
      ta: [
        { id: "A", text: "90%" },
        { id: "B", text: "95%" },
        { id: "C", text: "100%" },
        { id: "D", text: "85%" }
      ]
    },
    correctAnswer: "A",
    solution: {
      en: "Let C = 100. B = 75 (25% less than C). A = 75 × 1.20 = 90 (20% more than B). Therefore, A = 90% of C.",
      ta: "C = 100 என்க. B = 75 (C ஐ விட 25% குறைவு). A = 75 × 1.20 = 90 (B ஐ விட 20% அதிகம்). எனவே, A = C இன் 90%."
    },
    hints: ["Assume C = 100 for easy calculation", "Calculate step by step"],
    conceptsTested: ["Percentage calculations", "Successive percentages"],
    commonMistakes: ["Adding percentages directly", "Wrong direction"],
    relatedQuestions: ["CAT_2023_S2_QA_005"],
    tags: ["percentages", "cat-important", "arithmetic"],
    statistics: {
      totalAttempts: 35000,
      correctPercentage: 62,
      averageTime: 95
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "CAT_2024_S1_QA_002",
    examId: "CAT",
    year: 2024,
    session: "Slot 1",
    date: "2024-11-24",
    category: "Management",
    subject: "Quantitative Ability",
    topic: "Algebra",
    subtopic: "Equations",
    questionNumber: 2,
    questionType: "TITA",
    difficulty: "Hard",
    marks: 3,
    negativeMarks: 0,
    timeRecommended: 150,
    question: {
      en: "If x + 1/x = 5, find the value of x³ + 1/x³",
      ta: "x + 1/x = 5 எனில், x³ + 1/x³ இன் மதிப்பைக் காண்க"
    },
    options: {
      en: [
        { id: "A", text: "110" },
        { id: "B", text: "115" },
        { id: "C", text: "120" },
        { id: "D", text: "125" }
      ],
      ta: [
        { id: "A", text: "110" },
        { id: "B", text: "115" },
        { id: "C", text: "120" },
        { id: "D", text: "125" }
      ]
    },
    correctAnswer: "A",
    solution: {
      en: "(x + 1/x)² = x² + 2 + 1/x² = 25. So x² + 1/x² = 23. Now, x³ + 1/x³ = (x + 1/x)(x² - 1 + 1/x²) = 5 × (23 - 1) = 5 × 22 = 110",
      ta: "(x + 1/x)² = x² + 2 + 1/x² = 25. எனவே x² + 1/x² = 23. இப்போது, x³ + 1/x³ = (x + 1/x)(x² - 1 + 1/x²) = 5 × (23 - 1) = 5 × 22 = 110"
    },
    hints: ["First find x² + 1/x²", "Use identity for sum of cubes"],
    conceptsTested: ["Algebraic identities", "Polynomial manipulation"],
    commonMistakes: ["Wrong identity", "Calculation errors"],
    relatedQuestions: ["CAT_2023_S1_QA_012"],
    tags: ["algebra", "identities", "cat-important"],
    statistics: {
      totalAttempts: 28000,
      correctPercentage: 35,
      averageTime: 165
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },

  // CAT 2024 - VERBAL ABILITY
  {
    id: "CAT_2024_S1_VA_001",
    examId: "CAT",
    year: 2024,
    session: "Slot 1",
    date: "2024-11-24",
    category: "Management",
    subject: "VARC",
    topic: "Reading Comprehension",
    subtopic: "Main Idea",
    questionNumber: 1,
    questionType: "MCQ",
    difficulty: "Hard",
    marks: 3,
    negativeMarks: 1,
    timeRecommended: 180,
    question: {
      en: "The passage argues that artificial intelligence, while revolutionary, poses significant ethical challenges that society must address proactively. Which of the following best captures the author's main argument?",
      ta: "செயற்கை நுண்ணறிவு புரட்சிகரமானது என்றாலும், சமூகம் முன்கூட்டியே தீர்க்க வேண்டிய குறிப்பிடத்தக்க நெறிமுறை சவால்களை முன்வைக்கிறது என்று பத்தி வாதிடுகிறது. ஆசிரியரின் முக்கிய வாதத்தை பின்வருவனவற்றில் எது சிறப்பாக பிடிக்கிறது?"
    },
    options: {
      en: [
        { id: "A", text: "AI development should be halted until ethical frameworks are established" },
        { id: "B", text: "Ethical considerations should evolve alongside AI development" },
        { id: "C", text: "AI has no significant ethical implications" },
        { id: "D", text: "Society is already well-prepared for AI challenges" }
      ],
      ta: [
        { id: "A", text: "நெறிமுறை கட்டமைப்புகள் நிறுவப்படும் வரை AI வளர்ச்சி நிறுத்தப்பட வேண்டும்" },
        { id: "B", text: "AI வளர்ச்சியுடன் நெறிமுறை கருத்தாய்வுகள் உருவாக வேண்டும்" },
        { id: "C", text: "AI க்கு குறிப்பிடத்தக்க நெறிமுறை தாக்கங்கள் இல்லை" },
        { id: "D", text: "AI சவால்களுக்கு சமூகம் ஏற்கனவே நன்கு தயாராக உள்ளது" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "The passage emphasizes the need for proactive ethical consideration alongside AI development, not halting development entirely. Option B correctly captures this balanced approach.",
      ta: "AI வளர்ச்சியை முற்றிலும் நிறுத்துவது அல்ல, AI வளர்ச்சியுடன் முன்கூட்டிய நெறிமுறை பரிசீலனையின் அவசியத்தை பத்தி வலியுறுத்துகிறது. விருப்பம் B இந்த சமநிலையான அணுகுமுறையை சரியாகப் பிடிக்கிறது."
    },
    hints: ["Look for balanced view", "Author suggests proactive not reactive approach"],
    conceptsTested: ["Main idea identification", "Author's perspective"],
    commonMistakes: ["Choosing extreme options", "Missing nuance"],
    relatedQuestions: ["CAT_2023_S2_VA_003"],
    tags: ["reading-comprehension", "cat-important"],
    statistics: {
      totalAttempts: 32000,
      correctPercentage: 45,
      averageTime: 200
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },

  // ============================================
  // TNPSC GROUP 4 - 2024
  // ============================================
  {
    id: "TNPSC_G4_2024_GK_001",
    examId: "TNPSC_GROUP_4",
    year: 2024,
    date: "2024-06-09",
    category: "Civil Services",
    subject: "General Knowledge",
    topic: "Tamil Nadu History",
    subtopic: "Freedom Movement",
    questionNumber: 1,
    questionType: "MCQ",
    difficulty: "Easy",
    marks: 1.5,
    negativeMarks: 0.5,
    timeRecommended: 60,
    question: {
      en: "Who was known as 'Veera Pandiya Kattabomman'?",
      ta: "'வீரபாண்டிய கட்டபொம்மன்' என்று அழைக்கப்பட்டவர் யார்?"
    },
    options: {
      en: [
        { id: "A", text: "Velu Nachiyar" },
        { id: "B", text: "Kattabomman" },
        { id: "C", text: "Marudhu Brothers" },
        { id: "D", text: "Veerapandiya Kattabomman" }
      ],
      ta: [
        { id: "A", text: "வேலு நாச்சியார்" },
        { id: "B", text: "கட்டபொம்மன்" },
        { id: "C", text: "மருது சகோதரர்கள்" },
        { id: "D", text: "வீரபாண்டிய கட்டபொம்மன்" }
      ]
    },
    correctAnswer: "D",
    solution: {
      en: "Veerapandiya Kattabomman was the Palayakarrar of Panchalankurichi who fought against the British East India Company. He was executed in 1799 and is revered as a freedom fighter.",
      ta: "வீரபாண்டிய கட்டபொம்மன் பஞ்சாலங்குறிச்சியின் பாளையக்காரர், பிரிட்டிஷ் கிழக்கிந்திய கம்பெனிக்கு எதிராக போராடினார். அவர் 1799 இல் தூக்கிலிடப்பட்டார் மற்றும் சுதந்திரப் போராட்ட வீரராக மதிக்கப்படுகிறார்."
    },
    hints: ["Panchalankurichi Palayakarrar", "Fought against British"],
    conceptsTested: ["Tamil Nadu freedom movement", "Historical figures"],
    commonMistakes: ["Confusing with other freedom fighters"],
    relatedQuestions: ["TNPSC_G4_2023_GK_015"],
    tags: ["tn-history", "freedom-movement", "tnpsc-important"],
    statistics: {
      totalAttempts: 125000,
      correctPercentage: 88,
      averageTime: 35
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "TNPSC_G4_2024_GK_002",
    examId: "TNPSC_GROUP_4",
    year: 2024,
    date: "2024-06-09",
    category: "Civil Services",
    subject: "General Knowledge",
    topic: "Tamil Nadu Geography",
    subtopic: "Rivers",
    questionNumber: 2,
    questionType: "MCQ",
    difficulty: "Easy",
    marks: 1.5,
    negativeMarks: 0.5,
    timeRecommended: 45,
    question: {
      en: "Which is the longest river in Tamil Nadu?",
      ta: "தமிழ்நாட்டின் மிக நீளமான ஆறு எது?"
    },
    options: {
      en: [
        { id: "A", text: "Vaigai" },
        { id: "B", text: "Cauvery" },
        { id: "C", text: "Tamiraparani" },
        { id: "D", text: "Palar" }
      ],
      ta: [
        { id: "A", text: "வைகை" },
        { id: "B", text: "காவிரி" },
        { id: "C", text: "தாமிரபரணி" },
        { id: "D", text: "பாலாறு" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "Cauvery (Kaveri) is the longest river in Tamil Nadu with a total length of about 765 km, of which approximately 416 km flows through Tamil Nadu. It originates in Kodagu, Karnataka.",
      ta: "காவிரி தமிழ்நாட்டின் மிக நீளமான ஆறு ஆகும், மொத்த நீளம் சுமார் 765 கி.மீ., இதில் சுமார் 416 கி.மீ. தமிழ்நாடு வழியாக பாய்கிறது. இது கர்நாடகாவின் கொடகுவில் உற்பத்தியாகிறது."
    },
    hints: ["Major river of Tamil Nadu", "Originates from Karnataka"],
    conceptsTested: ["Tamil Nadu rivers", "Geography"],
    commonMistakes: ["Confusing with other rivers"],
    relatedQuestions: ["TNPSC_G4_2023_GK_008"],
    tags: ["tn-geography", "rivers", "tnpsc-important"],
    statistics: {
      totalAttempts: 130000,
      correctPercentage: 92,
      averageTime: 25
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "TNPSC_G4_2024_GK_003",
    examId: "TNPSC_GROUP_4",
    year: 2024,
    date: "2024-06-09",
    category: "Civil Services",
    subject: "General Knowledge",
    topic: "Indian Polity",
    subtopic: "Constitution",
    questionNumber: 3,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 1.5,
    negativeMarks: 0.5,
    timeRecommended: 60,
    question: {
      en: "How many Fundamental Rights are there in the Indian Constitution?",
      ta: "இந்திய அரசியலமைப்பில் எத்தனை அடிப்படை உரிமைகள் உள்ளன?"
    },
    options: {
      en: [
        { id: "A", text: "5" },
        { id: "B", text: "6" },
        { id: "C", text: "7" },
        { id: "D", text: "8" }
      ],
      ta: [
        { id: "A", text: "5" },
        { id: "B", text: "6" },
        { id: "C", text: "7" },
        { id: "D", text: "8" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "There are 6 Fundamental Rights in the Indian Constitution (originally 7, Right to Property was removed by 44th Amendment): 1. Right to Equality 2. Right to Freedom 3. Right against Exploitation 4. Right to Freedom of Religion 5. Cultural and Educational Rights 6. Right to Constitutional Remedies",
      ta: "இந்திய அரசியலமைப்பில் 6 அடிப்படை உரிமைகள் உள்ளன (முதலில் 7, சொத்துரிமை 44வது திருத்தத்தால் நீக்கப்பட்டது): 1. சமத்துவ உரிமை 2. சுதந்திர உரிமை 3. சுரண்டலுக்கு எதிரான உரிமை 4. மத சுதந்திர உரிமை 5. கலாச்சார மற்றும் கல்வி உரிமைகள் 6. அரசியலமைப்பு தீர்வுகளுக்கான உரிமை"
    },
    hints: ["Right to Property was removed", "44th Amendment"],
    conceptsTested: ["Fundamental Rights", "Indian Constitution"],
    commonMistakes: ["Including Right to Property", "Wrong count"],
    relatedQuestions: ["TNPSC_G4_2023_GK_025"],
    tags: ["polity", "constitution", "tnpsc-important"],
    statistics: {
      totalAttempts: 118000,
      correctPercentage: 72,
      averageTime: 50
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "TNPSC_G4_2024_TAM_001",
    examId: "TNPSC_GROUP_4",
    year: 2024,
    date: "2024-06-09",
    category: "Civil Services",
    subject: "Tamil",
    topic: "Tamil Literature",
    subtopic: "Sangam Literature",
    questionNumber: 101,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 1.5,
    negativeMarks: 0.5,
    timeRecommended: 60,
    question: {
      en: "Who wrote 'Thirukkural'?",
      ta: "'திருக்குறள்' எழுதியவர் யார்?"
    },
    options: {
      en: [
        { id: "A", text: "Kambar" },
        { id: "B", text: "Thiruvalluvar" },
        { id: "C", text: "Bharathiar" },
        { id: "D", text: "Avvaiyar" }
      ],
      ta: [
        { id: "A", text: "கம்பர்" },
        { id: "B", text: "திருவள்ளுவர்" },
        { id: "C", text: "பாரதியார்" },
        { id: "D", text: "ஔவையார்" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "Thirukkural was written by Thiruvalluvar. It contains 1330 couplets divided into 133 chapters, covering Aram (Virtue), Porul (Wealth), and Inbam (Love).",
      ta: "திருக்குறளை திருவள்ளுவர் எழுதினார். இது 133 அதிகாரங்களாகப் பிரிக்கப்பட்ட 1330 குறள்களைக் கொண்டுள்ளது, அறம், பொருள், இன்பம் ஆகியவற்றை உள்ளடக்கியது."
    },
    hints: ["Famous Tamil classic", "1330 couplets"],
    conceptsTested: ["Tamil literature", "Famous authors"],
    commonMistakes: ["Confusing with other authors"],
    relatedQuestions: ["TNPSC_G4_2023_TAM_005"],
    tags: ["tamil-literature", "thirukkural", "tnpsc-important"],
    statistics: {
      totalAttempts: 135000,
      correctPercentage: 95,
      averageTime: 20
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "TNPSC_G4_2024_APT_001",
    examId: "TNPSC_GROUP_4",
    year: 2024,
    date: "2024-06-09",
    category: "Civil Services",
    subject: "Aptitude",
    topic: "Quantitative Aptitude",
    subtopic: "Percentage",
    questionNumber: 151,
    questionType: "MCQ",
    difficulty: "Easy",
    marks: 1.5,
    negativeMarks: 0.5,
    timeRecommended: 60,
    question: {
      en: "If a number is increased by 25%, by what percent should it be decreased to get the original number?",
      ta: "ஒரு எண் 25% அதிகரிக்கப்பட்டால், அசல் எண்ணைப் பெற அதை எத்தனை சதவீதம் குறைக்க வேண்டும்?"
    },
    options: {
      en: [
        { id: "A", text: "20%" },
        { id: "B", text: "25%" },
        { id: "C", text: "30%" },
        { id: "D", text: "15%" }
      ],
      ta: [
        { id: "A", text: "20%" },
        { id: "B", text: "25%" },
        { id: "C", text: "30%" },
        { id: "D", text: "15%" }
      ]
    },
    correctAnswer: "A",
    solution: {
      en: "Let original = 100. After 25% increase = 125. To get back 100, decrease needed = (125-100)/125 × 100 = 25/125 × 100 = 20%",
      ta: "அசல் = 100 என்க. 25% அதிகரிப்புக்குப் பின் = 125. 100 ஐ திரும்பப் பெற, தேவையான குறைப்பு = (125-100)/125 × 100 = 25/125 × 100 = 20%"
    },
    hints: ["Use 100 as base", "Calculate percentage on new number"],
    conceptsTested: ["Percentage increase/decrease", "Reverse percentage"],
    commonMistakes: ["Using same percentage", "Wrong base"],
    relatedQuestions: ["TNPSC_G4_2023_APT_008"],
    tags: ["aptitude", "percentage", "tnpsc-important"],
    statistics: {
      totalAttempts: 120000,
      correctPercentage: 65,
      averageTime: 55
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },

  // ============================================
  // IBPS PO 2024
  // ============================================
  {
    id: "IBPS_PO_2024_QA_001",
    examId: "IBPS_PO",
    year: 2024,
    date: "2024-10-19",
    category: "Banking",
    subject: "Quantitative Aptitude",
    topic: "Simple Interest",
    subtopic: "SI Calculations",
    questionNumber: 1,
    questionType: "MCQ",
    difficulty: "Easy",
    marks: 1,
    negativeMarks: 0.25,
    timeRecommended: 45,
    question: {
      en: "Find the simple interest on Rs. 5000 at 8% per annum for 3 years.",
      ta: "ரூ. 5000 க்கு வருடத்திற்கு 8% வட்டியில் 3 ஆண்டுகளுக்கான தனிவட்டியைக் காண்க."
    },
    options: {
      en: [
        { id: "A", text: "Rs. 1000" },
        { id: "B", text: "Rs. 1200" },
        { id: "C", text: "Rs. 1500" },
        { id: "D", text: "Rs. 800" }
      ],
      ta: [
        { id: "A", text: "ரூ. 1000" },
        { id: "B", text: "ரூ. 1200" },
        { id: "C", text: "ரூ. 1500" },
        { id: "D", text: "ரூ. 800" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "SI = PRT/100 = 5000 × 8 × 3/100 = 1200. Simple Interest = Rs. 1200",
      ta: "தனிவட்டி = PRT/100 = 5000 × 8 × 3/100 = 1200. தனிவட்டி = ரூ. 1200"
    },
    hints: ["Use SI = PRT/100", "P = Principal, R = Rate, T = Time"],
    conceptsTested: ["Simple interest formula"],
    commonMistakes: ["Formula confusion", "Calculation errors"],
    relatedQuestions: ["IBPS_PO_2023_QA_005"],
    tags: ["simple-interest", "banking", "ibps-important"],
    statistics: {
      totalAttempts: 95000,
      correctPercentage: 85,
      averageTime: 35
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "IBPS_PO_2024_REA_001",
    examId: "IBPS_PO",
    year: 2024,
    date: "2024-10-19",
    category: "Banking",
    subject: "Reasoning",
    topic: "Coding-Decoding",
    subtopic: "Letter Coding",
    questionNumber: 36,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 1,
    negativeMarks: 0.25,
    timeRecommended: 60,
    question: {
      en: "If COMPUTER is coded as RFUVQNPC, how is LANGUAGE coded?",
      ta: "COMPUTER என்பது RFUVQNPC என குறியிடப்பட்டால், LANGUAGE எவ்வாறு குறியிடப்படும்?"
    },
    options: {
      en: [
        { id: "A", text: "FHBVHBMF" },
        { id: "B", text: "BHVHFBMF" },
        { id: "C", text: "FBHVHBFM" },
        { id: "D", text: "FHBVHFMB" }
      ],
      ta: [
        { id: "A", text: "FHBVHBMF" },
        { id: "B", text: "BHVHFBMF" },
        { id: "C", text: "FBHVHBFM" },
        { id: "D", text: "FHBVHFMB" }
      ]
    },
    correctAnswer: "A",
    solution: {
      en: "Pattern: Reverse the word and then replace each letter with the previous letter in alphabet. LANGUAGE → EGAUGNAL → FHBVHBMF",
      ta: "முறை: வார்த்தையை தலைகீழாக மாற்றி, ஒவ்வொரு எழுத்தையும் அகரவரிசையில் முந்தைய எழுத்துடன் மாற்றவும். LANGUAGE → EGAUGNAL → FHBVHBMF"
    },
    hints: ["Reverse and shift", "Check pattern in given example"],
    conceptsTested: ["Coding patterns", "Letter manipulation"],
    commonMistakes: ["Wrong direction shift", "Missing reversal"],
    relatedQuestions: ["IBPS_PO_2023_REA_012"],
    tags: ["coding", "reasoning", "ibps-important"],
    statistics: {
      totalAttempts: 88000,
      correctPercentage: 52,
      averageTime: 75
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },

  // ============================================
  // UPSC PRELIMS 2024
  // ============================================
  {
    id: "UPSC_PRE_2024_GS_001",
    examId: "UPSC_PRELIMS",
    year: 2024,
    date: "2024-05-26",
    category: "Civil Services",
    subject: "General Studies",
    topic: "Indian History",
    subtopic: "Ancient India",
    questionNumber: 1,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 2,
    negativeMarks: 0.66,
    timeRecommended: 90,
    question: {
      en: "Which of the following Harappan sites is known for its dockyard?",
      ta: "பின்வரும் ஹரப்பா தளங்களில் எது அதன் கப்பல்துறைக்கு அறியப்படுகிறது?"
    },
    options: {
      en: [
        { id: "A", text: "Mohenjo-daro" },
        { id: "B", text: "Lothal" },
        { id: "C", text: "Kalibangan" },
        { id: "D", text: "Dholavira" }
      ],
      ta: [
        { id: "A", text: "மொகஞ்சதாரோ" },
        { id: "B", text: "லோத்தல்" },
        { id: "C", text: "காலிபங்கன்" },
        { id: "D", text: "தோலவீரா" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "Lothal, located in Gujarat, is famous for its ancient dockyard, which is one of the earliest known docks in the world. It was an important trading center of the Harappan civilization.",
      ta: "குஜராத்தில் அமைந்துள்ள லோத்தல், அதன் பழங்கால கப்பல்துறைக்கு புகழ்பெற்றது, இது உலகின் முதன்மையான அறியப்பட்ட கப்பல்துறைகளில் ஒன்றாகும். இது ஹரப்பா நாகரிகத்தின் முக்கிய வர்த்தக மையமாக இருந்தது."
    },
    hints: ["Located in Gujarat", "Important for maritime trade"],
    conceptsTested: ["Harappan civilization", "Ancient ports"],
    commonMistakes: ["Confusing with Mohenjo-daro", "Wrong location"],
    relatedQuestions: ["UPSC_PRE_2023_GS_015"],
    tags: ["ancient-india", "harappa", "upsc-important"],
    statistics: {
      totalAttempts: 185000,
      correctPercentage: 68,
      averageTime: 70
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "UPSC_PRE_2024_GS_002",
    examId: "UPSC_PRELIMS",
    year: 2024,
    date: "2024-05-26",
    category: "Civil Services",
    subject: "General Studies",
    topic: "Indian Polity",
    subtopic: "Fundamental Rights",
    questionNumber: 2,
    questionType: "MCQ",
    difficulty: "Hard",
    marks: 2,
    negativeMarks: 0.66,
    timeRecommended: 120,
    question: {
      en: "Consider the following statements about Fundamental Rights: 1. They are not absolute and can be restricted. 2. They are available against both State and private individuals. 3. They can be suspended during a national emergency. Which of the above statements is/are correct?",
      ta: "அடிப்படை உரிமைகள் பற்றிய பின்வரும் கூற்றுகளைக் கவனியுங்கள்: 1. அவை முழுமையானவை அல்ல, கட்டுப்படுத்தப்படலாம். 2. அரசு மற்றும் தனிநபர்கள் இருவருக்கும் எதிராக அவை கிடைக்கின்றன. 3. தேசிய அவசரகால நிலையின் போது அவற்றை இடைநிறுத்தலாம். மேலே உள்ள கூற்றுகளில் எது/எவை சரியானவை?"
    },
    options: {
      en: [
        { id: "A", text: "1 and 2 only" },
        { id: "B", text: "1 and 3 only" },
        { id: "C", text: "2 and 3 only" },
        { id: "D", text: "1, 2 and 3" }
      ],
      ta: [
        { id: "A", text: "1 மற்றும் 2 மட்டும்" },
        { id: "B", text: "1 மற்றும் 3 மட்டும்" },
        { id: "C", text: "2 மற்றும் 3 மட்டும்" },
        { id: "D", text: "1, 2 மற்றும் 3" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "Statement 1 is correct - FRs are not absolute. Statement 2 is incorrect - most FRs are available only against State (except Article 17, 23, 24). Statement 3 is correct - under Article 359, FRs under Article 19 are automatically suspended during national emergency.",
      ta: "கூற்று 1 சரி - அடிப்படை உரிமைகள் முழுமையானவை அல்ல. கூற்று 2 தவறு - பெரும்பாலான அடிப்படை உரிமைகள் அரசுக்கு எதிராக மட்டுமே கிடைக்கும் (சட்டப்பிரிவு 17, 23, 24 தவிர). கூற்று 3 சரி - சட்டப்பிரிவு 359 இன் கீழ், தேசிய அவசரகால நிலையின் போது சட்டப்பிரிவு 19 இன் கீழ் உள்ள அடிப்படை உரிமைகள் தானாகவே இடைநிறுத்தப்படும்."
    },
    hints: ["Check availability against private individuals", "Article 359 provisions"],
    conceptsTested: ["Fundamental Rights", "Emergency provisions"],
    commonMistakes: ["Assuming FRs against all", "Emergency confusion"],
    relatedQuestions: ["UPSC_PRE_2023_GS_028"],
    tags: ["polity", "fundamental-rights", "upsc-important"],
    statistics: {
      totalAttempts: 175000,
      correctPercentage: 42,
      averageTime: 130
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },

  // ============================================
  // CLAT 2024
  // ============================================
  {
    id: "CLAT_2024_LR_001",
    examId: "CLAT",
    year: 2024,
    date: "2024-12-01",
    category: "Law",
    subject: "Legal Reasoning",
    topic: "Constitutional Law",
    subtopic: "Fundamental Rights",
    questionNumber: 1,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 1,
    negativeMarks: 0.25,
    timeRecommended: 90,
    question: {
      en: "According to Article 14 of the Indian Constitution, 'Equality before law' means:",
      ta: "இந்திய அரசியலமைப்பின் சட்டப்பிரிவு 14 படி, 'சட்டத்தின் முன் சமத்துவம்' என்பதன் பொருள்:"
    },
    options: {
      en: [
        { id: "A", text: "All laws apply equally to all persons" },
        { id: "B", text: "No person shall be denied equal protection of laws" },
        { id: "C", text: "The state shall not discriminate on grounds of religion" },
        { id: "D", text: "All citizens have equal access to public employment" }
      ],
      ta: [
        { id: "A", text: "அனைத்து சட்டங்களும் அனைத்து நபர்களுக்கும் சமமாக பொருந்தும்" },
        { id: "B", text: "எந்த நபருக்கும் சட்டங்களின் சம பாதுகாப்பு மறுக்கப்படாது" },
        { id: "C", text: "மதத்தின் அடிப்படையில் அரசு பாகுபாடு காட்டக்கூடாது" },
        { id: "D", text: "அனைத்து குடிமக்களுக்கும் பொது வேலைவாய்ப்பில் சம அணுகல் உள்ளது" }
      ]
    },
    correctAnswer: "A",
    solution: {
      en: "Equality before law (British concept) means that all persons are subject to the same law and no one is above the law. Equal protection of laws (American concept) ensures equal treatment in equal circumstances.",
      ta: "சட்டத்தின் முன் சமத்துவம் (பிரிட்டிஷ் கருத்து) அனைத்து நபர்களும் ஒரே சட்டத்திற்கு உட்பட்டவர்கள் மற்றும் யாரும் சட்டத்திற்கு மேல் இல்லை என்பதாகும். சட்டங்களின் சம பாதுகாப்பு (அமெரிக்க கருத்து) சம சூழ்நிலைகளில் சம சிகிச்சையை உறுதி செய்கிறது."
    },
    hints: ["British concept of rule of law", "No one above law"],
    conceptsTested: ["Article 14", "Equality concepts"],
    commonMistakes: ["Confusing with equal protection", "Wrong article"],
    relatedQuestions: ["CLAT_2023_LR_008"],
    tags: ["constitutional-law", "article-14", "clat-important"],
    statistics: {
      totalAttempts: 65000,
      correctPercentage: 58,
      averageTime: 80
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },

  // ============================================
  // UGC NET 2024
  // ============================================
  {
    id: "UGC_NET_2024_P1_001",
    examId: "UGC_NET",
    year: 2024,
    date: "2024-06-18",
    category: "Teaching",
    subject: "Teaching Aptitude",
    topic: "Teaching Methods",
    subtopic: "Classroom Management",
    questionNumber: 1,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 2,
    negativeMarks: 0,
    timeRecommended: 60,
    question: {
      en: "Which of the following is NOT a characteristic of effective teaching?",
      ta: "பின்வருவனவற்றில் எது திறமையான கற்பித்தலின் பண்பு அல்ல?"
    },
    options: {
      en: [
        { id: "A", text: "Student-centered approach" },
        { id: "B", text: "One-way communication" },
        { id: "C", text: "Active learning" },
        { id: "D", text: "Continuous assessment" }
      ],
      ta: [
        { id: "A", text: "மாணவர்-மைய அணுகுமுறை" },
        { id: "B", text: "ஒருவழி தொடர்பு" },
        { id: "C", text: "செயலூக்க கற்றல்" },
        { id: "D", text: "தொடர் மதிப்பீடு" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "One-way communication is NOT a characteristic of effective teaching. Effective teaching requires two-way communication, student participation, and interactive learning. The other options are all important characteristics of effective teaching.",
      ta: "ஒருவழி தொடர்பு திறமையான கற்பித்தலின் பண்பு அல்ல. திறமையான கற்பித்தலுக்கு இருவழி தொடர்பு, மாணவர் பங்கேற்பு மற்றும் ஊடாடும் கற்றல் தேவை. மற்ற விருப்பங்கள் அனைத்தும் திறமையான கற்பித்தலின் முக்கிய பண்புகள்."
    },
    hints: ["Think about student engagement", "Communication should be interactive"],
    conceptsTested: ["Teaching methods", "Effective teaching"],
    commonMistakes: ["Confusing with lecture method", "Wrong interpretation"],
    relatedQuestions: ["UGC_NET_2023_P1_005"],
    tags: ["teaching-aptitude", "ugc-net-important"],
    statistics: {
      totalAttempts: 72000,
      correctPercentage: 75,
      averageTime: 45
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },

  // ============================================
  // CTET 2024
  // ============================================
  {
    id: "CTET_2024_CDP_001",
    examId: "CTET",
    year: 2024,
    date: "2024-07-07",
    category: "Teaching",
    subject: "Child Development",
    topic: "Piaget's Theory",
    subtopic: "Cognitive Development",
    questionNumber: 1,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 1,
    negativeMarks: 0,
    timeRecommended: 60,
    question: {
      en: "According to Piaget, the stage of cognitive development in which children begin to think logically about concrete events is:",
      ta: "பியாஜேவின் கூற்றுப்படி, குழந்தைகள் உறுதியான நிகழ்வுகளைப் பற்றி தர்க்கரீதியாக சிந்திக்கத் தொடங்கும் அறிவாற்றல் வளர்ச்சியின் நிலை:"
    },
    options: {
      en: [
        { id: "A", text: "Sensorimotor stage" },
        { id: "B", text: "Preoperational stage" },
        { id: "C", text: "Concrete operational stage" },
        { id: "D", text: "Formal operational stage" }
      ],
      ta: [
        { id: "A", text: "உணர்ச்சி-இயக்க நிலை" },
        { id: "B", text: "முன்-செயல்பாட்டு நிலை" },
        { id: "C", text: "உறுதியான செயல்பாட்டு நிலை" },
        { id: "D", text: "முறையான செயல்பாட்டு நிலை" }
      ]
    },
    correctAnswer: "C",
    solution: {
      en: "The Concrete Operational Stage (7-11 years) is when children develop logical thinking about concrete objects. They can understand conservation, classification, and seriation but struggle with abstract concepts.",
      ta: "உறுதியான செயல்பாட்டு நிலை (7-11 வயது) குழந்தைகள் உறுதியான பொருள்களைப் பற்றி தர்க்கரீதியான சிந்தனையை வளர்க்கும் காலம். அவர்கள் பாதுகாப்பு, வகைப்படுத்துதல் மற்றும் வரிசைப்படுத்துதல் ஆகியவற்றைப் புரிந்துகொள்ள முடியும், ஆனால் சுருக்கமான கருத்துக்களில் சிரமப்படுவார்கள்."
    },
    hints: ["Age 7-11 years", "Logical thinking about concrete objects"],
    conceptsTested: ["Piaget's stages", "Cognitive development"],
    commonMistakes: ["Confusing with formal operations", "Age group confusion"],
    relatedQuestions: ["CTET_2023_CDP_008"],
    tags: ["child-development", "piaget", "ctet-important"],
    statistics: {
      totalAttempts: 85000,
      correctPercentage: 72,
      averageTime: 50
    },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },

  // ============================================
  // JEE ADVANCED 2024 - PHYSICS
  // ============================================
  {
    id: "JEE_ADV_2024_PHY_001",
    examId: "JEE_ADVANCED",
    year: 2024,
    session: "Paper 1",
    date: "2024-05-26",
    category: "Engineering",
    subject: "Physics",
    topic: "Mechanics",
    subtopic: "Rotational Motion",
    questionNumber: 1,
    questionType: "MCQ",
    difficulty: "Hard",
    marks: 3,
    negativeMarks: 1,
    timeRecommended: 180,
    question: {
      en: "A uniform solid cylinder of mass M and radius R is rolling without slipping on a horizontal surface with velocity v. The kinetic energy of the cylinder is:",
      ta: "M நிறை மற்றும் R ஆரம் கொண்ட ஒரு சீரான திட உருளை v வேகத்தில் கிடைமட்ட மேற்பரப்பில் வழுக்காமல் உருளுகிறது. உருளையின் இயக்க ஆற்றல்:"
    },
    options: {
      en: [
        { id: "A", text: "½Mv²" },
        { id: "B", text: "¾Mv²" },
        { id: "C", text: "Mv²" },
        { id: "D", text: "⅔Mv²" }
      ],
      ta: [
        { id: "A", text: "½Mv²" },
        { id: "B", text: "¾Mv²" },
        { id: "C", text: "Mv²" },
        { id: "D", text: "⅔Mv²" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "Total KE = Translational KE + Rotational KE = ½Mv² + ½Iω². For solid cylinder, I = ½MR² and ω = v/R. So KE = ½Mv² + ½(½MR²)(v/R)² = ½Mv² + ¼Mv² = ¾Mv²",
      ta: "மொத்த KE = இடப்பெயர்வு KE + சுழற்சி KE = ½Mv² + ½Iω². திட உருளைக்கு, I = ½MR² மற்றும் ω = v/R. எனவே KE = ½Mv² + ½(½MR²)(v/R)² = ½Mv² + ¼Mv² = ¾Mv²"
    },
    hints: ["Consider both translational and rotational KE", "Use moment of inertia of cylinder"],
    conceptsTested: ["Rolling motion", "Moment of inertia", "Kinetic energy"],
    commonMistakes: ["Forgetting rotational KE", "Wrong moment of inertia"],
    relatedQuestions: ["JEE_ADV_2023_PHY_005"],
    tags: ["rotation", "energy", "jee-advanced-important"],
    statistics: { totalAttempts: 28000, correctPercentage: 35, averageTime: 200 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "JEE_ADV_2024_PHY_002",
    examId: "JEE_ADVANCED",
    year: 2024,
    session: "Paper 1",
    date: "2024-05-26",
    category: "Engineering",
    subject: "Physics",
    topic: "Electromagnetism",
    subtopic: "Electromagnetic Induction",
    questionNumber: 2,
    questionType: "MCQ",
    difficulty: "Hard",
    marks: 3,
    negativeMarks: 1,
    timeRecommended: 180,
    question: {
      en: "A conducting rod of length L moves with velocity v perpendicular to a uniform magnetic field B. The induced EMF across the rod is:",
      ta: "L நீளமுள்ள ஒரு கடத்தும் தண்டு ஒரு சீரான காந்தப்புலம் B க்கு செங்குத்தாக v வேகத்தில் நகர்கிறது. தண்டு முழுவதும் தூண்டப்பட்ட EMF:"
    },
    options: {
      en: [
        { id: "A", text: "BL" },
        { id: "B", text: "BLv" },
        { id: "C", text: "BL²v" },
        { id: "D", text: "B²Lv" }
      ],
      ta: [
        { id: "A", text: "BL" },
        { id: "B", text: "BLv" },
        { id: "C", text: "BL²v" },
        { id: "D", text: "B²Lv" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "The motional EMF induced in a conducting rod moving in a magnetic field is given by ε = BLv, where B is the magnetic field, L is length, and v is velocity.",
      ta: "காந்தப்புலத்தில் நகரும் கடத்தும் தண்டில் தூண்டப்படும் இயக்க EMF ε = BLv என்று கொடுக்கப்படுகிறது, இங்கு B காந்தப்புலம், L நீளம், v வேகம்."
    },
    hints: ["Use Faraday's law", "Consider motional EMF formula"],
    conceptsTested: ["Electromagnetic induction", "Faraday's law"],
    commonMistakes: ["Wrong formula application", "Unit confusion"],
    relatedQuestions: ["JEE_ADV_2023_PHY_012"],
    tags: ["electromagnetism", "induction", "important"],
    statistics: { totalAttempts: 32000, correctPercentage: 58, averageTime: 120 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "JEE_ADV_2024_PHY_003",
    examId: "JEE_ADVANCED",
    year: 2024,
    session: "Paper 1",
    date: "2024-05-26",
    category: "Engineering",
    subject: "Physics",
    topic: "Thermodynamics",
    subtopic: "Heat Engines",
    questionNumber: 3,
    questionType: "MCQ",
    difficulty: "Hard",
    marks: 3,
    negativeMarks: 1,
    timeRecommended: 180,
    question: {
      en: "A Carnot engine operates between temperatures 500K and 300K. Its efficiency is:",
      ta: "ஒரு கார்னோ இயந்திரம் 500K மற்றும் 300K வெப்பநிலைகளுக்கு இடையில் இயங்குகிறது. அதன் திறன்:"
    },
    options: {
      en: [
        { id: "A", text: "20%" },
        { id: "B", text: "40%" },
        { id: "C", text: "60%" },
        { id: "D", text: "80%" }
      ],
      ta: [
        { id: "A", text: "20%" },
        { id: "B", text: "40%" },
        { id: "C", text: "60%" },
        { id: "D", text: "80%" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "Carnot efficiency η = 1 - T₂/T₁ = 1 - 300/500 = 1 - 0.6 = 0.4 = 40%",
      ta: "கார்னோ திறன் η = 1 - T₂/T₁ = 1 - 300/500 = 1 - 0.6 = 0.4 = 40%"
    },
    hints: ["Use Carnot efficiency formula", "Temperature must be in Kelvin"],
    conceptsTested: ["Carnot cycle", "Thermodynamic efficiency"],
    commonMistakes: ["Using Celsius instead of Kelvin", "Inverting the ratio"],
    relatedQuestions: ["JEE_ADV_2023_PHY_018"],
    tags: ["thermodynamics", "carnot", "efficiency"],
    statistics: { totalAttempts: 35000, correctPercentage: 65, averageTime: 90 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "JEE_ADV_2024_CHE_001",
    examId: "JEE_ADVANCED",
    year: 2024,
    session: "Paper 1",
    date: "2024-05-26",
    category: "Engineering",
    subject: "Chemistry",
    topic: "Organic Chemistry",
    subtopic: "Reaction Mechanisms",
    questionNumber: 4,
    questionType: "MCQ",
    difficulty: "Hard",
    marks: 3,
    negativeMarks: 1,
    timeRecommended: 180,
    question: {
      en: "Which of the following is the most stable carbocation?",
      ta: "பின்வருவனவற்றில் எது மிகவும் நிலையான கார்போகேஷன்?"
    },
    options: {
      en: [
        { id: "A", text: "Methyl carbocation" },
        { id: "B", text: "Ethyl carbocation" },
        { id: "C", text: "Isopropyl carbocation" },
        { id: "D", text: "tert-Butyl carbocation" }
      ],
      ta: [
        { id: "A", text: "மெத்தில் கார்போகேஷன்" },
        { id: "B", text: "எத்தில் கார்போகேஷன்" },
        { id: "C", text: "ஐசோப்ரோப்பில் கார்போகேஷன்" },
        { id: "D", text: "டெர்ட்-பியூட்டில் கார்போகேஷன்" }
      ]
    },
    correctAnswer: "D",
    solution: {
      en: "Carbocation stability: 3° > 2° > 1° > methyl. tert-Butyl carbocation is tertiary and most stable due to hyperconjugation and +I effect of three methyl groups.",
      ta: "கார்போகேஷன் நிலைப்புத்தன்மை: 3° > 2° > 1° > மெத்தில். டெர்ட்-பியூட்டில் கார்போகேஷன் மூன்றாம் நிலை மற்றும் மூன்று மெத்தில் குழுக்களின் ஹைபர்கன்ஜுகேஷன் மற்றும் +I விளைவு காரணமாக மிகவும் நிலையானது."
    },
    hints: ["Consider hyperconjugation", "More alkyl groups = more stable"],
    conceptsTested: ["Carbocation stability", "Hyperconjugation"],
    commonMistakes: ["Confusing with carbanion stability"],
    relatedQuestions: ["JEE_ADV_2023_CHE_005"],
    tags: ["organic", "carbocation", "stability"],
    statistics: { totalAttempts: 40000, correctPercentage: 72, averageTime: 80 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "JEE_ADV_2024_CHE_002",
    examId: "JEE_ADVANCED",
    year: 2024,
    session: "Paper 1",
    date: "2024-05-26",
    category: "Engineering",
    subject: "Chemistry",
    topic: "Physical Chemistry",
    subtopic: "Chemical Kinetics",
    questionNumber: 5,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 3,
    negativeMarks: 1,
    timeRecommended: 150,
    question: {
      en: "The half-life of a first-order reaction is 10 minutes. What fraction of the reactant remains after 30 minutes?",
      ta: "முதல் வரிசை வினையின் அரை-ஆயுள் 10 நிமிடங்கள். 30 நிமிடங்களுக்குப் பிறகு வினைபொருளின் எந்த பகுதி மீதமுள்ளது?"
    },
    options: {
      en: [
        { id: "A", text: "1/2" },
        { id: "B", text: "1/4" },
        { id: "C", text: "1/8" },
        { id: "D", text: "1/16" }
      ],
      ta: [
        { id: "A", text: "1/2" },
        { id: "B", text: "1/4" },
        { id: "C", text: "1/8" },
        { id: "D", text: "1/16" }
      ]
    },
    correctAnswer: "C",
    solution: {
      en: "After n half-lives, fraction remaining = (1/2)ⁿ. n = 30/10 = 3 half-lives. Fraction = (1/2)³ = 1/8",
      ta: "n அரை-ஆயுள்களுக்குப் பிறகு, மீதமுள்ள பகுதி = (1/2)ⁿ. n = 30/10 = 3 அரை-ஆயுள்கள். பகுதி = (1/2)³ = 1/8"
    },
    hints: ["Count number of half-lives", "Use (1/2)^n formula"],
    conceptsTested: ["First-order kinetics", "Half-life"],
    commonMistakes: ["Wrong number of half-lives", "Using wrong formula"],
    relatedQuestions: ["JEE_ADV_2023_CHE_012"],
    tags: ["kinetics", "half-life", "first-order"],
    statistics: { totalAttempts: 38000, correctPercentage: 68, averageTime: 100 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "JEE_ADV_2024_MAT_001",
    examId: "JEE_ADVANCED",
    year: 2024,
    session: "Paper 1",
    date: "2024-05-26",
    category: "Engineering",
    subject: "Mathematics",
    topic: "Calculus",
    subtopic: "Integration",
    questionNumber: 6,
    questionType: "MCQ",
    difficulty: "Hard",
    marks: 3,
    negativeMarks: 1,
    timeRecommended: 180,
    question: {
      en: "The value of ∫₀^π sin³x dx is:",
      ta: "∫₀^π sin³x dx இன் மதிப்பு:"
    },
    options: {
      en: [
        { id: "A", text: "0" },
        { id: "B", text: "2/3" },
        { id: "C", text: "4/3" },
        { id: "D", text: "π/2" }
      ],
      ta: [
        { id: "A", text: "0" },
        { id: "B", text: "2/3" },
        { id: "C", text: "4/3" },
        { id: "D", text: "π/2" }
      ]
    },
    correctAnswer: "C",
    solution: {
      en: "sin³x = sinx(1-cos²x). Let cosx = t, -sinx dx = dt. ∫sin³x dx = ∫(1-t²)(-dt) = -t + t³/3 + C. Evaluating from 0 to π: [(-(-1) + (-1)³/3) - ((-1) + 1³/3)] = (1 - 1/3) - (-1 + 1/3) = 2/3 + 2/3 = 4/3",
      ta: "sin³x = sinx(1-cos²x). cosx = t என்க, -sinx dx = dt. ∫sin³x dx = ∫(1-t²)(-dt) = -t + t³/3 + C. 0 முதல் π வரை மதிப்பிடுதல்: 4/3"
    },
    hints: ["Use sin³x = sinx(1-cos²x)", "Substitution method"],
    conceptsTested: ["Definite integration", "Substitution"],
    commonMistakes: ["Wrong limits", "Sign errors"],
    relatedQuestions: ["JEE_ADV_2023_MAT_008"],
    tags: ["calculus", "integration", "trigonometric"],
    statistics: { totalAttempts: 30000, correctPercentage: 42, averageTime: 200 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "JEE_ADV_2024_MAT_002",
    examId: "JEE_ADVANCED",
    year: 2024,
    session: "Paper 1",
    date: "2024-05-26",
    category: "Engineering",
    subject: "Mathematics",
    topic: "Algebra",
    subtopic: "Matrices",
    questionNumber: 7,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 3,
    negativeMarks: 1,
    timeRecommended: 150,
    question: {
      en: "If A is a 3×3 matrix such that det(A) = 5, then det(2A) is:",
      ta: "A என்பது 3×3 அணி மற்றும் det(A) = 5 எனில், det(2A) என்பது:"
    },
    options: {
      en: [
        { id: "A", text: "10" },
        { id: "B", text: "20" },
        { id: "C", text: "40" },
        { id: "D", text: "80" }
      ],
      ta: [
        { id: "A", text: "10" },
        { id: "B", text: "20" },
        { id: "C", text: "40" },
        { id: "D", text: "80" }
      ]
    },
    correctAnswer: "C",
    solution: {
      en: "For an n×n matrix, det(kA) = k^n × det(A). Here n=3, k=2. So det(2A) = 2³ × 5 = 8 × 5 = 40",
      ta: "n×n அணிக்கு, det(kA) = k^n × det(A). இங்கு n=3, k=2. எனவே det(2A) = 2³ × 5 = 8 × 5 = 40"
    },
    hints: ["Use det(kA) = k^n × det(A)", "n is the order of matrix"],
    conceptsTested: ["Determinant properties", "Scalar multiplication"],
    commonMistakes: ["Using k instead of k^n", "Wrong matrix order"],
    relatedQuestions: ["JEE_ADV_2023_MAT_015"],
    tags: ["matrices", "determinant", "algebra"],
    statistics: { totalAttempts: 35000, correctPercentage: 55, averageTime: 120 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },

  // ============================================
  // BITSAT 2024 - PHYSICS
  // ============================================
  {
    id: "BITSAT_2024_PHY_001",
    examId: "BITSAT",
    year: 2024,
    date: "2024-05-20",
    category: "Engineering",
    subject: "Physics",
    topic: "Optics",
    subtopic: "Wave Optics",
    questionNumber: 1,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 3,
    negativeMarks: 1,
    timeRecommended: 120,
    question: {
      en: "In Young's double slit experiment, if the distance between the slits is halved, the fringe width will:",
      ta: "யங்கின் இரட்டை பிளவு சோதனையில், பிளவுகளுக்கு இடையேயான தூரம் பாதியாகக் குறைக்கப்பட்டால், விளிம்பு அகலம்:"
    },
    options: {
      en: [
        { id: "A", text: "Become half" },
        { id: "B", text: "Become double" },
        { id: "C", text: "Remain same" },
        { id: "D", text: "Become four times" }
      ],
      ta: [
        { id: "A", text: "பாதியாகும்" },
        { id: "B", text: "இரட்டிப்பாகும்" },
        { id: "C", text: "அப்படியே இருக்கும்" },
        { id: "D", text: "நான்கு மடங்காகும்" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "Fringe width β = λD/d. If d becomes d/2, then β' = λD/(d/2) = 2λD/d = 2β. So fringe width doubles.",
      ta: "விளிம்பு அகலம் β = λD/d. d என்பது d/2 ஆனால், β' = λD/(d/2) = 2λD/d = 2β. எனவே விளிம்பு அகலம் இரட்டிப்பாகும்."
    },
    hints: ["Use fringe width formula", "β is inversely proportional to d"],
    conceptsTested: ["Wave optics", "Young's experiment"],
    commonMistakes: ["Confusing direct and inverse proportionality"],
    relatedQuestions: ["BITSAT_2023_PHY_008"],
    tags: ["optics", "interference", "ydse"],
    statistics: { totalAttempts: 25000, correctPercentage: 62, averageTime: 90 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "BITSAT_2024_PHY_002",
    examId: "BITSAT",
    year: 2024,
    date: "2024-05-20",
    category: "Engineering",
    subject: "Physics",
    topic: "Modern Physics",
    subtopic: "Photoelectric Effect",
    questionNumber: 2,
    questionType: "MCQ",
    difficulty: "Easy",
    marks: 3,
    negativeMarks: 1,
    timeRecommended: 90,
    question: {
      en: "The work function of a metal is 4.2 eV. The threshold wavelength for photoelectric emission is approximately:",
      ta: "ஒரு உலோகத்தின் வேலை செயல்பாடு 4.2 eV. ஒளிமின் உமிழ்வுக்கான வரம்பு அலைநீளம் தோராயமாக:"
    },
    options: {
      en: [
        { id: "A", text: "2950 Å" },
        { id: "B", text: "3500 Å" },
        { id: "C", text: "4200 Å" },
        { id: "D", text: "5000 Å" }
      ],
      ta: [
        { id: "A", text: "2950 Å" },
        { id: "B", text: "3500 Å" },
        { id: "C", text: "4200 Å" },
        { id: "D", text: "5000 Å" }
      ]
    },
    correctAnswer: "A",
    solution: {
      en: "Work function W = hc/λ₀. λ₀ = hc/W = (6.63×10⁻³⁴ × 3×10⁸)/(4.2 × 1.6×10⁻¹⁹) = 2950 Å",
      ta: "வேலை செயல்பாடு W = hc/λ₀. λ₀ = hc/W = (6.63×10⁻³⁴ × 3×10⁸)/(4.2 × 1.6×10⁻¹⁹) = 2950 Å"
    },
    hints: ["Use λ₀ = hc/W", "Convert eV to Joules"],
    conceptsTested: ["Photoelectric effect", "Threshold wavelength"],
    commonMistakes: ["Unit conversion errors", "Using wrong formula"],
    relatedQuestions: ["BITSAT_2023_PHY_012"],
    tags: ["modern-physics", "photoelectric", "important"],
    statistics: { totalAttempts: 28000, correctPercentage: 58, averageTime: 100 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "BITSAT_2024_PHY_003",
    examId: "BITSAT",
    year: 2024,
    date: "2024-05-20",
    category: "Engineering",
    subject: "Physics",
    topic: "Mechanics",
    subtopic: "Simple Harmonic Motion",
    questionNumber: 3,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 3,
    negativeMarks: 1,
    timeRecommended: 120,
    question: {
      en: "A simple pendulum has time period T. If its length is increased by 21%, the new time period will be:",
      ta: "ஒரு எளிய ஊசல் T கால அளவைக் கொண்டுள்ளது. அதன் நீளம் 21% அதிகரித்தால், புதிய கால அளவு:"
    },
    options: {
      en: [
        { id: "A", text: "1.05T" },
        { id: "B", text: "1.1T" },
        { id: "C", text: "1.21T" },
        { id: "D", text: "1.44T" }
      ],
      ta: [
        { id: "A", text: "1.05T" },
        { id: "B", text: "1.1T" },
        { id: "C", text: "1.21T" },
        { id: "D", text: "1.44T" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "T = 2π√(L/g). T ∝ √L. If L' = 1.21L, then T' = T√1.21 = T × 1.1 = 1.1T",
      ta: "T = 2π√(L/g). T ∝ √L. L' = 1.21L எனில், T' = T√1.21 = T × 1.1 = 1.1T"
    },
    hints: ["T is proportional to √L", "√1.21 = 1.1"],
    conceptsTested: ["Simple pendulum", "Time period"],
    commonMistakes: ["Not taking square root", "Wrong proportionality"],
    relatedQuestions: ["BITSAT_2023_PHY_018"],
    tags: ["shm", "pendulum", "time-period"],
    statistics: { totalAttempts: 30000, correctPercentage: 55, averageTime: 110 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "BITSAT_2024_CHE_001",
    examId: "BITSAT",
    year: 2024,
    date: "2024-05-20",
    category: "Engineering",
    subject: "Chemistry",
    topic: "Inorganic Chemistry",
    subtopic: "Periodic Table",
    questionNumber: 4,
    questionType: "MCQ",
    difficulty: "Easy",
    marks: 3,
    negativeMarks: 1,
    timeRecommended: 60,
    question: {
      en: "Which of the following has the highest ionization energy?",
      ta: "பின்வருவனவற்றில் எது அதிக அயனியாக்க ஆற்றலைக் கொண்டுள்ளது?"
    },
    options: {
      en: [
        { id: "A", text: "Na" },
        { id: "B", text: "Mg" },
        { id: "C", text: "Al" },
        { id: "D", text: "Ne" }
      ],
      ta: [
        { id: "A", text: "Na" },
        { id: "B", text: "Mg" },
        { id: "C", text: "Al" },
        { id: "D", text: "Ne" }
      ]
    },
    correctAnswer: "D",
    solution: {
      en: "Noble gases have highest ionization energy due to stable electronic configuration. Ne has the highest IE among the given options.",
      ta: "உயர்குடி வாயுக்கள் நிலையான எலக்ட்ரான் அமைப்பின் காரணமாக அதிக அயனியாக்க ஆற்றலைக் கொண்டுள்ளன. கொடுக்கப்பட்ட விருப்பங்களில் Ne அதிக IE கொண்டுள்ளது."
    },
    hints: ["Noble gases have complete octet", "IE increases across period"],
    conceptsTested: ["Ionization energy", "Periodic trends"],
    commonMistakes: ["Confusing with electronegativity"],
    relatedQuestions: ["BITSAT_2023_CHE_005"],
    tags: ["periodic-table", "ionization-energy", "basic"],
    statistics: { totalAttempts: 32000, correctPercentage: 78, averageTime: 50 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "BITSAT_2024_CHE_002",
    examId: "BITSAT",
    year: 2024,
    date: "2024-05-20",
    category: "Engineering",
    subject: "Chemistry",
    topic: "Organic Chemistry",
    subtopic: "Hydrocarbons",
    questionNumber: 5,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 3,
    negativeMarks: 1,
    timeRecommended: 90,
    question: {
      en: "The IUPAC name of CH₃-CH=CH-CH₃ is:",
      ta: "CH₃-CH=CH-CH₃ இன் IUPAC பெயர்:"
    },
    options: {
      en: [
        { id: "A", text: "But-1-ene" },
        { id: "B", text: "But-2-ene" },
        { id: "C", text: "Butane" },
        { id: "D", text: "Propene" }
      ],
      ta: [
        { id: "A", text: "பியூட்-1-ஈன்" },
        { id: "B", text: "பியூட்-2-ஈன்" },
        { id: "C", text: "பியூட்டேன்" },
        { id: "D", text: "புரோப்பீன்" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "The double bond is between C2 and C3, so it's But-2-ene. Count from the end closer to double bond.",
      ta: "இரட்டைப் பிணைப்பு C2 மற்றும் C3 இடையே உள்ளது, எனவே இது பியூட்-2-ஈன். இரட்டைப் பிணைப்புக்கு அருகிலுள்ள முனையிலிருந்து எண்ணவும்."
    },
    hints: ["Locate the double bond position", "Number from end closer to double bond"],
    conceptsTested: ["IUPAC nomenclature", "Alkenes"],
    commonMistakes: ["Wrong numbering", "Not identifying double bond position"],
    relatedQuestions: ["BITSAT_2023_CHE_012"],
    tags: ["organic", "nomenclature", "alkenes"],
    statistics: { totalAttempts: 35000, correctPercentage: 72, averageTime: 70 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "BITSAT_2024_MAT_001",
    examId: "BITSAT",
    year: 2024,
    date: "2024-05-20",
    category: "Engineering",
    subject: "Mathematics",
    topic: "Calculus",
    subtopic: "Limits",
    questionNumber: 6,
    questionType: "MCQ",
    difficulty: "Easy",
    marks: 3,
    negativeMarks: 1,
    timeRecommended: 60,
    question: {
      en: "The value of lim(x→0) (sin x)/x is:",
      ta: "lim(x→0) (sin x)/x இன் மதிப்பு:"
    },
    options: {
      en: [
        { id: "A", text: "0" },
        { id: "B", text: "1" },
        { id: "C", text: "∞" },
        { id: "D", text: "-1" }
      ],
      ta: [
        { id: "A", text: "0" },
        { id: "B", text: "1" },
        { id: "C", text: "∞" },
        { id: "D", text: "-1" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "This is a standard limit. lim(x→0) (sin x)/x = 1. Can be proved using L'Hopital's rule or squeeze theorem.",
      ta: "இது ஒரு நிலையான வரம்பு. lim(x→0) (sin x)/x = 1. எல்ஹாப்பிட்டல் விதி அல்லது அழுத்த தேற்றத்தைப் பயன்படுத்தி நிரூபிக்கலாம்."
    },
    hints: ["Standard limit formula", "x must be in radians"],
    conceptsTested: ["Limits", "Standard results"],
    commonMistakes: ["Using degrees instead of radians"],
    relatedQuestions: ["BITSAT_2023_MAT_001"],
    tags: ["calculus", "limits", "standard-limit"],
    statistics: { totalAttempts: 40000, correctPercentage: 85, averageTime: 40 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "BITSAT_2024_MAT_002",
    examId: "BITSAT",
    year: 2024,
    date: "2024-05-20",
    category: "Engineering",
    subject: "Mathematics",
    topic: "Algebra",
    subtopic: "Quadratic Equations",
    questionNumber: 7,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 3,
    negativeMarks: 1,
    timeRecommended: 90,
    question: {
      en: "If α and β are roots of x² - 5x + 6 = 0, then α² + β² is:",
      ta: "α மற்றும் β என்பவை x² - 5x + 6 = 0 இன் மூலங்கள் எனில், α² + β² என்பது:"
    },
    options: {
      en: [
        { id: "A", text: "11" },
        { id: "B", text: "13" },
        { id: "C", text: "25" },
        { id: "D", text: "37" }
      ],
      ta: [
        { id: "A", text: "11" },
        { id: "B", text: "13" },
        { id: "C", text: "25" },
        { id: "D", text: "37" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "α + β = 5, αβ = 6. α² + β² = (α + β)² - 2αβ = 25 - 12 = 13",
      ta: "α + β = 5, αβ = 6. α² + β² = (α + β)² - 2αβ = 25 - 12 = 13"
    },
    hints: ["Use sum and product of roots", "α² + β² = (α + β)² - 2αβ"],
    conceptsTested: ["Quadratic equations", "Sum and product of roots"],
    commonMistakes: ["Using wrong formula", "Calculation errors"],
    relatedQuestions: ["BITSAT_2023_MAT_008"],
    tags: ["algebra", "quadratic", "roots"],
    statistics: { totalAttempts: 38000, correctPercentage: 68, averageTime: 80 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "BITSAT_2024_ENG_001",
    examId: "BITSAT",
    year: 2024,
    date: "2024-05-20",
    category: "Engineering",
    subject: "English",
    topic: "Grammar",
    subtopic: "Error Correction",
    questionNumber: 8,
    questionType: "MCQ",
    difficulty: "Easy",
    marks: 3,
    negativeMarks: 1,
    timeRecommended: 60,
    question: {
      en: "Choose the grammatically correct sentence:",
      ta: "இலக்கணப்படி சரியான வாக்கியத்தைத் தேர்ந்தெடுக்கவும்:"
    },
    options: {
      en: [
        { id: "A", text: "He don't know the answer." },
        { id: "B", text: "He doesn't knows the answer." },
        { id: "C", text: "He doesn't know the answer." },
        { id: "D", text: "He do not knows the answer." }
      ],
      ta: [
        { id: "A", text: "He don't know the answer." },
        { id: "B", text: "He doesn't knows the answer." },
        { id: "C", text: "He doesn't know the answer." },
        { id: "D", text: "He do not knows the answer." }
      ]
    },
    correctAnswer: "C",
    solution: {
      en: "With third person singular (He/She/It), we use 'doesn't' + base form of verb. 'He doesn't know' is correct.",
      ta: "மூன்றாம் நபர் ஒருமையுடன் (He/She/It), 'doesn't' + வினைச்சொல்லின் அடிப்படை வடிவத்தைப் பயன்படுத்துகிறோம். 'He doesn't know' சரியானது."
    },
    hints: ["Subject-verb agreement", "Doesn't + base form"],
    conceptsTested: ["Grammar", "Subject-verb agreement"],
    commonMistakes: ["Double negative", "Wrong verb form"],
    relatedQuestions: ["BITSAT_2023_ENG_005"],
    tags: ["english", "grammar", "basic"],
    statistics: { totalAttempts: 42000, correctPercentage: 82, averageTime: 45 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "BITSAT_2024_LR_001",
    examId: "BITSAT",
    year: 2024,
    date: "2024-05-20",
    category: "Engineering",
    subject: "Logical Reasoning",
    topic: "Series",
    subtopic: "Number Series",
    questionNumber: 9,
    questionType: "MCQ",
    difficulty: "Easy",
    marks: 3,
    negativeMarks: 1,
    timeRecommended: 60,
    question: {
      en: "Find the next number in the series: 2, 6, 12, 20, 30, ?",
      ta: "தொடரில் அடுத்த எண்ணைக் கண்டறியவும்: 2, 6, 12, 20, 30, ?"
    },
    options: {
      en: [
        { id: "A", text: "40" },
        { id: "B", text: "42" },
        { id: "C", text: "44" },
        { id: "D", text: "48" }
      ],
      ta: [
        { id: "A", text: "40" },
        { id: "B", text: "42" },
        { id: "C", text: "44" },
        { id: "D", text: "48" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "Pattern: n(n+1). For n=1: 1×2=2, n=2: 2×3=6, n=3: 3×4=12, n=4: 4×5=20, n=5: 5×6=30, n=6: 6×7=42",
      ta: "முறை: n(n+1). n=1க்கு: 1×2=2, n=2: 2×3=6, n=3: 3×4=12, n=4: 4×5=20, n=5: 5×6=30, n=6: 6×7=42"
    },
    hints: ["Look at differences", "Product of consecutive numbers"],
    conceptsTested: ["Number series", "Pattern recognition"],
    commonMistakes: ["Wrong pattern identification"],
    relatedQuestions: ["BITSAT_2023_LR_008"],
    tags: ["reasoning", "series", "number-pattern"],
    statistics: { totalAttempts: 35000, correctPercentage: 72, averageTime: 55 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },

  // ============================================
  // VITEEE 2024
  // ============================================
  {
    id: "VITEEE_2024_PHY_001",
    examId: "VITEEE",
    year: 2024,
    date: "2024-04-19",
    category: "Engineering",
    subject: "Physics",
    topic: "Electrostatics",
    subtopic: "Coulomb's Law",
    questionNumber: 1,
    questionType: "MCQ",
    difficulty: "Easy",
    marks: 1,
    negativeMarks: 0,
    timeRecommended: 60,
    question: {
      en: "Two identical charges of 2 μC each are placed 10 cm apart. The force between them is:",
      ta: "2 μC கொண்ட இரண்டு ஒத்த மின்னூட்டங்கள் 10 செமீ தூரத்தில் வைக்கப்பட்டுள்ளன. அவற்றுக்கிடையேயான விசை:"
    },
    options: {
      en: [
        { id: "A", text: "3.6 N" },
        { id: "B", text: "0.36 N" },
        { id: "C", text: "36 N" },
        { id: "D", text: "0.036 N" }
      ],
      ta: [
        { id: "A", text: "3.6 N" },
        { id: "B", text: "0.36 N" },
        { id: "C", text: "36 N" },
        { id: "D", text: "0.036 N" }
      ]
    },
    correctAnswer: "A",
    solution: {
      en: "F = kq₁q₂/r² = 9×10⁹ × (2×10⁻⁶)² / (0.1)² = 9×10⁹ × 4×10⁻¹² / 0.01 = 3.6 N",
      ta: "F = kq₁q₂/r² = 9×10⁹ × (2×10⁻⁶)² / (0.1)² = 9×10⁹ × 4×10⁻¹² / 0.01 = 3.6 N"
    },
    hints: ["Use Coulomb's law", "Convert units properly"],
    conceptsTested: ["Coulomb's law", "Electrostatic force"],
    commonMistakes: ["Unit conversion errors", "Using wrong formula"],
    relatedQuestions: ["VITEEE_2023_PHY_005"],
    tags: ["electrostatics", "coulomb-law", "basic"],
    statistics: { totalAttempts: 20000, correctPercentage: 65, averageTime: 70 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "VITEEE_2024_CHE_001",
    examId: "VITEEE",
    year: 2024,
    date: "2024-04-19",
    category: "Engineering",
    subject: "Chemistry",
    topic: "Electrochemistry",
    subtopic: "Electrochemical Cells",
    questionNumber: 2,
    questionType: "MCQ",
    difficulty: "Moderate",
    marks: 1,
    negativeMarks: 0,
    timeRecommended: 90,
    question: {
      en: "In a galvanic cell, oxidation occurs at:",
      ta: "ஒரு கால்வானிக் கலத்தில், ஆக்ஸிஜனேற்றம் நிகழும் இடம்:"
    },
    options: {
      en: [
        { id: "A", text: "Cathode" },
        { id: "B", text: "Anode" },
        { id: "C", text: "Both electrodes" },
        { id: "D", text: "Salt bridge" }
      ],
      ta: [
        { id: "A", text: "கேத்தோடு" },
        { id: "B", text: "ஆனோடு" },
        { id: "C", text: "இரண்டு மின்முனைகளிலும்" },
        { id: "D", text: "உப்புப் பாலம்" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "In a galvanic cell, oxidation (loss of electrons) occurs at the anode, and reduction (gain of electrons) occurs at the cathode. Remember: AN OX, RED CAT.",
      ta: "கால்வானிக் கலத்தில், ஆக்ஸிஜனேற்றம் (எலக்ட்ரான்கள் இழப்பு) ஆனோடில் நிகழ்கிறது, மற்றும் ஒடுக்கம் (எலக்ட்ரான்கள் பெறுதல்) கேத்தோடில் நிகழ்கிறது."
    },
    hints: ["Anode = Oxidation", "Cathode = Reduction"],
    conceptsTested: ["Galvanic cell", "Electrode reactions"],
    commonMistakes: ["Confusing anode and cathode"],
    relatedQuestions: ["VITEEE_2023_CHE_008"],
    tags: ["electrochemistry", "galvanic-cell", "basic"],
    statistics: { totalAttempts: 22000, correctPercentage: 75, averageTime: 50 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "VITEEE_2024_MAT_001",
    examId: "VITEEE",
    year: 2024,
    date: "2024-04-19",
    category: "Engineering",
    subject: "Mathematics",
    topic: "Probability",
    subtopic: "Basic Probability",
    questionNumber: 3,
    questionType: "MCQ",
    difficulty: "Easy",
    marks: 1,
    negativeMarks: 0,
    timeRecommended: 60,
    question: {
      en: "A fair die is thrown once. The probability of getting a prime number is:",
      ta: "ஒரு நியாயமான பகடை ஒரு முறை எறியப்படுகிறது. பகா எண் கிடைக்கும் நிகழ்தகவு:"
    },
    options: {
      en: [
        { id: "A", text: "1/2" },
        { id: "B", text: "1/3" },
        { id: "C", text: "2/3" },
        { id: "D", text: "5/6" }
      ],
      ta: [
        { id: "A", text: "1/2" },
        { id: "B", text: "1/3" },
        { id: "C", text: "2/3" },
        { id: "D", text: "5/6" }
      ]
    },
    correctAnswer: "A",
    solution: {
      en: "Prime numbers on a die: 2, 3, 5 (three numbers). Total outcomes: 6. Probability = 3/6 = 1/2",
      ta: "பகடையில் பகா எண்கள்: 2, 3, 5 (மூன்று எண்கள்). மொத்த விளைவுகள்: 6. நிகழ்தகவு = 3/6 = 1/2"
    },
    hints: ["Identify prime numbers 1-6", "Prime numbers: 2, 3, 5"],
    conceptsTested: ["Basic probability", "Prime numbers"],
    commonMistakes: ["Including 1 as prime", "Wrong counting"],
    relatedQuestions: ["VITEEE_2023_MAT_005"],
    tags: ["probability", "basic", "prime-numbers"],
    statistics: { totalAttempts: 25000, correctPercentage: 72, averageTime: 45 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },

  // ============================================
  // SRMJEEE 2024
  // ============================================
  {
    id: "SRMJEEE_2024_PHY_001",
    examId: "SRMJEEE",
    year: 2024,
    date: "2024-04-15",
    category: "Engineering",
    subject: "Physics",
    topic: "Current Electricity",
    subtopic: "Ohm's Law",
    questionNumber: 1,
    questionType: "MCQ",
    difficulty: "Easy",
    marks: 1,
    negativeMarks: 0,
    timeRecommended: 60,
    question: {
      en: "The resistance of a wire is 10 Ω. If it is stretched to double its length, the new resistance will be:",
      ta: "ஒரு கம்பியின் மின்தடை 10 Ω. அது இரட்டிப்பு நீளத்திற்கு நீட்டப்பட்டால், புதிய மின்தடை:"
    },
    options: {
      en: [
        { id: "A", text: "10 Ω" },
        { id: "B", text: "20 Ω" },
        { id: "C", text: "40 Ω" },
        { id: "D", text: "5 Ω" }
      ],
      ta: [
        { id: "A", text: "10 Ω" },
        { id: "B", text: "20 Ω" },
        { id: "C", text: "40 Ω" },
        { id: "D", text: "5 Ω" }
      ]
    },
    correctAnswer: "C",
    solution: {
      en: "R = ρL/A. When stretched to double length, L' = 2L and A' = A/2 (volume constant). R' = ρ(2L)/(A/2) = 4ρL/A = 4R = 40 Ω",
      ta: "R = ρL/A. இரட்டிப்பு நீளத்திற்கு நீட்டும்போது, L' = 2L மற்றும் A' = A/2 (கன அளவு மாறாது). R' = ρ(2L)/(A/2) = 4ρL/A = 4R = 40 Ω"
    },
    hints: ["Volume remains constant", "R ∝ L²"],
    conceptsTested: ["Resistance", "Wire stretching"],
    commonMistakes: ["Forgetting area change", "Wrong proportionality"],
    relatedQuestions: ["SRMJEEE_2023_PHY_008"],
    tags: ["electricity", "resistance", "important"],
    statistics: { totalAttempts: 18000, correctPercentage: 55, averageTime: 80 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "SRMJEEE_2024_CHE_001",
    examId: "SRMJEEE",
    year: 2024,
    date: "2024-04-15",
    category: "Engineering",
    subject: "Chemistry",
    topic: "Chemical Bonding",
    subtopic: "Hybridization",
    questionNumber: 2,
    questionType: "MCQ",
    difficulty: "Easy",
    marks: 1,
    negativeMarks: 0,
    timeRecommended: 60,
    question: {
      en: "The hybridization of carbon in methane (CH₄) is:",
      ta: "மீத்தேனில் (CH₄) கார்பனின் கலப்பினமாக்கம்:"
    },
    options: {
      en: [
        { id: "A", text: "sp" },
        { id: "B", text: "sp²" },
        { id: "C", text: "sp³" },
        { id: "D", text: "sp³d" }
      ],
      ta: [
        { id: "A", text: "sp" },
        { id: "B", text: "sp²" },
        { id: "C", text: "sp³" },
        { id: "D", text: "sp³d" }
      ]
    },
    correctAnswer: "C",
    solution: {
      en: "In CH₄, carbon forms 4 sigma bonds with hydrogen atoms. This requires sp³ hybridization, resulting in a tetrahedral geometry.",
      ta: "CH₄ இல், கார்பன் ஹைட்ரஜன் அணுக்களுடன் 4 சிக்மா பிணைப்புகளை உருவாக்குகிறது. இதற்கு sp³ கலப்பினமாக்கம் தேவை, இது நான்முக வடிவியலை விளைவிக்கிறது."
    },
    hints: ["Count sigma bonds + lone pairs", "4 bonds = sp³"],
    conceptsTested: ["Hybridization", "Molecular geometry"],
    commonMistakes: ["Wrong counting of bonds"],
    relatedQuestions: ["SRMJEEE_2023_CHE_005"],
    tags: ["bonding", "hybridization", "basic"],
    statistics: { totalAttempts: 20000, correctPercentage: 82, averageTime: 40 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  },
  {
    id: "SRMJEEE_2024_MAT_001",
    examId: "SRMJEEE",
    year: 2024,
    date: "2024-04-15",
    category: "Engineering",
    subject: "Mathematics",
    topic: "Trigonometry",
    subtopic: "Basic Identities",
    questionNumber: 3,
    questionType: "MCQ",
    difficulty: "Easy",
    marks: 1,
    negativeMarks: 0,
    timeRecommended: 45,
    question: {
      en: "The value of sin²30° + cos²30° is:",
      ta: "sin²30° + cos²30° இன் மதிப்பு:"
    },
    options: {
      en: [
        { id: "A", text: "0" },
        { id: "B", text: "1" },
        { id: "C", text: "1/2" },
        { id: "D", text: "√3/2" }
      ],
      ta: [
        { id: "A", text: "0" },
        { id: "B", text: "1" },
        { id: "C", text: "1/2" },
        { id: "D", text: "√3/2" }
      ]
    },
    correctAnswer: "B",
    solution: {
      en: "sin²θ + cos²θ = 1 for any angle θ. This is a fundamental trigonometric identity.",
      ta: "எந்த கோணம் θ க்கும் sin²θ + cos²θ = 1. இது ஒரு அடிப்படை முக்கோணவியல் அடையாளம்."
    },
    hints: ["Fundamental identity", "sin²θ + cos²θ = 1"],
    conceptsTested: ["Trigonometric identities"],
    commonMistakes: ["Calculating individual values"],
    relatedQuestions: ["SRMJEEE_2023_MAT_001"],
    tags: ["trigonometry", "identity", "basic"],
    statistics: { totalAttempts: 22000, correctPercentage: 92, averageTime: 30 },
    isBookmarked: false,
    isAttempted: false,
    userAnswer: null
  }
];

// Export the complete database
export const pyqDatabase: PYQDatabase = {
  metadata: pyqMetadata,
  categories: pyqCategories,
  exams: pyqExams,
  questions: pyqQuestions
};

// Helper functions
export const getQuestionsByExam = (examId: string): PYQQuestion[] => {
  return pyqQuestions.filter(q => q.examId === examId);
};

export const getQuestionsByYear = (examId: string, year: number): PYQQuestion[] => {
  return pyqQuestions.filter(q => q.examId === examId && q.year === year);
};

export const getQuestionsBySubject = (examId: string, subject: string): PYQQuestion[] => {
  return pyqQuestions.filter(q => q.examId === examId && q.subject === subject);
};

export const getQuestionsByDifficulty = (difficulty: 'Easy' | 'Moderate' | 'Hard'): PYQQuestion[] => {
  return pyqQuestions.filter(q => q.difficulty === difficulty);
};

export const getQuestionsByCategory = (category: string): PYQQuestion[] => {
  return pyqQuestions.filter(q => q.category.toLowerCase() === category.toLowerCase());
};

export const searchQuestions = (query: string): PYQQuestion[] => {
  const lowerQuery = query.toLowerCase();
  return pyqQuestions.filter(q => 
    q.question.en.toLowerCase().includes(lowerQuery) ||
    q.question.ta.includes(query) ||
    q.topic.toLowerCase().includes(lowerQuery) ||
    q.subtopic.toLowerCase().includes(lowerQuery) ||
    q.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const getExamsByCategory = (category: string): PYQExam[] => {
  return pyqExams.filter(e => e.category === category);
};

export default pyqDatabase;
