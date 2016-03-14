'use strict';

let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {

  console.log(req.ip);
  res.render('index');
  next();
});

router.get('/cart', function(req, res, next) {
  console.log(req.ip);
  res.render('cart');
});

router.get('/receipt', function(req, res, next) {
  console.log(req.ip);
  res.render('receipt');
});

router.get('/history', function(req, res, next) {
  console.log(req.ip);
  res.render('history');
});

module.exports = router;