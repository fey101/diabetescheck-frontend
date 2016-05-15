(function (angular) {
    "use strict";
    angular.module("dbcheck.planner.states", ["ui.router"])

    .config(function config($stateProvider) {
        $stateProvider
            .state("planner", {
                parent: "base_state",
                url: "/planner/",
                views: {
                    "content@": {
                        templateUrl: "planner/tpls/planner.tpl.html",
                        controller: "dbcheck.planner.plannerCtrl"
                    },
                    "pageactions@": {
                        templateUrl: "journal/tpls/pageactions/" +
                            "pageactions_detailView.tpl.html"
                    }
                }
            });
    });
})(angular);
