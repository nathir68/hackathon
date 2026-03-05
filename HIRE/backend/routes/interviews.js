const router = require('express').Router();
const Interview = require('../models/Interview');
const Notification = require('../models/Notification');
const { auth, authorize } = require('../middleware/auth');

// GET /api/interviews – Get user's interviews
router.get('/', auth, async (req, res) => {
    try {
        const filter = req.user.role === 'recruiter'
            ? { recruiter: req.user._id }
            : { applicant: req.user._id };

        const interviews = await Interview.find(filter)
            .populate('job', 'title department')
            .populate('applicant', 'name email')
            .populate('recruiter', 'name email company')
            .sort({ date: 1 });
        res.json(interviews);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/interviews – Schedule interview
router.post('/', auth, authorize('recruiter', 'admin'), async (req, res) => {
    try {
        const interview = await Interview.create({ ...req.body, recruiter: req.user._id });

        await Notification.create({
            user: req.body.applicant,
            title: 'Interview Scheduled',
            message: `You have an interview on ${new Date(req.body.date).toLocaleDateString()}`,
            type: 'interview',
            link: '/seeker/interviews'
        });

        res.status(201).json(interview);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT /api/interviews/:id – Update interview
router.put('/:id', auth, async (req, res) => {
    try {
        const interview = await Interview.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!interview) return res.status(404).json({ error: 'Interview not found' });
        res.json(interview);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /api/interviews/:id
router.delete('/:id', auth, authorize('recruiter', 'admin'), async (req, res) => {
    try {
        await Interview.findByIdAndDelete(req.params.id);
        res.json({ message: 'Interview cancelled' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
