define(
    [
        'Magento_CheckoutAgreements/js/view/checkout-agreements',
        'Accord_CheckoutAgreements/js/model/agreements-modal'
    ],
    function (Component, agreementsModal) {
        'use strict';
        return Component.extend({
            defaults: {
                template: 'Accord_CheckoutAgreements/checkout/checkout-agreements'
            },

            /**
             * Show agreement content in modal
             *
             * @param element
             */
            showContent: function (element) {
                this.modalTitle(element.checkboxText);
                this.modalContent(element.content);
                agreementsModal.showModal();
            },

            /**
             * Init modal window for rendered element
             *
             * @param element
             */
            initModal: function(element) {
                agreementsModal.createModal(element);
            }
        });
    }
);
