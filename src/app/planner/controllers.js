(function (angular) {
    "use strict";
    angular.module("dbcheck.planner.controllers", [])

    .controller("dbcheck.planner.controllers.setup",[
        "$scope", "$state", "dbcheck.planner.formly.user_targets",
        "dbcheck.resource.linkRecipeThings",
        "dbcheck.common.service.js_data_alerts",
        function($scope, $state, formlyService, recipeLink, error_svc) {

            var setMealtime = function(time) {
                $scope.mealtime = time ;
                //filter Breaktime recipes and allocate to $scope.recipes
                // params = {"mealtime": "time"};
                recipeLink.recipes.findAll().then(
                    function(data) {
                        $scope.recipes = data;
                    },
                    function(error) {
                        $scope.alert = error_svc.showErr(error, "Error");
                    }
                );
            };

            var mealtime = $state.params.mealtime;
            setMealtime(mealtime);

            //for the bottom nutrition calculator portion
            $scope.plannerForm = {};
            $scope.fooditems = {};
            $scope.total = {
                "calories": 0,
                "cholestrol": 0
            };
            $scope.fields = formlyService.getFields();
            $scope.selectedItems = [];

            // recipeLink.recipes.find($state.params.recipeID).then(
            //     function(object) {
            //         $scope.selectedItems.push(object);
            //     },
            //     function(error) {
            //         $scope.alert = error_svc.showErr(error, "Error");
            //     }
            // );

            console.log($scope.plannerForm);
            console.log($scope.fooditems);
            for ( var i = 0; i < $scope.selectedItems.length; i++ ) {
                // var temp = $scope.selectedItems[i];
                // $scope.selectedItems[i].calc_calories = (
                //     temp.calories * $scope.fooditems.item[i]);
                // $scope.selectedItems[i].calc_cholestrol = (
                //     temp.cholestrol * $scope.fooditems.item[i]);
                $scope.total.calories += $scope.selectedItems[i].calc_calories;
                $scope.total.cholestrol += $scope.selectedItems[i].calc_cholestrol;
            }
            console.log($scope.selectedItems);
        }
    ])
    .controller("dbcheck.planner.controllers.sidebar_setup",[
        function() {

        }
    ]);

})(angular);
