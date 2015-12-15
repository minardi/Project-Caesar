var express = require('express'),
    routes = require('./routes/index'),
    reset = require('./routes/reset'),
    login = require('./routes/login'),
    logout = require('./routes/logout'),
    continueSession = require('./routes/continueSession'),
    rest = require('./routes/rest'),
    openPage = require('./routes/openPage'),
    userAcess = require('./routes/userAcess')
    app = express();

app.use('/', routes);
app.use('/reset', reset);
app.use('/rest', rest);
app.use('/login', login);
app.use('/logout', logout);
app.use('/continueSession', continueSession);
app.use('/open', openPage);
app.use('*', function(req, res){
    var staticRoute = '../client';
    res.sendFile('home.html', {root: staticRoute});
});

routes.post('*', function (req, res, next) {
    userAcess.userAcess(req, function(result){
        if(result) {
            next();
        } else {
            console.log('Post Forbiden');
        };
    });
});

routes.post('*', function (req, res, next) {
    userAcess.userAcess(req, function(result){
        if(result) {
            next();
        } else {
            console.log('Update Forbiden');
        };
    });
});

routes.delete('*', function (req, res, next) {
    userAcess.userAcess(req, function(result){
        if(result) {
            next();
        } else {
            console.log('Delete Forbiden');
        };
    });
});

module.exports = app;