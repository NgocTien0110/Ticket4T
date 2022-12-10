const controller = {}; //Để {} vì là object có thể chứa thêm các hàm khác
const models = require("../models");

controller.show = async (req, res) => {
  let dataSearch = req.query;
  // let page = req.query.page || 1;
  let limit = 3;
  // let offset = (page - 1) * limit;
  res.locals.chuyenxes = await models.ChuyenXe.findAll({
    include: [
      {
        model: models.NhaXe,
        include: [models.Review],
      },
      {
        model: models.LoaiXe,
      },
    ],
    where: {
      startProvince: dataSearch.start,
      endProvince: dataSearch.end,
    },
    limit: limit,
    // offset: offset,
  });

  // let count = await models.ChuyenXe.findAndCountAll()

  // res.locals.pagination = {
  //     page: page,
  //     // pageCount: Math.ceil(count.count / limit),
  //     limit: limit,
  //     offset: offset,
  //     count: count.count,
  // }

  res.locals.nhaxes = await models.NhaXe.findAll();
  res.locals.loaixes = await models.LoaiXe.findAll();
  res.render("search-trip", { dataSearch });
};


module.exports = controller;
