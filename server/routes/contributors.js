var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();

    router.get('/', function (req, res) {
        var Contributor = mongoose.model('Contributor');
        Contributor.find({}, function (err, data) {
            if (err) {
                console.log(err);
            }
            console.log(data);
            res.send(data);

        });
    });

module.exports = router;