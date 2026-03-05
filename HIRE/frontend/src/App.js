import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// ── Public Panel ──
import Home from './Pages/public panel/HOME';
import About from './Pages/public panel/ABOUT';
import BrowseJobsPublic from './Pages/public panel/BROWSE JOBS';
import Contact from './Pages/public panel/CONTACT US';
import PublicLogin from './Pages/public panel/LOGIN';
import PublicRegister from './Pages/public panel/REGISTER';

// ── Authentication Panel ──
import AuthLogin from './Pages/AUTHENTICATION PANEL/LOGIN';
import AuthSignup from './Pages/AUTHENTICATION PANEL/SIGNUP';
import EmailVerification from './Pages/AUTHENTICATION PANEL/E-MAIL VERIFICATION';
import OTPVerification from './Pages/AUTHENTICATION PANEL/OTP VERIFICATION';
import ForgotPassword from './Pages/AUTHENTICATION PANEL/FORGET PASSWORD';
import SocialLogin from './Pages/AUTHENTICATION PANEL/SOCIAL LOGIN';
import TwoFactorAuth from './Pages/AUTHENTICATION PANEL/TWO FACTOR AUTH';

// ── Job Seeker Panel ──
import SeekerDashboard from './Pages/JOB SEEKER PANEL/DASHBOARD';
import SeekerApplications from './Pages/JOB SEEKER PANEL/MY APPLICATION';
import SeekerBrowseJobs from './Pages/JOB SEEKER PANEL/BROWSE JOBS';
import SeekerRecommended from './Pages/JOB SEEKER PANEL/RECOMMENDED JOBS';
import SeekerJobAlerts from './Pages/JOB SEEKER PANEL/JOB ALERTS';
import SeekerSavedJobs from './Pages/JOB SEEKER PANEL/SAVED JOBS';
import SeekerInterviews from './Pages/JOB SEEKER PANEL/INTERVIEW SCHEDULE';
import SeekerMessages from './Pages/JOB SEEKER PANEL/MESSAGES CHAT HR';
import SeekerSkillAnalysis from './Pages/JOB SEEKER PANEL/AI-SKILL ANALYSIS';
import SeekerAutoApply from './Pages/JOB SEEKER PANEL/AUTO-APPLY SETTINGS';
import SeekerSettings from './Pages/JOB SEEKER PANEL/ACCOUNT SETTING';
import SeekerPersonal from './Pages/JOB SEEKER PANEL/MY PROFILE/PERSONAL  DETAILS';
import SeekerEducation from './Pages/JOB SEEKER PANEL/MY PROFILE/EDUCATION';
import SeekerExperience from './Pages/JOB SEEKER PANEL/MY PROFILE/EXPERIENCE';
import SeekerSkills from './Pages/JOB SEEKER PANEL/MY PROFILE/SKILLS';
import SeekerResume from './Pages/JOB SEEKER PANEL/MY PROFILE/RESUME UPLOAD';
import PortfolioIntegrations from './Pages/JOB SEEKER PANEL/PORTFOLIO INTEGRATIONS';
import SalaryInsights from './Pages/JOB SEEKER PANEL/SALARY INSIGHTS';
import CompanyReviews from './Pages/JOB SEEKER PANEL/COMPANY REVIEWS';
import VideoPitch from './Pages/JOB SEEKER PANEL/VIDEO PITCH';

