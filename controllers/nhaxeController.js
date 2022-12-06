const controller = {} //Để {} vì là object có thể chứa thêm các hàm khác
const models=require('../models');
const { Op } = require("sequelize");

controller.show = async (req, res) => {
    res.locals.carCom = await models.NhaXe.findAll();

    res.render('nhaxe');
} 

controller.showDetails = async(req, res) => {
    const defaultCarID = req.params.id;

    let star = req.query.star;
    star = parseInt(star);
    
    // lấy nhà xe, review của nhà xe đó và tên user, ảnh avt user của từng review
    res.locals.chiTietNhaXe = await models.NhaXe.findOne({
        where: {
            id: defaultCarID
        },
        // include: [{
        //     model: models.Review,
        //     include: [{model: models.TaiKhoan, attributes: ['fullName', 'imageAccount']}],
        //     // where: {stars: {[Op.lt]: star + 1, [Op.gte]: star, [Op.gt]: star - 1}}
        // }],
        attributes:  {exclude: ['createdAt', 'updatedAt', 'imageJours']}
    });

    console.log(star);
    if(star == 1 || star == 2 || star == 3 || star == 4 || star == 5){
        res.locals.chiTietNhaXeReview = await models.Review.findAll({
        where: {
            carId: defaultCarID,
            stars: {[Op.gte]: star, [Op.lt]: star + 1}
        },
        include: [{ 
            model: models.TaiKhoan}]
        });
    }
    else{
        res.locals.chiTietNhaXeReview = await models.Review.findAll({
        where: {
            carId: defaultCarID,
        },
        include: [{ 
            model: models.TaiKhoan}]
        });
    }
    

    const oneStar = await models.Review.count({
        where:{
            carId: defaultCarID,
            stars: {[Op.gte]: 1, [Op.lt]: 2}
        }
    })

    const twoStar = await models.Review.count({
        where:{
            carId: defaultCarID,
            stars: {[Op.gte]: 2, [Op.lt]: 3}
        }
    })

    const threeStar = await models.Review.count({
        where:{
            carId: defaultCarID,
            stars: {[Op.gte]: 3, [Op.lt]: 4}
        }
    })

    const fourStar = await models.Review.count({
        where:{
            carId: defaultCarID,
            stars: {[Op.gte]: 4, [Op.lt]: 5}
        }
    })

    const fiveStar = await models.Review.count({
        where:{
            carId: defaultCarID,
            stars: {[Op.eq]: 5}
        }
    })

    res.render('chi_tiet_nha_xe', {oneStar, twoStar, threeStar, fourStar, fiveStar});
}

// controller.filterByStar = async(req, res) => {
//     const star = req.query.star;
//     const defaultCarID = req.params.id;
//     const starUpper = star++;

//     res.locals.carComReview = await models.Review.findAll({
//         where: {carId: defaultCarID},
//         include: [{model: models.TaiKhoan, attributes: ['fullName', 'imageAccount']}],
//         // where: {stars: {[Op.lt]: starUpper, [Op.gte]: star}}
//     });

//     console.log(star)
//     res.render('chi_tiet_nha_xe');

// }
module.exports = controller;



    // res.locals.chiTietNhaXeReview = await models.Review.findAll({
    //     where: {
    //         carId: defaultCarID
    //     },
    //     include: [{ 
    //         model: models.TaiKhoan, where: {id: accId}}]
    // });

    // console.log(res.locals.chiTietNhaXeReview)
