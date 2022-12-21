const controller = {}; //Để {} vì là object có thể chứa thêm các hàm khác
const { sequelize } = require("../models");
const models = require("../models");
const Sequelize = require("sequelize");
const TODAY = new Date();

controller.show = async (req, res) => {
  res.locals.searchStart = await models.ChuyenXe.findAll({
    attributes: [
      "startProvince",
    ],
    group: ["startProvince"],
  });
  res.locals.searchEnd = await models.ChuyenXe.findAll({
    attributes: [
      "endProvince",
    ],
    group: ["endProvince"],
  });

  await models.ChuyenXe.findAll({
    attributes: ["startProvince", "endProvince", [Sequelize.fn('MIN', Sequelize.col('price')), "min_price"] , [Sequelize.fn('COUNT', Sequelize.col('id')), "count"], [Sequelize.fn('MAX', Sequelize.col('price')), "max_price"]],
    group: ["startProvince", "endProvince",],
    order: [['count', 'DESC']],
    raw: true,
    limit: 6
  }).then(function (result) {res.locals.chuyenxes = result});

  let dateStr = String(TODAY.getDate() + 1).padStart(2, '0') + "-" + String(TODAY.getMonth() + 1).padStart(2, '0') + "-" + TODAY.getFullYear();
  res.locals.todayDate = dateStr;
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
