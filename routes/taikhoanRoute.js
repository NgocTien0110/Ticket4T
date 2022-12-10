const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');
const controller = require('../controllers/taikhoanController');

Router.get("/thong-tin/", userController.isLoggedIn, controller.showInfoAcc);
Router.get("/ve-cua-toi/", userController.isLoggedIn, controller.showMyTicket);
Router.get("/ve-cua-toi/:ticketId", userController.isLoggedIn, controller.showDetailsTicket);

module.exports = Router;