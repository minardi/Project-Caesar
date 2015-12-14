var express = require('express'),
    routes = require('./routes/index'),
    reset = require('./routes/reset'),
    login = require('./routes/login'),
    logout = require('./routes/logout'),
    continueSession = require('./routes/continueSession'),
    rest = require('./routes/rest'),
    openPage = require('./routes/openPage'),
    app = express();
    
app.use('/', routes);
app.use('/reset', reset);
app.use('/rest', rest);
app.use('/login', login);
app.use('/logout', logout);
app.use('/continueSession', continueSession);
app.use('/open', openPage);
app.use('*', function(req, res){
    console.log(req.baseUrl);
    var staticRoute = '../client';
    res.sendFile('home.html', {root: staticRoute});
});


module.exports = app;