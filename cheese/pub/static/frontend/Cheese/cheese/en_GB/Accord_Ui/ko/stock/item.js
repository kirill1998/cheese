/**
 * @see magento/pub/static/frontend/Magento/luma/en_US/Accord_Ui/ko/itemStock.js
 */
define([
    'jquery',
    'ko',
    'Accord_Ui/ko/item',
    'Accord_Ui/ko/stock/subs'
], function ($, ko, ProductItemModel, ListSubsModel) {

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

        $.extend(this, data.block);

        this.isSubs = data.isSubs;

        if (data.isSubs) {
            this.subs = new ListSubsModel({
                template: "Accord_Ui/list",
                templateItem: "Accord_Ui/itemAjaxSubs",
                templateLineMessage: "Accord_Ui/lineMessage",
                component: "Accord_Ui/ko/listSubs",
                data: {
                    sku: data.product.sku,
                    subs: data.subs
                },
                controller: "/my-checkout/ajax/sub",
                title: "Substitutes"
            });
        } else {
            this.subs = null;
        }

        this.sku = data.product.sku;
    };
});