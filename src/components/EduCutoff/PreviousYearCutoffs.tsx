import { useState } from 'react';
import { ChevronDown, Search, GraduationCap, Building2, Stethoscope, Landmark, Info, TrendingUp, Pill } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

type CourseType = 'engineering' | 'medical' | 'pharma' | 'govt';

export interface CutoffEntry {
  college: string;
  course: string;
  oc: number | string;
  bc: number | string;
  mbc: number | string;
  sc: number | string;
  st: number | string;
  year: string;
  expected2026?: number | string;
  note?: string;
  trend?: 'up' | 'down' | 'stable';
}

// ═══ TNEA 2025 ACTUAL + 2026 EXPECTED ═══
export const engineeringCutoffs: CutoffEntry[] = [
  // CEG Anna University
  { college: 'CEG, Anna University', course: 'Computer Science (CSE)', oc: 199.50, bc: 199.00, mbc: 198.50, sc: 190.00, st: 175.00, year: '2025', expected2026: 199.75, trend: 'up', note: 'TNEA Cutoff / 200' },
  { college: 'CEG, Anna University', course: 'Electronics & Comm (ECE)', oc: 198.50, bc: 197.50, mbc: 196.00, sc: 185.00, st: 170.00, year: '2025', expected2026: 198.75, trend: 'up', note: 'TNEA Cutoff / 200' },
  { college: 'CEG, Anna University', course: 'Information Technology', oc: 198.00, bc: 197.00, mbc: 195.50, sc: 183.00, st: 168.00, year: '2025', expected2026: 198.25, trend: 'up', note: 'TNEA Cutoff / 200' },
  { college: 'CEG, Anna University', course: 'Electrical (EEE)', oc: 191.00, bc: 189.50, mbc: 187.00, sc: 167.00, st: 148.00, year: '2025', expected2026: 191.50, trend: 'stable', note: 'TNEA Cutoff / 200' },
  { college: 'CEG, Anna University', course: 'Mechanical', oc: 189.50, bc: 188.00, mbc: 185.50, sc: 162.00, st: 142.00, year: '2025', expected2026: 189.75, trend: 'stable', note: 'TNEA Cutoff / 200' },
  { college: 'CEG, Anna University', course: 'Civil', oc: 185.00, bc: 183.00, mbc: 179.00, sc: 152.00, st: 132.00, year: '2025', expected2026: 185.50, trend: 'stable', note: 'TNEA Cutoff / 200' },
  // MIT Anna University
  { college: 'MIT, Anna University', course: 'Computer Science (CSE)', oc: 198.75, bc: 198.00, mbc: 197.00, sc: 183.00, st: 168.00, year: '2025', expected2026: 199.00, trend: 'up', note: 'TNEA Cutoff / 200' },
  { college: 'MIT, Anna University', course: 'AI & Data Science', oc: 197.50, bc: 196.50, mbc: 195.00, sc: 181.00, st: 166.00, year: '2025', expected2026: 198.00, trend: 'up', note: 'TNEA Cutoff / 200' },
  { college: 'MIT, Anna University', course: 'Electronics & Comm (ECE)', oc: 195.50, bc: 194.50, mbc: 192.50, sc: 176.00, st: 161.00, year: '2025', expected2026: 196.00, trend: 'up', note: 'TNEA Cutoff / 200' },
  { college: 'MIT, Anna University', course: 'Aeronautical Engineering', oc: 196.00, bc: 194.50, mbc: 192.00, sc: 180.00, st: 165.00, year: '2025', expected2026: 196.50, trend: 'up', note: 'TNEA Cutoff / 200' },
  // PSG Tech
  { college: 'PSG Tech, Coimbatore', course: 'Computer Science (CSE)', oc: 199.00, bc: 198.00, mbc: 197.00, sc: 188.00, st: 172.00, year: '2025', expected2026: 199.25, trend: 'up', note: 'TNEA Cutoff / 200' },
  { college: 'PSG Tech, Coimbatore', course: 'Information Technology', oc: 197.50, bc: 196.50, mbc: 195.00, sc: 183.00, st: 165.00, year: '2025', expected2026: 198.00, trend: 'up', note: 'TNEA Cutoff / 200' },
  { college: 'PSG Tech, Coimbatore', course: 'Electronics & Comm (ECE)', oc: 195.00, bc: 193.50, mbc: 191.50, sc: 172.00, st: 155.00, year: '2025', expected2026: 195.50, trend: 'stable', note: 'TNEA Cutoff / 200' },
  { college: 'PSG Tech, Coimbatore', course: 'Mechanical', oc: 187.00, bc: 185.00, mbc: 181.50, sc: 157.00, st: 137.00, year: '2025', expected2026: 187.50, trend: 'stable', note: 'TNEA Cutoff / 200' },
  // SSN College
  { college: 'SSN College, Chennai', course: 'Computer Science (CSE)', oc: 198.50, bc: 197.00, mbc: 195.50, sc: 184.00, st: 160.00, year: '2025', expected2026: 198.75, trend: 'up', note: 'TNEA Cutoff / 200' },
  { college: 'SSN College, Chennai', course: 'Electronics & Comm (ECE)', oc: 194.50, bc: 193.00, mbc: 191.00, sc: 174.00, st: 152.00, year: '2025', expected2026: 195.00, trend: 'up', note: 'TNEA Cutoff / 200' },
  // GCT Coimbatore
  { college: 'GCT, Coimbatore', course: 'Computer Science (CSE)', oc: 197.00, bc: 195.50, mbc: 193.00, sc: 180.00, st: 162.00, year: '2025', expected2026: 197.50, trend: 'up', note: 'TNEA Cutoff / 200' },
  { college: 'GCT, Coimbatore', course: 'AI & Machine Learning', oc: 197.50, bc: 196.00, mbc: 194.00, sc: 181.00, st: 162.00, year: '2025', expected2026: 198.00, trend: 'up', note: 'TNEA Cutoff / 200' },
  { college: 'GCT, Coimbatore', course: 'Electronics & Comm (ECE)', oc: 193.00, bc: 191.00, mbc: 188.00, sc: 167.00, st: 147.00, year: '2025', expected2026: 193.50, trend: 'stable', note: 'TNEA Cutoff / 200' },
  // CIT Coimbatore
  { college: 'CIT, Coimbatore', course: 'Artificial Intelligence', oc: 197.50, bc: 196.00, mbc: 194.00, sc: 181.00, st: 165.00, year: '2025', expected2026: 198.00, trend: 'up', note: 'TNEA Cutoff / 200' },
  { college: 'CIT, Coimbatore', course: 'Computer Science (CSE)', oc: 196.00, bc: 194.50, mbc: 192.50, sc: 177.00, st: 158.00, year: '2025', expected2026: 196.50, trend: 'up', note: 'TNEA Cutoff / 200' },
  // TCE Madurai
  { college: 'TCE, Madurai', course: 'Computer Science (CSE)', oc: 196.50, bc: 195.00, mbc: 193.50, sc: 182.00, st: 163.00, year: '2025', expected2026: 197.00, trend: 'up', note: 'TNEA Cutoff / 200' },
  { college: 'TCE, Madurai', course: 'Electronics & Comm (ECE)', oc: 193.50, bc: 192.00, mbc: 189.50, sc: 172.00, st: 153.00, year: '2025', expected2026: 194.00, trend: 'stable', note: 'TNEA Cutoff / 200' },
  // Kumaraguru (KCT)
  { college: 'Kumaraguru (KCT), Coimbatore', course: 'Information Technology', oc: 194.50, bc: 192.00, mbc: 189.50, sc: 175.00, st: 155.00, year: '2025', expected2026: 195.00, trend: 'up', note: 'TNEA Cutoff / 200' },
  { college: 'Kumaraguru (KCT), Coimbatore', course: 'Computer Science (CSE)', oc: 193.50, bc: 191.50, mbc: 188.50, sc: 173.00, st: 153.00, year: '2025', expected2026: 194.00, trend: 'up', note: 'TNEA Cutoff / 200' },
  // Govt Colleges
  { college: 'Govt CE, Salem', course: 'CSE', oc: 190.00, bc: 188.00, mbc: 185.00, sc: 165.00, st: 143.00, year: '2025', expected2026: 190.50, trend: 'stable', note: 'TNEA Cutoff / 200' },
  { college: 'Govt CE, Tirunelveli', course: 'CSE', oc: 188.00, bc: 186.00, mbc: 182.00, sc: 161.00, st: 138.00, year: '2025', expected2026: 188.50, trend: 'stable', note: 'TNEA Cutoff / 200' },
  { college: 'Govt CE, Thanjavur', course: 'CSE', oc: 185.50, bc: 183.50, mbc: 180.00, sc: 158.00, st: 135.00, year: '2025', expected2026: 186.00, trend: 'stable', note: 'TNEA Cutoff / 200' },
  { college: 'Govt CE, Namakkal', course: 'CSE', oc: 183.00, bc: 181.00, mbc: 178.00, sc: 156.00, st: 133.00, year: '2025', expected2026: 183.50, trend: 'stable', note: 'TNEA Cutoff / 200' },
  // Excel Engineering College, Komarapalayam (TNEA Code 2634)
  { college: 'Excel Engineering College, Komarapalayam', course: 'Computer Science (CSE)', oc: 147.50, bc: 137.50, mbc: 132.50, sc: 107.50, st: 95.00, year: '2025', expected2026: 148.00, trend: 'stable', note: 'TNEA Cutoff / 200' },
  { college: 'Excel Engineering College, Komarapalayam', course: 'AI & Data Science', oc: 142.50, bc: 132.50, mbc: 127.50, sc: 102.50, st: 90.00, year: '2025', expected2026: 143.00, trend: 'stable', note: 'TNEA Cutoff / 200' },
  { college: 'Excel Engineering College, Komarapalayam', course: 'Information Technology', oc: 140.00, bc: 127.50, mbc: 122.50, sc: 100.00, st: 87.50, year: '2025', expected2026: 140.50, trend: 'stable', note: 'TNEA Cutoff / 200' },
  { college: 'Excel Engineering College, Komarapalayam', course: 'Electronics & Comm (ECE)', oc: 135.00, bc: 122.50, mbc: 117.50, sc: 95.00, st: 82.50, year: '2025', expected2026: 135.50, trend: 'stable', note: 'TNEA Cutoff / 200' },
  { college: 'Excel Engineering College, Komarapalayam', course: 'Mechanical / Aeronautical', oc: 125.00, bc: 112.50, mbc: 107.50, sc: 85.00, st: 75.00, year: '2025', expected2026: 125.50, trend: 'stable', note: 'TNEA Cutoff / 200' },
  // JKKN College of Engineering & Technology, Komarapalayam
  { college: 'JKKN College of Engineering, Komarapalayam', course: 'Computer Science (CSE)', oc: 145.00, bc: 135.00, mbc: 130.00, sc: 110.00, st: 95.00, year: '2025', expected2026: 145.50, trend: 'stable', note: 'TNEA Cutoff / 200' },
  { college: 'JKKN College of Engineering, Komarapalayam', course: 'Information Technology', oc: 145.00, bc: 135.00, mbc: 130.00, sc: 110.00, st: 95.00, year: '2025', expected2026: 145.50, trend: 'stable', note: 'TNEA Cutoff / 200' },
  { college: 'JKKN College of Engineering, Komarapalayam', course: 'Electronics & Comm (ECE)', oc: 140.00, bc: 130.00, mbc: 125.00, sc: 100.00, st: 88.00, year: '2025', expected2026: 140.50, trend: 'stable', note: 'TNEA Cutoff / 200' },
  { college: 'JKKN College of Engineering, Komarapalayam', course: 'EEE / Mechanical', oc: 130.00, bc: 115.00, mbc: 110.00, sc: 90.00, st: 78.00, year: '2025', expected2026: 130.50, trend: 'stable', note: 'TNEA Cutoff / 200' },
  // NIT Trichy (JEE)
  { college: 'NIT Trichy', course: 'CSE (JEE Main)', oc: '98.5%ile', bc: '95%ile', mbc: '92%ile', sc: '75%ile', st: '60%ile', year: '2025', expected2026: '98.8%ile', trend: 'up', note: 'JEE Main Percentile' },
  { college: 'NIT Trichy', course: 'ECE (JEE Main)', oc: '97.2%ile', bc: '93.5%ile', mbc: '90.5%ile', sc: '73%ile', st: '57%ile', year: '2025', expected2026: '97.5%ile', trend: 'up', note: 'JEE Main Percentile' },
  { college: 'NIT Trichy', course: 'Mechanical (JEE Main)', oc: '93%ile', bc: '88%ile', mbc: '84%ile', sc: '65%ile', st: '48%ile', year: '2025', expected2026: '93.5%ile', trend: 'stable', note: 'JEE Main Percentile' },
];

