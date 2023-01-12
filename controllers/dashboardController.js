const controller = {} //Để {} vì là object có thể chứa thêm các hàm khác
const { where } = require('sequelize');
const models = require('../models')
const { Op, INTEGER } = require("sequelize");
const userController = require("../controllers/userController")

controller.show = async (req, res) => {
    let chuyenxe = await models.ChuyenXe.findAll();
    let nhaxe = await models.NhaXe.findAll();
    let vedadat = await models.VeDaDat.findAll();
    let accId = req.session.user.id

    let infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    });

    res.locals.infoAcc = infoAcc;
    res.locals.chuyenxe = chuyenxe;
    res.locals.nhaxe = nhaxe;
    res.locals.vedadat = vedadat;
    res.render('dashboard');
}
controller.showTicket = async (req, res) => {
    let accId = req.session.user.id

    let infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    });

    res.locals.infoAcc = infoAcc;

    let statusTicket = req.query.status || 'Vừa đặt'
    let statusVuaDat = true;
    let statusThanhToan = false;
    let statusDaHuy = false;
    console.log(statusVuaDat)
    if (!statusTicket.localeCompare('Đã thanh toán')) {
        statusVuaDat = false;
        statusThanhToan = true;
    }
    else if (!statusTicket.localeCompare('Đã hủy')) {
        statusVuaDat = false;
        statusDaHuy = true;
    }
    res.locals.statusVuaDat = statusVuaDat;
    res.locals.statusThanhToan = statusThanhToan;
    res.locals.statusDaHuy = statusDaHuy;
    let page = req.query.page || 1;
    const limit = 3;
    let offset = (page - 1) * limit;
    let temp = {
        where: {
            statusTicket: statusTicket
        },
        include: [{ model: models.ChuyenXe }],
        order: [['id', 'ASC']]
    }
    let totalPage = Math.ceil(await models.VeDaDat.count(temp) / limit);

    temp.limit = limit;
    temp.offset = offset;

    res.locals.ve = await models.VeDaDat.findAll(temp)
    res.locals.page = parseInt(page);
    res.locals.totalPage = totalPage;
    res.locals.queryParams = '&status=' + statusTicket;
    res.render('quanlyve');

}
controller.showDetailTicket = async (req, res) => {
    let accId = req.session.user.id

    let infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    });

    res.locals.infoAcc = infoAcc;

    let id = req.params.id;
    res.locals.vedadat = await models.VeDaDat.findOne({
        where: {
            id: id
        },
        include: [
            { model: models.TaiKhoan },
            { model: models.ChuyenXe, include: [models.NhaXe] }
        ]
    })
    res.render('chitietve');
}
controller.updateStatusTicket = async (req, res) => {
    let id = req.params.id;
    let statusTicket = req.body.status;
    await models.VeDaDat.update({
        statusTicket: statusTicket
    }, {
        where: {
            id: id
        }
    })
    return res.redirect('/dashboard/quanlyve/chitietve/' + id);
}
controller.deleteTicket = async (req, res) => {
    let id = req.body.id;
    await models.VeDaDat.destroy({
        where: {
            id: id
        }
    })
    res.redirect(req.get('referer')); // trở về trang trước đó
}


controller.showChuyenXe = async (req, res) => {
    const limit = 5;
    let page = req.query.page || 1;
    page = parseInt(page);
    let offset = limit * (page - 1)
    let accId = req.session.user.id

    let infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    });

    res.locals.infoAcc = infoAcc;

    let { rows, count } = await models.ChuyenXe.findAndCountAll({
        include: [models.NhaXe, models.LoaiXe],
        order: [['id', "ASC"]],
        limit: limit,
        offset: offset
    });
    res.locals.quanly_chuyenxe = rows;
    res.locals.currentPage = page;
    res.locals.totalPage = Math.ceil(count / limit)
    res.render('quanlychuyenxe');
}

controller.featureChuyenXe = async (req, res) => {
    let tempID = req.body.id.split(",");
    const id = parseInt(tempID[0]);

    if (tempID[1] == '-') {
        await models.VeDaDat.destroy({
            where: {
                jourId: id,
            },
        });

        await models.ChuyenXe.destroy({
            where: {
                id: id,
            },
        });
    }
    else {
        let tempModel = await models.ChuyenXe.findOne({ where: { id: id } })

        await models.ChuyenXe.create({
            startProvince: tempModel.startProvince,
            endProvince: tempModel.endProvince,
            startLocation: tempModel.startLocation,
            endLocation: tempModel.endLocation,
            startDate: tempModel.startDate,
            endDate: tempModel.endDate,
            startTime: tempModel.startTime,
            endTime: tempModel.endTime,
            carId: tempModel.carId,
            cateCarId: tempModel.cateCarId,
            totalNumSeats: tempModel.totalNumSeats,
            price: tempModel.price,
            numSeats: tempModel.numSeats,
            locationImage: tempModel.locationImage,
        });
        console.log(tempModel.numSeats);
    }


    res.redirect(req.get("referer"));
}

