(function (angular) {
    "use strict";

    angular.module("dbcheck.recipe",[
        "dbcheck.recipe.controllers",
        "dbcheck.recipe.routes",
        "dbcheck.recipes.services.formly",
        "dbcheck.recipe.resources",
        "dbcheck.resources.journal.persons"
    ]);
})(angular);
