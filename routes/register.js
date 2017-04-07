/**
 * Created by yangbingxun on 2017/4/6.
 */
var express = require('express');
var router = express.Router();
var fs=require('fs');
var iconv=require('iconv-lite');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.sendFile(require('path').resolve(__dirname,'..')+'/public/register.html');
});
router.post('/',function(req,res,next){
    var data=req.body.data;
    var jsonData=eval('('+data+')');
    var file=require('path').resolve(__dirname,'..')+'/form/report'



    var appendData=jsonToForm(jsonData);

    appendData=iconv.encode(appendData,'gbk')

    fs.appendFile(file,appendData,function(err){
        if(err){
            console.log('append',err);
        }
        res.end('ok');
    })
})
function jsonToForm(json){
    var data='',
        hasArray=false;
    for(var key in json){
        if(typeof json[key] === 'object'){
            hasArray=key;
        }
        else{
            data=data+json[key]+'\t'
        }
    }

    if(hasArray){
        for(var member in json[hasArray]){
            for(var key in json[hasArray][member]){
                data=data+json[hasArray][member][key]+'\t'
            }
        }
    }
    data=data+'\t\r\n';
    return data;
}
module.exports = router;