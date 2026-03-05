const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const User = require('../models/User');

// @desc    Get all conversations for user
// @route   GET /api/messages/conversations
// @access  Private
const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            participants: req.user.id
        })
            .populate('participants', 'name role')
            .populate('lastMessage')
            .sort({ updatedAt: -1 });

        // Format for frontend
        const formatted = conversations.map(c => {
            const otherUser = c.participants.find(p => p._id.toString() !== req.user.id);
            return {
                _id: c._id,
                userId: otherUser._id,
                name: otherUser.name,
                role: otherUser.role,
                lastMsg: c.lastMessage?.text || '',
                time: c.lastMessage?.createdAt || c.updatedAt,
                unread: 0, // Simplified for now
                online: true // Mocked status
            };
        });

        res.status(200).json(formatted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get messages for a conversation
// @route   GET /api/messages/:userId
// @access  Private
const getMessages = async (req, res) => {
    try {
        const { userId } = req.params;

        let conversation = await Conversation.findOne({
            participants: { $all: [req.user.id, userId] }
        });

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = await Message.find({ conversationId: conversation._id })
            .sort({ createdAt: 1 });

        // Format for frontend
        const formatted = messages.map(m => ({
            _id: m._id,
            from: m.senderId.toString() === req.user.id ? 'me' : 'them',
            text: m.text,
            time: m.createdAt
        }));

        res.status(200).json(formatted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
    try {
        const { receiverId, text } = req.body;

        if (!receiverId || !text) {
            return res.status(400).json({ message: 'Receiver ID and text are required' });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [req.user.id, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [req.user.id, receiverId]
            });
        }

        const newMessage = await Message.create({
            conversationId: conversation._id,
            senderId: req.user.id,
            text
        });

        conversation.lastMessage = newMessage._id;
        await conversation.save();

        res.status(201).json({
            _id: newMessage._id,
            from: 'me',
            text: newMessage.text,
            time: newMessage.createdAt
        });
    } catch (error) {
        console.error("Send Message Err:", error)
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getConversations,
    getMessages,
    sendMessage
};
