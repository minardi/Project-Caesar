var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router(),
    groupList = require('../reset_data/group-list.js'),
    locationList = require('../reset_data/location-list.js'),
    userList = require('../reset_data/user-list.js');

require('../models/Location');
require('../models/User');
require('../models/Session');

router.get('/', function (req, res) {
    var staticRoute = '../client';
    if (req.cookies.loggedIn) {
        res.sendFile('home.html', {root: staticRoute});
    } else {
        res.sendFile('login.html', {root: staticRoute});
    }
});

router.get('/resetdb', function(req, res, next) {
    var resetController = new require('../reset/resetController')(req, res);
});

router.get('/reset', function(req, res) {
    mongoose.connection.db.dropDatabase(function(err, result) {
        var GroupModel = mongoose.model('Group'),
            LocationModel = mongoose.model('LocationModel'),
            UserModel = mongoose.model('User'),
            groupInDb, locationInDb, userInDb;
            
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
            var userInDb = UserModel(userJSON);
            userInDb.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });

        res.render('reset', { title: 'Reset' });
    });
});

router.get('/users', function (req, res, next) {
    var users = mongoose.model('User');
        
    users.find({}, function(err, data) {
       res.send(data); 
    });
});

router.delete('/user/:id', function (req, res, next) {
    var User = mongoose.model('User');
    User.remove({_id: req.params.id}, function(err) {
      if (err) {throw err};
    });
    res.json({ status: 'success' });
});

module.exports = router;
