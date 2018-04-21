define(
    [
        'uiComponent',
        'Magento_Customer/js/model/customer',
        'Magento_Checkout/js/model/payment/additional-validators',
        'Accord_Checkout/js/model/guest-shipping-validator'
    ],
    function (Component, customer, additionalValidators, guestShippingValidator) {
        'use strict';

        if (!customer.isLoggedIn()) {
            additionalValidators.registerValidator(guestShippingValidator);
        }

        return Component.extend({});
    }
);
