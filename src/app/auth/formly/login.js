(function (angular) {
    "use strict";

    angular.module("dbcheck.auth.formly.login", [])

    .factory("dbcheck.auth.formly.login", [function () {
        /*
        *   Defining forms fields this way(other than puting them in a JSON file)
        *   enables us to take advantage of the full power of angular-formly
        *   and use it's validation that is easily implemented using JS
        */
        var getFields = function () {
            var fields = [
                {
                    "key": "username",
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
                    "key": "password",
                    "templateOptions": {
                        "addonLeft": {
                            "class": "fa fa-lock"
                        },
                        "label": "Password",
                        "reqValidationMsg": "Please provide a password here",
                        "required": true,
                        "type": "password"
                    },
                    "type": "input"
                }
            ];
            return fields;
        };

        return {
            "getFields": getFields
        };
    }]);
})(angular);
