var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();

router.get('/', function (req, res) {
    var staticRoute = '../client';
    if (req.cookies.loggedIn) {
        res.sendFile('home.html', {root: staticRoute});
    } else {
        res.sendFile('login.html', {root: staticRoute});
    }
});

router.get('/users', function (req, res, next) {
    var users = mongoose.model('User');
        
    users.find({}, function(err, data) {
       res.send(data); 
    });
});

router.delete('/user/:id', function (req, res, next) {
    var User = mongoose.model('User');
    User.remove({_id: req.params.id}, function(err) {
      if (err) {throw err};
    });
    res.json({ status: 'success' });
});



module.exports = router;
