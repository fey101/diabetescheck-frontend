(function (angular) {
    "use strict";

    angular.module("dbcheck.auth.formly.reset_confirm", [])

    .factory("dbcheck.auth.formly.reset_confirm", [function () {
        /*
        *   Defining forms fields this way(other than puting them in a JSON file)
        *   enables us to take advantage of the full power of angular-formly
        *   and use it's validation that is easily implemented using JS
        */
        var getFields = function () {
            var fields = [
                {
                    "key": "new_password1",
                    "templateOptions": {
                        "addonLeft": {
                            "class": "fa fa-lock"
                        },
                        "label": "New password",
                        "reqValidationMsg": "Please provide a password here",
                        "required": true,
                        "type": "password"
                    },
                    "type": "input"
                },
                {
                    "expressionProperties": {
                        "templateOptions.pwCheckerVal": "model.new_password1"
                    },
                    "key": "new_password2",
                    "ngModelAttrs": {
                        "pwCheckerVal": {
                            "attribute": "pw-checker"
                        }
                    },
                    "templateOptions": {
                        "addonLeft": {
                            "class": "fa fa-lock"
                        },
                        "label": "Confirm password",
                        "reqValidationMsg": "Please provide a password here",
                        "required": true,
                        "type": "password"
                    },
                    "type": "input"
                },
                {
                    "key": "recaptcha",
                    "templateOptions": {
                        "label": "Prove your not a robot"
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
