// Import all the modules that are needed for the project.
module.exports.bodyParser = require('body-parser');
module.exports.path = require('path');
module.exports.mysql = require('mysql');
module.exports.session = require('express-session');
module.exports.nodemailer = require('nodemailer')
const exp = require('express');
module.exports.app = exp()
require('dotenv').config()
module.exports.express = require('express');
module.exports.router = exp.Router();
module.exports.crypto = require('crypto');
module.exports.jwt = require('jsonwebtoken');