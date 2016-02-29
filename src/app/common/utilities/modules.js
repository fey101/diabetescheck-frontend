(function (angular) {
    "use strict";

    angular.module("dbcheck.common.utilities", [
        "dbcheck.common.utilities.deserialize_drf",
        "dbcheck.common.utilities.jsDataUtils",
        "dbcheck.common.utilities.overide_before_validate"
    ]);
})(angular);
