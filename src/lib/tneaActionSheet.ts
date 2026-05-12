/**
 * TNEA 2026 Action Sheet Generator
 *
 * Produces a printable, parent-friendly action sheet from the fee-concession
 * calculator results. Each concession ships with:
 *   – The exact documents to procure
 *   – Where to get each (issuing authority, role + level)
 *   – The G.O. number / official rule to cite
 *   – Common rejection reasons
 *   – Questions to ask the college office
 *
 * Sources: TNEA 2026 Information Brochure §7, plus the relevant Government
 * Orders cited in the brochure (G.O.221/2021 for 7.5% Govt-School,
 * G.O.85/2010 for First Graduate, AICTE TFW scheme, G.O.6/2012, 92/2012,
 * 16/2014 for Post-Matric Scholarship).
 */

export type ConcessionKey =
  | 'govt_school'
  | 'first_grad'
  | 'aicte_tfw'
  | 'post_matric';

export interface DocumentRequirement {
  name: string;
  issuingAuthority: string;
  whereToGo: string;
  typicalFee: string;
  processingTime: string;
  notes?: string;
}

export interface ConcessionAction {
  key: ConcessionKey;
  title: string;
  governmentOrder: string;
  benefit: string;
  documents: DocumentRequirement[];
  commonRejections: string[];
  questionsForCollegeOffice: string[];
}

