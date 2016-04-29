(function (angular) {
    "use strict";

    angular.module("dbcheck.journal.resources",[
        "dbcheck.resources.journal.persons",
        "dbcheck.resources.journal.linkJournalThings",
        // "dbcheck.resources.journal.gender",
        "dbcheck.resources.journal.sugarlevelDetails",
        "dbcheck.resources.journal.sugarlevelsLog",
        "dbcheck.resources.journal.exerciseLog",
        "dbcheck.resources.journal.exerciseRoutine"
    ]);
})(angular);
