var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
//var Group = require('../models/Group');
var groupList = require('../reset_data/group-list.js');

router.get('/', function (req, res) {
    var staticRoute ='../client';
    res.sendFile('index.html', {root: staticRoute});
});


router.get('/group', function(req, res) {
    console.log('group');
    var Groups = mongoose.model('Group');
    
    Groups.find({}, function(err, data) {
        if (err) {
            throw err;
        }    
        console.log(data);
        res.send(data);
    });
    
});

router.get('/reset', function(req, res) {
    mongoose.connection.db.dropDatabase(function(err, result) {
        console.log('reset');
        var GroupModel = mongoose.model('Group');
            
        groupList.forEach(function (groupJSON) {
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
