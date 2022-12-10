const controller = {}
const models = require('../models')
const express = require("express");

controller.show = async (req, res) => {
    res.locals.name = req.query.name;
    res.locals.phone = req.query.phone;
    res.locals.email = req.query.email;
    res.locals.ticket = req.query.ticket;

    let id = req.params['id'];

    let accId = req.session.user.id;
    res.locals.taikhoan = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    })

    res.locals.chuyenxe = await models.ChuyenXe.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: models.NhaXe,
                attributes: ['name']
            }
        ]
    }
    )

    res.render('thanhtoan');
}

module.exports = controller