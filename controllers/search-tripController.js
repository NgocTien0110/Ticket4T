const controller = {}; //Để {} vì là object có thể chứa thêm các hàm khác
const models = require("../models");

controller.show = async (req, res) => {
    let dataSearch = req.query;
    res.locals.chuyenxes = await models.ChuyenXe.findAll()
    res.locals.nhaxes = await models.NhaXe.findAll()
    res.locals.loaixes = await models.LoaiXe.findAll()
    console.log(res.locals.nhaxes);
    res.render("search-trip", {dataSearch});
};

module.exports = controller;
