// Official TN State Board 12th Group Codes
export type StudentGroup = 
  // Science Groups (Maths-based) - 100 Series
  | '101' | '102' | '103' | '104' | '105' | '106'
  // Science Groups (Biology-based) - 200 Series
  | '201' | '202' | '203' | '204' | '205' | '206' | '207' | '208'
  // Commerce Groups - 300 Series
  | '301' | '302' | '303' | '304' | '305' | '306' | '307' | '308'
  // Arts/Humanities Groups - 400 Series
  | '401' | '402' | '403' | '404' | '405' | '406';

export type GroupCategory = 'science_maths' | 'science_bio' | 'commerce' | 'arts';

export type Category = 'OC' | 'BC' | 'BCM' | 'MBC' | 'DNC' | 'SC' | 'SCA' | 'ST' | 'EWS';

export interface GroupInfo {
  id: StudentGroup;
  code: string;
  name: string;
  category: GroupCategory;
  icon: string;
  subjects: string[];
  careers: string[];
  color: string;
  bgColor: string;
}

export interface MarksEntry {
  subject: string;
  marks: number | null;
  maxMarks: number;
  icon: string;
}

export interface CutoffResult {
  tneaCutoff?: number;
  tneaCutoff100?: number;
  overallPercentage: number;
  percentile: number;
  neetScore?: number;
  /**
   * 12th science aggregate reduced to a base of 200 — the metric the
   * TN Selection Committee uses for Paramedical Degree Courses
   * (B.Pharm, B.Sc Nursing, BPT, etc.) and Pharm.D admissions.
   * Formula: sum of the four prescribed science subjects of the
   * student's group (each /100, so total /400), divided by 2.
   * Works for all Bio groups (201-208) including Group 208's
   * Botany + Zoology split, and Bio-Maths groups 103/104.
   */
  paramedicalScore?: number;
}

export interface EligibleCourse {
  id: string;
  name: string;
  fullName: string;
  icon: string;
  collegeCount: number;
  eligibilityStatus: 'eligible' | 'borderline' | 'not_eligible';
  cutoffRequired?: number;
  userCutoff?: number;
  note?: string;
  entranceExam?: string;
  isJKKN?: boolean;
  fee?: string;
  placement?: string;
}

export interface VocationalStream {
  id: string;
  name: string;
}

export interface ArtsSubject {
  id: string;
  name: string;
  selected: boolean;
}

// Group data organized by series
export const GROUP_SERIES = {
  SCIENCE_MATHS: '100',
  SCIENCE_BIO: '200',
  COMMERCE: '300',
  ARTS: '400',
} as const;

// Helper to identify group category
export const getGroupCategory = (groupCode: StudentGroup): GroupCategory => {
  const code = parseInt(groupCode);
  if (code >= 100 && code < 200) return 'science_maths';
  if (code >= 200 && code < 300) return 'science_bio';
  if (code >= 300 && code < 400) return 'commerce';
  return 'arts';
};

// Check if group is eligible for TNEA Engineering counseling
export const isEligibleForTNEA = (groupCode: StudentGroup): boolean => {
  const category = getGroupCategory(groupCode);
  return category === 'science_maths' || groupCode === '103' || groupCode === '104';
};

// Check if group is eligible for Medical/NEET counseling
export const isEligibleForMedical = (groupCode: StudentGroup): boolean => {
  const category = getGroupCategory(groupCode);
  return category === 'science_bio' || groupCode === '103' || groupCode === '104';
};

/**
 * Eligibility for TN Paramedical Degree Courses (unified counselling).
 * Per the TN Selection Committee, ONE counselling covers all 19 paramedical
 * degrees including B.Sc Nursing, B.Pharm, BPT, B.O.T, BMLT, B.Optom, etc.
 * Admission is purely merit-based on 12th science marks reduced to a base
 * of 200; no entrance exam.
 *
 * Most courses (Nursing, BPT, MLT, etc.) require PCB.
 * B.Pharm accepts both PCB and PCM.
 * B.Optom / B.ASLP accept PCM as well.
 * So any Science group qualifies for at least some course in this counselling.
 */
export const isEligibleForParamedicalDegree = (groupCode: StudentGroup): boolean => {
  const category = getGroupCategory(groupCode);
  return category === 'science_maths' || category === 'science_bio';
};

/**
 * Eligibility for TN Pharm.D (6-year direct entry, separate from the unified
 * Paramedical counselling). PCB or PCM groups qualify; merit on 12th science
 * marks /200. The 3-year Post-Baccalaureate variant requires a B.Pharm degree
 * and is not an HSC-level admission, so it is not modelled by group code.
 */
export const isEligibleForPharmD = (groupCode: StudentGroup): boolean => {
  const category = getGroupCategory(groupCode);
  return category === 'science_maths' || category === 'science_bio';
};
