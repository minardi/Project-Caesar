var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    userAcess = require('./userAcess'),
    Group = mongoose.model('Group');

router.get('/', function(req, res, next) {
    var db = req.db;
    var groups = db.get('groupcollection');
    groups.find({},{}, function(e, data) {
        res.send(JSON.stringify(data));
    });
});

router.post('/', function (req, res, next) {
    userAcess.userAcess(req, function(result){
        if(result) {
            groupInit();
        } else {
            console.log('Post Forbiden');
        };
    });

    function groupInit (argument) {
        var Group = mongoose.model('Group'),
            newGroup = new Group({
                name: req.body.name,
                direction: req.body.direction,
                location: req.body.location,
                startDate: req.body.startDate,
                finishDate: req.body.finishDate,
                status: req.body.status,
                teachers: req.body.teachers,
                experts: req.body.experts
            });

        newGroup.save(function(err, data) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send(data);
            }
        });
    };  
});

router.put('/:id', function (req, res, next) {
    userAcess.userAcess(req, function(result){
        if(result) {
            Group.findOneAndUpdate({_id:req.params.id}, req.body, function (err) {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    res.json(req.body);
                }
            });
        } else {
            console.log('Update Forbiden');
        };
    });
});

router.delete('/:id', function (req, res, next) {
    userAcess.userAcess(req, function(result){
        if(result) {
            Group.remove({_id: req.params.id}, function(err) {
                if (err) {throw err};
            });
            res.json({status: 'success'});
        } else {
            console.log('Delete Forbiden');
        };
    });
});

module.exports = router;