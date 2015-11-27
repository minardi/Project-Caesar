var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    var staticRoote = '../client';
    res.sendFile('index.html', {root: staticRoute});
});

/* GET home page. */
/*router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});*/

module.exports = router;
