(function (angular) {
    "use strict";

    angular.module("emr.resources.auth.roleActions", [
        "emr.resources.common.jsDataUtils",
        "emr.resources.common.deserialize_drf",
        "emr.resources.common.overide_before_validate"
    ])

    .constant("RACTION_END_POINT", "/api/auth/role_actions/")

    .service("emr.resource.roleActions", ["DS", "RACTION_END_POINT",
        function (DS, endPoint) {

            return DS.defineResource({
                endpoint: endPoint,
                isSystemResource: false,
                name: "roleActions"
            });
        }
    ]);
})(angular);