controller.editChuyenXe = async (req, res) => {
    const id = parseInt(req.params.id);

    let details = await models.ChuyenXe.findOne({
        where: { id: id },
        include: [models.LoaiXe, models.NhaXe]
    })
    res.locals.chuyenxeDetails = details;

    const nhaxeID = details.NhaXe.id;
    res.locals.danhsachNhaXe = await models.NhaXe.findAll({
        where: { id: { [Op.ne]: nhaxeID } }
    })

    const loaixeID = details.LoaiXe.id;
    res.locals.danhsachLoaiXe = await models.LoaiXe.findAll({
        where: { id: { [Op.ne]: loaixeID } }
    })

    let accId = req.session.user.id

    let infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    });

    res.locals.infoAcc = infoAcc;

    res.locals.startProvinceList = provinceList.filter(e => e.name != details.startProvince)
    res.locals.endProvinceList = provinceList.filter(e => e.name != details.endProvince)

    res.render('thongtinchitietChuyenXe')
}

controller.updateChuyenXe = async (req, res) => {
    let id = parseInt(req.params.id)
    let [startProvince, endProvince, startLocation, endLocation] = [req.body.startProvince, req.body.endProvince, req.body.startLocation, req.body.endLocation];
    let [startDate, endDate, startTime, endTime] = [req.body.startDate, req.body.endDate, req.body.startTime, req.body.endTime]
    let [nhaxe, loaixe] = [req.body.nhaxe, req.body.loaixe]
    let [price, totalNumSeats] = [req.body.price, req.body.totalNumSeats]

    let carId = await models.NhaXe.findOne({
        attribute: 'id',
        where: { name: nhaxe }
    })
    let cateId = await models.LoaiXe.findOne({
        attribute: 'id',
        where: { name: loaixe }
    })

    let tempStartDate = startDate.split('-')
    startDate = tempStartDate[2] + '-' + tempStartDate[1] + '-' + tempStartDate[0]

    let tempEndDate = endDate.split('-')
    endDate = tempEndDate[2] + '-' + tempEndDate[1] + '-' + tempEndDate[0]

    // let imgPath = toLowerCaseNonAccentVietnamese(endProvince);
    // imgPath = "/images/locationImages/" + imgPath.replace(' ', '-') + ".jpg";

    await models.ChuyenXe.update({
        startProvince: startProvince, endProvince: endProvince,
        startLocation: startLocation, endLocation: endLocation,
        startDate: startDate, endDate: endDate,
        startTime: startTime, endTime: endTime,
        carId: carId.id, cateCarId: cateId.id,
        totalNumSeats: totalNumSeats, price: price,
        // locationImage: imgPath
    }, {
        where: {
            id: id
        }
    })

    res.redirect("/dashboard/quanlychuyenxe");
}

controller.themchuyenxe = async (req, res) => {
    res.locals.danhsachNhaXe = await models.NhaXe.findAll();
    res.locals.danhsachLoaiXe = await models.LoaiXe.findAll();
    res.locals.provinceList = provinceList
    let accId = req.session.user.id

    let infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    });

    res.locals.infoAcc = infoAcc;
    res.render("themchuyenxe");
}

controller.addChuyenXe = async (req, res) => {
    let img = req.file;
    let [startProvince, endProvince, startLocation, endLocation] = [req.body.startProvince, req.body.endProvince, req.body.startLocation, req.body.endLocation];
    let [startDate, endDate, startTime, endTime] = [req.body.startDate, req.body.endDate, req.body.startTime, req.body.endTime]
    let [nhaxe, loaixe] = [req.body.nhaxe, req.body.loaixe]
    let [price, totalNumSeats] = [req.body.price, req.body.totalNumSeats]

    let carId = await models.NhaXe.findOne({
        attribute: 'id',
        where: { name: nhaxe }
    })
    let cateId = await models.LoaiXe.findOne({
        attribute: 'id',
        where: { name: loaixe }
    })
    console.log(startProvince);

    let tempStartDate = startDate.split('-')
    startDate = tempStartDate[2] + '-' + tempStartDate[1] + '-' + tempStartDate[0]

    let tempEndDate = endDate.split('-')
    endDate = tempEndDate[2] + '-' + tempEndDate[1] + '-' + tempEndDate[0]

    // let imgPath = toLowerCaseNonAccentVietnamese(endProvince);
    // imgPath = "/images/locationImages/" + imgPath.replace(' ', '-') + ".jpg";

    await models.ChuyenXe.create({
      startProvince: startProvince,
      endProvince: endProvince,
      startLocation: startLocation,
      endLocation: endLocation,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
      carId: carId.id,
      cateCarId: cateId.id,
      totalNumSeats: totalNumSeats,
      price: price,
      numSeats: totalNumSeats,
      locationImage: img.path,
    });

    res.redirect("/dashboard/quanlychuyenxe");
}

