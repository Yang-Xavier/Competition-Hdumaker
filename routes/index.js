var express = require('express');
var router = express.Router();


/* GET home page. */

router.get('/', function(req, res, next) {
    res.sendFile(require('path').resolve(__dirname,'..')+'/public/index_.html');
});

module.exports = router;
