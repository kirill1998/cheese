/**
 * @see http://inchoo.net/magento-2/custom-javascript-in-magento-2-with-requirejs/
 * @see http://devdocs.magento.com/guides/v2.1/javascript-dev-guide/javascript/js_init.html
 * @see magento/pub/static/frontend/Magento/luma/en_US/Accord_Ui/ko/lineMessage.js
 */
define([
        'jquery',
        'ko',
        /*'Magento_Customer/js/model/customer',*/
        'ko.storageMessages',
        'Accord_Customer/js/model/authentication-popup',
        'ko.bindPopup'
    ],
    function ($, ko, StorageMessages, authenticationPopup) {
        "use strict";

        return function (data, parent) {
            var self = this;

            this.getTemplate = function () {
                return data.templateLineMessage;
            };

            var messages = new StorageMessages(data.product.sku);

            this.enable = parent.isInStock;
            this.currentMessage = ko.observable();
            if (messages.getCurrentMessage()) {
                this.currentMessage(messages.getCurrentMessage());
            }

            if (data.currentMessage) {
                this.currentMessage(data.currentMessage);
            }

            this.addToCartButton = ko.observable(null);

            this.isWeighted = ko.computed(function () {
                return (data.cfg.isMandatoryWeightedLineMessages && data.product.weighted);
            });

            this.isWeightedMssage = ko.computed(function () {
                return (data.cfg.isMandatoryWeightedLineMessages && data.product.weighted && self.addToCartButton());
            });

            this.required = ko.computed(function () {
                return (data.cfg.isMandatoryWeightedLineMessages && data.product.weighted && !self.currentMessage());
            });

            this.showPopupTrigger = ko.observable(function () {
            });

            this.currentMessage.subscribe(function (newValue) {
                if (self.addToCartButton() && newValue) {
                    $(self.addToCartButton()).click();
                }
            });

            parent.addToCartClick = function (k, e) {
                if(!window.authenticationPopup.isLoggedIn && !window.authenticationPopup.FirstAddingProduct){
                    window.authenticationPopup.FirstAddingProduct = true;
                    authenticationPopup.showModal(function() {
                        location.reload();
                    });
                }
                if (self.required()) {
                    self.addToCartButton(e.target);
                    self.showPopupTrigger()(e);
                    e.stopPropagation();
                    return false;
                }
                return true;
            };

            this.lineMessages = ko.observableArray(data.lineMessages);
            var msgs = messages.getMessages();
            if (msgs && msgs.length) {
                $.each(data.lineMessages, function (i, item) {
                    if ($.inArray(item, msgs) == -1) {
                        msgs.push(item);
                    }
                });
                this.lineMessages(msgs);
            }

            var storeLineMessage = (typeof data.cfg.storeLineMessage != "undefined" ? data.cfg.storeLineMessage : true);

            if (storeLineMessage) {
                this.currentMessage.subscribe(function (newValue) {
                    messages.setCurrentMessage(self.currentMessage());
                });

                this.lineMessages.subscribe(function (newValue) {
                    if (self.currentMessage()) {
                        messages.setMessages(newValue);
                    }
                });
            }

        };
    }
);