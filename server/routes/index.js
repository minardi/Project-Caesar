var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Group = require('../models/Group');

router.get('/', function (req, res) {
    var staticRoote = '../client';
    res.sendFile('index.html', {root: staticRoute});
});


router.get('/group', function(req, res) {
    var groups = mongoose.model('Group1');
    /*var groupList = [
        {name: 'Dp-085 .Net', locationCity: 'Dnipro', status: 'finished'},
        {name: 'Dp-086 UI', locationCity: 'Dnipro', status: 'current'},
        {name: 'Lv-171-iOS', locationCity: 'Lviv', status: 'current'}
    ];
    groupList.forEach(function (data) {
        var group = new groups(data);
        group.save(function(err){
            if (err) throw err;
        });
    });*/
    groups.find({}, function (err, data) {
        if(err) throw err;
        console.log(data)
        res.send(data);
    });
});
/* GET home page. */
/*router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});*/

module.exports = router;
