'use strict';

let express = require('express');
let dbAccess = require('../db-access');
let router = express.Router();
let PROMOTION = 'promotion';

router.get('/', function(req, res) {
    dbAccess.readAllData(PROMOTION, promotions => {
        let context = promotions.map(promotion => {
            return {
                type: promotion.type,
                describe: promotion.describe,
                barcodes: promotion.barcodes
            };
        });
        res.json(200, context);
    })
});

router.get('/:type', function(req, res) {
    let type = req.params.type;
    dbAccess.readData(PROMOTION, {type: type}, promotion => {
        let context = {
            type: promotion.type,
            describe: promotion.describe,
            barcodes: promotion.barcodes
        };
        res.json(200, context);
    });
});

router.post('/', function(req, res) {
    let promotion = JSON.parse(req.body.promotion);
    console.log(promotion);
    dbAccess.createData(PROMOTION, promotion, data => {
        let context = {
            type: data.type,
            describe: data.describe,
            barcodes: data.barcodes
        };
        res.json(200, context);
    });
});

router.patch('/:type', function(req, res) {
    let promotion = JSON.parse(req.body.promotion);
    let type = req.params.type;
    dbAccess.updateData(PROMOTION, {type: type}, promotion, state => {
        res.json(200, state);
    });
});

router.delete('/:type', function(req, res) {
    let type = req.params.type;
    dbAccess.deleteData(PROMOTION, {type: type}, state => {
        res.json(200, state);
    });
});

router.delete('/', function(req, res) {
    dbAccess.deleteAllData(PROMOTION, state => {
        res.json(200, state);
    });
});

module.exports = router;
