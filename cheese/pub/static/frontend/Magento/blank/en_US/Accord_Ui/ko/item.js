/**
 * @see http://inchoo.net/magento-2/custom-javascript-in-magento-2-with-requirejs/
 * @see http://devdocs.magento.com/guides/v2.1/javascript-dev-guide/javascript/js_init.html
 * @see magento/pub/static/frontend/Magento/luma/en_US/Accord_Ui/ko/item.js
 */
define([
        'jquery',
        'ko',
        'ko.lineMessage',
        'mage/translate',
        'ko.bindings.popover'
    ],
    function ($, ko, LineMessageModel, $t) {
        "use strict";

        return function (data) {
            var self = this;

            var minicartSelector = '[data-block="minicart"]';
            var messagesSelector = '[data-placeholder="messages"]';
            var productStatusSelector = '.stock.available';
            var addToCartButtonSelector = '.action.tocart';
            var addToCartButtonDisabledClass = 'disabled';
            var addToCartButtonTextWhileAdding = '';
            var addToCartButtonTextAdded = '';
            var addToCartButtonTextDefault = '';

            var SIZE_TYPE_NO = 'No Pack Size';
            var SIZE_TYPE_RETAIL = 'Retail Pack Size';
            var SIZE_TYPE_UNITS = 'Pack Size Units';
            var SIZE_TYPE_RETAIL_UNITS = 'Pack Size Units & Retail Pack Size';

            var STOCK_TYPE_GUEST = 'unknown';
            var STOCK_TYPE_OUT = 'out';
            var STOCK_TYPE_DEMAND = 'demand';
            var STOCK_TYPE_LOW = 'low';
            var STOCK_TYPE_NORMAL = 'normal';

            var SINGLE_VALUE = 'Singles';
            var CASE_VALUE = 'Cases';
            var SINGLE_INDEX = 'single';
            var CASE_INDEX = 'case';

            this.getQuoteOption = function (optionName) {
                if (!data.quote || !data.quote[optionName]) {
                    return null;
                }

                return data.quote[optionName];
            };

            this.getAccordCartOption = function (optionName) {
                if (!data.accordCart || !data.accordCart[optionName]) {
                    return null;
                }

                return data.accordCart[optionName];
            };


            /**
             * qtyType
             */

            this.qtyTypeOptions = [CASE_VALUE, SINGLE_VALUE];

            this.qtyTypeVisible = data.cfg.isToggleQuantityType;

            this.qtyTypeValue = ko.observable(this.getQuoteOption('qtyTypeValue') || data.cfg.getDefaultQuantityType); // 'Cases' | 'Singles'

            this.qtyTypeEnabled = data.cfg.isToggleQuantityType;

            if (data.product.caseOnly) {
                this.caseOnly = true;
                this.qtyTypeValue(CASE_VALUE);
                this.qtyTypeEnabled = false;
            }

            this.qtyType = ko.computed(function () {
                if (self.qtyTypeValue() == CASE_VALUE) {
                    return CASE_INDEX;
                }
                if (self.qtyTypeValue() == SINGLE_VALUE) {
                    return SINGLE_INDEX;
                }
            });


            /**
             * qty
             */

            this.minQty = ko.observable(1);

            this.maxQty = ko.computed(function () {
                var maxQty = 1000000000000;
                if (self.qtyType() != CASE_INDEX && data.cfg.stock.maxQty != 0) {
                    maxQty = data.cfg.stock.maxQty;
                }

                if (!data.customer) {
                    return maxQty;
                }
                if (!data.customer.stock || !data.customer.stock[self.qtyType()]) {
                    return 1;
                }
                var stock = data.customer.stock[self.qtyType()];
                if (stock > maxQty) {
                    return maxQty;
                }
                return stock;
            });

            this.qty = ko.observable(this.getQuoteOption('qty') || 1);

            this.minus = function () {
                if (self.qty() <= self.minQty()) {
                    return;
                }
                self.qty(parseInt(self.qty()) - 1);
            };

            this.plus = function () {
                if (self.qty() >= self.maxQty()) {
                    return;
                }
                self.qty(parseInt(self.qty()) + 1);
            };

            this.forceUpdateQuantity = true;

            this.qty.subscribe(function (newValue) {
                if (!self.forceUpdateQuantity) {
                    return;
                }

                if (parseInt(newValue) > self.maxQty()) {
                    self.qty(self.maxQty());
                }
                if (parseInt(newValue) < self.minQty()) {
                    self.qty(self.minQty());
                }
            });

            /**
             * PackSize
             */
            this.packSize = ko.observable(null);
            switch (data.cfg.packSizeType) {
                case SIZE_TYPE_NO:
                    this.packSize('');
                    break;
                case SIZE_TYPE_RETAIL:
                    this.packSize('Pack Size: ' + data.product.pack);
                    break;
                case SIZE_TYPE_UNITS:
                    this.packSize(data.product.size);
                    break;
                case SIZE_TYPE_RETAIL_UNITS:
                    this.packSize(data.product.size + " (" + data.product.pack + ")");
                    break;
            }

            /**
             * Price
             */

            this.isShowPrice = ko.observable(data.cfg.isShowPricesToGuests);
            if (data.customer) {
                this.isShowPrice(true);
            }

            this.priceStrike = ko.computed(function () {
                if (!data.customer) {
                    return null;
                }

                if (data.customer.strikePrice[self.qtyType()]) {
                    return data.customer.strikePrice[self.qtyType()];
                }

                return null;
            });

            this.price = ko.computed(function () {
                if (!data.customer) {
                    if (data.product.price && data.product.price[self.qtyType()]) {
                        return data.product.price[self.qtyType()];
                    }
                    return null;
                }

                if (data.customer.price[self.qtyType()]) {
                    return data.customer.price[self.qtyType()];
                }

                return null;
            });

            this.isWeighted = ko.computed(function() {
                if (data.product && data.product['weighted']) {
                    return true;
                }

                return null;
            });

            this.weightUtil = ko.computed(function () {
                return '(' + data.customer.price['priceWeightUnit'] + ' per ' + data.product['weightUnit'] +')';
            });


            this.priceWithoutFormat = ko.computed(function () {
                if (!data.customer) {
                    if (data.product.priceWithoutFormat && data.product.priceWithoutFormat[self.qtyType()]) {
                        return data.product.priceWithoutFormat[self.qtyType()];
                    }
                    return null;
                }

                if (data.customer.priceWithoutFormat[self.qtyType()]) {
                    return data.customer.priceWithoutFormat[self.qtyType()];
                }

                return null;
            });

            this.supplier = data.product.supplier;

            this.getRowTotal = function () {
                return self.getAccordCartOption('acLineValueFormat');
            };

            this.getCalculatePrice = function () {
                return self.getAccordCartOption('acPriceFormat');
            };

            /**
             * Stock
             */

            this.stockType = ko.computed(function () {
                if (!data.customer) {
                    return STOCK_TYPE_GUEST;
                }

                var stock = data.customer.stock[self.qtyType()];
                switch (true) {
                    case (stock <= data.cfg.stock.out.value):
                        return STOCK_TYPE_OUT;
                    case (stock == data.cfg.stock.demand.value):
                        return STOCK_TYPE_DEMAND;
                    case (stock <= data.cfg.stock.low.value):
                        return STOCK_TYPE_LOW;
                    default:
                        return STOCK_TYPE_NORMAL;
                }
            });

            this.stockMessage = ko.computed(function () {
                var type = self.stockType();
                if (type == STOCK_TYPE_OUT && data.customer.subCount && data.cfg.stock['sub'].message) {
                    return data.cfg.stock['sub'].message;
                }
                if (data.cfg.stock[type] && data.cfg.stock[type].message) {
                    return data.cfg.stock[type].message;
                }
                return null;
            });

            this.isInStock = ko.computed(function () {
                if (self.stockType() == STOCK_TYPE_OUT) {
                    return false;
                }

                return true;
            });

            this.canInc = ko.computed(function(){
                return self.isInStock() && (parseInt(self.qty()) < parseInt(self.maxQty()));
            });

            this.canDec = ko.computed(function(){
                return self.isInStock() && (parseInt(self.qty()) > self.minQty());
            });

            this.isIsSub = ko.computed(function () {
                if (self.stockType() != STOCK_TYPE_OUT) {
                    return false;
                }
                if (!data.customer.subCount) {
                    return false;
                }
                return true;
            });

            this.postData = data.product.postData;
            this.postParams = JSON.parse(this.postData);
            this.formKey = data.formKey;

            this.productUrl = data.product.url;

            this.addSub = function () {
                if (window.location.href == self.productUrl || window.location.href == self.productUrl + "#sub" || window.location.href == self.productUrl + "#substitutes") {
                    window.location.href = "#substitutes";
                } else {
                    window.location.href = self.productUrl + "#sub";
                }
            };

            this.isOfferFlag = data.isOfferFlag;

            this.rsp = data.product.rsp;
            this.rspWithoutFormat = data.product.rspWithoutFormat;

            this.lastOrdered = ko.computed(function () {
                if (!data.customer) {
                    return;
                }
                return data.customer.lastOrdered;
            });


            this.currencySymbol = data.cfg.currencySymbol;

            var firstItem;
            if (data.customer) {
                $.each(data.customer.wsps, function (i, item) {
                    if (item.case == 1) {
                        firstItem = item;
                        return false; // break;
                    }
                });
            }

            this.wsps = ko.computed(function () {
                var wsps = [];
                if (!firstItem) {
                    return wsps;
                }

                $.each(data.customer.wsps, function (i, item) {
                    if (item.case <= 1) {
                        return; // continue;
                    }
                    item.percentage = Math.round((1 - item.wsp / firstItem.wsp) * 100);
                    item.plus = true;
                    if (item.case == 1) {
                        item.plus = false;
                    }
                    wsps.push(item);
                });
                return wsps;
            });

            this.visibleWsps = ko.computed(function () {
                if (self.wsps().length <= 1) {
                    return false;
                }

                var SINGLE_INDEX = 'single';
                if (self.qtyType() == SINGLE_INDEX) {
                    return false;
                }

                return true;
            });


            // todo
            this.isQualifiedFlag = false;
            this.qualifiedText = 'x3';

            this.addToCartClick = function () {
                return true;
            };

            this.ajaxSubmit = function (formElement, success) {
                var form = $(formElement);
                disableAddToCartButton(formElement);
                $(minicartSelector).trigger('contentLoading');
                $.ajax({
                    url: form.attr('action'),
                    data: form.serialize(),
                    type: 'post',
                    dataType: 'json',
                    beforeSend: function () {
                        return;
                    },
                    success: function (res) {
                        if (res.backUrl) {
                            window.location = res.backUrl;
                            return;
                        }
                        if (res.messages) {
                            $(messagesSelector).html(res.messages);
                        }
                        if (res.minicart) {
                            $(minicartSelector).replaceWith(res.minicart);
                            $(minicartSelector).trigger('contentUpdated');
                        }
                        if (res.product && res.product.statusText) {
                            $(productStatusSelector)
                                .removeClass('available')
                                .addClass('unavailable')
                                .find('span')
                                .html(res.product.statusText);
                        }

                        enableAddToCartButton(formElement);

                        if (success) {
                            success(res);
                        }
                    }
                });
            };

            this.onSubmit = function (formElement) {
                self.ajaxSubmit(formElement);
            };

            function disableAddToCartButton(form) {
                var addToCartButtonTextWhileAdding = addToCartButtonTextWhileAdding || $t('Adding...');
                var addToCartButton = $(form).find(addToCartButtonSelector);
                addToCartButton.addClass(addToCartButtonDisabledClass);
                addToCartButton.find('span').text(addToCartButtonTextWhileAdding);
                addToCartButton.attr('title', addToCartButtonTextWhileAdding);
            }

            function enableAddToCartButton(form) {
                var addToCartButtonTextAdded = addToCartButtonTextAdded || $t('Added');
                var addToCartButton = $(form).find(addToCartButtonSelector);

                addToCartButton.find('span').text(addToCartButtonTextAdded);
                addToCartButton.attr('title', addToCartButtonTextAdded);

                setTimeout(function () {
                    var addToCartButtonTextDefault = addToCartButtonTextDefault || $t('Add to Cart');
                    addToCartButton.removeClass(addToCartButtonDisabledClass);
                    addToCartButton.find('span').text(addToCartButtonTextDefault);
                    addToCartButton.attr('title', addToCartButtonTextDefault);
                }, 1000);
            }

            this.lineMessageModel = ko.observable(new LineMessageModel(data, this));

            this.freeLine = false;
            this.mixMatchCode = "";

            this.originalSku = "";
            if (data.originalSku) {
                this.originalSku = data.originalSku;
            }

        };
    }
);