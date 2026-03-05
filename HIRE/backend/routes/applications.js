const router = require('express').Router();
const Application = require('../models/Application');
const Job = require('../models/Job');
const Notification = require('../models/Notification');
const { auth, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// POST /api/applications – Apply for a job
router.post('/', auth, authorize('seeker'), upload.single('resume'), async (req, res) => {
    try {
        const { jobId, coverLetter } = req.body;

        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ error: 'Job not found' });
        if (job.status !== 'active') return res.status(400).json({ error: 'Job is no longer active' });

        const existing = await Application.findOne({ job: jobId, applicant: req.user._id });
        if (existing) return res.status(400).json({ error: 'Already applied to this job' });

        const app = await Application.create({
            job: jobId,
            applicant: req.user._id,
            coverLetter,
            resume: req.file ? `/uploads/${req.file.filename}` : req.user.resume || ''
        });

        job.applicantCount += 1;
        await job.save();

        // Notify recruiter
        await Notification.create({
            user: job.postedBy,
            title: 'New Application',
            message: `${req.user.name} applied to "${job.title}"`,
            type: 'application',
            link: `/recruiter/applications`
        });

        res.status(201).json(app);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/applications/my – Get seeker's applications
router.get('/my', auth, authorize('seeker'), async (req, res) => {
    try {
        const apps = await Application.find({ applicant: req.user._id })
            .populate({ path: 'job', populate: { path: 'postedBy', select: 'name company' } })
            .sort({ createdAt: -1 });
        res.json(apps);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/applications/job/:jobId – Get applications for a job (recruiter)
router.get('/job/:jobId', auth, authorize('recruiter', 'admin'), async (req, res) => {
    try {
        const apps = await Application.find({ job: req.params.jobId })
            .populate('applicant', 'name email skills experienceLevel education resume phone')
            .sort({ aiScore: -1, createdAt: -1 });
        res.json(apps);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/applications/:id/status – Update application status
router.put('/:id/status', auth, authorize('recruiter', 'admin'), async (req, res) => {
    try {
        const { status, notes } = req.body;
        const app = await Application.findById(req.params.id).populate('job');
        if (!app) return res.status(404).json({ error: 'Application not found' });

        app.status = status;
        if (notes) app.notes = notes;
        await app.save();

        // Notify applicant
        await Notification.create({
            user: app.applicant,
            title: 'Application Update',
            message: `Your application for "${app.job.title}" has been ${status}`,
            type: 'application',
            link: '/seeker/my-applications'
        });

        res.json(app);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/applications/:id – Get single application
router.get('/:id', auth, async (req, res) => {
    try {
        const app = await Application.findById(req.params.id)
            .populate('applicant', 'name email skills experienceLevel education resume')
            .populate({ path: 'job', populate: { path: 'postedBy', select: 'name company' } });
        if (!app) return res.status(404).json({ error: 'Application not found' });
        res.json(app);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
