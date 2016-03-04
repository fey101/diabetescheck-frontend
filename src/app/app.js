(function (angular) {
    "use strict";

    angular.module( "diabetescheck", [
        // 3rd party
        "ngAnimate",
        "templates-app",
        "ui.bootstrap",
        "js-data",
        "formly",
        "formlyBootstrap",
        "ngIdle",

        //local modules
        "dbcheck.config",
        "dbcheck.auth",
        "dbcheck.layout",
        "dbcheck.admin",
        "dbcheck.journal",
        "dbcheck.common",
        "dbcheck.recipe",
        "dbcheck.community",
        "dbcheck.planner"

    ]);
})(angular);
