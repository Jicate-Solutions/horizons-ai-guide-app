import { College, CollegeCategory,
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
  VILUPPURAM_FEATURED_COLLEGES, VIRUDHUNAGAR_FEATURED_COLLEGES
} from './types';

const districtMap: Record<string, College[]> = {
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

const catToField: Record<string, string> = {
  'arts_science': 'arts', 'engineering': 'engineering', 'medical': 'medical',
  'dental': 'dental', 'nursing': 'nursing', 'pharmacy': 'pharmacy',
  'allied_health': 'allied', 'law': 'law', 'education': 'education',
  'agricultural': 'agriculture', 'physical_education': 'physical_ed',
  'polytechnic': 'polytechnic', 'architecture': 'architecture',
  'hotel_management': 'hotel', 'fine_arts': 'fine_arts', 'management': 'management',
};

export interface SQCollege {
  name: string;
  district: string;
  type: string;
  field: string;
  courses: string;
  feeRange?: string;
  naacGrade?: string;
  contact?: string;
  website?: string;
}

export const allSQColleges: SQCollege[] = Object.entries(districtMap).flatMap(([dist, colleges]) =>
  colleges.map(c => ({
    name: c.name,
    district: dist,
    type: c.type === 'government' ? 'Govt' : c.type === 'government-aided' ? 'Govt-Aided' : c.type === 'autonomous' ? 'Autonomous' : 'Private',
    field: catToField[c.category] || 'other',
    courses: c.courses,
    feeRange: c.feeRange,
    naacGrade: c.naacGrade,
    contact: c.contact,
    website: c.website,
  }))
);

export const sqFieldCounts = (): Record<string, number> => {
  const c: Record<string, number> = { All: allSQColleges.length };
  allSQColleges.forEach(col => { c[col.field] = (c[col.field] || 0) + 1; });
  return c;
};

export const sqDistricts = (): string[] => [...new Set(allSQColleges.map(c => c.district))].sort();
