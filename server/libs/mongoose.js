var mongoose = require('mongoose');
var config = require('../config/config');
mongoose.connect(config.mongoose.uri, config.mongoose.options);

module.exports = mongoose;