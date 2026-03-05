const mongoose = require('mongoose');

const EmailTemplateSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    subject: { type: String, required: true },
    trigger: { type: String, required: true },
    bodyHtml: { type: String, required: true },
    variables: [{ type: String }],
    active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('EmailTemplate', EmailTemplateSchema);
