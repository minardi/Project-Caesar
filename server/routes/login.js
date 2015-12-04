var express = require('express'),
    router = express.Router(),
    generateSessionID = function () {
        var date = new Date();
        return date.valueOf();
    };
    

router.get('/', function(req, res, next) {
    var response = {
        result: false,
        recognizedUser: {}
    };
    if ((req.query.user=='me') && (req.query.password=='bcedc450f8481e89b1445069acdc3dd9')) {
        response.result = true;
        response.sessionID = generateSessionID();
    }
    res.send(JSON.stringify(response));
});

module.exports = router;