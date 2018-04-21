/*global define,alert*/
define(
    [
        'jquery'
    ],
    function (
        $
    ) {
        'use strict';
        return function (coordinates) {
            return $.ajax({
                method: "GET",
                url: window.authenticationPopup.postcodeByCoordinatesUrl,
                showLoader: true,
                data: {
                    coordinates: coordinates
                },
                dataType: 'json'
            });
        }
    }
);
