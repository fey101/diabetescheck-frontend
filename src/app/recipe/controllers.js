(function (angular) {
    "use strict";
    angular.module("dbcheck.recipe.controllers", [
        "dbcheck.resources.recipe.recipes",
        "dbcheck.common.services.js_data_alerts"
    ])

    .controller("dbcheck.recipe.controllers.listRecipes", [
        "$scope", "$http", "dbcheck.resources.recipe",
        "dbcheck.common.service.js_data_alerts",
        function ($scope, $http, recipe, error_svc) {
            $scope.recipes = $http.get("http://localhost/api/recipe/recipes");
            console.log($scope.recipes);
            // recipe.findAll({bypassCache: true}).then(
            //     function(data) {
            //         $scope.recipes = data;
            //     },
            //     function(error) {
            //         $scope.alert = error_svc.showErr(error, "Error");
            //     }
            // );

        }
    ]);

})(angular);
