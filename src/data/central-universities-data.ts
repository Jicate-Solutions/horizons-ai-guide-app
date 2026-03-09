// Central Government Universities & Institutes in Tamil Nadu
// This file contains data for all central government institutions

import type { University } from './university-entrance-data';

export const centralUniversities: University[] = [
  // ============================================
  // 1. INDIAN INSTITUTE OF TECHNOLOGY MADRAS (IITM)
  // ============================================
  {
    id: 'iitm',
    name: 'Indian Institute of Technology Madras',
    nameTamil: 'இந்திய தொழில்நுட்பக் கழகம் சென்னை',
    location: 'Chennai, Tamil Nadu',
    website: 'https://www.iitm.ac.in',
    phone: '044-22578200',
    email: 'info@iitm.ac.in',
    examName: 'JEE Advanced (UG) / GATE (PG) / CAT (MBA)',
    logoColor: '#0066CC',
    logo: '/universities/iit-madras-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026 (Session 1)', eventTamil: 'JEE மெயின் 2026 (அமர்வு 1)', date: 'January 2026', status: 'upcoming' },
      { event: 'JEE Advanced 2026', eventTamil: 'JEE அட்வான்ஸ்டு 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'GATE 2026', eventTamil: 'GATE 2026', date: 'February 2026', status: 'upcoming' },
      { event: 'BS Online Degree Admission', eventTamil: 'BS ஆன்லைன் பட்டப்படிப்பு சேர்க்கை', date: 'Year-round', status: 'ongoing' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      // ========== UNDERGRADUATE (B.Tech - 4 Years) ==========
      { id: 'iitm-btech-aerospace', name: 'B.Tech Aerospace Engineering', nameTamil: 'B.Tech விண்வெளி பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours (each paper)', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [{ name: 'Physics', nameTamil: 'இயற்பியல்', questions: 18, marks: 60, topics: ['Mechanics', 'Electrodynamics', 'Optics', 'Modern Physics'] }, { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 18, marks: 60, topics: ['Physical', 'Organic', 'Inorganic Chemistry'] }, { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 18, marks: 60, topics: ['Calculus', 'Algebra', 'Coordinate Geometry', 'Vectors'] }] }, syllabus: [], previousQuestions: [], tips: ['Ranked #1 Engineering Institute in India', 'Strong placement in aviation & defense sectors', 'Research opportunities with ISRO, DRDO'] },
      { id: 'iitm-btech-chemical', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதிப் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Core placements in Reliance, ONGC, refineries'] },
      { id: 'iitm-btech-civil', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech குடிசார் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Strong focus on sustainable infrastructure', 'GATE preparation support for PSUs'] },
      { id: 'iitm-btech-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Highest placement packages (₹50L+ avg)', 'Strong AI/ML research ecosystem', 'Top recruiters: Google, Microsoft, Amazon'] },
      { id: 'iitm-btech-electrical', name: 'B.Tech Electrical Engineering', nameTamil: 'B.Tech மின் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Focus on Power Systems, VLSI, Control Systems'] },
      { id: 'iitm-btech-engphy', name: 'B.Tech Engineering Physics', nameTamil: 'B.Tech பொறியியல் இயற்பியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Interdisciplinary: Physics + Engineering', 'Research-oriented curriculum'] },
      { id: 'iitm-btech-mechanical', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரப் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Core manufacturing & automotive placements', 'Strong research in robotics, thermal systems'] },
      { id: 'iitm-btech-metallurgy', name: 'B.Tech Metallurgical & Materials Engineering', nameTamil: 'B.Tech உலோகவியல் & பொருட்கள் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Placements in Steel, Aerospace materials sectors', 'Research in nanomaterials, composites'] },
      { id: 'iitm-btech-naval', name: 'B.Tech Naval Architecture & Ocean Engineering', nameTamil: 'B.Tech கப்பல் கட்டடக்கலை & கடல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Unique course for shipbuilding industry', 'Collaborations with Indian Navy, shipyards'] },

      // ========== DUAL DEGREE (B.Tech + M.Tech - 5 Years) ==========
      { id: 'iitm-dd-bioeng', name: 'Dual Degree (B.Tech + M.Tech) Biological Engineering', nameTamil: 'இரட்டை பட்டம் (B.Tech + M.Tech) உயிரியல் பொறியியல்', type: 'Integrated', category: 'On-Campus', school: 'Engineering', duration: '5 Years', eligibility: 'JEE Advanced qualified, 12th PCM/PCB', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Biotech + Engineering interdisciplinary', 'Research in biopharma, medical devices'] },
      { id: 'iitm-dd-design', name: 'Dual Degree (B.Tech + M.Tech) Engineering Design', nameTamil: 'இரட்டை பட்டம் (B.Tech + M.Tech) பொறியியல் வடிவமைப்பு', type: 'Integrated', category: 'On-Campus', school: 'Engineering', duration: '5 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Product design + Engineering', 'Industry-linked capstone projects'] },

      // ========== BS PROGRAMS (4 Years) ==========
      { id: 'iitm-bs-medical', name: 'BS Medical Sciences & Engineering', nameTamil: 'BS மருத்துவ அறிவியல் & பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Interdisciplinary', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM/PCB', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['NEW program combining medicine & engineering', 'Focus on medical devices, healthcare tech'] },
      { id: 'iitm-bs-electronic', name: 'BS Electronic Systems', nameTamil: 'BS மின்னணு அமைப்புகள்', type: 'UG', category: 'On-Campus', school: 'Interdisciplinary', duration: '4 Years', eligibility: 'JEE Advanced qualified, 12th PCM', examPattern: { totalQuestions: 54, totalMarks: 180, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['NEW program for electronics specialization', 'Industry-oriented curriculum'] },

      // ========== ONLINE DEGREE ==========
      { id: 'iitm-bs-online-ds', name: 'BS in Data Science and Applications (Online)', nameTamil: 'BS தரவு அறிவியல் & பயன்பாடுகள் (ஆன்லைன்)', type: 'UG', category: 'DDE', school: 'Online Education', duration: '3-6 Years (Flexible)', eligibility: '12th Pass (Any Stream) - Open to all ages', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Semester Exams', durationMinutes: 0, mode: 'Online Proctored', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ["World's first online degree from an IIT", 'Open to working professionals & students', 'Affordable: ~₹30,000 per term', 'Exit options: Certificate, Diploma, Degree'] },

      // ========== POSTGRADUATE (M.Tech) ==========
      { id: 'iitm-mtech-cse', name: 'M.Tech Computer Science & Engineering', nameTamil: 'M.Tech கணினி அறிவியல் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Specializations in AI/ML, Systems, Theory', 'Research-focused curriculum'] },
      { id: 'iitm-mtech-vlsi', name: 'M.Tech VLSI Design', nameTamil: 'M.Tech VLSI வடிவமைப்பு', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE (ECE/EEE) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Semiconductor industry placements', 'Collaboration with chip design companies'] },
      { id: 'iitm-mtech-clinical', name: 'M.Tech Clinical Engineering', nameTamil: 'M.Tech மருத்துவ பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Interdisciplinary', duration: '2 Years', eligibility: 'B.Tech/BE/MBBS + GATE/Valid Score', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Healthcare technology focus', 'Hospital equipment management'] },

      // ========== M.Sc. (2 Years) ==========
      { id: 'iitm-msc-math', name: 'M.Sc. Mathematics', nameTamil: 'M.Sc. கணிதம்', type: 'PG', category: 'On-Campus', school: 'Sciences', duration: '2 Years', eligibility: 'B.Sc. Mathematics + JAM qualified', examPattern: { totalQuestions: 60, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in Pure/Applied Mathematics', 'Path to Ph.D. and academia'] },
      { id: 'iitm-msc-physics', name: 'M.Sc. Physics', nameTamil: 'M.Sc. இயற்பியல்', type: 'PG', category: 'On-Campus', school: 'Sciences', duration: '2 Years', eligibility: 'B.Sc. Physics + JAM qualified', examPattern: { totalQuestions: 60, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in Quantum, Condensed Matter', 'Collaboration with ISRO, BARC'] },
      { id: 'iitm-msc-chemistry', name: 'M.Sc. Chemistry', nameTamil: 'M.Sc. வேதியியல்', type: 'PG', category: 'On-Campus', school: 'Sciences', duration: '2 Years', eligibility: 'B.Sc. Chemistry + JAM qualified', examPattern: { totalQuestions: 60, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in materials, catalysis', 'Industry-linked projects'] },

      // ========== M.A. (2 Years) ==========
      { id: 'iitm-ma-development', name: 'M.A. Development Studies', nameTamil: 'M.A. வளர்ச்சி ஆய்வுகள்', type: 'PG', category: 'On-Campus', school: 'Humanities & Social Sciences', duration: '2 Years', eligibility: 'Graduation in any discipline', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Policy research & development economics', 'NGO and public sector careers'] },
      { id: 'iitm-ma-english', name: 'M.A. English Studies', nameTamil: 'M.A. ஆங்கில ஆய்வுகள்', type: 'PG', category: 'On-Campus', school: 'Humanities & Social Sciences', duration: '2 Years', eligibility: 'Graduation in English/Literature', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Literature and language research', 'Academia and publishing careers'] },
      { id: 'iitm-ma-economics', name: 'M.A. Economics', nameTamil: 'M.A. பொருளாதாரம்', type: 'PG', category: 'On-Campus', school: 'Humanities & Social Sciences', duration: '2 Years', eligibility: 'Graduation with Mathematics/Economics', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Quantitative economics focus', 'Research and policy careers'] },

      // ========== MBA ==========
      { id: 'iitm-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA (வணிக நிர்வாகத் துறை முதுகலை)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', examPattern: { totalQuestions: 66, totalMarks: 198, duration: '2 Hours', durationMinutes: 120, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['DoMS IIT Madras - Premier B-School', 'Strong tech + management blend'] },
      { id: 'iitm-emba', name: 'Executive MBA', nameTamil: 'நிர்வாக MBA', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years (Weekend)', eligibility: 'Graduation + 5+ years work experience', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Interview-based', durationMinutes: 0, mode: 'Interview', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['For working professionals', 'Weekend classes in Chennai'] },

      // ========== RESEARCH ==========
      { id: 'iitm-ms-research', name: 'M.S. (by Research)', nameTamil: 'M.S. (ஆய்வு)', type: 'Research', category: 'On-Campus', school: 'Research', duration: '2-3 Years', eligibility: 'B.Tech/BE/M.Sc. + GATE/Valid Score', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research-focused masters', 'Thesis-based evaluation'] },
      { id: 'iitm-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. (முனைவர் பட்டம்)', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-6 Years', eligibility: 'M.Tech/M.Sc./M.A. + GATE/NET/Valid Score', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Doctoral research in all disciplines', 'Fellowship provided (₹37,000+ per month)'] }
    ]
  },

  // ============================================
  // 2. NATIONAL INSTITUTE OF TECHNOLOGY (NIT) TRICHY
  // ============================================
  // Widely considered the top NIT in India
  {
    id: 'nit-trichy',
    name: 'National Institute of Technology, Tiruchirappalli',
    nameTamil: 'தேசிய தொழில்நுட்ப நிறுவனம், திருச்சிராப்பள்ளி',
    location: 'Tiruchirappalli, Tamil Nadu',
    website: 'https://www.nitt.edu',
    phone: '0431-2503000',
    email: 'registrar@nitt.edu',
    examName: 'JEE Main (UG) / GATE (PG) / CAT (MBA) / NIMCET (MCA)',
    logoColor: '#1E3A8A',
    logo: '/universities/nit-trichy-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026 Application', eventTamil: 'JEE மெயின் 2026 விண்ணப்பம்', date: 'November 2026', status: 'upcoming' },
      { event: 'JEE Main 2026 Exam', eventTamil: 'JEE மெயின் 2026 தேர்வு', date: 'January/April 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' },
      { event: 'GATE 2026 Exam', eventTamil: 'GATE 2026 தேர்வு', date: 'February 2026', status: 'upcoming' }
    ],
    fee: { general: 150000, obc: 150000, scst: 0 },
    courses: [
      // ========== UNDERGRADUATE - B.Tech (4 Years) ==========
      // Admission via JEE Main (JoSAA/CSAB Counselling)
      { id: 'nitt-btech-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Highest demand branch', 'Top IT company placements', 'Minor degrees available in other departments'] },
      { id: 'nitt-btech-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல்தொடர்பு பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Communication systems and VLSI sectors'] },
      { id: 'nitt-btech-eee', name: 'B.Tech Electrical & Electronics Engineering', nameTamil: 'B.Tech மின் & மின்னணுப் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Power sector and electronics'] },
      { id: 'nitt-btech-mechanical', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரப் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Core manufacturing sector'] },
      { id: 'nitt-btech-chemical', name: 'B.Tech Chemical Engineering', nameTamil: 'B.Tech வேதிப் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Core placements in Refineries, Petrochemicals'] },
      { id: 'nitt-btech-civil', name: 'B.Tech Civil Engineering', nameTamil: 'B.Tech குடிசார் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Infrastructure and construction sector'] },
      { id: 'nitt-btech-ice', name: 'B.Tech Instrumentation & Control Engineering', nameTamil: 'B.Tech கருவியியல் & கட்டுப்பாட்டு பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['One of few NITs offering dedicated ICE degree', 'Highly valued in Oil & Gas, Automation industries'] },
      { id: 'nitt-btech-metallurgy', name: 'B.Tech Metallurgical & Materials Engineering', nameTamil: 'B.Tech உலோகவியல் & பொருட்கள் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Steel and materials industry'] },
      { id: 'nitt-btech-production', name: 'B.Tech Production Engineering', nameTamil: 'B.Tech உற்பத்தி பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['One of few NITs offering dedicated Production Engineering', 'Highly valued in Manufacturing industries'] },

      // ========== UNDERGRADUATE - B.Arch (5 Years) ==========
      { id: 'nitt-barch', name: 'B.Arch Architecture', nameTamil: 'B.Arch கட்டடக்கலை', type: 'UG', category: 'On-Campus', school: 'Architecture', duration: '5 Years', eligibility: 'JEE Main Paper-2 (B.Arch) qualified, 12th PCM', examPattern: { totalQuestions: 77, totalMarks: 400, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Architecture design and planning', 'Note: AAT is for IITs only'] },

      // ========== UNDERGRADUATE - ITEP (4 Years) ==========
      // Integrated Teacher Education Programme - Admission via NCET (NTA)
      { id: 'nitt-itep-physics', name: 'B.Sc. B.Ed. (Integrated) - Physics', nameTamil: 'B.Sc. B.Ed. (ஒருங்கிணைந்த) - இயற்பியல்', type: 'UG', category: 'On-Campus', school: 'Education', duration: '4 Years', eligibility: 'NCET qualified, 12th PCM', examPattern: { totalQuestions: 100, totalMarks: 400, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['To produce quality science teachers', 'Admission via NCET conducted by NTA'] },
      { id: 'nitt-itep-chemistry', name: 'B.Sc. B.Ed. (Integrated) - Chemistry', nameTamil: 'B.Sc. B.Ed. (ஒருங்கிணைந்த) - வேதியியல்', type: 'UG', category: 'On-Campus', school: 'Education', duration: '4 Years', eligibility: 'NCET qualified, 12th PCM', examPattern: { totalQuestions: 100, totalMarks: 400, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['To produce quality science teachers', 'Admission via NCET conducted by NTA'] },
      { id: 'nitt-itep-maths', name: 'B.Sc. B.Ed. (Integrated) - Mathematics', nameTamil: 'B.Sc. B.Ed. (ஒருங்கிணைந்த) - கணிதம்', type: 'UG', category: 'On-Campus', school: 'Education', duration: '4 Years', eligibility: 'NCET qualified, 12th PCM', examPattern: { totalQuestions: 100, totalMarks: 400, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['To produce quality mathematics teachers', 'Admission via NCET conducted by NTA'] },

      // ========== POSTGRADUATE - M.Tech (2 Years) ==========
      // Admission via GATE (CCMT Counselling)
      // -- Computer Science Department --
      { id: 'nitt-mtech-cse', name: 'M.Tech Computer Science & Engineering', nameTamil: 'M.Tech கணினி அறிவியல் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Computer Science', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Core CS specialization'] },
      { id: 'nitt-mtech-data', name: 'M.Tech Data Analytics', nameTamil: 'M.Tech தரவு பகுப்பாய்வு', type: 'PG', category: 'On-Campus', school: 'Computer Science', duration: '2 Years', eligibility: 'B.Tech/BE/MCA + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Big data and analytics focus'] },
      // -- Electronics (ECE) Department --
      { id: 'nitt-mtech-comm', name: 'M.Tech Communication Systems', nameTamil: 'M.Tech தகவல்தொடர்பு அமைப்புகள்', type: 'PG', category: 'On-Campus', school: 'Electronics (ECE)', duration: '2 Years', eligibility: 'B.Tech/BE (ECE/EEE) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Wireless, 5G, Signal Processing'] },
      { id: 'nitt-mtech-vlsi', name: 'M.Tech VLSI Systems', nameTamil: 'M.Tech VLSI அமைப்புகள்', type: 'PG', category: 'On-Campus', school: 'Electronics (ECE)', duration: '2 Years', eligibility: 'B.Tech/BE (ECE/EEE) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Chip design and semiconductor'] },
      // -- Electrical (EEE) Department --
      { id: 'nitt-mtech-power-sys', name: 'M.Tech Power Systems', nameTamil: 'M.Tech மின் அமைப்புகள்', type: 'PG', category: 'On-Campus', school: 'Electrical (EEE)', duration: '2 Years', eligibility: 'B.Tech/BE (EEE) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Power grid and transmission systems'] },
      { id: 'nitt-mtech-power-elec', name: 'M.Tech Power Electronics', nameTamil: 'M.Tech மின்னணு சக்தி', type: 'PG', category: 'On-Campus', school: 'Electrical (EEE)', duration: '2 Years', eligibility: 'B.Tech/BE (EEE/ECE) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['EV, Drives, Power converters'] },
      // -- Mechanical Department --
      { id: 'nitt-mtech-thermal', name: 'M.Tech Thermal Power Engineering', nameTamil: 'M.Tech வெப்ப சக்தி பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Mechanical', duration: '2 Years', eligibility: 'B.Tech/BE (Mechanical) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Thermal systems, power plants'] },
      { id: 'nitt-mtech-safety', name: 'M.Tech Industrial Safety Engineering', nameTamil: 'M.Tech தொழில்துறை பாதுகாப்பு பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Mechanical', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Safety management in industries'] },
      // -- Production Department --
      { id: 'nitt-mtech-manufacturing', name: 'M.Tech Manufacturing Technology', nameTamil: 'M.Tech உற்பத்தி தொழில்நுட்பம்', type: 'PG', category: 'On-Campus', school: 'Production', duration: '2 Years', eligibility: 'B.Tech/BE (Mech/Prod) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Advanced manufacturing processes'] },
      { id: 'nitt-mtech-iem', name: 'M.Tech Industrial Engineering & Management', nameTamil: 'M.Tech தொழில்துறை பொறியியல் & மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Production', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Operations research, supply chain'] },
      // -- Civil Department --
      { id: 'nitt-mtech-transport', name: 'M.Tech Transportation Engineering & Management', nameTamil: 'M.Tech போக்குவரத்து பொறியியல் & மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Civil', duration: '2 Years', eligibility: 'B.Tech/BE (Civil) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Highway, traffic engineering'] },
      { id: 'nitt-mtech-structural', name: 'M.Tech Structural Engineering', nameTamil: 'M.Tech கட்டமைப்பு பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Civil', duration: '2 Years', eligibility: 'B.Tech/BE (Civil) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Design of structures, earthquake engineering'] },
      { id: 'nitt-mtech-env', name: 'M.Tech Environmental Engineering', nameTamil: 'M.Tech சுற்றுச்சூழல் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Civil', duration: '2 Years', eligibility: 'B.Tech/BE (Civil/Env) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Water, waste management'] },
      { id: 'nitt-mtech-ctm', name: 'M.Tech Construction Technology & Management', nameTamil: 'M.Tech கட்டுமான தொழில்நுட்பம் & மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Civil', duration: '2 Years', eligibility: 'B.Tech/BE (Civil) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Project management, construction'] },
      { id: 'nitt-mtech-geotech', name: 'M.Tech Geotechnical Engineering', nameTamil: 'M.Tech புவித்தொழில்நுட்ப பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Civil', duration: '2 Years', eligibility: 'B.Tech/BE (Civil) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Soil mechanics, foundation engineering'] },
      // -- Chemical Department --
      { id: 'nitt-mtech-chem', name: 'M.Tech Chemical Engineering', nameTamil: 'M.Tech வேதிப் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Chemical', duration: '2 Years', eligibility: 'B.Tech/BE (Chemical) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Process design, reaction engineering'] },
      { id: 'nitt-mtech-pci', name: 'M.Tech Process Control & Instrumentation', nameTamil: 'M.Tech செயல்முறை கட்டுப்பாடு & கருவியியல்', type: 'PG', category: 'On-Campus', school: 'Chemical', duration: '2 Years', eligibility: 'B.Tech/BE (Chemical/ICE) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Process automation, control systems'] },
      // -- Energy Department --
      { id: 'nitt-mtech-energy', name: 'M.Tech Energy Engineering', nameTamil: 'M.Tech ஆற்றல் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Energy', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Renewable energy and sustainability'] },
      // -- Instrumentation Department --
      { id: 'nitt-mtech-automation', name: 'M.Tech Industrial Automation', nameTamil: 'M.Tech தொழில்துறை தானியங்கி', type: 'PG', category: 'On-Campus', school: 'Instrumentation', duration: '2 Years', eligibility: 'B.Tech/BE (ICE/EEE/ECE) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['NEW/Interdisciplinary program', 'Industry 4.0, Robotics'] },
      // -- Physics Department --
      { id: 'nitt-mtech-ndt', name: 'M.Tech Non-Destructive Testing (NDT)', nameTamil: 'M.Tech அழிவில்லா சோதனை (NDT)', type: 'PG', category: 'On-Campus', school: 'Physics', duration: '2 Years', eligibility: 'B.Tech/BE/M.Sc. (Physics) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Quality testing without damage', 'Aerospace, nuclear industry demand'] },

      // ========== POSTGRADUATE - M.Arch (2 Years) ==========
      { id: 'nitt-march', name: 'M.Arch Energy Efficient & Sustainable Architecture', nameTamil: 'M.Arch ஆற்றல் திறன் & நிலையான கட்டடக்கலை', type: 'PG', category: 'On-Campus', school: 'Architecture', duration: '2 Years', eligibility: 'B.Arch + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Green building design'] },

      // ========== POSTGRADUATE - M.Sc. (2 Years) ==========
      // Admission via IIT JAM (CCMN Counselling)
      { id: 'nitt-msc-cs', name: 'M.Sc. Computer Science', nameTamil: 'M.Sc. கணினி அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Sciences', duration: '2 Years', eligibility: 'B.Sc. CS/IT/Maths + JAM qualified', examPattern: { totalQuestions: 60, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Theoretical CS and programming'] },
      { id: 'nitt-msc-chemistry', name: 'M.Sc. Chemistry', nameTamil: 'M.Sc. வேதியியல்', type: 'PG', category: 'On-Campus', school: 'Sciences', duration: '2 Years', eligibility: 'B.Sc. Chemistry + JAM qualified', examPattern: { totalQuestions: 60, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in chemical sciences'] },
      { id: 'nitt-msc-physics', name: 'M.Sc. Physics', nameTamil: 'M.Sc. இயற்பியல்', type: 'PG', category: 'On-Campus', school: 'Sciences', duration: '2 Years', eligibility: 'B.Sc. Physics + JAM qualified', examPattern: { totalQuestions: 60, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Condensed matter and applied physics'] },
      { id: 'nitt-msc-maths', name: 'M.Sc. Mathematics', nameTamil: 'M.Sc. கணிதம்', type: 'PG', category: 'On-Campus', school: 'Sciences', duration: '2 Years', eligibility: 'B.Sc. Mathematics + JAM qualified', examPattern: { totalQuestions: 60, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Pure and applied mathematics'] },

      // ========== POSTGRADUATE - Management & Humanities ==========
      { id: 'nitt-mba', name: 'MBA (Master of Business Administration)', nameTamil: 'MBA (வணிக நிர்வாக முதுகலை)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT qualified', examPattern: { totalQuestions: 66, totalMarks: 198, duration: '2 Hours', durationMinutes: 120, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Management + Technology blend', 'Strong industry connect'] },
      { id: 'nitt-ma-english', name: 'M.A. English (Language and Literature)', nameTamil: 'M.A. ஆங்கிலம் (மொழி மற்றும் இலக்கியம்)', type: 'PG', category: 'On-Campus', school: 'Humanities', duration: '2 Years', eligibility: 'Graduation + CUET-PG qualified', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Language and literature studies', 'Admission via CUET-PG'] },
      { id: 'nitt-mca', name: 'MCA (Master of Computer Applications)', nameTamil: 'MCA (கணினி பயன்பாடுகள் முதுகலை)', type: 'PG', category: 'On-Campus', school: 'Computer Applications', duration: '2 Years', eligibility: 'BCA/B.Sc. CS + NIMCET qualified', examPattern: { totalQuestions: 120, totalMarks: 480, duration: '2 Hours', durationMinutes: 120, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Software development focus', 'Strictly via NIMCET rank'] },

      // ========== RESEARCH PROGRAMMES ==========
      // M.S. (by Research) - Available in all Engineering departments
      { id: 'nitt-ms-research', name: 'M.S. (by Research)', nameTamil: 'M.S. (ஆய்வு மூலம்)', type: 'Research', category: 'On-Campus', school: 'Research', duration: '2-3 Years', eligibility: 'B.Tech/BE + GATE/Valid Score', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research-heavy (unlike M.Tech which is course-heavy)', 'Ideal for pursuing Ph.D. or R&D roles', 'Available in all Engineering departments'] },
      // Ph.D. - Available across all departments
      { id: 'nitt-phd', name: 'Ph.D. (Doctor of Philosophy)', nameTamil: 'Ph.D. (முனைவர் பட்டம்)', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-6 Years', eligibility: 'M.Tech/M.Sc./M.A./MBA + GATE/NET/Valid Score', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Available in: All Engineering (Civil, Mech, CSE, EEE, ECE, ICE, Chem, Prod, MME)', 'Sciences (Maths, Physics, Chemistry)', 'Humanities (English, Economics)', 'Management, Computer Applications, Energy & Environment'] }
    ]
  },

  // ============================================
  // 3. INDIAN INSTITUTE OF MANAGEMENT (IIM) TRICHY
  // ============================================
  // Premier "Second Generation" IIM, renowned for academic rigour
  {
    id: 'iim-trichy',
    name: 'Indian Institute of Management Tiruchirappalli',
    nameTamil: 'இந்திய மேலாண்மை நிறுவனம் திருச்சிராப்பள்ளி',
    location: 'Tiruchirappalli, Tamil Nadu',
    website: 'https://www.iimtrichy.ac.in',
    phone: '0431-2505000',
    email: 'pgpadmissions@iimtrichy.ac.in',
    examName: 'CAT (Common Admission Test)',
    logoColor: '#8B0000',
    logo: '/universities/iim-trichy-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'CAT 2026 Exam', eventTamil: 'CAT 2026 தேர்வு', date: 'November 2026', status: 'upcoming' },
      { event: 'CAT 2026 Results', eventTamil: 'CAT 2026 முடிவுகள்', date: 'January 2026', status: 'upcoming' },
      { event: 'PGPM/PGPM-HR Interviews', eventTamil: 'PGPM/PGPM-HR நேர்காணல்கள்', date: 'February-March 2026', status: 'upcoming' },
      { event: 'Academic Session Begins', eventTamil: 'கல்வி அமர்வு தொடக்கம்', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 2200000, obc: 2200000, scst: 1100000 },
    courses: [
      // ========== 1. FLAGSHIP RESIDENTIAL PROGRAMMES (Full-Time MBA) ==========
      // Admission strictly through CAT (Common Admission Test)
      { 
        id: 'iimt-pgpm', 
        name: 'PGPM (Post Graduate Programme in Management)', 
        nameTamil: 'PGPM (மேலாண்மை முதுகலை திட்டம்)', 
        type: 'PG', 
        category: 'On-Campus', 
        school: 'Management', 
        duration: '2 Years (Residential)', 
        eligibility: 'Graduation (any discipline) + CAT qualified', 
        examPattern: { 
          totalQuestions: 66, 
          totalMarks: 198, 
          duration: '2 Hours', 
          durationMinutes: 120, 
          mode: 'Online (CBT)', 
          negativeMarking: true, 
          sections: [
            { name: 'VARC (Verbal Ability & Reading Comprehension)', nameTamil: 'வாசிப்பு புரிதல் & சொல் திறன்', questions: 24, marks: 72, topics: ['Reading Comprehension', 'Para Jumbles', 'Para Summary', 'Sentence Correction'] }, 
            { name: 'DILR (Data Interpretation & Logical Reasoning)', nameTamil: 'தரவு விளக்கம் & தர்க்க ரீதியான பகுத்தறிவு', questions: 20, marks: 60, topics: ['Tables', 'Charts', 'Graphs', 'Puzzles', 'Arrangements'] }, 
            { name: 'QA (Quantitative Aptitude)', nameTamil: 'அளவு திறன்', questions: 22, marks: 66, topics: ['Arithmetic', 'Algebra', 'Geometry', 'Number System', 'Modern Maths'] }
          ] 
        }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: [
          '🎓 Flagship 2-Year MBA (Master of Business Administration)',
          '📊 Specializations: Finance, Marketing, Operations, Strategy, IT & Analytics, OB/HR',
          '💰 Median package: ₹18+ LPA | Top packages: ₹35+ LPA',
          '🏢 Top recruiters: McKinsey, BCG, Goldman Sachs, Amazon, Deloitte'
        ] 
      },
      { 
        id: 'iimt-pgpm-hr', 
        name: 'PGPM-HR (Human Resources Specialization)', 
        nameTamil: 'PGPM-HR (மனிதவள மேலாண்மை நிபுணத்துவம்)', 
        type: 'PG', 
        category: 'On-Campus', 
        school: 'Management', 
        duration: '2 Years (Residential)', 
        eligibility: 'Graduation + CAT qualified', 
        examPattern: { 
          totalQuestions: 66, 
          totalMarks: 198, 
          duration: '2 Hours', 
          durationMinutes: 120, 
          mode: 'Online (CBT)', 
          negativeMarking: true, 
          sections: [] 
        }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: [
          '👥 Specialized MBA dedicated entirely to Human Resources',
          '📋 DIFFERENCE: Unlike general PGPM where HR is an elective, this is a full HR program',
          '🏢 HR Leadership roles in Fortune 500 companies',
          '💼 Admission: CAT Score + Personal Interview (PI)'
        ] 
      },

      // ========== 2. EXECUTIVE PROGRAMME (Chennai Campus) ==========
      // Satellite campus at Chennai (Ekkattuthangal) for working professionals
      { 
        id: 'iimt-pgpbm', 
        name: 'PGPBM (Executive MBA - Chennai Campus)', 
        nameTamil: 'PGPBM (நிர்வாக MBA - சென்னை வளாகம்)', 
        type: 'PG', 
        category: 'On-Campus', 
        school: 'Executive Education', 
        duration: '2 Years (Weekend Classes)', 
        eligibility: 'Graduation + 3+ years work experience + IIMT Written Test/CAT/GMAT score', 
        examPattern: { 
          totalQuestions: 0, 
          totalMarks: 100, 
          duration: 'Written Test (by IIMT) OR CAT/GMAT + Interview', 
          durationMinutes: 0, 
          mode: 'Interview', 
          negativeMarking: false, 
          sections: [] 
        }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: [
          '🏢 CHENNAI CAMPUS: Dedicated satellite campus at Ekkattuthangal',
          '📅 Format: Weekend classes (Saturdays & Sundays)',
          '🎓 Degree: Full MBA (Master of Business Administration) from IIM',
          '💡 WHY POPULAR: Get an IIM Degree without quitting your job!',
          '👔 Target: Working executives with 3+ years experience'
        ] 
      },

      // ========== 3. DOCTORAL PROGRAMMES (Research) ==========
      { 
        id: 'iimt-dpm', 
        name: 'DPM (Doctoral Programme in Management)', 
        nameTamil: 'DPM (மேலாண்மை முனைவர் திட்டம்)', 
        type: 'Research', 
        category: 'On-Campus', 
        school: 'Research', 
        duration: '4-5 Years (Full-Time, Residential)', 
        eligibility: 'PG degree + CAT/GMAT/GRE/GATE/UGC-JRF score', 
        examPattern: { 
          totalQuestions: 0, 
          totalMarks: 100, 
          duration: 'Written Test + Research Proposal + Interview', 
          durationMinutes: 0, 
          mode: 'Offline', 
          negativeMarking: false, 
          sections: [] 
        }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: [
          '🎓 Full-time Ph.D. in Management (Residential)',
          '💰 Stipend: ₹30,000 - ₹35,000/month + No tuition fee',
          '📚 Specializations: Economics, Finance, Marketing, Strategy, Operations, IT, OB & HR',
          '🎯 Ideal for: Academia, consulting, senior research roles'
        ] 
      },
      { 
        id: 'iimt-edpm', 
        name: 'E-DPM (Executive Doctoral Programme)', 
        nameTamil: 'E-DPM (நிர்வாக முனைவர் திட்டம்)', 
        type: 'Research', 
        category: 'On-Campus', 
        school: 'Research', 
        duration: '4-6 Years (Part-Time)', 
        eligibility: 'PG degree + 10+ years senior executive experience', 
        examPattern: { 
          totalQuestions: 0, 
          totalMarks: 100, 
          duration: 'Application Review + Interview', 
          durationMinutes: 0, 
          mode: 'Hybrid', 
          negativeMarking: false, 
          sections: [] 
        }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: [
          '👔 Part-time Ph.D. for Senior Executives',
          '🎯 Target: Working professionals with 10+ years experience',
          '📅 Format: Campus visits once per term; rest is remote research',
          '💼 Goal: Move into teaching or senior advisory/research roles'
        ] 
      },

      // ========== 4. LONG DURATION CERTIFICATE PROGRAMMES (Hybrid/Online) ==========
      // 6-month to 1-year certification courses for upskilling
      { 
        id: 'iimt-cert-shrm', 
        name: 'PG Certificate in Strategic Human Resource Management', 
        nameTamil: 'PG சான்றிதழ் மூலோபாய மனிதவள மேலாண்மை', 
        type: 'Certificate', 
        category: 'DDE', 
        school: 'Executive Education', 
        duration: '1 Year (Hybrid)', 
        eligibility: 'Graduation + Work Experience', 
        examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Online Modules + Campus Sessions', durationMinutes: 0, mode: 'Hybrid', negativeMarking: false, sections: [] }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: ['HR strategy and leadership skills', 'Online + Campus hybrid format'] 
      },
      { 
        id: 'iimt-cert-pcsm', 
        name: 'PG Certificate in Senior Management (PCSM)', 
        nameTamil: 'PG சான்றிதழ் மூத்த மேலாண்மை', 
        type: 'Certificate', 
        category: 'DDE', 
        school: 'Executive Education', 
        duration: '1 Year (Hybrid)', 
        eligibility: 'Graduation + Work Experience', 
        examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Online Modules + Campus Sessions', durationMinutes: 0, mode: 'Hybrid', negativeMarking: false, sections: [] }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: ['General management for senior roles', 'Strategic leadership focus'] 
      },
      { 
        id: 'iimt-cert-scm', 
        name: 'PG Certificate in Supply Chain Management', 
        nameTamil: 'PG சான்றிதழ் விநியோக சங்கிலி மேலாண்மை', 
        type: 'Certificate', 
        category: 'DDE', 
        school: 'Executive Education', 
        duration: '6-12 Months (Hybrid)', 
        eligibility: 'Graduation + Work Experience', 
        examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Online Modules', durationMinutes: 0, mode: 'Hybrid', negativeMarking: false, sections: [] }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: ['Operations and logistics management', 'Industry-relevant curriculum'] 
      },
      { 
        id: 'iimt-cert-mma', 
        name: 'PG Certificate in Manufacturing Management & Analytics', 
        nameTamil: 'PG சான்றிதழ் உற்பத்தி மேலாண்மை & பகுப்பாய்வு', 
        type: 'Certificate', 
        category: 'DDE', 
        school: 'Executive Education', 
        duration: '6-12 Months (Hybrid)', 
        eligibility: 'Graduation in Engineering/Science + Work Experience', 
        examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Online Modules', durationMinutes: 0, mode: 'Hybrid', negativeMarking: false, sections: [] }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: ['For manufacturing sector professionals', 'Analytics-driven operations'] 
      },
      { 
        id: 'iimt-cert-bfsi', 
        name: 'PG Certificate in Banking & Financial Services', 
        nameTamil: 'PG சான்றிதழ் வங்கி & நிதி சேவைகள்', 
        type: 'Certificate', 
        category: 'DDE', 
        school: 'Executive Education', 
        duration: '6-12 Months (Hybrid)', 
        eligibility: 'Graduation + Work Experience in BFSI', 
        examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Online Modules', durationMinutes: 0, mode: 'Hybrid', negativeMarking: false, sections: [] }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: ['Banking sector upskilling', 'Financial services expertise'] 
      },
      { 
        id: 'iimt-cert-dm', 
        name: 'Certificate in Digital Marketing & Analytics', 
        nameTamil: 'சான்றிதழ் டிஜிட்டல் மார்க்கெட்டிங் & பகுப்பாய்வு', 
        type: 'Certificate', 
        category: 'DDE', 
        school: 'Executive Education', 
        duration: '6 Months (Online)', 
        eligibility: 'Graduation', 
        examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Online Modules', durationMinutes: 0, mode: 'Online', negativeMarking: false, sections: [] }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: ['Digital marketing strategy', 'Marketing analytics skills'] 
      },
      { 
        id: 'iimt-cert-ba', 
        name: 'Certificate in Business Analytics & Applications', 
        nameTamil: 'சான்றிதழ் வணிக பகுப்பாய்வு & பயன்பாடுகள்', 
        type: 'Certificate', 
        category: 'DDE', 
        school: 'Executive Education', 
        duration: '6 Months (Online)', 
        eligibility: 'Graduation', 
        examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Online Modules', durationMinutes: 0, mode: 'Online', negativeMarking: false, sections: [] }, 
        syllabus: [], 
        previousQuestions: [], 
        tips: ['Data-driven decision making', 'Business intelligence skills'] 
      }
    ]
  },

  // ============================================
  // 5. INDIAN MARITIME UNIVERSITY (IMU), CHENNAI
  // ============================================
  {
    id: 'imu-chennai',
    name: 'Indian Maritime University',
    nameTamil: 'இந்திய கடல்சார் பல்கலைக்கழகம்',
    location: 'Chennai, Tamil Nadu',
    website: 'https://www.imu.edu.in',
    phone: '044-24538433',
    email: 'admission@imu.edu.in',
    examName: 'IMU-CET (UG) / GATE/CAT (PG)',
    logoColor: '#003366',
    logo: '/universities/imu-chennai-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'IMU-CET 2026 Application', eventTamil: 'IMU-CET 2026 விண்ணப்பம்', date: 'March 2026', status: 'upcoming' },
      { event: 'IMU-CET 2026 Exam', eventTamil: 'IMU-CET 2026 தேர்வு', date: 'May 2026', status: 'upcoming' },
      { event: 'Counselling', eventTamil: 'கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 280000, obc: 280000, scst: 140000 },
    courses: [
      // ========== UNDERGRADUATE ==========
      { id: 'imu-btech-marine', name: 'B.Tech Marine Engineering', nameTamil: 'B.Tech கடல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'IMU-CET qualified, 12th PCM (60%)', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: false, sections: [{ name: 'Mathematics', nameTamil: 'கணிதம்', questions: 50, marks: 50, topics: ['Calculus', 'Algebra', 'Trigonometry'] }, { name: 'Physics', nameTamil: 'இயற்பியல்', questions: 50, marks: 50, topics: ['Mechanics', 'Thermodynamics', 'Waves'] }, { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 25, marks: 25, topics: ['Physical', 'Organic', 'Inorganic'] }, { name: 'English', nameTamil: 'ஆங்கிலம்', questions: 25, marks: 25, topics: ['Comprehension', 'Grammar', 'Vocabulary'] }, { name: 'General Aptitude', nameTamil: 'பொது திறன்', questions: 50, marks: 50, topics: ['Reasoning', 'GK', 'Maritime Awareness'] }] }, syllabus: [], previousQuestions: [], tips: ['Training to become Ship Engineers', 'High-paying merchant navy career', 'On-board training mandatory'] },
      { id: 'imu-btech-naval', name: 'B.Tech Naval Architecture & Ocean Engineering', nameTamil: 'B.Tech கப்பல் கட்டடக்கலை & கடல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'IMU-CET qualified, 12th PCM', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Shipbuilding and design', 'Placements in shipyards, ports'] },
      { id: 'imu-bsc-nautical', name: 'B.Sc. Nautical Science', nameTamil: 'B.Sc. கடற்பயண அறிவியல்', type: 'UG', category: 'On-Campus', school: 'Nautical Sciences', duration: '3 Years + 1 Year On-Board Training', eligibility: 'IMU-CET qualified, 12th PCM (60%), Medical Fitness', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Training to become Ship Captains', 'High salary (₹50L+ as Captain)', 'Vision: 6/6 without glasses required'] },
      { id: 'imu-bba-logistics', name: 'BBA Logistics, Retailing & E-Commerce', nameTamil: 'BBA தளவாடம், சில்லறை விற்பனை & மின்வணிகம்', type: 'UG', category: 'On-Campus', school: 'Management', duration: '3 Years', eligibility: 'IMU-CET qualified, 12th Pass (50%)', examPattern: { totalQuestions: 200, totalMarks: 200, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Supply chain management', 'E-commerce sector careers'] },
      // ========== POSTGRADUATE ==========
      { id: 'imu-mba-itl', name: 'MBA International Transportation & Logistics', nameTamil: 'MBA சர்வதேச போக்குவரத்து & தளவாடம்', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT/MAT/GMAT qualified', examPattern: { totalQuestions: 66, totalMarks: 198, duration: '2 Hours', durationMinutes: 120, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Maritime logistics specialization', 'Global shipping industry careers'] },
      { id: 'imu-mba-psm', name: 'MBA Port & Shipping Management', nameTamil: 'MBA துறைமுகம் & கப்பல் மேலாண்மை', type: 'PG', category: 'On-Campus', school: 'Management', duration: '2 Years', eligibility: 'Graduation + CAT/MAT/GMAT qualified', examPattern: { totalQuestions: 66, totalMarks: 198, duration: '2 Hours', durationMinutes: 120, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Port operations management', 'Shipping company placements'] },
      { id: 'imu-mtech-naoe', name: 'M.Tech Naval Architecture & Ocean Engineering', nameTamil: 'M.Tech கப்பல் கட்டடக்கலை & கடல் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Advanced shipbuilding', 'Research in ocean engineering'] },
      { id: 'imu-mtech-dredging', name: 'M.Tech Dredging & Harbour Engineering', nameTamil: 'M.Tech துறைமுக & கடலோரப் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech (Civil/Mechanical) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Port infrastructure', 'Coastal engineering'] }
    ]
  },

  // ============================================
  // 6. IIITDM KANCHEEPURAM
  // ============================================
  {
    id: 'iiitdm-kancheepuram',
    name: 'IIITDM Kancheepuram',
    nameTamil: 'இந்திய தகவல் தொழில்நுட்ப நிறுவனம் (வடிவமைப்பு & உற்பத்தி) காஞ்சிபுரம்',
    location: 'Kancheepuram, Tamil Nadu',
    website: 'https://www.iiitdm.ac.in',
    phone: '044-27476346',
    email: 'admin@iiitdm.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#2E7D32',
    logo: '/universities/iiitdm-kancheepuram-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026 Application', eventTamil: 'JEE மெயின் 2026 விண்ணப்பம்', date: 'November 2026', status: 'upcoming' },
      { event: 'JEE Main 2026 Exam', eventTamil: 'JEE மெயின் 2026 தேர்வு', date: 'January/April 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      // ========== UNDERGRADUATE - B.Tech (4 Years) ==========
      { id: 'iiitdm-btech-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['CSE specialization'] },
      { id: 'iiitdm-btech-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல்தொடர்பு பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['ECE specialization'] },
      { id: 'iiitdm-btech-mech', name: 'B.Tech Mechanical Engineering', nameTamil: 'B.Tech இயந்திரப் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Mechanical specialization'] },
      { id: 'iiitdm-btech-smart', name: 'B.Tech Smart Manufacturing', nameTamil: 'B.Tech திறன் உற்பத்தி', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Manufacturing specialization'] },
      { id: 'iiitdm-btech-ce', name: 'B.Tech Computer Engineering', nameTamil: 'B.Tech கணினி பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Hardware + Software specialization'] },
      { id: 'iiitdm-bdes', name: 'B.Des', nameTamil: 'B.Des வடிவமைப்பு', type: 'UG', category: 'On-Campus', school: 'Design', duration: '4 Years', eligibility: 'JEE Main / UCEED qualified, 12th Pass', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Product Design specialization'] },
      // ========== POSTGRADUATE - M.Tech (2 Years) ==========
      { id: 'iiitdm-mtech-cse', name: 'M.Tech Computer Science & Engineering', nameTamil: 'M.Tech கணினி அறிவியல் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['CSE specialization'] },
      { id: 'iiitdm-mtech-ece', name: 'M.Tech Electronics & Communication', nameTamil: 'M.Tech மின்னணு & தகவல்தொடர்பு', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['ECE specialization'] },
      { id: 'iiitdm-mtech-mech', name: 'M.Tech Mechanical Engineering', nameTamil: 'M.Tech இயந்திரப் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Mechanical specialization'] },
      { id: 'iiitdm-mtech-vlsi', name: 'M.Tech VLSI Design', nameTamil: 'M.Tech VLSI வடிவமைப்பு', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['VLSI specialization'] },
      { id: 'iiitdm-mtech-ds', name: 'M.Tech Data Science', nameTamil: 'M.Tech தரவு அறிவியல்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Data Science specialization'] },
      { id: 'iiitdm-mdes', name: 'M.Des', nameTamil: 'M.Des வடிவமைப்பு', type: 'PG', category: 'On-Campus', school: 'Design', duration: '2 Years', eligibility: 'B.Des/B.Tech + CEED qualified', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'CEED + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Design specialization'] },
      // ========== RESEARCH - Ph.D. (3-5 Years) ==========
      { id: 'iiitdm-phd-cse', name: 'Ph.D. Computer Science', nameTamil: 'Ph.D. கணினி அறிவியல்', type: 'Research', category: 'On-Campus', school: 'Research', duration: '3-5 Years', eligibility: 'M.Tech/M.Sc. + GATE/Valid Score', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in Computer Science'] },
      { id: 'iiitdm-phd-ece', name: 'Ph.D. Electronics', nameTamil: 'Ph.D. மின்னணு', type: 'Research', category: 'On-Campus', school: 'Research', duration: '3-5 Years', eligibility: 'M.Tech/M.Sc. + GATE/Valid Score', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in Electronics'] },
      { id: 'iiitdm-phd-mech', name: 'Ph.D. Mechanical', nameTamil: 'Ph.D. இயந்திர', type: 'Research', category: 'On-Campus', school: 'Research', duration: '3-5 Years', eligibility: 'M.Tech/M.Sc. + GATE/Valid Score', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in Mechanical'] }
    ]
  },

  // ============================================
  // 7. IIIT TRICHY
  // ============================================
  {
    id: 'iiit-trichy',
    name: 'Indian Institute of Information Technology, Tiruchirappalli',
    nameTamil: 'இந்திய தகவல் தொழில்நுட்ப நிறுவனம், திருச்சிராப்பள்ளி',
    location: 'Tiruchirappalli, Tamil Nadu',
    website: 'https://www.iiitt.ac.in',
    phone: '0431-2500355',
    email: 'admin@iiitt.ac.in',
    examName: 'JEE Main (UG) / GATE (PG)',
    logoColor: '#1565C0',
    logo: '/universities/iiit-trichy-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026 Application', eventTamil: 'JEE மெயின் 2026 விண்ணப்பம்', date: 'November 2026', status: 'upcoming' },
      { event: 'JEE Main 2026 Exam', eventTamil: 'JEE மெயின் 2026 தேர்வு', date: 'January/April 2026', status: 'upcoming' },
      { event: 'JoSAA Counselling', eventTamil: 'JoSAA கலந்தாய்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 200000, obc: 200000, scst: 0 },
    courses: [
      // ========== UNDERGRADUATE ==========
      { id: 'iiitt-btech-cse', name: 'B.Tech Computer Science & Engineering', nameTamil: 'B.Tech கணினி அறிவியல் பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Core CSE with AI/ML focus', 'Strong placement record'] },
      { id: 'iiitt-btech-ece', name: 'B.Tech Electronics & Communication Engineering', nameTamil: 'B.Tech மின்னணு & தகவல்தொடர்பு பொறியியல்', type: 'UG', category: 'On-Campus', school: 'Engineering', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Communication and embedded systems'] },
      // ========== POSTGRADUATE ==========
      { id: 'iiitt-mtech-cse', name: 'M.Tech Computer Science & Engineering', nameTamil: 'M.Tech கணினி அறிவியல் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE (CSE/IT) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Advanced computing research'] },
      { id: 'iiitt-mtech-vlsi', name: 'M.Tech VLSI Systems', nameTamil: 'M.Tech VLSI அமைப்புகள்', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE (ECE/EEE) + GATE qualified', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Chip design specialization'] },
      { id: 'iiitt-phd', name: 'Ph.D. (Engineering & Humanities)', nameTamil: 'Ph.D. (பொறியியல் & மனிதநேயம்)', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-6 Years', eligibility: 'M.Tech/M.Phil + GATE/NET qualified', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Doctoral research programs', 'Fellowship available'] }
    ]
  },

  // ============================================
  // 8. NIFTEM THANJAVUR (formerly IICPT)
  // ============================================
  // Institute of National Importance (INI) under Ministry of Food Processing Industries
  // Best institute in Tamil Nadu for Food Processing and Food Engineering
  {
    id: 'niftem-thanjavur',
    name: 'NIFTEM Thanjavur (formerly IICPT)',
    nameTamil: 'தேசிய உணவு தொழில்நுட்ப நிறுவனம் தஞ்சாவூர் (முன்னர் IICPT)',
    location: 'Thanjavur, Tamil Nadu',
    website: 'https://www.niftem-t.ac.in',
    phone: '04362-228155',
    email: 'admissions@niftem-t.ac.in',
    examName: 'JEE Main (UG) / GATE / NIFTEM-T Entrance (PG)',
    logoColor: '#2E7D32',
    logo: '/universities/niftem-thanjavur-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'JEE Main 2026 Application', eventTamil: 'JEE மெயின் 2026 விண்ணப்பம்', date: 'November 2026', status: 'upcoming' },
      { event: 'JoSAA/CSAB Counselling', eventTamil: 'JoSAA/CSAB கலந்தாய்வு', date: 'June 2026', status: 'upcoming' },
      { event: 'M.Tech GATE Admission', eventTamil: 'M.Tech GATE சேர்க்கை', date: 'April-May 2026', status: 'upcoming' },
      { event: 'Spot Round (if seats available)', eventTamil: 'ஸ்பாட் சுற்று (இடங்கள் இருந்தால்)', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 125000, obc: 125000, scst: 62500 },
    courses: [
      // ========== UNDERGRADUATE - B.Tech (4 Years) ==========
      // Admission strictly via JEE Main Ranks (JoSAA/CSAB Counselling)
      { id: 'niftem-btech-ft', name: 'B.Tech Food Technology', nameTamil: 'B.Tech உணவு தொழில்நுட்பம்', type: 'UG', category: 'On-Campus', school: 'Food Technology', duration: '4 Years', eligibility: 'JEE Main qualified, 12th PCM/PCB (60% aggregate)', examPattern: { totalQuestions: 75, totalMarks: 300, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [{ name: 'Physics', nameTamil: 'இயற்பியல்', questions: 25, marks: 100, topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism'] }, { name: 'Chemistry', nameTamil: 'வேதியியல்', questions: 25, marks: 100, topics: ['Physical', 'Organic', 'Inorganic Chemistry'] }, { name: 'Mathematics', nameTamil: 'கணிதம்', questions: 25, marks: 100, topics: ['Calculus', 'Algebra', 'Statistics'] }] }, syllabus: [], previousQuestions: [], tips: ['~90 Seats available via JoSAA/CSAB', 'Admission similar to NITs and IIITs', 'Spot round if seats remain after JoSAA', 'Excellent placement in Nestle, ITC, Britannia, Amul, Coca-Cola'] },

      // ========== POSTGRADUATE - M.Tech (2 Years) ==========
      // Priority: GATE Score (XL/XE/AG) | Non-GATE: NIFTEM-T Entrance Exam
      // Famous for Pilot Plants (mini-factories) on campus for hands-on learning
      { id: 'niftem-mtech-fpe', name: 'M.Tech Food Process Engineering', nameTamil: 'M.Tech உணவு செயலாக்கப் பொறியியல்', type: 'PG', category: 'On-Campus', school: 'Food Technology', duration: '2 Years', eligibility: 'B.Tech (Food Tech/Chemical/Biotech/Agri Engg) + GATE (XL/XE/AG) or NIFTEM-T Entrance', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Focus: Designing food processing machinery, factory layout, thermal processing', 'Learn on Pilot Plants (mini-factories) on campus', 'Hands-on manufacturing experience'] },
      { id: 'niftem-mtech-fpt', name: 'M.Tech Food Process Technology', nameTamil: 'M.Tech உணவு செயலாக்க தொழில்நுட்பம்', type: 'PG', category: 'On-Campus', school: 'Food Technology', duration: '2 Years', eligibility: 'B.Tech (Food Tech/Chemical/Biotech) + GATE (XL/XE/AG) or NIFTEM-T Entrance', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Focus: Product development, food chemistry, preservation techniques', 'Learn to make jams, juices, dairy products', 'R&D careers in FMCG companies'] },
      { id: 'niftem-mtech-fsqa', name: 'M.Tech Food Safety & Quality Assurance', nameTamil: 'M.Tech உணவு பாதுகாப்பு & தர உத்தரவாதம்', type: 'PG', category: 'On-Campus', school: 'Food Technology', duration: '2 Years', eligibility: 'B.Tech/B.Sc. (Food/Life Sciences) + GATE (XL/XE) or NIFTEM-T Entrance', examPattern: { totalQuestions: 65, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Online (CBT)', negativeMarking: true, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Focus: Food testing, FSSAI regulations, quality control, safety audits', 'NABL-accredited food testing labs on campus', 'Careers as Quality Managers, Food Safety Officers'] },

      // ========== RESEARCH - Ph.D. ==========
      // Admission via GATE/NET or Institute Entrance Exam + Interview
      { id: 'niftem-phd-fpe', name: 'Ph.D. Food Process Engineering', nameTamil: 'Ph.D. உணவு செயலாக்கப் பொறியியல்', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-6 Years', eligibility: 'M.Tech (Food/Related) + GATE/NET or Institute Entrance + Interview', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in food processing machinery and technology', 'Fellowship provided'] },
      { id: 'niftem-phd-fpt', name: 'Ph.D. Food Process Technology', nameTamil: 'Ph.D. உணவு செயலாக்க தொழில்நுட்பம்', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-6 Years', eligibility: 'M.Tech (Food/Related) + GATE/NET or Institute Entrance + Interview', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in product development and preservation', 'Fellowship provided'] },
      { id: 'niftem-phd-fsqa', name: 'Ph.D. Food Safety & Quality Assurance', nameTamil: 'Ph.D. உணவு பாதுகாப்பு & தர உத்தரவாதம்', type: 'Research', category: 'On-Campus', school: 'Research', duration: '4-6 Years', eligibility: 'M.Tech (Food/Related) + GATE/NET or Institute Entrance + Interview', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Research in food safety regulations and testing', 'Fellowship provided'] },

      // ========== SHORT-TERM SKILL TRAINING (For Entrepreneurs) ==========
      // Practical training for people wanting to start food businesses
      { id: 'niftem-cert-bakery', name: 'Certificate in Bakery & Confectionery', nameTamil: 'பேக்கரி & இனிப்பு பயிற்சி சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '1-5 Days', eligibility: 'Open to all (Entrepreneurs, Home bakers, Startups)', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Practical Training', durationMinutes: 0, mode: 'Hands-on Workshop', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Hands-on practical training', 'Use institute machinery to manufacture products', 'For aspiring food entrepreneurs'] },
      { id: 'niftem-cert-dairy', name: 'Certificate in Dairy Processing', nameTamil: 'பால் பதப்படுத்துதல் பயிற்சி சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '1-5 Days', eligibility: 'Open to all', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Practical Training', durationMinutes: 0, mode: 'Hands-on Workshop', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Dairy product manufacturing', 'Incubation center support available'] },
      { id: 'niftem-cert-fvp', name: 'Certificate in Fruit & Vegetable Processing', nameTamil: 'பழம் & காய்கறி பதப்படுத்துதல் சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '1-5 Days', eligibility: 'Open to all', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Practical Training', durationMinutes: 0, mode: 'Hands-on Workshop', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Jams, juices, pickles manufacturing', 'Test your product in the market'] },
      { id: 'niftem-cert-millet', name: 'Certificate in Millet Processing', nameTamil: 'தினை பதப்படுத்துதல் சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '1-5 Days', eligibility: 'Open to all', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Practical Training', durationMinutes: 0, mode: 'Hands-on Workshop', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['HIGH DEMAND: Millet-based products trending', 'Value-added millet foods', 'Government schemes for millet startups'] },
      { id: 'niftem-cert-rte', name: 'Certificate in Ready-to-Eat (RTE) Foods', nameTamil: 'ஆயத்த உணவுகள் (RTE) சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '1-5 Days', eligibility: 'Open to all', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Practical Training', durationMinutes: 0, mode: 'Hands-on Workshop', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Packaged food manufacturing', 'Shelf-life extension techniques'] },
      { id: 'niftem-cert-packaging', name: 'Certificate in Packaging Technology', nameTamil: 'பேக்கேஜிங் தொழில்நுட்ப சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '1-5 Days', eligibility: 'Open to all', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Practical Training', durationMinutes: 0, mode: 'Hands-on Workshop', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Food packaging materials and design', 'Regulatory compliance for packaging'] }
    ]
  },

  // ============================================
  // 9. DAKSHINA BHARAT HINDI PRACHAR SABHA (DBHPS)
  // ============================================
  // Institution of National Importance (Deemed University) by Act of Parliament
  // Two modes: Sabha Exams (Certificate/Diploma) + University Wing (UGC Degrees)
  {
    id: 'dbhps-chennai',
    name: 'Dakshina Bharat Hindi Prachar Sabha',
    nameTamil: 'தக்ஷிண பாரத இந்தி பிரச்சார சபை',
    location: 'Chennai, Tamil Nadu',
    website: 'https://www.dbhpsabha.org',
    phone: '044-24993727',
    email: 'info@dbhpsabha.org',
    examName: 'DBHPS Entrance Exam / Sabha Proficiency Exams',
    logoColor: '#C41E3A',
    logo: '/universities/dbhps-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'Sabha Exams (Session 1)', eventTamil: 'சபா தேர்வுகள் (அமர்வு 1)', date: 'February 2026', status: 'upcoming' },
      { event: 'Sabha Exams (Session 2)', eventTamil: 'சபா தேர்வுகள் (அமர்வு 2)', date: 'August 2026', status: 'upcoming' },
      { event: 'University B.Ed/M.A. Admission', eventTamil: 'பல்கலைக்கழக B.Ed/M.A. சேர்க்கை', date: 'May-June 2026', status: 'upcoming' },
      { event: 'B.Ed. Entrance Exam', eventTamil: 'B.Ed. நுழைவுத் தேர்வு', date: 'June 2026', status: 'upcoming' }
    ],
    fee: { general: 15000, obc: 15000, scst: 7500 },
    courses: [
      // ========== UNIVERSITY WING - TEACHER EDUCATION (UGC Recognized) ==========
      // These degrees are valid for government teacher jobs across India
      { id: 'dbhps-bed', name: 'B.Ed. (Shiksha Snatak) - Hindi Medium', nameTamil: 'B.Ed. (சிக்ஷா ஸ்னாதக்) - இந்தி வழி', type: 'UG', category: 'On-Campus', school: 'Teacher Education', duration: '2 Years', eligibility: 'Graduation (B.A./B.Sc./B.Com) with 50% marks + Hindi as a subject or Sabha Exams', examPattern: { totalQuestions: 100, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Offline', negativeMarking: false, sections: [{ name: 'Hindi Language', nameTamil: 'இந்தி மொழி', questions: 40, marks: 40, topics: ['Grammar', 'Literature', 'Comprehension'] }, { name: 'General Knowledge', nameTamil: 'பொது அறிவு', questions: 30, marks: 30, topics: ['Current Affairs', 'Education', 'History'] }, { name: 'Teaching Aptitude', nameTamil: 'கற்பித்தல் திறன்', questions: 30, marks: 30, topics: ['Pedagogy', 'Child Psychology', 'Teaching Methods'] }] }, syllabus: [], previousQuestions: [], tips: ['HIGHLY POPULAR: Valid for govt teacher jobs across India', 'Entrance Exam held in May/June', 'Hindi medium instruction', 'Best path for becoming Hindi teacher'] },
      { id: 'dbhps-med', name: 'M.Ed. (Shiksha Nishnat)', nameTamil: 'M.Ed. (சிக்ஷா நிஷ்ணத்)', type: 'PG', category: 'On-Campus', school: 'Teacher Education', duration: '2 Years', eligibility: 'B.Ed. with 50% marks', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Advanced teacher training', 'For education research and administration', 'College lecturer eligibility'] },

      // ========== UNIVERSITY WING - POSTGRADUATE (M.A.) ==========
      { id: 'dbhps-ma-hindi', name: 'M.A. Hindi', nameTamil: 'M.A. இந்தி', type: 'PG', category: 'On-Campus', school: 'Hindi Studies', duration: '2 Years', eligibility: 'Graduation (B.A./B.Sc./B.Com) + Rashtrabhasha Praveen OR Hindi as college subject', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test', durationMinutes: 180, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Important: Praveen certificate makes you eligible (no B.A. Hindi needed)', 'Hindi literature and linguistics', 'Path to NET/SET and teaching careers'] },
      { id: 'dbhps-ma-hindi-dde', name: 'M.A. Hindi (Distance Education)', nameTamil: 'M.A. இந்தி (தொலைநிலை கல்வி)', type: 'PG', category: 'DDE', school: 'Hindi Studies', duration: '2 Years', eligibility: 'Graduation + Praveen/Hindi subject', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Term-end Exam', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Distance mode for working professionals', 'Same degree value as regular M.A.', 'Flexible study schedule'] },

      // ========== UNIVERSITY WING - PG DIPLOMA (1 Year) ==========
      { id: 'dbhps-pgd-translation', name: 'PG Diploma in Translation (Anuvad)', nameTamil: 'மொழிபெயர்ப்பு முதுநிலை டிப்ளோமா (அனுவாத்)', type: 'PG Diploma', category: 'On-Campus', school: 'Hindi Studies', duration: '1 Year', eligibility: 'Graduation with Hindi proficiency', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Hindi-English-Tamil translation skills', 'Government and private sector translation jobs', 'Court translator, official translator careers'] },
      { id: 'dbhps-pgd-journalism', name: 'PG Diploma in Journalism (Hindi)', nameTamil: 'பத்திரிகையியல் முதுநிலை டிப்ளோமா (இந்தி)', type: 'PG Diploma', category: 'On-Campus', school: 'Hindi Studies', duration: '1 Year', eligibility: 'Graduation with Hindi proficiency', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Hindi media and journalism', 'Hindi news channels: Aaj Tak, Zee News, ABP', 'Print media: Dainik Bhaskar, Amar Ujala'] },

      // ========== UNIVERSITY WING - RESEARCH ==========
      { id: 'dbhps-mphil', name: 'M.Phil. Hindi', nameTamil: 'M.Phil. இந்தி', type: 'Research', category: 'On-Campus', school: 'Research', duration: '1-2 Years', eligibility: 'M.A. Hindi with 55% marks', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Pre-doctoral research degree', 'Dissertation-based evaluation'] },
      { id: 'dbhps-phd', name: 'Ph.D. Hindi', nameTamil: 'Ph.D. இந்தி', type: 'Research', category: 'On-Campus', school: 'Research', duration: '3-5 Years', eligibility: 'M.A. Hindi with 55% + UGC NET/SLET or M.Phil.', examPattern: { totalQuestions: 0, totalMarks: 100, duration: 'Written Test + Interview', durationMinutes: 0, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Doctoral research in Hindi literature/linguistics', 'Academia and publishing careers', 'Fellowship may be available'] },

      // ========== SABHA EXAMS - 8 LEVELS OF HINDI PROFICIENCY ==========
      // Famous nationwide exams taken by millions of students
      { id: 'dbhps-parichaya', name: 'Parichaya (Level 1 - Basic)', nameTamil: 'பரிச்சய (நிலை 1 - அடிப்படை)', type: 'Certificate', category: 'On-Campus', school: 'Sabha Exams', duration: '6 Months - 1 Year', eligibility: 'Open to all (No prior Hindi knowledge required)', examPattern: { totalQuestions: 0, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Entry level - Kindergarten equivalent', 'Learn Hindi alphabets and basic words', 'Exams held Feb & Aug'] },
      { id: 'dbhps-prathmic', name: 'Prathmic (Level 2 - Primary)', nameTamil: 'பிராத்மிக் (நிலை 2 - ஆரம்ப)', type: 'Certificate', category: 'On-Campus', school: 'Sabha Exams', duration: '6 Months - 1 Year', eligibility: 'Parichaya pass or equivalent', examPattern: { totalQuestions: 0, totalMarks: 100, duration: '2 Hours', durationMinutes: 120, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Primary school level Hindi', 'Basic reading and writing', 'Foundation for higher exams'] },
      { id: 'dbhps-madhyama', name: 'Madhyama (Level 3 - Middle)', nameTamil: 'மத்யமா (நிலை 3 - நடுத்தர)', type: 'Certificate', category: 'On-Campus', school: 'Sabha Exams', duration: '6 Months - 1 Year', eligibility: 'Prathmic pass or equivalent', examPattern: { totalQuestions: 0, totalMarks: 100, duration: '2.5 Hours', durationMinutes: 150, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Middle school level proficiency', 'Grammar and composition introduced'] },
      { id: 'dbhps-rashtrabhasha', name: 'Rashtrabhasha (Level 4 - High School)', nameTamil: 'ராஷ்ட்ரபாஷா (நிலை 4 - உயர்நிலை)', type: 'Certificate', category: 'On-Campus', school: 'Sabha Exams', duration: '1 Year', eligibility: 'Madhyama pass or equivalent', examPattern: { totalQuestions: 0, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['High school level Hindi', 'Advanced grammar and literature', 'Strong foundation for Praveshika'] },
      { id: 'dbhps-praveshika', name: 'Praveshika (Level 5 - 10th Equivalent)', nameTamil: 'பிரவேஷிகா (நிலை 5 - 10ஆம் வகுப்புக்கு இணை)', type: 'Certificate', category: 'On-Campus', school: 'Sabha Exams', duration: '1 Year', eligibility: 'Rashtrabhasha pass or equivalent', examPattern: { totalQuestions: 0, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['IMPORTANT: Equivalent to 10th Standard (Matric)', 'Recognized by government for Hindi proficiency', 'Gateway to Visharad level'] },
      { id: 'dbhps-visharad-p', name: 'Visharad Poorvardh (Level 6 - 11th Equivalent)', nameTamil: 'விஷாரத் பூர்வார்த் (நிலை 6 - 11ஆம் வகுப்புக்கு இணை)', type: 'Diploma', category: 'On-Campus', school: 'Sabha Exams', duration: '1 Year', eligibility: 'Praveshika pass', examPattern: { totalQuestions: 0, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Higher secondary level (Part 1)', 'Literature and advanced grammar'] },
      { id: 'dbhps-visharad-u', name: 'Visharad Uttarardh (Level 7 - 12th Equivalent)', nameTamil: 'விஷாரத் உத்தரார்த் (நிலை 7 - 12ஆம் வகுப்புக்கு இணை)', type: 'Diploma', category: 'On-Campus', school: 'Sabha Exams', duration: '1 Year', eligibility: 'Visharad Poorvardh pass', examPattern: { totalQuestions: 0, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['IMPORTANT: Equivalent to 12th Standard (HSC)', 'Complete Visharad = +2 level proficiency', 'Prepares for Praveen'] },
      { id: 'dbhps-praveen', name: 'Praveen (Level 8 - B.A. Equivalent)', nameTamil: 'பிரவீண் (நிலை 8 - B.A.க்கு இணை)', type: 'Diploma', category: 'On-Campus', school: 'Sabha Exams', duration: '2 Years (Poorvardh + Uttarardh)', eligibility: 'Visharad Uttarardh pass', examPattern: { totalQuestions: 0, totalMarks: 100, duration: '3 Hours', durationMinutes: 180, mode: 'Offline', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['HIGHEST SABHA EXAM: Rashtrabhasha Praveen = B.A. Hindi equivalent', 'Government of India recognition', 'Direct eligibility for M.A. Hindi and B.Ed.', 'Alternative path to graduation for Hindi teachers'] },

      // ========== SKILL COURSES ==========
      { id: 'dbhps-spoken-prelim', name: 'Spoken Hindi (Preliminary)', nameTamil: 'பேச்சு இந்தி (ஆரம்ப)', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '3-6 Months', eligibility: 'Open to all', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Practical Assessment', durationMinutes: 0, mode: 'Oral', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Conversational Hindi for beginners', 'Useful for daily communication', 'No written exam focus'] },
      { id: 'dbhps-spoken-adv', name: 'Spoken Hindi (Advanced)', nameTamil: 'பேச்சு இந்தி (மேம்பட்ட)', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '3-6 Months', eligibility: 'Spoken Hindi Preliminary or equivalent', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Practical Assessment', durationMinutes: 0, mode: 'Oral', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Fluent Hindi conversation', 'Formal and informal speech', 'Interview preparation in Hindi'] },
      { id: 'dbhps-typing', name: 'Certificate in Hindi Typewriting', nameTamil: 'இந்தி தட்டச்சு சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '3-6 Months', eligibility: 'Basic Hindi knowledge', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Practical Typing Test', durationMinutes: 0, mode: 'Computer-based', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Hindi typing on computer/typewriter', 'Government office jobs', 'Data entry in Hindi'] },
      { id: 'dbhps-shorthand', name: 'Certificate in Hindi Shorthand', nameTamil: 'இந்தி சுருக்கெழுத்து சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Skill Training', duration: '6 Months - 1 Year', eligibility: 'Hindi proficiency (Madhyama level recommended)', examPattern: { totalQuestions: 0, totalMarks: 0, duration: 'Dictation Test', durationMinutes: 0, mode: 'Practical', negativeMarking: false, sections: [] }, syllabus: [], previousQuestions: [], tips: ['Stenography in Hindi', 'Court reporter, PA/Steno jobs', 'Government secretariat positions'] }
    ]
  },

  // ============================================
  // 9. DELHI UNIVERSITY
  // ============================================

  // ============================================
  // 10. JAWAHARLAL NEHRU UNIVERSITY (JNU)
  // ============================================

  // ============================================
  // 11. JAMIA MILLIA ISLAMIA
  // ============================================

  // ============================================
  // 12. BANARAS HINDU UNIVERSITY (BHU)
  // ============================================

  // ============================================
  // 13. ALIGARH MUSLIM UNIVERSITY
  // ============================================

  // ============================================
  // 14. UNIVERSITY OF HYDERABAD
  // ============================================

  // ============================================
  // 15. PONDICHERRY UNIVERSITY
  // ============================================

  // ============================================
  // 16. CENTRAL UNIVERSITY OF KERALA
  // ============================================

  // ============================================
  // 17. CENTRAL UNIVERSITY OF KARNATAKA
  // ============================================

  // ============================================
  // 18. CENTRAL UNIVERSITY OF ANDHRA PRADESH
  // ============================================

  // ============================================
  // 19. CENTRAL UNIVERSITY OF PUNJAB
  // ============================================

  // ============================================
  // 20. CENTRAL UNIVERSITY OF RAJASTHAN
  // ============================================

  // ============================================
  // 21. CENTRAL UNIVERSITY OF GUJARAT
  // ============================================

  // ============================================
  // 22. CENTRAL UNIVERSITY OF HARYANA
  // ============================================

  // ============================================
  // 23. CENTRAL UNIVERSITY OF HIMACHAL PRADESH
  // ============================================

  // ============================================
  // 24. CENTRAL UNIVERSITY OF JHARKHAND
  // ============================================

  // ============================================
  // 25. CENTRAL UNIVERSITY OF BIHAR
  // ============================================

  // ============================================
  // 26. CENTRAL UNIVERSITY OF ODISHA
  // ============================================

  // ============================================
  // 27. CENTRAL UNIVERSITY OF KASHMIR
  // ============================================

  // ============================================
  // 28. VISVA-BHARATI UNIVERSITY
  // ============================================

  // ============================================
  // 29. TEZPUR UNIVERSITY
  // ============================================

  // ============================================
  // 30. ASSAM UNIVERSITY
  // ============================================

  // ============================================
  // 31. NORTH EASTERN HILL UNIVERSITY (NEHU)
  // ============================================

  // ============================================
  // 32. MANIPUR UNIVERSITY
  // ============================================

  // ============================================
  // 33. MIZORAM UNIVERSITY
  // ============================================

  // ============================================
  // 34. NAGALAND UNIVERSITY
  // ============================================

  // ============================================
  // 35. TRIPURA UNIVERSITY
  // ============================================

  // ============================================
  // 36. SIKKIM UNIVERSITY
  // ============================================

  // ============================================
  // 37. RAJIV GANDHI UNIVERSITY
  // ============================================

  // ============================================
  // IIT BOMBAY
  // ============================================

  // ============================================
  // IIT DELHI
  // ============================================

  // ============================================
  // IIT KANPUR
  // ============================================

  // ============================================
  // IIT KHARAGPUR
  // ============================================

  // ============================================
  // IIT ROORKEE
  // ============================================

  // ============================================
  // IIT GUWAHATI
  // ============================================

  // ============================================
  // IIT HYDERABAD
  // ============================================

  // ============================================
  // IIT TIRUPATI
  // ============================================

  // ============================================
  // IIT PALAKKAD
  // ============================================

  // ============================================
  // IIT DHARWAD
  // ============================================

  // ============================================
  // IIT INDORE
  // ============================================

  // ============================================
  // IIT BHU VARANASI
  // ============================================

  // ============================================
  // IIT PATNA
  // ============================================

  // ============================================
  // IIT GANDHINAGAR
  // ============================================

  // ============================================
  // IIT JODHPUR
  // ============================================

  // ============================================
  // IIT ROPAR
  // ============================================

  // ============================================
  // IIT BHUBANESWAR
  // ============================================

  // ============================================
  // IIT MANDI
  // ============================================

  // ============================================
  // IIT JAMMU
  // ============================================

  // ============================================
  // IIT BHILAI
  // ============================================

  // ============================================
  // IIT GOA
  // ============================================

  // ============================================
  // IIT DHANBAD (ISM)
  // ============================================

  // ============================================
  // NIT SURATHKAL (NITK)
  // ============================================

  // ============================================
  // NIT WARANGAL
  // ============================================

  // ============================================
  // NIT CALICUT
  // ============================================

  // ============================================
  // NIT ROURKELA
  // ============================================

  // ============================================
  // NIT DURGAPUR
  // ============================================

  // ============================================
  // MNNIT ALLAHABAD
  // ============================================

  // ============================================
  // NIT KURUKSHETRA
  // ============================================

  // ============================================
  // NIT JAMSHEDPUR
  // ============================================

  // ============================================
  // NIT SILCHAR
  // ============================================

  // ============================================
  // NIT HAMIRPUR
  // ============================================

  // ============================================
  // NIT SRINAGAR
  // ============================================

  // ============================================
  // NIT JALANDHAR
  // ============================================

  // ============================================
  // NIT PATNA
  // ============================================

  // ============================================
  // NIT RAIPUR
  // ============================================

  // ============================================
  // NIT AGARTALA
  // ============================================

  // ============================================
  // VNIT NAGPUR
  // ============================================

  // ============================================
  // NIT GOA
  // ============================================

  // ============================================
  // NIT DELHI
  // ============================================

  // ============================================
  // NIT UTTARAKHAND
  // ============================================

  // ============================================
  // NIT MEGHALAYA
  // ============================================

  // ============================================
  // NIT MANIPUR
  // ============================================

  // ============================================
  // NIT MIZORAM
  // ============================================

  // ============================================
  // NIT NAGALAND
  // ============================================

  // ============================================
  // NIT ARUNACHAL PRADESH
  // ============================================

  // ============================================
  // NIT SIKKIM
  // ============================================

  // ============================================
  // NIT ANDHRA PRADESH
  // ============================================

  // ============================================
  // NIT PUDUCHERRY
  // ============================================

  // ============================================
  // MNIT JAIPUR
  // ============================================

  // ============================================
  // AIIMS DELHI
  // ============================================

  // ============================================
  // AIIMS MADURAI
  // ============================================
  {
    id: 'aiims-madurai',
    name: 'All India Institute of Medical Sciences, Madurai',
    nameTamil: 'எய்ம்ஸ் மதுரை',
    location: 'Madurai, Tamil Nadu',
    website: 'https://aiimsmadurai.edu.in',
    phone: '0452-2530001',
    email: 'director@aiimsmadurai.edu.in',
    examName: 'NEET UG (MBBS) / NEET PG',
    logoColor: '#800000',
    logo: '/universities/aiims-madurai-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'NEET UG 2026', eventTamil: 'NEET UG 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'NEET PG 2026', eventTamil: 'NEET PG 2026', date: 'March 2026', status: 'upcoming' },
      { event: 'AIIMS Counselling', eventTamil: 'எய்ம்ஸ் கலந்தாய்வு', date: 'July 2026', status: 'upcoming' }
    ],
    fee: { general: 5000, obc: 5000, scst: 0 },
    courses: [
      { id: 'aiimsm-mbbs', name: 'MBBS', nameTamil: 'எம்.பி.பி.எஸ்', type: 'UG', category: 'On-Campus', school: 'Medical Sciences', duration: '5.5 Years', eligibility: 'NEET UG qualified, 12th PCB, 50% marks', tips: ['7+ courses', 'AIIMS in Tamil Nadu', 'Modern infrastructure'] },
      { id: 'aiimsm-bsc-nursing', name: 'B.Sc. Nursing', nameTamil: 'B.Sc. செவிலியர்', type: 'UG', category: 'On-Campus', school: 'Nursing', duration: '4 Years', eligibility: 'NEET UG qualified, 12th PCB', tips: ['Quality nursing education'] }
    ]
  },

  // ============================================
  // AIIMS BHOPAL
  // ============================================

  // ============================================
  // AIIMS JODHPUR
  // ============================================

  // ============================================
  // AIIMS PATNA
  // ============================================

  // ============================================
  // AIIMS RAIPUR
  // ============================================

  // ============================================
  // AIIMS RISHIKESH
  // ============================================

  // ============================================
  // AIIMS BHUBANESWAR
  // ============================================

  // ============================================
  // AIIMS MANGALAGIRI
  // ============================================

  // ============================================
  // AIIMS NAGPUR
  // ============================================

  // ============================================
  // AIIMS GORAKHPUR
  // ============================================

  // ============================================
  // AIIMS BATHINDA
  // ============================================

  // ============================================
  // AIIMS RAEBARELI
  // ============================================

  // ============================================
  // AIIMS KALYANI
  // ============================================

  // ============================================
  // AIIMS DEOGHAR
  // ============================================

  // ============================================
  // AIIMS BILASPUR
  // ============================================

  // ============================================
  // AIIMS GUWAHATI
  // ============================================

  // ============================================
  // AIIMS RAJKOT
  // ============================================

  // ============================================
  // AIIMS BIBINAGAR
  // ============================================

  // ============================================
  // AIIMS JAMMU
  // ============================================

  // ============================================
  // AIIMS DARBHANGA
  // ============================================

  // ============================================
  // AIIMS REWARI
  // ============================================

  // ============================================
  // JIPMER PUDUCHERRY
  // ============================================

  // ============================================
  // INDIAN INSTITUTES OF MANAGEMENT (IIMs)
  // ============================================

  // IIM AHMEDABAD

  // IIM BANGALORE

  // IIM CALCUTTA

  // IIM LUCKNOW

  // IIM KOZHIKODE

  // IIM INDORE

  // IIM SHILLONG

  // IIM RANCHI

  // IIM RAIPUR

  // IIM ROHTAK

  // IIM KASHIPUR

  // IIM UDAIPUR

  // IIM NAGPUR

  // IIM VISAKHAPATNAM

  // IIM BODH GAYA

  // IIM AMRITSAR

  // IIM SAMBALPUR

  // IIM SIRMAUR

  // IIM JAMMU

  // IIM MUMBAI

  // ============================================
  // INDIAN INSTITUTES OF SCIENCE EDUCATION AND RESEARCH (IISERs)
  // ============================================

  // IISER PUNE

  // IISER KOLKATA

  // IISER MOHALI

  // IISER BHOPAL

  // IISER THIRUVANANTHAPURAM

  // IISER TIRUPATI

  // IISER BERHAMPUR

  // ============================================
  // OTHER CENTRAL INSTITUTIONS
  // ============================================

  // CENTRAL INSTITUTE OF CLASSICAL TAMIL
  {
    id: 'cict-chennai',
    name: 'Central Institute of Classical Tamil',
    nameTamil: 'செம்மொழித் தமிழாய்வு மத்திய நிறுவனம்',
    location: 'Chennai, Tamil Nadu',
    website: 'https://www.cict.in',
    phone: '044-24412315',
    email: 'cict@cict.in',
    examName: 'Direct Application',
    logoColor: '#8B4513',
    logo: '/universities/cict-chennai-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'Ph.D. Admission 2026', eventTamil: 'Ph.D. சேர்க்கை 2026', date: 'March 2026', status: 'upcoming' },
      { event: 'Certificate Courses', eventTamil: 'சான்றிதழ் படிப்புகள்', date: 'Year-round', status: 'ongoing' }
    ],
    fee: { general: 10000, obc: 10000, scst: 5000 },
    courses: [
      { id: 'cict-phd-tamil', name: 'Ph.D. in Classical Tamil', nameTamil: 'Ph.D. செந்தமிழ்', type: 'Research', category: 'On-Campus', school: 'Tamil Studies', duration: '3-5 Years', eligibility: 'M.A. Tamil/Literature', tips: ['7+ courses', 'Premier Tamil research institute', 'Sangam literature expertise'] },
      { id: 'cict-cert-sangam', name: 'Certificate in Sangam Literature', nameTamil: 'சங்க இலக்கிய சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Tamil Studies', duration: '6 Months', eligibility: 'Graduate in any discipline', tips: ['Classical Tamil heritage'] },
      { id: 'cict-cert-epigraphy', name: 'Certificate in Tamil Epigraphy', nameTamil: 'தமிழ் கல்வெட்டியல் சான்றிதழ்', type: 'Certificate', category: 'On-Campus', school: 'Tamil Studies', duration: '6 Months', eligibility: 'Graduate', tips: ['Stone inscriptions study'] },
      { id: 'cict-diploma-classical', name: 'Diploma in Classical Tamil', nameTamil: 'செந்தமிழ் டிப்ளமா', type: 'Diploma', category: 'On-Campus', school: 'Tamil Studies', duration: '1 Year', eligibility: 'Graduate', tips: ['In-depth classical study'] },
      { id: 'cict-pdp', name: 'Post-Doctoral Programme', nameTamil: 'முனைவர் பட்ட பின் படிப்பு', type: 'Research', category: 'On-Campus', school: 'Research', duration: '2 Years', eligibility: 'Ph.D. in Tamil', tips: ['Advanced research fellowship'] }
    ]
  },

  // NITTTR CHENNAI
  {
    id: 'nitttr-chennai',
    name: 'National Institute of Technical Teachers Training and Research (NITTTR) Chennai',
    nameTamil: 'தேசிய தொழில்நுட்ப ஆசிரியர் பயிற்சி மற்றும் ஆராய்ச்சி நிறுவனம்',
    location: 'Chennai, Tamil Nadu',
    website: 'https://www.nitttrc.ac.in',
    phone: '044-22542994',
    email: 'nitttrcinfo@gmail.com',
    examName: 'GATE (M.Tech) / Direct Application',
    logoColor: '#006400',
    logo: '/universities/nitttr-chennai-logo.png',
    type: 'Central Government',
    importantDates: [
      { event: 'M.Tech Admission 2026', eventTamil: 'M.Tech சேர்க்கை 2026', date: 'May 2026', status: 'upcoming' },
      { event: 'Short Term Courses', eventTamil: 'குறுகிய கால பயிற்சி', date: 'Year-round', status: 'ongoing' },
      { event: 'Faculty Development Programmes', eventTamil: 'ஆசிரியர் மேம்பாட்டு பயிற்சி', date: 'Year-round', status: 'ongoing' }
    ],
    fee: { general: 50000, obc: 50000, scst: 25000 },
    courses: [
      { id: 'nitttr-mtech-edu', name: 'M.Tech (Educational Technology)', nameTamil: 'M.Tech (கல்வி தொழில்நுட்பம்)', type: 'PG', category: 'On-Campus', school: 'Education', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', tips: ['10+ courses', 'Technical teacher training', 'Focus on pedagogy + technology'] },
      { id: 'nitttr-mtech-cad', name: 'M.Tech (CAD/CAM)', nameTamil: 'M.Tech (CAD/CAM)', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', tips: ['Design & manufacturing'] },
      { id: 'nitttr-mtech-comm', name: 'M.Tech (Communication Engineering)', nameTamil: 'M.Tech (தொடர்பு பொறியியல்)', type: 'PG', category: 'On-Campus', school: 'Engineering', duration: '2 Years', eligibility: 'B.Tech/BE + GATE qualified', tips: ['Communication systems'] },
      { id: 'nitttr-pgdm', name: 'PGDM (Technical Education Management)', nameTamil: 'PGDM (தொழில்நுட்ப கல்வி மேலாண்மை)', type: 'PG', category: 'On-Campus', school: 'Management', duration: '1 Year', eligibility: 'B.Tech/BE with teaching exp', tips: ['For engineering faculty'] },
      { id: 'nitttr-phd', name: 'Ph.D. (Various Disciplines)', nameTamil: 'Ph.D.', type: 'Research', category: 'On-Campus', school: 'Research', duration: '3-5 Years', eligibility: 'M.Tech/M.E.', tips: ['Research in technical education'] },
      { id: 'nitttr-fdp', name: 'Faculty Development Programmes', nameTamil: 'ஆசிரியர் மேம்பாட்டு நிகழ்ச்சிகள்', type: 'Certificate', category: 'On-Campus', school: 'Professional Development', duration: '1-4 Weeks', eligibility: 'Engineering faculty members', tips: ['AICTE-sponsored training'] }
    ]
  }
];
