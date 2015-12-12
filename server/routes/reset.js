var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    groupList = require('../reset_data/group-list.js'),
    locationList = require('../reset_data/location-list.js'),
    userList = require('../reset_data/user-list.js'),
    eventList = require('../reset_data/event-list.js');

require('../models/Location');
require('../models/User');
require('../models/Session');
require('../models/Event');

router.get('/', function(req, res) {
    mongoose.connection.db.dropDatabase(function(err, result) {
        var GroupModel = mongoose.model('Group'),
            LocationModel = mongoose.model('LocationModel'),
            UserModel = mongoose.model('User'),
            EventModel = mongoose.model('Event'),
            groupInDb, locationInDb, userInDb, eventInDb;

        groupList.forEach(function (groupJSON) {
            groupInDb = GroupModel(groupJSON);
            groupInDb.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });

        locationList.forEach(function (locationJSON) {
            locationInDb = LocationModel(locationJSON);
            locationInDb.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });

        userList.forEach(function (userJSON) {
            userInDb = UserModel(userJSON);
            userInDb.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });
        
        eventList.forEach(function (eventJSON) {
            eventInDb = EventModel(eventJSON);
            eventInDb.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });

        res.render('reset', { title: 'Reset' });
    });
});

module.exports = router;


