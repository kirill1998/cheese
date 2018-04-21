define(
	[
		'uiComponent',
		'Magento_Checkout/js/model/shipping-rates-validator',
		'Magento_Checkout/js/model/shipping-rates-validation-rules',
		'../model/accord-shipping-validator',
		'../model/accord-shipping-validation-rules'
	],
	function (
		Component,
		defaultShippingRatesValidator,
		defaultShippingRatesValidationRules,
		shippingRatesValidator,
		shippingRatesValidationRules
	) {
		'use strict';
		defaultShippingRatesValidator.registerValidator('carrierName', shippingRatesValidator);
		defaultShippingRatesValidationRules.registerRules('carrierName', shippingRatesValidationRules);
		return Component;
	}
);