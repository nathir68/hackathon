import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Attach token to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('hire_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Handle 401 responses
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('hire_token');
            localStorage.removeItem('hire_user');
            if (window.location.pathname !== '/auth/login') {
                window.location.href = '/auth/login';
            }
        }
        return Promise.reject(error);
    }
);

// ── Auth ──
export const signup = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const verifyEmail = (data) => API.post('/auth/verify-email', data);
export const verifyOTP = (data) => API.post('/auth/verify-otp', data);
export const forgotPassword = (data) => API.post('/auth/forgot-password', data);
export const resetPassword = (data) => API.post('/auth/reset-password', data);
export const getMe = () => API.get('/auth/me');

// ── Jobs ──
export const getJobs = (params) => API.get('/jobs', { params });
export const getJob = (id) => API.get(`/jobs/${id}`);
export const postJob = (data) => API.post('/jobs/create', data);
export const updateJob = (id, data) => API.put(`/jobs/${id}`, data);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);
export const getRecommendedJobs = () => API.get('/jobs/recommended');

// ── Applications ──
export const applyJob = (data) => API.post('/applications/apply', data);
export const getMyApplications = () => API.get('/applications/user');
export const getJobApplications = (jobId) => API.get(`/applications/job/${jobId}`);
export const updateAppStatus = (id, data) => API.put(`/applications/${id}/status`, data);

// ── Seeker ──
export const getSeekerProfile = () => API.get('/seeker/profile');
export const updateSeekerProfile = (data) => API.put('/seeker/profile', data);
export const getSeekerDashboard = () => API.get('/seeker/dashboard');
export const getSavedJobs = () => API.get('/seeker/saved-jobs');
export const saveJob = (jobId) => API.post('/seeker/saved-jobs', { jobId });
export const unsaveJob = (jobId) => API.delete(`/seeker/saved-jobs/${jobId}`);
export const getJobAlerts = () => API.get('/seeker/job-alerts');
export const createJobAlert = (data) => API.post('/seeker/job-alerts', data);
export const updateJobAlert = (id, data) => API.put(`/seeker/job-alerts/${id}`, data);
export const deleteJobAlert = (id) => API.delete(`/seeker/job-alerts/${id}`);
export const getCompanyReviews = (params) => API.get('/seeker/company-reviews', { params });
export const postCompanyReview = (data) => API.post('/seeker/company-reviews', data);
export const updateSeekerSettings = (data) => API.put('/seeker/settings', data);

// ── Recruiter ──
export const getRecruiterDashboard = () => API.get('/recruiter/dashboard');
export const getCandidates = (jobId) => API.get(`/recruiter/candidates/${jobId}`);
export const sendBulkEmail = (data) => API.post('/recruiter/bulk-email', data);
export const getCompanyProfile = () => API.get('/recruiter/company');
export const updateCompanyProfile = (data) => API.put('/recruiter/company', data);
export const getRecruiterAnalytics = () => API.get('/recruiter/analytics');
export const getMyJobs = () => API.get('/jobs/recruiter');

// ── Admin ──
export const getAdminDashboard = () => API.get('/admin/stats');
export const getUsers = (params) => API.get('/admin/users', { params });
export const blockUser = (id, data) => API.put(`/admin/users/${id}/block`, data);
export const deleteUser = (id) => API.delete(`/admin/user/${id}`);
export const getAdminJobs = (params) => API.get('/admin/jobs', { params });
export const deleteAdminJob = (id) => API.delete(`/admin/jobs/${id}`);
export const getActivityLogs = (params) => API.get('/activity-logs', { params });
export const getSystemSettings = () => API.get('/admin/settings');
export const updateSystemSetting = (data) => API.post('/admin/settings', data);
export const getEmailTemplates = () => API.get('/admin/email-templates');
export const createEmailTemplate = (data) => API.post('/admin/email-templates', data);
export const updateEmailTemplate = (id, data) => API.put(`/admin/email-templates/${id}`, data);
export const deleteEmailTemplate = (id) => API.delete(`/admin/email-templates/${id}`);
export const getAdminReports = () => API.get('/admin/reports');
export const getMonitoring = () => API.get('/admin/monitoring');
export const getRevenue = () => API.get('/admin/revenue');
export const broadcastNotification = (data) => API.post('/admin/notifications/broadcast', data);

// ── AI ──
export const aiResumeScore = (data) => API.post('/ai/resume-score', data);
export const aiATSCheck = (data) => API.post('/ai/ats-check', data);
export const aiMockInterview = (data) => API.post('/ai/mock-interview', data);
export const aiInterviewQuestions = (data) => API.post('/ai/interview-questions', data);
export const aiChat = (data) => API.post('/ai/chat', data);
export const aiJobDescription = (data) => API.post('/ai/job-description', data);
export const aiCareerPredictor = (data) => API.post('/ai/career-predictor', data);
export const aiShortlist = (data) => API.post('/ai/shortlist', data);
export const aiResumeBuilder = (data) => API.post('/ai/resume-builder', data);

// ── Messages ──
export const getConversations = () => API.get('/messages/conversations');
export const getMessages = (userId) => API.get(`/messages/${userId}`);
export const sendMessage = (data) => API.post('/messages', data);

// ── Interviews ──
export const getInterviews = () => API.get('/interviews');
export const scheduleInterview = (data) => API.post('/interviews', data);
export const updateInterview = (id, data) => API.put(`/interviews/${id}`, data);
export const deleteInterview = (id) => API.delete(`/interviews/${id}`);

// ── Notifications ──
export const getNotifications = () => API.get('/notifications');
export const markNotificationRead = (id) => API.put(`/notifications/${id}/read`);
export const markAllRead = () => API.put('/notifications/read-all');

export const getResume = (applicationId) => API.get(`/applications/${applicationId}/resume`, { responseType: 'blob' });

export default API;
