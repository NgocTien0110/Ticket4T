const controller = {} //Để {} vì là object có thể chứa thêm các hàm khác
const models = require('../models')
const userController = require('../controllers/userController');
let bcrypt = require('bcryptjs');

controller.showUpdatePassword = async (req, res) => { //Hiển thị trang cập nhật mật khẩu
    let accId = req.session.user.id

    res.locals.infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    })
    res.render('updatePassword')
}


controller.updatePassword = async (req, res) => { //Cập nhật mật khẩu
    let accId = req.session.user.id
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let confirmNewPassword = req.body.confirmNewPassword;

    let infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    });

    userController
        .getUserByEmail(infoAcc.email)
        .then(user => {
            if (user) {
                if (userController.comparePassword(oldPassword, user.password)) { //Nếu nhập mật khẩu đúng
                    if (!newPassword.localeCompare(confirmNewPassword)) { //Nếu xác nhận mật khẩu trùng với mật khẩu mới
                        var salt = bcrypt.genSaltSync(10);
                        newPassword = bcrypt.hashSync(newPassword, salt);

                        infoAcc.update({
                            password: newPassword
                        })
                        return res.render('updatePassword', {
                            message: `Đổi mật khẩu thành công`,
                            type: 'alert-success', infoAcc
                        })
                    } else { //Không trùng nhau
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

controller.showInfoAcc = async (req, res) => { //Hiển thị thông tin tài khoản người dùng
    let accId = req.session.user.id
    res.locals.infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    })
    res.render('infoTaiKhoan')
}

controller.updateInfoAcc = async (req, res) => { //Cập nhật thông  tin tài khoản
    let dataFile = req.file;
    let accId = req.session.user.id
    let fullName = req.body.fullName;
    let email = req.body.email;
    let phoneNum = req.body.phoneNum;
    let dob = req.body.dob;
    let sex = req.body.sex;
    let isMale;

    if (!sex.localeCompare("Nam")) { //Kiểm tra xem giới tính có phải nam không
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
                if (!user.email.localeCompare(infoAcc.email)) { //Nếu email đúng
                    infoAcc.update({
                        fullName: fullName,
                        phoneNum: phoneNum,
                        dob: dob,
                        isMale: isMale,
                        imageAccount: dataFile ? dataFile.path : infoAcc.imageAccount

                    })
                    req.session.user = infoAcc;

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
                    isMale: isMale,
                    imageAccount: dataFile ? dataFile.path : infoAcc.imageAccount

                })
                req.session.user = infoAcc;

                return res.render('infoTaiKhoan', {
                    message: `Cập nhật thông tin tài khoản thành công`,
                    type: 'alert-success', infoAcc
                })
            }
        })

}

