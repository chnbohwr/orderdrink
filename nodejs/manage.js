//load express to build restful server
var express = require('express');
var app = express();

//read loki database 
//database file : mydatabase.json
var loki = require('lokijs')
var lokidb = new loki('mydatabase.json');
lokidb.loadDatabase({}, loadDBSuccess);

var shop, company

function loadDBSuccess() {
    console.log('initial lokijs Database success');

    shop = lokidb.getCollection('shop');
    company = lokidb.getCollection('company');
    console.log('load shop items', shop.idIndex.length);
    console.log('load company items', company.idIndex.length);
    if (shop === null) {
        shop = lokidb.addCollection('shop');
    }
    if (company === null) {
        company = lokidb.addCollection('company');
    }

    //express listen 12340 port
    app.listen(12340);
}


//express static www folder 
app.use(express.static('www'));
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