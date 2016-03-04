(function (angular) {
    "use strict";

    angular.module("dbcheck.auth.userDetails", [
        "dbcheck.config",
        "dbcheck.auth.services"
    ])
    .controller("dbcheck.auth.controllers.userDetails",
        ["$scope", "$state","dbcheck.auth.services.login", "$rootScope",
        function ($scope, $state, loginService, $rootScope) {
            var currUser = loginService.getUser();

            $scope.displayName = currUser.first_name + " " + currUser.last_name;

            $scope.logout = function () {
                $state.go("auth_logout");
            };

            $rootScope.$on("http.auth.forbidden", function () {
                $state.go("auth_403");
            });

            $rootScope.$on("IdleTimeout", function () {
                if (loginService.isLoggedIn() ||
                    $state.current.name !== "auth_login") {
                    loginService.dumpState($state.current, $state.params);
                    $state.go("auth_logout", {"timeout": "true"});
                }
            });
        }
    ]);
})(angular);
