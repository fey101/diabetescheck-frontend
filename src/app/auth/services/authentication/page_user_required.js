(function (angular) {
    "use strict";

    angular.module("dbcheck.auth.services.authentication.pageUserRequired", [
        "ui.router",
        "dbcheck.auth.services"
    ])

    .factory("dbcheck.authentication.pageUserRequired",
        ["$log", "$injector", "dbcheck.auth.services.login",
        function ($log, $injector, authConfig) {
            return {
                canView: function (fromParams, toParams) {
                    var notRequireUser = toParams.requireUser === false;
                    var isLoggedIn = authConfig.isLoggedIn();

                    if (!notRequireUser && !isLoggedIn) {
                        return false;
                    }
                    return true;
                },
                checkFailed: function (toState, toParams) {
                    var $state = $injector.get("$state");
                    authConfig.dumpState(toState, toParams);
                    $state.go("auth_login");
                }
            };
        }
    ]);
})(angular);
