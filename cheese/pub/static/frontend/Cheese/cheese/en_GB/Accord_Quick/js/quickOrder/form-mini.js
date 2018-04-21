/*jshint browser:true jquery:true*/
define([
    'ko',
    'jquery',
    'jquery/ui',
    'accordBaseQuickSearch'
], function (ko, $) {
    'use strict';

    /**
     * @see magento/vendor/magento/module-search/view/frontend/web/form-mini.js
     * @see magento/vendor/smile/elasticsuite/src/module-elasticsuite-core/view/frontend/web/js/form-mini.js
     * @see magento/app/code/Accord/Quick/view/frontend/web/js/form-mini.js
     */

    $.widget('accord.quickOrderSearch', $.accord.baseQuickSearch, {
        options: {
            autocomplete: 'off',
            minSearchLength: 2,
            responseFieldElements: 'dl dd',
            selectClass: 'selected',
            submitBtn: 'button[type="submit"]',
            searchLabel: '[data-role=minisearch-label]'
        },

        _initSubmit: function () {
            this.searchForm.on('submit', $.proxy(function (e) {
                var item = $("#search_2").attr('aria-activedescendant');

                if (!item && !$("#search_mini_form_2").find("#qs-option-1").length) {
                    item = "qs-option-0";
                }

                if (!item && $("#search_mini_form_2").find("#qs-option-1").length) {
                    $(".autocomplete-list-title.title-product").removeClass('not-find');
                    setTimeout(function () {
                        $(".autocomplete-list-title.title-product").addClass('not-find');
                    }, 1);
                }

                item = $("#search_mini_form_2").find("#" + item);

                var sku = item.attr("data-sku");

                if (!sku) {
                    return false;
                }

                if (window.setQuickOrderProduct)
                    window.setQuickOrderProduct(sku);
                else {
                    console.log(sku);
                }

                e.stopPropagation();
                return false;
            }));
        },

        _tab: function (e) {
            this.searchForm.trigger('submit');
        },

        /**
         * Executes when the value of the search input field changes. Executes a GET request
         * to populate a suggestion list based on entered text. Handles click (select), hover,
         * and mouseout events on the populated suggestion list dropdown.
         *
         * Overriden to :
         *  - move rendering of elements in a subfunction.
         *  - manage redirection when clicking a result having an href attribute.
         *
         * @private
         */
        _onPropertyChange: function () {
            var searchField = this.element,
                clonePosition = {
                    position: 'absolute',
                    // Removed to fix display issues
                    // left: searchField.offset().left,
                    // top: searchField.offset().top + searchField.outerHeight(),
                    width: searchField.outerWidth()
                },
                value = this.element.val();

            this.submitBtn.disabled = this._isEmpty(value);

            if (value.length >= parseInt(this.options.minSearchLength, 10)) {

                this.currentRequest = $.ajax({
                    method: "GET",
                    url: this.options.url,
                    data: {q: value},
                    // This function will ensure proper killing of the last Ajax call.
                    // In order to prevent requests of an old request to pop up later and replace results.
                    beforeSend: function () {
                        if (this.currentRequest !== null) {
                            this.currentRequest.abort();
                        }
                    }.bind(this),
                    success: $.proxy(function (data) {
                        var self = this;
                        var lastElement = false;
                        var content = this._getResultWrapper();
                        var sectionDropdown = this._getSectionHeader();
                        $.each(data, function (index, element) {

                            if (!lastElement || (lastElement && lastElement.type !== element.type)) {
                                sectionDropdown = this._getSectionHeader(element.type);
                            }

                            var elementHtml = this._renderItem(element, index);

                            sectionDropdown.append(elementHtml);

                            if (!lastElement || (lastElement && lastElement.type !== element.type)) {
                                content.append(sectionDropdown);
                            }

                            lastElement = element;
                        }.bind(this));
                        this.responseList.indexList = this.autoComplete.html(content)
                            .css(clonePosition)
                            .show()
                            .find(this.options.responseFieldElements + ':visible');

                        this._resetResponseList(false);
                        this.element.removeAttr('aria-activedescendant');

                        if (this.responseList.indexList.length) {
                            this._updateAriaHasPopup(true);
                        } else {
                            this._updateAriaHasPopup(false);
                        }

                        this._markJs(value, "#search_autocomplete_2 dd");

                        this.responseList.indexList
                            .on('click', function (e) {
                                self.responseList.selected = $(this);
                                if (self.responseList.selected.attr("href")) {
                                    var sku = self.responseList.selected.attr("data-sku");
                                    if (window.setQuickOrderProduct)
                                        window.setQuickOrderProduct(sku);
                                    else {
                                        console.log(data);
                                    }
                                    e.stopPropagation();
                                    return false;
                                }

                                self.searchForm.trigger('submit');
                            })
                            .on('mouseenter mouseleave', function (e) {
                                self.responseList.indexList.removeClass(self.options.selectClass);
                                $(this).addClass(self.options.selectClass);
                                self.responseList.selected = $(e.target);
                                self.element.attr('aria-activedescendant', $(e.target).attr('id'));
                            })
                            .on('mouseout', function () {
                                if (!self._getLastElement() && self._getLastElement().hasClass(self.options.selectClass)) {
                                    $(this).removeClass(self.options.selectClass);
                                    self._resetResponseList(false);
                                }
                            });
                    }, this)
                });
            } else {
                this._resetResponseList(true);
                this.autoComplete.hide();
                this._updateAriaHasPopup(false);
                this.element.removeAttr('aria-activedescendant');
            }
        }
    });

    return $.accord.quickOrderSearch;
});
