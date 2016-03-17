var mongoose = require('mongoose');

var receiptSchema = mongoose.Schema({
    cartItems: [{
        item: {
            barcode: String,
            name: String,
            unit: String,
            price: Number,
        },
        count: Number,
        normalPrice: Number,
        promoPrice: Number,
    }],
    totalNormalPrice: Number,
    totalPromoPrice: Number,
});

var Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;