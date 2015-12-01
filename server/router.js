var express = require('express');
    routes = require('./routes/index'),
    groups = require('./routes/groups'),
    login = require('./routes/login'),
    app = express();
    
app.use('/', routes);
app.use('/group', groups);
app.use('/login', login);

module.exports = app;