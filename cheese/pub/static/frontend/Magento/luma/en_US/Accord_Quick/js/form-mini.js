/*jshint browser:true jquery:true*/
define([
    'ko',
    'jquery',
    'jquery/ui',
    'quickSearch',
    'markjs'
], function (ko, $) {
    'use strict';

    function isEmpty(value) {
        return (value.length === 0) || (value == null) || /^\s+$/.test(value);
    }

    /**
     * @see magento/vendor/magento/module-search/view/frontend/web/form-mini.js
     * @see magento/vendor/smile/elasticsuite/src/module-elasticsuite-core/view/frontend/web/js/form-mini.js
     */

    $.widget('accord.baseQuickSearch', $.smileEs.quickSearch, {
        options: {
            autocomplete: 'off',
            minSearchLength: 2,
            responseFieldElements: 'dl dd',
            selectClass: 'selected',
            submitBtn: 'button[type="submit"]',
            searchLabel: '[data-role=minisearch-label]',
            departmentNode: '#search-department',
            replaceInputOnUpDown: true
        },

        /**
         * Overriden constructor to ensure templates initialization on load
         *
         * @private
         */
        _create: function () {
            this._super();
            this._initSubmit();
        },

        _initSubmit: function () {
            var self = this;
            this.searchForm.on('submit', $.proxy(function (e) {

                if (self.responseList && self.responseList.selected) {
                    // var text = self.responseList.selected.find('.qs-option-name').text();

                    var item = $("#search").attr('aria-activedescendant');
                    if (!item && !$("#search_mini_form").find("#qs-option-1").length) {
                        item = "qs-option-0";
                    }
                    item = $("#search_mini_form").find("#" + item);
                    var href = item.attr("href");

                    if (href) {
                        window.location.href = href;
                        e.stopPropagation();
                        return false;
                    }
                }
            }));
        },

        _markJs: function (keyword, context) {
            var options = {
                separateWordSearch: true,
                diacritics: true
            };

            $(context).unmark({
                done: function () {
                    $(context).mark(keyword, options);
                }
            });
        },

        /**
         * fix parent::_onSubmit
         * @private
         */
        _onSubmit: function (e) {
            var value = this.element.val();

            if (isEmpty(value)) {
                if (e) e.preventDefault();
            }

            if (this.responseList && this.responseList.selected) {
                this.element.val(this.responseList.selected.find('.qs-option-name').text());
            }
        },

        _tab: function (e) {
            return true;
        },

        /**
         * Executes when keys are pressed in the search input field. Performs specific actions
         * depending on which keys are pressed.
         * @private
         * @param {Event} e - The key down event
         * @return {Boolean} Default return type for any unhandled keys
         */
        _onKeyDown: function (e) {
            var keyCode = e.keyCode || e.which;

            switch (keyCode) {
                case $.ui.keyCode.TAB:
                    if (this._tab(e) == true) {
                        return true;
                    }
                    break;
                case $.ui.keyCode.HOME:
                    if (!this._getFirstVisibleElement().length) {
                        break;
                    }
                    this._getFirstVisibleElement().addClass(this.options.selectClass);
                    this.responseList.selected = this._getFirstVisibleElement();
                    break;
                case $.ui.keyCode.END:
                    if (!this._getLastElement().length) {
                        break;
                    }
                    this._getLastElement().addClass(this.options.selectClass);
                    this.responseList.selected = this._getLastElement();
                    break;
                case $.ui.keyCode.ESCAPE:
                    this._resetResponseList(true);
                    this.autoComplete.hide();
                    break;
                case $.ui.keyCode.ENTER:
                    this.searchForm.trigger('submit');
                    break;
                case $.ui.keyCode.DOWN:
                    if (this.responseList.indexList) {
                        if (!this.responseList.selected) {
                            this._getFirstVisibleElement().addClass(this.options.selectClass);
                            this.responseList.selected = this._getFirstVisibleElement();
                        } else if (!this._getLastElement().hasClass(this.options.selectClass)) {
                            if (!this.responseList.selected.next().length) {
                                var next = $(this.responseList.selected).closest("dl").next().find('dd').first();
                                if (next.length) {
                                    this.responseList.selected = this.responseList.selected
                                        .removeClass(this.options.selectClass);
                                    this.responseList.selected = next
                                        .addClass(this.options.selectClass);
                                }
                            } else {
                                this.responseList.selected = this.responseList.selected
                                    .removeClass(this.options.selectClass)
                                    .next()
                                    .addClass(this.options.selectClass);
                            }
                        } else {
                            this.responseList.selected.removeClass(this.options.selectClass);
                            this._getFirstVisibleElement().addClass(this.options.selectClass);
                            this.responseList.selected = this._getFirstVisibleElement();
                        }
                        var val = this.responseList.selected.find('.qs-option-name').text();
                        if (this.options.replaceInputOnUpDown && val) {
                          this.element.val(val);
                        }

                        this.element.attr('aria-activedescendant', this.responseList.selected.attr('id'));
                    }
                    break;
                case $.ui.keyCode.UP:
                    if (this.responseList.indexList !== null) {
                        if (!this._getFirstVisibleElement().hasClass(this.options.selectClass)) {
                            if (!this.responseList.selected.prev().length) {
                                var prev = $(this.responseList.selected).closest("dl").prev().find('dd').last();
                                if (prev.length) {
                                    this.responseList.selected = this.responseList.selected
                                        .removeClass(this.options.selectClass);
                                    this.responseList.selected = prev
                                        .addClass(this.options.selectClass);
                                }
                            } else {
                                this.responseList.selected = this.responseList.selected
                                    .removeClass(this.options.selectClass)
                                    .prev()
                                    .addClass(this.options.selectClass);
                            }
                        } else {
                            this.responseList.selected.removeClass(this.options.selectClass);
                            this._getLastElement().addClass(this.options.selectClass);
                            this.responseList.selected = this._getLastElement();
                        }
                        var val = this.responseList.selected.find('.qs-option-name').text();

                        if (this.options.replaceInputOnUpDown && val) {
                            this.element.val(val);
                        }
                        this.element.attr('aria-activedescendant', this.responseList.selected.attr('id'));
                    }
                    break;
                default:
                    return true;
            }
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
            var department = $(this.options.departmentNode),
                departmentVal = null;

            if (department.length) {
                departmentVal = department.val();
            }

            if (value.length >= parseInt(this.options.minSearchLength, 10)) {

                this.currentRequest = $.ajax({
                    method: "GET",
                    url: this.options.url,
                    data: {q: value, cat: departmentVal},
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

                        this._markJs(value, "#search_autocomplete dd");

                        this.responseList.indexList
                            .on('click', function (e) {
                                self.responseList.selected = $(this);
                                if (self.responseList.selected.attr("href")) {
                                    window.location.href = self.responseList.selected.attr("href");
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

    return $.accord.baseQuickSearch;
});
