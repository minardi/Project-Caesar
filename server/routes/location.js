var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

var locations = mongoose.model('LocationModel');

router.get('/', function(req, res) {
    var locations = mongoose.model('LocationModel');
    console.log('Try to find locations...');
    locations.find({}, function (err, data) {
        if(err) throw err;
        res.send(data);
    });
});

router.post('/', function (req, res, next) {
    var Location = mongoose.model('LocationModel'),
        newLocation = new Location({
            city: req.body.city,
            country: req.body.country
        });

    newLocation.save(function(err, data) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

router.put('/:id', function (req, res, next) {
    var Location = mongoose.model('LocationModel');
    Location.findOneAndUpdate({_id:req.params.id}, req.body, function (err) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(req.body);
        }
    });
});

router.delete('/:id', function (req, res, next) {
    var Location = mongoose.model('LocationModel');
    Location.remove({_id: req.params.id}, function(err) {
        if (err) {throw err};
    });
    res.json({ status: 'success' });
});

module.exports = router;