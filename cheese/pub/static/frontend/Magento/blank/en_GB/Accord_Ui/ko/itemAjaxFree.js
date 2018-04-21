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

    return function (data, parent, index) {
        var SINGLE_freeQuantityType = 'singles';
        var CASE_freeQuantityType = 'cases';

        var SINGLE_VALUE = 'Singles';
        var CASE_VALUE = 'Cases';
        var SINGLE_INDEX = 'single';
        var CASE_INDEX = 'case';

        this.prototype = Object.create(ProductItemModel.prototype); // extend
        ProductItemModel.apply(this, arguments); // this._super();

        var self = this;

        this.getTemplate = function () {
            return data.templateItem; // Accord_Ui/itemAjaxFree (.html)
        };

        $.extend(this, data.block);

        this.index = index;

        this.freeLine = true;
        this.qtyTypeEnabled = false;
        this.minQty = ko.observable(0);
        this.mixMatchCode = parent.mixMatchQualify.mixMatchCode;
        this.qty(0);

        var originalMaxQty = this.maxQty;
        this.maxQty = ko.computed(function () {
            return Math.min(originalMaxQty(), parent.maxQty(self.index));
        });

		this.forceUpdateQuantity = false;

		this.canInc = ko.computed(function(){
			return self.isInStock() && (parseInt(self.qty()) < parseInt(self.maxQty()));
		});

		this.canDec = ko.computed(function(){
			return self.isInStock() && (parseInt(self.qty()) > self.minQty());
		});


		if (parent.mixMatchQualify.freeQuantityType == CASE_freeQuantityType) {
            this.qtyTypeValue(CASE_VALUE);
        } else if (parent.mixMatchQualify.freeQuantityType == SINGLE_freeQuantityType) {
            if (this.caseOnly) {
                console.log('Conflict: caseOnly & freeQuantityType=' + SINGLE_freeQuantityType);
                this.qtyTypeValue(CASE_VALUE);
            } else {
                this.qtyTypeValue(SINGLE_VALUE);
            }
        }

    };
});