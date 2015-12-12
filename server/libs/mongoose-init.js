var mongoose = require('mongoose');
var database = require('../config/database');
var Schema = mongoose.Schema;

mongoose.connect(database.url);

