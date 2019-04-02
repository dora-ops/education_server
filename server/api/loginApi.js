var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);
 
conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};


router.get('/login', (req, res) => {
    var selectSql = $sql.login.selectUser;
    var params = req.query;
    conn.query(selectSql, [params.name], function(err, result) {
        if (err) {
            console.log(err);
        }
        if(result){
            if(result[0]==undefined){
                jsonWrite(res,'没有该用户')
            }else{
                if(params.password == result[0].password){
                    jsonWrite(res, result[0]);
                }else{
                    jsonWrite(res, '密码输入错误');
                }
            }
        }
    })
});

module.exports = router;