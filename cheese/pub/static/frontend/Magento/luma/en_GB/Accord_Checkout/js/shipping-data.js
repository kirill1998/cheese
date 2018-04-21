define([
    'jquery',
    'ko'
], function (
    $,
    ko
) {
    'use strict';

    var data = {
        // Helps to control process of sending shipping information to BE
        // when quote.shippingMethod has been changed on the FE.
        sendShipping: true
    };

    return {
        isSendingShipping: function () {
            return data.sendShipping;
        },
        disableSendingShipping: function () {
            data.sendShipping = false;
        },
        enableSendingShipping: function () {
            data.sendShipping = true;
        }
    }
});
