const JobAlert = require('../models/JobAlert');
const User = require('../models/User');

// @desc    Get user's job alerts
// @route   GET /api/seeker/job-alerts
// @access  Private (Seeker)
const getJobAlerts = async (req, res) => {
    try {
        const alerts = await JobAlert.find({ seekerId: req.user.id });
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a job alert
// @route   POST /api/seeker/job-alerts
// @access  Private (Seeker)
const createJobAlert = async (req, res) => {
    try {
        const { keywords, location, type, frequency } = req.body;
        const alert = await JobAlert.create({
            seekerId: req.user.id,
            keywords,
            location,
            type,
            frequency
        });
        res.status(201).json(alert);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a job alert
// @route   DELETE /api/seeker/job-alerts/:id
// @access  Private (Seeker)
const deleteJobAlert = async (req, res) => {
    try {
        const alert = await JobAlert.findOneAndDelete({ _id: req.params.id, seekerId: req.user.id });
        if (!alert) return res.status(404).json({ message: 'Alert not found' });
        res.status(200).json({ message: 'Alert deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle alert status (active/inactive)
// @route   PUT /api/seeker/job-alerts/:id
// @access  Private (Seeker)
const toggleJobAlert = async (req, res) => {
    try {
        const alert = await JobAlert.findOne({ _id: req.params.id, seekerId: req.user.id });
        if (!alert) return res.status(404).json({ message: 'Alert not found' });

        alert.active = !alert.active;
        await alert.save();
        res.status(200).json(alert);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Seeker Profile
// @route   GET /api/seeker/profile
// @access  Private (Seeker)
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Seeker Profile
// @route   PUT /api/seeker/profile
// @access  Private (Seeker)
const updateProfile = async (req, res) => {
    try {
        const { name, email, phone, city, country, linkedinUrl, portfolioUrl, githubUrl, bio } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.linkedinUrl = linkedinUrl !== undefined ? linkedinUrl : user.linkedinUrl;
        user.portfolioUrl = portfolioUrl !== undefined ? portfolioUrl : user.portfolioUrl;
        user.githubUrl = githubUrl !== undefined ? githubUrl : user.githubUrl;

        // If you had a SeekerProfile model, other fields like phone, city, bio would go there.
        // For now, since they are being updated in PERSONAL DETAILS.js, we should store them in the user model if they exist or at least parse them.

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getJobAlerts,
    createJobAlert,
    deleteJobAlert,
    toggleJobAlert,
    getProfile,
    updateProfile
};
