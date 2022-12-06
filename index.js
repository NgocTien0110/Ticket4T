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
        time: helper.time,
        totalTime: helper.totalTime,
        totalPrice: helper.totalPrice,
        generateStarList : helper.generateStarList,
        formatPrice: helper.formatPrice,
        starNhanXet: helper.starNhanXet,
        generateStarListFont2: helper.generateStarListFont2,
        createPagination: paginateHelper.createPagination,
    },
    runtimeOptions: { //Để cho phép hbs truy cập đc vào database
        allowProtoPropertiesByDefault: true
    }
}))

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public')); //Mặc định web tĩnh ở trong thư mục public

app.use('/', require('./routes/indexRoute'))
app.use("/search-trip", require("./routes/search-tripRoute"));
app.use('/tai-khoan', require('./routes/taikhoanRoute'))

app.use('/nhaxe', require('./routes/nhaxeRoute'))

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