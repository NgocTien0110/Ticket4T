const express = require('express');
const Router = express.Router();
const controller = require('../controllers/indexController')
let models = require('../models')
Router.get('/', controller.show);

Router.get('/syncPassword', async (req, res) => {
    let bcrypt = require('bcryptjs');
    let users = await models.TaiKhoan.findAll({});

    users.forEach(user => {
        var salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);

        user.update({
            password: user.password
        }, {
            where: {
                id: user.id
            }
        })
    })
    res.redirect("/");
})

Router.get('/createTables', (req, res) => {
    models.sequelize.sync().then(() => { //Tạo bảng ở trong postgres
        res.send("tables created");
    })
})

module.exports = Router;