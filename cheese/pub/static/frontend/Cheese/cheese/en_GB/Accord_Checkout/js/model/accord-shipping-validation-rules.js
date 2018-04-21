define(
	[],
	function () {
		'use strict';
		return {
			getRules: function() {
				return {
					'city': {
						'required': false
					},
					'telephone': {
						'required': false
					},
					'firstname': {
						'required': false
					},
					'lastname': {
						'required': false
					}
				};
			}
		};
	}
);