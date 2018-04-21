/**
 * @see /magento/pub/static/frontend/Magento/luma/en_US/Accord_Ui/ko/listSubs.js
 */
define([
    'jquery',
    'uiComponent',
    'ko',
    'Accord_Quick/ko/itemAjaxSubs',
    'owl.carousel'
], function ($, Component, ko, Model) {
    return Component.extend({
        initialize: function (data) {
            this._super();
            var self = this;

            this.items = ko.observableArray([]);
            this.title = data.title;
            this.isLoading = ko.observable(false);

            window.clearQuickSubs = function () {
                self.items.removeAll();
                self.isLoading = ko.observable(false);
            };

            window.initQuickSubs = function (sku) {
                var dataSku = {sku: sku};

                self.isLoading(true);
                $(".fix_isLoadingQuickSubs").show();

                self.items.removeAll();
                self.carouselId = 'sub_carousel_' + parseInt(Math.random() * 1000);

                $.post(data.controller, dataSku, function (response) {
                    self.isLoading(false);
                    $(".fix_isLoadingQuickSubs").hide();

                    if (!response) {
                        return;
                    }
                    $.each(response, function (sku, item) {
                        item.templateItem = data.templateItem;
                        item.templateLineMessage = data.templateLineMessage;
                        self.items.push(new Model(item));
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
                            },
                            992: {
                                items: 4
                            },
                            1300: {
                                items: 5
                            }
                        }
                    }, {});

                    setTimeout(function () {
                        $("#" + self.carouselId).owlCarousel(options);
                    }, 1);

                }, "json");
            };
        }
    });
});