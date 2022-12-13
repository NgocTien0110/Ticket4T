const express = require('express');
const app = express();
const expressHbs = require('express-handlebars');
const paginateHelper = require('express-handlebars-paginate');
const helper = require('./controllers/helper');

app.engine('hbs', expressHbs.engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers: {
        date: helper.date,
        date1: helper.date1,
        time: helper.time,
        totalTime: helper.totalTime,
        totalPrice: helper.totalPrice,
        generateStarList: helper.generateStarList,
        formatPrice: helper.formatPrice,
        starNhanXet: helper.starNhanXet,
        generateStarListFont2: helper.generateStarListFont2,
        createPagination: paginateHelper.createPagination,
        simpleMath: helper.simpleMath,
        createNextPreviousPagination: helper.createNextPreviousPagination,
        createReviewPagination: helper.createReviewPagination,
        createNextPrevTicketPagination: helper.createNextPrevTicketPagination,
        createTicketPagination: helper.createTicketPagination,
        SearchTripPagination: helper.SearchTripPagination
    },
    runtimeOptions: { //Để cho phép hbs truy cập đc vào database
        allowProtoPropertiesByDefault: true
    }
}))

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public')); //Mặc định web tĩnh ở trong thư mục public

//Use Body Parser
let bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Use Cookie-parser
let cookieParser = require('cookie-parser')
app.use(cookieParser());

//Use Session
let session = require('express-session');
app.use(session({
    cookie: { httpOnly: true, maxAge: null },
    secret: 'S3cret',
    resave: false,
    saveUninitialized: false
}))

app.use((req, res, next) => {
    res.locals.fullName = req.session.user ? req.session.user.fullName : '';
    res.locals.isLoggedIn = req.session.user ? true : false;
    res.locals.avatar = req.session.user ? req.session.user.imageAccount : '';
    next();
})

app.use('/', require('./routes/indexRoute'))
app.use("/search-trip", require("./routes/search-tripRoute"));
app.use('/tai-khoan', require('./routes/taikhoanRoute'))
app.use('/users', require('./routes/userRoute'))
app.use('/reset-password', require('./routes/resetPasswordRoute'))
app.use('/nha-xe', require('./routes/nhaxeRoute'))
app.use('/about', require('./routes/aboutRoute'))



app.get('/createTables', (req, res) => {
    let models = require('./models');
    models.sequelize.sync().then(() => { //Tạo bảng ở trong postgres
        res.send("tables created");
    })
})

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(`server is listening on port ${app.get('port')}`);
})