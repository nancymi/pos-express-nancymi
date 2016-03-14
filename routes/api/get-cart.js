'use strict';

var express = require('express');
var Cart = require('./../models/cart');
var router = express.Router();

router.get('/', (req, res, err) => {
    Cart.find((err, cart) => {
        if (err) {
            console.error(err);
        } else {
            res.send(cart);
        }
    });
});

router.post('/', (req, res, err) => {

});

module.exports = router;