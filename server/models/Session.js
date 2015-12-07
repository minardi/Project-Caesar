var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Session = mongoose.model('Session', new Schema({
        userID: { type: String},
        sessionID: { type: String}
    }));

module.exports = Session;