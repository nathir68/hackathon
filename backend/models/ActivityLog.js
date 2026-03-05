const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String },
    action: { type: String, required: true },
    type: { type: String, enum: ['auth', 'job', 'application', 'admin', 'profile', 'security'], default: 'admin' },
    ip: { type: String, default: '0.0.0.0' },
}, { timestamps: true });

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);
