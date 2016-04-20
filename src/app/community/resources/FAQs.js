(function (angular) {
    "use strict";

    angular.module("dbcheck.resources.community.FAQs", [
        "dbcheck.common.utilities.jsDataUtils"
    ])

    .constant("FAQS_END_POINT", "/api/community/FAQs/")

    .service("dbcheck.resources.FAQs", ["DS",
        "FAQS_END_POINT",
        function (DS, endPoint) {

            return DS.defineResource({
                endpoint: endPoint,
                // isSystemResource: false,
                name: "FAQs"
            });
        }]);
})(angular);
