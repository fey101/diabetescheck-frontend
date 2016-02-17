(function (angular) {
    "use strict";

    angular.module("dbcheck.recipe.routes", ["ui.router"])

    .config(function config($stateProvider) {
        $stateProvider
            .state("recipe", {
                url: "/recipes",
                controller: "dbcheck.recipe.controllers.listRecipes",
                templateUrl: "/recipe/tpls/listView.tpl.html"
            });
    });
})(angular);