/**
 * @see am2/pub/static/frontend/Magento/luma/en_US/Accord_Ui/ko/ko.bindings.popover.js
 */
define([
        'jquery',
        'ko',
        'jquery.bootstrap'
    ],
    function ($, ko) {


        (function (window, document, undefined) {

            var
                htmlDataAttributePrefix = 'popover-',
                defaults = {
                    animation: undefined,
                    html: undefined,
                    placement: 'top',
                    selector: undefined,
                    trigger: 'hover',
                    title: 'Default Title',
                    content: 'Default content',
                    delay: undefined,
                    container: 'body',
                    template: '<div class="popover popover-closers" role="tooltip"><div class="arrow"></div><button class="popover-closers__btn" type="button"><span>Close</span></button><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
                };

            ko.bindingHandlers.popover = {
                update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                    var $elem = $(element),
                        isPopover = valueAccessor(),
                        popoverOptions = allBindingsAccessor().popoverOptions;

                    var content = $(element).closest('.price-container').find(".popover-content").html();

                    if (isPopover) {
                        initPopover($elem, popoverOptions, content);
                        return;
                    }

                    if (popoverOptions.elem) {
                        var elems = $elem.find(popoverOptions.elem);

                        if (!elems) {
                            throw new Error('Element \'$ELEM$\' was not found'.replace('$ELEM$', popoverOptions.elem));
                        }

                        initPopover(elems, popoverOptions, content);
                    }
                }
            };

            function initPopover(elems, overrides, content) {
                elems.each(function () {
                    var dataValues = {};

                    for (var p in defaults) {
                        dataValues[p] = $(this).data(htmlDataAttributePrefix + p);
                    }

                    if (content) {
                        dataValues["content"] = content;
                    }

                    $(this).popover($.extend({}, defaults, dataValues, overrides));
                });

            }

        })(window, document);

    });