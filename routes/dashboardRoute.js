const express = require('express');
const Router = express.Router();
const controller = require('../controllers/dashboardController.js')

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
Router.get('/quanlyve/chitietve/:id', controller.showDetailTicket);
Router.post('/quanlyve/chitietve/:id', controller.updateStatusTicket);

module.exports = Router;