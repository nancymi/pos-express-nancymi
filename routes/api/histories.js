'use strict';

let express = require('express');
let dbAccess = require('../db-access');
let router = express.Router();
let HISTORY = 'history';

router.get('/', function(req, res) {
    dbAccess.readAllData(HISTORY, histories => {
        let context = histories.map(history => {
            console.log(history);
            return {
                timestamp: history.timestamp,
                receipt: history.receipt
            };
        });
        res.json(200, context);
    })
});

router.get('/:timestamp', function(req, res) {
    let timestamp = req.params.timestamp;
    dbAccess.readData(HISTORY, {timestamp: timestamp}, history => {
        let context = {
            timestamp: history.timestamp,
            receipt: history.receipt
        };
        res.json(200, context);
    });
});

router.post('/', function(req, res) {
    console.log(history);
    dbAccess.createData(HISTORY, history, data => {
        let context = {
            timestamp: data.timestamp,
            receipt: data.receipt
        };
        res.json(200, context);
    });
});

router.patch('/:timestamp', function(req, res) {
    let history = JSON.parse(req.body.history);
    let timestamp = req.params.timestamp;
    dbAccess.updateData(HISTORY, {timestamp: timestamp}, history, state => {
        res.json(200, state);
    });
});

router.delete('/:timestamp', function(req, res) {
    let timestamp = req.params.timestamp;
    dbAccess.deleteData(HISTORY, {timestamp: timestamp}, state => {
        res.json(200, state);
    });
});

router.delete('/', function(req, res) {
    dbAccess.deleteAllData(HISTORY, state => {
        res.json(200, state);
    });
});

module.exports = router;
