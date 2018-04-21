define([
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/model/shipping-rate-registry',
    'Accord_Checkout/js/action/set-delivery-date'
], function (
    quote,
    rateRegistry,
    setDeliveryDateAction
) {
    return function () {
        return setDeliveryDateAction()
            .done(function () {
                //get address from quote observable
                var address = quote.shippingAddress();

                if (!address) {
                    return;
                }

                // for guest
                rateRegistry.set(address.getKey(), null);
                // for logged in
                rateRegistry.set(address.getCacheKey(), null);

                // with rates cleared, the observable listeners should
                // update everything when the rates are updated
                quote.shippingAddress(address);
            });
    }
});