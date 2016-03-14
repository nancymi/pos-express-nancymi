var mongoose = require('mongoose');
var Item = require('./item');

var cartitemSchema = mongoose.Schema({
    item: Item,
    count: Number,
    normalPrice: Number,
    promoPrice: Number,
});

var CartItem = mongoose.model('CartItem', cartitemSchema);

module.exports = CartItem;