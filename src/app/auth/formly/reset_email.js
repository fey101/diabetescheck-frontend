(function (angular) {
    "use strict";

    angular.module("dbcheck.auth.formly.reset_email", [])

    .factory("dbcheck.auth.formly.reset_email", [function () {
        /*
        *   Defining forms fields this way(other than puting them in a JSON file)
        *   enables us to take advantage of the full power of angular-formly
        *   and use it's validation that is easily implemented using JS
        */
        var getFields = function () {
            var fields = [
                {
                    "key": "email",
                    "templateOptions": {
                        "addonLeft": {
                            "class": "fa fa-envelope"
                        },
                        "emailValidationMsg": "Please provide a valid" +
                        " email address",
                        "label": "Email",
                        "reqValidationMsg": "Please provide an email" +
                        " address here",
                        "required": true,
                        "type": "email"
                    },
                    "type": "input"
                },
                {
                    "key": "recaptcha",
                    "templateOptions": {
                        "label": "Proove your not a robot"
                    },
                    "type": "recaptcha"
                }
            ];
            return fields;
        };

        return {
            "getFields": getFields
        };
    }]);
})(angular);
