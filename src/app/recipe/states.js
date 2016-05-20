(function (angular) {
    "use strict";

    angular.module("dbcheck.recipe.routes", ["ui.router"])

    .config(function config($stateProvider) {
        $stateProvider
            .state("recipe", {
                parent: "base_state",
                url: "/fooditems",
                views: {
                    "content@": {
                        controller: "dbcheck.recipe.controllers.listRecipes",
                        templateUrl: "recipe/tpls/listView.tpl.html"
                    }
                    // "pageactions@":{
                    //     templateUrl: "recipe/tpls/pageactions/" +
                    //     "list_pageactions.tpl.html"
                    // }
                }
            })
            .state("recipe.add", {
                url: "/new_recipe",
                views: {
                    "content@": {
                        controller: "dbcheck.recipe.controllers.new_recipe",
                        templateUrl: "recipe/tpls/new_recipe.tpl.html"
                    },
                    "pageactions@":{
                        templateUrl: "recipe/tpls/pageactions/" +
                        "pageactions_detailView.tpl.html"
                    }
                }
            })
            .state("recipe.detail", {
                url: "/:recipeID",
                views: {
                    "content@": {
                        controller: "dbcheck.recipe.controllers.recipeDetail",
                        templateUrl: "recipe/tpls/detailView.tpl.html"
                    },
                    "pageactions@":{
                        templateUrl: "recipe/tpls/pageactions/" +
                        "pageactions_detailView.tpl.html"
                    }
                }
            });
    });
})(angular);
