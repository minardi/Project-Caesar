var express = require('express'),
    routes = require('./routes/index'),
    groups = require('./routes/groups'),
    login = require('./routes/login'),
    continueSession = require('./routes/continueSession'),
    app = express();
    
app.use('/', routes);
app.use('/group', groups);
app.use('/login', login);
app.use('/continueSession', continueSession);

module.exports = app;