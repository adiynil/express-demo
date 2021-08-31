var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.session.val)
    // // res.cookie('AAAA', req.body.val)
    // req.session.val = req.query.val
    res.send(req.session.val).end()
});

router.get('/api', function(req, res, next) {
  res.send('respond with a api');
});

module.exports = router;
