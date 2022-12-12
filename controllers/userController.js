const controller = {} //Để {} vì là object có thể chứa thêm các hàm khác
let models = require('../models')
let User = models.TaiKhoan;
let bcrypt = require('bcryptjs');

controller.showFormLogin = (req, res) => {
    req.session.returnURL = req.query.returnURL;
    res.render('login');
}

controller.showFormRegister = (req, res) => {
    req.session.returnURL = req.query.returnURL;
    res.render('register');
}

controller.login = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password

    controller
        .getUserByEmail(email)
        .then(user => {
            if (user) {
                if (controller.comparePassword(password, user.password)) {
                    req.session.user = user;
                    if (req.session.returnURL) {
                        return res.redirect(req.session.returnURL)
                    } else {
                        return res.redirect('/')
                    }
                }
                else {
                    return res.render('login', {
                        message: 'Mật khẩu nhập không đúng!!!',
                        type: 'alert-danger'
                    })
                }
            }
            return res.render('login', {
                message: 'Email không tồn tại!!!',
                type: 'alert-danger'
            })
        })
}

controller.logout = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            return next(error);
        }
        return res.redirect('/')
    })
}

controller.getUserByEmail = (email) => {
    return User.findOne({
        where: {
            email: email
        }
    })
}

controller.createUser = (user) => {
    var salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    return User.create(user);
}

controller.register = (req, res, next) => {
    let fullname = req.body.fullname
    let email = req.body.email
    let password = req.body.password
    let confirmPassword = req.body.confirmPassword;

    //Kiểm tra confirm password và password giống nhau
    if (password != confirmPassword) {
        return res.render('register', {
            message: 'Xác nhận mật khẩu không trùng với mật khẩu đã nhập',
            type: 'alert-danger'
        })
    }
    //Kiểm tra username chưa tồn tại
    controller
        .getUserByEmail(email)
        .then(user => {
            if (user) {
                return res.render('register', {
                    message: `Email ${email} đã tồn tại, vui lòng nhập email khác để đăng ký!!!`,
                    type: 'alert-danger'
                })
            }
            user = {
                fullName: fullname,
                email,
                password,
                imageAccount: '/images/default.jpg',
            }

            return controller
                .createUser(user)
                .then(user => {
                    req.session.user = user;
                    if (req.session.returnURL) {
                        return res.redirect(req.session.returnURL)
                    } else {
                        return res.redirect('/')
                    }
                })

        })
}

controller.comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

controller.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect(`/users/login?returnURL=${req.originalUrl}`)
    }
}

module.exports = controller;