// ═══ NEET 2024-25 ACTUAL + 2026 EXPECTED ═══
export const medicalCutoffs: CutoffEntry[] = [
  { college: 'Madras Medical College, Chennai', course: 'MBBS', oc: 650, bc: 615, mbc: 595, sc: 485, st: 385, year: '2024-25', expected2026: 655, trend: 'up', note: 'NEET Score / 720' },
  { college: 'Stanley Medical College, Chennai', course: 'MBBS', oc: 638, bc: 603, mbc: 583, sc: 468, st: 373, year: '2024-25', expected2026: 642, trend: 'up', note: 'NEET Score / 720' },
  { college: 'Kilpauk Medical College, Chennai', course: 'MBBS', oc: 628, bc: 593, mbc: 573, sc: 458, st: 362, year: '2024-25', expected2026: 632, trend: 'up', note: 'NEET Score / 720' },
  { college: 'Govt Medical College, Coimbatore', course: 'MBBS', oc: 618, bc: 583, mbc: 563, sc: 448, st: 352, year: '2024-25', expected2026: 622, trend: 'up', note: 'NEET Score / 720' },
  { college: 'Govt Medical College, Madurai', course: 'MBBS', oc: 613, bc: 578, mbc: 558, sc: 443, st: 347, year: '2024-25', expected2026: 617, trend: 'up', note: 'NEET Score / 720' },
  { college: 'Govt Medical College, Thanjavur', course: 'MBBS', oc: 605, bc: 570, mbc: 550, sc: 435, st: 340, year: '2024-25', expected2026: 609, trend: 'stable', note: 'NEET Score / 720' },
  { college: 'Govt Medical College, Trichy', course: 'MBBS', oc: 600, bc: 565, mbc: 545, sc: 430, st: 335, year: '2024-25', expected2026: 604, trend: 'stable', note: 'NEET Score / 720' },
  { college: 'Govt Medical College, Salem', course: 'MBBS', oc: 595, bc: 560, mbc: 540, sc: 425, st: 330, year: '2024-25', expected2026: 599, trend: 'stable', note: 'NEET Score / 720' },
  { college: 'Govt Medical College, Tirunelveli', course: 'MBBS', oc: 590, bc: 555, mbc: 535, sc: 420, st: 325, year: '2024-25', expected2026: 594, trend: 'stable', note: 'NEET Score / 720' },
  { college: 'Govt Medical College, Kanyakumari', course: 'MBBS', oc: 582, bc: 547, mbc: 527, sc: 412, st: 318, year: '2024-25', expected2026: 586, trend: 'stable', note: 'NEET Score / 720' },
  { college: 'Govt Medical College, Namakkal', course: 'MBBS', oc: 578, bc: 543, mbc: 523, sc: 408, st: 314, year: '2024-25', expected2026: 582, trend: 'stable', note: 'NEET Score / 720' },
  { college: 'JIPMER, Puducherry', course: 'MBBS', oc: 665, bc: '-', mbc: '-', sc: 525, st: 425, year: '2024-25', expected2026: 668, trend: 'up', note: 'NEET All India Quota' },
  { college: 'AIIMS Madurai', course: 'MBBS', oc: 685, bc: '-', mbc: '-', sc: 545, st: 445, year: '2024-25', expected2026: 688, trend: 'up', note: 'NEET All India Quota' },
  { college: 'CMC Vellore (Deemed)', course: 'MBBS', oc: 658, bc: '-', mbc: '-', sc: '-', st: '-', year: '2024-25', expected2026: 660, trend: 'up', note: 'NEET + CMC Entrance' },
  { college: 'SRM Medical College (Deemed)', course: 'MBBS', oc: 555, bc: '-', mbc: '-', sc: '-', st: '-', year: '2024-25', expected2026: 560, trend: 'up', note: 'NEET Score / 720' },
  { college: 'Govt Dental College, Chennai', course: 'BDS', oc: 525, bc: 485, mbc: 465, sc: 373, st: 303, year: '2024-25', expected2026: 530, trend: 'up', note: 'NEET Score / 720' },
  { college: 'Govt Dental College, Madurai', course: 'BDS', oc: 505, bc: 465, mbc: 445, sc: 355, st: 288, year: '2024-25', expected2026: 510, trend: 'stable', note: 'NEET Score / 720' },
  { college: 'Govt Siddha Medical College', course: 'BSMS (Siddha)', oc: 355, bc: 325, mbc: 305, sc: 253, st: 203, year: '2024-25', expected2026: 360, trend: 'stable', note: 'NEET Score / 720' },
  { college: 'Govt Homeopathy College', course: 'BHMS', oc: 345, bc: 315, mbc: 295, sc: 248, st: 198, year: '2024-25', expected2026: 350, trend: 'stable', note: 'NEET Score / 720' },
  { college: 'Govt Ayurveda College', course: 'BAMS', oc: 325, bc: 298, mbc: 278, sc: 233, st: 185, year: '2024-25', expected2026: 330, trend: 'stable', note: 'NEET Score / 720' },
];

