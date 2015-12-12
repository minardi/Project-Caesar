var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Room = mongoose.model('Room', new Schema({
    	_id: Number,
    	name: String,
    	office: { type: Number, ref: 'Office' }
    }));

module.exports = Room;