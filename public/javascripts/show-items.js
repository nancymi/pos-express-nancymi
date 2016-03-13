var _ = require('lodash');
var $ = require('jquery');

$("#items").ready( ()=> {
    var items;
    var promotions;
    $.get('/', data => {
        items = data.items;
        promotions = data.promotions;
        showItems(items, promotions);

        var addButtons = document.getElementsByClassName('add-button');
        for (var i = 0; i < addButtons.length; i ++) {
            var barcode = $(addButtons[i]).attr('data-barcode');
            updateButtonStyle(addButtons[i], barcode);
        }

        $(".add-button").click(function() {
            var barcode = $(this).attr('data-barcode');
            updateCart(barcode);
            showCartSum(loadCart());
            updateButtonStyle(this, barcode);
        });

        $("#cart-button").click(function() {
            jump(document, 'cart.html');
        });

        $("#history-button").click(function() {
            jump(document, 'history.html');
        });
    });
});

$("#cart-sum").ready(function() {
    var cart = loadCart();
    showCartSum(cart);
});

function updateButtonStyle(button, barcode) {
    var cartJson = objectToJson(loadCart());
    if (cartJson.indexOf(barcode) > -1) {
        button.className = 'add-button button button-glow button-border button-raised button-circle button-primary';
    } else {
        button.className = 'add-button button button-glow button-border button-rounded button-circle button-primary';
    }
}

function showItems(items, promotions) {

    var indexList = items.map(item => {
        return generateItemHtml(item, promotions);
    });
    $("#items").html(indexList);
}

function generateItemHtml(item, promotions) {

    var promotion;

    for (var i = 0; i < promotions.length; i ++) {
        for (var j = 0; j < promotions[i].barcodes.length; j ++) {
            if (promotions[i].barcodes[j].barcode === item.barcode) {
                promotion = promotions[i].describe;
                break;
            }
        }
    }
    return {
        name: item.name,
        barcode: item.barcode,
        unit: item.unit,
        price: item.price.toFixed(2),
        promotion: promotion
    };
}

function showCartSum(cart) {
    $("#cart-sum").html(cart.length);
}
