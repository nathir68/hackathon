const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['seeker', 'recruiter', 'admin'], default: 'seeker' },
    phone: { type: String, default: '' },
    avatar: { type: String, default: '' },

    // Seeker fields
    skills: [String],
    experienceLevel: { type: String, enum: ['Entry Level', 'Mid Level', 'Senior', 'Lead', ''], default: '' },
    education: [{
        degree: String,
        institution: String,
        field: String,
        startYear: String,
        endYear: String,
        grade: String
    }],
    experience: [{
        title: String,
        company: String,
        location: String,
        startDate: String,
        endDate: String,
        current: Boolean,
        description: String
    }],
    resume: { type: String, default: '' },
    portfolio: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    bio: { type: String, default: '' },
    location: { type: String, default: '' },

    // Recruiter fields
    company: {
        name: { type: String, default: '' },
        size: { type: String, default: '' },
        industry: { type: String, default: '' },
        website: { type: String, default: '' },
        description: { type: String, default: '' },
        logo: { type: String, default: '' },
        location: { type: String, default: '' },
        founded: { type: String, default: '' }
    },

    // Account status
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    blockReason: { type: String, default: '' },
    profileCompletion: { type: Number, default: 0 },

    // Auth
    otp: { type: String, default: '' },
    otpExpiry: { type: Date },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String, default: '' },

    // Settings
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },
    darkMode: { type: Boolean, default: true },

    // Auto-apply settings (seeker)
    autoApply: {
        enabled: { type: Boolean, default: false },
        keywords: [String],
        locations: [String],
        minSalary: { type: Number, default: 0 },
        jobTypes: [String]
    }
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Calculate profile completion
userSchema.methods.calcProfileCompletion = function () {
    let filled = 0;
    let total = 8;
    if (this.name) filled++;
    if (this.email) filled++;
    if (this.phone) filled++;
    if (this.bio) filled++;
    if (this.location) filled++;
    if (this.skills && this.skills.length > 0) filled++;
    if (this.education && this.education.length > 0) filled++;
    if (this.resume) filled++;
    return Math.round((filled / total) * 100);
};

module.exports = mongoose.model('User', userSchema);
