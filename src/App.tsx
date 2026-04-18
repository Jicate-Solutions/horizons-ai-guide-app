import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import { LanguageProvider } from "@/hooks/useLanguage";
import { PaymentProvider } from "@/hooks/usePayment";
import { lazy, Suspense } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import PaymentRoute from "@/components/PaymentRoute";
import PaywallPage from "./pages/PaywallPage";
import ErrorBoundary from "@/components/ErrorBoundary";

const NotificationBanner = lazy(() => import("@/components/NotificationBanner"));

// ─── Landing + Auth: eager load (first pages users see) ───
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// ─── Loading skeleton for lazy pages ───
const PageLoader = () => (
  <div style={{ minHeight: '100vh', background: 'var(--color-background-primary, #fff)' }}>
    <div style={{ height: 56, background: '#f1f5f9', animation: 'pulse 1.5s ease-in-out infinite' }} />
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ height: 180, borderRadius: 16, background: '#f1f5f9', marginBottom: 24, animation: 'pulse 1.5s ease-in-out infinite' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {[1,2,3].map(i => (
          <div key={i} style={{ height: 120, borderRadius: 12, background: '#f1f5f9', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
    <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
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
const GovtJobsPage = lazy(() => import("./pages/GovernmentExams"));
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
          <PaymentProvider>
          <AdminAuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
              <ErrorBoundary>
              <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Main Routes — Open */}
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/unlock" element={<PaywallPage />} />
                
                {/* Job Portal — Open to browse, login to save */}
                <Route path="/jobs" element={<PaymentRoute><JobPortal /></PaymentRoute>} />
                <Route path="/jobs/*" element={<PaymentRoute><JobPortal /></PaymentRoute>} />
                <Route path="/saved-jobs" element={<PaymentRoute><SavedJobs /></PaymentRoute>} />
                <Route path="/register/learner" element={<ProtectedRoute><RegisterLearner /></ProtectedRoute>} />
                <Route path="/register/12th-learner" element={<ProtectedRoute><Register12thLearner /></ProtectedRoute>} />
                
                {/* Employer Routes — Login required */}
                <Route path="/register/employer" element={<ProtectedRoute><RegisterEmployer /></ProtectedRoute>} />
                <Route path="/employer/register/success" element={<ProtectedRoute><EmployerRegistrationSuccess /></ProtectedRoute>} />
                <Route path="/employer/dashboard" element={<ProtectedRoute><EmployerDashboard /></ProtectedRoute>} />
                <Route path="/employer/profile" element={<ProtectedRoute><EmployerProfile /></ProtectedRoute>} />
                <Route path="/employer/jobs" element={<ProtectedRoute><EmployerJobs /></ProtectedRoute>} />
                <Route path="/employer/jobs/new" element={<ProtectedRoute><EmployerPostJob /></ProtectedRoute>} />
                <Route path="/employer/jobs/:id/edit" element={<ProtectedRoute><EmployerPostJob /></ProtectedRoute>} />
                
                {/* Student Dashboard — Login required */}
                <Route path="/student-dashboard" element={<PaymentRoute><StudentDashboard /></PaymentRoute>} />

                {/* Career Assessment — Open to browse, login to take/save */}
                <Route path="/career-assessment" element={<PaymentRoute><AICareerPredictor /></PaymentRoute>} />
                <Route path="/career-assessment/chat" element={<PaymentRoute><CareerChat /></PaymentRoute>} />
                <Route path="/career-assessment/colleges" element={<PaymentRoute><CareerAssessmentColleges /></PaymentRoute>} />
                <Route path="/career-assessment/colleges/find-colleges" element={<PaymentRoute><FindCollegesPage /></PaymentRoute>} />
                <Route path="/career-assessment/colleges/scholarships" element={<PaymentRoute><ScholarshipsPage /></PaymentRoute>} />
                <Route path="/career-assessment/colleges/educutoff" element={<PaymentRoute><EduCutoffPage /></PaymentRoute>} />
                <Route path="/career-assessment/colleges/entrance-exams" element={<PaymentRoute><EntranceExamsPage /></PaymentRoute>} />
                <Route path="/career-assessment/colleges/pyq" element={<PaymentRoute><EntranceExamsPage /></PaymentRoute>} />
                <Route path="/career-assessment/colleges/govt-jobs" element={<PaymentRoute><GovtJobsPage /></PaymentRoute>} />
                <Route path="/career-assessment/colleges/tn-university" element={<PaymentRoute><TNUniversityPage /></PaymentRoute>} />
                <Route path="/career-assessment/colleges/course-explorer" element={<PaymentRoute><CourseExplorerPage /></PaymentRoute>} />
                <Route path="/career-assessment/colleges/startup" element={<PaymentRoute><StartupGuidePage /></PaymentRoute>} />
                <Route path="/career-assessment/take/:type" element={<ProtectedRoute><TakeAssessment /></ProtectedRoute>} />
                <Route path="/career-assessment/results/:attemptId" element={<ProtectedRoute><AssessmentResults /></ProtectedRoute>} />
                <Route path="/career-assessment/12th-learners" element={<PaymentRoute><CareerAssessment12thLearners /></PaymentRoute>} />
                <Route path="/career-assessment/12th-learners/take" element={<ProtectedRoute><TakeStudentAssessment /></ProtectedRoute>} />
                <Route path="/career-assessment/12th-learners/results/:attemptId" element={<ProtectedRoute><StudentAssessmentResults /></ProtectedRoute>} />
                <Route path="/career-assessment/industry-trends" element={<PaymentRoute><IndustryTrends /></PaymentRoute>} />
                <Route path="/career-assessment/pyq-practice" element={<PaymentRoute><PYQPractice /></PaymentRoute>} />
                <Route path="/career-assessment/boosting" element={<PaymentRoute><CareerAssessment /></PaymentRoute>} />
                <Route path="/career-assessment/ai-predictor" element={<PaymentRoute><AICareerPredictor /></PaymentRoute>} />
                <Route path="/career-assessment/saved-courses" element={<ProtectedRoute><SavedCourses /></ProtectedRoute>} />

                {/* Study Tools — Open to browse */}
                <Route path="/syllabus-tracker" element={<PaymentRoute><SyllabusTracker /></PaymentRoute>} />
                <Route path="/exam-alerts" element={<PaymentRoute><ExamAlerts /></PaymentRoute>} />
                <Route path="/rank-predictor" element={<PaymentRoute><RankPredictor /></PaymentRoute>} />
                <Route path="/study-guide" element={<PaymentRoute><StudyGuide /></PaymentRoute>} />
                <Route path="/question-bank" element={<PaymentRoute><QuestionBank /></PaymentRoute>} />
                <Route path="/topic-hub" element={<PaymentRoute><TopicHub /></PaymentRoute>} />
                <Route path="/pyq-papers" element={<PaymentRoute><PYQPapers /></PaymentRoute>} />
                 
                {/* EduCutoff — Open (calculator is the main draw) */}
                <Route path="/edu-cutoff" element={<PaymentRoute><EduCutoff /></PaymentRoute>} />
                
                {/* Government Exams — Open to browse */}
                <Route path="/government-exams" element={<PaymentRoute><GovernmentExams /></PaymentRoute>} />
                <Route path="/government-exams/:categoryId" element={<PaymentRoute><GovernmentExamCategory /></PaymentRoute>} />
                <Route path="/government-exams/:categoryId/:examId" element={<PaymentRoute><GovernmentExamDetail /></PaymentRoute>} />
                
                {/* TN University Entrance — Open to browse, login for personal features */}
                <Route path="/tn-university-entrance" element={<PaymentRoute><UniversityEntranceExams /></PaymentRoute>} />
                <Route path="/tn-university-entrance/browse" element={<PaymentRoute><TNUniversityBrowse /></PaymentRoute>} />
                <Route path="/tn-university-entrance/exam-calendar" element={<PaymentRoute><ExamCalendar /></PaymentRoute>} />
                <Route path="/tn-university-entrance/preparation-tips" element={<PaymentRoute><TNPreparationTips /></PaymentRoute>} />
                <Route path="/tn-university-entrance/chapter-weightage" element={<PaymentRoute><ChapterWeightage /></PaymentRoute>} />
                <Route path="/tn-university-entrance/mock-test" element={<PaymentRoute><TNMockTest /></PaymentRoute>} />
                <Route path="/tn-university-entrance/daily-challenge" element={<PaymentRoute><DailyChallenge /></PaymentRoute>} />
                <Route path="/tn-university-entrance/forum" element={<PaymentRoute><TNForum /></PaymentRoute>} />
                <Route path="/tn-university-entrance/compare" element={<PaymentRoute><UniversityCompare /></PaymentRoute>} />
                <Route path="/tn-university-entrance/:universityId" element={<PaymentRoute><UniversityDetail /></PaymentRoute>} />
                <Route path="/tn-university-entrance/:universityId/:courseId" element={<PaymentRoute><CourseDetail /></PaymentRoute>} />
                {/* TN University — Login required for personal features */}
                <Route path="/tn-university-entrance/my-reminders" element={<ProtectedRoute><MyReminders /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/saved-questions" element={<ProtectedRoute><TNSavedQuestions /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/study-planner" element={<ProtectedRoute><TNStudyPlanner /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/analytics" element={<ProtectedRoute><PerformanceAnalytics /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/streaks" element={<ProtectedRoute><StudyStreaks /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/ai-questions" element={<ProtectedRoute><AIQuestionGenerator /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/weak-topics" element={<ProtectedRoute><WeakTopicIdentifier /></ProtectedRoute>} />
                <Route path="/tn-university-entrance/leaderboard" element={<ProtectedRoute><TNLeaderboard /></ProtectedRoute>} />
                
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
              </ErrorBoundary>
              <Suspense fallback={null}><NotificationBanner /></Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </AdminAuthProvider>
          </PaymentProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
  );
}

export default App;