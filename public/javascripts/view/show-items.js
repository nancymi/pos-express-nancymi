'use strict';

$("#items").ready( ()=> {
    var items;
    var promotions;
    loadItems(data => {
        items = data.items;
        loadPromotions(data => {
            promotions = data.promotions;
            showItems(items, promotions);
            addEvent();
        });
    });
});

function addEvent() {
    var addButtons = document.getElementsByClassName('add-button');
    for (var i = 0; i < addButtons.length; i ++) {
        var barcode = $(addButtons[i]).attr('data-barcode');
        updateButtonStyle(addButtons[i], barcode, []);
    }

    $(".add-button").click(function() {
        var barcode = $(this).attr('data-barcode');
        updateCart(barcode);
        loadCart((data) => {
            var cart = data || [];
            showCartSum(cart);
            updateButtonStyle(this, barcode, cart);
        });
    });

    $("#cart-button").click(function() {
        jump(document, 'cart');
    });

    $("#history-button").click(function() {
        jump(document, 'history');
    });
}

function updateButtonStyle(button, barcode, cart) {
    let cartJson = objectToJson(cart);
    if (cartJson.indexOf(barcode) > -1) {
        button.className = 'add-button button button-glow button-border button-raised button-circle button-primary';
    } else {
        button.className = 'add-button button button-glow button-border button-rounded button-circle button-primary';
    }
}

function showItems(items) {
    var itemsHtml = '<tr><td><h3>名称</h3></td><td><h3>单价</h3></td><td><h3>促销活动</h3></td><td><h3>添加</h3></td></tr>';
    itemsHtml += items.map(generateItemHtml).join('');
    $("#items").html(itemsHtml);
}

function generateItemHtml(item, promotions) {

    var promotion = '';
    for (var i = 0; i < promotions.length; i ++) {
        for (var j = 0; j < promotions[i].barcodes.length; j ++) {
            if (promotions[i].barcodes[j].barcode === item.barcode) {
                promotion = promotions[i].describe;
                break;
            }
        }
    }

    var itemHtml = '<tr class="item"><td><h4>' + item.name + '</h4></td><td><h4>' + item.price.toFixed(2) + ' 元/' + item.unit + '</h4></td>' +
        '<td><h4>' + promotion + '</h4></td><td>'+
        '<a class="add-button button button-glow button-border button-rounded button-circle button-primary" data-barcode="' + item.barcode + '">' +
        '+' +
        '</a>'+
        '</td></tr>';

    return itemHtml;
}

function showCartSum(cart) {
    $("#cart-sum").html(cart.length);
}
