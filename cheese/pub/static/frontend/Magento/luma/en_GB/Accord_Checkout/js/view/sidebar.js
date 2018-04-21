/*global define*/
define(
	[
		'uiComponent',
		'ko',
		'jquery',
		'Magento_Checkout/js/model/sidebar'
	],
	function(Component, ko, $, sidebarModel) {
		'use strict';
		return Component.extend({
			setSticky: function(element) {
				// console.log('setModalElement - sidebar', element);

				$(element).mage('sticky', {
					container: '#maincontent'
				});
			}
		});
	}
);
