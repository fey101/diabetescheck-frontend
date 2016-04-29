(function (angular) {
    "use strict";
    angular.module("dbcheck.planner.controllers", [])

    .controller("dbcheck.planner.controllers.setup",[
        "$scope", "$state", "dbcheck.planner.formly.user_targets",
        "dbcheck.resource.linkRecipeThings",
        "dbcheck.common.service.js_data_alerts",
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

            //for the bottom nutrition calculator portion
            console.log($scope.selectedItems);

            $scope.resetValues = function(newList) {
                console.log("changed!");
                $scope.total = {
                    "calories": 0,
                    "cholestrol": 0
                };
                _.each(newList, function(item) {
                    var calories_perServing = parseInt(
                        item.nutrients_list[0].quantity, 10);
                    item.calc_calories = item.quantity * calories_perServing || 0;
                    $scope.total.calories += item.calc_calories;
                    console.log(item.calc_calories);
                    console.log($scope.total.calories);
                    console.log (typeof($scope.total.calories));
                });
            };
            $scope.removeItem = function(itemIndex) {
                $scope.selectedItems.splice(itemIndex, 1);
                $scope.resetValues($scope.selectedItems);
            };

            $scope.addToJournal = function() {
                console.log($scope.plannerForm);
                console.log($scope.plannerModel);
                console.log($scope.selectedItems[0].quantity);
            };
        }
    ]);

})(angular);
