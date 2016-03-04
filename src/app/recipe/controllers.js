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
            console.log("helloooooooo");
            recipe.findAll().then(function (data) {
                $scope.recipes = data;
                console.log($scope.recipes);
            },
            function(error) {
                $scope.alert = error_svc.showErr(error, "Error");
            });

        }
    ]);

})(angular);
