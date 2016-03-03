(function (angular) {
    "use strict";
    angular.module("dbcheck.common.routes", ["ui.router"])

    .config(function config($stateProvider) {
        $stateProvider
            .state("base_state", {
                ncyBreadcrumb: {
                    label: "DIABETES CHECK"
                },
                url: "/",
                views: {
                    "indexheader@":{
                        templateUrl: "layout/tpls/header.tpl.html"
                    },
                    "indexsidebar@": {
                        templateUrl: "layout/tpls/index_sidebar.tpl.html"
                    },
                    "content@": {
                        // template: "<div>hello!!!Am the content</div>"
                        controller: "dbcheck.recipe.controllers.listRecipes",
                        template: "<div><ul>" +
                                    "<li ng-repeat='recipe in recipes'>" +
                                        "{{recipe}}</li>" +
                                  "</ul></div>"
                    }
                }
            });
    });
})(angular);