// ── Recruiter Panel ──
import RecruiterDashboard from './Pages/RECRUITER PANEL/RECRUITER SIDEBAR FEATURES/DASHBOARD';
import PostNewJob from './Pages/RECRUITER PANEL/RECRUITER SIDEBAR FEATURES/POST NEW JOB';
import ManageJobs from './Pages/RECRUITER PANEL/RECRUITER SIDEBAR FEATURES/MANAGE JOB POST';
import ViewApplications from './Pages/RECRUITER PANEL/RECRUITER SIDEBAR FEATURES/VIEW APPLICATIONS';
import CandidateRanking from './Pages/RECRUITER PANEL/RECRUITER SIDEBAR FEATURES/CANDIDATE RANKING';
import RecruiterAIScreening from './Pages/RECRUITER PANEL/RECRUITER SIDEBAR FEATURES/AI-SCREENING';
import HiringAnalytics from './Pages/RECRUITER PANEL/RECRUITER SIDEBAR FEATURES/HIRING ANALYTICS';
import RecruiterChat from './Pages/RECRUITER PANEL/RECRUITER SIDEBAR FEATURES/CHAT';
import BulkEmails from './Pages/RECRUITER PANEL/RECRUITER SIDEBAR FEATURES/BULK EMAILS';
import RecruiterInterviews from './Pages/RECRUITER PANEL/RECRUITER SIDEBAR FEATURES/INTERVIEWS';
import CompanyProfile from './Pages/RECRUITER PANEL/RECRUITER SIDEBAR FEATURES/COMPANY PROFILE';
import Subscription from './Pages/RECRUITER PANEL/RECRUITER SIDEBAR FEATURES/SUBSCRIPTION';
import RecruiterAccount from './Pages/RECRUITER PANEL/RECRUITER SIDEBAR FEATURES/ACCOUNT';
import CollaborativeHiring from './Pages/RECRUITER PANEL/RECRUITER SIDEBAR FEATURES/COLLABORATIVE HIRING';
import KanbanTracker from './Pages/RECRUITER PANEL/RECRUITER SIDEBAR FEATURES/KANBAN TRACKER';
import DiversityMetrics from './Pages/RECRUITER PANEL/RECRUITER SIDEBAR FEATURES/DIVERSITY METRICS';
import InterviewRubrics from './Pages/RECRUITER PANEL/RECRUITER SIDEBAR FEATURES/INTERVIEW RUBRICS';

// ── Admin Panel ──
import AdminDashboard from './Pages/ADMIN PANEL/DASHBOARD OVERVIEW';
import AdminManageSeekers from './Pages/ADMIN PANEL/MANAGE USERS/JOB SEEKER';
import AdminManageRecruiters from './Pages/ADMIN PANEL/MANAGE USERS/RECRUITERS';
import AdminBlockSuspend from './Pages/ADMIN PANEL/BLOCK-SUSPEND USERS';
import AdminManageJobs from './Pages/ADMIN PANEL/MANAGE JOB POSTS';
import AdminActivityLogs from './Pages/ADMIN PANEL/ACTIVITY LOGS';
import AdminNotifications from './Pages/ADMIN PANEL/NOTIFICATIONS';
import AdminAIScreening from './Pages/ADMIN PANEL/AI SCREENING SETTING';
import AdminReports from './Pages/ADMIN PANEL/REPORTS';
import AdminSystemSettings from './Pages/ADMIN PANEL/SYSTEM SETTINGS';
import AdminBackup from './Pages/ADMIN PANEL/BACKUP';
import AdminControl from './Pages/ADMIN PANEL/ADMIN CONTROL';
import AdminEmailTemplates from './Pages/ADMIN PANEL/EMAIL TEMPLATES';
import AdminMonitoring from './Pages/ADMIN PANEL/MONITORING';
import FraudDetection from './Pages/ADMIN PANEL/FRAUD DETECTION';
import RevenueDashboard from './Pages/ADMIN PANEL/REVENUE DASHBOARD';

// ── AI Features – Seekers ──
import ResumeScoreChecker from './Pages/AI-FEATURES/SEEKERS/RESUME SCORE CHECKER';
import ATSChecker from './Pages/AI-FEATURES/SEEKERS/ATS CHECKER';
import ResumeBuilder from './Pages/AI-FEATURES/SEEKERS/RESUME BUILDER';
import AIMockInterview from './Pages/AI-FEATURES/SEEKERS/AI MOCK INTERVIEW';
import InterviewQuestions from './Pages/AI-FEATURES/SEEKERS/INTERVIEW QUESTION SUGGESTIONS';
import AIChatAssistant from './Pages/AI-FEATURES/SEEKERS/AI CHAT ASSISTANT';
import DuplicateResumeDetector from './Pages/AI-FEATURES/SEEKERS/DUPLICATE RESUME DETECTOR';

