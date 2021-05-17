let express = require('express'),
    router = express.Router(),
    service = require('./service');

router.post('/login', (req, res, next) => {
    service.authenticate(req.body, (data) => {
        res.send(data);
    }).catch(err => {
        console.error('Error in authenticate, with reqData - ', req.body, err);
        return next(err);
    });
});

module.exports = router;