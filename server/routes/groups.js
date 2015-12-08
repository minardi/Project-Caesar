var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();

    require('../models/Location');

router.get('/', function(req, res, next) {
    var Groups = mongoose.model('Group'),
        options = {};

    if (req.query['location']) {
        options['location'] = req.query['location'];
    };

    Groups.find(options, function(err, data) {
        if (err) {throw err};

        res.send(data);
    });
});

router.get('/:location', function (req, res, next) {
    var groups = mongoose.model('Group');

    console.log('server location: ', req.params.location);
    groups.find({location: req.params.location}, function(err, data) {
        res.send(data);
    });
    console.log('Data send');
});

module.exports = router;