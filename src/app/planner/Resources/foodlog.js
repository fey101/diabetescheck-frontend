(function (angular) {
    "use strict";

    angular.module("dbcheck.resources.planner.foodLog", [
        "dbcheck.common.utilities.jsDataUtils"
    ])

    .constant("FOODLOG_END_POINT", "/api/journal/foodlogs/")

    .service("dbcheck.resources.foodLog", ["DS",
        "FOODLOG_END_POINT",
        function (DS, endPoint) {

            return DS.defineResource({
                endpoint: endPoint,
                // isSystemResource: false,
                name: "foodLog"
            });
        }]);
})(angular);
