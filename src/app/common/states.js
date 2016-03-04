(function (angular) {
    "use strict";
    angular.module("dbcheck.common.routes", ["ui.router"])

    .config(function config($stateProvider) {
        $stateProvider
            .state("base_state", {
                ncyBreadcrumb: {
                    label: "DIABETES CHECK"
                },
                views: {
                    "indexheader@":{
                        templateUrl: "layout/tpls/header.tpl.html"
                    },
                    "indexsidebar@": {
                        templateUrl: "layout/tpls/index_sidebar.tpl.html"
                    }
                }
            });
    });
})(angular);
