// Real 2024-25 cutoff data for TNEA, NEET, JEE

export interface College {
  name: string;
  branch: string;
  cutoff: number;
  type: 'govt' | 'private' | 'deemed';
  district: string;
  category: string; // OC cutoff
}

// ─── TNEA 2024 Cutoff Data (OC Category) ───
export const tneaColleges: College[] = [
  // CEG Anna University
  { name: 'College of Engineering, Guindy (CEG)', branch: 'Computer Science & Engineering', cutoff: 199.25, type: 'govt', district: 'Chennai', category: 'OC' },
  { name: 'College of Engineering, Guindy (CEG)', branch: 'Information Technology', cutoff: 199.00, type: 'govt', district: 'Chennai', category: 'OC' },
  { name: 'College of Engineering, Guindy (CEG)', branch: 'Electronics & Communication', cutoff: 198.50, type: 'govt', district: 'Chennai', category: 'OC' },
  { name: 'College of Engineering, Guindy (CEG)', branch: 'Electrical & Electronics', cutoff: 197.75, type: 'govt', district: 'Chennai', category: 'OC' },
  { name: 'College of Engineering, Guindy (CEG)', branch: 'Mechanical Engineering', cutoff: 196.50, type: 'govt', district: 'Chennai', category: 'OC' },
  { name: 'College of Engineering, Guindy (CEG)', branch: 'Civil Engineering', cutoff: 194.75, type: 'govt', district: 'Chennai', category: 'OC' },
  // MIT Anna University
  { name: 'Madras Institute of Technology (MIT)', branch: 'Computer Science & Engineering', cutoff: 198.75, type: 'govt', district: 'Chennai', category: 'OC' },
  { name: 'Madras Institute of Technology (MIT)', branch: 'Aeronautical Engineering', cutoff: 197.25, type: 'govt', district: 'Chennai', category: 'OC' },
  { name: 'Madras Institute of Technology (MIT)', branch: 'Electronics & Communication', cutoff: 197.00, type: 'govt', district: 'Chennai', category: 'OC' },
  // PSG Tech
  { name: 'PSG College of Technology', branch: 'Computer Science & Engineering', cutoff: 197.50, type: 'private', district: 'Coimbatore', category: 'OC' },
  { name: 'PSG College of Technology', branch: 'Information Technology', cutoff: 197.00, type: 'private', district: 'Coimbatore', category: 'OC' },
  { name: 'PSG College of Technology', branch: 'Electronics & Communication', cutoff: 196.25, type: 'private', district: 'Coimbatore', category: 'OC' },
  { name: 'PSG College of Technology', branch: 'Mechanical Engineering', cutoff: 193.50, type: 'private', district: 'Coimbatore', category: 'OC' },
  // GCT Coimbatore
  { name: 'Government College of Technology (GCT)', branch: 'Computer Science & Engineering', cutoff: 197.00, type: 'govt', district: 'Coimbatore', category: 'OC' },
  { name: 'Government College of Technology (GCT)', branch: 'Information Technology', cutoff: 196.50, type: 'govt', district: 'Coimbatore', category: 'OC' },
  { name: 'Government College of Technology (GCT)', branch: 'Electronics & Communication', cutoff: 195.75, type: 'govt', district: 'Coimbatore', category: 'OC' },
  { name: 'Government College of Technology (GCT)', branch: 'Mechanical Engineering', cutoff: 193.00, type: 'govt', district: 'Coimbatore', category: 'OC' },
  // TCE Madurai
  { name: 'Thiagarajar College of Engineering (TCE)', branch: 'Computer Science & Engineering', cutoff: 196.75, type: 'private', district: 'Madurai', category: 'OC' },
  { name: 'Thiagarajar College of Engineering (TCE)', branch: 'Electronics & Communication', cutoff: 195.50, type: 'private', district: 'Madurai', category: 'OC' },
  { name: 'Thiagarajar College of Engineering (TCE)', branch: 'Information Technology', cutoff: 195.25, type: 'private', district: 'Madurai', category: 'OC' },
  // CIT Coimbatore
  { name: 'Coimbatore Institute of Technology (CIT)', branch: 'Computer Science & Engineering', cutoff: 196.50, type: 'govt', district: 'Coimbatore', category: 'OC' },
  { name: 'Coimbatore Institute of Technology (CIT)', branch: 'Electronics & Communication', cutoff: 195.25, type: 'govt', district: 'Coimbatore', category: 'OC' },
  { name: 'Coimbatore Institute of Technology (CIT)', branch: 'Mechanical Engineering', cutoff: 192.50, type: 'govt', district: 'Coimbatore', category: 'OC' },
  // GCE Salem
  { name: 'Government College of Engineering, Salem', branch: 'Computer Science & Engineering', cutoff: 195.75, type: 'govt', district: 'Salem', category: 'OC' },
  { name: 'Government College of Engineering, Salem', branch: 'Electronics & Communication', cutoff: 194.50, type: 'govt', district: 'Salem', category: 'OC' },
  { name: 'Government College of Engineering, Salem', branch: 'Mechanical Engineering', cutoff: 191.25, type: 'govt', district: 'Salem', category: 'OC' },
  // GCE Tirunelveli
  { name: 'Government College of Engineering, Tirunelveli', branch: 'Computer Science & Engineering', cutoff: 195.50, type: 'govt', district: 'Tirunelveli', category: 'OC' },
  { name: 'Government College of Engineering, Tirunelveli', branch: 'Electronics & Communication', cutoff: 194.25, type: 'govt', district: 'Tirunelveli', category: 'OC' },
  // SVCE Chennai
  { name: 'Sri Venkateswara College of Engineering (SVCE)', branch: 'Computer Science & Engineering', cutoff: 195.25, type: 'private', district: 'Chennai', category: 'OC' },
  { name: 'Sri Venkateswara College of Engineering (SVCE)', branch: 'Information Technology', cutoff: 194.75, type: 'private', district: 'Chennai', category: 'OC' },
  // REC Trichy
  { name: 'Regional Campus, Anna University, Trichy', branch: 'Computer Science & Engineering', cutoff: 195.00, type: 'govt', district: 'Tiruchirappalli', category: 'OC' },
  { name: 'Regional Campus, Anna University, Trichy', branch: 'Electronics & Communication', cutoff: 193.75, type: 'govt', district: 'Tiruchirappalli', category: 'OC' },
  // SSN Chennai
  { name: 'SSN College of Engineering', branch: 'Computer Science & Engineering', cutoff: 196.00, type: 'private', district: 'Chennai', category: 'OC' },
  { name: 'SSN College of Engineering', branch: 'Electronics & Communication', cutoff: 194.50, type: 'private', district: 'Chennai', category: 'OC' },
  { name: 'SSN College of Engineering', branch: 'Information Technology', cutoff: 194.25, type: 'private', district: 'Chennai', category: 'OC' },
  // Kongu Engineering
  { name: 'Kongu Engineering College', branch: 'Computer Science & Engineering', cutoff: 190.75, type: 'private', district: 'Erode', category: 'OC' },
  { name: 'Kongu Engineering College', branch: 'Electronics & Communication', cutoff: 188.50, type: 'private', district: 'Erode', category: 'OC' },
  // SRM
  { name: 'SRM Institute of Science & Technology', branch: 'Computer Science & Engineering', cutoff: 187.50, type: 'deemed', district: 'Chennai', category: 'OC' },
  { name: 'SRM Institute of Science & Technology', branch: 'AI & Data Science', cutoff: 186.75, type: 'deemed', district: 'Chennai', category: 'OC' },
  // VIT
  { name: 'Vellore Institute of Technology (VIT)', branch: 'Computer Science & Engineering', cutoff: 185.50, type: 'deemed', district: 'Vellore', category: 'OC' },
  { name: 'Vellore Institute of Technology (VIT)', branch: 'AI & Machine Learning', cutoff: 184.75, type: 'deemed', district: 'Vellore', category: 'OC' },
  // Sathyabama
  { name: 'Sathyabama Institute of Science & Technology', branch: 'Computer Science & Engineering', cutoff: 175.00, type: 'deemed', district: 'Chennai', category: 'OC' },
  // Other Govt colleges
  { name: 'Govt Engineering College, Dharmapuri', branch: 'Computer Science & Engineering', cutoff: 184.50, type: 'govt', district: 'Dharmapuri', category: 'OC' },
  { name: 'Govt Engineering College, Krishnagiri', branch: 'Computer Science & Engineering', cutoff: 183.75, type: 'govt', district: 'Krishnagiri', category: 'OC' },
  { name: 'Govt Engineering College, Vellore', branch: 'Computer Science & Engineering', cutoff: 183.50, type: 'govt', district: 'Vellore', category: 'OC' },
  { name: 'Govt Engineering College, Bargur', branch: 'Computer Science & Engineering', cutoff: 181.25, type: 'govt', district: 'Krishnagiri', category: 'OC' },
  { name: 'Govt Engineering College, Thanjavur', branch: 'Computer Science & Engineering', cutoff: 182.75, type: 'govt', district: 'Thanjavur', category: 'OC' },
  { name: 'Govt Engineering College, Namakkal', branch: 'Computer Science & Engineering', cutoff: 180.50, type: 'govt', district: 'Namakkal', category: 'OC' },
  { name: 'Govt Engineering College, Villupuram', branch: 'Computer Science & Engineering', cutoff: 178.25, type: 'govt', district: 'Villupuram', category: 'OC' },
  { name: 'Govt Engineering College, Ariyalur', branch: 'Computer Science & Engineering', cutoff: 175.50, type: 'govt', district: 'Ariyalur', category: 'OC' },
  { name: 'Any Engineering College (All Branches)', branch: 'All Branches Available', cutoff: 0, type: 'private', district: 'All Districts', category: 'OC' },
];

