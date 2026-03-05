const EmailTemplate = require('../models/EmailTemplate');

// @desc    Get all email templates
// @route   GET /api/email-templates
const getTemplates = async (req, res) => {
    try {
        const templates = await EmailTemplate.find().sort({ createdAt: -1 });
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new template
// @route   POST /api/email-templates
const createTemplate = async (req, res) => {
    try {
        const template = await EmailTemplate.create(req.body);
        res.status(201).json(template);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a template
// @route   PUT /api/email-templates/:id
const updateTemplate = async (req, res) => {
    try {
        const template = await EmailTemplate.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!template) return res.status(404).json({ message: 'Template not found' });
        res.status(200).json(template);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a template
// @route   DELETE /api/email-templates/:id
const deleteTemplate = async (req, res) => {
    try {
        const template = await EmailTemplate.findByIdAndDelete(req.params.id);
        if (!template) return res.status(404).json({ message: 'Template not found' });
        res.status(200).json({ message: 'Template deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate
};
