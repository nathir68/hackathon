const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    candidateName: { type: String, required: true },
    position: { type: String, required: true },
    date: { type: String },
    time: { type: String },
    type: { type: String }, // Video, In-Person, Phone
    status: { type: String, default: 'Scheduled' }, // Scheduled, Completed, Cancelled
    interviewer: { type: String },
    notes: { type: String },
    rating: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