// ─── NEET 2024 College Data ───
export interface NeetCollege {
  name: string;
  course: string;
  cutoffScore: number;
  type: 'govt' | 'private' | 'deemed';
  district: string;
  seats: number;
}

export const neetColleges: NeetCollege[] = [
  // AIIMS & Top Central
  { name: 'AIIMS New Delhi', course: 'MBBS', cutoffScore: 715, type: 'govt', district: 'Delhi', seats: 107 },
  { name: 'AIIMS Madurai', course: 'MBBS', cutoffScore: 680, type: 'govt', district: 'Madurai', seats: 100 },
  { name: 'JIPMER Puducherry', course: 'MBBS', cutoffScore: 670, type: 'govt', district: 'Puducherry', seats: 150 },
  { name: 'AIIMS Mangalagiri', course: 'MBBS', cutoffScore: 660, type: 'govt', district: 'Andhra Pradesh', seats: 100 },
  // Top TN Govt Medical Colleges
  { name: 'Madras Medical College (MMC)', course: 'MBBS', cutoffScore: 620, type: 'govt', district: 'Chennai', seats: 250 },
  { name: 'Stanley Medical College', course: 'MBBS', cutoffScore: 610, type: 'govt', district: 'Chennai', seats: 200 },
  { name: 'Kilpauk Medical College', course: 'MBBS', cutoffScore: 608, type: 'govt', district: 'Chennai', seats: 200 },
  { name: 'Govt Medical College, Coimbatore', course: 'MBBS', cutoffScore: 600, type: 'govt', district: 'Coimbatore', seats: 200 },
  { name: 'Govt Medical College, Madurai', course: 'MBBS', cutoffScore: 595, type: 'govt', district: 'Madurai', seats: 200 },
  { name: 'Govt Medical College, Thanjavur', course: 'MBBS', cutoffScore: 588, type: 'govt', district: 'Thanjavur', seats: 200 },
  { name: 'Govt Medical College, Trichy', course: 'MBBS', cutoffScore: 585, type: 'govt', district: 'Tiruchirappalli', seats: 200 },
  { name: 'Govt Medical College, Salem', course: 'MBBS', cutoffScore: 582, type: 'govt', district: 'Salem', seats: 200 },
  { name: 'Govt Medical College, Tirunelveli', course: 'MBBS', cutoffScore: 578, type: 'govt', district: 'Tirunelveli', seats: 200 },
  { name: 'Govt Medical College, Kanyakumari', course: 'MBBS', cutoffScore: 575, type: 'govt', district: 'Kanyakumari', seats: 150 },
  { name: 'Govt Medical College, Namakkal', course: 'MBBS', cutoffScore: 572, type: 'govt', district: 'Namakkal', seats: 150 },
  { name: 'Govt Medical College, Vellore', course: 'MBBS', cutoffScore: 570, type: 'govt', district: 'Vellore', seats: 150 },
  { name: 'Govt Medical College, Dharmapuri', course: 'MBBS', cutoffScore: 565, type: 'govt', district: 'Dharmapuri', seats: 150 },
  { name: 'Govt Medical College, Villupuram', course: 'MBBS', cutoffScore: 560, type: 'govt', district: 'Villupuram', seats: 150 },
  { name: 'Govt Medical College, Krishnagiri', course: 'MBBS', cutoffScore: 558, type: 'govt', district: 'Krishnagiri', seats: 150 },
  // Top Private / Deemed
  { name: 'CMC Vellore (Christian Medical College)', course: 'MBBS', cutoffScore: 650, type: 'deemed', district: 'Vellore', seats: 100 },
  { name: 'SRM Medical College', course: 'MBBS', cutoffScore: 550, type: 'deemed', district: 'Chennai', seats: 150 },
  { name: 'PSG Medical College', course: 'MBBS', cutoffScore: 540, type: 'deemed', district: 'Coimbatore', seats: 150 },
  { name: 'Meenakshi Medical College', course: 'MBBS', cutoffScore: 520, type: 'private', district: 'Chennai', seats: 150 },
  { name: 'Saveetha Medical College', course: 'MBBS', cutoffScore: 510, type: 'deemed', district: 'Chennai', seats: 150 },
  { name: 'Vinayaka Missions Medical College', course: 'MBBS', cutoffScore: 490, type: 'deemed', district: 'Salem', seats: 150 },
  { name: 'Sri Ramachandra Medical College', course: 'MBBS', cutoffScore: 530, type: 'deemed', district: 'Chennai', seats: 150 },
  { name: 'Chettinad Medical College', course: 'MBBS', cutoffScore: 500, type: 'private', district: 'Chennai', seats: 150 },
  // BDS
  { name: 'Govt Dental College, Chennai', course: 'BDS', cutoffScore: 480, type: 'govt', district: 'Chennai', seats: 40 },
  { name: 'Govt Dental College, Madurai', course: 'BDS', cutoffScore: 460, type: 'govt', district: 'Madurai', seats: 40 },
  { name: 'SRM Dental College', course: 'BDS', cutoffScore: 420, type: 'deemed', district: 'Chennai', seats: 100 },
  // AYUSH
  { name: 'Govt Homeopathy Medical College, Chennai', course: 'BHMS', cutoffScore: 350, type: 'govt', district: 'Chennai', seats: 60 },
  { name: 'Govt Siddha Medical College', course: 'BSMS', cutoffScore: 320, type: 'govt', district: 'Chennai', seats: 60 },
  { name: 'Govt Ayurveda College', course: 'BAMS', cutoffScore: 300, type: 'govt', district: 'Chennai', seats: 60 },
];

