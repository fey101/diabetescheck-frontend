(function (angular) {
    "use strict";

    angular.module("emr.resources.auth.role", [
        "emr.resources.common.jsDataUtils",
        "emr.resources.common.deserialize_drf",
        "emr.resources.common.overide_before_validate"
    ])

    .constant("ROLE_END_POINT", "/api/auth/roles/")

    .service("emr.resource.role", ["DS", "ROLE_END_POINT",
        function (DS, endPoint) {

            return DS.defineResource({
                endpoint: endPoint,
                isSystemResource: false,
                name: "role"
            });
        }
    ]);
})(angular);
