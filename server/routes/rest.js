var express = require('express'),
    group = require('./group'),
    groups = require('./groups'),
    location = require('./location'),
    events = require('./events'),
    router = express.Router();


router.use('/group', group);
router.use('/groups', groups);
router.use('/dbLocations', location);
router.use('/events', events);

module.exports = router;