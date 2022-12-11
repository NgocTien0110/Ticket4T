const express = require('express');
const Router = express.Router();
const controller = require('../controllers/indexController')
let models = require('../models')
Router.get('/', controller.show);

// function calcSum(total, item) {
//     return total + item.stars;
// }

// Router.get('/calcStars', async (req, res) => {
//     let products = await models.NhaXe.findAll({
//         include: [{ model: models.Review }]
//     });
//     products.forEach(item => {
//         let stars = 0;

//         let numOfComment = item.Reviews.length
//         if (numOfComment > 0) {
//             stars = item.Reviews.reduce(calcSum, 0) / numOfComment;

//             console.log(item.Reviews.reduce(calcSum, 0));
//         }
//         item.stars = stars;
//         item.update({
//             stars: stars.toFixed(1)
//         }, { where: { id: item.id } })
//     });
//     res.json(products)
// })

Router.get('/syncPassword', async (req, res) => {
    let bcrypt = require('bcryptjs');
    let users = await models.TaiKhoan.findAll({});

    users.forEach(user => {
        var salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);

        user.update({
            password: user.password
        }, {
            where: {
                id: user.id
            }
        })
    })
    res.redirect("/");
})

module.exports = Router;