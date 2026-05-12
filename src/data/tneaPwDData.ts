/**
 * TNEA 2026 — PwD (Persons with Benchmark Disabilities) Data
 *
 * Source: Tamil Nadu Engineering Admissions 2026 Information Brochure
 *         Section 5 (Special Reservation) and Section 5.2 (Eligibility criteria
 *         for various disabilities). Reference: Letter No.9768/DAP-3.1/2017-24,
 *         dated 10.05.2024 from Welfare of Differently Abled Persons Dept.,
 *         Govt. of Tamil Nadu.
 *
 *   • 5 % horizontal PwD reservation applies across ALL categories.
 *   • 21 specified disabilities are recognised.
 *   • Minimum 40 % permanent impairment is required.
 *   • The certificate MUST come from a District Medical Board of 3 doctors
 *     (single-doctor certificates are rejected).
 *
 * BRANCH SUITABILITY MATRIX
 *   A) Mining Engg.  → ALL disabilities EXCLUDED (DGMS Circular 14/1972)
 *   B) Marine Engg.  → ALL disabilities EXCLUDED (Indian Maritime Univ. norms)
 *   C) CS/IT/AI/Data → Suitable for ALL disabilities
 *   D) All other UG  → Suitable for all EXCEPT 100% blind candidates
 */

export type PwDCertificate = 'II' | 'III' | 'IV' | 'V' | 'VI';

export interface PwDDisability {
  /** Serial number per the brochure */
  serial: number;
  /** Name shown to the candidate */
  name: string;
  /** Tamil name (where available) */
  nameTamil?: string;
  /** Plain-language description */
  description: string;
  /** Which Medical Certificate number applies */
  certificate: PwDCertificate;
  /** Broader category grouping */
  group:
    | 'Visual'
    | 'Hearing'
    | 'Locomotor'
    | 'Neurological / Mental'
    | 'Blood Disorder'
    | 'Multiple';
}

