const express = require("express");
const models = require('../models')
const Router = express.Router();

const controller = require("../controllers/search-tripController");
const controller1 = require('../controllers/xacnhanController');
const controller2 = require('../controllers/thongtinkhachhangController');
const controller3 = require('../controllers/thanhtoanController');

Router.get("/", controller.show);
Router.get('/:id/thanh-toan/xacnhan', controller1.show);
Router.get('/:id/thanh-toan/thongtinkhachhang', controller2.show);
Router.get('/:id/thanh-toan/thanhtoan', controller3.show);


let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });

Router.post('/:id/thanh-toan/thanhcong', urlencodedParser, (req, res) => {
    let k = req.body.totalprice;
    let totalprice = k.slice(0, -4).replace('.', '');

    models.VeDaDat.bulkCreate([{
        numSeats: req.body.ticket,
        totalPrice: totalprice,
        status: 'Vừa đặt',
        phoneNum: req.body.phone,
        email: req.body.email,
        jourId: parseInt(req.params.id),
        accId: 2, //sửa lại sau
        fullName: req.body.name
    }]).then((product) => {
        res.render('thanhcong');
    })
        .catch((err) => {
            res.json(err);
        })
})

module.exports = Router;
