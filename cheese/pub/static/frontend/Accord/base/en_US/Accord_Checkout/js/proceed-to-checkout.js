define([
        'jquery',
        'Magento_Customer/js/model/authentication-popup',
        'Magento_Customer/js/customer-data',
        'Magento_Ui/js/modal/modal'
    ],
    function ($,
              authenticationPopup,
              customerData,
              modal
    ) {
        'use strict';

        var options = {
            deliveryDate: '#delivery-date',
            proceedToCheckoutButton: '.action.checkout'
        },
        currentOffer = 1,
        countOffer = $("#count_offers").text(),
        modalOptions = {
            'type': 'popup',
            'modalClass': 'agreements-modal',
            'responsive': true,
            'innerScroll': true,
            'trigger': '.show-modal',
            'buttons': [
                {
                    text: 'Proceed to Checkout',
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

        return function (config, element) {
            options.proceedUrl = config.proceedUrl;
            options.checkoutUrl = config.checkoutUrl;

            if ($('.popup-free-products').length) {
                $(element).click(function (e) {
                    showOffer(1);
                    modal(modalOptions, $('.popup-free-products'));
                    $('.popup-free-products').modal('openModal');
                });
            } else {
                $(element).click(sendRequest);
            }

        };

        function showOffer($num) {
            currentOffer = $num;
            $(".ac-free").hide();
            $("#free_" + currentOffer).show();
            $("#num_offers").text(currentOffer);
        }

        function sendRequest(event) {
            var cart = customerData.get('cart'),
                customer = customerData.get('customer'),
                dataArr = [];

            if (event) {
                event.preventDefault();
            }

            if (!customer().firstname && cart().isGuestCheckoutAllowed === false) {
                authenticationPopup.showModal();
                return;
            }

            dataArr.push({
                name: "jsonFreeProducts",
                value: JSON.stringify(window.freeProducts)
            });

            $.ajax({
                method: "POST",
                url: options.proceedUrl,
                data: dataArr,
                dataType: 'json',
                context: this,
                beforeSend: function () {
                    $(options.proceedToCheckoutButton).attr('disabled', 'disabled');
                }
            })
            .done(function (response) {
                if (response.outOfStock) {
                    window.showPopupSubs();
                } else if (response.success) {
                    location.href = options.checkoutUrl;
                    return;
                }
                $(options.proceedToCheckoutButton).attr('disabled', null);
            })
            .fail(function (error) {
                console.log("Error", JSON.stringify(error));
                $(options.proceedToCheckoutButton).attr('disabled', null);
            });
        }
    }
);
