(function (angular) {
    "use strict";

    angular.module("dbcheck.resources.auth.user", [
        "dbcheck.common.utilities.jsDataUtils",
        "dbcheck.common.utilities.deserialize_drf",
        "dbcheck.common.utilities.overide_before_validate"
    ])

    .constant("USER_END_POINT", "/api/auth/users/")

    .service("dbcheck.resource.user", ["DS", "USER_END_POINT",
        function (DS, endPoint) {

            return DS.defineResource({
                endpoint: endPoint,
                // isSystemResource: false,
                name: "user"
            });
        }
    ]);
})(angular);
