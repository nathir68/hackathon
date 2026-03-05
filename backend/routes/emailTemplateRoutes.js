const express = require('express');
const router = express.Router();
const { getTemplates, createTemplate, updateTemplate, deleteTemplate } = require('../controllers/emailTemplateController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// All routes require admin
router.use(protect, authorize('admin'));

router.get('/', getTemplates);
router.post('/', createTemplate);
router.put('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

module.exports = router;
