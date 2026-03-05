const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String },
    type: { type: String }, // Full-time, Remote, Part-time, Contract
    posted: { type: String },
    skills: [String],
    description: { type: String },
    requirements: [String],
    status: { type: String, default: 'Active' }, // Active, Closed, Draft
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    applicants: { type: Number, default: 0 },
    logo: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