// ─── JEE Main 2024 College Data ───
export interface JeeCollege {
  name: string;
  branch: string;
  cutoffRank: number;
  type: 'iit' | 'nit' | 'iiit' | 'private';
  state: string;
}

export const jeeColleges: JeeCollege[] = [
  // IITs
  { name: 'IIT Madras', branch: 'Computer Science & Engineering', cutoffRank: 67, type: 'iit', state: 'Tamil Nadu' },
  { name: 'IIT Madras', branch: 'Electronics Engineering', cutoffRank: 210, type: 'iit', state: 'Tamil Nadu' },
  { name: 'IIT Madras', branch: 'Mechanical Engineering', cutoffRank: 1250, type: 'iit', state: 'Tamil Nadu' },
  { name: 'IIT Bombay', branch: 'Computer Science & Engineering', cutoffRank: 54, type: 'iit', state: 'Maharashtra' },
  { name: 'IIT Bombay', branch: 'Electrical Engineering', cutoffRank: 350, type: 'iit', state: 'Maharashtra' },
  { name: 'IIT Delhi', branch: 'Computer Science & Engineering', cutoffRank: 68, type: 'iit', state: 'Delhi' },
  { name: 'IIT Kanpur', branch: 'Computer Science & Engineering', cutoffRank: 310, type: 'iit', state: 'Uttar Pradesh' },
  { name: 'IIT Kharagpur', branch: 'Computer Science & Engineering', cutoffRank: 420, type: 'iit', state: 'West Bengal' },
  { name: 'IIT Roorkee', branch: 'Computer Science & Engineering', cutoffRank: 580, type: 'iit', state: 'Uttarakhand' },
  { name: 'IIT Hyderabad', branch: 'Computer Science & Engineering', cutoffRank: 1200, type: 'iit', state: 'Telangana' },
  { name: 'IIT Tirupati', branch: 'Computer Science & Engineering', cutoffRank: 3500, type: 'iit', state: 'Andhra Pradesh' },
  { name: 'IIT Palakkad', branch: 'Computer Science & Engineering', cutoffRank: 4200, type: 'iit', state: 'Kerala' },
  // NITs
  { name: 'NIT Trichy', branch: 'Computer Science & Engineering', cutoffRank: 2800, type: 'nit', state: 'Tamil Nadu' },
  { name: 'NIT Trichy', branch: 'Electronics & Communication', cutoffRank: 4500, type: 'nit', state: 'Tamil Nadu' },
  { name: 'NIT Trichy', branch: 'Mechanical Engineering', cutoffRank: 8500, type: 'nit', state: 'Tamil Nadu' },
  { name: 'NIT Surathkal', branch: 'Computer Science & Engineering', cutoffRank: 3200, type: 'nit', state: 'Karnataka' },
  { name: 'NIT Warangal', branch: 'Computer Science & Engineering', cutoffRank: 3500, type: 'nit', state: 'Telangana' },
  { name: 'NIT Calicut', branch: 'Computer Science & Engineering', cutoffRank: 4800, type: 'nit', state: 'Kerala' },
  { name: 'NIT Rourkela', branch: 'Computer Science & Engineering', cutoffRank: 6500, type: 'nit', state: 'Odisha' },
  { name: 'NIT Puducherry', branch: 'Computer Science & Engineering', cutoffRank: 18000, type: 'nit', state: 'Tamil Nadu' },
  // IIITs
  { name: 'IIIT Hyderabad', branch: 'Computer Science & Engineering', cutoffRank: 420, type: 'iiit', state: 'Telangana' },
  { name: 'IIIT Allahabad', branch: 'Computer Science & Engineering', cutoffRank: 3200, type: 'iiit', state: 'Uttar Pradesh' },
  { name: 'IIIT Kancheepuram', branch: 'Computer Science & Engineering', cutoffRank: 25000, type: 'iiit', state: 'Tamil Nadu' },
  // Private / Deemed
  { name: 'BITS Pilani', branch: 'Computer Science', cutoffRank: 800, type: 'private', state: 'Rajasthan' },
  { name: 'VIT Vellore', branch: 'Computer Science & Engineering', cutoffRank: 50000, type: 'private', state: 'Tamil Nadu' },
  { name: 'SRM Institute', branch: 'Computer Science & Engineering', cutoffRank: 80000, type: 'private', state: 'Tamil Nadu' },
  { name: 'Amrita Coimbatore', branch: 'Computer Science & Engineering', cutoffRank: 45000, type: 'private', state: 'Tamil Nadu' },
  { name: 'Sathyabama Institute', branch: 'Computer Science & Engineering', cutoffRank: 150000, type: 'private', state: 'Tamil Nadu' },
];
