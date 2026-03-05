const Job = require('../models/Job');

// @desc    Create a job
// @route   POST /api/jobs/create
// @access  Private (Recruiter)
const createJob = async (req, res) => {
    try {
        const { title, description, skills, location, salary } = req.body;

        const job = await Job.create({
            title,
            description,
            skills,
            location,
            salary,
            recruiterId: req.user.id,
        });

        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('recruiterId', 'name company');
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('recruiterId', 'name company');
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get recruiter's jobs
// @route   GET /api/jobs/recruiter
// @access  Private (Recruiter)
const getRecruiterJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ recruiterId: req.user.id });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createJob,
    getJobs,
    getJobById,
    getRecruiterJobs,
};
