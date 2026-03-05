const router = require('express').Router();
let ActivityLog = require('../models/ActivityLog');

router.route('/').get((req, res) => {
    ActivityLog.find().sort({ createdAt: -1 })
        .then(logs => res.json(logs))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newLog = new ActivityLog(req.body);
    newLog.save()
        .then(() => res.json('Log added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
