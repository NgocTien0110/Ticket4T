const controller = {}
const models = require('../models')
const userController = require('../controllers/userController');
var paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AUFgzBVv4p4OFRbZkr1ehNJC5xy6hi3g3ameiamh759pA1COxuhZkMbq_hYCx_ZGmVHo79AxK9H-HPK7',
    'client_secret': 'EFv47lw_xv0VI2-EO3-3-8r03UtkcVEMTOKrN3FcoeCCvmx41MnwbeQ-xAZzJdE5UjrEaXZ4aPuRCW4j'
});
let totalprice;
controller.show = async (req, res) => {
    res.locals.name = req.query.name;
    res.locals.phone = req.query.phone;
    res.locals.email = req.query.email;
    res.locals.ticket = req.query.ticket;
    res.locals.type = req.query.card
    if (req.query.card == "Paypal") {
        res.locals.payment = true;
    }
    else {
        res.locals.payment = false;
    }

    let id = req.params['id'];

    let accId = req.session.user.id;
    res.locals.taikhoan = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    })

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
controller.Paypal = (req, res, item, totalPrice, id) => {
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/search-trip/" + id + "/thanh-toan/thanhcong",
            "cancel_url": "http://localhost:3000/search-trip/" + id + "/thanh-toan/thatbai"
        },
        "transactions": [{
            "item_list": {
                "items": item
            },
            "amount": {
                "currency": "USD",
                "total": totalprice
            },
            "description": "This is the payment description."
        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });


}
controller.Payment = async (req, res) => {
    let t = req.body.totalprice;
    let totalPrice = t.slice(0, -4).replaceAll(".", "");
    let accId = req.session.user.id;
    let price = req.body.price;
    price = parseFloat(price.slice(0, -4).replaceAll(".", ""));
    totalprice = parseFloat(totalPrice);
    price = (price * 0.042 / 1000).toFixed(2).toString();
    totalprice = (totalprice * 0.042 / 1000).toFixed(2).toString();
    let quantity = parseInt(req.body.ticket);
    console.log(totalprice, price, quantity);
    let chuyen_xe = req.body.tuyenduong;
    let item = [];
    for (let i = 0; i < quantity; i++) {
        item.push({
            "name": "Vé chặng " + chuyen_xe,
            "sku": i.toString(),
            "price": price,
            "currency": "USD",
            "quantity": 1
        })

    }

    let user = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    })
    let chuyenxe = await models.ChuyenXe.findOne({
        where: {
            id: parseInt(req.params.id)
        }, include: [models.NhaXe]
    })

    models.VeDaDat.bulkCreate([
        {
            numSeats: req.body.ticket,
            totalPrice: totalPrice,
            statusTicket: "Vừa đặt",
            phoneNum: req.body.phone,
            email: req.body.email,
            jourId: parseInt(req.params.id),
            accId: accId,
            fullName: req.body.name,
        },
    ])
        .then((product) => {
            userController.sendEmailTicketOrder(user, chuyenxe, chuyenxe.NhaXe.name, req.body.ticket, totalPrice)
            chuyenxe.update({
                numSeats: (chuyenxe.numSeats - req.body.ticket)
            })
            controller.Paypal(req, res, item, totalprice, req.params.id); // gọi hàm thanh toán paypal
        })
        .catch((err) => {
            res.json(err);
        });
}
controller.Success = async (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    var execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": totalprice
            }
        }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {

            throw error;
        } else {
            models.VeDaDat.update({
                statusTicket: "Đã thanh toán"
            }, {
                where: {
                    accId: req.session.user.id
                }
            })
            res.render("thanhcong");
        }
    });
}
controller.Cancel = (req, res) => {
    res.render("thatbai");
}
controller.PaymentCOD = async (req, res) => {
    let accId = req.session.user.id;
    res.locals.book = true;
    let user = await models.TaiKhoan.findOne({
        where: {
            id: accId
        }
    })
    let chuyenxe = await models.ChuyenXe.findOne({
        where: {
            id: parseInt(req.params.id)
        }, include: [models.NhaXe]
    })
    models.VeDaDat.bulkCreate([
        {
            numSeats: req.body.ticket,
            totalPrice: req.body.totalprice,
            statusTicket: "Vừa đặt",
            phoneNum: req.body.phone,
            email: req.body.email,
            jourId: parseInt(req.params.id),
            accId: accId,
            fullName: req.body.name,
        },
    ])
        .then((product) => {
            userController.sendEmailTicketOrder(user, chuyenxe, chuyenxe.NhaXe.name, req.body.ticket, req.body.totalprice)
            chuyenxe.update({
                numSeats: (chuyenxe.numSeats - req.body.ticket)
            })
            res.render("thanhcong");
        })
        .catch((err) => {
            res.json(err);
        });
}



module.exports = controller