const express = require('express');
const Router = express.Router();
const controller = require('../controllers/xacnhanController')


Router.get('/:id/thanh-toan/xacnhan',controller.show);

module.exports = Router;
