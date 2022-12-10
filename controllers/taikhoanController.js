const controller = {} //Để {} vì là object có thể chứa thêm các hàm khác
const models = require('../models')
const userController = require('../controllers/userController');

controller.updatePassword = async (req, res) => {
    let accId = req.session.user.id

    res.locals.infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    })
    res.render('updatePassword')
}

controller.showInfoAcc = async (req, res) => {
    let accId = req.session.user.id
    res.locals.infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    })
    res.render('infoTaiKhoan')
}

controller.updateInfoAcc = async (req, res) => {
    let accId = req.session.user.id
    let fullName = req.body.fullName;
    let email = req.body.email;
    let phoneNum = req.body.phoneNum;
    let dob = req.body.dob;
    let sex = req.body.sex;
    let isMale;

    if (!sex.localeCompare("Nam")) {
        isMale = true;
    } else {
        isMale = false;
    }
    let infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    });

    userController
        .getUserByEmail(email)
        .then(user => {
            if (user) {
                if (!user.email.localeCompare(infoAcc.email)) {
                    infoAcc.update({
                        fullName: fullName,
                        email: email,
                        phoneNum: phoneNum,
                        dob: dob,
                        isMale: isMale
                    })

                    return res.render('infoTaiKhoan', { infoAcc })

                } else {
                    return res.render('infoTaiKhoan', {
                        message: `Email ${user.email} đã tồn tại, vui lòng nhập email khác để cập nhật!!!`,
                        type: 'alert-danger', infoAcc
                    })
                }
            } else {
                infoAcc.update({
                    fullName: fullName,
                    email: email,
                    phoneNum: phoneNum,
                    dob: dob,
                    isMale: isMale
                })

                return res.render('infoTaiKhoan', { infoAcc })
            }
        })

}

controller.showMyTicket = async (req, res) => {
    let accId = req.session.user.id
    let statusTicket = req.query.statusTicket || 'Vừa đặt'

    let statusVuaDat = true;
    let statusThanhToan = false;
    let statusDaHuy = false;

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


    res.locals.infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId,
        },
    })

    res.locals.veDaDat = await models.TaiKhoan.findOne({
        where: {
            id: accId,
        },
        include: [{
            model: models.VeDaDat,
            include: [{ model: models.ChuyenXe, include: [models.NhaXe] }],
            where: {
                statusTicket: statusTicket
            }
        }]
    })

    res.render('myTicket')
}

controller.showDetailsTicket = async (req, res) => {
    let accId = req.session.user.id
    let ticketId = req.params.ticketId;

    res.locals.infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        },
        include: [{
            model: models.VeDaDat,
            include: [{ model: models.ChuyenXe, include: [models.NhaXe], include: [models.LoaiXe] }],
            where: {
                id: ticketId,
            }
        }]
    })

    res.render('xemChiTietVe')
}

module.exports = controller;