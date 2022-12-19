const controller = {} //Để {} vì là object có thể chứa thêm các hàm khác
const models = require('../models')

controller.show = async (req, res) => {
    res.render('dashboard');
}
controller.showTicket = async (req, res) => {
    res.locals.vuadat = await models.VeDaDat.findAll(
        {
            where: {
                statusTicket: 'Vừa đặt'

            },
            include: [models.ChuyenXe]
        }
    )
    res.locals.dathanhtoan = await models.VeDaDat.findAll(
        {
            where: {
                statusTicket: 'Đã thanh toán'
            },
            include: [models.ChuyenXe]
        }
    )
    res.locals.dahuy = await models.VeDaDat.findAll(
        {
            where: {
                statusTicket: 'Đã hủy'
            },
            include: [models.ChuyenXe]
        }
    )
    res.render('quanlyve');

}
controller.showDetailTicket = async (req, res) => {
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

module.exports = controller;