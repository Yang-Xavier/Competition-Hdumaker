/**
 * Created by yangbingxun on 2017/4/6.
 */
var express = require('express');
var router = express.Router();

router.get('/report/hdumaker@2016', function(req, res, next) {
    var file=require('path').resolve(__dirname,'..')+'/form/report'
    res.download(file,'report.xls')
});

module.exports = router;