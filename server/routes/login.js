var express = require('express'),
    router = express.Router();

router.get('/', function(req, res, next) {
    console.log('gotcha');
    res.send(JSON.stringify({login: 'yay'}));
});

module.exports = router;