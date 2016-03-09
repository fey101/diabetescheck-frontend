(function (angular) {
    "use strict";

    angular
    .module("dbcheck.resources.journal.linkJournalThings", [
        "dbcheck.resources.journal.persons"
    ])

    .factory("dbcheck.resource.linkJournalThings",
        [
        "dbcheck.resources.person",
        function (personResource) {

            return {
                person: personResource
            };
        }
    ]);

}) (angular);
