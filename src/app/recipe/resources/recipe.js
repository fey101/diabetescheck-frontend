(function (angular) {
    "use strict";

    angular.module("dbcheck.resources.recipe.recipes", [
        "dbcheck.common.utilities.jsDataUtils"
    ])

    .constant("RECIPE_END_POINT", "/api/recipe/recipes/")

    .service("dbcheck.resources.recipe", ["DS", "RECIPE_END_POINT",
        function (DS, endPoint) {

            return DS.defineResource({
                endpoint: endPoint,
                // isSystemResource: false,
                name: "recipe"
            });
        }]);
})(angular);
