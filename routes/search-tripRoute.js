const express = require("express");
const models = require("../models");
const Router = express.Router();

const controller = require("../controllers/search-tripController");
const tripInfoController = require("../controllers/trip-infoController");
const controller1 = require("../controllers/xacnhanController");
const controller2 = require("../controllers/thongtinkhachhangController");
const controller3 = require("../controllers/thanhtoanController");

Router.get("/:id", tripInfoController.show);
Router.get("/", controller.show);
Router.get("/:id/thanh-toan/:accId/xacnhan", controller1.show);
Router.get("/:id/thanh-toan/:accId/thongtinkhachhang", controller2.show);
Router.get("/:id/thanh-toan/:accId/thanhtoan", controller3.show);

Router.post(
  "/:id/thanh-toan/:accId/thanhcong",
  (req, res) => {
    let k = req.body.totalprice;
    let totalprice = k.slice(0, -4).replace(".", "");
    let accId = req.params.accId;

    models.VeDaDat.bulkCreate([
      {
        numSeats: req.body.ticket,
        totalPrice: totalprice,
        status: "Vừa đặt",
        phoneNum: req.body.phone,
        email: req.body.email,
        jourId: parseInt(req.params.id),
        accId: accId, //sửa lại sau
        fullName: req.body.name,
      },
    ])
      .then((product) => {
        res.render("thanhcong");
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

module.exports = Router;
