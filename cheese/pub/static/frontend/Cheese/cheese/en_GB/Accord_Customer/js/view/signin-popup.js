/**
 * Copyright © 2016 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*jshint browser:true jquery:true*/
/*global alert*/
define(
    [
        'jquery',
        'ko',
        'Magento_Ui/js/form/form',
        'Magento_Customer/js/action/login',
        'Magento_Customer/js/customer-data',
        'Accord_Customer/js/model/signin-popup',
        'mage/translate',
        'mage/url',
        'Magento_Ui/js/modal/alert',
        'mage/validation'
    ],
    function ($, ko, Component, loginAction, customerData, signInPopup, $t, url, alert) {
        'use strict';

        return Component.extend({
            registerUrl: window.signInPopup.customerRegisterUrl,
            registerErpUrl: window.signInPopup.baseUrl + 'user/customer_erp/create/',
            forgotPasswordUrl: window.signInPopup.customerForgotPasswordUrl,
            autocomplete: window.checkout.autocomplete,
            storeName: window.signInPopup.storeName,
            modalWindow: null,
            isLoading: ko.observable(false),

            defaults: {
                template: 'Accord_Customer/signin-popup'
            },

            /**
             * Init
             */
            initialize: function () {
                var self = this;
                this._super();
                url.setBaseUrl(window.signInPopup.baseUrl);
                loginAction.registerLoginCallback(function () {
                    self.isLoading(false);
                });
            },

            /** Init popup login window */
            setModalElement: function (element) {
                if (signInPopup.modalWindow == null) {
                    signInPopup.createPopUp(element);
                }
            },

            /** Is login form enabled for current customer */
            isActive: function () {
                var customer = customerData.get('customer');

                return customer() == false;
            },

            /** Show login popup window */
            showModal: function () {
                if (this.modalWindow) {
                    $(this.modalWindow).modal('openModal');
                } else {
                    alert({
                        content: $t('Guest checkout is disabled.')
                    });
                }
            },

            /** Provide login action */
            login: function (loginForm) {
                var loginData = {},
                    formDataArray = $(loginForm).serializeArray();
                formDataArray.forEach(function (entry) {
                    loginData[entry.name] = entry.value;
                });

                if ($(loginForm).validation() &&
                    $(loginForm).validation('isValid')
                ) {
                    this.isLoading(true);
                    var redirect = null;
                    if (window.redirectAfterLogin) {
                        redirect = window.redirectAfterLogin;
                    }
                    loginAction(loginData, redirect, false);
                }
            }
        });
    }
);
