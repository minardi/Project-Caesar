var mongoose = require('./libs/mongoose');
var async = require('async');
//var User = require('./models/user').User;

async.series([
    open,
    dropDataBase,
    requireModels,
    createUsers
], function (err) {
    console.log(err);
    mongoose.disconnect();
});

    function open (callback) {
        mongoose.connection.on('open', callback);
    }

    function dropDataBase (callback) {
        var db = mongoose.connection.db;
        db.dropDatabase(callback);
    }

    function requireModels (callback) {
        require('./models/user');
        async.each(Object.keys(mongoose.models), function (modelName, callback) {
            mongoose.models[modelName].ensureIndexes(callback);
        }, callback);
    }

    function createUsers (callback) {
        var users = [
            {username: 'Admin', password: "hello123"},
            {username: 'Teacher1', password: "hello1"},
            {username: 'Teacher2', password: "hello2"},
            {username: 'User', password: "123"}
        ];
        async.each(users, function (userData, callback) {
            var user = new mongoose.models.User(userData);
            console.log(userData)
            user.save(callback);
            }, callback);
    }
