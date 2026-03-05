const router = require('express').Router();
let Application = require('../models/Application');

router.route('/').get((req, res) => {
    Application.find().sort({ createdAt: -1 })
        .then(apps => res.json(apps))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newApp = new Application(req.body);
    newApp.save()
        .then(() => res.json('Application added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
    Application.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json('Application updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Application.findByIdAndDelete(req.params.id)
        .then(() => res.json('Application deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
