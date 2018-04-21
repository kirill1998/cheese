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
        // this.postData = data.block.postData;
        // ...
    };
});