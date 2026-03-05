const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'recruiter', 'seeker'], default: 'seeker' },
        skills: { type: [String], default: [] },
        resume: { type: String, default: null }, // URL or filename of uploaded resume
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
