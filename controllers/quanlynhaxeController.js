const controller = {}; //Để {} vì là object có thể chứa thêm các hàm khác
const models = require("../models");
controller.show = async (req, res) => {
  res.locals.nhaxes = await models.NhaXe.findAll({
   
  });
  res.render("quanlynhaxe");
};
module.exports = controller;
