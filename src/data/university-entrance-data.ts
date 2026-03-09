export interface CommunityCutoff {
  community: string;
  maleCutoff: number;
  femaleCutoff: number;
}

export interface UniversityCutoffData {
  year: string;
  course: string;
  data: CommunityCutoff[];
  notes?: string;
}

export interface University {
  id: string;
  name: string;
  nameTamil: string;
  location: string;
  website: string;
  phone: string;
  email?: string;
  examName: string;
  logoColor: string;
  logo?: string;
  campusImage?: string;
  type?: 'State Government' | 'Central Government' | 'Deemed University (Central Govt Funded)';
  courses: Course[];
  importantDates: ImportantDate[];
  fee: FeeStructure;
  cutoffMarks?: UniversityCutoffData;
}

export interface SeatMatrix {
  general: number;
  obc: number;
  bcMbc: number;
  sc: number;
  st: number;
  ews?: number;
  total: number;
}

export interface YearCutoff {
  year: string;
  general: number | string;
  obc: number | string;
  bcMbc: number | string;
  sc: number | string;
  st: number | string;
  ews?: number | string;
}

export interface Course {
  id: string;
  name: string;
  nameTamil: string;
  type: 'UG' | 'PG' | 'Research' | 'Super-Specialty' | 'Integrated' | 'Diploma' | 'PG Diploma' | 'Certificate' | 'Vocational';
  category?: 'On-Campus' | 'DDE' | 'Affiliated' | 'Collaborative';
  school?: string;
  eligibility?: string;
  duration?: string;
  specialty?: string;
  examPattern?: ExamPattern;
  syllabus?: SyllabusUnit[];
  previousQuestions?: PreviousQuestion[];
  tips: string[];
  seatMatrix?: SeatMatrix;
  cutoffs?: YearCutoff[];
}

export interface ExamPattern {
  totalQuestions: number;
  totalMarks: number;
  duration: string;
  durationMinutes: number;
  mode: string;
  negativeMarking: boolean;
  sections: Section[];
}

export interface Section {
  name: string;
  nameTamil: string;
  questions: number;
  marks: number;
  topics: string[];
}

