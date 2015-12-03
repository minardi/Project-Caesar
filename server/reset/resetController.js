function ResetController (req, res) {
	var mongoose = require('mongoose'),
	    defaultValues = [],
        GroupModel = mongoose.model('Group'),
        LocationModel = mongoose.model('LocationModel');

	defaultValues = [
	    {
	    	modelName: LocationModel,
	    	values: require('../reset_data/location-list.js')
	    },
	    {
	    	modelName: GroupModel,
	    	values: require('../reset_data/group-list.js')
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