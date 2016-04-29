(function (angular) {
    "use strict";

    angular.module("dbcheck.resources.admin.users", [
        "dbcheck.common.utilities.jsDataUtils"
    ])

    .constant("USERS_END_POINT", "/api/auth/users/")

    .service("dbcheck.resources.users", ["DS", "USERS_END_POINT",
        function (DS, endPoint) {

            return DS.defineResource({
                endpoint: endPoint,
                // isSystemResource: false,
                name: "users"
            });
        }]);
})(angular);
