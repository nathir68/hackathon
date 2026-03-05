const ActivityLog = require('../models/ActivityLog');

// @desc    Get activity logs (admin only)
// @route   GET /api/activity-logs
const getActivityLogs = async (req, res) => {
    try {
        const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(100);
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an activity log entry
// @route   POST /api/activity-logs
const createLog = async (req, res) => {
    try {
        const log = await ActivityLog.create({
            userId: req.user.id,
            userName: req.user.name || req.body.userName,
            action: req.body.action,
            type: req.body.type || 'admin',
            ip: req.ip || req.connection?.remoteAddress || '0.0.0.0',
        });
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete all logs
// @route   DELETE /api/activity-logs
const clearLogs = async (req, res) => {
    try {
        await ActivityLog.deleteMany({});
        res.status(200).json({ message: 'All logs cleared' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getActivityLogs, createLog, clearLogs };
