const express = require('express');
const router = express.Router();
const {
    createJob,
    getJobs,
    getJobById,
    getRecruiterJobs
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post('/create', protect, authorize('recruiter', 'admin'), createJob);
router.get('/', getJobs);
router.get('/recruiter', protect, authorize('recruiter', 'admin'), getRecruiterJobs);
router.get('/:id', getJobById);

module.exports = router;
