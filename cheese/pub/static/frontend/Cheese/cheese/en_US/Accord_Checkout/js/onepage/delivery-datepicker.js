define([
    "jquery",
    "jquery/ui"
], function ($) {
    "use strict";

    $.widget('accord.deliveryDatePicker', {

        _create: function () {
            var datesAvailable = this.getDatesAvailable();
            var options = {
                changeMonth: false,
                changeYear: false,
                constrainInput: true,
                showOn: "button",
                dateFormat: this.options.dateFormat || 'dd/mm/yy',
                buttonImageOnly: false,
                buttonText: "",
                beforeShowDay: function (date) {
                    var string = $.datepicker.formatDate(options.dateFormat, date);
                    return [$.inArray(string, datesAvailable) != -1];
                },
                onSelect: function (dataText) {
                    window.summaryInit(dataText);
                }
            };

            $(this.element).datepicker(options);
            if (this.getDefaultDeliveryDate()) {
                var curDate = $.datepicker.parseDate(this.options.dateFormat, this.getDefaultDeliveryDate());
                $(this.element).datepicker('setDate', curDate);
            }
        },

        getDefaultDeliveryDate: function () {
            return this.options.defaultDeliveryDate || null;
        },

        getDatesAvailable: function () {
            var result = [this.getDefaultDeliveryDate()];
            if (this.options.deliveryDatesAvailable && this.options.deliveryDatesAvailable.length) {
                result = this.options.deliveryDatesAvailable;
            }

            return result;
        }

    });

    return $.accord.deliveryDatePicker;
});
