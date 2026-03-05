const express = require('express');
const router = express.Router();
const {
    applyForJob,
    getUserApplications,
    getJobApplications,
    updateApplicationStatus,
    getResumeFile
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/apply', protect, authorize('seeker'), upload.single('resume'), applyForJob);
router.get('/user', protect, authorize('seeker'), getUserApplications);
router.get('/job/:jobId', protect, authorize('recruiter', 'admin'), getJobApplications);
router.put('/:id/status', protect, authorize('recruiter', 'admin'), updateApplicationStatus);
router.get('/:id/resume', protect, getResumeFile);

module.exports = router;
