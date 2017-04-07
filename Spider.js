/**
 * Created by yangbingxun on 2017/4/7.
 */
var http = require('http');
var fs = require('fs');
var iconv=require('iconv-lite');

var SCHOOLS=[];
var index=1;

function getHtml(url,callback){
    var json='';
    http.get(url,function (res) {
        res.on('data',function(data){
            json+=data;
        })

        res.on('end',function(){
            var json_=json.substring(json.indexOf('{'),json.length-2);
            callback(json_);
            if(index==11){
                writeToFile();
                console.log('ok');
            }
        })
    })
}

function makeUrl(page){
    page=page||1;
    var hostUrl='http://data.api.gkcx.eol.cn/soudaxue/queryschool.html?messtype=jsonp&province=%E6%B5%99%E6%B1%9F&schooltype=&page='+page+'&size=10&keyWord1=&schoolprop=&schoolflag=&schoolsort=&schoolid=&callback=jQuery183024310024875105607_1491567049865&_=1491567055574'
    return hostUrl;
}

function getResultJson(data){
    var json=eval('('+data+')');
    var schools=json.school;
    schools.forEach(function(school){
        SCHOOLS.push(school.schoolname);
    })
    index++;
}

function start() {
    var url;
    for(var i=1;i<=11;i++){
        url=makeUrl(i);
        getHtml(url,getResultJson)
    }
}

function writeToFile(){
    var file='schools.json'
    var data=iconv.encode(JSON.stringify(SCHOOLS),'gbk');
    fs.appendFile(file,data,function (err) {
        if(err)
            console.log(err)
    })
    // console.log('end')
}
start();