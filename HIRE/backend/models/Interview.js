const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    time: { type: String, default: '' },
    duration: { type: Number, default: 60 },
    type: { type: String, enum: ['phone', 'video', 'onsite', 'technical', 'hr'], default: 'video' },
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled', 'rescheduled', 'no-show'], default: 'scheduled' },
    meetingLink: { type: String, default: '' },
    notes: { type: String, default: '' },
    feedback: { type: String, default: '' },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    rubricScores: [{
        criteria: String,
        score: Number,
        comments: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
