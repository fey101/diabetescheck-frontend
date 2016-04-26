(function (angular) {
    "use strict";

    angular.module("dbcheck.journal.resources",[
        "dbcheck.resources.journal.persons",
        "dbcheck.resources.journal.linkJournalThings",
        "dbcheck.resources.journal.gender",
        "dbcheck.resources.journal.exerciseRoutine",
        "dbcheck.resources.journal.healthDetails"
    ]);
})(angular);
