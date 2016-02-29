(function (angular) {
    "use strict";

    angular.module("emr.resources.auth.action", [
        "emr.resources.common.jsDataUtils",
        "emr.resources.common.deserialize_drf",
        "emr.resources.common.overide_before_validate"
    ])

    .constant("ACT_END_POINT", "/api/auth/actions/")

    .service("emr.resource.action", ["DS", "ACT_END_POINT",
        function (DS, endPoint) {

            return DS.defineResource({
                endpoint: endPoint,
                isSystemResource: false,
                name: "actions"
            });
        }
    ]);
})(angular);
