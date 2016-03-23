(function (angular) {
    "use strict";
    angular.module("dbcheck.planner.states", ["ui.router"])

    .config(function config($stateProvider) {
        $stateProvider
            .state("planner", {
                parent: "base_state",
                url: "/planner/:mealtime",
                views: {
                    "content@": {
                        templateUrl: "planner/tpls/planner.tpl.html"
                    },
                    "indexsidebar@": {
                        templateUrl: "planner/tpls/sidebar.planner.tpl.html"
                    },
                    "mealtime-content@planner": {
                        controller: "dbcheck.planner.controllers.setup",
                        templateUrl: "planner/tpls/mealtime.planner.tpl.html"
                    }
                }
            });
    });
})(angular);
