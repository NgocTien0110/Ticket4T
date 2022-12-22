const controller = {} //Để {} vì là object có thể chứa thêm các hàm khác
const { where } = require('sequelize');
const models = require('../models')
const { Op, INTEGER } = require("sequelize");

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

controller.editChuyenXe = async (req, res) => {
    const id = parseInt(req.params.id);

    let details = await models.ChuyenXe.findOne({
        where: {id: id},
        include: [models.LoaiXe, models.NhaXe]
    })
    res.locals.chuyenxeDetails = details;

    const nhaxeID = details.NhaXe.id;
    res.locals.danhsachNhaXe = await models.NhaXe.findAll({
        where: {id: {[Op.ne]: nhaxeID} }
    })

    const loaixeID = details.LoaiXe.id;
    res.locals.danhsachLoaiXe = await models.LoaiXe.findAll({
        where: {id: {[Op.ne]: loaixeID}}
    })
    res.render('thongtinchitietChuyenXe')
}

controller.updateChuyenXe = async(req, res) => {
    let id = parseInt(req.params.id)
    let [startProvince, endProvince, startLocation, endLocation] = [req.body.startProvince, req.body.endProvince, req.body.startLocation, req.body.endLocation];
    let [startDate, endDate, startTime, endTime] = [req.body.startDate, req.body.endDate, req.body.startTime, req.body.endTime]
    let [nhaxe, loaixe] = [req.body.nhaxe, req.body.loaixe]
    let [price, totalNumSeats] =  [req.body.price, req.body.totalNumSeats]

    let carId = await models.NhaXe.findOne({
        attribute: 'id',
        where: {name: nhaxe}
    })
    let cateId = await models.LoaiXe.findOne({
        attribute: 'id',
        where: {name: loaixe}
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

    res.redirect(req.get('referer'))
}

controller.themchuyenxe = async(req, res) => {
    res.locals.danhsachNhaXe = await models.NhaXe.findAll();
    res.locals.danhsachLoaiXe = await models.LoaiXe.findAll();
    res.render("themchuyenxe");
}

controller.addChuyenXe = async(req, res) => {
    let [startProvince, endProvince, startLocation, endLocation] = [req.body.startProvince, req.body.endProvince, req.body.startLocation, req.body.endLocation];
    let [startDate, endDate, startTime, endTime] = [req.body.startDate, req.body.endDate, req.body.startTime, req.body.endTime]
    let [nhaxe, loaixe] = [req.body.nhaxe, req.body.loaixe]
    let [price, totalNumSeats] =  [req.body.price, req.body.totalNumSeats]

    let carId = await models.NhaXe.findOne({
        attribute: 'id',
        where: {name: nhaxe}
    })
    let cateId = await models.LoaiXe.findOne({
        attribute: 'id',
        where: {name: loaixe}
    })
    console.log(startProvince);

    let tempStartDate = startDate.split('-')
    startDate = tempStartDate[2] + '-' + tempStartDate[1] + '-' + tempStartDate[0]

    let tempEndDate = endDate.split('-')
    endDate = tempEndDate[2] + '-' + tempEndDate[1] + '-' + tempEndDate[0]

    // let imgPath = toLowerCaseNonAccentVietnamese(endProvince);
    // imgPath = "/images/locationImages/" + imgPath.replace(' ', '-') + ".jpg";

    await models.ChuyenXe.create({
        startProvince: startProvince, endProvince: endProvince, 
        startLocation: startLocation, endLocation: endLocation,
        startDate: startDate, endDate: endDate, 
        startTime: startTime, endTime: endTime,
        carId: carId.id, cateCarId: cateId.id,
        totalNumSeats: totalNumSeats, price: price,
        numSeats: 0,
        // locationImage: imgPath
    });
    res.redirect(req.get('referer'));
}

// function toLowerCaseNonAccentVietnamese(str) {
//     str = str.toLowerCase();

//     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
//     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
//     str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
//     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
//     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
//     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
//     str = str.replace(/đ/g, "d");

//     str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
//     str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
//     return str;
// }
module.exports = controller;