(function (angular) {
    "use strict";
    angular.module("dbcheck.recipe.controllers", [
        "dbcheck.resources.recipe.linkRecipeThings",
        "dbcheck.common.services.js_data_alerts"
    ])

    .controller("dbcheck.recipe.controllers.listRecipes", [
        "$scope", "dbcheck.resources.recipe",
        "dbcheck.common.service.js_data_alerts",
        function ($scope, recipe, error_svc) {
            recipe.findAll().then(function (data) {
                $scope.recipes = data;
            },
            function(error) {
                $scope.alert = error_svc.showErr(error, "Error");
            });

        }
    ])
    .controller("dbcheck.recipe.controllers.recipeDetail", [
        "$scope", "$state", "dbcheck.resources.recipe",
        "errorMessage",
        function ($scope, $state, recipe, alert) {
            var id = $state.params.recipeID;
            recipe.find(id).then(function (data) {
                $scope.recipe = data;
            },
            function(error) {
                $scope.alert = alert.showError(error);
            });

        }
    ])
    .controller("dbcheck.recipe.controllers.new_recipe", [
        "$scope", "dbcheck.resource.linkRecipeThings",
        "dbcheck.recipe.formly.new_recipe", "$state",
        "errorMessage",
        function ( $scope, linkResource, formlyService, $state,
            alert) {
            $scope.recipeForm = {};
            $scope.fields = formlyService.getFields();

            $scope.createRecipe = function () {
                $scope.submitClicked = true;
                linkResource.recipe.create($scope.recipeForm.model)
                    .then(function (newRecipe) {
                        $scope.queueReturned = newRecipe;
                        $state.go("recipe");
                    }, function (err) {
                        $scope.submitClicked = false;
                        $scope.alert = alert.showError(err);
                    });
            };
        }
    ]);

})(angular);
