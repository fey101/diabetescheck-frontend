(function (angular) {
    "use strict";

    angular.module("dbcheck.resources.journal.sugarlevelsLog", [
        "dbcheck.common.utilities.jsDataUtils"
    ])

    .constant("SUGARLEVELSLOG_END_POINT", "/api/journal/sugarlevelslogs/")

    .service("dbcheck.resources.sugarlevelsLog", ["DS",
        "SUGARLEVELSLOG_END_POINT",
        function (DS, endPoint) {

            return DS.defineResource({
                endpoint: endPoint,
                // isSystemResource: false,
                name: "sugarlevelsLog"
            });
        }]);
})(angular);
