/*global define*/
define(
	[
		'Magento_Checkout/js/view/summary/abstract-total',
		'Magento_Checkout/js/model/quote'
	],
	function (Component, quote) {
		"use strict";
		return Component.extend({
			defaults: {
				template: 'Accord_Checkout/summary/vat'
			},
			totals: quote.getTotals(),
			isDisplayed: function() {
				return this.isFullMode() && this.getPureValue() && (this.getPureValue() != 0);
			},
			getPureValue: function() {
				var totals = this.totals();

				if (_.isObject(totals)
					&& _.isObject(totals.extension_attributes)
					&& totals.extension_attributes.vat
				) {
					return totals.extension_attributes.vat;
				}

			},
			getValue: function () {
				return this.getFormattedPrice(this.getPureValue());
			}

		});
	}
);