var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = mongoose.model('User', new Schema({
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        role: { type: String, required: true },
        locationCity: { type: String, required: true },
        locationCountry: { type: String, required: true },
        login: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    }));

module.exports = User;