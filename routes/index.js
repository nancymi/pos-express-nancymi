var express = require('express');
var Item = require('./models/item');
var router = express.Router();
var Promotion = require('./models/promotion');

//router.get('/', function(req, res, next) {
//
//  res.render('index');
//  next();
//});

router.get('/', function(req, res, err) {
  var context = {
    items: undefined,
    promotions: undefined
  };

  Item.find((err, items) => {
    if (err) {
      console.error(err);
    } else {
      context.items = items.map(item => {
        return {
          barcode: item.barcode,
          name: item.name,
          unit: item.unit,
          price: item.price
        };
      });
    }
  });

  Promotion.find((err, promotions) => {
    if (err) {
      console.error(err);
    } else {
      context.promotions = promotions.map(promotion => {
        return {
          type: promotion.type,
          describe: promotion.describe,
          barcodes: promotion.barcodes
        };
      });
    }
    res.send({itemsAndPromorions: context});
  });
});

module.exports = router;