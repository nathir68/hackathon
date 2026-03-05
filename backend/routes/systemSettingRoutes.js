const express = require('express');
const router = express.Router();
const { getSettings, updateSetting } = require('../controllers/systemSettingController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// All routes require admin
router.use(protect, authorize('admin'));

router.get('/', getSettings);
router.post('/', updateSetting);

module.exports = router;
