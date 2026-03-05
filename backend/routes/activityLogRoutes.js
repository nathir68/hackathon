const express = require('express');
const router = express.Router();
const { getActivityLogs, createLog, clearLogs } = require('../controllers/activityLogController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect);

router.get('/', authorize('admin'), getActivityLogs);
router.post('/', createLog);
router.delete('/', authorize('admin'), clearLogs);

module.exports = router;
