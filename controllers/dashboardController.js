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

    let {rows, count} = await models.ChuyenXe.findAndCountAll({
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

controller.deleteChuyenXe = async (req, res) => {
    const id = parseInt(req.body.id);

    await models.ChuyenXe.destroy({
        where: {
            id: id
        }
    })

    res.redirect(req.get('referer'))
}

module.exports = controller;