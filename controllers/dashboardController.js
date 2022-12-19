const controller = {} //Để {} vì là object có thể chứa thêm các hàm khác
const models = require('../models')

controller.show = async (req, res) => {
    res.render('dashboard');
}
controller.showTicket = async (req, res) => {
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
    res.locals.ve = await models.VeDaDat.findAll(
        {
            where: {
                statusTicket: statusTicket

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

module.exports = controller;