(function (angular) {
    "use strict";

    angular
    .module("dbcheck.resources.recipe.linkRecipeThings", [
        "dbcheck.resources.recipe.recipes"
    ])

    .factory("dbcheck.resource.linkRecipeThings",
        [
        "dbcheck.resources.recipe",
        function (recipeResource) {

            return {
                recipes: recipeResource
            };
        }
    ]);

}) (angular);
