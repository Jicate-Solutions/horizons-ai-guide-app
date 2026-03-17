export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface EntranceExam {
  id: string;
  name: string;
  tamilName: string;
  fullForm: string;
  conductingBody: string;
  examMode: string;
  duration: string;
  syllabus: string[];
  eligibility: string[];
  tnEligibility: string; // Specific TN student eligibility note
  importantDates: {
    registration: string;
    examDate: string;
    resultDate: string;
  };
  applicationFee: {
    general: string;
    scst: string;
  };
  tnCollegesAccepting: string[]; // TN-specific colleges
  officialWebsite: string;
  syllabusUrl?: string;
  category: ExamCategory;
  hasJKKN?: boolean;
  jkknColleges?: string[];
  practiceQuestions?: PracticeQuestion[];
}

export interface PreparationTips {
  recommendedBooks: string[];
  onlineCourses: string[];
  studyStrategy: string[];
  importantTopics: string[];
}

export type ExamCategory = 
  | 'engineering'
  | 'medical'
  | 'management'
  | 'agriculture'
  | 'design';

export interface CategoryInfo {
  id: ExamCategory;
  label: string;
  tamilLabel: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}
