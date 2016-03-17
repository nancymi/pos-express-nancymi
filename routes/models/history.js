var mongoose = require('mongoose');

var historySchema = mongoose.Schema({
    timestamp: String,
    receipt: {
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
    }
});

var History = mongoose.model('History', historySchema);

module.exports = History;