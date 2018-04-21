define([
    'jquery',
    'accord.DataTableGrid'
], function ($) {
    'use strict';

    $.widget('accord.DataTableGridUsers', $.accord.DataTableGrid, {
        _create: function () {

            var options = $.extend({
                columns: [
                    {title: 'ID', data: 'id'},
                    {
                        title: 'Name',
                        data: null,
                        render: function(data, type, row) {
                            return data.firstname + ' ' + data.lastname;
                        }
                    },
                    {title: 'Email', data: 'email'},
                    {title: 'Ordering', data: 'ac_is_ordering'},
                    {title: 'Financials', data: 'ac_is_viewing_financials'},
                    {title: 'User Management', data: 'ac_is_user_management'},
                    {title: 'Status', data: 'ac_status'},
                    {
                        data: null,
                        render: function(data, type, row) {
                            return '<a href="' + data.edit_url + '">Edit</a>';
                        },
                        orderable: false
                    }
                ],
                order: [
                    [0, 'desc']
                ],
                language: {
                    emptyTable: 'You have no users'
                }
            }, this.options);

            $(this.element).DataTable(options);
        }
    });

    return $.accord.DataTableGridUsers;
});


