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

router.get('/dbLocations', function(req, res) {
    var locations = mongoose.model('LocationModel');
    console.log('Try to find locations...');
    locations.find({}, function (err, data) {
        if(err) throw err;
        res.send(data);
    });
});

router.post('/dbLocations', function (req, res, next) {
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

router.put('/dbLocations/:id', function (req, res, next) {
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

router.delete('/dbLocations/:id', function (req, res, next) {
    var Location = mongoose.model('LocationModel');
    Location.remove({_id: req.params.id}, function(err) {
      if (err) {throw err};
    });
    res.json({ status: 'success' });
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
