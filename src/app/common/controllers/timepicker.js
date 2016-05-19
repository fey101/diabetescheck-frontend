(function (angular) {
    "use strict";

    angular.module("dbcheck.common.controllers.timepicker", [
    ])

    //Shows only the timepicker
    .controller("dbcheck.common.timepicker", ["$scope", function ($scope) {
        $scope.enableDate = false;
        $scope.enableTime = false;
        $scope.isOpen = false;
        $scope.openTimePicker = function(e) {
            console.log(e);
            e.preventDefault();
            $scope.isOpen = true;
        };
    }]);
})(angular);
