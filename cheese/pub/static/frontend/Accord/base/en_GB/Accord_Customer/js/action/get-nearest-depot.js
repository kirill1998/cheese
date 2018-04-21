/*global define,alert*/
define(
    [
        'jquery'
    ],
    function (
        $
    ) {
        'use strict';
        return function (postcode) {
            return $.ajax({
                method: "GET",
                url: window.authenticationPopup.nearestDepotUrl,
                showLoader: true,
                data: {
                    postcode: postcode
                },
                dataType: 'json'
            });
        }
    }
);
