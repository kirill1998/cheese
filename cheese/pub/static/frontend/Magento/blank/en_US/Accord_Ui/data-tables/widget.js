define([
	'jquery',
	'datatables.net',
	'dataTables.bootstrap',
	'datatables.date-dd-mm-yyyy'
], function ($) {
	'use strict';

	$.widget('accord.DataTableGrid', {
		_create: function () {
			var options = $.extend({}, this.options);
			$(this.element).DataTable(options);
		}
	});

	return $.accord.DataTableGrid;
});
