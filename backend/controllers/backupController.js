const Backup = require('../models/Backup');

// @desc    Get all backups
// @route   GET /api/admin/backups
const getBackups = async (req, res) => {
    try {
        const backups = await Backup.find().sort({ createdAt: -1 });
        res.status(200).json(backups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new backup entry (Simulated)
// @route   POST /api/admin/backups
const createBackup = async (req, res) => {
    try {
        // In a real app, this would trigger a mongodump script.
        // Here we just record that a backup was "requested" and "completed".
        const sizes = ['120 MB', '45 MB', '2.1 GB', '850 MB', '15 MB'];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

        const backup = await Backup.create({
            name: req.body.name || 'Manual Backup',
            type: req.body.type || 'Manual',
            size: randomSize,
            status: 'Completed'
        });

        res.status(201).json(backup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getBackups, createBackup };
