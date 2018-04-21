/**
 * @see /magento/pub/static/frontend/Magento/luma/en_US/Accord_Ui/ko/popup.js
 */
define([
    'jquery',
    'uiComponent',
    'ko'
], function ($, Component, ko) {
    return Component.extend({
        initialize: function (data) {
            this._super();
            var self = this;

            var controller = data.controller;
            var autoInit = data.autoInit;

            var modalOptions = {
                'type': 'popup',
                'modalClass': 'agreements-modal',
                'responsive': true,
                'innerScroll': true,
                'trigger': '.show-modal',
                'buttons': [
                    {
                        text: 'Update cart',
                        class: 'action checkout btn btn-lg btn-primary proceed-to-checkout-free',
                        click: function (e) {
                            $(e.target).attr('disabled', 'disabled');

                            $.ajax({
                                method: "GET",
                                url: controllerClearStock,
                                dataType: 'json'
                            }).done(function (response) {
                                    if (response.success) {
                                        location.reload()
                                    } else {
                                        alert('error data');
                                    }
                                }
                            ).fail(function (response) {
                                alert('error response');
                            });
                        }
                    }
                ]
            };

            this.isLoading = ko.observable(false);

            window.summaryInit = function (deliveryDate) {
                self.isLoading(true);

                $.ajax({
                    method: "GET",
                    data: {deliveryDate: deliveryDate},
                    url: controller,
                    dataType: 'json'
                }).done(function (response) {
                    self.isLoading(false);
                    if (response) {
                        if (response.data) init(response.data);
                    } else {
                        alert('Error format');
                        console.log('response', response);
                    }
                }).fail(function (error) {
                    self.isLoading(false);
                    alert('Error response');
                    console.log("Error", JSON.stringify(error));
                });
            };

            if (autoInit) {
                window.summaryInit($("#delivery-date").val());
            }

            this.orderValue = ko.observable('');
            this.subTotal = ko.observable('');
            this.discount = ko.observable('');
            this.surcharge = ko.observable('');
            this.vatValue = ko.observable('');
            this.adjustments = ko.observableArray([]);

            function init(data) {
                self.subTotal(data.subTotal);
                self.surcharge(data.surcharge);
                self.discount(data.discount);
                self.orderValue(data.orderValue);
                self.vatValue(data.vatValue);
                self.adjustments(data.adjustment);

                $.extend(this, data);
            }

        }
    });
});