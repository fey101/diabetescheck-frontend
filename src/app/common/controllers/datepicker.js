(function (angular) {
    "use strict";

    angular.module("dbcheck.common.controllers.datepicker", [
    ])

    //Shows only the datepicker
    .controller("dbcheck.common.datepicker", ["$scope", function ($scope) {
        $scope.enableTime = false;
        $scope.closeOnDate = true;
        $scope.isOpen = false;
        $scope.openDatePicker = function(e) {
            e.preventDefault();
            $scope.isOpen = true;
        };
    }]);
})(angular);
