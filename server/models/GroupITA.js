var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    GroupITA = mongoose.model('GroupITA', new Schema({
        _id: String,
        group: String,
        team: String
    }));

module.exports = GroupITA;