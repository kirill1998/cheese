/*global define,alert*/
define(
    [
        'jquery'
    ],
    function (
        $
    ) {
        'use strict';
        return function (depotId) {
            return $.ajax({
                method: "GET",
                url: window.authenticationPopup.continueAsGuestUrl,
                showLoader: true,
                data: {
                    depotId: depotId
                },
                dataType: 'json'
            });
        }
    }
);
