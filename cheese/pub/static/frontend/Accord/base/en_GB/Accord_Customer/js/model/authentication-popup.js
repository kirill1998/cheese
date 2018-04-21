/**
 * Copyright © 2016 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*jshint browser:true jquery:true*/
/*global alert*/
define(
    [
        'Magento_Customer/js/model/authentication-popup'
    ],
    function (authenticationPopup) {
        'use strict';

        return {
            reloadPage: null,
            showModal: function (cb) {
                this.reloadPage = cb;
                authenticationPopup.showModal();
            }
        }
    }
);
