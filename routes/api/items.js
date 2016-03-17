'use strict';

let express = require('express');
let dbAccess = require('../db-access');
let router = express.Router();
let ITEM = 'item';

router.get('/', function(req, res) {
    dbAccess.readAllData(ITEM, items => {
        let context = items.map(item => {
            return {
                barcode: item.barcode,
                unit: item.unit,
                name: item.name,
                price: item.price
            };
        });
        res.json(200, context);
    })
});

router.get('/:barcode', function(req, res) {
    let barcode = req.params.barcode;
    dbAccess.readData(ITEM, {barcode: barcode}, item => {
        let context = {
            barcode: item.barcode,
            unit: item.unit,
            name: item.name,
            price: item.price
        };
        res.json(200, context);
    });
});

router.post('/', function(req, res) {
    let item = JSON.parse(req.body.item);
    console.log(item);
    dbAccess.createData(ITEM, item, data => {
        let context = {
            barcode: data.barcode,
            unit: data.unit,
            name: data.name,
            price: data.price
        };
        res.json(200, context);
    });
});

router.patch('/:barcode', function(req, res) {
    let item = JSON.parse(req.body.item);
    let barcode = req.params.barcode;
    dbAccess.updateData(ITEM, {barcode: barcode}, item, state => {
        res.json(200, state);
    });
});

router.delete('/:barcode', function(req, res) {
    let barcode = req.params.barcode;
    dbAccess.deleteData(ITEM, {barcode: barcode}, state => {
        res.json(200, state);
    });
});

router.delete('/', function(req, res) {
    dbAccess.deleteAllData(ITEM, state => {
        res.json(200, state);
    });
});

module.exports = router;
