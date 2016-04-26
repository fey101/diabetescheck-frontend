(function (angular) {
    "use strict";

    angular.module("dbcheck.resources.journal.gender", [
        "dbcheck.common.utilities.jsDataUtils"
    ])

    .constant("GENDER_END_POINT", "/api/journal/gender/")

    .service("dbcheck.resources.gender", ["DS", "GENDER_END_POINT",
        function (DS, endPoint) {

            return DS.defineResource({
                endpoint: endPoint,
                // isSystemResource: false,
                name: "gender"
            });
        }]);
})(angular);
