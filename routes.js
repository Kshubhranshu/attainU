const routes = require('express').Router();
const protected = require('./protected');

routes.use('/pro', protected);

module.exports = routes;