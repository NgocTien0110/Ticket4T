const controller = {} //Để {} vì là object có thể chứa thêm các hàm khác
const models = require('../models');
const { Op } = require("sequelize");

controller.show = async (req, res) => {
    res.locals.carCom = await models.NhaXe.findAll({
        include: [{
            model: models.Review,
            group: 'carId'
        }]
    });

    res.render('nhaxe');
}

controller.showDetails = async (req, res) => {
    const defaultCarID = req.params.id;

    let star = req.query.star;
    star = parseInt(star);

    let page = req.query.page || 1;
    let limit = 2;

    console.log(page);
    // lấy nhà xe, review của nhà xe đó và tên user, ảnh avt user của từng review
    res.locals.chiTietNhaXe = await models.NhaXe.findOne({
        where: {
            id: defaultCarID
        },
        include: [
            {
                model: models.Review,
                attributes: ['id']
            }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt', 'imageJours'] }
    });

    let review = {
            where: {
                carId: defaultCarID,
            },
            include: [{
                model: models.TaiKhoan
            }]
        };

    if (star == 1 || star == 2 || star == 3 || star == 4 || star == 5)
        review.where = {
                carId: defaultCarID,
                stars: { [Op.gte]: star, [Op.lt]: star + 1 }
            };
    // else {
    //     review = await models.Review.findAll();
    // }

   


    review.limit = limit;
    review.offset = limit * (page - 1);
    
    const oneStar = await models.Review.count({
        where: {
            carId: defaultCarID,
            stars: { [Op.eq]: 1 }
        }
    })

    const twoStar = await models.Review.count({
        where: {
            carId: defaultCarID,
            stars: { [Op.eq]: 2 }
        }
    })

    const threeStar = await models.Review.count({
        where: {
            carId: defaultCarID,
            stars: { [Op.eq]: 3 }
        }
    })

    const fourStar = await models.Review.count({
        where: {
            carId: defaultCarID,
            stars: { [Op.eq]: 4 }
        }
    })

    const fiveStar = await models.Review.count({
        where: {
            carId: defaultCarID,
            stars: { [Op.eq]: 5 }
        }
    })

    res.locals.chiTietNhaXeReview = await models.Review.findAll(review);
    res.render('chi_tiet_nha_xe', { oneStar, twoStar, threeStar, fourStar, fiveStar });
}

module.exports = controller;
