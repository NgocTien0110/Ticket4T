const express = require('express');
const app = express();
const expressHbs = require('express-handlebars')

app.engine('hbs', expressHbs.engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    runtimeOptions: { //Để cho phép hbs truy cập đc vào database
        allowProtoPropertiesByDefault: true
    }
}))

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public')); //Mặc định web tĩnh ở trong thư mục public

app.use('/', require('./routes/indexRoute'))

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