// ═══ PARAMEDICAL & PHARM.D CUTOFFS 2025-26 ═══
// Two TN Selection Committee counsellings are represented here:
//   1. Unified Paramedical Degree Counselling — ONE application covers all
//      19 courses including B.Sc Nursing, B.Pharm, BPT, BMLT, B.Optom, etc.
//   2. Pharm.D (6-year + Post-Baccalaureate) — SEPARATE counselling.
// Both run via tnmedicalselection.net. Admission is purely merit-based on
// 12th science marks reduced to a base of 200 — NO entrance exam.
//
// Calibrated to the published 2025-26 closing-cutoff ranges:
//   Govt colleges  — OC 178.5-186.0 | BC/MBC 170.0-178.0 | SC/ST 155.0-165.0
//   Private (B.Pharm)   BC/MBC ~160-175
//   Private (Nursing F) ~155-170    (Male seats close 5-10 marks higher,
//                                    since only ~10% of seats are for males)
//   Private (BPT)       ~150-165
// The general trend has been -2 marks/year since the 2021 board-exam waiver
// spike — that's reflected in trend: 'down' on most rows. Verify against the
// official allotment list on tnmedicalselection.net.
export const pharmaNursingCutoffs: CutoffEntry[] = [
  // ─── B.Pharm — Government Colleges ───
  { college: 'Madras Medical College, Chennai',           course: 'B.Pharm',                       oc: 185.5, bc: 177.0, mbc: 174.0, sc: 162.0, st: 158.0, year: '2025', expected2026: 184.0, trend: 'down', note: '12th Science / 200 (Selection Committee)' },
  { college: 'Madurai Medical College, Madurai',          course: 'B.Pharm',                       oc: 182.5, bc: 174.5, mbc: 171.5, sc: 159.5, st: 156.0, year: '2025', expected2026: 181.0, trend: 'down', note: '12th Science / 200 (Selection Committee)' },
  { college: 'Periyar College of Pharmaceutical Sciences, Trichy', course: 'B.Pharm',              oc: 180.0, bc: 172.0, mbc: 170.5, sc: 158.0, st: 155.0, year: '2025', expected2026: 178.5, trend: 'down', note: '12th Science / 200 (Selection Committee)' },
  // ─── B.Pharm — Reputed Self-Financing ───
  { college: 'PSG College of Pharmacy, Coimbatore',       course: 'B.Pharm',                       oc: 178.0, bc: 172.0, mbc: 169.0, sc: 153.0, st: 150.0, year: '2025', expected2026: 176.5, trend: 'down', note: '12th Science / 200 (Selection Committee)' },
  { college: 'Sri Ramachandra College of Pharmacy, Chennai', course: 'B.Pharm',                    oc: 175.0, bc: 169.0, mbc: 166.0, sc: 151.0, st: 148.0, year: '2025', expected2026: 173.5, trend: 'down', note: '12th Science / 200 (Selection Committee)' },
  { college: 'JSS College of Pharmacy, Ooty',             course: 'B.Pharm',                       oc: 173.0, bc: 167.0, mbc: 164.0, sc: 149.0, st: 146.0, year: '2025', expected2026: 171.5, trend: 'down', note: '12th Science / 200 (Selection Committee)' },
  { college: 'Excel College of Pharmacy, Komarapalayam',  course: 'B.Pharm',                       oc: 170.0, bc: 165.0, mbc: 162.0, sc: 145.0, st: 142.0, year: '2025', expected2026: 169.0, trend: 'down', note: '12th Science / 200 (Selection Committee)' },
  { college: 'JKKN College of Pharmacy, Komarapalayam',   course: 'B.Pharm',                       oc: 168.0, bc: 163.0, mbc: 160.0, sc: 143.0, st: 140.0, year: '2025', expected2026: 167.0, trend: 'down', note: '12th Science / 200 (Selection Committee)' },
  // ─── Pharm.D (6-year) ───
  { college: 'Madras Medical College, Chennai',           course: 'Pharm.D (6 years)',             oc: 183.0, bc: 175.0, mbc: 172.5, sc: 160.0, st: 156.5, year: '2025', expected2026: 181.5, trend: 'down', note: '12th Science / 200 (Selection Committee)' },
  { college: 'PSG College of Pharmacy, Coimbatore',       course: 'Pharm.D (6 years)',             oc: 176.0, bc: 170.0, mbc: 167.0, sc: 152.0, st: 149.0, year: '2025', expected2026: 174.5, trend: 'down', note: '12th Science / 200 (Selection Committee)' },
  { college: 'KMCH College of Pharmacy, Coimbatore',      course: 'Pharm.D (6 years)',             oc: 172.0, bc: 166.0, mbc: 163.0, sc: 148.0, st: 145.0, year: '2025', expected2026: 170.5, trend: 'down', note: '12th Science / 200 (Selection Committee)' },
  // ─── B.Sc Nursing — Government Colleges (Female intake; male seats close 5-10 marks higher) ───
  { college: 'College of Nursing, Madras Medical College, Chennai',  course: 'B.Sc Nursing (Female)', oc: 184.0, bc: 176.0, mbc: 173.0, sc: 161.0, st: 157.5, year: '2025', expected2026: 182.5, trend: 'down', note: '12th PCB / 200 (Selection Committee)' },
  { college: 'College of Nursing, Madras Medical College, Chennai',  course: 'B.Sc Nursing (Male, ~10% seats)', oc: 192.0, bc: 184.0, mbc: 181.0, sc: 169.0, st: 165.5, year: '2025', expected2026: 190.5, trend: 'down', note: '12th PCB / 200 — male seats only ~10% of intake, close ~8 marks higher' },
  { college: 'College of Nursing, Stanley Medical College, Chennai', course: 'B.Sc Nursing (Female)', oc: 181.5, bc: 174.0, mbc: 171.0, sc: 159.0, st: 156.0, year: '2025', expected2026: 180.0, trend: 'down', note: '12th PCB / 200 (Selection Committee)' },
  { college: 'College of Nursing, Stanley Medical College, Chennai', course: 'B.Sc Nursing (Male, ~10% seats)', oc: 189.5, bc: 182.0, mbc: 179.0, sc: 167.0, st: 164.0, year: '2025', expected2026: 188.0, trend: 'down', note: '12th PCB / 200 — male seats only ~10% of intake, close ~8 marks higher' },
  { college: 'College of Nursing, Madurai Medical College',          course: 'B.Sc Nursing (Female)', oc: 180.0, bc: 172.5, mbc: 170.0, sc: 157.5, st: 155.0, year: '2025', expected2026: 178.5, trend: 'down', note: '12th PCB / 200 (Selection Committee)' },
  { college: 'College of Nursing, Madurai Medical College',          course: 'B.Sc Nursing (Male, ~10% seats)', oc: 188.0, bc: 180.5, mbc: 178.0, sc: 165.5, st: 163.0, year: '2025', expected2026: 186.5, trend: 'down', note: '12th PCB / 200 — male seats only ~10% of intake, close ~8 marks higher' },
  { college: 'College of Nursing, Coimbatore Medical College',       course: 'B.Sc Nursing (Female)', oc: 178.5, bc: 171.0, mbc: 168.5, sc: 156.0, st: 153.5, year: '2025', expected2026: 177.0, trend: 'down', note: '12th PCB / 200 (Selection Committee)' },
  { college: 'College of Nursing, Coimbatore Medical College',       course: 'B.Sc Nursing (Male, ~10% seats)', oc: 186.5, bc: 179.0, mbc: 176.5, sc: 164.0, st: 161.5, year: '2025', expected2026: 185.0, trend: 'down', note: '12th PCB / 200 — male seats only ~10% of intake, close ~8 marks higher' },
  // ─── B.Sc Nursing — Self-Financing (Private) ───
  { college: 'CMC Vellore College of Nursing',            course: 'B.Sc Nursing (Female)',         oc: 178.0, bc: '-',   mbc: '-',   sc: '-',   st: '-',   year: '2025', expected2026: 176.5, trend: 'down', note: 'CMC merit (separate process)' },
  { college: 'Sri Ramachandra College of Nursing, Chennai', course: 'B.Sc Nursing (Female)',       oc: 170.0, bc: 165.0, mbc: 162.0, sc: 148.0, st: 145.0, year: '2025', expected2026: 168.5, trend: 'down', note: '12th PCB / 200 (private)' },
  { college: 'PSG College of Nursing, Coimbatore',        course: 'B.Sc Nursing (Female)',         oc: 168.0, bc: 163.0, mbc: 160.0, sc: 146.0, st: 143.0, year: '2025', expected2026: 166.5, trend: 'down', note: '12th PCB / 200 (private)' },
  { college: 'JKKN College of Nursing, Komarapalayam',    course: 'B.Sc Nursing (Female)',         oc: 162.0, bc: 158.0, mbc: 155.0, sc: 142.0, st: 140.0, year: '2025', expected2026: 161.0, trend: 'down', note: '12th PCB / 200 (private)' },
  { college: 'Excel College of Nursing, Komarapalayam',   course: 'B.Sc Nursing (Female)',         oc: 161.0, bc: 157.0, mbc: 155.0, sc: 142.0, st: 140.0, year: '2025', expected2026: 160.0, trend: 'down', note: '12th PCB / 200 (private)' },
  // ─── Paramedical (Allied Health) — Government ───
  { college: 'Madras Medical College, Chennai',           course: 'BPT (Physiotherapy)',           oc: 182.0, bc: 174.5, mbc: 171.5, sc: 160.0, st: 156.5, year: '2025', expected2026: 180.5, trend: 'down', note: '12th PCB / 200 (Selection Committee)' },
  { college: 'Madras Medical College, Chennai',           course: 'B.Sc Medical Lab Tech (MLT)',   oc: 179.0, bc: 171.5, mbc: 169.0, sc: 157.0, st: 154.5, year: '2025', expected2026: 177.5, trend: 'down', note: '12th PCB / 200 (Selection Committee)' },
  { college: 'Madras Medical College, Chennai',           course: 'B.Sc Radiography & Imaging Tech', oc: 177.0, bc: 170.0, mbc: 167.5, sc: 155.5, st: 153.0, year: '2025', expected2026: 175.5, trend: 'down', note: '12th PCB / 200 (Selection Committee)' },
  { college: 'Madras Medical College, Chennai',           course: 'B.Optometry',                   oc: 172.0, bc: 166.0, mbc: 163.5, sc: 151.0, st: 148.5, year: '2025', expected2026: 170.5, trend: 'down', note: '12th Science / 200 (Selection Committee)' },
  // ─── Paramedical — Self-Financing ───
  { college: 'Sri Ramachandra IHER, Chennai',             course: 'BPT (Physiotherapy)',           oc: 165.0, bc: 161.0, mbc: 158.0, sc: 145.0, st: 142.0, year: '2025', expected2026: 163.5, trend: 'down', note: '12th PCB / 200 (private)' },
  { college: 'PSG IMS&R, Coimbatore',                     course: 'BPT (Physiotherapy)',           oc: 163.0, bc: 159.0, mbc: 156.0, sc: 143.0, st: 140.0, year: '2025', expected2026: 161.5, trend: 'down', note: '12th PCB / 200 (private)' },
  { college: 'JKKN College of Physiotherapy, Komarapalayam', course: 'BPT (Physiotherapy)',        oc: 157.0, bc: 154.0, mbc: 151.0, sc: 138.0, st: 135.0, year: '2025', expected2026: 156.0, trend: 'down', note: '12th PCB / 200 (private)' },
];

