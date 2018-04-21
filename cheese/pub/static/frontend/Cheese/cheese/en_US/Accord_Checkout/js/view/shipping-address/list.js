/**
 * Copyright © 2016 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*global define*/
define([
    'ko',
	'Magento_Customer/js/model/address-list',
	'Magento_Checkout/js/view/shipping-address/list'
], function (ko, addressList, MagentoAddressList) {
	'use strict';

	return MagentoAddressList.extend({
		defaults: {
			visible: ko.observable(function(){
				return addressList().length > 0
			})
		}
	});

});
