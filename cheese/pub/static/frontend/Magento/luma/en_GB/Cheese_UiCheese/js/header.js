define([
    "jquery",
    "jquery/ui",
    "mage/translate"
], function ($) {
    'use strict';

    $(function () {
        if ($('#back-to-top-btn').length) {
            var scrollTrigger = 400,
                backToTop = function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > scrollTrigger) {
                        $('#back-to-top-btn').addClass('show');
                    } else {
                        $('#back-to-top-btn').removeClass('show');
                    }
                };
            backToTop();
            $(window).on('scroll', function () {
                backToTop();
            });
            $('#back-to-top-btn').on('click', function (e) {
                e.preventDefault();
                $('html,body').animate({
                    scrollTop: 0
                }, 900);
            });
        }


        var scroll = $(document).scrollTop();
        var headerHeight = $('.page-header').outerHeight();

        $(window).scroll(function() {
            var scrolled = $(document).scrollTop();
            if (scrolled > headerHeight+45){
                $('.page-header').css('top', -scrolled);
            } else {
                $('.page-header').css('top', 0);
            }

            if (scrolled > scroll){
                $('.page-header').removeClass('fixed');
            } else {
                $('.page-header').addClass('fixed');
            }
            scroll = $(document).scrollTop();
        });
    })
});
