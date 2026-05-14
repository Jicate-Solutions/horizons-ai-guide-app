import { CollegesPageLayout } from '@/components/CollegesPageLayout';
import { CollegeSearch } from '@/components/CollegeSearch';
import { ScholarshipFinder } from '@/components/ScholarshipFinder';
import { EduCutoff } from '@/components/EduCutoff';
import { EntranceExams } from '@/components/EntranceExams';
import { PreviousYearQuestions } from '@/components/PreviousYearQuestions';
import { GovernmentJobs } from '@/components/GovernmentJobs';
import { UniversityEntranceExams } from '@/components/UniversityEntrance';
import { CourseExplorer } from '@/components/CourseExplorer';
import { StartupGuide } from '@/components/StartupGuide';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GovtJobsRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => { navigate('/government-exams', { replace: true }); }, [navigate]);
  return null;
};

export const FindCollegesPage = () => (
  <CollegesPageLayout activeTab="colleges">
    <CollegeSearch />
  </CollegesPageLayout>
);

export const SportsQuotaTabPage = () => (
  <CollegesPageLayout activeTab="sportsquota">
    {/* Compact title bar — matches the pattern of other tabs that don't ship
        their own hero. The full hero on the standalone /sports-quota-discovery
        route still exists for direct visitors. */}
    <div className="mb-4 flex items-start gap-3">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center shadow-sm">
        <Trophy className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h1 className="text-lg sm:text-xl font-bold text-emerald-900 leading-tight">
          Sports Quota Discovery
        </h1>
        <p className="text-xs text-gray-600 mt-0.5">
          2026-27 selection trials at colleges across India. Filter by district,
          sport, gender, and date.
        </p>
      </div>
    </div>
    <SportsQuotaDiscoveryContent showStats />
  </CollegesPageLayout>
);

export const ScholarshipsPage = () => (
  <CollegesPageLayout activeTab="scholarships">
    <ScholarshipFinder />
  </CollegesPageLayout>
);

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

export const PYQPage = () => (
  <CollegesPageLayout activeTab="pyq">
    <PreviousYearQuestions />
  </CollegesPageLayout>
);

export const GovtJobsPage = () => {
  // Redirect to the full Government Exams page with PYQ, syllabus, etc.
  return <GovtJobsRedirect />;
};

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