export interface SyllabusUnit {
  unitNumber: number;
  title: string;
  titleTamil: string;
  topics: Topic[];
  expectedQuestions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Topic {
  name: string;
  subtopics: string[];
  importance: 'High' | 'Medium' | 'Low';
}

export interface PreviousQuestion {
  id: string;
  year?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface ImportantDate {
  event: string;
  eventTamil: string;
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface FeeStructure {
  general: number;
  obc: number;
  scst: number;
}

export const universities: University[] = [
  // Tamil University first entry removed - consolidated with detailed entry at line 10173+
  // Gandhigram Rural Institute entry consolidated at line 15251+
  // TNAU - Tamil Nadu Agricultural University
  // TNDALU - Tamil Nadu Dr. Ambedkar Law University
  // ===== CENTRAL UNIVERSITY OF TAMIL NADU (CUTN) =====
  // Premier Central Government University in Cauvery Delta Region
  // IMPORTANT: ALL admissions are STRICTLY through CUET conducted by NTA
  {
    id: 'cutn',
    name: 'Central University of Tamil Nadu',
    nameTamil: 'தமிழ்நாடு மத்திய பல்கலைக்கழகம்',
    location: 'Thiruvarur, Tamil Nadu',
    website: 'www.cutn.ac.in',
    phone: '04366-277200',
    email: 'registrar@cutn.ac.in',
    examName: 'CUET (NTA)',
    logoColor: '#1e40af',
    logo: '/universities/cutn-logo.png',
    campusImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=300&fit=crop&auto=format',
    type: 'Central Government',
    fee: { general: 500, obc: 400, scst: 250 },
    importantDates: [
      // CUET-UG Timeline (After 12th)
      { event: 'CUET-UG Notification', eventTamil: 'CUET-UG அறிவிப்பு', date: 'February 2026', status: 'upcoming' },
      { event: 'CUET-UG Application Start', eventTamil: 'CUET-UG விண்ணப்பம் தொடக்கம்', date: 'February 2026', status: 'upcoming' },
      { event: 'CUET-UG Application End', eventTamil: 'CUET-UG விண்ணப்பம் முடிவு', date: 'March 2026', status: 'upcoming' },
      { event: 'CUET-UG Exam', eventTamil: 'CUET-UG தேர்வு', date: 'May 2026', status: 'upcoming' },
      { event: 'CUET-UG Results', eventTamil: 'CUET-UG முடிவுகள்', date: 'June 2026', status: 'upcoming' },
      { event: 'CUTN UG Counselling', eventTamil: 'CUTN இளநிலை கலந்தாய்வு', date: 'July 2026', status: 'upcoming' },
      // CUET-PG Timeline (After Degree)
      { event: 'CUET-PG Notification', eventTamil: 'CUET-PG அறிவிப்பு', date: 'March 2026', status: 'upcoming' },
      { event: 'CUET-PG Exam', eventTamil: 'CUET-PG தேர்வு', date: 'June 2026', status: 'upcoming' },
      { event: 'CUTN PG Counselling', eventTamil: 'CUTN முதுநிலை கலந்தாய்வு', date: 'July 2026', status: 'upcoming' },
    ],
    courses: [
      // ========================================
      // 1. INTEGRATED PROGRAMMES (JOIN AFTER 12TH)
      // ========================================
      // These are flagship 5-year programs for direct entry after 12th
      
      // ----- INTEGRATED M.Sc. (5 YEARS) -----
      {
        id: 'cutn-integrated-msc-mathematics',
        name: 'Integrated M.Sc. Mathematics (5 Years)',
        nameTamil: 'ஒருங்கிணைந்த எம்.எஸ்சி. கணிதம் (5 ஆண்டுகள்)',
        type: 'Integrated',
        category: 'On-Campus',
        school: 'School of Basic & Applied Sciences',
        duration: '5 Years',
        eligibility: '+2 with Mathematics (CUET-UG Required)',
        examPattern: {
          totalQuestions: 50, totalMarks: 200, duration: '45 Minutes per section', durationMinutes: 180,
          mode: 'CUET-UG Computer Based (CBT)', negativeMarking: true,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 200, topics: ['Calculus', 'Algebra', 'Trigonometry', 'Coordinate Geometry'] },
            { name: 'General Test', nameTamil: 'பொது தேர்வு', questions: 60, marks: 200, topics: ['Quantitative Reasoning', 'Logical Reasoning', 'General Awareness'] }
          ]
        },
        syllabus: [
          {
            unitNumber: 1, title: 'Calculus', titleTamil: 'நுண்கணிதம்',
            topics: [
              { name: 'Limits & Continuity', subtopics: ['Limits', 'Continuity', 'Differentiability'], importance: 'High' },
              { name: 'Differentiation', subtopics: ['Derivatives', 'Applications', 'Mean Value Theorems'], importance: 'High' },
              { name: 'Integration', subtopics: ['Definite Integrals', 'Area Under Curves'], importance: 'High' },
            ], expectedQuestions: 15, difficulty: 'Medium'
          },
          {
            unitNumber: 2, title: 'Algebra', titleTamil: 'இயற்கணிதம்',
            topics: [
              { name: 'Matrices & Determinants', subtopics: ['Properties', 'Inverse', 'Rank'], importance: 'High' },
              { name: 'Complex Numbers', subtopics: ['Algebra of Complex Numbers', 'Argand Plane'], importance: 'Medium' },
            ], expectedQuestions: 12, difficulty: 'Medium'
          }
        ],
        previousQuestions: [
          { id: 'cutn-msc-math-q1', year: '2024', question: 'If f(x) = x³ - 3x² + 2, find f\'(2)', options: ['0', '2', '4', '-2'], correctAnswer: 0, explanation: 'f\'(x) = 3x² - 6x. At x=2: f\'(2) = 3(4) - 6(2) = 12 - 12 = 0', topic: 'Calculus', difficulty: 'Medium' },
          { id: 'cutn-msc-math-q2', year: '2024', question: 'The determinant of a 2×2 identity matrix is:', options: ['0', '1', '2', '-1'], correctAnswer: 1, explanation: 'The identity matrix has 1s on the diagonal and 0s elsewhere. det(I) = 1×1 - 0×0 = 1', topic: 'Algebra', difficulty: 'Easy' }
        ],
        tips: ['Apply through CUET-UG (NTA)', 'Focus on NCERT Maths Class 11 & 12', 'Direct Master\'s degree after 12th', 'Career: Research, Academia, Data Science, Finance']
      },
      {
        id: 'cutn-integrated-msc-physics',
        name: 'Integrated M.Sc. Physics (5 Years)',
        nameTamil: 'ஒருங்கிணைந்த எம்.எஸ்சி. இயற்பியல் (5 ஆண்டுகள்)',
        type: 'Integrated',
        category: 'On-Campus',
        school: 'School of Basic & Applied Sciences',
        duration: '5 Years',
        eligibility: '+2 with Physics, Chemistry, Mathematics (CUET-UG Required)',
        examPattern: {
          totalQuestions: 50, totalMarks: 200, duration: '45 Minutes per section', durationMinutes: 180,
          mode: 'CUET-UG Computer Based (CBT)', negativeMarking: true,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 200, topics: ['Mechanics', 'Optics', 'Modern Physics', 'Thermodynamics'] },
            { name: 'General Test', nameTamil: 'பொது தேர்வு', questions: 60, marks: 200, topics: ['Quantitative Reasoning', 'Logical Reasoning'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-UG (NTA)', 'Strong foundation in Physics & Maths needed', 'Career: Physicist, ISRO, DRDO, Research Labs']
      },
      {
        id: 'cutn-integrated-msc-chemistry',
        name: 'Integrated M.Sc. Chemistry (5 Years)',
        nameTamil: 'ஒருங்கிணைந்த எம்.எஸ்சி. வேதியியல் (5 ஆண்டுகள்)',
        type: 'Integrated',
        category: 'On-Campus',
        school: 'School of Basic & Applied Sciences',
        duration: '5 Years',
        eligibility: '+2 with Physics, Chemistry, Mathematics (CUET-UG Required)',
        examPattern: {
          totalQuestions: 50, totalMarks: 200, duration: '45 Minutes per section', durationMinutes: 180,
          mode: 'CUET-UG Computer Based (CBT)', negativeMarking: true,
          sections: [
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 200, topics: ['Organic', 'Inorganic', 'Physical Chemistry'] },
            { name: 'General Test', nameTamil: 'பொது தேர்வு', questions: 60, marks: 200, topics: ['Quantitative Reasoning', 'Logical Reasoning'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-UG (NTA)', 'Focus on NCERT Chemistry', 'Career: Chemist, Pharma Industry, Research']
      },
      {
        id: 'cutn-integrated-msc-biotechnology',
        name: 'Integrated M.Sc. Biotechnology (5 Years)',
        nameTamil: 'ஒருங்கிணைந்த எம்.எஸ்சி. உயிர்தொழில்நுட்பவியல் (5 ஆண்டுகள்)',
        type: 'Integrated',
        category: 'On-Campus',
        school: 'School of Life Sciences',
        duration: '5 Years',
        eligibility: '+2 with Physics, Chemistry, Biology (CUET-UG Required)',
        specialty: 'High Demand - Limited Seats',
        examPattern: {
          totalQuestions: 50, totalMarks: 200, duration: '45 Minutes per section', durationMinutes: 180,
          mode: 'CUET-UG Computer Based (CBT)', negativeMarking: true,
          sections: [
            { name: 'Biology', nameTamil: 'உயிரியல்', questions: 50, marks: 200, topics: ['Cell Biology', 'Genetics', 'Biochemistry', 'Microbiology'] },
            { name: 'General Test', nameTamil: 'பொது தேர்வு', questions: 60, marks: 200, topics: ['Quantitative Reasoning', 'Logical Reasoning'] }
          ]
        },
        syllabus: [
          {
            unitNumber: 1, title: 'Cell Biology & Genetics', titleTamil: 'செல் உயிரியல் & மரபியல்',
            topics: [
              { name: 'Cell Structure', subtopics: ['Cell Organelles', 'Membrane Transport', 'Cell Cycle'], importance: 'High' },
              { name: 'Genetics', subtopics: ['Mendelian Genetics', 'DNA Replication', 'Gene Expression'], importance: 'High' },
            ], expectedQuestions: 15, difficulty: 'Medium'
          },
          {
            unitNumber: 2, title: 'Biochemistry', titleTamil: 'உயிர்வேதியியல்',
            topics: [
              { name: 'Biomolecules', subtopics: ['Carbohydrates', 'Proteins', 'Lipids', 'Nucleic Acids'], importance: 'High' },
              { name: 'Enzymes', subtopics: ['Enzyme Kinetics', 'Inhibition', 'Regulation'], importance: 'Medium' },
            ], expectedQuestions: 10, difficulty: 'Hard'
          }
        ],
        previousQuestions: [
          { id: 'cutn-biotech-q1', year: '2024', question: 'Which organelle is responsible for ATP synthesis in eukaryotic cells?', options: ['Ribosome', 'Mitochondria', 'Golgi apparatus', 'Endoplasmic reticulum'], correctAnswer: 1, explanation: 'Mitochondria are the powerhouses of the cell, responsible for producing ATP through oxidative phosphorylation.', topic: 'Cell Biology', difficulty: 'Easy' },
          { id: 'cutn-biotech-q2', year: '2024', question: 'The process of DNA to RNA conversion is called:', options: ['Replication', 'Transcription', 'Translation', 'Reverse transcription'], correctAnswer: 1, explanation: 'Transcription is the process where genetic information from DNA is copied into RNA.', topic: 'Genetics', difficulty: 'Easy' }
        ],
        tips: ['High demand course - apply early via CUET-UG', 'Focus on NCERT Biology Class 11 & 12', 'Career: Biotech Industry, Pharma, CSIR Labs, Research Scientist']
      },
      
      // ----- INTEGRATED M.A. (5 YEARS) -----
      {
        id: 'cutn-integrated-ma-economics',
        name: 'Integrated M.A. Economics (5 Years)',
        nameTamil: 'ஒருங்கிணைந்த எம்.ஏ. பொருளியல் (5 ஆண்டுகள்)',
        type: 'Integrated',
        category: 'On-Campus',
        school: 'School of Social Sciences & Humanities',
        duration: '5 Years',
        eligibility: '+2 any stream (CUET-UG Required)',
        examPattern: {
          totalQuestions: 50, totalMarks: 200, duration: '45 Minutes per section', durationMinutes: 135,
          mode: 'CUET-UG Computer Based (CBT)', negativeMarking: true,
          sections: [
            { name: 'Economics / Maths', nameTamil: 'பொருளியல் / கணிதம்', questions: 50, marks: 200, topics: ['Microeconomics', 'Macroeconomics', 'Statistics', 'Indian Economy'] },
            { name: 'General Test', nameTamil: 'பொது தேர்வு', questions: 60, marks: 200, topics: ['General Awareness', 'Quantitative Reasoning', 'Logical Reasoning'] }
          ]
        },
        syllabus: [
          {
            unitNumber: 1, title: 'Microeconomics', titleTamil: 'நுண்பொருளியல்',
            topics: [
              { name: 'Demand & Supply', subtopics: ['Law of Demand', 'Elasticity', 'Market Equilibrium'], importance: 'High' },
              { name: 'Consumer Theory', subtopics: ['Utility', 'Indifference Curves', 'Budget Constraint'], importance: 'High' },
            ], expectedQuestions: 12, difficulty: 'Medium'
          },
          {
            unitNumber: 2, title: 'Macroeconomics', titleTamil: 'பேரியல் பொருளியல்',
            topics: [
              { name: 'National Income', subtopics: ['GDP', 'GNP', 'NNP', 'Measurement Methods'], importance: 'High' },
              { name: 'Money & Banking', subtopics: ['RBI Functions', 'Monetary Policy', 'Inflation'], importance: 'High' },
            ], expectedQuestions: 15, difficulty: 'Medium'
          }
        ],
        previousQuestions: [
          { id: 'cutn-eco-q1', year: '2024', question: 'The Phillips Curve shows the relationship between:', options: ['GDP and Interest Rate', 'Inflation and Unemployment', 'Savings and Investment', 'Exports and Imports'], correctAnswer: 1, explanation: 'The Phillips Curve demonstrates the inverse relationship between inflation and unemployment rates.', topic: 'Macroeconomics', difficulty: 'Medium' },
          { id: 'cutn-eco-q2', year: '2024', question: 'Which body is responsible for monetary policy in India?', options: ['SEBI', 'Finance Ministry', 'RBI', 'NITI Aayog'], correctAnswer: 2, explanation: 'The Reserve Bank of India (RBI) is responsible for formulating and implementing monetary policy in India.', topic: 'Indian Economy', difficulty: 'Easy' }
        ],
        tips: ['Open to ALL streams (Science/Commerce/Arts)', 'Apply through CUET-UG', 'Career: Economist, RBI Grade B, Data Analyst, IES']
      },
      
      // ----- INTEGRATED M.P.A. (5 YEARS) -----
      {
        id: 'cutn-integrated-mpa-music',
        name: 'Integrated M.P.A. Music (5 Years)',
        nameTamil: 'ஒருங்கிணைந்த எம்.பி.ஏ. இசை (5 ஆண்டுகள்)',
        type: 'Integrated',
        category: 'On-Campus',
        school: 'School of Performing Arts',
        duration: '5 Years',
        eligibility: '+2 any stream + Music background (CUET-UG + Skill Test)',
        examPattern: {
          totalQuestions: 50, totalMarks: 200, duration: '45 Minutes per section', durationMinutes: 90,
          mode: 'CUET-UG + Practical Audition', negativeMarking: true,
          sections: [
            { name: 'General Test', nameTamil: 'பொது தேர்வு', questions: 60, marks: 200, topics: ['Quantitative Reasoning', 'Logical Reasoning', 'General Awareness'] },
            { name: 'Skill Test', nameTamil: 'திறன் தேர்வு', questions: 1, marks: 100, topics: ['Practical Audition', 'Music Theory', 'Performance'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Requires CUET-UG + Practical Audition', 'Prior music training is essential', 'Career: Professional Musician, Music Teacher, AIR']
      },
      
      // ----- INTEGRATED B.Sc. B.Ed. (4 YEARS - ITEP SCHEME) -----
      {
        id: 'cutn-bsc-bed-maths',
        name: 'Integrated B.Sc. B.Ed. Mathematics (4 Years)',
        nameTamil: 'ஒருங்கிணைந்த பி.எஸ்சி. பி.எட். கணிதம் (4 ஆண்டுகள்)',
        type: 'Integrated',
        category: 'On-Campus',
        school: 'School of Education',
        duration: '4 Years',
        specialty: 'ITEP Scheme - Teacher Training',
        eligibility: '+2 with Mathematics (CUET-UG Required)',
        examPattern: {
          totalQuestions: 50, totalMarks: 200, duration: '45 Minutes per section', durationMinutes: 135,
          mode: 'CUET-UG Computer Based (CBT)', negativeMarking: true,
          sections: [
            { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 200, topics: ['Calculus', 'Algebra', 'Trigonometry', 'Statistics'] },
            { name: 'General Test', nameTamil: 'பொது தேர்வு', questions: 60, marks: 200, topics: ['Quantitative Reasoning', 'Logical Reasoning'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['4-year integrated B.Sc. + B.Ed. under ITEP scheme', 'Excellent for becoming a Government School Teacher', 'Career: TGT/PGT Teacher, Education Officer, Academic Counselor']
      },

      // ========================================
      // 2. POSTGRADUATE (PG) PROGRAMMES - 2 YEARS
      // ========================================
      // For students who have completed Bachelor's degree
      
      // ----- M.Sc. SCIENCE PROGRAMMES -----
      {
        id: 'cutn-msc-chemistry',
        name: 'M.Sc. Chemistry',
        nameTamil: 'எம்.எஸ்சி. வேதியியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Basic & Applied Sciences',
        duration: '2 Years',
        eligibility: 'B.Sc. Chemistry (CUET-PG Required)',
        examPattern: {
          totalQuestions: 75, totalMarks: 300, duration: '2 Hours', durationMinutes: 120,
          mode: 'CUET-PG Computer Based (CBT)', negativeMarking: true,
          sections: [
            { name: 'Domain Knowledge - Chemistry', nameTamil: 'களப்பறிவு - வேதியியல்', questions: 75, marks: 300, topics: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Spectroscopy'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG after B.Sc.', 'Career: Chemist, Pharma Industry, Research Labs']
      },
      {
        id: 'cutn-msc-computer-science',
        name: 'M.Sc. Computer Science',
        nameTamil: 'எம்.எஸ்சி. கணினி அறிவியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Basic & Applied Sciences',
        duration: '2 Years',
        eligibility: 'B.Sc./BCA/B.Tech (CUET-PG Required)',
        examPattern: {
          totalQuestions: 75, totalMarks: 300, duration: '2 Hours', durationMinutes: 120,
          mode: 'CUET-PG Computer Based (CBT)', negativeMarking: true,
          sections: [
            { name: 'Computer Science', nameTamil: 'கணினி அறிவியல்', questions: 75, marks: 300, topics: ['Programming', 'Data Structures', 'DBMS', 'Networks'] }
          ]
        },
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Software Engineer, IT Industry, Data Scientist']
      },
      {
        id: 'cutn-msc-geography',
        name: 'M.Sc. Geography',
        nameTamil: 'எம்.எஸ்சி. புவியியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Earth Sciences',
        duration: '2 Years',
        eligibility: 'B.Sc. Geography/Geology (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Geographer, ISRO, Survey of India, Town Planner']
      },
      {
        id: 'cutn-msc-geology',
        name: 'M.Sc. Geology',
        nameTamil: 'எம்.எஸ்சி. நிலவியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Earth Sciences',
        duration: '2 Years',
        eligibility: 'B.Sc. Geology (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Geologist, GSI, ONGC, Mining Industry']
      },
      {
        id: 'cutn-msc-applied-psychology',
        name: 'M.Sc. Applied Psychology',
        nameTamil: 'எம்.எஸ்சி. பயன்பாட்டு உளவியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Social Sciences & Humanities',
        duration: '2 Years',
        eligibility: 'B.A./B.Sc. Psychology (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Clinical Psychologist, HR, Counselor']
      },
      {
        id: 'cutn-msc-microbiology',
        name: 'M.Sc. Microbiology',
        nameTamil: 'எம்.எஸ்சி. நுண்ணுயிரியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Life Sciences',
        duration: '2 Years',
        eligibility: 'B.Sc. Microbiology/Life Sciences (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Microbiologist, Pharma, Quality Control, Research']
      },
      {
        id: 'cutn-msc-horticulture',
        name: 'M.Sc. Horticulture',
        nameTamil: 'எம்.எஸ்சி. தோட்டக்கலை',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Life Sciences',
        duration: '2 Years',
        eligibility: 'B.Sc. Horticulture/Agriculture (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Horticulturist, Agriculture Officer, Agribusiness']
      },
      {
        id: 'cutn-msc-epidemiology-public-health',
        name: 'M.Sc. Epidemiology and Public Health',
        nameTamil: 'எம்.எஸ்சி. தொற்றுநோயியல் மற்றும் பொது சுகாதாரம்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Life Sciences',
        duration: '2 Years',
        specialty: 'Unique to CUTN',
        eligibility: 'B.Sc. Life Sciences/Nursing/MBBS (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Unique program - only at CUTN', 'Apply through CUET-PG', 'Career: Public Health Officer, WHO, Epidemiologist, CDC']
      },
      {
        id: 'cutn-msc-statistics-applied-maths',
        name: 'M.Sc. Statistics and Applied Mathematics',
        nameTamil: 'எம்.எஸ்சி. புள்ளியியல் மற்றும் பயன்பாட்டு கணிதம்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Basic & Applied Sciences',
        duration: '2 Years',
        eligibility: 'B.Sc. Mathematics/Statistics (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Statistician, Data Analyst, Actuary, Research']
      },
      
      // ----- M.A. ARTS & HUMANITIES -----
      {
        id: 'cutn-ma-english',
        name: 'M.A. English',
        nameTamil: 'எம்.ஏ. ஆங்கிலம்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Languages',
        duration: '2 Years',
        eligibility: 'B.A. English (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Professor, Content Writer, Translator, Media']
      },
      {
        id: 'cutn-ma-hindi',
        name: 'M.A. Hindi',
        nameTamil: 'எம்.ஏ. இந்தி',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Languages',
        duration: '2 Years',
        eligibility: 'B.A. Hindi (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Hindi Officer, Translator, Professor']
      },
      {
        id: 'cutn-ma-classical-tamil',
        name: 'M.A. Classical Tamil Studies',
        nameTamil: 'எம்.ஏ. செம்மொழி தமிழ் ஆய்வுகள்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Languages',
        duration: '2 Years',
        eligibility: 'B.A. Tamil (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Tamil Researcher, Professor, Government Translator']
      },
      {
        id: 'cutn-ma-history',
        name: 'M.A. History',
        nameTamil: 'எம்.ஏ. வரலாறு',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Social Sciences & Humanities',
        duration: '2 Years',
        eligibility: 'B.A. History (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Historian, Archaeologist, Professor, Civil Services']
      },
      {
        id: 'cutn-ma-economics-pg',
        name: 'M.A. Economics',
        nameTamil: 'எம்.ஏ. பொருளியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Social Sciences & Humanities',
        duration: '2 Years',
        eligibility: 'B.A. Economics (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Economist, RBI, Bank PO, Research Analyst']
      },
      {
        id: 'cutn-ma-mass-communication',
        name: 'M.A. Mass Communication',
        nameTamil: 'எம்.ஏ. ஊடக தொடர்பியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Social Sciences & Humanities',
        duration: '2 Years',
        eligibility: 'Any Bachelor\'s degree (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Journalist, PR Executive, Media Manager, Filmmaker']
      },
      
      // ----- MANAGEMENT & COMMERCE -----
      {
        id: 'cutn-mba-general',
        name: 'M.B.A. (General)',
        nameTamil: 'எம்.பி.ஏ. (பொது)',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Management Studies',
        duration: '2 Years',
        eligibility: 'Any Bachelor\'s degree (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Manager, Consultant, Entrepreneur, Corporate Leader']
      },
      {
        id: 'cutn-mba-tourism-hospitality',
        name: 'M.B.A. Tourism and Hospitality Management',
        nameTamil: 'எம்.பி.ஏ. சுற்றுலா மற்றும் விருந்தோம்பல் மேலாண்மை',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Management Studies',
        duration: '2 Years',
        eligibility: 'Any Bachelor\'s degree (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Hotel Manager, Tourism Officer, Event Manager']
      },
      {
        id: 'cutn-mcom',
        name: 'M.Com.',
        nameTamil: 'எம்.காம்.',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Management Studies',
        duration: '2 Years',
        eligibility: 'B.Com (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Accountant, Auditor, Tax Consultant, Finance Manager']
      },
      
      // ----- PROFESSIONAL & TECHNICAL -----
      {
        id: 'cutn-msw',
        name: 'M.S.W. (Master of Social Work)',
        nameTamil: 'எம்.எஸ்.டபிள்யூ. (சமூக சேவை முதுநிலை)',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Social Sciences & Humanities',
        duration: '2 Years',
        eligibility: 'Any Bachelor\'s degree (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: NGO Worker, Welfare Officer, HR, CSR Manager']
      },
      {
        id: 'cutn-mlibisc',
        name: 'M.Lib.I.Sc. (Library & Information Science)',
        nameTamil: 'எம்.லிப்.ஐ.எஸ்சி. (நூலகம் & தகவல் அறிவியல்)',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Social Sciences & Humanities',
        duration: '2 Years',
        eligibility: 'B.Lib.I.Sc. or any Bachelor\'s (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Librarian, Information Officer, Knowledge Manager']
      },
      {
        id: 'cutn-llm',
        name: 'LL.M. (Corporate Law and Industrial Jurisprudence)',
        nameTamil: 'எல்.எல்.எம். (நிறுவன சட்டம் மற்றும் தொழில்துறை நீதிமுறை)',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Law',
        duration: '2 Years',
        eligibility: 'LL.B. (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Corporate Lawyer, Legal Advisor, Judiciary']
      },
      {
        id: 'cutn-mtech-materials-science',
        name: 'M.Tech. (Materials Science and Technology)',
        nameTamil: 'எம்.டெக். (பொருள் அறிவியல் மற்றும் தொழில்நுட்பம்)',
        type: 'PG',
        category: 'On-Campus',
        school: 'School of Basic & Applied Sciences',
        duration: '2 Years',
        eligibility: 'B.E./B.Tech./M.Sc. (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Materials Engineer, R&D, Manufacturing Industry']
      },

      // ========================================
      // 3. COLLABORATIVE PROGRAMMES (TEXTILES)
      // ========================================
      // In collaboration with SVPISTM, Coimbatore
      // Note: Study at Coimbatore, Degree from CUTN
      
      {
        id: 'cutn-bsc-textiles-apparel',
        name: 'B.Sc. Textiles & Apparel Design',
        nameTamil: 'பி.எஸ்சி. ஜவுளி & ஆடை வடிவமைப்பு',
        type: 'UG',
        category: 'Collaborative',
        school: 'SVPISTM Coimbatore',
        duration: '3 Years',
        eligibility: '+2 any stream (CUET-UG Required)',
        specialty: 'Study at SVPISTM Coimbatore - CUTN Degree',
        syllabus: [], previousQuestions: [],
        tips: ['Collaborative with SVPISTM Coimbatore', 'Study at Coimbatore, CUTN degree', 'Career: Fashion Designer, Textile Designer, Apparel Industry']
      },
      {
        id: 'cutn-bsc-technical-textiles',
        name: 'B.Sc. Technical Textiles',
        nameTamil: 'பி.எஸ்சி. தொழில்நுட்ப ஜவுளி',
        type: 'UG',
        category: 'Collaborative',
        school: 'SVPISTM Coimbatore',
        duration: '3 Years',
        eligibility: '+2 Science stream (CUET-UG Required)',
        specialty: 'Study at SVPISTM Coimbatore - CUTN Degree',
        syllabus: [], previousQuestions: [],
        tips: ['Collaborative with SVPISTM Coimbatore', 'Focus on technical applications of textiles', 'Career: Technical Textile Engineer, R&D, Manufacturing']
      },
      {
        id: 'cutn-bba-textile-analytics',
        name: 'B.B.A. Textile Business Analytics',
        nameTamil: 'பி.பி.ஏ. ஜவுளி வணிக பகுப்பாய்வு',
        type: 'UG',
        category: 'Collaborative',
        school: 'SVPISTM Coimbatore',
        duration: '3 Years',
        eligibility: '+2 any stream (CUET-UG Required)',
        specialty: 'Study at SVPISTM Coimbatore - CUTN Degree',
        syllabus: [], previousQuestions: [],
        tips: ['Collaborative with SVPISTM Coimbatore', 'Blend of business + textile analytics', 'Career: Textile Business Analyst, Export Manager, Supply Chain']
      },
      {
        id: 'cutn-mba-apparel-mgmt',
        name: 'M.B.A. Apparel Management',
        nameTamil: 'எம்.பி.ஏ. ஆடை மேலாண்மை',
        type: 'PG',
        category: 'Collaborative',
        school: 'SVPISTM Coimbatore',
        duration: '2 Years',
        eligibility: 'Any Bachelor\'s degree (CUET-PG Required)',
        specialty: 'Study at SVPISTM Coimbatore - CUTN Degree',
        syllabus: [], previousQuestions: [],
        tips: ['Collaborative with SVPISTM Coimbatore', 'Career: Apparel Business Manager, Brand Manager, Export Manager']
      },
      {
        id: 'cutn-mba-retail-mgmt',
        name: 'M.B.A. Retail Management',
        nameTamil: 'எம்.பி.ஏ. சில்லறை மேலாண்மை',
        type: 'PG',
        category: 'Collaborative',
        school: 'SVPISTM Coimbatore',
        duration: '2 Years',
        eligibility: 'Any Bachelor\'s degree (CUET-PG Required)',
        specialty: 'Study at SVPISTM Coimbatore - CUTN Degree',
        syllabus: [], previousQuestions: [],
        tips: ['Collaborative with SVPISTM Coimbatore', 'Career: Retail Manager, Store Manager, E-commerce Manager']
      },
      {
        id: 'cutn-mba-textile-mgmt',
        name: 'M.B.A. Textile Management',
        nameTamil: 'எம்.பி.ஏ. ஜவுளி மேலாண்மை',
        type: 'PG',
        category: 'Collaborative',
        school: 'SVPISTM Coimbatore',
        duration: '2 Years',
        eligibility: 'Any Bachelor\'s degree (CUET-PG Required)',
        specialty: 'Study at SVPISTM Coimbatore - CUTN Degree',
        syllabus: [], previousQuestions: [],
        tips: ['Collaborative with SVPISTM Coimbatore', 'Career: Textile Industry Manager, Production Manager, Quality Manager']
      },
      {
        id: 'cutn-mba-technical-textile-mgmt',
        name: 'M.B.A. Technical Textile Management',
        nameTamil: 'எம்.பி.ஏ. தொழில்நுட்ப ஜவுளி மேலாண்மை',
        type: 'PG',
        category: 'Collaborative',
        school: 'SVPISTM Coimbatore',
        duration: '2 Years',
        eligibility: 'B.E./B.Tech./B.Sc. Textiles (CUET-PG Required)',
        specialty: 'Study at SVPISTM Coimbatore - CUTN Degree',
        syllabus: [], previousQuestions: [],
        tips: ['Collaborative with SVPISTM Coimbatore', 'Career: Technical Textile Manager, R&D Manager, Innovation Head']
      },

      // ========================================
      // 4. PG DIPLOMA COURSES
      // ========================================
      {
        id: 'cutn-pgd-data-science',
        name: 'PG Diploma in Data Science',
        nameTamil: 'தரவு அறிவியலில் முதுநிலை பட்டயம்',
        type: 'PG Diploma',
        category: 'On-Campus',
        school: 'School of Basic & Applied Sciences',
        duration: '1 Year',
        eligibility: 'Any Bachelor\'s degree (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Data Scientist, ML Engineer, Business Analyst']
      },
      {
        id: 'cutn-pgd-chemical-lab-technician',
        name: 'PG Diploma in Chemical Laboratory Technician',
        nameTamil: 'வேதியியல் ஆய்வகத் தொழில்நுட்ப நிபுணர் முதுநிலை பட்டயம்',
        type: 'PG Diploma',
        category: 'On-Campus',
        school: 'School of Basic & Applied Sciences',
        duration: '1 Year',
        eligibility: 'B.Sc. Chemistry (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Lab Technician, Quality Control, Pharma Industry']
      },
      {
        id: 'cutn-pgd-fitness-management',
        name: 'PG Diploma in Fitness Management',
        nameTamil: 'உடற்பயிற்சி மேலாண்மையில் முதுநிலை பட்டயம்',
        type: 'PG Diploma',
        category: 'On-Campus',
        school: 'School of Physical Education',
        duration: '1 Year',
        eligibility: 'Any Bachelor\'s degree (CUET-PG Required)',
        syllabus: [], previousQuestions: [],
        tips: ['Apply through CUET-PG', 'Career: Fitness Trainer, Gym Manager, Sports Coach']
      }
    ]
  },
  // ===== TAMIL UNIVERSITY (THANJAVUR) =====
  // Focus: Tamil Literature, Arts, Music, Heritage, Archaeology, and Research
  // Gandhigram Rural Institute (GRI) - Deemed to be University (Central Govt Funded)
  {
    id: 'gandhigram-university',
    name: 'Gandhigram Rural Institute',
    nameTamil: 'காந்திகிராம கிராமிய நிறுவனம்',
    location: 'Dindigul',
    website: 'www.ruraluniv.ac.in',
    phone: '0451-2452371',
    email: 'registrar@ruraluniv.ac.in',
    examName: 'CUET-UG / CUET-PG',
    logoColor: '#166534',
    logo: '/universities/gandhigram-rural-logo.jpeg',
    campusImage: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=600&h=300&fit=crop&auto=format',
    type: 'Deemed University (Central Govt Funded)',
    fee: { general: 500, obc: 400, scst: 250 },
    importantDates: [
      { event: 'CUET Notification', eventTamil: 'CUET அறிவிப்பு', date: 'February 2026', status: 'upcoming' },
      { event: 'CUET Registration', eventTamil: 'CUET பதிவு', date: 'February 2026', status: 'upcoming' },
      { event: 'CUET Exam', eventTamil: 'CUET தேர்வு', date: 'May 2026', status: 'upcoming' },
      { event: 'GRI Counseling Opens', eventTamil: 'GRI கலந்தாய்வு', date: 'June 2026', status: 'upcoming' },
      { event: 'Classes Begin', eventTamil: 'வகுப்புகள் தொடக்கம்', date: 'August 2026', status: 'upcoming' },
    ],
    courses: [
      // ======================== SIGNATURE/UNIQUE COURSES ========================
      {
        id: 'gri-pgdip-sanitary-inspector',
        name: 'PG Diploma in Sanitary Inspector\'s Course',
        nameTamil: 'முதுநிலை பட்டயம் - சுகாதார ஆய்வாளர்',
        type: 'Diploma',
        category: 'On-Campus',
        school: 'Signature Courses',
        duration: '1 Year',
        eligibility: 'Any Degree',
        previousQuestions: [],
        tips: ['Very high demand for Health Inspector jobs in TN Govt', 'Direct recruitment to PHC and Municipal bodies', 'Practical-focused curriculum']
      },
      {
        id: 'gri-diploma-agriculture',
        name: 'Diploma in Agriculture',
        nameTamil: 'வேளாண்மை பட்டயம்',
        type: 'Diploma',
        category: 'On-Campus',
        school: 'Signature Courses',
        duration: '2 Years',
        eligibility: '10th Pass',
        previousQuestions: [],
        tips: ['Practical farming course', 'Ideal for students from farming backgrounds', 'Leads to Agricultural Supervisor roles']
      },
      {
        id: 'gri-bsc-hons-agriculture',
        name: 'B.Sc. (Hons) Agriculture',
        nameTamil: 'பி.எஸ்சி. (ஹானர்ஸ்) வேளாண்மை',
        type: 'UG',
        category: 'On-Campus',
        school: 'Signature Courses',
        duration: '4 Years',
        eligibility: 'HSC with PCB/PCM (CUET-UG)',
        seatMatrix: { general: 20, obc: 16, bcMbc: 12, sc: 8, st: 4, total: 60 },
        cutoffs: [
          { year: '2024', general: 480, obc: 420, bcMbc: 380, sc: 320, st: 280 },
          { year: '2023', general: 460, obc: 400, bcMbc: 360, sc: 300, st: 260 },
        ],
        examPattern: {
          totalQuestions: 150,
          totalMarks: 600,
          duration: '3 Hours 15 Minutes',
          durationMinutes: 195,
          mode: 'Computer Based (CBT)',
          negativeMarking: true,
          sections: [
            { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 200, topics: ['Mechanics', 'Heat', 'Optics', 'Modern Physics'] },
            { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 50, marks: 200, topics: ['Organic', 'Inorganic', 'Physical Chemistry'] },
            { name: 'Biology/Agriculture', nameTamil: 'உயிரியல்/வேளாண்மை', questions: 50, marks: 200, topics: ['Botany', 'Zoology', 'Agriculture Basics'] }
          ]
        },
        syllabus: [
          {
            unitNumber: 1,
            title: 'Crop Production',
            titleTamil: 'பயிர் உற்பத்தி',
            topics: [
              { name: 'Agronomy', subtopics: ['Field Crops', 'Cropping Systems', 'Tillage', 'Irrigation'], importance: 'High' },
              { name: 'Soil Science', subtopics: ['Soil Types', 'Fertility', 'Soil Conservation'], importance: 'High' },
            ],
            expectedQuestions: 15,
            difficulty: 'Medium'
          },
        ],
        previousQuestions: [
          {
            id: 'gri-agri-q1',
            year: '2024',
            question: 'NPK in fertilizers stands for:',
            options: ['Nitrogen, Potassium, Kalium', 'Nitrogen, Phosphorus, Potassium', 'Neon, Phosphorus, Krypton', 'Nitrogen, Platinum, Potassium'],
            correctAnswer: 1,
            explanation: 'NPK represents Nitrogen (N), Phosphorus (P), and Potassium (K) - the three primary nutrients for plant growth.',
            topic: 'Soil Science',
            difficulty: 'Easy'
          },
        ],
        tips: ['CUET-UG required', 'Career paths: Agricultural Officer, Farm Manager, TNAU Scientist']
      },
      // B.Voc. Programs
      {
        id: 'gri-bvoc-farm-equipment',
        name: 'B.Voc. Farm Equipment Operation & Maintenance',
        nameTamil: 'பி.வாக். பண்ணை உபகரண இயக்கம் & பராமரிப்பு',
        type: 'UG',
        category: 'On-Campus',
        school: 'B.Voc. (Vocational Education)',
        duration: '3 Years',
        eligibility: 'HSC Pass (Merit/CUET)',
        previousQuestions: [],
        tips: ['70% practical training', 'Industry internships included', 'High employability in agri-machinery sector']
      },
      {
        id: 'gri-bvoc-footwear',
        name: 'B.Voc. Footwear and Accessories Design',
        nameTamil: 'பி.வாக். காலணி மற்றும் ஆபரணங்கள் வடிவமைப்பு',
        type: 'UG',
        category: 'On-Campus',
        school: 'B.Voc. (Vocational Education)',
        duration: '3 Years',
        eligibility: 'HSC Pass (Merit/CUET)',
        previousQuestions: [],
        tips: ['Unique course in TN', 'Leather industry cluster jobs', 'Design portfolio required']
      },
      {
        id: 'gri-bvoc-food-processing',
        name: 'B.Voc. Food Processing',
        nameTamil: 'பி.வாக். உணவு பதப்படுத்துதல்',
        type: 'UG',
        category: 'On-Campus',
        school: 'B.Voc. (Vocational Education)',
        duration: '3 Years',
        eligibility: 'HSC Pass (Merit/CUET)',
        previousQuestions: [],
        tips: ['Growing sector in India', 'Career: Food Technologist, Quality Controller']
      },
      {
        id: 'gri-bvoc-food-testing',
        name: 'B.Voc. Food Testing & Quality Evaluation',
        nameTamil: 'பி.வாக். உணவு சோதனை & தர மதிப்பீடு',
        type: 'UG',
        category: 'On-Campus',
        school: 'B.Voc. (Vocational Education)',
        duration: '3 Years',
        eligibility: 'HSC Pass (Merit/CUET)',
        previousQuestions: [],
        tips: ['FSSAI labs require this qualification', 'High demand in food industry']
      },
      {
        id: 'gri-bvoc-dairy',
        name: 'B.Voc. Dairy Production and Technology',
        nameTamil: 'பி.வாக். பால் உற்பத்தி மற்றும் தொழில்நுட்பம்',
        type: 'UG',
        category: 'On-Campus',
        school: 'B.Voc. (Vocational Education)',
        duration: '3 Years',
        eligibility: 'HSC Pass (Merit/CUET)',
        previousQuestions: [],
        tips: ['Aavin & Amul partnerships', 'Dairy farm management skills']
      },
      {
        id: 'gri-bvoc-renewable-energy',
        name: 'B.Voc. Renewable Energy',
        nameTamil: 'பி.வாக். புதுப்பிக்கத்தக்க ஆற்றல்',
        type: 'UG',
        category: 'On-Campus',
        school: 'B.Voc. (Vocational Education)',
        duration: '3 Years',
        eligibility: 'HSC Pass with PCM (Merit/CUET)',
        previousQuestions: [],
        tips: ['Green energy sector boom', 'Solar & wind industry jobs']
      },
      {
        id: 'gri-bvoc-organic-agriculture',
        name: 'B.Voc. Organic Agriculture',
        nameTamil: 'பி.வாக். இயற்கை வேளாண்மை',
        type: 'UG',
        category: 'On-Campus',
        school: 'B.Voc. (Vocational Education)',
        duration: '3 Years',
        eligibility: 'HSC Pass (Merit/CUET)',
        previousQuestions: [],
        tips: ['Growing demand for organic produce', 'Certification & farm management']
      },
      // ======================== UG PROGRAMMES (CUET-UG) ========================
      {
        id: 'gri-bsc-mathematics',
        name: 'B.Sc. Mathematics',
        nameTamil: 'பி.எஸ்சி. கணிதம்',
        type: 'UG',
        category: 'On-Campus',
        school: 'Science',
        duration: '3 Years',
        eligibility: 'HSC with Maths (CUET-UG)',
        previousQuestions: [],
        tips: ['Strong foundation for higher studies', 'Career: Teacher, Data Analyst, Actuary']
      },
      {
        id: 'gri-bsc-physics',
        name: 'B.Sc. Physics',
        nameTamil: 'பி.எஸ்சி. இயற்பியல்',
        type: 'UG',
        category: 'On-Campus',
        school: 'Science',
        duration: '3 Years',
        eligibility: 'HSC with PCM (CUET-UG)',
        previousQuestions: [],
        tips: ['Research-oriented curriculum', 'Career: Scientist, Teacher, Tech sector']
      },
      {
        id: 'gri-bsc-chemistry',
        name: 'B.Sc. Chemistry',
        nameTamil: 'பி.எஸ்சி. வேதியியல்',
        type: 'UG',
        category: 'On-Campus',
        school: 'Science',
        duration: '3 Years',
        eligibility: 'HSC with PCM/PCB (CUET-UG)',
        previousQuestions: [],
        tips: ['Good lab infrastructure', 'Career: Chemist, Pharmaceutical industry']
      },
      {
        id: 'gri-bsc-textiles-fashion',
        name: 'B.Sc. Textiles and Fashion Design',
        nameTamil: 'பி.எஸ்சி. ஜவுளி மற்றும் ஃபேஷன் வடிவமைப்பு',
        type: 'UG',
        category: 'On-Campus',
        school: 'Science',
        duration: '3 Years',
        eligibility: 'HSC Pass (CUET-UG)',
        previousQuestions: [],
        tips: ['Unique to GRI', 'Tirupur textile industry connections', 'Portfolio-based selection possible']
      },
      {
        id: 'gri-bsc-home-science',
        name: 'B.Sc. Home Science',
        nameTamil: 'பி.எஸ்சி. குடும்ப அறிவியல்',
        type: 'UG',
        category: 'On-Campus',
        school: 'Science',
        duration: '3 Years',
        eligibility: 'HSC Pass (CUET-UG)',
        previousQuestions: [],
        tips: ['Nutrition & family welfare focus', 'Govt scheme implementation jobs']
      },
      {
        id: 'gri-bsc-geology',
        name: 'B.Sc. Geology',
        nameTamil: 'பி.எஸ்சி. புவியியல்',
        type: 'UG',
        category: 'On-Campus',
        school: 'Science',
        duration: '3 Years',
        eligibility: 'HSC with PCM (CUET-UG)',
        previousQuestions: [],
        tips: ['Field work intensive', 'Career: GSI, Mining sector, Groundwater dept']
      },
      {
        id: 'gri-bsc-computer-science',
        name: 'B.Sc. Computer Science',
        nameTamil: 'பி.எஸ்சி. கணினி அறிவியல்',
        type: 'UG',
        category: 'On-Campus',
        school: 'Science',
        duration: '3 Years',
        eligibility: 'HSC with Maths (CUET-UG)',
        previousQuestions: [],
        tips: ['IT sector placements', 'Rural tech focus is unique']
      },
      {
        id: 'gri-bsc-microbiology',
        name: 'B.Sc. Microbiology',
        nameTamil: 'பி.எஸ்சி. நுண்ணுயிரியல்',
        type: 'UG',
        category: 'On-Campus',
        school: 'Science',
        duration: '3 Years',
        eligibility: 'HSC with PCB (CUET-UG)',
        previousQuestions: [],
        tips: ['Lab-intensive course', 'Career: Lab Technician, Pharma, Research']
      },
      // B.Sc. B.Ed. Integrated
      {
        id: 'gri-bsc-bed-maths',
        name: 'B.Sc. B.Ed. Integrated (Mathematics)',
        nameTamil: 'பி.எஸ்சி. பி.எட். ஒருங்கிணைந்த (கணிதம்)',
        type: 'UG',
        category: 'On-Campus',
        school: 'Integrated B.Sc. B.Ed.',
        duration: '4 Years',
        eligibility: 'HSC with Maths (CUET-UG)',
        previousQuestions: [],
        tips: ['Become a teacher directly after 12th', 'TET eligible after graduation']
      },
      {
        id: 'gri-bsc-bed-physics',
        name: 'B.Sc. B.Ed. Integrated (Physics)',
        nameTamil: 'பி.எஸ்சி. பி.எட். ஒருங்கிணைந்த (இயற்பியல்)',
        type: 'UG',
        category: 'On-Campus',
        school: 'Integrated B.Sc. B.Ed.',
        duration: '4 Years',
        eligibility: 'HSC with Physics (CUET-UG)',
        previousQuestions: [],
        tips: ['Teacher training + Science degree', 'Govt school recruitment eligible']
      },
      {
        id: 'gri-bsc-bed-chemistry',
        name: 'B.Sc. B.Ed. Integrated (Chemistry)',
        nameTamil: 'பி.எஸ்சி. பி.எட். ஒருங்கிணைந்த (வேதியியல்)',
        type: 'UG',
        category: 'On-Campus',
        school: 'Integrated B.Sc. B.Ed.',
        duration: '4 Years',
        eligibility: 'HSC with Chemistry (CUET-UG)',
        previousQuestions: [],
        tips: ['4-year path to teaching career', 'Rural school focus']
      },
      // Arts UG
      {
        id: 'gri-ba-economics',
        name: 'B.A. Economics',
        nameTamil: 'பி.ஏ. பொருளாதாரம்',
        type: 'UG',
        category: 'On-Campus',
        school: 'Arts',
        duration: '3 Years',
        eligibility: 'HSC Pass (CUET-UG)',
        previousQuestions: [],
        tips: ['Rural economics focus', 'Career: Banking, Civil Services, Research']
      },
      {
        id: 'gri-ba-gandhian-social-work',
        name: 'B.A. Gandhian Social Work',
        nameTamil: 'பி.ஏ. காந்தியப் சமூகப் பணி',
        type: 'UG',
        category: 'On-Campus',
        school: 'Arts',
        duration: '3 Years',
        eligibility: 'HSC Pass (CUET-UG)',
        previousQuestions: [],
        tips: ['Unique to GRI', 'Community development focus', 'NGO sector placements']
      },
      // Commerce & Management UG
      {
        id: 'gri-bba',
        name: 'B.B.A. (Bachelor of Business Administration)',
        nameTamil: 'பி.பி.ஏ. (வணிக நிர்வாகம்)',
        type: 'UG',
        category: 'On-Campus',
        school: 'Commerce & Management',
        duration: '3 Years',
        eligibility: 'HSC Pass (CUET-UG)',
        previousQuestions: [],
        tips: ['Rural business management', 'Cooperative sector focus']
      },
      {
        id: 'gri-bcom-cooperation',
        name: 'B.Com (Cooperation)',
        nameTamil: 'பி.காம். (கூட்டுறவு)',
        type: 'UG',
        category: 'On-Campus',
        school: 'Commerce & Management',
        duration: '3 Years',
        eligibility: 'HSC Commerce (CUET-UG)',
        seatMatrix: { general: 18, obc: 14, bcMbc: 10, sc: 6, st: 2, total: 50 },
        cutoffs: [
          { year: '2024', general: 420, obc: 380, bcMbc: 340, sc: 280, st: 240 },
          { year: '2023', general: 400, obc: 360, bcMbc: 320, sc: 260, st: 220 },
        ],
        previousQuestions: [],
        tips: ['Unique cooperative societies focus', 'Career: Cooperative Bank Manager, NABARD Officer']
      },
      // B.Tech
      {
        id: 'gri-btech-civil',
        name: 'B.Tech Civil Engineering',
        nameTamil: 'பி.டெக். சிவில் பொறியியல்',
        type: 'UG',
        category: 'On-Campus',
        school: 'Engineering',
        duration: '4 Years',
        eligibility: 'HSC with PCM (CUET-UG / JEE)',
        previousQuestions: [],
        tips: ['Rural infrastructure focus', 'Lateral entry available for Diploma holders']
      },
      // ======================== PG PROGRAMMES (CUET-PG) ========================
      // M.Sc. Life Sciences
      {
        id: 'gri-msc-botany',
        name: 'M.Sc. Botany',
        nameTamil: 'எம்.எஸ்சி. தாவரவியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'M.Sc. Science',
        duration: '2 Years',
        eligibility: 'B.Sc. Botany/Life Sciences (CUET-PG)',
        previousQuestions: [],
        tips: ['Research focus', 'Career: Botanist, Ecologist, Teacher']
      },
      {
        id: 'gri-msc-zoology',
        name: 'M.Sc. Zoology',
        nameTamil: 'எம்.எஸ்சி. விலங்கியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'M.Sc. Science',
        duration: '2 Years',
        eligibility: 'B.Sc. Zoology/Life Sciences (CUET-PG)',
        previousQuestions: [],
        tips: ['Wildlife conservation focus', 'Career: Zoologist, Wildlife Officer']
      },
      {
        id: 'gri-msc-microbiology',
        name: 'M.Sc. Microbiology',
        nameTamil: 'எம்.எஸ்சி. நுண்ணுயிரியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'M.Sc. Science',
        duration: '2 Years',
        eligibility: 'B.Sc. Microbiology/Life Sciences (CUET-PG)',
        previousQuestions: [],
        tips: ['Lab-intensive', 'Career: Microbiologist, Pharma, Research']
      },
      // M.Sc. Physical Sciences
      {
        id: 'gri-msc-mathematics',
        name: 'M.Sc. Mathematics',
        nameTamil: 'எம்.எஸ்சி. கணிதம்',
        type: 'PG',
        category: 'On-Campus',
        school: 'M.Sc. Science',
        duration: '2 Years',
        eligibility: 'B.Sc. Mathematics (CUET-PG)',
        previousQuestions: [],
        tips: ['Strong analytical training', 'Career: Teacher, Data Scientist, Actuary']
      },
      {
        id: 'gri-msc-physics',
        name: 'M.Sc. Physics',
        nameTamil: 'எம்.எஸ்சி. இயற்பியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'M.Sc. Science',
        duration: '2 Years',
        eligibility: 'B.Sc. Physics (CUET-PG)',
        previousQuestions: [],
        tips: ['Research-oriented', 'Career: Physicist, Scientist, Teacher']
      },
      {
        id: 'gri-msc-chemistry',
        name: 'M.Sc. Chemistry',
        nameTamil: 'எம்.எஸ்சி. வேதியியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'M.Sc. Science',
        duration: '2 Years',
        eligibility: 'B.Sc. Chemistry (CUET-PG)',
        previousQuestions: [],
        tips: ['Lab facilities excellent', 'Career: Chemist, Pharma industry']
      },
      // M.Sc. Applied Sciences
      {
        id: 'gri-msc-food-science-nutrition',
        name: 'M.Sc. Food Science and Nutrition',
        nameTamil: 'எம்.எஸ்சி. உணவு அறிவியல் மற்றும் ஊட்டச்சத்து',
        type: 'PG',
        category: 'On-Campus',
        school: 'M.Sc. Applied Sciences',
        duration: '2 Years',
        eligibility: 'B.Sc. Home Science/Nutrition/Chemistry (CUET-PG)',
        previousQuestions: [],
        tips: ['FSSAI career paths', 'Nutrition counselor roles']
      },
      {
        id: 'gri-msc-geology-geomatics',
        name: 'M.Sc. Applied Geology and Geomatics',
        nameTamil: 'எம்.எஸ்சி. பயன்பாட்டு புவியியல் மற்றும் ஜியோமேட்டிக்ஸ்',
        type: 'PG',
        category: 'On-Campus',
        school: 'M.Sc. Applied Sciences',
        duration: '2 Years',
        eligibility: 'B.Sc. Geology/Geography (CUET-PG)',
        previousQuestions: [],
        tips: ['GIS and remote sensing skills', 'Career: GSI, Mining, Groundwater']
      },
      {
        id: 'gri-msc-geoinformatics',
        name: 'M.Sc. Geoinformatics',
        nameTamil: 'எம்.எஸ்சி. ஜியோஇன்ஃபர்மேட்டிக்ஸ்',
        type: 'PG',
        category: 'On-Campus',
        school: 'M.Sc. Applied Sciences',
        duration: '2 Years',
        eligibility: 'B.Sc. with Maths/Geography (CUET-PG)',
        previousQuestions: [],
        tips: ['Modern GIS technology', 'Spatial data analysis skills']
      },
      {
        id: 'gri-msc-home-science-extension',
        name: 'M.Sc. Home Science Extension and Communication',
        nameTamil: 'எம்.எஸ்சி. குடும்ப அறிவியல் விரிவாக்கம் மற்றும் தொடர்பு',
        type: 'PG',
        category: 'On-Campus',
        school: 'M.Sc. Applied Sciences',
        duration: '2 Years',
        eligibility: 'B.Sc. Home Science (CUET-PG)',
        previousQuestions: [],
        tips: ['Extension education focus', 'Rural development programs']
      },
      // M.A. Arts
      {
        id: 'gri-ma-english',
        name: 'M.A. English',
        nameTamil: 'எம்.ஏ. ஆங்கிலம்',
        type: 'PG',
        category: 'On-Campus',
        school: 'M.A. Arts',
        duration: '2 Years',
        eligibility: 'Any Degree (CUET-PG)',
        previousQuestions: [],
        tips: ['Literature and language focus', 'Career: Teacher, Content Writer']
      },
      {
        id: 'gri-ma-tamil',
        name: 'M.A. Tamil',
        nameTamil: 'எம்.ஏ. தமிழ்',
        type: 'PG',
        category: 'On-Campus',
        school: 'M.A. Arts',
        duration: '2 Years',
        eligibility: 'Any Degree with Tamil (CUET-PG)',
        previousQuestions: [],
        tips: ['Tamil literature specialization', 'Career: Teacher, Translator']
      },
      {
        id: 'gri-ma-hindi',
        name: 'M.A. Hindi',
        nameTamil: 'எம்.ஏ. இந்தி',
        type: 'PG',
        category: 'On-Campus',
        school: 'M.A. Arts',
        duration: '2 Years',
        eligibility: 'Any Degree with Hindi (CUET-PG)',
        previousQuestions: [],
        tips: ['Hindi language proficiency', 'Central Govt translation jobs']
      },
      {
        id: 'gri-ma-economics',
        name: 'M.A. Economics',
        nameTamil: 'எம்.ஏ. பொருளாதாரம்',
        type: 'PG',
        category: 'On-Campus',
        school: 'M.A. Arts',
        duration: '2 Years',
        eligibility: 'Any Degree (CUET-PG)',
        previousQuestions: [],
        tips: ['Rural economics specialization', 'Career: Economist, Banking, IES']
      },
      // Flagship M.A. Programs
      {
        id: 'gri-ma-rural-development',
        name: 'M.A. Rural Development Studies',
        nameTamil: 'எம்.ஏ. கிராம வளர்ச்சி ஆய்வுகள்',
        type: 'PG',
        category: 'On-Campus',
        school: 'Flagship Programmes',
        duration: '2 Years',
        eligibility: 'Any Degree (CUET-PG)',
        previousQuestions: [],
        tips: ['Flagship course of GRI', 'Career: BDO, Rural Development Officer, NGO']
      },
      {
        id: 'gri-ma-gandhian-studies',
        name: 'M.A. Gandhian Studies and Peace Science',
        nameTamil: 'எம்.ஏ. காந்திய ஆய்வுகள் மற்றும் சமாதான அறிவியல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'Flagship Programmes',
        duration: '2 Years',
        eligibility: 'Any Degree (CUET-PG)',
        previousQuestions: [],
        tips: ['Unique to GRI', 'Peace and conflict resolution', 'NGO and social sector']
      },
      // Integrated PG (5 Years)
      {
        id: 'gri-ma-dev-admin-integrated',
        name: 'M.A. Development Administration (5-Year Integrated)',
        nameTamil: 'எம்.ஏ. வளர்ச்சி நிர்வாகம் (5 ஆண்டு ஒருங்கிணைந்த)',
        type: 'Integrated',
        category: 'On-Campus',
        school: 'Integrated PG Programmes',
        duration: '5 Years',
        eligibility: 'HSC Pass (CUET-UG)',
        previousQuestions: [],
        tips: ['Direct PG after 12th', 'Administrative services focus', 'Civil services prep support']
      },
      {
        id: 'gri-ma-sociology-integrated',
        name: 'M.A. Sociology (5-Year Integrated)',
        nameTamil: 'எம்.ஏ. சமூகவியல் (5 ஆண்டு ஒருங்கிணைந்த)',
        type: 'Integrated',
        category: 'On-Campus',
        school: 'Integrated PG Programmes',
        duration: '5 Years',
        eligibility: 'HSC Pass (CUET-UG)',
        previousQuestions: [],
        tips: ['Master\'s degree directly after school', 'Social research focus']
      },
      // Management & Tech PG
      {
        id: 'gri-mba-rural-project',
        name: 'M.B.A. (Rural Project Management)',
        nameTamil: 'எம்.பி.ஏ. (கிராம திட்ட மேலாண்மை)',
        type: 'PG',
        category: 'On-Campus',
        school: 'Management',
        duration: '2 Years',
        eligibility: 'Any Degree (CUET-PG / TANCET)',
        previousQuestions: [],
        tips: ['Rural project implementation', 'NGO and govt sector placements']
      },
      {
        id: 'gri-mba-small-business',
        name: 'M.B.A. (Small Business Management)',
        nameTamil: 'எம்.பி.ஏ. (சிறு வணிக மேலாண்மை)',
        type: 'PG',
        category: 'On-Campus',
        school: 'Management',
        duration: '2 Years',
        eligibility: 'Any Degree (CUET-PG / TANCET)',
        previousQuestions: [],
        tips: ['Entrepreneurship focus', 'MSME sector opportunities']
      },
      {
        id: 'gri-mba-cooperative',
        name: 'M.B.A. (Cooperative Management)',
        nameTamil: 'எம்.பி.ஏ. (கூட்டுறவு மேலாண்மை)',
        type: 'PG',
        category: 'On-Campus',
        school: 'Management',
        duration: '2 Years',
        eligibility: 'Any Degree (CUET-PG / TANCET)',
        previousQuestions: [],
        tips: ['Cooperative sector expertise', 'NABARD, cooperative bank careers']
      },
      {
        id: 'gri-mca',
        name: 'M.C.A. (Master of Computer Applications)',
        nameTamil: 'எம்.சி.ஏ. (கணினி பயன்பாடுகள் முதுநிலை)',
        type: 'PG',
        category: 'On-Campus',
        school: 'Management',
        duration: '2 Years',
        eligibility: 'BCA/B.Sc. CS with Maths (CUET-PG / TANCET)',
        previousQuestions: [],
        tips: ['IT industry placements', 'Rural tech applications']
      },
      {
        id: 'gri-mtech-renewable-energy',
        name: 'M.Tech. Renewable Energy',
        nameTamil: 'எம்.டெக். புதுப்பிக்கத்தக்க ஆற்றல்',
        type: 'PG',
        category: 'On-Campus',
        school: 'Engineering',
        duration: '2 Years',
        eligibility: 'B.Tech/B.E. relevant (GATE preferred)',
        previousQuestions: [],
        tips: ['Green energy sector', 'Solar and wind technology']
      },
      // Social Work
      {
        id: 'gri-msw',
        name: 'M.S.W. (Master of Social Work)',
        nameTamil: 'எம்.எஸ்.டபிள்யூ. (சமூக பணி முதுநிலை)',
        type: 'PG',
        category: 'On-Campus',
        school: 'Social Work',
        duration: '2 Years',
        eligibility: 'Any Degree (CUET-PG)',
        previousQuestions: [],
        tips: ['Community development focus', 'NGO and govt welfare programs']
      },
      // ======================== DIPLOMAS & CERTIFICATES ========================
      {
        id: 'gri-diploma-textile-tech',
        name: 'Diploma in Textile Technology',
        nameTamil: 'ஜவுளி தொழில்நுட்பம் பட்டயம்',
        type: 'Diploma',
        category: 'On-Campus',
        school: 'Diplomas',
        duration: '3 Years',
        eligibility: '10th Pass',
        previousQuestions: [],
        tips: ['Engineering diploma level', 'Textile industry jobs']
      },
      {
        id: 'gri-diploma-yoga',
        name: 'Diploma in Yoga',
        nameTamil: 'யோகா பட்டயம்',
        type: 'Diploma',
        category: 'On-Campus',
        school: 'Diplomas',
        duration: '1 Year',
        eligibility: 'HSC Pass',
        previousQuestions: [],
        tips: ['Yoga instructor certification', 'Wellness industry']
      },
      {
        id: 'gri-diploma-two-wheeler',
        name: 'Diploma in Two-Wheeler Mechanism & Maintenance',
        nameTamil: 'இரு சக்கர வாகன இயக்கம் & பராமரிப்பு பட்டயம்',
        type: 'Diploma',
        category: 'On-Campus',
        school: 'Diplomas',
        duration: '1 Year',
        eligibility: '10th Pass',
        previousQuestions: [],
        tips: ['Skill-based quick employment', 'Service center jobs']
      },
      // PG Diplomas
      {
        id: 'gri-pgdip-spatial-tech',
        name: 'PG Diploma in Spatial Technologies (GIS)',
        nameTamil: 'முதுநிலை பட்டயம் - வெளிவெளி தொழில்நுட்பங்கள்',
        type: 'Diploma',
        category: 'On-Campus',
        school: 'PG Diplomas',
        duration: '1 Year',
        eligibility: 'Any Degree',
        previousQuestions: [],
        tips: ['GIS & Remote Sensing', 'Urban planning, environmental jobs']
      },
      {
        id: 'gri-pgdip-gerontology',
        name: 'PG Diploma in Applied Gerontology',
        nameTamil: 'முதுநிலை பட்டயம் - பயன்பாட்டு முதுமையியல்',
        type: 'Diploma',
        category: 'On-Campus',
        school: 'PG Diplomas',
        duration: '1 Year',
        eligibility: 'Any Degree',
        previousQuestions: [],
        tips: ['Elderly care specialization', 'Growing demand with aging population']
      },
      {
        id: 'gri-pgdip-epigraphy',
        name: 'PG Diploma in Epigraphy',
        nameTamil: 'முதுநிலை பட்டயம் - கல்வெட்டியல்',
        type: 'Diploma',
        category: 'On-Campus',
        school: 'PG Diplomas',
        duration: '1 Year',
        eligibility: 'Any Degree',
        previousQuestions: [],
        tips: ['Ancient inscriptions study', 'ASI and heritage jobs']
      },
      {
        id: 'gri-pgdip-yoga-education',
        name: 'PG Diploma in Yoga Education',
        nameTamil: 'முதுநிலை பட்டயம் - யோகா கல்வி',
        type: 'Diploma',
        category: 'On-Campus',
        school: 'PG Diplomas',
        duration: '1 Year',
        eligibility: 'Any Degree',
        previousQuestions: [],
        tips: ['Advanced yoga teaching', 'School yoga teacher posts']
      },
      {
        id: 'gri-pgdip-sustainable-dev',
        name: 'PG Diploma in Sustainable Social Development',
        nameTamil: 'முதுநிலை பட்டயம் - நிலையான சமூக வளர்ச்சி',
        type: 'Diploma',
        category: 'On-Campus',
        school: 'PG Diplomas',
        duration: '1 Year',
        eligibility: 'Any Degree',
        previousQuestions: [],
        tips: ['SDG implementation', 'NGO and development sector']
      }
    ]
  },
  // ===== UNIVERSITY OF MADRAS (UNOM) =====
  // One of the oldest universities in India (Est. 1857)
  // Four Campuses: Chepauk, Marina, Guindy, Taramani
  // Admission: UNOM Entrance (PG), TANCET (MBA/MCA), Merit (IDE)
  // Bharathiar University - Coimbatore (University Departments)
  // ===== TAMIL NADU OPEN UNIVERSITY (TNOU) =====
  
  // ══════════════════════════════════════════════════════════════════════════════
  // ANNAMALAI UNIVERSITY - One of India's Largest Unitary Universities
  // ══════════════════════════════════════════════════════════════════════════════

  // TANUVAS - Tamil Nadu Veterinary & Animal Sciences University

  // ============================================================================================
  // TAMIL NADU PHYSICAL EDUCATION & SPORTS UNIVERSITY (TNPESU)
  // India's First Public Sports University - Melakottaiyur, Chennai
  // ============================================================================================

  // ============================================================================================
  // TAMIL NADU DR. J. JAYALALITHAA FISHERIES UNIVERSITY (TNJFU)
  // India's Premier Fisheries University - Nagapattinam
  // ============================================================================================

  // ============================================================
  // TAMIL NADU DR. J. JAYALALITHAA MUSIC AND FINE ARTS UNIVERSITY
  // ============================================================
];

// Import and merge Central Universities
import { centralUniversities } from './central-universities-data';
// IMPORTANT: Avoid duplicates (especially during hot-reload) by merging idempotently.
// We only merge Central universities that don't already exist in the base dataset.
const __existingUniversityIds = new Set(universities.map(u => u.id));
for (const uni of centralUniversities) {
  if (!__existingUniversityIds.has(uni.id)) {
    universities.push(uni);
    __existingUniversityIds.add(uni.id);
  }
}

export const getUniversityById = (id: string): University | undefined => {
  return universities.find(u => u.id === id);
};

export const getCourseById = (universityId: string, courseId: string): Course | undefined => {
  const university = getUniversityById(universityId);
  return university?.courses.find(c => c.id === courseId);
};
