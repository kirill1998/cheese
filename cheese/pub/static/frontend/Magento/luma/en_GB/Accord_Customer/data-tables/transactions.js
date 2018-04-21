define([
    'jquery',
    'accord.DataTableGrid'
], function ($) {
    'use strict';

    $.widget('accord.DataTableGridTransactions', $.accord.DataTableGrid, {
        _create: function () {

            var options = $.extend({
                columnDefs: [
                    {
                        className: 'price',
                        targets: [6, 7]
                    },
                    {
                        type: 'date-dd-mm-yyyy',
                        targets: [0, 3]
                    }
                ],
                order: [
                    [0, 'asc'],
                    [4, 'asc']
                ],
                language: {
                    emptyTable: 'You have no outstanding transactions'
                },
                rowCallback: function(row, data, index) {
                    options.columns.forEach(function(el, index) {
                        $(row).find('td:eq(' + index + ')').attr('data-th', el.title);
                    });
                }
            }, this.options);

            $(this.element).DataTable(options);

            $('.responsive-table .dataTable thead').on('click', function() {
                $(this).toggleClass('active');
            })
        }
    });

    return $.accord.DataTableGridTransactions;
});
