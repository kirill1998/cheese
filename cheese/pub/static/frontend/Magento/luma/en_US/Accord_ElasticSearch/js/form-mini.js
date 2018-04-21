/*jshint browser:true jquery:true*/
define([
    'ko',
    'jquery',
    'jquery/ui',
    'accordBaseQuickSearch'
], function (ko, $) {
    'use strict';

    function isEmpty(value) {
        return (value.length === 0) || (value == null) || /^\s+$/.test(value);
    }

    /**
     * @see magento/vendor/magento/module-search/view/frontend/web/form-mini.js
     * @see magento/vendor/smile/elasticsuite/src/module-elasticsuite-core/view/frontend/web/js/form-mini.js
     */

    $.widget('accord.quickSearch', $.accord.baseQuickSearch, {
        options: {
            autocomplete: 'off',
            minSearchLength: 2,
            responseFieldElements: 'dl dd',
            selectClass: 'selected',
            submitBtn: 'button[type="submit"]',
            searchLabel: '[data-role=minisearch-label]',
            departmentNode: '#search-department'
        },

        searchControlFocus: false,
        departControlFocus: false,

        /**
         * Overriden constructor to ensure templates initialization on load
         *
         * @private
         */
        _create: function () {
            this._super();
            this._initSubmit();
            this.element.unbind('blur');

            $(this.options.departmentNode).on('blur', $.proxy(function () {
                this.departControlFocus = false;
                this._hideControls();
            }, this));

            this.element.on('blur', $.proxy(function () {
                setTimeout($.proxy(function () {
                    this.searchControlFocus = false;
                    this.autoComplete.hide();
                    this._hideControls();
                }, this), 250);
            }, this));

            this.element.on('focus', $.proxy(function () {
                this.searchControlFocus = true;
            }, this));
            $(this.options.departmentNode).on('focus', $.proxy(function () {
                this.departControlFocus = true;
            }, this));
        },

        _isControlsInFocus: function () {
            return (this.searchControlFocus || this.departControlFocus);
        },

        _hideControls: function () {
            setTimeout($.proxy(function () {
                if (this._isControlsInFocus()) {
                    return;
                }
                if (this.autoComplete.is(':hidden')) {
                    this.setActiveState(false);
                }
                this._updateAriaHasPopup(false);
            }, this), 250);
        }
    });

    return $.accord.quickSearch;
});
