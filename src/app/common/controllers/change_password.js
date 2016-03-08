(function (angular) {
    "use strict";

    angular.module("emr.common.controllers.changePass", [
        "emr.common.services",
        "emr.common.formly.change_password",
        "emr.common.errorMessages"
    ])

    .controller("emr.common.controllers.changePassword", [
        "$scope", "$state", "emr.common.formly.change_password",
        "emr.auth.services.login", "errorMessage",
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
