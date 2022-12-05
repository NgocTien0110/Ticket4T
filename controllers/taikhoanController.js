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

    res.locals.infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        },
        include: [{
            model: models.VeDaDat, include: [{ model: models.ChuyenXe, include: [models.NhaXe] }]
        }]
    })

    res.render('myTicket')
}

controller.showDetailsTicket = async (req, res) => {
    let accId = req.params.accId;
    let jourId = req.params.jourId;

    res.locals.infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        },
        include: [{
            model: models.VeDaDat, include: [{ model: models.ChuyenXe, include: [models.NhaXe] }]
        }]
    })

    res.render('myTicket')
}

module.exports = controller;