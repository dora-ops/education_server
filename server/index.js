const loginApi = require('./api/loginApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.all('*', function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "http://192.168.0.105:8080"); //为了跨域保持session，所以指定地址，不能用*    
    res.header("Access-Control-Allow-Origin", "http://localhost:9528"); //为了跨域保持session，所以指定地址，不能用*
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// 后端api路由
app.use('/api/login', loginApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');