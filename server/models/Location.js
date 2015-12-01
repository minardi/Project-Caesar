var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

LocationModel = mongoose.model('LocationModel', new Schema({
    name: { type: String, required: true }
}));

function save(data, callback, error){
    var location = new LocationModel(data);
    location.save(function(err){
        callback(err, user);
    });
}

function find(conditions, callback){
    return LocationModel.find(conditions, function(err, docs){
        callback(err, docs);
    });
}

function update(conditions, updateObj, callback){
    LocationModel.update(conditions, updateObj, function(err, docs){
        callback(err, docs);
    });
}

function remove(conditions, callback){
    LocationModel.remove(conditions,function(err){
        callback(err);
    });
}

module.exports = {
    update: update,
    save: save,
    find: find,
    remove: remove
};