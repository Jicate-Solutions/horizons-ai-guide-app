import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CollegesPageLayout } from '@/components/CollegesPageLayout';
import { PillNavigation } from '@/components/PillNavigation';
import { CollegeSearch } from '@/components/CollegeSearch';
import { ScholarshipFinder } from '@/components/ScholarshipFinder';
import { EduCutoff } from '@/components/EduCutoff';
import { EntranceExams } from '@/components/EntranceExams';
import { CounsellingSimulator } from '@/components/CounsellingSimulator';
import { PreviousYearQuestions } from '@/components/PreviousYearQuestions';
import { GovernmentJobs } from '@/components/GovernmentJobs';
import { UniversityEntranceExams } from '@/components/UniversityEntrance';
import { CourseExplorer } from '@/components/CourseExplorer';
import { StartupGuide } from '@/components/StartupGuide';

export const FindCollegesPage = () => (
  <CollegesPageLayout activeTab="colleges">
    <CollegeSearch />
  </CollegesPageLayout>
);

export const ScholarshipsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50/50 to-amber-50/30">
      {/* Minimal top bar with back button */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 px-4 py-3">
        <div className="container mx-auto flex items-center gap-3">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <span className="text-white/40">|</span>
          <span className="text-white/70 text-sm">EduNavigator</span>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="container mx-auto px-4 pt-4">
        <PillNavigation activeTab="scholarships" />
      </div>
      {/* Scholarship Finder (has its own hero) */}
      <ScholarshipFinder />
    </div>
  );
};

export const EduCutoffPage = () => (
  <CollegesPageLayout activeTab="educutoff">
    <EduCutoff />
  </CollegesPageLayout>
);

export const EntranceExamsPage = () => (
  <CollegesPageLayout activeTab="entranceexams">
    <EntranceExams />
  </CollegesPageLayout>
);

export const CounsellingPage = () => (
  <CollegesPageLayout activeTab="counselling">
    <CounsellingSimulator />
  </CollegesPageLayout>
);

export const PYQPage = () => (
  <CollegesPageLayout activeTab="pyq">
    <PreviousYearQuestions />
  </CollegesPageLayout>
);

export const GovtJobsPage = () => (
  <CollegesPageLayout activeTab="govtjobs">
    <GovernmentJobs />
  </CollegesPageLayout>
);

export const TNUniversityPage = () => (
  <CollegesPageLayout activeTab="tnuniversity">
    <UniversityEntranceExams />
  </CollegesPageLayout>
);

export const CourseExplorerPage = () => (
  <CollegesPageLayout activeTab="courseexplorer">
    <CourseExplorer />
  </CollegesPageLayout>
);

export const StartupGuidePage = () => (
  <CollegesPageLayout activeTab="startup">
    <StartupGuide />
  </CollegesPageLayout>
);
