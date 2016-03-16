(function (angular) {
    "use strict";

    angular.module("dbcheck.authentication", [
        "dbcheck.auth.services.authentication.pageUserRequired"
        // "dbcheck.auth.services.authentication.isInitial"
        // "emr.auth.services.authentication.hasOrganisation"
    ]);
})(angular);
