/**
 * @see magento/pub/static/frontend/Magento/luma/en_US/Accord_Checkout/js/onepage/proceed-to-order.js
 */
define([
        'jquery',
        'Magento_Customer/js/model/authentication-popup',
        'Magento_Customer/js/customer-data',
        'Magento_Checkout/js/action/redirect-on-success',
        'Magento_Ui/js/modal/modal',
        'mage/mage'
    ],
    function ($,
              authenticationPopup,
              customerData,
              redirectOnSuccessAction,
              modal,
              mage
    ) {
        'use strict';
        var options = {
            formCheckout: '#form-checkout',
            deliveryDate: '#delivery-date',
            proceedToCheckoutButton: '#proceed-to-checkout, .proceed-to-checkout-free',
            agreementsForm: '#agreements-form'
        };

        var currentOffer = 1;
        var countOffer = $("#count_offers").text();

        var modalOptions = {
            'type': 'popup',
            'modalClass': 'agreements-modal',
            'responsive': true,
            'innerScroll': true,
            'trigger': '.show-modal',
            'buttons': [
                {
                    text: 'Place Order',
                    class: 'action checkout btn btn-lg btn-primary proceed-to-checkout-free',
                    click: function (e) {

                        var assertQty = window.freeProducts[currentOffer].assertQty;
                        if (assertQty < 0) {
                            var free = window.freeProducts[currentOffer].free;
                            alert("The number of free items selected exceeds your entitlement, please amend the quantity.");
                            return;
                        }
                        if (assertQty) {
                            alert("Please choose " + assertQty + " additional free item" + (assertQty > 1 ? "s" : "") + ".");
                            return;
                        }

                        var assertMessage = window.freeProducts[currentOffer].assertMessage;
                        if (assertMessage) {
                            alert("Please enter message");
                            return;
                        }

                        if (currentOffer >= countOffer) {
                            this.closeModal();
                            sendRequest(e);
                        } else {
                            $(".ac-free").hide();
                            currentOffer++;
                            showOffer(currentOffer);
                        }
                    }
                }
            ]
        };

        $(options.agreementsForm).mage('validation', {
            ignore: '',
            errorPlacement: function(error, element) {
                element.parent().append(error);
            }
        });

        return function (config, element) {
            options.toOrderUrl = config.toOrderUrl;

            if ($('.popup-free-products').length) {
                $(element).click(function (e) {
                    if (!isValid()) {
                        return false;
                    }
                    showOffer(1);
                    modal(modalOptions, $('.popup-free-products'));
                    $('.popup-free-products').modal('openModal');
                });
            } else {
                $(element).click(sendRequest);
            }

        };

        function isValid() {
            if (!$(options.formCheckout).validation('isValid')) {
                return false;
            }
            if (!$(options.agreementsForm).validation('isValid')) {
                return false;
            }

            return true;
        }

        function showOffer($num) {
            currentOffer = $num;
            $(".ac-free").hide();
            $("#free_" + currentOffer).show();
            $("#num_offers").text(currentOffer);
        }

        function sendRequest(event) {
            var cart = customerData.get('cart'),
                customer = customerData.get('customer');

            if (event) event.preventDefault();

            if (!customer().firstname && cart().isGuestCheckoutAllowed === false) {
                authenticationPopup.showModal();

                return false;
            }

            var dataArr = $(options.formCheckout + ',' + options.agreementsForm).serializeArray();
            dataArr.push({
                name: "jsonFreeProducts",
                value: JSON.stringify(window.freeProducts)
            });

            $.ajax({
                method: "POST",
                url: options.toOrderUrl,
                data: dataArr,
                dataType: 'json',
                context: this,
                beforeSend: function () {
                    if (!isValid()) {
                        return false;
                    }
                    $(options.proceedToCheckoutButton).attr('disabled', 'disabled');
                }
            })
                .done(function (response) {
                    if (response.outOfStock) {
                        window.showPopupSubs();
                    }

                    if (response.success) {
                        redirectOnSuccessAction.execute();
                        return false;
                    }

                    $(options.proceedToCheckoutButton).attr('disabled', null);

                })
                .fail(function (error) {
                    console.log("Error", JSON.stringify(error));
                    $(options.proceedToCheckoutButton).attr('disabled', null);
                });
            return false;
        }
    }
);
