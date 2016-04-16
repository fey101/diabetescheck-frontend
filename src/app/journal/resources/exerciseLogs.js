(function (angular) {
    "use strict";

    angular.module("dbcheck.resources.journal.exerciseLog", [
        "dbcheck.common.utilities.jsDataUtils"
    ])

    .constant("EXERCISELOG_END_POINT", "/api/journal/exerciselogs/")

    .service("dbcheck.resources.exerciseLog", ["DS",
        "EXERCISELOG_END_POINT",
        function (DS, endPoint) {

            return DS.defineResource({
                endpoint: endPoint,
                // isSystemResource: false,
                name: "exerciseLog"
            });
        }]);
})(angular);
