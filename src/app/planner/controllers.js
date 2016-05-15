(function (angular) {
    "use strict";
    angular.module("dbcheck.planner.controllers", [])

    .controller("dbcheck.planner.controllers.setup",[
        "$scope", "$state", "dbcheck.planner.formly.user_targets",
        "dbcheck.resource.linkRecipeThings",
        "errorMessage",
        function($scope, $state, formlyService, recipeLink, error_svc) {
            $scope.plannerModel = {};
            $scope.selectedItems = [];
            $scope.fields = formlyService.getFields();

            var setMealtime = function(time) {
                $scope.mealtime = time ;
                var backendTime;
                switch (time) {
                case "Breakfast":
                    backendTime = "bf";
                    break;
                case "Lunch":
                    backendTime = "lunch";
                    break;
                case "Supper":
                    backendTime = "supper";
                    break;
                case "Mid-morning Snack":
                    backendTime = "snack";
                    break;
                case "After Lunch Snack":
                    backendTime = "snack";
                    break;
                }
                // filter Breaktime recipes and allocate to $scope.recipes
                var params = {"category": backendTime};
                recipeLink.recipes.findAll(params).then(
                    function(data) {
                        $scope.recipes = data;
                    },
                    function(error) {
                        $scope.alert = error_svc.showErr(error, "Error");
                    }
                );
            };

            var mealtime = $state.params.mealtime || "Breakfast";
            setMealtime(mealtime);

            $scope.addSelected = function(selected) {
                $scope.selectedItems.push(selected);
                var allSelectedItems = $scope.selectedItems;
                // reassign only unique keys to $scope.selectedItems
                $scope.selectedItems = _.uniq(allSelectedItems);

            };

            //for the bottom nutrition calculator portion

            $scope.resetValues = function(newList) {
                $scope.total = {
                    "calories": 0,
                    "cholesterol": 0
                };
                _.each(newList, function(item) {
                    var calories_perServing = parseInt(
                        item.nutrients_list[0].quantity, 10);
                    var cholesterol_perServing = parseInt(
                        item.nutrients_list[6].quantity, 10);
                    item.calc_calories = item.quantity * calories_perServing || 0;
                    item.calc_cholesterol = item.quantity *
                        cholesterol_perServing || 0;
                    $scope.total.calories += item.calc_calories;
                    $scope.total.cholesterol += item.calc_cholesterol;
                });
            };
            $scope.removeItem = function(itemIndex) {
                $scope.selectedItems.splice(itemIndex, 1);
                $scope.resetValues($scope.selectedItems);
            };

            $scope.logMeal = function() {
                if ($scope.plannerForm.$valid) {
                    $scope.submitClicked = true;
                    var foodlogObject = {
                        period: mealtime,
                        calories_gained: $scope.total.calories,
                        cholesterol_gained: $scope.total.cholesterol,
                        food: $scope.selectedItems[0].id
                    };
                    recipeLink.foodLog.create(foodlogObject).then(
                        function() {
                            var message = "Meal logged successfully";
                            $scope.success = {
                                msg:message,
                                title: "OK"
                            };
                        },
                        function(error) {
                            $scope.alert = error_svc.showError(
                                error, "Error");
                        }
                    );
                }
                else {
                    var data = {
                        "data": {
                            "error": "Please correct the" +
                            " errors on the form"
                        }
                    };
                    $scope.submitClicked = false;
                    $scope.alert = error_svc.showError(data, "Error");
                }
            };
        }
    ]);

})(angular);
