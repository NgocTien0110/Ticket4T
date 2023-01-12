const controller = {}; //Để {} vì là object có thể chứa thêm các hàm khác
const models = require("../models");
const sequelize = require("sequelize");
// thời gian hiện tại
const dateTime = new Date();

controller.show = async (req, res) => {
  // lấy dữ liệu từ query và set các thuộc tính mặc định
  let dataSearch = req.query;
  let sort = req.query.sort || "earliest";
  let minPrice = req.query.min || 0;
  let maxPrice = req.query.max || 2000000;
  let page = req.query.page || 1;
  let limit = 3;
  // console.log(dataSearch.date);

  // filter của thanh search
  let orders = {
    earliest: ["startTime", "ASC"],
    latest: ["startTime", "DESC"],
    cheapest: ["price", "ASC"],
    expensive: ["price", "DESC"],
  };

  // tạo option cho search
  let option = {
    include: [
      {
        model: models.NhaXe,
        include: [models.Review],
        where: {

        },
      },
      {
        model: models.LoaiXe,
        where: {},
      },
    ],
    order: [],
    where: {
      numSeats: {
        [sequelize.Op.gt]: 0,
      },
    },
    limit: limit,
    offset: (page - 1) * limit,
  };

  // thời gian bắt đầu phải lớn hơn thời gian hiện tại
  // đổi năm-tháng-ngay sang ngày-tháng-năm
  let date = new Date().toISOString().slice(0, 10).split("-");
  let date2 = date[2] + "-" + date[1] + "-" + date[0];
  // if (dataSearch.date ==  date2) {
  //   console.log("ok");
  //   option.where.startTime = {
  //     [sequelize.Op.gte]: dateTime.getHours() + ":" + dateTime.getMinutes(),
  //   }
  // }

  // chọn option sort
  if (sort) {
    option.order.push(orders[sort]);
  }
  // lọc giá từ min tới max
  option.where.price = {
    [sequelize.Op.between]: [minPrice, maxPrice],
  };
  // where start và end và ngày đi
  if (dataSearch.start || dataSearch.end || dataSearch.date) {
    option.where.startProvince = dataSearch.start;
    option.where.endProvince = dataSearch.end;
    option.where.startDate = dataSearch.date;
  }
  // lọc nhà xe
  if (req.query.nhaxe) {
    let arrNhaxe = req.query.nhaxe.split(",");
    option.include[0].where.id = {
      [sequelize.Op.in]: arrNhaxe,
    };
  }
  // lọc loại xe
  if (req.query.loaixe) {
    let arrLoaixe = req.query.loaixe.split(",");
    option.include[1].where.id = {
      [sequelize.Op.in]: arrLoaixe,
    };
  }

  // dùng cái này để count số lượng chuyến xe
  let option2 = Object.assign({}, option);
  delete option2.limit;
  delete option2.offset;
  let count = await models.ChuyenXe.findAll(option2);
  let totalPage = count.length;

  // lấy param để phân trang
  let para = "";
  for (let key in req.query) {
    if (key != "page") para += "&" + key + "=" + req.query[key];
  }
  // console.log(para);
  let pagi = {
    page: page,
    limit: limit,
    totalRows: totalPage,
    queryParams: para,
  };
  res.locals.pagis = pagi;

  res.locals.chuyenxes = await models.ChuyenXe.findAll(option);
  res.locals.nhaxes = await models.NhaXe.findAll({
    include: [models.ChuyenXe],
  });
  res.locals.loaixes = await models.LoaiXe.findAll({
    include: [models.ChuyenXe],
  });

  // hiển thị ra thanh search start và end
  res.locals.searchStart = await models.ChuyenXe.findAll({
    attributes: ["startProvince"],
    group: ["startProvince"],
  });
  res.locals.searchEnd = await models.ChuyenXe.findAll({
    attributes: ["endProvince"],
    group: ["endProvince"],
  });

  res.render("search-trip", { dataSearch });
};

module.exports = controller;
