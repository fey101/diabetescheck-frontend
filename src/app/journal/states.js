(function (angular) {
    "use strict";
    angular.module("dbcheck.journal.routes", ["ui.router"])

    .config(function config($stateProvider) {
        $stateProvider
            .state("journal", {
                ncyBreadcrumb: {
                    label: "Journal"
                },
                parent: "base_state",
                url: "/",
                views: {
                    "content@": {
                        controller: "dbcheck.journal.controllers.initial",
                        templateUrl: "/journal/tpls/initial.tpl.html"
                    }
                }
            });
    });
})(angular);
