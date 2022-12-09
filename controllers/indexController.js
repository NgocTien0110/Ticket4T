const controller = {}; //Để {} vì là object có thể chứa thêm các hàm khác
const { sequelize } = require("../models");
const models = require("../models");
const Sequelize = require("sequelize");

controller.show = async (req, res) => {
  res.locals.searchStart = await models.ChuyenXe.findAll({
    attributes: [
      // [Sequelize.fn("DISTINCT", Sequelize.col("startProvince")),"start"],
      "startProvince",
    ],
    group: ["startProvince"],
  });
   res.locals.searchEnd = await models.ChuyenXe.findAll({
     attributes: [
       // [Sequelize.fn("DISTINCT", Sequelize.col("startProvince")),"start"],
       "endProvince",
     ],
     group: ["endProvince"],
   });
  
  res.locals.chuyenxes = await models.ChuyenXe.findAll({
    limit: 6,
  });

  res.locals.nhaxes = await models.NhaXe.findAll();
  res.locals.comments = await models.Review.findAll({
    include: [
      {
        model: models.TaiKhoan,
        attributes: ["fullName", "imageAccount"],
      },
    ],
    order: [["stars", "DESC"]],
    limit: 3,
  });

  res.render("index");
};

module.exports = controller;
