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
    
    if(star == undefined)
        star = 0;
    else
        star = parseInt(star);
    let reviewStarFilter = star;

    let page = req.query.page || 1;
    let limit = 2;
    page = parseInt(page);

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

    if (star == 1 || star == 2 || star == 3 || star == 4 || star == 5){
        review.where = {
                carId: defaultCarID,
                stars: { [Op.gte]: star, [Op.lt]: star + 1 }
            };
    }

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

    let {rows, count}= await models.Review.findAndCountAll(review);
    let totalRows = count;
    let previousPage = 1;
    let nextPage = 1;
    let totalPage = Math.round(parseInt(count) / limit);

    if(page > 1)
        previousPage = page - 1;
    if(page < totalPage)
        nextPage = page + 1;
    console.log({page, nextPage, totalPage, reviewStarFilter})

    res.locals.chiTietNhaXeReview = rows;
    res.locals.reviewPagination = {page, previousPage, nextPage, limit, reviewStarFilter, totalPage}

    res.render('chi_tiet_nha_xe', { oneStar, twoStar, threeStar, fourStar, fiveStar });
}

module.exports = controller;
