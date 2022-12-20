const controller = {}; //Để {} vì là object có thể chứa thêm các hàm khác
const models = require("../models");
controller.show = async (req, res) => {
  res.locals.nhaxes = await models.NhaXe.findAll({
   
  });
  res.render("quanlynhaxe");
};
controller.showDetail = async (req, res) => {
  const { id } = req.params;
  res.locals.chitietnhaxe = await models.NhaXe.findOne({
    where: {
      id: id,
    },
  });

  res.render("quanlychitietnhaxe");
};
controller.deleteNhaXe = async (req, res) => {
  const id = req.body.id;
  console.log(id);
  console.log(id);
  console.log(id);
  console.log(id);
  console.log(id);
  console.log(id);
  await models.NhaXe.destroy({
    where: {
      id: id,
    },
  });
  res.redirect(req.get("referer")); 
};
controller.addNhaXe = async (req, res) => {
  res.render("themnhaxe");
};
module.exports = controller;
