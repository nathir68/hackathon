const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema(
    {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
        candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        resume: { type: String, required: true }, // Candidate's resume used for this app
        status: {
            type: String,
            enum: ['Applied', 'Shortlisted', 'Rejected', 'Selected'],
            default: 'Applied',
        },
        aiScore: { type: Number, default: 0 },
        matchedSkills: { type: [String], default: [] },
        missingSkills: { type: [String], default: [] },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Application', ApplicationSchema);
