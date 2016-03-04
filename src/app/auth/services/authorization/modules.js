(function (angular) {
    "use strict";

    angular.module("dbcheck.authorization", [
        "dbcheck.auth.services.authorization.loggedin"
        // "emr.auth.services.authorization.hasPerm",
        // "emr.auth.services.authorization.actionChecker"
    ]);
})(angular);
