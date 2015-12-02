var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
//var Group = require('../models/Group');
var GroupMg;

router.get('/', function (req, res) {
    var staticRoute = '../client';
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

module.exports = router;
