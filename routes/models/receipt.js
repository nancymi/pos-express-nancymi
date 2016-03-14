var mongoose = require('mongoose');
var CartItem = require('./cartitem');

var receiptSchema = mongoose.Schema({
    cartItems: [CartItem],
    totalNormalPrice: Number,
    totalPromoPrice: Number,
});

var Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;