const controller = {}
const models = require('../models')
controller.show = async (req, res) => {
    res.locals.name = req.query.name;
    res.locals.phone = req.query.phone;
    res.locals.email = req.query.email;
    res.locals.ticket = req.query.ticket;
    let id = req.params['id'];
    res.locals.id = id;
    res.locals.chuyenxe = await models.ChuyenXe.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: models.NhaXe,
                attributes: ['name']
            }
        ]
    }
    )
    res.render('thanhtoan');
}
module.exports = controller