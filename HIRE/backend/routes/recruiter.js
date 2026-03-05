const router = require('express').Router();
const Job = require('../models/Job');
const Application = require('../models/Application');
const Interview = require('../models/Interview');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { auth, authorize } = require('../middleware/auth');

// GET /api/recruiter/dashboard
router.get('/dashboard', auth, authorize('recruiter'), async (req, res) => {
    try {
        const myJobs = await Job.find({ postedBy: req.user._id });
        const jobIds = myJobs.map(j => j._id);

        const [totalApps, shortlisted, interviews, activeJobs] = await Promise.all([
            Application.countDocuments({ job: { $in: jobIds } }),
            Application.countDocuments({ job: { $in: jobIds }, status: 'shortlisted' }),
            Interview.countDocuments({ recruiter: req.user._id, status: 'scheduled' }),
            Job.countDocuments({ postedBy: req.user._id, status: 'active' })
        ]);

        const recentApps = await Application.find({ job: { $in: jobIds } })
            .populate('applicant', 'name email skills')
            .populate('job', 'title')
            .sort({ createdAt: -1 }).limit(10);

        res.json({
            stats: { totalApplications: totalApps, shortlisted, upcomingInterviews: interviews, activeJobs, totalJobs: myJobs.length },
            recentApplications: recentApps
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/recruiter/candidates/:jobId – Candidate ranking
router.get('/candidates/:jobId', auth, authorize('recruiter', 'admin'), async (req, res) => {
    try {
        const apps = await Application.find({ job: req.params.jobId })
            .populate('applicant', 'name email skills experienceLevel education resume phone location')
            .sort({ aiScore: -1, createdAt: -1 });
        res.json(apps);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/recruiter/bulk-email
router.post('/bulk-email', auth, authorize('recruiter'), async (req, res) => {
    try {
        const { applicantIds, subject, body } = req.body;
        // In production, send actual emails via nodemailer
        // For now, create notifications for each applicant
        const notifications = applicantIds.map(id => ({
            user: id,
            title: subject,
            message: body,
            type: 'info'
        }));
        await Notification.insertMany(notifications);
        res.json({ message: `Email sent to ${applicantIds.length} candidates`, count: applicantIds.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/recruiter/company
router.get('/company', auth, authorize('recruiter'), async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('company');
        res.json(user.company);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/recruiter/company
router.put('/company', auth, authorize('recruiter'), async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, { company: req.body }, { new: true }).select('company');
        res.json(user.company);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/recruiter/analytics
router.get('/analytics', auth, authorize('recruiter'), async (req, res) => {
    try {
        const myJobs = await Job.find({ postedBy: req.user._id });
        const jobIds = myJobs.map(j => j._id);

        const statusCounts = await Application.aggregate([
            { $match: { job: { $in: jobIds } } },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const monthlyApps = await Application.aggregate([
            { $match: { job: { $in: jobIds } } },
            { $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        const topJobs = await Job.find({ postedBy: req.user._id })
            .sort({ applicantCount: -1 })
            .limit(5)
            .select('title applicantCount status');

        res.json({ statusCounts, monthlyApps, topJobs });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/recruiter/my-jobs
router.get('/my-jobs', auth, authorize('recruiter'), async (req, res) => {
    try {
        const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
