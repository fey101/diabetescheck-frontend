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
                    "main": {
                        templateUrl: "common/tpls/content.tpl.html"
                    },
                    "indexheader@":{
                        templateUrl: "layout/tpls/header.tpl.html"
                    },
                    "indexsidebar@": {
                        templateUrl: "layout/tpls/index_sidebar.tpl.html"
                    },
                    "content@": {
                        template: "<div>hello!!!Am the content</div>"
                    }
                }
            });
    });
})(angular);
