var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    barcode: String,
    name: String,
    unit: String,
    price: Number,
});

var Item = mongoose.model('Item', itemSchema);
module.exports = Item;