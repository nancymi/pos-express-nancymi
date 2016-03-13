var mongoose = require('mongoose');

var cartitemSchema = mongoose.Schema({
    item: Item,
    count: Number,
    normalPrice: Number,
    promoPrice: Number,
});

var CartItem = mongoose.model('CartItem', cartitemSchema);

module.exports = CartItem;