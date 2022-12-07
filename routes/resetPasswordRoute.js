const express = require('express');
const Router = express.Router();
const controller = require('../controllers/resetPasswordController')

Router.get('/', controller.show);

module.exports = Router;