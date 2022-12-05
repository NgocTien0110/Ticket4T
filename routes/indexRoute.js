const express = require('express');
const Router = express.Router();
const controller = require('../controllers/indexController')

Router.get('/', controller.show);

function calcSum(total, item){
    return total + item.stars;
}

Router.get('/calcStars', async(req, res) => {
    let models = require('../models')
    let products = await models.NhaXe.findAll({
        include: [{ model: models.Review }]
    });
    products.forEach(item => {
        let stars = 0;
        
        let numOfComment = item.Reviews.length
        if(numOfComment > 0){
            stars = item.Reviews.reduce(calcSum, 0) / numOfComment;

            console.log(item.Reviews.reduce(calcSum, 0));
        }
        item.stars = stars;
        item.update({
            stars: stars.toFixed(1)
        }, { where: { id: item.id } })
    });
    res.json(products)
})

module.exports = Router;