controller.showMyTicket = async (req, res) => { //Hiển thị lịch sử vé
    let accId = req.session.user.id
    let statusTicket = req.query.statusTicket || 'Vừa đặt'

    let statusVuaDat = true;
    let statusThanhToan = false;
    let statusDaHuy = false;

    if (!statusTicket.localeCompare('Đã thanh toán')) { //Tình trạng vé là Đã thanh toán
        statusVuaDat = false;
        statusThanhToan = true;
    }
    else if (!statusTicket.localeCompare('Đã hủy')) { //Tình trạng vé là Đã hủy
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

    let page = req.query.page || 1;
    page = parseInt(page);
    let limit = 5;
    let offset = limit * (page - 1);

    let vedadat = { //Phân trang
        where: {
            id: accId,
        },
        include: [{
            model: models.VeDaDat,
            include: [{ model: models.ChuyenXe, include: [models.NhaXe] }],
            where: {
                statusTicket: statusTicket
            },
            limit: limit,
            offset: offset
        }],
    };

    vedadat.limit = 2;
    res.locals.veDaDat = await models.TaiKhoan.findOne(vedadat);

    let totalTicket = await models.TaiKhoan.count({
        where: {
            id: accId
        },
        include: [{
            model: models.VeDaDat,
            where: {
                statusTicket: statusTicket
            },
        }],
    });

    let nextPageStatus = true, previousPageStatus = true;
    totalTicket = parseInt(totalTicket)
    if (page + 1 >= totalTicket) {
        nextPageStatus = false;
    }
    if (page - 1 < 1)
        previousPageStatus = false;
    if (page == 1) {
        nextPageStatus = false;
        previousPageStatus = false
    }

    let totalPage = totalTicket / limit;
    if (totalPage % 1 != 0)
        totalPage = Math.floor(totalPage) + 1;
    else
        totalPage = Math.floor(totalPage);

    res.locals.nextPageStatus = nextPageStatus;
    res.locals.previousPageStatus = previousPageStatus;
    res.locals.currentPage = page;
    res.locals.nextPage = page + 1;
    res.locals.previousPage = page - 1;
    res.locals.buttonType = ['Previous', 'Next'];
    res.locals.ticketStatus = ['Vừa đặt', 'Đã thanh toán', 'Đã hủy'];
    res.locals.totalPage = totalPage;
    res.render('myTicket')
}

controller.compareTwoDate = (date1, date2) => { //Hàm so sánh ngày tháng năm giữa 2 date
    const date1Temp = date1.split('-');
    const date2Temp = date2.split('-');

    if (date1Temp[2].localeCompare(date2Temp[2]) == 1) {
        return true;
    }
    else if (date1Temp[2].localeCompare(date2Temp[2]) == -1) {
        return false;
    }
    else {
        if (date1Temp[1].localeCompare(date2Temp[1]) == 1) {
            return true;
        }
        else if (date1Temp[1].localeCompare(date2Temp[1]) == -1) {
            return false;
        }
        else {
            if (date1Temp[0].localeCompare(date2Temp[0]) == -1) {
                return false;
            }
            else {
                return true;
            }
        }
    }
}

controller.showDetailsTicket = async (req, res) => { //Hiển thị thông tin chi tiết vé
    let accId = req.session.user.id
    let ticketId = req.params.ticketId;

    const d = new Date();
    let hour = d.getHours();
    let minutes = d.getMinutes();
    let dd = String(d.getDate()).padStart(2, '0');
    let mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = d.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    time = hour + ":" + minutes;

    let infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        },
        include: [{
            model: models.VeDaDat,
            include: [{ model: models.ChuyenXe, include: [models.NhaXe] }],
            where: {
                id: ticketId,
            }
        }]
    })
    let veDaDat = await models.VeDaDat.findOne({
        where: {
            id: ticketId
        }
    })

    let chuyenXe = await models.ChuyenXe.findOne({
        where: {
            id: veDaDat.jourId
        }
    })

    let veChuaHuy;

    //Nếu tình trạng vé là vừa đặt và ngày hôm nay nhỏ hơn ngày khởi hành
    if (veDaDat.statusTicket == "Vừa đặt" && (controller.compareTwoDate(today, chuyenXe.startDate) == false)) {
        veChuaHuy = true;
    }
    else {
    }

    res.locals.veChuaHuy = veChuaHuy;
    res.locals.infoAcc = infoAcc

    res.render('xemChiTietVe')
}

controller.cancleTicket = async (req, res) => { //Hủy vé
    let ticketId = req.body.id;
    let accId = req.session.user.id;

    let infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        },
        include: [{
            model: models.VeDaDat,
            include: [{ model: models.ChuyenXe, include: [models.NhaXe] }],
            where: {
                id: ticketId,
            }
        }]
    })

    let veDaDat = await models.VeDaDat.findOne({
        where: {
            id: ticketId
        }
    })

    let chuyenXe = await models.ChuyenXe.findOne({
        where: {
            id: veDaDat.jourId
        }
    })

    veDaDat.update({ //Cập nhật tình trạng vé thành đã hủy
        statusTicket: 'Đã hủy'
    })
    chuyenXe.update({ //Cập nhập số lượng ghế còn lại của chuyến xe
        numSeats: (chuyenXe.numSeats + veDaDat.numSeats)
    })

    res.locals.infoAcc = infoAcc
    res.redirect("/tai-khoan/ve-cua-toi");
}

module.exports = controller;