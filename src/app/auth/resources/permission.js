(function (angular) {
    "use strict";

    angular.module("emr.resources.auth.permission", [
        "emr.resources.common.jsDataUtils",
        "emr.resources.common.deserialize_drf",
        "emr.resources.common.overide_before_validate"
    ])

    .constant("PERM_END_POINT", "/api/auth/permissions/")

    .service("emr.resource.permission", ["DS", "PERM_END_POINT",
        function (DS, endPoint) {

            return DS.defineResource({
                endpoint: endPoint,
                isSystemResource: false,
                name: "permission"
            });
        }
    ]);
})(angular);
