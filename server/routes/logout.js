var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

router.get('/', function(req, res, next) {
    var db = mongoose.connection,
        SessionModel = mongoose.model('Session');
    
    SessionModel.remove({
        sessionID: req.query.sessionID
    }, function (err) {
        if (err) {
            console.log(err);
        }
        console.log('Ending session ' + req.query.sessionID);
        res.send({success: true});
    });
});

module.exports = router;