(function (angular) {
    "use strict";

    angular.module("dbcheck.resources.journal.sugarlevelDetails", [
        "dbcheck.common.utilities.jsDataUtils"
    ])

    .constant("SUGARLEVELDETAILS_END_POINT", "/api/community/sugarlevel_details/")

    .service("dbcheck.resources.sugarlevelDetails", ["DS",
        "SUGARLEVELDETAILS_END_POINT",
        function (DS, endPoint) {

            return DS.defineResource({
                endpoint: endPoint,
                // isSystemResource: false,
                name: "sugarlevelDetails"
            });
        }]);
})(angular);