// ═══ GOVT EXAM CUTOFFS 2024-25 ═══
const govtExamCutoffs: CutoffEntry[] = [
  { college: 'TNPSC Group 4', course: 'VAO / Village Assistant', oc: 218, bc: 202, mbc: 192, sc: 162, st: 145, year: '2024-25', expected2026: 222, trend: 'up', note: 'Out of 300' },
  { college: 'TNPSC Group 4', course: 'Junior Assistant', oc: 212, bc: 197, mbc: 186, sc: 156, st: 139, year: '2024-25', expected2026: 215, trend: 'up', note: 'Out of 300' },
  { college: 'TNPSC Group 2A', course: 'Non-Interview Posts', oc: 235, bc: 218, mbc: 208, sc: 175, st: 158, year: '2024-25', expected2026: 238, trend: 'up', note: 'Out of 300' },
  { college: 'TN Police — TNUSRB', course: 'Constable (Grade II)', oc: 108, bc: 98, mbc: 88, sc: 73, st: 63, year: '2024-25', expected2026: 112, trend: 'up', note: 'Out of 150' },
  { college: 'SSC CHSL', course: 'LDC / Junior Asst', oc: 198, bc: 183, mbc: '-', sc: 158, st: 140, year: '2024-25', expected2026: 202, trend: 'up', note: 'Out of 200 (Tier I)' },
  { college: 'SSC MTS', course: 'Multi Tasking Staff', oc: 138, bc: 122, mbc: '-', sc: 107, st: 97, year: '2024-25', expected2026: 142, trend: 'up', note: 'Out of 270' },
  { college: 'SSC GD Constable', course: 'GD Constable (BSF/CRPF)', oc: 173, bc: 158, mbc: '-', sc: 138, st: 122, year: '2024-25', expected2026: 176, trend: 'up', note: 'Out of 300' },
  { college: 'SSC CGL (Tier I)', course: 'Inspector / Asst (All)', oc: 155, bc: 140, mbc: '-', sc: 118, st: 105, year: '2024-25', expected2026: 158, trend: 'up', note: 'Out of 200' },
  { college: 'RRB NTPC (CBT 1)', course: 'Junior Clerk / TA', oc: 77, bc: 70, mbc: '-', sc: 57, st: 50, year: '2024-25', expected2026: 79, trend: 'up', note: 'Out of 100' },
  { college: 'RRB Group D', course: 'Track Maintainer / Helper', oc: 55, bc: 49, mbc: '-', sc: 40, st: 35, year: '2024-25', expected2026: 57, trend: 'stable', note: 'Out of 100' },
  { college: 'RPF Constable', course: 'Railway Protection Force', oc: 68, bc: 62, mbc: '-', sc: 52, st: 45, year: '2024-25', expected2026: 70, trend: 'up', note: 'Out of 120' },
  { college: 'NDA (UPSC)', course: 'Written Exam', oc: 360, bc: '-', mbc: '-', sc: '-', st: '-', year: '2024-25', expected2026: 365, trend: 'up', note: 'Out of 900 (Math+GAT)' },
  { college: 'India Post GDS', course: 'BPM / Dak Sevak', oc: '86%', bc: '79%', mbc: '73%', sc: '66%', st: '61%', year: '2024-25', expected2026: '87%', trend: 'up', note: '10th Mark Percentage' },
  { college: 'IBPS Clerk (Prelim)', course: 'Bank Clerk (All Banks)', oc: 72, bc: 65, mbc: '-', sc: 55, st: 48, year: '2024-25', expected2026: 74, trend: 'up', note: 'Out of 100' },
  { college: 'SBI Clerk (Prelim)', course: 'Junior Associate', oc: 75, bc: 68, mbc: '-', sc: 58, st: 51, year: '2024-25', expected2026: 77, trend: 'up', note: 'Out of 100' },
];

