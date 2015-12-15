var mongoose = require('mongoose'),
    async = require('async');

var userAcess = function (req, cb) {
    var SessionModel = mongoose.model('Session'),
        UserModel = mongoose.model('User');

    SessionModel.findOne ({
        sessionID: req.cookies.sessionID
    }, function (err, session) {
        if (session) {
            UserModel.findOne ({
                _id: session.userID
            }, function (err, user) {
                if (user.role === 'Coordinator' || user.role === 'Administrator') {
                    cb(true);
                } else {
                    cb(false);
                };
            });
        } else {
            cb(false);
        };
    });

    return false;   
}

module.exports.userAcess = userAcess;
