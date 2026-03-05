const mongoose = require('mongoose');

const BackupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    size: { type: String, required: true },
    type: { type: String, enum: ['Auto', 'Manual'], default: 'Manual' },
    status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Completed' },
    fileUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Backup', BackupSchema);
