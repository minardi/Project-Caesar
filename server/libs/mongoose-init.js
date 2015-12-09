var mongoose = require('mongoose');
var database = require('../config/database');


mongoose.connect(database.url);

var Schema = mongoose.Schema;

var groupSchema = new Schema({
    name: String,
    direction: String,
    location: String,
    startDate: Date,
    finishDate: Date,
    teachers: [String],
    experts: [String],
    status: String
});

var GroupMg =  mongoose.model('Group', groupSchema);