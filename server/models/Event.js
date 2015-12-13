var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Event = mongoose.model('Event', new Schema({
        type: { type: String, required: true },
        dateTime: { type: Date, required: true },
        groupID: { type: String, required: true },
        duration: { type: Number, required: true },
        room: {type: Number, ref: 'Room'}
    }));

module.exports = Event;