const express = require('express');
const router = express.Router();
const { getJobAlerts, createJobAlert, deleteJobAlert, toggleJobAlert, getProfile, updateProfile } = require('../controllers/seekerController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/job-alerts')
    .get(getJobAlerts)
    .post(createJobAlert);

router.route('/profile')
    .get(getProfile)
    .put(updateProfile);

router.route('/job-alerts/:id')
    .put(toggleJobAlert)
    .delete(deleteJobAlert);

module.exports = router;
