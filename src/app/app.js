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
        "ui.select",
        "js-data",

        //local modules
        "dbcheck.config",
        "dbcheck.auth",
        "dbcheck.layout",
        "dbcheck.admin",
        "dbcheck.common",
        "dbcheck.journal",
        "dbcheck.recipe",
        "dbcheck.community",
        "dbcheck.planner"

    ]);
})(angular);
