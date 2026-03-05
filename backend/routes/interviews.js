const router = require('express').Router();
let Interview = require('../models/Interview');

router.route('/').get((req, res) => {
    Interview.find().sort({ createdAt: -1 })
        .then(interviews => res.json(interviews))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newInterview = new Interview(req.body);
    newInterview.save()
        .then(() => res.json('Interview added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
    Interview.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json('Interview updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Interview.findByIdAndDelete(req.params.id)
        .then(() => res.json('Interview deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
