define([
	'jquery',
	'accord.DataTableGrid'
], function ($) {
	'use strict';

	function OrderField (data) {
		this.order 		    = data[0] || '';
        this.customerCode   = data[1] || '';
        this.orderDate 	    = data[2] || '';
        this.deliveryDate 	= data[3] || '';
        this.channel 	    = data[4] || '';
        this.total 	        = data[5] || '';
        this.status 	    = data[6] || '';
        this._view 	        = data[7] || '';
        this._reorder 	    = data[8] || '';

        this.actions = function () {
            return this.view() + this.reorder();
        };

		this.view = function () {
            return this.renderLink('view-order', 'View', this._view);
		};

        this.reorder = function () {
            return this.renderLink('reorder-order', 'Reorder', this._reorder);
        };

		this.renderLink = function (id, name, url) {
		    var link = '<span id="'+id+'">';
            link += '<a href="' + url + '">' + name + '</a>';
            link += '</span>';
            return link;
        }
	}

	$.widget('accord.DataTableGridOrders', $.accord.DataTableGrid, {
		_create: function () {
            var fieldsData = [];
            $.each(this.options.data, function (k, v) {
                fieldsData.push(new OrderField(v));
            });

            this.options.data = fieldsData;

			var options = $.extend({
                columnDefs: [
                    {
						orderable: false,
						targets: [7]
                    },
					{
						className: 'price',
						targets: [5]
					},
                    {
                        className: 'col actions',
                        targets: [7]
                    },
					{
                        type: 'date-dd-mm-yyyy',
                        targets: [2, 3]
					}
                ],
                order: [
                    [2, 'desc']
                ],
				language: {
					emptyTable: 'You have no orders'
				},
				rowCallback: function(row, data, index) {
					var headings = [
					    'Order',
                        'Order Date',
                        'Delivery Date',
                        'Channel',
                        'Total',
                        'Status'
                    ];

                    headings.forEach(function(el, index) {
                        $(row).find('td:eq(' + index + ')').attr('data-th', el);
                    });
				}
			}, this.options);

            options.columns.splice(7, 3);
            options.columns.push({
                data: 'actions',
                title: ''
            });

			$(this.element).DataTable(options);

            $('.responsive-table .dataTable thead').on('click', function() {
                $(this).toggleClass('active');
            })
		}
	});

	return $.accord.DataTableGridOrders;
});
