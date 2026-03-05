const SystemSetting = require('../models/SystemSetting');

// @desc    Get all settings
// @route   GET /api/admin/settings
const getSettings = async (req, res) => {
    try {
        const settings = await SystemSetting.find();
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update setting
// @route   POST /api/admin/settings
const updateSetting = async (req, res) => {
    try {
        const { key, value, group, description } = req.body;

        let setting = await SystemSetting.findOne({ key });
        if (setting) {
            setting.value = value;
            if (group) setting.group = group;
            if (description) setting.description = description;
            await setting.save();
        } else {
            setting = await SystemSetting.create({ key, value, group, description });
        }
        res.status(200).json(setting);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getSettings, updateSetting };
