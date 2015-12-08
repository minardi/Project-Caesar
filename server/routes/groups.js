var express = require('express'),
    router = express.Router();

router.get('/', function(req, res, next) {
	var db = req.db;
    var groups = db.get('groupcollection');
    groups.find({},{}, function(e, data) {
        res.send(JSON.stringify(data));
    });
});

router.get('/groups', function(req, res, next) {
    var Groups = mongoose.model('Group'), 
        options = {};

    if (req.query['location']) {
        options['location'] = req.query['location'];
    };
    
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
    res.json({status: 'success'});
});

router.post('/group', function (req, res, next) {
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
});

router.put('/group/:id', function (req, res, next) {
    var Group = mongoose.model('Group');
    console.log(req.body);
    Group.findOneAndUpdate({_id:req.params.id}, req.body, function (err) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(req.body);
        }
    });
});

module.exports = router;
