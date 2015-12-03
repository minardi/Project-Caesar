var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var groupList = require('../reset_data/group-list.js');
var locationList = require('../reset_data/location-list.js');

require('../models/Location');

router.get('/', function (req, res) {
    var staticRoute ='../client';
    res.sendFile('index.html', {root: staticRoute});
});


router.get('/group', function(req, res) {
    var Groups = mongoose.model('Group');
    
    Groups.find({}, function(err, data) {
        if (err) {
            throw err;
        }    
        res.send(data);
    });
    
});

router.get('/dbLocations', function(req, res) {
    var locations = mongoose.model('LocationModel');
    console.log('Try to find locations..');
    locations.find({}, function (err, data) {
        if(err) throw err;
        res.send(data);
    });
});

router.get('/resetdb', function(req, res, next) {     
    var resetController = new require('../reset/resetController')(req, res);
});

router.get('/reset', function(req, res) {
    mongoose.connection.db.dropDatabase(function(err, result) {
        var GroupModel = mongoose.model('Group'),
            LocationModel = mongoose.model('LocationModel');;
            
        groupList.forEach(function (groupJSON) {
            var groupInDb = GroupModel(groupJSON);
            groupInDb.save(function (err) {
                if (err) {
                    console.log(err);
                }
                
            });
        });

        locationList.forEach(function (locationJSON) {
            var locationInDb = LocationModel(locationJSON);
            locationInDb.save(function (err) {
                if (err) {
                    console.log(err);
                }
                
            });
        });

        res.render('index', { title: 'Express' });
    });
});

router.get('/groups/:location', function (req, res, next) {
    var groups = mongoose.model('Group');
    
	console.log('server location: ', req.params.location);
    
    groups.find({location: req.params.location}, function(err, data) {
       res.send(data); 
    });
    console.log('Data send');
	//next();
});

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express' });
// });

// router.get('/helloworld', function(req, res) {
//     res.render('helloworld', { title: 'Hello, World!' });
// });

module.exports = router;
