var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    var staticRoute = '../client';
    res.sendFile('index.html', {root: staticRoute});
});

module.exports = router;
