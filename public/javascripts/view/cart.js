var cartsStag = [];
var itemsStag = [];


$(document).ready(function() {
    initData(function() {
        receipt = generateReceipt(cartsStag, itemsStag);
        showCart(receipt);
    });
});

function initData(callback) {
    service.loadItems(items => {
        itemsStag = items;
        service.loadCarts(carts => {
            cartsStag = carts;
            callback();
        });
    });
}

function showCart(receipt) {
    $("#cart-items").html(generateCartItemsHtml(receipt.cartItems));
    $("#total-normal-price").html("<h4>总计: " + receipt.totalPromoPrice.toFixed() +  " 元</h4>");
    $("#total-promo-price").html("<h4>共优惠: " + (receipt.totalNormalPrice - receipt.totalPromoPrice).toFixed(2) + " 元</h4>");
    addEvent();
}

function addEvent() {
    $("input").change(function() {
        var count = $(this).val() || 0;
        var barcode = $(this).attr('data-barcode');
        service.updateCart(barcode, count, state => {
            if(state.ok === 1) {
                service.loadCarts(carts => {
                    cartsStag = carts;
                    receipt = generateReceipt(cartsStag, itemsStag);
                    showCart(receipt);
                });
            }
        });
    });

    $(".delete-button").click(function() {
        var barcode = $(this).attr('data-barcode');
        updateCart(barcode);
        receipt = generateReceipt(loadCart(), loadItems());
        showCart(receipt);
    });

    $("#checkout-button").click(function() {
        service.createReceipt(receipt, state => {
            if (state.ok === 1) {
                service.createHistory({timestamp: (new Date()).valueOf(), receipt: receipt}, history => {
                    service.clearCarts(state => {
                        if (state.ok === 1) {
                            document.location.href = '/receipt';
                        }
                    });
                });
            }
        });
    });

    $("#back-button").click(function() {
        document.location.href = '/index';
    });
}

function generateCartItemsHtml(cartItemList) {
    var cartItemsHtml = '<tr><td>名称</td><td>单价</td><td>数量</td><td>价格</td><td>删除</td></tr>';
    cartItemsHtml += cartItemList.map(function(cartItem) {
        var cartItemHtml = '<tr class="cart-item">' +
            '<td>' + cartItem.item.name + '</td>' +
            '<td>' + cartItem.item.price.toFixed(2) + ' 元/' + cartItem.item.unit + '</td>' +
            '<td align="center"><input data-barcode="' +
            cartItem.item.barcode + '" type="text" class="form-control" aria-describedby="sizing-addon3" value="' +
            cartItem.count + '" style="width: 60px"></td>' +
            '<td>' + cartItem.promoPrice.toFixed(2) + '</td>' +
            '<td><a class="delete-button button button-glow button-border button-rounded button-circle button-primary" data-barcode="' + cartItem.item.barcode +
            '"> <i class="fa fa-trash"></i></a></td>' +
            '<tr/>';
        return cartItemHtml;
    }).join('');

    return cartItemsHtml;
}