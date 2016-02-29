(function (angular) {
    "use strict";

    angular.module("dbcheck.auth.formly", [
        "dbcheck.auth.formly.login",
        "dbcheck.auth.formly.reset_email",
        "dbcheck.auth.formly.reset_confirm"
    ]);
})(angular);
