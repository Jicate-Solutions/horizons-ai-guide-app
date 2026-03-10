import { useState } from 'react';
import { ChevronDown, ExternalLink, Calendar, FileText, CheckCircle, Clock, AlertTriangle, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CounsellingStep {
  step: number;
  title: string;
  description: string;
  date?: string;
}

interface CounsellingInfo {
  id: string;
  name: string;
  nameTamil: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  authority: string;
  forWhom: string;
  eligibility: string;
  fee: string;
  applyLink: string;
  officialSite: string;
  tentativeDates: { event: string; date: string }[];
  steps: CounsellingStep[];
  importantNotes: string[];
  documentsRequired: string[];
}

const counsellings: CounsellingInfo[] = [
  {
    id: 'tnea',
    name: 'TNEA Engineering Counselling',
    nameTamil: 'TNEA பொறியியல் கலந்தாய்வு',
    icon: '⚙️',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    authority: 'Directorate of Technical Education (DoTE), Tamil Nadu',
    forWhom: 'B.E / B.Tech admission in 500+ TN engineering colleges',
    eligibility: '12th Pass with PCM (Physics, Chemistry, Maths). Min 50% (45% for reserved). TN domicile or studied in TN.',
    fee: '₹500 (General) / ₹250 (SC/ST). Counselling deposit: ₹5,000 (Gen) / ₹1,000 (SC/ST)',
    applyLink: 'https://www.tneaonline.org',
    officialSite: 'https://www.tneaonline.org',
    tentativeDates: [
      { event: 'Registration Opens', date: 'May 1st week, 2026' },
      { event: 'Last Date to Apply', date: 'June 1st week, 2026' },
      { event: 'Random Number Release', date: 'June 2nd week, 2026' },
      { event: 'Certificate Verification', date: 'June 3rd-4th week, 2026' },
      { event: 'Rank List Release', date: 'June last week, 2026' },
      { event: 'Counselling Round 1', date: 'July 1st-2nd week, 2026' },
      { event: 'Counselling Round 2', date: 'July 3rd week, 2026' },
      { event: 'Counselling Round 3', date: 'July 4th week, 2026' },
      { event: 'Supplementary Round', date: 'August 2026' },
    ],
    steps: [
      { step: 1, title: 'Online Registration', description: 'Visit tneaonline.org → Register with email & mobile → Get User ID → Fill personal, academic, school details → Upload photo & signature → Pay ₹500 fee' },
      { step: 2, title: 'Upload Documents', description: 'Upload scanned copies: 12th marksheet, community certificate, income certificate, Aadhar, nativity proof. Online verification (no need to visit TFC in most cases).' },
      { step: 3, title: 'Random Number Allotment', description: 'DoTE assigns a unique 10-digit random number to break ties when students have same marks. Check on website.' },
      { step: 4, title: 'Rank List Publication', description: 'Merit rank based on TNEA cutoff formula: Maths/200×100 + Physics/200×50 + Chemistry/200×50 = Out of 200. Check your Overall Rank + Community Rank.' },
      { step: 5, title: 'Pay Counselling Deposit', description: 'Pay ₹5,000 (General) or ₹1,000 (SC/ST) online. This is adjusted against college fees later.' },
      { step: 6, title: 'Choice Filling (MOST IMPORTANT)', description: 'Add colleges + branches in order of preference. No limit on choices! Lock choices using OTP. Tip: Add at least 50-100 choices for best results.' },
      { step: 7, title: 'Seat Allotment', description: 'DoTE allots seats based on rank + choices. Options: Accept & freeze, Accept with upward movement (try for better in next round), Decline & try next round, or Quit.' },
      { step: 8, title: 'Report to College', description: 'Visit allotted college with original documents → Pay fees → Confirm admission. Deadline: usually 3-5 days after allotment.' },
    ],
    importantNotes: [
      'NO entrance exam — 100% based on 12th marks (PCM)',
      'Cutoff formula: Maths (50%) + Physics (25%) + Chemistry (25%) = Out of 200',
      'Biology marks NOT counted for engineering cutoff',
      '3 general rounds + 1 supplementary round',
      'If you miss Round 1, you can still join Round 2 or 3',
      'Govt college fees: ₹7,500/year. Private: ₹50K-1.5L/year',
    ],
    documentsRequired: [
      '12th HSC Mark Sheet (Original + 2 copies)',
      'Community Certificate (if applicable)',
      'Income Certificate',
      'Nativity / Residence Certificate',
      'Aadhar Card',
      'Transfer Certificate from school',
      '4 passport-size photos',
      'First graduate certificate (if applicable)',
    ],
  },
  {
    id: 'neet-tn',
    name: 'NEET TN Medical Counselling',
    nameTamil: 'NEET தமிழ்நாடு மருத்துவ கலந்தாய்வு',
    icon: '🏥',
    color: 'text-rose-700',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    authority: 'Selection Committee, Directorate of Medical Education (DME), Tamil Nadu',
    forWhom: 'MBBS, BDS, BAMS, BHMS, BSMS, BUMS, BNYS, B.Sc Nursing, BPT, B.Pharm in TN govt & private colleges',
    eligibility: 'NEET UG qualified + 12th Pass with PCB. Min 50% in PCB (40% for SC/ST). Age: 17-25 years.',
    fee: '₹500 (General) / ₹250 (SC/ST)',
    applyLink: 'https://tnmedicalselection.net',
    officialSite: 'https://tnmedicalselection.net',
    tentativeDates: [
      { event: 'NEET UG 2026 Exam', date: 'May 4, 2026' },
      { event: 'NEET Results', date: 'June 2026' },
      { event: 'TN Medical Registration Opens', date: 'July 1st week, 2026' },
      { event: 'Last Date to Apply', date: 'July 3rd week, 2026' },
      { event: 'Certificate Verification', date: 'July last week, 2026' },
      { event: 'Rank List & Round 1', date: 'August 1st week, 2026' },
      { event: 'Round 2', date: 'August 3rd week, 2026' },
      { event: 'Mop-up Round', date: 'September 2026' },
    ],
    steps: [
      { step: 1, title: 'Clear NEET UG', description: 'Score minimum 50th percentile (General) or 40th percentile (SC/ST/OBC). NEET 2026 expected on May 4, 2026.' },
      { step: 2, title: 'TN State Counselling Registration', description: 'Visit tnmedicalselection.net → Register with NEET roll number → Fill personal & academic details → Pay ₹500.' },
      { step: 3, title: 'Document Verification', description: 'Visit designated centres with original documents. Online verification + physical verification at select centres.' },
      { step: 4, title: 'Choice Filling', description: 'Select colleges & courses in preference order. Add as many as possible. Options: MBBS, BDS, BAMS, BHMS, BSMS, Nursing, Pharmacy, Allied Health.' },
      { step: 5, title: 'Seat Allotment', description: 'Based on NEET score + TN state rank + category. Government seats first, then private (management quota separate).' },
      { step: 6, title: 'Join College', description: 'Report to allotted college with originals → Pay fees → Start classes.' },
    ],
    importantNotes: [
      'TN has 7.5% reservation for govt school students in NEET',
      'Govt MBBS fees: ₹13,000/year. Private: ₹5-25 Lakhs/year',
      'All India Quota (15%): Apply through MCC at mcc.nic.in separately',
      'NEET score valid for 1 year only — must join same year',
      'BAMS/BHMS/BSMS have lower cutoff than MBBS — good backup options',
    ],
    documentsRequired: [
      'NEET UG Score Card & Admit Card',
      '12th HSC Mark Sheet',
      'Community Certificate',
      'Nativity Certificate',
      'Income Certificate',
      'Aadhar Card',
      'Medical Fitness Certificate',
      'Transfer Certificate',
      '6 passport-size photos',
    ],
  },
  {
    id: 'tnau',
    name: 'TNAU Agriculture Counselling',
    nameTamil: 'TNAU வேளாண் கலந்தாய்வு',
    icon: '🌾',
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
    authority: 'Tamil Nadu Agricultural University (TNAU), Coimbatore',
    forWhom: 'B.Sc Agriculture, Horticulture, Forestry, Agricultural Engineering, Food Science, Sericulture, Fisheries',
    eligibility: '12th Pass with PCB/PCMB. Min 50% in relevant subjects (40% for SC/ST). TN domicile.',
    fee: '₹500',
    applyLink: 'https://www.tnau.ac.in',
    officialSite: 'https://www.tnau.ac.in',
    tentativeDates: [
      { event: 'Application Opens', date: 'June 2026' },
      { event: 'Last Date to Apply', date: 'July 2026' },
      { event: 'Rank List', date: 'July 2026' },
      { event: 'Counselling', date: 'August 2026' },
    ],
    steps: [
      { step: 1, title: 'Online Registration', description: 'Visit tnau.ac.in → Apply online → Fill details → Upload documents → Pay ₹500.' },
      { step: 2, title: 'Merit List', description: 'Rank based on 12th PCB marks (for B.Sc Agri) or PCM marks (for Agri Engineering). No entrance exam.' },
      { step: 3, title: 'Certificate Verification', description: 'Online + Physical verification at TNAU campus.' },
      { step: 4, title: 'Choice Filling & Allotment', description: 'Select courses & campuses. Seats allotted based on rank + choices.' },
    ],
    importantNotes: [
      'NO entrance exam — merit based on 12th marks',
      'Govt fees: ~₹5,000/year. Very affordable.',
      'TNAU has campuses in Coimbatore, Madurai, Killikulam, Trichy',
      'B.Sc Agriculture is 4 years (not 3 years like regular B.Sc)',
    ],
    documentsRequired: ['12th Mark Sheet', 'Community Certificate', 'Nativity Certificate', 'Aadhar Card', 'TC', '4 Photos'],
  },
  {
    id: 'josaa',
    name: 'JoSAA (IITs / NITs / IIITs)',
    nameTamil: 'JoSAA (IIT / NIT / IIIT)',
    icon: '🎯',
    color: 'text-indigo-700',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    authority: 'Joint Seat Allocation Authority (JoSAA)',
    forWhom: 'B.Tech in 23 IITs, 31 NITs, 26 IIITs, and other GFTIs (total 114 institutes)',
    eligibility: 'JEE Main qualified (for NITs/IIITs) + JEE Advanced qualified (for IITs). 12th with 75% or top 20 percentile.',
    fee: 'Registration free. Seat acceptance: ₹20,000-45,000 (refundable)',
    applyLink: 'https://josaa.nic.in',
    officialSite: 'https://josaa.nic.in',
    tentativeDates: [
      { event: 'JEE Main Session 1', date: 'January 2026' },
      { event: 'JEE Main Session 2', date: 'April 2026' },
      { event: 'JEE Advanced', date: 'May 2026' },
      { event: 'JoSAA Registration', date: 'June 2026' },
      { event: 'Round 1 Allotment', date: 'June last week, 2026' },
      { event: 'Rounds 2-5', date: 'July 2026' },
      { event: 'Special Round', date: 'July end, 2026' },
    ],
    steps: [
      { step: 1, title: 'Clear JEE Main / JEE Advanced', description: 'JEE Main for NITs/IIITs. JEE Main + JEE Advanced for IITs. Prepare well — competition is national level.' },
      { step: 2, title: 'Register on josaa.nic.in', description: 'After results, register with JEE roll number. Fill personal & academic details.' },
      { step: 3, title: 'Choice Filling', description: 'Fill preferences: Institute + Branch. Add as many choices as possible (100+ recommended). Lock before deadline.' },
      { step: 4, title: '5 Rounds of Allotment', description: 'JoSAA runs 5 rounds. After each round: Accept (Freeze/Float/Slide) or Reject. Float = keep current + try for better. Slide = try for better branch in same institute.' },
      { step: 5, title: 'Document Verification & Fee Payment', description: 'Visit reporting centre → Verify documents → Pay seat acceptance fee → Confirm admission.' },
    ],
    importantNotes: [
      'IIT Madras CSE: Needs ~top 500 JEE Advanced rank',
      'NIT Trichy CSE: Needs ~98+ percentile in JEE Main',
      'TN state quota in NITs: 50% seats reserved for TN students',
      'CSAB conducts separate rounds for leftover NIT/IIIT seats',
    ],
    documentsRequired: ['JEE Score Card', '12th Mark Sheet', 'Category Certificate', 'Aadhar Card', 'Photos'],
  },
  {
    id: 'clat',
    name: 'CLAT Law Counselling',
    nameTamil: 'CLAT சட்ட கலந்தாய்வு',
    icon: '⚖️',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    authority: 'Consortium of National Law Universities',
    forWhom: 'BA LLB / BBA LLB (5-year integrated law) in 24 National Law Universities',
    eligibility: '12th Pass from any stream. Min 45% (40% for SC/ST). No age limit.',
    fee: '₹4,000 (General) / ₹3,500 (SC/ST)',
    applyLink: 'https://consortiumofnlus.ac.in',
    officialSite: 'https://consortiumofnlus.ac.in',
    tentativeDates: [
      { event: 'CLAT Application Opens', date: 'July 2026' },
      { event: 'CLAT Exam Date', date: 'December 2026' },
      { event: 'Results', date: 'December 2026' },
      { event: 'Counselling', date: 'January 2027' },
    ],
    steps: [
      { step: 1, title: 'Apply for CLAT', description: 'Register at consortiumofnlus.ac.in → Fill form → Pay ₹4,000 → Download admit card.' },
      { step: 2, title: 'Clear CLAT Exam', description: '120 MCQs in 2 hours. Sections: English, GK/Current Affairs, Legal Reasoning, Logical Reasoning, Quantitative.' },
      { step: 3, title: 'Choice Filling', description: 'Select NLUs in preference order. Top NLUs: NLSIU Bangalore, NALSAR Hyderabad, NLU Delhi, NLU Jodhpur.' },
      { step: 4, title: 'Allotment & Join', description: 'Seats allotted in 3-4 rounds. Report to allotted NLU with documents + fees.' },
    ],
    importantNotes: [
      'NLSIU Bangalore: Needs top 50 rank. NALSAR: Top 100.',
      'TN Dr. Ambedkar Law University also accepts CLAT scores',
      'TNDALU has separate state-level admission too (no CLAT needed)',
      'BBA LLB is also available at NLSIU, NALSAR, GNLU',
    ],
    documentsRequired: ['CLAT Score Card', '12th Mark Sheet', 'Category Certificate', 'Aadhar', 'Photos'],
  },
  {
    id: 'cuet',
    name: 'CUET UG Counselling',
    nameTamil: 'CUET UG கலந்தாய்வு',
    icon: '🎓',
    color: 'text-teal-700',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    authority: 'National Testing Agency (NTA) + Individual Universities',
    forWhom: 'BA, B.Sc, B.Com, BBA, BCA in 260+ Central & State Universities (DU, JNU, BHU, AMU, etc.)',
    eligibility: '12th Pass from any recognized board. Subjects depend on university & course chosen.',
    fee: '₹650 (General) / ₹550 (SC/ST/PwD)',
    applyLink: 'https://cuet.nta.nic.in',
    officialSite: 'https://cuet.nta.nic.in',
    tentativeDates: [
      { event: 'CUET Application Opens', date: 'February 2026' },
      { event: 'CUET Exam (CBT)', date: 'May 2026' },
      { event: 'Results', date: 'June 2026' },
      { event: 'University-wise Counselling', date: 'June-July 2026 (varies)' },
    ],
    steps: [
      { step: 1, title: 'Apply for CUET UG', description: 'Register at cuet.nta.nic.in → Select subjects (up to 6 domains) → Select universities → Pay fee.' },
      { step: 2, title: 'Appear for CUET Exam', description: 'Computer-based test. Sections: Languages, Domain subjects (choose from 27), General Test. 45 min per section.' },
      { step: 3, title: 'Apply to Individual Universities', description: 'After CUET score, apply SEPARATELY to each university (DU, JNU, BHU). Each has its own portal.' },
      { step: 4, title: 'University Counselling', description: 'Each university conducts its own merit list + counselling. Multiple rounds. Check university websites.' },
    ],
    importantNotes: [
      'Delhi University: Apply at admission.uod.ac.in',
      'JNU: Apply at jnuee.jnu.ac.in',
      'BHU: Apply at bhu.ac.in',
      'Pondicherry University: Direct application + CUET score',
      'CUTN (Central Uni of TN): cutn.ac.in',
      'Each university has DIFFERENT cutoffs and processes',
    ],
    documentsRequired: ['CUET Score Card', '12th Mark Sheet', 'Category Certificate', 'Aadhar', 'Migration Certificate (if from another state)'],
  },
  {
    id: 'nda-ssb',
    name: 'NDA + SSB Selection',
    nameTamil: 'NDA + SSB தேர்வு செயல்முறை',
    icon: '🎖️',
    color: 'text-slate-700',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    authority: 'UPSC (Exam) + Indian Armed Forces (SSB)',
    forWhom: 'Army, Navy, Air Force Officer — National Defence Academy, Pune',
    eligibility: '12th Pass (PCM for Air Force/Navy). Age 16.5-19.5. Unmarried males only.',
    fee: '₹100 (General) / Free (SC/ST/Wards of JCOs)',
    applyLink: 'https://upsc.gov.in',
    officialSite: 'https://upsc.gov.in',
    tentativeDates: [
      { event: 'NDA I 2026 Notification', date: 'December 2025' },
      { event: 'NDA I Exam', date: 'April 6, 2026' },
      { event: 'NDA I SSB Interview', date: 'July-September 2026' },
      { event: 'NDA II 2026 Notification', date: 'May 2026' },
      { event: 'NDA II Exam', date: 'September 2026' },
      { event: 'NDA II SSB Interview', date: 'January-March 2027' },
    ],
    steps: [
      { step: 1, title: 'Apply on UPSC Portal', description: 'Visit upsc.gov.in → Apply for NDA & NA exam → Fill form → Upload photo → Pay ₹100.' },
      { step: 2, title: 'Clear Written Exam', description: 'Paper I: Mathematics (300 marks). Paper II: General Ability (600 marks). Total 900 marks. Negative marking.' },
      { step: 3, title: 'SSB Interview (5 Days)', description: 'Day 1: Screening (OIR + PPDT). Day 2-3: Psychological Tests (TAT, WAT, SRT, Self Description). Day 4: GTO Tasks (GD, GPE, PGT, HGT, FGT, Command Task). Day 5: Personal Interview + Conference.' },
      { step: 4, title: 'Medical Examination', description: 'Thorough medical check at Military Hospital. Vision, hearing, physical fitness, blood tests. 1-2 days.' },
      { step: 5, title: 'Merit List & Joining', description: 'Final merit = Written + SSB marks. Selected candidates join NDA Khadakwasla, Pune for 3-year training.' },
    ],
    importantNotes: [
      'NDA is conducted TWICE a year (April & September)',
      'SSB is 5 days — FREE stay + food + travel allowance provided',
      'If rejected in SSB, can apply again next time (no limit)',
      'After NDA: 3 years at NDA + 1 year at service academy = B.Tech/B.A degree',
      'Starting salary: ₹56,100/month + allowances',
    ],
    documentsRequired: ['UPSC Admit Card', '12th Mark Sheet', 'Aadhar Card', 'Birth Certificate', '20 passport photos', 'Character Certificate from School'],
  },
];

export const CounsellingGuide = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showDocs, setShowDocs] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Counselling Guide 2026</h3>
            <p className="text-xs text-emerald-200">கலந்தாய்வு வழிகாட்டி — Procedures, dates & apply links</p>
          </div>
        </div>
      </div>

      {/* Counselling Cards */}
      <div className="divide-y divide-gray-100">
        {counsellings.map(c => {
          const isOpen = expanded === c.id;
          return (
            <div key={c.id}>
              {/* Card Header */}
              <button
                onClick={() => setExpanded(isOpen ? null : c.id)}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-all text-left"
              >
                <span className="text-2xl flex-shrink-0">{c.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.nameTamil}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{c.forWhom}</p>
                </div>
                <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform flex-shrink-0", isOpen && "rotate-180")} />
              </button>

              {/* Expanded Content */}
              {isOpen && (
                <div className="px-4 pb-5 space-y-4">

                  {/* Quick Info Bar */}
                  <div className={cn("rounded-xl p-3 border", c.bg, c.border)}>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span className="font-bold text-gray-700">Authority:</span> <span className="text-gray-600">{c.authority}</span></div>
                      <div><span className="font-bold text-gray-700">Fee:</span> <span className="text-gray-600">{c.fee}</span></div>
                      <div className="col-span-2"><span className="font-bold text-gray-700">Eligibility:</span> <span className="text-gray-600">{c.eligibility}</span></div>
                    </div>
                  </div>

                  {/* Apply Now Button */}
                  <a
                    href={c.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-sm font-bold transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Apply Now — {c.officialSite.replace('https://', '')}
                  </a>

                  {/* Tentative Dates */}
                  <div>
                    <p className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" /> Tentative Dates 2026
                    </p>
                    <div className="space-y-1">
                      {c.tentativeDates.map((d, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                          <span className="text-gray-700 font-medium flex-1">{d.event}</span>
                          <span className="text-blue-700 font-bold">{d.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step-by-Step Process */}
                  <div>
                    <p className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-500" /> Step-by-Step Process
                    </p>
                    <div className="space-y-2">
                      {c.steps.map(s => (
                        <div key={s.step} className="flex gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            {s.step}
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-bold text-gray-900">{s.title}</p>
                            <p className="text-xs text-gray-600 leading-relaxed">{s.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Important Notes */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <p className="text-xs font-bold text-amber-800 mb-1.5 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> Important Notes
                    </p>
                    <div className="space-y-1">
                      {c.importantNotes.map((note, i) => (
                        <p key={i} className="text-xs text-amber-700 flex items-start gap-1.5">
                          <span className="mt-0.5">•</span> {note}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Documents Required (collapsible) */}
                  <button
                    onClick={() => setShowDocs(showDocs === c.id ? null : c.id)}
                    className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-gray-900"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Documents Required ({c.documentsRequired.length})
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", showDocs === c.id && "rotate-180")} />
                  </button>
                  {showDocs === c.id && (
                    <div className="bg-gray-50 rounded-xl p-3 space-y-1">
                      {c.documentsRequired.map((doc, i) => (
                        <p key={i} className="text-xs text-gray-700 flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" /> {doc}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Official Website */}
                  <a
                    href={c.officialSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border-2 border-gray-200 text-xs font-bold text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-all"
                  >
                    <GraduationCap className="w-4 h-4" /> Visit Official Website
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center">
          ⚠️ Dates are tentative based on previous year trends. Always verify from official websites before applying.
        </p>
      </div>
    </div>
  );
};
