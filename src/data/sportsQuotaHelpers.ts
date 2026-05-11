/**
 * SPORTS QUOTA HELPERS
 *
 * Builds the full TN-wide sports quota college list by combining:
 *   1. TNEA universal rules (applies to all engineering colleges)
 *   2. College-specific overrides from COLLEGE_SPORTS_QUOTA (verified colleges)
 *   3. The base college database (CollegeSearch/types.ts)
 */

import {
  COLLEGE_SPORTS_QUOTA,
  CollegeSportsQuota,
  TNEA_RULES,
  CandidateProfile,
  checkTNEAEligibility,
  collegeAcceptsCandidateSport,
  compareLevels,
  EligibilityResult,
  Sport,
  Gender,
  VerificationStatus,
} from '@/data/sportsQuotaData';

import {
  NAMAKKAL_FEATURED_COLLEGES, ERODE_FEATURED_COLLEGES, SALEM_FEATURED_COLLEGES,
  COIMBATORE_FEATURED_COLLEGES, TIRUPUR_FEATURED_COLLEGES, KARUR_FEATURED_COLLEGES,
  ARIYALUR_FEATURED_COLLEGES, CHENGALPATTU_FEATURED_COLLEGES, CHENNAI_FEATURED_COLLEGES,
  CUDDALORE_FEATURED_COLLEGES, DHARMAPURI_FEATURED_COLLEGES, DINDIGUL_FEATURED_COLLEGES,
  KALLAKURICHI_FEATURED_COLLEGES, KANCHIPURAM_FEATURED_COLLEGES, KANYAKUMARI_FEATURED_COLLEGES,
  KRISHNAGIRI_FEATURED_COLLEGES, MADURAI_FEATURED_COLLEGES, MAYILADUTHURAI_FEATURED_COLLEGES,
  NAGAPATTINAM_FEATURED_COLLEGES, NILGIRIS_FEATURED_COLLEGES, PERAMBALUR_FEATURED_COLLEGES,
  PUDUKKOTTAI_FEATURED_COLLEGES, RAMANATHAPURAM_FEATURED_COLLEGES, RANIPET_FEATURED_COLLEGES,
  SIVAGANGA_FEATURED_COLLEGES, TENKASI_FEATURED_COLLEGES, THANJAVUR_FEATURED_COLLEGES,
  THENI_FEATURED_COLLEGES, THOOTHUKUDI_FEATURED_COLLEGES, TIRUCHIRAPPALLI_FEATURED_COLLEGES,
  TIRUNELVELI_FEATURED_COLLEGES, TIRUPATHUR_FEATURED_COLLEGES, TIRUVALLUR_FEATURED_COLLEGES,
  TIRUVANNAMALAI_FEATURED_COLLEGES, TIRUVARUR_FEATURED_COLLEGES, VELLORE_FEATURED_COLLEGES,
  VILUPPURAM_FEATURED_COLLEGES, VIRUDHUNAGAR_FEATURED_COLLEGES,
  College,
} from '@/components/CollegeSearch/types';

