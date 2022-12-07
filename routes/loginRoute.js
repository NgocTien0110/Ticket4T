const express = require('express');
const Router = express.Router();
const controller = require('../controllers/loginController')

Router.get('/', controller.show);

module.exports = Router;