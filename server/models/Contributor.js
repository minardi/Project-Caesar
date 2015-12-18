var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Contributor = mongoose.model('Contributor', new Schema({
        _id: Number,
        name: String,
        lastName: String,
        group: String,
        team: String
    }));

module.exports = Contributor;