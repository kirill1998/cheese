/*global define,alert*/
define(
    [
        'jquery',
        'Magento_Checkout/js/model/resource-url-manager',
        'mage/storage',
        'Magento_Checkout/js/model/full-screen-loader',
    ],
    function (
        $,
        resourceUrlManager,
        storage,
        fullScreenLoader
    ) {
        'use strict';

        return {
            saveDeliveryDate: function () {
                var payload;

                payload = {
                    delivery_date: $('[name="delivery-date"]').val()
                };

                fullScreenLoader.startLoader();

                return storage.post(
                    'my-checkout/ajax/SaveDeliveryDateToQuote',
                    payload,
                    true,
                    'application/x-www-form-urlencoded; charset=UTF-8'
                ).always(
                    function () {
                        fullScreenLoader.stopLoader();
                    }
                );
            }
        };
    }
);
