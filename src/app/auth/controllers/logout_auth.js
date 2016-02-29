(function (angular) {
    "use strict";

    angular.module("dbcheck.auth.logoutAuth", [
        "dbcheck.config",
        "dbcheck.auth.services"
    ])
    .controller("dbcheck.auth.controllers.logoutAuth",
        ["$scope", "$state", "$stateParams",
        "dbcheck.auth.services.login",
        function ($scope, $state, $stateParams, loginService) {
            $scope.logout = true;

            var callback = function () {
                loginService.stopTimeout();
                $state.go("auth_login", {
                    "change_pwd": $stateParams.change_pwd,
                    "timeout": $stateParams.timeout
                });
            };
            return loginService.logout().then(callback, callback);
        }
    ]);
})(angular);
