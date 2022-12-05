const controller = {}
const models = require('../models')
controller.show = async (req, res) => {
    let id = req.params['id'];
    res.locals.id = id;

    res.render('thongtinkhachhang');
}
module.exports = controller