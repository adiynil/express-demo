var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    // console.log(req.hostname)
    console.log(req.cookies.name)
    res.cookie('AAAA', req.body.val)
    res.cookie('BBBB', req.body.val, { signed: true })
    req.session.val = req.body.val

    res.json({msg: "success"})
});

module.exports = router;
