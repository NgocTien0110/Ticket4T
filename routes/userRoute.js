const express = require('express');
const Router = express.Router();
const controller = require('../controllers/userController')


Router.get('/login', controller.showFormLogin);

Router.post('/login', controller.login);

Router.get('/register', controller.showFormRegister);

Router.post('/register', controller.register);

Router.get('/logout', controller.logout);

Router.get('/reset-password', (req, res, next) => {
    res.render('forgotPassword', {
        message: "Nhập địa chỉ Email và chúng tôi sẽ gửi bạn một liên kết để reset lại mật khẩu"
    })
})
Router.post('/reset-password', controller.resetPasswordSendEmail);

Router.get('/reset', controller.getLinkResetPassword)

Router.post('/reset', controller.resetPasswordAccount)

Router.get('/verify', controller.verifyUserByLink)
module.exports = Router;