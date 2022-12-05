const express = require('express');
const Router = express.Router();

const controller = require('../controllers/taikhoanController');

Router.get("/:accId/thong-tin/", controller.showInfoAcc);
Router.get("/:accId/ve-cua-toi/", controller.showMyTicket);
Router.get("/:accId/ve-cua-toi/:ticketId", controller.showDetailsTicket);

module.exports = Router;