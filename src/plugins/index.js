const CONFIG = require('config');
const API = require(`./${CONFIG.framework}_api/index`);
const Twillio = require('./twillio/index');
const Mongoose = require('./mongoose/index');
const Errors = require('./errors_handler/index');

const PLUGINS = [
	Twillio,
	Mongoose,
	Errors
];

module.exports = PLUGINS.concat(API);