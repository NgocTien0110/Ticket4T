const controller = {}; //Để {} vì là object có thể chứa thêm các hàm khác
const models = require("../models");

controller.show = async (req, res) => {
    // lấy id từ url gòi lây thông tin chuyến xe
    let id = req.params.id;
    res.locals.trip = await models.ChuyenXe.findOne({
        where: { id: id },
        include: [
            {
                model: models.NhaXe,
            },
            {
                model: models.LoaiXe,
            },
        ],
    });

    res.render("trip-info");

};

module.exports = controller;