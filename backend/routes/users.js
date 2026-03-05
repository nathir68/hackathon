const router = require('express').Router();
let User = require('../models/User');

// GET all users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST a new user
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const email = req.body.email;
    const reason = req.body.reason;
    const status = req.body.status;
    const since = req.body.since;

    const newUser = new User({
        name,
        type,
        email,
        reason,
        status,
        since
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
