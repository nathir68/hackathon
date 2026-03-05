const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ats: { type: Number, required: true },
    skills: { type: Number, required: true },
    exp: { type: Number, required: true },
    overall: { type: Number, required: true },
    flag: { type: String, default: 'None' }
}, {
    timestamps: true,
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
