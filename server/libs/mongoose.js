var mongoose = require('mongoose');
var database = require('../config/database');


mongoose.connect(database.url);

// var Schema = mongoose.Schema;

// var groupSchema = new Schema({
	// title: String,
	// startDate: String,
	// finishDate: String,
	// location: String,
	// direction: String,
	// status: String
// });

// var GroupMg =  mongoose.model('Group', groupSchema);