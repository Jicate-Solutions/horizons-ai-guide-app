import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import { LanguageProvider } from "@/hooks/useLanguage";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import StudentDashboard from "./pages/StudentDashboard";
import CareerChat from "./pages/CareerChat";
import Register12thLearner from "./pages/Register12thLearner";
import RegisterLearner from "./pages/RegisterLearner";
import RegisterEmployer from "./pages/RegisterEmployer";
import EmployerRegistrationSuccess from "./pages/EmployerRegistrationSuccess";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployerProfile from "./pages/EmployerProfile";
import EmployerJobs from "./pages/EmployerJobs";
import EmployerPostJob from "./pages/EmployerPostJob";
import AdminLogin from "./pages/AdminLogin";
import AdminSetup from "./pages/AdminSetup";
import AdminDashboard from "./pages/AdminDashboard";
import SimpleAdmin from "./pages/SimpleAdmin";
import CareerAssessmentColleges from "./pages/CareerAssessmentColleges";
import TakeAssessment from "./pages/TakeAssessment";
import AssessmentResults from "./pages/AssessmentResults";
import CareerAssessment12thLearners from "./pages/CareerAssessment12thLearners";
import TakeStudentAssessment from "./pages/TakeStudentAssessment";
import StudentAssessmentResults from "./pages/StudentAssessmentResults";
import IndustryTrends from "./pages/IndustryTrends";
import SavedJobs from "./pages/SavedJobs";
import JobPortal from "./pages/JobPortal";
import PYQPractice from "./pages/PYQPractice";
import NotFound from "./pages/NotFound";
import SurveyPublic from "./pages/SurveyPublic";

// Career Hub Pages
import JKKNCareerHub from "./pages/JKKNCareerHub";
import JKKNRegister from "./pages/JKKNRegister";
import JKKNRegisterSuccess from "./pages/JKKNRegisterSuccess";
import JKKNJobDetail from "./pages/JKKNJobDetail";
import JKKNProblemDetail from "./pages/JKKNProblemDetail";
import JKKNRoadmapDetail from "./pages/JKKNRoadmapDetail";
import JKKNLearnerProfile from "./pages/JKKNLearnerProfile";
import CareerAssessment from "./pages/CareerAssessment";
import AICareerPredictor from "./pages/AICareerPredictor";
import SavedCourses from "./pages/SavedCourses";
import { FindCollegesPage, ScholarshipsPage, EduCutoffPage, EntranceExamsPage, PYQPage, GovtJobsPage, TNUniversityPage, CourseExplorerPage, StartupGuidePage } from "./pages/CollegesTabPages";



// Government Exams Pages
import GovernmentExams from "./pages/GovernmentExams";
import GovernmentExamCategory from "./pages/GovernmentExamCategory";
import GovernmentExamDetail from "./pages/GovernmentExamDetail";

// Study Abroad Pages
import AlumniVerification from "./pages/AlumniVerification";

// TN University Entrance Pages
import { UniversityEntranceExams, UniversityDetail, CourseDetail, ExamCalendar, MyReminders, UniversityCompare, SavedQuestions as TNSavedQuestions, PreparationTips as TNPreparationTips, TNStudyPlanner, TNMockTest, ChapterWeightage, PerformanceAnalytics, StudyStreaks, AIQuestionGenerator, DailyChallenge, TNForum, WeakTopicIdentifier, TNLeaderboard } from "./components/UniversityEntrance";
import TNUniversityBrowse from "./pages/TNUniversityBrowse";
 
 // EduCutoff Page
 import EduCutoff from "./pages/EduCutoff";

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
              <Routes>
                {/* Main Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                
                {/* Job Seeker Routes */}
                <Route path="/jobs" element={<ProtectedRoute><JobPortal /></ProtectedRoute>} />
                <Route path="/jobs/*" element={<ProtectedRoute><JobPortal /></ProtectedRoute>} />
                <Route path="/saved-jobs" element={<ProtectedRoute><SavedJobs /></ProtectedRoute>} />
                <Route path="/register/learner" element={<RegisterLearner />} />
                <Route path="/register/12th-learner" element={<Register12thLearner />} />
                
                {/* Employer Routes */}
                <Route path="/register/employer" element={<RegisterEmployer />} />
                <Route path="/employer/register/success" element={<EmployerRegistrationSuccess />} />
                <Route path="/employer/dashboard" element={<EmployerDashboard />} />
                <Route path="/employer/profile" element={<EmployerProfile />} />
                <Route path="/employer/jobs" element={<EmployerJobs />} />
                <Route path="/employer/jobs/new" element={<EmployerPostJob />} />
                <Route path="/employer/jobs/:id/edit" element={<EmployerPostJob />} />
                
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
<Route path="/admin/dashboard" element={<AdminDashboard />} />
<Route path="/admin/alumni-verification" element={<AlumniVerification />} />
                
                {/* Career Hub Routes */}
                <Route path="/jkkn" element={<JKKNCareerHub />} />
                <Route path="/jkkn/register" element={<JKKNRegister />} />
                <Route path="/jkkn/register/success" element={<JKKNRegisterSuccess />} />
                <Route path="/jkkn/job/:id" element={<JKKNJobDetail />} />
                <Route path="/jkkn/problem/:id" element={<JKKNProblemDetail />} />
                <Route path="/jkkn/roadmap/:id" element={<JKKNRoadmapDetail />} />
                <Route path="/jkkn/learner/:id" element={<JKKNLearnerProfile />} />
                
                {/* Catch-all */}
                <Route path="/survey/:surveyId" element={<SurveyPublic />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
  );
}

export default App;