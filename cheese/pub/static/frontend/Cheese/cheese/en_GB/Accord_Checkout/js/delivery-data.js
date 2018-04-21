define([
    'jquery',
    'ko'
], function (
    $,
    ko
) {
    'use strict';

    var data = {
        deliveryDate: ko.observable(window.checkoutConfig.shipping.delivery_date.defaultDate),
        deliveryDateFormat: window.checkoutConfig.shipping.delivery_date.format,
        availableDates: window.checkoutConfig.shipping.delivery_date.availableDates,
        deliveryAddress: window.checkoutConfig.shipping.address
    };

    return {
        getData: function () {
            return data;
        },
        getDeliveryDate: function () {
            return data.deliveryDate;
        },
        setDeliveryDate: function (date) {
            data.deliveryDate(date);
        },
        getDeliveryDateFormat: function () {
            return data.deliveryDateFormat;
        },
        getDeliveryAddress: function () {
            return data.deliveryAddress;
        },
        getUpsell: function () {
            var upsell = null,
                self = this;

            $.each(this.getAvailableDates(), function (index, value) {
                if (self.getDeliveryDate()() === value.date && value.upsell) {
                    upsell = value.upsell;
                }
            });

            return upsell;
        },
        hasUpsell: function () {
            return this.getUpsell() ? true : false;
        },
        getUpsellCharge: function () {
            if (!this.hasUpsell()) {
                return null;
            }

            return this.getUpsell().charge;
        },
        getUpsellOffset: function () {
            if (!this.hasUpsell()) {
                return null;
            }

            return this.getUpsell().spend;
        },
        getAvailableDates: function () {
            return data.availableDates;
        }
    }
});
