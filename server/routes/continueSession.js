var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();
    
router.get('/', function(req, res, next) {
    var db = mongoose.connection,
        UserModel = mongoose.model('User'),
        SessionModel = mongoose.model('Session'),
        response = {
            result: false,
            recognizedUser: {}
        };
    
    SessionModel.find({}, function (s) {
        console.log(s);
    });
    
    SessionModel.findOne({
        sessionID: req.query.id
    }, function (session) {
        if (session) {
            UserModel.findOne({
                _id: session.userID
            }, function (user) {
                response.result = true;
                response.recognizedUser = user;
                console.log('Resuming session ' + session.sessionID);
            });
        } else {
            console.log('Attempt to resume closed session (' + req.query.id + ')');
        }
        
        res.send(JSON.stringify(response));
    });  
});

module.exports = router;