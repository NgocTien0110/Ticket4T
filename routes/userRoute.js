const express = require('express');
const Router = express.Router();
const controller = require('../controllers/userController')


Router.get('/login', controller.showFormLogin);

Router.post('/login', controller.login);

Router.get('/register', controller.showFormRegister);

Router.post('/register', controller.register);

Router.get('/logout', controller.logout);

module.exports = Router;