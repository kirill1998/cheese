define([
    'jquery',
    'owl.carousel'
], function ($) {
    "use strict";

    $.widget('accord2.carousel', {
        _create: function () {
            var options = $.extend({
                responsiveClass: true,
                navigation: true,
                nav: true,
                margin: 10,
                navText: [
                    '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
                    '<i class="fa fa-angle-double-right" aria-hidden="true"></i>'
                ],
                responsive: {
                    0: {
                        items: 2
                    },
                    400: {
                        items: 3
                    },
                    600: {
                        items: 4
                    },
                    768: {
                        items: 5
                    }
                }
            }, this.options);

            $(this.element).owlCarousel(options);
        }
    });

    return $.accord2.carousel;
});
