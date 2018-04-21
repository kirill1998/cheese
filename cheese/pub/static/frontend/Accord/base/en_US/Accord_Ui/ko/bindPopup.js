/**
 * @see magento/pub/static/frontend/Magento/luma/en_US/Accord_Ui/ko/bindPopup.js
 */
define([
        'jquery',
        'ko',
        'Magento_Ui/js/modal/modal',
        'jquery/ui',
        'select2'
    ],
    function ($, ko, modal) {
        "use strict";

        var options = {
            type: 'popup',
            responsive: true,
            innerScroll: true,
            title: '',
            modalClass: 'message-modal'
        };

        ko.bindingHandlers.popup = {
            init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                $(element).addClass('remark');

                var obj = valueAccessor();
                var currentMessage = obj.currentMessage;
                if (!currentMessage()) {
                    $(element).addClass('empty-remark');
                }
            },
            update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                $(element).removeClass('required-remark');
                $(element).removeClass('disabled-remark');

                if (viewModel.enable && (typeof viewModel.enable == 'function') && !viewModel.enable()) {
                    $(element).addClass('disabled-remark');
                    element.onclick = function () {
                    };
                    return;
                }

                if (viewModel.required && (typeof viewModel.required == 'function') && viewModel.required()) {
                    $(element).addClass('required-remark');
                }

                var showPopup = function () {
                    var dialog = $(element).find('.accord_popup').clone();
                    var select = $(dialog).find('select');

                    var obj = valueAccessor();
                    var lineMessages = obj.lineMessages;
                    var currentMessage = obj.currentMessage;

                    var popup = modal(options, dialog);

                    dialog.find('.js-btn-close-popup').click(function () {
                        var text = $(select).find('option[data-select2-tag]').text();
                        if (text) {
                            currentMessage(text);
                        } else {
                            currentMessage(select.val());
                        }

                        var found = false;
                        $.each(lineMessages(), function (i, el) {
                            if (el == currentMessage()) {
                                found = true;
                            }
                        });
                        if (!found) {
                            lineMessages.unshift(currentMessage());
                        }

                        if (currentMessage()) {
                            $(element).removeClass('empty-remark');
                        } else {
                            $(element).addClass('empty-remark');
                        }

                        popup.closeModal();
                    });

                    popup.openModal();

                    var lineMessagesData = [];
                    lineMessagesData.push({
                        id: '',
                        text: ''
                    });
                    $.each(lineMessages(), function (i, el) {
                        lineMessagesData.push({
                            id: el,
                            text: el
                        });
                    });
                    var parentElement = $(".popup__message-select-wr");
                    var s = select.select2({
                        tags: true,
                        theme: "bootstrap",
                        placeholder: "Select",
                        dropdownParent: parentElement,
                        allowClear: true,
                        data: lineMessagesData
                    });
                    s.val(currentMessage()).trigger("change");
                };

                element.onclick = function (e) {
                    viewModel.addToCartButton(null);
                    showPopup();
                };

                if (viewModel.showPopupTrigger && (typeof viewModel.showPopupTrigger == 'function')) {
                    viewModel.showPopupTrigger(showPopup);
                }
            }
        };

    }
);