/** All concession actions indexed by key. Used when a candidate is eligible. */
export const CONCESSION_ACTIONS: Record<ConcessionKey, ConcessionAction> = {
  govt_school: {
    key: 'govt_school',
    title: '7.5% Government School Quota — Full Fee Waiver',
    governmentOrder: 'G.O.(Ms) No. 221, Higher Education Department, dated 31.08.2021',
    benefit:
      'The State Government pays your tuition, special fee and development fee in full. You pay zero rupees to the college for these heads. Hostel and exam fees may still apply at college rates.',
    documents: [
      {
        name: 'Government School Study Certificate (Form V)',
        issuingAuthority: 'Head of the school where you studied 6th–12th',
        whereToGo:
          'Visit your school office. The Headmaster/Principal must sign and seal the certificate. Ask for the format prescribed in G.O.(Ms) No. 221/2021 — most TN Govt schools have a printed template.',
        typicalFee: 'Free (no fee should be charged for this certificate)',
        processingTime: '1–3 working days',
        notes:
          'Certificate must cover ALL years from 6th to 12th in a Government / Corporation / Municipal / Adi-Dravidar Welfare / Forest / Tribal Welfare school. If you switched schools, get a certificate from each school covering its years.',
      },
      {
        name: 'Transfer Certificate (TC) from 12th school',
        issuingAuthority: 'Headmaster of the school',
        whereToGo: 'Your 12th school office, after results are declared',
        typicalFee: 'Free or nominal (₹10–₹50)',
        processingTime: '1–2 working days',
      },
      {
        name: 'HSC (+2) Mark Sheet — original',
        issuingAuthority: 'TN Directorate of Government Examinations',
        whereToGo:
          'Collected from your school after results. If lost, apply via dge.tn.gov.in for a duplicate.',
        typicalFee: 'Free with first issuance',
        processingTime: 'Issued with results',
      },
      {
        name: 'Permanent Community Certificate',
        issuingAuthority:
          'Tahsildar (SC/SCA/ST: Revenue Divisional Officer or Deputy Tahsildar)',
        whereToGo: 'Taluk Office / e-Sevai Centre / TNeGA online portal (tnesevai.tn.gov.in)',
        typicalFee: '₹60–₹100 via e-Sevai; free at direct Taluk counter',
        processingTime: '15–30 days (apply at least 2 months before TNEA deadline)',
        notes:
          'Use the permanent (not temporary) certificate. Confirm the community name matches Annexure-I of the TNEA brochure exactly — variant spellings are rejected.',
      },
      {
        name: 'Nativity Certificate (Tamil Nadu)',
        issuingAuthority: 'Tahsildar',
        whereToGo: 'Taluk Office / e-Sevai Centre',
        typicalFee: '₹60 via e-Sevai',
        processingTime: '7–15 days',
        notes:
          'Required if your community certificate is from another state, or for verification of TN residency.',
      },
    ],
    commonRejections: [
      "Studied even one year (e.g. 11th and 12th only in a private school) in a non-Government school — disqualifies the entire claim.",
      "Matriculation, Anglo-Indian, or Aided private schools do NOT count — only Government / Corporation / Municipal / Adi-Dravidar Welfare / Forest / Tribal Welfare schools qualify.",
      "Study Certificate doesn't explicitly state the years 6th to 12th — get this corrected at the school office.",
      "Community certificate spelling differs from Annexure-I (e.g. 'Vanniyar' vs 'Vanniyakulakshatriya') — request a corrected one.",
    ],
    questionsForCollegeOffice: [
      'Have you received my 7.5% Govt-School fee remission from the State? If not, when do you expect it?',
      'Will I be required to pay any amount up-front and claim a refund later, or is admission processed fee-free?',
      'Are hostel and exam fees included in the waiver, or separately payable?',
      'What is the deadline for submitting any missing certificate without losing the seat?',
    ],
  },

  first_grad: {
    key: 'first_grad',
    title: 'First Graduate Tuition Fee Concession',
    governmentOrder: 'G.O.(Ms) No. 85, Higher Education Department, dated 06.07.2010',
    benefit:
      'The State Government pays your tuition fee in full. You still pay hostel, exam, lab and development fees. Available even if family income is moderate — there is no strict income cap, but income certificate is needed.',
    documents: [
      {
        name: 'First Graduate Certificate',
        issuingAuthority: 'Tahsildar',
        whereToGo: 'Taluk Office / e-Sevai Centre (tnesevai.tn.gov.in)',
        typicalFee: '₹60–₹100',
        processingTime: '15–30 days',
        notes:
          'The certificate must declare that no member of your family (parents, grandparents, siblings) has obtained a degree from a recognised university. Get this AFTER your 12th result but BEFORE the TNEA application deadline.',
      },
      {
        name: 'Joint Declaration (parents + candidate)',
        issuingAuthority: 'Self-declaration on ₹20 non-judicial stamp paper',
        whereToGo:
          'Stamp vendor near Sub-Registrar office; then notarised by a Notary Public',
        typicalFee: '₹50–₹200',
        processingTime: 'Same day',
        notes:
          'Declaration must state: (a) no graduate in family, (b) no sibling has previously availed this concession. Mandatory format provided at the time of admission.',
      },
      {
        name: 'Income Certificate (parents)',
        issuingAuthority: 'Tahsildar / Revenue Inspector',
        whereToGo: 'Taluk Office / e-Sevai',
        typicalFee: '₹60',
        processingTime: '15 days',
        notes:
          'Validity 5 years from date of issue. Make sure the validity covers your 4-year course.',
      },
      {
        name: 'Family Card (Ration Card) — photocopy attested',
        issuingAuthority: 'Tahsildar (original document)',
        whereToGo: 'Use your existing family card; get a Gazetted Officer attestation',
        typicalFee: 'Free',
        processingTime: 'Same day',
        notes:
          'Used to verify family composition (parents, siblings). Names of all family members must appear.',
      },
    ],
    commonRejections: [
      "Older sibling already used First Graduate — the scheme is strictly one-per-family.",
      "A parent holds a degree from a university (even a distance/correspondence degree from an open university) — disqualifies the claim.",
      "Diploma and ITI do NOT count as 'graduate' for this scheme — those siblings/parents do not disqualify you. Confirm this with the Tahsildar if the application is initially refused.",
      "Joint declaration not on stamp paper or not notarised — get it redone.",
    ],
    questionsForCollegeOffice: [
      'When will the First Graduate tuition remission be applied — at admission or end of semester?',
      'If my certificate gets delayed by the Tahsildar, will my admission still be confirmed conditionally?',
      'What is the exact list of fees I will pay (hostel, lab, exam, development) after tuition waiver?',
      'Who in the college office is the designated First Graduate scheme coordinator?',
    ],
  },

  aicte_tfw: {
    key: 'aicte_tfw',
    title: 'AICTE Tuition Fee Waiver (TFW) — 5% Supernumerary Seats',
    governmentOrder:
      'AICTE Approval Process Handbook, Tuition Fee Waiver Scheme (rule reissued annually by AICTE)',
    benefit:
      'Up to 5% extra seats per course are reserved in Self-Financing colleges and self-supporting courses in Aided colleges. Tuition fee is waived by college management. Other fees stay payable. NOTE: TFW seats are filled during counselling — you must opt for TFW at choice-filling.',
    documents: [
      {
        name: 'Family Income Certificate (parental income < ₹8 lakhs/year)',
        issuingAuthority: 'Tahsildar',
        whereToGo: 'Taluk Office / e-Sevai (tnesevai.tn.gov.in)',
        typicalFee: '₹60',
        processingTime: '15–30 days',
        notes:
          'Income should reflect parents (father + mother) combined annual income from all sources. Income certificate must be valid as on date of TNEA admission. Validity 5 years from issue.',
      },
      {
        name: 'Income Tax Return (ITR) or Form 16 of both parents',
        issuingAuthority: 'Income Tax Department / Employer',
        whereToGo: 'Download from incometax.gov.in or get from employer',
        typicalFee: 'Free',
        processingTime: 'Immediate (if available); else file ITR first',
        notes:
          'If parents are not income-tax filers, an affidavit on stamp paper declaring all income sources is acceptable. Salary slip / Form 16 strengthens the income certificate.',
      },
      {
        name: 'Bank Pass-Book / Account Statement (last 6 months)',
        issuingAuthority: 'Your bank',
        whereToGo: 'Bank branch or net-banking',
        typicalFee: 'Free',
        processingTime: 'Same day',
        notes:
          'Verifies that income claim is consistent with bank credits. Not always asked but keep ready.',
      },
      {
        name: 'TNEA application acknowledgement showing TFW option opted',
        issuingAuthority: 'TNEA Online portal',
        whereToGo: 'tneaonline.org login → download acknowledgement',
        typicalFee: 'Free',
        processingTime: 'Immediate',
        notes:
          'CRITICAL: You must tick the TFW box at the time of choice filling. If you forget, you cannot claim TFW later.',
      },
    ],
    commonRejections: [
      "Family income exceeds ₹8 lakhs — even by a small amount disqualifies.",
      "Forgot to tick the TFW option during choice filling — cannot be added later.",
      "Got admitted in a Government college — TFW does NOT apply to Government colleges, only Self-Financing and Aided self-supporting.",
      "Tried to transfer to another college/course mid-degree — TFW seat is non-transferable.",
    ],
    questionsForCollegeOffice: [
      'Is this college covered under AICTE TFW? (Confirm separately for the specific branch.)',
      'How many TFW seats are sanctioned this year for my branch?',
      'When will I receive written confirmation that my TFW status is approved by AICTE?',
      'Are there any college-specific fees (lab fee, library, hostel) that are NOT waived?',
      'If I fail a semester, do I still keep TFW for the next?',
    ],
  },

  post_matric: {
    key: 'post_matric',
    title: 'Post-Matric Scholarship for SC / SCA / ST',
    governmentOrder:
      'G.O.(Ms) No. 6 (06.01.2012), G.O.(Ms) No. 92 (16.06.2012), G.O.(Ms) No. 16 (15.02.2014) — TN Adi-Dravidar Welfare Dept',
    benefit:
      'Reimbursement of compulsory non-refundable fees + monthly maintenance allowance, paid directly to the student through the college. Covers SC, SCA, ST and SC/SCA-converted-to-Christianity candidates with parental income below ₹2.5 lakhs.',
    documents: [
      {
        name: 'Permanent Community Certificate (SC / SCA / ST)',
        issuingAuthority:
          'Tahsildar (SC/SCA) or Revenue Divisional Officer (ST)',
        whereToGo: 'Taluk Office / e-Sevai',
        typicalFee: '₹60–₹100',
        processingTime: '15–30 days',
        notes:
          'For SC/SCA-converted Christians: a certificate specifically stating the conversion is required. Issuing authority is the same Tahsildar.',
      },
      {
        name: 'Parental Income Certificate (< ₹2.5 lakhs/year)',
        issuingAuthority: 'Tahsildar',
        whereToGo: 'Taluk Office / e-Sevai',
        typicalFee: '₹60',
        processingTime: '15 days',
        notes:
          'Validity 5 years from date of issue. Must be in the name of parent(s), not the student.',
      },
      {
        name: 'Bank Account in the student\'s own name',
        issuingAuthority: 'Any nationalised bank',
        whereToGo: 'Nearest branch (SBI, IOB, Indian Bank preferred for govt transfers)',
        typicalFee: 'Free for student accounts',
        processingTime: '3–7 days',
        notes:
          'Account must be Aadhaar-linked. Scholarship is credited via DBT (direct benefit transfer).',
      },
      {
        name: 'Aadhaar Card linked to bank account',
        issuingAuthority: 'UIDAI (existing Aadhaar)',
        whereToGo: 'Bank branch (for linking) or Aadhaar Seva Kendra',
        typicalFee: 'Free',
        processingTime: 'Same day (linking)',
      },
      {
        name: 'Online application at tnescholarship.org',
        issuingAuthority: 'TN Adi-Dravidar Welfare Department',
        whereToGo: 'tnescholarship.org (renew every academic year)',
        typicalFee: 'Free',
        processingTime: 'Apply Aug–Oct each year',
        notes:
          'Apply for renewal at the start of every academic year. Missing one year forfeits that year\'s scholarship.',
      },
    ],
    commonRejections: [
      "Income certificate dated more than 5 years ago — get a fresh one.",
      "Did not apply on tnescholarship.org within the academic-year deadline — no retroactive payment.",
      "Bank account not Aadhaar-linked — DBT fails and scholarship is held.",
      "Community certificate variant doesn't match the Government list — request correction at the Taluk office.",
      "Attendance below 75% during the semester — disqualifies that semester's scholarship.",
    ],
    questionsForCollegeOffice: [
      'When does the college file the Post-Matric Scholarship list with the Welfare Department?',
      'Will I need to pay tuition up-front and claim reimbursement, or is admission processed scholarship-conditional?',
      'Who is the SC/ST scholarship coordinator in the college and how do I contact them?',
      'When can I expect the first credit into my bank account?',
      'What happens if my Aadhaar-bank linking fails — what is the backup process?',
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────
//  PwD Action Sheet — disability → certificate type + medical board procedure
// ─────────────────────────────────────────────────────────────────────

export interface PwDAction {
  certificateGroup: 'II' | 'III' | 'IV' | 'V' | 'VI';
  certificateTitle: string;
  applicableDisabilities: string;
  governmentOrder: string;
  benefit: string;
  documents: DocumentRequirement[];
  medicalBoardProcedure: string[];
  commonRejections: string[];
  questionsForCollegeOffice: string[];
}

/**
 * The TNEA brochure prescribes 5 certificate group templates (Annexure II–VI),
 * one per family of disabilities. Each group ships with its own medical-board
 * procedure and certificate format.
 */
export const PWD_CERTIFICATE_ACTIONS: Record<'II' | 'III' | 'IV' | 'V' | 'VI', PwDAction> = {
  II: {
    certificateGroup: 'II',
    certificateTitle:
      'Certificate of Physical Fitness — Visual Impairment (Blindness / Low Vision)',
    applicableDisabilities:
      'Blindness, Low Vision (Disability serials 1–2 in TNEA Brochure Annexure)',
    governmentOrder:
      'Rights of Persons with Disabilities Act, 2016 (RPwD Act) — Schedule, point 1; TNEA Brochure §6.2',
    benefit:
      '5% horizontal reservation across all categories. Suitable for CS/IT family for ALL severity levels; suitable for other B.E./B.Tech./B.Arch. branches EXCEPT 100% blindness. Excluded from Mining and Marine Engineering.',
    documents: [
      {
        name: 'UDID Card (Unique Disability ID)',
        issuingAuthority: 'Department of Empowerment of PwDs, Govt of India',
        whereToGo: 'swavlambancard.gov.in or District Differently Abled Welfare Office',
        typicalFee: 'Free',
        processingTime: '30–90 days (apply at least 3 months before TNEA deadline)',
        notes:
          'UDID Card carries the certified disability percentage. This is the SINGLE most important document — get it before everything else.',
      },
      {
        name: 'Disability Certificate (40% or more)',
        issuingAuthority:
          'Medical Board headed by Civil Surgeon / Chief Medical Officer at a Government Hospital',
        whereToGo:
          'District Government Headquarters Hospital (Ophthalmology dept) or Regional Institute of Ophthalmology, Egmore (Chennai)',
        typicalFee: 'Free',
        processingTime: '1–2 visits over 2–4 weeks',
        notes:
          'Disability must be 40% or more to qualify under PwD reservation. Certificate format is prescribed by RPwD Act, 2016.',
      },
      {
        name: 'Certificate of Physical Fitness for Engineering (Annexure II)',
        issuingAuthority: 'Medical Board (Civil Surgeon)',
        whereToGo: 'Same Government Hospital that issued the disability certificate',
        typicalFee: 'Free',
        processingTime: '1–2 weeks (request along with disability certificate)',
        notes:
          'TNEA-specific format. Download from tneaonline.org and carry to the Medical Board. Must state the candidate is fit for engineering education.',
      },
      {
        name: 'Latest detailed ophthalmology report',
        issuingAuthority: 'Government ophthalmologist',
        whereToGo: 'Same hospital, Ophthalmology Out-Patient department',
        typicalFee: 'Free',
        processingTime: '1 visit',
      },
    ],
    medicalBoardProcedure: [
      'STEP 1: Visit your nearest District Government HQ Hospital with school ID, Aadhaar and 4 photos.',
      'STEP 2: Register at the Ophthalmology OPD. Get a token for Disability Assessment.',
      'STEP 3: Vision tests (Snellen chart, visual field, refraction). The board records best-corrected visual acuity in both eyes.',
      'STEP 4: Board meeting (usually once a week) issues the disability percentage. Collect the certificate after 1–2 weeks.',
      'STEP 5: Simultaneously apply for UDID Card at swavlambancard.gov.in — upload the disability certificate.',
      'STEP 6: Get the TNEA-specific Annexure II Certificate of Physical Fitness from the same board, signed and sealed.',
      'STEP 7: Upload UDID + Disability Cert + Annexure II to your TNEA application.',
    ],
    commonRejections: [
      "Certificate issued by a private hospital — only Government Medical Board certificates are accepted.",
      "Disability < 40% — does not qualify for PwD reservation.",
      "UDID card not generated yet — apply early; the disability certificate alone is not enough during counselling.",
      "Annexure-II format not used — TNEA portal rejects generic disability certificates without the specific TNEA format.",
      "100% blindness candidates trying for non-CS/IT branches — only CS/IT family accepts 100% blindness.",
    ],
    questionsForCollegeOffice: [
      'Does this college have a Disability Help Cell as required by the RPwD Act?',
      'What accessibility provisions exist (screen-reader software, lab assistance, ramps, accessible hostels)?',
      'Will the college provide a scribe for internal examinations? Is the scribe certified?',
      'Can I get extra time during exams as per UGC guidelines for PwD candidates?',
      'Is there a designated faculty mentor for PwD students?',
    ],
  },

  III: {
    certificateGroup: 'III',
    certificateTitle:
      'Certificate of Physical Fitness — Hearing Impairment (Deaf / Hard of Hearing)',
    applicableDisabilities:
      'Deaf, Hard of Hearing (Disability serials 3–4 in TNEA Brochure Annexure)',
    governmentOrder:
      'Rights of Persons with Disabilities Act, 2016 — Schedule, point 2; TNEA Brochure §6.2',
    benefit:
      '5% horizontal reservation. Suitable for all B.E./B.Tech./B.Arch. branches EXCEPT Mining Engineering and Marine Engineering.',
    documents: [
      {
        name: 'UDID Card',
        issuingAuthority: 'Department of Empowerment of PwDs',
        whereToGo: 'swavlambancard.gov.in',
        typicalFee: 'Free',
        processingTime: '30–90 days',
      },
      {
        name: 'Disability Certificate (40% or more)',
        issuingAuthority: 'Medical Board, ENT specialist',
        whereToGo:
          'Government Headquarters Hospital (ENT Department) or Madras Medical College ENT',
        typicalFee: 'Free',
        processingTime: '2–4 weeks',
        notes:
          'Audiometry test (pure-tone audiogram) is required. Disability is graded by decibel hearing loss.',
      },
      {
        name: 'Certificate of Physical Fitness (Annexure III)',
        issuingAuthority: 'Medical Board (Civil Surgeon)',
        whereToGo: 'Same Government Hospital',
        typicalFee: 'Free',
        processingTime: '1–2 weeks',
        notes: 'Download TNEA-specific Annexure III from tneaonline.org.',
      },
      {
        name: 'Audiogram report (last 6 months)',
        issuingAuthority: 'Government Audiologist',
        whereToGo: 'ENT department of the same hospital',
        typicalFee: 'Free',
        processingTime: '1 visit',
      },
    ],
    medicalBoardProcedure: [
      'STEP 1: Visit District Government HQ Hospital, register at the ENT OPD.',
      'STEP 2: Audiometry test (pure-tone air and bone conduction). Record dB hearing loss in each ear.',
      'STEP 3: The Medical Board uses the audiogram to compute disability % per the RPwD Act formula.',
      'STEP 4: Collect Disability Certificate. Apply simultaneously for UDID at swavlambancard.gov.in.',
      'STEP 5: Get TNEA Annexure-III certificate from the same Board.',
      'STEP 6: Upload UDID + Disability Cert + Annexure III to TNEA application.',
    ],
    commonRejections: [
      "Audiogram older than 6 months — get a fresh test.",
      "Certificate from a private ENT hospital — only Government Medical Boards qualify.",
      "Hearing loss < 40 dB — does not meet RPwD threshold.",
      "Annexure-III format not used.",
    ],
    questionsForCollegeOffice: [
      'Does the college have FM systems or hearing-loop equipped classrooms?',
      'Are class materials made available in writing or as recorded video?',
      'Is sign-language interpretation available for important lectures or labs?',
      'Where is the Disability Help Cell located?',
    ],
  },

  IV: {
    certificateGroup: 'IV',
    certificateTitle:
      'Certificate of Physical Fitness — Locomotor Disability / Dwarfism / Acid Attack / Muscular Dystrophy',
    applicableDisabilities:
      'Locomotor disability, Leprosy-cured, Dwarfism, Acid-attack victim, Muscular dystrophy (Disability serials 5–9)',
    governmentOrder:
      'Rights of Persons with Disabilities Act, 2016 — Schedule, points 3–6; TNEA Brochure §6.2',
    benefit:
      '5% horizontal reservation. Suitable for all B.E./B.Tech./B.Arch. branches EXCEPT Mining Engineering and Marine Engineering.',
    documents: [
      {
        name: 'UDID Card',
        issuingAuthority: 'Department of Empowerment of PwDs',
        whereToGo: 'swavlambancard.gov.in',
        typicalFee: 'Free',
        processingTime: '30–90 days',
      },
      {
        name: 'Disability Certificate (40% or more)',
        issuingAuthority:
          'Medical Board headed by Civil Surgeon, with Orthopaedic specialist on board',
        whereToGo:
          'District Government Headquarters Hospital (Orthopaedic Dept) or Government Institute of Rehabilitation Medicine (GIRM), K.K. Nagar, Chennai',
        typicalFee: 'Free',
        processingTime: '2–4 weeks (may require X-rays or further investigation)',
      },
      {
        name: 'Certificate of Physical Fitness (Annexure IV)',
        issuingAuthority: 'Medical Board (Civil Surgeon)',
        whereToGo: 'Same Government Hospital',
        typicalFee: 'Free',
        processingTime: '1–2 weeks',
        notes: 'TNEA-specific format from tneaonline.org.',
      },
      {
        name: 'X-rays / Investigation reports (if asked by Board)',
        issuingAuthority: 'Government Radiology / Lab',
        whereToGo: 'Same hospital',
        typicalFee: 'Free',
        processingTime: 'Same day',
      },
    ],
    medicalBoardProcedure: [
      'STEP 1: Visit District Government HQ Hospital, register at Orthopaedic OPD.',
      'STEP 2: Physical examination, range-of-motion measurements, muscle-power grading.',
      'STEP 3: X-rays or specialist consultation if required (e.g. for muscular dystrophy: neurologist).',
      'STEP 4: Medical Board reviews and issues disability % per RPwD Act guidelines.',
      'STEP 5: Apply for UDID at swavlambancard.gov.in.',
      'STEP 6: Obtain TNEA Annexure-IV certificate.',
      'STEP 7: For acid-attack victims, the disability is automatically certified — bring the FIR / police record to expedite.',
    ],
    commonRejections: [
      "Disability < 40% — does not qualify.",
      "Certificate from private orthopaedic surgeon — only Government Board.",
      "Trying for Mining or Marine — strictly excluded.",
      "Annexure-IV format not used.",
    ],
    questionsForCollegeOffice: [
      'Is the college campus barrier-free? Are labs, library, and hostel wheelchair-accessible?',
      'Are accessible washrooms available on every floor?',
      'Is there a lift in all academic blocks?',
      'For muscular dystrophy: is there a designated accessible parking and rest area?',
      'Are lab benches height-adjustable for dwarfism candidates?',
    ],
  },

  V: {
    certificateGroup: 'V',
    certificateTitle:
      'Certificate of Physical Fitness — Neurological / Intellectual / Specific Learning Disabilities',
    applicableDisabilities:
      'Autism Spectrum Disorder, Intellectual Disability, Specific Learning Disabilities, Mental Illness, Cerebral Palsy (Disability serials 10–14)',
    governmentOrder:
      'Rights of Persons with Disabilities Act, 2016 — Schedule, points 7–10; TNEA Brochure §6.2',
    benefit:
      '5% horizontal reservation. Suitable for all B.E./B.Tech./B.Arch. branches EXCEPT Mining Engineering and Marine Engineering.',
    documents: [
      {
        name: 'UDID Card',
        issuingAuthority: 'Department of Empowerment of PwDs',
        whereToGo: 'swavlambancard.gov.in',
        typicalFee: 'Free',
        processingTime: '30–90 days',
      },
      {
        name: 'Disability Certificate (40% or more)',
        issuingAuthority:
          'Medical Board headed by Civil Surgeon, with Psychiatrist / Neurologist / Clinical Psychologist',
        whereToGo:
          'Institute of Mental Health (IMH), Kilpauk (Chennai), or District Government HQ Hospital with psychiatry dept',
        typicalFee: 'Free',
        processingTime: '4–8 weeks (often requires multiple assessment sessions)',
        notes:
          'Specific Learning Disability (SLD) certificates require validated psychometric testing — start very early.',
      },
      {
        name: 'Certificate of Physical Fitness (Annexure V)',
        issuingAuthority: 'Medical Board (Civil Surgeon)',
        whereToGo: 'Same Government Hospital',
        typicalFee: 'Free',
        processingTime: '1–2 weeks',
        notes: 'TNEA-specific format. Must explicitly state fitness for engineering studies.',
      },
      {
        name: 'IQ test / Psychometric report (for intellectual disability / SLD)',
        issuingAuthority: 'Government Clinical Psychologist',
        whereToGo: 'IMH Chennai or affiliated centre',
        typicalFee: 'Free',
        processingTime: '2–4 sessions over several weeks',
      },
    ],
    medicalBoardProcedure: [
      'STEP 1: Visit IMH Kilpauk (Chennai) or your District HQ Hospital psychiatry OPD.',
      'STEP 2: Psychiatrist / Clinical Psychologist conducts initial assessment.',
      'STEP 3: Psychometric testing (multiple sessions) — IQ, behavioural, developmental.',
      'STEP 4: Medical Board reviews all reports and certifies disability %.',
      'STEP 5: Apply for UDID at swavlambancard.gov.in.',
      'STEP 6: Obtain TNEA Annexure-V certificate.',
      'STEP 7: For SLD: keep copies of school-based learning evaluations as supporting evidence.',
    ],
    commonRejections: [
      "Private psychiatrist's certificate — only Government Board qualifies.",
      "Disability < 40% (e.g. mild autism / mild SLD) — does not meet threshold.",
      "Insufficient psychometric documentation for SLD claims — needs multiple test scores.",
      "Trying for Mining or Marine — excluded.",
    ],
    questionsForCollegeOffice: [
      'Does the college have a counsellor or mental-health support cell?',
      'For SLD: are there flexible exam arrangements (extra time, computer-based answer scripts, scribes)?',
      'For autism: is there a quiet study room or sensory-considerate environment?',
      'Are class materials available in advance (slides, notes) to support different learning paces?',
    ],
  },

  VI: {
    certificateGroup: 'VI',
    certificateTitle:
      'Certificate of Physical Fitness — Multiple Disabilities / Blood Disorders / Others',
    applicableDisabilities:
      'Multiple Disabilities, Haemophilia, Thalassemia, Sickle Cell Disease, Chronic Neurological Conditions, Parkinson\'s, Multiple Sclerosis (Disability serials 15–21)',
    governmentOrder:
      'Rights of Persons with Disabilities Act, 2016 — Schedule, points 11–21; TNEA Brochure §6.2',
    benefit:
      '5% horizontal reservation. Suitable for all B.E./B.Tech./B.Arch. branches EXCEPT Mining Engineering and Marine Engineering.',
    documents: [
      {
        name: 'UDID Card',
        issuingAuthority: 'Department of Empowerment of PwDs',
        whereToGo: 'swavlambancard.gov.in',
        typicalFee: 'Free',
        processingTime: '30–90 days',
      },
      {
        name: 'Disability Certificate (40% or more)',
        issuingAuthority:
          'Multi-specialist Medical Board (Civil Surgeon + specialists relevant to the condition)',
        whereToGo:
          'Government Headquarters Hospital with multi-specialist board, or specialised centres (e.g. ICH Egmore for paediatric blood disorders)',
        typicalFee: 'Free',
        processingTime: '4–8 weeks (multiple specialist visits)',
      },
      {
        name: 'Certificate of Physical Fitness (Annexure VI)',
        issuingAuthority: 'Medical Board',
        whereToGo: 'Same Government Hospital',
        typicalFee: 'Free',
        processingTime: '1–2 weeks',
        notes:
          'For chronic conditions, certificate must address ability to attend regular classes and lab work.',
      },
      {
        name: 'Latest hospital records / treatment summary',
        issuingAuthority: 'Treating Government doctor',
        whereToGo: 'Hospital where you are currently being treated',
        typicalFee: 'Free',
        processingTime: 'Same day',
        notes:
          'For Thalassemia / Sickle Cell: bring transfusion history. For Haemophilia: factor-level reports.',
      },
    ],
    medicalBoardProcedure: [
      'STEP 1: Identify the right specialist centre for your condition (haematologist, neurologist, etc.).',
      'STEP 2: Get current treatment summary from your existing Government doctor.',
      'STEP 3: Visit District Government HQ Hospital — request multi-specialist Medical Board.',
      'STEP 4: Board reviews treatment history, current condition, prognosis. May require additional investigations.',
      'STEP 5: Disability % is certified based on functional impact, not just diagnosis.',
      'STEP 6: Apply for UDID at swavlambancard.gov.in.',
      'STEP 7: Obtain TNEA Annexure-VI certificate.',
    ],
    commonRejections: [
      "Diagnosed but not yet 40% disabling — chronic conditions may need to be reassessed as they progress.",
      "Certificate from a single specialist instead of full Medical Board.",
      "Out-of-date treatment summary — most boards want records from the past 6 months.",
      "Trying for Mining or Marine — excluded.",
    ],
    questionsForCollegeOffice: [
      'Is medical leave for transfusions / regular treatment built into the attendance policy?',
      'Is there a partner hospital near the college campus for emergency care?',
      'For blood disorders: does the campus health centre stock relevant medications / blood products?',
      'Will I be allowed extra time on exams during treatment cycles?',
      'Does the college have a written accommodation policy I can review before joining?',
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────
//  Printable HTML generator
// ─────────────────────────────────────────────────────────────────────

interface ActionSheetData {
  candidateName?: string;
  community: string;
  collegeType?: string;
  annualIncome?: number;
  generatedOn: string;
  actions: ConcessionAction[];
  registrationFee: number;
  isPwD?: boolean;
  pwdAction?: PwDAction;
  pwdDisabilityName?: string;
}

/**
 * Generates a self-contained printable HTML document with all action items.
 * The page is sized for A4 portrait with explicit print CSS so it prints
 * cleanly straight from the browser (no app branding, no extra chrome).
 */
export function buildActionSheetHTML(data: ActionSheetData): string {
  const {
    candidateName,
    community,
    collegeType,
    annualIncome,
    generatedOn,
    actions,
    registrationFee,
    isPwD,
    pwdAction,
    pwdDisabilityName,
  } = data;

  const candidateLine = candidateName
    ? `<div class="meta-line"><strong>Candidate:</strong> ${escapeHtml(candidateName)}</div>`
    : '';
  const incomeLine =
    typeof annualIncome === 'number'
      ? `<div class="meta-line"><strong>Annual Family Income:</strong> ₹${annualIncome} lakhs</div>`
      : '';
  const collegeLine = collegeType
    ? `<div class="meta-line"><strong>College Type:</strong> ${escapeHtml(collegeType)}</div>`
    : '';

  // ── Concession sections ──
  const concessionSections = actions
    .map((a, idx) => renderConcessionSection(a, idx + 1))
    .join('\n');

  // ── Optional PwD section ──
  const pwdSection =
    isPwD && pwdAction
      ? renderPwDSection(pwdAction, pwdDisabilityName ?? '', actions.length + 1)
      : '';

  const total = actions.length + (isPwD ? 1 : 0);
  const summaryRows = [
    ...actions.map(
      (a, i) =>
        `<tr><td>${i + 1}</td><td>${escapeHtml(a.title)}</td><td>${escapeHtml(a.governmentOrder)}</td></tr>`
    ),
    ...(isPwD && pwdAction
      ? [
          `<tr><td>${actions.length + 1}</td><td>${escapeHtml(pwdAction.certificateTitle)}</td><td>${escapeHtml(pwdAction.governmentOrder)}</td></tr>`,
        ]
      : []),
  ].join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>TNEA 2026 — Action Sheet for the College Office</title>
<style>
  @page { size: A4; margin: 14mm 12mm; }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1a1a1a;
    margin: 0;
    padding: 0;
    line-height: 1.45;
    font-size: 11pt;
  }
  .sheet { max-width: 800px; margin: 0 auto; padding: 16px 4px; }
  h1 {
    font-size: 18pt;
    color: #047857;
    border-bottom: 3px solid #047857;
    padding-bottom: 6px;
    margin: 0 0 12px;
  }
  h2 {
    font-size: 13pt;
    color: #064e3b;
    background: #d1fae5;
    padding: 6px 10px;
    border-left: 4px solid #047857;
    margin: 22px 0 10px;
    page-break-after: avoid;
  }
  h3 {
    font-size: 11pt;
    color: #334155;
    margin: 14px 0 6px;
    page-break-after: avoid;
  }
  .meta-block {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    padding: 10px 14px;
    border-radius: 6px;
    margin-bottom: 14px;
  }
  .meta-line { font-size: 10pt; margin: 2px 0; }
  .badge {
    display: inline-block;
    padding: 2px 8px;
    background: #fbbf24;
    color: #78350f;
    font-size: 9pt;
    font-weight: bold;
    border-radius: 3px;
    margin-left: 6px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 6px 0 12px;
    font-size: 10pt;
  }
  th, td {
    border: 1px solid #cbd5e1;
    padding: 6px 8px;
    text-align: left;
    vertical-align: top;
  }
  th {
    background: #f1f5f9;
    font-weight: bold;
    font-size: 9.5pt;
  }
  .check-col {
    width: 26px;
    text-align: center;
  }
  .check-box {
    width: 14px;
    height: 14px;
    border: 1.5px solid #334155;
    display: inline-block;
    border-radius: 2px;
  }
  .doc-list { margin: 4px 0 8px; }
  .doc-row {
    padding: 8px 10px;
    border-left: 3px solid #10b981;
    background: #f0fdf4;
    margin: 4px 0;
    border-radius: 0 4px 4px 0;
    page-break-inside: avoid;
  }
  .doc-title {
    font-weight: bold;
    font-size: 10.5pt;
    color: #064e3b;
  }
  .doc-fields {
    font-size: 9.5pt;
    color: #334155;
    margin-top: 3px;
    line-height: 1.5;
  }
  .doc-field {
    margin: 1px 0;
  }
  .doc-field strong { color: #475569; }
  .note {
    font-size: 9pt;
    color: #92400e;
    background: #fffbeb;
    padding: 4px 8px;
    border-left: 2px solid #f59e0b;
    margin-top: 4px;
    font-style: italic;
  }
  .rejection-list, .question-list {
    margin: 4px 0 12px;
    padding-left: 18px;
    font-size: 10pt;
  }
  .rejection-list li {
    color: #991b1b;
    margin: 3px 0;
  }
  .question-list li {
    color: #0c4a6e;
    margin: 4px 0;
  }
  .footer {
    margin-top: 28px;
    padding-top: 12px;
    border-top: 1px solid #cbd5e1;
    font-size: 9pt;
    color: #475569;
    text-align: center;
  }
  .go-tag {
    font-size: 9pt;
    color: #475569;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    background: #f1f5f9;
    padding: 2px 6px;
    border-radius: 3px;
    margin-top: 4px;
    display: inline-block;
  }
  .benefit-row {
    background: #ecfdf5;
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 10pt;
    color: #064e3b;
    margin: 6px 0 8px;
    border-left: 3px solid #10b981;
  }
  .procedure-list {
    margin: 4px 0 12px;
    padding-left: 18px;
    font-size: 10pt;
    color: #334155;
  }
  .procedure-list li { margin: 4px 0; }
  .registration-strip {
    background: #dbeafe;
    border: 2px solid #3b82f6;
    border-radius: 6px;
    padding: 10px 14px;
    text-align: center;
    margin: 10px 0 14px;
  }
  .registration-strip strong { font-size: 14pt; color: #1e40af; }
  .summary-table { page-break-inside: avoid; }
  .signature-block {
    margin-top: 28px;
    display: flex;
    justify-content: space-between;
    gap: 28px;
    page-break-inside: avoid;
  }
  .sig {
    flex: 1;
    border-top: 1px solid #334155;
    padding-top: 6px;
    font-size: 9.5pt;
    color: #475569;
    text-align: center;
  }
  @media print {
    body { font-size: 10pt; }
    h1 { font-size: 16pt; }
    h2 { font-size: 12pt; page-break-after: avoid; }
    h3 { font-size: 10.5pt; page-break-after: avoid; }
    .doc-row { page-break-inside: avoid; }
    .no-print { display: none; }
  }
  .print-bar {
    background: #047857;
    color: white;
    padding: 10px 16px;
    text-align: center;
    border-radius: 6px;
    margin-bottom: 14px;
  }
  .print-bar button {
    background: white;
    color: #047857;
    border: 0;
    padding: 8px 18px;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    font-size: 11pt;
    margin: 0 4px;
  }
  .print-bar button:hover { background: #f0fdf4; }
</style>
</head>
<body>
<div class="sheet">

  <div class="print-bar no-print">
    <strong>Your TNEA 2026 Action Sheet is ready.</strong>
    &nbsp;
    <button onclick="window.print()">🖨 Print / Save as PDF</button>
    <button onclick="window.close()">Close</button>
  </div>

  <h1>TNEA 2026 — Action Sheet for the College Office</h1>

  <div class="meta-block">
    ${candidateLine}
    <div class="meta-line"><strong>Community:</strong> ${escapeHtml(community)}</div>
    ${incomeLine}
    ${collegeLine}
    <div class="meta-line"><strong>Generated:</strong> ${escapeHtml(generatedOn)}</div>
    <div class="meta-line" style="margin-top: 6px; font-size: 9.5pt; color: #475569;">
      Carry this sheet to the college office and to the Tahsildar / Medical Board.
      Each row has a check-box: tick it once the document is in hand.
    </div>
  </div>

  <div class="registration-strip">
    <div style="font-size: 10pt; color: #1e40af;">TNEA 2026 Registration Fee (your community)</div>
    <strong>₹${registrationFee}</strong>
    <div style="font-size: 9pt; color: #1e40af; margin-top: 4px;">
      Pay via UPI / Net-Banking / Card on tneaonline.org
    </div>
  </div>

  <h2>What You Qualify For — Summary (${total} ${total === 1 ? 'scheme' : 'schemes'})</h2>
  <table class="summary-table">
    <thead>
      <tr><th style="width: 36px;">#</th><th>Scheme</th><th>Government Order / Rule</th></tr>
    </thead>
    <tbody>
      ${summaryRows}
    </tbody>
  </table>

  ${concessionSections}
  ${pwdSection}

  <h2>General Action Plan — In Order</h2>
  <ol style="font-size: 10pt; line-height: 1.7; padding-left: 18px;">
    <li><strong>This week:</strong> Visit Taluk Office / e-Sevai for all certificates. Apply for missing ones IMMEDIATELY — most take 15–30 days.</li>
    <li><strong>While certificates are processing:</strong> Open a student bank account in your own name. Link Aadhaar to it.</li>
    <li><strong>Before TNEA deadline:</strong> Upload all certificates to tneaonline.org. Tick the TFW option if applicable.</li>
    <li><strong>During counselling:</strong> Carry original certificates + photocopies + this action sheet to the college on the reporting date.</li>
    <li><strong>At the college office:</strong> Use the questions section below for each scheme. Do not leave without written confirmation of every concession applied.</li>
    <li><strong>If a scheme is denied:</strong> Ask for the denial in writing with the rule cited. Then approach the Government college's Public Grievance Officer or the AICTE regional office.</li>
  </ol>

  <h2>Important Things to Remember</h2>
  <ul style="font-size: 10pt; line-height: 1.7;">
    <li>All certificates must be <strong>permanent (not temporary)</strong>.</li>
    <li>Certificates dated <strong>after the TNEA application deadline</strong> are not accepted.</li>
    <li>Carry both <strong>originals and photocopies</strong> to every appointment. Most offices keep the copy and return the original after verification.</li>
    <li>If the college tries to charge you a fee for a scheme you qualify for, ask them to cite the relevant rule that allows charging. Most concessions are paid by the State / AICTE directly.</li>
    <li>Keep a <strong>file with all certificates</strong> — you'll need them every semester for renewal.</li>
  </ul>

  <div class="signature-block">
    <div class="sig">Candidate Signature</div>
    <div class="sig">Parent / Guardian Signature</div>
    <div class="sig">Date</div>
  </div>

  <div class="footer">
    Generated by VAZHIKATTI (vazhikatti.in / horizons-ai-guide-app.vercel.app) ·
    Source: TNEA 2026 Information Brochure (tneaonline.org) ·
    This sheet is informational. For binding decisions, always refer to official notifications.
  </div>

</div>

<script>
  // Auto-trigger the print dialog after a moment so user sees the formatted view first
  setTimeout(function(){
    // Don't auto-print; let the user click. Just focus the print button.
    var btn = document.querySelector('.print-bar button');
    if (btn) btn.focus();
  }, 100);
</script>
</body>
</html>`;
}

function renderConcessionSection(a: ConcessionAction, index: number): string {
  const docRows = a.documents
    .map(
      (d) => `
    <div class="doc-row">
      <div class="doc-title">☐ ${escapeHtml(d.name)}</div>
      <div class="doc-fields">
        <div class="doc-field"><strong>Issued by:</strong> ${escapeHtml(d.issuingAuthority)}</div>
        <div class="doc-field"><strong>Where to go:</strong> ${escapeHtml(d.whereToGo)}</div>
        <div class="doc-field"><strong>Fee:</strong> ${escapeHtml(d.typicalFee)} &nbsp;·&nbsp; <strong>Time:</strong> ${escapeHtml(d.processingTime)}</div>
      </div>
      ${d.notes ? `<div class="note">${escapeHtml(d.notes)}</div>` : ''}
    </div>`
    )
    .join('');

  const rejections = a.commonRejections
    .map((r) => `<li>${escapeHtml(r)}</li>`)
    .join('');
  const questions = a.questionsForCollegeOffice
    .map((q) => `<li>${escapeHtml(q)}</li>`)
    .join('');

  return `
  <h2>${index}. ${escapeHtml(a.title)}</h2>
  <div class="go-tag">📜 ${escapeHtml(a.governmentOrder)}</div>
  <div class="benefit-row"><strong>What you get:</strong> ${escapeHtml(a.benefit)}</div>

  <h3>Documents to Procure (tick when in hand)</h3>
  <div class="doc-list">${docRows}</div>

  <h3>Watch Out — Common Reasons Claims Get Rejected</h3>
  <ul class="rejection-list">${rejections}</ul>

  <h3>Questions to Ask the College Office</h3>
  <ul class="question-list">${questions}</ul>
`;
}

function renderPwDSection(p: PwDAction, disabilityName: string, index: number): string {
  const docRows = p.documents
    .map(
      (d) => `
    <div class="doc-row">
      <div class="doc-title">☐ ${escapeHtml(d.name)}</div>
      <div class="doc-fields">
        <div class="doc-field"><strong>Issued by:</strong> ${escapeHtml(d.issuingAuthority)}</div>
        <div class="doc-field"><strong>Where to go:</strong> ${escapeHtml(d.whereToGo)}</div>
        <div class="doc-field"><strong>Fee:</strong> ${escapeHtml(d.typicalFee)} &nbsp;·&nbsp; <strong>Time:</strong> ${escapeHtml(d.processingTime)}</div>
      </div>
      ${d.notes ? `<div class="note">${escapeHtml(d.notes)}</div>` : ''}
    </div>`
    )
    .join('');

  const procedure = p.medicalBoardProcedure
    .map((s) => `<li>${escapeHtml(s)}</li>`)
    .join('');
  const rejections = p.commonRejections
    .map((r) => `<li>${escapeHtml(r)}</li>`)
    .join('');
  const questions = p.questionsForCollegeOffice
    .map((q) => `<li>${escapeHtml(q)}</li>`)
    .join('');

  return `
  <h2>${index}. ${escapeHtml(p.certificateTitle)} <span class="badge">PwD</span></h2>
  <div class="go-tag">📜 ${escapeHtml(p.governmentOrder)}</div>
  ${disabilityName ? `<div style="font-size:10pt;color:#475569;margin-top:6px;"><strong>Your condition:</strong> ${escapeHtml(disabilityName)}</div>` : ''}
  <div class="benefit-row"><strong>What you get:</strong> ${escapeHtml(p.benefit)}</div>

  <h3>Documents to Procure</h3>
  <div class="doc-list">${docRows}</div>

  <h3>Medical Board Procedure — Step by Step</h3>
  <ol class="procedure-list">${procedure}</ol>

  <h3>Common Reasons PwD Certificates Get Rejected</h3>
  <ul class="rejection-list">${rejections}</ul>

  <h3>Questions to Ask the College Office</h3>
  <ul class="question-list">${questions}</ul>
`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Opens the action sheet in a new browser tab so the user can review,
 * print, or save as PDF.
 */
export function openActionSheet(data: ActionSheetData): void {
  const html = buildActionSheetHTML(data);
  const win = window.open('', '_blank');
  if (!win) {
    // Pop-up blocked — fallback: data URL download
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TNEA-2026-Action-Sheet-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return;
  }
  win.document.open();
  win.document.write(html);
  win.document.close();
}
