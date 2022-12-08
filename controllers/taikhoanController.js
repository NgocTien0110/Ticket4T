const controller = {} //Để {} vì là object có thể chứa thêm các hàm khác
const models = require('../models')

controller.showInfoAcc = async (req, res) => {
    let accId = req.params.accId;
    res.locals.infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    })
    res.render('infoTaiKhoan')
}

controller.showMyTicket = async (req, res) => {
    let accId = req.params.accId;
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
    let accId = req.params.accId;
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