var cartsStag = [];
var itemsStag = [];
var promotionsStag = [];

$(document).ready(function() {
    initData(() => {
        initView();
        addEvent();
    });
});

function initData(callback) {
    service.loadItems(items => {
        itemsStag = items;
        service.loadPromotions(promotions => {
            promotionsStag = promotions;
            service.loadCarts(carts => {
                cartsStag = carts;
                callback();
            });
        });
    });
}


function addEvent() {
    addSelectButtonClickListener();
    addCartButtonClickListener();
    addHistoryButtonClickListener();
}

function addSelectButtonClickListener() {
    $(".add-button").click(function() {
        let barcode = $(this).attr('data-barcode');
        let cartsStagJson = objectToJson(cartsStag);
        if (cartsStagJson.indexOf(barcode) === -1) {
            let cart = {barcode: barcode, count: 1};
            service.createCart(cart, state => {
                if (state.ok === 1) {
                    cartsStag.push(cart);
                    showCartSum(cartsStag.length);
                    updateButtonStyle(this, barcode);
                }
            });
        } else {
            service.deleteCart(barcode, function(state) {
                if (state.ok === 1) {
                    let i = 0;
                    while(cartsStag[i++].barcode !== barcode) continue;
                    cartsStag.splice(i, 1);
                    showCartSum(cartsStag.length);
                    updateButtonStyle(this, barcode);
                }
            });
        }

    });
}

function addCartButtonClickListener() {
    $("#cart-button").click(function() {
        document.location.href = '/cart';
    });
}

function addHistoryButtonClickListener() {
    $("#history-button").click(function() {
        document.location.href = '/history';
    });
}

function initView() {
    initItemsView();
}

function initItemsView() {
    showItems(itemsStag);
    showCartSum();

    var addButtons = document.getElementsByClassName('add-button');
    for (var i = 0; i < addButtons.length; i ++) {
        var barcode = $(addButtons[i]).attr('data-barcode');
        updateButtonStyle(addButtons[i], barcode);
    }
}

function showItems(items) {
    var itemsHtml = '<tr><td><h3>名称</h3></td><td><h3>单价</h3></td><td><h3>促销活动</h3></td><td><h3>添加</h3></td></tr>';
    itemsHtml += items.map(generateItemHtml).join('');
    $("#items").html(itemsHtml);
}

function generateItemHtml(item) {

    var promotion = '';
    for (var i = 0; i < promotionsStag.length; i ++) {
        for (var j = 0; j < promotionsStag[i].barcodes.length; j ++) {
            if (promotionsStag[i].barcodes[j].barcode === item.barcode) {
                promotion = promotionsStag[i].describe;
                break;
            }
        }
    }

    var itemHtml = '<tr class="item"><td><h4>' + item.name + '</h4></td><td><h4>' + item.price.toFixed(2) + ' 元/' + item.unit + '</h4></td>' +
        '<td><h4>' + promotion + '</h4></td><td>'+
        '<a class="add-button button button-glow button-border button-rounded button-circle button-primary" data-barcode="' + item.barcode + '">' +
        '+</a>'+
        '</td></tr>';

    return itemHtml;
}

function showCartSum() {
    $("#cart-sum").html(cartsStag.length);
}

function updateButtonStyle(button, barcode) {
    var cartsJson = objectToJson(cartsStag);
    var SELECTED = 'add-button button button-glow button-border button-raised button-circle button-primary';
    var NOT_SELECTED = 'add-button button button-glow button-border button-rounded button-circle button-primary';
    if (cartsJson.indexOf(barcode) === -1) {
        button.className = NOT_SELECTED;
    } else {
        button.className = SELECTED;
    }
}