export const PWD_DISABILITIES: PwDDisability[] = [
  // ===== Visual (Cert II) =====
  {
    serial: 1,
    name: 'Blindness',
    nameTamil: 'பார்வையற்றோர்',
    description:
      'Total absence of sight, or visual acuity less than 3/60 (Snellen) in better eye after best correction, or field of vision under 10°.',
    certificate: 'II',
    group: 'Visual',
  },
  {
    serial: 2,
    name: 'Low-Vision',
    nameTamil: 'குறைவான பார்வை',
    description:
      'Visual acuity 6/18 to 6/60 with best correction in the better eye, or field-of-vision impairment.',
    certificate: 'II',
    group: 'Visual',
  },
  // ===== Hearing (Cert III) =====
  {
    serial: 4,
    name: 'Hearing Impairment (Deaf & Hard of Hearing)',
    nameTamil: 'காது கேளாமை',
    description:
      'Deaf: 70 dB loss in both ears in speech frequencies. Hard of hearing: 60-70 dB loss in both ears.',
    certificate: 'III',
    group: 'Hearing',
  },
  // ===== Locomotor & related (Cert IV) =====
  {
    serial: 3,
    name: 'Leprosy Cured Persons',
    description:
      'Cured of leprosy but with residual loss of sensation, paresis, or deformity affecting hands/feet/eye.',
    certificate: 'IV',
    group: 'Locomotor',
  },
  {
    serial: 5,
    name: 'Locomotor Disability',
    nameTamil: 'இயக்க இயலாமை',
    description:
      'Inability to execute movement of self/objects from musculoskeletal or nervous system affliction.',
    certificate: 'IV',
    group: 'Locomotor',
  },
  {
    serial: 6,
    name: 'Acid Attack Victims',
    description: 'Persons disfigured by violent assault with acid or similar corrosive substance.',
    certificate: 'IV',
    group: 'Locomotor',
  },
  {
    serial: 7,
    name: 'Dwarfism',
    description:
      'Medical or genetic condition resulting in an adult height of 4 ft 10 in (147 cm) or less.',
    certificate: 'IV',
    group: 'Locomotor',
  },
  {
    serial: 11,
    name: 'Cerebral Palsy',
    description:
      'Non-progressive neurological condition affecting body movement and muscle coordination from brain damage before/during/shortly after birth.',
    certificate: 'IV',
    group: 'Locomotor',
  },
  {
    serial: 12,
    name: 'Muscular Dystrophy',
    description:
      'Hereditary genetic muscle disease causing progressive skeletal muscle weakness from missing/incorrect gene information.',
    certificate: 'IV',
    group: 'Locomotor',
  },
  // ===== Neurological / Mental (Cert V) =====
  {
    serial: 8,
    name: 'Intellectual Disability',
    description:
      'Significant limitation in intellectual functioning (reasoning, learning, problem-solving) AND adaptive behaviour.',
    certificate: 'V',
    group: 'Neurological / Mental',
  },
  {
    serial: 9,
    name: 'Mental Illness',
    description:
      'Substantial disorder of thinking, mood, perception, orientation, or memory that grossly impairs judgement, behaviour, or ability to meet ordinary demands of life.',
    certificate: 'V',
    group: 'Neurological / Mental',
  },
  {
    serial: 10,
    name: 'Autism Spectrum Disorder',
    description:
      'Neuro-developmental condition appearing in first 3 years, affecting communication, relationships, and social interaction.',
    certificate: 'V',
    group: 'Neurological / Mental',
  },
  {
    serial: 13,
    name: 'Chronic Neurological Conditions',
    description:
      'Includes conditions like progressive nervous-system diseases — see Multiple Sclerosis & Parkinson\'s.',
    certificate: 'V',
    group: 'Neurological / Mental',
  },
  {
    serial: 14,
    name: 'Specific Learning Disabilities',
    description:
      'Heterogeneous deficits in processing spoken/written language — dyslexia, dysgraphia, dyscalculia, dyspraxia, developmental aphasia.',
    certificate: 'V',
    group: 'Neurological / Mental',
  },
  {
    serial: 15,
    name: 'Multiple Sclerosis',
    description:
      'Inflammatory nervous-system disease damaging myelin sheaths, affecting nerve communication.',
    certificate: 'V',
    group: 'Neurological / Mental',
  },
  {
    serial: 16,
    name: 'Speech and Language Disability',
    description:
      'Permanent disability arising from conditions like laryngectomy or aphasia affecting speech and language.',
    certificate: 'V',
    group: 'Neurological / Mental',
  },
  {
    serial: 21,
    name: "Parkinson's Disease",
    description:
      'Progressive nervous-system disease with tremor, muscular rigidity, slow imprecise movement.',
    certificate: 'V',
    group: 'Neurological / Mental',
  },
  // ===== Blood Disorders (Cert V) =====
  {
    serial: 17,
    name: 'Thalassemia',
    description: 'Group of inherited disorders with reduced or absent haemoglobin.',
    certificate: 'V',
    group: 'Blood Disorder',
  },
  {
    serial: 18,
    name: 'Hemophilia',
    description:
      'Inheritable disease (usually male, transmitted by females) characterised by impaired blood clotting.',
    certificate: 'V',
    group: 'Blood Disorder',
  },
  {
    serial: 19,
    name: 'Sickle Cell Disease',
    description:
      'Haemolytic disorder with chronic anaemia, painful episodes, and tissue/organ damage.',
    certificate: 'V',
    group: 'Blood Disorder',
  },
  // ===== Multiple (Cert VI) =====
  {
    serial: 20,
    name: 'Multiple Disabilities (including Deaf-Blindness)',
    description:
      'Combination of two or more of the above disabilities, including the deaf-blindness combination.',
    certificate: 'VI',
    group: 'Multiple',
  },
];

/**
 * Branch suitability matrix — for each branch family, which disabilities are
 * suitable (S), excluded (X), or "depends on severity" (D).
 */
export type Suitability = 'suitable' | 'excluded' | 'depends';

