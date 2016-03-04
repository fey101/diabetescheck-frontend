(function (angular) {
    "use strict";

    angular.module("dbcheck.auth.loginFormValidationsService",[
        "ui.router",
        "dbcheck.config",
        "dbcheck.auth.oauth2",
        "formly"
    ])

    .factory("dbcheck.auth.services.loginFormValidations",
        ["formlyValidationMessages", function (formlyValidationMessages) {
            var setValidations = function () {

                function validateEmail($viewValue, $modelValue, scope) {
                    var message;
                    if (scope.options.key === "username" && scope.fc.$error.email) {
                        message = "Please fill in a valid E-mail Address";
                    }

                    return message;
                }

                function getRequiredMessage($viewValue, $modelValue, scope) {
                    var message;
                    if (scope.options.key === "username") {
                        message = "Please fill in an E-mail Address";
                    }
                    else if (scope.options.key === "password") {
                        message = "Please fill in a password";
                    }

                    else {
                        message = "This field is required";
                    }
                    return message;
                }

                formlyValidationMessages.messages.required = getRequiredMessage;
                formlyValidationMessages.messages.email = validateEmail;
            };
            return {"setValidations": setValidations};
        }
    ]);
})(angular);
