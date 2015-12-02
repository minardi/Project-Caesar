var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
//var Group = require('../models/Group');
var GroupMg;

require('../models/Location');

router.get('/', function (req, res) {
    var staticRoute ='../client';
    res.sendFile('index.html', {root: staticRoute});
});


router.get('/group', function(req, res) {
    var GroupModel = mongoose.model('Group');
    
    GroupModel.find({}, function(err, data) {
        if (err) {
            throw err;
        }    
        console.log(data);
        res.send(data);
    });
    
});

router.get('/dbLocations', function(req, res) {
    var locations = mongoose.model('LocationModel');
    locations.find({}, function (err, data) {
        if(err) throw err;
        console.log(data)
        res.send(data);
    });
});


router.get('/resetdb', function(req, res, next) {     
    var resetController = new require('../reset/resetController')(req, res);
});

router.get('/reset', function(req, res) {
    mongoose.connection.db.dropDatabase(function(err, result) {
        console.log('reset');
        var GroupModel = mongoose.model('Group');
        
        var GroupList = [
            {
                title: 'Ssdjfk',
                startDate: '01.01.2015',
                finishDate: '03.04.2016',
                location: 'Dp',
                direction: 'UI',
                status: 'In Progress'
            },
            {
                title: 'Tsdfjk',
                startDate: '02.08.2015',
                finishDate: '06.09.2016',
                location: 'Lv',
                direction: 'DevOps',
                status: 'Finished'
            }];
            
            GroupList.forEach(function (groupJSON) {
                var groupInDb = GroupModel(groupJSON);
                groupInDb.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                    
                });
            });

        res.render('index', { title: 'Express' });
    });
});

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express' });
// });

// router.get('/helloworld', function(req, res) {
//     res.render('helloworld', { title: 'Hello, World!' });
// });

module.exports = router;
