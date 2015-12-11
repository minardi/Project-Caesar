var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();

require('../models/Event');

router.get('/', function(req, res, next) {
    var db = mongoose.connection,
        EventModel = mongoose.model('Event');
        
    EventModel.find({}, function (err, events) {
        if (err) {
            console.log(err);
        }
        res.send(JSON.stringify(events));
    });
});

module.exports = router;