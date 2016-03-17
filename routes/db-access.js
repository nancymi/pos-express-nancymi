'use strict';

let Item = require('./models/item');
let Cart = require('./models/cart');
let Receipt = require('./models/receipt');
let History = require('./models/history');
let Promotion = require('./models/promotion');

let ITEM = 'item', CART = 'cart', RECEIPT = 'receipt', HISTORY = 'history', PROMOTION = 'promotion';

function createData(type, obj, callback) {
    let createContext;
    switch (type) {
        case ITEM: createContext = new Item(obj); break;
        case CART: createContext = new Cart(obj); break;
        case RECEIPT: createContext = new Receipt(obj); break;
        case HISTORY: createContext = new History(obj); break;
        case PROMOTION: createContext = new Promotion(obj); break;
        default: throw `type ${type} is illegal`;
    }
    console.log(createContext);
    createContext.save((err, data) => {
        if (err) {
            throw `add ${type} false: ${obj}`;
        } else {
            callback(data);
        }
    })
}

function readData(type, keyword, callback) {
    let ContextModel;
    switch (type) {
        case ITEM: ContextModel = Item; break;
        case CART: ContextModel = Cart; break;
        case RECEIPT: ContextModel = Receipt; break;
        case HISTORY: ContextModel = History; break;
        case PROMOTION: ContextModel = Promotion; break;
        default: throw `type ${type} is illegal`;
    }
    ContextModel.findOne(keyword, (err, data) => {
        if (err) {
            throw `read ${type} error: ${err}`;
        } else {
            callback(data);
        }
    });
}

function readAllData(type, callback) {
    let ContextModel;
    switch (type) {
        case ITEM: ContextModel = Item; break;
        case CART: ContextModel = Cart; break;
        case RECEIPT: ContextModel = Receipt; break;
        case HISTORY: ContextModel = History; break;
        case PROMOTION: ContextModel = Promotion; break;
        default: throw `type ${type} is illegal`;
    }
    ContextModel.find((err, data) => {
        if (err) {
            throw `read ${type} error: ${err}`;
        } else {
            callback(data);
        }
    });
}

function updateData(type, keyword, obj, callback) {
    let ContextModel;
    switch (type) {
        case ITEM: ContextModel = Item; break;
        case CART: ContextModel = Cart; break;
        case RECEIPT: ContextModel = Receipt; break;
        case HISTORY: ContextModel = History; break;
        case PROMOTION: ContextModel = Promotion; break;
        default: throw `type ${type} is illegal`;
    }
    console.log(keyword);
    if (keyword) {
        ContextModel.update(keyword, obj, (err, data) => {
            callback(data);
        });
    } else {
        deleteAllData(type, unuse => {
            createData(type, obj, data => {
                callback(data);
            })
        });
    }
}

function deleteData(type, keyword, callback) {
    let ContextModel;
    switch (type) {
        case ITEM: ContextModel = Item; break;
        case CART: ContextModel = Cart; break;
        case RECEIPT: ContextModel = Receipt; break;
        case HISTORY: ContextModel = History; break;
        case PROMOTION: ContextModel = Promotion; break;
        default: throw `type ${type} is illegal`;
    }
    ContextModel.remove(keyword, (err, data) => {
        if (err) {
            throw `delete ${type} error: ${err}`;
        } else {
            callback(data.result);
        }
    });
}

function deleteAllData(type, callback) {
    let ContextModel;
    switch (type) {
        case ITEM: ContextModel = Item; break;
        case CART: ContextModel = Cart; break;
        case RECEIPT: ContextModel = Receipt; break;
        case HISTORY: ContextModel = History; break;
        case PROMOTION: ContextModel = Promotion; break;
        default: throw `type ${type} is illegal`;
    }
    ContextModel.remove((err, data) => {
        if (err) {
            throw `delete ${type} error: ${err}`;
        } else {
            callback(data.result);
        }
    });
}

exports.createData = createData;
exports.updateData = updateData;
exports.readData = readData;
exports.deleteData = deleteData;
exports.readAllData = readAllData;
exports.deleteAllData = deleteAllData;
