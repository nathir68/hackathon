const mongoose = require('mongoose');

const companyReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    company: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    title: { type: String, default: '' },
    pros: { type: String, default: '' },
    cons: { type: String, default: '' },
    review: { type: String, default: '' },
    recommend: { type: Boolean, default: true },
    position: { type: String, default: '' },
    employmentStatus: { type: String, enum: ['current', 'former'], default: 'current' }
}, { timestamps: true });

module.exports = mongoose.model('CompanyReview', companyReviewSchema);
