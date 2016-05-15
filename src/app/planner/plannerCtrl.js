(function (angular) {
    "use strict";
    angular.module("dbcheck.planner.plancontrollers", [])

    .controller("dbcheck.planner.plannerCtrl", [
        "$scope",
        function ($scope) {
            $scope.nutrients_list =
                ["proteins", "carbohydrate", "alcohol", "fats and oils" ];

        }
    ]);
})(angular);
