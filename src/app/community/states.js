(function (angular) {
    "use strict";
    angular.module("dbcheck.community.routes", ["ui.router"])

    .config(function config($stateProvider) {
        $stateProvider
            .state("community", {
                parent: "base_state",
                url: "/community",
                views: {
                    "content@": {
                        controller: "dbcheck.community.controllers.setup",
                        templateUrl: "community/tpls/community.tpl.html"
                    }
                }
            });
    });
})(angular);
