'use strict';

let express = require('express');
let dbAccess = require('../db-access');
let router = express.Router();
let CART = 'cart';

router.get('/', function(req, res) {
    dbAccess.readAllData(CART, carts => {
        let context = carts.map(cart => {
            return {
                barcode: cart.barcode,
                count: cart.count
            };
        });
        res.json(200, context);
    })
});

router.get('/:barcode', function(req, res) {
    let barcode = req.params.barcode;
    dbAccess.readData(CART, {barcode: barcode}, cart => {
        let context = {
            barcode: cart.barcode,
            count: cart.count
        };
        res.json(200, context);
    });
});

router.post('/', function(req, res) {
    let cart = JSON.parse(req.body.cart);
    dbAccess.createData(CART, cart, data => {
        let context = {
            barcode: data.barcode,
            count: data.count
        };
        res.json(200, context);
    });
});

router.patch('/:barcode', function(req, res) {
    let cart = JSON.parse(req.body.cart);
    let barcode = req.params.barcode;
    dbAccess.updateData(CART, {barcode: barcode}, cart, state => {
        res.json(200, state);
    });
});

router.delete('/:barcode', function(req, res) {
    let barcode = req.params.barcode;
    dbAccess.deleteData(CART, {barcode: barcode}, state => {
        res.json(200, state);
    });
});

router.delete('/', function(req, res) {
    dbAccess.deleteAllData(CART, state => {
        res.json(200, state);
    });
});

module.exports = router;
