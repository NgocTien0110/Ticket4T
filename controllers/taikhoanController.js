const controller = {} //Để {} vì là object có thể chứa thêm các hàm khác
const models = require('../models')
const userController = require('../controllers/userController');
let bcrypt = require('bcryptjs');

controller.showUpdatePassword = async (req, res) => {
    let accId = req.session.user.id

    res.locals.infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    })
    res.render('updatePassword')
}


controller.updatePassword = async (req, res) => {
    let accId = req.session.user.id
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let confirmNewPassword = req.body.confirmNewPassword;

    console.log(req.body)

    let infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    });

    userController
        .getUserByEmail(infoAcc.email)
        .then(user => {
            if (user) {
                if (userController.comparePassword(oldPassword, user.password)) {
                    if (!newPassword.localeCompare(confirmNewPassword)) { //Cập nhật mật khẩu
                        var salt = bcrypt.genSaltSync(10);
                        newPassword = bcrypt.hashSync(newPassword, salt);

                        infoAcc.update({
                            password: newPassword
                        })
                        return res.render('updatePassword', {
                            message: `Đổi mật khẩu thành công`,
                            type: 'alert-success', infoAcc
                        })
                    } else {
                        return res.render('updatePassword', {
                            message: `Mật khẩu mới với xác nhận mật khẩu mới không trùng nhau!!!`,
                            type: 'alert-danger', infoAcc
                        })
                    }

                } else { //Mật khẩu hiện tại nhập sai   
                    return res.render('updatePassword', {
                        message: `Mật khẩu hiện tại bạn nhập sai. Vui lòng nhập lại !!!`,
                        type: 'alert-danger', infoAcc
                    })
                }
            }
        })
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
                        phoneNum: phoneNum,
                        dob: dob,
                        isMale: isMale
                    })

                    return res.render('infoTaiKhoan', {
                        message: `Cập nhật thông tin tài khoản thành công`,
                        type: 'alert-success', infoAcc
                    })

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

                return res.render('infoTaiKhoan', {
                    message: `Cập nhật thông tin tài khoản thành công`,
                    type: 'alert-success', infoAcc
                })
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