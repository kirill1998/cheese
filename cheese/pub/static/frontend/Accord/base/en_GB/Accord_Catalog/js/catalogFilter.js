define([
	'jquery'
], function ($) {
	'use strict';

	$.widget('accord.am2CatalogFilter',{
		options: {
		},
		showOverlay: function(){
			var overlay = $('<div style="position:fixed;width:100%;height: 100%;background-color: rgba(255,255,255,0.5);top:0;left:0;z-index: 1000;"></div>')
			overlay.appendTo($('body'));
		},
		setLocation: function(link){
			this.showOverlay();
			window.location = link;
		},
		_create: function () {
			var link = this.element;
			var checkbox = this.element.find('input[type=checkbox]');
			var data = {widget: this,link: link,checkbox:checkbox};

			link.bind('click', data, function(e){
				e.stopPropagation();
				e.preventDefault();
				e.data.checkbox.prop('checked', !e.data.checkbox.prop('checked'));
				e.data.widget.setLocation($(e.data.link).prop('href'));
			});

			checkbox.bind('click', data, function(e){
				e.data.widget.setLocation($(e.data.link).prop('href'));
				e.stopPropagation();
			});
		}
	});

	return $.accord.am2CatalogFilter;
});