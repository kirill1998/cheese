/**
 * Copyright © 2016 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
define(
	[
		'jquery',
		'Magento_Checkout/js/view/payment/default'
	],
	function ($, Component) {
		'use strict';

		return Component.extend({
			defaults: {
				template: 'Accord_Checkout/payment/pay-on-account',
			},
			getInstructions: function() {
				return window.checkoutConfig.payment.instructions[this.item.method];
			}
		});
	}
);
