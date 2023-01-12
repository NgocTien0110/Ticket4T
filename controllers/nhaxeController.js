const controller = {} //Để {} vì là object có thể chứa thêm các hàm khác
const models = require('../models');
const { Op, INTEGER } = require("sequelize");

function calcSum(total, item) {
    return total + item.stars;
}

controller.show = async (req, res) => {
    let limit = 4, page = req.query.page || 1;
    page = parseInt(page);

    let carCom = {
        include: [{
            model: models.Review,
            group: 'carId'
        }]
    };


    let nhaxeTable = await models.NhaXe.findAll({
        include: [{ model: models.Review }]
    });
    nhaxeTable.forEach(nhaxe => {
        let stars = 0;

        let numOfComment = nhaxe.Reviews.length
        if (numOfComment > 0) {
            stars = nhaxe.Reviews.reduce(calcSum, 0) / numOfComment;

            nhaxe.Reviews.reduce(calcSum, 0);
        }
        nhaxe.stars = stars;
        nhaxe.update({
            stars: stars.toFixed(1)
        }, { where: { id: nhaxe.id } })
    });

    count = await models.NhaXe.count();
    carCom.limit = limit;
    carCom.offset = limit * (page - 1);

    let rows = await models.NhaXe.findAll(carCom);
    let previousPage = page - 1, nextPage = page + 1;
    const buttonType = ['previous', 'next'], pageType = 'nhaxe';
    let totalPage = count / limit;

    if (totalPage % 1 != 0)
        totalPage = totalPage + 1;
    else
        totalPage = Math.floor(totalPage);

    res.locals.nhaxePagination = { previousPage, nextPage, page, totalPage, buttonType, pageType };
    res.locals.carCom = rows;
    res.render('nhaxe');
}

controller.showDetails = async (req, res) => {
    const defaultCarID = req.params.id;

    let star = req.query.star;

    if (star == undefined)
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
        }], 
        order: [["id", "DESC"]],
    };

    if (star == 1 || star == 2 || star == 3 || star == 4 || star == 5) {
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

    let { rows, count } = await models.Review.findAndCountAll(review);
    let previousPage = 1;
    let nextPage = 1;
    let totalPage = parseInt(count) / limit;
    const buttonType = ['previous', 'next'], pageType = 'review';

    if (totalPage % 1 != 0)
        totalPage = totalPage + 1;
    else
        totalPage = Math.floor(totalPage);

    previousPage = page - 1;
    nextPage = page + 1;

    res.locals.chiTietNhaXeReview = rows;
    res.locals.reviewPagination = { page, previousPage, nextPage, reviewStarFilter, totalPage, buttonType, pageType }

    res.render('chi_tiet_nha_xe', { oneStar, twoStar, threeStar, fourStar, fiveStar });
}

controller.rating = async (req, res) => {
    let id = req.params.id;
    let star = req.body.star;
    let cmt = req.body.cmt;
    let review = {
        carId: id,
        stars: star,
        comment: cmt,
        accId: req.session.user.id
    }

    let Review = await models.Review;
    await Review.create(review);
    let car = await models.NhaXe.findOne({
        where: {
            id: id

        },
        include: [{ model: models.Review }]
    })
    let stars = 0;
    car.Reviews.forEach(review => {
        stars += review.stars
    })
    car.stars = stars / car.Reviews.length
    car.update({
        stars: car.stars.toFixed(1)
    })
    res.redirect(`/nha-xe/${id}#review-section`)
}
module.exports = controller;
