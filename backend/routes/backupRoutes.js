const express = require('express');
const router = express.Router();
const { getBackups, createBackup } = require('../controllers/backupController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect, authorize('admin'));
router.get('/', getBackups);
router.post('/', createBackup);

module.exports = router;
