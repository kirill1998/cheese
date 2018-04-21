/*jshint browser:true jquery:true*/
/*global alert*/
define(
    [
        'jquery'
    ],
    function ($) {
        'use strict';

        return {

            /**             *
             * @returns {Boolean}
             */
            validate: function () {
                var control = $('#guest__validate-shipping-address'),
                    form = $('#co-shipping-form');

                // execute validateShippingInformation
                control.trigger('click');

                return $(form).find('.mage-error').length == 0;
            }
        };
    }
);
