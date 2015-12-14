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

router.post('/user', function (req, res, next) {
    var User = mongoose.model('User'),
        newUser = new User({
            name: req.body.name,
            lastName: req.body.lastName,
            role: req.body.role,
            locationCity: req.body.locationCity,
            locationCountry: req.body.locationCountry,
            login: req.body.login,
            password: req.body.password
        });

    newUser.save(function(err, data) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

router.put('/user/:id', function (req, res, next) {
    var User = mongoose.model('User');
    User.findOneAndUpdate({_id:req.params.id}, req.body, function (err) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(req.body);
        }
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
