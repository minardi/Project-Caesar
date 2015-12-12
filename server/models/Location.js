var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

LocationModel = mongoose.model('LocationModel', new Schema({
	_id: Number,
    city: { type: String, required: true },
    country: { type: String, required: true }
}));
