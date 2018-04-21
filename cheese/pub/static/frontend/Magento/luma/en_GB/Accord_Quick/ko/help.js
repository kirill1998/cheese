/**
 * @see /magento/pub/static/frontend/Magento/luma/en_US/Accord_Ui/ko/listSubs.js
 */
define([
    'jquery',
    'uiComponent',
    'ko',
    'Magento_Ui/js/modal/modal'
], function ($, Component, ko, modal) {
    return Component.extend({
        initialize: function (data) {
            this._super();
            var self = this;

            var modalOptions = {
                'type': 'popup',
                'modalClass': 'agreements-modal',
                'responsive': true,
                'innerScroll': true,
                'trigger': '.show-modal',
                'buttons': []
            };

            this.showHelp = function () {
                modal(modalOptions, $('.popup-quick-help'));
                $('.popup-quick-help').modal('openModal');
            };

        }
    });
});