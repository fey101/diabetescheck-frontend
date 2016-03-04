(function (angular) {
    "use strict";

    angular.module("dbcheck.auth.services", [
        "dbcheck.auth.loginService",
        "dbcheck.auth.loginFormValidationsService",
        // "dbcheck.auth.homePageService",
        // "dbcheck.actions",
        "dbcheck.authentication",
        "dbcheck.authorization"
        // "dbcheck.networking.interceptors"
    ]);
})(angular);
