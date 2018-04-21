/**
 * @see /magento/pub/static/frontend/Magento/luma/en_US/Accord_Ui/ko/substitutes.js
 */
define([
    'jquery',
    'uiComponent',
    'ko',
    'Accord_Ui/ko/itemAjaxFree',
    'owl.carousel'
], function ($, Component, ko, Model) {
    return Component.extend({
        initialize: function (data) {
            this._super();
            var self = this;

            this.items = ko.observableArray([]);
            this.carouselId = 'free_carousel_' + parseInt(Math.random() * 1000);
            this.offerData = data.offerData;
            this.mixMatchQualify = data.mixMatchQualify;
            this.id = data.id;

            this.maxQty = function (index) {
                var qty = 0;
                for (var i in self.items()) {
                    var item = self.items()[i];
                    if (index != item.index && item.qty() > 0) {
                        qty += parseInt(item.qty());
                    }
                }

                return parseInt(data.mixMatchQualify.freeQuantity) - qty;
            };

            this.setDataFreeProducts = ko.computed(function () {
                var data = [];
                var qty = 0;
                var isRequired = false;
                for (var i in self.items()) {
                    var item = self.items()[i];
                    var postData = JSON.parse(item.postData);

                    if (item.qty() > 0) {
                        qty += item.qty();
                        isRequired = isRequired || item.lineMessageModel().required();
                        data.push({
                            uenc: postData.data.uenc,
                            product: postData.data.product,
                            form_key: item.formKey,
                            qty: item.qty(),
                            qtyTypeValue_freeQuantityType: self.mixMatchQualify.freeQuantityType,
                            qtyTypeValue: item.qtyTypeValue(),
                            currentMessage: item.lineMessageModel().currentMessage(),
                            packSize: item.packSize(),
                            custom_price: "0.00",
                            freeLine: item.freeLine + "",
                            mixMatchCode: self.mixMatchQualify.mixMatchCode
                        });
                    }
                }

                var assert = parseInt(self.mixMatchQualify.freeQuantity) - parseInt(qty);

                if (!window.freeProducts) {
                    window.freeProducts = {};
                }
                window.freeProducts[self.id] = {
                    data: data,
                    qty: qty,
                    free: self.mixMatchQualify.freeQuantity,
                    assertQty: assert,
                    assertMessage: isRequired
                };
            });

            if (data.data && data.controller) {
                $.post(data.controller, data.data, function (response) {
                    if (!response) {
                        return;
                    }
                    var index = 0;
                    $.each(response, function (sku, item) {
                        item.templateItem = data.templateItem;
                        item.templateLineMessage = data.templateLineMessage;
                        self.items.push(new Model(item, self, index));
                        index++
                    });

                    // owl-carousel
                    var options = $.extend({
                        responsiveClass: true,
                        navigation: true,
                        nav: true,
                        navText: [
                            '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
                            '<i class="fa fa-angle-double-right" aria-hidden="true"></i>'
                        ],
                        responsive: {
                            0: {
                                items: 2
                            },
                            600: {
                                items: 3
                            }
                        }
                    }, {});

                    setTimeout(function () {
                        $("#" + self.carouselId).owlCarousel(options);
                    }, 1);

                }, "json");
            }
        }
    });
});