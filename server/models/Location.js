var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

LocationModel = mongoose.model('LocationModel', new Schema({
    name: { type: String, required: true }
}));
