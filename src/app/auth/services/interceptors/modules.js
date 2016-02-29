(function (angular) {
    "use strict";

    angular.module("dbcheck.networking.interceptors", [
        "dbcheck.auth.services.interceptors.httpactivity",
        "dbcheck.auth.services.interceptors.http",
        "dbcheck.auth.services.interceptors.connection"
    ]);
})(angular);
