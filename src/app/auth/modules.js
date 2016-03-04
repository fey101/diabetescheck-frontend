(function (angular) {
    "use strict";

    angular.module("dbcheck.auth", [
        "dbcheck.auth.controllers",
        "dbcheck.auth.states",
        "dbcheck.auth.oauth2",
        "dbcheck.auth.services",
        "dbcheck.exceptions",
        "dbcheck.resources.auth",
        "dbcheck.auth.formly"
    ]);
})(angular);
