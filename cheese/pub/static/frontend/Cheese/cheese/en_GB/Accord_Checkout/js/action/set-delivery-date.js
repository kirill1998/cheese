/*global define,alert*/
define(
    [
        'jquery',
        'Accord_Checkout/js/model/delivery-date-processor'
    ],
    function (
        $,
        deliveryDateProcessor
    ) {
        'use strict';
        return function () {
            return deliveryDateProcessor.saveDeliveryDate();
        }
    }
);
