var mongoose = require('mongoose');
var database = require('../config/database');

mongoose.connect(database.url, database.options);
var db = mongoose.connection;

db.on('error', function(){ console.log('connection error'); }); //TODO log error
db.once('open', function(){
    //execute scripts before open
});