// ── AI Features – Recruiters ──
import AutoShortlisting from './Pages/AI-FEATURES/RECRUITERS/AUTO-SHORTLISTING';
import AIInterviewAnalytics from './Pages/AI-FEATURES/RECRUITERS/AI INTERVIEW ANALYTICS';
import AIJobDescriptionGen from './Pages/AI-FEATURES/RECRUITERS/AI JOB DESCRIPTION GENERATOR';
import MultilingualScreening from './Pages/AI-FEATURES/RECRUITERS/MULTILINGUAL RESUME SCREENING';
import AIReferenceChecker from './Pages/AI-FEATURES/RECRUITERS/AI REFERENCE CHECKER';
import AptitudeTest from './Pages/AI-FEATURES/SEEKERS/APTITUDE TEST';
import AICareerPathPredictor from './Pages/AI-FEATURES/SEEKERS/AI CAREER PATH PREDICTOR';
import AptitudeTestMgmt from './Pages/RECRUITER PANEL/RECRUITER SIDEBAR FEATURES/APTITUDE TEST MANAGEMENT';
import AutoEmailCampaigns from './Pages/RECRUITER PANEL/RECRUITER SIDEBAR FEATURES/AUTO EMAIL CAMPAIGNS';
import AdminAutoEmail from './Pages/ADMIN PANEL/AUTO EMAIL SETTINGS';

