/**
 * @see magento/pub/static/frontend/Magento/luma/en_US/Accord_Ui/ko/itemCart.js
 */
define([
    'jquery',
    'uiComponent',
    'ko',
    'ko.productItem'
], function ($, Component, ko, ProductItemModel) {
    return Component.extend({
        initialize: function (dataMage) {
            this._super();
            var self = this;

            var data = dataMage.data;
            data.templateLineMessage = dataMage.templateLineMessage;
            data.cfg.storeLineMessage = false;

            this.prototype = Object.create(ProductItemModel.prototype); // extend
            ProductItemModel.apply(this, [data]); // this._super();

            this.freeLine = data.quote.freeLine;
            this.mixMatchCode = data.quote.mixMatchCode;
            this.qtyInit = this.qty();
        }
    });
});