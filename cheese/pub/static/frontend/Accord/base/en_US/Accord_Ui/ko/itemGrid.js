/**
 * @see am2/pub/static/frontend/Magento/luma/en_US/Accord_Ui/ko/itemGrid.js
 */
define([
    'jquery',
    'uiComponent',
    'ko',
    'ko.productItem'
], function ($, Component, ko, ProductItemModel) {
    return Component.extend({
        initialize: function (data) {
            this._super();
            var self = this;

            var dataItem = data.data;
            dataItem.templateLineMessage = data.templateLineMessage;

            this.prototype = Object.create(ProductItemModel.prototype); // extend
            ProductItemModel.apply(this, [dataItem]); // this._super();
        }
    });
});