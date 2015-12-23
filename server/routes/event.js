var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

router.post('/', function (req, res, next) {
    var Event = mongoose.model('Event'),
        newEvent = new Event(req.body);

    newEvent.save(function(err, data) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(data);
            res.send(data);
        }

    });
});

router.delete('/:id', function (req, res, next) {
    var Event = mongoose.model('Event');
    Event.remove({_id: req.params.id}, function(err) {
        if (err) {
            throw err
        }
    });
    res.json({status: 'success'});
});


module.exports = router;
