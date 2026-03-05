const mongoose = require('mongoose');

const JobAlertSchema = new mongoose.Schema({
    seekerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    keywords: { type: String, required: true },
    location: { type: String },
    type: { type: String, enum: ['Full-time', 'Part-time', 'Remote', 'Contract'], default: 'Full-time' },
    frequency: { type: String, enum: ['Instant', 'Daily', 'Weekly'], default: 'Daily' },
    active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('JobAlert', JobAlertSchema);
