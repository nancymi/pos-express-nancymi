'use strict';

let express = require('express');
let Item = require('./../models/item');
let router = express.Router();

router.get('/', function(req, res, err) {
    let context = {
        items: null,
        promotions: null
    };

    Item.find((err, items) => {
        if (err) {
            console.error(err);
        } else {
            let context = items.map(item => {
                return {
                    barcode: item.barcode,
                    name: item.name,
                    unit: item.unit,
                    price: item.price
                };
            });
            res.json(200, {items: context});
        }
    });
});

module.exports = router;