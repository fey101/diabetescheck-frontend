(function (angular) {
    "use strict";

    angular.module("dbcheck.journal",[
        "dbcheck.journal.controllers",
        "dbcheck.journal.routes",
        "dbcheck.journal.resources",
        "dbcheck.journal.services",
        "dbcheck.journal.services.formly"
    ]);
})(angular);
