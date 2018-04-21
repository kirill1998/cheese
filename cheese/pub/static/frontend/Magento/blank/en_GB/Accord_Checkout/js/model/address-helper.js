/**
 * Copyright © 2016 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
define(
	[
		'jquery',
		'Accord_Checkout/js/model/address',
		'Magento_Customer/js/model/address-list',
		'Magento_Customer/js/customer-data',
		'mage/utils/objects',
		'Magento_Checkout/js/model/address-converter'
	],
	function($, address, addressList, customerData, mageUtils, addressConverter) {
		'use strict';
		var countryData = customerData.get('directory-data');

		return {
			/**
			 * Convert address form data to Address object
			 * @param {Object} formData
			 * @returns {Object}
			 */
			formBcpAddressDataToQuoteAddress: function(formData) {
				// clone address form data to new object
				var addressData = $.extend(true, {}, formData),
					region,
					regionName = addressData.region;
				if (mageUtils.isObject(addressData.street)) {
					addressData.street = addressConverter.objectToArray(addressData.street);
				}

				addressData.region = {
					region_id: addressData.region_id,
					region_code: addressData.region_code,
					region: regionName
				};

				if (addressData.region_id
					&& countryData()[addressData.country_id]
					&& countryData()[addressData.country_id]['regions']
				) {
					region = countryData()[addressData.country_id]['regions'][addressData.region_id];
					if (region) {
						addressData.region.region_id = addressData['region_id'];
						addressData.region.region_code = region['code'];
						addressData.region.region = region['name'];
					}
				}
				delete addressData.region_id;

				return address(addressData);
			},
			createShippingAddress: function(addressData) {
				var address = this.formBcpAddressDataToQuoteAddress(addressData);
				var isAddressUpdated = addressList().some(function(currentAddress, index, addresses) {
					if (currentAddress.getKey() == address.getKey()) {
						addresses[index] = address;
						return true;
					}
					return false;
				});
				if (!isAddressUpdated) {
					addressList.push(address);
				} else {
					addressList.valueHasMutated();
				}
				return address;
			}
		};
	}
);