// District -> array map
const DISTRICT_COLLEGES: Record<string, College[]> = {
  'Ariyalur': ARIYALUR_FEATURED_COLLEGES, 'Chengalpattu': CHENGALPATTU_FEATURED_COLLEGES,
  'Chennai': CHENNAI_FEATURED_COLLEGES, 'Coimbatore': COIMBATORE_FEATURED_COLLEGES,
  'Cuddalore': CUDDALORE_FEATURED_COLLEGES, 'Dharmapuri': DHARMAPURI_FEATURED_COLLEGES,
  'Dindigul': DINDIGUL_FEATURED_COLLEGES, 'Erode': ERODE_FEATURED_COLLEGES,
  'Kallakurichi': KALLAKURICHI_FEATURED_COLLEGES, 'Kanchipuram': KANCHIPURAM_FEATURED_COLLEGES,
  'Kanyakumari': KANYAKUMARI_FEATURED_COLLEGES, 'Karur': KARUR_FEATURED_COLLEGES,
  'Krishnagiri': KRISHNAGIRI_FEATURED_COLLEGES, 'Madurai': MADURAI_FEATURED_COLLEGES,
  'Mayiladuthurai': MAYILADUTHURAI_FEATURED_COLLEGES, 'Nagapattinam': NAGAPATTINAM_FEATURED_COLLEGES,
  'Namakkal': NAMAKKAL_FEATURED_COLLEGES, 'Nilgiris': NILGIRIS_FEATURED_COLLEGES,
  'Perambalur': PERAMBALUR_FEATURED_COLLEGES, 'Pudukkottai': PUDUKKOTTAI_FEATURED_COLLEGES,
  'Ramanathapuram': RAMANATHAPURAM_FEATURED_COLLEGES, 'Ranipet': RANIPET_FEATURED_COLLEGES,
  'Salem': SALEM_FEATURED_COLLEGES, 'Sivaganga': SIVAGANGA_FEATURED_COLLEGES,
  'Tenkasi': TENKASI_FEATURED_COLLEGES, 'Thanjavur': THANJAVUR_FEATURED_COLLEGES,
  'Theni': THENI_FEATURED_COLLEGES, 'Thoothukudi': THOOTHUKUDI_FEATURED_COLLEGES,
  'Tiruchirappalli': TIRUCHIRAPPALLI_FEATURED_COLLEGES, 'Tirunelveli': TIRUNELVELI_FEATURED_COLLEGES,
  'Tirupathur': TIRUPATHUR_FEATURED_COLLEGES, 'Tirupur': TIRUPUR_FEATURED_COLLEGES,
  'Tiruvallur': TIRUVALLUR_FEATURED_COLLEGES, 'Tiruvannamalai': TIRUVANNAMALAI_FEATURED_COLLEGES,
  'Tiruvarur': TIRUVARUR_FEATURED_COLLEGES, 'Vellore': VELLORE_FEATURED_COLLEGES,
  'Villupuram': VILUPPURAM_FEATURED_COLLEGES, 'Virudhunagar': VIRUDHUNAGAR_FEATURED_COLLEGES,
};

const mapType = (t: College['type']): CollegeSportsQuota['type'] => {
  if (t === 'government') return 'Govt';
  if (t === 'government-aided') return 'Govt-Aided';
  if (t === 'autonomous') return 'Autonomous';
  return 'Private';
};

/**
 * Build the FULL list of TN engineering colleges with sports quota info.
 * - Verified colleges (e.g. Kongu) keep their override data.
 * - All other engineering colleges get TNEA defaults + "unverified" status,
 *   with the college's public contact details copied through so students
 *   can call to confirm.
 */
export const buildAllEngineeringQuotaColleges = (): CollegeSportsQuota[] => {
  const verifiedMap = new Map<string, CollegeSportsQuota>();
  COLLEGE_SPORTS_QUOTA.forEach(c => {
    // Use a normalised key for matching
    verifiedMap.set(normaliseName(c.collegeName), c);
  });

  const out: CollegeSportsQuota[] = [];

  // Start with all verified entries
  COLLEGE_SPORTS_QUOTA.forEach(c => out.push(c));

  // Then add every engineering college from each district as TNEA-default
  Object.entries(DISTRICT_COLLEGES).forEach(([district, colleges]) => {
    colleges.forEach(col => {
      if (col.category !== 'engineering') return;
      const key = normaliseName(col.name);
      if (verifiedMap.has(key)) return; // already in the list as verified

      out.push({
        id: col.id,
        collegeName: col.name,
        district,
        type: mapType(col.type),
        field: 'engineering',
        counsellingBody: 'TNEA',
        contact: {
          phone: col.contact,
          website: col.website,
        },
        verification: 'tnea-default' as VerificationStatus,
        sourceNote: 'TNEA universal rules apply. College-specific details not yet confirmed — please call to verify.',
      });
    });
  });

  return out;
};

