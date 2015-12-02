var mongoose = require('../libs/mongoose-init'),
    Schema = mongoose.Schema;

var User = mongoose.model('User', new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now}
}));

function save(data, callback, error){
    var user = new User(data);
    user.save(function(err){
        callback(err, user);
    });
}

function find(conditions, callback){
    return User.find(conditions, function(err, docs){
        callback(err, docs);
    });
}

function update(conditions, updateObj, callback){
    User.update(conditions, updateObj, function(err, docs){
        callback(err, docs);
    });
}

function remove(conditions, callback){
    User.remove(conditions,function(err){
        callback(err);
    });
}

module.exports = {
    update: update,
    save: save,
    find: find,
    remove: remove
};