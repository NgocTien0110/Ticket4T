const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');
const controller = require('../controllers/taikhoanController');
const upload_cloud = require('../config/cloudinary');

Router.get("/thong-tin/", userController.isLoggedIn, controller.showInfoAcc);
Router.post("/thong-tin/", upload_cloud.single('image'), userController.isLoggedIn, controller.updateInfoAcc);
Router.get("/ve-cua-toi/", userController.isLoggedIn, controller.showMyTicket);
Router.get("/ve-cua-toi/:ticketId", userController.isLoggedIn, controller.showDetailsTicket);
Router.post("/ve-cua-toi/:ticketId", userController.isLoggedIn, controller.cancleTicket);
Router.get("/cap-nhat-mat-khau", userController.isLoggedIn, controller.showUpdatePassword);
Router.post("/cap-nhat-mat-khau", userController.isLoggedIn, controller.updatePassword);

module.exports = Router;