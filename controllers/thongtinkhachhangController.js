const controller = {}
const models = require('../models')
controller.show = async (req, res) => {
    let id = req.params.id;
    res.locals.id = id
    let accId = req.session.user.id;
    res.locals.taikhoan = await models.TaiKhoan.findOne({
        where: {
            id: accId
        },
    })
    res.locals.chuyenxe = await models.ChuyenXe.findOne({
        where: {
            id: id
        }
    })

    res.render('thongtinkhachhang');
}
module.exports = controller