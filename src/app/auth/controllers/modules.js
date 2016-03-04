(function (angular) {
    "use strict";

    angular.module("dbcheck.auth.controllers", [
        "dbcheck.auth.authBase",
        "dbcheck.auth.loginAuth",
        "dbcheck.auth.logoutAuth",
        "dbcheck.auth.passwordReset",
        "dbcheck.auth.passwordResetConfirm",
        "dbcheck.auth.userDetails"
    ]);
})(angular);
