const controller = {}; //Để {} vì là object có thể chứa thêm các hàm khác
const models = require("../models");

// 63 tỉnh thành
let tinhThanh = [
  { name: "Hà Nội" },
  { name: "Hồ Chí Minh" },
  { name: "Hải Phòng" },
  { name: "Đà Nẵng" },
  { name: "Cần Thơ" },
  { name: "An Giang" },
  { name: "Bà Rịa - Vũng Tàu" },
  { name: "Bắc Giang" },
  { name: "Bắc Kạn" },
  { name: "Bạc Liêu" },
  { name: "Bắc Ninh" },
  { name: "Bến Tre" },
  { name: "Bình Dương" },
  { name: "Bình Định" },
  { name: "Bình Phước" },
  { name: "Bình Thuận" },
  { name: "Cà Mau" },
  { name: "Cao Bằng" },
  { name: "Đắk Lắk" },
  { name: "Đắk Nông" },
  { name: "Điện Biên" },
  { name: "Đồng Nai" },
  { name: "Đồng Tháp" },
  { name: "Gia Lai" },
  { name: "Hà Giang" },
  { name: "Hà Nam" },
  { name: "Hà Tĩnh" },
  { name: "Hải Dương" },
  { name: "Hậu Giang" },
  { name: "Hòa Bình" },
  { name: "Hưng Yên" },
  { name: "Khánh Hòa" },
  { name: "Kiên Giang" },
  { name: "Kon Tum" },
  { name: "Lai Châu" },
  { name: "Lâm Đồng" },
  { name: "Lạng Sơn" },
  { name: "Lào Cai" },
  { name: "Long An" },
  { name: "Nam Định" },
  { name: "Nghệ An" },
  { name: "Ninh Bình" },
  { name: "Ninh Thuận" },
  { name: "Phú Thọ" },
  { name: "Quảng Bình" },
  { name: "Quảng Nam" },
  { name: "Quảng Ngãi" },
  { name: "Quảng Ninh" },
  { name: "Quảng Trị" },
  { name: "Sóc Trăng" },
  { name: "Sơn La" },
  { name: "Tây Ninh" },
  { name: "Thái Bình" },
  { name: "Thái Nguyên" },
  { name: "Thanh Hóa" },
  { name: "Thừa Thiên Huế" },
  { name: "Tiền Giang" },
  { name: "Trà Vinh" },
  { name: "Tuyên Quang" },
  { name: "Vĩnh Long" },
  { name: "Vĩnh Phúc" },
  { name: "Yên Bái" },
  { name: "Phú Yên" },
]

controller.show = async (req, res) => {
  res.locals.nhaxes = await models.NhaXe.findAll({});
  res.render("quanlynhaxe");
};

controller.showDetail = async (req, res) => {
  const { id } = req.params;
  let phongve = [];
  let pv = await models.NhaXe.findAll({
    where: {
      id: id,
    },
    attributes: ["phoneNo", "address", "mainRoute"],
  });
   
  for (let i = 0; i < pv[0].phoneNo.length; i++) {
    phongve[i] = {
      phoneNo: pv[0].phoneNo[i],
      address: pv[0].address[i],
      mainRoute: pv[0].mainRoute[i],
      chontinh: tinhThanh,
    };
  }

  
  // parse to json
  // let hihi  = JSON.stringify(phongve);
  // console.log(hihi);
  res.locals.phongves = phongve;

  res.locals.chitietnhaxe = await models.NhaXe.findOne({
    where: {
      id: id,
    },
  });

  res.render("quanlychitietnhaxe");
};

controller.deleteNhaXe = async (req, res) => {
  const id = req.body.id;

  await models.NhaXe.destroy({
    where: {
      id: id,
    },
  });
  res.redirect(req.get("referer"));
};
controller.addNhaXe = async (req, res) => {
  res.locals.tinhThanh = tinhThanh;
  res.render("themnhaxe");
};
module.exports = controller;
