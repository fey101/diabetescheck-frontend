(function (angular) {
    "use strict";

    angular.module("dbcheck.admin.services", [
        "dbcheck.admin.services.multistepValidation",
        "dbcheck.admin.services.registrationTracker",
        "dbcheck.admin.services.registrationData"
    ]);
})(angular);
