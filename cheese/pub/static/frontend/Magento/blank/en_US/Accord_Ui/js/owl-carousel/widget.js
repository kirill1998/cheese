define([
	'jquery',
	'owl.carousel'
], function ($) {
	"use strict";

	$.widget('accord.carousel', {
		_create: function () {
			var options = $.extend({
				responsiveClass: true,
				navigation: true,
				nav: true,
				navText: [
					'<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
					'<i class="fa fa-angle-double-right" aria-hidden="true"></i>'
				],
				responsive: {
					0: {
						items: 2
					},
					600: {
						items: 3
					},
					992: {
						items: 4
					},
					1300: {
						items: 5
					}
				}
			}, this.options);

			$(this.element).owlCarousel(options);
		}
	});

	return $.accord.carousel;
});
