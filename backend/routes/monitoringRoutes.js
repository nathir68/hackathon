const express = require('express');
const router = express.Router();
const { getMonitoringStats } = require('../controllers/monitoringController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect, authorize('admin'));
router.get('/', getMonitoringStats);

module.exports = router;
