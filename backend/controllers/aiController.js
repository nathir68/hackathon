const aiService = require('../utils/aiService');

/**
 * @desc    Handle chat interaction with AI
 * @route   POST /api/ai/chat
 * @access  Private
 */
const handleAIChat = async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ message: 'Invalid or empty messages array' });
        }

        const reply = await aiService.chatWithAI(messages, req.user);
        res.json({ reply });
    } catch (error) {
        console.error('AI Chat Error:', error);
        res.status(500).json({ message: 'Error processing AI chat' });
    }
};

module.exports = {
    handleAIChat
};