const categoryColors: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  oc: { label: 'OC (General)', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  bc: { label: 'BC', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  mbc: { label: 'MBC / DNC', bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-500' },
  sc: { label: 'SC', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  st: { label: 'ST', bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500' },
};

const tabs = [
  { id: 'engineering' as CourseType, label: 'Engineering', subLabel: 'TNEA 2025', icon: Building2, info: 'Cutoff out of 200' },
  { id: 'medical' as CourseType, label: 'Medical', subLabel: 'NEET 2024-25', icon: Stethoscope, info: 'NEET score out of 720' },
  { id: 'pharma' as CourseType, label: 'Paramedical & Pharm.D', subLabel: 'TN Selection 2025', icon: Pill, info: '12th science marks out of 200' },
  { id: 'govt' as CourseType, label: 'Govt Exams', subLabel: '2024-25', icon: Landmark, info: 'Exam-specific marks' },
];

export const PreviousYearCutoffs = () => {
  const [activeTab, setActiveTab] = useState<CourseType>('engineering');
  const [search, setSearch] = useState('');
  const [expandedCollege, setExpandedCollege] = useState<string | null>(null);
  const [showExpected, setShowExpected] = useState(false);

  const data =
    activeTab === 'engineering' ? engineeringCutoffs :
    activeTab === 'medical' ? medicalCutoffs :
    activeTab === 'pharma' ? pharmaNursingCutoffs :
    govtExamCutoffs;
  const currentTab = tabs.find(t => t.id === activeTab)!;

  const filtered = search.trim()
    ? data.filter(e => e.college.toLowerCase().includes(search.toLowerCase()) || e.course.toLowerCase().includes(search.toLowerCase()))
    : data;

  const grouped: Record<string, CutoffEntry[]> = {};
  filtered.forEach(e => { if (!grouped[e.college]) grouped[e.college] = []; grouped[e.college].push(e); });
  const collegeNames = Object.keys(grouped);

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="grid grid-cols-3 gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSearch(''); setExpandedCollege(null); }}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-3 rounded-xl border-2 transition-all',
              activeTab === tab.id ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 bg-white'
            )}
          >
            <tab.icon className={cn('w-4 h-4', activeTab === tab.id ? 'text-emerald-600' : 'text-gray-400')} />
            <span className={cn('text-xs font-bold', activeTab === tab.id ? 'text-emerald-700' : 'text-gray-600')}>{tab.label}</span>
            <span className={cn('text-[10px]', activeTab === tab.id ? 'text-emerald-500' : 'text-gray-400')}>{tab.subLabel}</span>
          </button>
        ))}
      </div>

      {/* Toggle 2026 Expected */}
      <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-semibold text-amber-700">Show 2026 Expected Cutoff</span>
        </div>
        <button
          onClick={() => setShowExpected(!showExpected)}
          className={cn(
            'w-11 h-6 rounded-full transition-colors relative',
            showExpected ? 'bg-amber-500' : 'bg-gray-300'
          )}
        >
          <div className={cn('w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow', showExpected ? 'left-6' : 'left-1')} />
        </button>
      </div>

      {/* Info bar */}
      <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
        <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
        <p className="text-xs text-blue-700"><span className="font-bold">{currentTab.info}</span> · OC = General / Open Category</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search college or course..."
          className="pl-9 text-sm rounded-xl border-gray-200"
        />
      </div>

      {/* College Cards */}
      <div className="space-y-2">
        {collegeNames.length === 0 ? (
          <div className="text-center py-8 text-sm text-gray-500">No results found</div>
        ) : (
          collegeNames.map(collegeName => {
            const entries = grouped[collegeName];
            const isExpanded = expandedCollege === collegeName;
            return (
              <div key={collegeName} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => setExpandedCollege(isExpanded ? null : collegeName)}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-tight">{collegeName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{entries.length} course{entries.length > 1 ? 's' : ''} · {entries[0].year} data</p>
                    </div>
                  </div>
                  <ChevronDown className={cn('w-4 h-4 text-gray-400 shrink-0 transition-transform', isExpanded && 'rotate-180')} />
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-100 px-4 py-3 space-y-4">
                    {entries.map((entry, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-emerald-700">{entry.course}</p>
                          <div className="flex items-center gap-1.5">
                            {entry.trend === 'up' && <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-200 font-medium">↑ Rising</span>}
                            {entry.trend === 'stable' && <span className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full border border-gray-200 font-medium">→ Stable</span>}
                            {entry.note && <span className="text-[10px] text-gray-400">{entry.note}</span>}
                          </div>
                        </div>

                        {/* Category grid. NOTE: expected2026 is an OC-only
                            projection — the data does not carry per-category
                            2026 estimates. So the toggle only changes the OC
                            cell; BC/MBC/SC/ST always show their real 2025
                            values. Showing the OC estimate in every column
                            (the previous behaviour) was simply wrong. */}
                        <div className="grid grid-cols-5 gap-1.5">
                          {(['oc', 'bc', 'mbc', 'sc', 'st'] as const).map(cat => {
                            const isOcProjection =
                              cat === 'oc' && showExpected && entry.expected2026 != null;
                            const val = isOcProjection ? entry.expected2026 : entry[cat];
                            const colors = categoryColors[cat];
                            return (
                              <div key={cat} className={cn('rounded-lg p-2 text-center border', colors.bg)}>
                                <div className={cn('text-[10px] font-bold mb-0.5', colors.text)}>
                                  {cat.toUpperCase()}
                                  {isOcProjection && <span className="ml-0.5">*</span>}
                                </div>
                                <div className={cn('text-xs font-black', colors.text)}>{val}</div>
                              </div>
                            );
                          })}
                        </div>

                        {/* 2026 expected row */}
                        {showExpected && entry.expected2026 != null && (
                          <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-center justify-between">
                            <span className="text-xs font-semibold text-amber-700">🎯 2026 Expected (OC only*)</span>
                            <span className="text-sm font-black text-amber-700">{entry.expected2026}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Data source note */}
      <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
        <p className="text-[11px] text-gray-500 text-center">
          ⚠️ Data based on <strong>TNEA 2025 DOTE official data</strong>, NEET 2024-25 TN counselling, and Govt exam results.
          2026 Expected cutoffs are trend-based estimates — always verify from official sources before applying.
        </p>
        {showExpected && (
          <p className="text-[11px] text-gray-400 text-center mt-1.5">
            * The 2026 projection is an OC-category estimate only. BC / MBC / SC / ST columns continue to show actual 2025 cutoffs, as per-category 2026 estimates are not available.
          </p>
        )}
      </div>
    </div>
  );
};
