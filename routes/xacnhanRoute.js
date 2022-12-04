const express = require('express');
const Router = express.Router();
const controller = require('../controllers/xacnhanController');
const controller1=require('../controllers/thongtinkhachhangController');
const controller2=require('../controllers/thanhtoanController');


Router.get('/:id/thanh-toan/xacnhan',controller.show);
Router.get('/:id/thanh-toan/thongtinkhachhang',controller1.show);
Router.get('/:id/thanh-toan/thanhtoan',controller2.show);



module.exports = Router;
