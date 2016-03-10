(function (angular) {
    "use strict";

    angular
    .module("dbcheck.resources.recipe.linkRecipeThings", [
        "dbcheck.resources.recipe.recipes",
        "dbcheck.resources.journal.persons"
    ])

    .factory("dbcheck.resource.linkRecipeThings",
        [
        "dbcheck.resources.recipe",
        "dbcheck.resources.person",
        function (recipeResource, personResource) {

            return {
                recipes: recipeResource,
                person: personResource
            };
        }
    ]);

}) (angular);
