(function (angular) {
    "use strict";
    angular.module("dbcheck.planner.states", ["ui.router"])

    .config(function config($stateProvider) {
        $stateProvider
            .state("planner", {
                parent: "base_state",
                url: "/planner",
                views: {
                    "content@": {
                        controller: "dbcheck.planner.controllers.setup",
                        templateUrl: "planner/tpls/planner.tpl.html"
                    }
                }
            });
    });
})(angular);
