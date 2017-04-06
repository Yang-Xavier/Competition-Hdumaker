/**
 * Created by yangbingxun on 2017/4/6.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.sendFile(require('path').resolve(__dirname,'..')+'/public/register.html');
});
router.post('/',function(req,res,next){

})
module.exports = router;