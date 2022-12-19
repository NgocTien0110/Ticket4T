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

Router.get('/quanlychuyenxe', controller.showChuyenXe);

Router.get("/quanlynhaxe", quanlynhaxe.show);

module.exports = Router;