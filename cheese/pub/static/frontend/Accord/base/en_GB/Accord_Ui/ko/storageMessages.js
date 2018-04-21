/**
 * @see magento/pub/static/frontend/Magento/luma/en_US/Accord_Ui/ko/storageMessages.js
 */
define([
        'jquery',
        'ko'
    ],
    function ($, ko) {
        "use strict";

        return function (sku) {
            var self = this;
            var storage = window.sessionStorage;

            var getKey = function () {
                if (!window.customerCode) {
                    window.customerCode = "guest";
                }
                return 'lineMessages_' + window.customerCode + '_' + sku;
            };

            var setData = function (current, messages) {
                var json = JSON.stringify({
                    current: current,
                    messages: messages
                });
                storage.setItem(getKey(), json);
            };

            var getData = function () {
                var data = JSON.parse(storage.getItem(getKey()));
                if (!data || !data.messages) {
                    return {
                        current: '',
                        messages: []
                    };
                }
                return data;
            };

            this.getCurrentMessage = function () {
                return getData().current;
            };

            this.getMessages = function () {
                return getData().messages;
            };

            this.setCurrentMessage = function (value) {
                setData(value, self.getMessages());
            };

            this.setMessages = function (value) {
                setData(self.getCurrentMessage(), value);
            };

        };
    }
);