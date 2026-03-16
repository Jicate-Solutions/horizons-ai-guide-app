// All colleges from all districts — used by Sports Quota Directory for field filtering
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

interface DistrictData { district: string; colleges: College[]; }

const allDistrictData: DistrictData[] = [
  { district: 'Ariyalur', colleges: ARIYALUR_FEATURED_COLLEGES },
  { district: 'Chengalpattu', colleges: CHENGALPATTU_FEATURED_COLLEGES },
  { district: 'Chennai', colleges: CHENNAI_FEATURED_COLLEGES },
  { district: 'Coimbatore', colleges: COIMBATORE_FEATURED_COLLEGES },
  { district: 'Cuddalore', colleges: CUDDALORE_FEATURED_COLLEGES },
  { district: 'Dharmapuri', colleges: DHARMAPURI_FEATURED_COLLEGES },
  { district: 'Dindigul', colleges: DINDIGUL_FEATURED_COLLEGES },
  { district: 'Erode', colleges: ERODE_FEATURED_COLLEGES },
  { district: 'Kallakurichi', colleges: KALLAKURICHI_FEATURED_COLLEGES },
  { district: 'Kanchipuram', colleges: KANCHIPURAM_FEATURED_COLLEGES },
  { district: 'Kanyakumari', colleges: KANYAKUMARI_FEATURED_COLLEGES },
  { district: 'Karur', colleges: KARUR_FEATURED_COLLEGES },
  { district: 'Krishnagiri', colleges: KRISHNAGIRI_FEATURED_COLLEGES },
  { district: 'Madurai', colleges: MADURAI_FEATURED_COLLEGES },
  { district: 'Mayiladuthurai', colleges: MAYILADUTHURAI_FEATURED_COLLEGES },
  { district: 'Nagapattinam', colleges: NAGAPATTINAM_FEATURED_COLLEGES },
  { district: 'Namakkal', colleges: NAMAKKAL_FEATURED_COLLEGES },
  { district: 'Nilgiris', colleges: NILGIRIS_FEATURED_COLLEGES },
  { district: 'Perambalur', colleges: PERAMBALUR_FEATURED_COLLEGES },
  { district: 'Pudukkottai', colleges: PUDUKKOTTAI_FEATURED_COLLEGES },
  { district: 'Ramanathapuram', colleges: RAMANATHAPURAM_FEATURED_COLLEGES },
  { district: 'Ranipet', colleges: RANIPET_FEATURED_COLLEGES },
  { district: 'Salem', colleges: SALEM_FEATURED_COLLEGES },
  { district: 'Sivaganga', colleges: SIVAGANGA_FEATURED_COLLEGES },
  { district: 'Tenkasi', colleges: TENKASI_FEATURED_COLLEGES },
  { district: 'Thanjavur', colleges: THANJAVUR_FEATURED_COLLEGES },
  { district: 'Theni', colleges: THENI_FEATURED_COLLEGES },
  { district: 'Thoothukudi', colleges: THOOTHUKUDI_FEATURED_COLLEGES },
  { district: 'Tiruchirappalli', colleges: TIRUCHIRAPPALLI_FEATURED_COLLEGES },
  { district: 'Tirunelveli', colleges: TIRUNELVELI_FEATURED_COLLEGES },
  { district: 'Tirupathur', colleges: TIRUPATHUR_FEATURED_COLLEGES },
  { district: 'Tirupur', colleges: TIRUPUR_FEATURED_COLLEGES },
  { district: 'Tiruvallur', colleges: TIRUVALLUR_FEATURED_COLLEGES },
  { district: 'Tiruvannamalai', colleges: TIRUVANNAMALAI_FEATURED_COLLEGES },
  { district: 'Tiruvarur', colleges: TIRUVARUR_FEATURED_COLLEGES },
  { district: 'Vellore', colleges: VELLORE_FEATURED_COLLEGES },
  { district: 'Villupuram', colleges: VILUPPURAM_FEATURED_COLLEGES },
  { district: 'Virudhunagar', colleges: VIRUDHUNAGAR_FEATURED_COLLEGES },
];

// Category to field mapping
const categoryToField: Record<CollegeCategory, string> = {
  'arts_science': 'arts',
  'engineering': 'engineering',
  'medical': 'medical',
  'dental': 'dental',
  'nursing': 'nursing',
  'pharmacy': 'pharmacy',
  'allied_health': 'allied',
  'law': 'law',
  'education': 'education',
  'agricultural': 'agriculture',
  'physical_education': 'physical_ed',
  'polytechnic': 'polytechnic',
  'architecture': 'architecture',
  'hotel_management': 'hotel',
  'fine_arts': 'fine_arts',
  'management': 'management',
};

export interface AllCollegeFlat {
  name: string;
  district: string;
  type: string;
  category: CollegeCategory;
  field: string;
  courses: string;
  feeRange?: string;
  naacGrade?: string;
  contact?: string;
  website?: string;
}

// Flatten all colleges
export const allCollegesFlat: AllCollegeFlat[] = allDistrictData.flatMap(d =>
  d.colleges.map(c => ({
    name: c.name,
    district: d.district,
    type: c.type === 'government' ? 'Govt' : c.type === 'government-aided' ? 'Govt-Aided' : c.type === 'autonomous' ? 'Autonomous' : 'Private',
    category: c.category,
    field: categoryToField[c.category] || 'other',
    courses: c.courses,
    feeRange: c.feeRange,
    naacGrade: c.naacGrade,
    contact: c.contact,
    website: c.website,
  }))
);

// Get counts per field
export const getFieldCounts = (): Record<string, number> => {
  const counts: Record<string, number> = {};
  allCollegesFlat.forEach(c => {
    counts[c.field] = (counts[c.field] || 0) + 1;
  });
  counts['All'] = allCollegesFlat.length;
  return counts;
};

// Get all districts that have colleges
export const getAllDistricts = (): string[] => {
  return [...new Set(allCollegesFlat.map(c => c.district))].sort();
};
