var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var groupList = require('../reset_data/group-list.js');
var locationList = require('../reset_data/location-list.js');

require('../models/Location');

router.get('/', function (req, res) {
    var staticRoute = '../client';
    if (req.cookies.loggedIn) {
        res.sendFile('home.html', {root: staticRoute});
    } else {
        res.sendFile('login.html', {root: staticRoute});
    }
    
});


router.get('/groups', function(req, res, next) {
    var Groups = mongoose.model('Group'), 
		options = {};
	if (req.query['location']) {
		options['location'] = req.query['location'];
	}
    
    Groups.find(options, function(err, data) {
        if (err) {throw err};   

        res.send(data);
    });
});

router.delete('/group/:id', function (req, res, next) {
    var Group = mongoose.model('Group');
    Group.remove({_id: req.params.id}, function(err) {
      if (err) {throw err};
    });
    res.json({ status: 'success' });
});

router.get('/dbLocations', function(req, res) {
    var locations = mongoose.model('LocationModel');
    console.log('Try to find locations...');
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

        res.render('reset', { title: 'Reset' });
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
