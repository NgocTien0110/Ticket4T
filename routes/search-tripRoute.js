const express = require("express");
const models = require("../models");
const Router = express.Router();

const controller = require("../controllers/search-tripController");
const tripInfoController = require("../controllers/trip-infoController");
const controller1 = require("../controllers/xacnhanController");
const controller2 = require("../controllers/thongtinkhachhangController");
const controller3 = require("../controllers/thanhtoanController");
const userController = require('../controllers/userController');
const { Model } = require("sequelize");

Router.get("/:id", tripInfoController.show);
Router.get("/", controller.show);
Router.get("/:id/thanh-toan/xacnhan", userController.isLoggedIn, controller1.show);
Router.get("/:id/thanh-toan/thongtinkhachhang", userController.isLoggedIn, controller2.show);
Router.get("/:id/thanh-toan/thanhtoan", userController.isLoggedIn, controller3.show);

Router.post(
  "/:id/thanh-toan/thanhcong",
  async (req, res) => {
    let k = req.body.totalprice;
    let totalprice = k.slice(0, -4).replace(".", "");
    let accId = req.session.user.id;

    let chuyenxe = await models.ChuyenXe.findOne({
      where: {
        id: parseInt(req.params.id)
      }
    })

    models.VeDaDat.bulkCreate([
      {
        numSeats: req.body.ticket,
        totalPrice: totalprice,
        statusTicket: "Vừa đặt",
        phoneNum: req.body.phone,
        email: req.body.email,
        jourId: parseInt(req.params.id),
        accId: accId,
        fullName: req.body.name,
      },
    ])
      .then((product) => {
        chuyenxe.update({
          numSeats: (chuyenxe.numSeats - req.body.ticket)
        })
        res.render("thanhcong");
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

module.exports = Router;
