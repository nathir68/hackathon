const sendEmail = require('../utils/emailService');

// @desc    Send bulk emails to candidates
// @route   POST /api/recruiter/bulk-email
// @access  Private (Recruiter/Admin)
const sendBulkEmails = async (req, res) => {
    try {
        const { recipients, subject, message } = req.body;

        if (!recipients || !recipients.length || !subject || !message) {
            return res.status(400).json({ message: 'Please provide recipients, subject, and message' });
        }

        // Convert comma-separated string to array if necessary, and trim whitespace
        let emailArray = Array.isArray(recipients) ? recipients : recipients.split(',');
        emailArray = emailArray.map(email => email.trim()).filter(email => email);

        if (emailArray.length === 0) {
            return res.status(400).json({ message: 'No valid recipient emails provided' });
        }

        const emailPromises = emailArray.map(email => sendEmail({
            email,
            subject,
            message
        }));

        await Promise.all(emailPromises);

        res.status(200).json({ message: `Successfully sent ${emailArray.length} emails.` });
    } catch (error) {
        console.error('Bulk email error:', error);
        res.status(500).json({ message: 'Failed to send bulk emails' });
    }
};

module.exports = {
    sendBulkEmails
};
