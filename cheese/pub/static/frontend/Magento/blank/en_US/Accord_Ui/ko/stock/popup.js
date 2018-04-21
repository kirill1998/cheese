/**
 * @see /magento/pub/static/frontend/Magento/luma/en_US/Accord_Ui/ko/popup.js
 */
define([
    'jquery',
    'uiComponent',
    'ko',
    'Magento_Ui/js/modal/modal',
    'Accord_Ui/ko/stock/item'
], function ($, Component, ko, modal, Model) {
    return Component.extend({
        initialize: function (data) {
            this._super();
            var self = this;

            var controller = data.controller;
            var controllerClearStock = data.controllerClearStock;
            var autoInit = data.autoInit;

            var modalOptions = {
                'type': 'popup',
                'modalClass': 'agreements-modal',
                'responsive': true,
                'innerScroll': true,
                'trigger': '.show-modal',
                'buttons': [
                    {
                        text: 'Update Cart',
                        class: 'action checkout btn btn-lg btn-primary proceed-to-checkout-free',
                        click: function (e) {
                            $(e.target).attr('disabled', 'disabled');

                            $.ajax({
                                method: "GET",
                                url: controllerClearStock,
                                dataType: 'json'
                            }).done(function (response) {
                                    if (response.success) {
                                        window.localStorage.clear();
                                        window.location.reload();
                                    } else {
                                        alert('error data');
                                    }
                                }
                            ).fail(function (response) {
                                console.log('response', response);
                                alert('error response');
                            });
                        }
                    }
                ]
            };

            this.isLoading = ko.observable(true);
            this.outStockItems = ko.observableArray([]);
            this.qtyStock = ko.observable(0);
            this.qtySubs = ko.observable(0);

            window.showPopupSubs = function () {
                self.isLoading(true);
                self.outStockItems.removeAll();

                modal(modalOptions, $('.popup-subs-products'));
                $('.popup-subs-products').modal('openModal');

                $.ajax({
                    method: "GET",
                    url: controller,
                    dataType: 'json'
                }).done(function (response) {
                    self.isLoading(false);
                    if (response.data) {
                        init(response.data);
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
                window.showPopupSubs();
            }

            function init(data) {
                var qtyStock = 0;
                var qtySubs = 0;

                for (var i in data) {
                    var datum = data[i];

                    if (datum.isSubs) {
                        qtySubs++;
                    } else {
                        qtyStock++;
                    }

                    self.outStockItems.push(new Model(datum));
                }

                self.qtyStock(qtyStock);
                self.qtySubs(qtySubs);
            }

        }
    });
});