/**
 * Created by nancymi on 16/3/9.
 */
function generateReceipt(cart, items) {
    var cartItemList = [];

    var totalNormalPrice = 0, totalPromoPrice = 0;

    cart.forEach(function(cartItem) {
        for (var i = 0; i < items.length; i ++) {
            if (items[i].barcode === cartItem.barcode) {
                var normalPrice = calculateNormalPrice(items[i], cartItem.count);
                var promoPrice = calculatePromoPrice(items[i], cartItem.count, loadPromotions);
                cartItemList.push({
                    item: items[i],
                    count: cartItem.count,
                    normalPrice: normalPrice,
                    promoPrice: promoPrice
                });
                totalNormalPrice += normalPrice;
                totalPromoPrice += promoPrice;
                break;
            }
        }
    });
    return {
        cartItems: cartItemList,
        totalNormalPrice: totalNormalPrice,
        totalPromoPrice: totalPromoPrice
    }
}

function calculateNormalPrice(item, count) {
    var normalPrice = item.price * count;
    return normalPrice;
}

function calculatePromoPrice(item, count, loadPromotions) {
    var promoPrice = calculateNormalPrice(item, count);
    var promotions = loadPromotions();

    promotions.forEach(function(promotion) {
        switch(promotion.type) {
            case 'BUY_TWO_GET_ONE_FREE': {
                promotion.barcodes.forEach(function(barcode) {
                    if (item.barcode === barcode.barcode) {
                        promoPrice = promoBuyTwoGetOneFree(item, count);
                    }
                });
                break;
            }
            case 'OTHER_PROMOTION': {
                //TODO finish other promotions' algorithm
                break;
            }
            default: break;
        }
    });

    return promoPrice;
}

function promoBuyTwoGetOneFree(item, count) {
    var price = item.price;
    var promoCount = count - parseInt(count/3);
    var promoPrice = price * promoCount;
    return promoPrice;
}