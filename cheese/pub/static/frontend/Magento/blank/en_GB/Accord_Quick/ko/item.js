/**
 * @see magento/pub/static/frontend/Magento/luma/en_US/Accord_Ui/ko/itemAjaxFree.js
 */
define([
    'jquery',
    'ko',
    'Accord_Ui/ko/item'
], function ($, ko, ProductItemModel) {

    ko.bindingHandlers.htmlWithBinding = {
        'init': function () {
            return {'controlsDescendantBindings': true};
        },
        'update': function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            element.innerHTML = valueAccessor();
            ko.applyBindingsToDescendants(bindingContext, element);
        }
    };

    return function (data, parent) {
        this.prototype = Object.create(ProductItemModel.prototype); // extend
        ProductItemModel.apply(this, arguments); // this._super();

        var self = this;

        this.getTemplate = function () {
            return data.templateItem; // Accord_Ui/itemAjaxFree (.html)
        };

        $.extend(this, data.block);

        this.isSet = ko.observable(true);
        window.quickProductIsSet = function (val) {
            self.isSet(val);
        };

        this.onSubmit = function (formElement) {
            self.ajaxSubmit(formElement, function () {
                window.summaryInit();
                self.isSet(false);
                $(".block.block-search-2").show();
                $("#search_2").val("");
                $("#search_2").focus();
            });
        };

        this.clickName = function (e) {
            self.isSet(false);
            $(".block.block-search-2").show();
            window.clearQuickSubs();
            $("#search_2").val("");
            $("#search_2").focus();
        };

        this.qtyKeyPress = function (data, e) {
            if (event.keyCode == 13) {
                self.qty($(e.target).val());
                var result = self.addToCartClick(null, e);
                if (result) {
                    self.onSubmit($(e.target).closest('.product-item-details').find('form'));
                }
            }
            return true;
        };

        this.addSub = function () {
            window.initQuickSubs(data.product.sku);
        };

    };

});