(function (angular) {
    "use strict";

    angular.module("dbcheck.resources.journal.exerciseRoutine", [
        "dbcheck.common.utilities.jsDataUtils"
    ])

    .constant("ROUTINES_END_POINT", "/api/community/exercises/")

    .service("dbcheck.resources.exerciseRoutine", ["DS", "ROUTINES_END_POINT",
        function (DS, endPoint) {

            return DS.defineResource({
                endpoint: endPoint,
                // isSystemResource: false,
                name: "exerciseRoutine"
            });
        }]);
})(angular);
