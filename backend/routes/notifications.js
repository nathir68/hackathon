const router = require('express').Router();
let Notification = require('../models/Notification');

router.route('/').get((req, res) => {
    Notification.find().sort({ createdAt: -1 })
        .then(notifs => res.json(notifs))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newNotif = new Notification(req.body);
    newNotif.save()
        .then(() => res.json('Notification added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
    Notification.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json('Notification updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
