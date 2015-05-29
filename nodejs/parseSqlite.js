var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('drink.db');

var loki = require('lokijs')
var lokidb = new loki('mydatabase.json');

var atob = require('atob');
var count = 0;

var shop = lokidb.addCollection('shop');
var company = lokidb.addCollection('company');

function queryHandler(err, rows) {
    console.log(rows.length);
    var company_object = {};

    for (var i in rows) {
        var row = rows[i];
        var shop_object = {
            company: row.ITEM_COMMENT,
            name: row.ITEM_NAME,
            city: row.ITEM_COUNTY,
            area: row.ITEM_SECTION,
            phone: atob(atob(row.ITEM_PHONE)),
            address: row.ITEM_ADDRESS,
            lat: row.ITEM_LATITUDE,
            lng: row.ITEM_LONGITUDE
        };
        shop.insert(shop_object);
        company_object[shop_object.company] = true;
    }
    var company_list = Object.keys(company_object);

    for (var j in company_list) {
        var company_name = company_list[j];
        var data_company = {
            name: company_name
        }
        company.insert(data_company);
    }

    lokidb.save();
}


db.serialize(function () {
    db.all('select * from finddrink where ITEM_COMMENT not like "%結束營業%" and ITEM_FOODTYPE = "茶飲連鎖"', queryHandler);
});