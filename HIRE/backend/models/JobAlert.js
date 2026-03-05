const mongoose = require('mongoose');

const jobAlertSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    keywords: [String],
    location: { type: String, default: '' },
    jobType: { type: String, default: '' },
    salaryMin: { type: Number, default: 0 },
    frequency: { type: String, enum: ['daily', 'weekly', 'instant'], default: 'daily' },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('JobAlert', jobAlertSchema);
