(function (angular) {
    "use strict";

    angular.module("dbcheck.admin",[
        "dbcheck.admin.controllers",
        "dbcheck.admin.registration.controllers",
        "dbcheck.admin.routes",
        "dbcheck.admin.registration.states",
        "dbcheck.admin.services",
        "dbcheck.admin.services.formly",
        "dbcheck.admin.resources"
    ]);
})(angular);
