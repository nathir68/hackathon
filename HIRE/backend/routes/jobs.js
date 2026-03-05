const router = require('express').Router();
const Job = require('../models/Job');
const { auth, authorize } = require('../middleware/auth');

// GET /api/jobs – Browse jobs (public, with filters)
router.get('/', async (req, res) => {
    try {
        const { search, location, type, workModel, minSalary, maxSalary, experience, department, page = 1, limit = 20 } = req.query;
        const filter = { status: 'active' };

        if (search) filter.$text = { $search: search };
        if (location) filter.location = { $regex: location, $options: 'i' };
        if (type) filter.employmentType = type;
        if (workModel) filter.workModel = workModel;
        if (minSalary) filter.salaryMax = { $gte: Number(minSalary) };
        if (maxSalary) filter.salaryMin = { $lte: Number(maxSalary) };
        if (experience) filter.experienceLevel = experience;
        if (department) filter.department = department;

        const jobs = await Job.find(filter)
            .populate('postedBy', 'name company')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Job.countDocuments(filter);

        res.json({ jobs, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/jobs/recommended – AI recommended jobs for seeker
router.get('/recommended', auth, async (req, res) => {
    try {
        const user = req.user;
        const filter = { status: 'active' };

        if (user.skills && user.skills.length > 0) {
            filter.requiredSkills = { $in: user.skills };
        }

        const jobs = await Job.find(filter)
            .populate('postedBy', 'name company')
            .sort({ createdAt: -1 })
            .limit(20);

        // Calculate match percentage
        const jobsWithMatch = jobs.map(job => {
            const jobObj = job.toObject();
            if (user.skills && job.requiredSkills) {
                const matching = job.requiredSkills.filter(s =>
                    user.skills.some(us => us.toLowerCase() === s.toLowerCase())
                );
                jobObj.matchPercent = Math.round((matching.length / Math.max(job.requiredSkills.length, 1)) * 100);
            } else {
                jobObj.matchPercent = 0;
            }
            return jobObj;
        });

        jobsWithMatch.sort((a, b) => b.matchPercent - a.matchPercent);
        res.json(jobsWithMatch);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/jobs/:id – Get single job
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('postedBy', 'name company');
        if (!job) return res.status(404).json({ error: 'Job not found' });
        job.views += 1;
        await job.save();
        res.json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/jobs – Post new job (recruiter only)
router.post('/', auth, authorize('recruiter', 'admin'), async (req, res) => {
    try {
        const jobData = { ...req.body, postedBy: req.user._id };
        if (typeof jobData.requiredSkills === 'string') {
            jobData.requiredSkills = jobData.requiredSkills.split(',').map(s => s.trim());
        }
        if (typeof jobData.niceToHaveSkills === 'string') {
            jobData.niceToHaveSkills = jobData.niceToHaveSkills.split(',').map(s => s.trim());
        }
        const job = await Job.create(jobData);
        res.status(201).json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/jobs/:id – Update job
router.put('/:id', auth, authorize('recruiter', 'admin'), async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ error: 'Job not found' });
        if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }
        Object.assign(job, req.body);
        await job.save();
        res.json(job);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/jobs/:id – Delete job
router.delete('/:id', auth, authorize('recruiter', 'admin'), async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ error: 'Job not found' });
        if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }
        await job.deleteOne();
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
