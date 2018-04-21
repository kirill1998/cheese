/*global define,alert*/
define(
    [
        'jquery',
        'ko',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/model/resource-url-manager',
        'mage/storage',
        'Magento_Checkout/js/model/payment-service',
        'Magento_Checkout/js/model/payment/method-converter',
        'Magento_Checkout/js/model/error-processor',
        'Magento_Checkout/js/model/full-screen-loader',
        'Magento_Checkout/js/action/select-billing-address',
        'Magento_Customer/js/model/customer',
        'Magento_Customer/js/model/address-list',
        'Accord_Checkout/js/delivery-data'
    ],
    function (
        $,
        ko,
        quote,
        resourceUrlManager,
        storage,
        paymentService,
        methodConverter,
        errorProcessor,
        fullScreenLoader,
        selectBillingAddressAction,
        customer,
        addressList,
        deliveryData
    ) {
        'use strict';

        return {
            isBillingAddressSelected: false,
            canSetBillingAddress: function () {
                if (customer.isLoggedIn()) {
                    return !quote.billingAddress();
                } else {
                    return $('input[name="billing-address-same-as-shipping"]').is(':checked') && !this.isBillingAddressSelected;
                }
            },
            saveShippingInformation: function () {
                var payload;

                if (this.canSetBillingAddress()) {
                    selectBillingAddressAction(this.getBillingAddressToSelect());
                    this.isBillingAddressSelected = true;
                }

                payload = {
                    addressInformation: {
                        shipping_address: quote.shippingAddress(),
                        billing_address: quote.billingAddress(),
                        shipping_method_code: quote.shippingMethod().method_code,
                        shipping_carrier_code: quote.shippingMethod().carrier_code,
                        extension_attributes: {
                            delivery_date: deliveryData.getDeliveryDate()(),
                            customer_ref: $('[name="customer_ref"]').val()
                        }
                    }
                };

                fullScreenLoader.startLoader();

                return storage.post(
                    resourceUrlManager.getUrlForSetShippingInformation(quote),
                    JSON.stringify(payload)
                ).done(
                    function (response) {
                        quote.setTotals(response.totals);
                        paymentService.setPaymentMethods(methodConverter(response.payment_methods));
                        fullScreenLoader.stopLoader();
                    }
                ).fail(
                    function (response) {
                        errorProcessor.process(response);
                        fullScreenLoader.stopLoader();
                    }
                );
            },
            getBillingAddressToSelect: function () {
                var addressToSelect = null;

                addressList().forEach(function (address) {
                    if (address.isDefaultBilling()) {
                        addressToSelect = address;
                    }
                });

                if (!addressToSelect && quote.shippingAddress()) {
                    addressToSelect = quote.shippingAddress();
                }

                return addressToSelect;
            }
        };
    }
);
