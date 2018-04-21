/**
 * @see /magento/pub/static/frontend/Magento/luma/en_US/Accord_Ui/ko/listSubs.js
 */
define([
    'jquery',
    'uiComponent',
    'ko',
    'Accord_Ui/ko/itemAjaxSubs',
    'owl.carousel'
], function ($, Component, ko, Model) {
    return Component.extend({
        initialize: function (data) {
            this._super();
            var self = this;

            this.items = ko.observableArray([]);
            this.carouselId = 'sub_carousel_' + parseInt(Math.random() * 1000);
            this.title = data.title;
            this.isLoading = ko.observable(false);

            if (data.data && data.controller) {

                self.isLoading(true);
                $.post(data.controller, data.data, function (response) {
                    self.isLoading(false);

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