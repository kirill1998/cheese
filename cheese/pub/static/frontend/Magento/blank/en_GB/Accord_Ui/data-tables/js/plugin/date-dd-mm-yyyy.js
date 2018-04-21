/**
 * For date into format dd/mm/yyyy (25/08/2000)
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'datatables.net'], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {

    $.extend($.fn.dataTableExt.oSort, {
        'date-dd-mm-yyyy-pre': function (date) {
            date = date.replace(" ", "");

            if (!date) {
                return 0;
            }

            var parts = date.split(/[\.\-\/]/),
                year = parts[2] ? parts[2] : 0,
                month = parts[1].length == 1 ? 0 + parts[1] : parts[1],
                day = parts[0].length == 1 ? 0 + parts[0] : parts[0];

            return (year + month + day) * 1;
        },

        'date-dd-mm-yyyy-asc': function (a, b) {
            return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        },

        'date-dd-mm-yyyy-desc': function (a, b) {
            return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        }
    });

}));
