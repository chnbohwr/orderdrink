//load express to build restful server
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//read loki database 
//database file : mydatabase.json
var loki = require('lokijs')
var lokidb = new loki('mydatabase.json');
lokidb.loadDatabase({}, loadDBSuccess);

var shop, company, menu;

function loadDBSuccess() {
    console.log('initial lokijs Database success');

    shop = lokidb.getCollection('shop');
    company = lokidb.getCollection('company');
    menu = lokidb.getCollection('menu');

    console.log('load shop items', shop.idIndex.length);
    console.log('load company items', company.idIndex.length);
    console.log('load menu items', menu.idIndex.length);
    if (shop === null) {
        shop = lokidb.addCollection('shop');
    }
    if (company === null) {
        company = lokidb.addCollection('company');
    }
    if (menu === null) {
        menu = lokidb.addCollection('menu');
    }

    //express listen 12340 port
    app.listen(12340);
}


//express static www folder 
app.use(express.static('www'));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

//make variable
var filePath = './www/';


//index.htmlpage
function pageIndex(req, res) {
    console.log('express index send');
    res.sendfile(filePath + 'index.html');
}
app.get('/', pageIndex);




app.get('/api/test/', function (req, res) {
    res.send('ok server got data');
});

app.get('/api/companies/', function (req, res) {
    res.json(company.find());
});

app.post('/api/shops/', function (req, res) {
    var company_id = req.body.company_id;
    res.json(shop.get(company_id));
});

app.get('/api/company/menu/', function (req, res) {
    var company_id = req.param('company_id');
    var temp_menu = menu.find({
        company_id: company_id
    });
    res.json(temp_menu)
});

app.post('/api/company/menu/', function (req, res) {
    var temp_menu = req.body.menu;
    var company_id = req.body.company_id;
    var db_menu = menu.insert(temp_menu);
    var db_comapny = company.get(company_id);
    if (db_comapny.menu_id) {
        menu.remove(db_comapny.menu_id);
    }
    //指定id過去
    db_company.menu = db_menu.$loki;

    res.sendStatus(200);
});