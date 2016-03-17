var mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
    barcode: String,
    count: Number
});

var Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;