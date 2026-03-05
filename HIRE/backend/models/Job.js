const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    department: { type: String, default: 'Engineering' },
    employmentType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], default: 'Full-time' },
    location: { type: String, default: '' },
    workModel: { type: String, enum: ['On-site', 'Remote', 'Hybrid'], default: 'Remote' },
    salaryMin: { type: Number, default: 0 },
    salaryMax: { type: Number, default: 0 },
    requiredSkills: [String],
    niceToHaveSkills: [String],
    experienceLevel: { type: String, default: 'Mid Level' },
    education: { type: String, default: 'No Requirement' },
    description: { type: String, default: '' },
    benefits: { type: String, default: '' },
    deadline: { type: Date },
    startDate: { type: Date },
    aiScreening: { type: Boolean, default: false },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['active', 'closed', 'draft', 'paused'], default: 'active' },
    applicantCount: { type: Number, default: 0 },
    views: { type: Number, default: 0 }
}, { timestamps: true });

jobSchema.index({ title: 'text', description: 'text', requiredSkills: 'text' });

module.exports = mongoose.model('Job', jobSchema);
