/**
 * Created by yangbingxun on 2017/4/6.
 */
var express = require('express');
var router = express.Router();
var fs=require('fs');
var iconv=require('iconv-lite');

/* GET users listing. */
router.get('/', function(req, res, next) {
    Date.prototype.couldRegister=function(year,month,day){
        if(year!=2017) return false;
        if(month<4||month>5) return false;
        if(month==4)
            if(day<15)
                return false
        if(month==5)
            if(day>6)
                return false
        return true;
    }

    var date=new Date();
    if(date.couldRegister(date.getFullYear(),date.getMonth()+1,date.getDate()))
    // if(date.couldRegister(2017,4,15))
        res.sendFile(require('path').resolve(__dirname,'..')+'/public/register.html');
    else
        res.end('现在还不是报名时间！')
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