const JobAlert = require('../models/JobAlert');

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

module.exports = {
    getJobAlerts,
    createJobAlert,
    deleteJobAlert,
    toggleJobAlert
};
