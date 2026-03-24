import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import { LanguageProvider } from "@/hooks/useLanguage";
import { lazy, Suspense } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

// ─── Landing + Auth: eager load (first pages users see) ───
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// ─── Loading spinner for lazy pages ───
const PageLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: 40, height: 40, border: '3px solid #e5e7eb', borderTopColor: '#059669', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
      <p style={{ fontSize: 14, color: '#6b7280' }}>Loading...</p>
    </div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// ─── All other pages: lazy loaded (split into separate chunks) ───
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const CareerChat = lazy(() => import("./pages/CareerChat"));
const Register12thLearner = lazy(() => import("./pages/Register12thLearner"));
const RegisterLearner = lazy(() => import("./pages/RegisterLearner"));
const RegisterEmployer = lazy(() => import("./pages/RegisterEmployer"));
const EmployerRegistrationSuccess = lazy(() => import("./pages/EmployerRegistrationSuccess"));
const EmployerDashboard = lazy(() => import("./pages/EmployerDashboard"));
const EmployerProfile = lazy(() => import("./pages/EmployerProfile"));
const EmployerJobs = lazy(() => import("./pages/EmployerJobs"));
const EmployerPostJob = lazy(() => import("./pages/EmployerPostJob"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminSetup = lazy(() => import("./pages/AdminSetup"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const SimpleAdmin = lazy(() => import("./pages/SimpleAdmin"));
const AdminSetupGuide = lazy(() => import("./pages/AdminSetupGuide"));
const CareerAssessmentColleges = lazy(() => import("./pages/CareerAssessmentColleges"));
const TakeAssessment = lazy(() => import("./pages/TakeAssessment"));
const AssessmentResults = lazy(() => import("./pages/AssessmentResults"));
const CareerAssessment12thLearners = lazy(() => import("./pages/CareerAssessment12thLearners"));
const TakeStudentAssessment = lazy(() => import("./pages/TakeStudentAssessment"));
const StudentAssessmentResults = lazy(() => import("./pages/StudentAssessmentResults"));
const IndustryTrends = lazy(() => import("./pages/IndustryTrends"));
const SavedJobs = lazy(() => import("./pages/SavedJobs"));
const JobPortal = lazy(() => import("./pages/JobPortal"));
const PYQPractice = lazy(() => import("./pages/PYQPractice"));
const SurveyPublic = lazy(() => import("./pages/SurveyPublic"));

// Career Hub Pages
const CareerAssessment = lazy(() => import("./pages/CareerAssessment"));
const AICareerPredictor = lazy(() => import("./pages/AICareerPredictor"));
const SyllabusTracker = lazy(() => import("./pages/SyllabusTracker"));
const ExamAlerts = lazy(() => import("./pages/ExamAlerts"));
const RankPredictor = lazy(() => import("./pages/RankPredictor"));
const StudyGuide = lazy(() => import("./pages/StudyGuide"));
const QuestionBank = lazy(() => import("./pages/QuestionBank"));
const TopicHub = lazy(() => import("./pages/TopicHub"));
const PYQPapers = lazy(() => import("./pages/PYQPapers"));
const SavedCourses = lazy(() => import("./pages/SavedCourses"));

// College Tab Pages (named exports → need wrapper)
const FindCollegesPage = lazy(() => import("./pages/CollegesTabPages").then(m => ({ default: m.FindCollegesPage })));
const ScholarshipsPage = lazy(() => import("./pages/CollegesTabPages").then(m => ({ default: m.ScholarshipsPage })));
const EduCutoffPage = lazy(() => import("./pages/CollegesTabPages").then(m => ({ default: m.EduCutoffPage })));
const EntranceExamsPage = lazy(() => import("./pages/CollegesTabPages").then(m => ({ default: m.EntranceExamsPage })));
const GovtJobsPage = lazy(() => import("./pages/CollegesTabPages").then(m => ({ default: m.GovtJobsPage })));
const TNUniversityPage = lazy(() => import("./pages/CollegesTabPages").then(m => ({ default: m.TNUniversityPage })));
const CourseExplorerPage = lazy(() => import("./pages/CollegesTabPages").then(m => ({ default: m.CourseExplorerPage })));
const StartupGuidePage = lazy(() => import("./pages/CollegesTabPages").then(m => ({ default: m.StartupGuidePage })));

// Government Exams Pages
const GovernmentExams = lazy(() => import("./pages/GovernmentExams"));
const GovernmentExamCategory = lazy(() => import("./pages/GovernmentExamCategory"));
const GovernmentExamDetail = lazy(() => import("./pages/GovernmentExamDetail"));

// Study Abroad Pages
const AlumniVerification = lazy(() => import("./pages/AlumniVerification"));

// TN University Entrance Pages (named exports → need wrappers)
const UniversityEntranceExams = lazy(() => import("./components/UniversityEntrance").then(m => ({ default: m.UniversityEntranceExams })));
const UniversityDetail = lazy(() => import("./components/UniversityEntrance").then(m => ({ default: m.UniversityDetail })));
const CourseDetail = lazy(() => import("./components/UniversityEntrance").then(m => ({ default: m.CourseDetail })));
const ExamCalendar = lazy(() => import("./components/UniversityEntrance").then(m => ({ default: m.ExamCalendar })));
const MyReminders = lazy(() => import("./components/UniversityEntrance").then(m => ({ default: m.MyReminders })));
const UniversityCompare = lazy(() => import("./components/UniversityEntrance").then(m => ({ default: m.UniversityCompare })));
const TNSavedQuestions = lazy(() => import("./components/UniversityEntrance").then(m => ({ default: m.SavedQuestions })));
const TNPreparationTips = lazy(() => import("./components/UniversityEntrance").then(m => ({ default: m.PreparationTips })));
const TNStudyPlanner = lazy(() => import("./components/UniversityEntrance").then(m => ({ default: m.TNStudyPlanner })));
const TNMockTest = lazy(() => import("./components/UniversityEntrance").then(m => ({ default: m.TNMockTest })));
const ChapterWeightage = lazy(() => import("./components/UniversityEntrance").then(m => ({ default: m.ChapterWeightage })));
const PerformanceAnalytics = lazy(() => import("./components/UniversityEntrance").then(m => ({ default: m.PerformanceAnalytics })));
const StudyStreaks = lazy(() => import("./components/UniversityEntrance").then(m => ({ default: m.StudyStreaks })));
const AIQuestionGenerator = lazy(() => import("./components/UniversityEntrance").then(m => ({ default: m.AIQuestionGenerator })));
const DailyChallenge = lazy(() => import("./components/UniversityEntrance").then(m => ({ default: m.DailyChallenge })));
const TNForum = lazy(() => import("./components/UniversityEntrance").then(m => ({ default: m.TNForum })));
const WeakTopicIdentifier = lazy(() => import("./components/UniversityEntrance").then(m => ({ default: m.WeakTopicIdentifier })));
const TNLeaderboard = lazy(() => import("./components/UniversityEntrance").then(m => ({ default: m.TNLeaderboard })));

const TNUniversityBrowse = lazy(() => import("./pages/TNUniversityBrowse"));

// EduCutoff Page
const EduCutoff = lazy(() => import("./pages/EduCutoff"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Main Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                
                {/* Job Seeker Routes */}
                <Route path="/jobs" element={<ProtectedRoute><JobPortal /></ProtectedRoute>} />
                <Route path="/jobs/*" element={<ProtectedRoute><JobPortal /></ProtectedRoute>} />
                <Route path="/saved-jobs" element={<ProtectedRoute><SavedJobs /></ProtectedRoute>} />
                <Route path="/register/learner" element={<ProtectedRoute><RegisterLearner /></ProtectedRoute>} />
                <Route path="/register/12th-learner" element={<ProtectedRoute><Register12thLearner /></ProtectedRoute>} />
                
                {/* Employer Routes */}
                <Route path="/register/employer" element={<ProtectedRoute><RegisterEmployer /></ProtectedRoute>} />
                <Route path="/employer/register/success" element={<ProtectedRoute><EmployerRegistrationSuccess /></ProtectedRoute>} />
                <Route path="/employer/dashboard" element={<ProtectedRoute><EmployerDashboard /></ProtectedRoute>} />
                <Route path="/employer/profile" element={<ProtectedRoute><EmployerProfile /></ProtectedRoute>} />
                <Route path="/employer/jobs" element={<ProtectedRoute><EmployerJobs /></ProtectedRoute>} />
                <Route path="/employer/jobs/new" element={<ProtectedRoute><EmployerPostJob /></ProtectedRoute>} />
                <Route path="/employer/jobs/:id/edit" element={<ProtectedRoute><EmployerPostJob /></ProtectedRoute>} />
                
                {/* Student Routes — ALL require login */}
                <Route path="/student-dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
                <Route path="/career-assessment" element={<ProtectedRoute><AICareerPredictor /></ProtectedRoute>} />
                 <Route path="/career-assessment/chat" element={<ProtectedRoute><CareerChat /></ProtectedRoute>} />
                <Route path="/career-assessment/colleges" element={<ProtectedRoute><CareerAssessmentColleges /></ProtectedRoute>} />
                <Route path="/career-assessment/colleges/find-colleges" element={<ProtectedRoute><FindCollegesPage /></ProtectedRoute>} />
                <Route path="/career-assessment/colleges/scholarships" element={<ProtectedRoute><ScholarshipsPage /></ProtectedRoute>} />
                <Route path="/career-assessment/colleges/educutoff" element={<ProtectedRoute><EduCutoffPage /></ProtectedRoute>} />
                <Route path="/career-assessment/colleges/entrance-exams" element={<ProtectedRoute><EntranceExamsPage /></ProtectedRoute>} />
                <Route path="/career-assessment/colleges/pyq" element={<ProtectedRoute><EntranceExamsPage /></ProtectedRoute>} />
                <Route path="/career-assessment/colleges/govt-jobs" element={<ProtectedRoute><GovtJobsPage /></ProtectedRoute>} />
                <Route path="/career-assessment/colleges/tn-university" element={<ProtectedRoute><TNUniversityPage /></ProtectedRoute>} />
                <Route path="/career-assessment/colleges/course-explorer" element={<ProtectedRoute><CourseExplorerPage /></ProtectedRoute>} />
                <Route path="/career-assessment/colleges/startup" element={<ProtectedRoute><StartupGuidePage /></ProtectedRoute>} />
                <Route path="/career-assessment/take/:type" element={<ProtectedRoute><TakeAssessment /></ProtectedRoute>} />
                <Route path="/career-assessment/results/:attemptId" element={<ProtectedRoute><AssessmentResults /></ProtectedRoute>} />
                <Route path="/career-assessment/12th-learners" element={<ProtectedRoute><CareerAssessment12thLearners /></ProtectedRoute>} />
                <Route path="/career-assessment/12th-learners/take" element={<ProtectedRoute><TakeStudentAssessment /></ProtectedRoute>} />
                <Route path="/career-assessment/12th-learners/results/:attemptId" element={<ProtectedRoute><StudentAssessmentResults /></ProtectedRoute>} />
                <Route path="/career-assessment/industry-trends" element={<ProtectedRoute><IndustryTrends /></ProtectedRoute>} />
                <Route path="/career-assessment/pyq-practice" element={<ProtectedRoute><PYQPractice /></ProtectedRoute>} />
                <Route path="/career-assessment/boosting" element={<ProtectedRoute><CareerAssessment /></ProtectedRoute>} />
                <Route path="/career-assessment/ai-predictor" element={<ProtectedRoute><AICareerPredictor /></ProtectedRoute>} />
                <Route path="/syllabus-tracker" element={<ProtectedRoute><SyllabusTracker /></ProtectedRoute>} />
                <Route path="/exam-alerts" element={<ProtectedRoute><ExamAlerts /></ProtectedRoute>} />
                <Route path="/rank-predictor" element={<ProtectedRoute><RankPredictor /></ProtectedRoute>} />
                <Route path="/study-guide" element={<ProtectedRoute><StudyGuide /></ProtectedRoute>} />
                <Route path="/question-bank" element={<ProtectedRoute><QuestionBank /></ProtectedRoute>} />
                <Route path="/topic-hub" element={<ProtectedRoute><TopicHub /></ProtectedRoute>} />
                <Route path="/pyq-papers" element={<ProtectedRoute><PYQPapers /></ProtectedRoute>} />
                <Route path="/career-assessment/saved-courses" element={<ProtectedRoute><SavedCourses /></ProtectedRoute>} />
                 
                 {/* EduCutoff - Admission Predictor */}
                 <Route path="/edu-cutoff" element={<ProtectedRoute><EduCutoff /></ProtectedRoute>} />
                
                {/* Government Exams Routes */}
                <Route path="/government-exams" element={<ProtectedRoute><GovernmentExams /></ProtectedRoute>} />
                <Route path="/government-exams/:categoryId" element={<ProtectedRoute><GovernmentExamCategory /></ProtectedRoute>} />
                <Route path="/government-exams/:categoryId/:examId" element={<ProtectedRoute><GovernmentExamDetail /></ProtectedRoute>} />
                
{/* TN University Entrance Exams Routes */}
                <Route path="/tn-university-entrance" element={<ProtectedRoute><UniversityEntranceExams /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/browse" element={<ProtectedRoute><TNUniversityBrowse /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/exam-calendar" element={<ProtectedRoute><ExamCalendar /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/my-reminders" element={<ProtectedRoute><MyReminders /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/compare" element={<ProtectedRoute><UniversityCompare /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/saved-questions" element={<ProtectedRoute><TNSavedQuestions /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/preparation-tips" element={<ProtectedRoute><TNPreparationTips /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/study-planner" element={<ProtectedRoute><TNStudyPlanner /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/mock-test" element={<ProtectedRoute><TNMockTest /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/chapter-weightage" element={<ProtectedRoute><ChapterWeightage /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/analytics" element={<ProtectedRoute><PerformanceAnalytics /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/streaks" element={<ProtectedRoute><StudyStreaks /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/ai-questions" element={<ProtectedRoute><AIQuestionGenerator /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/daily-challenge" element={<ProtectedRoute><DailyChallenge /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/forum" element={<ProtectedRoute><TNForum /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/weak-topics" element={<ProtectedRoute><WeakTopicIdentifier /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/leaderboard" element={<ProtectedRoute><TNLeaderboard /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/:universityId" element={<ProtectedRoute><UniversityDetail /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/:universityId/:courseId" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
                
{/* Admin Routes */}
<Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin/monitor" element={<SimpleAdmin />} />
<Route path="/admin/setup" element={<AdminSetup />} />
<Route path="/admin/setup-guide" element={<AdminSetupGuide />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />
<Route path="/admin/alumni-verification" element={<AlumniVerification />} />
                
                {/* Career Hub Routes */}
                
                {/* Catch-all */}
                <Route path="/survey/:surveyId" element={<ProtectedRoute><SurveyPublic /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
  );
}

export default App;