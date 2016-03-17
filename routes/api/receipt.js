'use strict';

let express = require('express');
let dbAccess = require('../db-access');
let router = express.Router();
let RECEIPT = 'receipt';

router.get('/', function(req, res) {
    dbAccess.readAllData(RECEIPT, receipts => {
        let context = receipts.map(receipt => {
            return {
                cartItems: receipt.cartItems,
                totalNormalPrice: receipt.totalNormalPrice,
                totalPromoPrice: receipt.totalPromoPrice
            };
        });
        res.json(200, context[0]);
    })
});

router.post('/', function(req, res) {
    let receipt = JSON.parse(req.body.receipt);
    dbAccess.createData(RECEIPT, receipt, data => {
        let context = {
            cartItems: data.cartItems,
            totalNormalPrice: data.totalNormalPrice,
            totalPromoPrice: data.totalPromoPrice
        };
        res.json(200, context);
    });
});

router.patch('/', function(req, res) {
    let receipt = JSON.parse(req.body.receipt);
    dbAccess.updateData(RECEIPT, null, receipt, data => {
        let context = {
            cartItems: data.cartItems,
            totalNormalPrice: data.totalNormalPrice,
            totalPromoPrice: data.totalPromoPrice
        };
        res.json(200, context);
    });
});

router.delete('/', function(req, res) {
    dbAccess.deleteAllData(RECEIPT, state => {
        res.json(200, state);
    });
});

module.exports = router;
