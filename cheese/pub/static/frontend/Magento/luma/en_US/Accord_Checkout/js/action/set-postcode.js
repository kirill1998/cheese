/*global define,alert*/
define(
    [
        'jquery',
        'Magento_Checkout/js/model/full-screen-loader'
    ],
    function (
        $,
        fullScreenLoader
    ) {
        'use strict';
        return function (postcode) {

            fullScreenLoader.startLoader();

            return $.ajax({
                method: "GET",
                url: window.checkout.findAddressUrl,
                data: {
                    postcode: postcode
                },
                dataType: 'json'
            }).always(function () {
                fullScreenLoader.stopLoader();
            });
        }
    }
);
