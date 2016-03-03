(function (angular) {
    "use strict";
    angular.module("dbcheck.recipe.controllers", [
        "dbcheck.resources.recipe.recipes",
        "dbcheck.common.errorMessages"
    ])

    .controller("dbcheck.recipe.controllers.listRecipes", [
        "$scope", "dbcheck.resources.recipe", "errorMessage",
        function ($scope, recipe, error_svc) {
            recipe.findAll({bypassCache: true})
                .then(function(data) {
                    $scope.recipes = data;
                },function(err) {
                    $scope.alert = error_svc.showError(err, "Error");
                });

        }
    ]);

})(angular);
