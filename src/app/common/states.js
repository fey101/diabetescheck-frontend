(function (angular) {
    "use strict";
    angular.module("dbcheck.common.routes", ["ui.router"])

    .config(function config($stateProvider) {
        $stateProvider
            .state("base", {
            url: "/",
            views: {
                "indexheader@": {
                    templateUrl: "common/tpls/header.tpl.html"
                }
            }
        }).state("home", {
            url: "/home",
            views: {
                "main@": {
                    templateUrl: "common/tpls/content.tpl.html"
                }
            }
        });
    });
})(angular);