const normaliseName = (s: string): string =>
  s.toLowerCase().replace(/[^a-z0-9]/g, '');

export interface CollegeMatch {
  college: CollegeSportsQuota;
  verdict: 'qualified' | 'borderline' | 'aim-higher' | 'sport-not-offered';
  matchReasonEn: string;
  matchReasonTa: string;
}

/**
 * Given a candidate's profile, return all colleges and how they match.
 * For direct-admission colleges with their own overrides (like PSG CAS),
 * the college's own minLevel is used instead of the TNEA default.
 */
export const findMatchingColleges = (
  candidate: CandidateProfile,
  baseEligibility: EligibilityResult,
): CollegeMatch[] => {
  const all = buildAllEngineeringQuotaColleges();

  return all.map(college => {
    // 1. Sport / gender restriction first
    const sportCheck = collegeAcceptsCandidateSport(college, candidate.sport, candidate.gender);
    if (!sportCheck.accepted) {
      return {
        college,
        verdict: 'sport-not-offered',
        matchReasonEn: sportCheck.reason || 'This college does not offer your sport.',
        matchReasonTa: 'இந்த கல்லூரி உங்கள் விளையாட்டை ஏற்கவில்லை.',
      };
    }

    // 2. Direct-admission colleges (not TNEA): use the college's own minLevel
    if (college.counsellingBody === 'Direct' && college.overrides?.minLevel) {
      const ownMin = college.overrides.minLevel;
      const levelOK = compareLevels(candidate.level, ownMin) >= 0;
      if (levelOK) {
        return {
          college,
          verdict: 'qualified',
          matchReasonEn: `This college accepts ${ownMin}-level or higher. You qualify.`,
          matchReasonTa: `இந்த கல்லூரி ${ownMin} அல்லது அதற்கு மேல் ஏற்கிறது. நீங்கள் தகுதியானவர்.`,
        };
      } else {
        return {
          college,
          verdict: 'borderline',
          matchReasonEn: `This college runs open trials. Even if your level is below their minimum, you can attend the trial and prove yourself.`,
          matchReasonTa: `இந்த கல்லூரி திறந்த தேர்வுகளை நடத்துகிறது. உங்கள் அளவு குறைவாக இருந்தாலும், நீங்கள் தேர்வில் பங்கேற்று உங்கள் திறமையை நிரூபிக்கலாம்.`,
        };
      }
    }

    // 3. Otherwise (TNEA), defer to base TNEA eligibility verdict
    return {
      college,
      verdict: baseEligibility.verdict,
      matchReasonEn: baseEligibility.reasonEn,
      matchReasonTa: baseEligibility.reasonTa,
    };
  });
};

/**
 * Sort results: qualified first, then borderline, by district closeness.
 */
export const sortByDistrict = (
  matches: CollegeMatch[],
  userDistrict?: string,
): CollegeMatch[] => {
  return [...matches].sort((a, b) => {
    // First by verdict
    const order = { qualified: 0, borderline: 1, 'aim-higher': 2, 'sport-not-offered': 3 };
    const v = order[a.verdict] - order[b.verdict];
    if (v !== 0) return v;
    // Then verified before unverified
    const ver = (col: CollegeSportsQuota) => col.verification === 'verified' ? 0 : 1;
    const verDiff = ver(a.college) - ver(b.college);
    if (verDiff !== 0) return verDiff;
    // Then by user's district
    if (userDistrict) {
      const aSame = a.college.district === userDistrict ? 0 : 1;
      const bSame = b.college.district === userDistrict ? 0 : 1;
      if (aSame !== bSame) return aSame - bSame;
    }
    return a.college.collegeName.localeCompare(b.college.collegeName);
  });
};

export { TNEA_RULES, checkTNEAEligibility };
export type { CandidateProfile, EligibilityResult };
