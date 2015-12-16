var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();

router.get('/', function (req, res) {
	var Office = mongoose.model('Office');
	Office.find({}, function (err, data) {
        if (err) {
        	console.log(err);
        }
        res.send(data);

	});
});

module.exports = router;