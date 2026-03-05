const router = require('express').Router();
let Candidate = require('../models/Candidate');

// GET all candidates
router.route('/').get((req, res) => {
    Candidate.find()
        .then(candidates => res.json(candidates))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST a new candidate
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const ats = Number(req.body.ats);
    const skills = Number(req.body.skills);
    const exp = Number(req.body.exp);
    const overall = Number(req.body.overall);
    const flag = req.body.flag;

    const newCandidate = new Candidate({
        name,
        ats,
        skills,
        exp,
        overall,
        flag
    });

    newCandidate.save()
        .then(() => res.json('Candidate added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
