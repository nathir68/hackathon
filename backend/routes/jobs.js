const router = require('express').Router();
let Job = require('../models/Job');

router.route('/').get((req, res) => {
    Job.find().sort({ createdAt: -1 })
        .then(jobs => res.json(jobs))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newJob = new Job(req.body);
    newJob.save()
        .then(() => res.json('Job added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Job.findById(req.params.id)
        .then(job => res.json(job))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
    Job.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json('Job updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Job.findByIdAndDelete(req.params.id)
        .then(() => res.json('Job deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
