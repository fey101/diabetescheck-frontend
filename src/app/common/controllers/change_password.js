(function (angular) {
    "use strict";

    angular.module("dbcheck.common.controllers.changePass", [
        "dbcheck.common.services",
        "dbcheck.common.formly.change_password",
        "dbcheck.common.errorMessages"
    ])

    .controller("dbcheck.common.controllers.changePassword", [
        "$scope", "$state", "dbcheck.common.formly.change_password",
        "dbcheck.auth.services.login", "errorMessage",
        function ( $scope, $state, formlyService, AuthService, alertServ) {

            $scope.fields = formlyService.getFields();

            $scope.changePassword = function () {

                var error_fxn = function (data) {
                    $scope.alert = alertServ.showError(data, "Error");
                };

                var success_fxn = function () {
                    AuthService.logout();
                    $state.go("auth_logout", {change_pwd: true});
                };

                if ($scope.changePasswordForm.$valid) {
                    AuthService.changePassword($scope.changePasswordForm.model)
                        .then(success_fxn, error_fxn);
                }
                else {
                    var data = {
                        "data": {
                            "error": "Please correct the" +
                            " errors on the form to change your password"
                        }
                    };
                    error_fxn(data);
                }
            };
        }
    ]);
})(angular);
