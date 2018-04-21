/*jshint browser:true*/
/*global define*/
define(
    [
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/action/set-shipping-information',
        'Magento_Checkout/js/model/full-screen-loader',
        'Accord_Checkout/js/shipping-data'
    ],
    function (
        quote,
        setShippingInformationAction,
        fullScreenLoader,
        shippingData
    ) {
        'use strict';

        quote.shippingMethod.subscribe(function () {
            if (!shippingData.isSendingShipping()) {
                return;
            }

            fullScreenLoader.startLoader();

            setShippingInformationAction().always(
                function () {
                    fullScreenLoader.stopLoader();
                }
            );
        });

        return {}
    }
);