export interface BranchSuitabilityRow {
  branchFamily: string;
  /** Examples of branches in this family */
  examples: string[];
  /** Overall rule */
  rule: string;
  /** Per-disability disposition keyed by disability.serial */
  perDisability: Record<number, Suitability>;
}

/** Helper to mark all 21 disabilities with a single rule */
const allDisabilities = (rule: Suitability): Record<number, Suitability> => {
  const out: Record<number, Suitability> = {};
  PWD_DISABILITIES.forEach((d) => (out[d.serial] = rule));
  return out;
};

export const BRANCH_SUITABILITY: BranchSuitabilityRow[] = [
  {
    branchFamily: 'Mining Engineering',
    examples: ['B.E. Mining Engineering'],
    rule: 'All disabilities EXCLUDED — physical fitness required per DGMS Circular No. 14/1972.',
    perDisability: allDisabilities('excluded'),
  },
  {
    branchFamily: 'Marine Engineering',
    examples: ['B.E. Marine Engineering'],
    rule: 'All disabilities EXCLUDED per Indian Maritime University norms (height ≥157 cm, weight ≥48 kg, normal colour vision, age ≤25).',
    perDisability: allDisabilities('excluded'),
  },
  {
    branchFamily: 'Computer Science & IT Family',
    examples: [
      'CSE',
      'IT',
      'AI & Data Science',
      'AI & Machine Learning',
      'CSE (Cyber Security)',
      'CSE (Data Science)',
      'CSE (IoT)',
      'CSE (IoT & Cyber Security incl. Blockchain)',
      'Computer & Communication Engg.',
      'Computer Science & Business System',
      'Computer Science & Design',
      'Computer Science & Technology',
      'Computer Technology',
      'Cyber Security',
      'Information Science & Engg.',
      'M.Tech. CSE (5-yr Integrated)',
    ],
    rule: 'Suitable for ALL 21 disabilities.',
    perDisability: allDisabilities('suitable'),
  },
  {
    branchFamily: 'All Other B.E. / B.Tech. / B.Arch.',
    examples: [
      'Mechanical',
      'Civil',
      'Electrical & Electronics',
      'Electronics & Communication',
      'Chemical',
      'Biomedical',
      'Aerospace',
      'Automobile',
      'Architecture',
      '...and others',
    ],
    rule: 'Suitable for all disabilities EXCEPT 100 % blindness.',
    perDisability: (() => {
      const out = allDisabilities('suitable');
      // 100% blindness is the only exclusion. We treat Blindness (serial 1)
      // as "depends" since it depends on the severity level.
      out[1] = 'depends';
      return out;
    })(),
  },
];

/**
 * Critical fitness criteria for restricted branches.
 */
export const RESTRICTED_BRANCH_NORMS = {
  marine: {
    branch: 'Marine Engineering',
    norms: [
      'Minimum 60 % average in PCM',
      'Minimum 50 % in English (10th OR 12th)',
      'Maximum age 25 years',
      'Minimum height 157 cm',
      'Minimum weight 48 kg',
      'Normal colour vision',
      'Common Entrance Test (CET) by IMU is mandatory',
      'Physical fitness certificate from DG Shipping-authorised Medical Officer required at admission',
    ],
  },
  mining: {
    branch: 'Mining Engineering',
    norms: [
      'Female candidates: cannot work below ground per Mines Act 1952',
      'Female candidates: above-ground work only between 6 AM – 7 PM',
      'Per Coal Mines Regulation 1957: adolescents/women cannot use shaft cage unaccompanied by adult males',
      'All disabilities are excluded per DGMS Circular No. 14/1972',
    ],
  },
};

/** Disability suitability summary helper */
export const getSuitabilityForBranch = (
  disabilitySerial: number,
  branchFamilyName: string
): Suitability | null => {
  const row = BRANCH_SUITABILITY.find((b) => b.branchFamily === branchFamilyName);
  if (!row) return null;
  return row.perDisability[disabilitySerial] || null;
};
