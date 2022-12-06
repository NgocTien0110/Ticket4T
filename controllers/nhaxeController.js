const controller = {} //Để {} vì là object có thể chứa thêm các hàm khác
const models=require('../models');

controller.show = async (req, res) => {

    res.locals.carCom = await models.NhaXe.findAll();

    res.render('nhaxe');
} 

controller.showDetails = async(req, res) => {
    let defaultCarID = req.params.id;

    // lấy nhà xe, review của nhà xe đó và tên user, ảnh avt user của từng review
    res.locals.chiTietNhaXe = await models.NhaXe.findOne({
        where: {
            id: defaultCarID
        },
        include: [{
            model: models.Review,
            include: [{model: models.TaiKhoan, attributes: ['fullName', 'imageAccount']}],
        }]
    });
    res.render('chi_tiet_nha_xe');
}
module.exports = controller;