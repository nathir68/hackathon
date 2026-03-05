const router = require('express').Router();
const User = require('../models/User');
const SavedJob = require('../models/SavedJob');
const JobAlert = require('../models/JobAlert');
const CompanyReview = require('../models/CompanyReview');
const { auth, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// GET /api/seeker/profile
router.get('/profile', auth, authorize('seeker'), async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password -otp -twoFactorSecret');
        user.profileCompletion = user.calcProfileCompletion();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/seeker/profile
router.put('/profile', auth, authorize('seeker'), upload.single('resume'), async (req, res) => {
    try {
        const updates = req.body;
        if (req.file) updates.resume = `/uploads/${req.file.filename}`;

        // Handle nested fields
        if (typeof updates.skills === 'string') {
            updates.skills = updates.skills.split(',').map(s => s.trim());
        }
        if (typeof updates.education === 'string') {
            updates.education = JSON.parse(updates.education);
        }
        if (typeof updates.experience === 'string') {
            updates.experience = JSON.parse(updates.experience);
        }

        const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password -otp');
        user.profileCompletion = user.calcProfileCompletion();
        await user.save();

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Saved Jobs ---
// GET /api/seeker/saved-jobs
router.get('/saved-jobs', auth, authorize('seeker'), async (req, res) => {
    try {
        const saved = await SavedJob.find({ user: req.user._id })
            .populate({ path: 'job', populate: { path: 'postedBy', select: 'name company' } })
            .sort({ createdAt: -1 });
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/seeker/saved-jobs
router.post('/saved-jobs', auth, authorize('seeker'), async (req, res) => {
    try {
        const { jobId } = req.body;
        const exists = await SavedJob.findOne({ user: req.user._id, job: jobId });
        if (exists) return res.status(400).json({ error: 'Job already saved' });

        const saved = await SavedJob.create({ user: req.user._id, job: jobId });
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/seeker/saved-jobs/:jobId
router.delete('/saved-jobs/:jobId', auth, authorize('seeker'), async (req, res) => {
    try {
        await SavedJob.findOneAndDelete({ user: req.user._id, job: req.params.jobId });
        res.json({ message: 'Job unsaved' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Job Alerts ---
// GET /api/seeker/job-alerts
router.get('/job-alerts', auth, authorize('seeker'), async (req, res) => {
    try {
        const alerts = await JobAlert.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(alerts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/seeker/job-alerts
router.post('/job-alerts', auth, authorize('seeker'), async (req, res) => {
    try {
        const alert = await JobAlert.create({ ...req.body, user: req.user._id });
        res.status(201).json(alert);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/seeker/job-alerts/:id
router.put('/job-alerts/:id', auth, authorize('seeker'), async (req, res) => {
    try {
        const alert = await JobAlert.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(alert);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/seeker/job-alerts/:id
router.delete('/job-alerts/:id', auth, authorize('seeker'), async (req, res) => {
    try {
        await JobAlert.findByIdAndDelete(req.params.id);
        res.json({ message: 'Alert deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Company Reviews ---
// GET /api/seeker/company-reviews
router.get('/company-reviews', auth, async (req, res) => {
    try {
        const { company } = req.query;
        const filter = company ? { company: { $regex: company, $options: 'i' } } : {};
        const reviews = await CompanyReview.find(filter).populate('user', 'name').sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/seeker/company-reviews
router.post('/company-reviews', auth, authorize('seeker'), async (req, res) => {
    try {
        const review = await CompanyReview.create({ ...req.body, user: req.user._id });
        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- Settings ---
// PUT /api/seeker/settings
router.put('/settings', auth, authorize('seeker'), async (req, res) => {
    try {
        const { emailNotifications, smsNotifications, darkMode, autoApply } = req.body;
        const update = {};
        if (emailNotifications !== undefined) update.emailNotifications = emailNotifications;
        if (smsNotifications !== undefined) update.smsNotifications = smsNotifications;
        if (darkMode !== undefined) update.darkMode = darkMode;
        if (autoApply) update.autoApply = autoApply;

        const user = await User.findByIdAndUpdate(req.user._id, update, { new: true }).select('-password -otp');
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/seeker/dashboard
router.get('/dashboard', auth, authorize('seeker'), async (req, res) => {
    try {
        const Application = require('../models/Application');
        const Interview = require('../models/Interview');

        const [appCount, interviewCount, savedCount] = await Promise.all([
            Application.countDocuments({ applicant: req.user._id }),
            Interview.countDocuments({ applicant: req.user._id, status: 'scheduled' }),
            SavedJob.countDocuments({ user: req.user._id })
        ]);

        const recentApps = await Application.find({ applicant: req.user._id })
            .populate({ path: 'job', populate: { path: 'postedBy', select: 'name company' } })
            .sort({ createdAt: -1 }).limit(5);

        const user = await User.findById(req.user._id).select('-password -otp');
        user.profileCompletion = user.calcProfileCompletion();

        res.json({
            stats: { applications: appCount, interviews: interviewCount, savedJobs: savedCount, profileCompletion: user.profileCompletion },
            recentApplications: recentApps,
            user
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
