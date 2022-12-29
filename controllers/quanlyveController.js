const controller = {} //Để {} vì là object có thể chứa thêm các hàm khác
const models = require('../models')
controller.show = async (req, res) => {
    let accId = req.session.user.id

    let infoAcc = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    });

    res.locals.infoAcc = infoAcc;
    res.locals.vedadat = await models.VeDaDat.findAll({
        includes: [models.ChuyenXe]
    }
    )
    res.render('quanlyve');

}
module.exports = controller;