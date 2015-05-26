var express = require('express');

var app = express();

app.all('/', function (req, res, next) {
    console.log('我會先被執行');
    next();
});

app.get('/', function (req, res) {
    console.log('接下來是我會被執行');
    res.send('hello world');
});

var cb0 = function (req, res, next) {
    console.log('會員資料處理');
    next();
}

var cb1 = function (req, res, next) {
    console.log('寄了一百封信');
    next();
}

var cb2 = function (req, res) {
    res.send('處理完成!!');
}

app.get('/user_handler', cb0, cb1, cb2);

// a middleware with no mount path; gets executed for every request to the app
app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

// a middleware mounted on /user/:id; will be executed for any type of HTTP request to /user/:id
app.use('/user/:id', function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
});

// a route and its handler function (middleware system) which handles GET requests to /user/:id
app.get('/user/:id', function (req, res, next) {
    res.send('USER');
});

app.listen(3000);