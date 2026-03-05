const Notification = require('../models/Notification');

// @desc    Get notifications for current user (or all for admin)
// @route   GET /api/notifications
const getNotifications = async (req, res) => {
    try {
        const filter = req.user.role === 'admin' ? {} : { userId: req.user.id };
        const notifs = await Notification.find(filter).sort({ createdAt: -1 }).limit(50);
        res.status(200).json(notifs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a notification
// @route   POST /api/notifications
const createNotification = async (req, res) => {
    try {
        const notif = await Notification.create({
            userId: req.body.userId || req.user.id,
            title: req.body.title,
            description: req.body.description,
            type: req.body.type || 'system',
        });
        res.status(201).json(notif);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
const markRead = async (req, res) => {
    try {
        const notif = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
        res.status(200).json(notif);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mark all as read
// @route   PUT /api/notifications/read-all
const markAllRead = async (req, res) => {
    try {
        const filter = req.user.role === 'admin' ? {} : { userId: req.user.id };
        await Notification.updateMany(filter, { read: true });
        res.status(200).json({ message: 'All marked as read' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
const deleteNotification = async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Notification deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getNotifications, createNotification, markRead, markAllRead, deleteNotification };
