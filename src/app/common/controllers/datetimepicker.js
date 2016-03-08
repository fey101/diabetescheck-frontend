(function (angular) {
    "use strict";

    angular.module("emr.common.controllers.datetimepicker", [
    ])

    //Shows both the date and time pickers
    .controller("emr.common.datetimepicker", ["$scope", function ($scope) {
        $scope.isOpen = false;
        $scope.openDateTimePicker = function(e) {
            e.preventDefault();
            $scope.isOpen = true;
        };
    }]);
})(angular);
