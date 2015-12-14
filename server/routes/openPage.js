var express = require('express'),
    router = express.Router();
/*
router.get('/', function (req, res) {
    var staticRoute = '../client/open';
    res.sendFile('page.html', {root: staticRoute});
});
*/
router.get('/*', function (req, res) {
    var staticRoute = '../client/open';
    res.sendFile('page.html', {root: staticRoute});
});

module.exports = router;
