var express = require('express'),
    router = express.Router();

router.get('/', function(req, res, next) {
    //console.log(req.query.user);
    //console.log(req.query.password);
    var response = {
        result: false
    };
    if ((req.query.user=='me') && (req.query.password=='bcedc450f8481e89b1445069acdc3dd9')) {
        response.result = true;
    }
    res.send(JSON.stringify(response));
});

module.exports = router;