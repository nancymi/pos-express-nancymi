var mongoose = require('mongoose');

var promotionSchema = mongoose.Schema({
    type: String,
    describe: String,
    barcodes: [String]
});

var Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;