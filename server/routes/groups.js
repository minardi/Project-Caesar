var express = require('express');
var router = express.Router();

var groups = [
    {name: 'Dp-085 .Net', locationCity: 'Dnipro', status: 'finished'},
    {name: 'Dp-086 UI', locationCity: 'Dnipro', status: 'current'},
    {name: 'Lv-171-iOS', locationCity: 'Lviv', status: 'current'}
];
router.get('/', function(req, res, next) {
    res.send(JSON.stringify(groups));
});
module.exports = router;
