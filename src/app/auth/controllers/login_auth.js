(function (angular) {
    "use strict";

    angular.module("dbcheck.auth.loginAuth", [
        "dbcheck.config",
        "dbcheck.auth.services",
        "dbcheck.common.errorMessages",
        "dbcheck.auth.formly"
    ])
    .controller("dbcheck.auth.controllers.loginAuth",
        ["$scope", "$state", "$stateParams",
        "dbcheck.auth.services.login", "dbcheck.auth.formly.login",
        "dbcheck.auth.services.loginFormValidations", "$window", "errorMessage",
        "AVAILABLE_HOMEPAGES", function ($scope, $state, $stateParams,
            loginService, formlyService, validation, $window, auth_error,
            homePage) {

            validation.setValidations();
            $scope.loginForm = {};

            $scope.fields = formlyService.getFields();
            $scope.params = $stateParams;

            $scope.submitUser = function() {
                var error_fxn = function (data) {
                    $scope.alert = auth_error.showError(data, "Error");
                };

                var success_fxn = function () {
                    loginService.startTimeout();
                    var load_state = loginService.loadState();
                    loginService.clearState();
                    if (load_state) {
                        $state.go(load_state.name, load_state.params);
                    } else {
                        $state.go(homePage[1]);
                        // var homePage = homePageServ.determineHomePage();
                        // $state.go(homePage);
                    }
                };

                if ($scope.loginForm.$valid) {
                    loginService.login($scope.loginForm.model)
                        .then(
                            function () {
                                loginService.currentUser()
                                    .then(success_fxn, error_fxn);
                            },
                            error_fxn
                        );
                }
                else {
                    var data = {
                        "data": {
                            "error": "Please correct the" +
                            " errors on the form before logging In"
                        }
                    };
                    error_fxn(data);
                }
            };
        }
    ]);
})(angular);
