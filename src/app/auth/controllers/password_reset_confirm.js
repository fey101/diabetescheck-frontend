(function (angular) {
    "use strict";

    angular.module("dbcheck.auth.passwordResetConfirm", [
        "dbcheck.config",
        "dbcheck.auth.services",
        "dbcheck.common.errorMessages",
        "dbcheck.auth.formly.reset_confirm"
    ])

    .controller("dbcheck.auth.controllers.passwordResetConfirm",
        ["$scope", "dbcheck.auth.formly.reset_confirm",
        "emr.auth.services.loginFormValidations","emr.auth.services.login",
        "$state", "errorMessage", "RECAPTCHA_PUB_KEY",
            function ($scope, formlyService, validation, loginService,
            $state, auth_error, recaptchaPubKey) {
                $scope.fields = formlyService.getFields();
                $scope.passwordModel = {};
                $scope.passwordModel.recaptcha = recaptchaPubKey;

                $scope.submitPassword = function() {
                    var error_fxn = function (data) {
                        $scope.alert = auth_error.showError(data, "Error");
                    };

                    var success_fxn = function () {
                        $state.go("auth_login", {reset_password_confirm: true});
                    };

                    if ($scope.passwordForm.$valid) {
                        var obj = {
                            "new_password1":
                                $scope.passwordModel.new_password1,
                            "new_password2":
                                $scope.passwordModel.new_password2,
                            "token": $state.params.token,
                            "uid": $state.params.uid
                        };
                        loginService.resetPasswordConfirm(obj)
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
