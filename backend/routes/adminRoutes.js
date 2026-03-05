const express = require('express');
const router = express.Router();
const {
    getUsers,
    deleteUser,
    getAdminJobs,
    getStats
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// All routes are protected and restricted to admin
router.use(protect);
router.use(authorize('admin'));

router.get('/users', getUsers);
router.delete('/user/:id', deleteUser);
router.get('/jobs', getAdminJobs);
router.get('/stats', getStats);

module.exports = router;
