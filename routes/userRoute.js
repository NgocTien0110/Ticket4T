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
Router.post('/reset-password', (req, res, next) => {
    let email = req.body.email;

    controller.getUserByEmail(email)
        .then(user => {
            if (user) {
                //Tạo link
                let token = controller.createJWT(email);
                let host = req.header('host');
                let url = `${req.protocol}://${host}/users/reset?u=${email}&t=${token}`;
                //Gửi email
                controller.sendResetPasswordMail(user, host, url)
                    .then((result) => {
                        return res.render('forgotPassword', {
                            done: 1,
                            email
                        })
                    })
                    .catch((err) => {
                        return res.render('forgotPassword', {
                            email,
                            message: 'Có lỗi xảy ra khi gửi tới email của bạn!!! Hãy thử lại lần kế tiếp',
                            type: 'alert-danger'
                        })
                    })
            } else {
                return res.render('forgotPassword', {
                    message: 'Email này chưa đăng ký ở trong hệ thống. Hãy thử email khác hoặc <a href="/users/register">đăng ký.</a>',
                    type: 'alert-danger',
                    email
                })
            }

        }
        ).catch(error => next(error))
})

Router.get('/reset', (req, res, next) => {
    let email = req.query.u;
    let token = req.query.t;

    if (!email || !token) {
        return res.redirect('/users/reset-password');
    }
    let isVerify = controller.verifyJWT(token);
    if (isVerify) {
        return res.render('resetPassword', {
            email,
            message: 'Vui lòng nhập mật khẩu mới của bạn'
        });
    } else {
        return res.render('forgotPassword', {
            message: 'Liên kết reset đã quá hạn. Vui lòng nhập lại địa chỉ email',
        })
    }
})

Router.post('/reset', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    if (password != confirmPassword) {
        return res.render('resetPassword', {
            email,
            message: 'Xác nhận mật khẩu không trùng với mật khẩu đã nhập',
            type: 'alert-danger'
        })
    }
    controller.getUserByEmail(email)
        .then(user => {
            if (user) {
                user.password = password;
                controller.updatePassword(user);
                return res.render('resetPassword', {
                    done: 1
                })
            } else {
                return res.redirect('/users/reset-password')
            }
        })
})

module.exports = Router;