(function (angular) {
    "use strict";

    angular.module("emr.auth.services.authentication.pageUserRequired", [
        "ui.router",
        "emr.auth.services"
    ])

    .factory("emr.authentication.pageUserRequired",
        ["$log", "$injector", "emr.auth.services.login",
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
