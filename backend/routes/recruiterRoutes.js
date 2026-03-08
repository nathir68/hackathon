const express = require('express');
const router = express.Router();
const { sendBulkEmails } = require('../controllers/recruiterController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post('/bulk-email', protect, authorize('recruiter', 'admin'), sendBulkEmails);

module.exports = router;
