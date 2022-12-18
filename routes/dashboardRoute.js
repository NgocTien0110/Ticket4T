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
module.exports = Router;