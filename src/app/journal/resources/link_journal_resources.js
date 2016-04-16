(function (angular) {
    "use strict";

    angular
    .module("dbcheck.resources.journal.linkJournalThings", [
        "dbcheck.resources.journal.persons",
        "dbcheck.resources.journal.sugarlevelDetails",
        "dbcheck.resources.journal.sugarlevelsLog",
        "dbcheck.resources.journal.exerciseLog",
        "dbcheck.resources.journal.exerciseRoutine"
    ])

    .factory("dbcheck.resource.linkJournalThings", [
        "dbcheck.resources.person",
        "dbcheck.resources.sugarlevelDetails",
        "dbcheck.resources.sugarlevelsLog",
        "dbcheck.resources.exerciseRoutine",
        "dbcheck.resources.exerciseLog",
        function (personResource, sugarDetailsResource,
            sugarlevelsLog, exerciseRoutine, exerciseLog) {

            return {
                sugarDetails: sugarDetailsResource,
                person: personResource,
                sugarLog: sugarlevelsLog,
                exercises: exerciseRoutine,
                exerciseLog: exerciseLog
            };
        }
    ]);

}) (angular);
