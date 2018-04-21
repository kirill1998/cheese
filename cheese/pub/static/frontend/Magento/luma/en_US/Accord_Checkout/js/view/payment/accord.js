/*browser:true*/
/*global define*/
define(
	[
		'uiComponent',
		'Magento_Checkout/js/model/payment/renderer-list'
	],
	function (
		Component,
		rendererList
	) {
		'use strict';
		rendererList.push(
			{
				type: 'pay_on_account',
				component: 'Accord_Checkout/js/view/payment/method-renderer/pay-on-account'
			}
		);
		/** Add view logic here if needed */
		return Component.extend({});
	}
);