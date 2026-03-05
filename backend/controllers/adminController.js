const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/user/:id
// @access  Private (Admin)
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Cleanup reference data
        await Job.deleteMany({ recruiterId: req.params.id });
        await Application.deleteMany({ candidateId: req.params.id });

        await user.deleteOne();
        res.status(200).json({ message: 'User removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all jobs (for admin view)
// @route   GET /api/admin/jobs
// @access  Private (Admin)
const getAdminJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('recruiterId', 'name email company');
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get basic statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Application.countDocuments();

        res.status(200).json({
            users: totalUsers,
            jobs: totalJobs,
            applications: totalApplications
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    deleteUser,
    getAdminJobs,
    getStats
};
