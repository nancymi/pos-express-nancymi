'use strict';

let express = require('express');
let Promotion = require('./../models/promotion');
let router = express.Router();
router.get('/', function(req, res, err) {

    Promotion.find((err, promotions) => {
        if (err) {
            console.error(err);
        } else {
            let context = promotions.map(promotion => {
                return {
                    type: promotion.type,
                    describe: promotion.describe,
                    barcodes: promotion.barcodes
                };
            });
            res.json(200, {promotions: context});
        }
    });
});

module.exports = router;