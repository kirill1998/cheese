/**
 * @see /magento/pub/static/frontend/Magento/luma/en_US/Accord_Ui/ko/listSubs.js
 */
define([
    'jquery',
    'uiComponent',
    'ko',
    'Accord_Quick/ko/item',
    'Accord_Ui/ko/quick/selectOnFocus'
], function ($, Component, ko, Model) {
    return Component.extend({
        initialize: function (data) {
            this._super();
            var self = this;

            this.item = ko.observable({isSet: ko.observable(false)});
            this.title = 'Add Product';

            window.setQuickOrderProduct = function (sku) {
                if (!sku) {
                    self.item().isSet(false);
                    return;
                }

                $(".block.block-search-2").hide();

                $.ajax({
                    url: data.controller,
                    data: {
                        sku: sku
                    },
                    type: 'post',
                    dataType: 'json',
                    success: function (response) {
                        productData = response;
                        productData.templateItem = data.templateItem;
                        productData.templateLineMessage = data.templateLineMessage;
                        self.item(new Model(productData, self));
                    }
                });

            };
        }
    });
});