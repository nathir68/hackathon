const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    status: { type: String, default: 'Applied' }, // Applied, Reviewed, Interview, Offered, Rejected
    appliedDate: { type: String },
    applicantName: { type: String },
    applicantEmail: { type: String },
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    resume: { type: String },
    coverLetter: { type: String },
    score: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
