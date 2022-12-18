const controller = {} //Để {} vì là object có thể chứa thêm các hàm khác
let models = require('../models')
let User = models.TaiKhoan;
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken')
const SECRET_KEY = "qwertyuiopasdfghjkl";
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

controller.createJWT = (email) => {
    return jwt.sign({
        email
    },
        SECRET_KEY,
        {
            expiresIn: "30m"
        }
    )
}

controller.verifyJWT = (token) => {
    try {
        jwt.verify(token, SECRET_KEY);
        return true;
    } catch (error) {
        return false;
    }
}

controller.sendResetPasswordMail = (user, host, url) => {
    const Mailjet = require('node-mailjet');
    const mailjet = Mailjet.apiConnect(
        process.env.MJ_APIKEY_PUBLIC || 'e4581f950320d261cac2aad9cc75c453',
        process.env.MJ_APIKEY_PRIVATE || '81b78a49dfb2165685b478652db78aa4',
    );

    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "nhom5.20ktpm4@gmail.com",
                        Name: "Ticket4T"
                    },
                    To: [
                        {
                            Email: user.email,
                            Name: user.fullName
                        }
                    ],
                    Subject: "Reset Password",
                    //   TextPart: "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
                    HTMLPart: `
              <p>Hi ${user.fullName}</p>,
              
              <p>You recently requested to reset the password for your ${host} account. 
              Click the link below to proceed.</p>
              <br/>
              <p><a href="${url}   ">Reset password</a></p>
              <br/>
              <p>If you did not request a password reset, please ignore this email or reply to let us know. This password reset link is only valid for the next 30 minutes.</p>
              <br/>
              <p>Thanks,</p>
              <p> Ticket4T</p>`
                }
            ]
        })
    return request;
}

controller.updatePassword = (user) => {
    var salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    return User.update({
        password: user.password
    }, {
        where: {
            id: user.id
        }
    });
}

module.exports = controller;