$(document).ready(function() {
    receipt = loadReceipt();
    showReceipt(receipt);
    service.loadReceipt(receipt => {
        showReceipt(receipt);
    })
});

function showReceipt(receipt) {
    $("#receipt-items").html(generateReceiptItemsHtml(receipt.cartItems));
    $("#total-normal-price").html("<h4>总计: " + receipt.totalPromoPrice.toFixed() +  " 元</h4>");
    $("#total-promo-price").html("<h4>共优惠: " + (receipt.totalNormalPrice - receipt.totalPromoPrice).toFixed(2) + " 元</h4>");
}

function generateReceiptItemsHtml(cartItemList) {
    var receiptItemsHtml = '<tr><td>名称</td><td>单价</td><td>数量</td><td>价格</td></tr>';

    receiptItemsHtml += cartItemList.map(function(cartItem) {
        var receiptItemHtml = '<tr class="receipt-item">' +
            '<td>' + cartItem.item.name + '</td>' +
            '<td>' + cartItem.item.price.toFixed(2) + ' 元/' + cartItem.item.unit + '</td>' +
            '<td>' + cartItem.count + '</td>' +
            '<td>' + cartItem.promoPrice.toFixed(2) + ' 元</td>' +
            '</tr>';

        return receiptItemHtml;
    }).join('');

    return receiptItemsHtml;
}