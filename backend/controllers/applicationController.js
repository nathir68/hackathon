const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const { extractTextFromPDF, scoreResume } = require('../utils/aiService');
const sendEmail = require('../utils/emailService');

// @desc    Apply for a job (Upload Resume)
// @route   POST /api/applications/apply
// @access  Private (Seeker)
const applyForJob = async (req, res) => {
    try {
        const { jobId } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a resume (PDF)' });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if user already applied
        const existingApp = await Application.findOne({ jobId, candidateId: req.user.id });
        if (existingApp) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        // 1. Extract text from PDF
        const resumeText = await extractTextFromPDF(req.file.buffer);

        // 2. AI Scoring
        const aiResult = await scoreResume(job.skills, resumeText);

        // 3. Convert PDF to base64 for MongoDB storage
        const base64Resume = req.file.buffer.toString('base64');

        // 4. Save Application
        const application = await Application.create({
            jobId,
            candidateId: req.user.id,
            resume: base64Resume, // now stores base64 instead of just filename
            status: 'Applied',
            aiScore: aiResult.score,
            matchedSkills: aiResult.matchedSkills,
            missingSkills: aiResult.missingSkills,
        });

        // 5. Send Confirmation Email to Seeker
        const candidate = await User.findById(req.user.id);
        await sendEmail({
            email: candidate.email,
            subject: `Application Received: ${job.title}`,
            message: `Hello ${candidate.name},\n\We have received your application for the ${job.title} position.\n\nOur AI analysis score is ${aiResult.score}% match.\nWe will be in touch soon.\n\nH.I.R.E. Team`,
        });

        res.status(201).json(application);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to apply: ' + error.message });
    }
};

// @desc    Get user's applications
// @route   GET /api/applications/user
// @access  Private (Seeker)
const getUserApplications = async (req, res) => {
    try {
        const apps = await Application.find({ candidateId: req.user.id }).populate('jobId', 'title company location');
        res.status(200).json(apps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get applicants for a job (AI Ranked)
// @route   GET /api/applications/job/:jobId
// @access  Private (Recruiter)
const getJobApplications = async (req, res) => {
    try {
        // Verify job belongs to recruiter
        const job = await Job.findById(req.params.jobId);
        if (job.recruiterId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const apps = await Application.find({ jobId: req.params.jobId })
            .populate('candidateId', 'name email skills')
            .sort({ aiScore: -1 }); // Rank by AI score descending

        res.status(200).json(apps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update application status (Shortlist/Reject) & Send Email
// @route   PUT /api/applications/:id/status
// @access  Private (Recruiter)
const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findById(req.params.id).populate('candidateId', 'name email').populate('jobId', 'title');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.status = status;
        await application.save();

        // Send email notification based on status
        if (status === 'Shortlisted' || status === 'Rejected') {
            const message = status === 'Shortlisted'
                ? `Congratulations ${application.candidateId.name}! You have been shortlisted for the ${application.jobId.title} position. HR will contact you shortly.`
                : `Dear ${application.candidateId.name},\n\nThank you for applying for the ${application.jobId.title} position. Unfortunately, we have decided to move forward with other candidates at this time.\n\nBest wishes,\nH.I.R.E. AI`;

            await sendEmail({
                email: application.candidateId.email,
                subject: `Application Update: ${application.jobId.title}`,
                message,
            });
        }

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Download/View a candidate's resume
// @route   GET /api/applications/:id/resume
// @access  Private (Seeker & Recruiter)
const getResumeFile = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        const base64Pdf = application.resume;
        if (!base64Pdf) {
            return res.status(404).json({ message: 'No resume file found for this application' });
        }

        const pdfBuffer = Buffer.from(base64Pdf, 'base64');

        res.contentType('application/pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error fetching resume:', error);
        res.status(500).json({ message: 'Failed to fetch resume' });
    }
};

module.exports = {
    applyForJob,
    getUserApplications,
    getJobApplications,
    updateApplicationStatus,
    getResumeFile,
};
