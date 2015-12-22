var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();
    
router.get('/', function(req, res, next) {
    var db = mongoose.connection,
        UserModel = mongoose.model('User'),
        SessionModel = mongoose.model('Session'),
        response = {
            success: false,
            recognizedUser: {}
        };

    req.baseUrl = '/';
    
    SessionModel.findOne ({
        sessionID: req.query.id
    }, function (err, session) {
        if (session) {
            UserModel.findOne ({
                _id: session.userID
            }, function (err, user) {
                if (user) {
                    response.success = true;
                    response.recognizedUser = {
                        name: user.name,
                        lastName: user.lastName,
                        role: user.role,
                        city: user.locationCity,
                        country: user.locationCountry,
                        sessionID: session.sessionID
                    };
                    console.log('Resuming session ' + session.sessionID);
                }
                res.send(JSON.stringify(response));
                
            });
        } else {
            console.log('Attempt to resume closed session (' + req.query.id + ')');
            res.send(JSON.stringify(response));
        } 
    });  
});

module.exports = router;