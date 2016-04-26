(function (angular) {
    "use strict";

    angular.module("dbcheck.resources.journal.healthDetails", [
        "dbcheck.common.utilities.jsDataUtils"
    ])

    .constant("HEALTHDETAILS_END_POINT", "/api/journal/health_details/")

    .service("dbcheck.resources.healthDetails", ["DS", "HEALTHDETAILS_END_POINT",
        function (DS, endPoint) {

            return DS.defineResource({
                endpoint: endPoint,
                // isSystemResource: false,
                name: "healthDetails"
            });
        }]);
})(angular);
