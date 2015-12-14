var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();

require('../models/User');

router.get('/', function(req, res, next) {
    var db = mongoose.connection,
        UserModel = mongoose.model('User'),
        response = [];
        
    UserModel.find({}, function (err, events) {
        if (err) {
            console.log(err);
        }
        events.forEach(function (item) {
            response.push({
                id: item._id,
                name: item.name,
                lastName: item.lastName,
                role: item.role,
                location: {
                    city: item.locationCity,
                    country: item.locationCountry
                }
            });
        });
        res.send(JSON.stringify(response));
    });
});

module.exports = router;