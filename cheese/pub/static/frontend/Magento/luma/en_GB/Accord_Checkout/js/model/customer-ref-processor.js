/*global define,alert*/
define(
    [
        'ko',
        'mage/storage'
    ],
    function (
        ko,
        storage
    ) {
        'use strict';

        return {
            value: window.checkoutConfig.quoteData.customer_ref,
            save: function () {
                var payload;

                payload = {
                    customer_ref: this.value
                };

                return storage.post(
                    'my-checkout/ajax/SaveCustomerRefToQuote',
                    payload,
                    true,
                    'application/x-www-form-urlencoded; charset=UTF-8'
                );
            },
            setValue: function (value) {
                this.value = value;
                return this;
            },
            getValue: function () {
                return this.value;
            }
        };
    }
);
