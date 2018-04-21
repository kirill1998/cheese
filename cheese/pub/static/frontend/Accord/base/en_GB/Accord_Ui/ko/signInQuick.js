/**
 * @see magento/vendor/magento/module-customer/view/frontend/web/js/action/login.js
 */
define([
    'uiComponent',
    'Accord_Customer/js/model/signin-popup'
], function (Component, signInPopup) {
    return Component.extend({
        initialize: function (dataMage) {
            this._super();
            var self = this;

            this.singInPopup = function () {
                window.redirectAfterLogin = '/quick_order';
                signInPopup.showModal();
            };
        }
    });
});