define([
    'jquery',
    'accord.DataTableGrid'
], function ($) {
    'use strict';

    $.widget('accord.DataTableGridStatements', $.accord.DataTableGrid, {
        _create: function () {
            var options = $.extend({
                columnDefs: [
                    {
                        type: 'date-dd-mm-yyyy',
                        targets: [0]
                    },
                    {
                        className: 'col actions',
                        targets: [5]
                    },
                    {
                        orderable: false,
                        targets: [5]
                    },
                    {
                        render: function (data, type, full, meta) {
                            return '<a href="' + data + '" class="action download">' + $.mage.__('Download') + '</a>';
                        },
                        targets: [5]
                    }
                ],
                order: [
                    [0, 'desc']
                ],
                language: {
                    emptyTable: 'You have no statements'
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

    return $.accord.DataTableGridStatements;
});
