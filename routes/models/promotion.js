var mongoose = require('mongoose');

var promotionSchema = mongoose.Schema({
    type: String,
    describe: String,
    barcodes: [{
        barcode: String
    }]
});

var Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;