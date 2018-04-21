/**
 * @see magento/pub/static/frontend/Magento/luma/en_US/Accord_Ui/ko/itemCart.js
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
                signInPopup.showModal();
            };
        }
    });
});