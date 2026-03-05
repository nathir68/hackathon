const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String },
    text: { type: String, required: true },
    time: { type: String },
    role: { type: String }, // HR, candidate
    avatar: { type: String },
    read: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
