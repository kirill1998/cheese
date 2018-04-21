define([
	'jquery',
	'ko',
	'uiComponent',
	'Magento_Checkout/js/action/create-shipping-address',
	'Magento_Checkout/js/action/select-shipping-address',
    'Magento_Checkout/js/checkout-data',
    'Magento_Customer/js/model/customer',
	'Accord_Checkout/js/model/address-helper',
	'Magento_Catalog/js/price-utils',
	'mage/translate',
    'Magento_Checkout/js/action/set-shipping-information',
	'Accord_Checkout/js/action/update-shipping-rates',
	'Accord_Checkout/js/model/customer-ref-processor',
	'Accord_Checkout/js/delivery-data'
], function (
	$,
	ko,
	Component,
	createShippingAddress,
	selectShippingAddress,
	checkoutData,
	customer,
	addressHelper,
	priceUtils,
	mageTranslate,
    setShippingInformationAction,
	updateShippingRatesAction,
	customerRefProcessor,
	deliveryData
) {
	'use strict';

	return Component.extend({
        customerRef: ko.observable(customerRefProcessor.getValue()),
		defaults: {
			template: 'Accord_Checkout/delivery-date-block'
		},
		initialize: function () {
			this._super();

			var addressData = deliveryData.getDeliveryAddress();
			var self = this;

			if (addressData) {
				addressData.save_in_address_book = 0;
				var newShippingAddress = addressHelper.createShippingAddress(addressData);
			}

			ko.bindingHandlers.datepicker = {
				init: function (element, valueAccessor, allBindingsAccessor) {
					var $el = $(element).find('input');
					//initialize datepicker
					var options = {
						changeMonth: true,
						changeYear: true,
						constrainInput: true,
						showOn: "button",
						buttonImageOnly: false,
						buttonText: "",
						beforeShowDay: function (date) {
							var string = $.datepicker.formatDate(options.dateFormat, date),
								isDateAvailable = false;

							$.each(deliveryData.getAvailableDates(), function (index, value) {
								if (value.date == string) {
									isDateAvailable = true;
									return false;
								}
							});

							return [isDateAvailable];
						},
						defaultDate: deliveryData.getDeliveryDate()(),
						dateFormat: deliveryData.getDeliveryDateFormat(),
						beforeShow: function (field, instance) {
							setTimeout(addDeliveryOptions, 10, instance);
						},
						onChangeMonthYear: function (year, month, instance) {
							setTimeout(addDeliveryOptions, 10, instance);
						},
                        onSelect: function (dateText, instance) {
							updateShippingRatesAction().done(function () {
								deliveryData.setDeliveryDate(dateText);
							});
                        }
					};

					$el.datepicker(options);

					if (options.defaultDate) {
						var curDate = $.datepicker.parseDate(options.dateFormat, options.defaultDate);
						$el.datepicker('setDate', curDate);
					}

					var writable = valueAccessor();
					if (!ko.isObservable(writable)) {
						var propWriters = allBindingsAccessor()._ko_property_writers;
						if (propWriters && propWriters.datepicker) {
							writable = propWriters.datepicker;
						} else {
							return;
						}
					}
					writable($(element).datepicker("getDate"));
				},
				update: function (element, valueAccessor) {
					var widget = $(element).data("DatePicker");
					//when the view model is updated, update the widget
					if (widget) {
						var date = ko.utils.unwrapObservable(valueAccessor());
						widget.date(date);
					}
				}
			};

			this.customerRef.subscribe(function(value) {
				customerRefProcessor.setValue(value);
				customerRefProcessor.save();
			});

			// extend calendar by delivery option info
			function addDeliveryOptions (instance) {
				instance.dpDiv.addClass('delivery-date-picker');

				var cells = instance.dpDiv.find('td'),
					parts,
					cellPosition,
					optionHeading = '',
					optionValue;

				// get all cells which contains days
				cells = $.grep(cells, function (value, i) {
					return $(value).children().length != 0;
				});

				$.each(deliveryData.getAvailableDates(), function (index, value) {
					parts = value.date.split('/');
					if (parts[1] == instance.drawMonth+1 && parts[2] == instance.drawYear) {
						cellPosition = parseInt(parts[0]) - 1;
						optionValue = self.getFormattedPrice(value.delivery_charge);

						$(cells[cellPosition]).append('<span class="delivery-date-option">' +
							'<span class="delivery-date-option__heading">' + optionHeading + '</span>' +
							'<span class="delivery-date-option__value">' + optionValue + '</span>' +
						'</span>');
					}
				});
			}

			return this;
		},
		getFormattedPrice: function (price) {
			return priceUtils.formatPrice(price);
		}
	});
});