controller.editMultiChuyenXe = async (req, res) => {
    const id = parseInt(req.params.id);

    let details = await models.ChuyenXe.findOne({
        where: { id: id },
        include: [models.LoaiXe, models.NhaXe],
    });
    res.locals.chuyenxeDetails = details;

    res.render("thongtinMultichuyenxe");
};

controller.updateMultiChuyenXe = async (req, res) => {
    let id = parseInt(req.params.id);

    let [startDate, endDate, startTime, endTime] = [
        req.body.startDate,
        req.body.endDate,
        req.body.startTime,
        req.body.endTime,
    ];

    let numSeats = req.body.numSeats;

    let tempStartDate = startDate.split("-");
    startDate =
        tempStartDate[2] + "-" + tempStartDate[1] + "-" + tempStartDate[0];

    let tempEndDate = endDate.split("-");
    endDate = tempEndDate[2] + "-" + tempEndDate[1] + "-" + tempEndDate[0];

    let tempModel = await models.ChuyenXe.findOne({ where: { id: id } });

    tempModel.startDate = startDate
    tempModel.endDate = endDate
    tempModel.startTime = startTime
    tempModel.endTime = endTime
    tempModel.numSeats = numSeats;

    await models.ChuyenXe.create({
        startProvince: tempModel.startProvince,
        endProvince: tempModel.endProvince,
        startLocation: tempModel.startLocation,
        endLocation: tempModel.endLocation,
        startDate: tempModel.startDate,
        endDate: tempModel.endDate,
        startTime: tempModel.startTime,
        endTime: tempModel.endTime,
        carId: tempModel.carId,
        cateCarId: tempModel.cateCarId,
        totalNumSeats: tempModel.totalNumSeats,
        price: tempModel.price,
        numSeats: tempModel.numSeats,
        locationImage: tempModel.locationImage,
    });

    res.redirect("/dashboard/quanlychuyenxe");
};


controller.loginAdmin = (req, res, next) => { //Xử lý đăng nhập vào dashboard admin
    let email = req.body.email
    let password = req.body.password

    userController
        .getUserByEmail(email)
        .then(user => {
            if (user) {
                if (userController.comparePassword(password, user.password) == true && user.isVerified == true && user.isAdmin == true) {
                    req.session.user = user;
                    if (req.session.returnURL) {
                        return res.redirect(req.session.returnURL)
                    } else {
                        return res.redirect('/dashboard')
                    }
                }
                else if (userController.comparePassword(password, user.password) == true && user.isVerified == false) {
                    return res.render('loginAdmin', {
                        message: 'Tài khoản của bạn chưa được xác thực trong hệ thống, vui lòng xác thực!',
                        type: 'alert-danger'
                    })
                }
                else if (userController.comparePassword(password, user.password) == true && user.isVerified == true && user.isAdmin == false) {
                    return res.render('loginAdmin', {
                        message: 'Tài khoản của bạn không phải là admin!!!',
                        type: 'alert-danger'
                    })
                }
                else {
                    return res.render('loginAdmin', {
                        message: 'Mật khẩu nhập không đúng!!!',
                        type: 'alert-danger'
                    })
                }
            }
            return res.render('loginAdmin', {
                message: 'Email không tồn tại!!!',
                type: 'alert-danger'
            })
        })
}

controller.isAdminLoggedIn = (req, res, next) => { //Kiểm tra xem tài khoản có phải admin hay không
    if (req.session.user) {
        if (req.session.user.isAdmin) {
            next();
        } else {
            return res.redirect(`/dashboard/login?returnURL=${req.originalUrl}`)
        }
    } else {
        return res.redirect(`/dashboard/login?returnURL=${req.originalUrl}`)
    }
}

controller.logoutAdmin = (req, res, next) => { //Đăng xuất ở admin
    req.session.destroy(error => {
        if (error) {
            return next(error);
        }
        return res.redirect('/dashboard/login')
    })
}

const provinceList = [
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
module.exports = controller;