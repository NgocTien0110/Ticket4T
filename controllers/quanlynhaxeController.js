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
];

controller.show = async (req, res) => {
  const limit = 5;
  let page = req.query.page || 1;
  page = parseInt(page);
  let offset = limit * (page - 1);
  // res.locals.nhaxes = await models.NhaXe.findAll({
  let { rows, count } = await models.NhaXe.findAndCountAll({
    order: [["id", "ASC"]],
    limit: limit,
    offset: offset,
  });
  res.locals.nhaxes = rows;
   res.locals.currentPage = page;
  res.locals.totalPage = Math.ceil(count / limit);
  // console.log(res.locals.totalPage);
  res.render("quanlynhaxe");
};

controller.editNhaXe = async (req, res) => {
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

controller.updateNhaXe = async (req, res) => {
  let id = parseInt(req.params.id);
  let body = req.body;
  // console.log(body.policy);

  if (req.files.length > 0) {
    let img_array = req.files;
    let img_avatar = img_array[0].path;
    let img_jours = [];
    for (let i = 1; i < img_array.length; i++) {
      img_jours[i-1] = img_array[i].path;
    }
    await models.NhaXe.update(
      {
        name: body.name,
        phoneNo: body.phoneNo,
        address: body.address,
        mainRoute: body.mainRoute,
        description: body.description,
        policy: body.policy,
        imageCarCom: img_avatar,
        imageJours: img_jours,
      },
      {
        where: {
          id: id,
        },
      }
    );
  } else {
      await models.NhaXe.update(
        {
          name: body.name,
          phoneNo: body.phoneNo,
          address: body.address,
          mainRoute: body.mainRoute,
          description: body.description,
          policy: body.policy,
          // imageCarCom: img_avatar,
          // imageJours: img_jours,
        },
        {
          where: {
            id: id,
          },
        }
      );
  }

  // console.log(img_array);
  

  res.redirect(req.get("referer"));
};

controller.deleteNhaXe = async (req, res) => {
  const id = req.body.id;
  // let idChuyenxe = await models.ChuyenXe.findAll({
  //   where: {
  //     carId: id,
  //   },
  //   attributes: ["id"],
  // });

  // parse json
  // let hihi = JSON.stringify(idChuyenxe);
  // console.log(hihi);

 
  await models.ChuyenXe.destroy({
   include: [ models.VeDaDat ],
   where: {
     carId: id,
   },
 });
 await models.Review.destroy({
   where: {
     carId: id,
   },
 });
  await models.NhaXe.destroy({
    where: {
      id: id,
    },
  });

  await models.VeDaDat.destroy({
    where: {
      jourId: null,
    },
  });
 

  res.redirect(req.get("referer"));
};

controller.themNhaXe = async (req, res) => {
  res.locals.tinhThanh = tinhThanh;
  res.render("themnhaxe");
};

controller.addNhaXe = async (req, res) => {
  let img_array = req.files;
  let img_avatar = img_array[0].path;
  let img_jours = [];
  for (let i = 1; i < img_array.length; i++) {
    img_jours[i-1] = img_array[i].path;
  }
  let body = req.body;

  let name = body.name;
  let phoneNo = [body.phoneNo];
  let address = [body.address];
  let mainRoute = [body.mainRoute];
  let description = body.description;
  let policy = body.policy;

  await models.NhaXe.create({
    name: name,
    phoneNo: phoneNo,
    address: address,
    mainRoute: mainRoute,
    description: description,
    policy: policy,
    imageCarCom: img_avatar,
    imageJours: img_jours,
  });

  res.redirect(req.get("referer"));
};

module.exports = controller;
