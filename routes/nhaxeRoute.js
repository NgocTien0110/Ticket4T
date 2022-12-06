const express = require('express');
const Router = express.Router();
const controller = require('../controllers/nhaxeController')

Router.get('/', controller.show);
Router.get('/:id', controller.showDetails);
// Router.get('/:id', controller.filterByStar);
module.exports = Router;