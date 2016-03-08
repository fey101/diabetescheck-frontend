(function (angular) {
    "use strict";
    angular.module("dbcheck.recipe.controllers", [
        "dbcheck.resources.recipe.recipes",
        "dbcheck.common.services.js_data_alerts"
    ])

    .controller("dbcheck.recipe.controllers.listRecipes", [
        "$scope", "dbcheck.resources.recipe",
        "dbcheck.common.service.js_data_alerts",
        function ($scope, recipe, error_svc) {
            recipe.findAll().then(function (data) {
                $scope.recipes = data;
                console.log($scope.recipes);
            },
            function(error) {
                $scope.alert = error_svc.showErr(error, "Error");
            });

        }
    ])
    .controller("dbcheck.recipe.controllers.recipeDetail", [
        "$scope", "$state", "dbcheck.resources.recipe",
        "dbcheck.common.service.js_data_alerts",
        function ($scope, $state, recipe, error_svc) {
            var id = $state.params.recipeID;
            recipe.find(id).then(function (data) {
                $scope.recipe = data;
            },
            function(error) {
                $scope.alert = error_svc.showErr(error, "Error");
            });

        }
    ])
    .controller("dbcheck.recipe.controllers.new_recipe", [
        "$scope", "dbcheck.recipe.formly.new_recipe",
        "dbcheck.resources.recipe", "$state",
        "dbcheck.common.service.js_data_alerts",
        function ( $scope, formlyService, recipeResource, $state,
            alert) {
            $scope.recipeForm = {};
            $scope.fields = formlyService.getFields();
            console.log($scope.fields);

            $scope.createRecipe = function () {
                $scope.submitClicked = true;
                recipeResource.create($scope.recipeForm.model)
                    .then(function (newRecipe) {
                        $scope.queueReturned = newRecipe;
                        $state.go("recipe");
                    }, function (err) {
                        $scope.submitClicked = false;
                        $scope.alert = alert.showError(err, "Error");
                    });
            };
        }
    ]);

})(angular);
