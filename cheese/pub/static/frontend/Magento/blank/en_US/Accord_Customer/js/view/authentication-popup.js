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
        'Magento_Customer/js/model/authentication-popup',
        'Accord_Customer/js/model/authentication-popup',
        'mage/translate',
        'mage/url',
        'Magento_Ui/js/modal/alert',
        'mage/validation',
        'Accord_Customer/js/model/nearest-depot-popup',
        'Accord_Customer/js/action/get-nearest-depot',
        'Accord_Customer/js/action/continue-as-guest',
        'Accord_Customer/js/action/get-postcode-by-coordinates'
    ],
    function (
        $,
        ko,
        Component,
        loginAction,
        customerData,
        authenticationPopup,
        authenticationPopupReloader,
        $t,
        url,
        alert,
        validation,
        nearestDepotPopup,
        getNearestDepotAction,
        continueAsGuestAction,
        getPostcodeByCoordinatesAction
    ) {
        'use strict';

        return Component.extend({
            registerUrl: window.authenticationPopup.customerRegisterUrl,
            registerErpUrl: window.authenticationPopup.baseUrl + 'user/customer_erp/create/',
            forgotPasswordUrl: window.authenticationPopup.customerForgotPasswordUrl,
            autocomplete: window.checkout.autocomplete,
            storeName: window.signInPopup.storeName,
            currentUser: {
                settings: {
                    continueAsGuest: window.authenticationPopup.continueAsGuest
                }
            },
            continueAsGuestUrl: window.authenticationPopup.continueAsGuestUrl,
            isGuestCheckoutAllowed: window.authenticationPopup.isGuestCheckoutAllowed,
            depotsAmount: window.authenticationPopup.depotsAmount,
            modalWindow: null,
            isLoading: ko.observable(false),

            defaults: {
                template: 'Accord_Customer/authentication-popup'
            },

            /**
             * Init
             */
            initialize: function () {
                $.validator.addMethod('postcodeValidate', function (value) {
                    var postcodeRegex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) {0,1}[0-9][A-Za-z]{2})$/;
                    if (postcodeRegex.exec(value)){
                        return true;
                    }else {
                        return false;
                    }
                }, 'Postcode is invalid.');

                var self = this;
                this._super();
                url.setBaseUrl(window.authenticationPopup.baseUrl);
                loginAction.registerLoginCallback(function () {
                    self.isLoading(false);
                });
            },

            /** Init popup login window */
            setModalElement: function (element) {
                if (authenticationPopup.modalWindow === null) {
                    authenticationPopup.createPopUp(element);
                }
            },

            /** Is login form enabled for current customer */
            isActive: function () {
                var customer = customerData.get('customer');

                return customer() == false;
            },

            /** Show login popup window */
            showModal: function (reloadPage) {
                if (this.modalWindow) {
                    $(this.modalWindow).modal('openModal');
                } else {
                    alert({
                        content: $t('Guest checkout is disabled.')
                    });
                }
                this.reloadPage = reloadPage;
            },

            isMultipleDepotsAvailable: function () {
                return this.depotsAmount > 1;
            },

            hideContinueToCheckoutMessage: function () {
                $('.messages__continue-to-checkout').hide();
            },

            useMyLocation: function () {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var coordinates = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        getPostcodeByCoordinatesAction(coordinates).done(function (response) {
                            if (response.success) {
                                $('#postcode').val(response.data);
                                $('#postcode-for-api').val(response.data);
                            }else{
                                console.log('Oops... Something went wrong');
                            }
                        });
                    }, function (error) {
                        var message = error.message;
                        var code = error.code;

                        console.log('Error code: ' + code + ' - ' + message);
                    });
                }
            },

            continueAsGuestCalculate: function (guestPostcode) {

                if (!this.isMultipleDepotsAvailable()) {
                    continueAsGuestAction().done(function (response) {
                        if (authenticationPopupReloader.reloadPage) {
                            authenticationPopupReloader.reloadPage();
                        }
                    });
                    return true;
                }

                if (!$(guestPostcode).validation() && !$(guestPostcode).validation('isValid')) {
                    $("#isValid").attr('value', '');
                    return false;
                }
                var postcode = '';
                if($('#postcode-for-api').val() === ''){
                    postcode = $('#postcode').val();
                }else{
                    postcode = $('#postcode-for-api').val();
                }

                getNearestDepotAction(postcode).done(function (response) {
                    if (response.success) {
                        $('#depot-id').val(response.data['depot']);

                        continueAsGuestAction($('#depot-id').val()).done(function (response) {
                            location.reload();
                        });
                    }
                });
                $('#isValid').attr('value', 'true');
                if ($('#isValid').val() !== '') {
                    if($('#postcode-for-api').val() === ''){
                        $('#postcode-for-api').val(postcode);
                    }
                }
                return true;
            },

            postcodeValidate: function (guestPostcode) {
                if (!$(guestPostcode).validation() && !$(guestPostcode).validation('isValid')) {
                    $("#isValid").attr('value', '');
                    return false;
                }
                var postcode = '';
                if($('#postcode-for-api').val() === ''){
                    postcode = $('#postcode').val();
                }else{
                    postcode = $('#postcode-for-api').val();
                }
                getNearestDepotAction(postcode).done(function (response) {
                    if (response.success) {
                        $('#depot-name').html('Your nearest depot is ' + response.data['depotName']);
                        $('#address1').html(response.data['address1']);
                        $('#address2').html(response.data['address2']);
                        $('#address3').html(response.data['address3']);
                        $('#address4').html(response.data['address4']);
                        $('#depot-postcode').html(response.data['postcode']);
                        $('#depot-id').val(response.data['depot']);

                        var mark = {
                            lat: response.data['lat'],
                            lng: response.data['lng']
                        };

                        var map = new google.maps.Map(document.getElementById('depot-location-map'), {
                            zoom: 11,
                            center: mark
                        });

                        var marker = new google.maps.Marker({
                            position: mark,
                            map: map
                        });

                        $('#continue-as-guest-btn').prop("disabled", false);

                        document.getElementById('guest-block').style.display = 'none';
                        document.getElementById('nearest-depot-block').style.display = 'inherit';
                    }
                });
                $('#isValid').attr('value', 'true');
                if ($('#isValid').val() !== '') {
                    if($('#postcode-for-api').val() === ''){
                        $('#postcode-for-api').val(postcode);
                    }
                }
                return true;
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
                    loginAction(loginData, null, false);
                }
            }
        });
    }
);
