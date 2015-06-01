//load express to build restful server
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = '12340';
//read loki database 
//database file : mydatabase.json
var loki = require('lokijs')
var lokidb = new loki('mydatabase.json');
var shop, company, menu;

lokidb.loadDatabase({}, loadDBSuccess);



function loadDBSuccess() {
    console.log('initial lokijs Database success');

    shop = lokidb.getCollection('shop');
    company = lokidb.getCollection('company');
    menu = lokidb.getCollection('menu');

    if (shop === null) {
        shop = lokidb.addCollection('shop');
    }
    if (company === null) {
        company = lokidb.addCollection('company');
    }
    if (menu === null) {
        menu = lokidb.addCollection('menu');
    }

    console.log('load shop items', shop.idIndex.length);
    console.log('load company items', company.idIndex.length);
    console.log('load menu items', menu.idIndex.length);

    app.listen(port);
    console.log('app start port:' + port);
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
    res.sendfile(filePath + 'index2.html');
}
app.get('/', pageIndex);

//給 location 取得附近的店家資訊
app.post('/api/location/', function (req, res) {
    console.time('locationFindShop');
    console.log(req.body);
    var lat = req.body.lat || 0;
    var lng = req.body.lng || 0;
    var offset = req.body.offset || 0;
    var return_list = shop.chain().find().sort(sortByLocation).offset(offset).limit(30).data();

    function sortByLocation(obj1, obj2) {
        var dif_obj1 = Math.abs(obj1.lat - lat) + Math.abs(obj1.lng - lng);
        var dif_obj2 = Math.abs(obj2.lat - lat) + Math.abs(obj2.lng - lng);
        if (dif_obj1 > dif_obj2) {
            return 1;
        }
        if (dif_obj1 < dif_obj2) {
            return -1;
        }
        return 0;
    }
    console.timeEnd('locationFindShop');
    res.json(return_list);
});

//給店家id取得菜單
app.get('/api/:shop_id/', function (req, res) {
    var shop_id = req.params.shop_id;
    console.log(shop_id);
    var shop_data = shop.get(shop_id);
    console.log(shop_data);
    res.json({});
});