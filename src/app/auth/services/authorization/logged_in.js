(function (angular) {
    "use strict";

    angular.module("dbcheck.auth.services.authorization.loggedin", [
        "dbcheck.authentication",
        "dbcheck.auth.services"
    ])

    .factory("dbcheck.authorization.loggedin",
        ["dbcheck.auth.services.login",
        function (authConfig) {

            return {
                hasPermissions : function () {
                    return authConfig.isLoggedIn();
                }
            };
        }
    ]);
})(angular);
