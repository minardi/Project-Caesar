var express = require('express'),
    group = require('./group'),
    groups = require('./groups'),
    location = require('./location'),
    events = require('./events'),
    _event = require('./event'),
    router = express.Router();


router.use('/group', group);
router.use('/groups', groups);
router.use('/dbLocations', location);
router.use('/events', events);
router.use('/event', _event);
//console.log(_event);
module.exports = router;