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

        //local modules
        "dbcheck.config",
        "dbcheck.admin",
        "dbcheck.recipe"

    ]);
})(angular);
