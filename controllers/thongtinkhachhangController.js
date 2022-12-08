const controller = {}
const models = require('../models')
controller.show = async (req, res) => {
    res.locals.id = req.params['id'];

    let accId = req.params.accId;
    res.locals.taikhoan = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    })

    res.render('thongtinkhachhang');
}
module.exports = controller