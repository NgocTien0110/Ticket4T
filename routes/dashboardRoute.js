const express = require('express');
const Router = express.Router();
const controller = require('../controllers/dashboardController.js')
const quanlynhaxe = require('../controllers/quanlynhaxeController.js')

Router.get('/', controller.show);
Router.get('/form', (req, res) => {
    res.render('form');
})
Router.get('/tables', (req, res) => {
    res.render('tables');
})
Router.get('/document', (req, res) => {
    res.render('document');
})
Router.get('/quanlyve', controller.showTicket);
Router.post('/quanlyve', controller.deleteTicket)
Router.get('/quanlyve/chitietve/:id', controller.showDetailTicket);
Router.post('/quanlyve/chitietve/:id', controller.updateStatusTicket);

// chuyen xe
Router.get(['/quanlychuyenxe',], [controller.showChuyenXe,]);
Router.get('/quanlychuyenxe/themchuyenxe', [controller.themchuyenxe,]);

Router.post('/quanlychuyenxe', controller.deleteChuyenXe);
Router.get('/quanlychuyenxe/:id', controller.editChuyenXe);
Router.post('/quanlychuyenxe/:id', controller.updateChuyenXe);
Router.post('/quanlychuyenxe/themchuyenxe/add', controller.addChuyenXe);

// nha xe
Router.get("/quanlynhaxe", quanlynhaxe.show);
Router.get("/quanlynhaxe/themnhaxe", quanlynhaxe.themNhaXe);

Router.post("/quanlynhaxe", quanlynhaxe.deleteNhaXe);
Router.get("/quanlynhaxe/nhaxe/:id", quanlynhaxe.editNhaXe);
Router.post("/quanlynhaxe/nhaxe/:id", quanlynhaxe.updateNhaXe);
Router.post("/quanlynhaxe/themnhaxe/add", quanlynhaxe.addNhaXe);

module.exports = Router;