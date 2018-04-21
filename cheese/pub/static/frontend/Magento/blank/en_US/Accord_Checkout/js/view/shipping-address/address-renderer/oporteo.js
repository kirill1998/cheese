define([
	'uiComponent',
	'Magento_Customer/js/customer-data'
], function(Component, customerData) {
	'use strict';
	var countryData = customerData.get('directory-data');

	return Component.extend({
		defaults: {
			template: 'Accord_Checkout/shipping-address/address-renderer/oporteo'
		},

		getCountryName: function(countryId) {
			return (countryData()[countryId] != undefined) ? countryData()[countryId].name : "";
		}
	});
});
