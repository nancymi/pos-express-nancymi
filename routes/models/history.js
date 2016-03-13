var mongoose = require('mongoose');

var historySchema = mongoose.Schema({
    timestamp: String,
    receipt: Receipt,
});

var History = mongoose.model('History', historySchema);

module.exports = History;