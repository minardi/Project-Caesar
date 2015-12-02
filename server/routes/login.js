var express = require('express'),
    router = express.Router();

router.get('/', function(req, res, next) {
    res.send(JSON.stringify({login: 'yay'}));
});

module.exports = router;