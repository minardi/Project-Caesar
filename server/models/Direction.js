var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Direction = mongoose.model('Direction', new Schema({
            directionName: String,
            technologies: String
    }));

module.exports = Direction;