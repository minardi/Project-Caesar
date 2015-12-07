var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    generateSessionID = function () {
        var date = new Date();
        return date.valueOf();
    };

router.get('/', function(req, res, next) {
    var db = mongoose.connection,
        UserModel = mongoose.model('User'),
        SessionModel = mongoose.model('Session'),
        response = {
            success: false,
            recognizedUser: {}
        };
    
    UserModel.findOne ({
        login: req.query.user,
        password: req.query.password
    }, function (err, user) {
        var newSession;
        if (err) {
            console.log(err);
        }
        if (user) {
            response.success = true;
            response.sessionID = generateSessionID();
            
            newSession = new SessionModel({
                userID: user._id,
                sessionID: response.sessionID
            });
            newSession.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
            console.log('User \'' + req.query.user + '\' (' + user.name + ' ' + user.lastName + ') connected');
        } else {
            console.log('Unregistered user \'' + req.query.user + '\' tried to connect');
        }
        res.send(JSON.stringify(response));
    }); 
});

module.exports = router;