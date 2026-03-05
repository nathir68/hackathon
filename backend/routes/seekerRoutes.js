const express = require('express');
const router = express.Router();
const { getJobAlerts, createJobAlert, deleteJobAlert, toggleJobAlert } = require('../controllers/seekerController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/job-alerts')
    .get(getJobAlerts)
    .post(createJobAlert);

router.route('/job-alerts/:id')
    .put(toggleJobAlert)
    .delete(deleteJobAlert);

module.exports = router;
