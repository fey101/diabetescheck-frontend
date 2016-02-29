(function (angular) {
    "use strict";

    angular.module("emr.actions", [
        "emr.auth.services.actions.actionChecker",
        "emr.auth.services.actions.hasAction",
        "emr.auth.services.actions.pageActions",
        "emr.auth.services.actions.pageChecker",
        "emr.auth.directives.emrAppActions"
    ]);
})(angular);
