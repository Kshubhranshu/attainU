const util = require('../common/util');
const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE } = require('../common/appConfig');
var jwt = require('jsonwebtoken');

async function authenticate(reqData, callback) {
    const username = reqData.username;
    const password = reqData.password;
    const payload = { username: reqData.username };
    let result;

    if (!username || !password) {
        result = 'Invalid credentials';
        callback(util.errorResponse(result));
        return;
    }

    result = await generateAuthToken(payload);
    callback(util.successResponse(result));
}

async function generateAuthToken(payload) {
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: ACCESS_TOKEN_LIFE
    });
    return accessToken;
}

async function verifyAuthToken(token, callback) {
    try {
        callback(null ,jwt.verify(token, ACCESS_TOKEN_SECRET));
    } catch (err) {
        console.error(new Date(), 'Invalid token! - ', token);
        return {};
    }
}


module.exports = {
    authenticate,
    verifyAuthToken
}