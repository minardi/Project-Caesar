function ResetController (req, res) {
	var mongoose = require('mongoose'),
	    defaultValues = [];

	require('../models/Group');
	require('../models/Location');
	
	defaultValues = [
	    {
	    	modelName: LocationModel,
	    	values: require('./defaults/locations.json')
	    },
	    {
	    	modelName: Group,
	    	values: require('./defaults/groups.json')
	    }	    
	]


	reset(defaultValues, responde);

	function reset (defaultValues, callback) {
		defaultValues.forEach(function (collection) {
			collection['modelName'].remove({}, function () {
				collection['values'].forEach(function (value) {
					var model = new collection['modelName'](value);
    				model.save();});
                callback();   
            })
        });
    }    

	function responde (err, result) {
		res.end("DBs successfully reseted!")
		console.log("DBs successfully reseted!");		
	}

	return this;
}

module.exports = ResetController;