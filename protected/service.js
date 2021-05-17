const util = require('../common/util');
const dao = require('./dao');
const _ = require('lodash');
const jsonpatch = require('json-patch');
const fs = require('fs');
const sharp = require('sharp');
const fetch = require('node-fetch');

async function addUserAddress(reqData, callback) {
    const username = reqData.username;
    const address = reqData.address;
    if (!address || !address.trim()) {
        result = 'Invalid input';
        callback(util.errorResponse(result));
        return;
    }
    const res = await dao.addUserAddress(username, address);
    callback(util.successResponse('Data added successfully'));
}

async function addJsonPatch(reqData, callback) {
    let originalDoc = reqData.original_doc;
    let patchDoc = reqData.patch_doc;
    if (_.isEmpty(originalDoc) || patchDoc.length == 0) {
        callback(util.errorResponse('Invalid input'));
        return;
    }
    const patchedDoc = jsonpatch.apply(originalDoc, patchDoc);
    callback(util.successResponse({ patchedDoc }));
}

async function createImageThumbnail(reqData, callback) {
    const imageUrl = reqData.image_url;
    const errMessage = 'Invalid image url';
    if (!imageUrl || !imageUrl.trim()) {
        return callback(util.errorResponse(errMessage));
    }

    const downlaodResponse = await downloadImageFromUrl(imageUrl);
    if (downlaodResponse.length < 1) {
        return callback(util.errorResponse(errMessage));
    }

    /** resize image 25x25 */
    const path = './assets/';
    const fileName = 'thumbnail.jpg';
    sharp('./assets/image.jpg').resize(25, 25)
        .jpeg({ quality: 50 }).toFile(path + fileName);


    if (!fs.existsSync(path)) {
        throw new Error('Thumbnail file not found.');
    }
    callback(util.successResponse({ fileName }));
}

async function downloadImageFromUrl(imageUrl) {
    const response = await fetch(imageUrl);
    if (response.status != util.statusCode.OK) {
        return [];
    }
    const buffer = await response.buffer();

    return new Promise((resolve, reject) => {
        fs.writeFile('./assets/image.jpg', buffer, (err) => {
            if (err) reject(err);
            console.log('File downloaded successfully')
            resolve(buffer);
        });
    });

}

module.exports = {
    addUserAddress,
    addJsonPatch,
    createImageThumbnail
}