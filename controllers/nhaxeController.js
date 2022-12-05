const controller = {} //Để {} vì là object có thể chứa thêm các hàm khác
const models=require('../models');

controller.show = async (req, res) => {

    res.locals.carCom = await models.NhaXe.findAll();
    res.render('nhaxe');
} 
module.exports = controller;