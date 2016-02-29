(function (angular) {
    "use strict";

    angular.module("dbcheck.auth.passwordReset", [
        "dbcheck.config",
        "dbcheck.auth.services",
        "dbcheck.common.errorMessages",
        "dbcheck.auth.formly.reset_email"
    ])
    .controller("dbcheck.auth.controllers.passwordReset",
        ["$scope", "dbcheck.auth.formly.reset_email",
        "dbcheck.auth.services.loginFormValidations","dbcheck.auth.services.login",
        "$state", "errorMessage", "RECAPTCHA_PUB_KEY",
            function ($scope, formlyService, validation, loginService,
            $state, auth_error, recaptchaPubKey) {

                $scope.fields = formlyService.getFields();
                $scope.resetModel = {};
                $scope.resetModel.recaptcha = recaptchaPubKey;

                $scope.submitEmail = function() {
                    var error_fxn = function (data) {
                        $scope.alert = auth_error.showError(data, "Error");
                    };

                    var success_fxn = function () {
                        $state.go("auth_login", {reset_password: true});
                    };

                    if ($scope.resetForm.$valid) {
                        loginService.resetPassword($scope.resetModel.email)
                            .then(success_fxn, error_fxn);
                    }
                    else {
                        var data = {
                            "data": {
                                "error": "Please correct the" +
                                " errors on the form to reset your password"
                            }
                        };
                        error_fxn(data);
                    }
                };
            }
    ]);
})(angular);
