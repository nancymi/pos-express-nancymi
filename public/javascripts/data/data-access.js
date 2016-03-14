function loadItems(callback) {
    $.get('/get-items', data => {
        callback(data || []);
    });
}

function loadPromotions(callback) {
    $.get('/get-promotions', data => {
        callback(data || []);
    });
}

function storeCart(cart) {
    //$.post('/get-promotions', )
}

function loadCart(callback) {
    $.get('/get-cart', data => {
        callback(data || []);
    });
}
//
function clearCart() {
    $.delete()
}
//
//function storeReceipt(receipt) {
//    var receiptJson = objectToJson(receipt);
//    storeToWindow("receipt", receiptJson);
//}
//
function loadReceipt(callback) {
    $.get('/receipt', data => {
        callback(data || []);
    });
}
//
//function clearReceipt() {
//    clearInWindow("receipt");
//}
//
//function storeHistory(timestamp, receipt) {
//
//    var historyJson = loadFromWindow("history");
//    var history = jsonToObject(historyJson) || [];
//
//    history.push({
//        timestamp: timestamp,
//        receipt: receipt
//    });
//    storeToWindow("history", objectToJson(history));
//}
//
function loadHistory(callback) {
    $.get('/history', data => {
        callback(data || []);
    });
}
//
//function clearHistory() {
//    clearInWindow("history");
//}

function jsonToObject(jsonStr) {
    var obj = JSON.parse(jsonStr);
    return obj;
}

function objectToJson(obj) {
    var jsonStr = JSON.stringify(obj);
    return jsonStr;
}