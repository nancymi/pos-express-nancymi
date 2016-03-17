/**
 * Created by nancymi on 16/3/9.
 */
$(document).ready(function() {
    service.loadHistories(hostories => {
        showHistory(histories);
    });
});


function showHistory(history) {
    var historyHtml = '';

    history.forEach(function(dailyReceipt) {
        var dailyReceiptHtml = '<div class="page-header">' +
            '<h3>' + new Date(dailyReceipt.timestamp).toLocaleString() + '</h3></div>';
        dailyReceiptHtml += ('<div class="row">' +
        '<div id="receipt" class="col-md-12" align="center">' +
        '<table class="table table-hover text-center" align="center">' + generateReceiptItemsHtml(dailyReceipt.receipt.cartItems) + '</table>' +
        '<div class="col-md-2 col-md-offset-4">总计: ' + dailyReceipt.receipt.totalPromoPrice.toFixed(2) +  ' 元</div>' +
        '<div class="col-md-2">共优惠: ' + (dailyReceipt.receipt.totalNormalPrice - dailyReceipt.receipt.totalPromoPrice).toFixed(2) + ' 元</div>' +
        '</div>' +
        '</div>');
        historyHtml += dailyReceiptHtml;
    });

    $("#history").html(historyHtml);
}