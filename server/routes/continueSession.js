var express = require('express'),
    router = express.Router();
    
router.get('/', function(req, res, next) {
    var response = {
        result: true,
        recognizedUser: {
            name: 'Quirinus',
            lastName: 'Quirrell',
            role: 'Teacher',
            city: 'London',
            country: 'United Kingdom',
            sessionID: req.query.id
        }
    };
    res.send(JSON.stringify(response));
});

module.exports = router;