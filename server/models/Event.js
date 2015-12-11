var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Event = mongoose.model('Event', new Schema({
        type: { type: String, required: true },
        dateTime: { type: Date, required: true },
        groupID: { type: String, required: true },
        duration: { type: Number, required: true }
    }));

module.exports = Event;