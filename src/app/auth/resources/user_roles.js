(function (angular) {
    "use strict";

    angular.module("emr.resources.auth.userRoles", [
        "emr.resources.common.jsDataUtils",
        "emr.resources.common.deserialize_drf",
        "emr.resources.common.overide_before_validate"
    ])

    .constant("UROLE_END_POINT", "/api/auth/user_roles/")

    .service("emr.resource.userRoles", ["DS", "UROLE_END_POINT",
        function (DS, endPoint) {

            return DS.defineResource({
                endpoint: endPoint,
                isSystemResource: false,
                name: "userRoles"
            });
        }
    ]);
})(angular);
