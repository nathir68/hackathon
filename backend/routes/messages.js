const router = require('express').Router();
let Message = require('../models/Message');

router.route('/').get((req, res) => {
    Message.find().sort({ createdAt: 1 })
        .then(msgs => res.json(msgs))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newMsg = new Message(req.body);
    newMsg.save()
        .then(() => res.json('Message sent!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
