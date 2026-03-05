const router = require('express').Router();
const Message = require('../models/Message');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// GET /api/messages/conversations – List all conversations
router.get('/conversations', auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const conversations = await Message.aggregate([
            { $match: { $or: [{ sender: userId }, { receiver: userId }] } },
            { $sort: { createdAt: -1 } },
            {
                $group: {
                    _id: { $cond: [{ $eq: ['$sender', userId] }, '$receiver', '$sender'] },
                    lastMessage: { $first: '$content' },
                    lastDate: { $first: '$createdAt' },
                    unread: { $sum: { $cond: [{ $and: [{ $eq: ['$receiver', userId] }, { $eq: ['$read', false] }] }, 1, 0] } }
                }
            },
            { $sort: { lastDate: -1 } }
        ]);

        const populatedConvos = await User.populate(conversations, { path: '_id', select: 'name email role avatar company' });
        const result = populatedConvos.map(c => ({ user: c._id, lastMessage: c.lastMessage, lastDate: c.lastDate, unread: c.unread }));
        res.json(result);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/messages/:userId – Get conversation with user
router.get('/:userId', auth, async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user._id, receiver: req.params.userId },
                { sender: req.params.userId, receiver: req.user._id }
            ]
        }).sort({ createdAt: 1 }).limit(100);

        // Mark as read
        await Message.updateMany(
            { sender: req.params.userId, receiver: req.user._id, read: false },
            { read: true }
        );
        res.json(messages);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/messages – Send message
router.post('/', auth, async (req, res) => {
    try {
        const { receiverId, content } = req.body;
        const msg = await Message.create({ sender: req.user._id, receiver: receiverId, content });
        res.status(201).json(msg);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
