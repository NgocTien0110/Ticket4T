const express = require('express');
const Router = express.Router();
const controller = require('../controllers/dashboardController.js')
const quanlynhaxe = require('../controllers/quanlynhaxeController.js')
const upload_cloud = require('../config/cloudinary');

Router.get('/', controller.isAdminLoggedIn, controller.show);
Router.get('/quanlyve', controller.isAdminLoggedIn, controller.showTicket);
Router.post('/quanlyve', controller.isAdminLoggedIn, controller.deleteTicket)
Router.get('/quanlyve/chitietve/:id', controller.isAdminLoggedIn, controller.showDetailTicket);
Router.post('/quanlyve/chitietve/:id', controller.isAdminLoggedIn, controller.updateStatusTicket);

// chuyen xe
Router.get(['/quanlychuyenxe',], controller.isAdminLoggedIn, [controller.showChuyenXe,]);
Router.get('/quanlychuyenxe/themchuyenxe', controller.isAdminLoggedIn, [controller.themchuyenxe,]);


Router.post(
  "/quanlychuyenxe",
  controller.isAdminLoggedIn,
  controller.featureChuyenXe
);
Router.get('/quanlychuyenxe/:id', controller.isAdminLoggedIn, controller.editChuyenXe);
Router.post('/quanlychuyenxe/:id', controller.isAdminLoggedIn, controller.updateChuyenXe);

Router.post('/quanlychuyenxe/themchuyenxe/add', controller.isAdminLoggedIn, upload_cloud.single('image'), controller.addChuyenXe);

Router.get(
  "/quanlychuyenxe/editMultiplyChuyenXe/:id",
  controller.isAdminLoggedIn,
  controller.editMultiChuyenXe
);
Router.post(
  "/quanlychuyenxe/editMultiplyChuyenXe/:id",
  controller.isAdminLoggedIn,
  controller.updateMultiChuyenXe
);


// nha xe
Router.get("/quanlynhaxe", controller.isAdminLoggedIn, quanlynhaxe.show);
Router.get("/quanlynhaxe/themnhaxe", controller.isAdminLoggedIn, quanlynhaxe.themNhaXe);

Router.post("/quanlynhaxe", controller.isAdminLoggedIn, quanlynhaxe.deleteNhaXe);
Router.get("/quanlynhaxe/nhaxe/:id", controller.isAdminLoggedIn, quanlynhaxe.editNhaXe);
Router.post("/quanlynhaxe/nhaxe/:id", controller.isAdminLoggedIn, upload_cloud.array('image'), quanlynhaxe.updateNhaXe);
Router.post("/quanlynhaxe/themnhaxe/add", controller.isAdminLoggedIn, upload_cloud.array('image'), quanlynhaxe.addNhaXe);

Router.get("/login", (req, res) => {
    res.render("loginAdmin");
})

Router.post("/login", controller.loginAdmin);
Router.get('/logout', controller.logoutAdmin);

module.exports = Router;