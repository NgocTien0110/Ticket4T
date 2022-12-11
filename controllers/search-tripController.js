const controller = {}; //Để {} vì là object có thể chứa thêm các hàm khác
const models = require("../models");
const sequelize = require("sequelize");

controller.show = async (req, res) => {
  let dataSearch = req.query;
  let sort = req.query.sort || "earliest";
  let minPrice = req.query.min || 0;
  let maxPrice = req.query.max || 2000000;
  let orders = {
    earliest: ["startTime", "ASC"],
    latest: ["startTime", "DESC"],
    cheapest: ["price", "ASC"],
    expensive: ["price", "DESC"],
  };

  let page = req.query.page || 1;
  let limit = 3;

  let option = {
    include: [
      {
        model: models.NhaXe,
        include: [models.Review],
        where: {},
      },
      {
        model: models.LoaiXe,
        where: {},
      },
    ],
    order: [],
    where: {},
    // limit: limit,
    // offset: (page - 1) * limit,
  };

  option.where.price = {
    [sequelize.Op.between]: [minPrice, maxPrice],
  };

  if (sort) {
    option.order.push(orders[sort]);
  }
  if (dataSearch.start || dataSearch.end || dataSearch.date) {
    option.where.startProvince = dataSearch.start;
    option.where.endProvince = dataSearch.end;
  }
  if (dataSearch.startDate) {
    let sDate = dataSearch.date.split(" ");
    option.where.startDate = sDate[0];
  }
  if (req.query.nhaxe) {
    let arrNhaxe = req.query.nhaxe.split(",");
    option.include[0].where.id = {
      [sequelize.Op.in]: arrNhaxe,
    };
  }
  if (req.query.loaixe) {
    let arrLoaixe = req.query.loaixe.split(",");
    option.include[1].where.id = {
      [sequelize.Op.in]: arrLoaixe,
    };
  }

  let { rows, count } = await models.ChuyenXe.findAndCountAll(option);

  res.locals.chuyenxes = rows;
  res.locals.pagination = {
    page: page,
    limit: limit,
    totalRows: count / 2,
  };

  res.locals.nhaxes = await models.NhaXe.findAll({
    include: [models.ChuyenXe],
  });
  res.locals.loaixes = await models.LoaiXe.findAll({
    include: [models.ChuyenXe],
  });

  res.locals.searchStart = await models.ChuyenXe.findAll({
    attributes: ["startProvince"],
    group: ["startProvince"],
  });
  res.locals.searchEnd = await models.ChuyenXe.findAll({
    attributes: ["endProvince"],
    group: ["endProvince"],
  });

  // console.log(res.locals.chuyenxes);

  res.render("search-trip", { dataSearch });
};

module.exports = controller;
