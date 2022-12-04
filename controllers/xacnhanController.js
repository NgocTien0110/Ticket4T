const controller = {} //Để {} vì là object có thể chứa thêm các hàm khác
const models=require('../models')
controller.show = async (req, res) => {
    let id=req.params['id'];
    res.locals.id=id;
    res.locals.chuyenxe=await models.ChuyenXe.findOne({
        where:{
            id:id

        }
    }
        
    )
    res.render('xacnhan');
}

module.exports = controller;
