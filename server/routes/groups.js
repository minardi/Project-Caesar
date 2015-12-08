var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

router.get('/', function(req, res, next) {
	var db = req.db;
    var groups = db.get('groupcollection');
    groups.find({},{}, function(e, data) {
        res.send(JSON.stringify(data));
    });
});

module.exports = router;
