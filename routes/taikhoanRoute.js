const express = require('express');
const Router = express.Router();

const controller = require('../controllers/taikhoanController');

Router.get("/thong-tin/", controller.showInfoAcc);
Router.get("/ve-cua-toi/", controller.showMyTicket);
Router.get("/ve-cua-toi/:ticketId", controller.showDetailsTicket);

module.exports = Router;