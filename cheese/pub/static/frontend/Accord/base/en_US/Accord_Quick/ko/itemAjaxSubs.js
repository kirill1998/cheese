/**
 * @see magento/pub/static/frontend/Magento/luma/en_US/Accord_Ui/ko/itemAjaxSubs.js
 */
define([
    'jquery',
    'ko',
    'ko.productItem'
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

    return function (data) {
        this.prototype = Object.create(ProductItemModel.prototype); // extend
        ProductItemModel.apply(this, arguments); // this._super();

        var self = this;

        this.getTemplate = function () {
            return data.templateItem; // Accord_Ui/itemAjaxSubs (.html)
        };

        $.extend(this, data.block);

        this.onSubmit = function (formElement) {
            self.ajaxSubmit(formElement, function () {
                window.summaryInit();
                window.quickProductIsSet(false);
                window.clearQuickSubs();
                $(".block.block-search-2").show();
                $("#search_2").val("");
                $("#search_2").focus();
            });
        };
    };
});