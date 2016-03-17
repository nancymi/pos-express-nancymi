var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '没钱赚商店' });
});

router.get('/cart', function(req, res, next) {
  res.render('cart');
});

router.get('/receipt', function(req, res, next) {
  res.render('receipt');
});

router.get('/history', function(req, res, next) {
  res.render('history');
});

module.exports = router;
