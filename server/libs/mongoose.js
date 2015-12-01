var mongoose = require('mongoose');
var database = require('../config/database');

mongoose.connect(database.url, database.options);
var db = mongoose.connection;
console.log('data load')
db.on('error', function(){
    console.log('connection error');
});
db.once('open', function(){
    console.log('data load')
    //execute scripts before open
});