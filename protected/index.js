let express = require('express'),
    router = express.Router(),
    service = require('./service'),
    path = require('path');

router.post('/add-user-address', (req, res, next) => {
    service.addUserAddress(req.body, (data) => {
        res.send(data);
    }).catch(err => {
        console.error('Error in addUserAddress, with reqData - ', req.body, err);
        return next(err);
    });
});

router.post('/create-image-thumbnail', (req, res, next) => {
    service.createImageThumbnail(req.body, async (data) => {
        const filePath = path.join(__dirname, '../assets/' + data.data.fileName);
        (data.success) ? res.sendFile(filePath) : res.send(data);
    }).catch(err => {
        console.error('Error in createImageThumbnail, with reqData - ', req.body, err);
        return next(err);
    });
});

router.post('/add-json-path', (req, res, next) => {
    service.addJsonPatch(req.body, (data) => {
        res.send(data);
    }).catch(err => {
        console.error('Error in addJsonPatch, with reqData - ', req.body, err);
        return next(err);
    });
});

module.exports = router;