function App() {
  return (
    <Router>
      <Routes>
        {/* ── Public Pages ── */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/browse-jobs" element={<BrowseJobsPublic />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<PublicLogin />} />
        <Route path="/register" element={<PublicRegister />} />

        {/* ── Authentication ── */}
        <Route path="/auth/login" element={<AuthLogin />} />
        <Route path="/auth/signup" element={<AuthSignup />} />
        <Route path="/auth/verify-email" element={<EmailVerification />} />
        <Route path="/auth/verify-otp" element={<OTPVerification />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/social-login" element={<SocialLogin />} />
        <Route path="/auth/2fa" element={<TwoFactorAuth />} />

        {/* ── Job Seeker Panel ── */}
        <Route path="/seeker/dashboard" element={<SeekerDashboard />} />
        <Route path="/seeker/my-applications" element={<SeekerApplications />} />
        <Route path="/seeker/browse-jobs" element={<SeekerBrowseJobs />} />
        <Route path="/seeker/recommended-jobs" element={<SeekerRecommended />} />
        <Route path="/seeker/job-alerts" element={<SeekerJobAlerts />} />
        <Route path="/seeker/saved-jobs" element={<SeekerSavedJobs />} />
        <Route path="/seeker/interviews" element={<SeekerInterviews />} />
        <Route path="/seeker/messages" element={<SeekerMessages />} />
        <Route path="/seeker/ai-skill-analysis" element={<SeekerSkillAnalysis />} />
        <Route path="/seeker/auto-apply" element={<SeekerAutoApply />} />
        <Route path="/seeker/settings" element={<SeekerSettings />} />
        <Route path="/seeker/profile/personal" element={<SeekerPersonal />} />
        <Route path="/seeker/profile/education" element={<SeekerEducation />} />
        <Route path="/seeker/profile/experience" element={<SeekerExperience />} />
        <Route path="/seeker/profile/skills" element={<SeekerSkills />} />
        <Route path="/seeker/profile/resume" element={<SeekerResume />} />
        <Route path="/seeker/portfolio" element={<PortfolioIntegrations />} />
        <Route path="/seeker/salary-insights" element={<SalaryInsights />} />
        <Route path="/seeker/company-reviews" element={<CompanyReviews />} />
        <Route path="/seeker/video-pitch" element={<VideoPitch />} />

        {/* ── Recruiter Panel ── */}
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/post-job" element={<PostNewJob />} />
        <Route path="/recruiter/manage-jobs" element={<ManageJobs />} />
        <Route path="/recruiter/applications" element={<ViewApplications />} />
        <Route path="/recruiter/candidate-ranking" element={<CandidateRanking />} />
        <Route path="/recruiter/ai-screening" element={<RecruiterAIScreening />} />
        <Route path="/recruiter/analytics" element={<HiringAnalytics />} />
        <Route path="/recruiter/chat" element={<RecruiterChat />} />
        <Route path="/recruiter/bulk-emails" element={<BulkEmails />} />
        <Route path="/recruiter/interviews" element={<RecruiterInterviews />} />
        <Route path="/recruiter/company" element={<CompanyProfile />} />
        <Route path="/recruiter/subscription" element={<Subscription />} />
        <Route path="/recruiter/account" element={<RecruiterAccount />} />
        <Route path="/recruiter/collaborative" element={<CollaborativeHiring />} />
        <Route path="/recruiter/kanban" element={<KanbanTracker />} />
        <Route path="/recruiter/diversity" element={<DiversityMetrics />} />
        <Route path="/recruiter/rubrics" element={<InterviewRubrics />} />

        {/* ── Admin Panel ── */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-seekers" element={<AdminManageSeekers />} />
        <Route path="/admin/manage-recruiters" element={<AdminManageRecruiters />} />
        <Route path="/admin/block-suspend" element={<AdminBlockSuspend />} />
        <Route path="/admin/manage-jobs" element={<AdminManageJobs />} />
        <Route path="/admin/activity-logs" element={<AdminActivityLogs />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/ai-screening" element={<AdminAIScreening />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/settings" element={<AdminSystemSettings />} />
        <Route path="/admin/backup" element={<AdminBackup />} />
        <Route path="/admin/admins" element={<AdminControl />} />
        <Route path="/admin/email-templates" element={<AdminEmailTemplates />} />
        <Route path="/admin/monitoring" element={<AdminMonitoring />} />
        <Route path="/admin/fraud-detection" element={<FraudDetection />} />
        <Route path="/admin/revenue" element={<RevenueDashboard />} />

        {/* ── AI Features – Seekers ── */}
        <Route path="/ai/resume-score" element={<ResumeScoreChecker />} />
        <Route path="/ai/ats-checker" element={<ATSChecker />} />
        <Route path="/ai/resume-builder" element={<ResumeBuilder />} />
        <Route path="/ai/mock-interview" element={<AIMockInterview />} />
        <Route path="/ai/interview-questions" element={<InterviewQuestions />} />
        <Route path="/ai/chat-assistant" element={<AIChatAssistant />} />
        <Route path="/ai/duplicate-detector" element={<DuplicateResumeDetector />} />

        {/* ── AI Features – Recruiters ── */}
        <Route path="/ai/auto-shortlisting" element={<AutoShortlisting />} />
        <Route path="/ai/interview-analytics" element={<AIInterviewAnalytics />} />
        <Route path="/ai/job-description-generator" element={<AIJobDescriptionGen />} />
        <Route path="/ai/multilingual-screening" element={<MultilingualScreening />} />
        <Route path="/ai/reference-checker" element={<AIReferenceChecker />} />
        <Route path="/ai/career-predictor" element={<AICareerPathPredictor />} />

        {/* ── Aptitude Tests ── */}
        <Route path="/ai/aptitude-test" element={<AptitudeTest />} />
        <Route path="/recruiter/aptitude-tests" element={<AptitudeTestMgmt />} />

        {/* ── Auto Email ── */}
        <Route path="/recruiter/auto-emails" element={<AutoEmailCampaigns />} />
        <Route path="/admin/auto-emails" element={<AdminAutoEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
