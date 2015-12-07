var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Session = mongoose.model('Session', new Schema({
        userID: { type: String, required: true},
        sessionID: { type: String, required: true}
    }));

module.exports = Session;