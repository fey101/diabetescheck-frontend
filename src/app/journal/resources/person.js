(function (angular) {
    "use strict";

    angular.module("dbcheck.resources.journal.persons", [
        "dbcheck.common.utilities.jsDataUtils"
    ])

    .constant("PERSON_END_POINT", "/api/journal/persons/")

    .service("dbcheck.resources.person", ["DS", "PERSON_END_POINT",
        function (DS, endPoint) {

            return DS.defineResource({
                endpoint: endPoint,
                // isSystemResource: false,
                name: "person"
            });
        }]);
})(angular);
