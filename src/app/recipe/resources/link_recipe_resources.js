(function (angular) {
    "use strict";

    angular
    .module("dbcheck.resources.recipe.linkRecipeThings", [
        "dbcheck.resources.recipe.recipes",
        "dbcheck.resources.journal.persons",
        "dbcheck.resources.planner.foodLog"
    ])

    .factory("dbcheck.resource.linkRecipeThings",
        [
        "dbcheck.resources.recipe",
        "dbcheck.resources.person",
        "dbcheck.resources.foodLog",
        function (recipeResource, personResource, foodlogResource) {

            return {
                recipes: recipeResource,
                person: personResource,
                foodLog: foodlogResource
            };
        }
    ]);

}) (angular);
