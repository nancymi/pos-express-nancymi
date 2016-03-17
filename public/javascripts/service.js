var service = {};

service.loadItems = function (callback) {
    $.get('/api/items', callback);
};

service.loadPromotions = function (callback) {
    $.get('/api/promotions', callback);
};

service.loadCarts = function (callback) {
    $.get('/api/carts', callback);
};

service.loadReceipt = function (callback) {
    $.get('/api/receipt', callback);
};

service.loadHistories = function (callback) {
    $.get('/api/histories', callback);
};

service.createCart = function (cart, callback) {
    $.post('/api/carts', {cart: objectToJson(cart)}).success(callback);
};

service.createReceipt = function (receipt, callback) {
    $.post('/api/receipt', {receipt: objectToJson(receipt)}).success(callback);
};

service.createHistory = function (history, callback) {
    $.post('/api/histories', {history: objectToJson(history)}).success(callback);
};

service.updateCart = function (barcode, count, callback) {
    $.patch(`/api/carts/${barcode}`, {barcode: barcode, count: count}, callback);
};

service.updateReceipt = function(receipt, callback) {
    $.patch('/api/receipt', {receipt: objectToJson(receipt)}).success(callback);
};

service.deleteCart = function(barcode, callback) {
    $.ajax({
        url: `/api/carts/${barcode}`,
        type: 'DELETE',
        success: callback
    });
};

service.deleteReceipt = function(callback) {
    $.ajax({
        url: '/api/receipt',
        type: 'DELETE',
        success: callback
    });
};

service.deleteHistory = function(timestamp, callback) {
    $.ajax({
        url: `/api/histories/${timestamp}`,
        type: 'DELETE',
        success: callback
    });
};

service.clearCarts = function(callback) {
    $.ajax({
        url: 'api/carts',
        type: 'DELETE',
        success: callback
    });
};

service.clearHistories = function(callback) {
    $.ajax({
        url: '/api/histories',
        type: 'DELETE',
        success: callback
    });
};

function jsonToObject(jsonStr) {
    var obj = JSON.parse(jsonStr);
    return obj;
}

function objectToJson(obj) {
    var jsonStr = JSON.stringify(obj);
    return jsonStr;
}