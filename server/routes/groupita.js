var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();

router.get('/', function (req, res) {
    var GroupITA = mongoose.model('GroupITA');
    GroupITA.find({}, function (err, data) {
        if (err) {
            console.log(err);
        }
        res.send(data);

    });
});

module.exports = router;